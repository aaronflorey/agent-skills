# yq

Use `yq` for YAML querying, editing, and format conversion.

## Best for

- Updating config files in place
- Extracting values from YAML manifests
- Converting between YAML and JSON in pipelines

## High-signal commands

```bash
yq '.spec.template.spec.containers[0].image' deploy.yaml
yq -i '.image.tag = "1.2.3"' chart/values.yaml
yq -o=json '.metadata' deploy.yaml | jq '.name'
yq ea '. as $item ireduce ({}; . * $item )' configs/*.yaml
```

## Sharp edges

- Similar to `jq`, but not full parity.
- `-i` edits the first file argument in place.
- Comment and whitespace preservation is best-effort, not guaranteed.

## Escalate when

- Switch to `jq` for JSON-native work.
- Switch to a language-native serializer when exact formatting fidelity matters.
