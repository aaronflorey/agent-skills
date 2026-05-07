# useToggle ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/composables/useToggle.html

##### On this page

-   [Promise Flow ​](#promise-flow)
    

# useToggle [​](#usetoggle)

You can use `useToggle` to get the closest toggleable component in **child component** and show,hide or toggle it. It can also be supplied a target id to show, hide or toggle a specific component

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/composables/useToggle/index.ts) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/composables/useToggle.md)

vue

```
<BModal @hide="(e) => e.trigger === 'sometrigger' && doSomething()">
  <MyComponent />
</BModal>
```

* * *

MyComponent.vue

vue

```
<template>
  <BButton @click="hide('sometrigger')">Done</BButton>
</template>

<script setup lang="ts">
const {hide} = useToggle()
</script>
```

You can also provide an id to get particular component and show/hide it. Currently, we do not support using CSS selector to find modal since the component in lazy mode may not render at page initial. If the modal component does not exist and you attempt to call any of the exposed methods, the methods will safely no-op without throwing errors.

Click me

HTML StackBlitz

vue

```
<template>
  <BButton @click="show()">Click me</BButton>
  <BModal
    v-if="someConditions"
    id="my-modal"
    v-model="programmaticModal"
  >
    <BButton @click="hide()">Hide me</BButton>
  </BModal>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {BButton, BModal, useToggle} from 'bootstrap-vue-next'

const someConditions = ref(false)
const programmaticModal = ref(false)

onMounted(() => {
  someConditions.value = true
})

const {show, hide} = useToggle('my-modal')
</script>
```

## Promise Flow [​](#promise-flow)

The `show` and `toggle` methods take a boolean argument to control wether to resolve the promise on show (`false`) or on hide (`true`). On `show` the promise resolves to `true` when shown and to `'show-prevented'` if show is prevented. On `hide` the promise resolves to the trigger that caused the hide event. The promise can be awaited to get the result.

Click me

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton @click="testToggle">Click me</BButton>
    <BModal id="toggleTest"> content </BModal>
    <span v-if="reason !== ''" class="mx-3">Close reason: {{ reason }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToggle } from 'bootstrap-vue-next'

const toggle = useToggle('toggleTest')
const reason = ref('')

async function testToggle() {
  const e = await toggle.show(true)
  if (e === 'ok') {
    console.log('ok pressed')
  } else {
    console.log('closed with', e)
  }
  reason.value = String(e)
}
</script>
```
