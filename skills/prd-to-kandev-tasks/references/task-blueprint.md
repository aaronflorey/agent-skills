# Task Brief Blueprint

Use this template as the `description` for every Kandev task created from a PRD.

```markdown
## Context
<What the PRD asks for, why this task exists, and any project conventions discovered locally. Include links or paths to the PRD/spec.>

## Goal
<One coherent deliverable this task must complete.>

## Scope
- In scope: <specific behavior/files/surfaces>
- Out of scope: <nearby work that should not be done here>

## Likely Code Areas
- `<path or package>`: <why it matters>
- `<path or package>`: <why it matters>

## Constraints And Decisions
- <API/schema/security/compatibility/design constraints>
- <Defaults chosen to avoid blocking assigned agents>

## Steps
1. <First concrete step>
2. <Second concrete step>
3. <Test/update docs/handoff step>

## Acceptance Criteria
- <Observable behavior or artifact>
- <Edge case or non-regression>
- <Reviewable output>

## Verification
- `<command>` should pass because <what it proves>
- `<command>` should pass because <what it proves>

## Dependencies And Blockers
- Blocked by: <task IDs, human decision, or "none">
- Must finish before: <dependent task IDs or "none">

## Handoff Output
<What the agent must report when done: changed files, tests run, risks, PR/branch, screenshots, migration notes, etc.>
```

## Sizing Rules

- One task should fit one focused agent session.
- One task should produce one reviewable diff or one reviewable artifact.
- Split if two owners, repositories, verification suites, or workflow steps are required.
- Merge if two tasks cannot be verified independently and would cause coordination overhead.

## Description Quality Checks

- A new agent can start from this brief without reading your hidden notes.
- The verification section contains commands, not just "test it".
- The task names the relevant repo or path when there is more than one.
- The task states what not to do.
- The blocker section is explicit even when there are no blockers.
