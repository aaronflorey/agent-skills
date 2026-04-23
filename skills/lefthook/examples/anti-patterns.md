# Anti-Patterns

## 1. Slow whole-repo `pre-commit`

Bad:

```yaml
pre-commit:
  commands:
    lint:
      run: pnpm eslint {all_files}
```

Better:

```yaml
pre-commit:
  jobs:
    - run: pnpm eslint --fix {staged_files}
      glob: "*.{js,ts,tsx}"
      stage_fixed: true
```

Why:

- `pre-commit` should usually be fast and scoped to staged files

## 2. Assuming `root` changes `glob`

Bad:

```yaml
pre-commit:
  commands:
    lint:
      root: frontend/
      glob: "src/**/*.ts"
      run: pnpm eslint {staged_files}
```

Better:

```yaml
pre-commit:
  commands:
    lint:
      root: frontend/
      glob: "frontend/src/**/*.ts"
      run: pnpm eslint {staged_files}
```

Why:

- `glob` is always evaluated from the repo root

## 3. Forgetting to re-stage auto-fixes

Bad:

```yaml
pre-commit:
  commands:
    format:
      run: pnpm prettier --write {staged_files}
      glob: "*.ts"
```

Better:

```yaml
pre-commit:
  commands:
    format:
      run: pnpm prettier --write {staged_files}
      glob: "*.ts"
      stage_fixed: true
```

Why:

- otherwise the commit can proceed without the fixed content staged

## 4. Embedding complex shell directly in YAML

Bad:

```yaml
commit-msg:
  commands:
    check:
      run: |
        INPUT_FILE={1}
        START_LINE=$(head -n1 "$INPUT_FILE")
        PATTERN="^(TICKET)-[[:digit:]]+: "
        if ! [[ "$START_LINE" =~ $PATTERN ]]; then
          echo "Bad commit message"
          exit 1
        fi
```

Better:

```yaml
commit-msg:
  scripts:
    template_checker:
      runner: bash
```

Why:

- large shell logic is easier to maintain as a script under the source dir

## 5. Baking personal Docker wrappers into shared config

Bad:

```yaml
pre-commit:
  commands:
    lint:
      run: docker compose run --rm api bundle exec rubocop -- {staged_files}
```

Better:

- keep the shared config simple
- wrap it locally in `lefthook-local.yml` with `{cmd}`
