# fzf

Use `fzf` for interactive fuzzy selection.

## Best for

- Letting a human pick one or more items from a generated list
- Fast narrowing of paths, branches, commits, or symbols
- Adding preview panes to interactive review workflows

## High-signal commands

```bash
fd . src | fzf
git branch --all | fzf
fd . src | fzf --preview 'sed -n "1,120p" {}'
printf '%s\n' alpha beta gamma | fzf --filter bt
```

## Sharp edges

- Usually a bad fit for unattended agent execution.
- Do not bake heavy `--preview` settings into global defaults blindly.
- `--filter` is the main non-interactive escape hatch.

## Escalate when

- Remove `fzf` from the flow if determinism matters more than user choice.
- Pair with `fd`, `rg`, or `git` as a producer, not as the source of truth.
