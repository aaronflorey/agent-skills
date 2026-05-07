# useColorMode ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/composables/useColorMode.html

##### On this page

-   [Demo ​](#demo)
    

# useColorMode [​](#usecolormode)

`useColorMode` provides a convenient utility to adjust the global color theme of your application. You can also use it to target specific components by using a [template ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) or a selector. Bootstrap's default behavior dictates that color modes are applied to all children in the branch. `useColorMode` is simply a wrapper for the [vueuse](https://vueuse.org/core/useColorMode/#usecolormode) utility.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/composables/useColorMode/index.ts) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/composables/useColorMode.md)

## Demo [​](#demo)

Current color: light

HTML StackBlitz

vue

```
<template>
  <ClientOnly>
    <BCard ref="target">
      <BButton @click="changeColor"> Current color: {{ mode }} </BButton>
    </BCard>
  </ClientOnly>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useColorMode} from 'bootstrap-vue-next'
import {type BCard} from 'bootstrap-vue-next/components/BCard'

const target = ref<InstanceType<typeof BCard> | null>(null)

const mode = useColorMode({
  selector: target,
})

const changeColor = () => {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}
</script>
```
