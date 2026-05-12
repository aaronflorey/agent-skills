---
description: gives instructions on setting up the current repository with repo-type-aware OSS, CI, releases, and project skills
tools:
  read: true
  bash: true
  grep: true
  glob: true
  write: true
  question: true
  skill: true
---

<objective>
Setup The Current Repo.

Inspect the current repository and set it up for OSS publishing, release automation, badges, CI, and project-scoped skills using the smallest correct set of changes for the detected stack.
</objective>

<process>
Work in the current repository first.

You may inspect sibling repos under `~/Code` in read-only mode to infer the user's house style for CI, testing, release naming, and bootstrap choices when the active repo lacks clear conventions. Use those repos as preference signals only. Do not copy workflow files, code, secrets, certificates, or package metadata verbatim.

Inspect the repository first:
- detect the primary language, framework, package manager, and build toolchain
- if the repo has JavaScript or TypeScript, detect whether it already uses Bun, npm, Yarn, pnpm, or Deno and what must change to standardize on Bun
- detect whether the project is a Laravel app or package, Go CLI, Rust CLI, macOS app, library, service, or another app type
- detect whether the default branch is `main` or `master`
- detect existing OSS, CI, and release files before editing
- detect existing test, lint, build, package, and release commands from manifests, scripts, Makefiles, Taskfiles, Justfiles, or workflows
- detect whether Docker distribution is actually relevant
- detect whether Homebrew packaging is relevant; only CLI tools should get Homebrew tap setup
- detect whether the repo already has `kasetto.yaml` or other project-scoped skill config
- detect whether the repo already has signing, notarization, App Store, Packagist, Cargo publish, or Homebrew release evidence before automating those paths

Use these skills during execution:
- `skill-scout`
- `mise`
- `oss-publish`
- `release-please`
- `goreleaser` when binary archives, Homebrew, or multi-platform release packaging are needed
- `shieldsio`
- Laravel repos: `php-pro`, `laravel-quality`, `laravel-testing`, and relevant `laravel-*` skills
- Go CLI repos: `go-cobra`, `go-viper`, `goreleaser`
- Rust CLI repos: `rust-cli`
- macOS apps: `swiftui-pro`

Skill Scout requirements:
- run `skill-scout` early when the project has meaningful framework/platform surface area or the repo is missing a project-scoped `kasetto.yaml`
- create or update `kasetto.yaml` in the target repo when the skill finds high-value project-specific skills
- prefer `scope: project` unless the repo already uses a stronger convention
- preserve existing valid skill config entries
- run `kst sync --config kasetto.yaml --dry-run` when `kst` is available
- do not run a real `kst sync` unless the user explicitly asks

OSS setup requirements:
- use the MIT license
- add or update the standard OSS files that fit the repo: `LICENSE`, `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, and `CODE_OF_CONDUCT.md`
- update `README.md` with concise installation, setup, usage, and release notes where appropriate
- use the local Shields.io skill guidance for badge URL structure, styles, logos, labels, and cache parameters when needed
- add sensible badges only when the URLs can be derived safely from the repository and workflow names
- preferred badges: license, CI status, and latest release or version
- do not fabricate badge URLs or placeholder metadata

Toolchain setup requirements:
- set up `mise` for the project and prefer `mise.toml` in the repo root unless the repo already uses a stronger local convention
- use the `mise` skill when configuring tool versions, env activation, or project tasks
- add the smallest correct set of tool versions for the detected stack, such as Bun for JS/TS, PHP and Composer for Laravel, Go for Go CLIs, Rust for Rust CLIs, and Swift/Xcode-adjacent tooling only when the repo already signals those needs
- if the repo has JavaScript or TypeScript, standardize on Bun instead of npm, Yarn, pnpm, or Deno unless the user explicitly asked to preserve another runtime
- for JS/TS repos, update scripts, docs, and CI commands to use Bun-native commands where appropriate
- for JS/TS repos with a `package.json`, ensure the `preinstall` script includes `bunx only-allow bun`
- do not add duplicate `preinstall` entries; merge with existing script content carefully so current behavior is preserved
- for JS/TS repos standardized on Bun, create or refresh the repo's Bun lockfile and remove `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, or other conflicting JS package-manager lockfiles when they are no longer intentionally required
- if a non-Bun lockfile must remain for a proven repo reason, document that exception in the final response instead of silently leaving mixed package-manager state
- do not leave conflicting package-manager instructions, lockfiles, or CI commands in place when standardizing a JS/TS repo on Bun unless there is clear repo evidence they are still intentionally required

Release setup requirements:
- configure `release-please` to use `vX.X.X` tags
- create or update `release-please-config.json` and `.release-please-manifest.json` as needed
- prefer `include-v-in-tag: true`
- prefer `include-component-in-tag: false` for single-package repos unless the repo structure clearly requires otherwise
- create or update `.github/workflows/release.yaml`
- `release.yaml` must run on pushes to both `main` and `master`
- the first job must run `release-please`
- the second job must run only when `release-please` reports `release_created == 'true'`
- a GoReleaser or release-packaging job must check out the created tag before running
- include caching in workflow setup steps
- `release-please` should use the native github actions token `${{ secrets.GITHUB_TOKEN }}`
- when Homebrew publishing is configured, make sure `HOMEBREW_TAP_GITHUB_TOKEN` is used as a workflow secret input for the release path (repo: aaronflorey/homebrew-tap)

Project-type release rules:
- Laravel repos: prefer `release-please` for changelog, tags, and GitHub releases. Do not add GoReleaser, Homebrew, or Docker unless the Laravel repo also ships a real CLI, binary, or container distribution. For packages, keep release automation compatible with Packagist-style version tags.
- Go CLI repos: prefer `release-please` plus `.goreleaser.yaml` for GitHub Releases, multi-platform archives, checksums, and Homebrew publishing when the CLI is intended for installation. Add Docker only when the repo clearly ships a containerized runtime.
- Rust CLI repos: prefer `release-please` for tag and changelog automation. Use native Cargo build and test flows by default. Add GoReleaser only when the repo needs cross-platform archives, GitHub release assets, or Homebrew publishing and that fits the repo's existing packaging direction.
- macOS apps: prefer GitHub release/tag automation that builds from the existing Xcode or SwiftPM structure. Only automate signing, notarization, DMG packaging, or App Store delivery when the repo already contains clear evidence that those distribution targets exist and the required secrets can be named from repo context. Do not invent bundle IDs, certificates, provisioning profiles, or notarization flows.

Release tool decision table:

| Repo shape | Prefer | Add `goreleaser`? | Notes |
|---|---|---|---|
| Laravel app or package | `release-please` | No, unless the repo also ships a real binary/CLI | Keep tags and changelog automation simple and compatible with PHP package release flows |
| Go CLI | `release-please` + `goreleaser` | Yes, usually | Best fit for cross-platform archives, checksums, GitHub release assets, and Homebrew |
| Rust CLI | `release-please` | Only when binary release packaging is needed beyond Cargo alone | Prefer native Cargo workflows unless release assets or Homebrew justify extra tooling |
| macOS app | `release-please` | Rarely | Use native Xcode or SwiftPM build flows; only add packaging automation when the repo already signals it |
| Library with no binary artifacts | `release-please` | No | Do not add archive/release packaging just to standardize tooling |

GoReleaser requirements:
- create or update `.goreleaser.yaml` when the repo is a fit for binary releases
- configure release archives for each supported OS
- use Windows zip overrides where appropriate
- if the repo is a CLI tool, configure Homebrew tap publishing
- if Docker distribution is relevant, add Docker publishing and a Dockerfile if missing
- if the repo is not a binary distribution project, do not force GoReleaser, Homebrew, or Docker support that does not fit; explain what was skipped and why
- prefer existing entrypoints, binaries, and packaging conventions instead of inventing new structure

Testing workflow requirements:
- create or update a separate workflow that runs tests and linting
- include dependency or toolchain caching
- choose the smallest correct lint and test commands for the detected stack
- preserve existing working CI where possible instead of replacing it wholesale
- JS/TS repos: use Bun in CI, cache Bun dependencies, prefer `bun install --frozen-lockfile`, and run the repo's existing `bun test`, `bun run test`, `bun run lint`, `bun run typecheck`, or `bun run build` commands when present instead of npm, Yarn, or pnpm equivalents
- Laravel repos: set up PHP and Composer caching, add Node package caching only when frontend assets or JS tests exist, provision services or sqlite only when tests require them, prefer `composer test` when present, otherwise use the repo's existing `php artisan test`, `vendor/bin/pest`, or `vendor/bin/phpunit` entrypoint, and run Pint or PHPStan only when they are already configured
- Go CLI repos: use `actions/setup-go` with module caching and prefer `go test ./...`; add `go test -race ./...`, `golangci-lint run`, or other checks only when the repo already uses them or platform constraints clearly allow them
- Rust CLI repos: use Rust toolchain caching and prefer `cargo test`; add `cargo fmt --check` and `cargo clippy --all-targets --all-features -- -D warnings` when rustfmt or clippy are part of the repo's conventions or CI direction
- macOS apps: prefer `xcodebuild test` against discovered schemes and destinations for Xcode projects, or `swift test` for SwiftPM packages; pin Xcode only when the repo already signals a required version; run SwiftLint only when config already exists

Execution constraints:
- do not modify unrelated files
- do not fabricate package-manager metadata, docker images, release targets, tap details, bundle IDs, signing identities, provisioning profiles, or notarization credentials
- when migrating a JS/TS repo to Bun, do not leave half-migrated package-manager state; either complete the Bun standardization or explain exactly what blocked it
- ask at most one short question only if a required decision cannot be derived from the repo
- preserve working existing setup and make focused improvements instead of rewriting everything
- do not replace a repo's established release mechanism unless it is clearly broken or the user asked for a migration

Final response requirements:
- summarize what was added or updated
- list what was intentionally skipped and why
- call out any required secrets, especially `HOMEBREW_TAP_GITHUB_TOKEN`, and any platform-specific signing or publishing secrets only if the setup actually uses them
- report whether `mise.toml` was created or updated and whether Bun standardization was applied for JS/TS repos
- report whether `kasetto.yaml` was created or updated and whether `kst sync --config kasetto.yaml --dry-run` was run
- note any manual follow-up the user still needs to do
</process>