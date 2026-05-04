---
description: Analyze the current project with Skill Scout and create or update kasetto.yaml with high-value agent skills.
tools:
  read: true
  bash: true
  grep: true
  glob: true
  write: true
  edit: true
  skill: true
  websearch: true
  webfetch: true
  question: true
  subagent: true
---

<objective>
Find high-value agent skills for the active project and create or update a project-scoped `kasetto.yaml` using the `skill-scout` skill.
</objective>

<context>
The target project is the user's current working project, not the repository that contains this command or the `skill-scout` skill.
</context>

<process>
Use the `skill-scout` skill during execution.

If sub-agents are supported, split the work into these roles:

1. `project-inventory`
   - Determine the target project root.
   - Run `brief --json` when available.
   - Inspect manifests, config files, imports, CI, and deployment files.
   - Return verified P0/P1/P2 technologies with evidence paths.

2. `skill-researcher`
   - For every P0/P1 technology, research matching skills online.
   - Use at least two external sources per P0/P1 technology when network/search is available.
   - Include local installed skills as candidate sources, not as the full search space.
   - Return a candidate matrix with source URL, Kasetto sync source, trust evidence, fit, and decision.

3. `kasetto-planner`
   - Read any existing `kasetto.yaml`.
   - Produce a minimal merge plan.
   - Preserve existing valid `agent`, `destination`, `scope`, `mcps`, comments, and source entries.
   - Avoid duplicate source blocks and duplicate skill entries.

4. `validator`
   - After the main agent writes the config, run `kst sync --config kasetto.yaml --dry-run` if `kst` is available.
   - Do not run a real sync.

If sub-agents are unavailable, perform the same stages sequentially.

Discovery requirements:
- confirm the target project root before editing files
- run `brief --json` when available and use it as first-pass discovery only
- verify important findings against manifests, config files, imports, source files, CI, or deployment files
- identify high-value frameworks, major packages, platforms, and design surfaces
- include Taste Skill as a candidate when the project has frontend, product UI, marketing UI, mobile UI, design system, Storybook, Figma-adjacent, redesign, or visual polish work

Research requirements:
- research matching skills online for every P0/P1 technology before choosing skills
- use at least two external sources per P0/P1 technology when network/search tools are available
- do not stop after checking installed skills in `~/.agents/skills`, `.agents/skills`, `.claude/skills`, `.codex/skills`, or other local skill folders
- treat local installed skills as one candidate source, not as the complete search space
- prefer official, trusted, maintained, or already-known skill repositories
- only add skills with a Git or local source that Kasetto can sync
- defer marketplace-only, opaque, paid, private, or unaudited candidates unless the user approves
- if online search is unavailable, say so explicitly and ask before producing a local-only recommendation
- record why each selected skill was added and why notable candidates were deferred

Kasetto requirements:
- create or update `kasetto.yaml` in the target project root
- prefer `scope: project` unless an existing config or user request requires otherwise
- preserve existing valid `agent`, `destination`, `scope`, `mcps`, comments, and source entries
- do not duplicate source blocks or skill entries
- do not run a real `kst sync` unless the user explicitly approves
- run `kst sync --config kasetto.yaml --dry-run` when `kst` is available

Final response requirements:
- summarize target project root
- summarize detected P0/P1 technologies with evidence paths
- list skills added to `kasetto.yaml`, grouped by source
- list strong candidates rejected or deferred, with reasons
- report the `kst` dry-run result, or explain why it was not run

Optional tool probes:
- Check for `brief`, `rg`, `fd`, `jq`, `yq`, `sg`, `ast-grep`, `src`, `repomix`, `semgrep`, and `kst`.
- Use available tools opportunistically.
- Do not require any optional tool except normal read/bash/grep/glob access.
- If `src` is available and configured, use it for large-repo or cross-repo discovery.
- If `sg` or `ast-grep` is available, use it to verify structural source usage for P0/P1 technologies.
- If `repomix` is available and the repo is large or ambiguous, generate a compact context artifact for sub-agent handoff.
- If `semgrep` is available, use targeted scans only when security, framework usage, or coding-standard skills are relevant.
</process>