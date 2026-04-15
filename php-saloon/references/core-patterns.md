# Core Patterns

## Connectors

- Extend `Saloon\Http\Connector`.
- Define `resolveBaseUrl()`.
- Put shared behavior on the connector: auth, default headers, default config, retries, middleware, and shared request-body defaults.
- If the API varies per tenant or user, pass required values through the connector constructor.

## Requests

- Extend `Saloon\Http\Request`.
- Define a `Method` and `resolveEndpoint()`.
- Put request-specific headers, query parameters, and body defaults on the request.
- If a request needs per-resource input, accept it in the constructor.

## Sending Flow

- `Connector::send()` sends a request and returns a Saloon `Response`.
- `sendAsync()` returns a `PromiseInterface`.
- Async failures are surfaced through the promise `otherwise` block as a `RequestException`.

## Authentication

Built-in options mentioned in the docs:
- `TokenAuthenticator`
- `BasicAuthenticator`
- `QueryAuthenticator`
- `CertificateAuthenticator`
- `HeaderAuthenticator`
- `MultiAuthenticator`

Guidance:
- Use `defaultAuth()` for integration-wide authentication.
- Use `authenticate()` to override auth at runtime.
- Only one authenticator can be used at a time.

## Request Bodies

To send a body, Saloon requires:
- a `POST`, `PUT`, or `PATCH` method
- the `HasBody` interface
- a body trait that implements `body()`

Common body traits in the docs:
- `HasJsonBody`
- `HasMultipartBody`
- `HasXmlBody`
- `HasFormBody`
- `HasStringBody`
- `HasStreamBody`

Behavior called out by the docs:
- `HasJsonBody` sets `Content-Type: application/json` automatically.
- `HasXmlBody` sets `Content-Type: application/xml` automatically.
- `HasFormBody` sets `Content-Type: application/x-www-form-urlencoded` automatically.
- `HasMultipartBody` sets `Content-Type: multipart/form-data` automatically.
- Plain string and stream bodies do not set a default `Content-Type`; you must provide one.

Useful body operations across the docs:
- JSON and form bodies support `add`, `remove`, `merge`, `set`, `all`, `isEmpty`, and `isNotEmpty`.
- Multipart bodies support `add`, `attach`, `remove`, `merge`, `set`, `all`, `get`, `isEmpty`, and `isNotEmpty`.
- String, XML, and stream bodies support `set`, `all`, `isEmpty`, and `isNotEmpty`.

Notes:
- Connector and request bodies can both exist.
- For JSON, form, and multipart bodies, connector and request values are merged.
- For string, XML, and stream bodies, the request body takes priority over the connector body.
- Multipart bodies use `Saloon\Data\MultipartValue`.
- Stream bodies accept a PHP resource or PSR `StreamInterface`.
