# Lip Gloss

Use Lip Gloss for styling and layout. It is the visual layer for most Bubble Tea apps.

## Core APIs

- `lipgloss.NewStyle()`
- `Foreground`, `Background`, `Bold`, `Padding`, `Margin`, `Border`, `Width`, `Height`, `Align`
- `Render`, `SetString`, `Inherit`
- `JoinHorizontal`, `JoinVertical`
- `Place`, `PlaceHorizontal`, `PlaceVertical`
- `Width`, `Height`, `Size`
- `HasDarkBackground`, `LightDark`, `Complete`
- `Print*`, `Sprint*`, `Fprint*`

## Best Practices

- create a centralized `styles` struct
- rebuild styles when the terminal background changes
- use Lip Gloss for composition and spacing, not app state
- wrap Bubbles or Huh view strings in Lip Gloss containers
- use `Width` and `Height` utilities to lay out panes intentionally

## Adaptive Color Pattern

In Bubble Tea:

- request `tea.RequestBackgroundColor`
- build styles from `msg.IsDark()`

In standalone CLIs:

- call `lipgloss.HasDarkBackground(os.Stdin, os.Stdout)`

## Standalone Output Rule

If Bubble Tea is not handling output, print rendered strings with Lip Gloss helpers so colors are downsampled correctly.

Use:

- `lipgloss.Println(...)`
- `lipgloss.Fprintln(os.Stderr, ...)`
- `lipgloss.Sprint(...)`

Avoid:

- `fmt.Println(style.Render(...))` when terminal capability detection matters

## Useful Subpackages

- `table` for static rendered tables
- `list` for rendered lists
- `tree` for rendered trees

Use these when you need styled output, not interactive stateful widgets.

## Watch Outs

- v2 removed the renderer model
- older adaptive-color snippets may rely on `compat`; prefer explicit light/dark logic for new code
- standalone output and Bubble Tea output handle color adaptation differently
