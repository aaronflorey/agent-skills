# fd

Use `fd` for fast path discovery.

## Best for

- Finding files by name, extension, or path pattern
- Scoping a file set before search or edits
- Feeding clean file lists into other tools

## High-signal commands

```bash
fd -e ts config src
fd -p 'migrations/.*\.sql$'
fd -g '*.md' docs
fd -t f '^test_' .
```

## Sharp edges

- Matches filenames by regex by default.
- Use `-p` for full-path matching.
- Use `-g` for glob semantics.
- Some systems expose it as `fdfind`.

## Escalate when

- Switch to `rg` for content search.
- Pair it with `fzf` only when a human needs interactive narrowing.
