---
name: skill-scout
description: Analyze the current target project, identify high-value frameworks and major dependencies, research popular agent skills for that stack, and write or update a Kasetto config. Use when asked to scout, recommend, install, or manage project-specific agent skills with kasetto, kst, or kasetto.yaml.
version: 1.0.0
source: local
license: MIT
---

# Skill Scout

Use this skill to build a project-specific `kasetto.yaml` for the repository the
agent is currently working in. The target is the active user project, not the
repository that originally distributed this skill.

## Workflow

1. Confirm the target project root.
2. Inspect manifests and config files to identify high-value technologies.
3. Rank frameworks, major packages, platforms, and design systems by impact.
4. Research matching skills from marketplaces, curated catalogs, official repos,
   and GitHub skill repositories.
5. Add Taste Skill for projects with frontend, product UI, marketing UI, design
   systems, mobile UI, or visual redesign work.
6. Write or update `kasetto.yaml` with only verified Kasetto-compatible sources.
7. Run `kst sync --config kasetto.yaml --dry-run` when `kst` is available.

Read these references before editing config:

| Task | Read |
|---|---|
| Project detection and prioritization | `references/scouting-workflow.md` |
| Kasetto config rules and examples | `references/kasetto-config.md` |

## Discovery Rules

- Treat direct dependencies, framework config files, and runtime platform config
  as stronger evidence than filenames or transitive lockfile entries.
- Prefer official, highly adopted, recently maintained, or already-trusted skill
  repositories over anonymous marketplace entries.
- Do not add a skill unless you can identify a Git or local source that Kasetto
  can sync.
- Do not add paid, opaque, unaudited, or provenance-free marketplace skills to
  `kasetto.yaml` without asking the user first.
- Do not install or sync new skills until the generated config has been shown or
  dry-run successfully.

## High-Value Signals

Prioritize these findings when present:

- Application frameworks: Laravel, Nuxt, Vue, React, Next.js, SvelteKit,
  Rails, Django, FastAPI, Phoenix, Tauri, Electron.
- CLI frameworks: `github.com/spf13/cobra`, `github.com/spf13/viper`, Clap,
  Typer, Click.
- UI/design systems: Tailwind, shadcn/ui, Radix, Chakra, MUI, SwiftUI,
  Jetpack Compose, Flutter, Storybook, Figma workflows.
- Developer platforms: Cloudflare Workers/Pages/D1/R2/KV/Queues, Vercel,
  Netlify, Supabase, Firebase, AWS CDK/SST, Terraform, Pulumi.
- Major ecosystems: Charmbracelet, macOS/iOS Swift, Laravel packages, Nuxt
  modules, VueUse, Vite, Bun, GoReleaser, release-please.

## Marketplace Research

Use multiple sources when possible:

- LobeHub Skills Marketplace:
  `npx -y @lobehub/market-cli skills search --q "<technology>" --sort installCount --order desc --output json`
- Curated catalogs such as `VoltAgent/awesome-agent-skills` or other current
  agent skill indexes.
- Official vendor/team repositories that contain `SKILL.md` files.
- GitHub code search for `SKILL.md` plus the framework/package name.
- Existing local skills already visible to the agent.

For each candidate, capture the source URL, skill name, matched technology,
evidence, and reason it should or should not be added.

## Kasetto Output Contract

When changing `kasetto.yaml`, preserve existing valid entries and append new
skills by source. Use this shape unless the project already has a stronger
convention:

```yaml
agent: opencode
scope: project

skills:
  - source: https://github.com/example/skill-pack
    skills:
      - framework-skill
```

If the user works across several agents, use a list:

```yaml
agent:
  - opencode
  - claude-code
  - codex
scope: project
```

## Final Response

Report:

- Technologies detected, with evidence paths.
- Skills added to `kasetto.yaml`, grouped by source.
- Strong candidates rejected or deferred, with reasons.
- Validation result from `kst sync --dry-run`, or why it was not run.
