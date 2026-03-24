# GoReleaser Archive Configuration

Archives package built binaries with additional files for distribution.

## Basic Configuration

```yaml
archives:
  - id: default
    
    # Archive formats
    formats:
      - tar.gz
      - zip
      - binary          # Raw binary (no archive)
    
    # Format per OS
    format_overrides:
      - goos: windows
        formats: [zip]
    
    # Archive name template
    name_template: "{{ .ProjectName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}"
    
    # Wrap in directory (contents inside folder)
    wrap_in_directory: true
    # Or custom directory name:
    # wrap_in_directory: "{{ .ProjectName }}-{{ .Version }}"
    
    # Strip binary parent directories
    strip_binary_directory: false
    
    # Files to include (globs)
    files:
      - LICENSE*
      - README*
      - CHANGELOG*
      - completions/*
      - manpages/*
    
    # Build IDs to include (default: all)
    builds:
      - cli
      - server
    
    # RLCP (remove longest common path) - Pro feature
    rlcp: true
```

## Name Templates

### Standard Naming
```yaml
archives:
  - name_template: "{{ .ProjectName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}"
    # Output: myapp_1.0.0_linux_amd64.tar.gz
```

### With ARM Version
```yaml
archives:
  - name_template: >-
      {{ .ProjectName }}_
      {{- .Version }}_
      {{- .Os }}_
      {{- .Arch }}
      {{- with .Arm }}v{{ . }}{{ end }}
      {{- with .Mips }}_{{ . }}{{ end }}
    # Output: myapp_1.0.0_linux_armv7.tar.gz
```

### Lowercase Everything
```yaml
archives:
  - name_template: "{{ .ProjectName }}_{{ .Version }}_{{ .Os | tolower }}_{{ .Arch | tolower }}"
```

### Platform-Specific Names
```yaml
archives:
  - name_template: >-
      {{ .ProjectName }}-{{ .Version }}-
      {{- if eq .Os "darwin" }}macos
      {{- else }}{{ .Os }}{{ end }}-
      {{- .Arch }}
```

## Format Options

### tar.gz (Default for Unix)
```yaml
archives:
  - formats: [tar.gz]
```

### zip (Default for Windows)
```yaml
archives:
  - formats: [zip]
    format_overrides:
      - goos: windows
        formats: [zip]
```

### Raw Binary (No Archive)
```yaml
archives:
  - formats: [binary]
    name_template: "{{ .ProjectName }}_{{ .Os }}_{{ .Arch }}{{ .Ext }}"
```

### Multiple Formats
```yaml
archives:
  - id: compressed
    formats: [tar.gz, zip]
    
  - id: binary
    formats: [binary]
    name_template: "{{ .Binary }}_{{ .Os }}_{{ .Arch }}{{ .Ext }}"
```

## Including Additional Files

### Basic Globs
```yaml
archives:
  - files:
      - LICENSE
      - README.md
      - CHANGELOG.md
```

### Wildcards
```yaml
archives:
  - files:
      - LICENSE*
      - README*
      - docs/**/*
      - scripts/*.sh
```

### Rename and Relocate
```yaml
archives:
  - files:
      # Simple include
      - LICENSE
      
      # Rename file
      - src: README.md
        dst: docs/README.md
      
      # Include directory
      - src: completions/
        dst: completions/
      
      # Strip path prefix
      - src: build/config/*.yaml
        dst: config/
        strip_parent: true
```

### Platform-Specific Files
```yaml
archives:
  - files:
      - LICENSE
      - README.md
      - src: scripts/install.sh
        dst: install.sh
        info:
          mode: 0755
      - src: completions/{{ .ProjectName }}.bash
        dst: completions/{{ .ProjectName }}.bash
      - src: completions/{{ .ProjectName }}.zsh
        dst: completions/{{ .ProjectName }}.zsh
      - src: completions/{{ .ProjectName }}.fish
        dst: completions/{{ .ProjectName }}.fish
```

### File Info (Permissions, Timestamps)
```yaml
archives:
  - files:
      - src: scripts/install.sh
        dst: install.sh
        info:
          owner: root
          group: root
          mode: 0755
          mtime: "{{ .CommitDate }}"
```

## Multiple Archives

### Separate by Build
```yaml
builds:
  - id: cli
    binary: myapp
  - id: daemon
    binary: myappd

archives:
  - id: cli-archive
    builds: [cli]
    name_template: "{{ .ProjectName }}-cli_{{ .Version }}_{{ .Os }}_{{ .Arch }}"
    
  - id: daemon-archive
    builds: [daemon]
    name_template: "{{ .ProjectName }}-daemon_{{ .Version }}_{{ .Os }}_{{ .Arch }}"
```

### Full vs Minimal
```yaml
archives:
  - id: full
    name_template: "{{ .ProjectName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}_full"
    files:
      - LICENSE
      - README.md
      - docs/**/*
      - examples/**/*
      
  - id: minimal
    name_template: "{{ .ProjectName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}"
    files:
      - LICENSE
```

## Wrap in Directory

### Enabled (Contents in Folder)
```yaml
archives:
  - wrap_in_directory: true
    # Archive contents:
    # myapp_1.0.0_linux_amd64/
    # ├── myapp
    # ├── LICENSE
    # └── README.md
```

### Custom Directory Name
```yaml
archives:
  - wrap_in_directory: "{{ .ProjectName }}"
    # Archive contents:
    # myapp/
    # ├── myapp
    # ├── LICENSE
    # └── README.md
```

### Disabled (Flat)
```yaml
archives:
  - wrap_in_directory: false
    # Archive contents:
    # myapp
    # LICENSE
    # README.md
```

## Complete Example

```yaml
archives:
  - id: default
    formats:
      - tar.gz
    format_overrides:
      - goos: windows
        formats: [zip]
    
    name_template: >-
      {{ .ProjectName }}_
      {{- .Version }}_
      {{- .Os }}_
      {{- .Arch }}
      {{- with .Arm }}v{{ . }}{{ end }}
      {{- with .Mips }}_{{ . }}{{ end }}
    
    wrap_in_directory: true
    
    files:
      - LICENSE
      - README.md
      - CHANGELOG.md
      - src: completions/*
        dst: completions/
      - src: man/*.1
        dst: man/
        info:
          mode: 0644
      - src: config/example.yaml
        dst: config.example.yaml

  - id: binary-only
    formats: [binary]
    name_template: "{{ .Binary }}_{{ .Os }}_{{ .Arch }}{{ .Ext }}"
```

## Template Variables

| Variable | Description |
|----------|-------------|
| `{{ .ProjectName }}` | Project name |
| `{{ .Binary }}` | Binary name |
| `{{ .Version }}` | Version without v prefix |
| `{{ .Tag }}` | Git tag |
| `{{ .Os }}` | Target OS |
| `{{ .Arch }}` | Target architecture |
| `{{ .Arm }}` | ARM version (6 or 7) |
| `{{ .Mips }}` | MIPS variant |
| `{{ .Ext }}` | Binary extension |
