# Form Input ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/form-input.html

##### On this page

-   [Input type ​](#input-type)
    -   [Range type input ​](#range-type-input)
        
-   [Control sizing ​](#control-sizing)
    
-   [Contextual states ​](#contextual-states)
    
-   [Live Example ​](#live-example)
    
-   [Conveying contextual state to assistive technologies and colorblind users ​](#conveying-contextual-state-to-assistive-technologies-and-colorblind-users)
    
-   [Formatter support ​](#formatter-support)
    
-   [Readonly plain text ​](#readonly-plain-text)
    
-   [Disabling mousewheel events on numeric-like inputs ​](#disabling-mousewheel-events-on-numeric-like-inputs)
    
-   [Datalist support ​](#datalist-support)
    
-   [v-model modifiers ​](#v-model-modifiers)
    
-   [Debounce support ​](#debounce-support)
    
-   [Autofocus ​](#autofocus)
    
-   [Native and custom events ​](#native-and-custom-events)
    
-   [Exposed input element ​](#exposed-input-element)
    -   [Input properties ​](#input-properties)
        
    -   [Input methods ​](#input-methods)
        
-   [Component Reference](#component-reference)
    -   [<BFormInput>](#b-form-input)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Exposed](#)
            

# Form Input [​](#form-input)

Create various type inputs such as: `text`, `password`, `number`, `url`, `email`, `search`, `range`, `date` and more.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormInput/BFormInput.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/form-input.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bforminput)

Value:

HTML StackBlitz

vue

```
<template>
  <BFormInput
    v-model="text"
    placeholder="Enter your name"
  />
  <div class="mt-2">Value: {{ text }}</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const text = ref('')
</script>
```

## Input type [​](#input-type)

`BFormInput` defaults to a `text` input, but you can set the `type` prop to one of the supported native browser HTML5 types: `text`, `password`, `email`, `number`, `url`, `tel`, `search`, `date`, `datetime-local`, `month`, `week`, `time`, `range`, or `color`.

Type `text`:

Type `number`:

Type `email`:

Type `password`:

Type `search`:

Type `url`:

Type `tel`:

Type `date`:

Type `time`:

Type `range`:

Type `color`:

Type `datetime-local`:

Type `month`:

Type `week`:

HTML StackBlitz

vue

```
<template>
  <BRow
    v-for="type in inputTypes"
    :key="type"
    class="my-1"
  >
    <BCol sm="3">
      <label :for="`type-${type}`"
        >Type <code>{{ type }}</code
        >:</label
      >
    </BCol>
    <BCol sm="9">
      <BFormInput
        :id="`type-${type}`"
        :type="type"
      />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import {type InputType} from 'bootstrap-vue-next'

const inputTypes = [
  'text',
  'number',
  'email',
  'password',
  'search',
  'url',
  'tel',
  'date',
  'time',
  'range',
  'color',
  'datetime-local',
  'month',
  'week',
] as InputType[]
</script>
```

If the `type` prop is set to an input type that is not supported (see above), a `text` input will be rendered and a console warning will be issued.

WARNING

**Caveats with input types:**

-   Not all browsers support all input types, nor do some types render in the same format across browser types/versions. Refer to [Can I use](https://caniuse.com/?search=input)
-   Browsers that do not support a particular type will fall back to a `text` input type (even though the rendered `type` attribute markup shows the requested type)
-   No testing is performed to see if the requested input type is supported by the browser
-   Chrome lost support for `datetime` in version 26, Opera in version 15, and Safari in iOS 7 Instead of using `datetime`, since support should be deprecated, use `date` and `time` as two separate inputs
-   `date` and `time` inputs are native browser types, and are not a custom date/time picker
-   For date and time style inputs, where supported, the displayed value in the GUI may be different from what is returned by its value (i.e. ordering of year-month-date)
-   Regardless of input type, the value is **always** returned as a string representation
-   Older version of Firefox may not support `readonly` for `range` type inputs
-   Input types that do not support `min`, `max` and `step` (i.e. `text`, `password`, `tel`, `email`, `url`, etc.) will silently ignore these values (although they will still be rendered on the input markup) if values are provided

**Caveats with predictive text entry and IME composition entry:**

-   When using predictive text auto-suggested words, the `v-model` will not update until the auto-suggested word is selected (or a space is typed). If an auto suggested word is not selected, the v-model will update with the current _displayed text_ of the input when the input is blurred
-   When using IME composition (i.e. Chinese, Japanese, etc.), the `v-model` will not update until the IME composition is completed

### Range type input [​](#range-type-input)

Inputs with type `range` render using Bootstrap v5's `.form-range` class. The track (the background) and thumb (the value) are both styled to appear the same across browsers.

Range inputs have implicit values for `min` and `max` of `0` and `100` respectively. You may specify new values for those using the `min` and `max` props.

Example range with min and max

Value: 2

HTML StackBlitz

vue

```
<template>
  <label for="range-1">Example range with min and max</label>
  <BFormInput
    id="range-1"
    v-model="value"
    type="range"
    min="0"
    max="5"
  />
  <div class="mt-2">Value: {{ value }}</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const value = ref('2')
</script>
```

By default, range inputs "snap" to integer values. To change this, you can specify a `step` value. In the example below, we double the number of steps by using step="0.5".

Example range with min and max

Value: 2

HTML StackBlitz

vue

```
<template>
  <label for="range-step">Example range with min and max</label>
  <BFormInput
    id="range-step"
    v-model="value"
    type="range"
    min="0"
    max="5"
    step="0.5"
  />
  <div class="mt-2">Value: {{ value }}</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const value = ref('2')
</script>
```

NOTE

Range inputs (as do all input types) return their value as a string. You may need to convert the value to a native number by using `Number(value)`, `parseInt(value, 10)`, `parseFloat(value)`, or use the `number` prop.

## Control sizing [​](#control-sizing)

Set heights using the `size` prop to `sm` or `lg` for small or large respectively.

To control width, place the input inside standard Bootstrap grid column.

Small:

Default:

Large:

HTML StackBlitz

template

```
<BRow class="my-1">
  <BCol sm="2">
    <label for="input-small">Small:</label>
  </BCol>
  <BCol sm="10">
    <BFormInput
      id="input-small"
      size="sm"
      placeholder="Enter your name"
    />
  </BCol>
</BRow>
<BRow class="my-1">
  <BCol sm="2">
    <label for="input-default">Default:</label>
  </BCol>
  <BCol sm="10">
    <BFormInput
      id="input-default"
      placeholder="Enter your name"
    />
  </BCol>
</BRow>
<BRow class="my-1">
  <BCol sm="2">
    <label for="input-large">Large:</label>
  </BCol>
  <BCol sm="10">
    <BFormInput
      id="input-large"
      size="lg"
      placeholder="Enter your name"
    />
  </BCol>
</BRow>
```

NOTE

Input type `range` currently does not support control sizing. If is placed inside a `BInputGroup` which has its `size` prop set, then the associated controls as sized, but the range control stays the same size.

The native HTML `<input>` attribute `size` (which sets a horizontal width on the `<input>` in characters) is not supported. Use styling, utility classes, or the layout rows (`BRow`) and columns (`BCol`) to set the desired width.

## Contextual states [​](#contextual-states)

Bootstrap includes validation styles for `valid` and `invalid` states on most form controls.

Generally speaking, you'll want to use a particular state for specific types of feedback:

-   `false` (denotes invalid state) is great for when there is a blocking or required field. A user must fill in this field properly to submit the form
-   `true` (denotes valid state) is ideal for situations when you have per-field validation throughout a form and want to encourage a user through the rest of the fields
-   `null` Displays no validation state (neither valid nor invalid)

To apply one of the contextual state icons on `BFormInput`, set the `state` prop to `false` (for invalid), `true` (for valid), or `null` (no validation state).

No State:

Valid State:

Invalid State:

HTML StackBlitz

template

```
<BRow class="my-1">
  <BCol sm="3">
    <label for="input-none">No State:</label>
  </BCol>
  <BCol sm="9">
    <BFormInput
      id="input-none"
      :state="null"
      placeholder="No validation"
    />
  </BCol>
</BRow>
<BRow class="my-1">
  <BCol sm="3">
    <label for="input-valid">Valid State:</label>
  </BCol>
  <BCol sm="9">
    <BFormInput
      id="input-valid"
      :state="true"
      placeholder="Valid input"
    />
  </BCol>
</BRow>
<BRow class="my-1">
  <BCol sm="3">
    <label for="input-invalid">Invalid State:</label>
  </BCol>
  <BCol sm="9">
    <BFormInput
      id="input-invalid"
      :state="false"
      placeholder="Invalid input"
    />
  </BCol>
</BRow>
```

## Live Example [​](#live-example)

Name:

Enter at least 3 letters

Your full name.

HTML StackBlitz

vue

```
<template>
  <div role="group">
    <label for="input-live">Name:</label>
    <BFormInput
      id="input-live"
      v-model.trim="value"
      :state="state"
      aria-describedby="input-live-help input-live-feedback"
      placeholder="Enter your name"
    />
    <!-- This will only be shown if the preceding input has an invalid state -->
    <BFormInvalidFeedback id="input-live-feedback"> Enter at least 3 letters </BFormInvalidFeedback>
    <!-- This is a form text block (formerly known as help block) -->
    <BFormText id="input-live-help">Your full name.</BFormText>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

const value = ref('')

const state = computed(() => (value.value?.length > 2 ? true : false))
</script>
```

TIP

Use the [`BFormGroup`](/bootstrap-vue-next/docs/components/form-group.html) component to automatically generate markup similar to above.

## Conveying contextual state to assistive technologies and colorblind users [​](#conveying-contextual-state-to-assistive-technologies-and-colorblind-users)

Using these contextual sta tes to denote the state of a form control only provides a visual, color-based indication, which will not be conveyed to users of assistive technologies - such as screen readers - or to colorblind users.

Ensure that an alternative indication of state is also provided. For instance, you could include a hint about state in the form control's `<label>` text itself, or by providing an additional help text block.

Specifically for assistive technologies, invalid form controls can also be assigned an `aria-invalid="true"` attribute.

When `BFormInput` has an invalid contextual state (i.e. state is `false`) you may also want to set the `BFormInput` prop `aria-invalid` to `true`, or to one of the supported values:

-   `false`: Convey no errors detected (default)
-   `true` (or `'true'`): Convey that the value has failed validation
-   `'grammar'` Convey that a grammatical error has been detected
-   `'spelling'` Convey that a spelling error has been detected

If `aria-invalid` is not explicitly set and `state` is set to `false`, then the `aria-invalid` attribute on the input will automatically be set to `'true'`;

## Formatter support [​](#formatter-support)

`BFormInput` optionally supports formatting by passing a function reference to the `formatter` prop.

Formatting (when a formatter function is supplied) occurs when the control's native `input` and `change` events fire. You can use the boolean prop `lazy-formatter` to restrict the formatter function to being called on the control's native `blur` event.

The `formatter` function receives two arguments: the raw `value` of the input element, and the native `event` object that triggered the format (if available).

The `formatter` function should return the formatted value as a _string_.

Formatting does not occur if a `formatter` is not provided.

Text input with formatter (on input)

**Value:**

Text input with lazy formatter (on blur)

**Value:**

HTML StackBlitz

vue

```
<template>
  <div role="group">
    <label for="input-formatter">Text input with formatter (on input)</label>
    <BFormInput
      id="input-formatter"
      v-model="text"
      placeholder="Enter your name"
      :formatter="toLowerCaseFormatter"
    />
    <p><b>Value:</b> {{ text }}</p>
  </div>

  <div role="group">
    <label for="input-formatter">Text input with lazy formatter (on blur)</label>
    <BFormInput
      id="input-lazy"
      v-model="lazyText"
      placeholder="Enter your name"
      lazy-formatter
      :formatter="toLowerCaseFormatter"
    />
    <p><b>Value:</b> {{ lazyText }}</p>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const text = ref('')
const lazyText = ref('')

const toLowerCaseFormatter = (value: string) => value.toLowerCase()
</script>
```

NOTE

When using a non-text-like input (i.e. `color`, `range`, `date`, `number`, `email` etc.), ensure that your formatter function returns the value in the expected format (`date` -> '2000-06-01', `color` -> '#ff0000', etc.) for the input type. The formatter **must** return the value as a _string_.

With non-lazy formatting, if the cursor is not at the end of the input value, the cursor may jump to the end _after_ a character is typed. You can use the provided event object and the `event.target` to access the native input's selection methods and properties to control where the insertion point is. This is left as an exercise for the reader.

## Readonly plain text [​](#readonly-plain-text)

If you want to have `<BFormInput readonly>` elements in your form styled as plain text, set the `plaintext` prop (no need to set `readonly`) to remove the default form field styling and preserve the correct margin and padding.

The `plaintext` option is not supported by input types `color` or `range`.

## Disabling mousewheel events on numeric-like inputs [​](#disabling-mousewheel-events-on-numeric-like-inputs)

By default, when a numeric input has focus, the browser will increment or decrement the input's value when the user scrolls the mousewheel. To disable this behavior, you can use Vue's event modifier `.prevent` on the `wheel` event:

vue

```
<BFormInput type="number" @wheel.prevent />
```

This approach uses native Vue functionality and doesn't require additional props.

## Datalist support [​](#datalist-support)

Datalists are a native HTML tag `<datalist>` that contains a list of `<option>` tags. By assigning an ID to the datalist tag, the list can be references from a text input by adding a `list` attribute.

This gives the input the behavior of a combo box or auto-complete, allowing existing values to be chosen, or new values to be entered.

Manual OptionSmallMediumLargeExtra Large

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormInput list="my-list-id" />

    <datalist id="my-list-id">
      <option>Manual Option</option>
      <option
        v-for="size in datalistSizes"
        :key="size"
      >
        {{ size }}
      </option>
    </datalist>
  </div>
</template>

<script setup lang="ts">
const datalistSizes = ['Small', 'Medium', 'Large', 'Extra Large']
</script>
```

The above is a 'native' implementation of `datalist`. BootstrapVueNext provides the form helper component [`<BFormDatalist>`](/bootstrap-vue-next/docs/components/form.html#datalist-helper) for quickly creating a `<datalist>` from an array of options using the same options object as [`<BFormSelect>`](/bootstrap-vue-next/docs/components/form-select.html#options-property).

**Notes:**

-   Datalists work in conjunction with the browser's built in auto-complete, displaying datalist options first, followed by auto-complete options. To only display datalist options, set `autocomplete="off"` on `<BFormInput>`.
-   Datalists **cannot** be applied to input fields with type `password`, `range` or `color`.
-   Not all browsers fully support `<datalist>` and implementations can be buggy. It is recommended that datalists be treated as an enhancement and not be relied upon at this time. Check [Can I use](https://caniuse.com/datalist) for full support details on all browsers. In particular chromium based browsers display both the text and value of object in the options list.

## `v-model` modifiers [​](#v-model-modifiers)

We support the native modifiers [`trim`, `lazy`, and `number`](https://vuejs.org/guide/essentials/forms.html#modifiers). They work as documented in vue.js, so there is no longer a need for `trim`, `lazy`, or `number` properties as in BSV.

## Debounce support [​](#debounce-support)

As an alternative to the `lazy` modifier prop, `<BFormInput>` optionally supports debouncing user input, updating the `v-model` after a period of idle time from when the last character was entered by the user (or a `change` event occurs). If the user enters a new character (or deletes characters) before the idle timeout expires, the timeout is re-started.

To enable debouncing, set the prop `debounce` to any integer greater than zero. The value is specified in milliseconds. Setting `debounce` to `0` will disable debouncing.

NOTE

Debouncing will _not_ occur if the `lazy` prop is set.

Manual OptionSmallMediumLargeExtra Large

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormInput list="my-list-id" />

    <datalist id="my-list-id">
      <option>Manual Option</option>
      <option
        v-for="size in datalistSizes"
        :key="size"
      >
        {{ size }}
      </option>
    </datalist>
  </div>
</template>

<script setup lang="ts">
const datalistSizes = ['Small', 'Medium', 'Large', 'Extra Large']
</script>
```

## Autofocus [​](#autofocus)

When the `autofocus` prop is set, the input will be auto-focused when it is inserted (i.e. **mounted**) into the document, or re-activated when inside a Vue `KeepAlive` component. Note that this prop **does not** set the `autofocus` attribute on the input, nor can it tell when the input becomes visible.

## Native and custom events [​](#native-and-custom-events)

All native events are supported, without the need for the `.native` modifier.

See the [migration guide](/bootstrap-vue-next/docs/migration-guide.html#bform-components) for changes handling of the `change` and `input` events from bootstrap-vue.

## Exposed input element [​](#exposed-input-element)

`BFormInput` exposes the native input element and methods through template refs. See the [Component Reference Exposed section](#comp-reference-bforminput-exposed) for details.

You can access the native input element properties and methods, e.g. `<BFormInput ref="foo" ... />`, `const foo = ref<InstanceType<typeof BFormInput> | null>(null)`, and then `foo?.value?.element?.methodName` or `foo?.value?.element?.propertyName`

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

Refer to [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) for more information on these methods and properties. Support will vary based on input type.

`BFormInput` also exposes two methods on the component: `focus` and `blur`.

e.g. With the same setup as above, call `foo?.value?.element?.focus` to set the foccus on the input element.

Select all text

Set Focus

HTML StackBlitz

vue

```
<template>
  <div role="group">
    <BFormInput
      ref="inputRef"
      v-model="value"
      placeholder="Enter your name"
    />
  </div>
  <div class="mt-2">
    <BButton
      primary
      @click="selectAllText"
      >Select all text</BButton
    >
  </div>
  <div class="mt-2">
    <BButton
      primary
      @click="inputRef?.focus"
      >Set Focus</BButton
    >
  </div>
</template>

<script setup lang="ts">
import {ref, useTemplateRef} from 'vue'
import {BFormInput} from 'bootstrap-vue-next'

// refs are unified in vue3. We need a ref variable with the same name as used in the template.
// The variable will be filled up during mount with the reference to custom component.
// inputRef will become the reference to the b-form-input component.
const inputRef = useTemplateRef('inputRef')
const value = ref('sample text')

// The inner native input is exposed as ref with name "element"
const selectAllText = () => inputRef?.value?.element?.select()
</script>
```

## Component Reference

### `<BFormInput>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormInput/BFormInput.vue)

-   [<BFormInput> Properties](#comp-reference-bforminput-properties)
-   [<BFormInput> Events](#comp-reference-bforminput-events)
-   [<BFormInput> Exposed](#comp-reference-bforminput-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.form‑input`

##### [Properties](#comp-reference-bforminput-properties)

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
| max | `Numberish` | `'undefined'` | Sets the 'max' attribute on the input; used by number-like input types |
| min | `Numberish` | `'undefined'` | Sets the 'min' attribute on the input; used by number-like input types |
| model-value | `Numberish | null` | `''''` | The current value of the input |
| name | `string` | `undefined` | Sets the value of the \`name\` attribute on the form control |
| placeholder | `string` | `''''` | Sets the \`placeholder\` attribute value on the form control |
| plaintext | `boolean` | `'false'` | Set the form control as readonly and renders the control to look like plain text (no borders) |
| readonly | `boolean` | `'false'` | Sets the \`readonly\` attribute on the form control |
| required | `boolean` | `undefined` | Adds the \`required\` attribute to the form control |
| size | `Size` | `undefined` | Set the size of the component's appearance. 'sm' or 'lg' |
| state | `ValidationState` | `undefined` | Controls the validation state appearance of the component. \`true\` for valid, \`false\` for invalid, or \`null\` for no validation state |
| step | `Numberish` | `'undefined'` | Sets the 'step' attribute on the input; used by number-like input types |
| tooltip | `boolean` | `false` | Renders the feedback text in a rudimentary tooltip style |
| type | `InputType` | `'text'` | The type of input to render; refer to documentation for supported types |

##### [Events](#comp-reference-bforminput-events)

| Event | Args | Description |
| --- | --- | --- |
| update:model-value | 
`value``: string` - The new value of the input after any formatting; not emitted if the value remains unchanged

 | Emitted when the input value changes; use \`update:model-value\` instead of \`input\` or \`change\` events |

##### [Exposed](#comp-reference-bforminput-exposed)

| Name | Type | Description |
| --- | --- | --- |
| blur | `() => void` | Removes focus from the input element |
| element | `HTMLInputElement` | Reference to the underlying input element |
| focus | `() => void` | Sets focus on the input element |
