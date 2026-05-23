---
name: find-domain
description: Use the Instant Domain Search MCP at https://instantdomainsearch.com/mcp to find available domains for the current project. Use this skill when the user asks for domain ideas, domain availability checks, brandable domain options, or project naming help tied to domain search.
version: 1.0.0
source: https://instantdomainsearch.com/mcp
license: Proprietary
---

# Find Domain

Use the Instant Domain Search MCP to turn the current project into a shortlist of available domain names.

## Use This Skill When

- The user wants an available domain for the current project.
- The user wants to check whether a product, startup, app, package, or site name is available as a domain.
- The user wants domain ideas, brandable alternatives, or TLD comparisons.

## Working Approach

1. Infer the base project name from the current workspace before asking the user to restate it.
2. Start with the exact project name or the clearest normalized variant.
3. Use the Instant Domain Search MCP tools, not a generic web search, for live availability checks.
4. Prefer concise, brandable results over padded or spammy variants.
5. Treat domain availability as point-in-time data and say so when presenting results.

## Required MCP Flow

When this MCP is available in the environment, use its domain tools directly:

- `search_domains` to check a project name across a focused set of TLDs.
- `check_domain_availability` to verify any finalists you plan to recommend.
- `generate_domain_variations` only after the exact or obvious project name is unavailable, or when the user asks for more creative options.

## Question Tool Rule

If the exact project name is not available, do not silently invent names first.

Use the `question` tool to ask the user to choose one of these paths:

- `I have suggestions`: the user wants to provide alternate names to try.
- `Generate names for me (Recommended)`: the agent should come up with names to try.

If the user chooses generated names, create a small set of sensible variations based on the project's purpose, then run `generate_domain_variations` and verify the strongest candidates with `check_domain_availability`.

## Practical Workflow

1. Identify the project name from the current repo, package name, app name, or README.
2. Normalize obvious variants:
   - remove spaces and punctuation
   - consider singular/plural if natural
   - consider one short descriptive modifier only when it improves clarity
3. Run `search_domains` against likely TLDs such as `.com` plus a few relevant alternatives.
4. If an exact or near-exact good result is available, verify it with `check_domain_availability` and present it.
5. If not, ask the user via `question` whether they want to provide suggestions or want the agent to generate names.
6. After that choice, evaluate a compact set of alternatives and verify finalists.

## Output Format

Return a short, decision-ready list:

- the project name you started from
- the TLDs checked
- 3-7 recommended available domains
- a brief reason for each recommendation
- any exact-match domains that were unavailable

## Notes

- Prefer `.com` when quality is comparable, but include better non-`.com` options when they are materially stronger.
- Avoid awkward hyphenation, doubled letters created by suffixes, and low-signal filler words unless the user asks for exhaustive exploration.
- If the MCP is not configured in the environment, say that plainly instead of pretending to verify availability.
