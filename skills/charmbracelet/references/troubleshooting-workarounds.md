# Troubleshooting and Workarounds

## Contents

- Import paths and v2 imports
- Bubble Tea view, key, and terminal API changes
- Async and logging issues
- Lip Gloss styling and color adaptation issues
- Bubbles and Huh migration issues
- Glamour wrapping behavior
- Wish middleware, environment, and PTY issues
- Stale examples and source-of-truth guidance

Use this file when code does not compile, examples disagree, or the terminal behaves unexpectedly.

## 1. Import Paths Are Wrong

Problem:
- code uses `github.com/charmbracelet/...`

Fix:
- switch to `charm.land/.../v2`
- upgrade the related Charm packages together

## 2. Bubble Tea `View()` Returns `string`

Problem:
- stale examples still show `View() string`

Fix:
- return `tea.View`
- use `tea.NewView(...)`

## 3. Key Handling Uses `tea.KeyMsg`

Problem:
- old snippets match `tea.KeyMsg` directly for normal keypresses

Fix:
- use `tea.KeyPressMsg`
- match `"space"`, not `" "`

## 4. Terminal Features Set in `NewProgram(...)`

Problem:
- old code uses `tea.WithAltScreen()` and old mouse commands everywhere

Fix:
- set `AltScreen`, `MouseMode`, and related fields on `tea.View`

## 5. UI Freezes During API or File Work

Problem:
- expensive work runs directly in `Update()`

Fix:
- move it into `tea.Cmd`
- return a custom result message

## 6. Logs Corrupt the Screen

Problem:
- code writes debug info to stdout while Bubble Tea owns the terminal

Fix:
- log to `stderr`, a file, or `tea.LogToFile`
- use `charm.land/log/v2` for structured logging

## 7. Lip Gloss Colors Look Wrong Outside Bubble Tea

Problem:
- code uses `fmt.Println(style.Render(...))`

Fix:
- use `lipgloss.Println`, `Fprintln`, or `Sprint`
- Bubble Tea already handles downsampling, standalone apps do not

## 8. Light/Dark Styles Do Not Adapt Correctly

Problem:
- code expects old automatic adaptive color behavior

Fix:
- in Bubble Tea, request `tea.BackgroundColorMsg`
- in standalone tools, use `lipgloss.HasDarkBackground(os.Stdin, os.Stdout)`
- prefer explicit `LightDark(...)`

## 9. Bubbles Width and Height Fields No Longer Exist

Problem:
- code sets `model.Width = 40` on v2 components

Fix:
- use `SetWidth`, `SetHeight`, `Width()`, `Height()`
- read the Bubbles upgrade guide when porting older code

## 10. Huh Theme or Accessibility Calls Fail

Problem:
- old code uses field-level `WithAccessible()` or theme helpers without a dark-mode argument

Fix:
- control accessibility at the form level
- pass `isDark bool` to built-in theme helpers

## 11. Glamour Output Wraps Poorly

Problem:
- renderer uses default width while the pane is narrower or wider

Fix:
- create the renderer with `WithWordWrap(width)`
- rebuild or cache by width when the terminal resizes

## 12. Wish Middleware Runs in the Wrong Order

Problem:
- auth, logging, PTY checks, and app handler execute in an unexpected sequence

Fix:
- Wish middleware executes in reverse declaration order
- declare middleware with that rule in mind

## 13. Wish App Reads Server Environment Instead of Client Environment

Problem:
- code uses `os.Getenv()` inside an SSH app

Fix:
- use `ssh.Session.Environ()` or `tea.EnvMsg`
- never assume the server environment describes the client terminal

## 14. Wish Bubble Tea Program Behaves Strangely When Built Manually

Problem:
- custom `*tea.Program` misses SSH session plumbing

Fix:
- use `bubbletea.MakeOptions(sess)` or `bubbletea.Middleware(...)`

## 15. Wish PTY Features Fail on Windows

Problem:
- PTY-heavy exec flows behave inconsistently on Windows

Fix:
- prefer Unix-like environments for PTY-intensive Wish apps
- keep Windows support conservative when exec or terminal emulation is central

## 16. Log Import Path Is Stale in Examples

Problem:
- some Log docs or internet snippets still show `github.com/charmbracelet/log`

Fix:
- use `charm.land/log/v2`
- cross-check against `UPGRADE_GUIDE_V2.md`

## 17. Examples Conflict With Upgrade Guides

Problem:
- an example on `main` still uses older patterns

Fix:
- trust the upgrade guide and current package docs over any stale example
- use examples for architecture ideas, not as the only source of truth
