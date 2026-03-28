# Log

Use Log for CLI diagnostics and structured logging.

## Core APIs

- `log.Info`, `log.Warn`, `log.Error`, `log.Debug`, `log.Print`
- `log.New(os.Stderr)`
- `log.NewWithOptions(os.Stderr, log.Options{...})`
- `logger.With(...)`
- `logger.SetLevel(...)`
- `logger.SetFormatter(...)`
- `logger.StandardLog(...)`
- `log.WithContext`, `log.FromContext`

## Recommended Defaults

- log to `stderr` in interactive CLIs
- use text formatter for local human-facing runs
- use JSON or logfmt for CI, automation, or machine parsing
- create sub-loggers with fields like `component`, `command`, or `session`

## In Bubble Tea Apps

- do not write logs to stdout
- keep stdout owned by the TUI
- use files or stderr for debugging and diagnostics

## Good Options to Consider

- `Level`
- `ReportTimestamp`
- `ReportCaller`
- `TimeFormat`
- `Prefix`
- `Formatter`

## Style Customization

- styling only affects the text formatter
- styles use Lip Gloss v2 types
- non-TTY output disables styling in text mode

## Interoperability

- use `StandardLog(...)` for libraries that require `*log.Logger`
- use `slog.New(handler)` when the rest of the app uses `log/slog`

## Watch Outs

- some older docs still show stale import paths
- `Fatal` exits the process, so avoid it in libraries, tests, or mid-TUI control flow
- structured logging expects even key/value pairs
