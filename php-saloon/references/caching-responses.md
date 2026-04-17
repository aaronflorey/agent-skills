# Caching Responses

Source page: https://docs.saloon.dev/installable-plugins/caching-responses

- Add `Cacheable` and `HasCaching` to a connector or request.
- Implement cache driver resolution and expiry.
- Documented drivers include PSR cache, Flysystem, and Laravel cache support.
- Caching is best treated as optional package infrastructure, with the cache implementation supplied by the consumer when possible.
