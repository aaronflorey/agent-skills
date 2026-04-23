# Form Body

Source page: https://docs.saloon.dev/the-basics/request-body-data/form-body-url-encoded

- Use `HasFormBody` with `HasBody`.
- Saloon sets `Content-Type: application/x-www-form-urlencoded` automatically.
- Form bodies support the same value-style mutation helpers as JSON bodies.
- Use this only when the upstream API expects form-url-encoded payloads.
