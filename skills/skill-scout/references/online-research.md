# Online Skill Research

Do online research before selecting skills for every P0/P1 technology. The goal
is to find the best available skill sources for the project, not merely to reuse
whatever is already installed locally.

## Required Sequence

For each verified P0/P1 technology:

1. Probe preferred curated sources first.
2. Search a marketplace or curated catalog.
3. Search GitHub or the web for Git-backed `SKILL.md` sources.
4. Check existing local skills only after at least one online search attempt.
5. Read candidate `SKILL.md` content when feasible before adding it.
6. Add only candidates with Git or local sources that Kasetto can sync.

Start with SkillsHub resolve for fast intent-to-skill discovery:

```bash
bash references/resolve-skillshub.sh "<technology> <project goal>"
```

Then cross-check top candidates via GitHub or vendor sources before adding to
`kasetto.yaml`.

Probe these curated sources early when they match the technology:

- `https://github.com/Jeffallan/claude-skills` for language, framework, devops, platform, and workflow skills such as Rust, CLI, GitHub Actions, testing, and framework specialists.
- `https://github.com/VoltAgent/awesome-agent-skills` as a curated discovery catalog to locate official or well-maintained Git-backed skills.

Use at least two external sources when network/search tools are available. If
only one source is available, report that limitation in the final response.

Use stars and recent activity as soft confidence signals when comparing curated
or community repositories. Do not reject a direct-match repo only because it has
fewer stars than a weaker generic alternative.

## Useful Queries

Use concrete technology names from verified project evidence:

```text
<technology> agent skill
<technology> opencode skill
<technology> SKILL.md
site:github.com <technology> SKILL.md agent skill
github.com/spf13/cobra SKILL.md
cloudflare workers agent skill SKILL.md
github actions SKILL.md
rust clap SKILL.md
```

Marketplace example:

```bash
npx -y @lobehub/market-cli skills search --q "<technology>" --sort installCount --order desc --output json
```

SkillsHub resolve example:

```bash
curl -G "https://skillshub.wtf/api/v1/skills/resolve" \
  --data-urlencode "task=build cloudflare workers with wrangler and tests" \
  --data-urlencode "limit=10" \
  --data-urlencode "threshold=0.3"
```

GitHub CLI examples when `gh` is available:

```bash
gh search code 'SKILL.md <technology>' --limit 20
gh search repos 'agent skills <technology>' --limit 20
gh api repos/Jeffallan/claude-skills/contents/skills?ref=main
```

## Source Priority

Prefer sources in this order:

1. Official project, vendor, or framework team skill repository when it directly matches the verified technology.
2. Trusted curated skill packs with clear provenance, readable `SKILL.md`, strong adoption, and a direct technology match.
3. Popular community repositories with recent maintenance and direct technology match.
4. Existing local installed skills, when they are relevant and source provenance is clear.
5. Marketplace-only entries, only as deferred candidates unless a Git/local source is found.

When comparing a direct-match curated skill against a generic broad skill, prefer
the direct-match candidate for language, framework, devops, platform, or workflow
needs unless the project evidence is primarily design-focused.

## Failure Handling

If web search, marketplace search, and GitHub search are unavailable, do not
silently produce a local-only recommendation. Ask the user whether to continue
using only installed/local skills.

Final response wording:

```markdown
Online research: unavailable because <reason>. I only found local candidates and
need approval before writing a local-only kasetto.yaml.
```

If online research succeeds, report searched sources:

```markdown
Online research: searched SkillsHub resolve, LobeHub, GitHub code search, and existing local skills.
```