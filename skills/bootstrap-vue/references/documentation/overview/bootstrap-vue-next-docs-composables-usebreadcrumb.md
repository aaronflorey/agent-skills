# useBreadcrumb ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/composables/useBreadcrumb.html

##### On this page

-   [Demo ​](#demo)
    

# useBreadcrumb [​](#usebreadcrumb)

`useBreadcrumb` is a helper utility for the `BBreadcrumb` component. It provides a **globally** changable context so you can modify a breadcrumb. It should be noted that the breadcrumb component will automatically use the global context by default. `useBreadcrumb` is shared globally, one modification to the state will be recognized throughout the app. As noted in the BBreadcrumb documentation, the items prop for the component takes precedence over `useBreadcrumb`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/composables/useBreadcrumb/index.ts) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/composables/useBreadcrumb.md)

Note: If not using `<BApp>`, you must have initialized the createBootstrap plugin for this to work properly. Read [here](/bootstrap-vue-next/docs#plugin-approach-legacy)

## Demo [​](#demo)

AddClear

HTML StackBlitz

vue

```
<template>
  <BBreadcrumb />

  <BFormInput
    v-model="inputValue"
    class="my-3"
  />

  <BButton
    class="me-2"
    @click="addItem"
    >Add</BButton
  >
  <BButton
    variant="danger"
    @click="breadcrumb.reset"
    >Clear</BButton
  >
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {BBreadcrumb, BButton, BFormInput, useBreadcrumb} from 'bootstrap-vue-next'

const breadcrumb = useBreadcrumb()

const inputValue = ref('')

const addItem = () => {
  if (breadcrumb.items?.value) {
    breadcrumb.items.value.push(inputValue.value)
  }
  inputValue.value = ''
}
</script>
```

You can also pass in an id to the component and composable to create a unique breadcrumb trail.

AddClear

HTML StackBlitz

vue

```
<template>
  <BBreadcrumb id="foobar" />

  <BFormInput
    v-model="inputValue"
    class="my-3"
  />

  <BButton
    class="me-2"
    @click="addItem"
    >Add</BButton
  >
  <BButton
    variant="danger"
    @click="breadcrumb.reset"
    >Clear</BButton
  >
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {BBreadcrumb, BButton, BFormInput, useBreadcrumb} from 'bootstrap-vue-next'

// Input matches the id passed to the component
const breadcrumb = useBreadcrumb('foobar')

const inputValue = ref('')

const addItem = () => {
  breadcrumb.items.value.push(inputValue.value)
  inputValue.value = ''
}
</script>
```
