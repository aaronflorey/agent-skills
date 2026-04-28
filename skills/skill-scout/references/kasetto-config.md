# Kasetto Config Rules

Kasetto manages agent skills declaratively from `kasetto.yaml`. Generate config
that can be reviewed, versioned, and dry-run before installation.

## Valid Core Shape

```yaml
agent: opencode
scope: project

skills:
  - source: https://github.com/org/skill-pack
    skills:
      - skill-name
```

Use `scope: project` for project-specific skills unless the user asks for global
installation. Use `agent: opencode` when the active runtime is OpenCode. If the
project clearly supports multiple agent users, a list is valid:

```yaml
agent:
  - opencode
  - claude-code
  - codex
scope: project
```

## Skill Source Entries

Kasetto sources must be syncable Git host URLs or local paths. Marketplace IDs
alone are not enough.

```yaml
skills:
  - source: https://github.com/acme/stable-skills
    ref: v1.2.0
    skills:
      - name: custom-skill
        path: tools/skills
```

Use `branch` for a branch, `ref` for a tag/commit/ref, and `sub-dir` when the
skills live in a nested source directory:

```yaml
skills:
  - source: https://github.com/acme/agents
    sub-dir: plugins/swift-apple-expert
    skills: "*"
```

## Taste Skill Entries

For frontend implementation, add the default Taste Skill:

```yaml
skills:
  - source: https://github.com/Leonxlnx/taste-skill
    sub-dir: skills/taste-skill
    skills:
      - design-taste-frontend
```

For existing UI redesign work, use:

```yaml
skills:
  - source: https://github.com/Leonxlnx/taste-skill
    sub-dir: skills/redesign-skill
    skills:
      - redesign-existing-projects
```

Do not add every Taste Skill variant by default. Choose one unless project needs
clearly justify multiple variants.

## Merging Existing Config

When `kasetto.yaml` already exists:

- Preserve existing `agent`, `destination`, `scope`, `mcps`, comments, and source
  entries when they are valid.
- Group added skills under an existing matching `source` when possible.
- Do not duplicate skill names in the same source entry.
- Do not switch `scope` from `global` to `project` without asking.
- Do not overwrite `destination`; it takes precedence over `agent`.

## Validation

After writing config, run this if `kst` is installed:

```bash
kst sync --config kasetto.yaml --dry-run
```

If `kst` is missing, report the config was not dry-run and provide the command.
Do not run a real sync unless the user explicitly approves.

## Unsupported Candidates

If research finds a good marketplace result but no Git/local source, list it as a
deferred candidate:

```markdown
Deferred: <skill-name> from <marketplace URL>
Reason: marketplace entry did not expose a Kasetto-compatible Git or local source.
```
