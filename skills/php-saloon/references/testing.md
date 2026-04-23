# Testing

Source page: https://docs.saloon.dev/the-basics/testing

- Prefer `MockClient` and recorded fixtures instead of live API calls.
- Test success paths, DTO mapping, auth failures, retries, and API error handling.
- Use `Config::preventStrayRequests()` to fail fast if tests accidentally hit the network.
- Use fixture redaction for sensitive values before committing recorded responses.
