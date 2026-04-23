# Common Use Cases

## Contents
- Scope files before editing
- Search then replace safely
- Upgrade regex rewrites to structural rewrites
- Validate JSON or YAML in pipelines
- Fetch and inspect remote artifacts
- Review diffs and shell scripts
- Inventory large repositories

## Scope files before editing

Use `fd` to find candidate files, then `rg` to confirm content matches.

```bash
fd -e ts 'user' src
rg -n 'createUser\(' src
```

## Search then replace safely

Preview a simple rename with `sd -p`, then apply it once the output looks right.

```bash
sd -p 'old_name' 'new_name' src/**/*.py
sd 'old_name' 'new_name' src/**/*.py
```

## Upgrade regex rewrites to structural rewrites

Use `comby` when token order matters and `ast-grep` when the pattern must parse as real code.

```bash
comby 'logger.info(:[msg])' 'logger.debug(:[msg])' -d src -f .js -i
ast-grep run --lang ts --pattern 'foo($A)' --rewrite 'bar($A)' src
```

## Validate JSON or YAML in pipelines

Use `jq -e` for JSON conditions and `yq -i` for YAML edits.

```bash
jq -e '.status == "ok"' response.json
yq -i '.image.tag = "1.2.3"' deploy.yaml
```

## Fetch and inspect remote artifacts

Stream with `wget -qO-` when you want a pipeline, or resume with `wget -c` for large downloads.

```bash
wget -qO- https://example.com/data.json | jq '.items[] | .name'
wget -c https://example.com/big.tar.gz
```

## Review diffs and shell scripts

Use `difftastic` for human review and `shellcheck` for shell correctness.

```bash
difft old.py new.py
shellcheck -x scripts/deploy.sh
```

## Inventory large repositories

Use `scc` to see language mix, per-file outliers, and rough complexity hotspots.

```bash
scc
scc --by-file -f json > scc-report.json
```

## Human-in-the-loop selection and paging

Use `fzf` and `less` only when the workflow benefits from interactive review.

```bash
fd . src | fzf
git diff --color=always | less -R
```
