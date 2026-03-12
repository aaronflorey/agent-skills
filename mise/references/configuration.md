# Configuration Reference

## mise.toml File Locations

Config files are loaded in order of precedence (higher overrides lower):

1. `mise.local.toml` - local overrides, git-ignored
2. `mise.toml`
3. `mise/config.toml`
4. `.mise/config.toml`
5. `.config/mise.toml`
6. `.config/mise/config.toml`

Global config: `~/.config/mise/config.toml`

Run `mise config` to see loaded files and their order.

## Tools Section

### Basic Syntax

```toml
[tools]
node = "22"                    # Latest 22.x
python = "3.12"                # Latest 3.12.x
ruby = "latest"                # Latest stable
go = "prefix:1.21"             # Latest 1.21.x (explicit prefix match)
erlang = "ref:master"          # Build from git ref
node = ["20", "22"]            # Multiple versions
```

### Tool Options

```toml
[tools]
node = { version = "22", postinstall = "corepack enable" }

# OS-specific
ripgrep = { version = "latest", os = ["linux", "macos"] }

# With install environment
cargo-binstall = { 
  version = "latest",
  install_env = { RUST_BACKTRACE = "1" }
}
```

### Backend Prefixes

```toml
[tools]
# npm packages
prettier = "npm:prettier@3"
eslint = "npm:eslint"

# Python packages (via pipx)
black = "pipx:black"
ruff = "pipx:ruff"

# Rust packages
ripgrep = "cargo:ripgrep"

# GitHub releases
gh = "github:cli/cli"
rg = "github:BurntSushi/ripgrep"

# Aqua registry
terraform = "aqua:hashicorp/terraform"

# Go packages
golangci-lint = "go:github.com/golangci/golangci-lint/cmd/golangci-lint"
```

## Environment Section

### Basic Environment Variables

```toml
[env]
NODE_ENV = "development"
DEBUG = "app:*"
DATABASE_URL = false           # Unset variable
```

### Directives (env._)

```toml
[env]
# Load from dotenv file
_.file = ".env"

# Load from JSON/YAML
_.file = ".env.json"
_.file = { path = ".secrets.yaml", redact = true }

# Multiple files
_.file = [".env", ".env.local", { path = ".secrets", redact = true }]

# Add to PATH
_.path = "./bin"
_.path = ["./bin", "./node_modules/.bin"]

# Source bash script
_.source = "./scripts/env.sh"
```

### Templates in Environment

```toml
[env]
PROJECT_ROOT = "{{config_root}}"
LD_LIBRARY_PATH = "{{config_root}}/lib:{{env.LD_LIBRARY_PATH}}"
NODE_VERSION = { value = "{{tools.node.version}}", tools = true }
```

### Required Variables

```toml
[env]
DATABASE_URL = { required = true }
API_KEY = { required = "Get your API key from https://example.com/settings" }
```

### Redactions

```toml
redactions = ["SECRET_*", "*_TOKEN", "PASSWORD"]

[env]
SECRET_KEY = { value = "sensitive", redact = true }
```

## Settings Section

```toml
[settings]
experimental = true
jobs = 4                       # Parallel install jobs
verbose = false
yes = false                    # Auto-confirm prompts
task.output = "prefix"         # Task output mode

# Tool behavior
idiomatic_version_file_enable_tools = ["node", "python"]
not_found_auto_install = true
auto_install = true

# Trust
trusted_config_paths = ["~/work/trusted-projects"]

# Disable specific tools
disable_tools = ["node"]
```

## Plugins Section

```toml
[plugins]
# Custom plugin URLs
elixir = "https://github.com/my-org/mise-elixir.git"
node = "https://github.com/my-org/mise-node.git#v1.0.0"
```

## Aliases

```toml
[tool_alias.node.versions]
my_node = "20"                 # mise use node@my_node
```

## Shell Aliases

```toml
[shell_alias]
ll = "ls -la"
gs = "git status"
dev = "npm run dev"
```

## Minimum Version

```toml
min_version = "2024.11.0"
# Or with soft/hard distinction
min_version = { hard = "2024.11.0", soft = "2024.9.0" }
```

## Environment-Specific Config

Create `mise.<env>.toml` files and set `MISE_ENV`:

```bash
MISE_ENV=production mise run deploy
```

Files: `mise.development.toml`, `mise.production.toml`, etc.

## Configuration Environments

```
~/.config/mise/config.toml           # Global
~/work/mise.toml                      # Work directory
~/work/project/mise.toml              # Project
~/work/project/mise.local.toml        # Local overrides (git-ignored)
~/work/project/mise.production.toml   # Environment-specific
```

## Key Environment Variables

| Variable | Description |
|----------|-------------|
| `MISE_DATA_DIR` | Tool install location (default: `~/.local/share/mise`) |
| `MISE_CACHE_DIR` | Cache location |
| `MISE_CONFIG_DIR` | Config directory |
| `MISE_ENV` | Environment name for config files |
| `MISE_LOG_LEVEL` | `trace\|debug\|info\|warn\|error` |
| `MISE_JOBS` | Parallel jobs |
| `MISE_YES` | Auto-confirm prompts |
| `MISE_TRUSTED_CONFIG_PATHS` | Colon-separated trusted paths |
| `MISE_<TOOL>_VERSION` | Override tool version |
