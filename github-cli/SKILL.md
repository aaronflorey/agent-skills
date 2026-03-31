---
name: github-cli
description: Use GitHub CLI (`gh`) for authentication, repository work, issues, pull requests, releases, Actions, projects, API calls, and other GitHub workflows. Use this skill whenever the user asks how to do something with `gh`, wants a command example, needs help scripting GitHub operations, or wants to translate GitHub UI work into CLI commands.
version: 1.0.0
source: https://cli.github.com/manual/gh
license: MIT
---

# GitHub CLI

GitHub CLI is the fastest way to work with GitHub from a terminal.

## Start Here

- Authenticate first: `gh auth login`
- Check active context: `gh auth status`
- Target another repo when needed: `-R OWNER/REPO`
- Get command help anytime: `gh <command> --help`

## Common Workflow

```bash
gh auth login
gh repo clone OWNER/REPO
gh issue list
gh pr create --fill
gh run watch
```

## References

### Core

- `gh auth`: `references/auth.md`
- `gh browse`: `references/browse.md`
- `gh codespace`: `references/codespace.md`
- `gh gist`: `references/gist.md`
- `gh issue`: `references/issue.md`
- `gh org`: `references/org.md`
- `gh pr`: `references/pr.md`
- `gh project`: `references/project.md`
- `gh release`: `references/release.md`
- `gh repo`: `references/repo.md`

### Actions

- `gh cache`: `references/cache.md`
- `gh run`: `references/run.md`
- `gh workflow`: `references/workflow.md`

### Additional

- `gh agent-task`: `references/agent-task.md`
- `gh alias`: `references/alias.md`
- `gh api`: `references/api.md`
- `gh attestation`: `references/attestation.md`
- `gh completion`: `references/completion.md`
- `gh config`: `references/config.md`
- `gh copilot`: `references/copilot.md`
- `gh extension`: `references/extension.md`
- `gh gpg-key`: `references/gpg-key.md`
- `gh label`: `references/label.md`
- `gh licenses`: `references/licenses.md`
- `gh preview`: `references/preview.md`
- `gh ruleset`: `references/ruleset.md`
- `gh search`: `references/search.md`
- `gh secret`: `references/secret.md`
- `gh ssh-key`: `references/ssh-key.md`
- `gh status`: `references/status.md`
- `gh variable`: `references/variable.md`

## Notes

- Prefer `--json`, `--jq`, or `--template` for scripts
- `gh api` is the fallback for anything not covered by a dedicated command
- For GitHub Enterprise, use `--hostname` or set `GH_HOST`
