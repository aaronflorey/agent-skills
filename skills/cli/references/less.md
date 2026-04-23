# less

Use `less` for interactive paging, search, and follow mode.

## Best for

- Reviewing long command output
- Searching within colored diffs or logs
- Following a growing file with `+F`

## High-signal commands

```bash
git diff --color=always | less -R
less +F server.log
less -N -S README.md
```

## Sharp edges

- This is a human-oriented tool; it is usually wrong for unattended agents.
- Prefer `-R` over `-r` for colored output.
- `+F` behaves like a pager-tail hybrid and needs user control.

## Escalate when

- Switch to `head` for scripts or quick samples.
- Switch to log-specific tooling if the task needs parsing rather than paging.
