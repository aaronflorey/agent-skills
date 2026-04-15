# API Reference

## Common Response Helpers

The docs call out these commonly used `Response` methods:
- `status()`
- `headers()`
- `header()`
- `body()`
- `json()`
- `collect()` with `illuminate/collections`
- `object()`
- `xmlReader()` with `saloonphp/xml-wrangler`
- HTML parsing with Symfony DOM Crawler
- `stream()`
- `saveBodyToFile()`
- `dto()`
- `dtoOrFail()`
- `ok()`
- `successful()`
- `redirect()`
- `failed()`
- `clientError()`
- `serverError()`
- `throw()`
- `getPendingRequest()`
- `getPsrRequest()`
- `getPsrResponse()`

## Response Customization

- Set the `$response` property on a connector or request for the simplest custom response class.
- Use `resolveResponseClass()` for more advanced response resolution.
- Define `createDtoFromResponse(Response $response): mixed` when you want `dto()` and `dtoOrFail()` to hydrate a DTO.

## Failure Handling APIs

- By default, Saloon does not throw for a normal failed HTTP response.
- Connection failures throw `FatalRequestException`.
- Use `AlwaysThrowOnErrors` to throw automatically on failed responses.
- Call `$response->throw()` when you want per-response throwing.
- Override `hasRequestFailed()` if the API can return a `200` response with an error payload.
- Override `getRequestException()` to map failures to a custom exception.

## Debug APIs

- Use `debug()` on a connector to inspect request and response data.
- Use `debugRequest()` to inspect only the request.
- Use `debugResponse()` to inspect only the response.
- The docs also mention optional `die` behavior and custom closure handlers for the debugger.

If you are not on Laravel, install Symfony Var Dumper for the default debugger:

```bash
composer require symfony/var-dumper
```
