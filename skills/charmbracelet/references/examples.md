# Curated Upstream Examples

Use this shortlist first instead of browsing entire repositories.

## Bubble Tea

- `bubbletea/tutorials/basics/main.go` - minimal model, update loop, view
- `bubbletea/tutorials/commands/main.go` - async command pattern
- `bubbletea/examples/composable-views/main.go` - multi-pane layout
- `bubbletea/examples/send-msg/main.go` - inject external messages
- `bubbletea/examples/sequence/main.go` - ordered commands
- `bubbletea/examples/realtime/main.go` - channel-driven updates
- `bubbletea/examples/window-size/main.go` - responsive resizing
- `bubbletea/examples/mouse/main.go` - mouse integration
- `bubbletea/examples/result/main.go` - return data after exit

## Bubbles

- `bubbletea/examples/list-default/main.go` - list-driven UI
- `bubbletea/examples/list-fancy/main.go` - full-featured list
- `bubbletea/examples/table/main.go` - tables
- `bubbletea/examples/textinput/main.go` - single input
- `bubbletea/examples/textinputs/main.go` - many inputs
- `bubbletea/examples/textarea/main.go` - multiline editing
- `bubbletea/examples/pager/main.go` - viewport pattern
- `bubbletea/examples/help/main.go` - key help

## Huh

- `huh/examples/burger/main.go` - standalone form
- `huh/examples/bubbletea/main.go` - embedded form in Bubble Tea
- `huh/examples/bubbletea-options/main.go` - Bubble Tea view hook integration

## Lip Gloss

- `lipgloss/examples/layout/main.go` - layout composition
- `lipgloss/examples/color/bubbletea/main.go` - background-aware styling in Bubble Tea
- `lipgloss/examples/table/ansi/main.go` - static tables
- `lipgloss/examples/tree/styles/main.go` - styled trees
- `lipgloss/examples/canvas/main.go` - compositor/layers

## Wish

- `wish/examples/simple/main.go` - minimal SSH server
- `wish/examples/bubbletea/main.go` - Bubble Tea over SSH
- `wish/examples/bubbleteaprogram/main.go` - manual program handling
- `wish/examples/multichat/main.go` - multi-session broadcast pattern
- `wish/examples/exec/main.go` - external command in SSH session
- `wish/examples/cobra/main.go` - Cobra integration

## Glamour

- `glamour/examples/helloworld/main.go` - minimal rendering
- `glamour/examples/custom_renderer/main.go` - explicit renderer configuration
- `glamour/examples/stdin-stdout-custom-styles/main.go` - style file pipeline

## Log

- `log/examples/new/new.go` - custom logger creation
- `log/examples/options/options.go` - options and formatting
- `log/examples/styles/styles.go` - style customization
- `log/examples/slog/main.go` - slog integration

## How To Use This File

- Start from the closest example shape.
- Update imports to `charm.land/.../v2` if an example or external snippet is stale.
- Cross-check against the relevant upgrade guide before copying older patterns.
