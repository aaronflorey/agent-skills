# Wish

Use Wish when the app should run over SSH.

## Role in the Stack

- Wish handles SSH transport, auth, session lifecycle, and PTY plumbing.
- Bubble Tea handles the interactive app runtime.
- Lip Gloss, Bubbles, Huh, Glamour, and Log work on top of that.

## Core APIs

- `wish.NewServer(...)`
- `wish.WithAddress(...)`
- `wish.WithHostKeyPath(...)`
- `wish.WithMiddleware(...)`
- `bubbletea.Middleware(handler)`
- `bubbletea.MiddlewareWithProgramHandler(handler)`
- `bubbletea.MakeOptions(sess)`
- `wish.Command(sess, name, args...)`

## Good Middleware Set

Typical public-facing SSH TUI stack:

- rate limiting
- logging
- panic recovery
- auth and access control
- active terminal check
- Bubble Tea app middleware

Remember: middleware executes in reverse declaration order.

## Best Fits

- remote dashboards
- SSH-native admin consoles
- collaborative or multi-session apps
- remote pickers and wizards
- Git-over-SSH or command-oriented SSH tools

## Bubble Tea Over SSH

- use `bubbletea.Middleware(...)` for the default one-session-one-program shape
- use `MiddlewareWithProgramHandler(...)` when you need access to the program handle for broadcasts or registries
- use `MakeOptions(sess)` when you create the program yourself

## Environment and Styling

- use `tea.EnvMsg` or `ssh.Session.Environ()` for client environment data
- use `tea.BackgroundColorMsg` for client theme selection
- do not read `os.Getenv()` when you need client terminal data

## Logging Rule

- server logs go to stderr, files, or logging middleware
- never mix server logs into the TUI output stream

## Watch Outs

- PTY-heavy workflows are better on Unix-like systems
- Bubble Tea v2 patterns still apply inside Wish: `tea.View`, `tea.KeyPressMsg`, declarative view fields
- stale online examples may still show old imports or old Bubble Tea patterns
