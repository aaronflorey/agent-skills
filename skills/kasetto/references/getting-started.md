# Getting Started

Kasetto is a declarative AI agent environment manager for syncing skills and MCP configs across agent setups.

## Use It For

- Declarative, version-controlled skill setups
- Shared team configs fetched from a file or HTTPS URL
- Installing the same skills into one or many supported agents
- Merging MCP server configs alongside skills

## Install

### Standalone installer

```bash
curl -fsSL kasetto.dev/install | sh
```

Windows:

```powershell
powershell -ExecutionPolicy Bypass -c "irm kasetto.dev/install.ps1 | iex"
```

### Package managers

```bash
brew install pivoshenko/tap/kasetto
```

```bash
scoop bucket add kasetto https://github.com/pivoshenko/scoop-bucket
scoop install kasetto
```

```bash
cargo install kasetto
```

### From source

```bash
git clone https://github.com/pivoshenko/kasetto && cd kasetto
cargo install --path .
```

## First Sync

```bash
# remote team config
kst sync --config https://example.com/team-skills.yaml

# local config
kst sync --config kasetto.yaml
```

Kasetto installs skills into the target agent directory and only updates changed content on later syncs.

## Inspect The Local State

```bash
kst list
kst doctor
```

- `kst list` shows installed skills and MCP servers.
- `kst doctor` shows version, paths, last sync status, and recent failures.

## Config Search Order

When `--config` is omitted, Kasetto looks in this order:

1. `./kasetto.yaml`
2. `$XDG_CONFIG_HOME/kasetto/config.yaml` or `~/.config/kasetto/config.yaml`

## Minimal Config

```yaml
agent: codex

skills:
  - source: https://github.com/org/skill-pack
    skills:
      - code-reviewer
```

## Install Scope

- `global` is the default scope.
- `project` installs into the current project instead.
- `destination` overrides the agent preset path when both are present.
