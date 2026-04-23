# scc

Use `scc` for repository inventory and rough code metrics.

## Best for

- Counting files, lines, and language mix
- Spotting unusually large files or generated-code volume
- Tracking rough complexity trends within the same repo

## High-signal commands

```bash
scc
scc --by-file
scc -f json > scc.json
scc -u -a
```

## Sharp edges

- Complexity is approximate and not comparable across all languages.
- It does not understand semantics or runtime behavior.
- Generated files can distort totals unless you filter them intentionally.

## Escalate when

- Switch to profilers for runtime hotspots.
- Switch to code review or static analysis tools for correctness questions.
