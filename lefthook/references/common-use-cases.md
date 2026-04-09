# Common Use Cases

These are the patterns an LLM is most likely to need when writing or updating Lefthook config.

## 1. Fast staged lint and format in `pre-commit`

Use when a formatter or linter can operate on only the staged files.

```yaml
pre-commit:
  jobs:
    - name: eslint
      run: pnpm eslint --fix {staged_files}
      glob: "*.{js,ts,tsx}"
      stage_fixed: true
    - name: prettier
      run: pnpm prettier --write {staged_files}
      glob:
        - "*.{js,ts,tsx,json,md,yml,yaml}"
      stage_fixed: true
```

Why this is good:

- keeps `pre-commit` fast
- restages auto-fixed files safely
- avoids scanning the whole repo

## 2. Monorepo hooks with per-package roots

Use when commands need different working directories.

```yaml
pre-commit:
  parallel: true
  jobs:
    - name: frontend lint
      root: frontend/
      run: pnpm eslint --fix {staged_files}
      glob: "frontend/**/*.{js,ts,tsx}"
      stage_fixed: true
    - name: api rubocop
      root: api/
      run: bundle exec rubocop --force-exclusion -- {staged_files}
      glob: "api/**/*.rb"
    - name: proxy gofmt
      root: proxy/
      run: gofmt -w {staged_files}
      glob: "proxy/**/*.go"
      stage_fixed: true
```

Key detail:

- `root` changes the working directory, but the `glob` still matches from repo root.

## 3. Run slower changed-file checks on `pre-push`

Use `pre-push` for checks that are too slow or noisy for every commit.

```yaml
pre-push:
  jobs:
    - name: frontend typecheck
      run: pnpm tsc --noEmit
      glob: "frontend/**/*.{ts,tsx}"
    - name: stylelint changed files
      files: git diff --name-only HEAD @{push}
      glob: "*.{css,scss}"
      run: pnpm stylelint {files}
```

## 4. Commit message validation and guided commit creation

Use hook args with `{1}` for `commit-msg`, and use `interactive: true` when the tool needs a terminal.

```yaml
prepare-commit-msg:
  commands:
    commitzen:
      interactive: true
      env:
        LEFTHOOK: 0
      run: pnpm cz --hook

commit-msg:
  commands:
    commitlint:
      run: pnpm commitlint --edit {1}
```

Why `LEFTHOOK: 0` matters:

- it prevents recursive hook execution if the interactive tool triggers Git internally

## 5. Local-only Docker wrappers and skips

Use `lefthook-local.yml` for personal setup instead of hardcoding it into shared config.

Shared config:

```yaml
pre-commit:
  commands:
    lint:
      run: bundle exec rubocop --force-exclusion -- {staged_files}
      glob: "*.rb"
    links:
      run: lychee -- {staged_files}
```

Local override:

```yaml
pre-commit:
  commands:
    lint:
      run: docker compose run --rm api {cmd}
    links:
      skip: true
```

## 6. Conditional execution by branch or env

Use `only` and `skip` when hooks should depend on branch or environment.

```yaml
pre-commit:
  only:
    - ref: dev/*
  commands:
    lint:
      run: pnpm eslint {staged_files}
      glob: "*.{js,ts}"

pre-push:
  commands:
    test:
      run: pnpm test
      skip:
        - run: test "$NO_TEST" = 1
    lint-main:
      run: pnpm lint
      only:
        - ref: main
```

## 7. Use scripts for non-trivial shell logic

Prefer a script when the hook logic is easier to test and read outside YAML.

```yaml
commit-msg:
  scripts:
    template_checker:
      runner: bash
```

Script file location:

- `.lefthook/commit-msg/template_checker` by default
- or another source dir if `source_dir` is customized

## 8. Shared policy with `remotes` or `extends`

Use `extends` for local file reuse and `remotes` for organization-wide shared configs.

```yaml
extends:
  - ./.config/lefthook/base.yml

remotes:
  - git_url: https://github.com/example/engineering-hooks
    ref: v1.2.0
    configs:
      - configs/node.yml
```

Use `lefthook dump` if behavior differs from the file you edited.

## 9. Custom non-Git task groups

Lefthook can define named task groups that are not tied to a native Git hook.

```yaml
fixer:
  jobs:
    - run: bundle exec rubocop --safe-auto-correct -- {staged_files}
      glob: "*.rb"
    - run: pnpm eslint --fix {staged_files}
      glob: "*.{js,ts,tsx}"
```

Run it directly:

```sh
lefthook run fixer
```

## 10. Grouped flows inside `jobs`

Use a group when one subset must run in order but the full hook can still run in parallel with other tasks.

```yaml
pre-commit:
  parallel: true
  jobs:
    - name: migrations
      root: backend/
      glob: "backend/db/migrations/*"
      group:
        piped: true
        jobs:
          - run: bundle install
          - run: rails db:migrate
    - name: frontend lint
      root: frontend/
      run: pnpm eslint --fix {staged_files}
      glob: "frontend/**/*.{js,ts,tsx}"
      stage_fixed: true
```

Important:

- on groups, only `root`, `glob`, and `exclude` propagate to nested jobs
- other options still need to be set per nested job
