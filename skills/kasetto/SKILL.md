---
name: kasetto
description: Use this skill when you need to install, configure, sync, inspect, or troubleshoot Kasetto, including `kst` commands, config files, multi-agent skill installs, MCP integration, private git-host auth, and upgrade-specific behavior.
version: 1.0.0
source: https://github.com/pivoshenko/kasetto
license: MIT OR Apache-2.0
---

# kasetto

Kasetto is a declarative AI agent environment manager for syncing skills and MCP configs across one or many supported agents.

## Use This Skill When

- You need the right `kst` command, flag, or config shape for install, sync, inspection, cleanup, upgrade, uninstall, or completions.
- You need to create or debug a `kasetto.yaml` config for skills or MCP sources.
- You need to target agent presets such as Codex, Cursor, Claude Code, OpenCode, Copilot, Gemini CLI, or Windsurf.
- You need to understand non-interactive output, auth for private git hosts, or version-specific behavior.

## Working Approach

- First identify the task type: install/setup, config authoring, sync/list/doctor/clean, MCP integration, auth, or upgrade behavior.
- Read only the relevant reference file instead of loading everything.
- Prefer exact upstream command syntax and the smallest config that solves the user's case.
- For automation or CI, prefer documented non-interactive options such as `--json`, `--plain`, `NO_TUI=1`, and `--dry-run` when appropriate.
- Call out destructive commands like `kst clean` and `kst self uninstall` before recommending them.
- Start from bundled examples when the user needs a config snippet or a quick command sequence.

## References

- `references/getting-started.md`: install methods, first sync, minimal config, scopes
- `references/core-patterns.md`: config model, source patterns, agent presets
- `references/api-reference.md`: commands, flags, config keys
- `references/testing-debugging.md`: dry-run, JSON, plain output, diagnostics
- `references/integrations-plugins.md`: MCP support, agent integrations, private host auth
- `references/upgrades.md`: feature-by-version lookup
- `references/issues.md`: current issue snapshots
- `references/file_structure.md`: upstream repo layout

## Examples

- `examples/common-commands.md`: quick command sequences for setup, inspection, and cleanup
- `examples/minimal-config.yaml`: smallest working skill sync config
- `examples/multi-source-config.yaml`: mixed skill and MCP config with pinned refs and explicit paths
