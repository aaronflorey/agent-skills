# Concurrency And Pools

Source page: https://docs.saloon.dev/digging-deeper/concurrency-and-pools

- Use connector pools for concurrent request execution.
- Supported concurrent senders in the docs are `GuzzleSender` and `HttpSender`.
- The default concurrency is 5 unless you change it.
- Use response and exception handlers to process results consistently.
- Pools are useful for SDK batch operations, but keep response typing and exception mapping predictable.
