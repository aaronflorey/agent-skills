# Common Use Cases

Use these patterns as the default implementation map.

## 1. Build a Full-Screen TUI

- Use Bubble Tea as the app shell.
- Start with a root model that owns screen state and routing.
- Use `tea.NewProgram(model)` and return a `tea.View` from `View()`.
- Set `v.AltScreen = true` in the view when full-screen behavior is desired.
- Read `references/bubbletea-core.md` and `references/bubbletea-patterns.md`.

## 2. Build an Interactive CLI, Not a Full App

- Use Huh for simple prompts, confirmation flows, or setup wizards.
- Use standalone `form.Run()` when the interaction starts and ends in the same flow.
- Move to Bubble Tea only if you need multiple panels, background work, or custom navigation.
- Read `references/huh.md`.

## 3. Add Lists, Tables, Text Inputs, or Scrollable Panes

- Use Bubbles instead of building widgets from scratch.
- Use `list` for searchable collections.
- Use `table` for tabular data.
- Use `textinput` and `textarea` for editing.
- Use `viewport` for long help, logs, or markdown output.
- Read `references/bubbles.md`.

## 4. Make the TUI Look Intentional

- Use Lip Gloss to centralize spacing, borders, colors, and layout joins.
- Create a `styles` struct and rebuild it when the background mode changes.
- Request background color in `Init()` with `tea.RequestBackgroundColor`.
- Compose Bubble or Huh output strings inside Lip Gloss containers.
- Read `references/lipgloss.md`.

## 5. Render Help, Docs, Changelog, or Markdown Preview

- Use Glamour to render markdown to ANSI.
- Use a viewport around Glamour output if content is longer than a screen.
- Rebuild the renderer when width changes if wrapping matters.
- Print standalone Glamour output through Lip Gloss helpers for downsampling.
- Read `references/glamour.md`.

## 6. Log Diagnostics Without Corrupting the UI

- Use `charm.land/log/v2`.
- Send logs to `stderr` or a file, not to stdout in Bubble Tea apps.
- Use text formatter for humans and JSON/logfmt for automation.
- Create sub-loggers with `With(...)` for commands or subsystems.
- Read `references/log.md`.

## 7. Build an SSH-Native TUI

- Use Wish as the transport layer and Bubble Tea as the UI runtime.
- Use `bubbletea.Middleware(handler)` for one TUI per SSH session.
- Use `bubbletea.MakeOptions(sess)` if creating the program manually.
- Add `activeterm.Middleware()` if the app requires a PTY.
- Keep server logs separate from session output.
- Read `references/wish.md`.

## 8. Build a Hybrid Cobra + TUI App

- Use Cobra for commands and flags.
- Launch Bubble Tea only for interactive subcommands.
- Keep non-interactive commands plain stdout/stderr.
- Share business logic below the command layer so both TUI and non-TUI paths can reuse it.
- Bubble Tea owns interaction; Cobra owns command-line dispatch.

## 9. Handle Async Work Cleanly

- Run API calls, file reads, or subprocesses in `tea.Cmd`.
- Return custom message types with results.
- Use `tea.Batch` for independent work.
- Use `tea.Sequence` when order matters.
- Never block in `Update()`.

## 10. Embed a Form in a Larger TUI

- Use `*huh.Form` as a child `tea.Model`.
- Store it on the parent model and forward messages to it.
- Switch screens when `form.State == huh.StateCompleted`.
- Use this when a setup or config flow is only one part of a larger app.

## 11. Build a Chat, Log Viewer, or Doc Pane

- Use `viewport` for scrolling output.
- Use `textarea` or `textinput` for bottom input bars.
- Use Lip Gloss to reserve header, body, and footer regions.
- Use Glamour inside the viewport when content is markdown.

## 12. Build a Multi-Session Remote App

- Use Wish `MiddlewareWithProgramHandler` when you need access to `*tea.Program`.
- Keep a registry of active programs if you need broadcast or shared state.
- Use `p.Send(msg)` for cross-session updates.
- Start from Wish's multichat-style architecture, then layer your own domain messages.
