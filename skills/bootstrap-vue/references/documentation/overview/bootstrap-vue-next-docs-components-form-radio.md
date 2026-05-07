# Form Radio ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/form-radio.html

##### On this page

-   [Individual radios ​](#individual-radios)
    
-   [Grouped radios ​](#grouped-radios)
    
-   [Options property ​](#options-property)
    -   [Options as an array ​](#options-as-an-array)
        
    -   [Options as an array of objects ​](#options-as-an-array-of-objects)
        
    -   [Changing the option field names ​](#changing-the-option-field-names)
        
-   [TypeScript Type Safety ​](#typescript-type-safety)
    
-   [Radio value and v-model ​](#radio-value-and-v-model)
    
-   [Inline or stacked radios ​](#inline-or-stacked-radios)
    
-   [Control sizing ​](#control-sizing)
    
-   [Button style radios ​](#button-style-radios)
    
-   [Reverse ​](#reverse)
    
-   [Without Labels ​](#without-labels)
    
-   [Non-custom style radio inputs (plain) ​](#non-custom-style-radio-inputs-plain)
    
-   [Required constraint ​](#required-constraint)
    
-   [Autofocus ​](#autofocus)
    
-   [Contextual states ​](#contextual-states)
    -   [Contextual state with feedback example ​](#contextual-state-with-feedback-example)
        
    -   [Conveying contextual validation state to assistive technologies and colorblind users ​](#conveying-contextual-validation-state-to-assistive-technologies-and-colorblind-users)
        
    -   [ARIA aria-invalid attribute ​](#aria-aria-invalid-attribute)
        
-   [Component Reference](#component-reference)
    -   [<BFormRadio>](#b-form-radio)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            
    -   [<BFormRadioGroup>](#b-form-radio-group)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            

# Form Radio [​](#form-radio)

For cross browser consistency, `BFormRadioGroup` and `BFormRadio` uses Bootstrap's custom radio input to replace the browser default radio input. It is built on top of semantic and accessible markup, so it is a solid replacement for the default radio input.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormRadio/BFormRadio.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/form-radio.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bformradio)

## Individual radios [​](#individual-radios)

Individual radios

Option A

Option B

Selected:

HTML StackBlitz

vue

```
<template>
  <div class="my-2">
    <label>Individual radios</label>
  </div>

  <div>
    <BFormRadio
      v-model="selected"
      name="some-radios"
      value="A"
      >Option A
    </BFormRadio>
    <BFormRadio
      v-model="selected"
      name="some-radios"
      value="B"
      >Option B
    </BFormRadio>
  </div>

  <div class="mt-3">
    Selected: <strong>{{ selected }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const selected = ref()
</script>
```

## Grouped radios [​](#grouped-radios)

The individual radio inputs in `BFormRadioGroup` can be specified via the `options` prop, or via manual placement of the `BFormRadio` sub-component. When using manually placed `BFormRadio` components within a `BFormRadioGroup`, they will inherit most props and the v-model from the `BFormRadioGroup`.

Radios using options

Toggle this custom radio

Or toggle this other custom radio

This one is Disabled

This is the 4th radio

Radios using sub-components

Toggle this custom radio

Or toggle this other custom radio

This one is Disabled

This is the 4th radio

Selected: **first**

HTML StackBlitz

vue

```
<template>
  <div class="my-2">
    <label>Radios using options</label>
  </div>

  <div>
    <BFormRadioGroup
      id="radio-group-1"
      v-model="selected"
      :options="options"
      name="radio-options"
    />
  </div>

  <div class="my-2">
    <label>Radios using sub-components</label>
  </div>

  <div>
    <BFormRadioGroup
      id="radio-group-2"
      v-model="selected"
      name="radio-sub-component"
    >
      <BFormRadio value="first">Toggle this custom radio</BFormRadio>
      <BFormRadio value="second">Or toggle this other custom radio</BFormRadio>
      <BFormRadio
        value="third"
        disabled
        >This one is Disabled</BFormRadio
      >
      <BFormRadio :value="{fourth: 4}">This is the 4th radio</BFormRadio>
    </BFormRadioGroup>
  </div>

  <div class="mt-3">
    Selected: <strong>{{ selected }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const options = [
  {text: 'Toggle this custom radio', value: 'first'},
  {text: 'Or toggle this other custom radio', value: 'second'},
  {text: 'This one is Disabled', value: 'third', disabled: true},
  {text: 'This is the 4th radio', value: {fourth: 4}},
]

const selected = ref('first')
</script>
```

Feel free to mix and match `options` prop and `BFormRadio` in `BFormRadioGroup`. Manually placed `BFormRadio` inputs will appear _below_ any radio inputs generated by the `options` prop. To have them appear _above_ the inputs generated by `options`, place them in the named slot `first`.

Radios using options and slots

Toggle this custom radio from slot first

Or toggle this other custom radio

Third radio

This is the 4th radio

This is the 5th radio

Selected: **first**

HTML StackBlitz

vue

```
<template>
  <div class="my-2">
    <label>Radios using options and slots</label>
  </div>

  <div>
    <BFormRadioGroup
      id="radio-slots"
      v-model="selected"
      :options="options"
      name="radio-options-slots"
    >
      <template #first>
        <BFormRadio value="first">Toggle this custom radio from slot first</BFormRadio>
      </template>

      <BFormRadio :value="{fourth: 4}">This is the 4th radio</BFormRadio>
      <BFormRadio value="fifth">This is the 5th radio</BFormRadio>
    </BFormRadioGroup>
  </div>

  <div class="mt-3">
    Selected: <strong>{{ selected }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const options = [
  {text: 'Or toggle this other custom radio', value: 'second'},
  {text: 'Third radio', value: 'third'},
]

const selected = ref('first')
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

Option A

Option B

Option C

Option D

Selected: **A**

HTML StackBlitz

vue

```
<template>
  <BFormRadioGroup
    v-model="selected"
    :options="options"
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

const selected = ref('A')

const options = [
  {item: 'A', name: 'Option A'},
  {item: 'B', name: 'Option B'},
  {item: 'D', name: 'Option C', notEnabled: true},
  {item: {d: 1}, name: 'Option D'},
]
</script>
```

## TypeScript Type Safety [​](#typescript-type-safety)

`BFormRadioGroup` provides TypeScript type safety for the `options` prop. When you pass typed options, the component infers the `v-model` type from the option values. See the [Type-Safe Options](/bootstrap-vue-next/docs/reference/type-safe-options.html) reference for full details and patterns.

Alice

Bob

Charlie

Selected User ID: 1

HTML StackBlitz

vue

```
<template>
  <BFormRadioGroup
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
const selectedUserId = ref<number>(1)
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

## Radio value and v-model [​](#radio-value-and-v-model)

`BFormRadio` components do not have a value by default. You must explicitly supply a value via the `value` prop on `BFormRadio`. This value will be sent to the `v-model` when the radio is checked.

The `v-model` of both `BFormRadio` and `BFormRadioGroup` binds to the default `modelValue` prop. To pre-check a radio, you must set the `v-model` value to the one of the radio's value (i.e. must match the value of specified on one of the radio's `value` prop). Each radio in a radio group _must_ have a unique value.

Radios support values of many types, such as a `string`, `boolean`, `number`, or a plain `object`.

## Inline or stacked radios [​](#inline-or-stacked-radios)

By default, `BFormRadioGroup` generates inline radio inputs, while `BFormRadio` generates stacked radios. Set the prop `stacked` on `BFormRadioGroup` to make the radios appear one over the other, or when using radios not in a group, set the `inline` prop on `BFormRadio` to true to render them inline.

Inline radios (default)

First radio

Second radio

Third radio

Stacked radios

First radio

Second radio

Third radio

Selected: **first**

HTML StackBlitz

vue

```
<template>
  <div class="my-2">
    <label>Inline radios (default)</label>
  </div>

  <div>
    <BFormRadioGroup
      v-model="selected"
      :options="options"
      name="radio-inline"
    />
  </div>

  <div class="my-2">
    <label>Stacked radios</label>
  </div>

  <div>
    <BFormRadioGroup
      v-model="selected"
      :options="options"
      name="radio-stacked"
      stacked
    />
  </div>

  <div class="mt-3">
    Selected: <strong>{{ selected }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const options = [
  {text: 'First radio', value: 'first'},
  {text: 'Second radio', value: 'second'},
  {text: 'Third radio', value: 'third'},
]

const selected = ref('first')
</script>
```

## Control sizing [​](#control-sizing)

Use the `size` prop to control the size of the radio. The default size is medium. Supported size values are `sm` (small) and `lg` (large).

Small

Default

Large

HTML StackBlitz

template

```
<BFormRadio
  name="radio-size"
  size="sm"
  >Small</BFormRadio
>
<BFormRadio name="radio-size">Default</BFormRadio>
<BFormRadio
  name="radio-size"
  size="lg"
  >Large</BFormRadio
>
```

Sizes can be set on individual `BFormRadio` components, or inherited from the `size` setting of `BFormRadioGroup`.

NOTE

Bootstrap v5.x does not natively support sizes for the custom radio control. However, bootstrap-vue-next includes custom SCSS/CSS that adds support for sizing the custom radios.

## Button style radios [​](#button-style-radios)

Render radios with the look of buttons by setting the prop `buttons` to `true` on `BFormRadioGroup`. Set the button variant by setting the `button-variant` prop to one of the standard Bootstrap button variants (see [`BButton`](/bootstrap-vue-next/docs/components/button.html) for supported variants). The default `button-variant` is `secondary`.

The `buttons` prop has precedence over `plain`, and `button-variant` has no effect if `buttons` is not set.

Button style radios will have the class `.active` automatically applied to their label when they are in the checked state.

Button style radios

Radio 1Radio 3Radio 3 (disabled)Radio 4

Button style radios with outline-primary variant and size lg

Radio 1Radio 3Radio 3 (disabled)Radio 4

Stacked button style radios

Radio 1Radio 3Radio 3 (disabled)Radio 4

Selected: **radio1**

HTML StackBlitz

vue

```
<template>
  <div class="my-2">
    <label>Button style radios</label>
  </div>

  <div>
    <BFormRadioGroup
      v-model="selected"
      :options="options"
      name="radios-btn-default"
      buttons
    />
  </div>

  <div class="my-2">
    <label>Button style radios with outline-primary variant and size lg</label>
  </div>

  <div>
    <BFormRadioGroup
      v-model="selected"
      :options="options"
      button-variant="outline-primary"
      size="lg"
      name="radios-btn-outline"
      buttons
    />
  </div>

  <div class="my-2">
    <label>Stacked button style radios</label>
  </div>

  <div>
    <BFormRadioGroup
      v-model="selected"
      :options="options"
      name="radios-btn-stacked"
      buttons
      stacked
    />
  </div>

  <div class="mt-3">
    Selected: <strong>{{ selected }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const options = [
  {text: 'Radio 1', value: 'radio1'},
  {text: 'Radio 3', value: 'radio2'},
  {text: 'Radio 3 (disabled)', value: 'radio3', disabled: true},
  {text: 'Radio 4', value: 'radio4'},
]

const selected = ref('radio1')
</script>
```

## Reverse [​](#reverse)

Use the `reverse` prop to put your radio buttons on the opposite side of the label.

Reverse checkbox

Disabled reverse checkbox

HTML StackBlitz

template

```
<BFormRadio reverse>Reverse checkbox</BFormRadio>
<BFormRadio
  reverse
  disabled
  >Disabled reverse checkbox</BFormRadio
>
```

## Without Labels [​](#without-labels)

In order to omit labels as described in the [bootstrap documentation](https://getbootstrap.com/docs/5.3/forms/checks-radios/#without-labels) just leave the default slot empty. Remember to still provide some form of accessible name for assistive technologies (for instance, using aria-label).

HTML StackBlitz

template

```
<BFormRadio />
<BFormRadio disabled />
```

## Non-custom style radio inputs (plain) [​](#non-custom-style-radio-inputs-plain)

You can have `BFormRadio` and `BFormRadioGroup` render a browser native-styled radio input by setting the `plain` prop.

Plain inline radios

First radio

Second radio

Third radio

Plain stacked radios

First radio

Second radio

Third radio

Selected: **first**

HTML StackBlitz

vue

```
<template>
  <div class="my-2">
    <label>Plain inline radios</label>
  </div>

  <div>
    <BFormRadioGroup
      v-model="selected"
      :options="plainOptions"
      name="plain-inline"
      plain
    />
  </div>

  <div class="my-2">
    <label>Plain stacked radios</label>
  </div>

  <div>
    <BFormRadioGroup
      v-model="selected"
      :options="plainOptions"
      name="plain-stacked"
      plain
    />
  </div>

  <div class="mt-3">
    Selected: <strong>{{ selected }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const plainOptions = [
  {text: 'First radio', value: 'first'},
  {text: 'Second radio', value: 'second'},
  {text: 'Third radio', value: 'third'},
]

const selected = ref('first')
</script>
```

NOTE

`plain` will have no effect if `buttons`/`button` is set.

## Required constraint [​](#required-constraint)

When using individual `BFormRadio` components (not in a `BFormRadioGroup`), and you want the radio(s) to be `required` in your form, you **must** provide a `name` on each `BFormRadio` in order for the required constraint to work. All `BFormRadio` components tied to the same `v-model` **must** have the same `name`.

The `name` is required in order for Assistive Technologies (such as screen readers, and keyboard only users) to know which radios belong to the same form variable (the name also automatically enables native browser keyboard navigation), hence `required` will only work if `name` is set. `BFormRadioGroup` will automatically generate a unique input name if one is not provided on the group.

## Autofocus [​](#autofocus)

When the `autofocus` prop is set on `BFormRadio`, the input will be auto-focused when it is inserted (i.e. **mounted**) into the document or re-activated when inside a Vue `KeepAlive` component. Note that this prop **does not** set the `autofocus` attribute on the input, nor can it tell when the input becomes visible.

## Contextual states [​](#contextual-states)

Bootstrap includes validation styles for `valid` and `invalid` states on most form controls.

Generally speaking, you'll want to use a particular state for specific types of feedback:

-   `false` (denotes invalid state) is great for when there is a blocking or required field. A user must fill in this field properly to submit the form
-   `true` (denotes valid state) is ideal for situations when you have per-field validation throughout a form and want to encourage a user through the rest of the fields
-   `null` Displays no validation state (neither valid nor invalid)

To apply one of the contextual state icons on `BFormRadio`, set the `state` prop to `false` (for invalid), `true` (for valid), or `null` (no validation state).

NOTE

Contextual state is not supported for radios rendered in buttons mode.

### Contextual state with feedback example [​](#contextual-state-with-feedback-example)

First radio

Second radio

Third radio

Please select one

HTML StackBlitz

vue

```
<template>
  <BFormRadioGroup
    v-model="selected"
    :options="contextualOptions"
    :state="state"
    name="radio-validation"
  />

  <div
    v-if="!state"
    class="text-danger"
  >
    Please select one
  </div>
  <div
    v-if="state"
    class="text-success"
  >
    Thank you
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

const contextualOptions = [
  {text: 'First radio', value: 'first'},
  {text: 'Second radio', value: 'second'},
  {text: 'Third radio', value: 'third'},
]

const selected = ref()

const state = computed(() => !!selected.value)
</script>
```

### Conveying contextual validation state to assistive technologies and colorblind users [​](#conveying-contextual-validation-state-to-assistive-technologies-and-colorblind-users)

Using these contextual states to denote the state of a form control only provides a visual, color-based indication, which will not be conveyed to users of assistive technologies - such as screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you could include a hint about state in the form control's `<label>` text itself, or by providing an additional help text block (i.e. `BFormInvalidFeedback`). Specifically for assistive technologies, invalid form controls can also be assigned an `aria-invalid="true"` attribute (see below).

### ARIA `aria-invalid` attribute [​](#aria-aria-invalid-attribute)

When `BFormRadioGroup` has an invalid contextual state (i.e. state = `false`) you may also want to set the `BFormRadioGroup` prop `aria-invalid` to `true`.

Supported `aria-invalid` values are:

-   `false` (default) No errors detected
-   `true` The value has failed validation

`aria-invalid` is automatically set to `true` if the `state` prop is `false`.

## Component Reference

### `<BFormRadio>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormRadio/BFormRadio.vue)

-   [<BFormRadio> Properties](#comp-reference-bformradio-properties)
-   [<BFormRadio> Events](#comp-reference-bformradio-events)
-   [<BFormRadio> Slots](#comp-reference-bformradio-slots)
-   [<BFormRadio> Exposed](#comp-reference-bformradio-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `input[type="radio"]`

##### [Properties](#comp-reference-bformradio-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-label | `string` | `undefined` | Sets the value of \`aria-label\` attribute on the rendered element |
| aria-labelledby | `string` | `undefined` | The ID of the element that provides a label for this component. Used as the value for the \`aria-labelledby\` attribute |
| autofocus | `boolean` | `false` | When set to \`true\`, attempts to auto-focus the control when it is mounted, or re-activated when in a keep-alive. Does not set the \`autofocus\` attribute on the control |
| button | `boolean` | `false` | When set, renders the radio button with the appearance of a button |
| button-group | `boolean` | `false` | When set, renders the radio button as part of a button group (it doesn't enclose the radio and label with a div). It is not necessary to set this to true if this is part of a RadioGroup as it is handled internally |
| button-variant | `ButtonVariant | null` | `null` | Applies one of Bootstrap's theme colors when in \`button\` mode |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| form | `string` | `undefined` | ID of the form that the form control belongs to. Sets the \`form\` attribute on the control |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| inline | `boolean` | `false` | When set, renders the radio button as an inline element rather than as a 100% width block |
| model-value | `RadioValue | undefined` | `undefined` | The current value of the radio. Looking for \`checked\` - use \`modelValue\` instead. |
| name | `string` | `undefined` | Sets the value of the \`name\` attribute on the form control |
| plain | `boolean` | `false` | Render the form control in plain mode, rather than custom styled mode |
| required | `boolean` | `undefined` | Adds the \`required\` attribute to the form control |
| reverse | `boolean` | `false` | When set, renders the radio button on the opposite side |
| size | `Size` | `undefined` | Set the size of the component's appearance. 'sm' or 'lg' |
| state | `ValidationState` | `undefined` | Controls the validation state appearance of the component. \`true\` for valid, \`false\` for invalid, or \`null\` for no validation state |
| value | `RadioValue | undefined` | `true` | Value returned when this radio button is selected |

##### [Events](#comp-reference-bformradio-events)

| Event | Args | Description |
| --- | --- | --- |
| update:model-value | 
`value``: RadioValue` - Value of the radio button.

 | Emitted when the radio button value is changed |

##### [Slots](#comp-reference-bformradio-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the label of the radio button |

##### [Exposed](#comp-reference-bformradio-exposed)

| Name | Type | Description |
| --- | --- | --- |
| blur | `() => void` | Removes focus from the radio button |
| element | `HTMLInputElement` | Reference to the underlying input element |
| focus | `() => void` | Sets focus on the radio button |

### `<BFormRadioGroup>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormRadio/BFormRadioGroup.vue)

-   [<BFormRadioGroup> Properties](#comp-reference-bformradiogroup-properties)
-   [<BFormRadioGroup> Events](#comp-reference-bformradiogroup-events)
-   [<BFormRadioGroup> Slots](#comp-reference-bformradiogroup-slots)
-   [<BFormRadioGroup> Exposed](#comp-reference-bformradiogroup-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `div[role="radiogroup"]`

##### [Properties](#comp-reference-bformradiogroup-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-invalid | `AriaInvalid` | `undefined` | Sets the \`aria-invalid\` attribute value on the wrapper element. When not provided, the \`state\` prop will control the attribute |
| autofocus | `boolean` | `false` | When set to \`true\`, attempts to auto-focus the control when it is mounted, or re-activated when in a keep-alive. Does not set the \`autofocus\` attribute on the control |
| button-variant | `ButtonVariant | null` | `'secondary'` | Specifies the Bootstrap contextual color theme variant to apply to the button style radio buttons |
| buttons | `boolean` | `false` | When set, renders the radio buttons in this group with button styling |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| disabled-field | `string` | `'disabled'` | Field name in the \`options\` array that should be used for the disabled state |
| form | `string` | `undefined` | ID of the form that the form control belongs to. Sets the \`form\` attribute on the control |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| model-value | `RadioValue | undefined` | `undefined` | The current value of the checked radio in the group. Looking for \`checked\` - use \`modelValue\` instead. |
| name | `string` | `undefined` | Sets the value of the \`name\` attribute on the form control |
| options | `readonly CheckboxOptionRaw[]` | `'() => []'` | Array of items to render in the component |
| plain | `boolean` | `false` | Render the form control in plain mode, rather than custom styled mode |
| required | `boolean` | `undefined` | Adds the \`required\` attribute to the form control |
| reverse | `boolean` | `false` | When set, renders the radio buttons on the opposite side |
| size | `Size` | `undefined` | Set the size of the component's appearance. 'sm' or 'lg' |
| stacked | `boolean` | `false` | When set, renders the radio button group in stacked mode |
| state | `ValidationState` | `undefined` | Controls the validation state appearance of the component. \`true\` for valid, \`false\` for invalid, or \`null\` for no validation state |
| text-field | `string` | `'text'` | Field name in the \`options\` array that should be used for the text label |
| validated | `boolean` | `false` | When set, adds the Bootstrap class \`was-validated\` to the group wrapper |
| value-field | `string` | `'value'` | Field name in the \`options\` array that should be used for the value |

##### [Events](#comp-reference-bformradiogroup-events)

| Event | Args | Description |
| --- | --- | --- |
| update:model-value | 
`value``: RadioValue | null` - Currently selected value of the radio group.

 | Emitted when the selected value(s) are changed. Looking for the \`input\` or \`change\` event - use \`update:model-value\` instead. |

##### [Slots](#comp-reference-bformradiogroup-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content (form radio buttons) to place in the form radio button group |
| first |  | Slot to place for radio buttons so that they appear before radios generated from options prop |
| option | 
`value``: string | number | undefined` - The value of the radio button

`disabled``: boolean | undefined` - Whether the radio button is disabled

`text``: string | undefined` - The text to display for the radio button

 | Use this slot to have finer control over the content rendered inside each radio button |

##### [Exposed](#comp-reference-bformradiogroup-exposed)

| Name | Type | Description |
| --- | --- | --- |
| blur | `() => void` | Removes focus from the radio group |
| focus | `() => void` | Sets focus on the first radio button in the group |
