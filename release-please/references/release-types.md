# Release Types Reference

Use this to determine the correct `release-type` for the user's project.

## Quick Reference

| Language/Framework | release-type | Key Files |
|--------------------|--------------|-----------|
| Node.js/npm | `node` | `package.json` |
| Python | `python` | `pyproject.toml`, `setup.py`, `setup.cfg` |
| Go | `go` | (tags only) |
| Rust | `rust` | `Cargo.toml` |
| Java | `java` or `maven` | `pom.xml` |
| Ruby | `ruby` | `version.rb` |
| PHP | `php` | `composer.json` |
| Dart/Flutter | `dart` | `pubspec.yaml` |
| Elixir | `elixir` | `mix.exs` |
| Helm | `helm` | `Chart.yaml` |
| Terraform | `terraform-module` | `README.md` |
| Expo/React Native | `expo` | `package.json`, `app.json` |
| Generic | `simple` | `version.txt` |

## Setup Examples

### Node.js

Workflow:
```yaml
- uses: googleapis/release-please-action@v4
  with:
    release-type: node
```

Or config:
```json
{
  "packages": {
    ".": { "release-type": "node" }
  }
}
```

### Python

Workflow:
```yaml
- uses: googleapis/release-please-action@v4
  with:
    release-type: python
```

Config (if package name differs from directory):
```json
{
  "packages": {
    ".": {
      "release-type": "python",
      "package-name": "my_package"
    }
  }
}
```

### Go

```yaml
- uses: googleapis/release-please-action@v4
  with:
    release-type: go
```

Note: Go uses git tags for versions, so only CHANGELOG is updated.

### Rust

Single crate:
```yaml
- uses: googleapis/release-please-action@v4
  with:
    release-type: rust
```

Workspace (use manifest config):
```json
{
  "plugins": ["cargo-workspace"],
  "packages": {
    "crates/core": { "release-type": "rust" },
    "crates/cli": { "release-type": "rust" }
  }
}
```

### Ruby

```yaml
- uses: googleapis/release-please-action@v4
  with:
    release-type: ruby
```

If version file is non-standard:
```json
{
  "packages": {
    ".": {
      "release-type": "ruby",
      "version-file": "lib/my_gem/version.rb"
    }
  }
}
```

### Helm Chart

```yaml
- uses: googleapis/release-please-action@v4
  with:
    release-type: helm
    path: charts/my-chart
```

### Simple/Generic

For any project without native package manager support:

```yaml
- uses: googleapis/release-please-action@v4
  with:
    release-type: simple
```

Create a `version.txt` with just the version number:
```
1.0.0
```

## Identifying Release Type

Look for these files in the user's repo:
- `package.json` → `node`
- `pyproject.toml` or `setup.py` → `python`
- `go.mod` → `go`
- `Cargo.toml` → `rust`
- `pom.xml` → `maven`
- `*.gemspec` or `version.rb` → `ruby`
- `composer.json` → `php`
- `pubspec.yaml` → `dart`
- `mix.exs` → `elixir`
- `Chart.yaml` → `helm`
- None of the above → `simple`
