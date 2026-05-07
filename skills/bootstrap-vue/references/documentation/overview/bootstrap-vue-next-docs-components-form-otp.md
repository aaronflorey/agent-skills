# Form Otp ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/form-otp.html

##### On this page

-   [Overview ​](#overview)
    -   [v-model Support ​](#v-model-support)
        
-   [Input length ​](#input-length)
    
-   [Input types ​](#input-types)
    -   [Text mode ​](#text-mode)
        
    -   [Numeric mode ​](#numeric-mode)
        
-   [OTP mode ​](#otp-mode)
    
-   [Masked input ​](#masked-input)
    
-   [Sizing ​](#sizing)
    
-   [Validation states ​](#validation-states)
    
-   [Disabled and readonly states ​](#disabled-and-readonly-states)
    
-   [Complete event ​](#complete-event)
    
-   [Accessibility ​](#accessibility)
    -   [Keyboard Interactions ​](#keyboard-interactions)
        
-   [Component Reference](#component-reference)
    -   [<BFormOtp>](#b-form-otp)
        -   [Properties](#)
            
        -   [Events](#)
            

# Form Otp [​](#form-otp)

A sequence of one-character inputs for entering OTP codes, PINs, and verification codes. Built on top of Reka UI PinInput with Bootstrap styling.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormOtp/BFormOtp.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/form-otp.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bformotp)

## Overview [​](#overview)

`BFormOtp` renders a configurable number of single-character input fields, commonly used for entering OTP (One-Time Password) codes, PINs, and verification codes. It wraps `BFormInput` fields with Reka UI's PinInput primitives, providing full keyboard navigation, clipboard paste support, and mobile OTP autodetection.

Value: \[\]

HTML StackBlitz

vue

```
<template>
  <BFormOtp v-model="value" />
  <p class="mt-2">Value: {{ value }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const value = ref<string[]>([])
</script>
```

### `v-model` Support [​](#v-model-support)

The `v-model` binds to an array of strings, where each element represents the value of one input field. You can use it to set initial values or read the current state of the inputs.

## Input length [​](#input-length)

By default, `BFormOtp` renders 6 input fields. Use the `length` prop to customize the number of fields.

HTML StackBlitz

template

```
<BFormOtp :length="4" />
```

## Input types [​](#input-types)

### Text mode [​](#text-mode)

By default, `BFormOtp` accepts any alphanumeric character. This is the default `type="text"` mode.

### Numeric mode [​](#numeric-mode)

Set the `type` prop to `number` to restrict input to numeric characters only. This is useful for numeric PINs and verification codes.

HTML StackBlitz

template

```
<BFormOtp type="number" />
```

## OTP mode [​](#otp-mode)

Set the `otp` prop to `true` to enable OTP autodetection on mobile devices. This allows mobile devices to automatically detect the OTP from messages or clipboard, and enables the autocomplete field.

HTML StackBlitz

template

```
<BFormOtp otp type="number" />
```

## Masked input [​](#masked-input)

Use the `mask` prop to treat the inputs as password fields, hiding entered characters. This is useful for sensitive codes such as PINs.

Value: \[\]

HTML StackBlitz

vue

```
<template>
  <BFormOtp v-model="value" mask />
  <p class="mt-2">Value: {{ value }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const value = ref<string[]>([])
</script>
```

## Sizing [​](#sizing)

Control the size of the input fields using the `size` prop. Supports `sm`, `md` (default), and `lg`.

HTML StackBlitz

template

```
<div class="d-flex flex-column gap-3">
  <BFormOtp size="sm" :length="4" placeholder="○" />
  <BFormOtp :length="4" placeholder="○" />
  <BFormOtp size="lg" :length="4" placeholder="○" />
</div>
```

## Validation states [​](#validation-states)

Use the `state` prop to apply contextual validation styles to the component. Set to `true` for valid, `false` for invalid, or `null` for no validation state.

HTML StackBlitz

template

```
<div class="d-flex flex-column gap-3">
  <BFormOtp :state="true" :length="4" />
  <BFormOtp :state="false" :length="4" />
</div>
```

## Disabled and readonly states [​](#disabled-and-readonly-states)

Set the `disabled` prop to prevent user interaction, or the `readonly` prop to make the inputs read-only while keeping them focusable.

HTML StackBlitz

template

```
<div class="d-flex flex-column gap-3">
  <BFormOtp disabled :length="4" />
  <BFormOtp readonly :length="4" />
</div>
```

## Complete event [​](#complete-event)

The `complete` event is emitted when all input fields have been filled. This is useful for triggering validation or submission once the user has entered the full code.

Value: \[\]

Completed: null

HTML StackBlitz

vue

```
<template>
  <BFormOtp v-model="value" :length="4" @complete="onComplete" />
  <p class="mt-2">Value: {{ value }}</p>
  <p class="mt-2">Completed: {{ completed ?? 'null' }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const value = ref<string[]>([])
const completed = ref<string[] | null>(null)

function onComplete(val: string[]) {
  completed.value = val
}
</script>
```

## Accessibility [​](#accessibility)

Each input field is automatically labeled with an `aria-label` in the format `"Pin {n} of {total}"` (e.g., "Pin 1 of 6"). You can customize the prefix using the `aria-label` prop (e.g., setting it to `"Code"` produces "Code 1 of 6").

### Keyboard Interactions [​](#keyboard-interactions)

-   ArrowLeft Focus on previous input
-   ArrowRight Focus on next input
-   Home Focus on the first input
-   End Focus on the last input
-   Backspace Deletes the value of the current input. If the input is empty, moves to the previous input and deletes that value as well
-   Delete Deletes the value of the current input
-   Ctrl + V Pastes the contents of the clipboard into the pin input. If the number of characters in the clipboard equals or exceeds the number of inputs, the contents are pasted from the first input. Otherwise, the contents are pasted from the current input onwards

## Component Reference

### `<BFormOtp>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormOtp/BFormOtp.vue)

-   [<BFormOtp> Properties](#comp-reference-bformotp-properties)
-   [<BFormOtp> Events](#comp-reference-bformotp-events)

[Adding styles](../configurations/customizing-styles#adding-styles): `.form‑otp`

##### [Properties](#comp-reference-bformotp-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-invalid | `AriaInvalid` | `undefined` | Sets the \`aria-invalid\` attribute value on the wrapper element. When not provided, the \`state\` prop will control the attribute |
| aria-label | `string` | `undefined` | Sets the value of \`aria-label\` attribute on the rendered element |
| autofocus | `boolean` | `false` | When set to \`true\`, attempts to auto-focus the control when it is mounted, or re-activated when in a keep-alive. Does not set the \`autofocus\` attribute on the control |
| dir | `'ltr' | 'rtl'` | `undefined` | The reading direction of the component. If omitted, inherits globally from the application or assumes LTR (left-to-right) reading mode |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| form | `string` | `undefined` | ID of the form that the form control belongs to. Sets the \`form\` attribute on the control |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| length | `Numberish` | `6` | The number of input fields to render. Must be a positive integer. Defaults to 6 if not specified or invalid |
| mask | `boolean` | `false` | When set to \`true\`, the inputs will be treated as password fields, masking entered characters |
| model-value | `string[] | null` | `'() => []'` | The current value of the OTP input as an array of per-field strings |
| name | `string` | `undefined` | Sets the value of the \`name\` attribute on the form control |
| otp | `boolean` | `false` | When set to \`true\`, mobile devices will autodetect the OTP from messages or clipboard, and enable the autocomplete field |
| placeholder | `string` | `''''` | Sets the \`placeholder\` attribute value on the form control |
| plaintext | `boolean` | `'false'` | Set the form control as readonly and renders the control to look like plain text (no borders) |
| readonly | `boolean` | `'false'` | Sets the \`readonly\` attribute on the form control |
| required | `boolean` | `undefined` | Adds the \`required\` attribute to the form control |
| separator | `string` | `undefined` | Optional character or string to render between each input field as a visual separator |
| size | `Size` | `undefined` | Set the size of the component's appearance. 'sm' or 'lg' |
| state | `ValidationState` | `undefined` | Controls the validation state appearance of the component. \`true\` for valid, \`false\` for invalid, or \`null\` for no validation state |
| type | `'text' | 'number'` | `'text'` | The input type for each field. Set to \`number\` to restrict input to numeric characters only |

##### [Events](#comp-reference-bformotp-events)

| Event | Args | Description |
| --- | --- | --- |
| complete | 
`value``: string[]` - The completed array of per-field input values

 | Emitted when all OTP input fields have been filled |
| update:model-value | 

`value``: string[]` - The current array of per-field input values

 | Emitted when the OTP value changes |
