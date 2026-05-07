# Online Skill Research

Do online research before selecting skills for every P0/P1 technology. The goal
is to find the best available skill sources for the project, not merely to reuse
whatever is already installed locally.

## Required Sequence

For each verified P0/P1 technology:

1. Search a marketplace or curated catalog.
2. Search GitHub or the web for Git-backed `SKILL.md` sources.
3. Check existing local skills only after at least one online search attempt.
4. Read candidate `SKILL.md` content when feasible before adding it.
5. Add only candidates with Git or local sources that Kasetto can sync.

Start with SkillsHub resolve for fast intent-to-skill discovery:

```bash
bash references/resolve-skillshub.sh "<technology> <project goal>"
```

Then cross-check top candidates via GitHub or vendor sources before adding to
`kasetto.yaml`.

Use at least two external sources when network/search tools are available. If
only one source is available, report that limitation in the final response.

## Useful Queries

Use concrete technology names from verified project evidence:

```text
<technology> agent skill
<technology> opencode skill
<technology> SKILL.md
site:github.com <technology> SKILL.md agent skill
github.com/spf13/cobra SKILL.md
cloudflare workers agent skill SKILL.md
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
```

## Source Priority

Prefer sources in this order:

1. Official project, vendor, or framework team skill repository.
2. Trusted curated skill packs with clear provenance and readable `SKILL.md`.
3. Popular community repositories with recent maintenance and direct technology match.
4. Existing local installed skills, when they are relevant and source provenance is clear.
5. Marketplace-only entries, only as deferred candidates unless a Git/local source is found.

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
