# Pagination ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/pagination.html

##### On this page

-   [Overview ​](#overview)
    
-   [Customizing appearance ​](#customizing-appearance)
    -   [Limiting the number of displayed buttons ​](#limiting-the-number-of-displayed-buttons)
        -   [Small screen support ​](#small-screen-support)
            
    -   [Button content ​](#button-content)
        
    -   [Goto first/last button type ​](#goto-first-last-button-type)
        
    -   [Button size ​](#button-size)
        
    -   [Pill style ​](#pill-style)
        
    -   [Alignment ​](#alignment)
        
-   [Preventing a page from being selected ​](#preventing-a-page-from-being-selected)
    
-   [Accessibility ​](#accessibility)
    -   [aria-controls ​](#aria-controls)
        
    -   [ARIA labels ​](#aria-labels)
        
    -   [Keyboard navigation support ​](#keyboard-navigation-support)
        
-   [Component Reference](#component-reference)
    -   [<BPagination>](#b-pagination)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            

# Pagination [​](#pagination)

Quick first, previous, next, last, and page buttons for pagination control of another component (such as `BTable` or lists).

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BPagination/BPagination.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/pagination.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bpagination)

## Overview [​](#overview)

`<BPagination>` is a custom input component that provides a current page number input control. The value should be bound via `v-model` in your app. Page numbers are indexed from 1. The number of pages is computed from the provided prop values for `total-rows` and `per-page`.

**Example Usage with `<BTable>`:**

-   «
-   ‹
-   1
-   2
-   3
-   ›
-   »

Current Page: 1

| Id | First name | Last name |
| --- | --- | --- |
| 1 | Fred | Flintstone |
| 2 | Wilma | Flintstone |
| 3 | Barney | Rubble |

HTML StackBlitz

vue

```
<template>
  <BContainer>
    <BRow>
      <BCol>
        <div class="overflow-auto">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          />

          <p class="mt-3">Current Page: {{ currentPage }}</p>

          <b-table
            id="my-table"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            small
          /></div
      ></BCol>
    </BRow>
  </BContainer>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

const perPage = ref(3)
const currentPage = ref(1)
const items = ref([
  {id: 1, first_name: 'Fred', last_name: 'Flintstone'},
  {id: 2, first_name: 'Wilma', last_name: 'Flintstone'},
  {id: 3, first_name: 'Barney', last_name: 'Rubble'},
  {id: 4, first_name: 'Betty', last_name: 'Rubble'},
  {id: 5, first_name: 'Pebbles', last_name: 'Flintstone'},
  {id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble'},
  {id: 7, first_name: 'The Great', last_name: 'Gazzoo'},
  {id: 8, first_name: 'Rockhead', last_name: 'Slate'},
  {id: 9, first_name: 'Pearl', last_name: 'Slaghoople'},
])
const rows = computed(() => items.value.length)
</script>
```

## Customizing appearance [​](#customizing-appearance)

`BPagination` supports several props/slots that allow you to customize the appearance. All `*-text` props are text-only and strip out HTML, but you can use their equally named slot counterparts for that.

### Limiting the number of displayed buttons [​](#limiting-the-number-of-displayed-buttons)

To restrict the number of page buttons (including the ellipsis, but excluding the first, prev, next, and last buttons) shown, use the `limit` prop to specify the desired number of page buttons (including the ellipsis, if shown). The default `limit` is `5`. The minimum supported value is `3`. When `limit` is set to `3`, no ellipsis indicators will be shown for practical purposes.

The `first` and `last` buttons can be optionally hidden by setting the `hide-goto-end-buttons` prop.

The showing of the `ellipsis` can be optionally disabled by setting the `hide-ellipsis` prop.

#### Small screen support [​](#small-screen-support)

On smaller screens (i.e. mobile), some of the `BPagination` buttons will be hidden to minimize the potential of the pagination interface wrapping onto multiple lines:

-   The ellipsis indicators will be hidden on screens `xs` and smaller
-   Page number buttons will be limited to a maximum of 3 visible on `xs` screens and smaller

This ensures that no more than 3 page number buttons are visible, along with the goto _first_, _prev_, _next_, and _last_ buttons.

### Button content [​](#button-content)

For a full list of all available slots see the [Slots](#comp-reference-bpagination-slots) section below.

-   First
-   Prev
-   1
-   2
-   3
-   4
-   …
-   Next
-   Last

-   ⏮
-   ⏪
-   1
-   2
-   3
-   4
-   …
-   ⏩
-   ⏭

-   First
-   Prev
-   **1**
-   _2_
-   _3_
-   _4_

-   Next
-   Last

Current page : 1

HTML StackBlitz

vue

```
<template>
  <!-- Use text in props -->
  <BPagination
    v-model="currentPage"
    :total-rows="rows"
    :per-page="perPage"
    first-text="First"
    prev-text="Prev"
    next-text="Next"
    last-text="Last"
  />

  <!-- Use emojis in props -->
  <BPagination
    v-model="currentPage"
    :total-rows="rows"
    :per-page="perPage"
    first-text="⏮"
    prev-text="⏪"
    next-text="⏩"
    last-text="⏭"
    class="mt-4"
  />

  <!-- Use HTML and sub-components in slots -->
  <BPagination
    v-model="currentPage"
    :total-rows="rows"
    :per-page="perPage"
    class="mt-4"
  >
    <template #first-text><span class="text-success">First</span></template>
    <template #prev-text><span class="text-danger">Prev</span></template>
    <template #next-text><span class="text-warning">Next</span></template>
    <template #last-text><span class="text-info">Last</span></template>
    <template #ellipsis-text>
      <BSpinner
        small
        type="grow"
      />
      <BSpinner
        small
        type="grow"
      />
      <BSpinner
        small
        type="grow"
      />
    </template>
    <template #page="{page, active}">
      <b v-if="active">{{ page }}</b>
      <i v-else>{{ page }}</i>
    </template>
  </BPagination>
  Current page : {{ currentPage }}
</template>

<script setup lang="ts">
import {ref} from 'vue'

const currentPage = ref(1)
const perPage = ref(10)
const rows = ref(100)
</script>
```

The slot `page` is always scoped, while the slots `first-text`, `prev-text`, `next-text` and `last-text` are optionally scoped. The `ellipsis-text` slot is not scoped.

**Scoped variables properties available to the `page` slot:**

| Property | Type | Description |
| --- | --- | --- |
| `page` | Number | Page number (from `1` to `numberOfPages`) |
| `index` | Number | Page number (indexed from `0` to `numberOfPages -1`) |
| `active` | Boolean | If the page is the active page |
| `disabled` | Boolean | If the page button is disabled |
| `content` | String | Page number as a string |

**Scoped variables properties available to the `first-text`, `prev-text`, `next-text` and `last-text` slots:**

| Property | Type | Description |
| --- | --- | --- |
| `page` | Number | Page number (from `1` to `numberOfPages`) |
| `index` | Number | Page number (indexed from `0` to `numberOfPages -1`) |
| `disabled` | Boolean | If the page button is disabled |

### Goto first/last button type [​](#goto-first-last-button-type)

If you prefer to have buttons with the first and last page number to go to the corresponding page, use the `first-number` and `last-number` props.

###### Goto first button number

-   ‹
-   1
-   …
-   4
-   5
-   6
-   …
-   ›
-   »

###### Goto last button number

-   «
-   ‹
-   …
-   4
-   5
-   6
-   …
-   100
-   ›

###### Goto first and last button number

-   ‹
-   1
-   …
-   4
-   5
-   6
-   …
-   100
-   ›

HTML StackBlitz

vue

```
<template>
  <h6>Goto first button number</h6>
  <BPagination
    v-model="currentPage"
    :total-rows="rows"
    :per-page="perPage"
    first-number
  />

  <h6>Goto last button number</h6>
  <BPagination
    v-model="currentPage"
    :total-rows="rows"
    :per-page="perPage"
    last-number
  />

  <h6>Goto first and last button number</h6>
  <BPagination
    v-model="currentPage"
    :total-rows="rows"
    :per-page="perPage"
    first-number
    last-number
  />
</template>

<script setup lang="ts">
import {ref} from 'vue'

const currentPage = ref(5)
const perPage = ref(1)
const rows = ref(100)
</script>
```

### Button size [​](#button-size)

Optionally change from the default button size by setting the `size` prop to either `'sm'` for smaller buttons or `'lg'` for larger buttons.

###### Small

-   «
-   ‹
-   1
-   2
-   3
-   4
-   …
-   ›
-   »

###### Default

-   «
-   ‹
-   1
-   2
-   3
-   4
-   …
-   ›
-   »

###### Large

-   «
-   ‹
-   1
-   2
-   3
-   4
-   …
-   ›
-   »

HTML StackBlitz

vue

```
<template>
  <h6>Small</h6>
  <BPagination
    v-model="currentPage"
    :total-rows="rows"
    size="sm"
  />

  <h6>Default</h6>
  <BPagination
    v-model="currentPage"
    :total-rows="rows"
  />

  <h6>Large</h6>
  <BPagination
    v-model="currentPage"
    :total-rows="rows"
    size="lg"
  />
</template>

<script setup lang="ts">
import {ref} from 'vue'

const currentPage = ref(1)
const rows = ref(100)
</script>
```

### Pill style [​](#pill-style)

Easily switch to pill style buttons by setting the `pills` prop.

###### Small Pills

-   «
-   ‹
-   1
-   2
-   3
-   4
-   …
-   ›
-   »

###### Default Pills

-   «
-   ‹
-   1
-   2
-   3
-   4
-   …
-   ›
-   »

###### Large Pills

-   «
-   ‹
-   1
-   2
-   3
-   4
-   …
-   ›
-   »

HTML StackBlitz

vue

```
<template>
  <h6>Small Pills</h6>
  <BPagination
    v-model="currentPage"
    pills
    :total-rows="rows"
    size="sm"
  />

  <h6>Default Pills</h6>
  <BPagination
    v-model="currentPage"
    pills
    :total-rows="rows"
  />

  <h6>Large Pills</h6>
  <BPagination
    v-model="currentPage"
    pills
    :total-rows="rows"
    size="lg"
  />
</template>

<script setup lang="ts">
import {ref} from 'vue'

const currentPage = ref(1)
const rows = ref(100)
</script>
```

**Note:** Pill styling requires bootstrap-vue-next's custom CSS/SCSS.

### Alignment [​](#alignment)

By default, the pagination component is left aligned. Change the alignment to `center`, `end` or `fill` by setting the prop `align` to the appropriate value.

###### Left alignment (default)

-   «
-   ‹
-   1
-   2
-   3
-   4
-   …
-   ›
-   »

###### Center alignment

-   «
-   ‹
-   1
-   2
-   3
-   4
-   …
-   ›
-   »

###### Right (end) alignment

-   «
-   ‹
-   1
-   2
-   3
-   4
-   …
-   ›
-   »

###### Fill alignment

-   «
-   ‹
-   1
-   2
-   3
-   4
-   …
-   ›
-   »

HTML StackBlitz

vue

```
<template>
  <div>
    <h6>Left alignment (default)</h6>
    <BPagination
      v-model="currentPage"
      :total-rows="rows"
    />
  </div>
  <div class="mt-3">
    <h6 class="text-center">Center alignment</h6>
    <BPagination
      v-model="currentPage"
      :total-rows="rows"
      align="center"
    />
  </div>
  <div class="mt-3">
    <h6 class="text-end">Right (end) alignment</h6>
    <BPagination
      v-model="currentPage"
      :total-rows="rows"
      align="end"
    />
  </div>
  <div class="mt-3">
    <h6 class="text-center">Fill alignment</h6>
    <BPagination
      v-model="currentPage"
      :total-rows="rows"
      align="fill"
    />
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'

const currentPage = ref(1)
const rows = ref(100)
</script>
```

## Preventing a page from being selected [​](#preventing-a-page-from-being-selected)

You can listen for the `page-click` event, which provides an option to prevent the page from being selected. The event is emitted with two arguments:

-   `BvEvent`: The `BvEvent` object. Call `BvEvent.preventDefault()` to cancel page selection
-   `page`: Page number to select (starting with `1`)

For accessibility reasons, when using the `page-click` event to prevent a page from being selected, you should provide some means of notification to the user as to why the page is not able to be selected. It is recommended to use the `disabled` attribute on the `BPagination` component instead of using the `page-click` event (as `disabled` is more intuitive for screen reader users).

## Accessibility [​](#accessibility)

The `BPagination` component provides many features to support assistive technology users, such as `aria-` attributes and keyboard navigation.

### `aria-controls` [​](#aria-controls)

When pagination is controlling another component on the page (such as `BTable`), set the `aria-controls` prop to the `id` of the element it is controlling. This will help non-sighted users know what component is being updated/controlled.

### ARIA labels [​](#aria-labels)

`BPagination` provides various `label-*` props which are used to set the `aria-label` attributes on the various elements within the component as well as the common `aria-label` prop on the outer container, which will help users of assistive technology.

| Prop | `aria-label` content default |
| --- | --- |
| `label-first-page` | "Goto first page" |
| `label-prev-page` | "Goto previous page" |
| `label-next-page` | "Goto next page" |
| `label-last-page` | "Goto last page" |
| `label-page` | "Goto page", appended with the page number |
| `aria-label` | "Pagination", applied to the outer pagination container |

The `label-page` will optionally accept a function to generate the aria-label. The function is passed a single argument which is the page number (indexed from 1 to number of pages).

You can remove any label by setting the prop to an empty string (`''`), although this is not recommended unless the content of the button textually conveys its purpose.

### Keyboard navigation support [​](#keyboard-navigation-support)

`<BPagination>` supports keyboard navigation out of the box, and follows the [WAI-ARIA roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.2/#kbd_roving_tabindex) pattern.

-   Tabbing into the pagination component will autofocus the current active page button
-   Left (or Up) and Right (or Down) arrow keys will focus the previous and next buttons, respectively, in the page list
-   Enter or Space keys will select (click) the currently focused page button
-   Pressing Tab will move to the next control or link on the page, while pressing Shift+Tab will move to the previous control or link on the page.

## Component Reference

### `<BPagination>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BPagination/BPagination.vue)

-   [<BPagination> Properties](#comp-reference-bpagination-properties)
-   [<BPagination> Events](#comp-reference-bpagination-events)
-   [<BPagination> Slots](#comp-reference-bpagination-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.pagination`

##### [Properties](#comp-reference-bpagination-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| align | `AlignmentJustifyContent | fill` | `undefined` | Alignment of the page buttons: 'start' (or 'left'), 'center', 'end' (or 'right'), or 'fill' |
| aria-controls | `AriaInvalid` | `undefined` | If this component controls another component or element, set this to the ID of the controlled component or element |
| aria-label | `string` | `'Pagination'` | Sets the value of \`aria-label\` attribute on the rendered element |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| ellipsis-class | `ClassValue` | `undefined` | Class(es) to apply to the 'ellipsis' placeholders |
| ellipsis-text | `string` | `'…'` | Content to place in the ellipsis placeholder |
| first-class | `ClassValue` | `undefined` | Class(es) to apply to the go-to-first-page button |
| first-number | `boolean` | `false` | Display first page number instead of go-to-first-page button |
| first-text | `string` | `'«'` | Content to place in the go-to-first-page button |
| label-first-page | `string` | `'Go to first page'` | Value to place in the 'aria-label' attribute of the go-to-first-page button |
| label-last-page | `string` | `'Go to last page'` | Value to place in the 'aria-label' attribute of the go-to-last-page button |
| label-next-page | `string` | `'Go to next page'` | Value to place in the 'aria-label' attribute of the go-to-next-page button |
| label-page | `string` | `'Go to page'` | Value to place in the 'aria-label' attribute of the go-to-page button. Page number will be appended automatically |
| label-prev-page | `string` | `'Go to previous page'` | Value to place in the 'aria-label' attribute of the go-to-previous-page button |
| last-class | `ClassValue` | `undefined` | Class(es) to apply to the go-to-last-page button |
| last-number | `boolean` | `false` | Display last page number instead of go-to-last-page button |
| last-text | `string` | `'»'` | Content to place in the go-to-last-page button |
| limit | `Numberish` | `5` | Maximum number of buttons to show (including ellipsis if shown, but excluding the bookend buttons) |
| model-value | `Numberish` | `1` | Current page number, starting from 1 |
| next-class | `ClassValue` | `undefined` | Class(es) to apply to the go-to-next-page button |
| next-text | `string` | `'›'` | Content to place in the go-to-next-page button |
| no-ellipsis | `boolean` | `false` | Do not show ellipsis buttons |
| no-goto-end-buttons | `boolean` | `false` | Hides the go to first and go to last page buttons |
| page-class | `ClassValue` | `undefined` | Class(es) to apply to the go-to-page buttons |
| per-page | `Numberish` | `20` | Number of rows per page |
| pills | `boolean` | `false` | Applies pill styling to the pagination buttons |
| prev-class | `ClassValue` | `undefined` | Class(es) to apply to the go-to-previous-page button |
| prev-text | `string` | `'‹'` | Content to place in the go-to-previous-page button |
| size | `Size` | `undefined` | Set the size of the component's appearance. 'sm' or 'lg' |
| total-rows | `Numberish` | `0` | Total number of rows in the dataset |

##### [Events](#comp-reference-bpagination-events)

| Event | Args | Description |
| --- | --- | --- |
| page-click | 
`bv-event``: BvEvent` - The \`BvEvent\` object. Call \`BvEvent.preventDefault()\` to cancel page selection

`page``: number` - Page number to select (starting with \`1\`)

 | Emitted when a page button is clicked. Cancelable |
| update:model-value | 

`page``: number` - Selected page number (starting with \`1\`)

 | Emitted when page changes via user interaction |

##### [Slots](#comp-reference-bpagination-slots)

| Name | Scope | Description |
| --- | --- | --- |
| ellipsis-text |  | The '...' indicator content. Overrides the \`ellipsis-text\` prop |
| first-text | 
`disabled``: Boolean` - Will be \`true\` if this button is disabled (non-clickable)

`index``: Number` - Page number (indexed from \`0\` to \`numberOfPages - 1\`)

`page``: Number` - Page number (from \`1\` to \`numberOfPages\`)

 | The go-to-first-page button content |
| last-text | 

`disabled``: Boolean` - Will be \`true\` if this button is disabled (non-clickable)

`index``: Number` - Page number (indexed from \`0\` to \`numberOfPages - 1\`)

`page``: Number` - Page number (from \`1\` to \`numberOfPages\`)

 | The go-to-last-page button content |
| next-text | 

`disabled``: Boolean` - Will be \`true\` if this button is disabled (non-clickable)

`index``: Number` - Page number (indexed from \`0\` to \`numberOfPages - 1\`)

`page``: Number` - Page number (from \`1\` to \`numberOfPages\`)

 | The go-to-next-page button content |
| page | 

`disabled``: Boolean` - Will be \`true\` if this button is disabled (non-clickable)

`index``: Number` - Page number (indexed from \`0\` to \`numberOfPages - 1\`)

`page``: Number` - Page number (from \`1\` to \`numberOfPages\`)

`active``: Boolean` - Whether the page is the active page

`content``: String` - Default button content

 | Page number button content |
| prev-text | 

`disabled``: Boolean` - Will be \`true\` if this button is disabled (non-clickable)

`index``: Number` - Page number (indexed from \`0\` to \`numberOfPages - 1\`)

`page``: Number` - Page number (from \`1\` to \`numberOfPages\`)

 | The go-to-previous-page button content |
