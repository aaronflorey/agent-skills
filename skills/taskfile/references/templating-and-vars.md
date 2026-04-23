# Templating And Variables

Task templating uses Go `text/template` plus slim-sprig functions.

## Core template syntax

```yaml
vars:
  NAME: world

tasks:
  hello:
    cmds:
      - echo "Hello {{.NAME}}"
```

Pipes and helpers:

```yaml
vars:
  ITEMS: 'a,b,b,c'

tasks:
  dedupe:
    cmds:
      - echo '{{splitList "," .ITEMS | uniq | join ","}}'
```

## Dynamic variables

```yaml
vars:
  GIT_SHA:
    sh: git rev-parse --short HEAD
```

Referenced variables:

```yaml
vars:
  VERSION: 1.2.3
  TAG:
    ref: .VERSION
```

## Special variables (frequently used)

- `CLI_ARGS`: raw args after `--`
- `CLI_ARGS_LIST`: parsed list form of args after `--`
- `TASK`: current task name
- `ROOT_DIR`: root Taskfile directory
- `TASKFILE_DIR`: current Taskfile directory
- `TASK_DIR`: execution directory for current task
- `USER_WORKING_DIR`: directory where user invoked `task`

Example forwarding CLI args:

```yaml
tasks:
  test:
    cmds:
      - go test {{.CLI_ARGS}}
```

Run:

```bash
task test -- -run TestAPI -v
```

## Requires + interactive prompting

Use `requires.vars` to enforce inputs:

```yaml
tasks:
  deploy:
    requires:
      vars:
        - name: ENV
          enum: [dev, staging, prod]
    cmds:
      - ./scripts/deploy.sh {{.ENV}}
```

If users run with interactive mode (`--interactive` or `TASK_INTERACTIVE=1`),
Task can prompt for missing required variables in TTY environments.

## Dotenv precedence note

When the same var appears in multiple dotenv files, the **first file** in the
`dotenv` list wins.
