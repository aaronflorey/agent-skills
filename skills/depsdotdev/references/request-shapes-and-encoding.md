# Request Shapes and Encoding

Encoding mistakes are the most common cause of bad deps.dev requests.

## Path Templates

- Package: `/v3/systems/{system}/packages/{name}`
- Version: `/v3/systems/{system}/packages/{name}/versions/{version}`
- Requirements: `/v3/systems/{system}/packages/{name}/versions/{version}:requirements`
- Dependencies: `/v3/systems/{system}/packages/{name}/versions/{version}:dependencies`
- Project: `/v3/projects/{projectId}`

## Required Encoding Rules

- Percent-encode every path parameter and query value.
- Typical examples:
  - npm scoped name `@colors/colors` -> `%40colors%2Fcolors`
  - project id `github.com/facebook/react` -> `github.com%2Ffacebook%2Freact`
  - base64 hash value `ulXBPXrC/UTfnMgHRFVxmjPzdbk=` -> `ulXBPXrC%2FUTfnMgHRFVxmjPzdbk%3D`

## System Values

Allowed `system` enum values:

- `GO`
- `RUBYGEMS`
- `NPM`
- `CARGO`
- `MAVEN`
- `PYPI`
- `NUGET`

## Name Normalization Notes

- Maven package names use `group:artifact`.
- PyPI names are normalized per PEP 503.
- NuGet names are lowercased; versions follow NuGet normalization rules.
- Response identities can be canonicalized. Reuse returned keys for next calls.

## Hash Query Pattern

Use `GET /v3/query` with:

- `hash.type`: `MD5|SHA1|SHA256|SHA512`
- `hash.value`: base64-encoded digest (then URL-encoded)

## Source

- https://docs.deps.dev/api/v3/
