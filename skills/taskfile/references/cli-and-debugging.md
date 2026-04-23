# CLI And Debugging

## Most useful commands

```bash
task --init
task --list
task --list-all
task <task-name>
task <task1> <task2> --parallel
task <task-name> --status
task <task-name> --summary
task <task-name> --dry
task <task-name> --watch
task <task-name> --force
task --taskfile ./path/Taskfile.yml <task-name>
task --dir ./path <task-name>
task --global <task-name>
```

## Troubleshooting flow

1. `task --list` to confirm task names and aliases.
2. `task <name> --summary` to inspect task metadata.
3. `task <name> --status` to inspect up-to-date logic.
4. `task <name> --dry` to inspect planned execution without running.
5. Add `--verbose` when investigating templating/command behavior.

## Exit code categories

- `0`: success
- `100-199`: Taskfile/schema resolution issues
- `200-255`: task runtime/errors (not found, command error, missing vars, etc.)

Use `--exit-code` when you need failed command exit codes to pass through.

## CI guidance

- Prefer `--output group` for log readability in CI systems.
- Use `--output-group-begin` / `--output-group-end` templates for integrations.
- Keep `desc` fields up to date so JSON/task listings remain useful.

## Useful env overrides

- `TASK_VERBOSE=1`
- `TASK_SILENT=1`
- `TASK_CONCURRENCY=<n>`
- `TASK_FAILFAST=1`
- `TASK_DRY=1`
- `TASK_INTERACTIVE=1`
