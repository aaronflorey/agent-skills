# PTY Workflow

Use `opencode-pty` for any website process that keeps running while you test.

## When To Use PTY

- local dev servers
- preview servers
- Storybook or component explorers
- watch-mode builds that serve a site
- any interactive process that emits a localhost URL or readiness log

Do not use shell backgrounding such as `&`, `nohup`, or detached jobs.

## Standard Flow

1. Find the narrowest correct start command.
2. Spawn it with `pty_spawn`.
3. Read output with `pty_read` until you see a ready signal.
4. Use the emitted URL or port for browser testing.
5. Keep the PTY alive while testing.
6. Stop it with `pty_kill` when finished.

## Good `pty_spawn` Shape

- `title`: short and specific, such as `Next Dev Server` or `Storybook`
- `workdir`: exact app root
- `notifyOnExit`: `true` for long-running startup processes when exit matters
- `timeoutSeconds`: omit for servers meant to keep running unless the user asked for a limit

## Readiness Checks

Prefer real readiness evidence over assumptions:

- `ready`
- `listening on`
- `localhost:`
- `127.0.0.1:`
- framework-specific route or compile success logs

Use `pty_read` again if the server recompiles or errors after a browser action.

## Failure Handling

If the process exits:

1. read the PTY output
2. identify the first real error
3. fix the startup problem or report the blocker

Do not proceed with browser testing against a page that never became ready.

## Practical Notes

- Prefer the exact local URL printed by the app.
- If the app binds a random port, use the emitted port rather than guessing.
- Mention the PTY session title or ID in your final report when it matters.
- Clean up old PTY sessions when they are no longer needed.
