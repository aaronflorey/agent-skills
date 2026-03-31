# Execution Patterns

Use this reference to model dependency flow, idempotency, and speed.

## Parallel vs serial orchestration

- `deps` run before the current task and are intended for parallel prerequisites.
- Use command-level task calls for ordered/serial execution.

```yaml
tasks:
  verify:
    deps: [lint, test]
    cmds:
      - echo "Verification complete"

  release:
    cmds:
      - task: verify
      - task: package
      - task: publish
```

## Up-to-date checks

Prefer deterministic incremental behavior:

1. `sources` + `generates` for file-based invalidation.
2. `status` when readiness is better expressed as shell checks.
3. `method` controls comparison strategy (`checksum`, `timestamp`, `none`).

```yaml
tasks:
  codegen:
    sources:
      - schema/**/*.yaml
      - templates/**/*.tmpl
    generates:
      - gen/client.ts
      - gen/server.go
    cmds:
      - ./scripts/generate.sh
```

## Preconditions vs if

- `preconditions`: fail task early if conditions not met.
- `if`: skip task (or command) if condition fails; not an error.

```yaml
tasks:
  deploy:
    preconditions:
      - sh: test -n "$API_TOKEN"
        msg: API_TOKEN is required
    if: '[ "${CI:-}" = "true" ]'
    cmds:
      - ./scripts/deploy.sh
```

## Command-level controls

Command objects support advanced behavior:

```yaml
tasks:
  build:
    cmds:
      - cmd: go test ./...
        silent: true
      - cmd: go build ./...
        ignore_error: false
      - defer: echo "cleanup"
```

## Shell state caveat

Each command runs in its own shell process. Do not rely on shell variables from
one command in the next unless you use a multiline command block:

```yaml
cmds:
  - |
    export A=1
    echo "$A"
```
