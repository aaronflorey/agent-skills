# GitHub Actions Setup Reference

## Basic Workflow

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
          release-type: node
```

## Using Personal Access Token (PAT)

The default `GITHUB_TOKEN` won't trigger other workflows on release PRs/tags. If the user needs CI to run:

1. Create a PAT with `repo` scope
2. Add as repository secret (e.g., `RELEASE_PLEASE_TOKEN`)
3. Update workflow:

```yaml
- uses: googleapis/release-please-action@v4
  with:
    token: ${{ secrets.RELEASE_PLEASE_TOKEN }}
    release-type: node
```

## Action Inputs

| Input | Default | Description |
|-------|---------|-------------|
| `token` | `GITHUB_TOKEN` | GitHub token |
| `release-type` | - | Language strategy |
| `config-file` | `release-please-config.json` | Config path |
| `manifest-file` | `.release-please-manifest.json` | Manifest path |
| `target-branch` | default branch | Branch to release from |
| `path` | `.` | Package subdirectory |
| `skip-github-release` | `false` | Only create PRs |
| `skip-github-pull-request` | `false` | Only tag releases |

## Action Outputs

Use outputs for post-release steps:

```yaml
- uses: googleapis/release-please-action@v4
  id: release
  with:
    release-type: node

- name: Do something on release
  if: ${{ steps.release.outputs.release_created }}
  run: echo "Released ${{ steps.release.outputs.tag_name }}"
```

Key outputs:
- `release_created` - `true` if release was created
- `releases_created` - `true` if any release created
- `tag_name` - e.g., `v1.2.3`
- `version` - e.g., `1.2.3`
- `major`, `minor`, `patch` - version parts
- `upload_url` - for attaching assets
- `html_url` - release page URL

For monorepos, outputs are prefixed: `packages/foo--release_created`

## Common Setup Patterns

### With npm Publish

```yaml
jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: googleapis/release-please-action@v4
        id: release
        with:
          release-type: node

      - uses: actions/checkout@v4
        if: ${{ steps.release.outputs.release_created }}

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'
        if: ${{ steps.release.outputs.release_created }}

      - run: npm ci && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
        if: ${{ steps.release.outputs.release_created }}
```

### With PyPI Publish

```yaml
- uses: googleapis/release-please-action@v4
  id: release
  with:
    release-type: python

- uses: actions/checkout@v4
  if: ${{ steps.release.outputs.release_created }}

- uses: actions/setup-python@v5
  with:
    python-version: '3.x'
  if: ${{ steps.release.outputs.release_created }}

- run: |
    pip install build twine
    python -m build
    twine upload dist/*
  env:
    TWINE_USERNAME: __token__
    TWINE_PASSWORD: ${{ secrets.PYPI_TOKEN }}
  if: ${{ steps.release.outputs.release_created }}
```

### Multiple Release Branches

```yaml
on:
  push:
    branches:
      - main
      - 1.x
      - 2.x

jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: googleapis/release-please-action@v4
        with:
          release-type: node
          target-branch: ${{ github.ref_name }}
```

### Using Manifest Config

Omit `release-type` to use config files:

```yaml
- uses: googleapis/release-please-action@v4
  with:
    token: ${{ secrets.RELEASE_PLEASE_TOKEN }}
```

### Attaching Release Assets

```yaml
- uses: googleapis/release-please-action@v4
  id: release
  with:
    release-type: node

- name: Build artifact
  if: ${{ steps.release.outputs.release_created }}
  run: npm run build && zip -r dist.zip dist/

- name: Upload artifact
  if: ${{ steps.release.outputs.release_created }}
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: gh release upload ${{ steps.release.outputs.tag_name }} dist.zip
```

## Repository Settings

Remind users to enable:
- Settings > Actions > General > "Allow GitHub Actions to create and approve pull requests"
