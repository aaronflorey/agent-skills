# Getting Started

## Installation

- Install Saloon with Composer:

```bash
composer require saloonphp/saloon "^4.0"
```

- If you use Laravel, there is a separate Laravel plugin that adds Artisan commands, a facade, and testing helpers.

```bash
composer require saloonphp/laravel-plugin "^4.0"
```

## Mental Model

- A `Connector` defines integration-wide defaults like base URL, headers, auth, config, retries, and middleware.
- A `Request` defines one endpoint, one HTTP method, and any per-request headers, query parameters, or body.
- `Connector::send()` returns a Saloon `Response`.

## First Connector

```php
use Saloon\Http\Connector;

class ForgeConnector extends Connector
{
    public function resolveBaseUrl(): string
    {
        return 'https://forge.laravel.com/api/v1';
    }
}
```

Notes:
- Shared headers belong in `defaultHeaders()`.
- Shared client config belongs in `defaultConfig()`.
- Default connection timeout is 10 seconds and request timeout is 30 seconds unless you customize them with the `HasTimeout` trait.

## First Request

```php
use Saloon\Enums\Method;
use Saloon\Http\Request;

class GetServersRequest extends Request
{
    protected Method $method = Method::GET;

    public function resolveEndpoint(): string
    {
        return '/servers';
    }
}
```

Notes:
- Requests can define `defaultHeaders()` and `defaultQuery()`.
- Request headers merge with connector headers.
- `resolveEndpoint()` is combined with the connector base URL.

## Sending Requests

```php
$connector = new ForgeConnector;
$response = $connector->send(new GetServersRequest);
```

- Use `sendAsync()` for async requests. It returns a `PromiseInterface`.
- Async failures are surfaced through the promise `otherwise` block as a `RequestException`.

## Authentication Shortcut

```php
use Saloon\Http\Auth\TokenAuthenticator;

class ForgeConnector extends Connector
{
    public function __construct(public readonly string $token) {}

    protected function defaultAuth(): TokenAuthenticator
    {
        return new TokenAuthenticator($this->token);
    }
}
```

- Saloon ships authenticators for bearer token, basic auth, query auth, certificate auth, header auth, and multi-auth.
- You can also call `authenticate()` at runtime on a connector or request.
