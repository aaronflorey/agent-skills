# ast-grep

Use `ast-grep` for syntax-aware code search, linting, and rewrites.

## Best for

- Matching code patterns that must parse correctly
- Applying safe rewrites with placeholders
- Enforcing rule-based code checks across a tree

## High-signal commands

```bash
ast-grep run --lang ts --pattern 'console.log($A)' src
ast-grep run --lang ts --pattern 'foo($A)' --rewrite 'bar($A)' src
ast-grep scan --rule rules/no-console.yml src
```

## Sharp edges

- Patterns must be valid code in the selected language.
- It is syntax-aware, not type-aware or semantic.
- Parse failures can make a good idea look like a non-match.

## Escalate when

- Switch to `comby` for lighter structural rewrites.
- Switch to language-native tooling when type information or build integration matters.
