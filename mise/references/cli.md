# CLI Reference

## Tool Management

### mise use

Install and add tool to config:

```bash
mise use node@22              # Install and add to mise.toml
mise use -g node@22           # Add to global config
mise use node@22 python@3.12  # Multiple tools
mise use npm:prettier@3       # From npm backend
mise use --pin node@22        # Save exact version (22.0.0)
mise use --fuzzy node@22      # Save fuzzy version (22)
mise use -e local node@20     # Write to mise.local.toml
mise use -e staging node@20   # Write to mise.staging.toml
mise use --remove node        # Remove tool from config
```

### mise install

Install tools without modifying config:

```bash
mise install                  # Install all from config
mise install node@22          # Install specific version
mise install node             # Install version from config
mise install -f node@22       # Force reinstall
```

### mise uninstall

```bash
mise uninstall node@22        # Remove specific version
mise uninstall node           # Remove all node versions
```

### mise upgrade

```bash
mise upgrade                  # Upgrade all tools
mise upgrade node             # Upgrade specific tool
mise upgrade --dry-run        # Show what would upgrade
```

### mise ls

```bash
mise ls                       # List installed tools
mise ls --current             # Show active versions
mise ls --json                # JSON output
mise ls node                  # List node versions only
```

### mise ls-remote

```bash
mise ls-remote node           # List available versions
mise ls-remote node --all     # Include prereleases
```

### mise outdated

```bash
mise outdated                 # Show outdated tools
mise outdated --json          # JSON output
```

## Execution

### mise exec (x)

Run command with mise environment:

```bash
mise exec -- node app.js      # Run with config tools
mise x -- npm test            # Short alias
mise x node@22 -- node -v     # With specific tool
mise x -C /path -- cmd        # In different directory
mise x --fresh-env -- cmd     # Bypass env cache
```

### mise run (r)

Run tasks:

```bash
mise run build                # Run task
mise r test                   # Short alias
mise run                      # Interactive task selection
mise run build test           # Sequential tasks
mise run lint ::: test        # Parallel tasks
mise run test -- --verbose    # Pass args to task
mise run -f build             # Force (ignore up-to-date)
mise run -n build             # Dry run
mise run -j 8 build           # Parallel jobs
mise run -r test              # Raw mode (direct I/O)
mise run -o prefix build      # Output mode
mise run --timeout 5m build   # With timeout
mise run -C /path build       # Change directory
```

### mise watch

```bash
mise watch -t build           # Watch and run task
mise watch build              # Watch task's sources
mise watch -g "src/**" build  # Custom glob pattern
```

## Environment

### mise env

```bash
mise env                      # Show env vars as shell export
mise env --json               # JSON format
mise env --dotenv             # Dotenv format
mise env -s bash              # For specific shell
```

### mise set

```bash
mise set NODE_ENV=production  # Set env var in mise.toml
mise set                      # List all env vars
mise unset NODE_ENV           # Remove env var
```

### mise en

```bash
mise en                       # Start subshell with mise env
mise en -s fish               # Specific shell
```

## Configuration

### mise config (cfg)

```bash
mise config                   # Show loaded config files
mise config --json            # JSON output
mise config generate          # Generate mise.toml template
```

### mise settings

```bash
mise settings                 # Show all settings
mise settings get jobs        # Get specific setting
mise settings set jobs 8      # Set setting
mise settings unset jobs      # Reset to default
```

### mise trust

```bash
mise trust                    # Trust current directory
mise trust /path/to/project   # Trust specific path
mise trust --untrust          # Remove trust
```

## Shell Integration

### mise activate

```bash
eval "$(mise activate bash)"  # Bash
eval "$(mise activate zsh)"   # Zsh
mise activate fish | source   # Fish
```

### mise deactivate

```bash
mise deactivate               # Disable mise in current shell
```

### mise shell

```bash
mise shell node@22            # Set tool for current shell only
mise shell --unset node       # Remove shell override
```

### mise completion

```bash
mise completion bash          # Generate bash completions
mise completion zsh           # Generate zsh completions
mise completion fish          # Generate fish completions
```

## Information

### mise doctor (dr)

```bash
mise doctor                   # Diagnose mise setup
```

### mise version

```bash
mise version                  # Show mise version
mise --version               
```

### mise where

```bash
mise where node@22            # Show install path
mise where node               # Current version path
```

### mise which

```bash
mise which node               # Show binary path
```

## Tasks Management

### mise tasks

```bash
mise tasks                    # List all tasks
mise tasks --json             # JSON output
mise tasks --hidden           # Include hidden tasks
```

### mise tasks add

```bash
mise tasks add build "npm run build"
mise tasks add test --depends lint "npm test"
```

### mise tasks edit

```bash
mise tasks edit build         # Edit task in $EDITOR
```

## Plugins

### mise plugins

```bash
mise plugins                  # List installed plugins
mise plugins ls               # Same as above
mise plugins ls --urls        # Show repository URLs
```

### mise plugins install

```bash
mise plugins install node     # Install from registry
mise plugins install node https://github.com/mise-plugins/mise-node
mise plugins update           # Update all plugins
mise plugins uninstall node   # Remove plugin
```

## Maintenance

### mise prune

```bash
mise prune                    # Remove unused tool versions
mise prune --dry-run          # Show what would be removed
mise prune node               # Prune specific tool only
```

### mise cache

```bash
mise cache clear              # Clear all caches
mise cache clear node         # Clear specific tool cache
```

### mise reshim

```bash
mise reshim                   # Rebuild shims
```

### mise self-update

```bash
mise self-update              # Update mise itself
mise self-update --yes        # Auto-confirm
```

### mise implode

```bash
mise implode                  # Remove mise and all data
mise implode --config         # Also remove config files
```

## Global Flags

Available on most commands:

| Flag | Description |
|------|-------------|
| `-C, --cd <DIR>` | Change directory |
| `-j, --jobs <N>` | Parallel jobs |
| `-q, --quiet` | Reduce output |
| `-v, --verbose` | Increase output |
| `-y, --yes` | Auto-confirm |
| `--trace` | Trace output |
| `--debug` | Debug output |
| `--log-level <LEVEL>` | Set log level |
