# Handling Failures

Source page: https://docs.saloon.dev/the-basics/handling-failures

- Use Saloon's failure helpers and throwing behavior instead of ad hoc status-code checks everywhere.
- Keep package-specific exception mapping close to the connector or response layer.
- When building an SDK, translate common HTTP or API failures into custom exceptions that still preserve the underlying request and response.
- Combine this page with `responses.md` and `standalone-sdk-guidance.md` when defining exception strategy.
