# Common Commands

## First-Time Setup

```bash
kst sync --config kasetto.yaml
kst list --plain
kst doctor --json
```

Use `kst list --plain` or `NO_TUI=1 kst list` when you need non-interactive output.

## Safe Inspection

```bash
kst sync --dry-run
kst sync --json
kst clean --dry-run
```

Use these before making changes or in CI-style workflows.

## Maintenance

```bash
kst self update
kst completions zsh
```

## Destructive Cleanup

```bash
kst clean --project
kst self uninstall --yes
```

`kst clean` removes tracked installs for the selected scope. `kst self uninstall --yes` removes installed skills, MCP configs, Kasetto data, and the binary.
