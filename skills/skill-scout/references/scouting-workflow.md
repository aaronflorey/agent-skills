# Scouting Workflow

Use this workflow in the current target project. Do not analyze the skill library
that supplied this skill unless it is also the user's active project.

## 1. Confirm Project Root

- Prefer the current git worktree root.
- If there are nested apps, inspect the active package or app the user named.
- If multiple apps are equally plausible, scan each app and label findings by
  path.

## 2. Inspect High-Signal Files

Run `brief --json` first when the command is installed. Use its languages,
tools, dependencies, and config file evidence to seed the search. Then verify
the smallest useful set of project files before ranking a technology P0/P1:

| Ecosystem | High-signal files |
|---|---|
| JavaScript/TypeScript | `package.json`, `nuxt.config.*`, `next.config.*`, `vite.config.*`, `astro.config.*`, `svelte.config.*`, `tailwind.config.*`, `components.json` |
| PHP | `composer.json`, `artisan`, `bootstrap/app.php`, `config/*.php` |
| Go | `go.mod`, `cmd/**`, `main.go` |
| Rust | `Cargo.toml`, `src/main.rs`, `tauri.conf.json` |
| Python | `pyproject.toml`, `requirements*.txt`, `manage.py`, `app/main.py` |
| Swift/Apple | `Package.swift`, `*.xcodeproj`, `*.xcworkspace`, `*.swift`, `Info.plist` |
| Cloud/platform | `wrangler.toml`, `wrangler.jsonc`, `vercel.json`, `netlify.toml`, `firebase.json`, `sst.config.*`, Terraform/Pulumi files |
| Design/UI | `figma`, `storybook`, `.stories.*`, Tailwind/shadcn/Radix config, `src/components`, `app/components` |

Use lockfiles only to verify versions or confirm direct dependencies. Avoid
promoting a transitive package unless source code imports it directly.

## 3. Detect High-Value Technologies

Create a ranked list with this evidence model:

| Priority | Evidence |
|---|---|
| P0 | Primary app framework, runtime platform, or UI framework used by most code |
| P1 | Direct major dependency that shapes architecture or developer workflow |
| P2 | Tooling/package useful for a narrow task but not central to the project |
| Reject | Transitive, unused, stale, or incidental package |

Examples:

- `github.com/spf13/cobra` in `go.mod` plus `cmd/root.go` imports: P0/P1 CLI skill.
- `github.com/spf13/viper` in `go.mod` plus config bootstrap code: P1 config skill.
- `github.com/charmbracelet/bubbletea` imports: P0/P1 Charmbracelet skill.
- `laravel/framework` in `composer.json` plus `artisan`: P0 Laravel skills.
- `nuxt` in `package.json` plus `nuxt.config.ts`: P0 Nuxt skill.
- `vue`, `@vitejs/plugin-vue`, and `.vue` files: P0/P1 Vue skill.
- `wrangler.toml` or Cloudflare bindings: P0 Cloudflare/Workers skills.
- SwiftUI imports or Xcode project files: P0 Apple UI/mobile skill.

## 4. Decide When Taste Skill Is Relevant

Add Taste Skill as a candidate when the project has a meaningful design-bearing surface:

- Web frontend, landing page, dashboard, or product UI.
- Mobile app UI in SwiftUI, Flutter, React Native, or Jetpack Compose.
- Component library, design system, Storybook, or Figma-adjacent workflow.
- Redesign, visual polish, UX, layout, animation, or frontend implementation work.

Prefer `design-taste-frontend` from `Leonxlnx/taste-skill` for new frontend
implementation when visual design is a core concern. Prefer `redesign-existing-projects`
from the same repo when the explicit task is to improve an existing UI.

Do not add a design-only skill solely because a repo has a frontend if stronger
verified language, framework, devops, or platform signals dominate the work.

Do not add Taste Skill for pure backend libraries, CLIs, infrastructure-only
repos, data pipelines, or SDKs with no user-facing interface unless the user asks
for design work.

## 5. Research Candidate Skills

For each P0/P1 technology, search online before choosing skills. Use
`references/online-research.md` for the required search sequence.

Search at least two external sources when network/search tools are available:

- Preferred curated pack probe, especially `Jeffallan/claude-skills` for language, framework, devops, platform, and workflow matches.
- Preferred curated catalog probe via `VoltAgent/awesome-agent-skills`.
- Marketplace query by package name and ecosystem name.
- Official vendor/team skill repository.
- Curated `awesome-agent-skills` style catalog.
- GitHub search for `SKILL.md` and the technology name.
- Existing local available skills.

Installed local skills count as candidate evidence, not external research. Do
not choose only from local skills unless online search is unavailable and the
user approves a local-only result.

Score each candidate from 0 to 5 using direct fit first, then trust and adoption:

| Score | Meaning |
|---|---|
| 5 | Official or highly trusted curated source, directly matches detected tech, Kasetto-compatible, active |
| 4 | Strong community or curated source, popular, direct match, readable `SKILL.md` |
| 3 | Useful but generic or only partially matched |
| 2 | Unclear maintenance, weak match, or missing evidence |
| 1 | Opaque marketplace-only result, no source, or unsupported install path |
| 0 | Unsafe, irrelevant, paid without approval, or no `SKILL.md` |

Only add candidates scoring 4 or 5 by default. Ask before adding score-3
tradeoffs or any paid/private/opaque source.

Use repository stars and recent activity as soft tiebreakers. A higher-star
generic skill should not outrank a slightly smaller but direct-match Rust, CLI,
framework, devops, or platform specialist.

If the provisional result adds only a generic design-oriented skill while P0/P1
evidence includes Rust, CLI, backend, platform, or CI signals, rerank the
candidates and record why no direct-match specialist was added.

Example expected outcome:

- Verified signals: Rust application in `Cargo.toml`, CLI parsing via `clap`, CI via `.github/workflows/*.yml`
- Preferred additions:
  - `rust-engineer` from `Jeffallan/claude-skills`
  - `cli-developer` from `Jeffallan/claude-skills`
  - `devops-engineer` from `Jeffallan/claude-skills` when GitHub Actions or deployment automation is a meaningful P1 signal
- Generic skills such as `frontend-design` should not win this comparison unless the repo also has stronger frontend or visual design evidence than its Rust/CLI/CI surface.

## 6. Safety Checks

- Read `SKILL.md` before adding a new source when feasible.
- Avoid skills that ask agents to exfiltrate secrets, disable safety checks, run
  remote shell scripts without review, or hide actions from users.
- Prefer pinned `ref` values for mission-critical team configs; otherwise use the
  default branch for simple project-local configs.
- Keep comments in `kasetto.yaml` brief and useful.
