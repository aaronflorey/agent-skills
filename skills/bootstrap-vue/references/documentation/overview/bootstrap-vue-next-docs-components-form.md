# Form ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/form.html

##### On this page

-   [Introduction to forms and controls ​](#introduction-to-forms-and-controls)
    
-   [Inline form ​](#inline-form)
    
-   [Floating Labels ​](#floating-labels)
    
-   [Accessibility ​](#accessibility)
    
-   [Related form control and layout components ​](#related-form-control-and-layout-components)
    
-   [Form helper components ​](#form-helper-components)
    -   [Form text helper ​](#form-text-helper)
        
    -   [Feedback helpers ​](#feedback-helpers)
        
    -   [Datalist helper ​](#datalist-helper)
        -   [TypeScript Type Safety ​](#typescript-type-safety)
            
-   [Validation ​](#validation)
    
-   [Component Reference](#component-reference)
    -   [<BForm>](#b-form)
        -   [Properties](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            
    -   [<BFormDatalist>](#b-form-datalist)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BFormFloatingLabel>](#b-form-floating-label)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BFormInvalidFeedback>](#b-form-invalid-feedback)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BFormRow>](#b-form-row)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BFormText>](#b-form-text)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BFormValidFeedback>](#b-form-valid-feedback)
        -   [Properties](#)
            
        -   [Slots](#)
            

# Form [​](#form)

BootstrapVueNext form component and helper components that optionally support inline form styles and validation states. Pair them up with other BootstrapVueNext form control components for an easy customized, and responsive, layout with a consistent look and feel.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BForm/BForm.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/form.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bform)

## Introduction to forms and controls [​](#introduction-to-forms-and-controls)

Be sure to use an appropriate `type` on all inputs (e.g., `email` for email address or `number` for numerical information) to take advantage of newer input controls like email verification, number selection, and more.

Here is a quick example to demonstrate BootstrapVueNext's form styles. Keep reading for documentation on supported components, form layout, and more.

Email address:We'll never share your email with anyone else.

Your Name:

Food:Select OneCarrotsBeansTomatoesCorn

Check me out

Check that out

SubmitReset

Form Data Result

{
  "email": "",
  "name": "",
  "food": null,
  "checked": \[\]
}

HTML StackBlitz

vue

```
<template>
  <BForm v-if="show" @submit="onSubmit" @reset="onReset">
    <BFormGroup
      id="input-group-1"
      label="Email address:"
      label-for="input-1"
      description="We'll never share your email with anyone else."
    >
      <BFormInput
        id="input-1"
        v-model="form.email"
        type="email"
        placeholder="Enter email"
        required
      />
    </BFormGroup>

    <BFormGroup id="input-group-2" label="Your Name:" label-for="input-2">
      <BFormInput id="input-2" v-model="form.name" placeholder="Enter name" required />
    </BFormGroup>
    <BFormGroup id="input-group-3" label="Food:" label-for="input-3">
      <BFormSelect id="input-3" v-model="form.food" :options="foods" required />
    </BFormGroup>

    <BFormGroup id="input-group-4">
      <BFormCheckboxGroup id="checkboxes-4" v-model="form.checked">
        <BFormCheckbox value="me">Check me out</BFormCheckbox>
        <BFormCheckbox value="that">Check that out</BFormCheckbox>
      </BFormCheckboxGroup>
    </BFormGroup>
    <BButton type="submit" variant="primary">Submit</BButton>
    <BButton type="reset" variant="danger">Reset</BButton>
  </BForm>

  <BCard class="mt-3" header="Form Data Result">
    <pre class="m-0">{{ form }}</pre>
  </BCard>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'

const foods = [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn']

const form = reactive({
  email: '',
  name: '',
  food: null,
  checked: [],
})
const show = ref(true)

const onSubmit = (event: Event) => {
  event.preventDefault()

  alert(JSON.stringify(form))
}

const onReset = (event: Event) => {
  event.preventDefault()
  // Reset our form values
  form.email = ''
  form.name = ''
  form.food = null
  form.checked = []
  // Trick to reset/clear native browser form validation state
  show.value = false
  nextTick(() => {
    show.value = true
  })
}
</script>
```

## Inline form [​](#inline-form)

Bootstrap 5 has dropped form-specific layout classes for the grid system. See the [Bootstrap 5 Changelog](https://getbootstrap.com/docs/5.3/migration/#forms).

To create horizontal forms with the grid add the `.row` class to form groups and use the `.col-_-_` classes to specify the width of your labels and controls. Be sure to add `.col-form-label` to your `<label>`s as well, so they’re vertically centered with their associated form controls.

You may need to manually address the width and alignment of individual form controls with [spacing utilities](/bootstrap-vue-next/docs/reference/spacing-classes.html) (as shown below). Lastly, be sure to always include a `<label>` with each form control, even if you need to hide it from non-screenreader visitors with class `.visually-hidden`.

Name

Username

@

Remember me

Save

HTML StackBlitz

template

```
<BForm class="d-flex flex-row align-items-center flex-wrap">
  <label
    class="col-form-label visually-hidden"
    for="inline-form-input-name"
    >Name</label
  >
  <div class="col-lg-3 me-2 my-2">
    <BFormInput
      id="inline-form-input-name"
      placeholder="Jane Doe"
    />
  </div>
  <label
    class="col-form-label visually-hidden"
    for="inline-form-input-username"
    >Username</label
  >
  <div class="col-lg-3 me-2 my-2">
    <BInputGroup
      prepend="@"
      class="col-lg-4"
    >
      <BFormInput
        id="inline-form-input-username"
        placeholder="Username"
      />
    </BInputGroup>
  </div>
  <div class="col-lg-3 me-2 my-2">
    <BFormCheckbox>Remember me</BFormCheckbox>
  </div>
  <div class="col-lg-1 my-2">
    <BButton variant="primary">Save</BButton>
  </div>
</BForm>
```

Custom form controls and selects are also supported.

Preference

Choose...OneTwoThree

Remember my preference

Save

HTML StackBlitz

vue

```
<template>
  <BForm>
    <div class="row">
      <label
        class="col-form-label col-lg-2 me-sm-2"
        for="inline-form-custom-select-pref"
        >Preference</label
      >
      <div class="col-lg-2">
        <BFormSelect
          id="inline-form-custom-select-pref"
          v-model="customSelect"
          class="mb-2 me-sm-2 mb-sm-0"
          :options="[{text: 'Choose...', value: null}, 'One', 'Two', 'Three']"
        />
      </div>
      <BFormCheckbox class="col-form-label col-lg-3 mb-2 me-sm-2 mb-sm-0"
        >Remember my preference</BFormCheckbox
      >
      <div class="col-lg-2 col-form-label">
        <BButton variant="primary">Save</BButton>
      </div>
    </div>
  </BForm>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const customSelect = ref(null)
</script>
```

## Floating Labels [​](#floating-labels)

Wrap a `BFormInput`, `BFormTextarea`, or `BFormSelect` in a `BFormFloatingLabel` to enable floating labels. A `placeholder` is required on each input in order to make the Bootstrap 5 `css` work correctly.

Email address

Password

HTML StackBlitz

template

```
<BForm>
  <BFormFloatingLabel
    label="Email address"
    label-for="floatingEmail"
    class="my-2"
  >
    <BFormInput
      id="floatingEmail"
      type="email"
      placeholder="Email address"
    />
  </BFormFloatingLabel>
  <BFormFloatingLabel
    label="Password"
    label-for="floatingPassword"
    class="my-2"
  >
    <BFormInput
      id="floatingPassword"
      type="password"
      placeholder="Password"
    />
  </BFormFloatingLabel>
</BForm>
```

Floating labels work correctly for disabled state and readonly states. In addition to styled textual inputs, floating labels also work for plaintext inputs, textareas, input groups and selects. See the [Bootstrap 5 documentation](https://getbootstrap.com/docs/5.3/forms/floating-labels) for more details.

The `floating` attribute on the `BForm` component only applies to single form controls like this:

Input with value

HTML StackBlitz

template

```
<BForm floating>
  <BFormInput
    id="floatingFormInputValue"
    type="email"
    placeholder="name@example.com"
  />
  <label for="floatingFormInputValue">Input with value</label>
</BForm>
```

## Accessibility [​](#accessibility)

Ensure that all form controls have an appropriate accessible name so that their purpose can be conveyed to users of assistive technologies. The simplest way to achieve this is to use a `<label>` element, or—in the case of buttons—to include sufficiently descriptive text as part of the `<button>...</button>` content.

For situations where it’s not possible to include a visible `<label>` or appropriate text content, there are alternative ways of still providing an accessible name, such as:

-   `<label>` elements hidden using the `.visually-hidden` class
-   Pointing to an existing element that can act as a label using `aria-labelledby`
-   Providing a title attribute
-   Explicitly setting the accessible name on an element using aria-label

If none of these are present, assistive technologies may resort to using the placeholder attribute as a fallback for the accessible name on `<input>` and `<textarea>` elements. The examples in this section provide a few suggested, case-specific approaches.

While using visually hidden content (`.visually-hidden`, `aria-label`, and even placeholder content, which disappears once a form field has content) will benefit assistive technology users, a lack of visible label text may still be problematic for certain users. Some form of visible label is generally the best approach, both for accessibility and usability.

## Related form control and layout components [​](#related-form-control-and-layout-components)

See also:

-   [`BFormInput`](/bootstrap-vue-next/docs/components/form-input.html) Textual and text-like inputs
-   [`BFormTextarea`](/bootstrap-vue-next/docs/components/form-textarea.html) Text area inputs
-   [`BFormSelect`](/bootstrap-vue-next/docs/components/form-select.html) Select input
-   [`BFormRadio`](/bootstrap-vue-next/docs/components/form-radio.html) Radio Inputs
-   [`BFormCheckbox`](/bootstrap-vue-next/docs/components/form-checkbox.html) Checkbox Inputs
-   [`BFormFile`](/bootstrap-vue-next/docs/components/form-file.html) File Input
-   [`BFormSpinbutton`](/bootstrap-vue-next/docs/components/form-spinbutton.html) Numerical range spinbutton input
-   [`BFormTags`](/bootstrap-vue-next/docs/components/form-tags.html) Customizable tag input
-   [`BFormRating`](/bootstrap-vue-next/docs/components/form-rating.html) Star rating custom form input and display
-   [`BButton`](/bootstrap-vue-next/docs/components/button.html) Buttons
-   [`BFormGroup`](/bootstrap-vue-next/docs/components/form-group.html) Form Input wrapper to generate form-groups that support labels, help text and feedback
-   [`BInputGroup`](/bootstrap-vue-next/docs/components/input-group.html) Form Inputs with add-ons
-   [`BFormRow`](/bootstrap-vue-next/docs/components/grid-system.html) Create grid rows and columns with tighter margins (available via the [Layout and grid components](/bootstrap-vue-next/docs/components/grid-system.html))

## Form helper components [​](#form-helper-components)

The following helper components are available with the `Form` plugin:

-   `BFormText` Help text blocks for inputs
-   `BFormInvalidFeedback` Invalid feedback text blocks for input `invalid` states
-   `BFormValidFeedback` Valid feedback text blocks for input `valid` states
-   `BFormDatalist` Easily create a `<datalist>` for use with `BFormInput` or plain `<input>`

### Form text helper [​](#form-text-helper)

Display a block of help text below an input with the `BFormText` helper component. text is displayed with a muted color and slightly smaller font-size.

Tip

Help text should be explicitly associated with the form control it relates to using the `aria-describedby` attribute. This will ensure that assistive technologies, such as screen readers, will announce this help text when the user focuses or enters the control.

Password Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.

HTML StackBlitz

template

```
<BForm @submit.stop.prevent>
  <label for="text-password">Password</label>
  <BFormInput
    id="text-password"
    type="password"
    aria-describedby="password-help-block"
  />
  <BFormText id="password-help-block">
    Your password must be 8-20 characters long, contain letters and numbers, and must not contain
    spaces, special characters, or emoji.
  </BFormText>
</BForm>
```

### Feedback helpers [​](#feedback-helpers)

The `BFormValidFeedback` and `BFormInvalidFeedback` helper components will display feedback (based on input state) as a block of colored text. They rely on being placed after an input (sibling) and will show based on the browser native validation state of the input. To force them to show, set the prop `force-show` to `true`, or bind the controls `state` to the `state` prop of the feedback helper, or set the `was-validated` class on a parent element (such as a form). See the [**Validation**](#validation) section below for additional details.

Use the optional Boolean prop `tooltip` to change the display from a block to a static tooltip style. The feedback will typically appear below the form control. When this mode is enabled, it is important that the parent container have a `position: relative:` css style (or `position-relative` class). Note that tooltip style feedback may, since its positioning is static, obscure other inputs, labels, etc.

NOTE

Some form controls, such as [`BFormRadio`](/bootstrap-vue-next/docs/components/form-radio.html#contextual-states) and [`BFormCheckbox`](/bootstrap-vue-next/docs/components/form-checkbox.html#contextual-states) have wrapper elements which will prevent the feedback text from automatically showing (as the feedback component is not a direct sibling of the form control's input). Use the feedback component's `state` prop (bound to the state of the form control) or the `force-show` prop to display the feedback.

User Id

Your user Id must be 5-12 characters long.

Looks Good.

HTML StackBlitz

vue

```
<template>
  <BForm @submit.stop.prevent>
    <label for="feedback-user">User Id</label>
    <BFormInput
      id="feedback-user"
      v-model="userId"
      :state="validation"
    />
    <BFormInvalidFeedback :state="validation">
      Your user Id must be 5-12 characters long.
    </BFormInvalidFeedback>
    <BFormValidFeedback :state="validation"> Looks Good. </BFormValidFeedback>
  </BForm>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

const userId = ref('')

const validation = computed(() => userId.value.length > 4 && userId.value.length < 13)
</script>
```

### Datalist helper [​](#datalist-helper)

For browsers that support [`<datalist>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) elements, the `<BFormDatalist>` helper component will allow you to quickly create a `<datalist>` and child `<option>` elements via an array passed to the `options` prop.

You may also manually provide `<option>` elements inside `<BFormDatalist>`. They will appear below any `<option>` elements generated from the `options` prop. Or use the `first` slot to place options above the generated options.

Input with datalistAppleBananaGrapeKiwiOrange

HTML StackBlitz

vue

```
<template>
  <div>
    <label for="input-with-list">Input with datalist</label>
    <BFormInput
      id="input-with-list"
      list="input-list"
    />
    <BFormDatalist
      id="input-list"
      :options="datalistOptions"
    />
  </div>
</template>

<script setup lang="ts">
const datalistOptions = ['Apple', 'Banana', 'Grape', 'Kiwi', 'Orange']
</script>
```

See also:

-   [`<BFormInput> datalist`](/bootstrap-vue-next/docs/components/form-input.html#datalist-support) for datalist usage.
-   [`<BFormSelect>` `options` prop](/bootstrap-vue-next/docs/components/form-select.html#options-property) docs for details on the formats and helper props associated with `options`. Note that `<BFormDatalist>` only support a flat list of `BFormSelectOptions`, unlike `<BFormSelect>` which support a heirarchy of `BFormSelectOption` and `BFormSelectOptionGroup`.

#### TypeScript Type Safety [​](#typescript-type-safety)

`BFormDatalist` uses generic type parameters to validate that `value-field`, `text-field`, and `disabled-field` reference actual keys of your option type. Since `BFormDatalist` is a native `<datalist>` element (no `v-model`), the type safety focus is on field name validation.

Alice SmithBob JohnsonCharlie BrownDavid Wilson

Selected user ID:

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormInput
      v-model="selectedUserId"
      type="text"
      list="user-list"
      placeholder="Type to search users..."
    />
    <BFormDatalist
      id="user-list"
      :options="users"
      value-field="id"
      text-field="name"
      disabled-field="inactive"
    />
    <div class="mt-3">
      Selected user ID: <strong>{{ selectedUserId }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

interface User {
  id: number
  name: string
  inactive?: boolean
}

const users: User[] = [
  {id: 1, name: 'Alice Smith'},
  {id: 2, name: 'Bob Johnson'},
  {id: 3, name: 'Charlie Brown', inactive: true},
  {id: 4, name: 'David Wilson'},
]

// TypeScript knows selectedUserId is a number (matching the id field type)
const selectedUserId = ref<number>()
</script>
```

See the [Type-Safe Options](/bootstrap-vue-next/docs/reference/type-safe-options.html#bformdatalist) reference for more details.

## Validation [​](#validation)

Disable browser native HTML5 validation by setting the `novalidate` prop to true on `BForm`.

Set the `validated` prop, on `BForm`, to `true` to add the Bootstrap v5 `.was-validated` class to the form to trigger validation states.

All form controls support a `state` prop, which can be used to set the form control into one of three contextual states:

-   `false` (denotes invalid state) is great for when there is a blocking or required field. A user must fill in this field properly to submit the form
-   `true` (denotes valid state) is ideal for situations when you have per-field validation throughout a form and want to encourage a user through the rest of the fields
-   `null` Displays no validation state (neither valid nor invalid)

Refer to the [Bootstrap v5 Form Validation Documentation](https://getbootstrap.com/docs/5.3/forms/validation/) for details on the Bootstrap v5 validation states.

## Component Reference

### `<BForm>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BForm/BForm.vue)

-   [<BForm> Properties](#comp-reference-bform-properties)
-   [<BForm> Slots](#comp-reference-bform-slots)
-   [<BForm> Exposed](#comp-reference-bform-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `form`

##### [Properties](#comp-reference-bform-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| floating | `boolean` | `false` | When set, renders a single control form with a floating label. This only works for forms where the immediate children are a label and one of the supported controls. See above for details. |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| novalidate | `boolean` | `false` | When set, disables browser native HTML5 validation on controls in the form |
| validated | `boolean` | `false` | When set, adds the Bootstrap class 'was-validated' on the form, triggering the native browser validation states |

##### [Slots](#comp-reference-bform-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the form |

##### [Exposed](#comp-reference-bform-exposed)

| Name | Type | Description |
| --- | --- | --- |
| element | `HTMLFormElement` | Reference to the underlying form element |

### `<BFormDatalist>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BForm/BFormDatalist.vue)

-   [<BFormDatalist> Properties](#comp-reference-bformdatalist-properties)
-   [<BFormDatalist> Slots](#comp-reference-bformdatalist-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `datalist`

##### [Properties](#comp-reference-bformdatalist-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| disabled-field | `string` | `'disabled'` | Field name in the \`options\` array that should be used for the disabled state |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| options | `readonly (unknown | Record<string, unknown>)[]` | `'() => []'` | Array of items to render in the component. Note that BFormDatalist only supports Options, not OptionsGroups |
| text-field | `string` | `'text'` | Field name in the \`options\` array that should be used for the text label |
| value-field | `string` | `'value'` | Field name in the \`options\` array that should be used for the value |

##### [Slots](#comp-reference-bformdatalist-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the form datalist |
| first |  | Slot to place options above options provided via the 'options' prop |
| option | 
`value``: any (T)` - The value of the option

`text``: string` - The text of the option

`disabled``: boolean` - Is the option disabled

 | Use this slot to have finer control over the content rendered inside each data item |

### `<BFormFloatingLabel>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BForm/BFormFloatingLabel.vue)

-   [<BFormFloatingLabel> Properties](#comp-reference-bformfloatinglabel-properties)
-   [<BFormFloatingLabel> Slots](#comp-reference-bformfloatinglabel-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `floating‑label`

##### [Properties](#comp-reference-bformfloatinglabel-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| label | `string` | `undefined` | The text of the floating label |
| label-for | `string` | `undefined` | The id of the input control that the floating label is for |

##### [Slots](#comp-reference-bformfloatinglabel-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | The input control that contains the floating label |
| label |  | The content to display in the floating label |

### `<BFormInvalidFeedback>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BForm/BFormInvalidFeedback.vue)

-   [<BFormInvalidFeedback> Properties](#comp-reference-bforminvalidfeedback-properties)
-   [<BFormInvalidFeedback> Slots](#comp-reference-bforminvalidfeedback-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `invalid‑feedback, invalid‑tooltip`

##### [Properties](#comp-reference-bforminvalidfeedback-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-live | `string` | `undefined` | When the rendered element is an \`aria-live\` region (for screen reader users), set to either 'polite' or 'assertive' |
| force-show | `boolean` | `false` | Shows the feedback text, regardless of the value of the 'state' prop |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| role | `string` | `undefined` | Sets the ARIA attribute \`role\` to a specific value |
| state | `ValidationState` | `undefined` | Controls the validation state appearance of the component. \`true\` for valid, \`false\` for invalid, or \`null\` for no validation state |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |
| text | `string` | `undefined` | The feedback text to display |
| tooltip | `boolean` | `false` | Renders the feedback text in a rudimentary tooltip style |

##### [Slots](#comp-reference-bforminvalidfeedback-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the form invalid feedback |

### `<BFormRow>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BForm/BFormRow.vue)

-   [<BFormRow> Properties](#comp-reference-bformrow-properties)
-   [<BFormRow> Slots](#comp-reference-bformrow-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `row`

##### [Properties](#comp-reference-bformrow-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |

##### [Slots](#comp-reference-bformrow-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the form row |

### `<BFormText>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BForm/BFormText.vue)

-   [<BFormText> Properties](#comp-reference-bformtext-properties)
-   [<BFormText> Slots](#comp-reference-bformtext-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.form‑text`

##### [Properties](#comp-reference-bformtext-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| inline | `boolean` | `false` | When set, renders the help text as an inline element, rather than a block element |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |
| text | `string` | `undefined` | The text to display |
| text-variant | `TextColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the text |

##### [Slots](#comp-reference-bformtext-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the form text |

### `<BFormValidFeedback>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BForm/BFormValidFeedback.vue)

-   [<BFormValidFeedback> Properties](#comp-reference-bformvalidfeedback-properties)
-   [<BFormValidFeedback> Slots](#comp-reference-bformvalidfeedback-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `valid‑feedback, valid‑tooltip`

##### [Properties](#comp-reference-bformvalidfeedback-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-live | `string` | `undefined` | When the rendered element is an \`aria-live\` region (for screen reader users), set to either 'polite' or 'assertive' |
| force-show | `boolean` | `false` | Shows the feedback text, regardless of the value of the 'state' prop |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| role | `string` | `undefined` | Sets the ARIA attribute \`role\` to a specific value |
| state | `ValidationState` | `undefined` | Controls the validation state appearance of the component. \`true\` for valid, \`false\` for invalid, or \`null\` for no validation state |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |
| text | `string` | `undefined` | The feedback text to display |
| tooltip | `boolean` | `false` | Renders the feedback text in a rudimentary tooltip style |

##### [Slots](#comp-reference-bformvalidfeedback-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the form valid feedback |
