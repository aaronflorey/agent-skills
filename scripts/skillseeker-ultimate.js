#!/usr/bin/env bun

import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { parseArgs } from "node:util";
import { tags as parseLanguageTag } from "language-tags";

const SCRIPT_NAME = path.basename(Bun.argv[1] || "skillseeker-ultimate.sh");
const FRONTMATTER_PATTERN = /^---\n([\s\S]*?)\n---\n?/;
const REQUIRED_FRONTMATTER_KEYS = new Set(["name", "description", "version", "source", "license"]);
const INVALID_LINK_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp",
  ".ico",
  ".pdf",
  ".zip",
  ".gz",
  ".tgz",
  ".tar",
  ".bz2",
  ".mp4",
  ".webm",
  ".mp3",
  ".wav",
  ".css",
  ".js",
  ".json",
  ".xml",
  ".toml",
]);
function usage() {
  console.log(`Usage:
  ./scripts/skillseeker-ultimate.sh [options] <source> [extra skill-seekers create args]
  ./scripts/skillseeker-ultimate.sh [options] <source> -- [extra skill-seekers create args]

Purpose:
  Generate a thorough skill with Skill Seekers, then run a direct OpenCode or
  Codex cleanup pass pinned to GPT-5.4 for a thorough but still token-efficient
  result. Stage the generated skill under ./output, then prune generated junk
  and move the finished skill into ./skills.

Defaults:
  source:       required
  agent:        auto-detect (prefers opencode, then codex)
  model:        gpt-5.4
  output root:  ./output (staging)
  preset:       comprehensive
  enhancement:  disabled during create; cleanup happens in agent pass

Options:
  --agent AGENT          Cleanup agent: opencode, codex, or auto
  --model MODEL          Cleanup model (default: gpt-5.4)
  --name NAME            Skill/output name override
  --output-root DIR      Staging output directory (default: ./output)
  --doc-version VERSION  Optional Skill Seekers doc version tag
  --max-pages N          Max pages for web scraping sources
  --workers N            Parallel workers for web scraping (default: 6)
  --rate-limit SECONDS   Delay between browser crawl launches (default: 0.2)
  --chunk-tokens N       RAG chunk size (default: 700)
  --chunk-overlap N      RAG chunk overlap (default: 80)
  --browser              Render and mirror web docs with Playwright before create
  --skip-cleanup         Only run Skill Seekers generation
  --skip-quality         Skip post-run quality report
  --help, -h             Show this help text

Examples:
  ./scripts/skillseeker-ultimate.js ./skill-seeker-docs --agent opencode
  ./scripts/skillseeker-ultimate.js https://docs.example.com --browser --max-pages 400
  ./scripts/skillseeker-ultimate.jh ./skill-seeker-docs -- --skip-how-to-guides`);
}

function die(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function note(message) {
  console.error(`\n[${SCRIPT_NAME}] ${message}`);
}

function quoteShellArg(value) {
  const text = String(value);
  if (text.length === 0) {
    return "''";
  }

  if (/^[A-Za-z0-9_./:@%+=,-]+$/.test(text)) {
    return text;
  }

  return `'${text.replace(/'/g, `'\\''`)}'`;
}

function printCmd(args, { stdinPath } = {}) {
  const rendered = args.map((arg) => quoteShellArg(arg)).join(" ");
  if (stdinPath) {
    console.error(`+ ${rendered} < ${quoteShellArg(stdinPath)}`);
    return;
  }

  console.error(`+ ${rendered}`);
}

function requireCmd(command) {
  if (!Bun.which(command)) {
    die(`Missing required command: ${command}`);
  }
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function deriveName(input) {
  let base = "";

  if (isWebSource(input)) {
    const parsed = new URL(input);
    base = parsed.pathname.replace(/\/$/, "").split("/").filter(Boolean).at(-1) || parsed.hostname;
  } else if (input.includes("/")) {
    base = input.replace(/\/$/, "").split("/").at(-1) || input;
  } else {
    base = input;
  }

  return slugify(base.replace(/\.[^.]+$/, ""));
}

function defaultSourceMetadata(input) {
  return isWebSource(input) ? input : "local";
}

function parseIntegerOption(name, value, { min = 1 } = {}) {
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isInteger(parsed) || parsed < min) {
    die(`${name} must be an integer >= ${min}`);
  }
  return parsed;
}

function parseFloatOption(name, value, { min = 0 } = {}) {
  const parsed = Number.parseFloat(String(value));
  if (!Number.isFinite(parsed) || parsed < min) {
    die(`${name} must be a number >= ${min}`);
  }
  return parsed;
}

function isWebSource(source) {
  return /^https?:\/\//i.test(source);
}

function normalizeUrl(rawUrl) {
  const parsed = new URL(rawUrl);
  parsed.hash = "";

  if (parsed.pathname !== "/" && parsed.pathname.endsWith("/")) {
    parsed.pathname = parsed.pathname.replace(/\/+$/, "");
  }

  return parsed.toString();
}

function canonicalizeCrawlUrl(rawUrl) {
  const parsed = new URL(normalizeUrl(rawUrl));

  if (parsed.pathname.endsWith("/index.html")) {
    parsed.pathname = parsed.pathname.slice(0, -"index.html".length) || "/";
  } else if (parsed.pathname.toLowerCase().endsWith(".html")) {
    parsed.pathname = parsed.pathname.slice(0, -".html".length) || "/";
  }

  if (parsed.pathname !== "/" && parsed.pathname.endsWith("/")) {
    parsed.pathname = parsed.pathname.replace(/\/+$/, "");
  }

  return parsed.toString();
}

function deriveCrawlScope(source) {
  const parsed = new URL(source);
  const segments = parsed.pathname.split("/").filter(Boolean);

  if (parsed.pathname.endsWith("/")) {
    return parsed.pathname;
  }

  if (segments.length <= 1) {
    return "/";
  }

  segments.pop();
  return `/${segments.join("/")}/`;
}

function isProbablyHtmlPath(pathname) {
  const fileName = pathname.split("/").at(-1) || "";
  if (!fileName || !fileName.includes(".")) {
    return true;
  }

  const extension = path.extname(fileName).toLowerCase();
  return !INVALID_LINK_EXTENSIONS.has(extension);
}

function shouldSkipIntlPathSegment(segment) {
  if (!segment || !segment.includes("-")) {
    return false;
  }

  const tag = parseLanguageTag(segment);
  const language = tag.language()?.format()?.toLowerCase();

  if (!tag.valid() || language === "en") {
    return false;
  }

  return Boolean(tag.region() || tag.script());
}

function isIntlPath(pathname, scopePrefix) {
  const scopedPath = pathname.slice(scopePrefix.length).replace(/^\/+/u, "");
  const firstSegment = scopedPath.split("/").find(Boolean);
  return Boolean(firstSegment && shouldSkipIntlPathSegment(firstSegment));
}

function shouldFollowLink(candidate, root, scopePrefix) {
  if (!candidate) {
    return false;
  }

  if (!["http:", "https:"].includes(candidate.protocol)) {
    return false;
  }

  if (candidate.origin !== root.origin) {
    return false;
  }

  if (!candidate.pathname.startsWith(scopePrefix)) {
    return false;
  }

  if (isIntlPath(candidate.pathname, scopePrefix)) {
    return false;
  }

  return isProbablyHtmlPath(candidate.pathname);
}

function delay(milliseconds) {
  if (milliseconds <= 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function pathExists(targetPath) {
  try {
    await access(targetPath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function resolveOutputDir(requestedDir, skillName, cwd) {
  const candidates = [
    requestedDir,
    path.resolve(cwd, "output", skillName),
  ];

  for (const candidate of candidates) {
    if (await pathExists(path.join(candidate, "SKILL.md"))) {
      return candidate;
    }
  }

  return null;
}

async function detectAgent() {
  if (Bun.which("opencode")) {
    return "opencode";
  }

  if (Bun.which("codex")) {
    return "codex";
  }

  return null;
}

async function removeEmptyDirectories(rootDir) {
  const entries = await readdir(rootDir, { withFileTypes: true });

  await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        await removeEmptyDirectories(path.join(rootDir, entry.name));
      }),
  );

  const remaining = await readdir(rootDir);
  if (remaining.length === 0) {
    await rm(rootDir, { recursive: true, force: true });
  }
}

async function pruneGeneratedArtifacts(skillDir) {
  await rm(path.join(skillDir, "quality_report.json"), { force: true });
  await rm(path.join(skillDir, "code_analysis.json"), { force: true });

  async function pruneNoise(currentDir) {
    const entries = await readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await pruneNoise(fullPath);
        continue;
      }

      if (entry.name === ".DS_Store" || entry.name === "Thumbs.db") {
        await rm(fullPath, { force: true });
      }
    }
  }

  await pruneNoise(skillDir);
  await removeEmptyDirectories(skillDir).catch(() => {});
}

async function moveFinishedSkill(stagedDir, finalDir) {
  if (stagedDir === finalDir) {
    return;
  }

  if (await pathExists(finalDir)) {
    die(`Final skill directory already exists: ${finalDir}`);
  }

  await mkdir(path.dirname(finalDir), { recursive: true });
  await rename(stagedDir, finalDir);

  const stagedParent = path.dirname(stagedDir);
  if (await pathExists(stagedParent)) {
    await removeEmptyDirectories(stagedParent).catch(() => {});
  }
}

function frontmatterValue(text, key) {
  const match = text.match(FRONTMATTER_PATTERN);
  if (!match) {
    return "";
  }

  for (const line of match[1].split(/\r?\n/)) {
    if (line.startsWith(`${key}:`)) {
      return line.slice(key.length + 1).trim();
    }
  }

  return "";
}

async function ensureRequiredFrontmatter(skillFile, skillName, sourceInput) {
  const text = await readFile(skillFile, "utf8");
  const match = text.match(FRONTMATTER_PATTERN);
  const body = match ? text.slice(match[0].length) : text;
  const existingFrontmatter = match ? match[1].split(/\r?\n/) : [];
  const extraFrontmatterLines = existingFrontmatter.filter((line) => {
    const key = line.match(/^([A-Za-z_][A-Za-z0-9_-]*):/u)?.[1];
    return !key || !REQUIRED_FRONTMATTER_KEYS.has(key);
  });

  const description = frontmatterValue(text, "description") || `Use this skill when working with ${skillName}.`;
  const version = frontmatterValue(text, "version") || "1.0.0";
  const sourceValue = frontmatterValue(text, "source") || defaultSourceMetadata(sourceInput);
  const license = frontmatterValue(text, "license") || "MIT";

  const next = [
    "---",
    `name: ${skillName}`,
    `description: ${description}`,
    `version: ${version}`,
    `source: ${sourceValue}`,
    `license: ${license}`,
    ...extraFrontmatterLines,
    "---",
    body.replace(/^\n+/, ""),
  ].join("\n");

  await writeFile(skillFile, next.endsWith("\n") ? next : `${next}\n`, "utf8");
}

function buildCleanupPrompt({ skillDir, skillName, sourceMetadata }) {
  return `Clean up the generated Skill Seekers output in this directory.

Working directory: ${skillDir}
Skill name: ${skillName}
Frontmatter source value: ${sourceMetadata}

Goals:
1. Make SKILL.md high-signal, trigger-oriented, and concise without stripping away useful coverage.
2. Preserve thorough retrieval coverage in references/*.md for the major topics the extracted docs support.
3. Preserve correctness using only facts already present in this directory.
4. Remove duplication, filler, vague wording, and repeated examples.
5. Move excess detail into references/*.md when that improves retrieval.
6. Keep or create compact coverage docs such as getting-started, core-patterns, api-reference, testing-debugging, integrations-plugins, and upgrades when the extracted docs support those topics.
7. Keep as many useful reference files as the extracted docs justify; only merge files that are truly redundant.
8. Ensure SKILL.md frontmatter includes name, description, version, source, and license.

Required constraints:
- Edit only files inside this directory.
- Do not use network access.
- Do not run git.
- Do not invent commands, flags, APIs, versions, or capabilities not supported by the extracted docs.
- Preserve correct frontmatter if present, but add any missing required keys.
- Keep trigger language explicit, especially "Use this skill when...".
- Prefer bullets, short sections, and short code examples with clear payoff.
- If SKILL.md is long, shorten it and point to references instead of duplicating detail.
- Do not collapse distinct topics just to minimize file count if separate files improve retrieval.
- Keep a compact getting-started guide and a compact API or core-patterns reference when the extracted docs support them.
- Keep plugin, integration, testing, debugging, migration, or upgrade references when the extracted docs support them.
- Set frontmatter values as follows unless the generated files already contain a more accurate value:
  - name: ${skillName}
  - version: 1.0.0
  - source: ${sourceMetadata}
  - license: MIT

Definition of done:
- SKILL.md is concise and easy for an agent to retrieve.
- Important user intents are obvious.
- Redundant prose is removed.
- SKILL.md frontmatter includes name, description, version, source, and license.
- Reference docs hold the deeper detail.
- Coverage includes getting-started plus API/core-patterns, and also testing, integrations/plugins, and upgrades when supported by the extracted docs.
- The result is better organized than the generated draft without becoming needlessly verbose.
`;
}

async function runCommand(args, { cwd, env, stdin, stdinPath } = {}) {
  printCmd(args, { stdinPath });

  const subprocess = Bun.spawn(args, {
    cwd,
    env: {
      ...process.env,
      ...env,
    },
    stdin: stdin ?? "inherit",
    stdout: "inherit",
    stderr: "inherit",
  });

  const exitCode = await subprocess.exited;
  if (exitCode !== 0) {
    die(`Command failed with exit code ${exitCode}: ${args[0]}`);
  }
}

async function createTurndownService() {
  const [{ default: TurndownService }, { gfm }] = await Promise.all([
    import("turndown"),
    import("turndown-plugin-gfm"),
  ]);

  const service = new TurndownService({
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    headingStyle: "atx",
  });

  service.use(gfm);
  service.remove(["script", "style", "noscript"]);
  return service;
}

async function launchChromiumBrowser() {
  const { chromium } = await import("playwright");

  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes("Executable doesn't exist") && !message.includes("Please run the following command")) {
      throw error;
    }

    requireCmd("bunx");
    note("Installing Playwright chromium for browser scraping");
    await runCommand(["bunx", "playwright", "install", "chromium"]);
    return await chromium.launch({ headless: true });
  }
}

function sanitizeFileStem(rawUrl) {
  const parsed = new URL(rawUrl);
  const pathname = parsed.pathname === "/" ? "/index" : parsed.pathname;
  const withoutExtension = pathname.replace(/\.[A-Za-z0-9]+$/, "");
  const base = withoutExtension.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase() || "page";
  const querySuffix = parsed.search ? `-${slugify(parsed.search)}` : "";
  return `${base}${querySuffix}`;
}

function uniqueFileName(rawUrl, usedNames) {
  const stem = sanitizeFileStem(rawUrl);
  let candidate = `${stem}.md`;
  let index = 2;

  while (usedNames.has(candidate)) {
    candidate = `${stem}-${index}.md`;
    index += 1;
  }

  usedNames.add(candidate);
  return candidate;
}

function renderMirroredPage(pageData) {
  const lines = [];

  if (!pageData.markdown.startsWith("# ")) {
    lines.push(`# ${pageData.title}`);
    lines.push("");
  }

  lines.push(`Source: ${pageData.url}`);
  lines.push("");
  lines.push(pageData.markdown || "_No content extracted._");
  lines.push("");
  return lines.join("\n");
}

function renderMirroredIndex(pages, source, scopePrefix) {
  return [
    "# Mirrored Documentation Index",
    "",
    `- Source root: ${source}`,
    `- Crawl scope: ${scopePrefix}`,
    `- Pages: ${pages.length}`,
    "",
    ...pages.map((page) => `- [${page.title}](${page.fileName}) - ${page.url}`),
    "",
  ].join("\n");
}

async function crawlPage({ context, turndownService, url }) {
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});
    await page.waitForTimeout(200);

    const extracted = await page.evaluate(() => {
      const primary =
        document.querySelector("main") ||
        document.querySelector("article") ||
        document.querySelector("[role='main']") ||
        document.querySelector(".theme-doc-markdown") ||
        document.querySelector(".md-content") ||
        document.querySelector(".markdown-body") ||
        document.querySelector(".content") ||
        document.querySelector(".page") ||
        document.body;

      const clone = primary.cloneNode(true);
      const removeSelectors = [
        "script",
        "style",
        "noscript",
        "nav",
        "header",
        "footer",
        "iframe",
        ".sidebar",
        ".sidebar-scrollbox",
        ".theme-popup",
        ".icon-button",
        ".nav-chapters",
        ".mobile-nav-chapters",
        "#search-wrapper",
        "#searchbar-outer",
      ];

      for (const selector of removeSelectors) {
        clone.querySelectorAll(selector).forEach((node) => {
          node.remove();
        });
      }

      const title =
        primary.querySelector("h1")?.textContent?.trim() ||
        document.querySelector("h1")?.textContent?.trim() ||
        document.title ||
        location.href;

      const links = [...document.querySelectorAll("a[href]")]
        .map((anchor) => anchor.getAttribute("href"))
        .filter(Boolean)
        .map((href) => new URL(href, location.href).toString());

      return {
        title,
        html: clone.innerHTML,
        text: clone.textContent?.trim() || "",
        links,
      };
    });

    const markdown = turndownService.turndown(extracted.html).trim();
    return {
      url: page.url(),
      title: extracted.title.replace(/\s+/g, " ").trim() || url,
      markdown: markdown || extracted.text || "",
      links: extracted.links,
    };
  } finally {
    await page.close();
  }
}

async function mirrorWebSource({ source, name, maxPages, workers, rateLimitSeconds }) {
  const browser = await launchChromiumBrowser();
  const context = await browser.newContext();
  const turndownService = await createTurndownService();
  const root = new URL(source);
  const scopePrefix = deriveCrawlScope(source);
  const initialUrl = normalizeUrl(source);
  const crawlQueue = [{ url: initialUrl, key: canonicalizeCrawlUrl(initialUrl) }];
  const seenKeys = new Set(crawlQueue.map((entry) => entry.key));
  const startedKeys = new Set();
  const mirroredPages = [];
  const pending = new Set();
  const rateLimitMs = Math.round(rateLimitSeconds * 1000);

  note(`Browser crawl enabled; mirroring rendered pages under ${scopePrefix}`);

  const startTask = (entry) => {
    startedKeys.add(entry.key);

    const task = crawlPage({ context, turndownService, url: entry.url })
      .then((pageData) => {
        mirroredPages.push({
          url: pageData.url,
          title: pageData.title,
          markdown: pageData.markdown,
        });

        for (const discoveredLink of pageData.links) {
          const normalized = normalizeUrl(discoveredLink);
          const dedupeKey = canonicalizeCrawlUrl(normalized);
          const parsed = new URL(normalized);
          if (!shouldFollowLink(parsed, root, scopePrefix)) {
            continue;
          }

          if (seenKeys.has(dedupeKey)) {
            continue;
          }

          seenKeys.add(dedupeKey);
          crawlQueue.push({ url: normalized, key: dedupeKey });
        }

        console.error(`  ${pageData.url}`);
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : String(error);
        note(`Skipping ${entry.url}: ${message}`);
      })
      .finally(() => {
        pending.delete(task);
      });

    pending.add(task);
  };

  try {
    while (crawlQueue.length > 0 || pending.size > 0) {
      while (crawlQueue.length > 0 && pending.size < workers) {
        if (Number.isFinite(maxPages) && maxPages > 0 && startedKeys.size >= maxPages) {
          crawlQueue.length = 0;
          break;
        }

        const nextEntry = crawlQueue.shift();
        if (!nextEntry || startedKeys.has(nextEntry.key)) {
          continue;
        }

        startTask(nextEntry);
        await delay(rateLimitMs);
      }

      if (pending.size === 0) {
        break;
      }

      await Promise.race(pending);
    }

    await Promise.all(pending);
  } finally {
    await context.close();
    await browser.close();
  }

  if (mirroredPages.length === 0) {
    die(`Browser crawl found no pages for ${source}`);
  }

  mirroredPages.sort((left, right) => left.url.localeCompare(right.url));

  const mirrorRoot = await mkdtemp(path.join(os.tmpdir(), `${name}-skillseeker-`));
  const mirrorSourceDir = path.join(mirrorRoot, "source");
  await mkdir(mirrorSourceDir, { recursive: true });

  const usedNames = new Set(["index.md"]);
  for (const mirroredPage of mirroredPages) {
    mirroredPage.fileName = uniqueFileName(mirroredPage.url, usedNames);
    await writeFile(path.join(mirrorSourceDir, mirroredPage.fileName), renderMirroredPage(mirroredPage), "utf8");
  }

  await writeFile(path.join(mirrorSourceDir, "index.md"), renderMirroredIndex(mirroredPages, source, scopePrefix), "utf8");
  note(`Mirrored ${mirroredPages.length} pages into ${mirrorSourceDir}`);

  return {
    cleanupDir: mirrorRoot,
    sourceDir: mirrorSourceDir,
    pageCount: mirroredPages.length,
  };
}

function parseCli(argv) {
  const separatorIndex = argv.indexOf("--");
  const parseableArgs = separatorIndex === -1 ? argv : argv.slice(0, separatorIndex);
  const passthroughArgs = separatorIndex === -1 ? [] : argv.slice(separatorIndex + 1);

  let parsed;
  try {
    parsed = parseArgs({
      args: parseableArgs,
      allowPositionals: true,
      strict: true,
      options: {
        agent: { type: "string" },
        model: { type: "string" },
        name: { type: "string" },
        "output-root": { type: "string" },
        "doc-version": { type: "string" },
        "max-pages": { type: "string" },
        workers: { type: "string" },
        "rate-limit": { type: "string" },
        "chunk-tokens": { type: "string" },
        "chunk-overlap": { type: "string" },
        browser: { type: "boolean" },
        "skip-cleanup": { type: "boolean" },
        "skip-quality": { type: "boolean" },
        help: { type: "boolean", short: "h" },
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    die(message);
  }

  const positionals = [...parsed.positionals];
  const source = positionals.shift() || "";
  const extraCreateArgs = [...positionals, ...passthroughArgs];

  return {
    source,
    extraCreateArgs,
    help: Boolean(parsed.values.help),
    agent: parsed.values.agent ?? "auto",
    model: parsed.values.model ?? "gpt-5.4",
    name: parsed.values.name ?? "",
    outputRoot: parsed.values["output-root"] ?? "./output",
    docVersion: parsed.values["doc-version"] ?? "",
    maxPages: parsed.values["max-pages"] ? parseIntegerOption("--max-pages", parsed.values["max-pages"]) : null,
    workers: parsed.values.workers ? parseIntegerOption("--workers", parsed.values.workers) : 6,
    rateLimit: parsed.values["rate-limit"] ? parseFloatOption("--rate-limit", parsed.values["rate-limit"]) : 0.2,
    chunkTokens: parsed.values["chunk-tokens"] ? parseIntegerOption("--chunk-tokens", parsed.values["chunk-tokens"]) : 700,
    chunkOverlap: parsed.values["chunk-overlap"] ? parseIntegerOption("--chunk-overlap", parsed.values["chunk-overlap"], { min: 0 }) : 80,
    browser: Boolean(parsed.values.browser),
    skipCleanup: Boolean(parsed.values["skip-cleanup"]),
    skipQuality: Boolean(parsed.values["skip-quality"]),
  };
}

const cli = parseCli(Bun.argv.slice(2));

if (cli.help) {
  usage();
  process.exit(0);
}

requireCmd("uvx");

if (!cli.source) {
  die("Missing source. Pass a local path or docs URL.");
}

const cwd = process.cwd();
const skillName = cli.name || deriveName(cli.source);
if (!skillName) {
  die("Could not derive a skill name; pass --name explicitly");
}

const sourceMetadata = defaultSourceMetadata(cli.source);
const outputRoot = path.resolve(cwd, cli.outputRoot);
const outputDir = path.join(outputRoot, skillName);
const finalDir = path.resolve(cwd, "skills", skillName);

if (await pathExists(finalDir)) {
  die(`Final skill directory already exists: ${finalDir}`);
}

await mkdir(outputRoot, { recursive: true });

let createSource = cli.source;
let mirrorCleanupDir = null;

if (isWebSource(cli.source) && cli.browser) {
  const mirrored = await mirrorWebSource({
    source: cli.source,
    name: skillName,
    maxPages: cli.maxPages ?? Number.POSITIVE_INFINITY,
    workers: cli.workers,
    rateLimitSeconds: cli.rateLimit,
  });

  createSource = mirrored.sourceDir;
  mirrorCleanupDir = mirrored.cleanupDir;
}

const createCmd = [
  "uvx",
  "--from",
  "skill-seekers",
  "skill-seekers",
  "create",
  createSource,
  "--name",
  skillName,
  "--output",
  outputDir,
  "--preset",
  "comprehensive",
  "--enhance-level",
  "0",
  "--chunk-for-rag",
  "--chunk-tokens",
  String(cli.chunkTokens),
  "--chunk-overlap-tokens",
  String(cli.chunkOverlap),
];

if (cli.docVersion && createSource === cli.source) {
  createCmd.push("--doc-version", cli.docVersion);
}

if (isWebSource(cli.source) && !cli.browser) {
  createCmd.push("--async", "--workers", String(cli.workers), "--rate-limit", String(cli.rateLimit));
  if (cli.maxPages) {
    createCmd.push("--max-pages", String(cli.maxPages));
  }
}

if (cli.extraCreateArgs.length > 0) {
  createCmd.push(...cli.extraCreateArgs);
}

note(`Generating skill into ${outputDir}`);
try {
  await runCommand(createCmd, { cwd });
} finally {
  if (mirrorCleanupDir) {
    await rm(mirrorCleanupDir, { recursive: true, force: true });
  }
}

const actualOutputDir = await resolveOutputDir(outputDir, skillName, cwd);
if (!actualOutputDir) {
  die(`Skill Seekers finished but output directory was not found: ${outputDir}`);
}

let resolvedOutputDir = actualOutputDir;
if (actualOutputDir !== outputDir) {
  note(`Skill Seekers wrote to ${actualOutputDir} instead of requested ${outputDir}`);
}

const skillFile = path.join(resolvedOutputDir, "SKILL.md");
if (!(await pathExists(skillFile))) {
  die(`Expected generated SKILL.md at ${skillFile}`);
}

const beforeText = await readFile(skillFile, "utf8");
const beforeLines = beforeText.split(/\r?\n/).length;
const beforeBytes = Buffer.byteLength(beforeText, "utf8");

if (!cli.skipCleanup) {
  let agent = cli.agent;
  if (agent === "auto") {
    agent = await detectAgent();
    if (!agent) {
      die("No cleanup agent found. Install opencode or codex, or use --skip-cleanup");
    }
  }

  if (!["opencode", "codex"].includes(agent)) {
    die(`Unsupported agent: ${agent} (expected: auto, opencode, codex)`);
  }

  requireCmd(agent);

  const tmpDir = await mkdtemp(path.join(os.tmpdir(), `${skillName}-cleanup-`));
  const promptFile = path.join(tmpDir, "cleanup-prompt.txt");
  await writeFile(
    promptFile,
    buildCleanupPrompt({
      skillDir: resolvedOutputDir,
      skillName,
      sourceMetadata,
    }),
    "utf8",
  );

  note(`Running cleanup pass with ${agent} on model ${cli.model}`);

  try {
    if (agent === "opencode") {
      const model = cli.model.includes("/") ? cli.model : `openai/${cli.model}`;
      await runCommand(
        [
          "opencode",
          "run",
          "--dir",
          resolvedOutputDir,
          "--model",
          model,
          "--dangerously-skip-permissions",
          "--file",
          promptFile,
          "--",
          "Use the attached file as the task instructions. Edit only files in the current directory and stop when the skill is concise, correct, repo-ready, and thorough enough to preserve coverage.",
        ],
        { cwd },
      );
    } else {
      await runCommand(
        [
          "codex",
          "exec",
          "--cd",
          resolvedOutputDir,
          "--model",
          cli.model,
          "--full-auto",
          "--skip-git-repo-check",
          "--color",
          "never",
        ],
        {
          cwd,
          stdin: Bun.file(promptFile),
          stdinPath: promptFile,
        },
      );
    }
  } finally {
    await rm(tmpDir, { recursive: true, force: true });
  }
}

await ensureRequiredFrontmatter(skillFile, skillName, cli.source);

const afterText = await readFile(skillFile, "utf8");
const afterLines = afterText.split(/\r?\n/).length;
const afterBytes = Buffer.byteLength(afterText, "utf8");

note(`SKILL.md lines: ${beforeLines} -> ${afterLines}`);
note(`SKILL.md bytes: ${beforeBytes} -> ${afterBytes}`);

if (!cli.skipQuality) {
  note("Running Skill Seekers quality report");
  await runCommand(["uvx", "--from", "skill-seekers", "skill-seekers", "quality", resolvedOutputDir, "--report"], { cwd });
}

note("Pruning generated artifacts");
await pruneGeneratedArtifacts(resolvedOutputDir);

note(`Moving finished skill into repo skills/: ${finalDir}`);
await moveFinishedSkill(resolvedOutputDir, finalDir);

note(`Done. Generated skill: ${finalDir}`);
