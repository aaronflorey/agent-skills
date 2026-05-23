---
name: rewrite-in-go
description: Reimplement an existing application in Go while preserving observable behavior. Use when asked to port, rewrite, migrate, rebuild, or replace an existing app with a Go implementation, especially CLI tools, services, agents, scrapers, or source-driven automation systems. Avoid for greenfield Go features or small Go refactors.
version: 1.0.0
source: local
license: MIT
---

# Rewrite Existing Applications in Go

## Purpose

Build a Go implementation of an existing application. Preserve the user-facing contract and core behavior, but do not blindly copy the old architecture. Prefer a clean Go design that is maintainable, testable, observable, and easy to extend.

Use this for full or substantial ports from an existing codebase. Do not activate it for ordinary Go bug fixes, small refactors, or new Go features with no legacy behavior to preserve.

This skill focuses on the project itself: source code, config, commands, behavior, tests, and runtime functionality. Ignore README/docs, packaging, publishing, release automation, and distribution unless the user explicitly asks for them or they are required to understand the app’s contract.

## Default priorities

1. Preserve the user-facing contract: commands, flags, config fields, environment variables, outputs, files, network/API behavior, exit codes, and workflows.
2. Improve implementation quality where Go gives clear advantages: concurrency, typed config, interfaces, modular adapters, deterministic tests, error handling, retries, cancellation, and performance.
3. Replace old-language dependencies with maintained Go packages where reasonable.
4. For CLI/config-heavy apps, prefer Cobra for command structure and use Viper only when config discovery, env binding, or migration support materially helps; explain simpler choices.
5. Keep secrets out of config files and source code. Prefer environment variables and explicit secret references.

## Required first steps

When given an existing repo or local project:

1. Inspect the repository structure.
2. Identify the current language, runtime, app type, entrypoints, and execution modes.
3. Check the worktree and avoid overwriting existing user changes.
4. Read source code before relying on documentation. Treat docs as supporting evidence, not the source of truth.
5. Use a scouting sub-agent when available for large or unfamiliar repositories; otherwise use targeted code search directly.
6. Capture runnable baseline behavior when practical: commands, sample inputs, config examples, outputs, errors, and exit codes.
7. Inventory the user-facing contract.
8. Inventory dependencies and identify what each dependency actually does.
9. Search for maintained Go replacements. Use a package-finder sub-agent when available for non-obvious choices; do not rely only on memory.
10. Produce a concise implementation plan before building unless the user only asked for research.

If the user gives extra desired changes, incorporate them into the plan and clearly separate:

- preserved behavior
- intentionally changed behavior
- new improvements
- deferred or removed behavior

## Contract inventory

Create a contract map before implementation. Include only behavior users or integrations can observe.

Capture:

- executable names and entrypoints
- commands and subcommands
- positional arguments
- flags, defaults, aliases, and precedence
- config files, schema, defaults, validation rules, and migration behavior
- environment variables and secret handling
- generated files and directory layout
- stdout/stderr behavior and log levels
- return codes and failure modes
- baseline command/output examples that the Go version must match or intentionally change
- network calls, API endpoints, rate limits, retry behavior, authentication, and user agents
- background jobs, schedules, polling, caches, state files, and databases
- externally consumed formats: JSON, Markdown, HTML, CSV, email bodies, webhook payloads, MCP tools, or API responses
- important non-functional behavior: concurrency, timeouts, ordering guarantees, deduplication, idempotency, localization, and determinism

Use this table format:

| Area | Existing behavior | Go rewrite behavior | Compatibility level | Notes |
|---|---|---|---|---|
| CLI | ... | ... | exact / compatible / improved / removed | ... |

Compatibility levels:

- exact: behavior should match unless tests prove otherwise
- compatible: same user outcome, improved implementation or minor format differences
- improved: intentionally better behavior with migration notes
- removed: intentionally omitted; must be justified

## Dependency replacement process

For every non-trivial existing dependency:

1. Identify its role from usage in source code.
2. Determine whether Go stdlib is sufficient.
3. Search for actively maintained Go libraries that implement the same role.
4. Compare at least two candidates when the choice is not obvious.
5. Prefer small, stable libraries with good docs, tests, recent maintenance, compatible license, low transitive dependency load, and idiomatic Go APIs.
6. Avoid packages that are abandoned, overbroad, license-incompatible, or unnecessary wrappers around simple HTTP calls.
7. Record package evidence and the decision.

Use this decision table:

| Existing dependency | Role in current app | Go candidate | Evidence of maintenance | Decision | Rationale |
|---|---|---|---|---|---|
| ... | ... | ... | releases, commits, docs, users, issues | use / avoid / stdlib | ... |

Maintenance evidence to check:

- latest release or commit recency
- Go module health on pkg.go.dev when available
- open issues/PRs and maintainer responsiveness
- security advisories or known CVEs
- project maturity and API stability
- license compatibility
- dependency footprint
- examples and tests

## CLI and configuration rules

For CLI applications, use this division of responsibility by default:

- Cobra: command tree, arguments, flags, help, shell completion, command validation, command execution.
- pflag: flag definitions through Cobra.
- Viper: compatibility/convenience layer for discovery, defaults, env binding, and migration support when useful. Do not create two independent sources of truth.

Skip Cobra for libraries, daemons without a CLI contract, or small tools where the standard `flag` package preserves the contract with less complexity. Skip Viper when a typed config loader plus stdlib parsing is clearer.

Recommended precedence, highest to lowest:

1. explicit CLI flags
2. environment variables
3. local config file specified by `--config`
4. default config search paths
5. compiled defaults

Always produce a typed config struct. Validate config after merging and before doing work.

Support env-var substitution in string config values if the old app supports it or the user requests it. Leave unresolved variables visible and fail loudly at validation time when the value is required.

## Go project architecture

For medium or large CLI, service, or pipeline rewrites, adapt this layout unless the app strongly suggests another shape. Omit packages that are not part of the target domain.

```text
cmd/<app>/main.go              # thin entrypoint
internal/cli/                  # Cobra commands and flag binding
internal/config/               # config loading, env expansion, validation, migration
internal/app/                  # orchestration/use cases
internal/domain/               # domain types and core rules
internal/adapters/             # external system adapters and implementations
internal/store/                # cache/state/subscriber storage if needed
internal/httpx/                # shared HTTP client, retry, rate limit, user agent
internal/logging/              # structured logging setup
```

Rules:

- Keep `main.go` tiny.
- Put business logic outside Cobra command handlers.
- Use interfaces at module boundaries, not everywhere.
- Use `context.Context` for all network and long-running operations.
- Use explicit timeouts and cancellation.
- Use typed errors where they improve retries or user messages.
- Use dependency injection for clients, clocks, filesystem, and external APIs where tests need control.
- Prefer deterministic ordering after concurrent work.
- Keep adapters isolated so unsupported or flaky integrations can be disabled without breaking the whole app.

## Implementation workflow

### Phase 1: Reconnaissance

Deliver:

- repository summary
- app entrypoints
- feature inventory
- user-facing contract map
- dependency map
- test/fixture inventory
- known risks and unknowns

### Phase 2: Go package scouting

Deliver:

- package replacement table
- selected packages and why
- packages intentionally avoided
- stdlib-only decisions
- license/security concerns

### Phase 3: Config and contract plan

Deliver:

- proposed Go config schema
- migration plan from old config
- env-var handling plan
- CLI command/flag plan
- compatibility matrix
- intentional improvements

### Phase 4: Architecture plan

Deliver:

- package/module layout
- data model
- main interfaces
- pipeline flow
- concurrency/rate-limit strategy
- persistence/state strategy
- test strategy

### Phase 5: Build

Implement incrementally:

1. Preserve or create baseline fixtures from the original app before replacing behavior.
2. Create Go module and project skeleton.
3. Add typed config loader and validation.
4. Add CLI command tree and bind flags when the original app has a CLI contract.
5. Add domain models and core interfaces.
6. Port one vertical slice end-to-end with tests.
7. Add remaining adapters and workflow layers incrementally.
8. Add integration tests using fixtures/mocks.
9. Add contract tests for CLI behavior, config migration, output formats, and exit codes.
10. Run `gofmt`, `go test ./...`, and static checks if available.

### Phase 6: Validation

Before considering the rewrite complete:

- `go test ./...` passes.
- Contract tests compare representative old-app and Go-app behavior or document why direct comparison is not possible.
- CLI help and flags match the contract plan.
- Representative stdout/stderr, generated files, API payloads, and exit codes match the compatibility matrix.
- Config examples load and validate.
- Legacy config can be migrated or read where promised.
- Network adapters are covered by tests using fixtures or fake servers.
- Core pipeline can run in dry-run/mock mode without secrets.
- Errors are clear and actionable.
- Secrets are never printed in logs.

## Improvement checklist

Look for opportunities to improve:

- typed config with validation and schema versioning
- migration from old config to new config
- source adapter plugin pattern
- rate limiting per source/API provider
- retry with exponential backoff and jitter
- circuit-breaker behavior for unreliable providers
- deterministic ordering after concurrency
- local cache/state to avoid repeated expensive calls
- partial-failure tolerance: one source failing should not fail the entire run unless configured
- structured logs with redaction
- dry-run mode
- fixture-based tests for scrapers and renderers
- snapshot/golden tests for generated output
- clear separation between fetch, dedupe, score, enrich, summarize, and deliver
- support for multiple LLM providers through one interface
- provider capability detection, such as whether temperature or streaming is supported
- strict output-size limits for chat/webhook/email channels
- idempotent delivery where possible

## Optional target references

Load these only when the target app matches the scenario:

| Target type | Read |
|---|---|
| AI/news aggregation pipeline similar to Horizon | `references/horizon-news-aggregation.md` |

## Output style during a run

When reporting progress to the user:

- Be concise.
- Show concrete findings as soon as they are known.
- Distinguish facts from recommendations.
- Do not claim package maintenance without checking current evidence.
- Do not ask for clarification when a reasonable best-effort plan can proceed.
- Be honest about unsupported features or uncertain package replacements.

## Final completion report

End with:

- what was implemented
- compatibility status
- intentional differences from the original
- packages chosen and why
- tests run and results
- risks or features not implemented
- next concrete implementation step if the work is partial
