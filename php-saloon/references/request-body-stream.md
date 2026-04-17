# Stream Body

Source page: https://docs.saloon.dev/the-basics/request-body-data/stream-body

- Use `HasStreamBody` with `HasBody` for stream uploads.
- Stream bodies accept a PHP resource or PSR `StreamInterface`.
- Set `Content-Type` manually when needed.
- Keep stream handling explicit so callers understand ownership and lifecycle of the resource.
