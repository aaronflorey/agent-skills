---
description: Inspect the current project, select relevant skills from this repository, and add them to kasetto.yaml.
---

Inspect the current codebase before making any changes.

Requirements:
- Identify the languages, frameworks, tools, and workflows that are clearly present from repo evidence.
- Select only the skills from `https://github.com/aaronflorey/agent-skills` that are relevant to that evidence.
- Create or update `kasetto.yaml` in the current project root.
- Set `scope: project`.
- Set `destination: .agents/skills`.
- Keep existing unrelated Kasetto configuration intact.
- If a `skills` source block already exists for `https://github.com/aaronflorey/agent-skills`, merge into that block instead of creating a duplicate.
- Add selected skills using object form with both `name` and `path: skills`.
- Do not add duplicate skill entries.

Process:
1. Inspect the current repository and list the concrete evidence that supports each selected skill.
2. Choose the smallest useful set of skills from this repository.
3. Update `kasetto.yaml` to include those skills from `https://github.com/aaronflorey/agent-skills`.
4. Show the exact skills that were added and why.

Output expectations:
- Briefly summarize the detected stack.
- List the chosen skills with one short justification each.
- Confirm whether `kasetto.yaml` was created or updated.
