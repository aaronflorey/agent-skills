# String Body

Source page: https://docs.saloon.dev/the-basics/request-body-data/string-plain-text-body

- Use `HasStringBody` with `HasBody` for plain-text payloads.
- Set the `Content-Type` header yourself when the API requires one.
- String bodies are useful for raw text or custom serialized payloads.
- Prefer structured body types when the payload has a stable schema.
