# Data Transfer Objects

Source page: https://docs.saloon.dev/digging-deeper/data-transfer-objects

- Implement `createDtoFromResponse(Response $response): mixed` on the request or connector.
- Use `$response->dto()` for DTO mapping.
- Use `$response->dtoOrFail()` when DTO hydration should happen only after a successful response.
- DTOs can also be used as typed input for request construction.
- For SDK packages, prefer strongly typed DTOs backed by `github.com/Crell/Serde`.
