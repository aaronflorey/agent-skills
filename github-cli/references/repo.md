# gh repo

- Docs: `https://cli.github.com/manual/gh_repo`
- Use to create, clone, fork, view, rename, sync, archive, or delete repositories
- Key subcommands: `create`, `clone`, `fork`, `view`, `list`, `set-default`, `sync`, `edit`, `delete`
- Common patterns:
  - New repo from current dir: `gh repo create --source=. --private --push`
  - Set default repo for this checkout: `gh repo set-default OWNER/REPO`
  - Sync a fork with upstream: `gh repo sync`
- Example:

```bash
gh repo clone OWNER/REPO
gh repo fork --clone
gh repo view --web
gh repo create my-repo --private
```
