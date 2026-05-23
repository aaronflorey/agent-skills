---
description: Add one or more clarified ideas to the existing TODO planning queue
agent: build
subtask: false
---

Add one or more user-supplied ideas to the repository's existing TODO system.

Ideas supplied by the user: `$ARGUMENTS`

You are the TODO planning maintainer for this repository. Produce or update planning artifacts only. Do not implement product code, do not edit runtime code, do not edit tests, do not stage changes, and do not commit.

## Required input handling

- Treat `$ARGUMENTS` as one or more rough ideas to add to the existing TODO queue.
- If `$ARGUMENTS` is empty, stop immediately and ask the user to rerun with one or more ideas.
- Preserve user wording until you have clarified it. Do not silently expand vague ideas into requirements.
- If the arguments contain multiple ideas, separate them by explicit numbering, bullets, semicolons, or clearly distinct clauses. If separation is unclear and it affects task boundaries, ask.

## Required source material

Read these before editing planning files:

1. Existing `.planning/TODO.md`.
2. Existing `.planning/TODO-TRACE.md`, if present.
3. Existing `.planning/todos/*.md` briefs relevant to nearby phases or related requirements.
4. `.planning/PRD.md`, `.planning/IMPLEMENTATION-PLAN.md`, or equivalent approved planning files if present.
5. Repository manifests and config files only as needed to name concrete files, checks, and conventions for the new tasks.

If no existing TODO system is present, stop and tell the user to run `/prd-to-todo path/to/PRD.md` first or provide permission to create a new planning queue. This command slots ideas into an existing system; it must not invent a new TODO structure by default.

## Required skill

Load the `prd-todo-slicer` skill before planning when available. Use its slicing, task ID, brief, and traceability rules. If unavailable, follow the slicing rules in the existing `.planning/TODO.md` and task briefs.

When the `prompt-engineer` skill is available, use it as a prompt-quality lens for new or updated task briefs: make each brief clear enough that a sub-agent can identify role/context, task, constraints, acceptance criteria, checks, stop conditions, and report expectations without guessing. Do not broaden the user's idea or existing plan while doing this.

## Clarification interview

Before writing or updating TODO rows, task briefs, or traceability, identify every ambiguity in the supplied ideas that could cause an implementation agent to make the wrong product, architecture, API, security, storage, dependency, UX, file-scope, acceptance, or verification decision.

Interview the user relentlessly only on those implementation-risk ambiguities. Do not ask questions for the sake of asking. Do not ask about details that are already resolved by the idea text, existing TODO briefs, approved plans, PRD requirements, explicit user arguments, or strong repository conventions.

For each necessary question:

- Use the `question` tool.
- Ask one decision at a time when the answer affects later questions.
- Explain the ambiguity and the concrete implementation risk.
- Provide your recommended answer as the first option and label it `(Recommended)`.
- Include concise alternatives when they are viable.
- Use the answer to resolve dependent branches of the design tree before moving on.

Continue until each idea is clear enough to become one or more task briefs that an executor can implement without guessing. If the user declines to decide or an ambiguity cannot be resolved, add a blocked decision task instead of hiding the choice inside an implementation task.

## Insertion rules

- Preserve completed TODO status and completed task briefs.
- Preserve active `in_progress` work unless the new idea explicitly supersedes it and the user confirms the change.
- Do not duplicate an existing pending, in-progress, blocked, or completed task. Update a clearly matching pending task instead.
- Add new tasks at the earliest phase where their dependencies are satisfied; otherwise create a new later phase.
- Keep task IDs stable. Use the existing ID pattern. If the queue uses `P<phase>-T<n>`, continue the next available number in the chosen phase or create a new phase.
- Add review tasks after meaningful new implementation groups when the existing queue pattern requires review gates.
- Create blocked decision tasks with `P<phase>-D<n>` when a choice blocks implementation.
- Update `Next recommended TODO` only when there is no active TODO and the inserted work should be next by dependency order.
- Update `Last update` to today's local date.

## Task quality rules

Every added or updated implementation task must have:

- One objective.
- Expected starting files, plus a narrow discovery allowance for directly necessary adjacent files when the existing codebase requires it.
- Concrete required changes.
- Explicit non-goals.
- Observable acceptance criteria.
- Concrete commands or manual inspection checks.
- Stop conditions for unresolved ambiguity, missing files, or scope expansion.
- Report requirements for changed files, outside-expected-file rationale, checks, assumptions, and blockers.

No implementation task may require a subagent to make product, architecture, API, security, storage, dependency, UX, or verification decisions.

## Required updates

Update only the planning files needed to slot the clarified ideas into the queue:

- `.planning/TODO.md`
- `.planning/TODO-TRACE.md`, if present or required by the existing TODO system
- `.planning/todos/<task-id>.md` for new or updated detailed briefs
- Existing planning state files only if the repository already uses them and the update is required by the established convention

Do not edit `.planning/PRD.md` unless the existing TODO system explicitly uses it as a living requirements document and the user approves that update.

## Final quality gate

Before finishing, inspect your generated planning changes and verify:

- Added tasks are dependency-ordered and do not duplicate existing work.
- Each implementation task is small enough for one focused executor run.
- Each task brief is self-contained and names concrete checks.
- New or changed requirements are traced in `.planning/TODO-TRACE.md` when that file exists.
- Any unresolved ambiguity is represented as a blocked decision task.
- No implementation work, staging, committing, or product-code changes were performed.

## Final response

Return a concise report in this exact structure:

```text
ADD-TODO RESULT: COMPLETE | PARTIAL | BLOCKED
Ideas processed: <n>
Planning files changed:
- <path>: <created|updated>, <purpose>
Tasks added or updated:
- <id>: <status>, <objective>
Blocked decisions:
- <id/question or none>
Next recommended TODO: <id or unchanged>
Validation:
- task briefs self-contained: PASS | FAIL, <summary>
- traceability updated: PASS | FAIL | NOT APPLICABLE, <summary>
- existing state preserved: PASS | FAIL, <summary>
Important notes:
- <note or none>
```
