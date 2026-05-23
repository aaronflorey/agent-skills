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

const installable = {
  agents: ['docs-writer', 'package-finder', 'scout', 'todo-executor', 'todo-reviewer', 'todo-verifier'],
  skills: ['mise', 'lefthook', 'prd-todo-slicer', 'skill-researcher', 'skill-scout', 'rewrite-in-go'],
  commands: ['add-todo', 'docs', 'prd-to-todo', 'run-all-todos', 'run-todo', 'setup-repo'],
} as LoadedConfig;

const obsoleteCommands = ['scout-skills'];

const REPO_ROOT = path.resolve(import.meta.dir, "..");
const SKILLS_SOURCE_DIR = path.join(REPO_ROOT, "skills");
const COMMANDS_SOURCE_DIR = path.join(REPO_ROOT, "commands");
const AGENTS_SOURCE_DIR = path.join(REPO_ROOT, "agents");
const SKILLS_TARGET_DIR = path.join(os.homedir(), ".agents/skills");
const COMMANDS_TARGET_DIR = path.join(os.homedir(), ".config/opencode/command");
const AGENTS_TARGET_DIR = path.join(os.homedir(), ".config/opencode/agents");
const AGENT_MD_TARGET_DIRS = [
  path.join(os.homedir(), ".config/opencode/AGENTS.md"),
  path.join(os.homedir(), ".agents/AGENTS.md"),
];

type Options = {
  dryRun: boolean;
};

type LoadedConfig = {
  skills: string[];
  commands: string[];
  agents: string[];
};

async function main() {
  const options = parseArgs(process.argv.slice(2));

  await mkdir(SKILLS_TARGET_DIR, { recursive: true });
  await mkdir(COMMANDS_TARGET_DIR, { recursive: true });
  await mkdir(AGENTS_TARGET_DIR, { recursive: true });

  for (const skill of installable.skills) {
    const sourceDir = path.join(SKILLS_SOURCE_DIR, skill);
    const targetDir = path.join(SKILLS_TARGET_DIR, skill);
    await ensureDirectoryExists(sourceDir, `skill \`${skill}\``);
    await syncDirectory(sourceDir, targetDir, options);
  }

  for (const command of installable.commands) {
    const fileName = normalizeCommandName(command);
    const sourceFile = path.join(COMMANDS_SOURCE_DIR, fileName);
    const targetFile = path.join(COMMANDS_TARGET_DIR, fileName);
    await ensureFileExists(sourceFile, `command \`${command}\``);
    await syncPath(sourceFile, targetFile, options);
  }

  for (const command of obsoleteCommands) {
    await removePath(path.join(COMMANDS_TARGET_DIR, normalizeCommandName(command)), options);
  }

  for (const agent of installable.agents) {
    const fileName = normalizeMarkdownName(agent);
    const sourceFile = path.join(AGENTS_SOURCE_DIR, fileName);
    const targetFile = path.join(AGENTS_TARGET_DIR, fileName);
    await ensureFileExists(sourceFile, `agent \`${agent}\``);
    await syncPath(sourceFile, targetFile, options);
  }

  await installAgentsMd(options);
}

async function installAgentsMd(options) {
  const sourceFile = path.join(REPO_ROOT, "other", "AGENTS.md");
  await ensureFileExists(sourceFile, "AGENTS.md");

  for (const targetFile of AGENT_MD_TARGET_DIRS) {
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

  return {
    dryRun,
  };
}

function printUsage() {
console.log(`Usage: bun scripts/install.ts [--dry-run]`);
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
