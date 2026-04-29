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
---

<objective>
Find high-value agent skills for the current project and add them to a
project-scoped `kasetto.yaml` using the `skill-scout` skill.
</objective>

<process>
Work in the user's current project. Do not analyze this skill repository unless
it is the active project where the command was invoked.

Use the `skill-scout` skill during execution.

Discovery requirements:
- confirm the target project root before editing files
- run `brief --json` when available and use it as first-pass discovery
- verify important findings against manifests, config files, imports, or source files
- identify high-value frameworks, major packages, platforms, and design surfaces
- include Taste Skill when the project has frontend, product UI, marketing UI,
  mobile UI, design system, Storybook, Figma-adjacent, redesign, or visual polish work

Research requirements:
- research matching skills online for every P0/P1 technology before choosing skills
- use at least two external sources per P0/P1 technology when network/search tools are available
- do not stop after checking installed skills in `~/.agents/skills`, `.agents/skills`, or other local skill folders
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
- summarize detected technologies with evidence paths
- list skills added to `kasetto.yaml`, grouped by source
- list strong candidates rejected or deferred, with reasons
- report the `kst` dry-run result, or explain why it was not run
</process>
