# GoReleaser Template Variables and Functions

GoReleaser uses Go templates throughout configuration for dynamic values.

## Core Variables

### Version Information

| Variable | Description | Example |
|----------|-------------|---------|
| `{{ .Version }}` | SemVer version without v prefix | `1.2.3` |
| `{{ .Tag }}` | Full git tag | `v1.2.3` |
| `{{ .RawVersion }}` | Version as-is from tag | `1.2.3` |
| `{{ .Major }}` | Major version | `1` |
| `{{ .Minor }}` | Minor version | `2` |
| `{{ .Patch }}` | Patch version | `3` |
| `{{ .Prerelease }}` | Prerelease suffix | `beta.1` |
| `{{ .Metadata }}` | Build metadata | `20240101` |
| `{{ .PreviousTag }}` | Previous git tag | `v1.2.2` |
| `{{ .IsSnapshot }}` | True if snapshot build | `true`/`false` |

### Git Information

| Variable | Description | Example |
|----------|-------------|---------|
| `{{ .Commit }}` | Full commit SHA | `abc123def456...` |
| `{{ .ShortCommit }}` | Short commit SHA (7 chars) | `abc123d` |
| `{{ .FullCommit }}` | Alias for .Commit | `abc123def456...` |
| `{{ .Branch }}` | Current branch | `main` |
| `{{ .CommitDate }}` | Commit date (RFC3339) | `2024-01-01T12:00:00Z` |
| `{{ .CommitTimestamp }}` | Commit unix timestamp | `1704110400` |
| `{{ .GitURL }}` | Repository URL | `https://github.com/...` |
| `{{ .GitTreeState }}` | clean or dirty | `clean` |

### Date/Time

| Variable | Description | Example |
|----------|-------------|---------|
| `{{ .Date }}` | Build date (RFC3339) | `2024-01-01T12:00:00Z` |
| `{{ .Timestamp }}` | Unix timestamp | `1704110400` |
| `{{ .Now }}` | Current time object | (time.Time) |

### Project Information

| Variable | Description | Example |
|----------|-------------|---------|
| `{{ .ProjectName }}` | Project name | `myapp` |
| `{{ .ModulePath }}` | Go module path | `github.com/org/repo` |
| `{{ .Summary }}` | Git describe summary | `v1.2.3-10-gabc123d` |
| `{{ .Runtime.Goos }}` | Build machine OS | `linux` |
| `{{ .Runtime.Goarch }}` | Build machine arch | `amd64` |

### Build Target Variables

Used in builds, archives, etc:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{ .Os }}` | Target GOOS | `linux` |
| `{{ .Arch }}` | Target GOARCH | `amd64` |
| `{{ .Arm }}` | ARM version (if applicable) | `7` |
| `{{ .Mips }}` | MIPS variant (if applicable) | `hardfloat` |
| `{{ .Amd64 }}` | AMD64 version | `v3` |
| `{{ .Target }}` | Combined target | `linux_amd64_v1` |
| `{{ .Binary }}` | Binary name | `myapp` |
| `{{ .Ext }}` | Binary extension | `.exe` or empty |
| `{{ .Path }}` | Full binary path (hooks) | `/path/to/binary` |
| `{{ .Name }}` | Archive/artifact name | `myapp_1.0.0_linux_amd64` |

### Environment Variables

| Variable | Description |
|----------|-------------|
| `{{ .Env.VARIABLE }}` | Access any env variable |
| `{{ .Env.HOME }}` | Home directory |
| `{{ .Env.GITHUB_TOKEN }}` | GitHub token |
| `{{ .Env.GOPATH }}` | Go path |

## Template Functions

### String Functions

```yaml
# Lowercase
name: "{{ .ProjectName | tolower }}"          # myapp

# Uppercase  
name: "{{ .ProjectName | toupper }}"          # MYAPP

# Title case
name: "{{ .ProjectName | title }}"            # Myapp

# Trim whitespace
name: "{{ .Version | trimspace }}"

# Trim prefix/suffix
name: "{{ .Tag | trimprefix \"v\" }}"         # 1.2.3

# Replace
name: "{{ .Os | replace \"darwin\" \"macos\" }}"

# Contains
{{ if contains .Tag "beta" }}...{{ end }}

# HasPrefix/HasSuffix
{{ if hasPrefix .Tag "v" }}...{{ end }}
{{ if hasSuffix .Branch "main" }}...{{ end }}
```

### Conditionals

```yaml
# If/else
name: >-
  {{ if eq .Os "darwin" }}macos{{ else }}{{ .Os }}{{ end }}

# With (handles empty values)
name: >-
  {{ .ProjectName }}_{{ .Os }}_{{ .Arch }}{{ with .Arm }}v{{ . }}{{ end }}

# Not
{{ if not .IsSnapshot }}...{{ end }}

# And/Or
{{ if and (eq .Os "linux") (eq .Arch "amd64") }}...{{ end }}
{{ if or .Prerelease .IsSnapshot }}...{{ end }}
```

### Comparison Functions

```yaml
# Equality
{{ if eq .Os "linux" }}...{{ end }}
{{ if ne .Arch "386" }}...{{ end }}

# Numeric comparison
{{ if gt .Major 1 }}...{{ end }}
{{ if lt .Minor 5 }}...{{ end }}
{{ if ge .Patch 0 }}...{{ end }}
{{ if le .Major 2 }}...{{ end }}
```

### Date Functions

```yaml
# Format date
date: "{{ .Date | time.Format \"2006-01-02\" }}"

# Current time
date: "{{ now | date \"2006-01-02\" }}"
```

### File Functions

```yaml
# Read file content
header: "{{ readFile \"./HEADER.md\" }}"

# Check if file exists
{{ if fileExists ".goreleaser.yaml" }}...{{ end }}
```

### Environment Functions

```yaml
# Get env with default
value: "{{ envOrDefault \"MY_VAR\" \"default\" }}"

# Check if env is set
{{ if .Env.MY_VAR }}...{{ end }}
```

### List Functions

```yaml
# First/Last
{{ first .Tags }}
{{ last .Tags }}

# Index
{{ index .Tags 0 }}
```

### Math Functions

```yaml
# Addition
{{ add .Major 1 }}

# Subtraction
{{ sub .Minor 1 }}

# Multiplication
{{ mul .Patch 2 }}

# Division
{{ div .Major 2 }}
```

## Common Patterns

### Version String with Build Info

```yaml
ldflags:
  - -X main.version={{ .Version }}
  - -X main.commit={{ .ShortCommit }}
  - -X main.date={{ .Date }}
  - -X main.builtBy=goreleaser
```

### Platform-Specific Naming

```yaml
name_template: >-
  {{ .ProjectName }}_
  {{- .Version }}_
  {{- if eq .Os "darwin" }}macos
  {{- else }}{{ .Os }}{{ end }}_
  {{- .Arch }}
  {{- with .Arm }}v{{ . }}{{ end }}
```

### Conditional Docker Tags

```yaml
images:
  - "ghcr.io/org/app:{{ .Tag }}"
  - "ghcr.io/org/app:{{ if .IsSnapshot }}snapshot{{ else }}latest{{ end }}"
```

### Multi-line Templates

```yaml
# Using > for folded (joined with spaces)
name_template: >-
  {{ .ProjectName }}_
  {{ .Version }}_
  {{ .Os }}_
  {{ .Arch }}

# Using | for literal (preserves newlines)
description: |
  Line 1
  Line 2
  Line 3
```

### Skip Based on Conditions

```yaml
# Skip if snapshot
skip: "{{ .IsSnapshot }}"

# Skip if prerelease
skip: "{{ .Prerelease }}"

# Skip based on env
skip: "{{ .Env.SKIP_DOCKER }}"

# Complex condition
skip: "{{ and .IsSnapshot (not .Env.FORCE_PUBLISH) }}"
```

### Default Values

```yaml
# Using or
value: "{{ or .Env.MY_VAR \"default\" }}"

# Using with
value: "{{ with .Env.MY_VAR }}{{ . }}{{ else }}default{{ end }}"

# Using envOrDefault
value: "{{ envOrDefault \"MY_VAR\" \"default\" }}"
```

## Template Debugging

Test templates with `goreleaser check`:

```bash
# Validate configuration
goreleaser check

# Check with verbose output
goreleaser check --verbose
```

## Complete Example

```yaml
# .goreleaser.yaml
version: 2
project_name: myapp

builds:
  - binary: "{{ .ProjectName }}"
    ldflags:
      - -s -w
      - -X main.version={{ .Version }}
      - -X main.commit={{ .ShortCommit }}
      - -X main.date={{ .Date }}
      - -X main.builtBy=goreleaser

archives:
  - name_template: >-
      {{ .ProjectName }}_
      {{- .Version }}_
      {{- if eq .Os "darwin" }}macos
      {{- else }}{{ .Os }}{{ end }}_
      {{- .Arch }}
      {{- with .Arm }}v{{ . }}{{ end }}
      {{- with .Mips }}_{{ . }}{{ end }}

dockers_v2:
  - images:
      - "ghcr.io/{{ .Env.GITHUB_REPOSITORY_OWNER }}/{{ .ProjectName }}:{{ .Tag }}"
      - "ghcr.io/{{ .Env.GITHUB_REPOSITORY_OWNER }}/{{ .ProjectName }}:v{{ .Major }}"
      - "ghcr.io/{{ .Env.GITHUB_REPOSITORY_OWNER }}/{{ .ProjectName }}:{{ if .IsSnapshot }}snapshot{{ else }}latest{{ end }}"
    build_args:
      - VERSION={{ .Version }}
      - COMMIT={{ .FullCommit }}

changelog:
  footer: |
    **Full Changelog**: https://github.com/{{ .Env.GITHUB_REPOSITORY }}/compare/{{ .PreviousTag }}...{{ .Tag }}
```
