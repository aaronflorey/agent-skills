# wget

Use `wget` for robust non-interactive fetching.

## Best for

- Downloading files in unattended jobs
- Retrying flaky network requests
- Resuming large downloads
- Streaming a URL into another tool with `-qO-`

## High-signal commands

```bash
wget https://example.com/archive.tar.gz
wget -qO- https://example.com/data.json | jq '.items | length'
wget -c https://example.com/large.iso
wget --mirror --convert-links --page-requisites https://example.com/docs/
```

## Sharp edges

- `-O FILE` writes all fetched output to that exact file.
- `-c` can corrupt results if the remote file changed since the partial download.
- Avoid credentials in URLs; they can leak via process listings.

## Escalate when

- Switch to browser automation for JavaScript-heavy or login-driven sites.
- Switch to `curl` only if the task needs HTTP method/header ergonomics more than download behavior.
