---
description: gives instructions on setting up the current repository with repo-type-aware OSS, Dependabot, GitHub Actions, releases, and docs
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

Inspect the current repository and set it up for OSS publishing, Dependabot, GitHub Actions, release automation, badges, and docs using the smallest correct set of changes for the detected stack.
</objective>

<process>
Work only in the current repository root unless the user explicitly asks for cross-repo comparison. Do not scan `~/Code`, home directories, sibling repos, or unrelated projects to infer style or conventions.

Inspect the repository first:
- detect the primary language, framework, package manager, and build toolchain
- if the repo has JavaScript or TypeScript, detect whether it already uses Bun, npm, Yarn, pnpm, or Deno and preserve the established package manager unless the user explicitly asks for a migration
- detect whether the project is a Laravel app or package, Go CLI, Rust CLI, macOS app, library, service, or another app type
- detect whether the default branch is `main` or `master`
- detect existing OSS, CI, and release files before editing
- detect existing test, lint, build, package, and release commands from manifests, scripts, Makefiles, Taskfiles, Justfiles, or workflows
- detect whether Docker distribution is actually relevant
- detect whether Homebrew packaging is relevant; only CLI tools should get Homebrew tap setup
- detect package ecosystems that should receive Dependabot updates, including GitHub Actions, Go modules, Cargo, Composer, npm-compatible JavaScript packages, and Docker only when Dockerfiles or container workflows exist
- detect whether a JavaScript or TypeScript repo is a publishable npm package, a CLI tool with `bin` entrypoints, or both
- detect whether a PHP repo is a publishable Composer/Packagist package, Laravel app, or monorepo package set
- detect whether a Rust repo is a publishable crate, CLI binary, library crate, or workspace
- detect whether a Go repo is a CLI binary, library module, service, or multi-module workspace
- detect whether the repo already has signing, notarization, App Store, npm publishing, Packagist, Cargo publish, or Homebrew release evidence before automating those paths

Use these skills during execution:
- `mise`
- `oss-publish`
- `release-please`
- `goreleaser` only when the repo has a supported binary release shape, such as Go or Rust CLI binaries, or JS/TS binary distribution where GoReleaser's npm support is explicitly appropriate
- `shieldsio`
- Laravel repos: `php-pro`, `laravel-quality`, `laravel-testing`, and relevant `laravel-*` skills
- PHP package repos: `php-pro` when available, and `php-monorepo-builder` only for real PHP monorepos
- Go CLI repos: `go-cobra`, `go-viper`, `goreleaser`
- Rust CLI repos: `rust-cli`
- macOS apps: `swiftui-pro`

OSS setup requirements:
- use the MIT license
- add or update the standard OSS files that fit the repo: `LICENSE`, `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, and `CODE_OF_CONDUCT.md`
- write `README.md` for human users first: explain what the project does, why someone would install it, supported install methods, quick start, common usage, configuration, and troubleshooting using concrete commands from the repo
- keep maintainer-only material, release mechanics, CI internals, and agent/tooling notes out of the main README flow unless users need them to install or use the project
- include a short `Development` section near the bottom of `README.md` with local setup, test, lint, build, and release commands unless `docs/DEVELOPMENT.md` exists; if it exists, link to it from the bottom of the README instead of duplicating detailed development docs
- update `README.md` with concise installation, setup, usage, and release notes where appropriate
- use the local Shields.io skill guidance for badge URL structure, styles, logos, labels, and cache parameters when needed
- add sensible badges only when the URLs can be derived safely from the repository and workflow names
- preferred badges: license, CI status, and latest release or version
- do not fabricate badge URLs or placeholder metadata

Dependabot setup requirements:
- create or update `.github/dependabot.yml` unless the repo has an equivalent working dependency update system the user explicitly wants to keep instead
- use Dependabot `version: 2`
- always include `github-actions` for `/.github/workflows` when GitHub Actions workflows exist or are being added
- include package ecosystems only when matching manifests exist, and add one update entry per relevant manifest directory: `gomod` for `go.mod`, `cargo` for `Cargo.toml`, `composer` for `composer.json`, and `npm` for `package.json` regardless of whether the JavaScript package manager is Bun, npm, pnpm, or Yarn
- include `docker` only when Dockerfiles or container workflow dependencies exist and Docker updates are in scope
- for workspaces, monorepos, and nested packages, configure every publishable or dependency-owning package directory rather than only the repo root
- ignore vendored, generated, fixture, example, cache, and build-output directories unless the repo clearly treats them as maintained packages
- use a conservative weekly schedule by default, with the repo's default branch when a target branch is needed
- group minor and patch dependency updates by ecosystem when that keeps pull request volume reasonable; keep major updates separate unless the repo already groups them
- use clear commit-message prefixes such as `chore(deps)` and labels such as `dependencies` only when they fit existing repo conventions
- do not add Dependabot secrets, registries, private package credentials, or ecosystem entries that cannot be derived safely from the repo

Toolchain setup requirements:
- configure only the toolchain pieces needed to make GitHub Actions, release automation, and docs accurate for the current repo
- use the `mise` skill when configuring tool versions, env activation, or project tasks
- create or update `mise.toml` only when it is the smallest clear way to pin tools for CI/release/docs, or when the repo already uses mise
- add the smallest correct set of tool versions for the detected stack, such as Bun for JS/TS, PHP and Composer for Laravel, Go for Go CLIs, Rust for Rust CLIs, and Swift/Xcode-adjacent tooling only when the repo already signals those needs
- for JS/TS repos, prefer the package manager already established by lockfiles, scripts, and docs; standardize on Bun only when the repo already uses Bun or the user explicitly asked for Bun standardization
- for JS/TS repos using Bun, update scripts, docs, and CI commands to use Bun-native commands where appropriate
- for JS/TS repos using Bun with a `package.json`, ensure the `preinstall` script includes `bunx only-allow bun`
- do not add duplicate `preinstall` entries; merge with existing script content carefully so current behavior is preserved
- do not perform broad package-manager migrations, lockfile replacement, runtime rewrites, or script churn unless required for the requested setup

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
- when npm publishing is configured, use `NPM_TOKEN` as the workflow secret and do not publish packages marked `private: true`
- when Cargo registry publishing is configured, use `CARGO_REGISTRY_TOKEN` as the workflow secret and do not publish crates without clear publish intent
- when Composer/Packagist automation needs credentials, name only the minimum required Packagist or GitHub secret from existing repo evidence; do not invent private registry credentials
- when Homebrew publishing is configured, make sure `HOMEBREW_TAP_GITHUB_TOKEN` is used as a workflow secret input for the release path (repo: aaronflorey/homebrew-tap)

Project-type release rules:
- JavaScript/TypeScript packages: prefer `release-please` for changelog, tags, and GitHub releases. If the package is publishable to the npm registry, set up release automation to build, verify, and publish it to npm on release using the repo's established package manager and `NPM_TOKEN`.
- JavaScript/TypeScript CLI tools: prefer `release-please` for changelog, tags, and GitHub releases. On release, compile CLI entrypoints with Bun's executable bundler (`bun build --compile`; see https://bun.com/docs/bundler/executables) and upload executable artifacts to the GitHub Release only when binary distribution fits the repo. Use normal npm publishing for source/package distribution when package metadata indicates npm distribution is intended or the user opts in; keep npm publishing gated by `NPM_TOKEN` and skip it for `private: true` packages. Do not add GoReleaser solely for normal npm publishing.
- Laravel repos: prefer `release-please` for changelog, tags, and GitHub releases. Do not add GoReleaser, Homebrew, or Docker unless the Laravel repo also ships a real CLI, binary, or container distribution. For packages, keep release automation compatible with Packagist-style version tags.
- PHP packages: prefer `release-please` for changelog, tags, and GitHub Releases. Do not add npm, GoReleaser, Homebrew, or Docker publishing unless the package actually ships frontend assets, binaries, CLIs, or containers. Keep tags compatible with Packagist/Composer discovery and document Packagist setup only when repo metadata supports it.
- Go CLI repos: prefer `release-please` plus `.goreleaser.yaml` for GitHub Releases, multi-platform archives, checksums, and Homebrew publishing when the CLI is intended for installation. Do not add Cargo, npm, Composer, or Docker publishing unless the repo clearly includes those package surfaces. Add Docker only when the repo clearly ships a containerized runtime.
- Go libraries or services: prefer `release-please` tags and GitHub Releases only when releases are useful. Do not add GoReleaser, Homebrew, binary archives, or Docker unless the repo's distribution shape requires them.
- Rust CLI repos: prefer `release-please` for tag and changelog automation. Use native Cargo build and test flows by default. Add GoReleaser only when the repo needs cross-platform archives, GitHub release assets, or Homebrew publishing and that fits the repo's existing packaging direction.
- Rust crates or libraries: prefer Cargo-native build, test, fmt, and clippy workflows. Do not automate `cargo publish` unless crate metadata and existing docs clearly indicate registry publishing intent or the user opts in.
- macOS apps: prefer GitHub release/tag automation that builds from the existing Xcode or SwiftPM structure. Only automate signing, notarization, DMG packaging, or App Store delivery when the repo already contains clear evidence that those distribution targets exist and the required secrets can be named from repo context. Do not invent bundle IDs, certificates, provisioning profiles, or notarization flows.

Release tool decision table:

| Repo shape | Prefer | Add `goreleaser`? | Notes |
|---|---|---|---|
| JavaScript/TypeScript package | `release-please` + npm publish | No | Build and verify with the established package manager, then publish to npm with `NPM_TOKEN` when the package is publishable |
| JavaScript/TypeScript CLI | `release-please` + Bun executable build | Usually no | Compile CLI entrypoints with `bun build --compile`; optionally publish to npm when package metadata or user choice supports it. Use GoReleaser npm support only for explicit binary npm distribution, noting it is a GoReleaser Pro feature |
| Laravel app or package | `release-please` | No, unless the repo also ships a real binary/CLI | Keep tags and changelog automation simple and compatible with PHP package release flows |
| PHP/Composer package | `release-please` | No | Keep tags compatible with Packagist/Composer; avoid unrelated binary or container packaging |
| Go CLI | `release-please` + `goreleaser` | Yes, usually | Best fit for cross-platform archives, checksums, GitHub release assets, and Homebrew |
| Go library or service | `release-please` | Usually no | Add GoReleaser only for real binary release assets; Docker only for real container distribution |
| Rust CLI | `release-please` | Only when binary release packaging is needed beyond Cargo alone | Prefer native Cargo workflows unless release assets or Homebrew justify extra tooling |
| Rust crate/library | `release-please` + Cargo-native checks | No | Do not automate cargo publishing without clear registry-publish intent |
| macOS app | `release-please` | Rarely | Use native Xcode or SwiftPM build flows; only add packaging automation when the repo already signals it |
| Library with no binary artifacts | `release-please` | No | Do not add archive/release packaging just to standardize tooling |

GoReleaser requirements:
- create or update `.goreleaser.yaml` only when the repo has a supported binary release shape and GoReleaser adds clear value
- configure release archives for each supported OS
- use Windows zip overrides where appropriate
- if the repo is a CLI tool, configure Homebrew tap publishing
- if npm binary distribution is explicitly appropriate, document that GoReleaser `npms` requires GoReleaser Pro and do not configure it without clear repo evidence or user approval
- if Docker distribution is relevant, add Docker publishing and a Dockerfile if missing
- if the repo is not a binary distribution project, do not force GoReleaser, Homebrew, or Docker support that does not fit; explain what was skipped and why
- prefer existing entrypoints, binaries, and packaging conventions instead of inventing new structure

Testing workflow requirements:
- create or update a separate workflow that runs tests and linting
- include dependency or toolchain caching
- choose the smallest correct lint and test commands for the detected stack
- preserve existing working CI where possible instead of replacing it wholesale
- JS/TS repos: use the package manager established by the repo's lockfiles, scripts, and docs; cache its dependencies; prefer frozen/immutable installs; and run existing test, lint, typecheck, or build commands instead of inventing new ones
- Laravel repos: set up PHP and Composer caching, add Node package caching only when frontend assets or JS tests exist, provision services or sqlite only when tests require them, prefer `composer test` when present, otherwise use the repo's existing `php artisan test`, `vendor/bin/pest`, or `vendor/bin/phpunit` entrypoint, and run Pint or PHPStan only when they are already configured
- PHP package repos: set up PHP and Composer caching, prefer `composer test` when present, otherwise use discovered PHPUnit/Pest entrypoints, and run Pint, PHPStan, Psalm, Rector, or other tools only when configured by the repo
- Go CLI repos: use `actions/setup-go` with module caching and prefer `go test ./...`; add `go test -race ./...`, `golangci-lint run`, or other checks only when the repo already uses them or platform constraints clearly allow them
- Rust CLI repos: use Rust toolchain caching and prefer `cargo test`; add `cargo fmt --check` and `cargo clippy --all-targets --all-features -- -D warnings` when rustfmt or clippy are part of the repo's conventions or CI direction
- macOS apps: prefer `xcodebuild test` against discovered schemes and destinations for Xcode projects, or `swift test` for SwiftPM packages; pin Xcode only when the repo already signals a required version; run SwiftLint only when config already exists

Execution constraints:
- do not modify unrelated files
- do not fabricate package-manager metadata, docker images, release targets, tap details, bundle IDs, signing identities, provisioning profiles, or notarization credentials
- do not fabricate npm package names, scopes, access levels, executable entrypoints, or publish intent; infer them from `package.json` and repo docs, or ask one short question when needed
- do not migrate a JS/TS repo to Bun unless the repo already clearly uses Bun or the user explicitly asked for Bun standardization
- ask at most one short question only if a required decision cannot be derived from the repo
- preserve working existing setup and make focused improvements instead of rewriting everything
- do not replace a repo's established release mechanism unless it is clearly broken or the user asked for a migration

Final response requirements:
- summarize what was added or updated
- list what was intentionally skipped and why
- call out any required secrets, especially `HOMEBREW_TAP_GITHUB_TOKEN`, and any platform-specific signing or publishing secrets only if the setup actually uses them
- call out `NPM_TOKEN` when npm publishing is configured, and state whether npm publishing is required or optional for the repo shape
- call out `CARGO_REGISTRY_TOKEN` or Packagist/Composer secrets only when registry publishing is actually configured
- report which Dependabot ecosystems and directories were configured, or why Dependabot was intentionally skipped
- report whether `mise.toml` was created or updated and whether any package-manager standardization was intentionally applied for JS/TS repos
- report whether GoReleaser was added or intentionally skipped, and why
- note any manual follow-up the user still needs to do
</process>
