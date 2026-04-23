# Unified release-please + GoReleaser Workflow

Use this pattern when a project uses both release-please and GoReleaser.

## Why this pattern

- Runs release-please and GoReleaser in a single workflow file.
- Avoids GitHub Actions recursion issues from chained workflows.
- Avoids requiring a custom PAT only to trigger GoReleaser.
- Uses the default `GITHUB_TOKEN` for publishing.

## Required behavior

1. Run `googleapis/release-please-action@v4` first.
2. Capture `release_created` and `tag_name` outputs from the release step.
3. Run a GoReleaser job only if `release_created == 'true'`.
4. Checkout the created tag (`ref: tag_name`) before running GoReleaser.
5. Run `goreleaser release --clean` with `GITHUB_TOKEN`.

## Canonical workflow

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

## PAT guidance

- Do not default to `RELEASE_PLEASE_TOKEN` to make GoReleaser run.
- A PAT may still be needed for other goals (for example, forcing other workflows to run from release PRs), but that is separate from GoReleaser triggering in this unified setup.
