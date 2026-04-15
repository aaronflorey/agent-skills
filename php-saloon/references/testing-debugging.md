# Testing And Debugging

## Testing Priorities

The docs recommend:
- test how your application handles API responses
- test failure cases like expired tokens, API downtime, and 500 responses
- avoid repeatedly hitting the real API during tests

## MockClient

- Saloon testing centers on `Saloon\Http\Faking\MockClient`.
- You can use it locally on a connector or request, or globally for deep application tests.
- Mock keys can be request classes or URL patterns with `*` wildcards.
- Mock values can be:
  - `MockResponse::make()`
  - `MockResponse::fixture()`
  - closures
  - sequences of responses

```php
use Saloon\Http\Faking\MockClient;
use Saloon\Http\Faking\MockResponse;

$mockClient = new MockClient([
    GetServersRequest::class => MockResponse::make(body: '', status: 200),
]);

$connector = new ForgeConnector;
$connector->withMockClient($mockClient);
```

## Fixtures

- `MockResponse::fixture()` records a real response once and reuses it later.
- Default fixture location is `tests/Fixtures/Saloon`.
- You can change the fixture path with `MockConfig::setFixturePath()`.
- Lowercase fixture directory names are recommended because filesystem case sensitivity differs between systems.
- Deleting a fixture JSON file causes it to be re-recorded next run.

Safety notes from the docs:
- Do not commit sensitive data from recorded responses.
- Fixtures support redaction through a custom fixture class.
- The docs call out `defineSensitiveHeaders`, `defineSensitiveJsonParameters`, and `defineSensitiveRegexPatterns` for redaction.

## Assertions And Guardrails

- Saloon provides request assertions through the mock client.
- The docs mention checking whether a request was sent, how many times it was sent, and whether nothing was sent.
- Use `Config::preventStrayRequests()` to throw if a real request is attempted during tests.
- Fixtures still record normally and are not counted as stray requests.
- Use `MockConfig::throwOnMissingFixtures()` in CI when recording new fixtures should be disallowed.

## Laravel Testing Helpers

- With the Laravel plugin, you can use `Saloon::fake()` as an alias for the global mock client.
- The Laravel plugin also clears the global mock client between tests for you.

## Debugging

- Use `debug()` to inspect request and response data.
- Use `debugRequest()` or `debugResponse()` independently when needed.
- You can pass closures for custom debug handlers.
- The debug output shows the request just before it is sent to the sender.

If you are not using Laravel and do not already have Symfony Var Dumper:

```bash
composer require symfony/var-dumper
```

## Known Issues Relevant To Testing

- Saloon can detect pagination infinite loops and throws a `PaginationException` if the last five responses have the same body.
- Infinite-loop detection is not supported for asynchronous pagination.
- Global middleware can persist between tests because it is static; the docs call out `Config::clearGlobalMiddleware()`.
- The known issues docs warn that anonymous closures on connectors or solo requests can cause connection cleanup problems in long-running processes such as Laravel queues. Prefer invokable classes or static closures.
