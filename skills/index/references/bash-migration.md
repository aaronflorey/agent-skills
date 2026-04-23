# Bash Migration

## High-Level Differences

- Fish is intentionally not POSIX-compatible.
- Do not port Bash syntax mechanically.
- Replace Bash idioms with fish-native commands and data model.

## Syntax Differences That Matter

- Command substitution uses `(...)` or `$(...)`, not backticks.
- Substitutions split only on newlines.
- Variables are set with `set`, not `VAR=value`.
- Variables are lists, and substitutions are not word-split like Bash.
- String manipulation is done with `string` instead of Bash parameter-expansion tricks.

## Common Practical Mappings

- Export variable: `set -gx NAME value`
- Erase variable: `set -e NAME`
- Check variable existence: `set -q NAME`
- Check non-empty string: `string length -q -- "$var"` or `test -n "$var"`
- Last exit code: `$status`
- Script/function args: `$argv`
- Process substitution: `(command | psub)`

## Shell Startup Equivalents

- Fish does not use `.bashrc` or `.profile`.
- The closest user config entry point is `~/.config/fish/config.fish`.
- Prompt customization goes in `fish_prompt`.
- Greeting customization uses `fish_greeting`.

## History And Expansion

- Fish does not use Bash history substitution.
- Use normal history search and autosuggestions instead.
- Be careful with wildcard behavior and do not assume Bash edge cases apply unchanged.

## Migration Strategy

- Re-express behavior in fish instead of transliterating Bash syntax.
- Validate quoting, substitutions, list handling, and wildcard behavior after conversion.
- Use the FAQ and `fish-for-bash-users` mirrored docs for edge cases before assuming a direct equivalent exists.
