# v3alpha Extras

Use `https://api.deps.dev/v3alpha` only when you need functionality not in stable v3.

## Notable Extra Endpoints

- `POST /v3alpha/versionbatch`
- `POST /v3alpha/projectbatch`
- `GET /v3alpha/purl/{purl}`
- `POST /v3alpha/purlbatch`
- `GET /v3alpha/systems/{system}/packages/{name}/versions/{version}:dependents`
- `GET /v3alpha/systems/{system}/packages/{name}/versions/{version}:capabilities`
- `GET /v3alpha/systems/{system}/packages/{name}:similarlyNamedPackages`

## purl Rules

- Supported purl types: `cargo`, `gem`, `golang`, `maven`, `npm`, `nuget`, `pypi`.
- Build a valid purl first, then percent-encode the entire purl when using it in path params.
- Keep purl qualifiers/subpath empty for lookup endpoints.

## Batch Behavior

- Batch methods accept JSON request bodies.
- Batch size limit is 5000 requests.
- Pagination uses `pageToken` and `nextPageToken`.

## Caution

- `v3alpha` is explicitly non-stable; wire this behind a feature flag in production agents.

## Source

- https://docs.deps.dev/api/v3alpha/
