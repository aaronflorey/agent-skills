# gh issue

- Docs: `https://cli.github.com/manual/gh_issue`
- Use to create, list, inspect, edit, comment on, close, reopen, or transfer issues
- Key subcommands: `create`, `list`, `view`, `comment`, `edit`, `close`, `reopen`, `status`
- Common flag: `-R OWNER/REPO`
- Common patterns:
  - Open in browser: `gh issue view 123 --web`
  - Create with metadata: `gh issue create --label bug --assignee @me`
  - Machine output: `gh issue view 123 --json number,title,state,assignees`
- Example:

```bash
gh issue list -R OWNER/REPO
gh issue create --title "Bug" --body "Steps to reproduce"
gh issue comment 123 --body "Investigating"
```

```bash
gh issue close 123 --comment "Fixed in #456"
gh issue reopen 123
gh issue status
```
