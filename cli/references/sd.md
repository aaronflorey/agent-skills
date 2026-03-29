# sd

Use `sd` for simple search-and-replace work.

## Best for

- Fast literal or regex replacements across files
- Previewing a rewrite before touching files
- Cleaner replacement syntax than many `sed` one-liners

## High-signal commands

```bash
sd -p 'old_name' 'new_name' src/**/*.rb
sd 'foo\((.*)\)' 'bar($1)' test.txt
sd -A 'foo\nbar' 'baz' notes.txt
```

## Sharp edges

- Edits files in place when file arguments are provided.
- Use `-p` to preview first.
- Default behavior is line-by-line; use `-A` for cross-line mode.

## Escalate when

- Switch to `comby` when regex becomes brittle.
- Switch to `ast-grep` when the change must respect syntax trees.
