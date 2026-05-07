# Form Select ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/form-select.html

##### On this page

-   [Overview ​](#overview)
    
-   [Options property ​](#options-property)
    -   [Options as an array ​](#options-as-an-array)
        
    -   [Options as an array of objects ​](#options-as-an-array-of-objects)
        
    -   [Changing the option field names ​](#changing-the-option-field-names)
        
    -   [Options groups ​](#options-groups)
        
    -   [Option notes ​](#option-notes)
        
-   [Standard (single) select ​](#standard-single-select)
    -   [Value in single mode ​](#value-in-single-mode)
        
    -   [Select sizing (displayed rows) ​](#select-sizing-displayed-rows)
        
-   [Multiple select support ​](#multiple-select-support)
    -   [Value in multiple mode ​](#value-in-multiple-mode)
        
-   [Control sizing ​](#control-sizing)
    
-   [Autofocus ​](#autofocus)
    
-   [TypeScript Type Safety ​](#typescript-type-safety)
    
-   [Contextual states ​](#contextual-states)
    -   [Conveying contextual validation state to assistive technologies and colorblind users ​](#conveying-contextual-validation-state-to-assistive-technologies-and-colorblind-users)
        
    -   [ARIA aria-invalid attribute ​](#aria-aria-invalid-attribute)
        
-   [Non custom style select ​](#non-custom-style-select)
    
-   [Component Reference](#component-reference)
    -   [<BFormSelect>](#b-form-select)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            
    -   [<BFormSelectOption>](#b-form-select-option)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BFormSelectOptionGroup>](#b-form-select-option-group)
        -   [Properties](#)
            
        -   [Slots](#)
            

# Form Select [​](#form-select)

Bootstrap custom `<select>` using custom styles. Optionally specify options based on an array, array of objects, or an object.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormSelect/BFormSelect.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/form-select.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bformselect)

## Overview [​](#overview)

Generate your select options by passing an array or object to the `options` props:

Please select an optionThis is First optionSelected OptionThis is an option with object valueThis one is disabledPlease select an optionThis is First optionSelected OptionThis is an option with object valueThis one is disabled

Selected:

HTML StackBlitz

vue

```
<template>
  <BFormSelect
    v-model="selected"
    :options="ex1Options"
  />

  <BFormSelect
    v-model="selected"
    :options="ex1Options"
    size="sm"
    class="mt-3"
  />

  <div class="mt-3">
    Selected: <strong>{{ selected }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const ex1Options = [
  {value: null, text: 'Please select an option'},
  {value: 'a', text: 'This is First option'},
  {value: 'b', text: 'Selected Option'},
  {value: {C: '3PO'}, text: 'This is an option with object value'},
  {value: 'd', text: 'This one is disabled', disabled: true},
]

const selected = ref(null)
</script>
```

You can even define option groups with the `options` prop:

Please select an optionThis is First optionSelected OptionOption with object valueAnother option with object value

Selected:

HTML StackBlitz

vue

```
<template>
  <BFormSelect
    v-model="selected"
    :options="ex1GroupOptions"
  />

  <div class="mt-3">
    Selected: <strong>{{ selected }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const ex1GroupOptions = [
  {value: null, text: 'Please select an option'},
  {value: 'a', text: 'This is First option'},
  {value: 'b', text: 'Selected Option', disabled: true},
  {
    label: 'Grouped options',
    options: [
      {value: {C: '3PO'}, text: 'Option with object value'},
      {value: {R: '2D2'}, text: 'Another option with object value'},
    ],
  },
]

const selected = ref()
</script>
```

Or manually provide your options and option groups:

Please select an optionOption AOption B (disabled)Option with object valueAnother option with object value

Selected:

HTML StackBlitz

vue

```
<template>
  <BFormSelect v-model="selected">
    <BFormSelectOption :value="null">Please select an option</BFormSelectOption>
    <BFormSelectOption value="a">Option A</BFormSelectOption>
    <BFormSelectOption
      value="b"
      disabled
      >Option B (disabled)</BFormSelectOption
    >
    <BFormSelectOptionGroup label="Grouped options">
      <BFormSelectOption :value="{C: '3PO'}">Option with object value</BFormSelectOption>
      <BFormSelectOption :value="{R: '2D2'}">Another option with object value</BFormSelectOption>
    </BFormSelectOptionGroup>
  </BFormSelect>

  <div class="mt-3">
    Selected: <strong>{{ selected }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const selected = ref(null)
</script>
```

Feel free to mix the `options` prop with `BFormSelectOption` and `BFormSelectOptionGroup`. Manually placed options and option groups will appear _below_ the options generated via the `options` prop. To place manual options and option groups _above_ the options specified by the `options` prop, use the named slot `first`.

\-- Please select an option --Option A (from options prop)Option B (from options prop)Option COption D

Selected:

HTML StackBlitz

vue

```
<template>
  <BFormSelect
    v-model="selected"
    :options="exFirstSlotOptions"
    class="mb-3"
  >
    <!-- This slot appears above the options from 'options' prop -->
    <template #first>
      <BFormSelectOption
        :value="null"
        disabled
        >-- Please select an option --</BFormSelectOption
      >
    </template>

    <!-- These options will appear after the ones from 'options' prop -->
    <BFormSelectOption value="C">Option C</BFormSelectOption>
    <BFormSelectOption value="D">Option D</BFormSelectOption>
  </BFormSelect>

  <div class="mt-3">
    Selected: <strong>{{ selected }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

// Options from props - already in standard format
const exFirstSlotOptions = [
  {value: 'A', text: 'Option A (from options prop)'},
  {value: 'B', text: 'Option B (from options prop)'},
]

// Type includes all values: from options prop (A, B) and from slots (C, D)
const selected = ref<'A' | 'B' | 'C' | 'D' | null>(null)
</script>
```

## Options property [​](#options-property)

`options` can be an array of strings or objects, or a key-value object. Available fields:

-   **`value`** The selected value which will be set on `v-model`
-   **`disabled`** Disables item for selection
-   **`text`** Display text

`value` can be a string, number, or simple object. Avoid using complex types in values.

NOTE

The BootstrapVue field `html` on the `options` object has been deprecated. See our [Migration Guide](/bootstrap-vue-next/docs/migration-guide.html#v-html) for details.

### Options as an array [​](#options-as-an-array)

ts

```
const options = ['A', 'B', 'C', { text: 'D', value: { d: 1 }, disabled: true }, 'E', 'F']
```

If an array entry is a string, it will be used for both the generated `value` and `text` fields.

You can mix using strings and [objects](#options-as-an-array-of-objects) in the array.

Internally, BootstrapVueNext will convert the above array to the following array (the [array of objects](#options-as-an-array-of-objects)) format:

ts

```
const options = [
  { text: 'A', value: 'A', disabled: false },
  { text: 'B', value: 'B', disabled: false },
  { text: 'C', value: 'C', disabled: false },
  { text: 'D', value: { d: 1 }, disabled: true },
  { text: 'E', value: 'E', disabled: false },
  { text: 'F', value: 'F', disabled: false },
]
```

### Options as an array of objects [​](#options-as-an-array-of-objects)

ts

```
const options = [
  { text: 'Item 1', value: 'first' },
  { text: 'Item 2', value: 'second' },
  { text: 'Item 3', value: 'third', disabled: true },
  { text: 'Item 4' },
  { text: 'Item 5', value: { foo: 'bar', baz: true } },
]
```

If `value` is missing, then `text` will be used as both the `value` and `text` fields.

Internally, BootstrapVueNext will convert the above array to the following array (the [array of objects](#options-as-an-array-of-objects)) format:

ts

```
const options = [
  { text: 'Item 1', value: 'first', disabled: false },
  { text: 'Item 2', value: 'second', disabled: false },
  { text: 'Item 3', value: 'third', disabled: true },
  { text: 'Item 4', value: 'Item 4', disabled: false },
  { text: 'Item 5', value: 'E', disabled: false },
]
```

### Changing the option field names [​](#changing-the-option-field-names)

If you want to customize the field property names (for example using `name` field for display `text`) you can easily change them by setting the `text-field`, `value-field`, and `disabled-field` props to a string that contains the property name you would like to use:

Option AOption BOption COption D

Selected: **A**

HTML StackBlitz

vue

```
<template>
  <BFormSelect
    v-model="selected"
    :options="exFieldNamesOptions"
    class="mb-3"
    value-field="item"
    text-field="name"
    disabled-field="notEnabled"
  />

  <div class="mt-3">
    Selected: <strong>{{ selected }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const exFieldNamesOptions = [
  {item: 'A', name: 'Option A'},
  {item: 'B', name: 'Option B'},
  {item: 'D', name: 'Option C', notEnabled: true},
  {item: {d: 1}, name: 'Option D'},
]

const selected = ref('A')
</script>
```

### Options groups [​](#options-groups)

To define option groups, add an object with a `label` prop as the group's name and an `options` property set to an **array** of options for that group. An entry is only treated as a group when its `options` field is an array — entries whose `options` field is missing, `null`, a string, or any other non-array value are rendered as normal options.

ts

```
const options = [
  { text: 'Item 1', value: 'first' },
  { text: 'Item 2', value: 'second' },
  {
    label: 'Grouped options',
    options: [{ text: 'Item< 3', value: 'third', disabled: true }, { text: 'Item 4' }],
  },
  { text: 'Item 5', value: { foo: 'bar', baz: true } },
]
```

### Option notes [​](#option-notes)

If the initial value of your `v-model` expression does not match any of the options, the `BFormSelect` component (which is a native HTML5 `<select>` under the hood) will render in an _unselected_ state. On iOS this will cause the user not being able to select the first item because iOS does not fire a change event in this case. It is therefore recommended providing a disabled option with an empty value as your first option.

template

```
<BFormSelect
  v-model="selected"
  :options="options"
>
  <template #first>
    <BFormSelectOption
      value=""
      disabled
      >-- Please select an option --</BFormSelectOption
    >
  </template>
</BFormSelect>
```

See the [Vue select](https://v3.vuejs.org/guide/forms.html#select) documentation for more details.

## Standard (single) select [​](#standard-single-select)

By default, Bootstrap v5's custom select styling is applied.

### Value in single mode [​](#value-in-single-mode)

In non `multiple` mode, `BFormSelect` returns the single `value` of the currently selected option.

Please select an optionThis is First optionSelected OptionThis is an option with object valueThis one is disabled

Selected:

HTML StackBlitz

vue

```
<template>
  <BFormSelect
    v-model="selected"
    :options="ex1Options"
  />

  <div class="mt-3">
    Selected: <strong>{{ selected }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const ex1Options = [
  {value: null, text: 'Please select an option'},
  {value: 'a', text: 'This is First option'},
  {value: 'b', text: 'Selected Option'},
  {value: {C: '3PO'}, text: 'This is an option with object value'},
  {value: 'd', text: 'This one is disabled', disabled: true},
]

const selected = ref()
</script>
```

### Select sizing (displayed rows) [​](#select-sizing-displayed-rows)

You can use the `select-size` prop to switch the custom select into a select list-box, rather than a dropdown. Set the `select-size` prop to a numerical value greater than 1 to control how many rows of options are visible.

Note when `select-size` is set to a value greater than 1, the Bootstrap v5 custom styling will **not** be applied, unless the `multiple` prop is also set.

Note that not all mobile browsers will show the select as a list-box.

Please select an optionThis is First optionSelected OptionThis is an option with object valueThis one is disabled

Selected:

HTML StackBlitz

vue

```
<template>
  <BFormSelect
    v-model="selected"
    :options="ex1Options"
    :select-size="4"
  />

  <div class="mt-3">
    Selected: <strong>{{ selected }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const ex1Options = [
  {value: null, text: 'Please select an option'},
  {value: 'a', text: 'This is First option'},
  {value: 'b', text: 'Selected Option'},
  {value: {C: '3PO'}, text: 'This is an option with object value'},
  {value: 'd', text: 'This one is disabled', disabled: true},
]

const selected = ref()
</script>
```

## Multiple select support [​](#multiple-select-support)

Enable multiple select mode by setting the prop `multiple`, and control how many rows are displayed in the multiple select list-box by setting `select-size` to the number of rows to display. The default is to let the browser use its default (typically 4).

### Value in multiple mode [​](#value-in-multiple-mode)

In `multiple` mode, `BFormSelect` always returns an array of option values. You **must** provide an array reference as your `v-model` when in `multiple` mode.

This is First optionDefault Selected OptionThis is another optionThis one is disabledThis is option eThis is option fThis is option g

Selected: **\[ "b" \]**

HTML StackBlitz

vue

```
<template>
  <BFormSelect
    v-model="selected"
    :options="exMultiOptions"
    multiple
    :select-size="4"
  />

  <div class="mt-3">
    Selected: <strong>{{ selected }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

// Options already in standard format for full type safety
const exMultiOptions = [
  {value: 'a', text: 'This is First option'},
  {value: 'b', text: 'Default Selected Option'},
  {value: 'c', text: 'This is another option'},
  {value: 'd', text: 'This one is disabled', disabled: true},
  {value: 'e', text: 'This is option e'},
  {value: 'f', text: 'This is option f'},
  {value: 'g', text: 'This is option g'},
]

const selected = ref<string[]>(['b'])
</script>
```

## Control sizing [​](#control-sizing)

Set the form-control text size using the `size` prop to `sm` or `lg` for small or large respectively.

By default, `BFormSelect` will occupy the full width of the container that it appears in. To control the select width, place the input inside standard Bootstrap grid column.

## Autofocus [​](#autofocus)

When the `autofocus` prop is set on `BFormSelect`, the select will be auto-focused when it is inserted (i.e. **mounted**) into the document or re-activated when inside a Vue `KeepAlive` component. Note that this prop **does not** set the `autofocus` attribute on the select, nor can it tell when the select becomes visible.

## TypeScript Type Safety [​](#typescript-type-safety)

`BFormSelect` provides TypeScript type safety for the `options` prop. When you pass typed options, the component infers the `v-model` type from the option values. See the [Type-Safe Options](/bootstrap-vue-next/docs/reference/type-safe-options.html) reference for full details and patterns.

AliceBobCharlie

Selected User ID:

HTML StackBlitz

vue

```
<template>
  <BFormSelect
    v-model="selectedUserId"
    :options="userOptions"
  />
  <p class="mt-2">Selected User ID: {{ selectedUserId }}</p>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

interface User {
  id: number
  name: string
  email: string
}

const users: User[] = [
  {id: 1, name: 'Alice', email: 'alice@example.com'},
  {id: 2, name: 'Bob', email: 'bob@example.com'},
  {id: 3, name: 'Charlie', email: 'charlie@example.com'},
]

// Map to standard format for full type safety
const userOptions = computed(() =>
  users.map((user) => ({
    value: user.id,
    text: user.name,
  }))
)

// TypeScript infers that selectedUserId is of type: number
const selectedUserId = ref<number>()
</script>
```

For multiple select, the `v-model` is an array of the inferred value type:

Vue.jsTypeScriptBootstrap

Selected Tags: None

HTML StackBlitz

vue

```
<template>
  <BFormSelect
    v-model="selectedTags"
    :options="tagOptions"
    multiple
  />
  <p class="mt-2">Selected Tags: {{ selectedTags.join(', ') || 'None' }}</p>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

interface Tag {
  tagId: string
  tagName: string
}

const tags: Tag[] = [
  {tagId: 'vue', tagName: 'Vue.js'},
  {tagId: 'ts', tagName: 'TypeScript'},
  {tagId: 'bs', tagName: 'Bootstrap'},
]

// Map to standard format for full type safety
const tagOptions = computed(() =>
  tags.map((tag) => ({
    value: tag.tagId,
    text: tag.tagName,
  }))
)

// TypeScript knows this is string[]
const selectedTags = ref<string[]>([])
</script>
```

-   **IDE autocomplete** - Your editor suggests valid properties as you type
-   **Compile-time validation** - Type errors in option mappings are caught before runtime
-   **v-model inference** - The `v-model` type is automatically inferred from your option values
-   **Refactoring safety** - Renaming fields in your interfaces highlights all usage locations

Type safety is fully opt-in and backward compatible. Existing code without explicit types continues to work exactly as before:

vue

```
<ComponentName v-model="selected" :options="items" />
```

To enable stronger typing, provide explicit types for your data or use `as const` on your options arrays. See [Type-Safe Options](/bootstrap-vue-next/docs/reference/type-safe-options.html) for details.

## Contextual states [​](#contextual-states)

Bootstrap includes validation styles for `valid` and `invalid` states on most form controls.

Generally speaking, you'll want to use a particular state for specific types of feedback:

-   `false` (denotes invalid state) is great for when there is a blocking or required field. A user must fill in this field properly to submit the form
-   `true` (denotes valid state) is ideal for situations when you have per-field validation throughout a form and want to encourage a user through the rest of the fields
-   `null` Displays no validation state (neither valid nor invalid)

To apply one of the contextual state icons on `BFormSelect`, set the `state` prop to `false` (for invalid), `true` (for valid), or `null` (no validation state).

### Conveying contextual validation state to assistive technologies and colorblind users [​](#conveying-contextual-validation-state-to-assistive-technologies-and-colorblind-users)

Using these contextual states to denote the state of a form control only provides a visual, color-based indication, which will not be conveyed to users of assistive technologies - such as screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you could include a hint about state in the form control's `<label>` text itself, or by providing an additional help text block (via `BFormGroup` or `BForm*Feedback`). Specifically for assistive technologies, invalid form controls can also be assigned an `aria-invalid="true"` attribute (see below).

### ARIA `aria-invalid` attribute [​](#aria-aria-invalid-attribute)

When `BFormSelect` has an invalid contextual state (i.e. state = `false`) you may also want to set the `BFormSelect` prop `aria-invalid` to `true`.

Supported `invalid` values are:

-   `false` (default) No errors detected
-   `true` The value has failed validation

When `state` is set to `false`, aria-invalid will also be set to true.

## Non custom style select [​](#non-custom-style-select)

Set the prop `plain` to have a native browser `<select>` rendered (although the class `.form-control` will always be placed on the select).

A `plain` select will always be rendered for non `multiple` selects which have the `select-size` prop set to a value greater than 1.

## Component Reference

### `<BFormSelect>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormSelect/BFormSelect.vue)

-   [<BFormSelect> Properties](#comp-reference-bformselect-properties)
-   [<BFormSelect> Events](#comp-reference-bformselect-events)
-   [<BFormSelect> Slots](#comp-reference-bformselect-slots)
-   [<BFormSelect> Exposed](#comp-reference-bformselect-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `select`

##### [Properties](#comp-reference-bformselect-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-invalid | `AriaInvalid` | `undefined` | Sets the \`aria-invalid\` attribute value on the wrapper element. When not provided, the \`state\` prop will control the attribute |
| autofocus | `boolean` | `false` | When set to \`true\`, attempts to auto-focus the control when it is mounted, or re-activated when in a keep-alive. Does not set the \`autofocus\` attribute on the control |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| disabled-field | `string` | `'disabled'` | Field name in the \`options\` array that should be used for the disabled state |
| form | `string` | `undefined` | ID of the form that the form control belongs to. Sets the \`form\` attribute on the control |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| label-field | `string` | `'label'` | The key to use from the option object to get the label |
| model-value | `SelectValue` | `''` | The value of the select control |
| multiple | `boolean` | `false` | When set, allows multiple options to be selected (multi-select) |
| name | `string` | `undefined` | Sets the value of the \`name\` attribute on the form control |
| options | `unknown[] | Record<string, unknown>` | `'() => []'` | Array of items to render in the component |
| options-field | `string` | `'options'` | The key to use from the option object to get the options |
| plain | `boolean` | `false` | Render the form control in plain mode, rather than custom styled mode |
| required | `boolean` | `undefined` | Adds the \`required\` attribute to the form control |
| select-size | `Numberish` | `0` | When set to a number larger than 0, will set the number of display option rows. Note not all browser will respect this setting |
| size | `Size` | `undefined` | Set the size of the component's appearance. 'sm' or 'lg' |
| state | `ValidationState` | `undefined` | Controls the validation state appearance of the component. \`true\` for valid, \`false\` for invalid, or \`null\` for no validation state |
| text-field | `string` | `'text'` | Field name in the \`options\` array that should be used for the text label |
| value-field | `string` | `'value'` | Field name in the \`options\` array that should be used for the value |

##### [Events](#comp-reference-bformselect-events)

| Event | Args | Description |
| --- | --- | --- |
| update:model-value | 
`value``: SelectValue` - Currently selected value of the select control.

 | Emitted when the selected value(s) are changed. Looking for the \`input\` or \`change\` event - use \`update:model-value\` instead. |

##### [Slots](#comp-reference-bformselect-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the form select |
| first |  | Slot to place options or option groups above options provided via the 'options' prop |
| option |  |  |

##### [Exposed](#comp-reference-bformselect-exposed)

| Name | Type | Description |
| --- | --- | --- |
| blur | `() => void` | Removes focus from the select element |
| element | `HTMLSelectElement` | Reference to the underlying select element |
| focus | `() => void` | Sets focus on the select element |

### `<BFormSelectOption>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormSelect/BFormSelectOption.vue)

-   [<BFormSelectOption> Properties](#comp-reference-bformselectoption-properties)
-   [<BFormSelectOption> Slots](#comp-reference-bformselectoption-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `option`

##### [Properties](#comp-reference-bformselectoption-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` | The disabled state of the option |
| value | `any` | `undefined` | The value of the option |

##### [Slots](#comp-reference-bformselectoption-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the form select option |

### `<BFormSelectOptionGroup>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormSelect/BFormSelectOptionGroup.vue)

-   [<BFormSelectOptionGroup> Properties](#comp-reference-bformselectoptiongroup-properties)
-   [<BFormSelectOptionGroup> Slots](#comp-reference-bformselectoptiongroup-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `optgroup`

##### [Properties](#comp-reference-bformselectoptiongroup-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| disabled-field | `string` | `'disabled'` | Field name in the \`options\` array that should be used for the disabled state |
| label | `string` | `undefined` | The label for the option group |
| options | `readonly (unknown | Record<string, unknown>)[]` | `'() => []'` | Array of items to render in the component |
| text-field | `string` | `'text'` | Field name in the \`options\` array that should be used for the text label |
| value-field | `string` | `'value'` | Field name in the \`options\` array that should be used for the value |

##### [Slots](#comp-reference-bformselectoptiongroup-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Slot to place options above options provided via the 'options' prop |
| first |  | Content to place in the form select option group |
| option |  |  |
