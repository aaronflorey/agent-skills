---
description: gives instructions on setting up the current repository with oss and pipelines
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

Inspect the current repository and set it up for OSS publishing, release automation, badges, and CI using the smallest correct set of changes for the detected stack.
</objective>

<process>
Work in the current repository only. Do not inspect or copy patterns from other local repos.

Inspect the repository first:
- detect the primary language, framework, package manager, and build toolchain
- detect whether the project is a CLI, library, service, or app
- detect whether the default branch is `main` or `master`
- detect existing OSS, CI, and release files before editing
- detect whether Docker distribution is actually relevant
- detect whether Homebrew packaging is relevant; only CLI tools should get Homebrew tap setup

Use these skills during execution:
- `oss-publish`
- `release-please`
- `goreleaser`
- `shieldsio`

OSS setup requirements:
- use the MIT license
- add or update the standard OSS files that fit the repo: `LICENSE`, `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, and `CODE_OF_CONDUCT.md`
- update `README.md` with concise installation, setup, usage, and release notes where appropriate
- use the local Shields.io skill guidance for badge URL structure, styles, logos, labels, and cache parameters when needed
- add sensible badges only when the URLs can be derived safely from the repository and workflow names
- preferred badges: license, CI status, and latest release or version
- do not fabricate badge URLs or placeholder metadata

Release setup requirements:
- configure `release-please` to use `vX.X.X` tags
- create or update `release-please-config.json` and `.release-please-manifest.json` as needed
- prefer `include-v-in-tag: true`
- prefer `include-component-in-tag: false` for single-package repos unless the repo structure clearly requires otherwise
- create or update `.github/workflows/release.yaml`
- `release.yaml` must run on pushes to both `main` and `master`
- the first job must run `release-please`
- the second job must run only when `release-please` reports `release_created == 'true'`
- the GoReleaser job must check out the created tag before running
- include caching in workflow setup steps
- `release-please` should use the native github actions token `${{ secrets.GITHUB_TOKEN }}`
- when Homebrew publishing is configured, make sure `HOMEBREW_TAP_GITHUB_TOKEN` is used as a workflow secret input for the release path (repo: aaronflorey/homebrew-tap)

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

Execution constraints:
- do not use other local repos as references
- do not modify unrelated files
- do not fabricate package-manager metadata, docker images, release targets, or tap details
- ask at most one short question only if a required decision cannot be derived from the repo
- preserve working existing setup and make focused improvements instead of rewriting everything

Final response requirements:
- summarize what was added or updated
- list what was intentionally skipped and why
- call out any required secrets, especially `HOMEBREW_TAP_GITHUB_TOKEN`
- note any manual follow-up the user still needs to do
</process>
