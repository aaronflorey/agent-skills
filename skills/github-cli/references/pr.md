# gh pr

- Docs: `https://cli.github.com/manual/gh_pr`
- Use to create, review, inspect, diff, merge, close, reopen, or check out pull requests
- Key subcommands: `create`, `list`, `view`, `diff`, `checkout`, `review`, `checks`, `merge`, `status`
- Common flag: `-R OWNER/REPO`
- Common patterns:
  - Draft PR: `gh pr create --draft`
  - Open in browser: `gh pr view --web`
  - Machine output: `gh pr view 123 --json number,title,state,mergeStateStatus`
- Example:

```bash
gh pr create --fill
gh pr checks 123
gh pr merge 123 --squash --delete-branch
```

```bash
gh pr review 123 --approve
gh pr diff 123
gh pr checkout 123
```
