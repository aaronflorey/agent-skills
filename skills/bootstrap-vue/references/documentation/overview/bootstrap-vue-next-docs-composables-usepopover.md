# usePopover ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/composables/usePopover.html

##### On this page

-   [Setup ​](#setup)
    -   [BApp Component (Recommended) ​](#bapp-component-recommended)
        
    -   [Plugin Setup (Legacy) ​](#plugin-setup-legacy)
        
-   [Creating Popovers ​](#creating-popovers)
    -   [Reactivity Within popover and tooltip ​](#reactivity-within-popover-and-tooltip)
        
    -   [Advanced Creation ​](#advanced-creation)
        
    -   [Return Value ​](#return-value)
        
    -   [Lifecycle ​](#lifecycle)
        

# usePopover [​](#usepopover)

The `usePopover` composable allows you to create and control popovers and tooltips dynamically from anywhere in your application. It provides methods to create, show, hide, and manage both popovers and tooltips programmatically.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/composables/usePopover/index.ts) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/composables/usePopover.md)

## Setup [​](#setup)

To use `usePopover`, you need one of the following setup approaches:

### BApp Component (Recommended) [​](#bapp-component-recommended)

The easiest way is to wrap your application with the `BApp` component, which automatically sets up the orchestrator and registry:

vue

```
<template>
  <BApp>
    <router-view />
  </BApp>
</template>
```

### Plugin Setup (Legacy) [​](#plugin-setup-legacy)

Alternatively, you can use the traditional plugin approach.

Note: As of v0.40, there are no separate toast/modal/popover controller plugins. If you stick with plugins, use the single `orchestratorPlugin` (or prefer `BApp`).

Note: If not using `<BApp>`, you must have initialized the createBootstrap plugin for this to work properly. Read [here](/bootstrap-vue-next/docs#plugin-approach-legacy)

## Creating Popovers [​](#creating-popovers)

Popovers and tooltips can be created using the `popover` or `tooltip` methods:

Hover me

HTML StackBlitz

vue

```
<template>
  <BButton ref="popoverButton">Hover me</BButton>
</template>

<script setup lang="ts">
import {type ComponentPublicInstance, onMounted, ref} from 'vue'
import {usePopover} from 'bootstrap-vue-next'

const {popover} = usePopover()
const popoverButton = ref<ComponentPublicInstance>()

onMounted(() => {
  popover({title: 'Hello World!', body: 'This is a popover.', target: popoverButton.value})
})
</script>
```

### Reactivity Within `popover` and `tooltip` [​](#reactivity-within-popover-and-tooltip)

The methods accept reactive properties using `MaybeRef`, allowing dynamic updates to the popover content.

Hover me

HTML StackBlitz

vue

```
<template>
  <BButton ref="reactiveExample">Hover me</BButton>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
import {BButton, usePopover} from 'bootstrap-vue-next'

const {tooltip} = usePopover()

const title = ref('Hello')
const reactiveExample = ref<HTMLElement>()
let intervalId: NodeJS.Timeout | undefined

onMounted(() => {
  intervalId = setInterval(() => {
    title.value = title.value === 'Hello' ? 'World' : 'Hello'
  }, 2500)

  tooltip({
    title,
    target: reactiveExample.value,
  })
})

onUnmounted(() => {
  if (intervalId !== undefined) {
    clearInterval(intervalId)
  }
})
</script>
```

### Advanced Creation [​](#advanced-creation)

For more control, you can use the `component` property to render a custom component or the `slots` property to define slot content dynamically.

Hover me

HTML StackBlitz

vue

```
<template>
  <BButton ref="advancedExample">Hover me</BButton>
</template>

<script setup lang="ts">
import {h, onMounted, ref} from 'vue'
import {BButton, usePopover} from 'bootstrap-vue-next'

const {popover} = usePopover()
const advancedExample = ref<HTMLElement>()

onMounted(() => {
  popover({
    slots: {
      default: (scope) => h('div', null, `Custom content - Visible: ${scope.visible}`),
    },
    target: advancedExample.value,
    title: 'Advanced Popover',
  })
})
</script>
```

### Return Value [​](#return-value)

The `popover` and `tooltip` methods return an awaitable controller `PromiseWithComponent`. You can call its methods immediately to control the instance, and you can also `await` it to resolve when the popover/tooltip is hidden. The controller exposes:

-   `show: () => PromiseWithComponent` - Shows the popover.
-   `hide: (trigger?: string) => PromiseWithComponent` - Hides the popover, optionally passing a trigger.
-   `toggle: () => PromiseWithComponent` - Toggles the visibility of the popover.
-   `get: () => PopoverOrchestratorParam | undefined` - Returns the current properties of the popover, or undefined if none.
-   `set: (props: Partial<PopoverOrchestratorParam>) => PromiseWithComponent` - Updates the popover's properties.
-   `destroy: () => void` - Destroys the popover and cleans up resources.

### Lifecycle [​](#lifecycle)

By default, the popover is destroyed when the current scope is exited. You can manually destroy it using the `destroy` method.

ts

```
const pop = popover({title: 'Hello World!'})
pop.show()
// do something
pop.destroy()
```

Alternatively, use `await using` in TypeScript 5.2+ to automatically destroy the popover when the scope is exited.

ts

```
await using pop = popover({ title: 'Hello World!' })
```
