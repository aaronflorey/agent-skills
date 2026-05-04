---
name: skill-scout
description: Analyze the active project, identify high-value technologies, research compatible agent skills, and create or update a project-scoped kasetto.yaml. Use when asked to scout, recommend, install, update, or manage project-specific agent skills with kasetto, kst, or kasetto.yaml.
version: 1.1.0
source: local
license: MIT
---

# Skill Scout

Build or update a project-specific `kasetto.yaml` for the repository the agent is currently working in.

The target is the user's active project root, not the repository that distributed this skill.

## Operating Principles

- Prefer evidence over guesses.
- Prefer a small set of high-impact skills over a large generic bundle.
- Prefer official, maintained, popular, and source-auditable skills.
- Treat marketplaces as discovery surfaces, not automatic trust authorities.
- Only write Kasetto-compatible Git or local sources.
- Never run a real sync/install unless the user explicitly asks.

## Sub-Agent Strategy

Use sub-agents when the host agent supports them. If sub-agents are unavailable, perform the same roles sequentially.

Recommended roles:

| Role                | Purpose                                                               | Output                                                          |
| ------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------- |
| `project-inventory` | Inspect the active project and identify verified technologies         | Technology inventory with evidence paths                        |
| `skill-researcher`  | Research skills for P0/P1 technologies using online and local sources | Candidate matrix with source URLs, evidence, and recommendation |
| `kasetto-planner`   | Convert approved candidates into a minimal `kasetto.yaml` patch       | Proposed YAML changes and duplicate/conflict notes              |
| `validator`         | Run safe validation commands only                                     | Dry-run result and warnings                                     |

Use sub-agents for discovery and research because these tasks are parallelizable. Keep final YAML editing in the main agent unless the host agent has reliable patch isolation.

## Required References

Read these before editing config:

| Task                                 | Read                              |
| ------------------------------------ | --------------------------------- |
| `brief --json` discovery             | `references/brief-discovery.md`   |
| Project detection and prioritization | `references/scouting-workflow.md` |
| Mandatory online skill research      | `references/online-research.md`   |
| Kasetto config rules and examples    | `references/kasetto-config.md`    |

## Workflow

### 1. Confirm Target Project

Determine the active project root.

Use, in order:

1. `git rev-parse --show-toplevel`
2. current working directory if not in a Git repo
3. user-provided path, if explicitly given

Before writing files, state the target project root in the working notes or final response.

Do not analyze the skill repository itself unless it is the active project where the command was invoked.

### 2. Build Project Inventory

Run `brief --json` when available:

```bash
command -v brief >/dev/null && brief --json
````

Treat `brief --json` as discovery evidence only. Verify high-value findings against direct evidence:

* manifests: `package.json`, `composer.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `Gemfile`, `mix.exs`
* framework config: `vite.config.*`, `nuxt.config.*`, `next.config.*`, `tailwind.config.*`, `terraform/**/*.tf`, `wrangler.toml`, `sst.config.*`
* source imports/usages
* CI/deployment config
* lockfiles only when needed to confirm package versions or ecosystem shape

Capture each detected technology as:

```yaml
technology: Laravel
priority: P0
evidence:
  - composer.json: require.laravel/framework
  - artisan
reason: Primary application framework.
```

### 3. Prioritize Technologies

Use this priority model:

| Priority | Meaning                                                                         | Action                                |
| -------- | ------------------------------------------------------------------------------- | ------------------------------------- |
| P0       | Primary framework/runtime/platform that shapes most implementation work         | Must research skills                  |
| P1       | Major package, UI system, infra platform, testing stack, or deployment platform | Must research skills                  |
| P2       | Useful but secondary library/tooling                                            | Research only if obvious skill exists |
| P3       | Minor, transitive, incidental, or low-impact                                    | Ignore unless user asked              |

High-value signals include:

* Application frameworks: Laravel, Nuxt, Vue, React, Next.js, SvelteKit, Rails, Django, FastAPI, Phoenix, Tauri, Electron
* CLI frameworks: Cobra, Viper, Clap, Typer, Click
* UI/design systems: Tailwind, shadcn/ui, Radix, Chakra, MUI, SwiftUI, Jetpack Compose, Flutter, Storybook, Figma workflows
* Developer platforms: Cloudflare Workers/Pages/D1/R2/KV/Queues, Vercel, Netlify, Supabase, Firebase, AWS CDK/SST, Terraform, Pulumi
* Major ecosystems: Charmbracelet, macOS/iOS Swift, Laravel packages, Nuxt modules, VueUse, Vite, Bun, GoReleaser, release-please

Add Taste Skill as a candidate when the project includes frontend, product UI, marketing UI, mobile UI, visual redesign, Storybook, Figma-adjacent workflows, or design-system work. Still verify that a usable Kasetto source exists before adding it.

### 4. Research Skills

Research online before selecting skills for every P0/P1 technology.

Use at least two external discovery sources per P0/P1 technology when network/search tools are available:

* LobeHub Skills Marketplace
* `npx -y @lobehub/market-cli skills search --q "<technology>" --sort installCount --order desc --output json`
* `VoltAgent/awesome-agent-skills`
* official vendor/team repositories containing `SKILL.md`
* GitHub search for `SKILL.md` plus the technology name
* trusted local skills already installed in agent skill directories

Local installed skills are candidates, not the complete search space.

For each candidate, capture:

```yaml
name:
technology:
source_url:
kasetto_source:
source_type: git | local | marketplace-only | unknown
evidence:
trust:
maintenance:
fit:
decision: add | defer | reject
reason:
```

Reject or defer candidates when:

* no Git or local source can be identified
* the source is paid, opaque, private, provenance-free, or unaudited
* the skill is generic and overlaps with a more specific trusted skill
* the repository appears abandoned or low-quality
* the skill does not clearly match a verified P0/P1 technology

If online search is unavailable, do not silently produce a local-only config. Report the limitation and ask before continuing with local-only recommendations, unless the user explicitly allowed offline mode.

## Optional Discovery Tools

Use these tools when available. Do not fail the scout if they are missing.

| Tool                  | Use                                                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `rg`                  | Fast source search and fallback discovery                                                                               |
| `fd`                  | Fast manifest/config discovery                                                                                          |
| `jq`                  | Parse `brief --json`, `package.json`, lockfile metadata, and tool output                                                |
| `yq`                  | Inspect or validate YAML config, including `kasetto.yaml`                                                               |
| `ast-grep` / `sg`     | Structural verification of framework APIs, imports, routes, components, hooks, decorators, service providers, and tests |
| Sourcegraph `src` CLI | Large repo, monorepo, or cross-repo search when Sourcegraph is configured                                               |
| `repomix`             | Create compact AI-readable project context for sub-agents on large or complex repos                                     |
| `semgrep`             | Targeted static-analysis signals for security, framework usage, and coding-standard skill needs                         |

Tool rules:

- Treat all tool output as evidence, not final truth.
- Prefer direct manifests and framework config over broad source matches.
- Prefer `ast-grep` over regex for structural source checks when available.
- Use Sourcegraph only when configured for the active repo or organization.
- Use `repomix` to support summarization, not as a substitute for direct verification.
- Avoid expensive full-repo scans unless the project is small or the user asked for deep scouting.

### 5. Plan Kasetto Changes

Read existing `kasetto.yaml` if present.

Preserve:

* valid existing skills
* `agent`
* `destination`
* `scope`
* `mcps`
* comments where practical
* existing source grouping

Default shape:

```yaml
agent: opencode
scope: project

skills:
  - source: https://github.com/example/skill-pack
    skills:
      - framework-skill
```

If the existing config uses several agents, preserve that style:

```yaml
agent:
  - opencode
  - claude-code
  - codex
scope: project
```

Rules:

* Do not duplicate source blocks.
* Do not duplicate skill names within a source block.
* Group skills by source.
* Prefer project scope unless user or existing config requires otherwise.
* Add comments only when they clarify provenance or deferred manual review.
* Do not include marketplace-only URLs unless Kasetto can sync them.
* Do not run `kst sync` without `--dry-run`.

### 6. Validate

Run safe validation only.

When `kst` is available:

```bash
kst sync --config kasetto.yaml --dry-run
```

If unavailable:

```bash
command -v kst || true
```

Report whether validation passed, failed, or was skipped.

Do not run a real sync/install unless the user explicitly approves.

## Final Response

Report:

* target project root
* detected P0/P1 technologies with evidence paths
* skills added to `kasetto.yaml`, grouped by source
* strong candidates rejected or deferred, with reasons
* validation result from `kst sync --config kasetto.yaml --dry-run`, or why it was not run
* any assumptions or limitations, especially network/search limitations