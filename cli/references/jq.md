# jq

Use `jq` for JSON queries, transformation, and validation.

## Best for

- Extracting fields from API responses
- Reformatting JSON in pipelines
- Testing JSON conditions with exit codes

## High-signal commands

```bash
jq '.items[] | .name' data.json
jq -r '.version' package.json
jq -e '.status == "ok"' response.json
jq --arg tag 'v1.2.3' '.image.tag = $tag' deploy.json
```

## Sharp edges

- Shell quoting breaks many otherwise-correct filters.
- `--arg` passes a string; `--argjson` passes parsed JSON.
- `--stream` changes the data model and is mainly for very large inputs.

## Escalate when

- Switch to `yq` for YAML-first workflows.
- Switch to a schema validator when structure guarantees matter more than ad hoc filters.
