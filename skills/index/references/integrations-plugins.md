# Integrations And Plugins

## Autoload Paths

- Fish autoloads functions by name from `$fish_function_path`.
- Default locations include `~/.config/fish/functions`, `/etc/fish/functions`, and vendor function directories under XDG data paths.
- If unsure, user-defined functions belong in `~/.config/fish/functions`.

## Completion Paths

- Fish loads completions from `$fish_complete_path` on demand.
- Common locations include:
- `~/.config/fish/completions`
- `/etc/fish/completions`
- `~/.local/share/fish/vendor_completions.d`
- `/usr/share/fish/vendor_completions.d`
- shipped and generated completion directories documented in the mirrored completions docs

## Vendor Install Locations

- For packaged functions, use `pkg-config --variable functionsdir fish`.
- For packaged completions, use `pkg-config --variable completionsdir fish`.
- For packaged config snippets, use `pkg-config --variable confdir fish`.

## Config Snippets

- `conf.d` snippets are the preferred way to install small startup integrations.
- They run before `config.fish`.
- Duplicate snippet filenames only run once, so name collisions matter.

## Prompt, Theme, And UI Integration

- Prompt functions live in autoloaded function files such as `fish_prompt.fish`.
- `fish_config` can manage prompts and themes locally.
- Theme files live in `~/.config/fish/themes/*.theme`.
- Prompt-related environment variables documented in the mirrored docs include `SHELL_PROMPT_PREFIX`, `SHELL_PROMPT_SUFFIX`, and `SHELL_WELCOME`.

## Terminal Integration

- Fish depends on terminal support for CSI and OSC, and optionally DCS.
- Recent fish versions no longer rely on system terminfo for behavior.
- Terminal compatibility and feature negotiation are covered in `terminal-compatibility` and `status` docs.

## Packaging Guidance

- Prefer vendor directories and documented `pkg-config` discovery for distributable integrations.
- Prefer user config paths only for per-user customization, not package installation guidance.
