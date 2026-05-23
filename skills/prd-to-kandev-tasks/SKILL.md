---
name: prd-to-kandev-tasks
description: Break PRDs, specs, or feature briefs into Kandev task graphs and submit them through MCP or agentctl. Use when asked to decompose product work, create Kandev tasks, slice PRDs into agent-ready work, or submit task graphs without blocking assigned agents.
version: 1.0.0
source: local
license: MIT
kandev:
  system: true
  version: "0.42.0"
  default_for_roles: [ceo, worker, specialist]
---

# PRD to Kandev Tasks

Use this when a PRD, spec, roadmap item, or feature brief must become actionable Kandev tasks. Your job is to create a task graph that assigned agents can execute without needing your hidden context.

## Preconditions

- You have the PRD text, file path, or task description that contains the requested product work.
- You can inspect the current project folder before creating tasks.
- You have either Kandev MCP tools or `$KANDEV_CLI`. Prefer MCP when available because it supports rich task descriptions, repositories, workflow IDs, blockers, and auto-start controls.

## Workflow

1. Discover the project from the folder.
2. Extract requirements and risks from the PRD.
3. Draft a task graph before creating anything.
4. Validate every task brief against the quality gates.
5. Submit with MCP or CLI using the rules below.
6. Leave a concise handoff comment or plan summary with created task IDs and unresolved questions.

## Step 1: Discover the project

Inspect enough local evidence to make task briefs self-contained:

- Read project instructions first: `AGENTS.md`, `CLAUDE.md`, `.agents/`, `.opencode/`, or equivalent.
- Read high-signal docs: `README*`, `docs/specs/INDEX.md`, nearby specs, ADRs, and existing plans.
- Identify stack and commands from manifests: `package.json`, `pnpm-workspace.yaml`, `go.mod`, `Cargo.toml`, `pyproject.toml`, `Makefile`, `mise.toml`, CI files.
- Check current repo state with `git status --short`; do not plan tasks that overwrite unrelated local changes.
- Use Kandev discovery when available: list workspaces, workflows, workflow steps, repositories, agents, executor profiles, and related tasks.

Stop discovery when you can answer: what repo is being changed, what stack is used, what tests verify it, what conventions apply, and which agents should own each slice.

## Step 2: Extract the PRD

Create a concise working summary with:

- Goal and user-visible outcome.
- Non-goals and explicit exclusions.
- Users, roles, permissions, and affected surfaces.
- Acceptance criteria and success metrics.
- Technical constraints: APIs, schemas, migrations, background jobs, security, performance, compatibility, rollout.
- Dependencies and sequencing constraints.
- Open questions that truly block execution.

Ask at most one bundled clarifying question only when the answer affects external interfaces, persisted data, migrations, destructive actions, legal/security policy, or an irreversible product decision. For routine implementation choices, choose a reasonable default and document it in the relevant task.

## Step 3: Build A Task Graph

Do not create a flat checklist. Create tasks with explicit relationships:

- Discovery or spike tasks only when implementation cannot be scoped from existing evidence.
- Implementation tasks sized for one coherent agent session and one reviewable diff.
- Migration or data tasks separated from UI/API work when rollback or ordering matters.
- Test, QA, review, documentation, and release tasks when they are real deliverables.
- Human decision tasks only for genuine blockers.
- Dependency edges through `blocked_by` or sequential child ordering for work that must not run in parallel.

Prefer fewer, stronger tasks over many vague microtasks. Split when two tasks need different repositories, different owners, different verification commands, or one can run independently while the other waits.

## Step 4: Write Each Task Brief

Use `references/task-blueprint.md` for the required brief format. Every task description must include:

- Context the assigned agent will not otherwise know.
- Goal and concrete deliverables.
- Likely files or code areas to inspect.
- Constraints and decisions already made.
- Step-by-step execution guidance.
- Acceptance criteria.
- Verification commands.
- Dependencies, blockers, and expected handoff output.

The description is the sub-agent's launch prompt in MCP-created tasks. Never rely on your private reasoning, current chat history, or a title-only task.

## Step 5: Validate Before Creating

Reject and revise the task graph if any gate fails:

- No task lacks acceptance criteria.
- No auto-started task has an empty or generic description.
- No task says only "implement this PRD", "fix bugs", "add tests", or "update docs".
- No task spans unrelated deliverables just to reduce task count.
- No dependency is implicit when parallel execution could conflict.
- No task requires a repo, workflow, agent, or executor ID you have not resolved or intentionally omitted.
- No task asks an agent to make a human/product decision that you could have asked once up front.
- No task depends on local uncommitted changes unless the brief explicitly identifies that risk.

## Submit With MCP

Use MCP when `create_task_kandev` is available.

- In task mode, use `parent_id: "self"` for decomposition of the current task.
- For external top-level task creation, omit `parent_id` and provide `repository_id`, `repository_url`, or `local_path`.
- Resolve ambiguous `workspace_id`, `workflow_id`, `workflow_step_id`, repositories, agent profiles, and executor profiles before creating tasks.
- Pass the full task brief as `description`.
- Use `start_agent: false` for backlog/staged tasks or when human approval is needed first.
- Use `blocked_by` for dependency edges when creating tasks with known blockers.
- Use `default_child_ordering: "sequential"` for ordered sibling phases and `"parallel"` only when tasks are safe to run concurrently.
- Use explicit repository or branch fields for cross-repo work; otherwise let subtasks inherit parent repository context.

Common MCP creation shape:

```json
{
  "parent_id": "self",
  "title": "Implement account invite API",
  "description": "<full task brief from references/task-blueprint.md>",
  "repository_id": "<repo-id-if-needed>",
  "workflow_id": "<workflow-id-if-needed>",
  "workflow_step_id": "<start-step-if-needed>",
  "agent_profile_id": "<worker-or-specialist-profile-if-needed>",
  "executor_profile_id": "<executor-profile-if-needed>",
  "start_agent": true,
  "blocked_by": ["<blocking-task-id>"],
  "default_child_ordering": "sequential"
}
```

## Submit With CLI

Use CLI when running as a Kandev office agent and MCP mutation tools are unavailable.

```bash
$KANDEV_CLI kandev agents list
$KANDEV_CLI kandev task create --title "Implement account invite API" \
  --parent "$KANDEV_TASK_ID" --assignee "<agent-id>" --blocked-by "<task-id>"
```

CLI caveat: the current singular `task create` command supports title, parent, assignee, priority, and blocked-by. If your CLI does not support rich descriptions, do not create auto-started title-only implementation work. Prefer MCP, a native office runtime action, or create a planning/comment handoff and explicitly note that rich task creation is blocked by the CLI surface.

Always post progress before status changes:

```bash
$KANDEV_CLI kandev comment add --body "Created PRD task graph: <task IDs and sequencing>. Remaining question: <none or one blocker>."
```

## Blocker Policy

- Front-load discovery to avoid delegating uncertainty.
- Make routine technical decisions yourself and write them into task briefs.
- Bundle product/API/schema questions into one human decision task only when required.
- If a task is blocked by another task, encode it with `blocked_by` or sequential child ordering before agents start.
- If you discover that the submission surface cannot carry enough context, stop and report that as the blocker instead of launching vague tasks.

## Examples

See `references/examples.md` for:

- Happy-path PRD decomposition.
- Guarded sequencing with a human decision task.
- Vague-task anti-patterns and corrected task briefs.

## Final Output

Report:

- Task graph created, including task IDs, owners, and dependencies.
- Submission method used: MCP, CLI, or blocked fallback.
- Verification or review tasks created.
- Any open question, why it blocks, and who owns the answer.
