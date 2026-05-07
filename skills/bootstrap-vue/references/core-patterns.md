# Core Patterns

Use this guide for the recurring patterns the docs emphasize across BootstrapVueNext.

## Root Application Pattern

- `BApp` is the recommended root wrapper.
- It provides defaults management, orchestrator integration, RTL support, and teleport control.
- Only one `BApp` should be active at a time per application.

## Legacy Plugin Pattern

- `createBootstrap` remains supported.
- It provides the same service layer needed by components and composables.
- The docs present it as the backward-compatible path rather than the preferred one for new apps.

## Programmatic UI Pattern

- `useModal`, `useToast`, and `usePopover` expose programmatic APIs.
- These composables depend on `BApp` or the plugin setup.
- `useModal` focuses on create/show/hide flows and promise-based results.
- `useToast` focuses on create/show/hide flows, placement, reuse, and promise resolution.
- `useToggle` can target nearby toggleable components or a specific target id.

## Directive Pattern

- Directives are available for color mode, modal triggers, popovers, toggles, and tooltips.
- The directives catalog says directives may be auto-registered depending on installation method.
- When imported manually, directive names are exposed with the `v-` prefix.

## Defaults And Global Configuration

- `BApp` accepts `defaults` and `merge-defaults` for component defaults.
- The global options docs also show `createBootstrap({components: ...})` for default prop values.
- The special `global` key can apply a prop default across components.
- Global configurations do not apply to `modelValues`.

## Styling Pattern

- Bootstrap classes remain the main styling surface.
- For components without a Bootstrap-owned trigger class, BootstrapVueNext may add its own class, such as `b-form-group`.
- The customizing-styles docs say component reference pages include selector guidance.
- Theme changes are handled through Bootstrap customization, Sass variables/maps, and custom CSS.

## Router And Link Pattern

- `BLink` is the common building block for router-aware links.
- Other components can also support router link generation, but not all link props are available on every component.
- The router links reference covers `to`, `replace`, active class props, exact matching props, and Nuxt-specific prefetch props.

## Type Pattern

- The docs describe the library as a rewrite that strives for full TypeScript compatibility.
- Shared exported types include values for alignment, variants, placements, table fields/items/providers, router-related values, and option shapes.
- The reference docs also call out type-safe options support for select, radio, checkbox, and datalist-style option APIs.

## High-Value Detailed Pages

- `documentation/overview/bootstrap-vue-next-docs-components-app.md`
- `documentation/overview/bootstrap-vue-next-docs-composables-usemodal.md`
- `documentation/overview/bootstrap-vue-next-docs-composables-usetoast.md`
- `documentation/overview/bootstrap-vue-next-docs-directives.md`
- `documentation/overview/bootstrap-vue-next-docs-reference-router-links.md`
- `documentation/overview/bootstrap-vue-next-docs-types.md`
