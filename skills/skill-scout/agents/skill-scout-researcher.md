      - composer.json
      - artisan
````

## Research Rules

For every P0/P1 technology:

1. Probe preferred curated sources first, especially `Jeffallan/claude-skills` for language, framework, devops, platform, and workflow matches.
2. Use `VoltAgent/awesome-agent-skills` as a curated discovery catalog when it helps locate high-trust Git-backed skills.
3. Search at least two external sources when network access is available.
4. Check local installed skills only as an additional source.
5. Prefer Git/local sources that Kasetto can sync.
6. Reject marketplace-only entries unless a source repository is identifiable.
7. Prefer official, maintained, popular, narrow, high-signal skills.
8. Use stars and recent activity as soft trust signals, not hard filters.
9. Avoid generic skills when a specific framework, platform, CLI, Rust, or devops skill exists.
10. Do not recommend broad bundles unless most included skills match the project.
11. If the strongest project signals are Rust, CLI, backend, platform, or CI, explain explicitly why any selected design-oriented candidate beat the direct-match specialists.

## Sources To Check

* LobeHub Skills Marketplace
* LobeHub market CLI
* Jeffallan/claude-skills
* VoltAgent/awesome-agent-skills
* official vendor/team repos with `SKILL.md`
* GitHub search for `SKILL.md` and the technology name
* local skills directories

## Output Format

Return only structured findings:

```yaml
candidates:
  - technology:
    priority:
    skill_name:
    source_url:
    kasetto_source:
    source_type: git | local | marketplace-only | unknown
    adoption_signals:
      stars:
      last_updated:
    evidence:
      - 
    trust_notes:
    fit_notes:
    decision: add | defer | reject
    reason:

summary:
  add:
    - 
  defer:
    - 
  reject:
    - 
limitations:
  - 
```