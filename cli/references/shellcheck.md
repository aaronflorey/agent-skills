# shellcheck

Use `shellcheck` to lint shell scripts for correctness and portability issues.

## Best for

- Catching quoting bugs, unsafe expansions, and dead code
- Auditing shell scripts before commit or release
- Producing machine-readable diagnostics with `-f json1`

## High-signal commands

```bash
shellcheck scripts/deploy.sh
shellcheck -x scripts/build.sh
shellcheck -f json1 scripts/*.sh
shellcheck -s bash entrypoint
```

## Sharp edges

- It is not a formatter.
- `-x` helps resolve sourced files, but path assumptions still matter.
- Some warnings are policy decisions; suppress them deliberately, not reflexively.

## Escalate when

- Pair with a formatter if style cleanup is also required.
- Switch to runtime tests when shell behavior depends on environment state.
