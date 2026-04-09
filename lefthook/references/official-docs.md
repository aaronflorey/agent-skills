# Official Lefthook Docs

Primary sources used for this skill:

- Main site: https://lefthook.dev/
- GitHub repo: https://github.com/evilmartians/lefthook
- Install overview: https://lefthook.dev/install/
- Usage overview: https://lefthook.dev/usage/
- Configuration index: https://lefthook.dev/configuration/index

## Installation Pages

- Node: https://lefthook.dev/installation/node
- Go: https://lefthook.dev/installation/go
- Ruby: https://lefthook.dev/installation/ruby
- Python: https://lefthook.dev/installation/python
- Homebrew: https://lefthook.dev/installation/homebrew
- Winget: https://lefthook.dev/installation/winget
- Mise: https://lefthook.dev/installation/mise
- Manual binary install: https://lefthook.dev/installation/manual

## CLI Pages

- `lefthook install`: https://lefthook.dev/usage/commands/install
- `lefthook uninstall`: https://lefthook.dev/usage/commands/uninstall
- `lefthook run`: https://lefthook.dev/usage/commands/run
- `lefthook add`: https://lefthook.dev/usage/commands/add
- `lefthook validate`: https://lefthook.dev/usage/commands/validate
- `lefthook dump`: https://lefthook.dev/usage/commands/dump
- `lefthook check-install`: https://lefthook.dev/usage/commands/check-install
- `lefthook self-update`: https://lefthook.dev/usage/commands/self-update

## Configuration Pages

- Config filenames and local config behavior: https://lefthook.dev/configuration/index
- Top-level `extends`: https://lefthook.dev/configuration/extends
- Top-level `remotes`: https://lefthook.dev/configuration/remotes
- Top-level `output`: https://lefthook.dev/configuration/output
- Hook and job `run`: https://lefthook.dev/configuration/run
- Hook and job `files`: https://lefthook.dev/configuration/files and https://lefthook.dev/configuration/files-global
- Hook and job `glob`: https://lefthook.dev/configuration/glob
- Hook and job `root`: https://lefthook.dev/configuration/root
- Hook and job `file_types`: https://lefthook.dev/configuration/file_types
- Hook and job `tags`: https://lefthook.dev/configuration/tags
- Hook and job `stage_fixed`: https://lefthook.dev/configuration/stage_fixed
- `jobs`: https://lefthook.dev/configuration/jobs
- `commands`: https://lefthook.dev/configuration/Commands
- `scripts`: https://lefthook.dev/configuration/Scripts

## Examples Pages

- Local-only overrides: https://lefthook.dev/examples/lefthook-local
- Filtering files: https://lefthook.dev/examples/filters
- Conditional skip and only rules: https://lefthook.dev/examples/skip
- Commitlint and commitzen: https://lefthook.dev/examples/commitlint
- Remote configs: https://lefthook.dev/examples/remotes
- Auto-stage fixed files: https://lefthook.dev/examples/stage_fixed

## Practical Source Notes

- Lefthook is a standalone binary and the docs emphasize matching installation method to the project ecosystem.
- `jobs` are newer and more flexible than legacy `commands`; prefer `jobs` for fresh configs.
- `lefthook dump` is the main debugging tool when `extends`, `remotes`, and `lefthook-local` are all involved.
