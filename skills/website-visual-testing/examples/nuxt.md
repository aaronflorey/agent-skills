# Nuxt Example

Use this pattern for Nuxt apps running with the local dev server.

## Typical Startup

If the project uses npm scripts:

```text
pty_spawn:
  command: npm
  args: ["run", "dev"]
  workdir: <app-root>
  title: Nuxt Dev Server
  notifyOnExit: true
```

If the repo uses `mise`, prefer:

```text
pty_spawn:
  command: mise
  args: ["run", "dev"]
  workdir: <app-root>
  title: Nuxt Dev Server
  notifyOnExit: true
```

## Ready Signal

Use `pty_read` to wait for output like:

- `Local:    http://localhost:3000/`
- `Nuxt Nitro server ready`
- route compile success without fatal errors

If Nuxt chooses a different port, use that exact URL.

## Browser Flow

```bash
agent-browser open http://127.0.0.1:3000
agent-browser wait --load networkidle
agent-browser eval 'await document.fonts.ready'
agent-browser snapshot -i
agent-browser screenshot --annotate shots/nuxt-home.png
```

## Good Nuxt Checks

- SSR-rendered page looks correct before and after hydration
- route navigation and layout transitions
- loading, error, and empty states on async pages
- mobile navigation and sticky header behavior
- dark mode and typography consistency across routes

## Common Nuxt Notes

- Nuxt pages may render server HTML first and then hydrate. If the bug appears only after hydration, capture both pre-interaction and post-hydration states.
- Async data and route-level loaders can make early screenshots misleading; wait for stable content.
- Font readiness matters more on content-heavy Nuxt pages because typography shifts can look like layout regressions.
