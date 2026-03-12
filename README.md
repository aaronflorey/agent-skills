# Agent Skills

A collection of skills for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) or [Codex](https://openai.com/codex/)

## Available Skills

| Skill | Description |
|-------|-------------|
| **amber-lang** | Write, debug, and explain [Amber](https://amber-lang.com) code — the modern language that compiles to Bash. Covers syntax, types, error handling, standard library, and compilation. |
| **laravel-actions** | Write, scaffold, explain, and refactor code using the [lorisleiva/laravel-actions](https://github.com/lorisleiva/laravel-actions) package. Covers using actions as objects, controllers, jobs, listeners, commands, with validation, authorization, and testing. |
| **mise** | Configure and use [mise](https://mise.jdx.dev/) for dev tool management, environment variables, and task running. Covers mise.toml configuration, tool backends (npm, pipx, cargo, etc.), tasks, hooks, and CLI commands. |
| **num30-config** | Write, debug, and explain Go configuration code using [github.com/num30/config](https://github.com/num30/config). Covers config structs, reading from files/env vars/CLI flags, validation, and watching for changes. |
| **pelican-panel-plugins** | Write, scaffold, explain, and debug plugins for the [Pelican](https://pelican.dev/) gaming panel. Covers FilamentPHP resources/pages/widgets, permissions, settings, routes, models, and plugin publishing. |

## Installation

Install a skill using the `skills` CLI:

```sh
bunx skills add aaronflorey/agent-skills --skill amber-lang
bunx skills add aaronflorey/agent-skills --skill laravel-actions
bunx skills add aaronflorey/agent-skills --skill mise
bunx skills add aaronflorey/agent-skills --skill num30-config
bunx skills add aaronflorey/agent-skills --skill pelican-panel-plugins
```

## License

MIT
