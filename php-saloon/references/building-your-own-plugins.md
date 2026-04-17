# Building Your Own Plugins

Source page: https://docs.saloon.dev/installable-plugins/building-your-own-plugins

- Saloon plugins are trait-based and usually expose a `boot...` method.
- Plugins can be attached to either connectors or requests.
- Plugin boot methods run before the regular `boot()` method.
- Use `PendingRequest` as the source of truth for request mutation rather than relying on trait state.
