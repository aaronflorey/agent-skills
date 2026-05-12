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

## 6. Safety Checks

- Read `SKILL.md` before adding a new source when feasible.
- Avoid skills that ask agents to exfiltrate secrets, disable safety checks, run
  remote shell scripts without review, or hide actions from users.
- Prefer pinned `ref` values for mission-critical team configs; otherwise use the
  default branch for simple project-local configs.
- Keep comments in `kasetto.yaml` brief and useful.