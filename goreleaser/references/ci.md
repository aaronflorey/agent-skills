# GoReleaser CI/CD Integration

GoReleaser integrates with various CI/CD systems for automated releases.

## GitHub Actions

### Basic Release Workflow

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

jobs:
  goreleaser:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0          # Required for changelog
      
      - name: Set up Go
        uses: actions/setup-go@v5
        with:
          go-version: stable
      
      - name: Run GoReleaser
        uses: goreleaser/goreleaser-action@v6
        with:
          version: latest
          args: release --clean
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### With Docker Publishing

```yaml
name: Release

on:
  push:
    tags:
      - "v*"

permissions:
  contents: write
  packages: write

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
      
      - name: Set up Go
        uses: actions/setup-go@v5
        with:
          go-version: stable
      
      - name: Run GoReleaser
        uses: goreleaser/goreleaser-action@v6
        with:
          version: latest
          args: release --clean
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### With Signing

```yaml
name: Release

on:
  push:
    tags:
      - "v*"

permissions:
  contents: write
  packages: write
  id-token: write               # For keyless signing

jobs:
  goreleaser:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Install Cosign
        uses: sigstore/cosign-installer@v3
      
      - name: Set up Go
        uses: actions/setup-go@v5
        with:
          go-version: stable
      
      - name: Run GoReleaser
        uses: goreleaser/goreleaser-action@v6
        with:
          version: latest
          args: release --clean
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          COSIGN_EXPERIMENTAL: "1"
```

### With Homebrew Publishing

```yaml
name: Release

on:
  push:
    tags:
      - "v*"

jobs:
  goreleaser:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Set up Go
        uses: actions/setup-go@v5
        with:
          go-version: stable
      
      - name: Run GoReleaser
        uses: goreleaser/goreleaser-action@v6
        with:
          version: latest
          args: release --clean
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          # Separate token for tap repository
          HOMEBREW_TAP_GITHUB_TOKEN: ${{ secrets.HOMEBREW_TAP_GITHUB_TOKEN }}
```

### Snapshot on PR

```yaml
name: Snapshot

on:
  pull_request:
    branches: [main]

jobs:
  snapshot:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Set up Go
        uses: actions/setup-go@v5
        with:
          go-version: stable
      
      - name: Run GoReleaser Snapshot
        uses: goreleaser/goreleaser-action@v6
        with:
          version: latest
          args: release --snapshot --clean
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
```

### Multi-Platform Builds

```yaml
name: Release

on:
  push:
    tags:
      - "v*"

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
      
      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      
      - name: Set up Go
        uses: actions/setup-go@v5
        with:
          go-version: stable
      
      - name: Run GoReleaser
        uses: goreleaser/goreleaser-action@v6
        with:
          version: latest
          args: release --clean
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## GitLab CI

### Basic Release

```yaml
# .gitlab-ci.yml
stages:
  - release

release:
  stage: release
  image: goreleaser/goreleaser:latest
  only:
    - tags
  variables:
    GIT_DEPTH: 0                 # Required for changelog
  script:
    - goreleaser release --clean
```

### With Docker

```yaml
release:
  stage: release
  image: docker:latest
  services:
    - docker:dind
  variables:
    GIT_DEPTH: 0
    DOCKER_HOST: tcp://docker:2376
    DOCKER_TLS_CERTDIR: "/certs"
  before_script:
    - apk add --no-cache curl git go
    - curl -sL https://goreleaser.com/static/run | bash -s -- --version
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - goreleaser release --clean
  only:
    - tags
```

### GitLab Configuration in GoReleaser

```yaml
# .goreleaser.yaml
gitlab_urls:
  api: https://gitlab.com/api/v4/
  download: https://gitlab.com
  skip_tls_verify: false

release:
  gitlab:
    owner: mygroup
    name: myproject
```

## CircleCI

```yaml
# .circleci/config.yml
version: 2.1

jobs:
  release:
    docker:
      - image: cimg/go:1.22
    steps:
      - checkout
      - run:
          name: Install GoReleaser
          command: |
            curl -sL https://goreleaser.com/static/run -o goreleaser.sh
            chmod +x goreleaser.sh
      - run:
          name: Release
          command: ./goreleaser.sh release --clean

workflows:
  release:
    jobs:
      - release:
          filters:
            branches:
              ignore: /.*/
            tags:
              only: /^v.*/
```

## Travis CI

```yaml
# .travis.yml
language: go

go:
  - "1.22"

services:
  - docker

before_install:
  - curl -sL https://goreleaser.com/static/run -o goreleaser.sh
  - chmod +x goreleaser.sh

script:
  - go test ./...

deploy:
  - provider: script
    skip_cleanup: true
    script: ./goreleaser.sh release --clean
    on:
      tags: true
```

## Drone CI

```yaml
# .drone.yml
kind: pipeline
type: docker
name: release

trigger:
  event:
    - tag

steps:
  - name: release
    image: goreleaser/goreleaser:latest
    environment:
      GITHUB_TOKEN:
        from_secret: github_token
    commands:
      - goreleaser release --clean
```

## Azure Pipelines

```yaml
# azure-pipelines.yml
trigger:
  tags:
    include:
      - v*

pool:
  vmImage: ubuntu-latest

steps:
  - task: GoTool@0
    inputs:
      version: "1.22"
  
  - script: |
      curl -sL https://goreleaser.com/static/run -o goreleaser.sh
      chmod +x goreleaser.sh
    displayName: Install GoReleaser
  
  - script: ./goreleaser.sh release --clean
    displayName: Release
    env:
      GITHUB_TOKEN: $(GITHUB_TOKEN)
```

## Jenkins

```groovy
// Jenkinsfile
pipeline {
    agent any
    
    environment {
        GITHUB_TOKEN = credentials('github-token')
    }
    
    stages {
        stage('Release') {
            when {
                tag "v*"
            }
            steps {
                sh 'curl -sL https://goreleaser.com/static/run | bash -s -- release --clean'
            }
        }
    }
}
```

## Environment Variables

Common environment variables needed for CI:

| Variable | Purpose |
|----------|---------|
| `GITHUB_TOKEN` | GitHub API access |
| `GITLAB_TOKEN` | GitLab API access |
| `GITEA_TOKEN` | Gitea API access |
| `GORELEASER_KEY` | Pro license key |
| `HOMEBREW_TAP_GITHUB_TOKEN` | Homebrew tap publishing |
| `SCOOP_BUCKET_GITHUB_TOKEN` | Scoop bucket publishing |
| `AUR_SSH_PRIVATE_KEY` | AUR publishing |
| `DOCKER_USERNAME` | Docker Hub username |
| `DOCKER_PASSWORD` | Docker Hub password |
| `COSIGN_KEY` | Cosign signing key |
| `COSIGN_PASSWORD` | Cosign key password |
| `GPG_FINGERPRINT` | GPG key fingerprint |
| `GPG_PASSPHRASE` | GPG key passphrase |

## Complete GitHub Actions Workflow

```yaml
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
      
      - name: Run GoReleaser
        uses: goreleaser/goreleaser-action@v6
        with:
          distribution: goreleaser    # or goreleaser-pro
          version: latest
          args: release --clean
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          HOMEBREW_TAP_GITHUB_TOKEN: ${{ secrets.HOMEBREW_TAP_GITHUB_TOKEN }}
          COSIGN_EXPERIMENTAL: "1"
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
```
