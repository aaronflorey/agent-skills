# GoReleaser Changelog Configuration

GoReleaser can automatically generate changelogs from git history.

## Basic Configuration

```yaml
changelog:
  # Sorting: asc, desc, or empty (default: by commit date)
  sort: asc
  
  # Use conventional commits
  use: github                    # git, github, gitlab, github-native
  
  # Filters
  filters:
    exclude:
      - "^docs:"
      - "^test:"
      - "^ci:"
      - "^chore:"
      - "Merge pull request"
      - "Merge branch"
    include:
      - "^feat:"
      - "^fix:"
      - "^perf:"
```

## Changelog Sources

### Git (Default)

Uses `git log` to generate changelog:

```yaml
changelog:
  use: git
  sort: asc
```

### GitHub API

Fetches commits via GitHub API (includes PR info):

```yaml
changelog:
  use: github
```

### GitLab API

Fetches commits via GitLab API:

```yaml
changelog:
  use: gitlab
```

### GitHub Native

Uses GitHub's native release notes generation:

```yaml
changelog:
  use: github-native
  # No additional configuration needed
```

## Grouping Commits

### By Conventional Commit Type

```yaml
changelog:
  sort: asc
  use: github
  
  groups:
    - title: Features
      regexp: '^.*?feat(\([[:word:]]+\))??!?:.+$'
      order: 0
    - title: Bug Fixes
      regexp: '^.*?fix(\([[:word:]]+\))??!?:.+$'
      order: 1
    - title: Performance
      regexp: '^.*?perf(\([[:word:]]+\))??!?:.+$'
      order: 2
    - title: Documentation
      regexp: '^.*?docs(\([[:word:]]+\))??!?:.+$'
      order: 3
    - title: Other
      order: 999
  
  filters:
    exclude:
      - "^chore:"
      - "^ci:"
      - "^test:"
```

### Custom Groups

```yaml
changelog:
  groups:
    - title: "Breaking Changes"
      regexp: '^.*?!:.+$'        # Commits with ! (breaking change)
      order: 0
    - title: "New Features"
      regexp: '^.*?feat(\(.+\))?:.+$'
      order: 1
    - title: "Bug Fixes"
      regexp: '^.*?fix(\(.+\))?:.+$'
      order: 2
    - title: "Dependencies"
      regexp: '^.*?deps?(\(.+\))?:.+$'
      order: 3
    - title: "Other Changes"
      order: 999
```

## Filters

### Exclude Patterns

```yaml
changelog:
  filters:
    exclude:
      # Commit types
      - "^docs:"
      - "^test:"
      - "^ci:"
      - "^chore:"
      - "^style:"
      
      # Merge commits
      - "Merge pull request"
      - "Merge branch"
      - "^Merge"
      
      # Bot commits
      - "^\\[bot\\]"
      - "dependabot"
      
      # WIP commits
      - "^WIP:"
      - "^wip:"
```

### Include Patterns

Only include matching commits:

```yaml
changelog:
  filters:
    include:
      - "^feat:"
      - "^fix:"
      - "^perf:"
      - "^refactor:"
```

## Abbreviations

Shorten long commit hashes:

```yaml
changelog:
  abbrev: 7                      # Abbreviate commit hashes to 7 chars
```

## Custom Header/Footer

### Templates

```yaml
changelog:
  header: |
    ## Changelog
    
    All notable changes in this release.
    
  footer: |
    
    ---
    
    **Full Changelog**: https://github.com/{{ .Env.GITHUB_REPOSITORY }}/compare/{{ .PreviousTag }}...{{ .Tag }}
    
    Thank you to all contributors!
```

### External File

```yaml
changelog:
  header: '{{ readFile "./CHANGELOG_HEADER.md" }}'
  footer: '{{ readFile "./CHANGELOG_FOOTER.md" }}'
```

## Skip Changelog

```yaml
changelog:
  skip: true                     # Don't generate changelog
  
  # Or conditionally
  skip: "{{ .Env.SKIP_CHANGELOG }}"
```

## Complete Example

```yaml
changelog:
  sort: asc
  use: github
  abbrev: 7
  
  groups:
    - title: "Breaking Changes"
      regexp: '^.*?!:.+$'
      order: 0
    - title: "Features"
      regexp: '^.*?feat(\([[:word:]]+\))??!?:.+$'
      order: 1
    - title: "Bug Fixes"
      regexp: '^.*?fix(\([[:word:]]+\))??!?:.+$'
      order: 2
    - title: "Performance"
      regexp: '^.*?perf(\([[:word:]]+\))??!?:.+$'
      order: 3
    - title: "Refactoring"
      regexp: '^.*?refactor(\([[:word:]]+\))??!?:.+$'
      order: 4
    - title: "Documentation"
      regexp: '^.*?docs(\([[:word:]]+\))??!?:.+$'
      order: 5
    - title: "Build & CI"
      regexp: '^.*?(build|ci)(\([[:word:]]+\))??!?:.+$'
      order: 6
    - title: "Other Changes"
      order: 999
  
  filters:
    exclude:
      - "^chore:"
      - "^test:"
      - "^style:"
      - "Merge pull request"
      - "Merge branch"
      - "^\\[bot\\]"
  
  header: |
    ## What's Changed
    
  footer: |
    
    **Full Changelog**: https://github.com/{{ .Env.GITHUB_REPOSITORY }}/compare/{{ .PreviousTag }}...{{ .Tag }}
```

## GitHub Native Release Notes

When using `github-native`, GitHub generates the changelog automatically based on your repository's settings:

```yaml
changelog:
  use: github-native
```

Configure in your repo's `.github/release.yml`:

```yaml
# .github/release.yml
changelog:
  exclude:
    labels:
      - ignore-for-release
    authors:
      - dependabot
  categories:
    - title: Breaking Changes
      labels:
        - breaking-change
    - title: New Features
      labels:
        - enhancement
        - feature
    - title: Bug Fixes
      labels:
        - bug
        - fix
    - title: Documentation
      labels:
        - documentation
    - title: Other Changes
      labels:
        - "*"
```

## AI-Enhanced Changelog (Pro)

GoReleaser Pro offers AI-enhanced changelog generation:

```yaml
changelog:
  use: github
  ai:
    enabled: true
    model: gpt-4
    # AI will summarize and improve commit messages
```

## Template Variables

Available in header/footer templates:

| Variable | Description |
|----------|-------------|
| `{{ .Tag }}` | Current git tag |
| `{{ .PreviousTag }}` | Previous git tag |
| `{{ .Version }}` | Version without v prefix |
| `{{ .Date }}` | Release date |
| `{{ .ProjectName }}` | Project name |
| `{{ .Env.VAR }}` | Environment variable |
