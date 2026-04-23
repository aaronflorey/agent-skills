# XML Body

Source page: https://docs.saloon.dev/the-basics/request-body-data/xml-body

- Use `HasXmlBody` with `HasBody`.
- Saloon sets `Content-Type: application/xml` automatically.
- XML bodies support basic setters and readers rather than the richer collection-style mutations available on JSON and form bodies.
- If the integration is heavily XML-based, also review `xml-wrangler.md`.
