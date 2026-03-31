---
name: release-please
description: Set up release-please for automated releases in a repository. Use this skill when users want to add release-please to their project, configure GitHub Actions for automated releases, set up conventional commit workflows, create release-please config files, or bootstrap release-please in a new or existing repository.
version: 1.0.0
source: local
license: MIT
---

# Setting Up Release-Please

This skill guides you through setting up release-please in a repository.

## Before You Start

Ask the user (if not clear from context):
1. What language/framework? (determines `release-type`)
2. Single package or monorepo?
3. Current version of the package(s)?

## Setup Steps

### 1. Create GitHub Actions Workflow

Create `.github/workflows/release-please.yml`:

```yaml
on:
  push:
    branches: [main]

permissions:
  contents: write
  pull-requests: write

name: release-please

jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: googleapis/release-please-action@v4
        with:
          release-type: <type>  # See references/release-types.md
```

### Unified release-please + GoReleaser workflow (recommended when both are used)

If the project uses both release-please and GoReleaser, prefer a single workflow file. Run release-please first, then run GoReleaser only when `release_created` is `true`.

This avoids the common PAT workaround. You do not need a custom `RELEASE_PLEASE_TOKEN` just to trigger a second workflow for GoReleaser.

For the canonical recipe, see `references/release-please-goreleaser-unified-workflow.md`.

```yaml
name: release-please

on:
  push:
    branches: [main]

permissions:
  contents: write
  pull-requests: write
  packages: write

jobs:
  release-please:
    runs-on: ubuntu-latest
    outputs:
      release_created: ${{ steps.release.outputs.release_created }}
      tag_name: ${{ steps.release.outputs.tag_name }}
    steps:
      - id: release
        uses: googleapis/release-please-action@v4
        with:
          release-type: <type>

  goreleaser:
    needs: release-please
    if: ${{ needs.release-please.outputs.release_created == 'true' }}
    runs-on: ubuntu-latest
    permissions:
      contents: write
      packages: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          ref: ${{ needs.release-please.outputs.tag_name }}
      - uses: actions/setup-go@v5
        with:
          go-version-file: go.mod
      - uses: goreleaser/goreleaser-action@v6
        with:
          version: latest
          args: release --clean
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

If the user needs CI to run on release PRs (common), they need a PAT for that PR-triggering behavior:
```yaml
        with:
          token: ${{ secrets.RELEASE_PLEASE_TOKEN }}
```

Do not use this PAT requirement as the default fix for release-please + GoReleaser integration. Prefer the unified single-workflow pattern above.

### 2. Create Config Files (for advanced setups)

For monorepos or custom config, create manifest files instead of using `release-type` input.

**release-please-config.json:**
```json
{
  "packages": {
    ".": {
      "release-type": "<type>"
    }
  }
}
```

**\.release-please-manifest.json:**
```json
{
  ".": "<current-version>"
}
```

Then update the workflow to omit `release-type`:
```yaml
- uses: googleapis/release-please-action@v4
  with:
    token: ${{ secrets.RELEASE_PLEASE_TOKEN }}
```

### 3. Bootstrap Existing Repository

For repos with existing releases, set the current version in `.release-please-manifest.json` to match the latest release tag.

If there's extensive commit history, add `bootstrap-sha` to config to limit changelog scope:
```json
{
  "bootstrap-sha": "<commit-sha-before-first-desired-commit>",
  "packages": { ... }
}
```

## Common Setup Patterns

### Node.js Package
- `release-type: node`
- Updates `package.json` and `CHANGELOG.md`

### Python Package  
- `release-type: python`
- Updates `pyproject.toml`/`setup.py` and `CHANGELOG.md`

### Go Module
- `release-type: go`
- Updates `CHANGELOG.md` only (version from tags)

### Monorepo
- Use manifest config with multiple packages
- Consider `node-workspace` or `cargo-workspace` plugins
- See `references/manifest-config.md`

## Post-Setup Checklist

Tell the user:
1. Commit and push the new files
2. Start using conventional commits: `feat:`, `fix:`, `feat!:`
3. Use squash-merge for PRs (cleaner changelogs)
4. Release-please will create a Release PR after releasable commits
5. Merge the Release PR to create the GitHub release

## Reference Files

Read these for detailed options:
- `references/release-types.md` - All supported languages
- `references/github-actions.md` - Action inputs, outputs, examples
- `references/manifest-config.md` - Full config options, plugins, monorepos
- `references/release-please-goreleaser-unified-workflow.md` - Canonical combined setup for release-please + GoReleaser
