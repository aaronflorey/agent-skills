---
description: Run every available TODO through run-todo and commit after each completed item
agent: build
subtask: false
---

Run every available TODO from `.planning/TODO.md` using the `run-todo` workflow until there are no runnable TODOs left or a blocker is reached.

Arguments supplied by the user, if any: `$ARGUMENTS`

## Explicit commit authorization

By running `/run-all-todos`, the user explicitly authorizes this command, in the current session, to mark each successfully completed TODO as complete and commit after each TODO item without asking for separate per-TODO approval.

This authorization is intentionally narrow:

- It applies only to TODOs selected from the existing `.planning/TODO.md` queue.
- It applies only after implementation, review, verification, and your own audit have passed for the active TODO.
- It requires one git commit per completed TODO.
- It does not authorize pushing.
- It does not authorize committing unrelated pre-existing user changes.
- It does not authorize guessing on product, architecture, dependency, UX, security, storage, or API decisions.

This explicit current-session authorization overrides the `/run-todo` approval wait only when `/run-todo` is being used as part of this `/run-all-todos` command. All other `/run-todo` safety rules still apply.

## Required workflow source

Use the `run-todo` command workflow as the authoritative single-TODO process.

Before running any TODO:

1. Read the installed or repository-local `run-todo` command instructions if accessible.
2. Follow the `run-todo` process for selecting, preparing, delegating, reviewing, verifying, repairing, marking complete, and committing exactly one TODO.
3. Apply the explicit commit authorization above instead of stopping to ask for per-TODO commit approval.

If command invocation is supported in the active environment, invoke `/run-todo` for each TODO with clear context that it is running under `/run-all-todos` preapproved commit mode. If direct command invocation is not supported, execute the same workflow yourself from the `run-todo` instructions.

## Non-negotiable rules

- Complete and commit at most one TODO at a time.
- Commit immediately after each TODO passes review, verification, and audit, before selecting the next TODO.
- Use the Task tool to invoke `todo-executor`, `todo-reviewer`, and `todo-verifier` for each implementation TODO, matching `run-todo`.
- Do not run more than one executor or repair task at the same time.
- Do not skip review or verification after implementation or repair.
- Do not mark a TODO complete until reviewer and verifier return substantive `PASS` and you have personally checked their work.
- Do not continue to the next TODO while the current TODO has uncommitted changes.
- Do not push.
- Stop if unrelated pre-existing changes cannot be safely separated from active TODO changes.
- Stop only if the active TODO requires a product, public API or CLI, persistence or migration, security, dependency or tooling, architecture, external integration, or UX choice that is not already approved by `.planning/PRD.md`, `.planning/IMPLEMENTATION-PLAN.md`, the active TODO brief, existing project conventions, or the user's current-session answers.
- Do not stop for normal implementation issues covered by `run-todo`: stale expected-file lists, directly required adjacent-file edits, missing helper/test/seam files, generated artifacts that should be reused, or checks failing because of the active implementation. Repair those within the active TODO when PRD-consistent.
- Stop if required files are missing and cannot be reconstructed safely.
- Stop if review or verification fails after the repair attempts allowed by `run-todo`.

## Loop control

Repeat this loop:

1. Inspect `git status --short` before selecting a TODO.
2. Select the next runnable TODO using the `run-todo` selection rules.
3. If no pending or resumable TODO exists, report completion and stop.
4. Run exactly one TODO through the full `run-todo` workflow.
5. After review and verification pass, mark the TODO complete using the `run-todo` state-update rules.
6. Stage only active-TODO changes.
7. Commit with the `run-todo` commit message format unless project conventions require another format.
8. Record the commit hash and continue to the next TODO.

If the next queue item is a review or verification TODO, do not skip it. Run it through the same one-TODO loop and commit its state changes/results if it completes.

## Failure handling

- If a TODO becomes blocked, update `.planning/TODO.md` according to the `run-todo` failure rules, leave any safe planning-state changes uncommitted unless `run-todo` would commit them, report the blocker, and stop.
- If checks fail and cannot be repaired, do not commit the failed implementation.
- If a commit fails, stop and report the exact failure. Do not continue to another TODO.
- If the queue is inconsistent, stop and describe the inconsistency instead of guessing.

## Final response

Return a concise report in this exact structure:

```text
RUN-ALL-TODOS RESULT: COMPLETE | PARTIAL | BLOCKED
TODOs completed: <n>
Commits created:
- <TODO-ID>: <commit-hash>, <short objective>
Stopped at: <TODO-ID or none>
Reason: <completed queue | blocker | failure>
Checks summary:
- <brief summary across completed TODOs>
Next recommended TODO: <id or none>
Important notes:
- <note or none>
```
