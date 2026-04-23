# gh release

- Docs: `https://cli.github.com/manual/gh_release`
- Use to create, inspect, download, upload, edit, verify, or delete releases and assets
- Key subcommands: `create`, `list`, `view`, `download`, `upload`, `edit`, `delete`, `verify`
- Common flag: `-R OWNER/REPO`
- Common patterns:
  - Generate notes: `gh release create v1.2.3 --generate-notes`
  - Mark prerelease: `gh release create v1.3.0-rc1 --prerelease`
  - Download specific assets: `gh release download v1.2.3 -p '*.tar.gz'`
- Example:

```bash
gh release create v1.2.3 dist/* --notes "Release notes"
gh release view v1.2.3
gh release download v1.2.3
```

```bash
gh release upload v1.2.3 build/myapp_linux_amd64.tar.gz
gh release verify v1.2.3
gh release list
```
