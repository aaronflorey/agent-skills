# gh search

- Docs: `https://cli.github.com/manual/gh_search`
- Use GitHub search from the CLI for code, commits, issues, PRs, or repositories
- Key subcommands: `code`, `commits`, `issues`, `prs`, `repos`
- Example:

```bash
gh search repos "language:go stars:>1000 cli"
gh search issues "repo:OWNER/REPO is:open label:bug"
gh search code "TODO repo:OWNER/REPO"
```
