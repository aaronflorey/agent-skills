# Contributing

## Scope

- Keep changes focused on the skill or script you are touching.
- Treat each skill directory as independently maintainable.
- Do not hand-edit generated files marked `Do not edit it by hand`.

## Repository Layout

- Skill directories use lowercase kebab-case.
- Each skill entry point is `<skill-name>/SKILL.md`.
- Optional supporting material belongs under `references/` or `examples/` inside that skill directory.

## Local Validation

Validate all skill frontmatter blocks:

```sh
python3 - <<'PY'
from pathlib import Path
import re
root = Path('.')
required = {'name','description','version','source','license'}
ok = True
for f in sorted(root.glob('*/SKILL.md')):
    t = f.read_text(encoding='utf-8')
    m = re.match(r'^---\n(.*?)\n---\n', t, re.S)
    if not m:
        ok = False
        print(f'{f}: invalid frontmatter')
        continue
    keys = {re.match(r'^([A-Za-z_][A-Za-z0-9_-]*):', ln).group(1)
            for ln in m.group(1).splitlines()
            if re.match(r'^([A-Za-z_][A-Za-z0-9_-]*):', ln)}
    missing = sorted(required - keys)
    if missing:
        ok = False
        print(f'{f}: missing {missing}')
print('OK' if ok else 'FAILED')
PY
```

## Generated Files

If you modify the mise registry generator or intentionally refresh the generated references, run:

```sh
bun scripts/update-mise-registry.js
```

Refresh the generated README skill table when skill folders or descriptions change:

```sh
bun scripts/update-readme-skills.js
```

The shared `pre-commit` hook runs this automatically and stages any README updates.

Commit both the script changes and the regenerated `mise/references/*` outputs together.

## Commits And Releases

- Prefer conventional commit headers such as `feat:`, `fix:`, and `docs:`.
- Releases are automated with `release-please` from the default branch.
- Release tags use the `vX.X.X` format.

## Pull Requests

- Explain the user-visible or maintenance impact of the change.
- Keep generated-file updates isolated to the relevant workflow when practical.
- Update nearby documentation when behavior, structure, or maintenance steps change.
