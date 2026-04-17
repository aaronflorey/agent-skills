# Handling Rate Limits

Source page: https://docs.saloon.dev/installable-plugins/handling-rate-limits

- Use `HasRateLimits` and implement limit and store resolution.
- The docs call out memory, file, Redis, Predis, PSR-16 cache, and Laravel cache-backed stores.
- Saloon can enforce time-based and leaky-bucket limits.
- It can also react to `429` responses and `Retry-After` headers.
- Standalone SDKs should include rate-limit handling whenever the API exposes limits.
