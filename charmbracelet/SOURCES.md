# Sources

## Scope

This skill covers building Go CLI tools with the Charmbracelet ecosystem, with emphasis on Bubble Tea and supporting guidance for Bubbles, Huh, Lip Gloss, Wish, Glamour, and Log.

## Primary Upstream Sources

### Bubble Tea
- https://github.com/charmbracelet/bubbletea
- https://raw.githubusercontent.com/charmbracelet/bubbletea/main/README.md
- https://raw.githubusercontent.com/charmbracelet/bubbletea/main/UPGRADE_GUIDE_V2.md
- tutorials and examples referenced from the Bubble Tea repository

### Bubbles
- https://github.com/charmbracelet/bubbles
- https://raw.githubusercontent.com/charmbracelet/bubbles/main/README.md
- https://raw.githubusercontent.com/charmbracelet/bubbles/main/UPGRADE_GUIDE_V2.md

### Huh
- https://github.com/charmbracelet/huh
- https://raw.githubusercontent.com/charmbracelet/huh/main/README.md
- https://raw.githubusercontent.com/charmbracelet/huh/main/UPGRADE_GUIDE_V2.md

### Lip Gloss
- https://github.com/charmbracelet/lipgloss
- https://raw.githubusercontent.com/charmbracelet/lipgloss/main/README.md
- https://raw.githubusercontent.com/charmbracelet/lipgloss/main/UPGRADE_GUIDE_V2.md

### Wish
- https://github.com/charmbracelet/wish
- https://raw.githubusercontent.com/charmbracelet/wish/main/README.md
- https://raw.githubusercontent.com/charmbracelet/wish/main/UPGRADE_GUIDE_V2.md

### Glamour
- https://github.com/charmbracelet/glamour
- https://raw.githubusercontent.com/charmbracelet/glamour/main/README.md
- https://raw.githubusercontent.com/charmbracelet/glamour/main/styles/README.md

### Log
- https://github.com/charmbracelet/log
- https://raw.githubusercontent.com/charmbracelet/log/main/README.md
- https://raw.githubusercontent.com/charmbracelet/log/main/UPGRADE_GUIDE_V2.md

### Ecosystem Index
- https://charm.land/libs/

## Repo Metadata Checked

- default branches are `main` for all targeted repos
- latest releases observed during authoring:
  - `bubbletea v2.0.2`
  - `bubbles v2.1.0`
  - `lipgloss v2.0.2`
  - `huh v2.0.3`
  - `wish v2.0.0`
  - `glamour v2.0.0`
  - `log v2.0.0`

## Authoring Decisions

- Keep `SKILL.md` lightweight and task-routing focused to minimize token usage.
- Put deeper API and migration guidance in `references/`.
- Emphasize Bubble Tea as the default foundation for TUIs.
- Prefer upgrade guides when examples and READMEs disagree.
- Explicitly warn about stale import paths and v1-era patterns.

## Coverage matrix

| Requirement | Coverage | Notes |
|---|---|---|
| Bubble Tea-first guidance | pass | `SKILL.md`, `references/bubbletea-core.md`, `references/bubbletea-patterns.md` |
| Bubbles coverage | pass | `references/bubbles.md`, `references/api-surface.md`, `references/common-use-cases.md` |
| Huh coverage | pass | `references/huh.md`, `references/common-use-cases.md` |
| Lip Gloss coverage | pass | `references/lipgloss.md`, `references/common-use-cases.md` |
| Wish coverage | pass | `references/wish.md`, `references/common-use-cases.md` |
| Glamour coverage | pass | `references/glamour.md`, `references/common-use-cases.md` |
| Log coverage | pass | `references/log.md`, `references/common-use-cases.md` |
| Lightweight main skill | pass | `SKILL.md` stays focused on routing and quick-start rules |
| API surface artifact | pass | `references/api-surface.md` |
| Common use cases artifact | pass | `references/common-use-cases.md` with 12 concrete patterns |
| Troubleshooting artifact | pass | `references/troubleshooting-workarounds.md` with 17 issue/fix entries |
| Config/runtime options | pass | Bubble Tea program options, view fields, Glamour renderer options, Wish server options, and Log options are covered in `references/api-surface.md`, `references/bubbletea-core.md`, `references/glamour.md`, `references/wish.md`, and `references/log.md` |
| Version/migration variance | pass | v2 import rules and upgrade caveats are covered across `SKILL.md`, `references/api-surface.md`, and `references/troubleshooting-workarounds.md` |
| Trigger-focused frontmatter | pass | `SKILL.md` description explicitly names TUI and each target library |

## Known Gaps and Tradeoffs

- This skill curates the highest-value APIs and patterns instead of mirroring full upstream docs.
- Example references point to upstream files rather than copying large code blocks into the skill.
- Some upstream examples and README snippets may still show pre-v2 patterns; the skill favors current v2 guidance.
