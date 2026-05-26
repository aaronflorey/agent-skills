# Sources

## External References

- Agent Browser commands: https://agent-browser.dev/commands
- Agent Browser quickstart: https://vercel-labs-agent-browser.mintlify.app/quickstart
- Agent Browser README: https://github.com/vercel-labs/agent-browser/blob/main/README.md
- Agent Browser snapshot refs reference: https://github.com/vercel-labs/agent-browser/blob/main/skills/agent-browser/references/snapshot-refs.md
- QAwerk visual regression checklist: https://qawerk.com/blog/visual-regression-testing-checklist/
- ScrollTest Playwright visual regression guide: https://scrolltest.com/visual-regression-testing-playwright-production-guide/
- TestQuality Playwright visual regression guide: https://testquality.com/playwright-visual-regression-guide/
- Assrt automated visual regression guide: https://assrt.ai/t/automated-visual-regression
- Delta-QA visual regression guide: https://delta-qa.com/en/blog/visual-regression-testing-guide-2026/
- Linux Code visual regression article: https://thelinuxcode.com/how-to-automate-visual-regression-testing-in-2026-without-flaky-screenshots/

## Local References

- `other/AGENTS.md` sections `PTY Sessions: opencode-pty` and `Verification`

## Authoring Decisions

- The skill is a workflow-process skill because it orchestrates local server lifecycle, browser driving, and visual review.
- The local app lifecycle is centered on `pty_spawn`, `pty_read`, and `pty_kill` so the workflow matches OpenCode's PTY rules.
- `agent-browser` refs, snapshots, and annotated screenshots are the primary browser interface because they are deterministic and visual at the same time.
- The guidance emphasizes stable rendering, targeted coverage, and explicit reporting because visual checks lose value quickly when they become flaky or vague.

## Coverage Notes

- The skill covers local and remote targets.
- The skill covers responsive, theme, and state-based manual browser checks.
- The examples explicitly cover Vite and Nuxt local dev-server workflows.
- The skill deliberately stops short of CI-grade pixel diff automation and points to follow-up automation only when warranted.
