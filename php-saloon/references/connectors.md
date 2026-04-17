# Connectors

Source page: https://docs.saloon.dev/the-basics/connectors

- Extend `Saloon\Http\Connector`.
- Define `resolveBaseUrl()`.
- Put shared behavior on the connector: authentication, default headers, middleware, retries, sender config, and API-wide defaults.
- Pass tenant-specific or user-specific state through the constructor when needed.
- Treat the connector as the root of the integration or SDK.
