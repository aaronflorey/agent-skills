# GoReleaser Signing Configuration

GoReleaser supports signing artifacts with GPG, cosign, and other tools.

## GPG Signing

### Basic GPG Signing

```yaml
signs:
  - artifacts: checksum          # What to sign: all, checksum, source, archive, binary, sbom, package, none
    
    # GPG command
    cmd: gpg
    args:
      - "--batch"
      - "--local-user"
      - "{{ .Env.GPG_FINGERPRINT }}"
      - "--output"
      - "${signature}"
      - "--detach-sign"
      - "${artifact}"
    
    # Signature file extension
    signature: "${artifact}.sig"
    
    # Environment variables
    env:
      - GPG_TTY={{ .Env.GPG_TTY }}
```

### GPG Signing All Artifacts

```yaml
signs:
  - artifacts: all
    cmd: gpg
    args:
      - "--batch"
      - "--local-user"
      - "{{ .Env.GPG_FINGERPRINT }}"
      - "--output"
      - "${signature}"
      - "--detach-sign"
      - "${artifact}"
```

### GPG with Passphrase

```yaml
signs:
  - artifacts: checksum
    cmd: gpg
    args:
      - "--batch"
      - "--pinentry-mode"
      - "loopback"
      - "--passphrase"
      - "{{ .Env.GPG_PASSPHRASE }}"
      - "--local-user"
      - "{{ .Env.GPG_FINGERPRINT }}"
      - "--output"
      - "${signature}"
      - "--detach-sign"
      - "${artifact}"
    env:
      - GPG_TTY=/dev/tty
```

### ASCII-Armored Signatures

```yaml
signs:
  - artifacts: checksum
    cmd: gpg
    args:
      - "--batch"
      - "--armor"                 # ASCII-armored output
      - "--local-user"
      - "{{ .Env.GPG_FINGERPRINT }}"
      - "--output"
      - "${signature}"
      - "--detach-sign"
      - "${artifact}"
    signature: "${artifact}.asc"  # .asc for armored
```

## Cosign Signing

### Keyless Signing (OIDC)

```yaml
signs:
  - artifacts: checksum
    cmd: cosign
    args:
      - "sign-blob"
      - "--yes"
      - "--output-signature=${signature}"
      - "--output-certificate=${certificate}"
      - "${artifact}"
    signature: "${artifact}.sig"
    certificate: "${artifact}.pem"
    env:
      - COSIGN_EXPERIMENTAL=1
```

### Cosign with Key

```yaml
signs:
  - artifacts: all
    cmd: cosign
    args:
      - "sign-blob"
      - "--key"
      - "{{ .Env.COSIGN_KEY }}"
      - "--output-signature=${signature}"
      - "${artifact}"
    signature: "${artifact}.sig"
    env:
      - COSIGN_PASSWORD={{ .Env.COSIGN_PASSWORD }}
```

## Docker Image Signing

### Cosign Docker Signing

```yaml
docker_signs:
  - artifacts: all               # all, manifests, images, none
    cmd: cosign
    args:
      - "sign"
      - "--yes"
      - "--key"
      - "{{ .Env.COSIGN_KEY }}"
      - "${artifact}"
    env:
      - COSIGN_PASSWORD={{ .Env.COSIGN_PASSWORD }}
```

### Keyless Docker Signing

```yaml
docker_signs:
  - artifacts: all
    cmd: cosign
    args:
      - "sign"
      - "--yes"
      - "${artifact}"
    env:
      - COSIGN_EXPERIMENTAL=1
```

## macOS Code Signing

### Signing macOS Binaries

```yaml
signs:
  - artifacts: binary
    ids:
      - darwin-builds            # Only sign Darwin builds
    cmd: codesign
    args:
      - "--force"
      - "--sign"
      - "{{ .Env.MACOS_SIGN_IDENTITY }}"
      - "--options"
      - "runtime"                # Enable hardened runtime
      - "--timestamp"
      - "${artifact}"
    signature: ""                # codesign modifies in place
```

### macOS Notarization

```yaml
# After signing, notarize with notarytool
# This is typically done in a post hook

builds:
  - hooks:
      post:
        - cmd: |
            if [ "{{ .Os }}" = "darwin" ]; then
              xcrun notarytool submit {{ .Path }} \
                --apple-id {{ .Env.APPLE_ID }} \
                --team-id {{ .Env.APPLE_TEAM_ID }} \
                --password {{ .Env.APPLE_APP_PASSWORD }} \
                --wait
            fi
```

### Universal Binaries + Signing

```yaml
universal_binaries:
  - id: darwin-universal
    ids:
      - darwin-amd64
      - darwin-arm64
    name_template: "{{ .ProjectName }}"
    replace: true
    hooks:
      post:
        - codesign --force --sign "{{ .Env.MACOS_SIGN_IDENTITY }}" --options runtime --timestamp "{{ .Path }}"
```

## Windows Code Signing

### SignTool

```yaml
signs:
  - artifacts: binary
    ids:
      - windows-builds
    cmd: signtool
    args:
      - "sign"
      - "/fd"
      - "SHA256"
      - "/tr"
      - "http://timestamp.digicert.com"
      - "/td"
      - "SHA256"
      - "/f"
      - "{{ .Env.WINDOWS_CERT_PATH }}"
      - "/p"
      - "{{ .Env.WINDOWS_CERT_PASSWORD }}"
      - "${artifact}"
    signature: ""
```

### AzureSignTool

```yaml
signs:
  - artifacts: binary
    ids:
      - windows-builds
    cmd: AzureSignTool
    args:
      - "sign"
      - "-kvu"
      - "{{ .Env.AZURE_VAULT_URL }}"
      - "-kvc"
      - "{{ .Env.AZURE_CERT_NAME }}"
      - "-kvt"
      - "{{ .Env.AZURE_TENANT_ID }}"
      - "-kvi"
      - "{{ .Env.AZURE_CLIENT_ID }}"
      - "-kvs"
      - "{{ .Env.AZURE_CLIENT_SECRET }}"
      - "-tr"
      - "http://timestamp.digicert.com"
      - "-v"
      - "${artifact}"
```

## Artifact Types

The `artifacts` field accepts:

| Value | Signs |
|-------|-------|
| `all` | All artifacts |
| `checksum` | Only checksum files |
| `source` | Only source archives |
| `archive` | Only archives |
| `binary` | Only binaries |
| `sbom` | Only SBOMs |
| `package` | Only packages (deb, rpm, etc.) |
| `none` | Nothing |

## Filtering by ID

```yaml
signs:
  - artifacts: binary
    ids:
      - linux-builds
      - darwin-builds
    cmd: gpg
    args: [...]
    
  - artifacts: binary
    ids:
      - windows-builds
    cmd: signtool
    args: [...]
```

## Multiple Signing Methods

```yaml
signs:
  # GPG signatures for checksums
  - id: gpg
    artifacts: checksum
    cmd: gpg
    args:
      - "--batch"
      - "--local-user"
      - "{{ .Env.GPG_FINGERPRINT }}"
      - "--output"
      - "${signature}"
      - "--detach-sign"
      - "${artifact}"
    signature: "${artifact}.sig"
    
  # Cosign signatures for all artifacts
  - id: cosign
    artifacts: all
    cmd: cosign
    args:
      - "sign-blob"
      - "--yes"
      - "--output-signature=${signature}"
      - "${artifact}"
    signature: "${artifact}.cosign.sig"
```

## Checksum Configuration

Configure checksum files before signing:

```yaml
checksum:
  name_template: "checksums.txt"
  algorithm: sha256
  
  # Extra files to include in checksum
  extra_files:
    - glob: "./dist/*.tar.gz"

signs:
  - artifacts: checksum
    cmd: gpg
    # ...
```

## Environment Variables for Signing

| Variable | Purpose |
|----------|---------|
| `GPG_FINGERPRINT` | GPG key fingerprint |
| `GPG_PASSPHRASE` | GPG key passphrase |
| `COSIGN_KEY` | Path to cosign private key |
| `COSIGN_PASSWORD` | Cosign key password |
| `COSIGN_EXPERIMENTAL` | Enable keyless signing |
| `MACOS_SIGN_IDENTITY` | macOS Developer ID |
| `APPLE_ID` | Apple ID for notarization |
| `APPLE_TEAM_ID` | Apple Developer Team ID |
| `APPLE_APP_PASSWORD` | App-specific password |

## Complete Example

```yaml
checksum:
  name_template: "checksums.txt"
  algorithm: sha256

signs:
  # GPG sign checksums
  - id: gpg-checksum
    artifacts: checksum
    cmd: gpg
    args:
      - "--batch"
      - "--local-user"
      - "{{ .Env.GPG_FINGERPRINT }}"
      - "--output"
      - "${signature}"
      - "--detach-sign"
      - "${artifact}"
    signature: "${artifact}.sig"
    
  # Cosign for archives
  - id: cosign-archives
    artifacts: archive
    cmd: cosign
    args:
      - "sign-blob"
      - "--yes"
      - "--output-signature=${signature}"
      - "--output-certificate=${certificate}"
      - "${artifact}"
    signature: "${artifact}.cosign.sig"
    certificate: "${artifact}.cosign.pem"
    env:
      - COSIGN_EXPERIMENTAL=1

docker_signs:
  - artifacts: all
    cmd: cosign
    args:
      - "sign"
      - "--yes"
      - "${artifact}"
    env:
      - COSIGN_EXPERIMENTAL=1
```
