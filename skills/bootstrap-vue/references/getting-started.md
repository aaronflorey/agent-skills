# Getting Started

Use this guide for first-time setup and bundle-shape questions.

## Install

- Core packages: `bootstrap` and `bootstrap-vue-next`.
- The extracted docs provide `pnpm`, `bun`, `yarn`, and `npm` install commands.
- Nuxt adds `@bootstrap-vue-next/nuxt`.

## Required Setup

- You must use either the `BApp` component or the `createBootstrap` plugin.
- Without one of them, internal services such as orchestrators, registries, and RTL support are not available.
- The docs recommend `BApp` for new projects.

## Recommended `BApp` Setup

```vue
<template>
  <BApp>
    <router-view />
  </BApp>
</template>

<script setup lang="ts">
import {BApp} from 'bootstrap-vue-next'
</script>
```

```ts
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
```

- `useToast()`, `useModal()`, and `usePopover()` cannot be called in the same component that declares `<BApp>`.
- Put `<BApp>` at least one component level above where those composables are used.

## Legacy Plugin Setup

```ts
import {createApp} from 'vue'
import {createBootstrap} from 'bootstrap-vue-next/plugins/createBootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const app = createApp(App)
app.use(createBootstrap())
app.mount('#app')
```

## Auto-Registration And Tree-Shaking

- `unplugin-vue-components` is the documented auto-import path for non-Nuxt apps.
- Use `BootstrapVueNextResolver()` to auto-register components and preserve tree-shaking.
- The resolver also supports aliases such as mapping `BInput` to `BFormInput`.

## Nuxt 3

- The Nuxt module handles component auto-registration and tree-shaking automatically.
- You still need `BApp` or the plugin approach for internal services.
- The module exposes `bootstrapVueNext` options for composables, directives, and CSS behavior.

## TypeScript And Optional Peers

- Optional peer dependencies are used for enhanced type definitions.
- The getting-started docs call out `@floating-ui/vue`, `@vueuse/core`, and `vue-router` for full type support in affected features.

## CDN

- The docs include both UMD and ESM CDN examples.
- Bootstrap and Vue must be loaded before BootstrapVueNext.
- The CDN examples use an explicit package version placeholder and warn not to omit the version.

## Tree-Shaking Notes

- With `BApp`, only the components and composables you use are included.
- With `createBootstrap`, individual plugins can be imported for smaller bundles.
- The docs say `bootstrapPlugin` is required if you choose the plugin installation method.
- CSS optimization is manual; the docs point to Bootstrap's lean Sass import guidance.

## Primary Source Pages

- `documentation/overview/bootstrap-vue-next-docs.md`
- `documentation/overview/bootstrap-vue-next-docs-components-app.md`
- `documentation/overview/bootstrap-vue-next-docs-configurations-global-options.md`
