---
name: index
description: Use this skill when you need to use fish shell effectively, write or debug fish scripts, migrate Bash habits to fish, customize prompts or completions, or work with fish configuration, autoloading, and upgrade changes.
version: 1.0.0
source: https://fishshell.com/docs/current/index.html
license: MIT
---
# fish shell

Fish is the friendly interactive shell. Use this skill for interactive fish usage, fish scripting, Bash-to-fish migration, prompt work, completion authoring, debugging, configuration, and upgrade-aware changes.

## When To Use

Use this skill when you need to:
- Write or fix a `fish` script.
- Translate shell logic from Bash to fish.
- Configure `~/.config/fish/config.fish` or `conf.d` snippets.
- Author or debug functions in `~/.config/fish/functions`.
- Create or troubleshoot completions with `complete`.
- Customize prompts, themes, greetings, or interactive behavior.
- Diagnose fish startup, tracing, profiling, debugger, or terminal issues.
- Check upgrade-sensitive behavior or feature flags.

## Start Here

- Start with `references/getting-started.md` for config locations, startup order, interactive basics, and help entry points.
- Use `references/core-patterns.md` for fish syntax, variables, substitutions, lists, control flow, and common scripting patterns.
- Use `references/bash-migration.md` when converting Bash habits or scripts.
- Use `references/api-reference.md` for high-value builtins, helper functions, prompt functions, and completion primitives.
- Use `references/testing-debugging.md` for tracing, debugging, stack traces, profiling, and formatter support.
- Use `references/integrations-plugins.md` for autoload paths, vendor install locations, completions, prompts, themes, and terminal integration.
- Use `references/upgrades.md` for 4.3 through 4.6 changes that affect prompts, themes, terminal behavior, and compatibility.

## Retrieval Guide

- Prefer the compact references above first.
- Use `references/documentation/overview/docs-current-language.md` for precise language semantics, variables, startup, feature flags, and debugging details.
- Use `references/documentation/overview/docs-current-fish-for-bash-users.md` and `docs-current-faq.md` for migration edge cases.
- Use `references/documentation/overview/docs-current-completions.md` and `docs-current-cmds-complete.md` for exact `complete` flags and helper functions.
- Use `references/documentation/overview/docs-current-prompt.md` and `docs-current-cmds-fish-config.md` for prompt and theme behavior.
- Use `references/documentation/overview/docs-current-relnotes.md` for version-specific behavior changes.
- Use `references/documentation/overview/index.md` to locate the full mirrored fish docs corpus when the compact references are not enough.

## Scope Notes

- Fish is not POSIX-compatible; do not assume Bash or sh semantics.
- Variables are lists, and substitutions are not word-split like Bash.
- Prefer documented fish mechanisms such as `set`, `string`, `status`, `fish_add_path`, prompt functions, and `complete` instead of Bash idioms.
- For login-shell setup, remember some systems still require a Bourne-compatible login shell to source `/etc/profile`.
