# Taskfile Schema And Model

This reference summarizes the most-used Taskfile schema features from Task v3.

## Root keys

```yaml
version: '3'
output: interleaved # or group/prefixed
method: checksum # or timestamp/none
dotenv: ['.env.local', '.env']
vars: {}
env: {}
includes: {}
tasks: {}
```

Common root keys:
- `version`: schema version (`'3'` or semver-like string)
- `output`: output mode (`interleaved`, `group`, `prefixed`)
- `method`: default up-to-date method (`checksum`, `timestamp`, `none`)
- `dotenv`: env files loaded in order; first file has highest precedence
- `vars`, `env`: global variables/environment
- `includes`: import Taskfiles
- `tasks`: task definitions

## Task shapes

Task definitions can be shorthand or full objects.

```yaml
tasks:
  hello: echo "hi"

  build:
    - go mod tidy
    - go build ./...

  test:
    cmd: go test ./...
```

Preferred production shape:

```yaml
tasks:
  build:
    desc: Build application binary
    deps: [lint]
    dir: .
    vars:
      OUT: dist/app
    sources:
      - '**/*.go'
      - go.mod
      - go.sum
    generates:
      - '{{.OUT}}'
    requires:
      vars: [OUT]
    preconditions:
      - sh: command -v go >/dev/null 2>&1
        msg: Go is required
    cmds:
      - go build -o {{.OUT}} ./cmd/app
```

## Common task keys

- `desc`, `summary`: user-facing docs for list/summary output
- `aliases`: alternate names
- `internal`: hide helper task from direct use
- `cmd` / `cmds`: command execution
- `deps`: prerequisite tasks (parallel)
- `vars`, `env`, `dotenv`: scoped data injection
- `dir`: per-task working directory
- `sources`, `generates`, `status`: up-to-date checks
- `method`: override root method
- `preconditions`: fail early with optional custom messages
- `requires.vars`: enforce required input vars (can include enum validation)
- `watch`: auto-rerun on changes
- `platforms`: platform restriction (e.g. `linux`, `darwin`, `windows`)
- `if`: conditionally skip task/command without failing

## Include model

```yaml
includes:
  api: ./services/api
  web:
    taskfile: ./services/web/Taskfile.yml
    dir: ./services/web
    optional: false
    flatten: false
    internal: false
    aliases: [frontend]
    excludes: [private-task]
    vars:
      SERVICE: web
```

Key include options:
- `taskfile`: file or directory containing Taskfile
- `dir`: working dir for included tasks
- `optional`: do not fail if missing
- `flatten`: remove namespace and merge tasks into root
- `internal`: mark all included tasks internal
- `aliases`: namespace aliases
- `excludes`: skip selected tasks from include
