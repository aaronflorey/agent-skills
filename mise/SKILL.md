---
name: mise
description: Configure and use mise for dev tool management, environment variables, and task running. Use this skill when the user wants to set up project tooling with mise, manage tool versions (node, python, go, etc.), define tasks in mise.toml, configure environment variables per project, or asks about mise configuration, backends, hooks, or CLI commands.
---

# Mise

Mise is a polyglot tool version manager and task runner. It manages dev tools, environment variables, and tasks for projects.

## Core Concepts

**Configuration**: `mise.toml` in project root (or `.mise.toml`, `.config/mise/config.toml`). Config is hierarchical - child directories override parent settings.

**Tools**: Defined in `[tools]` section. Mise installs and activates correct versions per-directory.

**Environment**: Defined in `[env]` section. Set project-specific env vars that activate when entering directory.

**Tasks**: Defined in `[tasks]` section or as standalone scripts in `mise-tasks/` directory.

## Quick Reference

### Basic mise.toml structure:

```toml
[tools]
node = "22"
python = "3.12"

[env]
NODE_ENV = "development"

[tasks.build]
run = "npm run build"
```

### Essential Commands

| Command | Description |
|---------|-------------|
| `mise use node@22` | Install and set tool version in mise.toml |
| `mise use -g node@22` | Set global tool version |
| `mise install` | Install all tools from config |
| `mise run <task>` | Run a task |
| `mise x -- <cmd>` | Execute command with mise environment |
| `mise ls` | List installed tools |
| `mise doctor` | Diagnose mise setup |

### Tool Backends

Tools can be installed from various backends:

- **Core**: `node`, `python`, `go`, `ruby` (built-in)
- **npm**: `npm:prettier`, `npm:eslint`
- **pipx**: `pipx:black`, `pipx:ruff`
- **cargo**: `cargo:ripgrep`
- **github**: `github:BurntSushi/ripgrep`
- **aqua**: `aqua:hashicorp/terraform`

## When to Consult References

For detailed information, read the appropriate reference file:

- **Configuration options** (tool options, env directives, settings): `references/configuration.md`
- **Task definition** (toml tasks, file tasks, arguments, dependencies): `references/tasks.md`
- **CLI commands** (all command flags and examples): `references/cli.md`
- **Installable overview** (where to look first for all installable options): `references/installable-overview.md`
- **Core tools** (built-in first-party languages): `references/core-tools.md`
- **Backends** (supported package ecosystems and backend families): `references/backends.md`
- **Registry aliases** (tool shorthands accepted by `mise use`): `references/registry-tools.md`
- **Hooks and advanced features**: `references/advanced.md`

## Common Patterns

### Project with Node.js and Python

```toml
[tools]
node = "lts"
python = "3.12"

[env]
NODE_ENV = "development"
PYTHONDONTWRITEBYTECODE = "1"

[tasks.dev]
run = "npm run dev"

[tasks.test]
run = ["npm test", "pytest"]
```

### Task with Dependencies

```toml
[tasks.build]
run = "npm run build"
sources = ["src/**/*.ts"]
outputs = ["dist/**/*.js"]

[tasks.deploy]
depends = ["build", "test"]
run = "./scripts/deploy.sh"
```

### File Task (mise-tasks/build)

```bash
#!/usr/bin/env bash
#MISE description="Build the project"
#MISE depends=["lint"]
npm run build
```

### Environment from .env file

```toml
[env]
_.file = ".env"
_.path = "./bin"
```

## Shell Activation

Add to shell rc file to auto-activate mise:

```bash
# bash: ~/.bashrc
eval "$(mise activate bash)"

# zsh: ~/.zshrc  
eval "$(mise activate zsh)"

# fish: ~/.config/fish/config.fish
mise activate fish | source
```

Without activation, use `mise x -- <command>` or `mise run <task>`.
