# Integrations And Plugins

## Supported Agent Presets

Kasetto includes built-in presets for many agents, including:

- `claude-code`
- `codex`
- `cursor`
- `github-copilot`
- `gemini-cli`
- `opencode`
- `windsurf`
- `cline`
- `continue`
- `goose`
- `openhands`

The extracted docs list additional presets such as `amp`, `antigravity`, `augment`, `junie`, `kiro-cli`, `openclaw`, `replit`, `roo`, `trae`, and `warp`.

## MCP Support

- MCP server configs are declared with `mcps:` entries in the config file.
- Kasetto can pull MCP configs from remote repos or local paths.
- `mcps[].path` targets a specific MCP JSON file inside a source.
- The README states that MCP server configs are auto-merged into supported agent formats such as Cursor JSON, Claude JSON, Copilot VS Code, and Codex TOML.

Example:

```yaml
mcps:
  - source: https://github.com/org/mcp-pack
  - source: https://github.com/org/monorepo
    path: mcps/my-server/pack.json
```

## Private And Enterprise Sources

Remote sources support public and private hosts.

| Host | Environment variable |
| --- | --- |
| GitHub or GitHub Enterprise | `GITHUB_TOKEN` or `GH_TOKEN` |
| GitLab or GitLab self-hosted | `GITLAB_TOKEN` or `CI_JOB_TOKEN` |
| Bitbucket Cloud | `BITBUCKET_EMAIL` + `BITBUCKET_TOKEN`, or `BITBUCKET_USERNAME` + `BITBUCKET_APP_PASSWORD` |
| Codeberg, Gitea, or Forgejo | `GITEA_TOKEN`, `CODEBERG_TOKEN`, or `FORGEJO_TOKEN` |

The same credentials apply when `--config` points at a remote HTTPS URL.

## Destination Overrides

If an agent preset does not fit, set `destination` directly to install into any path.
