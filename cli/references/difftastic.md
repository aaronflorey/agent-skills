# difftastic

Use `difftastic` for syntax-aware diffs meant for human review.

## Best for

- Reviewing changed code with parse-aware structure
- Comparing two files or two versions without losing syntax context

## High-signal commands

```bash
difft old.rs new.rs
git diff --no-color | difft --color=always - | less -R
difft --context 5 before.ts after.ts
```

## Sharp edges

- It is for review, not for generating patches to apply.
- Parse failures can fall back to line-oriented diff behavior.
- Output is optimized for humans, not stable machine parsing.

## Escalate when

- Switch to regular diff formats for tooling integration.
- Pair with `less -R` when the output exceeds one screen.
