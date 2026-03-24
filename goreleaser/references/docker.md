# GoReleaser Docker Configuration

GoReleaser can build and push Docker images as part of the release process.

## dockers_v2 (Recommended)

The `dockers_v2` configuration uses Docker Buildx for multi-architecture support.

### Basic Configuration

```yaml
dockers_v2:
  - dockerfile: Dockerfile
    
    # Build context directory
    dir: .
    
    # Image names (templates)
    images:
      - "ghcr.io/{{ .Env.GITHUB_REPOSITORY }}:{{ .Tag }}"
      - "ghcr.io/{{ .Env.GITHUB_REPOSITORY }}:latest"
    
    # Build IDs to include binaries from
    builds:
      - myapp
    
    # Platforms to build for
    platforms:
      - linux/amd64
      - linux/arm64
      - linux/arm/v7
```

### Complete Configuration

```yaml
dockers_v2:
  - id: default
    
    # Dockerfile path (relative to dir)
    dockerfile: Dockerfile
    
    # Build context
    dir: .
    
    # Image references
    images:
      - "ghcr.io/myorg/myapp:{{ .Tag }}"
      - "ghcr.io/myorg/myapp:{{ .Major }}"
      - "ghcr.io/myorg/myapp:{{ .Major }}.{{ .Minor }}"
      - "ghcr.io/myorg/myapp:latest"
    
    # Platforms
    platforms:
      - linux/amd64
      - linux/arm64
    
    # Build arguments
    build_args:
      - VERSION={{ .Version }}
      - COMMIT={{ .Commit }}
    
    # Build secrets (Docker BuildKit)
    build_secrets:
      - id=npmrc,src={{ .Env.HOME }}/.npmrc
    
    # Labels
    labels:
      org.opencontainers.image.title: "{{ .ProjectName }}"
      org.opencontainers.image.version: "{{ .Version }}"
      org.opencontainers.image.source: "{{ .GitURL }}"
      org.opencontainers.image.created: "{{ .Date }}"
      org.opencontainers.image.revision: "{{ .FullCommit }}"
    
    # Which builds to copy to context
    builds:
      - myapp
    
    # Extra files to copy to context
    extra_files:
      - config.yaml
      - scripts/entrypoint.sh
    
    # Push configuration
    push: auto                    # auto, always, never
    
    # Skip for snapshots
    skip: "{{ .IsSnapshot }}"
```

## Multi-Architecture Images

### Automatic Manifest Creation

dockers_v2 automatically creates multi-arch manifests:

```yaml
dockers_v2:
  - images:
      - "ghcr.io/myorg/myapp:{{ .Tag }}"
    platforms:
      - linux/amd64
      - linux/arm64
    # Creates single manifest that works on both architectures
```

### Platform-Specific Dockerfiles

```yaml
dockers_v2:
  - id: alpine
    dockerfile: Dockerfile.alpine
    images:
      - "ghcr.io/myorg/myapp:{{ .Tag }}-alpine"
    platforms:
      - linux/amd64
      - linux/arm64
    
  - id: debian
    dockerfile: Dockerfile.debian
    images:
      - "ghcr.io/myorg/myapp:{{ .Tag }}-debian"
    platforms:
      - linux/amd64
      - linux/arm64
```

## Dockerfile Examples

### Minimal (Static Binary)

```dockerfile
FROM scratch
COPY myapp /myapp
ENTRYPOINT ["/myapp"]
```

### Alpine-Based

```dockerfile
FROM alpine:3.19
RUN apk add --no-cache ca-certificates tzdata
COPY myapp /usr/local/bin/myapp
ENTRYPOINT ["myapp"]
```

### Debian-Based

```dockerfile
FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
COPY myapp /usr/local/bin/myapp
ENTRYPOINT ["myapp"]
```

### With Non-Root User

```dockerfile
FROM alpine:3.19
RUN apk add --no-cache ca-certificates tzdata && \
    adduser -D -g '' appuser
COPY myapp /usr/local/bin/myapp
USER appuser
ENTRYPOINT ["myapp"]
```

### Multi-Stage (Building in Docker)

```dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -o myapp ./cmd/myapp

FROM alpine:3.19
RUN apk add --no-cache ca-certificates
COPY --from=builder /app/myapp /usr/local/bin/myapp
ENTRYPOINT ["myapp"]
```

## Registry Authentication

### GitHub Container Registry

```yaml
# In CI (GitHub Actions)
env:
  - DOCKER_REGISTRY=ghcr.io
  
# Login before goreleaser
# - echo ${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u ${{ github.actor }} --password-stdin

dockers_v2:
  - images:
      - "ghcr.io/{{ .Env.GITHUB_REPOSITORY_OWNER }}/{{ .ProjectName }}:{{ .Tag }}"
```

### Docker Hub

```yaml
# Login: docker login -u username -p token

dockers_v2:
  - images:
      - "docker.io/myorg/myapp:{{ .Tag }}"
      - "myorg/myapp:{{ .Tag }}"  # docker.io is implicit
```

### AWS ECR

```yaml
# Login: aws ecr get-login-password | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com

dockers_v2:
  - images:
      - "123456789.dkr.ecr.us-east-1.amazonaws.com/myapp:{{ .Tag }}"
```

## Image Tags

### Semantic Versioning Tags

```yaml
dockers_v2:
  - images:
      - "ghcr.io/myorg/myapp:{{ .Tag }}"           # v1.2.3
      - "ghcr.io/myorg/myapp:v{{ .Major }}"        # v1
      - "ghcr.io/myorg/myapp:v{{ .Major }}.{{ .Minor }}"  # v1.2
      - "ghcr.io/myorg/myapp:latest"
```

### Git SHA Tags

```yaml
dockers_v2:
  - images:
      - "ghcr.io/myorg/myapp:{{ .Tag }}"
      - "ghcr.io/myorg/myapp:sha-{{ .ShortCommit }}"
```

### Conditional Latest

```yaml
dockers_v2:
  - images:
      - "ghcr.io/myorg/myapp:{{ .Tag }}"
      # Only tag as latest for non-prerelease
      - "ghcr.io/myorg/myapp:{{ if not .Prerelease }}latest{{ else }}{{ .Tag }}-dev{{ end }}"
```

## Build Arguments

```yaml
dockers_v2:
  - build_args:
      - VERSION={{ .Version }}
      - COMMIT={{ .FullCommit }}
      - BUILD_DATE={{ .Date }}
      - GO_VERSION=1.22
```

Dockerfile usage:
```dockerfile
ARG VERSION
ARG COMMIT
ARG BUILD_DATE

LABEL version="${VERSION}" \
      commit="${COMMIT}" \
      build_date="${BUILD_DATE}"
```

## OCI Labels

Standard OCI labels for container metadata:

```yaml
dockers_v2:
  - labels:
      org.opencontainers.image.title: "{{ .ProjectName }}"
      org.opencontainers.image.description: "My application description"
      org.opencontainers.image.url: "https://github.com/myorg/myapp"
      org.opencontainers.image.source: "https://github.com/myorg/myapp"
      org.opencontainers.image.version: "{{ .Version }}"
      org.opencontainers.image.created: "{{ .Date }}"
      org.opencontainers.image.revision: "{{ .FullCommit }}"
      org.opencontainers.image.licenses: "MIT"
      org.opencontainers.image.vendor: "My Organization"
```

## Complete Example

```yaml
dockers_v2:
  - id: default
    dockerfile: Dockerfile
    dir: .
    
    images:
      - "ghcr.io/{{ .Env.GITHUB_REPOSITORY_OWNER }}/{{ .ProjectName }}:{{ .Tag }}"
      - "ghcr.io/{{ .Env.GITHUB_REPOSITORY_OWNER }}/{{ .ProjectName }}:v{{ .Major }}"
      - "ghcr.io/{{ .Env.GITHUB_REPOSITORY_OWNER }}/{{ .ProjectName }}:latest"
    
    platforms:
      - linux/amd64
      - linux/arm64
    
    builds:
      - myapp
    
    build_args:
      - VERSION={{ .Version }}
      - COMMIT={{ .FullCommit }}
    
    labels:
      org.opencontainers.image.title: "{{ .ProjectName }}"
      org.opencontainers.image.version: "{{ .Version }}"
      org.opencontainers.image.source: "https://github.com/{{ .Env.GITHUB_REPOSITORY }}"
      org.opencontainers.image.created: "{{ .Date }}"
      org.opencontainers.image.revision: "{{ .FullCommit }}"
    
    push: auto
    
  - id: alpine
    dockerfile: Dockerfile.alpine
    dir: .
    
    images:
      - "ghcr.io/{{ .Env.GITHUB_REPOSITORY_OWNER }}/{{ .ProjectName }}:{{ .Tag }}-alpine"
    
    platforms:
      - linux/amd64
      - linux/arm64
    
    builds:
      - myapp
```

## Skipping Docker Builds

```yaml
dockers_v2:
  - # Skip for snapshots
    skip: "{{ .IsSnapshot }}"
    
  - # Skip based on environment
    skip: "{{ .Env.SKIP_DOCKER }}"
    
  - # Skip for prereleases
    skip: "{{ .Prerelease }}"
```

## Legacy `dockers` Configuration

The older `dockers` configuration (without multi-arch support) is still available but deprecated:

```yaml
# NOT RECOMMENDED - use dockers_v2 instead
dockers:
  - goos: linux
    goarch: amd64
    image_templates:
      - "myorg/myapp:{{ .Tag }}-amd64"
    dockerfile: Dockerfile
```
