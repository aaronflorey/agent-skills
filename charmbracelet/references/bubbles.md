# Bubbles

Bubbles is the component toolkit for Bubble Tea. Use it for stateful widgets instead of hand-rolling common controls.

## Most Useful Components

| Need | Bubble |
|---|---|
| single-line input | `textinput` |
| multiline input | `textarea` |
| menu/searchable items | `list` |
| table UI | `table` |
| scrollable content | `viewport` |
| spinner/progress | `spinner`, `progress` |
| keyboard help | `help`, `key` |
| pagination | `paginator` |
| file selection | `filepicker` |

## Integration Pattern

- store the bubble model on your parent model
- forward `tea.Msg` to the bubble in `Update()`
- store the returned bubble back on the parent model
- render with the bubble's `View()` inside a Lip Gloss layout

## Key Practices

- prefer `key.Binding` and `help.Model` for discoverable controls
- wrap long text or markdown in `viewport`
- use `textinput` or `textarea` only for focused input regions
- use `list` when you want fuzzy filtering and batteries included
- use `table` when columns matter more than freeform list rows

## v2 Migration Notes

- many `Width` and `Height` fields became getter/setter methods
- some `DefaultKeyMap` globals became functions returning fresh values
- several default style helpers now need `isDark bool`
- `viewport.New` now prefers options or later setters

## Light and Dark Styling

For components with default styles, pass `isDark` explicitly after receiving a background-color signal from Bubble Tea.

## Recommended Pairings

- `list` + `help` + `key` for pickers
- `viewport` + Glamour for docs panes
- `textarea` + `viewport` for chat or REPL layouts
- `table` + Lip Gloss panels for dashboards

## Avoid

- rebuilding generic list, table, text input, or help UIs unless the UX truly differs
- mutating stale v1 APIs copied from old blog posts or snippets
