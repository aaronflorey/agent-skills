---
name: php-saloon
description: Use this skill when building or debugging PHP API integrations and SDKs with Saloon, including connectors, requests, authentication, request bodies, testing, pagination, Laravel integration, and Saloon plugin workflows.
version: 1.0.0
source: https://docs.saloon.dev/
license: MIT
---

# php-saloon

Use this skill when building or debugging PHP API integrations and SDKs with Saloon, including connectors, requests, authentication, request bodies, testing, pagination, Laravel integration, and plugin workflows.

## Rules

### Standalone API Clients

- Start with `references/standalone-sdk-guidance.md` and `references/building-sdks.md`.
- Build the SDK around a Saloon `Connector`, and keep it easy to expand with resource classes, request classes, and strongly typed DTOs.
- Always use strongly typed DTOs for responses. Prefer `github.com/Crell/Serde` for response DTO serialization.
- If a request needs more than 2 or 3 parameters, or a DTO materially improves DX, use a typed DTO instead of a long parameter list.
- Everything must be strongly typed. Follow the nearby `php-pro` skill for PHP typing expectations when it is available.
- Add docblocks anywhere generics are required.
- If the API supports authentication, add it. Let developers pass strongly typed auth details instead of loose arrays.
- Always support pagination if the API supports it.
- Always add rate limiting.
- Support caching as an optional dependency, and let developers pass their own cache implementation.
- Let developers register their own middleware.
- Add custom exceptions, with a base SDK exception plus specific exceptions for common failures.
- Put the request and response on exceptions so developers can inspect them.
- Always write tests without hitting the real API.

### Laravel Support

- Keep Laravel support optional and isolated in its own namespace.
- Add the Laravel plugin as an optional dependency.
- Implement a facade and config.
- Auto-wire the SDK through a wrapper class that applies optional concerns like auth, caching, and middleware composition.
- Use `spatie/laravel-package-tools` for package wiring.

## References

- Read `references/index.md` for the full page-by-page map.
- Read `references/standalone-sdk-guidance.md` before designing a standalone client or package.
- Read `references/connectors.md`, `references/requests.md`, and `references/sending-requests.md` before writing core Saloon code.
- Read `references/data-transfer-objects.md`, `references/middleware.md`, `references/building-sdks.md`, and `references/laravel-integration.md` before building an SDK package.
- Read `references/testing.md`, `references/handling-failures.md`, and `references/handling-rate-limits.md` before shipping production integrations.
