# JSON Body

Source page: https://docs.saloon.dev/the-basics/request-body-data/json-body

- Use `HasJsonBody` with `HasBody`.
- Saloon sets `Content-Type: application/json` automatically.
- JSON bodies support common mutation helpers like `add`, `remove`, `merge`, `set`, and `all`.
- Use typed DTO input when the JSON payload grows beyond a couple of primitive fields.
