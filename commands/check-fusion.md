---
description: Check in on Fusion tasks via the fn CLI and summarize what needs attention
agent: build
subtask: false
---

Check in on the current Fusion board and report the tasks that matter most.

Arguments supplied by the user, if any: `$ARGUMENTS`

## Requirements

- Load the `fusion` skill before doing anything else so you follow the current Fusion model and terminology.
- Use the Bash tool and the `fn` CLI for board inspection. Prefer CLI inspection over extension tools for this command.
- Start with `fn task list`.
- If `$ARGUMENTS` is non-empty and clearly names a project, include it with the CLI as `--project "$ARGUMENTS"`.
- If the `fn` command is unavailable or the current project is not registered with Fusion, stop and report the exact failure.
- Do not modify tasks, settings, comments, steering, or dashboard state.
- Do not create tasks.

## Suggested workflow

1. Run `fn task list` or `fn task list --project "$ARGUMENTS"`.
2. Identify tasks in `in-progress`, `in-review`, `blocked` or equivalent stalled states, plus the next useful `todo` items.
3. For the most relevant tasks, run `fn task show <TASK-ID>` to inspect details.
4. If an in-progress task looks stuck or ambiguous, run `fn task logs <TASK-ID> --limit 50` only when needed to explain the status.
5. Summarize what is active, what is blocked, and what the user should pay attention to next.

## Output requirements

Return a concise report in this exact structure:

```text
FUSION CHECK: OK | PARTIAL | BLOCKED
Project: <detected project name or default>
Board summary:
- triage: <count or unknown>
- todo: <count or unknown>
- in-progress: <count or unknown>
- in-review: <count or unknown>
- done: <count or unknown>
- archived: <count or unknown>
Tasks needing attention:
- <TASK-ID>: <state>, <why it matters now>
Next useful tasks:
- <TASK-ID or none>: <short reason>
Notes:
- <important detail, blocker, or none>
```
