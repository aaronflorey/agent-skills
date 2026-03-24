# GoReleaser Complete Examples

Ready-to-use configuration examples for common scenarios.

## Minimal Go CLI

```yaml
# yaml-language-server: $schema=https://goreleaser.com/static/schema.json
version: 2
project_name: mycli

builds:
  - main: ./cmd/mycli
    binary: mycli
    goos: [linux, darwin, windows]
    goarch: [amd64, arm64]
    env:
      - CGO_ENABLED=0
    ldflags:
      - -s -w
      - -X main.version={{.Version}}

archives:
  - formats: [tar.gz]
    format_overrides:
      - goos: windows
        formats: [zip]

changelog:
  sort: asc
  filters:
    exclude:
      - "^docs:"
      - "^test:"
```

## Go CLI with Homebrew

```yaml
# yaml-language-server: $schema=https://goreleaser.com/static/schema.json
version: 2
project_name: mycli

builds:
  - main: ./cmd/mycli
    binary: mycli
    goos: [linux, darwin, windows]
    goarch: [amd64, arm64]
    env:
      - CGO_ENABLED=0
    ldflags:
      - -s -w
      - -X github.com/myorg/mycli/internal/version.Version={{.Version}}
      - -X github.com/myorg/mycli/internal/version.Commit={{.ShortCommit}}
      - -X github.com/myorg/mycli/internal/version.Date={{.Date}}

archives:
  - formats: [tar.gz]
    format_overrides:
      - goos: windows
        formats: [zip]
    files:
      - LICENSE
      - README.md
      - completions/*

brews:
  - repository:
      owner: myorg
      name: homebrew-tap
    homepage: https://github.com/myorg/mycli
    description: "My awesome CLI tool"
    license: MIT
    install: |
      bin.install "mycli"
      bash_completion.install "completions/mycli.bash" => "mycli"
      zsh_completion.install "completions/mycli.zsh" => "_mycli"
      fish_completion.install "completions/mycli.fish"
    test: |
      system "#{bin}/mycli", "--version"

changelog:
  sort: asc
  groups:
    - title: Features
      regexp: '^.*?feat(\([[:word:]]+\))??!?:.+$'
      order: 0
    - title: Bug Fixes
      regexp: '^.*?fix(\([[:word:]]+\))??!?:.+$'
      order: 1
    - title: Other
      order: 999
  filters:
    exclude:
      - "^docs:"
      - "^test:"
      - "^chore:"
```

## Go Server with Docker

```yaml
# yaml-language-server: $schema=https://goreleaser.com/static/schema.json
version: 2
project_name: myserver

builds:
  - main: ./cmd/server
    binary: server
    goos: [linux]
    goarch: [amd64, arm64]
    env:
      - CGO_ENABLED=0
    ldflags:
      - -s -w
      - -X main.version={{.Version}}

archives:
  - formats: [tar.gz]

dockers_v2:
  - dockerfile: Dockerfile
    images:
      - "ghcr.io/{{ .Env.GITHUB_REPOSITORY_OWNER }}/{{ .ProjectName }}:{{ .Tag }}"
      - "ghcr.io/{{ .Env.GITHUB_REPOSITORY_OWNER }}/{{ .ProjectName }}:v{{ .Major }}"
      - "ghcr.io/{{ .Env.GITHUB_REPOSITORY_OWNER }}/{{ .ProjectName }}:latest"
    platforms:
      - linux/amd64
      - linux/arm64
    build_args:
      - VERSION={{ .Version }}
    labels:
      org.opencontainers.image.title: "{{ .ProjectName }}"
      org.opencontainers.image.version: "{{ .Version }}"
      org.opencontainers.image.source: "https://github.com/{{ .Env.GITHUB_REPOSITORY }}"

release:
  github:
    owner: myorg
    name: myserver
  draft: false
  prerelease: auto

changelog:
  use: github
```

Dockerfile:
```dockerfile
FROM alpine:3.19
RUN apk add --no-cache ca-certificates tzdata
COPY server /usr/local/bin/server
ENTRYPOINT ["server"]
```

## Full-Featured CLI (Multiple Package Managers)

```yaml
# yaml-language-server: $schema=https://goreleaser.com/static/schema.json
version: 2
project_name: mycli

before:
  hooks:
    - go mod tidy
    - go generate ./...

builds:
  - main: ./cmd/mycli
    binary: mycli
    goos:
      - linux
      - darwin
      - windows
    goarch:
      - amd64
      - arm64
      - arm
    goarm:
      - "6"
      - "7"
    ignore:
      - goos: windows
        goarch: arm
      - goos: windows
        goarch: arm64
    env:
      - CGO_ENABLED=0
    flags:
      - -trimpath
    ldflags:
      - -s -w
      - -X github.com/myorg/mycli/internal/version.Version={{.Version}}
      - -X github.com/myorg/mycli/internal/version.Commit={{.ShortCommit}}
      - -X github.com/myorg/mycli/internal/version.Date={{.Date}}
      - -X github.com/myorg/mycli/internal/version.BuiltBy=goreleaser
    mod_timestamp: "{{ .CommitTimestamp }}"

archives:
  - id: default
    formats: [tar.gz]
    format_overrides:
      - goos: windows
        formats: [zip]
    name_template: >-
      {{ .ProjectName }}_
      {{- .Version }}_
      {{- if eq .Os "darwin" }}macos
      {{- else }}{{ .Os }}{{ end }}_
      {{- .Arch }}
      {{- with .Arm }}v{{ . }}{{ end }}
    files:
      - LICENSE
      - README.md
      - CHANGELOG.md
      - completions/*
      - man/*

brews:
  - repository:
      owner: myorg
      name: homebrew-tap
    homepage: https://github.com/myorg/mycli
    description: "My awesome CLI tool"
    license: MIT
    install: |
      bin.install "mycli"
      bash_completion.install "completions/mycli.bash" => "mycli"
      zsh_completion.install "completions/mycli.zsh" => "_mycli"
      fish_completion.install "completions/mycli.fish"
      man1.install "man/mycli.1"

scoops:
  - repository:
      owner: myorg
      name: scoop-bucket
    homepage: https://github.com/myorg/mycli
    description: "My awesome CLI tool"
    license: MIT

aurs:
  - name: mycli-bin
    homepage: https://github.com/myorg/mycli
    description: "My awesome CLI tool"
    maintainers: ["Me <me@example.com>"]
    license: MIT
    package: |
      install -Dm755 mycli "${pkgdir}/usr/bin/mycli"
      install -Dm644 LICENSE "${pkgdir}/usr/share/licenses/mycli/LICENSE"
      install -Dm644 completions/mycli.bash "${pkgdir}/usr/share/bash-completion/completions/mycli"
      install -Dm644 completions/mycli.zsh "${pkgdir}/usr/share/zsh/site-functions/_mycli"
      install -Dm644 man/mycli.1 "${pkgdir}/usr/share/man/man1/mycli.1"
    private_key: "{{ .Env.AUR_SSH_PRIVATE_KEY }}"

nfpms:
  - id: packages
    package_name: mycli
    vendor: My Organization
    homepage: https://github.com/myorg/mycli
    maintainer: Me <me@example.com>
    description: "My awesome CLI tool"
    license: MIT
    formats:
      - deb
      - rpm
      - apk
    bindir: /usr/bin
    contents:
      - src: ./completions/mycli.bash
        dst: /usr/share/bash-completion/completions/mycli
      - src: ./completions/mycli.zsh
        dst: /usr/share/zsh/vendor-completions/_mycli
      - src: ./man/mycli.1
        dst: /usr/share/man/man1/mycli.1

checksum:
  name_template: "checksums.txt"
  algorithm: sha256

signs:
  - artifacts: checksum
    cmd: gpg
    args:
      - "--batch"
      - "--local-user"
      - "{{ .Env.GPG_FINGERPRINT }}"
      - "--output"
      - "${signature}"
      - "--detach-sign"
      - "${artifact}"

release:
  github:
    owner: myorg
    name: mycli
  draft: false
  prerelease: auto
  name_template: "{{ .Tag }}"

changelog:
  sort: asc
  use: github
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
    - title: "Other"
      order: 999
  filters:
    exclude:
      - "^docs:"
      - "^test:"
      - "^chore:"
      - "^ci:"
```

## Rust CLI

```yaml
# yaml-language-server: $schema=https://goreleaser.com/static/schema.json
version: 2
project_name: myrust

builds:
  - builder: rust
    binary: myrust
    targets:
      - x86_64-unknown-linux-gnu
      - x86_64-unknown-linux-musl
      - aarch64-unknown-linux-gnu
      - x86_64-apple-darwin
      - aarch64-apple-darwin
      - x86_64-pc-windows-msvc
    args:
      - --release
      - --locked

archives:
  - formats: [tar.gz]
    format_overrides:
      - goos: windows
        formats: [zip]
    name_template: >-
      {{ .ProjectName }}_
      {{- .Version }}_
      {{- .Os }}_
      {{- .Arch }}
```

## Monorepo (Multiple Binaries)

```yaml
# yaml-language-server: $schema=https://goreleaser.com/static/schema.json
version: 2
project_name: myproject

builds:
  - id: cli
    dir: ./cmd/cli
    binary: myproject-cli
    goos: [linux, darwin, windows]
    goarch: [amd64, arm64]
    env:
      - CGO_ENABLED=0
    ldflags:
      - -s -w
      - -X main.version={{.Version}}
  
  - id: server
    dir: ./cmd/server
    binary: myproject-server
    goos: [linux]
    goarch: [amd64, arm64]
    env:
      - CGO_ENABLED=0
    ldflags:
      - -s -w
      - -X main.version={{.Version}}
  
  - id: worker
    dir: ./cmd/worker
    binary: myproject-worker
    goos: [linux]
    goarch: [amd64, arm64]
    env:
      - CGO_ENABLED=0
    ldflags:
      - -s -w
      - -X main.version={{.Version}}

archives:
  - id: cli-archive
    builds: [cli]
    name_template: "{{ .ProjectName }}-cli_{{ .Version }}_{{ .Os }}_{{ .Arch }}"
    formats: [tar.gz]
    format_overrides:
      - goos: windows
        formats: [zip]
  
  - id: server-archive
    builds: [server, worker]
    name_template: "{{ .ProjectName }}-server_{{ .Version }}_{{ .Os }}_{{ .Arch }}"
    formats: [tar.gz]

dockers_v2:
  - id: server
    dockerfile: Dockerfile.server
    builds: [server]
    images:
      - "ghcr.io/myorg/myproject-server:{{ .Tag }}"
    platforms: [linux/amd64, linux/arm64]
  
  - id: worker
    dockerfile: Dockerfile.worker
    builds: [worker]
    images:
      - "ghcr.io/myorg/myproject-worker:{{ .Tag }}"
    platforms: [linux/amd64, linux/arm64]

brews:
  - builds: [cli]
    repository:
      owner: myorg
      name: homebrew-tap
    homepage: https://github.com/myorg/myproject
    description: "CLI for myproject"
```

## Library with Prebuilt Binaries

For projects where binaries are built externally:

```yaml
# yaml-language-server: $schema=https://goreleaser.com/static/schema.json
version: 2
project_name: mylibrary

builds:
  - builder: prebuilt
    prebuilt:
      path: >-
        build/{{ .ProjectName }}_
        {{- .Os }}_
        {{- .Arch }}
        {{- with .Arm }}v{{ . }}{{ end }}
        {{- if eq .Os "windows" }}.exe{{ end }}
    goos: [linux, darwin, windows]
    goarch: [amd64, arm64]

archives:
  - formats: [tar.gz]
    format_overrides:
      - goos: windows
        formats: [zip]
```

## GitHub Actions Workflow (Complete)

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - "v*"

permissions:
  contents: write
  packages: write
  id-token: write

jobs:
  goreleaser:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Login to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Install Cosign
        uses: sigstore/cosign-installer@v3
      
      - name: Set up Go
        uses: actions/setup-go@v5
        with:
          go-version: stable
          cache: true
      
      - name: Import GPG key
        uses: crazy-max/ghaction-import-gpg@v6
        with:
          gpg_private_key: ${{ secrets.GPG_PRIVATE_KEY }}
          passphrase: ${{ secrets.GPG_PASSPHRASE }}
      
      - name: Run GoReleaser
        uses: goreleaser/goreleaser-action@v6
        with:
          version: latest
          args: release --clean
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          HOMEBREW_TAP_GITHUB_TOKEN: ${{ secrets.HOMEBREW_TAP_GITHUB_TOKEN }}
          GPG_FINGERPRINT: ${{ secrets.GPG_FINGERPRINT }}
          COSIGN_EXPERIMENTAL: "1"
```
