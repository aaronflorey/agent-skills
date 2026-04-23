# PSR Support

Source page: https://docs.saloon.dev/digging-deeper/psr-support

- Saloon exposes the PSR request and response from the wrapped `Response`.
- Override `handlePsrRequest(...)` when you truly need to mutate the PSR request before send.
- Prefer Saloon's higher-level APIs unless the integration specifically requires PSR-level access.
