# gh cache

- Docs: `https://cli.github.com/manual/gh_cache`
- Use to inspect or delete GitHub Actions caches
- Key subcommands: `list`, `delete`
- Common flag: `-R OWNER/REPO`
- Example:

```bash
gh cache list -R OWNER/REPO
gh cache delete <cache-id> -R OWNER/REPO
```
