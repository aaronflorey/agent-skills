---
name: cli
description: Route terminal work to the narrowest CLI instead of generic shell patterns. Use this skill when the user asks to search with `rg` or `fd`, rewrite text with `sd`, `comby`, or `ast-grep`, inspect output with `head` or `less`, fetch files with `wget`, transform JSON or YAML with `jq` or `yq`, pick items with `fzf`, compare code with `difftastic`, lint shell with `shellcheck`, or measure a repo with `scc`.
version: 1.0.0
source: local
license: MIT
---

# CLI Router

Route the task to the narrowest tool that matches the job. Keep this file small; read `references/` only for the tool you need.

## Choose The Tool

| Tool | Use it for | Avoid when | Reference |
|---|---|---|---|
| `fd` | Fast file and path discovery | You need content matches inside files | `references/fd.md` |
| `rg` | Fast text search across files | You need structural or syntax-aware matching | `references/ripgrep.md` |
| `sd` | Simple literal or regex replacement | The change depends on code structure or multiline context beyond regex comfort | `references/sd.md` |
| `comby` | Lightweight structural rewrites across languages | You need full syntax parsing guarantees | `references/comby.md` |
| `ast-grep` | AST-aware code search, lint, and rewrite | You need type-aware or semantic analysis | `references/ast-grep.md` |
| `jq` | Query and transform JSON | The source is YAML-first | `references/jq.md` |
| `yq` | Query and edit YAML, convert structured formats | You need exact comment preservation or full `jq` parity assumptions | `references/yq.md` |
| `wget` | Non-interactive download, retry, resume, mirror | You need browser automation or interactive login flows | `references/wget.md` |
| `head` | Quick non-interactive sampling | You need interactive search, paging, or follow mode | `references/head.md` |
| `less` | Interactive paging, search, and follow | The flow must stay unattended | `references/less.md` |
| `fzf` | Interactive fuzzy selection for humans | The agent must run headless or deterministically | `references/fzf.md` |
| `difftastic` | Syntax-aware diffs for human review | You need an applicable patch or machine-stable diff format | `references/difftastic.md` |
| `shellcheck` | Shell linting and safety checks | You need formatting rather than diagnostics | `references/shellcheck.md` |
| `scc` | Repo language inventory, LOC, and rough complexity | You need semantic code review or profiling | `references/scc.md` |

## Escalate Deliberately

- Use `fd` for paths, then `rg` for text.
- Use `sd` for simple replacements, `comby` when regex gets brittle, and `ast-grep` when syntax precision matters.
- Use `jq` for JSON and `yq` for YAML-first edits or format conversion.
- Use `head` for quick samples; switch to `less` only when a human needs to page or search.
- Treat `fzf`, `less`, and `difftastic` as human-oriented tools unless the task explicitly benefits from interactive review.

## Load More Detail Only When Needed

- Read `references/api-surface.md` for command/flag selection across the toolset.
- Read `references/common-use-cases.md` for ready-made task patterns.
- Read `references/troubleshooting-workarounds.md` for common failure modes.
- Read the tool-specific reference for examples, sharp edges, and escalation boundaries.
