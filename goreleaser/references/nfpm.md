# GoReleaser nFPM Configuration (Linux Packages)

nFPM creates native Linux packages (.deb, .rpm, .apk, .archlinux).

## Basic Configuration

```yaml
nfpms:
  - id: default
    package_name: myapp
    
    # Formats to generate
    formats:
      - deb
      - rpm
      - apk
      - archlinux
    
    # Package metadata
    vendor: My Organization
    homepage: https://example.com
    maintainer: Me <me@example.com>
    description: "My application description"
    license: MIT
    
    # Install location
    bindir: /usr/bin
```

## Complete Configuration

```yaml
nfpms:
  - id: default
    package_name: myapp
    
    # File name template
    file_name_template: "{{ .PackageName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}"
    
    # Include specific builds
    ids:
      - cli
      - server
    
    # Formats
    formats:
      - deb
      - rpm
      - apk
      - archlinux
      - termux.deb        # For Android Termux
    
    # Package info
    vendor: My Organization
    homepage: https://example.com
    maintainer: Me <me@example.com>
    description: |
      My awesome application.
      Multi-line description.
    license: MIT
    
    # Install paths
    bindir: /usr/bin
    
    # Version info
    epoch: 1
    release: 1
    
    # Dependencies
    dependencies:
      - git
      - curl
    recommends:
      - zsh
    suggests:
      - vim
    conflicts:
      - other-app
    replaces:
      - old-app
    
    # Additional files
    contents:
      - src: LICENSE
        dst: /usr/share/licenses/myapp/LICENSE
      - src: README.md
        dst: /usr/share/doc/myapp/README.md
      - src: config.example.yaml
        dst: /etc/myapp/config.yaml
        type: config
      - src: completions/myapp.bash
        dst: /usr/share/bash-completion/completions/myapp
      - src: completions/myapp.zsh
        dst: /usr/share/zsh/vendor-completions/_myapp
      - src: man/myapp.1
        dst: /usr/share/man/man1/myapp.1
    
    # Install scripts
    scripts:
      preinstall: scripts/preinstall.sh
      postinstall: scripts/postinstall.sh
      preremove: scripts/preremove.sh
      postremove: scripts/postremove.sh
```

## Package Formats

### Debian (.deb)

```yaml
nfpms:
  - formats: [deb]
    
    deb:
      # Compression: gzip (default), xz, zstd, none
      compression: zstd
      
      # Lintian overrides
      lintian_overrides:
        - statically-linked-binary
        - changelog-file-missing-in-native-package
      
      # Pre-dependencies
      predepends:
        - libc6 (>= 2.17)
      
      # Breaks/replaces
      breaks:
        - old-package
      
      # Triggers
      triggers:
        interest:
          - some-trigger
        activate:
          - another-trigger
      
      # Control file fields
      fields:
        Bugs: https://github.com/myorg/myapp/issues
      
      # Signing
      signature:
        key_file: "{{ .Env.GPG_KEY_PATH }}"
        type: origin  # origin, maint, archive
```

### RPM (.rpm)

```yaml
nfpms:
  - formats: [rpm]
    
    rpm:
      # Compression: gzip (default), lzma, xz
      compression: xz
      
      # Package group
      group: Applications/System
      
      # Summary
      summary: "Short description"
      
      # Packager
      packager: My Organization <build@example.com>
      
      # Scripts
      scripts:
        pretrans: scripts/pretrans.sh
        posttrans: scripts/posttrans.sh
      
      # Relocatable prefixes
      prefixes:
        - /usr/bin
      
      # Signing
      signature:
        key_file: "{{ .Env.GPG_KEY_PATH }}"
```

### Alpine (.apk)

```yaml
nfpms:
  - formats: [apk]
    
    apk:
      # Scripts
      scripts:
        preupgrade: scripts/preupgrade.sh
        postupgrade: scripts/postupgrade.sh
      
      # Signing
      signature:
        key_file: "{{ .Env.GPG_KEY_PATH }}"
        key_name: myapp@example.com
```

### Arch Linux (.pkg.tar.zst)

```yaml
nfpms:
  - formats: [archlinux]
    
    archlinux:
      # Package base name
      pkgbase: myapp
      
      # Packager
      packager: My Organization <build@example.com>
      
      # Scripts
      scripts:
        preupgrade: scripts/preupgrade.sh
        postupgrade: scripts/postupgrade.sh
```

## Contents Configuration

### Basic Files

```yaml
nfpms:
  - contents:
      # Binary (automatically added from builds)
      
      # Config file (preserved on upgrade)
      - src: config.yaml
        dst: /etc/myapp/config.yaml
        type: config
      
      # Config file (never replaced)
      - src: config.yaml
        dst: /etc/myapp/config.yaml
        type: "config|noreplace"
```

### Directory Trees

```yaml
nfpms:
  - contents:
      # Copy entire directory tree
      - src: share/
        dst: /usr/share/myapp/
        type: tree
      
      # Create empty directory
      - dst: /var/lib/myapp
        type: dir
        file_info:
          mode: 0755
```

### Symlinks

```yaml
nfpms:
  - contents:
      # Create symlink
      - src: /usr/bin/myapp
        dst: /usr/local/bin/myapp
        type: symlink
```

### File Permissions

```yaml
nfpms:
  - contents:
      - src: scripts/helper.sh
        dst: /usr/share/myapp/helper.sh
        file_info:
          mode: 0755
          owner: root
          group: root
          mtime: "{{ .CommitDate }}"
```

### Per-Format Files

```yaml
nfpms:
  - contents:
      # Deb-specific file
      - src: debian/postinst
        dst: /etc/myapp/postinst
        packager: deb
      
      # RPM-specific file
      - src: rpm/myapp.spec
        dst: /etc/myapp/myapp.spec
        packager: rpm
```

## Scripts

### Installation Scripts

```yaml
nfpms:
  - scripts:
      # Before installation
      preinstall: |
        #!/bin/bash
        getent group myapp || groupadd myapp
        getent passwd myapp || useradd -g myapp myapp
      
      # After installation
      postinstall: |
        #!/bin/bash
        systemctl daemon-reload
        systemctl enable myapp
      
      # Before removal
      preremove: |
        #!/bin/bash
        systemctl stop myapp
        systemctl disable myapp
      
      # After removal
      postremove: |
        #!/bin/bash
        userdel myapp || true
        groupdel myapp || true
```

### Script Files

```yaml
nfpms:
  - scripts:
      preinstall: scripts/preinstall.sh
      postinstall: scripts/postinstall.sh
      preremove: scripts/preremove.sh
      postremove: scripts/postremove.sh
```

## Overrides

Override settings per format:

```yaml
nfpms:
  - dependencies:
      - git
    
    overrides:
      deb:
        dependencies:
          - git
          - libc6 (>= 2.17)
      rpm:
        dependencies:
          - git
          - glibc >= 2.17
      apk:
        dependencies:
          - git
          - musl
```

## Signing

### Environment Variables

Password precedence (most specific to most generic):

1. `NFPM_[ID]_[FORMAT]_PASSPHRASE` (e.g., `NFPM_DEFAULT_DEB_PASSPHRASE`)
2. `NFPM_[ID]_PASSPHRASE` (e.g., `NFPM_DEFAULT_PASSPHRASE`)
3. `NFPM_PASSPHRASE`

### GPG Signing

```yaml
nfpms:
  - id: default
    
    deb:
      signature:
        key_file: "{{ .Env.GPG_KEY_PATH }}"
    
    rpm:
      signature:
        key_file: "{{ .Env.GPG_KEY_PATH }}"
    
    apk:
      signature:
        key_file: "{{ .Env.GPG_KEY_PATH }}"
        key_name: myapp@example.com
```

## Complete Example

```yaml
nfpms:
  - id: packages
    package_name: myapp
    file_name_template: "{{ .PackageName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}"
    
    formats:
      - deb
      - rpm
      - apk
    
    vendor: My Organization
    homepage: https://github.com/myorg/myapp
    maintainer: Me <me@example.com>
    description: "My awesome CLI application"
    license: MIT
    
    bindir: /usr/bin
    
    dependencies:
      - git
    
    contents:
      - src: LICENSE
        dst: /usr/share/licenses/myapp/LICENSE
      - src: completions/myapp.bash
        dst: /usr/share/bash-completion/completions/myapp
      - src: completions/myapp.zsh
        dst: /usr/share/zsh/vendor-completions/_myapp
      - src: completions/myapp.fish
        dst: /usr/share/fish/vendor_completions.d/myapp.fish
      - src: man/myapp.1
        dst: /usr/share/man/man1/myapp.1
      - src: config.example.yaml
        dst: /etc/myapp/config.yaml
        type: "config|noreplace"
      - dst: /var/lib/myapp
        type: dir
        file_info:
          mode: 0755
    
    scripts:
      postinstall: scripts/postinstall.sh
      preremove: scripts/preremove.sh
    
    overrides:
      deb:
        dependencies:
          - git
          - ca-certificates
      rpm:
        dependencies:
          - git
          - ca-certificates
    
    deb:
      compression: zstd
      lintian_overrides:
        - statically-linked-binary
    
    rpm:
      compression: xz
      group: Applications/System
```

## Template Variables

Available in nfpm templates:

| Variable | Description |
|----------|-------------|
| `{{ .PackageName }}` | Package name |
| `{{ .Version }}` | Version |
| `{{ .Os }}` | Target OS |
| `{{ .Arch }}` | Target architecture |
| `{{ .Arm }}` | ARM version |
| `{{ .Format }}` | Package format (deb, rpm, etc.) |
| `{{ .ConventionalFileName }}` | Standard filename |
| `{{ .ConventionalExtension }}` | Standard extension |
