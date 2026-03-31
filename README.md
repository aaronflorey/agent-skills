# Agent Skills

A collection of skills for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) or [Codex](https://openai.com/codex/)

## Available Skills

| Skill | Description |
|-------|-------------|
| **amber-lang** | Write, debug, and explain [Amber](https://amber-lang.com) code — the modern language that compiles to Bash. Covers syntax, types, error handling, standard library, and compilation. |
| **charmbracelet** | Build polished Go terminal user interfaces and interactive CLI tools with the [Charmbracelet](https://github.com/charmbracelet) ecosystem, with emphasis on Bubble Tea plus Bubbles, Huh, Lip Gloss, Wish, Glamour, and Log. |
| **cli** | Route terminal work to optimized CLI tools instead of generic shell patterns. Covers search, rewrite, fetch, paging, structured data, diffing, linting, and repository metrics with tools like `rg`, `fd`, `jq`, `yq`, `shellcheck`, and more. |
| **depsdotdev** | Use the [deps.dev API](https://docs.deps.dev/api/) to fetch package/version metadata, requirements, resolved dependency graphs, advisories, project mappings, and hash lookup data with correct encoding and endpoint selection. |
| **github-cli** | Use the [GitHub CLI](https://cli.github.com/) to authenticate, manage repos, issues, PRs, releases, Actions, projects, and call the GitHub API from the terminal. |
| **goreleaser** | Configure and use [GoReleaser](https://goreleaser.com/) for release automation, including standalone setup and unified release-please + GoReleaser workflows. |
| **laravel-actions** | Write, scaffold, explain, and refactor code using the [lorisleiva/laravel-actions](https://github.com/lorisleiva/laravel-actions) package. Covers using actions as objects, controllers, jobs, listeners, commands, with validation, authorization, and testing. |
| **mise** | Configure and use [mise](https://mise.jdx.dev/) for dev tool management, environment variables, and task running. Covers mise.toml configuration, tool backends (npm, pipx, cargo, etc.), tasks, hooks, and CLI commands. |
| **num30-config** | Write, debug, and explain Go configuration code using [github.com/num30/config](https://github.com/num30/config). Covers config structs, reading from files/env vars/CLI flags, validation, and watching for changes. |
| **pelican-panel-plugins** | Write, scaffold, explain, and debug plugins for the [Pelican](https://pelican.dev/) gaming panel. Covers FilamentPHP resources/pages/widgets, permissions, settings, routes, models, and plugin publishing. |
| **release-please** | Set up [release-please](https://github.com/googleapis/release-please) and automate release PRs, including unified release-please + GoReleaser workflows. |

Note: `goreleaser` and `release-please` both support `/setup-release-please-goreleaser` to configure a unified workflow that avoids requiring a custom PAT just to trigger GoReleaser.

## Installation

Install a skill using the `skills` CLI:

```sh
bunx skills add aaronflorey/agent-skills --skill amber-lang
bunx skills add aaronflorey/agent-skills --skill charmbracelet
bunx skills add aaronflorey/agent-skills --skill cli
bunx skills add aaronflorey/agent-skills --skill depsdotdev
bunx skills add aaronflorey/agent-skills --skill github-cli
bunx skills add aaronflorey/agent-skills --skill goreleaser
bunx skills add aaronflorey/agent-skills --skill laravel-actions
bunx skills add aaronflorey/agent-skills --skill mise
bunx skills add aaronflorey/agent-skills --skill num30-config
bunx skills add aaronflorey/agent-skills --skill pelican-panel-plugins
bunx skills add aaronflorey/agent-skills --skill release-please
```

## License

MIT
