# GoReleaser Package Manager Configuration

GoReleaser can publish to various package managers automatically.

## Homebrew (macOS/Linux)

### Homebrew Tap (Formula)

```yaml
brews:
  - name: myapp                  # Formula name (default: project name)
    
    # Tap repository
    repository:
      owner: myorg
      name: homebrew-tap         # Convention: homebrew-<tap-name>
      branch: main
      token: "{{ .Env.HOMEBREW_TAP_GITHUB_TOKEN }}"
    
    # Package info
    homepage: "https://github.com/myorg/myapp"
    description: "A brief description of myapp"
    license: "MIT"
    
    # Commit settings
    commit_author:
      name: goreleaserbot
      email: bot@goreleaser.com
    commit_msg_template: "Brew formula update for {{ .ProjectName }} version {{ .Tag }}"
    
    # Folder in tap repository
    directory: Formula
    
    # Dependencies
    dependencies:
      - name: git
      - name: zsh
        type: optional
    
    # Installation
    install: |
      bin.install "myapp"
      bash_completion.install "completions/myapp.bash" => "myapp"
      zsh_completion.install "completions/myapp.zsh" => "_myapp"
      fish_completion.install "completions/myapp.fish"
      man1.install "man/myapp.1"
    
    # Test block
    test: |
      system "#{bin}/myapp", "--version"
    
    # Caveats shown after install
    caveats: |
      To get started, run:
        myapp init
    
    # Skip upload (generate formula only)
    skip_upload: false
    
    # Extra install steps
    extra_install: |
      (buildpath/"config.yaml").write <<~EOS
        default: true
      EOS
      etc.install "config.yaml"
```

### Homebrew Cask (macOS Apps)

For macOS applications (.app bundles, .dmg, .pkg):

```yaml
homebrew_casks:
  - name: myapp
    
    repository:
      owner: myorg
      name: homebrew-cask
    
    homepage: "https://github.com/myorg/myapp"
    description: "My macOS application"
    
    # App bundle name
    app: "MyApp.app"
    
    # Or for pkg installers
    # pkg: "MyApp.pkg"
    
    # Uninstall instructions
    uninstall:
      - quit: "com.myorg.myapp"
      - delete: "/Applications/MyApp.app"
    
    # Zap (complete removal)
    zap:
      - trash:
          - "~/Library/Application Support/MyApp"
          - "~/Library/Preferences/com.myorg.myapp.plist"
          - "~/Library/Caches/com.myorg.myapp"
```

## Scoop (Windows)

```yaml
scoops:
  - name: myapp
    
    # Bucket repository
    repository:
      owner: myorg
      name: scoop-bucket
      branch: main
      token: "{{ .Env.SCOOP_BUCKET_GITHUB_TOKEN }}"
    
    # Package info
    homepage: "https://github.com/myorg/myapp"
    description: "A brief description of myapp"
    license: MIT
    
    # Commit settings
    commit_author:
      name: goreleaserbot
      email: bot@goreleaser.com
    commit_msg_template: "Scoop update for {{ .ProjectName }} version {{ .Tag }}"
    
    # Folder in bucket
    directory: bucket
    
    # Dependencies
    depends: [git, 7zip]
    
    # Pre/post install scripts
    pre_install: ["Write-Host 'Installing...'"]
    post_install: ["Write-Host 'Installed!'"]
    
    # Shortcuts (Start Menu)
    shortcuts: [["myapp.exe", "MyApp"]]
```

## AUR (Arch Linux)

```yaml
aurs:
  - name: myapp-bin              # AUR package name
    
    # AUR repository
    homepage: "https://github.com/myorg/myapp"
    description: "A brief description of myapp"
    license: MIT
    
    # Maintainers
    maintainers:
      - "Your Name <email@example.com>"
    
    # Contributors
    contributors:
      - "Contributor Name <contrib@example.com>"
    
    # Dependencies
    depends:
      - glibc
    optdepends:
      - "bash-completion: for bash completions"
    
    # Build dependencies
    makedepends:
      - git
    
    # Conflicts
    conflicts:
      - myapp
    provides:
      - myapp
    
    # Package function
    package: |
      install -Dm755 myapp "${pkgdir}/usr/bin/myapp"
      install -Dm644 LICENSE "${pkgdir}/usr/share/licenses/myapp/LICENSE"
      install -Dm644 completions/myapp.bash "${pkgdir}/usr/share/bash-completion/completions/myapp"
      install -Dm644 completions/myapp.zsh "${pkgdir}/usr/share/zsh/site-functions/_myapp"
      install -Dm644 completions/myapp.fish "${pkgdir}/usr/share/fish/vendor_completions.d/myapp.fish"
    
    # SSH key for pushing
    private_key: "{{ .Env.AUR_SSH_PRIVATE_KEY }}"
    
    # Git URL
    git_url: "ssh://aur@aur.archlinux.org/myapp-bin.git"
    
    # Commit settings
    commit_author:
      name: goreleaserbot
      email: bot@goreleaser.com
```

## Nix

```yaml
nixpkgs:
  - name: myapp
    
    # Repository
    repository:
      owner: myorg
      name: nur-packages
      branch: main
    
    # Package info
    homepage: "https://github.com/myorg/myapp"
    description: "A brief description of myapp"
    license: mit
    
    # Path in repository
    path: pkgs/myapp/default.nix
    
    # Installation
    install: |
      mkdir -p $out/bin
      cp myapp $out/bin/
```

## Winget (Windows Package Manager)

```yaml
winget:
  - name: myapp
    publisher: myorg
    
    # Repository
    repository:
      owner: microsoft
      name: winget-pkgs
      branch: main
    
    # Package info
    short_description: "Brief description"
    description: "Longer description of myapp"
    homepage: "https://github.com/myorg/myapp"
    license: MIT
    license_url: "https://github.com/myorg/myapp/blob/main/LICENSE"
    
    # Package identifier
    package_identifier: myorg.myapp
    
    # Publisher info
    publisher_url: "https://myorg.com"
    publisher_support_url: "https://github.com/myorg/myapp/issues"
    
    # Commit settings
    commit_author:
      name: goreleaserbot
      email: bot@goreleaser.com
```

## Chocolatey (Windows)

```yaml
chocolateys:
  - name: myapp
    
    # Package info
    title: "MyApp"
    authors: "My Organization"
    owners: "myorg"
    summary: "Brief summary"
    description: "Longer description"
    project_url: "https://github.com/myorg/myapp"
    license_url: "https://github.com/myorg/myapp/blob/main/LICENSE"
    icon_url: "https://example.com/icon.png"
    tags: "cli tool utility"
    
    # Dependencies
    dependencies:
      - id: dotnet-runtime
        version: "6.0"
    
    # API key
    api_key: "{{ .Env.CHOCOLATEY_API_KEY }}"
    
    # Source (default: https://push.chocolatey.org/)
    source_repo: "https://push.chocolatey.org/"
```

## Krew (kubectl plugins)

```yaml
krews:
  - name: myapp
    
    # Repository
    repository:
      owner: myorg
      name: krew-index
      branch: main
    
    # Short description (max 80 chars)
    short_description: "A kubectl plugin for myapp"
    
    # Long description
    description: |
      Longer description of what this kubectl plugin does.
      Can be multiple lines.
    
    # Homepage
    homepage: "https://github.com/myorg/kubectl-myapp"
    
    # Caveats
    caveats: |
      This plugin requires additional setup.
      Run 'kubectl myapp init' to get started.
```

## NPM

```yaml
npms:
  - name: "@myorg/myapp"
    
    # Registry
    registry: "https://registry.npmjs.org"
    
    # Package info
    description: "My CLI tool"
    homepage: "https://github.com/myorg/myapp"
    license: MIT
    
    # Keywords
    keywords:
      - cli
      - tool
    
    # Token
    token: "{{ .Env.NPM_TOKEN }}"
```

## Complete Example

```yaml
brews:
  - repository:
      owner: myorg
      name: homebrew-tap
    homepage: "https://github.com/myorg/myapp"
    description: "My awesome CLI tool"
    license: MIT
    install: |
      bin.install "myapp"
      bash_completion.install "completions/myapp.bash" => "myapp"
      zsh_completion.install "completions/myapp.zsh" => "_myapp"
      fish_completion.install "completions/myapp.fish"
    test: |
      system "#{bin}/myapp", "--version"

scoops:
  - repository:
      owner: myorg
      name: scoop-bucket
    homepage: "https://github.com/myorg/myapp"
    description: "My awesome CLI tool"
    license: MIT

aurs:
  - name: myapp-bin
    homepage: "https://github.com/myorg/myapp"
    description: "My awesome CLI tool"
    maintainers: ["Me <me@example.com>"]
    license: MIT
    package: |
      install -Dm755 myapp "${pkgdir}/usr/bin/myapp"
    private_key: "{{ .Env.AUR_SSH_PRIVATE_KEY }}"
```

## Repository Tokens

Different package managers need different tokens:

| Package Manager | Token Variable | Permissions Needed |
|----------------|----------------|-------------------|
| Homebrew | `HOMEBREW_TAP_GITHUB_TOKEN` | repo (write) |
| Scoop | `SCOOP_BUCKET_GITHUB_TOKEN` | repo (write) |
| AUR | `AUR_SSH_PRIVATE_KEY` | SSH key registered with AUR |
| Chocolatey | `CHOCOLATEY_API_KEY` | API key from chocolatey.org |
| NPM | `NPM_TOKEN` | Publish token from npmjs.com |
| Winget | `WINGET_GITHUB_TOKEN` | PR creation on winget-pkgs |
