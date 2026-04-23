# Advanced Features Reference

## Hooks

Hooks are scripts that run automatically during mise events. Requires `mise activate`.

### Available Hooks

```toml
[hooks]
cd = "echo 'Directory changed'"
enter = "echo 'Entered project'"
leave = "echo 'Left project'"
preinstall = "echo 'About to install tools'"
postinstall = "echo 'Tools installed: $MISE_INSTALLED_TOOLS'"
```

### Hook Environment Variables

| Variable | Description |
|----------|-------------|
| `MISE_ORIGINAL_CWD` | User's current directory |
| `MISE_PROJECT_ROOT` | Project root directory |
| `MISE_PREVIOUS_DIR` | Previous directory (on cd) |
| `MISE_INSTALLED_TOOLS` | JSON array of installed tools (postinstall) |

### Shell Hooks

Execute in current shell (for sourcing, completions):

```toml
[hooks.enter]
shell = "bash"
script = "source ./completions.sh"
```

### Task Hooks

Reference mise tasks instead of inline scripts:

```toml
[tasks.setup]
run = "npm install"

[hooks]
enter = { task = "setup" }
```

### Multiple Hooks

```toml
[hooks]
enter = [
  "echo 'First hook'",
  { task = "setup" },
  "echo 'Last hook'"
]
```

### Watch Files Hook

```toml
[[watch_files]]
patterns = ["src/**/*.rs"]
run = "cargo fmt"

[[watch_files]]
patterns = ["package.json"]
task = "install-deps"
```

## Backends

### Core Backend

Built-in support for common tools:

```toml
[tools]
node = "22"
python = "3.12"
ruby = "3.3"
go = "1.22"
java = "21"
rust = "1.75"
```

### npm Backend

```toml
[tools]
prettier = "npm:prettier@3"
eslint = "npm:eslint"
typescript = "npm:typescript"
"@anthropic-ai/claude-code" = "npm:@anthropic-ai/claude-code"
```

### pipx Backend

Python CLI tools (isolated environments):

```toml
[tools]
black = "pipx:black"
ruff = "pipx:ruff"
poetry = "pipx:poetry"
pdm = "pipx:pdm"
```

### cargo Backend

Rust tools:

```toml
[tools]
ripgrep = "cargo:ripgrep"
fd = "cargo:fd-find"
bat = "cargo:bat"
```

### go Backend

```toml
[tools]
golangci-lint = "go:github.com/golangci/golangci-lint/cmd/golangci-lint"
```

### github Backend

Install from GitHub releases:

```toml
[tools]
gh = "github:cli/cli"
rg = "github:BurntSushi/ripgrep"
delta = "github:dandavison/delta"
```

### aqua Backend

From aqua registry:

```toml
[tools]
terraform = "aqua:hashicorp/terraform"
kubectl = "aqua:kubernetes/kubectl"
helm = "aqua:helm/helm"
```

### ubi Backend

Universal binary installer:

```toml
[tools]
ripgrep = "ubi:BurntSushi/ripgrep"
```

## Shims vs Activation

### Activation (Recommended for interactive shells)

```bash
eval "$(mise activate bash)"
```

- Updates PATH on every prompt
- Supports all mise features
- Environment changes immediately on `cd`

### Shims (For IDEs, scripts, non-interactive)

```bash
mise activate --shims
# Or add to PATH: ~/.local/share/mise/shims
```

- Lightweight wrapper scripts
- Work without shell integration
- Slight overhead per execution

## IDE Integration

### VS Code

Add shims to PATH in settings:

```json
{
  "terminal.integrated.env.osx": {
    "PATH": "${env:HOME}/.local/share/mise/shims:${env:PATH}"
  }
}
```

### IntelliJ/JetBrains

Configure SDK path to mise install location:
`~/.local/share/mise/installs/<tool>/<version>`

## Lock Files

Pin exact versions with `mise.lock`:

```toml
# mise.toml
[settings]
lockfile = true

[tools]
node = "22"
```

```bash
mise install  # Creates/updates mise.lock
```

```
# mise.lock
[tools]
node = "22.12.0"
```

## Trusted Configs

Mise requires trust for configs that run code:

```bash
mise trust                    # Trust current directory
mise trust /path/to/project   # Trust specific path
```

Global trust in `~/.config/mise/config.toml`:

```toml
[settings]
trusted_config_paths = ["~/work", "~/projects"]
```

## CI/CD Usage

### GitHub Actions

```yaml
- uses: jdx/mise-action@v2
  with:
    version: latest
- run: mise install
- run: mise run test
```

### Without Shell Integration

```bash
mise install
mise exec -- npm test
# Or
mise run test
```

### Caching

Cache `~/.local/share/mise` for faster CI:

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.local/share/mise
    key: mise-${{ hashFiles('mise.toml', 'mise.lock') }}
```

## Tool Options

### postinstall

Run after tool install:

```toml
[tools]
node = { version = "22", postinstall = "corepack enable" }
python = { version = "3.12", postinstall = "pip install pipx" }
```

### install_env

Environment for installation:

```toml
[tools]
rust = { 
  version = "1.75",
  install_env = { RUSTUP_HOME = "/custom/path" }
}
```

### OS Restriction

```toml
[tools]
# Only on Linux/macOS
ripgrep = { version = "latest", os = ["linux", "macos"] }

# Only on Windows
windows-tool = { version = "latest", os = ["windows"] }
```

## Templates

Tera templating in configs:

### Environment Variables

```toml
[env]
PROJECT_NAME = "{{env.PWD | split(pat='/') | last}}"
```

### Conditionals

```toml
[env]
NODE_ENV = "{% if env.CI %}production{% else %}development{% endif %}"
```

### Available Variables

| Variable | Description |
|----------|-------------|
| `{{config_root}}` | Project root |
| `{{cwd}}` | Current working directory |
| `{{env.VAR}}` | Environment variable |
| `{{tools.node.version}}` | Tool version |

## Experimental Features

Enable with:

```toml
[settings]
experimental = true
```

Or: `MISE_EXPERIMENTAL=1`

### Monorepo Support

```toml
experimental_monorepo_root = true

# Enables //path/to/subproject:task syntax
```

### Conda Backend

```toml
[tools]
python = "conda:python@3.12"
```

## Migration from asdf

Mise reads `.tool-versions` files automatically:

```
# .tool-versions
node 20.0.0
python 3.11.0
```

Convert to mise.toml:

```bash
mise config generate > mise.toml
```

## Debugging

```bash
mise doctor                   # Full diagnostic
mise --version                # Version info
mise config                   # Show loaded configs
MISE_DEBUG=1 mise install     # Debug output
MISE_TRACE=1 mise install     # Trace output
mise env --json               # Inspect environment
```

## Performance Tips

1. **Use lockfile** for reproducible, fast installs
2. **Cache in CI** - cache `~/.local/share/mise`
3. **Limit plugin updates** with `plugin_autoupdate_last_check_duration`
4. **Use core tools** when available (faster than plugins)
5. **Avoid `mise activate` in non-interactive scripts** - use `mise exec` or `mise run`
