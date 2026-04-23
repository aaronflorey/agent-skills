# Retrying Requests

Source page: https://docs.saloon.dev/digging-deeper/retrying-requests

- Configure retries with the public `$tries` property.
- Configure wait intervals with `$retryInterval`.
- Exponential backoff is supported.
- Retries apply to synchronous requests, not async sends or pools.
- Use retries deliberately alongside rate-limit handling so the package does not fight the upstream API.
