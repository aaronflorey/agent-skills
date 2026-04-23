# Standalone SDK Guidance

Source pages:
- https://docs.saloon.dev/digging-deeper/building-sdks
- https://docs.saloon.dev/installable-plugins/laravel-integration
- https://docs.saloon.dev/installable-plugins/caching-responses
- https://docs.saloon.dev/installable-plugins/handling-rate-limits

Use this file first when building a reusable API client or SDK package.

## Core Rules

- Build the package around a Saloon `Connector`.
- Keep endpoints in dedicated request classes.
- Use resource classes when the API has natural groupings and the SDK surface would otherwise sprawl.
- Design for expansion: prefer stable resource namespaces, typed auth objects, typed DTOs, and targeted exception classes over flat utility helpers.

## DTOs And Typing

- Always map responses into strongly typed DTOs.
- Prefer `github.com/Crell/Serde` for DTO serialization and hydration.
- If a request needs more than 2 or 3 constructor parameters, or the call site becomes noisy, introduce a typed input DTO.
- Keep request constructors and resource methods fully typed.
- Add docblocks anywhere generics are needed, such as typed collections or paginator item types.
- Follow the nearby `php-pro` skill for stricter typing guidance when it is available.

## Authentication

- If the upstream API supports auth, the SDK must support it.
- Let developers pass strongly typed auth data instead of arrays.
- Keep auth setup on the connector or in a dedicated auth factory so it can be reused consistently.

## Middleware, Caching, And Rate Limits

- Let consumers register their own middleware.
- Make caching optional. Accept a caller-supplied cache implementation instead of hard-coding one.
- Add rate limiting for APIs that publish limits or return `429` responses.
- Support pagination whenever the upstream API supports it.

## Exceptions

- Add one package-level base exception, such as `ApiClientException`.
- Add targeted exceptions for common failures, such as authentication, authorization, validation, or rate-limit failures.
- Carry the originating request and response on exceptions so callers can inspect failure context.
- Fall back to the base exception when the error does not match a more specific type.

## Tests

- Test through Saloon's mock tools, not the live API.
- Cover DTO mapping, auth behavior, failure handling, pagination, middleware hooks, and retry or rate-limit behavior.

## Optional Laravel Package Layer

- Keep Laravel support optional and isolated in its own namespace.
- Add the Saloon Laravel plugin as an optional dependency.
- Provide a facade, config, and service provider wiring.
- Use `spatie/laravel-package-tools` to register config, bindings, commands, and package metadata.
- Wrap the SDK in a Laravel-facing factory or manager so optional concerns like cache stores and middleware can be composed cleanly.
