#!/usr/bin/env bun

import { access, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FRONTMATTER_PATTERN = /^---\n(.*?)\n---\n/s;
const INJECT_MARKER = "<!-- INJECT -->";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const readmePath = path.join(repoRoot, "README.md");

function normalizeScalar(value) {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function collapseBlock(lines, style) {
  if (style === "|") {
    return lines.map((line) => line.trim()).join("\n").trim();
  }

  return lines
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseFrontmatter(text, filePath) {
  const match = text.match(FRONTMATTER_PATTERN);
  if (!match) {
    throw new Error(`Missing frontmatter in ${filePath}`);
  }

  const result = {};
  const lines = match[1].split(/\r?\n/);
  let blockKey = null;
  let blockStyle = null;
  let blockLines = [];

  function flushBlock() {
    if (!blockKey) {
      return;
    }

    result[blockKey] = collapseBlock(blockLines, blockStyle);
    blockKey = null;
    blockStyle = null;
    blockLines = [];
  }

  for (const line of lines) {
    if (blockKey) {
      if (line.startsWith("  ")) {
        blockLines.push(line.slice(2));
        continue;
      }

      if (line === "") {
        blockLines.push("");
        continue;
      }

      flushBlock();
    }

    const scalarMatch = line.match(/^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!scalarMatch) {
      continue;
    }

    const [, key, rawValue] = scalarMatch;
    if (rawValue === ">" || rawValue === "|") {
      blockKey = key;
      blockStyle = rawValue;
      blockLines = [];
      continue;
    }

    result[key] = normalizeScalar(rawValue);
  }

  flushBlock();

  return result;
}

function escapeCell(value) {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ").trim();
}

async function pathExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listSkills() {
  const entries = await readdir(repoRoot, { withFileTypes: true });
  const skills = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) {
      continue;
    }

    const skillFile = path.join(repoRoot, entry.name, "SKILL.md");
    if (!(await pathExists(skillFile))) {
      continue;
    }

    const text = await readFile(skillFile, "utf8");
    const frontmatter = parseFrontmatter(text, skillFile);

    if (!frontmatter.name || !frontmatter.description) {
      throw new Error(`Missing name or description in ${skillFile}`);
    }

    skills.push({
      dir: entry.name,
      name: frontmatter.name,
      description: frontmatter.description,
    });
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

function renderTable(skills) {
  return [
    "| Skill | Description |",
    "|---|---|",
    ...skills.map(
      (skill) =>
        `| [${escapeCell(skill.name)}](${encodeURI(skill.dir)}/) | ${escapeCell(skill.description)} |`,
    ),
  ].join("\n");
}

function injectTable(readme, table) {
  const firstMarkerIndex = readme.indexOf(INJECT_MARKER);
  if (firstMarkerIndex === -1) {
    throw new Error(`Could not find first ${INJECT_MARKER} marker in README.md`);
  }

  const secondMarkerIndex = readme.indexOf(INJECT_MARKER, firstMarkerIndex + INJECT_MARKER.length);
  if (secondMarkerIndex === -1) {
    throw new Error(`Could not find second ${INJECT_MARKER} marker in README.md`);
  }

  const insertStart = firstMarkerIndex + INJECT_MARKER.length;
  return `${readme.slice(0, insertStart)}\n${table}\n${readme.slice(secondMarkerIndex)}`;
}

const skills = await listSkills();
if (skills.length === 0) {
  throw new Error("No skills were found");
}

const readme = await readFile(readmePath, "utf8");
const updatedReadme = injectTable(readme, renderTable(skills));

if (updatedReadme !== readme) {
  await writeFile(readmePath, updatedReadme, "utf8");
}

console.log(`Updated README skill table with ${skills.length} skills`);
