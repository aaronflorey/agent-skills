# Agent Skills

[![License](https://img.shields.io/github/license/aaronflorey/agent-skills?style=flat-square)](LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/aaronflorey/agent-skills/ci.yaml?branch=main&style=flat-square&label=ci)](https://github.com/aaronflorey/agent-skills/actions/workflows/ci.yaml)
[![Release](https://img.shields.io/github/v/release/aaronflorey/agent-skills?display_name=tag&sort=semver&style=flat-square)](https://github.com/aaronflorey/agent-skills/releases)

A collection of reusable skills for coding agents such as [Claude Code](https://docs.anthropic.com/en/docs/claude-code) and [Codex](https://openai.com/codex/).

Each skill lives in its own directory and is centered on a `SKILL.md` file, with optional `references/` and `examples/` content alongside it.

## Installation

Install a skill from this repository with the `skills` CLI:

```sh
bunx skills add aaronflorey/agent-skills --skill <skill-name>
```

Examples:

```sh
bunx skills add aaronflorey/agent-skills --skill amber-lang
bunx skills add aaronflorey/agent-skills --skill goreleaser
bunx skills add aaronflorey/agent-skills --skill release-please
```

## Available Skills

`amber-lang`, `beamng-mods`, `charmbracelet`, `cli`, `dasel`, `depsdotdev`, `flyscrape`, `github-cli`, `go-cobra`, `go-viper`, `goreleaser`, `kasetto`, `laravel-actions`, `lefthook`, `mise`, `num30-config`, `pelican-panel-plugins`, `php-monorepo-builder`, `php-saloon`, `qodo-merge`, `release-please`, `shieldsio`, `skill-researcher`, `taskfile`, `valinor-php`

## Usage

- Browse the skill directories in this repository to inspect the available `SKILL.md` files.
- Install the skill that matches the task you want the agent to handle.
- Use the trigger language described in that skill's `description` so the agent can activate it reliably.

## Development Setup

This repository does not have a global build pipeline. The main maintenance command is:

```sh
bun scripts/update-mise-registry.js
```

Use it only when you intentionally update the generated files under `mise/references/`.

Useful local validation commands:

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

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines, validation commands, and generated-file rules.

## Release Process

- Releases are managed with `release-please`.
- Tags use the `vX.X.X` format.
- Conventional commit headers such as `feat:` and `fix:` drive changelog and version bumps.
- GitHub Releases are published from the default branch after the release pull request is merged.

## Security

See [SECURITY.md](SECURITY.md) for vulnerability reporting guidance.

## License

[MIT](LICENSE)
