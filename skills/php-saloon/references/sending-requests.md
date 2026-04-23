# Sending Requests

Source page: https://docs.saloon.dev/the-basics/sending-requests

- Use `Connector::send()` for synchronous requests.
- Use `sendAsync()` when you need promises.
- Saloon returns a `Response` wrapper rather than a raw PSR response.
- Centralize send logic on the connector or resource layer so callers do not duplicate request orchestration.
