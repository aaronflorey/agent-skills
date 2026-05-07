# Form Group ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/form-group.html

##### On this page

-   [Label ​](#label)
    -   [Automatic Inheriting of id ​](#automatic-inheriting-of-id)
        
    -   [Horizontal layout ​](#horizontal-layout)
        
    -   [Label size ​](#label-size)
        
    -   [Label text alignment ​](#label-text-alignment)
        
    -   [Customizing wrapper elements in horizontal layout ​](#customizing-wrapper-elements-in-horizontal-layout)
        
-   [Nested form groups ​](#nested-form-groups)
    
-   [Disabled form group ​](#disabled-form-group)
    
-   [Validation state feedback ​](#validation-state-feedback)
    -   [Automatic passing of state to child ​](#automatic-passing-of-state-to-child)
        
    -   [Invalid feedback ​](#invalid-feedback)
        
    -   [Valid feedback ​](#valid-feedback)
        
    -   [Feedback style ​](#feedback-style)
        
    -   [Feedback limitations ​](#feedback-limitations)
        
-   [Floating labels ​](#floating-labels)
    -   [Example ​](#example)
        
    -   [Restrictions ​](#restrictions)
        
-   [Accessibility ​](#accessibility)
    
-   [Component Reference](#component-reference)
    -   [<BFormGroup>](#b-form-group)
        -   [Properties](#)
            
        -   [Slots](#)
            

# Form Group [​](#form-group)

The `BFormGroup` component is the easiest way to add some structure to forms. Its purpose is to pair form controls with a legend or label, and to provide help text and invalid/valid feedback text, as well as visual (color) contextual state feedback.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormGroup/BFormGroup.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/form-group.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bformgroup)

Enter your name

Please enter something.

Thank you!

Let us know your name.

Name:

HTML StackBlitz

vue

```
<template>
  <BFormGroup
    id="fieldset-1"
    description="Let us know your name."
    label="Enter your name"
    label-for="input-1"
    valid-feedback="Thank you!"
    :invalid-feedback="invalidFeedback"
    :state="state"
    label-class="mb-1"
  >
    <BFormInput
      id="input-1"
      v-model="name"
      :state="state"
      trim
    />
  </BFormGroup>
  <div>
    Name: <strong>{{ name }}</strong>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

const name = ref('')

const state = computed(() => name.value.length >= 4)
const invalidFeedback = computed(() =>
  name.value.length > 0 ? 'Enter at least 4 characters.' : 'Please enter something.'
)
</script>
```

## Label [​](#label)

Use the prop `label` to set the content of the generated `<legend>` or `<label>` element, or by using the named slot `label`, You may optionally visually hide the label text while still making it available to screen readers by setting the prop `label-visually-hidden`.

`BFormGroup` will render a `<fieldset>` with `<legend>` if the `label-for` prop is not set. If an input Id is provided to the `label-for` prop, then a `<div>` with `<label>` will be rendered.

If you provide an input `id` value to the `label-for` prop (the `id` must exist on the input contained within the `BFormGroup`), a `<label>` element will be rendered instead of a `<legend>` element, and will have the `for` attribute set to the `id` specified. When specifying the id, **do not** prepend it with `#`. The `label-for` prop should only be used when you have a single form input inside the `BFormGroup` component. Do not set the `label-for` prop when using `BFormRadioGroup`, `BFormCheckboxGroup`, `BFormRadio`, `BFormCheckbox` or `BFormFile` components (or when placing multiple inputs in the same form group), as these inputs include integrated label element(s) and the `<legend>` element is more suitable.

You can also apply additional classes to the label via the `label-class` prop, such as responsive padding and text alignment utility classes. The `label-class` prop accepts either a string or array of strings.

### Automatic Inheriting of id [​](#automatic-inheriting-of-id)

The `BFormGroup` component automatically inherits the id of its child input components, such as BFormInput and BFormTextarea. This functionality ensures that the label element's for attribute is correctly set to match the id of the input component, providing proper association between the label and the input field.

Enter your name

HTML StackBlitz

template

```
<BFormGroup label="Enter your name">
  <BFormInput id="input-id" />
</BFormGroup>
```

### Horizontal layout [​](#horizontal-layout)

By default, the label appears above the input element(s), but you may optionally render horizontal (label to the left of the input) at the various standard Bootstrap breakpoints.

The props `label-cols` and `label-cols-{breakpoint}` allow you to specify how many columns the label should occupy in the row. The input will fill the rest of the row width. The value must be a number greater than `0`. Or you can set the prop to `true` to make the label and input(s) each occupy half of the width of the rendered row (handy if you have custom Bootstrap with an odd number of columns), or set the value to `'auto'` so that the label occupies only the width that is needed.

It is also possible to specify how many columns the content should occupy in the row via the `content-cols` and `content-cols-{breakpoint}` props.

When using both, the `label-cols` and `content-cols` props, make sure that the total amount of columns does not exceed `12`.

See the [Grid System](/bootstrap-vue-next/docs/components/grid-system.html#how-it-works) docs for further information.

| Prop | Description |
| --- | --- |
| `label-cols` | Applies to breakpoint `xs` up |
| `label-cols-sm` | Applies to breakpoint `sm` and up |
| `label-cols-md` | Applies to breakpoint `md` and up |
| `label-cols-lg` | Applies to breakpoint `lg` and up |
| `label-cols-xl` | Applies to breakpoint `xl` and up |
| `content-cols` | Applies to breakpoint `xs` up |
| `content-cols-sm` | Applies to breakpoint `sm` and up |
| `content-cols-md` | Applies to breakpoint `md` and up |
| `content-cols-lg` | Applies to breakpoint `lg` and up |
| `content-cols-xl` | Applies to breakpoint `xl` and up |

Enter your name

Let us know your name.

HTML StackBlitz

template

```
<BFormGroup
  id="fieldset-horizontal"
  label-cols-sm="4"
  label-cols-lg="3"
  content-cols-sm
  content-cols-lg="7"
  description="Let us know your name."
  label="Enter your name"
  label-for="input-horizontal"
>
  <BFormInput id="input-horizontal" />
</BFormGroup>
```

You can also set the label cols to `'auto'`.

### Label size [​](#label-size)

You can control the label text size match the size of your form input(s) via the optional `label-size` prop. Values can be `'sm'` or `'lg'` for small or large label, respectively. Sizes work for both horizontal and non-horizontal form groups.

Small

Default

Large

HTML StackBlitz

template

```
<BFormGroup
  label-cols="4"
  label-cols-lg="2"
  label-size="sm"
  label="Small"
  label-for="input-sm"
  class="my-1"
>
  <BFormInput
    id="input-sm"
    size="sm"
  />
</BFormGroup>
<BFormGroup
  label-cols="4"
  label-cols-lg="2"
  label="Default"
  label-for="input-default"
  class="my-1"
>
  <BFormInput id="input-default" />
</BFormGroup>
<BFormGroup
  label-cols="4"
  label-cols-lg="2"
  label-size="lg"
  label="Large"
  label-for="input-lg"
  class="my-1"
>
  <BFormInput
    id="input-lg"
    size="lg"
  />
</BFormGroup>
```

### Label text alignment [​](#label-text-alignment)

The label text may also optionally be aligned `start`, `center` or `end` by setting the respective value via the prop `label-text-align` and/or `label-align-{breakpoint}`.

| Prop | Description |
| --- | --- |
| `label-align` | Applies to breakpoint `xs` up |
| `label-align-sm` | Applies to breakpoint `sm` and up |
| `label-align-md` | Applies to breakpoint `md` and up |
| `label-align-lg` | Applies to breakpoint `lg` and up |
| `label-align-xl` | Applies to breakpoint `xl` and up |

Alignment has no effect if the `label-visually-hidden` prop is set.

### Customizing wrapper elements in horizontal layout [​](#customizing-wrapper-elements-in-horizontal-layout)

When using horizontal layout (with `label-cols` or `content-cols` props), the label and content are wrapped in column elements. You can apply additional attributes, classes, or styles to these wrapper elements using the `label-wrapper-attrs` and `content-wrapper-attrs` props.

This is particularly useful when you need to override the default column widths with custom sizing:

My Label:

HTML StackBlitz

template

```
<BFormGroup
  label="My Label:"
  label-for="my-input"
  label-cols-md="3"
  :label-wrapper-attrs="{
    class: 'custom-label-width',
    style: 'flex: 0 0 120px; max-width: 120px;',
  }"
>
  <BFormInput id="my-input" />
</BFormGroup>
```

**Important Notes:**

-   These props **only apply in horizontal layout mode** (when `label-cols` or `content-cols` is set)
-   `label-wrapper-attrs` applies to the column wrapper around the label element
-   `content-wrapper-attrs` applies to the column wrapper around the content/input
-   Use `label-class` if you need to style the `<label>` or `<legend>` element itself
-   The `class` property in wrapper attrs will be merged with the Bootstrap column classes

**Common use case:** You need more precise control over column widths than Bootstrap's 12-column grid provides. For example, setting a label to exactly 120px wide using flexbox properties:

Active:

HTML StackBlitz

vue

```
<template>
  <BFormGroup
    label="Active:"
    label-for="status"
    label-align-md="end"
    label-cols-md="3"
    :label-wrapper-attrs="{
      class: 'custom-label-field',
    }"
  >
    <BFormCheckbox
      id="status"
      switch
    />
  </BFormGroup>
</template>

<style scoped>
@media (min-width: 768px) {
  :deep(.custom-label-field) {
    flex: 0 0 120px !important;
    max-width: 120px !important;
  }
}
</style>
```

## Nested form groups [​](#nested-form-groups)

Feel free to nest `BFormGroup` components to produce advanced form layouts and semantic grouping of related form controls:

Shipping Address

Street:

City:

State:

Country:

Ship via:

Air

Courier

Mail

HTML StackBlitz

template

```
<BCard bg-variant="light">
  <BFormGroup
    label-cols-lg="3"
    label="Shipping Address"
    label-size="lg"
    label-class="fw-bold pt-0"
    class="mb-0"
  >
    <BFormGroup
      label="Street:"
      label-for="nested-street"
      label-cols-sm="3"
      label-align-sm="end"
    >
      <BFormInput id="nested-street" />
    </BFormGroup>
    <BFormGroup
      label="City:"
      label-for="nested-city"
      label-cols-sm="3"
      label-align-sm="end"
    >
      <BFormInput id="nested-city" />
    </BFormGroup>
    <BFormGroup
      label="State:"
      label-for="nested-state"
      label-cols-sm="3"
      label-align-sm="end"
    >
      <BFormInput id="nested-state" />
    </BFormGroup>
    <BFormGroup
      label="Country:"
      label-for="nested-country"
      label-cols-sm="3"
      label-align-sm="end"
    >
      <BFormInput id="nested-country" />
    </BFormGroup>
    <BFormGroup
      label="Ship via:"
      label-cols-sm="3"
      label-align-sm="end"
      class="mb-0"
    >
      <BFormRadioGroup
        class="pt-2"
        :options="['Air', 'Courier', 'Mail']"
      />
    </BFormGroup>
  </BFormGroup>
</BCard>
```

## Disabled form group [​](#disabled-form-group)

Setting the `disabled` prop will disable the rendered `<fieldset>` and, on most browsers, will disable all the input elements contained within the fieldset.

`disabled` has no effect when `label-for` is set (as a `<fieldset>` element is not rendered).

## Validation state feedback [​](#validation-state-feedback)

Bootstrap includes validation styles for `valid` and `invalid` states on most form controls.

Generally speaking, you'll want to use a particular state for specific types of feedback:

-   `false` (denotes invalid state) is great for when there is a blocking or required field. A user must fill in this field properly to submit the form
-   `true` (denotes valid state) is ideal for situations when you have per-field validation throughout a form and want to encourage a user through the rest of the fields
-   `null` Displays no validation state (neither valid nor invalid)

To apply one of the contextual state icons on `BFormGroup`, set the `state` prop to `false` (for invalid), `true` (for valid), or `null` (no validation state).

Bootstrap v5 uses sibling CSS selectors of `:invalid` or `:valid` inputs to show the feedback text. Some form controls (such as checkboxes, radios, and file inputs, or inputs inside input-groups) are wrapped in additional markup that will no longer make the feedback text a sibling of the input, and hence the feedback will not show. In these situations you will need to set the validity `state` on the `BFormGroup` _as well as_ the input.

Feedback will be shown if the parent `BForm` component does _not_ have the `novalidate` prop set (or set to `false`) along with the `validated` prop set (and the input fails or passes native browser validation constraints such as `required`). Refer to Bootstrap 5's [Forms Validation](https://getbootstrap.com/docs/5.3/forms/validation) documentation for details on validation methods.

You should always provide content via the `invalid-feedback` prop (or slot) to aid users using assistive technologies when setting a contextual `invalid` state.

### Automatic passing of state to child [​](#automatic-passing-of-state-to-child)

For some elements the child input element will automatically receive the state of the form group. `:state="false"` on the `BFormGroup` will automatically give the appropriate class to the input element. Explicit sets of the `state` prop to the child element will override this.

HTML StackBlitz

template

```
<BCard>
  <BFormGroup
    :state="false"
    class="mb-2"
  >
    <BFormInput />
  </BFormGroup>
  <BFormGroup :state="false">
    <!-- Use the state prop to override this behavior -->
    <BFormInput :state="null" />
  </BFormGroup>
</BCard>
```

### Invalid feedback [​](#invalid-feedback)

Show optional invalid state feedback text to provide textual state feedback (html supported) by setting the prop `invalid-feedback` or using the named slot `invalid-feedback`.

Invalid feedback is rendered using the [`BFormInvalidFeedback`](/bootstrap-vue-next/docs/components/form.html#helper-components) form sub-component.

### Valid feedback [​](#valid-feedback)

Show optional valid state feedback text to provide textual state feedback (html supported) by setting the prop `valid-feedback` or using the named slot `valid-feedback`.

Valid feedback is rendered using the [`BFormValidFeedback`](/bootstrap-vue-next/docs/components/form.html#helper-components) form sub-component.

### Feedback style [​](#feedback-style)

By default, when visible, feedback (valid or invalid) will show as a block of text. You can change the feedback so that it shows as a static tooltip when visible, by setting the prop `tooltip` to `true`.

### Feedback limitations [​](#feedback-limitations)

::: Info NOTE When using `BInputGroup`, `BFormFile`, `BFormRadioGroup`, `BFormRadio`, `BFormCheckboxGroup` or `BFormCheckbox` inside a `BFormGroup`, setting an invalid (or valid) `state` on the `input` alone will **not** trigger the invalid (or valid) feedback to show (due to limitations with the Bootstrap 5 validation CSS). To get around this, **you must also** set the invalid/valid `state` on `BFormGroup`. Native browser validation will **not** trigger the invalid feedback to show when using one of the above-mentioned form controls. :::

## Floating labels [​](#floating-labels)

BFormGroup supports the new [Floating labels](https://getbootstrap.com/docs/5.3/forms/floating-labels/) feature of Bootstrap 5.

You can make a floating label by setting the property `floating` to true and specify a placeholder on the `BFormInput`.

### Example [​](#example)

Name

Please enter something.

Thank you!

Let us know your name.

Name:

HTML StackBlitz

vue

```
<template>
  <BFormGroup
    id="fieldset-4"
    description="Let us know your name."
    label="Name"
    label-for="input-floating-4"
    valid-feedback="Thank you!"
    :invalid-feedback="floatingInvalidFeedback"
    :state="floatingState"
    floating
  >
    <BFormInput
      id="input-floating-4"
      v-model="floatingName"
      :state="floatingState"
      trim
      placeholder="Enter your name please"
    />
  </BFormGroup>
  <div>
    Name: <strong>{{ floatingName }}</strong>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

const floatingName = ref('')

const floatingState = computed(() => floatingName.value.length >= 4)
const floatingInvalidFeedback = computed(() =>
  floatingName.value.length > 0 ? 'Enter at least 4 characters.' : 'Please enter something.'
)
</script>
```

### Restrictions [​](#restrictions)

There are restrictions on the use of floating labels.

-   Floating labels do not work in horizontal layout. Horizontal layout precedes the `floating` property. Do not set any of the `content-cols-` or `label-cols-` properties if you want floating labels.
-   The `BFormInput` must have a placeholder property set.

## Accessibility [​](#accessibility)

By default, when no `label-for` value is provided, `BFormGroup` renders the input control(s) inside an HTML `<fieldset>` element with the label content placed inside the fieldset's `<legend>` element. By nature of this markup, the legend content is automatically associated to the containing input control(s).

It is **highly recommended** that you provide a unique `id` prop on your input element and set the `label-for` prop to this Id, when you have only a single input in the `BFormGroup`.

When multiple form controls are placed inside `BFormGroup` (i.e. a series or radio or checkbox inputs, or a series of related inputs), **do not set** the `label-for` prop, as a label can only be associated with a single input. It is best to use the default rendered markup that produces a `<fieldset>` + `<legend>` which will describe the group of inputs.

When placing multiple form controls inside a `BFormGroup` (and you are not nesting `BFormGroup` components), it is recommended to give each control its own associated `label` (which may be visually hidden using the `.visually-hidden` class) and set the labels `for` attribute to the `id` of the associated input control. Alternatively, you can set the `aria-label` attribute on each input control instead of using a `label`. For `BFormRadio` and `BFormCheckbox` (or the group versions), you do not need to set individual labels, as the rendered markup for these types of inputs already includes a `label` element.

When the `BFormGroup` has a `label-for` prop set, the `aria-describedby` attribute will be auto-assigned to the input. When the form group has multiple form controls, make sure to set the attribute to each control yourself by using the `ariaDescribedby` prop value from the optionally scoped `default` slot.

## Component Reference

### `<BFormGroup>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormGroup/BFormGroup.vue)

-   [<BFormGroup> Properties](#comp-reference-bformgroup-properties)
-   [<BFormGroup> Slots](#comp-reference-bformgroup-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.form‑group`

##### [Properties](#comp-reference-bformgroup-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-invalid | `AriaInvalid` | `undefined` | Sets the \`aria-invalid\` attribute value on the wrapper element. When not provided, the \`state\` prop will control the attribute |
| content-cols | `boolean | number | string` | `'undefined'` | Number of columns for the content width 'xs' screens and up |
| content-cols-lg | `boolean | number | string` | `'undefined'` | Number of columns for the content width 'lg' screens and up |
| content-cols-md | `boolean | number | string` | `'undefined'` | Number of columns for the content width 'md' screens and up |
| content-cols-sm | `boolean | number | string` | `'undefined'` | Number of columns for the content width 'sm' screens and up |
| content-cols-xl | `boolean | number | string` | `'undefined'` | Number of columns for the content width 'xl' screens and up |
| description | `string` | `'undefined'` | Text to place in the help text area of the form group |
| disabled | `boolean` | `false` | Disables the fieldset element, which in turn disables the form controls (on browsers that support disabled fieldsets). Has no effect if \`label-for\` is set |
| feedback-aria-live | `string` | `''assertive''` | Value to use for the \`aria-live\` attribute on the feedback text |
| floating | `boolean` | `'undefined'` | When set, renders the label in the floating style |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| invalid-feedback | `string` | `'undefined'` | Text to show when the form group has an invalid state |
| label | `string` | `'undefined'` | Text to place in the label/legend of the form group |
| label-align | `string` | `'undefined'` | Text alignment 'left', 'center', 'right' for the label 'xs' screens and up |
| label-align-lg | `string` | `'undefined'` | Text alignment 'left', 'center', 'right' for the label 'lg' screens and up |
| label-align-md | `string` | `'undefined'` | Text alignment 'left', 'center', 'right' for the label 'md' screens and up |
| label-align-sm | `string` | `'undefined'` | Text alignment 'left', 'center', 'right' for the label 'sm' screens and up |
| label-align-xl | `string` | `'undefined'` | Text alignment 'left', 'center', 'right' for the label 'xl' screens and up |
| label-class | `string[] | Record<string, unknown> | string` | `'undefined'` | CSS class (or classes) to add to the label/legend element |
| label-cols | `boolean | number | string` | `'undefined'` | Number of columns for the label width 'xs' screens and up |
| label-cols-lg | `boolean | number | string` | `'undefined'` | Number of columns for the label width 'lg' screens and up |
| label-cols-md | `boolean | number | string` | `'undefined'` | Number of columns for the label width 'md' screens and up |
| label-cols-sm | `boolean | number | string` | `'undefined'` | Number of columns for the label width 'sm' screens and up |
| label-cols-xl | `boolean | number | string` | `'undefined'` | Number of columns for the label width 'xl' screens and up |
| label-for | `string` | `'undefined'` | Set to the ID of the singular form control in the form group. Do not set a value if there is more than one form control in the group |
| label-size | `string` | `'undefined'` | Sets the text size of the label: 'sm' or 'lg'. Use this prop to have the label size match the form control size |
| label-visually-hidden | `boolean` | `'false'` | Visually hides the label content, but makes it available to screen reader users |
| state | `ValidationState` | `undefined` | Controls the validation state appearance of the component. \`true\` for valid, \`false\` for invalid, or \`null\` for no validation state |
| tooltip | `boolean` | `false` | Renders the feedback text in a rudimentary tooltip style |
| valid-feedback | `string` | `'undefined'` | Text to show when the form group has a valid state |
| validated | `boolean` | `'undefined'` | When set, adds the Bootstrap validation trigger class 'was-validated' on the component |

##### [Slots](#comp-reference-bformgroup-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default | 
`aria-describedby``: string` - The value for the \`aria-describedby\` attribute for input elements in the form group. Will be auto-assigned when \`label-for\` prop is given

`id``: string` - The ID of the form group. Will equal \`id\` prop, when provided

`description-id``: string` - The ID of the description element. Will be \`null\` when no description content given

`label-id``: string` - The ID of the label element. Will be \`null\` when no description content given

 | Content to place in the form group |
| description |  | Content to place in the description area. Overrides the \`description\` prop |
| invalid-feedback |  | Content to place in the invalid feedback area. Overrides the \`invalid-feedback\` prop |
| label |  | Content to place inside the label element. Overrides the \`label\` prop |
| valid-feedback |  | Content to place in the valid feedback area. Overrides the \`valid-feedback\` prop |
