# gh workflow

- Docs: `https://cli.github.com/manual/gh_workflow`
- Use to list, view, run, enable, or disable workflows
- Key subcommands: `list`, `view`, `run`, `enable`, `disable`
- Common flag: `-R OWNER/REPO`
- Common patterns:
  - Trigger with inputs: `gh workflow run ci.yml -f env=staging`
  - Trigger from JSON stdin: `echo '{"env":"staging"}' | gh workflow run ci.yml --json`
  - Pair with runs: `gh workflow run ...` then `gh run watch`
- Example:

```bash
gh workflow list
gh workflow run ci.yml --ref main
gh workflow view ci.yml
```
