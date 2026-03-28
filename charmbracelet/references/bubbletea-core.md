# Bubble Tea Core

Bubble Tea is the default foundation for a Charmbracelet TUI.

## Core Model

Implement three methods:

```go
type model struct{}

func (m model) Init() tea.Cmd
func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd)
func (m model) View() tea.View
```

Run it with:

```go
p := tea.NewProgram(initialModel())
finalModel, err := p.Run()
```

## Core Types

- `tea.Msg`: incoming event or result
- `tea.Cmd`: deferred work that returns a message later
- `tea.Model`: runtime interface for your app state
- `tea.View`: rendered content plus terminal behavior

## Commands

Use commands for all I/O or background work.

- `tea.Batch(cmdA, cmdB)` for concurrent work
- `tea.Sequence(cmdA, cmdB)` for ordered work
- `tea.Tick(d, fn)` for one-shot timers
- `tea.Every(d, fn)` for recurring timer patterns when reissued from `Update`
- `tea.Quit` to exit

## Message Handling

Start with a type switch:

```go
switch msg := msg.(type) {
case tea.KeyPressMsg:
case tea.WindowSizeMsg:
case tea.BackgroundColorMsg:
case myResultMsg:
}
```

Common keys:

- `"q"`, `"ctrl+c"` to quit
- `"up"`, `"down"`, `"left"`, `"right"`
- `"enter"`
- `"space"`

## Declarative View

In v2, terminal behavior belongs in `View()`.

```go
func (m model) View() tea.View {
    v := tea.NewView("content")
    v.AltScreen = true
    v.MouseMode = tea.MouseModeCellMotion
    v.WindowTitle = "my app"
    return v
}
```

Do not reach for old imperative commands unless you are handling a compatibility case.

## Program Options That Still Matter

- `tea.WithContext`
- `tea.WithInput`
- `tea.WithOutput`
- `tea.WithEnvironment`
- `tea.WithFilter`
- `tea.WithFPS`
- `tea.WithWindowSize`
- `tea.WithColorProfile`

Use these for wiring or tests, not for alt-screen or mouse toggles that now belong in `View()`.

## Responsive Styling Pattern

Use this pattern when color theme depends on the terminal background:

```go
func (m model) Init() tea.Cmd {
    return tea.RequestBackgroundColor
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    switch msg := msg.(type) {
    case tea.BackgroundColorMsg:
        m.styles = newStyles(msg.IsDark())
    }
    return m, nil
}
```

Also handle `tea.WindowSizeMsg` to update widths, heights, and wrapped content.

## Good Defaults

- keep one root model
- define custom messages for domain results
- cast the returned model from `Run()` if the caller needs a result
- request background color and window size early when layout depends on them

## Read Next

- Read `references/bubbletea-patterns.md` for production structure.
- Read `references/bubbles.md` before building your own widgets.
- Read `references/troubleshooting-workarounds.md` when porting v1 code.
