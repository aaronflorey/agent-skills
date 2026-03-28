# Huh

Use Huh for terminal forms, prompts, and wizards.

## Choose the Right Mode

- Use standalone `Run()` for simple interactive CLIs.
- Embed `*huh.Form` inside Bubble Tea when the form is one screen of a larger TUI.

## Core APIs

- `huh.NewForm(...)`
- `huh.NewGroup(...)`
- `huh.NewInput()`
- `huh.NewText()`
- `huh.NewSelect[T]()`
- `huh.NewMultiSelect[T]()`
- `huh.NewConfirm()`
- `huh.NewFilePicker()`
- `form.Run()`
- `form.WithAccessible(true)`
- `form.WithTheme(huh.ThemeCharm(isDark))`

## Best Fits

- onboarding flows
- configuration setup
- credential and option collection
- multi-step wizards
- embedded settings panels in a larger TUI

## Strong Patterns

- split large forms into groups/pages
- store results in ordinary Go variables or form keys
- use validation functions on important inputs
- use `TitleFunc` and `OptionsFunc` for dynamic forms
- embed the form when you need surrounding navigation or panels

## Bubble Tea Embedding Pattern

- hold `form *huh.Form` on your model
- return `m.form.Init()` from `Init()` when the form is active first
- in `Update()`, call `form.Update(msg)` and store the returned form back
- inspect `form.State` for completion

## Accessibility and Themes

- accessibility is controlled at the form level in v2
- built-in themes now take `isDark bool`
- prefer exposing accessibility as a user option or env/config flag

## Watch Outs

- `form.Run()` is blocking and is not the right choice inside a larger Bubble Tea loop
- older code may call field-level `WithAccessible()`; remove that
- upgrade Bubble Tea, Bubbles, Lip Gloss, and Huh together
