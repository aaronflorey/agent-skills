# Core Patterns

## Mental Model

- Fish is not Bash.
- Variables are lists.
- Expansions are not word-split after substitution.
- Command substitutions use `(...)` or `$(...)`.

## Variables

- Set variables with `set`.
- Export variables with `set -x` or commonly `set -gx`.
- Erase variables with `set -e`.
- Query variable existence with `set -q`.
- Use list-aware patterns instead of assuming a single space-separated string.

## Strings And Paths

- Prefer `string` for string operations instead of Bash parameter expansion.
- Use `path` for path-oriented transformations.
- For pkg-config style splitting on spaces, fish docs point to `string split -n " "`.

## Status And Special Variables

- `$status` is the last command exit status.
- `$argv` contains function or script arguments.
- `$fish_pid` is the current fish process ID.
- `$last_pid` tracks the last background process ID.
- `status filename` reports the current script filename.

## Control Flow And Structure

- Core keywords include `if`, `for`, `while`, `switch`, `case`, `function`, `return`, `begin`, and `end`.
- Boolean chaining uses `and`, `or`, and `not`.
- Use functions instead of shell aliases when behavior needs logic or arguments.

## Globbing And Substitution

- Fish supports `*` and `**` globs.
- `?` exists but is deprecated as a glob.
- There is no Bash-style heredoc support.
- Process substitution uses `(command | psub)`.

## Configuration Patterns

- Put reusable functions in `~/.config/fish/functions` so fish can autoload them by name.
- Save prompt functions with `funcsave fish_prompt` when appropriate.
- Keep interactive-only prompt, greeting, key binding, and UI setup behind `status --is-interactive`.

## Prompt And UI Patterns

- Left prompt: `fish_prompt`
- Right prompt: `fish_right_prompt`
- Mode prompt: `fish_mode_prompt`
- Common prompt helpers: `prompt_pwd`, `prompt_login`, `prompt_hostname`, `fish_git_prompt`, `fish_vcs_prompt`, `fish_is_root_user`

## Feature Flags

- Inspect feature flags with `status features`.
- Test one with `status test-feature`.
- Enable them with `fish --features ...` or `set -U fish_features ...`.
- Relevant flags documented in the mirrored docs include `stderr-nocaret`, `qmark-noglob`, `regex-easyesc`, `ampersand-nobg-in-token`, `remove-percent-self`, `test-require-arg`, `mark-prompt`, `ignore-terminfo`, `query-term`, and `omit-term-workarounds`.
