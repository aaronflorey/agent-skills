# App ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/app.html

##### On this page

-   [Overview ​](#overview)
    
-   [Basic Usage ​](#basic-usage)
    
-   [Configuration ​](#configuration)
    -   [Setting Component Defaults ​](#setting-component-defaults)
        
    -   [Merging Defaults ​](#merging-defaults)
        
    -   [Custom Merge Function ​](#custom-merge-function)
        
-   [Orchestrator Configuration ​](#orchestrator-configuration)
    -   [Teleporting Orchestrators ​](#teleporting-orchestrators)
        
    -   [Disabling Orchestrators ​](#disabling-orchestrators)
        
    -   [Toast Configuration ​](#toast-configuration)
        
-   [RTL Support ​](#rtl-support)
    
-   [Migration from Plugins ​](#migration-from-plugins)
    -   [Before (Plugin-based) ​](#before-plugin-based)
        
    -   [After (BApp-based) ​](#after-bapp-based)
        
-   [Working with Composables ​](#working-with-composables)
    
-   [Backward Compatibility ​](#backward-compatibility)
    
-   [Testing Components ​](#testing-components)
    -   [Per-Test Plugin Setup ​](#per-test-plugin-setup)
        
    -   [Global Test Setup ​](#global-test-setup)
        
-   [Internal Features ​](#internal-features)
    
-   [Notes ​](#notes)
    
-   [Component Reference](#component-reference)
    -   [<BApp>](#b-app)
        -   [Properties](#)
            
        -   [Slots](#)
            

# App [​](#app)

The `BApp` component is the new recommended way to configure bootstrap-vue-next. It replaces the plugin-based approach and provides better defaults management, orchestrator integration, and improved type safety.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BApp/BApp.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/app.md)

## Overview [​](#overview)

`BApp` serves as the root component for your bootstrap-vue-next application, providing:

-   **Global defaults management** - Set and merge component defaults throughout your application
-   **Automatic orchestrator integration** - Built-in Modal, Toast, and Popover orchestrators
-   **Plugin compatibility** - Works alongside existing plugins for backward compatibility (see the [Backward Compatibility](#backward-compatibility) section for details)
-   **Type safety** - Full TypeScript support with proper type inference
-   **RTL support** - Built-in right-to-left language support
-   **Flexible teleporting** - Control where orchestrators are rendered in the DOM

## Basic Usage [​](#basic-usage)

vue

```
<template>
  <BApp>
    <!-- Your application content -->
    <router-view />
  </BApp>
</template>

<script setup lang="ts">
import {BApp} from 'bootstrap-vue-next'
</script>
```

## Configuration [​](#configuration)

### Setting Component Defaults [​](#setting-component-defaults)

You can provide global defaults for any bootstrap-vue-next component:

vue

```
<template>
  <BApp :defaults="appDefaults">
    <!-- Your application content -->
    <router-view />
  </BApp>
</template>

<script setup lang="ts">
import {BApp} from 'bootstrap-vue-next'

const appDefaults = {
  BButton: {
    variant: 'info' as const,
    size: 'lg' as const,
  },
  BModal: {
    centered: true,
    noCloseOnBackdrop: true,
  },
  BToast: {
    variant: 'success' as const,
    solid: true,
  },
}
</script>
```

### Merging Defaults [​](#merging-defaults)

By default, the `defaults` prop completely replaces any existing defaults. Use `mergeDefaults` to merge with parent or plugin defaults:

vue

```
<template>
  <BApp
    :defaults="appDefaults"
    :merge-defaults="true"
  >
    <!-- Your application content -->
  </BApp>
</template>

<script setup lang="ts">
import {BApp} from 'bootstrap-vue-next'

const appDefaults = {
  BButton: {
    variant: 'primary' as const, // This will merge with existing BButton defaults
  },
}
</script>
```

### Custom Merge Function [​](#custom-merge-function)

For advanced use cases, you can provide a custom merge function:

vue

```
<template>
  <BApp
    :defaults="appDefaults"
    :merge-defaults="customMerge"
  >
    <!-- Your application content -->
  </BApp>
</template>

<script setup lang="ts">
import {BApp} from 'bootstrap-vue-next'

const appDefaults = {
  BButton: {
    variant: 'primary' as const,
  },
}

const customMerge = (
  oldDefaults: Record<string, unknown>,
  newDefaults: Record<string, unknown>
): Record<string, unknown> => ({...oldDefaults, ...newDefaults})
</script>
```

## Orchestrator Configuration [​](#orchestrator-configuration)

### Teleporting Orchestrators [​](#teleporting-orchestrators)

By default, orchestrators render inline with your `BApp` component. Use `teleportTo` to render them elsewhere in the DOM:

template

```
<template>
  <BApp teleport-to="body">
    <!-- Orchestrators will render in document.body -->
    <router-view />
  </BApp>
</template>
```

### Disabling Orchestrators [​](#disabling-orchestrators)

If you don't need the built-in orchestrators (for example, if you're using custom implementations), you can disable them:

template

```
<template>
  <BApp :no-orchestrator="true">
    <!-- No automatic orchestrators will be created -->
    <router-view />
  </BApp>
</template>
```

### Toast Configuration [​](#toast-configuration)

Control how toasts are added to the list:

template

```
<template>
  <BApp :append-toast="true">
    <!-- New toasts will be appended to the end of the list -->
    <router-view />
  </BApp>
</template>
```

## RTL Support [​](#rtl-support)

`BApp` provides built-in right-to-left language support:

vue

```
<template>
  <BApp :rtl="rtlConfig">
    <!-- Your application content -->
    <router-view />
  </BApp>
</template>

<script setup lang="ts">
import {BApp} from 'bootstrap-vue-next'

const rtlConfig = {
  rtlInitial: true,
  localeInitial: 'ar',
}
</script>
```

## Migration from Plugins [​](#migration-from-plugins)

### Before (Plugin-based) [​](#before-plugin-based)

typescript

```
// main.ts
import {createApp} from 'vue'
import {createBootstrap} from 'bootstrap-vue-next'
import App from './App.vue'

const app = createApp(App)

app.use(
  createBootstrap({
    components: {
      BButton: {
        variant: 'primary',
      },
    },
  })
)

app.mount('#app')
```

### After (BApp-based) [​](#after-bapp-based)

vue

```
<!-- App.vue -->
<template>
  <BApp :defaults="{BButton: {variant: 'primary'}}">
    <router-view />
  </BApp>
</template>

<script setup lang="ts">
import {BApp} from 'bootstrap-vue-next'
</script>
```

typescript

```
// main.ts
import {createApp} from 'vue'
import App from './App.vue'

// Add the necessary CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const app = createApp(App)
app.mount('#app')
```

## Working with Composables [​](#working-with-composables)

When using `BApp`, the following composables work without requiring plugin installation:

-   [`useToast()`](/bootstrap-vue-next/docs/composables/useToast.html) - Create and manage toasts programmatically
-   [`useModal()`](/bootstrap-vue-next/docs/composables/useModal.html) - Create and manage modals programmatically
-   [`usePopover()`](/bootstrap-vue-next/docs/composables/usePopover.html) - Create and manage popovers programmatically

Vue Provide/Inject Limitation

Due to how Vue's provide/inject system works, composables like `useToast()`, `useModal()`, and `usePopover()` **cannot** be called in the same component that declares `<BApp>`. They rely on values provided by `BApp`, and Vue's inject only works in child components — not in the component that calls provide itself.

To use these composables, place `<BApp>` at least one component level above where the composables are called:

vue

```
<template>
  <BApp>
    <AppComposablesChild />
  </BApp>
</template>

<script setup lang="ts">
import { BApp } from 'bootstrap-vue-next'
import AppComposablesChild from './AppComposablesChild.vue'
</script>
```

vue

```
<template>
  <BButton @click="showToast">Show Toast</BButton>
  <BButton @click="showModal">Show Modal</BButton>
</template>

<script setup lang="ts">
import { BButton, useModal, useToast } from 'bootstrap-vue-next'

const toast = useToast()
const modal = useModal()

const showToast = () => {
  toast
    .create({
      title: 'Hello',
      body: 'This is a toast message!',
    })
    .show()
}

const showModal = () => {
  modal
    .create({
      title: 'Confirm Action',
      body: 'Are you sure you want to continue?',
    })
    .show()
}
</script>
```

## Backward Compatibility [​](#backward-compatibility)

The `BApp` component is fully backward compatible with existing plugin-based setups. You can gradually migrate by:

1.  Adding `BApp` to your root component
2.  Moving defaults from plugin configuration to `BApp` props
3.  Removing plugin installations once migration is complete

Migration Note

Plugins will show deprecation warnings but continue to work until removed in a future version, with the following exceptions:

-   `modalControllerPlugin`
-   `toastControllerPlugin`
-   `popoverControllerPlugin`

These plugins have been removed as of **version 0.40.0**. Please replace references to these with a reference to `orchestratorPlugin`.

## Testing Components [​](#testing-components)

When testing components that use composables like `useToast()`, `useModal()`, or `usePopover()`, you need to install the `createBootstrap` plugin so that the required context is provided. Without it, these composables will throw an error because they rely on Vue's provide/inject system.

### Per-Test Plugin Setup [​](#per-test-plugin-setup)

Install the plugin directly on the component you are testing:

typescript

```
// MyComponent.spec.ts
import {mount} from '@vue/test-utils'
import {createBootstrap} from 'bootstrap-vue-next'
import MyComponent from './MyComponent.vue'

test('mounts a component that uses useToast()', () => {
  const wrapper = mount(MyComponent, {
    global: {
      plugins: [createBootstrap()],
    },
  })
  expect(wrapper.text()).toContain('Show Toast')
})
```

### Global Test Setup [​](#global-test-setup)

To avoid repeating the plugin setup in every test, configure it globally in your test setup file:

typescript

```
// vitest.setup.ts (or in your test config)
import {config} from '@vue/test-utils'
import {createBootstrap} from 'bootstrap-vue-next'

config.global.plugins = [createBootstrap()]
```

Then reference this file in your Vitest configuration:

typescript

```
// vitest.config.ts
import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
  },
})
```

TIP

The `createBootstrap()` plugin registers the orchestrator, registry, and RTL services — the same services `BApp` provides. This is sufficient for mounting and rendering components that call `useToast()` and similar composables. You do not need to wrap your component in `BApp` during tests.

Mocking Composables

If you want to avoid executing real toast logic entirely, you can also mock the composable in your test:

typescript

```
import {vi} from 'vitest'

vi.mock('bootstrap-vue-next', async () => {
  const actual = await vi.importActual('bootstrap-vue-next')
  return {
    ...actual,
    useToast: () => ({
      create: vi.fn(),
      show: vi.fn(),
    }),
  }
})
```

## Internal Features [​](#internal-features)

The `BApp` component automatically provides several internal services:

-   **Show/Hide Registry** - Global registry for show/hide components
-   **Modal Manager** - Stack management for multiple modals
-   **Breadcrumb Service** - Global breadcrumb item management
-   **RTL Service** - Right-to-left text direction support

## Notes [​](#notes)

-   Only one `BApp` component should be active at a time per application
-   The component uses Vue's provide/inject system for dependency injection
-   All orchestrators are automatically teleported when `teleportTo` is specified
-   The component inherits all attributes and passes them to the default slot

## Component Reference

### `<BApp>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BApp/BApp.vue)

-   [<BApp> Properties](#comp-reference-bapp-properties)
-   [<BApp> Slots](#comp-reference-bapp-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.app`

##### [Properties](#comp-reference-bapp-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| append-toast | `boolean` | `false` | Appends toast notifications to the end of the list instead of beginning. |
| defaults | `Partial<BvnComponentProps> | Ref<Partial<BvnComponentProps>>` | `undefined` | Default props for components. Can be a plain object or a ref. |
| merge-defaults | `boolean | ((oldDefaults: Partial<BvnComponentProps>, newDefaults: Partial<BvnComponentProps>) => Partial<BvnComponentProps>)` | `true` | If \`true\`, performs a shallow merge with existing defaults (if \`false\`, replaces them). If a function, it receives (oldDefaults, newDefaults) and must return the merged defaults. |
| no-orchestrator | `boolean` | `false` | If \`true\`, disables the orchestration layer (Modal/Toast/Popover controllers) inside BApp. |
| rtl | `boolean | { rtlInitial?: boolean; localeInitial?: string }` | `false` | If \`true\`, enables RTL. If an object, you can set initial RTL state and locale. If \`false\`, disables RTL. |
| teleport-to | `string | Element | null | undefined` | `null` | Specifies the element to which the toasts, modals and popovers should be teleported. This is useful if you want to move them to a different part of the DOM. |

##### [Slots](#comp-reference-bapp-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | App content. Attributes on <BApp> are forwarded to this slot. |
