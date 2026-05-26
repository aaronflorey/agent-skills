# Agent Browser Workflow

Use `agent-browser` as the primary browser driver for visual inspection.

## Core Command Pattern

```bash
agent-browser open http://127.0.0.1:3000
agent-browser wait --load networkidle
agent-browser snapshot -i
agent-browser screenshot --annotate
```

## High-Value Commands

### Navigation and page state

- `agent-browser open <url>`
- `agent-browser back`
- `agent-browser forward`
- `agent-browser reload`
- `agent-browser get url`
- `agent-browser get title`

### Discovery and interaction

- `agent-browser snapshot -i`
- `agent-browser snapshot -i -c`
- `agent-browser click @eN`
- `agent-browser fill @eN "text"`
- `agent-browser type @eN "text"`
- `agent-browser press Enter`
- `agent-browser hover @eN`

### Visual capture

- `agent-browser screenshot`
- `agent-browser screenshot path.png`
- `agent-browser screenshot --full`
- `agent-browser screenshot --annotate`

### Device and theme checks

- `agent-browser set viewport 1440 900`
- `agent-browser set device "iPhone 14"`
- `agent-browser set media light`
- `agent-browser set media dark`

### Stability helpers

- `agent-browser wait --load networkidle`
- `agent-browser wait --text "..."`
- `agent-browser wait 1000`
- `agent-browser eval 'await document.fonts.ready'`

## Ref Discipline

Refs are fast and deterministic, but they are not durable across page changes.

Rules:

1. snapshot before interacting
2. re-snapshot after navigation
3. re-snapshot after opening menus, dialogs, tabs, or accordions
4. re-snapshot when a prior ref is missing or ambiguous

## When To Prefer Annotated Screenshots

Use `screenshot --annotate` when you need to reason about:

- spacing and alignment
- overflow and clipping
- sticky headers, overlays, or z-index bugs
- icon-only buttons
- canvases, charts, or areas with weak accessibility semantics

Annotated screenshots pair well with refs because label numbers map back to `@eN` selectors.

## Useful View Matrices

Start with the smallest matrix that matches the request:

- desktop only for a route-specific bug
- desktop plus mobile for responsive issues
- light plus dark when theme regressions are plausible
- one named mobile device rather than an arbitrary resized viewport when mobile Safari behavior matters

## Common Mistakes

- interacting with stale refs after the page changed
- using long fixed sleeps instead of waiting for stable UI conditions
- capturing screenshots before fonts or lazy images finish loading
- checking only the default desktop viewport for a responsive bug
- using full-page screenshots everywhere when a smaller targeted screenshot would be clearer
