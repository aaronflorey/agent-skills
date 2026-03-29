# Troubleshooting And Workarounds

## Contents
- `rg` misses files
- `rg --replace` does not edit files
- `fd` matches the wrong thing
- `sd` replacement crosses lines poorly
- `ast-grep` pattern does not match
- `comby` overmatches
- `wget -c` produces a bad file
- `jq` filter breaks in the shell
- `yq -i` does not touch every file
- `fzf` hangs in automation
- `less` renders ANSI badly
- `difftastic` falls back to plain diff
- `shellcheck` cannot resolve sourced files
- `scc` numbers do not match another metric tool

## `rg` misses files

Problem: Hidden, ignored, or binary files are skipped by default.

Fix: Add only the flags you need, usually `-H`, `-uu`, or `-uuu`.

## `rg --replace` does not edit files

Problem: `rg --replace` changes printed output only.

Fix: Pipe the match set into `sd`, `comby`, or `ast-grep` for actual edits.

## `fd` matches the wrong thing

Problem: `fd` matches filenames by regex by default, not full paths by glob.

Fix: Use `-p` for path matching and `-g` for glob semantics.

## `sd` replacement crosses lines poorly

Problem: `sd` is line-oriented by default.

Fix: Add `-A` for multiline mode, or switch to `comby` or `ast-grep`.

## `ast-grep` pattern does not match

Problem: The pattern must parse as valid code for the chosen language.

Fix: Set `--lang` explicitly and rewrite the pattern as a valid snippet, not an informal fragment.

## `comby` overmatches

Problem: A loose template captures more than intended.

Fix: Narrow the matcher, constrain holes, or move to `ast-grep` for syntax-aware matching.

## `wget -c` produces a bad file

Problem: Resume appends onto a remote file that changed.

Fix: Delete the partial file and download again without `-c`.

## `jq` filter breaks in the shell

Problem: Quotes or variable interpolation changed the filter before `jq` saw it.

Fix: Prefer single quotes around filters and pass values with `--arg` or `--argjson`.

## `yq -i` does not touch every file

Problem: In-place mode applies to the first file argument, not an entire shell-expanded stream the way you expected.

Fix: Loop explicitly or use `find`/`xargs`-style expansion carefully; verify on a sample first.

## `fzf` hangs in automation

Problem: `fzf` waits for an interactive terminal.

Fix: Remove it from the automated path or use `--filter` for a deterministic non-interactive narrowing step.

## `less` renders ANSI badly

Problem: Raw control codes are not handled safely with plain `less`.

Fix: Prefer `less -R` instead of `less -r`.

## `difftastic` falls back to plain diff

Problem: The parser could not understand the file contents.

Fix: Confirm the language, check for syntax errors, or accept line diff output for that file.

## `shellcheck` cannot resolve sourced files

Problem: Relative `source` paths are ambiguous outside the script directory.

Fix: Run `shellcheck -x` and, if needed, add `-P` with the source search path.

## `scc` numbers do not match another metric tool

Problem: Complexity and logical line counts are tool-specific approximations.

Fix: Compare `scc` results within the same repository over time rather than against unrelated tools.
