# Endpoint Map

Default base URL: `https://api.deps.dev/v3`

## Stable v3 Endpoints

- `GET /v3/systems/{system}/packages/{name}`
  - Use for: list available versions, identify `isDefault`
  - Response anchor: `packageKey`, `versions[]`

- `GET /v3/systems/{system}/packages/{name}/versions/{version}`
  - Use for: one version's licenses, advisories, links, attestations, related projects
  - Response anchor: `versionKey`, `licenses[]`, `advisoryKeys[]`, `links[]`, `attestations[]`

- `GET /v3/systems/{system}/packages/{name}/versions/{version}:requirements`
  - Use for: declared constraints (ecosystem-specific shapes)
  - Response anchor: one system object (`npm`, `maven`, `cargo`, `pypi`, `nuget`, `go`, `rubygems`)

- `GET /v3/systems/{system}/packages/{name}/versions/{version}:dependencies`
  - Use for: resolved graph (install-like resolution)
  - Response anchor: `nodes[]`, `edges[]`, `error`, `nodes[].errors[]`

- `GET /v3/projects/{projectId}`
  - Use for: repo metadata plus Scorecard and OSS-Fuzz fields when available
  - Response anchor: `projectKey`, `starsCount`, `scorecard`, `ossFuzz`

- `GET /v3/projects/{projectId}:packageversions`
  - Use for: map project repo to known package versions
  - Response anchor: `versions[]` (max 1500)

- `GET /v3/advisories/{osvId}`
  - Use for: advisory details from OSV identifiers
  - Response anchor: `advisoryKey`, `aliases[]`, `cvss3Score`, `url`

- `GET /v3/query`
  - Use for: hash lookup and/or exact version key lookup
  - Query params: `hash.type`, `hash.value`, `versionKey.system`, `versionKey.name`, `versionKey.version`
  - Response anchor: `results[]` (max 1000)

## Decision Hints

- Need package versions first -> `GetPackage`
- Need one version's risk/license context -> `GetVersion`
- Need declared vs resolved dependencies -> `GetRequirements` vs `GetDependencies`
- Need source repo to package mapping -> project endpoints
- Need file-hash attribution -> `Query`

## Sources

- https://docs.deps.dev/api/v3/
