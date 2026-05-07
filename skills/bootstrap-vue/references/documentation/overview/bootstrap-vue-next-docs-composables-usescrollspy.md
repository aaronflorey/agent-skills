# useScrollspy ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/composables/useScrollspy.html

##### On this page

-   [Basic Usage ​](#basic-usage)
    
-   [Manual Mode ​](#manual-mode)
    
-   [Custom Content Query ​](#custom-content-query)
    
-   [Configuration Options ​](#configuration-options)
    
-   [Return Values ​](#return-values)
    -   [ScrollspyList Type ​](#scrollspylist-type)
        
-   [Advanced Usage ​](#advanced-usage)
    -   [Custom Root and Margins ​](#custom-root-and-margins)
        
    -   [Working with Dynamic Content ​](#working-with-dynamic-content)
        
    -   [Cleanup ​](#cleanup)
        

# useScrollspy [​](#usescrollspy)

The `useScrollspy` composable provides automatic navigation highlighting based on scroll position. It tracks the visibility of content elements and automatically updates the active state of corresponding navigation items, making it perfect for table of contents, documentation navigation, and section-based layouts.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/composables/useScrollspy/index.ts) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/composables/useScrollspy.md)

## Basic Usage [​](#basic-usage)

The most common use case is to track scroll position within a scrollable container and highlight corresponding navigation items:

-   [Section 1](#section1)
-   [Section 2](#section2)
-   [Section 3](#section3)

#### Section 1

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

#### Section 2

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

#### Section 3

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

HTML StackBlitz

vue

```
<template>
  <BContainer>
    <BRow>
      <BCol cols="4">
        <BNav
          ref="navTarget"
          pills
          vertical
        >
          <BNavItem
            href="#section1"
            @click="scrollIntoView"
            >Section 1</BNavItem
          >
          <BNavItem
            href="#section2"
            @click="scrollIntoView"
            >Section 2</BNavItem
          >
          <BNavItem
            href="#section3"
            @click="scrollIntoView"
            >Section 3</BNavItem
          >
        </BNav>
      </BCol>
      <BCol cols="8">
        <div
          ref="scrollContent"
          style="height: 300px; overflow-y: auto; border: 1px solid #dee2e6; padding: 1rem"
        >
          <h4 id="section1">Section 1</h4>
          <p
            v-for="i in 4"
            :key="`s1-${i}`"
          >
            {{ loremText }}
          </p>
          <h4 id="section2">Section 2</h4>
          <p
            v-for="i in 4"
            :key="`s2-${i}`"
          >
            {{ loremText }}
          </p>
          <h4 id="section3">Section 3</h4>
          <p
            v-for="i in 4"
            :key="`s3-${i}`"
          >
            {{ loremText }}
          </p>
        </div>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup lang="ts">
import {useTemplateRef} from 'vue'
import {useScrollspy} from 'bootstrap-vue-next'

const loremText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const scrollContent = useTemplateRef('scrollContent')
const navTarget = useTemplateRef('navTarget')

const {scrollIntoView} = useScrollspy(scrollContent, navTarget)
</script>
```

## Manual Mode [​](#manual-mode)

When you need more control over the active states, you can use manual mode and work with the `list` of tracked elements:

[Introduction](#intro)[Features](#features)[Conclusion](#conclusion)

Current: **intro**

##### Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

##### Features

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

##### Conclusion

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

HTML StackBlitz

vue

```
<template>
  <BContainer>
    <BRow>
      <BCol cols="4">
        <BListGroup>
          <BListGroupItem
            v-for="item in filteredList"
            :key="item.id as PropertyKey"
            :href="`#${item.id}`"
            :active="current === item.id"
            @click="scrollIntoView"
          >
            {{ item.text }}
          </BListGroupItem>
        </BListGroup>
      </BCol>
      <BCol cols="8">
        <div>
          Current: <strong>{{ current || 'None' }}</strong>
        </div>
        <div
          ref="content"
          style="height: 250px; overflow-y: auto; border: 1px solid #dee2e6; padding: 1rem"
        >
          <h5 id="intro">Introduction</h5>
          <p
            v-for="i in 3"
            :key="`intro-${i}`"
          >
            {{ loremText }}
          </p>
          <h5 id="features">Features</h5>
          <p
            v-for="i in 3"
            :key="`features-${i}`"
          >
            {{ loremText }}
          </p>
          <h5 id="conclusion">Conclusion</h5>
          <p
            v-for="i in 3"
            :key="`conclusion-${i}`"
          >
            {{ loremText }}
          </p>
        </div>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup lang="ts">
import {computed, useTemplateRef} from 'vue'
import {useScrollspy} from 'bootstrap-vue-next'

const loremText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const content = useTemplateRef('content')

const {current, list, scrollIntoView} = useScrollspy(content, null, {
  manual: true,
})

const filteredList = computed(() => list.value.filter((item) => item.id))
</script>
```

## Custom Content Query [​](#custom-content-query)

You can customize which elements are tracked using the `contentQuery` option:

-   [Introduction](#custom-intro)
-   [Main Content](#custom-main)
-   [Sidebar](#custom-sidebar)

#### Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

#### Main Content

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

#### Sidebar Content

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

HTML StackBlitz

vue

```
<template>
  <BContainer>
    <BRow>
      <BCol cols="4">
        <BNav
          ref="navTarget"
          pills
          vertical
        >
          <BNavItem
            href="#custom-intro"
            @click="scrollIntoView"
            >Introduction</BNavItem
          >
          <BNavItem
            href="#custom-main"
            @click="scrollIntoView"
            >Main Content</BNavItem
          >
          <BNavItem
            href="#custom-sidebar"
            @click="scrollIntoView"
            >Sidebar</BNavItem
          >
        </BNav>
      </BCol>
      <BCol cols="8">
        <div
          ref="content"
          style="height: 300px; overflow-y: auto; border: 1px solid #dee2e6; padding: 1rem"
        >
          <div
            id="custom-intro"
            class="content-section"
          >
            <h4>Introduction</h4>
            <p
              v-for="i in 3"
              :key="`intro-${i}`"
            >
              {{ loremText }}
            </p>
          </div>
          <div
            id="custom-main"
            class="content-section"
          >
            <h4>Main Content</h4>
            <p
              v-for="i in 3"
              :key="`main-${i}`"
            >
              {{ loremText }}
            </p>
          </div>
          <div
            id="custom-sidebar"
            class="content-section"
          >
            <h4>Sidebar Content</h4>
            <p
              v-for="i in 3"
              :key="`sidebar-${i}`"
            >
              {{ loremText }}
            </p>
          </div>
        </div>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup lang="ts">
import {useTemplateRef} from 'vue'
import {useScrollspy} from 'bootstrap-vue-next'

const loremText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const content = useTemplateRef('content')
const navTarget = useTemplateRef('navTarget')

const {scrollIntoView} = useScrollspy(content, navTarget, {
  contentQuery: '.content-section[id]',
})
</script>
```

## Configuration Options [​](#configuration-options)

The `useScrollspy` composable accepts several configuration options:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `contentQuery` | `string` | `':scope > [id]'` | CSS selector for elements to track within the content area |
| `targetQuery` | `string` | `'[href]'` | CSS selector for navigation links within the target element |
| `manual` | `boolean` | `false` | When `true`, doesn't automatically apply active classes to navigation |
| `root` | `string | ComponentPublicInstance | HTMLElement | null` | `null` | Custom root element for intersection observer |
| `rootMargin` | `string` | `'0px 0px -25%'` | Margin around the root for intersection observer |
| `threshold` | `number | number[]` | `[0.1, 0.5, 1]` | Intersection observer thresholds |
| `watchChanges` | `boolean` | `true` | Whether to watch for DOM changes in the content area |

## Return Values [​](#return-values)

The composable returns an object with the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `current` | `Readonly<Ref<string | null>>` | ID of the currently active element |
| `list` | `Readonly<Ref<ScrollspyList>>` | Array of tracked elements with their visibility status |
| `content` | `Ref<HTMLElement | undefined>` | Resolved content element reference |
| `target` | `Ref<HTMLElement | undefined>` | Resolved target element reference |
| `scrollIntoView` | `(event: MouseEvent) => void` | Helper function to scroll to clicked navigation item |
| `updateList` | `() => void` | Manually update the list of tracked elements |
| `cleanup` | `() => void` | Clean up intersection observers |

### ScrollspyList Type [​](#scrollspylist-type)

Each item in the `list` array has the `ScrollspyListItem` structure as defined in the [Types documentation](/bootstrap-vue-next/docs/types.html#scrollspylist).

## Advanced Usage [​](#advanced-usage)

### Custom Root and Margins [​](#custom-root-and-margins)

For more precise control over when elements are considered "active":

HTML StackBlitz

vue

```
<template>
  <!-- Placeholder template with actual refs for TypeScript compatibility -->
  <div ref="content">
    <div ref="target" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import { useScrollspy } from 'bootstrap-vue-next'

// Placeholder refs - these would be actual template refs in a real component
const content = useTemplateRef('content')
const target = useTemplateRef('target')

const root = ref<HTMLElement | null>(null)
onMounted(() => {
  if (typeof document !== 'undefined') {
    // This is only defensive code for SSR
    // If you have a known Document, you could just do `{ root: document.querySelector() }` in useScrollspy
    root.value = document.querySelector('#custom-viewport') as HTMLElement
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { current } = useScrollspy(content, target, {
  root,
  rootMargin: '0px 0px -50%', // Element must be 50% visible
  threshold: [0.25, 0.5, 0.75], // Multiple thresholds for smooth transitions
})
</script>
```

### Working with Dynamic Content [​](#working-with-dynamic-content)

When content changes dynamically, you can use `updateList()` to refresh the tracked elements:

HTML StackBlitz

vue

```
<template>
  <!-- Placeholder template with actual refs for TypeScript compatibility -->
  <div ref="content">
    <div ref="target" />
  </div>
</template>

<script setup lang="ts">
import {nextTick, useTemplateRef} from 'vue'
import {useScrollspy} from 'bootstrap-vue-next'

// Placeholder refs - these would be actual template refs in a real component
const content = useTemplateRef('content')
const target = useTemplateRef('target')

const {updateList} = useScrollspy(content, target)

// Call when content changes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const addNewSection = () => {
  // Add new content...
  nextTick(() => {
    updateList()
  })
}
</script>
```

### Cleanup [​](#cleanup)

Always call `cleanup()` when the component is unmounted to prevent memory leaks:

HTML StackBlitz

vue

```
<template>
  <!-- Placeholder template with actual refs for TypeScript compatibility -->
  <div ref="content">
    <div ref="target" />
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, useTemplateRef} from 'vue'
import {useScrollspy} from 'bootstrap-vue-next'

// Placeholder refs - these would be actual template refs in a real component
const content = useTemplateRef('content')
const target = useTemplateRef('target')

const {cleanup} = useScrollspy(content, target)

onBeforeUnmount(() => {
  cleanup()
})
</script>
```
