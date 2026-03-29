# Sources

## Scope

This skill routes agents toward specialized CLI tools for search, rewrite, fetch, structured data work, inspection, diffing, linting, and repository metrics.

## Primary external sources

- `ripgrep`: GitHub README, `GUIDE.md`, `FAQ.md`
- `ast-grep`: introduction, CLI reference, pattern syntax, tool comparison docs
- `fd`: GitHub README and man page docs
- `comby`: overview, cheat sheet, project docs
- `sd`: GitHub README
- `wget`: GNU Wget manual
- `jq`: jq manual
- `yq`: Mike Farah `yq` docs
- `fzf`: GitHub README
- `less`: official homepage/docs
- `head`: GNU coreutils manual
- `difftastic`: official site/docs
- `shellcheck`: official site/docs
- `scc`: GitHub README

## Research notes used in authoring

- Search/rewrite tools were grouped by escalation path: `fd` -> `rg` -> `sd` -> `comby` -> `ast-grep`.
- Structured data tools were separated by source type: `jq` for JSON, `yq` for YAML-first workflows.
- Human-oriented tools were called out explicitly: `fzf`, `less`, and `difftastic` are usually review aids, not unattended automation primitives.
- Tool-specific failure modes were preserved in troubleshooting so the main `SKILL.md` could stay compact.

## Key decisions

- Keep `SKILL.md` as a router table plus escalation rules.
- Put sharp edges and examples in per-tool references rather than in the base skill.
- Add the required integration-documentation reference set:
  - `references/api-surface.md`
  - `references/common-use-cases.md`
  - `references/troubleshooting-workarounds.md`
- Create one concise reference per requested tool so the skill can load only the relevant depth.

## Coverage and gaps

- Covered: all 14 requested tools, decision boundaries, common usage, and common failure modes.
- Intentionally omitted: exhaustive flag catalogs and platform-specific installation instructions.
- Known limitation: examples prioritize portable, common workflows over niche flags or plugin ecosystems.
