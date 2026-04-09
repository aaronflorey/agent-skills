---
name: lefthook
description: Write, debug, and explain Lefthook configuration for Git hooks. Use this skill when the user wants to set up `lefthook.yml`, install or validate hooks, route checks by staged or pushed files, use `jobs`/`commands`/`scripts`, add local overrides, or troubleshoot hook execution.
version: 1.0.0
source: https://lefthook.dev/
license: MIT
---

# Lefthook

Use this skill to configure fast, maintainable Git hooks with Lefthook.

## Start Here

- Match install instructions to the project ecosystem: npm, Go, Ruby, Python, Homebrew, or standalone binary.
- Prefer `jobs` for new configs; `commands` and `scripts` are still valid and common.
- Keep hooks fast and file-scoped with `{staged_files}`, `{push_files}`, `glob`, `file_types`, and `root`.
- Run `lefthook validate` for syntax checks and `lefthook dump` when debugging merged config.
- Remember: `lefthook install` is usually one-time setup; config changes are read on each hook execution.

## Fast Routing

| Need | Read |
|---|---|
| Install and official docs map | `references/official-docs.md` |
| CLI, config model, templates, merge order | `references/api-surface.md` |
| Common real-world patterns | `references/common-use-cases.md` |
| Why a hook is skipped or behaving oddly | `references/troubleshooting-workarounds.md` |
| Ready-to-copy configs | `examples/basic-lefthook.yml`, `examples/monorepo-jobs.yml`, `examples/commit-message.yml`, `examples/lefthook-local.yml` |
| Bad patterns and fixes | `examples/anti-patterns.md` |

## Recommended Workflow

1. Inspect existing package scripts, linters, test commands, and current Git hook tooling.
2. Choose the smallest useful hook surface: usually `pre-commit`, `commit-msg`, and `pre-push`.
3. Pick `jobs`, `commands`, or `scripts` based on whether you need grouping, named merges, or external executables.
4. Scope work to changed files unless the check truly needs the whole repository.
5. Add `lefthook-local.yml`, `extends`, or `remotes` only when you need local overrides or shared policy.

## Core Rules

- Prefer deterministic, non-interactive hooks unless the workflow explicitly requires prompts.
- Use `stage_fixed: true` only for `pre-commit` fixers that modify staged files.
- Remember that `glob` is evaluated from the Git repo root, even when `root` changes the working directory.
- Use `LEFTHOOK=0` for tools that would otherwise recurse back into Git hooks.
- Use `lefthook run <hook>` to debug a hook directly before testing the full Git flow.

## External Docs

- Docs: https://lefthook.dev/
- GitHub: https://github.com/evilmartians/lefthook
