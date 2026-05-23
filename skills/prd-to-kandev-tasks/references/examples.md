# Examples

## Happy Path

PRD: add account invitations to a web app.

Good task graph:

1. `Implement account invite API and persistence`
2. `Build invite management UI`
3. `Add invite acceptance flow tests`, blocked by tasks 1 and 2
4. `Document account invitation rollout`, blocked by task 3

Good implementation brief excerpt:

```markdown
## Context
The PRD requires workspace admins to invite users by email. Project discovery found a Go API in `apps/backend`, a Next.js app in `apps/web`, and existing auth middleware under `apps/backend/internal/auth`.

## Goal
Implement the backend invite model, create/list/revoke endpoints, and email-token acceptance API.

## Scope
- In scope: persistence, service methods, HTTP handlers, tests.
- Out of scope: web UI and copywriting.

## Acceptance Criteria
- Admins can create, list, and revoke pending invites.
- Non-admins receive authorization errors.
- Expired or revoked invite tokens cannot be accepted.

## Verification
- `make -C apps/backend test` should pass because it covers service and handler behavior.
```

## Guarded Sequencing

PRD: replace local billing records with an external billing provider, but the provider is not chosen.

Good handling:

1. Create one human decision task: `Decision needed: choose billing provider for subscription migration`.
2. Create `Design billing integration boundary`, blocked by the decision task, `start_agent: false` until answered.
3. Create implementation tasks blocked by the design task.

Do not create Stripe-specific implementation tasks before the provider decision is made.

## Anti-Pattern: Vague Tasks

Bad:

```text
Title: Implement PRD
Description: Build the feature from the PRD and add tests.
```

Why it fails:

- It hides requirements in prior context.
- It gives no file paths, constraints, acceptance criteria, or commands.
- It cannot be safely auto-started.

Corrected:

```text
Title: Add repository selector to task creation form
Description: Use the task brief blueprint. Include the PRD goal, paths for the form and API client, exact UI behavior, acceptance criteria for single-repo and multi-repo workspaces, and `pnpm --filter @kandev/web typecheck` plus targeted tests.
```

## Anti-Pattern: Avoidable Human Blocker

Bad:

```text
Decision needed: should we write tests?
```

Correct:

```text
Choose the default that every implementation task must include targeted tests. Only escalate if the PRD changes external interface shape, persisted schema, billing/legal behavior, or destructive data handling.
```
