# Charmbracelet API Surface

Use this file to choose the right library quickly before writing code.

## Import Paths

Use current v2 vanity imports:

```go
import tea "charm.land/bubbletea/v2"
import "charm.land/bubbles/v2/list"
import "charm.land/huh/v2"
import "charm.land/lipgloss/v2"
import "charm.land/wish/v2"
import "charm.land/glamour/v2"
import "charm.land/log/v2"
```

## Library Chooser

| Library | Use it for | Core APIs |
|---|---|---|
| Bubble Tea | app runtime, state machine, events, rendering | `tea.NewProgram`, `Init`, `Update`, `View`, `tea.Cmd`, `tea.Batch`, `tea.Sequence`, `tea.Tick` |
| Bubbles | reusable widgets | `list.New`, `table.New`, `textinput.New`, `textarea.New`, `viewport.New`, `help.New` |
| Huh | forms and prompts | `huh.NewForm`, `huh.NewGroup`, `NewInput`, `NewSelect`, `Run`, embedded `*huh.Form` |
| Lip Gloss | styling and layout | `lipgloss.NewStyle`, `Render`, `JoinHorizontal`, `JoinVertical`, `Place`, `LightDark` |
| Wish | SSH apps | `wish.NewServer`, `wish.WithMiddleware`, `bubbletea.Middleware`, `bubbletea.MakeOptions` |
| Glamour | markdown rendering | `glamour.Render`, `glamour.NewTermRenderer`, `WithWordWrap`, `WithStandardStyle` |
| Log | terminal logging | `log.NewWithOptions`, `logger.With`, `SetLevel`, `TextFormatter`, `JSONFormatter` |

## Bubble Tea Messages Worth Knowing

- `tea.KeyPressMsg` for keyboard input
- `tea.WindowSizeMsg` for responsive layout
- `tea.BackgroundColorMsg` for light/dark theme selection
- `tea.ColorProfileMsg` when exact color profile matters
- `tea.MouseClickMsg`, `tea.MouseWheelMsg`, `tea.MouseMotionMsg` for mouse support
- `tea.PasteMsg` for paste events
- custom domain `tea.Msg` types for background work results

## Bubble Tea View Fields Worth Knowing

- `AltScreen`
- `MouseMode`
- `ReportFocus`
- `WindowTitle`
- `Cursor`
- `ForegroundColor` / `BackgroundColor`
- `KeyboardEnhancements`

Use these in `View()` instead of old v1-style imperative commands.

## High-Value Bubbles

| Problem | Bubble |
|---|---|
| text entry | `textinput`, `textarea` |
| menu or searchable picker | `list` |
| scrollable long content | `viewport` |
| tables | `table` |
| key help | `help`, `key` |
| progress or loading state | `progress`, `spinner` |
| paging | `paginator` |
| file chooser | `filepicker` |

## Huh Field Types

- `Input`
- `Text`
- `Select[T]`
- `MultiSelect[T]`
- `Confirm`
- `FilePicker`
- `Note`

Use standalone `Run()` for simple CLIs. Embed `*huh.Form` in Bubble Tea for richer apps.

## Lip Gloss Building Blocks

- style: `Foreground`, `Background`, `Padding`, `Margin`, `Border`, `Width`, `Height`, `Align`
- layout: `JoinHorizontal`, `JoinVertical`, `Place`, `PlaceHorizontal`, `PlaceVertical`
- measurement: `Width`, `Height`, `Size`
- adaptive colors: `HasDarkBackground`, `LightDark`, `Complete`
- output helpers: `Print*`, `Sprint*`, `Fprint*`

## Wish Building Blocks

- server: `wish.NewServer`, `wish.WithAddress`, `wish.WithHostKeyPath`
- middleware: `wish.WithMiddleware`, `activeterm.Middleware`, `logging.Middleware`, `recover.Middleware`
- Bubble Tea over SSH: `bubbletea.Middleware`, `bubbletea.MiddlewareWithProgramHandler`, `bubbletea.MakeOptions`
- subprocesses in session: `wish.Command`, `wish.CommandContext`

## Glamour Renderer Options

- `WithStandardStyle`
- `WithStylePath`
- `WithStylesFromJSONFile`
- `WithWordWrap`
- `WithTableWrap`
- `WithInlineTableLinks`
- `WithPreservedNewLines`
- `WithBaseURL`

## Log APIs

- global logger: `log.Info`, `log.Warn`, `log.Error`
- custom logger: `log.New`, `log.NewWithOptions`
- formatters: `TextFormatter`, `JSONFormatter`, `LogfmtFormatter`
- context: `With`, `WithContext`, `FromContext`
- interoperability: `StandardLog`, `slog.New(handler)`

## Version and Migration Guidance

- Prefer v2 docs and upgrade guides when examples disagree.
- Upgrade Bubble Tea, Bubbles, Lip Gloss, Huh, Wish, Glamour, and Log together when migrating an older project.
- Treat internet snippets using `github.com/charmbracelet/...` imports as potentially stale.
