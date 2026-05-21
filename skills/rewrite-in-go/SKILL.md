---
name: go-existing-app-rewrite
description: Reimplement an existing application in Go while preserving its user-facing contract, replacing dependencies with maintained Go packages, and improving architecture. Use when the user asks to port, rewrite, rebuild, or improve an existing app in Golang, especially CLI tools or source-driven automation systems.
---

# Go Existing Application Rewrite Skill

## Purpose

Build a Go implementation of an existing application. Preserve the user-facing contract and core behavior, but do not blindly copy the old architecture. Prefer a clean Go design that is maintainable, testable, observable, and easy to extend.

This skill focuses on the project itself: source code, config, commands, behavior, tests, and runtime functionality. Ignore README/docs, packaging, publishing, release automation, and distribution unless the user explicitly asks for them or they are required to understand the app’s contract.

## Default priorities

1. Preserve the user-facing contract: commands, flags, config fields, environment variables, outputs, files, network/API behavior, exit codes, and workflows.
2. Improve implementation quality where Go gives clear advantages: concurrency, typed config, interfaces, modular adapters, deterministic tests, error handling, retries, cancellation, and performance.
3. Replace old-language dependencies with maintained Go packages where reasonable.
4. Use Cobra and Viper for CLI/config workflows unless there is a strong reason not to; explain any exception.
5. Keep secrets out of config files and source code. Prefer environment variables and explicit secret references.

## Required first steps

When given an existing repo or local project:

1. Inspect the repository structure.
2. Identify the current language, runtime, app type, entrypoints, and execution modes.
3. Read source code (use scout sub-agent) before relying on documentation. Treat docs as supporting evidence, not the source of truth.
4. Inventory the user-facing contract.
5. Inventory dependencies and identify what each dependency actually does.
6. Search for maintained Go replacements. Do not rely only on memory for package choices.
7. Produce a concise implementation plan before building unless the user only asked for research.

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

Use this division of responsibility by default:

- Cobra: command tree, arguments, flags, help, shell completion, command validation, command execution.
- pflag: flag definitions through Cobra.
- Viper: compatibility/convenience layer for discovery, defaults, env binding, and migration support when useful. Do not create two independent sources of truth. 

Recommended precedence, highest to lowest:

1. explicit CLI flags
2. environment variables
3. local config file specified by `--config`
4. default config search paths
5. compiled defaults

Always produce a typed config struct. Validate config after merging and before doing work.

Support env-var substitution in string config values if the old app supports it or the user requests it. Leave unresolved variables visible and fail loudly at validation time when the value is required.

## Go project architecture

Prefer this layout unless the app strongly suggests another shape:

```text
cmd/<app>/main.go              # thin entrypoint
internal/cli/                  # Cobra commands and flag binding
internal/config/               # config loading, env expansion, validation, migration
internal/app/                  # orchestration/use cases
internal/source/               # source adapter interfaces and implementations
internal/model/                # domain types
internal/dedupe/               # normalization and dedupe logic
internal/score/                # scoring and ranking
internal/enrich/               # enrichment and context gathering
internal/render/               # Markdown/HTML/JSON/email/webhook rendering
internal/deliver/              # output channels
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

1. Create Go module and project skeleton.
2. Add typed config loader and validation.
3. Add Cobra command tree and bind flags.
4. Add domain models and core pipeline interfaces.
5. Port one source adapter end-to-end with tests.
6. Add dedupe, scoring, filtering, rendering, and delivery layers.
7. Add remaining source adapters and delivery adapters.
8. Add integration tests using fixtures/mocks.
9. Add contract tests for CLI behavior and config migration.
10. Run `gofmt`, `go test ./...`, and static checks if available.

### Phase 6: Validation

Before considering the rewrite complete:

- `go test ./...` passes.
- CLI help and flags match the contract plan.
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

## Output style during a run

When reporting progress to the user:

- Be concise.
- Show concrete findings as soon as they are known.
- Distinguish facts from recommendations.
- Do not claim package maintenance without checking current evidence.
- Do not ask for clarification when a reasonable best-effort plan can proceed.
- Be honest about unsupported features or uncertain package replacements.

## First target template: Horizon-style news aggregation system

Use this section when the target resembles `Thysrael/Horizon` or another AI news aggregation pipeline.

### Existing behavior to preserve or intentionally improve

Inventory these areas carefully:

- sources: Hacker News, RSS/Atom, Reddit, Telegram public channels, Twitter/X via Apify or equivalent, GitHub user events and repo releases, financial/news watchlists, OSS Insight or trending repos
- pipeline: fetch, normalize, deduplicate, score, filter, enrich, summarize, deliver
- AI providers: Anthropic, OpenAI-compatible APIs, Azure OpenAI-compatible endpoints, Google Gemini, local/Ollama-compatible providers, and any provider-specific behavior
- languages/localization: English, Chinese, or configured output languages
- config: `.env`, JSON config, env substitution, thresholds, provider settings, source settings, delivery settings
- outputs: generated Markdown summaries, static site files, email, webhooks, MCP tools, local files
- delivery: SMTP/IMAP subscription handling, Feishu/Lark, DingTalk, Slack, Discord, generic webhooks
- UX: setup wizard, `--hours`, config validation, dry run, source selection, verbosity

### Initial Go package areas to research

Do not accept these blindly; verify maintenance and suitability during the package-scouting phase.

| Area | Starting candidates |
|---|---|
| CLI | `github.com/spf13/cobra`, `github.com/spf13/pflag` |
| Config | `github.com/spf13/viper` where useful |
| Env files | `github.com/joho/godotenv` or Koanf dotenv parser/provider |
| HTTP | stdlib `net/http`, plus a maintained retry/backoff package only if needed |
| RSS/Atom | `github.com/mmcdole/gofeed` or direct XML parsing for simple feeds |
| HTML parsing | `github.com/PuerkitoBio/goquery`, stdlib HTML parser, or targeted parsing |
| GitHub API | `github.com/google/go-github/v...` or direct REST calls |
| Hacker News | direct Firebase HN API calls with typed structs |
| Reddit | direct public JSON API calls unless an actively maintained client is clearly better |
| Telegram public preview | direct HTTP plus HTML parsing |
| Twitter/X through Apify | direct Apify REST API client |
| LLM providers | official provider SDKs where maintained; otherwise one small OpenAI-compatible client interface |
| Markdown | `github.com/yuin/goldmark` or `github.com/gomarkdown/markdown` depending on render needs |
| Email SMTP/IMAP | stdlib SMTP where sufficient; maintained IMAP/SMTP libraries for mailbox subscription workflows |
| Webhooks | stdlib HTTP with per-platform renderers |
| MCP | current official or most-maintained Go SDK; verify before selecting |


## Final completion report

End with:

- what was implemented
- compatibility status
- intentional differences from the original
- packages chosen and why
- tests run and results
- risks or features not implemented
- next concrete implementation step if the work is partial
