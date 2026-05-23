# Kandev Submission Reference

## MCP Preferred Path

Use MCP for PRD decomposition when available because `create_task_kandev` accepts the fields needed for reliable agent startup.

Required before creation:

- Workspace resolved or intentionally omitted because it is unambiguous.
- Workflow and start step resolved when the task should enter a specific lane.
- Repository resolved for top-level tasks through `repository_id`, `repository_url`, or `local_path`.
- Agent and executor profiles resolved when auto-start behavior must be deterministic.
- Full description written from `task-blueprint.md`.

Important MCP behavior:

- `parent_id: "self"` means decompose the current task in task mode.
- Omit `parent_id` for unrelated top-level tasks from external mode.
- Subtasks inherit workspace, workflow, repository, base branch, agent profile, and executor when not overridden.
- Cross-repo subtasks should pass repository fields explicitly.
- `start_agent: false` creates a staged task without launching an agent.
- `default_child_ordering: "sequential"` creates dependency edges between sibling children.
- `blocked_by` links explicit blockers.
- The created task's `description` becomes the launch prompt for the assigned agent.

## CLI Fallback Path

Use `$KANDEV_CLI` for office-agent operations when MCP mutation tools are not available.

Known singular task-create surface:

```bash
$KANDEV_CLI kandev task create --title "Task title" \
  [--parent "$KANDEV_TASK_ID"] [--assignee "<agent-id>"] \
  [--priority high|medium|low|critical] [--blocked-by "T-1,T-2"]
```

Known task and comment helpers:

```bash
$KANDEV_CLI kandev task get [--id T-1]
$KANDEV_CLI kandev task update [--id T-1] --status in_progress
$KANDEV_CLI kandev task update [--id T-1] --comment "Status note"
$KANDEV_CLI kandev comment add [--task T-1] --body "Comment body"
$KANDEV_CLI kandev comment add --body - < brief.md
$KANDEV_CLI kandev agents list
$KANDEV_CLI kandev tasks list [--status todo] [--assignee A-1] [--project P-12]
$KANDEV_CLI kandev tasks message --id T-1 --prompt "Handoff note"
$KANDEV_CLI kandev tasks conversation --id T-1
```

Do not hardcode `KANDEV_API_URL` or `KANDEV_API_KEY`; the CLI reads environment variables injected by Kandev.

## CLI Caveat

If the CLI create command cannot pass a rich `description`, it is unsafe for auto-started PRD implementation tasks because assigned agents receive too little context. In that case:

- Prefer MCP.
- Or use a native office runtime action if available to the agent and it accepts `description`.
- Or create a coordination note and report that rich task creation is blocked by the current CLI surface.
- Do not launch several title-only implementation tasks and hope agents infer the PRD.
