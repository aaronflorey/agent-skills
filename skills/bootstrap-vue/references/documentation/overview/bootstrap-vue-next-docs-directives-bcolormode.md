# BColorMode ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/directives/BColorMode.html

##### On this page

-   [Demo ​](#demo)
    

# BColorMode [​](#bcolormode)

The BColorMode directive has a similar result to the useColorMode utility, but provides more low level access than the composable

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/directives/BColorMode/index.ts) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/directives/BColorMode.md)

The `BColorMode` directive is similar to [useColorMode](./../composables/useColorMode.html) but provides a more low level directive for placement on individual components. It is useful when you want to make an element have one color mode, but do not want the overhead of the composable variant.

## Demo [​](#demo)

Current color: dark

HTML

vue

```
<template>
  <BCard v-b-color-mode="currentColor">
    <BButton @click="changeColor"> Current color: {{ currentColor }} </BButton>
  </BCard>
</template>

<script setup lang="ts">
import {vBColorMode} from 'bootstrap-vue-next/directives/BColorMode'

// Unlike the composable variant, this is not strongly typed by default!
const currentColor = ref<'light' | 'dark'>('dark')

const changeColor = () => {
  currentColor.value = currentColor.value === 'dark' ? 'light' : 'dark'
}
</script>
```
