# Troubleshooting and Workarounds

## 1. Hooks are not running at all

Symptoms:

- `git commit` does nothing related to Lefthook
- expected hook output never appears

Checks and fixes:

- run `lefthook check-install`
- run `lefthook install` if the repo is not using the npm package auto-install flow
- confirm the repo is actually a Git repository with `.git/hooks/`

## 2. Config changes are not reflected

Important Lefthook behavior:

- reinstall is not required after editing `lefthook.yml`
- the config is read on every hook execution

If behavior still looks stale:

- check that you edited the real config file being used
- check for `lefthook-local.*`, `extends`, or `remotes` overriding it
- run `lefthook dump` to inspect the merged config

## 3. The wrong config file seems to be in effect

Cause:

- multiple supported config filenames exist in the repo

Fix:

- keep exactly one main config file format per project
- remove or rename duplicates such as both `lefthook.yml` and `.lefthook.yml`
- use `LEFTHOOK_CONFIG` only when you intentionally want an alternate file

## 4. A job is skipped unexpectedly

Common causes:

- no files matched after `glob`, `exclude`, `file_types`, or `root` filtering
- custom `files` command returned nothing
- `skip` condition evaluated truthy
- `only` condition did not match current ref

Fix:

- simplify filters one by one
- test with `lefthook run <hook> --all-files`
- test with explicit files: `lefthook run pre-commit --file path/to/file.ts`

## 5. `glob: "src/**/*.js"` misses `src/file.js`

Cause:

- Lefthook's default `**` matches one or more directories deep

Fix options:

- add both patterns:

```yaml
glob:
  - "src/*.js"
  - "src/**/*.js"
```

- or set `glob_matcher: doublestar` if you want standard doublestar behavior

## 6. `root` changes the command directory, but files still do not match

Cause:

- `root` does not change how `glob` is evaluated
- globs are still matched from the Git repo root

Fix:

- write globs relative to repo root, not relative to `root`

Bad:

```yaml
root: frontend/
glob: "src/**/*.ts"
```

Good:

```yaml
root: frontend/
glob: "frontend/src/**/*.ts"
```

## 7. Auto-fixed files are not included in the commit

Cause:

- `stage_fixed: true` is missing
- or the fixer is not running in `pre-commit`

Fix:

- use `stage_fixed: true` on `pre-commit` fixers
- avoid manual `git add` in the command unless you have a specific reason

## 8. Interactive tools fail or hang

Common cases:

- commit message generators
- tools that prompt on stdin
- CI without a TTY

Fix:

- set `interactive: true` for the specific task when needed
- avoid interactive flows in CI
- consider `no_tty` behavior and `CI=1`

## 9. Hooks recurse into themselves

Symptoms:

- a hook-triggered tool runs Git and invokes hooks again
- repeated or nested hook output

Fix:

- set `LEFTHOOK: 0` in that task's `env`

Example:

```yaml
prepare-commit-msg:
  commands:
    commitzen:
      interactive: true
      env:
        LEFTHOOK: 0
      run: pnpm cz --hook
```

## 10. A `commit-msg` or `prepare-commit-msg` check cannot see the commit message file

Cause:

- using the wrong placeholder for hook arguments

Fix:

- use `{1}` for the first hook argument
- use `{0}` when a tool needs all hook args joined into one string

Example:

```yaml
commit-msg:
  commands:
    commitlint:
      run: pnpm commitlint --edit {1}
```

## 11. Shared remote scripts are not found

Cause:

- remote configs can reference scripts, but the scripts folder must live at the remote repository root

Fix:

- keep shared scripts in the remote repo root source dir
- use `run` jobs instead of scripts if distributing executables is awkward

## 12. Merged local overrides are hard to reason about

Cause:

- named jobs merge across `extends` and local config
- unnamed jobs append in order

Fix:

- give merge-sensitive jobs stable names
- use `lefthook dump` before assuming the source file is wrong

## 13. Slow hooks frustrate developers

Fixes:

- move expensive checks from `pre-commit` to `pre-push`
- prefer `{staged_files}` or `{push_files}` over `{all_files}`
- filter with `glob`, `file_types`, and `root`
- keep long multi-step logic in scripts or grouped jobs so it stays readable
