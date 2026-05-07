# useToast ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/composables/useToast.html

##### On this page

-   [Setup ​](#setup)
    -   [BApp Component (Recommended) ​](#bapp-component-recommended)
        
    -   [Plugin Setup (Legacy) ​](#plugin-setup-legacy)
        
-   [Basic Usage ​](#basic-usage)
    -   [Create Options ​](#create-options)
        
    -   [Reactivity Within create ​](#reactivity-within-create)
        
    -   [Advanced usage ​](#advanced-usage)
        
-   [Programmatically Hiding a Toast ​](#programmatically-hiding-a-toast)
    
-   [Using promises ​](#using-promises)
    

# useToast [​](#usetoast)

The `useToast` composable allows you to create and manage toasts programmatically from anywhere in your application. It provides a simple API to show toast messages without needing to declare toast components in your templates.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/composables/useToast/index.ts) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/composables/useToast.md)

## Setup [​](#setup)

To use `useToast`, you need one of the following setup approaches:

### BApp Component (Recommended) [​](#bapp-component-recommended)

The easiest way is to wrap your application with the `BApp` component, which automatically sets up the orchestrator and registry:

template

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

## Basic Usage [​](#basic-usage)

Creating and showing a toast is simple:

Show

HTML StackBlitz

vue

```
<template>
  <BButton @click="create({title: 'Hello', body: 'World'})">Show</BButton>
</template>

<script setup lang="ts">
import {BButton, useToast} from 'bootstrap-vue-next'

const {create} = useToast()
</script>
```

The `create` method returns a `promise` that is resolved then the toast closes. You can give toast a unique id. Since `Toasts` are fluid and can move around a lot, returning the index at a given point in time is not ideal for as its position may be changed in the array. So, for use with the `remove` method, you need to give a unique identifier

### Create Options [​](#create-options)

The `create` method accepts an object with `BToast`’s props, `position`, `appendToast`, `component` and `slots`.

The `position` value affects placement; its type is [ContainerPosition](/bootstrap-vue-next/docs/types.html#containerposition).

Optional second argument can be passed to `create` to some options: `keep` and `resolveOnHide`. The `keep` option will keep the toast in the registry after it is hidden, allowing you to show it again without creating a new instance. The `resolveOnHide` option will resolve the promise returned by `create` when the toast is hidden, not after the hide has finished.

### Reactivity Within create [​](#reactivity-within-create)

`create` props property can accept a `MaybeRefOrGetter`, meaning that you can make properties reactive

Show

HTML StackBlitz

vue

```
<template>
  <BButton @click="showMe">Show</BButton>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from 'vue'
import {BButton, type ColorVariant, type OrchestratedToast, useToast} from 'bootstrap-vue-next'

const {create} = useToast()

const firstRef = ref<OrchestratedToast>({
  body: `${Math.random()}`,
})

let intervalId: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  intervalId = setInterval(() => {
    firstRef.value.body = `${Math.random()}`
  }, 1000)
})

onUnmounted(() => {
  if (intervalId !== undefined) {
    clearInterval(intervalId)
  }
})

const showMe = () => {
  create(
    computed(() => ({
      ...firstRef.value,
      variant: (Number.parseInt(firstRef.value.body?.charAt(2) ?? '0') % 2 === 0
        ? 'danger'
        : 'info') as ColorVariant,
    }))
  )
}
</script>
```

### Advanced usage [​](#advanced-usage)

Using props can work for most situations, but it leaves some finer control to be desired. For instance, you can add HTML to any `slot` value. This can either be an imported SFC or an inline render function. For reactivity, you must use a getter function.

Show

HTML StackBlitz

vue

```
<template>
  <BButton @click="showMe">Show</BButton>
</template>

<script setup lang="ts">
import {h, onMounted, onUnmounted, ref} from 'vue'
import {BButton, type OrchestratedToast, useToast} from 'bootstrap-vue-next'

const {create} = useToast()

const firstRef = ref<OrchestratedToast>({
  body: `${Math.random()}`,
})

let intervalId: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  intervalId = setInterval(() => {
    firstRef.value.body = `${Math.random()}`
  }, 1000)
})

onUnmounted(() => {
  if (intervalId !== undefined) {
    clearInterval(intervalId)
  }
})

const showMe = () => {
  create({
    body: firstRef.value.body,
    slots: {default: () => h('div', null, `custom! ${firstRef.value.body}`)},
  })
  // Demonstration pseudocode, you can also import a component and use it
  // const importedComponent = () => {
  //   create({
  //     component: import('./MyToastComponent.vue'),
  //   })
  // }
}
</script>
```

## Programmatically Hiding a Toast [​](#programmatically-hiding-a-toast)

Hiding a `Toast` programmatically is very simple. `create` returns an object that has functions to control the toast, including `destroy`

Show the Toast Hide the Toast

HTML StackBlitz

vue

```
<template>
  <BButtonGroup>
    <BButton
      variant="success"
      @click="showMe"
    >
      Show the Toast
    </BButton>
    <BButton
      variant="danger"
      @click="hideMe"
    >
      Hide the Toast
    </BButton>
  </BButtonGroup>
</template>

<script setup lang="ts">
import {BButton, BButtonGroup, useToast} from 'bootstrap-vue-next'

const {create} = useToast()

let toast: undefined | ReturnType<typeof create>

const showMe = () => {
  if (toast !== undefined) return
  // `create` returns a symbol
  toast = create({
    title: 'Showing',
    body: 'Toast is now showing',
    variant: 'success',
    position: 'bottom-center',
  })
}

const hideMe = () => {
  if (toast === undefined) return
  toast.destroy()
  toast = undefined // Reset to allow creating new toast
}
</script>
```

## Using promises [​](#using-promises)

Hiding a `Toast` with promise

Show the Toast

HTML StackBlitz

vue

```
<template>
  <BButtonGroup>
    <BButton
      variant="success"
      @click="promiseToast"
    >
      Show the Toast
    </BButton>
  </BButtonGroup>
</template>

<script setup lang="ts">
import {h} from 'vue'
import {BButton, BButtonGroup, useToast} from 'bootstrap-vue-next'

const {create} = useToast()

const promiseToast = () => {
  create(
    {
      variant: 'primary',
      position: 'middle-center',
      bodyClass: 'w-100',
      modelValue: true,
      slots: {
        default: ({hide}) => [
          h('h2', {class: 'text-center mb-3'}, 'Ready?'),
          h('div', {class: 'd-flex justify-content-center gap-2'}, [
            h(BButton, {onClick: () => hide('ok'), size: 'lg'}, () => 'Yes'),
            h(BButton, {onClick: () => hide('cancel'), size: 'lg'}, () => 'No'),
          ]),
        ],
      },
    },
    {resolveOnHide: true}
  ).then((r) => {
    if (r && typeof r === 'object' && 'ok' in r) {
      create({title: `you pressed: ${r.ok ? 'yes' : 'no'}`})
    }
  })
}
</script>
```
