# Limits, Errors, and Reliability

## Known Limits

- `GetProjectPackageVersions`: returns at most 1500 versions.
- `Query`: returns at most 1000 results.
- v3alpha batch methods: max 5000 requests per batch, otherwise HTTP 400.

## Error Surfaces

- `GetDependencies` may include:
  - top-level `error` (graph-wide issue)
  - `nodes[].errors[]` (node-specific issue)
- Treat these fields as human-readable diagnostics, not machine-stable codes.

## Practical Reliability Rules

- Always use returned canonical keys for follow-up API calls.
- If a lookup by user-supplied package name fails, retry with ecosystem-normalized naming.
- For large analyses, split work into deterministic steps:
  1. Resolve identity (`GetPackage`/`GetVersion`)
  2. Resolve requirements/dependencies
  3. Resolve advisories/project mapping
- Cache responses aggressively when building tools; docs explicitly allow caching.

## Debug Checklist

- Check URL encoding of all path/query fields.
- Confirm `system` enum value spelling.
- Confirm package naming conventions (Maven, PyPI, NuGet rules).
- For hash queries, verify digest is base64 (not hex).

## Sources

- https://docs.deps.dev/api/v3/
- https://docs.deps.dev/api/v3alpha/
