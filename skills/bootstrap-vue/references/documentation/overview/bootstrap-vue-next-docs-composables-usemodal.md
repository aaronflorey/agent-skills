# useModal ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/composables/useModal.html

##### On this page

-   [Setup ​](#setup)
    -   [BApp Component (Recommended) ​](#bapp-component-recommended)
        
    -   [Plugin Setup (Legacy) ​](#plugin-setup-legacy)
        
-   [Creating Modals ​](#creating-modals)
    -   [Reactivity Within create ​](#reactivity-within-create)
        
    -   [Advanced Creation ​](#advanced-creation)
        
    -   [Return Value ​](#return-value)
        
    -   [Lifecycle ​](#lifecycle)
        
-   [Globally Hiding Modals ​](#globally-hiding-modals)
    

# useModal [​](#usemodal)

The `useModal` composable provides a powerful API to create, manage, and control modals programmatically from anywhere in your application. It allows you to create modals on-demand, manage existing modals, and handle modal interactions through promises.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/composables/useModal/index.ts) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/composables/useModal.md)

## Setup [​](#setup)

To use `useModal`, you need one of the following setup approaches:

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

Note: If not using `<BApp>`, you must have initialized the createBootstrap plugin for this to work properly. Read [here](/bootstrap-vue-next/docs#plugin-approach-legacy)

## Creating Modals [​](#creating-modals)

Creating a modal is done through the `create` method:

Click me

HTML StackBlitz

vue

```
<template>
  <BButton @click="showExample">Click me</BButton>
</template>

<script setup lang="ts">
import {BButton, useModal} from 'bootstrap-vue-next'

const {create} = useModal()

const showExample = async () => {
  const value = await create({title: 'Hello World!'}).show()

  if (value && typeof value === 'object' && 'ok' in value && 'trigger' in value) {
    create({
      body: `Promise resolved to object with {ok: ${value.ok}, trigger: ${value.trigger}}`,
    }).show()
  }
}
</script>
```

### Reactivity Within `create` [​](#reactivity-within-create)

`create` props property can accept a `MaybeRef`, meaning that you can make properties reactive

Click me

HTML StackBlitz

vue

```
<template>
  <BButton @click="showReactiveExample">Click me</BButton>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
import {BButton, useModal} from 'bootstrap-vue-next'

const {create} = useModal()

const title = ref('Hello')
let intervalId: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  intervalId = setInterval(() => {
    title.value = title.value === 'Hello' ? 'World' : 'Hello'
  }, 2500)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const showReactiveExample = () => {
  create({
    title,
  }).show()
}
</script>
```

### Advanced Creation [​](#advanced-creation)

Using props can work for most situations, but it leaves some finer control to be desired. For instance, you cannot add HTML to any slot value using props alone. This is where the `component` property comes into play. Using the `component` property, you can input the component to render. This can either be an imported SFC or an inline render function.

You can also use component slots to render what you want. This is done through the `slots` property. The `slots` property is an object that contains the slot name as the key and a render function or component as the value. The render function is passed a `scope` object that contains the slots scope.

Click me

HTML StackBlitz

vue

```
<template>
  <BButton @click="showMeAdvancedExample">Click me</BButton>
</template>

<script setup lang="ts">
import {h, onMounted, onUnmounted, ref} from 'vue'
import {BButton, useModal} from 'bootstrap-vue-next'

const {create} = useModal()

const firstRef = ref({
  body: `${Math.random()}`,
})
let intervalId: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  intervalId = setInterval(() => {
    firstRef.value.body = `${Math.random()}`
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const showMeAdvancedExample = () => {
  create({
    slots: {
      default: (scope) => h('div', null, `custom ${firstRef.value.body} - ${scope.visible}`),
    },
  }).show()

  // Demonstration pseudocode, you can import a component and use it
  // const importedComponent = () => {
  //   create({
  //     component: (await import('./TestModal.vue')).default,
  //   })
  // }
}
</script>
```

### Return Value [​](#return-value)

The `create` method returns a promise that resolves after the modal has been hidden to a `BvTriggerableEvent` object. Using the `resolveOnHide` option (in the second argument), the promise resolves at the time the modal begins hiding, rather than after it is fully hidden.

js

```
const value = await create({title: 'Hello World!'}, {resolveOnHide: true})
```

This object contains the following properties:

-   `ok: boolean`
    
    Clicking the `ok` button resolve this to `true`, `cancel` to `false` and any other closable action `null` (clicking the backdrop, or some other custom closing action. More accurately, when the `hide` function does not pass in the trigger parameter of `ok` or `cancel`)
    
-   `trigger: string | null`
    
    This is the trigger that closed the modal. This is useful for determining what action closed the modal.
    

The promise also contains functions to control the modal:

-   `show: () => void`
    
    This function shows the modal.
    
-   `hide: (trigger?: string) => void`
    
    This function hides the modal. If a trigger is passed, it will be passed to the `trigger` property of the resolved promise
    
-   `toggle: () => void`
    
    This function toggles the visibility of the modal.
    
-   `set: (props: Partial<ModalOrchestratorParam>) => void`
    
    This function sets the props of the modal. This is useful for updating the modal after it has been created.
    
-   `destroy: () => Promise<void>`
    
    This function destroys the modal and cleans up any resources associated with it.
    

### Lifecycle [​](#lifecycle)

By default, the modal is destroyed once it's closed. If you want to keep the modal, use the `keep` option in the second argument of the `create` method. The modal is destroyed when the current scope is exited. You can also destroy it manually by calling the `destroy` method.

js

```
const modal = create({title: 'Hello World!'}, {keep: true})
modal.show()
// do something
modal.destroy()
```

We also support the typescript feature `await using` to automatically destroy the modal when the scope is exited.

js

```
await using modal = create({title: 'Hello World!'})
```

## Globally Hiding Modals [​](#globally-hiding-modals)

In addition to creating modals in a global context, you can also hide modals from anywhere in the app. This feature does not require an orchestrator component to be present.

Open First Modal

HTML StackBlitz

vue

```
<template>
  <BButton @click="nestedModal1 = !nestedModal1">Open First Modal</BButton>

  <BModal
    v-model="nestedModal1"
    title="First Modal"
    ok-only
  >
    <p class="my-2">First Modal</p>
    <BButtonGroup>
      <BButton @click="nestedModal2 = !nestedModal2">Open Second Modal</BButton>
      <BButton @click="() => hide()">Hide Last</BButton>
      <BButton @click="() => hideAll()">Hide All</BButton>
    </BButtonGroup>
  </BModal>
  <BModal
    v-model="nestedModal2"
    title="Second Modal"
    ok-only
  >
    <p class="my-2">Second Modal</p>
    <BButtonGroup>
      <BButton
        size="sm"
        @click="nestedModal3 = !nestedModal3"
        >Open Third Modal</BButton
      >
      <BButton @click="() => hide()">Hide Last</BButton>
      <BButton @click="() => hideAll()">Hide All</BButton>
    </BButtonGroup>
  </BModal>
  <BModal
    v-model="nestedModal3"
    title="Third Modal"
    ok-only
  >
    <p class="my-1">Third Modal</p>
    <BButtonGroup>
      <BButton @click="() => hide()">Hide Last</BButton>
      <BButton @click="() => hideAll()">Hide All</BButton>
    </BButtonGroup>
  </BModal>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {BButton, BButtonGroup, BModal, useModal} from 'bootstrap-vue-next'

const nestedModal1 = ref(false)
const nestedModal2 = ref(false)
const nestedModal3 = ref(false)

const {hide, hideAll} = useModal()
</script>
```
