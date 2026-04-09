# API Surface

This file summarizes the CLI and config model that an LLM usually needs when writing or debugging Lefthook.

## Install Basics

Common installs:

- Node: `npm install --save-dev lefthook`
- Go: `go install github.com/evilmartians/lefthook/v2@latest`
- Ruby: `gem install lefthook`
- Python: `pipx install lefthook`
- Binary update: `lefthook self-update`

After installation:

- npm package users usually get auto-install via postinstall.
- non-npm users should run `lefthook install` after cloning.

## Core CLI

- `lefthook install`
  - installs configured Git hooks
  - creates an empty `lefthook.yml` if no config exists
  - can install specific hooks: `lefthook install pre-commit commit-msg`

- `lefthook run <hook>`
  - executes configured tasks for that hook
  - supports `--job <name>` and `--tag <tag>`
  - supports `--all-files` or repeated `--file <path>` to override file templates

- `lefthook validate`
  - validates config syntax and structure

- `lefthook dump`
  - shows the merged configuration after `extends`, `remotes`, and local overrides

- `lefthook add -d <hook-name>`
  - creates script directories under the source dir for script-based hooks

- `lefthook uninstall`
  - removes installed Git hooks managed by Lefthook

- `lefthook check-install`
  - checks whether the Git hooks are installed correctly

## Useful Environment Variables

- `LEFTHOOK=0`
  - disables Lefthook for the current Git command
  - useful to avoid recursion from hook-triggered Git commands or interactive commit tools

- `LEFTHOOK_VERBOSE`
  - increases verbosity

- `LEFTHOOK_OUTPUT`
  - extends the configured output list for one run

- `LEFTHOOK_CONFIG`
  - points to an alternate config file

- `LEFTHOOK_EXCLUDE`
  - excludes tagged tasks from a run

- `CI`
  - affects terminal behavior in CI environments

- `NO_COLOR`, `CLICOLOR_FORCE`
  - standard color control

## Supported Config Filenames

Main config can be one of:

- `lefthook.yml`
- `lefthook.yaml`
- `.lefthook.yml`
- `.lefthook.yaml`
- `.config/lefthook.yml`
- `.config/lefthook.yaml`
- `lefthook.toml`
- `.lefthook.toml`
- `.config/lefthook.toml`
- `lefthook.json`
- `.lefthook.json`
- `.config/lefthook.json`
- `lefthook.jsonc`
- `.lefthook.jsonc`
- `.config/lefthook.jsonc`

Important:

- Keep exactly one main config format per project.
- Lefthook also merges `lefthook-local.*` in the matching format.
- Local config can exist even without a shared main config.

## Merge Order

Settings are applied in this order:

1. Main `lefthook` config
2. `extends`
3. `remotes`
4. `lefthook-local`

For shared policies, remote configs should stay independent from local steps.

## Top-Level Config Keys

Common top-level keys:

- `extends`
- `remotes`
- `output`
- `source_dir`
- `source_dir_local`
- `min_version`
- `templates`
- `glob_matcher`
- hook names such as `pre-commit`, `pre-push`, `commit-msg`, `prepare-commit-msg`, `post-merge`
- custom runnable groups such as `fixer` for `lefthook run fixer`

## Hook-Level Structure

Each hook can define:

- `parallel`
- `piped`
- `files`
- `follow`
- `exclude_tags`
- `exclude`
- `only`
- `skip`
- `setup`
- `fail_on_changes`
- `fail_on_changes_diff`
- `commands`
- `scripts`
- `jobs`

## `jobs` vs `commands` vs `scripts`

### `jobs`

- preferred for new configs
- list-based, can combine `run`, `script`, and grouped jobs
- support advanced flow with nested `group.jobs`
- named jobs merge across `extends` and `lefthook-local`
- unnamed jobs append in declaration order

Example:

```yaml
pre-commit:
  parallel: true
  jobs:
    - name: frontend lint
      root: frontend/
      run: pnpm eslint --fix {staged_files}
      glob: "*.{js,ts,tsx}"
      stage_fixed: true
    - script: verify-commit.sh
      runner: bash
```

### `commands`

- map-based legacy style
- still common in existing configs
- each command has a name and a `run` block plus options

Example:

```yaml
pre-push:
  commands:
    test:
      run: npm test
```

### `scripts`

- run executables stored under `<source_dir>/<hook-name>/`
- useful when inline shell becomes hard to maintain
- need `runner` when the script is not directly executable

Example:

```yaml
commit-msg:
  scripts:
    template_checker:
      runner: bash
```

## Common Job and Command Options

- `run`
- `script`
- `runner`
- `args`
- `skip`
- `only`
- `tags`
- `glob`
- `files`
- `file_types`
- `env`
- `root`
- `exclude`
- `fail_text`
- `stage_fixed`
- `interactive`
- `use_stdin`
- `priority`

## File Templates for `run`

Templates substituted by Lefthook:

- `{files}` from custom `files` command
- `{staged_files}` for staged files being committed
- `{push_files}` for files committed but not pushed
- `{all_files}` for all tracked files
- `{cmd}` for the original command, useful when wrapping locally
- `{0}` for all hook args joined together
- `{1}`, `{2}`, `{3}` for positional hook args
- `{lefthook_job_name}` for the current task name

## File Selection and Filtering Model

Use these together:

- `run` file template chooses the file source
- `files` can replace built-in file lists with custom shell output
- `glob` filters file paths
- `exclude` removes paths or patterns
- `file_types` filters by MIME type or special file type
- `root` changes working directory and also filters repo paths for `pre-commit` and `pre-push`

Important semantics:

- `glob` is always evaluated from repo root, not from `root`.
- If a file-filtered task ends up with no matching files, Lefthook skips it.
- If the file list is very long, Lefthook splits it to respect command-line length limits.
- With default glob behavior, `**` matches one or more directories, not zero or more.
- To get standard doublestar behavior, use `glob_matcher: doublestar`.

## `file_types` Semantics

Special types include:

- `text`
- `binary`
- `executable`
- `not executable`
- `symlink`
- `not symlink`

MIME types are also supported, for example:

- `application/json`
- `text/x-python`
- `text/x-sh`
- `text/javascript`

Combination rules:

- special types use AND logic
- MIME types use OR logic

## `stage_fixed`

- default is `false`
- works only on `pre-commit`
- when enabled, Lefthook re-adds files after a fixing command or script runs
- if `files` is custom, Lefthook uses that custom list for `git add`

## Output Control

Possible `output` entries include:

- `meta`
- `summary`
- `empty_summary`
- `success`
- `failure`
- `execution`
- `execution_out`
- `execution_info`
- `skips`

You can also disable most output with:

```yaml
output: false
```

## Recommended Authoring Defaults

- Prefer `jobs` for new configs.
- Prefer `pre-commit` tasks that only touch staged files.
- Prefer `pre-push` for slower whole-project or branch-sensitive checks.
- Use `scripts` when inline shell grows beyond a few lines.
- Reach for `lefthook-local` before baking personal Docker wrappers or local skips into shared config.
