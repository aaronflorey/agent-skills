# Testing And Debugging

## Safe Inspection Commands

```bash
kst sync --dry-run
kst sync --json
kst sync --verbose
kst list --plain
kst doctor --json
kst clean --dry-run
```

These are the main documented ways to inspect behavior without making blind changes.

## What To Check

### Sync problems

- Use `kst sync --dry-run` to preview changes.
- Use `kst sync --verbose` for per-skill action details.
- Use `kst sync --json` for machine-readable output in CI.
- Missing skills are reported as broken, but the run continues unless there is a source-level failure.

### TUI vs plain output

- `kst list` opens an interactive browser in a terminal by default.
- Use `--plain`, set `NO_TUI=1`, or pipe stdout when you need non-interactive output.

### Installation state

- `kst doctor` reports version, lock file path, install paths, last sync time, and recent failed skills.
- `kst list` can show both project and global scopes together when no scope flag is passed.

### Destructive operations

- `kst clean --dry-run` previews removals before deleting tracked skills and MCP configs.
- `kst self uninstall --yes` removes installed skills, MCP configs, Kasetto data, and the binary.

## CI-Friendly Behavior

- The docs explicitly call out `--json` output and proper exit codes.
- `--plain` disables colors and spinner animations for scriptable output.
- The binary is distributed for macOS, Linux, and Windows.
