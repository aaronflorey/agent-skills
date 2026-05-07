# Integrations And Plugins

Use this guide for framework integration, auto-import, routing, and ecosystem setup questions.

## `BApp` Versus `createBootstrap`

- `BApp` is the recommended setup path.
- `createBootstrap` is still supported for legacy and plugin-based setups.
- Both approaches are documented as valid for application mounting and unit testing.

## Auto-Import In Vite

- The docs recommend `unplugin-vue-components` for automatic component registration.
- Use `BootstrapVueNextResolver()` from `bootstrap-vue-next/resolvers`.
- The resolver also supports alias mappings.

## Nuxt 3

- `@bootstrap-vue-next/nuxt` handles component auto-registration and tree-shaking.
- You still need `BApp` or the plugin approach for internal services.
- The module supports `bootstrapVueNext` options for composables, directives, and CSS inclusion.
- The migration guide also calls out Nuxt 3 integration and points readers to Nuxt migration guidance plus the router links reference.

## Router Integration

- Several components can render router-aware links.
- The router links reference uses `BLink` as the baseline example.
- Supported topics in the extracted docs include `to`, `replace`, `router-tag`, active-class behavior, exact matching props, and Nuxt-specific `prefetch` / `no-prefetch` props.
- The reference warns that changing the rendered tag away from `<a>` is discouraged for accessibility and SEO reasons.

## Icons

- BootstrapVue icon components are documented as deprecated.
- The icons guide recommends `unplugin-icons` as the modern path.
- The preferred setup combines `unplugin-icons` with `unplugin-vue-components` and automatic tree-shaking.
- A slimmer manual-import setup is also documented for Bootstrap Icons only.

## TypeScript-Related Integrations

- The getting-started docs call out optional peer dependencies for full type coverage.
- The extracted docs specifically mention `@floating-ui/vue`, `@vueuse/core`, and `vue-router`.

## Reference Pages

- `documentation/overview/bootstrap-vue-next-docs.md`
- `documentation/overview/bootstrap-vue-next-docs-reference-router-links.md`
- `documentation/overview/bootstrap-vue-next-docs-icons.md`
- `documentation/overview/bootstrap-vue-next-docs-migration-guide.md`
