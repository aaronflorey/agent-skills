# gh api

- Docs: `https://cli.github.com/manual/gh_api`
- Use for REST or GraphQL when a dedicated `gh` command does not exist
- Key flags: `-X`, `-f`, `-F`, `--input`, `--paginate`, `--slurp`, `--jq`, `--template`, `--hostname`
- Placeholders: `{owner}`, `{repo}`, `{branch}` resolve from the current repo
- Best for scripts when you need stable JSON output or unsupported endpoints
- Patterns:
  - Query fields: `--jq '.[].name'`
  - Paginate collections: `--paginate --slurp`
  - Send typed values: `-F key=value`
- Example:

```bash
gh api repos/{owner}/{repo}/releases
gh api repos/{owner}/{repo}/issues/123/comments -f body='Hi from gh'
gh api graphql -f query='query { viewer { login } }'
gh api repos/{owner}/{repo}/pulls --paginate --jq '.[].number'
```
