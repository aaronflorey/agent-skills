# ripgrep

Use `rg` for fast content search across many files.

## Best for

- Finding symbols, strings, TODOs, and config keys
- Listing matching files with `-l`
- Scoping by file type, glob, or ignored-file behavior

## High-signal commands

```bash
rg -n 'TODO|FIXME' .
rg -l 'createUser\(' src
rg -t ts -g '!dist/**' 'useQuery' src
rg --multiline 'foo\n+bar' docs
```

## Sharp edges

- Respects ignore files and skips hidden and binary files by default.
- `-uuu` disables most filtering and can get noisy fast.
- `--replace` prints rewritten matches; it does not edit files.

## Escalate when

- Switch to `fd` for file discovery.
- Switch to `sd` for simple replacements.
- Switch to `comby` or `ast-grep` when structure matters.
