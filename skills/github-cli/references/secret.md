# gh secret

- Docs: `https://cli.github.com/manual/gh_secret`
- Use to manage Actions or Codespaces secrets
- Key subcommands: `set`, `list`, `delete`
- Common scopes depend on target: repo, org, env, or user
- Common patterns:
  - Repo secret from stdin: `gh secret set NAME < value.txt`
  - Environment secret: `gh secret set NAME --env production`
  - Org secret for selected repos: `gh secret set NAME --org ORG --repos repo1,repo2`
- Example:

```bash
gh secret list
gh secret set MY_TOKEN < token.txt
gh secret delete MY_TOKEN
```

```bash
gh secret set MY_TOKEN --body "$TOKEN"
gh secret list --org ORG
gh secret set MY_TOKEN --app dependabot
```
