# Visual QA Checklist

Use this checklist to keep visual browser testing focused and trustworthy.

## Prioritize The Right Surfaces

Start with the highest-value pages or states:

- login and onboarding
- dashboard or primary workflow entry points
- checkout, settings, and account flows
- shared components involved in the change
- the exact route and state named in the bug report

## Stabilize Before Capturing

- wait for the route to finish loading
- wait for web fonts when typography matters
- wait for images or lazy content when they affect layout
- avoid mid-animation captures
- prefer stable fixtures or seeded data when available

If the page contains noisy dynamic content, note it in the results and avoid overclaiming.

## What To Look For

- layout shifts and broken spacing
- clipped or overlapping content
- missing text, icons, or images
- wrong theme tokens in dark or light mode
- sticky header, modal, popover, and tooltip positioning
- overflow, wrapping, and truncation problems
- button, input, and error-state presentation
- empty, loading, error, and success states when relevant

## Coverage Defaults

Unless the task is narrower, the best default manual pass is:

1. one desktop viewport
2. one mobile device or mobile viewport
3. both light and dark mode when the app supports themes
4. the main happy path plus the visually risky edge state

## Reduce Flake And False Positives

- prefer targeted route or element screenshots over giant full-page captures
- use the same viewport sizes each run
- avoid live clocks, random avatars, ads, or rotating content when possible
- disable or wait out motion before capture
- report uncertainty instead of guessing when the app is still changing under you

## Manual Review Notes

Visual testing is not just screenshot collection. Summarize what the screenshots show:

- where the issue appears
- which state triggered it
- whether it reproduces across viewport or theme changes
- whether the problem looks visual-only or might reflect a deeper functional issue

## Escalation Guidance

Recommend dedicated visual regression automation when:

- the same UI keeps regressing
- the change touches shared design tokens or layout primitives
- the app has many responsive breakpoints or themes
- reviewers need baseline-vs-current evidence in CI
