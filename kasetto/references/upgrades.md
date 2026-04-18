# Upgrades

## Release Highlights

### 2.0.1

- Rebrand description and bump version to 2.0.1.

### 2.0.0

- Add `init`, `clean`, `self uninstall`, and `completions` commands.
- Add MCP support.
- Expand docs for authentication, skill format, multi-agent support, and git hosts.
- Update flags and align TUI behavior.

### 1.2.1

- Performance work: `mimalloc`, fat LTO, streaming I/O, and SQLite tuning.

### 1.2.0

- Add Windows builds and Scoop distribution.

### 1.1.0

- Add shell completions and auto version bumping.

### 1.0.0

- Add self-update command and install scripts.
- Add `kst` alias and improved CLI/TUI flows.
- Add doctor diagnostics.
- Support remote config URLs.
- Add session-start hook installer for Claude and Cursor.

## Upgrade Notes For Agents

- If you need `clean`, `uninstall`, `completions`, or MCP support, you need at least `2.0.0`.
- If you need Windows Scoop installs, you need at least `1.2.0`.
- If you need shell completions, you need at least `1.1.0`.
- If you need self-update or remote config URLs, you need at least `1.0.0`.
