# Vite Example

Use this pattern for Vite apps that expose a local dev server.

## Typical Startup

If the project uses npm scripts:

```text
pty_spawn:
  command: npm
  args: ["run", "dev"]
  workdir: <app-root>
  title: Vite Dev Server
  notifyOnExit: true
```

If the repo uses `mise`, prefer:

```text
pty_spawn:
  command: mise
  args: ["run", "dev"]
  workdir: <app-root>
  title: Vite Dev Server
  notifyOnExit: true
```

## Ready Signal

Use `pty_read` to wait for output like:

- `Local:   http://127.0.0.1:5173/`
- `Local:   http://localhost:5173/`

Use the emitted URL, not a guessed port.

## Browser Flow

```bash
agent-browser open http://127.0.0.1:5173
agent-browser wait --load networkidle
agent-browser snapshot -i
agent-browser screenshot --annotate shots/vite-home.png
```

## Good Vite Checks

- landing page layout at desktop and mobile
- hot-reload result after the targeted code change
- modal, drawer, or dropdown positioning
- dark mode if the app supports it
- overflow or clipping issues in flex and grid layouts

## Common Vite Notes

- Vite apps often settle quickly, but lazy-loaded routes still need explicit waits.
- If the app uses mock data or local API proxies, confirm the page is fully hydrated before screenshotting.
- When a route is client-rendered, wait for user-visible text instead of relying only on network-idle.
