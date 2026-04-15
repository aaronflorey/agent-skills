# Integrations And Plugins

## Pagination Plugin

- Saloon ships pagination as an installable plugin.
- Supported paginator styles in the docs:
  - paged pagination
  - limit/offset pagination
  - cursor pagination
  - fully custom pagination
- Paginators are iterators and only keep one page in memory at a time.
- Requests that use pagination should implement `Paginatable`.
- Connectors that provide pagination should implement `HasPagination` and define `paginate()`.

Useful paginator behavior from the docs:
- Iterate page-by-page with `foreach`.
- Iterate item-by-item with `items()`.
- Use `collect()` for a Laravel `LazyCollection` when available.
- Custom paginators can override `applyPagination()`.
- Asynchronous pagination needs `getTotalPages()`.
- `count()` is supported; `iterator_count()` is not.
- There is an infinite-loop safeguard based on repeated identical response bodies.

## Laravel Plugin

Install:

```bash
composer require saloonphp/laravel-plugin "^4.0"
```

Documented capabilities:
- Artisan generators for connectors, requests, responses, plugins, and authenticators
- `Saloon` facade for mocking
- events around request sending
- Laravel Nightwatch support from `v3.6.0`
- Laravel Telescope support from `v3.8.0`
- Laravel Zero support with manual service provider registration when needed

The docs list these Artisan commands:
- `php artisan saloon:connector`
- `php artisan saloon:request`
- `php artisan saloon:response`
- `php artisan saloon:plugin`
- `php artisan saloon:auth`
- `php artisan saloon:list`

Config publishing command from the docs:

```bash
php artisan vendor:publish --tag=saloon-config
```

## Caching Plugin

- Install with Composer:

```bash
composer require saloonphp/cache-plugin "^3.0"
```

- Add `Cacheable` and `HasCaching` to a connector or request.
- Implement `resolveCacheDriver()` and `cacheExpiryInSeconds()`.
- Built-in drivers mentioned in the docs:
  - `PsrCacheDriver`
  - `FlysystemDriver`
  - `LaravelCacheDriver`
- Cached responses can be detected with `isCached()`.
- By default, caching only applies to successful `GET` and `OPTIONS` requests.
- Customize cache keys via `cacheKey(PendingRequest ...)`.
- Use `invalidateCache()` to purge the current request's cache.
- Use `disableCaching()` to bypass caching for one request.

## Rate Limit Plugin

- Add `HasRateLimits` to a connector or request.
- Implement `resolveLimits()` and `resolveRateLimitStore()`.
- Stores called out by the docs include memory, file, Redis, Predis, PSR-16 cache, and Laravel cache stores.
- Saloon can enforce time-based limits and leaky-bucket limits.
- It can also watch for `429 Too Many Requests` and infer release timing from `Retry-After`.
- If rate limiting should wait instead of throw, use the documented sleep behavior on the limit.
- Laravel jobs can use the plugin's job middleware to release work back to the queue.

## XML Wrangler

- XML Wrangler is a first-party library from the Saloon team.
- It modernizes XML reading and writing and supports dot notation and XPath queries.
- Once installed, Saloon responses can use `xmlReader()`.
- The docs also point to XML Wrangler as a way to help generate XML request bodies.

## Lawman

- Lawman is a third-party Pest plugin for architecture tests around Saloon code.
- The docs describe expectations for connectors, requests, authentication, cache, pagination, properties, and rate limits.

## SDK Generator

- The Saloon SDK Generator is a third-party plugin maintained outside the Saloon core team.
- It can generate connectors, requests, and responses from an OpenAPI file or Postman collection.
- The docs call out these generator flags:
  - `--type`
  - `--name`
  - `--namespace`
  - `--output`
  - `--force`
  - `--dry`
  - `--zip`
- The docs note that it helps with the foundation of an SDK, but may not produce a complete finished SDK.

## Building Your Own Plugins

- Saloon plugins are traits with a `boot...` method such as `bootHasLogging`.
- Plugins can be attached to a connector or a request.
- The docs say plugins run before the regular `boot()` method.
- Avoid using `$this` inside the trait for request mutation; use `PendingRequest` as the source of truth.
- If the same plugin trait is attached to both the connector and the request, it will run twice.
