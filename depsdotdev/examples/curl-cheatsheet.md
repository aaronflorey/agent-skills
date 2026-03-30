# curl Cheatsheet

These examples use `jq` for readable output and `python3` for safe URL encoding.

## 1) Get package versions (npm scoped package)

```bash
PKG='@colors/colors'
ENCODED_NAME="$(python3 -c 'import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1], safe=""))' "$PKG")"

curl -s "https://api.deps.dev/v3/systems/NPM/packages/${ENCODED_NAME}" \
  | jq '{packageKey, default: (.versions[] | select(.isDefault==true) | .versionKey.version)}'
```

## 2) Get version metadata (licenses + advisories)

```bash
PKG='react'
VER='18.2.0'
ENCODED_NAME="$(python3 -c 'import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1], safe=""))' "$PKG")"
ENCODED_VER="$(python3 -c 'import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1], safe=""))' "$VER")"

curl -s "https://api.deps.dev/v3/systems/NPM/packages/${ENCODED_NAME}/versions/${ENCODED_VER}" \
  | jq '{versionKey, licenses, advisoryKeys, attestations}'
```

## 3) Declared requirements vs resolved dependencies

```bash
PKG='react'
VER='18.2.0'
ENCODED_NAME="$(python3 -c 'import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1], safe=""))' "$PKG")"
ENCODED_VER="$(python3 -c 'import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1], safe=""))' "$VER")"

curl -s "https://api.deps.dev/v3/systems/NPM/packages/${ENCODED_NAME}/versions/${ENCODED_VER}:requirements" | jq '.npm.dependencies'
curl -s "https://api.deps.dev/v3/systems/NPM/packages/${ENCODED_NAME}/versions/${ENCODED_VER}:dependencies" | jq '{nodes: (.nodes|length), edges: (.edges|length), error}'
```

## 4) Query by file hash (SHA1 base64)

```bash
HASH_B64="$(openssl sha1 -binary ./artifact.tgz | base64)"
ENCODED_HASH="$(python3 -c 'import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1], safe=""))' "$HASH_B64")"

curl -s "https://api.deps.dev/v3/query?hash.type=SHA1&hash.value=${ENCODED_HASH}" \
  | jq '.results[:5] | map(.version.versionKey)'
```

## 5) Project -> package versions mapping

```bash
PROJECT='github.com/facebook/react'
ENCODED_PROJECT="$(python3 -c 'import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1], safe=""))' "$PROJECT")"

curl -s "https://api.deps.dev/v3/projects/${ENCODED_PROJECT}:packageversions" \
  | jq '.versions[:10] | map(.versionKey)'
```

## 6) v3alpha purl lookup

```bash
PURL='pkg:npm/%40colors/colors@1.5.0'
ENCODED_PURL="$(python3 -c 'import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1], safe=""))' "$PURL")"

curl -s "https://api.deps.dev/v3alpha/purl/${ENCODED_PURL}" | jq '{package,version}'
```

## Sources

- https://docs.deps.dev/api/v3/
- https://docs.deps.dev/api/v3alpha/
