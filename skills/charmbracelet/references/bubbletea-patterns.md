# Bubble Tea Patterns

Use these patterns for production-grade Go CLIs.

## Root Model + Child Models

- let the root model own navigation and app state
- store child models for widgets or screens
- forward messages to child models and keep the updated child value

Typical children:

- `list.Model`
- `table.Model`
- `textinput.Model`
- `textarea.Model`
- `viewport.Model`
- `*huh.Form`

## Domain Messages

Define explicit message types for async results:

```go
type loadFinishedMsg struct {
    items []Item
    err   error
}
```

This keeps `Update()` readable and keeps business logic out of rendering.

## Async Work

- API call -> `tea.Cmd` -> custom result message
- subprocess -> `tea.Exec(...)` or session-aware helpers in Wish
- repeating timer -> reissue `tea.Tick` or `tea.Every` from `Update()`

Never perform blocking work directly in `Update()`.

## Layout Composition

- compute available width and height from `tea.WindowSizeMsg`
- reserve header/footer/sidebar sizes first
- use Lip Gloss helpers to join and place blocks
- re-render markdown or wrapped text when width changes

## Cobra + Bubble Tea

- use Cobra for CLI parsing and subcommands
- start Bubble Tea in interactive subcommands only
- keep app services below the command layer
- return normal errors for non-interactive commands and Bubble Tea messages for interactive ones

## Hybrid TUI / Non-TUI Apps

- detect whether the command should be interactive
- keep plain-text output paths for pipes and scripts
- use Bubble Tea only when user intent or environment calls for it

## Result Passing

Prefer returning the final model from `Run()` over ad-hoc goroutines and channels.

Typical pattern:

```go
final, err := tea.NewProgram(m).Run()
if fm, ok := final.(model); ok {
    return fm.result, err
}
```

## Logging and Debugging

- write debug logs to a file with `tea.LogToFile` or to `stderr`
- never interleave stdout logging with an active TUI
- use Log for app diagnostics and structured logs

## Advanced Integration Patterns

- use `p.Send(msg)` to inject external events into a running program
- use `WithoutRenderer()` for daemon-style or hidden-mode operation
- use `WithWindowSize` and `WithColorProfile` in tests

## Good Example Shapes

- composable views: multiple panes or screens
- result-returning app: picker or wizard that exits with a selection
- realtime updates: background goroutine sends messages
- editor or subprocess handoff: `tea.Exec` plus lifecycle messages

## Use Huh Instead of Hand-Rolling When

- the task is mostly a form
- you need validation, pages, or accessible prompts fast
- form UX matters more than custom per-keystroke behavior
