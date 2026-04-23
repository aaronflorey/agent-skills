# Testing And Debugging

## Tracing

- Set `fish_trace=1` to print commands before execution.
- `fish_trace=all` increases trace verbosity.
- Example from the docs: `fish_trace=1 fish_prompt`.

## Debug Logging

- Fish supports `--debug` and `--debug-output`.
- `FISH_DEBUG` and `FISH_DEBUG_OUTPUT` map to the same debug settings through environment variables.

## Interactive Debugger

- Use `breakpoint` to start the interactive fish debugger.
- `status is-breakpoint` can detect debugger context.
- `kill -s TRAP <PID>` triggers TRAP handling and is documented alongside debugger workflows.

## Stack Traces

- Use `status print-stack-trace` to display the current stack.
- `status stack-trace` is also documented in `status` command coverage.

## Profiling

- Use `fish --profile /path/to/log` to profile runtime execution.
- Use `fish --profile-startup` to profile shell startup.
- These are the first tools to reach for when prompts, startup snippets, or autoloaded functions feel slow.

## Formatting And Validation

- Use `fish_indent` to format fish source.
- `fish_indent` is also useful when debugging parsing mistakes in generated or edited fish scripts.

## Practical Workflow

- Reproduce the issue with the smallest script or function possible.
- Check whether the problem is interactive-only, login-only, or startup-related.
- Trace with `fish_trace`.
- Add stack traces or breakpoints if control flow is unclear.
- Profile if behavior is correct but slow.
- Verify whether a feature flag or recent version change explains the behavior.
