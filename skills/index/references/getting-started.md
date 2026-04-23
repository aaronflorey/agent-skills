# Getting Started

## Core Entry Points

- Start fish with `fish` and exit with `exit`.
- Use `help`, `help index`, `help tutorial`, and `man fish-doc` to navigate docs from the shell.
- First-time users should start from the tutorial and interactive-use docs in `references/documentation/overview/`.

## Important Defaults

- Recommended script shebang: `#!/usr/bin/env fish`
- User config file: `~/.config/fish/config.fish`
- User startup snippets: `~/.config/fish/conf.d/*.fish`
- User functions: `~/.config/fish/functions/*.fish`
- User completions: `~/.config/fish/completions/*.fish`

## Startup Order

- Fish loads `conf.d` snippets from user, system, and vendor locations.
- Then it sources the system `config.fish`.
- Then it sources the user `~/.config/fish/config.fish`.
- Duplicate `conf.d` filenames only run once.

## Interactive And Login Guards

- Guard interactive-only setup with `status --is-interactive`.
- Guard login-only setup with `status --is-login`.
- Use these guards in `config.fish` when behavior should not affect non-interactive scripts.

## Interactive Features

- Fish provides syntax highlighting, autosuggestions, and pager-based tab completion by default.
- Autosuggestions are based on history, completions, and valid paths.
- Disable autosuggestions with `set -g fish_autosuggestion_enabled 0`.
- Use `fish_config` to inspect themes and prompts from a local web UI.

## PATH And Environment Basics

- Prefer `fish_add_path` for PATH management.
- Export environment variables with `set -gx NAME value`.
- Remember that fish variables are lists, not space-delimited strings.

## Cautions

- Fish is designed for usability, not POSIX compatibility.
- Setting fish as the login shell can cause issues on systems that expect a Bourne-compatible login shell to source `/etc/profile`.
