# Sources And Design Notes

## Local Sources Inspected

- `AGENTS.md`: repository layout, tooling, task lifecycle event requirements, worktree conventions, specs/ADR guidance.
- `apps/backend/internal/office/configloader/skills/kandev-protocol/SKILL.md`: office agent heartbeat, CLI environment variables, status/comment rules, task creation examples.
- `apps/backend/internal/office/configloader/skills/kandev-tasks/SKILL.md`: plural task list/move/archive/message/conversation commands.
- `apps/backend/internal/office/configloader/skills/kandev-escalation/SKILL.md`: human escalation intent and blocker workflow.
- `apps/backend/internal/office/configloader/instructions/ceo/AGENTS.md`: CEO delegation model and one-task-per-agent rule.
- `apps/backend/internal/office/configloader/instructions/worker/AGENTS.md`: worker task ownership and self-decomposition behavior.
- `apps/backend/internal/mcp/server/server.go`: MCP modes and available Kandev tools by mode.
- `apps/backend/internal/mcp/server/config_handlers.go`: workspace, workflow, workflow-step, and repository discovery tools.
- `apps/backend/internal/mcp/handlers/handlers.go`: `create_task_kandev` payload, validation, repository inheritance, blockers, and auto-start behavior.
- `apps/backend/internal/office/runtime/actions.go`: office runtime subtask action accepts `title` and `description` and enforces capability/scope.
- `apps/backend/internal/office/service/service.go`: office task creation permission checks.
- `apps/backend/cmd/agentctl/kandev_task.go`: singular CLI task create/update/get flags.
- `apps/backend/cmd/agentctl/kandev_tasks.go`: plural CLI list/move/archive/message/conversation flags.
- `apps/backend/cmd/agentctl/kandev_comment.go`: comment add/list flags and stdin support.

## Decisions

- The skill is a workflow-process skill because the hard part is ordered discovery, decomposition, validation, and submission safety.
- MCP is the preferred submission path because it carries rich descriptions and repository/workflow metadata needed for autonomous agent startup.
- CLI is documented as a fallback because the currently observed singular `task create` command does not carry a rich description field.
- The skill requires a task graph, not a flat list, because blockers were the user's primary failure mode.
- The task description blueprint is bundled as a separate reference because it is reused for every generated task and should stay deterministic.

## Coverage Matrix

| Dimension | Coverage status | Evidence |
|---|---|---|
| Project discovery from folder | covered | `SKILL.md` Step 1 |
| PRD extraction | covered | `SKILL.md` Step 2 |
| Task slicing and dependency graphing | covered | `SKILL.md` Step 3 |
| Task description quality | covered | `references/task-blueprint.md` |
| MCP submission | covered | `SKILL.md`, `references/kandev-submission.md` |
| CLI fallback | covered | `SKILL.md`, `references/kandev-submission.md` |
| Blocker avoidance | covered | quality gates, blocker policy, examples |
| Happy path, guarded path, anti-pattern correction | covered | `references/examples.md` |

## Open Gaps

- Confirm whether future `agentctl kandev task create` versions add a rich `description` flag; until then, prefer MCP or a native office runtime action for rich task creation.
