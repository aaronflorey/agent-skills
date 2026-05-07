# Form Spinbutton ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/form-spinbutton.html

##### On this page

-   [Overview ​](#overview)
    
-   [v-model value ​](#v-model-value)
    
-   [Min, max, and step ​](#min-max-and-step)
    
-   [Number wrapping ​](#number-wrapping)
    
-   [Styling ​](#styling)
    -   [Sizing ​](#sizing)
        
    -   [Inline ​](#inline)
        
    -   [Vertical ​](#vertical)
        
    -   [Width ​](#width)
        
    -   [Number formatting and locale ​](#number-formatting-and-locale)
        
    -   [Custom Formatter ​](#custom-formatter)
        
-   [Disabled and readonly states ​](#disabled-and-readonly-states)
    
-   [Validation states ​](#validation-states)
    
-   [Required prop ​](#required-prop)
    
-   [Events ​](#events)
    
-   [Accessibility ​](#accessibility)
    
-   [Component Reference](#component-reference)
    -   [<BFormSpinbutton>](#b-form-spinbutton)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            

# Form Spinbutton [​](#form-spinbutton)

The Form SpinButton allows the user to adjusting a numeric range with finite control

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormSpinbutton/BFormSpinbutton.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/form-spinbutton.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bformspinbutton)

## Overview [​](#overview)

The component `BFormSpinbutton` is [WAI-ARIA compliant](https://www.w3.org/TR/wai-aria-practices-1.2/#spinbutton), allowing for [keyboard control](#accessibility), and supports both horizontal (default) and vertical layout

Similar to range type inputs, BootstrapVue's `BFormSpinbutton` does not allow the user to type in a value

Spin Button

50

Value: 50

HTML StackBlitz

vue

```
<template>
  <label for="demo-sb">Spin Button</label>
  <BFormSpinbutton
    id="demo-sb"
    v-model="value"
    min="1"
    max="100"
  />
  <p>Value: {{ value }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const value = ref(50)
</script>
```

The ArrowUp and ArrowDown keys can be used to increment or decrement the value

To be submitted via native browser form submits, the spinbutton must have a name set via the `name` prop. This will create a hidden input containing the current value of the spinbutton. If the spinbutton does not have a value, the hidden input's value will be an empty string

## `v-model` value [​](#v-model-value)

The `v-model` always returns the value as a number. The `v-model` can be `null` if no initial value is set

If the initial value is `null` no value will be displayed in the spinbutton. Use the `placeholder` prop to show a string when the spinbutton has no value

## Min, max, and step [​](#min-max-and-step)

Spinbuttons have a default range from `1` to `100`, which can be changed by setting the `min` and `max` props. The default step increment is `1`, and can be changed via the `step` prop (decimal values allowed)

Spin button with step of 0.25

\--

HTML StackBlitz

template

```
<label for="sb-step">Spin button with step of 0.25</label>
<BFormSpinbutton
  id="sb-step"
  min="0"
  max="10"
  step="0.25"
  placeholder="--"
/>
```

## Number wrapping [​](#number-wrapping)

By default, when the value is increased to the `max` value, it pressing the increment button will have no effect. Similarly when the value is as the `min` value, pressing the decrement button will have no effect

To allow the spin button to wrap from max to min when incrementing (or min to max when decrementing), set the `wrap` prop to true

Wrapping value spin button

\--

HTML StackBlitz

template

```
<label for="sb-wrap">Wrapping value spin button</label>
<BFormSpinbutton
  id="sb-wrap"
  wrap
  min="1"
  max="25"
  placeholder="--"
/>
```

## Styling [​](#styling)

### Sizing [​](#sizing)

As with other form controls, `BFormSpinbutton` supports small and large sizing via setting the size prop to either 'sm' or 'lg', respectively

Spin button - Small size

\--

Spin button - Default size

\--

Spin button - Large size

\--

HTML StackBlitz

template

```
<label for="sb-small">Spin button - Small size</label>
<BFormSpinbutton
  id="sb-small"
  size="sm"
  placeholder="--"
  class="mb-2"
/>
<label for="sb-default">Spin button - Default size</label>
<BFormSpinbutton
  id="sb-default"
  placeholder="--"
  class="mb-2"
/>
<label for="sb-large">Spin button - Large size</label>
<BFormSpinbutton
  id="sb-large"
  size="lg"
  placeholder="--"
  class="mb-2"
/>
```

### Inline [​](#inline)

Inline spin button

\--

HTML StackBlitz

template

```
<label for="sb-inline">Inline spin button</label>
<BFormSpinbutton
  id="sb-inline"
  inline
  placeholder="--"
/>
```

The `Spinbutton` will automatically adjust it's width to fit the displayed value. See the [Width](#width) section below for details on controlling or setting the width

### Vertical [​](#vertical)

`Spinbuttons` can be oriented in vertical mode:

Vertical spin button

\--

HTML StackBlitz

template

```
<label for="sb-vertical">Vertical spin button</label>
<BFormSpinbutton
  id="sb-vertical"
  vertical
  placeholder="--"
/>
```

Vertical spin buttons can also be sized using the `size` prop. When in vertical mode, the spin button is rendered as an inline element

The spin button will automatically adjust its width to fit the displayed value. See the [Width section](#width) below for details on controlling or setting the width.

### Width [​](#width)

The control (when not `vertical` or `inline`) will expand to the maximum width of the parent container You can control width via utility classes such as `w-25`, `w-50`, `w-75`, or use styles to set the width

When either `vertical` or `inline` is set, the control will adjust its width based on the displayed value. You can use css style to control the overall width of the control (i.e. `style="width: 10rem`)

### Number formatting and locale [​](#number-formatting-and-locale)

By default `BFormSpinbutton` will format the displayed number in the users browser default locale. You can change the localized formatting by specifying a locale (or array of locales) via the `locale` prop. Number format localization is performed via Intl.NumberFormat. The locales available will be dependent on the browser implementation. Localization only controls the presentation of the value to the user, and does not affect the `v-model`

LocaleEnglishGermanFrench (Canadian)PersianArabic (Egyptian)Spin button with locale

0,000

Value: 0

HTML StackBlitz

vue

```
<template>
  <label for="sb-locales">Locale</label>
  <BFormSelect
    id="sb-locales"
    v-model="locale"
    :options="locales"
  />
  <label
    for="sb-local"
    class="mt-2"
    >Spin button with locale</label
  >
  <BFormSpinbutton
    id="sb-locale"
    v-model="value"
    :locale="locale"
    min="0"
    max="10"
    step="0.125"
  />
  <p>Value: {{ value }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const value = ref(0)

const locales = [
  {value: 'en', text: 'English'},
  {value: 'de', text: 'German'},
  {value: 'fr-CA', text: 'French (Canadian)'},
  {value: 'fa', text: 'Persian'},
  {value: 'ar-EG', text: 'Arabic (Egyptian)'},
] as const

const locale = ref<(typeof locales)[number]['value']>('fr-CA')
</script>
```

Alternatively, you can provide your own number formatter function to format the value displayed. This is useful for displaying text instead of a number, or if you want to implement different features of `Intl.NumberFormat`

To provide a formatter function, set the prop `formatter-fn` to a method reference. The formatter is passed a single argument which is the current value. Note the formatter only affects the value displayed to the user and does not affect the v-model

### Custom Formatter [​](#custom-formatter)

LocaleEnglishGermanFrench (Canadian)PersianArabic (Egyptian)Spin button with locale

0,000

Value: 0

HTML StackBlitz

vue

```
<template>
  <label for="sb-locales">Locale</label>
  <BFormSelect
    id="sb-locales"
    v-model="locale"
    :options="locales"
  />
  <label
    for="sb-local"
    class="mt-2"
    >Spin button with locale</label
  >
  <BFormSpinbutton
    id="sb-locale"
    v-model="value"
    :locale="locale"
    min="0"
    max="10"
    step="0.125"
  />
  <p>Value: {{ value }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const value = ref(0)

const locales = [
  {value: 'en', text: 'English'},
  {value: 'de', text: 'German'},
  {value: 'fr-CA', text: 'French (Canadian)'},
  {value: 'fa', text: 'Persian'},
  {value: 'ar-EG', text: 'Arabic (Egyptian)'},
] as const

const locale = ref<(typeof locales)[number]['value']>('fr-CA')
</script>
```

## Disabled and readonly states [​](#disabled-and-readonly-states)

Disabled spin button

\--

Readonly spin button

\--

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <BRow>
    <BCol
      md="6"
      class="mb-2"
    >
      <label for="sb-disabled">Disabled spin button</label>
      <BFormSpinbutton
        id="sb-disabled"
        disabled
        placeholder="--"
      />
    </BCol>
    <BCol
      md="6"
      class="mb-2"
    >
      <label
        for="sb-readonly"
        class=""
        >Readonly spin button</label
      >
      <BFormSpinbutton
        id="sb-readonly"
        readonly
        placeholder="--"
      />
    </BCol>
  </BRow>
  <!-- #endregion template -->
</template>
```

## Validation states [​](#validation-states)

When you default to a null value, and the user has not selected a value, you can use the state prop to apply one of the contextual validation styles to the component

-   `true` applies the valid styling to the component
-   `false` applies the invalid styling to the component
-   `null` applies no contextual styling (the default)

## Required prop [​](#required-prop)

Note that the `required` prop only generates the `aria-required="true"` attribute on the component, and does not perform any validation on form submit. You must validate the `v-model` in your application logic

Note that if the prop `required` is set, and the `v-model` is `null`, the attribute `aria-invalid="true"` will be rendered on the component

## Events [​](#events)

The `update:model-value` event is used to update the `v-model` and is emitted any time the value changes

The `change` event is emitted once the user releases the mouse button (when pressing the increment or decrement buttons) or when the user releases the ArrowDown or ArrowUp key. This can be handy when you need to debounce the input

The following example illustrates the difference between the `update:model-value` and `change` events. Click and hold the increment or decrement button (or use the up/down arrow keys)

Spin button - input and change events

0

Input event: 0

Change event:

HTML StackBlitz

vue

```
<template>
  <label for="sb-input">Spin button - input and change events</label>
  <BFormSpinbutton
    id="sb-input"
    v-model="value1"
    wrap
    @change="value2 = $event"
  />
  <p>Input event: {{ value1 }}</p>
  <p>Change event: {{ value2 }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const value1 = ref(0)
const value2 = ref<number | null>(null)
</script>
```

## Accessibility [​](#accessibility)

The following keyboard controls are available when the spin button is focused:

-   Home Sets the value to the `min` value
-   End Sets the value to the `max` value
-   ArrowUp Increases the value by the step amount
-   ArrowDown Decreases the value by the step amount
-   PageUp Increases the value by the step amount times the `repeat-step-multiplier` amount
-   PageDown Decreases the value by the step amount times the `repeat-step-multiplier` amount

Note that the `repeat-delay`, `repeat-threshold` and `repeat-interval` only apply to the ArrowUp or ArrowDown keys

## Component Reference

### `<BFormSpinbutton>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormSpinbutton/BFormSpinbutton.vue)

-   [<BFormSpinbutton> Properties](#comp-reference-bformspinbutton-properties)
-   [<BFormSpinbutton> Events](#comp-reference-bformspinbutton-events)
-   [<BFormSpinbutton> Slots](#comp-reference-bformspinbutton-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.form‑spinbutton`

##### [Properties](#comp-reference-bformspinbutton-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-controls | `AriaInvalid` | `undefined` | If this component controls another component or element, set this to the ID of the controlled component or element |
| aria-label | `string` | `undefined` | Sets the value of \`aria-label\` attribute on the rendered element |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| form | `string` | `undefined` | ID of the form that the form control belongs to. Sets the \`form\` attribute on the control |
| formatter-fn | `(value: number) => string` | `undefined` |  |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| inline | `boolean` | `'false'` | When set, renders the component as an inline element |
| label-decrement | `string` | `'Decrement'` | Text to be used for the \`aria-label\` attribute on the decrement button |
| label-increment | `string` | `'Increment'` | Text to be used for the \`aria-label\` attribute on the increment button |
| locale | `string` | `'undefined'` | Specify the locale to use for formatting the number. Defaults to the browser locale. Only applicable when using the internal formatter |
| max | `Numberish` | `'100'` | The maximum value that can be selected. Must be greater than the \`min\` prop. Negative numbers are allowed |
| min | `Numberish` | `'1'` | The minimum value that can be selected. Negative numbers are allowed |
| model-value |  | `undefined` |  |
| name | `string` | `undefined` | Sets the value of the \`name\` attribute on the form control |
| placeholder | `string` | `'undefined'` | Value to show when the v-model is \`null\` |
| readonly | `boolean` | `'false'` | Sets the \`readonly\` attribute on the form control |
| repeat-delay | `Numberish` | `'500'` | Delay in milliseconds before auto repeat increment or decrement happens. Must be a positive integer. Requires the user to click/keydown and hold |
| repeat-interval | `Numberish` | `'100'` | Interval in milliseconds between increment or decrement repeats. Must be a positive integer |
| repeat-step-multiplier | `Numberish` | `'4'` | Number of steps to jump by once the \`repeat-threshold\` has been reached. Must be a positive integer. This value is also used for the page up and down keys |
| repeat-threshold | `Numberish` | `'10'` | Number of repeats to occur before increasing the step size by \`repeat-step-multiplier\`. Must be a positive integer |
| required | `boolean` | `undefined` | Adds the \`required\` attribute to the form control |
| size | `Size` | `undefined` | Set the size of the component's appearance. 'sm' or 'lg' |
| state | `ValidationState` | `undefined` | Controls the validation state appearance of the component. \`true\` for valid, \`false\` for invalid, or \`null\` for no validation state |
| step | `Numberish` | `'1'` | A positive number that specifies the granularity that the value must adhere to |
| vertical | `boolean` | `'false'` | When set, renders the component with a vertical layout |
| wrap | `boolean` | `'false'` | When set, allows the value to wrap around when reaching min/max bounds |

##### [Events](#comp-reference-bformspinbutton-events)

| Event | Args | Description |
| --- | --- | --- |
| change | 
`value``: number | null` - Currently value of the spinbutton control.

 | Emitted when the user releases the mouse button or key |
| update:model-value | 

`value``: number | null` - Currently value of the spinbutton control.

 | Emitted to update the v-model on each value change |

##### [Slots](#comp-reference-bformspinbutton-slots)

| Name | Scope | Description |
| --- | --- | --- |
| decrement | 
`has-focus``: boolean` - \`true\` when the spinbutton has focus

 | Custom content to place in the decrement button |
| increment | 

`has-focus``: boolean` - \`true\` when the spinbutton has focus

 | Custom content to place in the increment button |
