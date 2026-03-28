# gh project

- Docs: `https://cli.github.com/manual/gh_project`
- Use for GitHub Projects; token usually needs `project` scope
- Key subcommands: `list`, `view`, `create`, `edit`, `field-list`, `item-list`, `item-add`, `item-edit`
- Example:

```bash
gh auth refresh -s project
gh project list --owner OWNER
gh project item-add 1 --owner OWNER --url https://github.com/OWNER/REPO/issues/123
```
