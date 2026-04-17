#!/usr/bin/env -S bunx --bun zx

import { $ } from "zx";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const VERSION_PATTERN = /^(version:\s*)(\d+)\.(\d+)\.(\d+)(\s*)$/m;
const CONVENTIONAL_HEADER_PATTERN = /^(?<type>[a-z]+)(?:\([^\n)]+\))?(?<breaking>!)?:\s+/;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

$.cwd = repoRoot;

async function git(...args) {
  const result = await $`git ${args}`;
  return result.stdout;
}

async function gitAllowFailure(...args) {
  try {
    const result = await $`git ${args}`;
    return { ok: true, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    return {
      ok: false,
      stdout: error.stdout ?? "",
      stderr: error.stderr ?? String(error),
    };
  }
}

function parseVersion(text, filePath) {
  const match = text.match(VERSION_PATTERN);

  if (!match) {
    throw new Error(`Could not find a semver version in ${filePath}`);
  }

  return {
    version: `${match[2]}.${match[3]}.${match[4]}`,
    match,
  };
}

function detectBumpLevel(message) {
  if (/^BREAKING CHANGE:/m.test(message)) {
    return "major";
  }

  const firstLine = message.split("\n", 1)[0]?.trim() ?? "";
  const match = firstLine.match(CONVENTIONAL_HEADER_PATTERN);

  if (!match?.groups) {
    return "patch";
  }

  if (match.groups.breaking === "!") {
    return "major";
  }

  if (match.groups.type === "feat") {
    return "minor";
  }

  return "patch";
}

function bumpVersion(text, filePath, bumpLevel) {
  const parsed = parseVersion(text, filePath);
  const [, prefix, major, minor, patch, suffix] = parsed.match;
  const currentMajor = Number.parseInt(major, 10);
  const currentMinor = Number.parseInt(minor, 10);
  const currentPatch = Number.parseInt(patch, 10);

  let nextVersion;
  switch (bumpLevel) {
    case "major":
      nextVersion = `${currentMajor + 1}.0.0`;
      break;
    case "minor":
      nextVersion = `${currentMajor}.${currentMinor + 1}.0`;
      break;
    default:
      nextVersion = `${currentMajor}.${currentMinor}.${currentPatch + 1}`;
      break;
  }

  return {
    previousVersion: parsed.version,
    nextVersion,
    text: text.replace(VERSION_PATTERN, `${prefix}${nextVersion}${suffix}`),
  };
}

function skillDirsForPaths(paths) {
  const skillDirs = new Set();

  for (const filePath of paths) {
    const parts = filePath.split("/");
    if (parts.length < 2) {
      continue;
    }

    const skillDir = parts[0];
    skillDirs.add(skillDir);
  }

  return [...skillDirs].sort();
}

async function existingSkillDirs(paths) {
  const candidates = skillDirsForPaths(paths);
  const existing = [];

  for (const skillDir of candidates) {
    const skillFile = path.join(repoRoot, skillDir, "SKILL.md");
    const check = await gitAllowFailure("ls-files", "--error-unmatch", path.relative(repoRoot, skillFile));

    if (check.ok) {
      existing.push(skillDir);
      continue;
    }

    try {
      await readFile(skillFile, "utf8");
      existing.push(skillDir);
    } catch {
      // Not a skill directory.
    }
  }

  return existing;
}

async function main() {
  const messageFile = process.argv[2];
  const commitMessage = messageFile ? await readFile(messageFile, "utf8") : "";
  const bumpLevel = detectBumpLevel(commitMessage);

  const stagedOutput = await git("diff", "--cached", "--name-only", "--diff-filter=ACMRD");
  const stagedPaths = stagedOutput
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (stagedPaths.length === 0) {
    return;
  }

  const bumped = [];

  for (const skillDir of await existingSkillDirs(stagedPaths)) {
    const skillFile = path.join(repoRoot, skillDir, "SKILL.md");
    const relativeSkillFile = path.relative(repoRoot, skillFile);

    const unstaged = await git("diff", "--name-only", "--", relativeSkillFile);
    if (unstaged.split("\n").some((line) => line.trim() === relativeSkillFile)) {
      throw new Error(`${relativeSkillFile} has unstaged changes; stage or stash them before committing`);
    }

    const headFile = await gitAllowFailure("show", `HEAD:${relativeSkillFile}`);
    if (!headFile.ok) {
      continue;
    }

    const currentText = await readFile(skillFile, "utf8");
    const { version: currentVersion } = parseVersion(currentText, relativeSkillFile);
    const { version: headVersion } = parseVersion(headFile.stdout, `${relativeSkillFile} in HEAD`);

    if (currentVersion !== headVersion) {
      continue;
    }

    const updated = bumpVersion(currentText, relativeSkillFile, bumpLevel);
    await writeFile(skillFile, updated.text, "utf8");
    await git("add", relativeSkillFile);
    bumped.push({
      skillDir,
      previousVersion: updated.previousVersion,
      nextVersion: updated.nextVersion,
      bumpLevel,
    });
  }

  if (bumped.length > 0) {
    console.log(`Bumped skill versions (${bumpLevel}):`);
    for (const entry of bumped) {
      console.log(`- ${entry.skillDir}: ${entry.previousVersion} -> ${entry.nextVersion}`);
    }
  }
}

await main();
