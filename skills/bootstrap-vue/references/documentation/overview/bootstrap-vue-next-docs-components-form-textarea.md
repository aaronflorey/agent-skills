# Form Textarea ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/form-textarea.html

##### On this page

-   [Control sizing ​](#control-sizing)
    
-   [Displayed rows ​](#displayed-rows)
    -   [Disable resize handle ​](#disable-resize-handle)
        
    -   [Auto height ​](#auto-height)
        
-   [Contextual states ​](#contextual-states)
    -   [Conveying contextual state to assistive technologies and colorblind users ​](#conveying-contextual-state-to-assistive-technologies-and-colorblind-users)
        
    -   [aria-invalid attribute ​](#aria-invalid-attribute)
        
-   [Formatter support ​](#formatter-support)
    
-   [Readonly plain text ​](#readonly-plain-text)
    
-   [Floating labels ​](#floating-labels)
    
-   [v-model modifiers ​](#v-model-modifiers)
    
-   [Debounce support ​](#debounce-support)
    
-   [Autofocus ​](#autofocus)
    
-   [Native and custom events ​](#native-and-custom-events)
    
-   [Exposed input properties and methods ​](#exposed-input-properties-and-methods)
    -   [Input properties ​](#input-properties)
        
    -   [Input methods ​](#input-methods)
        
-   [Component Reference](#component-reference)
    -   [<BFormTextarea>](#b-form-textarea)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Exposed](#)
            

# Form Textarea [​](#form-textarea)

Create multi-line text inputs with support for auto height sizing, minimum and maximum number of rows, and contextual states.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormTextarea/BFormTextarea.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/form-textarea.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bformtextarea)

HTML StackBlitz

vue

```
<template>
  <BFormTextarea
    v-model="textEx"
    placeholder="Enter something..."
    rows="3"
  />

  <pre class="mt-3 mb-0">{{ textEx }}</pre>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const textEx = ref()
</script>
```

## Control sizing [​](#control-sizing)

Set text height using the `size` prop to `sm` or `lg` for small or large respectively.

To control width, place the input inside standard Bootstrap grid column.

Small:

Default:

Large:

HTML StackBlitz

template

```
<BRow>
  <BCol sm="2">
    <label for="textarea-small">Small:</label>
  </BCol>
  <BCol sm="10">
    <BFormTextarea
      id="textarea-small"
      size="sm"
      placeholder="Small textarea"
    />
  </BCol>
</BRow>
<BRow class="mt-2">
  <BCol sm="2">
    <label for="textarea-default">Default:</label>
  </BCol>
  <BCol sm="10">
    <BFormTextarea
      id="textarea-default"
      placeholder="Default textarea"
    />
  </BCol>
</BRow>
<BRow class="mt-2">
  <BCol sm="2">
    <label for="textarea-large">Large:</label>
  </BCol>
  <BCol sm="10">
    <BFormTextarea
      id="textarea-large"
      size="lg"
      placeholder="Large textarea"
    />
  </BCol>
</BRow>
```

## Displayed rows [​](#displayed-rows)

To set the height of `BFormTextarea`, set the `rows` prop to the desired number of rows. If no value is provided to `rows`, then it will default to `2` (the browser default and minimum acceptable value). Setting it to null or a value below 2 will result in the default of `2` being used.

HTML StackBlitz

template

```
<BFormTextarea
  id="textarea-rows"
  placeholder="Tall textarea"
  rows="8"
/>
```

### Disable resize handle [​](#disable-resize-handle)

Some web browsers will allow the user to re-size the height of the textarea. To disable this feature, set the `no-resize` prop to `true`.

HTML StackBlitz

template

```
<BFormTextarea
  id="textarea-no-resize"
  placeholder="Fixed height textarea"
  rows="3"
  no-resize
/>
```

### Auto height [​](#auto-height)

`<BFormTextarea>` can also automatically adjust its height (text rows) to fit the content, even as the user enters or deletes text. The height of the textarea will either grow or shrink to fit the content (grow to a maximum of `max-rows` or shrink to a minimum of `rows`).

To set the initial minimum height (in rows), set the `rows` prop to the desired number of lines (or leave it at the default of `2`), And then set maximum rows that the text area will grow to (before showing a scrollbar) by setting the `max-rows` prop to the maximum number of lines of text.

To make the height `sticky` (i.e. never shrink), set the `no-auto-shrink` prop to `true`. The `no-auto-shrink` props has no effect if `max-rows` is not set or is equal to or less than `rows`.

Note that the resize handle of the textarea (if supported by the browser) will automatically be disabled in auto-height mode.

Auto height:

No auto-shrink:

HTML StackBlitz

template

```
<BContainer fluid>
  <BRow>
    <BCol sm="2">
      <label for="textarea-auto-height">Auto height:</label>
    </BCol>
    <BCol sm="10">
      <BFormTextarea
        id="textarea-auto-height"
        placeholder="Auto height textarea"
        rows="3"
        max-rows="8"
      />
    </BCol>
  </BRow>

  <BRow class="mt-2">
    <BCol sm="2">
      <label for="textarea-no-auto-shrink">No auto-shrink:</label>
    </BCol>
    <BCol sm="10">
      <BFormTextarea
        id="textarea-no-auto-shrink"
        placeholder="Auto height (no-shrink) textarea"
        rows="3"
        max-rows="8"
        no-auto-shrink
      />
    </BCol>
  </BRow>
</BContainer>
```

## Contextual states [​](#contextual-states)

Bootstrap includes validation styles for `valid` and `invalid` states on most form controls.

Generally speaking, you'll want to use a particular state for specific types of feedback:

-   `false` (denotes invalid state) is great for when there is a blocking or required field. A user must fill in this field properly to submit the form
-   `true` (denotes valid state) is ideal for situations when you have per-field validation throughout a form and want to encourage a user through the rest of the fields
-   `null` Displays no validation state (neither valid nor invalid)

To apply one of the contextual state icons on `BFormTextarea`, set the `state` prop to `false` (for invalid), `true` (for valid), or `null` (no validation state).

HTML StackBlitz

vue

```
<template>
  <BFormTextarea
    id="textarea-state"
    v-model="textStates"
    :state="textStates.length >= 10"
    placeholder="Enter at least 10 characters"
    rows="3"
  />
</template>

<script setup lang="ts">
import {ref} from 'vue'

const textStates = ref('')
</script>
```

### Conveying contextual state to assistive technologies and colorblind users [​](#conveying-contextual-state-to-assistive-technologies-and-colorblind-users)

Using these contextual states to denote the state of a form control only provides a visual, color-based indication, which will not be conveyed to users of assistive technologies - such as screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you could include a hint about state in the form control's `<label>` text itself, or by providing an additional help text block.

### `aria-invalid` attribute [​](#aria-invalid-attribute)

When `BFormTextarea` has an invalid contextual state (i.e. state is `false`) you may also want to set the prop `aria-invalid` to `true`, or one of the supported values:

-   `false`: No errors (default)
-   `true` or `'true'`: The value has failed validation
-   `'grammar'`: A grammatical error has been detected
-   `'spelling'` A spelling error has been detected

If the `state` prop is set to `false`, and the `aria-invalid` prop is not explicitly set, `BFormTextarea` will automatically set the `aria-invalid` attribute to `'true'`.

## Formatter support [​](#formatter-support)

`BFormTextarea` optionally supports formatting by passing a function reference to the `formatter` prop.

Formatting (when a formatter function is supplied) occurs when the control's native `input` and `change` events fire. You can use the boolean prop `lazy-formatter` to restrict the formatter function to being called on the control's native `blur` event.

The `formatter` function receives two arguments: the raw `value` of the input element, and the native `event` object that triggered the format (if available).

The `formatter` function should return the formatted value as a _string_.

Formatting does not occur if a `formatter` is not provided.

Textarea with formatter (on input)We will convert your text to lowercase instantly

**Value:**

Textarea with lazy formatter (on blur)This one is a little lazy!

**Value:**

HTML StackBlitz

vue

```
<template>
  <BFormGroup
    label="Textarea with formatter (on input)"
    label-for="textarea-formatter"
    description="We will convert your text to lowercase instantly"
    class="mb-0"
  >
    <BFormTextarea
      id="textarea-formatter"
      v-model="textFormatter"
      placeholder="Enter your text"
      :formatter="formatter"
    />
  </BFormGroup>

  <p style="white-space: pre-line"><b>Value:</b> {{ textFormatter }}</p>

  <BFormGroup
    label="Textarea with lazy formatter (on blur)"
    label-for="textarea-lazy"
    description="This one is a little lazy!"
    class="mb-0"
  >
    <BFormTextarea
      id="textarea-lazy"
      v-model="textFormatter2"
      placeholder="Enter your text"
      lazy-formatter
      :formatter="formatter"
    />
  </BFormGroup>

  <p
    class="mb-0"
    style="white-space: pre-line"
  >
    <b>Value:</b> {{ textFormatter2 }}
  </p>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const textFormatter = ref('')
const textFormatter2 = ref('')

const formatter = (value: string) => value.toLowerCase()
</script>
```

**Note:** With non-lazy formatting, if the cursor is not at the end of the input value, the cursor may jump to the end _after_ a character is typed. You can use the provided event object and the `event.target` to access the native input's selection methods and properties to control where the insertion point is. This is left as an exercise for the reader.

## Readonly plain text [​](#readonly-plain-text)

If you want to have `<BFormTextarea readonly>` elements in your form styled as plain text, set the `plaintext` prop (no need to set `readonly` as it will be set automatically) to remove the default form field styling and preserve the correct text size, margin, padding and height.

This is some text. It is read only and does not look like an input.

HTML StackBlitz

vue

```
<template>
  <BFormTextarea
    id="textarea-plaintext"
    plaintext
    :model-value="textReadOnly"
  />
</template>

<script setup lang="ts">
const textReadOnly = 'This is some text.\nIt is read only and does not look like an input.'
</script>
```

## Floating labels [​](#floating-labels)

When using [floating labels](/bootstrap-vue-next/docs/components/form.html#floating-labels) in `BFormTextsArea` controls, don't use the `rows` property to set a custom height. Instead set an explicit `height` (either inline or via custom CSS) as per the [Bootstrap 5 documentation](https://getbootstrap.com/docs/5.3/forms/floating-labels/#textareas).

type something

HTML StackBlitz

vue

```
<template>
  <BFormFloatingLabel
    label="type something"
    label-for="textarea-floatinglabel"
  >
    <BFormTextarea
      id="textarea-floatinglabel"
      v-model="textFloatingLabel"
      placeholder="Enter something..."
      style="height: 6rem"
    />
  </BFormFloatingLabel>

  <pre class="mt-3 mb-0">{{ textFloatingLabel }}</pre>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const textFloatingLabel = ref()
</script>
```

## `v-model` modifiers [​](#v-model-modifiers)

We support the native modifiers [`trim`, `lazy`, and `number`](https://vuejs.org/guide/essentials/forms.html#modifiers). They work as documented in vue.js, so there is no longer a need for `trim`, `lazy`, or `number` properties as in BSV.

## Debounce support [​](#debounce-support)

As an alternative to the `lazy` modifier prop, `<BFormTextarea>` optionally supports debouncing user input, updating the `v-model` after a period of idle time from when the last character was entered by the user (or a `change` event occurs). If the user enters a new character (or deletes characters) before the idle timeout expires, the timeout is re-started.

To enable debouncing, set the prop `debounce` to any integer greater than zero. The value is specified in milliseconds. Setting `debounce` to `0` will disable debouncing.

Note: debouncing will _not_ occur if the `lazy` prop is set.

HTML StackBlitz

vue

```
<template>
  <BFormTextarea
    id="textarea-debounce"
    v-model="textDebounce"
    rows="3"
    debounce="500"
  />

  <pre class="mt-3 mb-0">{{ textDebounce }}</pre>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const textDebounce = ref()
</script>
```

## Autofocus [​](#autofocus)

When the `autofocus` prop is set on `BFormTextarea`, the textarea will be auto-focused when it is inserted (i.e. **mounted**) into the document or re-activated when inside a Vue `KeepAlive` component. Note that this prop **does not** set the `autofocus` attribute on the textarea, nor can it tell when the textarea becomes visible.

## Native and custom events [​](#native-and-custom-events)

All native events are supported, without the need for the `.native` modifier.

See the [migration guide](/bootstrap-vue-next/docs/migration-guide.html#bform-components) for changes handling of the `change` and `input` events from bootstrap-vue.

## Exposed input properties and methods [​](#exposed-input-properties-and-methods)

`BFormTextarea` exposes the native textarea element and methods through template refs. See the [Component Reference Exposed section](#comp-reference-bformtextarea-exposed) for details.

You can access the native textarea element properties and methods, e.g. `<BFormTextarea ref="foo" ... />`, `const foo = ref<InstanceType<typeof BFormTextarea> | null>(null)`, and then `foo?.value?.element?.methodName` or `foo?.value?.element?.propertyName`

Select text

HTML StackBlitz

vue

```
<template>
  <BFormTextarea
    id="textarea"
    ref="textArea"
    v-model="textSelectEx"
    placeholder="Enter something..."
    rows="3"
  />

  <button
    class="btn btn-primary mt-1"
    @click="selectText"
  >
    Select text
  </button>
</template>

<script setup lang="ts">
import type {BFormTextarea} from 'bootstrap-vue-next'
import {ref} from 'vue'

const textSelectEx = ref('')
const textArea = ref<InstanceType<typeof BFormTextarea> | null>(null)

const selectText = () => {
  textArea?.value?.element?.select()
}
</script>
```

### Input properties [​](#input-properties)

| Property | Notes |
| --- | --- |
| `.selectionStart` | Read/Write |
| `.selectionEnd` | Read/Write |
| `.selectionDirection` | Read/Write |
| `.validity` | Read only |
| `.validationMessage` | Read only |
| `.willValidate` | Read only |

### Input methods [​](#input-methods)

| Method | Notes |
| --- | --- |
| `.focus()` | Focus the input |
| `.blur()` | Remove focus from the input |
| `.select()` | Selects all text within the input |
| `.setSelectionRange()` |  |
| `.setRangeText()` |  |
| `.setCustomValidity()` |  |
| `.checkValidity()` |  |
| `.reportValidity()` |  |

Refer to \[[https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)\] for more information on these methods and properties. Support will vary based on input type.

## Component Reference

### `<BFormTextarea>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormTextarea/BFormTextarea.vue)

-   [<BFormTextarea> Properties](#comp-reference-bformtextarea-properties)
-   [<BFormTextarea> Events](#comp-reference-bformtextarea-events)
-   [<BFormTextarea> Exposed](#comp-reference-bformtextarea-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `textarea`

##### [Properties](#comp-reference-bformtextarea-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-invalid | `AriaInvalid` | `undefined` | Sets the \`aria-invalid\` attribute value on the wrapper element. When not provided, the \`state\` prop will control the attribute |
| autocomplete | `string` | `'false'` | Sets the 'autocomplete' attribute value on the form control |
| autofocus | `boolean` | `false` | When set to \`true\`, attempts to auto-focus the control when it is mounted, or re-activated when in a keep-alive. Does not set the \`autofocus\` attribute on the control |
| debounce | `Numberish` | `'0'` | When set to a number of milliseconds greater than zero, will debounce the user input. Has no effect if prop 'lazy' is set |
| debounce-max-wait | `Numberish` | `'NaN'` | The maximum time in milliseconds allowed to be delayed before it''s invoked |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| form | `string` | `undefined` | ID of the form that the form control belongs to. Sets the \`form\` attribute on the control |
| formatter | `(val: string, evt: Event) => string` | `'undefined'` | Reference to a function for formatting the input |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| lazy-formatter | `boolean` | `'false'` | When set, the input is formatted on blur instead of each keystroke (if there is a formatter specified) |
| list | `string` | `'undefined'` | The ID of the associated datalist element or component |
| max-rows | `Numberish` | `'undefined'` | The maximum number of rows to display. Must be a value greater than 1 |
| model-value | `Numberish | null` | `'""'` | The current value of the textarea |
| name | `string` | `undefined` | Sets the value of the \`name\` attribute on the form control |
| no-auto-shrink | `boolean` | `false` | When set, disables the auto-shrink feature when the textarea is in auto-height mode |
| no-resize | `boolean` | `false` | When set, disables the browser's resize handle which prevents the user from changing the height of the textarea. Automatically set when in auto height mode |
| placeholder | `string` | `''''` | Sets the \`placeholder\` attribute value on the form control |
| plaintext | `boolean` | `'false'` | Set the form control as readonly and renders the control to look like plain text (no borders) |
| readonly | `boolean` | `'false'` | Sets the \`readonly\` attribute on the form control |
| required | `boolean` | `undefined` | Adds the \`required\` attribute to the form control |
| rows | `Numberish` | `2` | The minimum number of rows to display. Must be a value greater than 1 |
| size | `Size` | `undefined` | Set the size of the component's appearance. 'sm' or 'lg' |
| state | `ValidationState` | `undefined` | Controls the validation state appearance of the component. \`true\` for valid, \`false\` for invalid, or \`null\` for no validation state |
| wrap | `string` | `'soft'` | The value to place on the textarea's 'wrap' attribute. Controls how line breaks are returned |

##### [Events](#comp-reference-bformtextarea-events)

| Event | Args | Description |
| --- | --- | --- |
| update:model-value | 
`value``: string` - Value of textarea, after any formatting. Not emitted if the value does not change

 | Emitted when the selected value(s) are changed. Looking for the \`input\` or \`change\` event - use \`update:model-value\` instead. |

##### [Exposed](#comp-reference-bformtextarea-exposed)

| Name | Type | Description |
| --- | --- | --- |
| blur | `() => void` | Removes focus from the textarea element |
| element | `HTMLTextAreaElement` | Reference to the underlying textarea element |
| focus | `() => void` | Sets focus on the textarea element |
