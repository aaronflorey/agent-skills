# Horizon-Style News Aggregation Reference

Use this reference only when the target resembles `Thysrael/Horizon` or another AI news aggregation pipeline.

## Existing Behavior To Preserve Or Intentionally Improve

Inventory these areas carefully:

- sources: Hacker News, RSS/Atom, Reddit, Telegram public channels, Twitter/X via Apify or equivalent, GitHub user events and repo releases, financial/news watchlists, OSS Insight, or trending repos
- pipeline: fetch, normalize, deduplicate, score, filter, enrich, summarize, deliver
- AI providers: Anthropic, OpenAI-compatible APIs, Azure OpenAI-compatible endpoints, Google Gemini, local/Ollama-compatible providers, and any provider-specific behavior
- languages/localization: English, Chinese, or configured output languages
- config: `.env`, JSON config, env substitution, thresholds, provider settings, source settings, delivery settings
- outputs: generated Markdown summaries, static site files, email, webhooks, MCP tools, local files
- delivery: SMTP/IMAP subscription handling, Feishu/Lark, DingTalk, Slack, Discord, generic webhooks
- UX: setup wizard, `--hours`, config validation, dry run, source selection, verbosity

## Initial Go Package Areas To Research

Do not accept these blindly. Verify maintenance and suitability during the package-scouting phase.

| Area | Starting candidates |
|---|---|
| CLI | `github.com/spf13/cobra`, `github.com/spf13/pflag` |
| Config | `github.com/spf13/viper` where useful |
| Env files | `github.com/joho/godotenv` or Koanf dotenv parser/provider |
| HTTP | stdlib `net/http`, plus a maintained retry/backoff package only if needed |
| RSS/Atom | `github.com/mmcdole/gofeed` or direct XML parsing for simple feeds |
| HTML parsing | `github.com/PuerkitoBio/goquery`, stdlib HTML parser, or targeted parsing |
| GitHub API | `github.com/google/go-github/v...` or direct REST calls |
| Hacker News | direct Firebase HN API calls with typed structs |
| Reddit | direct public JSON API calls unless an actively maintained client is clearly better |
| Telegram public preview | direct HTTP plus HTML parsing |
| Twitter/X through Apify | direct Apify REST API client |
| LLM providers | official provider SDKs where maintained; otherwise one small OpenAI-compatible client interface |
| Markdown | `github.com/yuin/goldmark` or `github.com/gomarkdown/markdown` depending on render needs |
| Email SMTP/IMAP | stdlib SMTP where sufficient; maintained IMAP/SMTP libraries for mailbox subscription workflows |
| Webhooks | stdlib HTTP with per-platform renderers |
| MCP | current official or most-maintained Go SDK; verify before selecting |
