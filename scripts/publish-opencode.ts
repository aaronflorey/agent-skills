#!/usr/bin/env bun

// @ts-nocheck

import { copyFile, lstat, mkdir, readdir, readlink, rm, symlink } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

export type PublishConfig = {
  skills: string[];
  commands: string[];
  agents?: string[];
};

const REPO_ROOT = path.resolve(import.meta.dir, "..");
const DEFAULT_CONFIG_PATH = path.join(import.meta.dir, "publish-opencode.config.ts");
const SKILLS_SOURCE_DIR = path.join(REPO_ROOT, "skills");
const COMMANDS_SOURCE_DIR = path.join(REPO_ROOT, "commands");
const AGENTS_SOURCE_DIR = path.join(REPO_ROOT, "agents");
const SKILLS_TARGET_DIR = path.join(os.homedir(), ".agents/skills");
const COMMANDS_TARGET_DIR = path.join(os.homedir(), ".config/opencode/command");
const AGENTS_TARGET_DIR = path.join(os.homedir(), ".config/opencode/agents");

type Options = {
  configPath: string;
  dryRun: boolean;
};

type LoadedConfig = {
  skills: string[];
  commands: string[];
  agents: string[];
};

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const config = await loadConfig(options.configPath);

  await mkdir(SKILLS_TARGET_DIR, { recursive: true });
  await mkdir(COMMANDS_TARGET_DIR, { recursive: true });
  await mkdir(AGENTS_TARGET_DIR, { recursive: true });

  for (const skill of config.skills) {
    const sourceDir = path.join(SKILLS_SOURCE_DIR, skill);
    const targetDir = path.join(SKILLS_TARGET_DIR, skill);
    await ensureDirectoryExists(sourceDir, `skill \`${skill}\``);
    await syncDirectory(sourceDir, targetDir, options);
  }

  for (const command of config.commands) {
    const fileName = normalizeCommandName(command);
    const sourceFile = path.join(COMMANDS_SOURCE_DIR, fileName);
    const targetFile = path.join(COMMANDS_TARGET_DIR, fileName);
    await ensureFileExists(sourceFile, `command \`${command}\``);
    await syncPath(sourceFile, targetFile, options);
  }

  for (const agent of config.agents) {
    const fileName = normalizeMarkdownName(agent);
    const sourceFile = path.join(AGENTS_SOURCE_DIR, fileName);
    const targetFile = path.join(AGENTS_TARGET_DIR, fileName);
    await ensureFileExists(sourceFile, `agent \`${agent}\``);
    await syncPath(sourceFile, targetFile, options);
  }
}

function parseArgs(args: string[]): Options {
  let dryRun = false;
  const positional: string[] = [];

  for (const arg of args) {
    if (arg === "--dry-run") {
      dryRun = true;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    }

    positional.push(arg);
  }

  const configPath = positional[0];

  return {
    configPath: configPath ? path.resolve(process.cwd(), configPath) : DEFAULT_CONFIG_PATH,
    dryRun,
  };
}

function printUsage() {
  console.log(`Usage: bun scripts/publish-opencode.ts [config-file] [--dry-run]

Defaults to ${DEFAULT_CONFIG_PATH}

Config module example:

export default {
  skills: ["skill-scout"],
  commands: ["scout-skills"],
  agents: ["scout"],
} satisfies PublishConfig;
`);
}

async function loadConfig(configPath: string): Promise<LoadedConfig> {
  const moduleUrl = pathToFileURL(configPath).href;
  const module = await import(moduleUrl);
  const raw = module.default ?? module.config;

  if (!raw || typeof raw !== "object") {
    throw new Error(`Config file must export a default object: ${configPath}`);
  }

  return {
    skills: normalizeList(raw.skills, "skills"),
    commands: normalizeList(raw.commands, "commands"),
    agents: normalizeOptionalList(raw.agents, "agents"),
  };
}

function normalizeOptionalList(value: unknown, field: string): string[] {
  if (value == null) {
    return [];
  }

  return normalizeList(value, field);
}

function normalizeList(value: unknown, field: string): string[] {
  if (!Array.isArray(value)) {
    throw new Error(`Config field \`${field}\` must be an array of strings`);
  }

  const seen = new Set<string>();
  const normalized: string[] = [];

  for (const entry of value) {
    if (typeof entry !== "string") {
      throw new Error(`Config field \`${field}\` must only contain strings`);
    }

    const trimmed = entry.trim();
    if (!trimmed) {
      throw new Error(`Config field \`${field}\` cannot contain empty strings`);
    }

    if (seen.has(trimmed)) {
      continue;
    }

    seen.add(trimmed);
    normalized.push(trimmed);
  }

  return normalized;
}

function normalizeCommandName(command: string): string {
  return normalizeMarkdownName(command);
}

function normalizeMarkdownName(name: string): string {
  return name.endsWith(".md") ? name : `${name}.md`;
}

async function ensureDirectoryExists(dirPath: string, label: string) {
  const stats = await statOrNull(dirPath);
  if (!stats?.isDirectory()) {
    throw new Error(`Could not find ${label} at ${dirPath}`);
  }
}

async function ensureFileExists(filePath: string, label: string) {
  const stats = await statOrNull(filePath);
  if (!stats?.isFile()) {
    throw new Error(`Could not find ${label} at ${filePath}`);
  }
}

async function syncDirectory(sourceDir: string, targetDir: string, options: Options) {
  const sourceStats = await lstat(sourceDir);
  if (!sourceStats.isDirectory()) {
    throw new Error(`Expected directory at ${sourceDir}`);
  }

  const targetStats = await statOrNull(targetDir);
  if (targetStats && !targetStats.isDirectory()) {
    await removePath(targetDir, options);
  }

  await ensureDirectory(targetDir, options);

  const sourceEntries = await readdir(sourceDir);
  const targetEntries = new Set((await readdirOrEmpty(targetDir)).map((entry) => entry));

  for (const entry of sourceEntries) {
    targetEntries.delete(entry);
    await syncPath(path.join(sourceDir, entry), path.join(targetDir, entry), options);
  }

  for (const extraEntry of targetEntries) {
    await removePath(path.join(targetDir, extraEntry), options);
  }
}

async function syncPath(sourcePath: string, targetPath: string, options: Options) {
  const sourceStats = await lstat(sourcePath);
  const targetStats = await statOrNull(targetPath);

  if (sourceStats.isDirectory()) {
    if (targetStats && !targetStats.isDirectory()) {
      await removePath(targetPath, options);
    }
    await syncDirectory(sourcePath, targetPath, options);
    return;
  }

  if (sourceStats.isSymbolicLink()) {
    if (targetStats) {
      await removePath(targetPath, options);
    }

    const linkTarget = await readlink(sourcePath);
    await logOperation(options, `symlink ${targetPath} -> ${linkTarget}`);
    if (!options.dryRun) {
      await mkdir(path.dirname(targetPath), { recursive: true });
      await symlink(linkTarget, targetPath);
    }
    return;
  }

  if (!sourceStats.isFile()) {
    throw new Error(`Unsupported source entry: ${sourcePath}`);
  }

  if (targetStats && !targetStats.isFile()) {
    await removePath(targetPath, options);
  }

  await logOperation(options, `copy ${sourcePath} -> ${targetPath}`);
  if (!options.dryRun) {
    await mkdir(path.dirname(targetPath), { recursive: true });
    await copyFile(sourcePath, targetPath);
  }
}

async function ensureDirectory(targetDir: string, options: Options) {
  await logOperation(options, `mkdir ${targetDir}`);
  if (!options.dryRun) {
    await mkdir(targetDir, { recursive: true });
  }
}

async function removePath(targetPath: string, options: Options) {
  await logOperation(options, `remove ${targetPath}`);
  if (!options.dryRun) {
    await rm(targetPath, { recursive: true, force: true });
  }
}

async function readdirOrEmpty(dirPath: string): Promise<string[]> {
  try {
    return await readdir(dirPath);
  } catch (error) {
    if (isNotFound(error)) {
      return [];
    }
    throw error;
  }
}

async function statOrNull(targetPath: string) {
  try {
    return await lstat(targetPath);
  } catch (error) {
    if (isNotFound(error)) {
      return null;
    }
    throw error;
  }
}

function isNotFound(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "ENOENT"
  );
}

function logOperation(options: Options, message: string) {
  console.log(options.dryRun ? `[dry-run] ${message}` : message);
}

await main();
