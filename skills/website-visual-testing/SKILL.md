---
name: website-visual-testing
description: Test websites visually in a browser using `opencode-pty` plus `agent-browser`. Use this skill when asked to inspect a local dev server in the browser, reproduce a UI bug visually, verify responsive layout, check light or dark mode, compare mobile and desktop states, or run manual browser QA with screenshots.
version: 1.0.0
source: local
license: MIT
---

# Website Visual Testing

Use this skill to run a website, open it in `agent-browser`, and verify the UI visually.

## Start Here

- Use `pty_spawn` for any local app, preview server, Storybook, or long-running test target.
- Never start a server with shell backgrounding like `&`, `nohup`, or job control.
- Wait for an actual readiness signal with `pty_read` before opening the site in the browser.
- Use `agent-browser snapshot -i` before interactions and re-snapshot after navigation or major DOM changes.
- Prefer annotated screenshots when layout, unlabeled controls, or visual state matters.
- Treat visual testing as a UI check, not a replacement for functional or accessibility testing.

## Read By Need

| Need | Read |
|---|---|
| Start, monitor, and stop the local site safely | `references/pty-workflow.md` |
| Drive the browser with stable `agent-browser` commands | `references/agent-browser-workflow.md` |
| Run a thorough visual review and avoid flaky checks | `references/visual-qa-checklist.md` |
| Start a common local frontend app quickly | `examples/vite.md`, `examples/nuxt.md` |

## Workflow

### 1. Confirm the target

Determine:

1. whether the user wants a local site, a remote URL, or both
2. which command starts the site if it is local
3. which surfaces matter most: route, component, breakpoint, theme, or bug repro path

If the site is already hosted, skip the PTY startup flow and go straight to browser testing.

### 2. Start the site with `opencode-pty`

For local targets:

1. Inspect project scripts or docs to find the narrowest correct start command.
2. Start the server with `pty_spawn` using:
   - a clear `title`
   - the correct `workdir`
   - `notifyOnExit: true` when useful
3. Use `pty_read` to watch for:
   - localhost URLs
   - ready messages
   - compile errors
4. If the port is unclear, read the PTY output instead of guessing.

If startup fails, fix the blocker first. Do not continue to browser testing against a broken or half-started app.

### 3. Open the page in `agent-browser`

Use stable, explicit navigation:

```bash
agent-browser open http://127.0.0.1:3000
agent-browser wait --load networkidle
agent-browser snapshot -i
```

Prefer `127.0.0.1` or the exact host emitted by the dev server when available.

Before capturing screenshots on asset-heavy pages, ensure the UI is settled:

- wait for app-specific loading indicators to disappear
- wait for text that proves the page rendered
- when needed, use `agent-browser eval` to wait for `document.fonts.ready`

### 4. Inspect visually before interacting

Use both structural and visual views:

1. `agent-browser snapshot -i` to identify actionable refs
2. `agent-browser screenshot --annotate` when you need to inspect layout, spacing, icons, overlays, or unlabeled controls
3. `agent-browser get title` and `agent-browser get url` to confirm you are on the expected page

Annotated screenshots are especially useful for:

- responsive breakpoints
- modal, dropdown, and tooltip positioning
- icon-only controls
- canvas-like or visually rich areas that the accessibility tree underspecifies

### 5. Exercise the target states

Move through the smallest path that proves the visual behavior.

Common patterns:

- after every navigation or state-changing click, run `agent-browser snapshot -i` again
- for forms, fill by ref and capture the empty, focused, invalid, and submitted states when relevant
- for menus or modals, capture both closed and open states
- for bug repros, capture before-action and after-action screenshots

### 6. Cover key visual dimensions

At minimum, check the views that match the request. Common dimensions:

- desktop viewport
- mobile viewport or named device emulation
- light and dark mode
- happy path plus the visually risky state tied to the bug or feature

Typical commands:

```bash
agent-browser set viewport 1440 900
agent-browser screenshot shots/home-desktop.png

agent-browser set device "iPhone 14"
agent-browser screenshot shots/home-mobile.png

agent-browser set media dark
agent-browser screenshot shots/home-dark.png
```

### 7. Report findings clearly

When you finish, report:

- the PTY session used and whether the site started cleanly
- the URLs, viewports, and themes you checked
- concrete findings with route and state context
- screenshots captured, if relevant to the task
- anything not verified and why

## Rules

- Prefer targeted route or component checks over wandering manual exploration.
- Prefer deterministic states over whatever the live app happens to show.
- Re-snapshot after page changes because `@e` refs can become stale.
- Do not rely on fixed sleeps when a readiness signal or DOM condition is available.
- If visual noise comes from timestamps, ads, rotating banners, or live counters, call that out explicitly and avoid overclaiming.
- Stop the PTY session with `pty_kill` when it is no longer needed.

## Boundaries

- This skill is for visual browser testing and manual UI verification.
- It does not replace functional tests, accessibility checks, or cross-browser certification unless the user explicitly asks for those.
- If the task requires pixel-diff baselines or CI-grade regression suites, recommend adding dedicated visual regression automation after the manual browser pass.
