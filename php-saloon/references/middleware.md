# Middleware

Source page: https://docs.saloon.dev/digging-deeper/middleware

- `boot(PendingRequest $pendingRequest)` runs every time a request is sent.
- Request middleware mutates the pending request before send.
- Response middleware receives the `Response` after send.
- Request middleware can short-circuit by returning a fake response.
- Avoid registering middleware from inside middleware, and be careful with non-static closures in long-lived processes.
