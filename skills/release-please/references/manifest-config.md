# Manifest Config Reference

Use manifest config for monorepos or advanced setups.

## When to Use Manifest Config

- Monorepo with multiple packages
- Need custom changelog sections
- Need plugins (workspace linking)
- Want to check config into source control
- Need per-package configuration

## File Setup

Create two files in repository root:

**release-please-config.json:**
```json
{
  "packages": {
    ".": {
      "release-type": "node"
    }
  }
}
```

**\.release-please-manifest.json:**
```json
{
  ".": "1.0.0"
}
```

Update workflow to omit `release-type`:
```yaml
- uses: googleapis/release-please-action@v4
```

## Single Package Config

```json
{
  "packages": {
    ".": {
      "release-type": "node"
    }
  }
}
```

## Monorepo Config

```json
{
  "packages": {
    "packages/core": {
      "release-type": "node",
      "component": "core"
    },
    "packages/cli": {
      "release-type": "node",
      "component": "cli"
    }
  }
}
```

Manifest:
```json
{
  "packages/core": "1.0.0",
  "packages/cli": "2.1.0"
}
```

## Common Config Options

```json
{
  // For first-time setup on repo with history
  "bootstrap-sha": "abc123...",
  
  // Plugins for monorepo dependency linking
  "plugins": ["node-workspace"],
  
  // Default for all packages (can override per-package)
  "release-type": "node",
  "include-v-in-tag": true,
  "changelog-sections": [
    {"type": "feat", "section": "Features"},
    {"type": "fix", "section": "Bug Fixes"},
    {"type": "perf", "section": "Performance"},
    {"type": "deps", "section": "Dependencies", "hidden": true}
  ],
  
  "packages": {
    ".": {
      "release-type": "node",
      "component": "my-package",
      "changelog-path": "CHANGELOG.md"
    }
  }
}
```

## Monorepo Plugins

### node-workspace

For npm/yarn workspaces. Automatically bumps dependents when a dependency is released:

```json
{
  "plugins": ["node-workspace"],
  "packages": {
    "packages/core": { "release-type": "node" },
    "packages/cli": { "release-type": "node" }
  }
}
```

### cargo-workspace

For Rust workspaces:

```json
{
  "plugins": ["cargo-workspace"],
  "packages": {
    "crates/lib": { "release-type": "rust" },
    "crates/bin": { "release-type": "rust" }
  }
}
```

### linked-versions

Keep multiple packages at same version:

```json
{
  "plugins": [
    {
      "type": "linked-versions",
      "groupName": "sdk",
      "components": ["core", "client", "server"]
    }
  ]
}
```

## Extra Files

Update additional files with version:

```json
{
  "packages": {
    ".": {
      "release-type": "node",
      "extra-files": [
        "src/version.ts",
        {
          "type": "json",
          "path": "manifest.json",
          "jsonpath": "$.version"
        },
        {
          "type": "yaml",
          "path": "config.yaml",
          "jsonpath": "$.app.version"
        }
      ]
    }
  }
}
```

For generic files, use annotations:
```typescript
// src/version.ts
export const VERSION = "1.0.0"; // x-release-please-version
```

## Bootstrapping Existing Repos

For repos with existing releases:

1. Set current version in manifest:
```json
{
  ".": "2.3.4"
}
```

2. Optionally limit changelog history with `bootstrap-sha`:
```json
{
  "bootstrap-sha": "<sha-before-first-commit-to-include>",
  "packages": { ... }
}
```

## Tag Format

Default: `<component>-v<version>` (e.g., `core-v1.2.3`)

For simple `v<version>` tags:
```json
{
  "packages": {
    ".": {
      "include-component-in-tag": false
    }
  }
}
```

## Pre-releases

For beta/alpha releases:

```json
{
  "packages": {
    ".": {
      "release-type": "node",
      "prerelease": true,
      "prerelease-type": "beta"
    }
  }
}
```

## Full Config Reference

See: https://github.com/googleapis/release-please/blob/main/docs/manifest-releaser.md
