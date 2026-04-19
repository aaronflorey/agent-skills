---
name: skill-researcher
description: >
  Research and recommend the best available skill for the current codebase or working directory.
  Use this whenever the user is working inside an existing project and asks what skill to use,
  which skill fits the repo, how to choose between skills, or before doing substantial work in a
  codebase that may benefit from a specialized skill. Start with a quick repo summary from the
  `brief` CLI when available, then inspect the project's high-signal files, major packages,
  languages, frameworks, SDKs, and config files. Search installed, locally synced, or otherwise
  available skills for the strongest match. Prefer one best-fit skill with evidence from the repo,
  plus 1-2 runner-ups only when overlap is real. Also trigger when the repo contains obvious
  markers like package.json, pyproject.toml, Cargo.toml, go.mod, Gemfile, pom.xml, framework
  configs, or imports for major ecosystems such as React, Next.js, TypeScript, Python, FastAPI,
  Django, MCP, or the Anthropic SDK.
version: 1.0.0
source: local
license: MIT
---

# Skill Researcher

Your job is to identify which skill is most useful for the project **before** diving into implementation.

## Outcome
Produce a recommendation that is:
1. grounded in the actual repo
2. focused on the current task, not just the tech stack
3. honest about confidence
4. specific about why the chosen skill beats nearby alternatives

## Workflow

### 1) Scope the project correctly
Start from the user's real working scope.
- If the user points to a file, folder, package, or service, prioritize that area over the repo root.
- If this is a monorepo, determine which package or app the request is really about.
- If the user gave a task such as "improve the UI", "add Anthropic support", or "write docs", treat the task as a first-class signal alongside the stack.

Never recommend a skill from the repo root alone when the user is clearly working in a subproject.

### 2) Get a quick repo summary first
If the `brief` CLI is available, use it near the start to get a fast snapshot of the repository.

- Treat `brief` as an orientation tool, not as the final source of truth.
- Use it to spot likely apps, packages, frameworks, and docs before deeper inspection.
- Verify any important claims against actual files in the repo.

If `brief` is unavailable or low-signal for the current scope, skip it and inspect the repo directly.

### 3) Inspect high-signal files first
Prefer fast, read-only inspection. Start with the smallest set of files that gives a reliable picture.

Look for these first:
- `package.json`, `pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`
- `pyproject.toml`, `requirements*.txt`, `poetry.lock`, `uv.lock`
- `Cargo.toml`, `Cargo.lock`
- `go.mod`
- `Gemfile`, `Gemfile.lock`
- `pom.xml`, `build.gradle`, `settings.gradle`
- `*.csproj`, `Directory.Build.props`
- `Dockerfile`, `docker-compose.yml`
- `Makefile`, `justfile`, `Taskfile.yml`
- `tsconfig.json`, `vite.config.*`, `next.config.*`, `nuxt.config.*`, `astro.config.*`, `svelte.config.*`, `angular.json`
- framework entry points such as `manage.py`, `asgi.py`, `wsgi.py`, `main.py`, `app.py`, `src/main.*`
- `README*`, `docs/`, CI workflows, and top-level architecture notes

Read more only when the project appears mixed or ambiguous.

### 4) Infer the dominant stack
Summarize only major signals:
- primary language(s)
- primary runtime or framework
- central SDKs or platforms
- testing, build, or deployment tools when they clearly shape the workflow
- special domains such as frontend design, documentation, PDFs, AI integration, MCP, security review, or data workflows

Use these rules:
- framework beats utility library
- app-defining config beats one incidental import
- repeated evidence beats a single mention
- lockfiles prove presence; config files and entry points prove centrality
- ignore transitive or incidental packages unless they directly drive the user's task

Good major-signal examples:
- `next`, `react`, `vite`, `astro`
- `fastapi`, `django`, `flask`
- `@anthropic-ai/sdk`, `anthropic`
- MCP SDKs, MCP server structure, or MCP-specific docs
- docs/spec-heavy repo structure
- clear document/PDF processing workflows

Weak signals that usually should not drive the recommendation by themselves:
- `lodash`, `chalk`, `requests`, `axios`, `date-fns`, `zod` unless the current task is specifically about them

### 5) Search for candidate skills
Search available skills using both exact stack terms and task-oriented terms.

Search in this order:
1. locally installed or user-provided skills
2. locally synced skills managed by Kasetto when that workflow exists
3. official or default skill collections available in the environment
4. broader skill sources the user expects you to consider

When Kasetto is in play:
- check `kasetto.yaml` or the relevant Kasetto config path to understand which skill sources are synced locally
- treat Kasetto as the local sync mechanism and use the Kasetto-managed copy as the local source of truth when relevant
- prefer the locally synced copy when the environment uses Kasetto for skill distribution
- mention Kasetto when it affects where the recommended skill should be loaded from or updated

Use multiple search patterns:
- exact framework: `Next.js skill`
- exact SDK or platform: `Anthropic SDK skill`, `MCP skill`
- task + framework: `frontend design React skill`, `documentation spec writing skill`
- ecosystem synonyms: `TypeScript UI skill`, `Python API skill`
- fallback category search when exact terms fail

Read the actual description of the top candidate skills before recommending one. Do not recommend from a skill name alone.

Do not invent skill names. If a search does not surface a real skill, say you did not find a strong specialized match.

### 6) Rank candidates
Choose the skill that best matches both:
- what the project is
- what the user is trying to do now

Use this ranking logic:
- **Strong match**: the skill description explicitly fits the task and the stack
- **Good match**: strong domain fit with compatible stack, even if not framework-specific
- **Fallback**: useful general skill, but not tightly aligned
- **No strong match**: no available skill clearly beats generic help

Prefer the narrowest skill that clearly fits. Do not choose a general language skill over a skill whose description directly matches the user's task.

When two skills overlap:
- pick one primary skill
- include the second as a runner-up
- explain the boundary between them

### 7) Return a concise recommendation
Always use this structure:

## Stack snapshot
- Scope:
- Languages:
- Frameworks/platforms:
- Major packages/SDKs:
- Current task:
- Confidence:

## Best skill
- Skill:
- Why it fits:
- Repo evidence:
- Why it beats nearby alternatives:

## Runner-ups
- Skill: reason it was close but not the best
- Skill: reason it was close but not the best

## Gaps or uncertainties
- Missing evidence or ambiguity that affected confidence

Keep this short and evidence-based. The goal is to help the agent or user move quickly into the right specialized workflow.

## Special cases

### Monorepos
Recommend per target package or app, not per repository brand.
A monorepo may justify one skill for `apps/web` and another for an `mcp-server` package.

### Multi-domain work
If the user's task crosses domains, choose the primary skill for the first blocking step.
For example, if the repo uses the Anthropic SDK and the user wants to improve the product UI, a frontend skill may be the primary recommendation for that request, while an Anthropic skill is only secondary context.

### No strong match
Say so plainly. Name the closest one or two options and why they are only partial fits.

### Trust and source quality
Prefer official or already-installed skills over loosely matched third-party skills unless the user explicitly wants community options.

## Practical heuristics
- Package manifests and framework config files are more informative than lockfiles alone.
- Entry-point imports can resolve ties when configs are ambiguous.
- README language can help identify the project's real purpose.
- The user's requested change outweighs background tech that is unrelated to the task.
- A repo can contain React without needing a frontend skill for a backend-only request.

## Examples

**Example 1: Anthropic integration**
Project signals:
- `package.json` includes `@anthropic-ai/sdk`
- source files import `Anthropic`
- task: `add prompt caching`

Recommendation:
- Primary: `claude-api`
- Why: the project and task are directly about Anthropic SDK usage

**Example 2: MCP server**
Project signals:
- MCP server structure or MCP SDK dependency
- task: `build a tool server for GitHub`

Recommendation:
- Primary: `mcp-builder`
- Why: the task is explicitly about building an MCP server

**Example 3: UI-heavy web app**
Project signals:
- `next.config.*`, `react`, `tailwindcss`
- task: `make the dashboard feel polished and less generic`

Recommendation:
- Primary: `frontend-design`
- Why: the user's job-to-be-done is interface quality, not generic TypeScript coding

**Example 4: Documentation-centered work**
Project signals:
- docs-heavy repo, ADRs, specs, or proposals
- task: `turn notes into a technical design doc`

Recommendation:
- Primary: `doc-coauthoring`
- Why: the task is structured documentation, even if the repo also contains code

## Avoid these mistakes
- Do not recommend based on a single flashy dependency.
- Do not list every package; summarize only the few that matter.
- Do not confuse the package manager with the framework.
- Do not ignore subdirectory scope in a monorepo.
- Do not pretend confidence is high when the repo evidence is thin.
- Do not force a specialized skill when no clear match exists.
