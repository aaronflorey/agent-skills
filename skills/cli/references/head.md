# head

Use `head` for a quick non-interactive sample of input.

## Best for

- Checking the first lines of a file or command output
- Sampling bytes from large artifacts
- Building deterministic shell pipelines

## High-signal commands

```bash
head -n 20 README.md
head -c 256 archive.bin
head -n -20 build.log
fd . src | head
```

## Sharp edges

- Negative counts mean "all but the last N".
- `-z` switches to NUL-delimited items.
- It does not search, page, or follow.

## Escalate when

- Switch to `less` for interactive review.
- Switch to parsers like `jq` or `yq` when the input is structured.
