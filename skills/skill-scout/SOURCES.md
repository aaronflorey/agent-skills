# Sources

## External References

- OpenCode Agent Skills documentation: https://opencode.ai/docs/skills/
- Kasetto README and configuration reference: https://github.com/pivoshenko/kasetto
- Kasetto example config: https://github.com/pivoshenko/kasetto/blob/main/kasetto.example.yaml
- Taste Skill repository: https://github.com/Leonxlnx/taste-skill
- LobeHub Skills Marketplace CLI examples: https://lobehub.com/skills
- Curated agent-skill catalog example: https://github.com/VoltAgent/awesome-agent-skills
- `brief --json` project summary CLI, observed locally with JSON fields for
  languages, tools, dependencies, platforms, resources, git, and line counts.

## Authoring Decisions

- The skill is a workflow-process skill: it orchestrates project analysis,
  external research, candidate scoring, config editing, and validation.
- The skill explicitly targets the active user project, not this repository, to
  avoid accidental self-analysis when distributed from a skill library.
- The Kasetto guidance forbids adding marketplace-only identifiers because
  Kasetto expects Git host URLs or local paths.
- Taste Skill is recommended only when the target project has a design-bearing UI
  surface or the user requests design work.
- `brief --json` is used as a first-pass discovery source, but findings still
  require direct verification before they become P0/P1 recommendations.

## Coverage Notes

- OpenCode frontmatter compatibility is accounted for, while this repository's
  stricter `version`, `source`, and `license` metadata contract is preserved.
- Kasetto config examples cover single-agent, multi-agent, nested subdirectory,
  pinned refs, and dry-run validation.
- Discovery guidance covers both automated `brief --json` summaries and manual
  fallback when `brief` is unavailable or incomplete.
