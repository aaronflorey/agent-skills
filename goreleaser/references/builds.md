# GoReleaser Build Configuration

Complete reference for configuring builds in GoReleaser.

## Go Builder (Default)

```yaml
builds:
  - id: myapp                    # Unique ID (defaults to binary name)
    builder: go                  # Optional, "go" is default
    
    # Source configuration
    dir: .                       # Working directory
    main: ./cmd/myapp            # Main package path
    binary: myapp                # Output binary name (template)
    
    # Build targets
    goos:
      - linux
      - darwin
      - windows
      - freebsd
    goarch:
      - amd64
      - arm64
      - arm
      - "386"
    goarm:
      - "6"
      - "7"
    goamd64:
      - v1                       # Baseline (default)
      - v2                       # CMPXCHG16B, LAHF, SAHF, POPCNT, SSE3, SSE4.1, SSE4.2, SSSE3
      - v3                       # AVX, AVX2, BMI1, BMI2, F16C, FMA, LZCNT, MOVBE, OSXSAVE
      - v4                       # AVX512F, AVX512BW, AVX512CD, AVX512DQ, AVX512VL
    gomips:
      - hardfloat
      - softfloat
    
    # Target matrix (alternative to goos/goarch)
    targets:
      - linux_amd64_v1
      - darwin_arm64
      - windows_amd64_v1
    
    # Ignore specific combinations
    ignore:
      - goos: windows
        goarch: arm64
      - goos: darwin
        goarch: "386"
    
    # Environment variables
    env:
      - CGO_ENABLED=0
      - GO111MODULE=on
    
    # Build flags
    flags:
      - -trimpath
      - -tags=netgo
    
    # Linker flags (common for version injection)
    ldflags:
      - -s -w                    # Strip debug info
      - -X main.version={{.Version}}
      - -X main.commit={{.Commit}}
      - -X main.date={{.Date}}
      - -X main.builtBy=goreleaser
    
    # Assembly flags
    asmflags:
      - all=-trimpath={{.Env.GOPATH}}
    
    # GC flags
    gcflags:
      - all=-trimpath={{.Env.GOPATH}}
    
    # Go build mode
    buildmode: default           # default, c-archive, c-shared, pie
    
    # Modify timestamp (for reproducible builds)
    mod_timestamp: "{{ .CommitTimestamp }}"
    
    # Skip builds
    skip: false
    
    # Gobinary (custom go binary path)
    gobinary: go
    
    # Override destination directory
    no_unique_dist_dir: false
    
    # Hooks
    hooks:
      pre:
        - go generate ./...
        - go mod tidy
      post:
        - upx --best {{ .Path }}  # Compress binary
```

## Rust Builder

```yaml
builds:
  - builder: rust
    
    # Cargo configuration
    dir: .
    binary: myapp
    
    # Rust targets (use rustup target list for available targets)
    targets:
      - x86_64-unknown-linux-gnu
      - x86_64-unknown-linux-musl
      - aarch64-unknown-linux-gnu
      - x86_64-apple-darwin
      - aarch64-apple-darwin
      - x86_64-pc-windows-msvc
    
    # Cargo command (default: build)
    command: build
    
    # Cargo args
    args:
      - --release
      - --locked
    
    # Environment variables
    env:
      - CARGO_INCREMENTAL=0
    
    # Hooks
    hooks:
      pre:
        - cargo fmt --check
```

## Zig Builder

```yaml
builds:
  - builder: zig
    
    dir: .
    binary: myapp
    
    # Zig targets
    targets:
      - x86_64-linux-gnu
      - x86_64-linux-musl
      - aarch64-linux-gnu
      - x86_64-macos
      - aarch64-macos
      - x86_64-windows
    
    # Zig build args
    args:
      - -Doptimize=ReleaseFast
```

## Bun Builder (TypeScript)

```yaml
builds:
  - builder: bun
    
    dir: .
    main: ./src/index.ts
    binary: myapp
    
    targets:
      - darwin_amd64
      - darwin_arm64
      - linux_amd64
      - linux_arm64
    
    # Bun compile args
    args:
      - --minify
      - --sourcemap
```

## Deno Builder (TypeScript)

```yaml
builds:
  - builder: deno
    
    dir: .
    main: ./src/main.ts
    binary: myapp
    
    targets:
      - x86_64-unknown-linux-gnu
      - x86_64-apple-darwin
      - aarch64-apple-darwin
      - x86_64-pc-windows-msvc
    
    args:
      - --allow-read
      - --allow-net
```

## Python Builder (PyInstaller)

```yaml
builds:
  - builder: python
    
    dir: .
    main: ./src/main.py
    binary: myapp
    
    # Python targets (wheel platforms)
    targets:
      - py3-none-any
      - py3-none-linux_x86_64
      - py3-none-macosx_10_9_x86_64
      - py3-none-win_amd64
```

## UV Builder (Python)

```yaml
builds:
  - builder: uv
    
    dir: .
    binary: myapp
    
    targets:
      - py3-none-any
      - py3-none-linux_x86_64
      - py3-none-macosx_10_9_x86_64
```

## Poetry Builder (Python)

```yaml
builds:
  - builder: poetry
    
    dir: .
    binary: myapp
    
    targets:
      - py3-none-any
```

## Prebuilt Binaries

Use when binaries are built by another system:

```yaml
builds:
  - builder: prebuilt
    
    # Path template to find prebuilt binaries
    prebuilt:
      path: dist/{{ .ProjectName }}_{{ .Os }}_{{ .Arch }}{{ with .Arm }}v{{ . }}{{ end }}/{{ .ProjectName }}{{ .Ext }}
    
    # Must specify targets for prebuilt
    goos:
      - linux
      - darwin
      - windows
    goarch:
      - amd64
      - arm64
```

## Multiple Builds

```yaml
builds:
  - id: cli
    main: ./cmd/cli
    binary: myapp
    goos: [linux, darwin, windows]
    goarch: [amd64, arm64]
    
  - id: server
    main: ./cmd/server
    binary: myapp-server
    goos: [linux]
    goarch: [amd64, arm64]
    env:
      - CGO_ENABLED=0
    
  - id: gui
    main: ./cmd/gui
    binary: myapp-gui
    goos: [darwin, windows]
    goarch: [amd64, arm64]
    # GUI apps might need CGO
```

## Common Patterns

### Static Binary (No CGO)
```yaml
builds:
  - env:
      - CGO_ENABLED=0
    ldflags:
      - -s -w
      - -extldflags "-static"
    flags:
      - -trimpath
```

### Version Info Injection
```yaml
builds:
  - ldflags:
      - -X main.version={{.Version}}
      - -X main.commit={{.Commit}}
      - -X main.date={{.Date}}
      - -X main.builtBy=goreleaser
      - -X github.com/org/repo/internal/version.Version={{.Version}}
```

### Reproducible Builds
```yaml
builds:
  - env:
      - CGO_ENABLED=0
    flags:
      - -trimpath
    ldflags:
      - -s -w
      - -buildid=
    mod_timestamp: "{{ .CommitTimestamp }}"
```

### PIE (Position Independent Executable)
```yaml
builds:
  - buildmode: pie
    flags:
      - -trimpath
```

### With Race Detection (Testing)
```yaml
builds:
  - id: race
    flags:
      - -race
    skip: "{{ not .IsSnapshot }}"  # Only for snapshots
```

## Build Matrix Examples

### All Desktop Platforms
```yaml
builds:
  - goos: [linux, darwin, windows]
    goarch: [amd64, arm64]
    ignore:
      - goos: windows
        goarch: arm64  # Windows ARM64 often problematic
```

### Linux Server Only
```yaml
builds:
  - goos: [linux]
    goarch: [amd64, arm64]
    env:
      - CGO_ENABLED=0
```

### Comprehensive Matrix
```yaml
builds:
  - goos:
      - linux
      - darwin
      - windows
      - freebsd
    goarch:
      - amd64
      - arm64
      - arm
      - "386"
    goarm:
      - "6"
      - "7"
    ignore:
      - goos: darwin
        goarch: "386"
      - goos: darwin
        goarch: arm
      - goos: windows
        goarch: arm
      - goos: freebsd
        goarch: arm64
```

## Hooks

```yaml
builds:
  - hooks:
      pre:
        - cmd: go generate ./...
          env:
            - GOOS={{ .Os }}
            - GOARCH={{ .Arch }}
        - go mod download
      post:
        - cmd: upx --best {{ .Path }}
          env:
            - PATH={{ .Env.PATH }}
          output: true  # Show command output
```

## Template Variables in Builds

Available in `binary`, `ldflags`, hooks, etc.:

| Variable | Description |
|----------|-------------|
| `{{ .Os }}` | GOOS value |
| `{{ .Arch }}` | GOARCH value |
| `{{ .Arm }}` | GOARM value |
| `{{ .Mips }}` | GOMIPS value |
| `{{ .Amd64 }}` | GOAMD64 value |
| `{{ .Ext }}` | Binary extension (.exe on Windows) |
| `{{ .Path }}` | Full path to binary (hooks only) |
| `{{ .Name }}` | Binary name |
| `{{ .Target }}` | Build target (os_arch) |
| `{{ .Version }}` | Release version |
| `{{ .Tag }}` | Git tag |
| `{{ .Commit }}` | Git commit SHA |
| `{{ .ShortCommit }}` | Short commit SHA |
| `{{ .Date }}` | RFC3339 date |
| `{{ .Timestamp }}` | Unix timestamp |
| `{{ .Env.VAR }}` | Environment variable |
