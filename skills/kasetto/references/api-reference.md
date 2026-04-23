# API Reference

## Commands

### `kst init`

Generate a starter config file.

```bash
kst init [--global] [--force]
```

- `--global`: write the global config file under the XDG config directory
- `--force`: overwrite an existing config without asking

### `kst sync`

Read config, discover skills, and reconcile local state.

```bash
kst sync [--config <path-or-url>] [--dry-run] [--quiet] [--json] [--plain] [--verbose] [--project | --global]
```

- `--config`: path or HTTPS URL
- `--dry-run`: preview changes without writing
- `--quiet`: suppress non-error output
- `--json`: emit a JSON sync report
- `--plain`: disable colors and spinner animations
- `--verbose`: show per-skill action details
- `--project`: install into the current project
- `--global`: install globally; default scope

Missing skills are reported as broken without stopping the rest of the run. The exit code is non-zero only for source-level failures.

### `kst list`

Show skills and MCP servers from the lock file.

```bash
kst list [--json] [--quiet] [--plain] [--project | --global]
```

- Without `--project` or `--global`, both scopes are merged.
- In a terminal and without `--plain`, Kasetto opens an interactive browser.
- The TUI supports `j`/`k`, `h`/`l`, `Tab`, `PgUp`, `PgDn`, `gg`, and `G`.
- Use `--plain`, `NO_TUI=1`, or pipe stdout for plain text output.

### `kst doctor`

Print diagnostics for the local installation.

```bash
kst doctor [--json] [--quiet] [--plain] [--project | --global]
```

Shows version, lock file path, installation paths, last sync time, and failed skills from the latest run.

### `kst clean`

Remove tracked skills and MCP configs for a scope.

```bash
kst clean [--dry-run] [--json] [--quiet] [--plain] [--project | --global]
```

- `--dry-run`: preview removed paths and MCP packs
- `--json`: emit machine-readable output
- `--quiet`: suppress non-error output
- `--plain`: disable colors and banner-style header

### `kst self update`

Replace the current binary with the latest GitHub release.

```bash
kst self update [--json]
```

### `kst self uninstall`

Remove installed skills, MCP configs, Kasetto data, and the binary.

```bash
kst self uninstall [--yes]
```

### `kst completions`

Generate shell completion scripts.

```bash
kst completions <shell>
```

Supported shells: `bash`, `zsh`, `fish`, `powershell`.

## Config Keys

| Key | Required | Description |
| --- | --- | --- |
| `agent` | no | One or more supported agent presets |
| `destination` | no | Explicit install path; overrides `agent` |
| `scope` | no | `global` or `project` |
| `skills` | yes | List of skill sources |
| `skills[].source` | yes | Git host URL or local path |
| `skills[].branch` | no | Branch for remote sources |
| `skills[].ref` | no | Tag, commit SHA, or ref |
| `skills[].skills` | yes | `"*"`, a list of names, or `{ name, path }` objects |
| `mcps` | no | List of MCP sources |
| `mcps[].source` | yes | Remote URL or local path containing MCP config |
| `mcps[].branch` | no | Branch for remote sources |
| `mcps[].ref` | no | Tag, commit SHA, or ref |
| `mcps[].path` | no | Explicit path to an MCP JSON file |
