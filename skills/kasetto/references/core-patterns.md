# Core Patterns

## Mental Model

- One YAML config is the source of truth.
- `skills` entries point at remote repos or local folders.
- Each skill source can install named skills or `"*"` for all skills.
- `mcps` entries pull MCP server configs and merge them into supported agent formats.
- Sync is diff-based: only changed content gets touched.

## Config Shape

```yaml
agent: codex

skills:
  - source: https://github.com/org/skill-pack
    branch: main
    skills:
      - code-reviewer
      - name: design-system

  - source: ~/Development/my-skills
    skills: "*"

  - source: https://github.com/acme/stable-skills
    ref: v1.2.0
    skills:
      - name: custom-skill
        path: tools/skills

mcps:
  - source: https://github.com/org/mcp-pack
  - source: https://github.com/org/monorepo
    path: mcps/my-server/pack.json
```

## Important Fields

- `agent`: one or more supported agent presets
- `destination`: explicit install path; overrides `agent`
- `scope`: `global` or `project`
- `skills[].source`: remote URL or local path
- `skills[].branch`: remote branch, defaulting to `main` with `master` fallback
- `skills[].ref`: tag, commit SHA, or ref; takes priority over `branch`
- `skills[].skills`: `"*"`, plain names, or `{ name, path }` objects
- `mcps[].path`: explicit path to an MCP JSON file inside the source

## Source Patterns

### Pull specific skills from a repo

```yaml
skills:
  - source: https://github.com/org/skill-pack
    skills:
      - code-reviewer
      - name: design-system
```

### Sync all skills from a local directory

```yaml
skills:
  - source: ~/Development/my-skills
    skills: "*"
```

### Pin to a tag or commit

```yaml
skills:
  - source: https://github.com/acme/stable-skills
    ref: v1.2.0
    skills:
      - name: custom-skill
        path: tools/skills
```

## Agent Presets

The extracted docs list presets for:

- `claude-code`
- `codex`
- `cursor`
- `github-copilot`
- `gemini-cli`
- `opencode`
- `windsurf`
- plus other built-in presets such as `amp`, `augment`, `cline`, `continue`, `goose`, `junie`, `kiro-cli`, `openhands`, `replit`, `roo`, `trae`, and `warp`

If a preset is missing or unsuitable, use `destination`.
