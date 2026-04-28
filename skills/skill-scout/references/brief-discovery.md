# Brief Discovery

Use `brief --json` as the first discovery pass when it is available. It gives a
fast structured summary of the active project, but it does not replace manual
verification.

## Command

```bash
brief --json
```

If the project is large, nested, or noisy, consider narrowing the scan from the
target app directory before running it. If `brief` is missing, continue with the
manual manifest and config inspection in `references/scouting-workflow.md`.

## How To Interpret Output

Map the JSON fields into Skill Scout findings:

| `brief --json` field | Use |
|---|---|
| `languages[].name` | Seed language and ecosystem skill candidates. |
| `languages[].confidence` | Initial signal only; do not rank solely from confidence. |
| `tools.*[].name` | Seed framework, platform, release, CI, lint, and environment candidates. |
| `tools.*[].config_files` | Evidence paths to verify before promotion. |
| `dependencies[]` where `direct: true` | Seed direct package or framework candidates. |
| `platforms.runtime_version_files` | Runtime/version manager evidence. |
| `resources` | Project docs and policy files worth preserving or referencing. |
| `git.remotes` | Useful for project identity, not skill selection by itself. |

## Verification Rules

- Promote to P0 only when `brief` output is supported by a primary framework,
  platform config, direct dependency, or source imports.
- Promote to P1 when `brief` finds a direct major tool or package that shapes
  development workflow, release flow, UI work, or deployment.
- Keep language-only matches as P2 unless code or config shows a framework,
  platform, or major package needing specialized guidance.
- Treat low-confidence findings as search hints, not recommendations.
- De-duplicate repeated dependency records before researching skills.

## Query Generation

Generate marketplace and GitHub searches from verified findings, not raw output.
Good queries include both the ecosystem name and the concrete tool:

```text
nuxt agent skill
nuxt SKILL.md
cloudflare workers opencode skill
github.com/spf13/cobra SKILL.md
```

## Reporting

When `brief --json` is used, include it in the final report:

```markdown
Discovery: `brief --json` used, then verified against manifest/config/source files.
```

If it is unavailable or incomplete, state the fallback:

```markdown
Discovery: `brief --json` unavailable; used manual manifest/config inspection.
```
