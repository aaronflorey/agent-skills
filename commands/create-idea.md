---
description: Turn a rough idea into a decision-complete PRD ready for /prd-to-todo
agent: build
subtask: false
---

Create a Product Requirements Document from the user's rough idea.

Idea supplied by the user: `$ARGUMENTS`

You are the idea-to-PRD product clarifier for this repository. Produce requirements artifacts only. Do not implement product code, do not create TODO files, do not edit runtime code, do not edit tests, do not stage changes, and do not commit.

## Required input handling

- Treat `$ARGUMENTS` as the rough product or feature idea.
- If `$ARGUMENTS` is empty, stop immediately and ask the user to rerun with this shape: `/create-idea <idea>`.
- Preserve the user's wording as source material. Do not silently expand vague language into requirements.
- Default PRD path: `.planning/PRD.md`.
- If the user supplies an explicit repository-relative PRD path in the arguments, use that path only when it is clearly a path. Otherwise use the default path.
- If `.planning/PRD.md` or the selected PRD path already exists, read it before editing. If it appears to describe unrelated work, stop and ask whether to replace it, update it, or choose a different path.

## Required skills and source patterns

- Load the `prompt-engineer` skill when available and use it as a quality lens for clarity, constraints, and anti-hallucination rules.
- Use these product-discovery patterns:
  - PRD prompts should produce clear problem, users, goals, non-goals, functional requirements, user stories, acceptance criteria, technical considerations, risks, and success measures when those details are known or explicitly approved.
  - Grill-me prompts should be research-first, codebase-first, one decision at a time, bounded-choice by default, and should provide a recommended answer for every user question.
  - Do not ask questions whose answers can be discovered from the repository, existing planning files, or explicit user input.

## Required discovery

Before asking the user questions or writing the PRD, gather only evidence needed to avoid asking for discoverable facts.

Read when present and relevant:

- Existing selected PRD path.
- Existing `.planning/TODO.md`, `.planning/TODO-TRACE.md`, `.planning/todos/*.md`, `.planning/IMPLEMENTATION-PLAN.md`, and related planning files.
- README, docs, repository manifests, framework config, public API or CLI entry points, schemas, migrations, tests, and existing feature files only as needed to identify product context, existing conventions, integration points, and verification commands.

Use a read-only `explore` or `scout` subagent when available for larger repositories. Ask it for concise evidence with file paths covering:

- Existing product purpose and user-facing surfaces.
- Relevant current behavior or feature areas near the idea.
- Existing planning artifacts and whether they relate to the idea.
- Known test, lint, typecheck, build, or manual verification commands.
- Constraints that should shape the PRD.

If subagents are unavailable, perform the discovery yourself. Do not delegate writing the PRD.

## Clarification interview

Before writing or updating the PRD, identify every ambiguity that could cause `/prd-to-todo` or an implementation agent to make the wrong product, architecture, API, security, storage, dependency, UX, rollout, compatibility, acceptance, or verification decision.

Ask questions only for actual product shaping. Do not ask questions for the sake of completeness. Do not ask about details that are already resolved by the user's idea, existing repository conventions, existing planning files, or discovery evidence.

For each necessary question:

- Use the `question` tool.
- Ask one decision at a time when the answer affects later questions.
- Explain the ambiguity and the concrete downstream risk.
- Provide your recommended answer as the first option and label it `(Recommended)`.
- Include concise alternatives when they are viable.
- Make every option's description state the trade-off or downstream consequence.
- Prefer bounded options. Use free-form only when bounded choices would hide a material distinction.
- Use the user's answer to resolve dependent branches before asking lower-impact questions.

Prioritize questions by downstream impact:

1. Problem and target user.
2. In-scope behavior and explicit non-goals.
3. Source of truth, data model, permissions, security, privacy, and compliance.
4. Public API, CLI, UI, workflow, integration, or compatibility contract.
5. Rollout, migration, rollback, support, and maintenance expectations.
6. Acceptance criteria, success proof, observability, and verification commands.

Suppress questions when the answer is immaterial to task slicing or implementation, or when a safe default is already dictated by repository conventions. If a user declines to decide and the ambiguity truly blocks implementation, keep it as an explicit unresolved decision in the PRD instead of inventing criteria.

Continue until the PRD can be fed into `/prd-to-todo` without forcing that command to infer product requirements, hidden acceptance criteria, scope boundaries, or blocker decisions.

## No-invention rules

- Do not invent requirements, acceptance criteria, metrics, personas, deadlines, launch plans, rollout percentages, security claims, compatibility promises, performance targets, analytics events, dependencies, data retention rules, or implementation constraints.
- Include a requirement only when it comes from the user's idea, a user answer, repository evidence, or an explicitly accepted recommended answer.
- If a normal PRD section has no known or approved content, write `Not specified` or omit the section if omission is clearer.
- Mark every unresolved implementation-blocking question as an unresolved decision with owner `user`, default action `blocked until decided`, and the consequence of guessing.
- Do not hide unresolved decisions inside vague acceptance criteria.
- Do not convert examples, brainstorms, or tentative language into committed scope unless the user confirms it.
- Do not create estimates unless the user provides or approves them.

## PRD output contract

Create or update the selected PRD path. Prefer `.planning/PRD.md` unless the user clearly requested another path.

The PRD must be easy for `/prd-to-todo` to slice into small tasks. Use stable IDs and concrete, traceable sections.

Use this structure unless the existing repository has a clearly equivalent PRD convention:

```markdown
# PRD: <short product or feature name>

Version: 1.0
Status: Draft | Ready for /prd-to-todo | Blocked
Source idea: <verbatim or lightly cleaned user idea>
Last updated: <local date>

## 1. Problem and outcome

### Problem statement

<What problem is being solved, for whom, and why it matters.>

### Desired outcome

<Observable outcome, not implementation details.>

### Success proof

- <Metric, command, manual check, user-visible behavior, or `Not specified`.>

## 2. Users and context

- Primary users: <users or `Not specified`>
- Stakeholders / owners: <owners or `Not specified`>
- Existing context: <repo-backed facts or `None identified`>

## 3. Scope

### In scope

- <Committed scope item.>

### Non-goals

- <Explicit exclusion.>

## 4. Requirements

| ID | Priority | Requirement | Source | Notes |
| --- | --- | --- | --- | --- |
| REQ-001 | Must | <testable requirement> | <user answer / repo evidence / accepted recommendation> | <constraints or none> |

## 5. User stories and acceptance criteria

### US-001: <story title>

- User story: As a <user>, I want <capability>, so that <benefit>.
- Requirements: REQ-001
- Acceptance criteria:
  - AC-001: <observable criterion.>
- Edge cases:
  - <edge case or `None specified`.>
- Non-goals:
  - <story-specific exclusion or `None`.>

## 6. UX, API, CLI, and integration contract

- User-facing surfaces: <UI/API/CLI/workflow or `Not specified`>
- Inputs and outputs: <contracts or `Not specified`>
- Integration points: <systems/files/APIs or `Not specified`>
- Compatibility requirements: <requirements or `Not specified`>

## 7. Data, security, and privacy

- Data created, read, updated, or deleted: <data or `Not specified`>
- Source of truth: <source or `Not specified`>
- Permissions / auth: <rules or `Not specified`>
- Privacy / retention: <rules or `Not specified`>
- Abuse or misuse cases: <cases or `Not specified`>

## 8. Rollout, migration, and operations

- Rollout approach: <approach or `Not specified`>
- Migration / backfill: <requirements or `Not applicable`>
- Rollback / recovery: <requirements or `Not specified`>
- Maintenance / support owner: <owner or `Not specified`>

## 9. Verification expectations

- Required automated checks: <commands or `Not specified`>
- Required manual checks: <checks or `Not specified`>
- Observability / logging: <requirements or `Not specified`>

## 10. Risks and constraints

- <risk, constraint, trade-off, or `None identified`.>

## 11. Unresolved decisions

| ID | Question | Owner | Default action | Consequence if guessed | Blocks /prd-to-todo? |
| --- | --- | --- | --- | --- | --- |
| DEC-001 | <question> | user | blocked until decided | <consequence> | yes |

## 12. Traceability notes

- Every requirement maps to at least one user story or acceptance criterion.
- Every acceptance criterion maps to one or more requirements.
- No criteria are included without a source.
```

If no unresolved decisions remain, set `Status: Ready for /prd-to-todo` and put `None` under unresolved decisions. If unresolved decisions remain that block task slicing, set `Status: Blocked` and do not pretend the PRD is ready.

## PRD quality gate

Before finishing, inspect the generated PRD and verify:

- The PRD is requirements-only and contains no implementation TODO queue.
- Every requirement has a stable `REQ-###` ID.
- Every user story has a stable `US-###` ID.
- Every acceptance criterion has a stable `AC-###` ID.
- Every requirement and acceptance criterion has a source.
- Scope and non-goals are explicit enough to prevent accidental expansion.
- Any product, architecture, API, security, storage, dependency, UX, rollout, compatibility, acceptance, or verification uncertainty is either answered, repo-evidenced, immaterial, or listed under unresolved decisions.
- No invented metrics, estimates, deadlines, or implementation details were added.
- The PRD can be passed to `/prd-to-todo <path>` without requiring that command to ask product-shaping questions.
- No product code, tests, TODO files, staging, committing, or runtime changes were performed.

## Final response

Return a concise report in this exact structure:

```text
CREATE-IDEA RESULT: COMPLETE | PARTIAL | BLOCKED
PRD path: <path>
Questions asked: <n>
PRD status: Ready for /prd-to-todo | Draft | Blocked
Requirements captured: <n>
User stories captured: <n>
Unresolved decisions:
- <id/question or none>
Validation:
- no invented criteria: PASS | FAIL, <summary>
- ready for /prd-to-todo: PASS | FAIL, <summary>
- planning-only changes: PASS | FAIL, <summary>
Important notes:
- <note or none>
Next command:
- /prd-to-todo <path> | resolve blocked decisions first
```
