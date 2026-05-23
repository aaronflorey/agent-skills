---
name: prd-todo-slicer
description: Break a PRD.md into a small, deterministic TODO.md queue and per-task briefs that sub-agents can execute safely one task at a time.
version: 1.0.0
source: local
license: MIT
compatibility: opencode
metadata:
  input: PRD.md
  default_outputs: TODO.md,.planning/todos/*.md,.planning/TODO-TRACE.md
---

## What I do

Use this skill when the user asks to break a `PRD.md`, product spec, approved implementation plan, or requirements document into an implementation queue.

The output is a lightweight `TODO.md` plus optional detailed task brief files. The queue must be small-slice, deterministic, reviewable, and safe for a focused sub-agent to execute without making product or architecture decisions.

Do not implement product code while using this skill. Produce planning files only.

## Default output layout

Prefer this layout unless the user requests a single-file TODO:

```text
TODO.md
.planning/
  TODO-TRACE.md
  todos/
    P1-T1.md
    P1-R1.md
    P2-T1.md
    P2-R1.md
```

Use `TODO.md` as the queue and status tracker. Put task-specific context in `.planning/todos/<id>.md` so the active executor can load one brief without reading a huge TODO file.

If the repository already uses a different planning directory, keep the existing convention and adapt the paths.

## Required inputs

Read these before writing tasks:

1. `PRD.md` or the PRD path supplied by the user.
2. Any approved implementation plan, architecture note, or design decision document in `.planning/`.
3. Existing repository structure, package manager, test commands, lint commands, typecheck commands, and framework conventions.
4. Existing TODO files, if present, so completed work is preserved rather than duplicated.

If `PRD.md` is missing, unreadable, or contradicts an approved plan, stop and report the exact blocker. Do not invent requirements.

When a `prompt-engineer` skill or prompt-quality reference is available, use it only as a clarity check for generated task briefs. Each brief should make role/context, task, constraints, acceptance criteria, checks, stop conditions, and report expectations explicit enough for a sub-agent to follow without rereading the full PRD.

## Clarification interview

Before writing or updating requirements, TODO rows, task briefs, or traceability, identify every PRD ambiguity that could cause an implementation agent to make the wrong product, architecture, API, security, storage, dependency, UX, or verification decision.

Interview the user relentlessly only on those implementation-risk ambiguities. Do not ask questions for the sake of asking. Do not ask about details that are already resolved by the PRD, approved plans, explicit user arguments, or strong existing repository conventions.

For each necessary question:

- Use the `question` tool when available.
- Ask one decision at a time when the answer affects later questions.
- Explain the ambiguity and the concrete implementation risk.
- Provide your recommended answer as the first option and label it `(Recommended)`.
- Include concise alternatives when they are viable.
- Use the answer to resolve dependent branches of the design tree before moving on.

Continue until the remaining PRD is clear enough to produce requirements and task briefs that an executor can implement without guessing. If the user declines to decide or an ambiguity cannot be resolved, create a blocked decision task instead of hiding the choice inside an implementation task.

## Slicing standard

Every implementation task must be executable by one sub-agent in one focused run.

A task is too large if any of these are true:

- It combines unrelated concerns, such as schema design plus UI plus persistence.
- It requires an unapproved product, API, security, storage, or architecture decision.
- It touches more than one feature area unless the coupling is unavoidable and explicitly explained.
- It cannot be verified with concrete checks or inspection steps.
- Its objective needs words like “finish”, “wire up everything”, “polish”, “support”, “integrate”, “make robust”, or “implement the system”.
- It has more than seven acceptance criteria.
- It depends on behavior not already present in the PRD, approved plan, or repository conventions.

When a task is too large, split by this order:

1. Contracts and types.
2. Pure validation or state logic.
3. Core behavior with tests.
4. Persistence or IO boundary.
5. Adapter or framework integration.
6. UI or CLI surface.
7. Error handling and edge cases.
8. Documentation or migration notes.
9. Final review and verification.

## Task ID rules

Use stable IDs:

- `P<phase>-T<n>` for implementation tasks.
- `P<phase>-R<n>` for review tasks.
- `P<phase>-V<n>` only when verification is complex enough to deserve a separate task.
- `P<phase>-D<n>` for blocked decision tasks that require user approval before implementation.

Examples: `P1-T1`, `P1-R1`, `P2-D1`.

Phases must represent dependency order, not calendar time. Earlier phases should unblock later phases.

## Planning workflow

Follow this process exactly:

1. Read the PRD fully and list the product outcomes, non-goals, constraints, user-visible behaviors, data/state requirements, integrations, and verification requirements.
2. Inspect the repository enough to identify current structure, package manager, language, test commands, and naming conventions.
3. Run the clarification interview for implementation-risk ambiguities and record resolved decisions in the generated planning artifacts.
4. Convert PRD requirements into a dependency graph. Put prerequisites first: project skeleton, schemas, types, state, core logic, adapters, interfaces, then documentation.
5. Create phases around natural gates. Each phase should end with a review task.
6. Create implementation tasks that each have one objective, expected starting files, acceptance criteria, checks, and stop conditions. File lists should guide the executor, not block directly necessary adjacent-file edits.
7. Create review tasks after meaningful implementation groups. Review tasks must compare implementation against the task brief, PRD, and approved plan.
8. Create decision tasks for unresolved choices. Mark them `blocked`; do not hide decisions inside implementation tasks.
9. Write `TODO.md` as a compact queue summary and status tracker.
10. Write one detailed brief file per task under `.planning/todos/`.
11. Write `.planning/TODO-TRACE.md` mapping PRD requirements to task IDs and listing unresolved decisions.
12. Run a final planning quality pass: no vague tasks, no hidden decisions, no duplicate work, no unverified requirements, no orphan PRD requirements.

## TODO.md requirements

`TODO.md` must stay lightweight. Include these sections in this order:

1. Title.
2. Purpose statement.
3. Status values.
4. Current progress.
5. Operating rules.
6. Sub-agent responsibilities.
7. Queue summary table.
8. Detailed brief index.
9. Traceability pointer.

Use this status vocabulary only:

- `pending`: not started.
- `in_progress`: currently active.
- `blocked`: waiting on a decision or failed verification.
- `complete`: accepted and verified.

The queue summary table must include:

```markdown
| ID | Status | Objective | Brief | Verification |
| --- | --- | --- | --- | --- |
| P1-T1 | pending | Create minimal workspace skeleton. | `.planning/todos/P1-T1.md` | Install, test, typecheck, lint. |
```

The `Objective` must be one sentence. The `Verification` cell must name concrete commands or inspection checks.

## TODO.md template

Use this template and fill it with project-specific content:

```markdown
# <Project> TODO

This file is the queue and status tracker for <Project>. It is not product runtime state. Completion is proven by code, tests, review, verification, and any canonical planning state required by this repository.

## Status Values

- `pending`: not started.
- `in_progress`: currently active.
- `blocked`: waiting on a decision or failed verification.
- `complete`: accepted and verified.

## Current Progress

Current TODO: none

Next recommended TODO: <first-pending-task-id>

Last update: <YYYY-MM-DD>

## Operating Rules

- Work on one TODO per run.
- Before editing code, read the matching detailed brief in `.planning/todos/`.
- If `.planning/PLAN.md` is used by this repository, rebuild it from the active detailed brief and the approved implementation plan before implementation.
- Use focused sub-agents when available: executor for implementation, reviewer for plan/PRD review, verifier for behavior/check validation, repair for focused fixes.
- Do not run multiple executor sub-agents against the same TODO at the same time.
- The main agent remains responsible for orchestration, final judgement, and state updates.
- Do not skip a review TODO after an implementation TODO group.
- Do not mark a TODO complete until checks and review/verification pass.
- Stop and ask if a TODO requires choices not already approved.
- Do not commit unless explicitly approved by the user in the current run.

## Sub-Agent Responsibilities

- Executor: implement only the active TODO from its detailed brief, make the smallest correct change, and report changed files plus checks run.
- Reviewer: check the implementation against the detailed brief, approved implementation plan, and PRD; prioritize correctness, scope drift, missing tests, and regressions.
- Verifier: run or inspect the required checks from the detailed brief and confirm acceptance criteria are satisfied.
- Repair: fix only focused defects found by review or verification, then return to review/verification.
- If sub-agents are unavailable, the main agent must perform implementation, review, and verification as separate labeled passes.

## Queue Summary

| ID | Status | Objective | Brief | Verification |
| --- | --- | --- | --- | --- |
| <id> | pending | <one-sentence objective> | `.planning/todos/<id>.md` | <commands or inspection checks> |

## Detailed Brief Index

- `<id>`: `.planning/todos/<id>.md`

## Traceability

Requirement coverage and unresolved decisions are tracked in `.planning/TODO-TRACE.md`.
```

## Detailed task brief requirements

Each `.planning/todos/<id>.md` file must be self-contained enough for an executor or reviewer to work safely without re-reading the whole PRD.

Use this template:

```markdown
# <ID>: <Task title>

Status: pending
Type: implementation | review | verification | decision
Phase: <number and short phase name>
Depends on: <task IDs or none>
PRD refs: <file sections, headings, or quoted requirement IDs>
Approved-plan refs: <file sections or none>

## Objective

<One sentence describing the exact outcome.>

## Context

- <Relevant PRD requirement, paraphrased precisely.>
- <Relevant repo convention or existing file.>
- <Dependency or constraint from prior tasks.>

## Expected files

Start with these expected files. You may create or modify another file only when it is directly required for this TODO, consistent with the PRD and approved plan, and documented in your report:

- `<path>`: <exact expected change>
- `<path>`: <exact expected change>

## Required changes

1. <Concrete change.>
2. <Concrete change.>
3. <Concrete change.>

## Non-goals

- <Thing that must not be done in this task.>
- <Future task that must not be pulled forward.>

## Acceptance criteria

- <Observable result.>
- <Observable result.>
- <Observable result.>

## Checks

Run or inspect:

- `<command>`
- `<command>`
- <Manual inspection check, if needed.>

## Report requirements

The executor must report changed files, any files changed outside the expected list with rationale, checks run, acceptance criteria status, assumptions, and blockers.

## Review instructions

The reviewer must verify:

- The implementation matches this brief and does not add unrequested behavior.
- All acceptance criteria are satisfied.
- Required tests or checks pass, or failures are explained and unrelated.
- No later-phase work was pulled into this task.
- Any file changed outside the expected list was directly required, PRD/plan-consistent, and explained.

## Stop conditions

Stop and ask the main agent or user if:

- <Specific ambiguity or conflict.>
- <Expected file/tooling is missing or incompatible.>
- <A needed file outside the expected list would change product behavior, architecture, dependencies, storage, API, security posture, generated artifacts, or scope not already approved.>
```

## Review task brief requirements

A review task must not implement new feature scope. It should inspect, run checks, and produce a verdict.

Review task acceptance criteria must include:

- The reviewer compared code against all implementation task briefs in the phase.
- The reviewer checked relevant PRD and approved-plan requirements.
- The reviewer identified scope drift, missing tests, regressions, and incomplete acceptance criteria.
- The reviewer either accepted the phase or created/updated focused repair TODOs.

Use review tasks after each phase or after every two to four tightly related implementation tasks.

## Decision task requirements

Create a `P<phase>-D<n>` task when implementation cannot proceed without a choice.

A decision task must include:

- The exact unanswered question.
- The PRD section or code constraint that exposed it.
- The viable options.
- The recommended option, if the evidence is strong.
- The tasks blocked by the decision.

Decision tasks start as `blocked`. Do not let executor sub-agents resolve them independently.

## Traceability file

Write `.planning/TODO-TRACE.md` with this structure:

```markdown
# TODO Traceability

## PRD Requirement Coverage

| PRD area | Requirement | Task IDs | Status |
| --- | --- | --- | --- |
| <heading> | <requirement summary> | <ids> | covered | pending-decision | missing |

## Phase Dependencies

| Phase | Depends on | Unlocks |
| --- | --- | --- |
| P1 | none | P2 |

## Unresolved Decisions

| ID | Question | Blocks | Status |
| --- | --- | --- | --- |
| P2-D1 | <question> | <task IDs> | blocked |
```

Every PRD requirement must map to at least one task or an explicit unresolved decision. No task should exist without a PRD, approved-plan, or repository-maintenance reason.

## Concrete slicing examples

Bad task:

```markdown
P2-T1: Implement authentication.
```

Better slices:

```markdown
P2-T1: Define authentication config and validation schemas.
P2-T2: Implement password credential verification as pure core logic.
P2-T3: Add login route adapter using the verified core logic.
P2-T4: Add authentication error handling and regression tests.
P2-R1: Review authentication implementation against PRD security requirements.
```

Bad task:

```markdown
P3-T1: Build dashboard.
```

Better slices:

```markdown
P3-T1: Define dashboard data contract and fixture data.
P3-T2: Implement dashboard data loader with tests.
P3-T3: Render dashboard summary cards from the data contract.
P3-T4: Render empty and error states for dashboard data.
P3-R1: Review dashboard behavior and UI states against PRD acceptance criteria.
```

## Language rules

Use concrete verbs:

- Create
- Add
- Define
- Replace
- Move
- Remove
- Validate
- Verify
- Review

Avoid vague verbs unless followed by exact scope:

- Implement
- Support
- Integrate
- Improve
- Polish
- Harden
- Finish
- Wire up

Replace vague wording with observable outputs. For example, replace “support config” with “define `ConfigSchema` with `mode`, `rootDir`, and `logLevel` defaults, plus schema tests.”

## Final quality checklist

Before finishing, verify all of the following:

- `TODO.md` is short enough to scan quickly.
- Each task has exactly one objective.
- Each implementation task has a detailed brief file.
- Each implementation task has expected starting files and a narrow allowance for justified adjacent-file edits.
- Each implementation task defines report requirements for changed files, outside-expected-file rationale, checks, assumptions, and blockers.
- Each task has concrete acceptance criteria and checks.
- Each phase has a review or verification gate.
- Every PRD requirement is covered in `.planning/TODO-TRACE.md`.
- Ambiguities are represented as blocked decision tasks.
- No task asks a sub-agent to make product or architecture choices.
- No task requires reading the full PRD to understand what to do.
- No task includes committing changes unless the user explicitly approved commits in the current run.
