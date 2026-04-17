# Building SDKs

Source page: https://docs.saloon.dev/digging-deeper/building-sdks

- Saloon recommends using the connector as the root SDK class.
- A minimal SDK can be a connector plus request classes.
- For a more discoverable API, expose methods on the connector or group endpoints into resource classes built on `BaseResource`.
- Custom response classes are supported when you want richer return types.
- Read this together with `standalone-sdk-guidance.md`, which adds stronger package rules for typing, caching, Laravel support, and exceptions.
