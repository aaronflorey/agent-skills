# Advanced Patterns

## Building SDKs

- Saloon recommends using a connector as the root SDK class.
- Put the base URL, auth, and defaults on the connector.
- A minimal SDK can just be a connector plus request classes.
- For a more discoverable API, expose grouped resource classes from the connector.
- Saloon includes a `BaseResource` for SDK-style grouping.

## Middleware And Boot Hooks

- The `boot(PendingRequest $pendingRequest)` method runs every time a request is sent.
- Use it to mutate headers, body, config, or register middleware.
- Request middleware mutates `PendingRequest` before send.
- Response middleware receives the `Response` after send.
- Request middleware can return a `FakeResponse` for an early fake response.
- `PendingRequest` is recreated for each send, so the original connector or request is not mutated.

Important caveats from the docs:
- Do not add request middleware from inside request middleware.
- Do not add response middleware from inside response middleware.
- Be cautious with anonymous non-static closures in constructors and boot methods.
- Global middleware is static and can leak between tests unless cleared.

## DTOs

- Define `createDtoFromResponse(Response $response): mixed` on a request or connector.
- Use `$response->dto()` or `$response->dtoOrFail()`.
- `dtoOrFail()` throws if the response is considered failed.
- DTOs can also be used as constructor input to populate request defaults.
- If you need the original response inside the DTO, the docs describe using `HasResponse` and `WithResponse`.

## OAuth2

The docs cover two grant helpers:
- `AuthorizationCodeGrant`
- `ClientCredentialsGrant`

Shared guidance:
- Add the grant trait to the connector.
- Configure OAuth with `defaultOauthConfig()`.
- You can override endpoints, scopes, and request modification.
- If credentials vary per user or tenant, pass them into the connector constructor and build OAuth config there.

Authorization code flow notes:
- Generate the authorize URL with `getAuthorizationUrl()`.
- Store and later verify the returned state.
- Exchange the callback code with `getAccessToken()`.
- Refresh expired tokens with `refreshAccessToken()`.

Client credentials notes:
- Use `getAccessToken()` to receive an `AccessTokenAuthenticator`.
- Cache the authenticator securely for reuse.

Customization hooks mentioned in the docs:
- `createAccessTokenAuthenticator`
- `createOAuthAuthenticatorFromResponse`
- request modifiers on the OAuth config or token methods

## Concurrency And Pools

- Pooling uses Guzzle's concurrency support under the hood.
- Supported senders for concurrency are `GuzzleSender` and `HttpSender`.
- Build a pool from a connector with `pool()`.
- Requests can come from an array, generator, callable, or invokable class.
- Default concurrency is 5 unless you change it with `setConcurrency()`.
- Use `withResponseHandler()` and `withExceptionHandler()` to process results.
- `send()` returns a `PromiseInterface`; call `wait()` to force completion.

## Retrying Requests

- Configure automatic sync retries with the public `$tries` property.
- Configure wait time between retries with `$retryInterval`.
- Exponential backoff is supported.
- Retries only apply to synchronous requests, not `sendAsync()` or pools.
- `sendAndRetry()` provides the same behavior on the fly.
- The docs mark `handleRetry` as deprecated since `v3.6.4`.

## Solo Requests

- Use `Saloon\Http\SoloRequest` when a full connector is unnecessary.
- A solo request must contain the full URL in `resolveEndpoint()`.
- Solo requests can still define headers, config, query parameters, and body.
- Call `send()` or `sendAsync()` directly on the request.
- Do not feed user-controlled URLs into `resolveEndpoint()` without validation; the docs warn about SSRF risk.

## PSR Support

- Saloon builds a PSR-7 request internally and exposes the PSR request and response from the `Response`.
- Override `handlePsrRequest(RequestInterface $request, PendingRequest $pendingRequest)` to mutate the PSR request before send.
- Prefer higher-level Saloon APIs unless you specifically need the PSR layer.

## Practical Guides From The Docs

- Per-request authentication can be centralized in `boot()` by fetching a token request first and then authenticating the original `PendingRequest`.
- In Laravel, reusing a singleton `GuzzleSender` can keep connections open across queued jobs or Octane-style long-lived processes for faster repeated calls.
