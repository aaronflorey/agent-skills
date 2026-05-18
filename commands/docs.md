---
description: Create or update project documentation under ./docs using a docs-writing subagent
agent: docs-writer
subtask: true
model: openai/gpt-5.4
---

Create or update this repository's documentation under `./docs/`.

Arguments supplied by the user, if any: `$ARGUMENTS`

You are running as the `docs-writer` subagent. Your output must be based on repository evidence, not guesses. Create `./docs/` if it does not already exist. If documentation files already exist, update them in place instead of blindly replacing them or creating duplicates.

## Required delegation

Before writing or editing documentation, invoke the built-in `scout` subagent with a focused discovery request.

The scout request must ask for a repository documentation discovery report that identifies, with file-path evidence:

- Project purpose and primary user workflows.
- Installation, setup, and local development commands.
- Runtime commands, CLIs, package entry points, or public APIs.
- Configuration sources: config files, environment variables, defaults, schemas, validation, and examples.
- Testing, linting, typechecking, build, and release commands.
- Existing documentation and README content that should be preserved or updated.
- Common failure modes or troubleshooting hints visible from code, scripts, issues in docs, tests, or error messages.
- External dependency behavior that must be documented accurately, using upstream docs or source when needed.
- Any uncertainty or missing information that should not be invented.

Use the scout report as required input. You may inspect the repository yourself after scout returns, but do not write docs until the scout discovery pass has completed.

## Required documentation set

Ensure these docs exist, either as these exact files or as clearly equivalent existing files that you update instead of duplicating:

- `docs/index.md`: documentation home, project overview, navigation, and recommended reading order.
- `docs/getting-started.md`: prerequisites, installation, first successful run, basic workflow, and verification commands.
- `docs/configuration.md`: configuration files, environment variables, defaults, examples, validation rules, and precedence.
- `docs/troubleshooting.md`: common problems, symptoms, causes, fixes, and diagnostic commands.

Also create or update additional docs when the codebase supports them. Use only topics backed by evidence. Common examples:

- `docs/architecture.md`
- `docs/api.md`
- `docs/cli.md`
- `docs/development.md`
- `docs/testing.md`
- `docs/deployment.md`
- `docs/integrations.md`
- `docs/data-model.md`
- `docs/security.md`
- `docs/faq.md`

Do not create filler docs. If a topic is not supported by the repository, omit it or mention the limitation in the most relevant existing doc.

## Documentation standards

- Write for a developer who has the repository but has not worked on it before.
- Prefer exact commands copied from package manifests, scripts, makefiles, task runners, or README instructions.
- Prefer concrete file paths and examples over abstract descriptions.
- Explain configuration with names, accepted values, defaults, where each value is read from, and how invalid values fail.
- Include troubleshooting entries only when the repository provides evidence for the failure mode or when it follows directly from required commands.
- Keep docs synchronized with source, tests, and existing docs.
- Preserve useful existing documentation, but correct stale or contradicted content.
- Do not invent APIs, flags, environment variables, deployment targets, examples, compatibility claims, performance numbers, roadmap items, or support guarantees.
- If information is missing, say what is missing and point to the source files that should define it.
- Use consistent markdown structure, clear headings, concise paragraphs, and copy-pasteable code blocks.

## Scope limits

- Edit only documentation files under `docs/`, unless the user explicitly requested another path in `$ARGUMENTS`.
- Do not modify product code, tests, package manifests, lockfiles, `.planning/TODO.md`, `.planning/PRD.md`, `.planning/`, agent files, command files, or repository configuration.
- Do not stage, commit, push, open pull requests, or modify remote state.
- Do not delete existing docs unless they are obvious duplicates of files you are updating; prefer merging content and leaving a redirect note when uncertain.

## Verification

After writing docs:

1. Inspect `git diff -- docs` and confirm changes are documentation-only.
2. Check that every required documentation topic is present.
3. Check that commands, paths, configuration keys, environment variables, and examples match repository evidence.
4. Run markdown, docs, or lint checks if the project already defines them and they are safe to run. Do not introduce new tooling just to validate docs.
5. If no docs-specific check exists, manually check headings, links, obvious broken references, and markdown code fences.

## Final report

Return a concise report using this structure:

```text
DOCS RESULT: COMPLETE | PARTIAL | BLOCKED
Scout used:
- yes, <summary of what scout established>
Documentation changed:
- <path>: <created|updated>, <purpose>
Required docs coverage:
- getting started: present | missing, <path/reason>
- configuration: present | missing, <path/reason>
- troubleshooting: present | missing, <path/reason>
- additional docs: <paths or none>
Verification:
- <check>: PASS | FAIL | NOT RUN, <reason/output summary>
Important assumptions or gaps:
- <assumption/gap or none>
Suggested next step:
- <e.g. review docs, run project checks, approve commit separately>
```
