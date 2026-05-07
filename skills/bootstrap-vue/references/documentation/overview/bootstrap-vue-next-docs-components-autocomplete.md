# Autocomplete ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/autocomplete.html

##### On this page

-   [Overview ​](#overview)
    
-   [Options ​](#options)
    
-   [Multiple selection with tags ​](#multiple-selection-with-tags)
    
-   [Custom filter function ​](#custom-filter-function)
    
-   [Async fetching with debounce ​](#async-fetching-with-debounce)
    
-   [Control sizing ​](#control-sizing)
    
-   [Contextual states ​](#contextual-states)
    
-   [Dropdown toggle ​](#dropdown-toggle)
    
-   [Teleporting the dropdown ​](#teleporting-the-dropdown)
    
-   [Accessibility ​](#accessibility)
    -   [Keyboard interactions ​](#keyboard-interactions)
        
-   [Component Reference](#component-reference)
    -   [<BAutocomplete>](#b-autocomplete)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            

# Autocomplete [​](#autocomplete)

An input with a dropdown suggestions list. Users can type freely to filter options, and the value is set when an item is selected from the list. Supports single and multiple selection, async fetching, and tags mode.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BAutocomplete/BAutocomplete.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/autocomplete.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bautocomplete)

## Overview [​](#overview)

`BAutocomplete` provides a text input with a dropdown list of suggestions. Users can type freely and optionally select a value from the filtered options. It supports single and multiple selection, custom filtering, tags mode, and async data fetching.

Select a fruit

Selected:

HTML StackBlitz

vue

```
<template>
  <div>
    <label for="autocomplete-basic">Select a fruit</label>
    <BAutocomplete
      id="autocomplete-basic"
      v-model="selected"
      :options="fruits"
      placeholder="Type to search fruits..."
    />
    <p class="mt-2">Selected: {{ selected }}</p>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const selected = ref<string | undefined>(undefined)
const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew']
</script>
```

## Options [​](#options)

Options can be provided as a simple array of strings, numbers, or booleans. For objects, use the `text-field` and `value-field` props to specify which properties to use for display text and values.

ts

```
// Simple array
const options = ['Apple', 'Banana', 'Cherry']

// Object array with custom fields
const options = [
  { id: 1, label: 'Apple' },
  { id: 2, label: 'Banana' },
]
// Use text-field="label" and value-field="id"
```

## Multiple selection with tags [​](#multiple-selection-with-tags)

Enable multiple selection by setting the `multiple` prop. Add the `tags` prop to render selected values as removable tag badges.

In multiple mode, `v-model` is an array of selected values. Press Backspace twice with an empty search input to remove the last selected tag.

Select multiple fruits

Selected: \[\]

HTML StackBlitz

vue

```
<template>
  <div>
    <label for="autocomplete-tags">Select multiple fruits</label>
    <BAutocomplete
      id="autocomplete-tags"
      v-model="selected"
      :options="fruits"
      multiple
      tags
      placeholder="Type to add fruits..."
    />
    <p class="mt-2">Selected: {{ selected }}</p>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const selected = ref<string[]>([])
const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew']
</script>
```

## Custom filter function [​](#custom-filter-function)

By default, `BAutocomplete` filters options by checking if the option text contains the search term (case-insensitive). You can override this with the `filter-function` prop.

The filter function receives the normalized options array and the current search term, and should return the filtered array.

Search with custom filter (case-sensitive, starts-with)

Selected:

HTML StackBlitz

vue

```
<template>
  <div>
    <label for="autocomplete-filter">Search with custom filter (case-sensitive, starts-with)</label>
    <BAutocomplete
      id="autocomplete-filter"
      v-model="selected"
      :options="languages"
      :filter-function="startsWithFilter"
      placeholder="Type to search languages..."
    />
    <p class="mt-2">Selected: {{ selected }}</p>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type {SelectOption} from 'bootstrap-vue-next'

const selected = ref<string | undefined>(undefined)
const languages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'Go',
  'Rust',
  'Ruby',
  'PHP',
  'Swift',
  'Kotlin',
]

const startsWithFilter = (options: SelectOption[], searchTerm: string) => {
  if (!searchTerm) return options
  const term = searchTerm.toLowerCase()
  return options.filter((opt) => String(opt.text).toLowerCase().startsWith(term))
}
</script>
```

## Async fetching with debounce [​](#async-fetching-with-debounce)

`BAutocomplete` is well-suited for async search scenarios. Use `v-model:search` to bind to the raw search text, then watch it to trigger fetches — you may want to debounce the handler and use an `AbortController` to cancel stale requests.

The following example simulates an async lookup with a local list and a 500ms delay. In a real application, replace the simulated `searchUsers` function with an actual API call.

Search users (simulated async)

No user selected

HTML StackBlitz

vue

```
<template>
  <div>
    <label for="autocomplete-async">Search users (simulated async)</label>
    <BAutocomplete
      id="autocomplete-async"
      v-model="selectedUser"
      v-model:search="searchQuery"
      :options="filteredUsers"
      :debounce="300"
      text-field="name"
      value-field="id"
      placeholder="Type to search users..."
      :filter-function="noFilter"
    />
    <p class="mt-2">
      <span v-if="loading">Loading...</span>
      <span v-else-if="selectedUser">Selected user ID: {{ selectedUser }}</span>
      <span v-else>No user selected</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { SelectOption } from 'bootstrap-vue-next'

// Full local dataset — in a real app this would come from an API
const allUsers = [
  { id: 1, name: 'Leanne Graham' },
  { id: 2, name: 'Ervin Howell' },
  { id: 3, name: 'Clementine Bauch' },
  { id: 4, name: 'Patricia Lebsack' },
  { id: 5, name: 'Chelsey Dietrich' },
  { id: 6, name: 'Dennis Schulist' },
  { id: 7, name: 'Kurtis Weissnat' },
  { id: 8, name: 'Nicholas Runolfsdottir' },
  { id: 9, name: 'Glenna Reichert' },
  { id: 10, name: 'Clementina DuBuque' },
]

const selectedUser = ref<number | undefined>(undefined)
const searchQuery = ref('')
const filteredUsers = ref<{ id: number; name: string }[]>([])
const loading = ref(false)

// Bypass built-in filter since the async lookup handles filtering
const noFilter = (options: SelectOption[]) => options

// Simulate an async search (e.g. an API call) with AbortController support
function searchUsers(query: string, signal: AbortSignal): Promise<{ id: number; name: string }[]> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      const term = query.toLowerCase()
      resolve(allUsers.filter(({ name }) => name.toLowerCase().includes(term)))
    }, 500)

    signal.addEventListener('abort', () => {
      clearTimeout(timeoutId)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}

let abortController: AbortController | null = null
watch(searchQuery, async (query) => {
  abortController?.abort()

  if (!query || query.length < 2) {
    filteredUsers.value = []
    return
  }

  const controller = new AbortController()
  abortController = controller
  loading.value = true

  try {
    filteredUsers.value = await searchUsers(query, controller.signal)
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return
    }
    filteredUsers.value = []
  } finally {
    // Only stop loading if this request is still the most recent one
    if (abortController === controller) {
      loading.value = false
    }
  }
})
</script>
```

## Control sizing [​](#control-sizing)

Set the form control text size using the `size` prop to `sm` or `lg` for small or large respectively.

## Contextual states [​](#contextual-states)

Bootstrap includes validation styles for `valid` and `invalid` states on most form controls.

To apply one of the contextual state icons on `BAutocomplete`, set the `state` prop to `false` (for invalid), `true` (for valid), or `null` (no validation state).

When `state` is set to `false`, `aria-invalid` will also be set to `true` automatically.

## Dropdown toggle [​](#dropdown-toggle)

By default, a toggle button is rendered as an append to the input. Set the `no-toggle` prop to hide it.

## Teleporting the dropdown [​](#teleporting-the-dropdown)

Use the `teleport-to` prop to render the dropdown content in a different location in the DOM (e.g. `body`). This is useful when the autocomplete is inside a container with `overflow: hidden`.

## Accessibility [​](#accessibility)

`BAutocomplete` is built on top of [Reka UI's Combobox](https://reka-ui.com/docs/components/combobox) primitives, which adhere to the [WAI-ARIA Combobox design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).

### Keyboard interactions [​](#keyboard-interactions)

| Key | Description |
| --- | --- |
| Enter | Selects the currently highlighted item |
| ArrowDown | Opens the dropdown (when closed) or moves highlight to the next item |
| ArrowUp | Opens the dropdown (when closed) or moves highlight to the previous item |
| Escape | Closes the dropdown and returns focus to the input |
| Backspace (×2) | In multiple mode with empty input, removes the last selected tag |

## Component Reference

### `<BAutocomplete>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BAutocomplete/BAutocomplete.vue)

-   [<BAutocomplete> Properties](#comp-reference-bautocomplete-properties)
-   [<BAutocomplete> Events](#comp-reference-bautocomplete-events)
-   [<BAutocomplete> Slots](#comp-reference-bautocomplete-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.autocomplete`

##### [Properties](#comp-reference-bautocomplete-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-invalid | `AriaInvalid` | `undefined` | Sets the \`aria-invalid\` attribute value on the wrapper element. When not provided, the \`state\` prop will control the attribute |
| autocomplete | `string` | `'false'` | Sets the 'autocomplete' attribute value on the form control |
| autofocus | `boolean` | `false` | When set to \`true\`, attempts to auto-focus the control when it is mounted, or re-activated when in a keep-alive. Does not set the \`autofocus\` attribute on the control |
| by | `string | ((a: unknown, b: unknown) => boolean)` | `undefined` | Property name or comparator function used to identify options. When a string, compares objects by that key. When a function, receives two values and returns true if they match |
| dir | `'ltr' | 'rtl'` | `undefined` | The reading direction of the autocomplete when applicable |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| disabled-field | `string` | `'disabled'` | Field name in the \`options\` array that should be used for the disabled state |
| filter-function | `(options: SelectOption[], searchTerm: string) => SelectOption[]` | `undefined` | Custom filter function for the options list. Receives the normalized options array and the current search term, and returns the filtered array. When provided, the built-in filter is bypassed |
| form | `string` | `undefined` | ID of the form that the form control belongs to. Sets the \`form\` attribute on the control |
| formatter | `(val: string, evt: Event) => string` | `'undefined'` | Reference to a function for formatting the input |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| lazy-formatter | `boolean` | `'false'` | When set, the input is formatted on blur instead of each keystroke (if there is a formatter specified) |
| model-value | `AcceptableValue | AcceptableValue[] | undefined` | `undefined` | The current selected value of the autocomplete. In single mode, a single value; in multiple mode, an array of values |
| multiple | `boolean` | `false` | When set, enables multiple selection mode. The modelValue becomes an array of selected values |
| name | `string` | `undefined` | Sets the value of the \`name\` attribute on the form control |
| no-clear-button | `boolean` | `false` | When set, hides the clear button that appears inside the input when a value is selected and the field is not required |
| no-toggle | `boolean` | `false` | When set, hides the dropdown toggle button |
| open | `boolean` | `false` | The controlled open state of the dropdown. Can be used with \`v-model:open\` to open or close the menu programmatically |
| open-on-focus | `boolean` | `false` | When set, the dropdown opens automatically when the input receives focus |
| options | `readonly (object | string | number | boolean)[]` | `'() => []'` | Array of items to render in the component |
| placeholder | `string` | `''''` | Sets the \`placeholder\` attribute value on the form control |
| plaintext | `boolean` | `'false'` | Set the form control as readonly and renders the control to look like plain text (no borders) |
| readonly | `boolean` | `'false'` | Sets the \`readonly\` attribute on the form control |
| required | `boolean` | `undefined` | Adds the \`required\` attribute to the form control |
| reset-search-term-on-blur | `boolean` | `true` | When set, clears the search input when the component loses focus |
| reset-search-term-on-select | `boolean` | `true` | When set, clears the search input after an option is selected |
| search | `string` | `''''` | The current search text entered by the user. Can be bound with \`v-model:search\`. Use this to react to user input for features like async fetching |
| size | `Size` | `undefined` | Set the size of the component's appearance. 'sm' or 'lg' |
| state | `ValidationState` | `undefined` | Controls the validation state appearance of the component. \`true\` for valid, \`false\` for invalid, or \`null\` for no validation state |
| tags | `boolean` | `false` | When set along with \`multiple\`, renders selected values as removable tag badges |
| teleport-to | `string | HTMLElement` | `undefined` | Teleports the dropdown content to the specified element. Accepts a CSS selector string or an HTMLElement reference |
| text-field | `string` | `'text'` | Field name in the \`options\` array that should be used for the text label |
| value-field | `string` | `'value'` | Field name in the \`options\` array that should be used for the value |

##### [Events](#comp-reference-bautocomplete-events)

| Event | Args | Description |
| --- | --- | --- |
| blur | 
`event``: FocusEvent` - Native blur event

 | Emitted when the autocomplete input loses focus |
| focus | 

`event``: FocusEvent` - Native focus event

 | Emitted when the autocomplete input gains focus |
| update:model-value | 

`value``: AcceptableValue | AcceptableValue[] | undefined` - The new selected value

 | Emitted when the selected value changes |
| update:open | 

`value``: boolean` - The new open state

 | Emitted when the dropdown open state changes |
| update:search | 

`value``: string` - The new search text

 | Emitted when the search input text changes. Use with \`v-model:search\` to react to user input |

##### [Slots](#comp-reference-bautocomplete-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Default slot for custom content inside the autocomplete |
| empty |  | Content to display when no options match the current search. Defaults to "No results found" |
| input | 
`id``: string` - Computed input id

`disabled``: boolean` - Whether the input is disabled

`form``: string | undefined` - Associated form id

`placeholder``: string | undefined` - Placeholder text

`readonly``: boolean` - Whether the input is read-only

`required``: true | undefined` - Whether the input is required

`autocomplete``: string | undefined` - Autocomplete attribute value

`search-term``: string` - The current search term entered by the user

`plaintext``: boolean` - Whether the input renders as plaintext

`size``: Size | undefined` - Input size variant

`state``: ValidationState | undefined` - Validation state of the input

`aria-invalid``: AriaInvalid | undefined` - ARIA invalid state to forward/spread to the input so accessibility validation state is preserved

`aria-required``: true | undefined` - ARIA required state to forward/spread to the input so required accessibility state is preserved

`on-blur``: (event: FocusEvent) => void` - Blur handler to forward/spread to the input so component blur behavior is preserved

`on-focus``: (event: FocusEvent) => void` - Focus handler to forward/spread to the input so component focus behavior is preserved

`on-keydown``: (event: KeyboardEvent) => void` - Keydown handler to forward/spread to the input so keyboard behavior (including backspace-delete flow) is preserved

 | Custom rendering for the search input. Receives all props needed to wire up the input to the combobox. Note: using this slot replaces the internal fallback input ref, so built-in focus restore (\`clearSelection\`, option select) and exposed \`focus\`/\`blur\`/\`element\` helpers do not target your slotted input; manage focus yourself from component events. |
| option | 

`value``: any` - The value of the option

`text``: string` - The display text of the option

`disabled``: boolean` - Whether the option is disabled

 | Custom rendering for each option item in the dropdown list |
| option-indicator |  | Custom rendering for the check indicator shown on selected options. Defaults to a checkmark SVG |
| tags | 

`selected``: SelectOption[]` - Array of currently selected option objects

`remove``: (option: SelectOption) => void` - Function to remove a selected option

`pending-delete``: boolean` - Whether pressing backspace again will remove the last selected option when the search input is empty

 | Custom rendering for tags in multiple+tags mode. Receives the selected options, a remove function, and whether backspace-to-delete is pending |
| toggle | 

`is-open``: boolean` - Whether the autocomplete dropdown is currently open

`disabled``: boolean` - Whether the toggle button is disabled

 | Custom rendering for the dropdown toggle button. Replaces the default chevron button |
| toggle-icon | 

`is-open``: boolean` - Whether the autocomplete dropdown is currently open

 | Custom content for the default dropdown toggle button icon. This slot is only used when the toggle button is rendered |
