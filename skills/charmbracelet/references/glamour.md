# Glamour

Use Glamour to render markdown to ANSI text for terminal output.

## Core APIs

- `glamour.Render(input, styleName)`
- `glamour.RenderWithEnvironmentConfig(input)`
- `glamour.NewTermRenderer(...)`
- `WithStandardStyle(...)`
- `WithStylePath(...)`
- `WithStylesFromJSONFile(...)`
- `WithWordWrap(...)`
- `WithTableWrap(...)`
- `WithInlineTableLinks(true)`
- `WithPreservedNewLines()`
- `WithBaseURL(...)`

## Best Fits

- help panes
- README viewers
- release notes
- changelogs
- markdown preview panes
- document-centric CLIs

## Recommended Pattern

- create a renderer with width-aware options
- render markdown to ANSI
- place the result inside a `viewport` when content is long
- frame the output with Lip Gloss layout styles

## Styling Model

- built-in styles can be selected by name
- custom styles come from JSON files
- the style schema controls block and inline markdown elements such as headings, code blocks, tables, lists, links, and task items

## Width Rule

If the pane width changes, rebuild or recache the renderer when wrapping behavior matters.

## Downsampling Rule

Glamour is intentionally pure. It does not adapt to terminal capability on its own.

- inside Bubble Tea, terminal handling is already managed
- outside Bubble Tea, print Glamour output through Lip Gloss helpers

## Watch Outs

- default wrap width is not always what your pane needs
- relative links or image references may need `WithBaseURL(...)`
- table link behavior may need `WithInlineTableLinks(true)` depending on the UX you want
