# API Surface

## Contents
- Search and rewrite
- Structured data and fetch
- Inspection, diff, lint, metrics
- Decision boundaries

## Search and rewrite

| Tool | Core commands | High-value flags |
|---|---|---|
| `fd` | `fd PATTERN`, `fd -e EXT`, `fd -p PATHPATTERN` | `-g` glob mode, `-H` hidden, `-I` no ignore, `-t f|d`, `-x CMD` |
| `rg` | `rg PATTERN`, `rg -l PATTERN`, `rg -n PATTERN` | `-g`, `-t`, `-C`, `--multiline`, `--replace`, `-uuu` |
| `sd` | `sd FROM TO FILES...`, `sd -p FROM TO` | `-p` preview, `-A` multiline, `-f` string mode |
| `comby` | `comby MATCH REWRITE -stdin -matcher .ext` | `-matcher`, `-rule`, `-d`, `-f`, `-i` |
| `ast-grep` | `ast-grep run`, `ast-grep scan`, `ast-grep test` | `--pattern`, `--rewrite`, `--lang`, `--rule`, `--json` |

## Structured data and fetch

| Tool | Core commands | High-value flags |
|---|---|---|
| `wget` | `wget URL`, `wget -qO- URL`, `wget -c URL` | `-O`, `-P`, `-nv`, `--retry-connrefused`, `--wait`, `--mirror` |
| `jq` | `jq FILTER`, `jq -r FILTER`, `jq -e FILTER` | `--arg`, `--argjson`, `-c`, `-s`, `--stream` |
| `yq` | `yq EXPR FILE`, `yq -i EXPR FILE`, `yq -o=json` | `-i`, `-p`, `-o`, `ea`, `eval-all` |
| `fzf` | `... | fzf`, `fzf --filter QUERY` | `--multi`, `--preview`, `--bind`, `--height`, `--scheme` |

## Inspection, diff, lint, metrics

| Tool | Core commands | High-value flags |
|---|---|---|
| `head` | `head FILE`, `head -n N FILE`, `head -c N FILE` | `-n -N`, `-c -N`, `-z` |
| `less` | `less FILE`, `CMD | less -R`, `less +F FILE` | `-R`, `+F`, `-N`, `-S` |
| `difftastic` | `difft FILE1 FILE2`, `git diff | difft --color=always -` | `--display`, `--context`, `--language`, `--width` |
| `shellcheck` | `shellcheck SCRIPT`, `shellcheck -x SCRIPT` | `-f gcc`, `-f json1`, `-e`, `-s bash|sh|ksh` |
| `scc` | `scc`, `scc -f json`, `scc --by-file` | `-u`, `-a`, `--by-file`, `-f json`, `--include-ext` |

## Decision boundaries

- Pick `fd` before `rg` when the question is "which files?" rather than "which lines?"
- Pick `sd` before `comby` or `ast-grep` when a plain text replacement is enough.
- Pick `comby` before `ast-grep` when structure matters but full AST setup would be overkill.
- Pick `jq` and `yq` over ad hoc regex for structured data.
- Pick `head` over `less` for scripts and unattended checks.
- Pick `shellcheck` for shell diagnostics and `scc` for repo inventory; they answer different questions.
