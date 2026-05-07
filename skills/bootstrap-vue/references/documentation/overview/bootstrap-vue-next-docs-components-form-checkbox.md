# Form Checkbox ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/form-checkbox.html

##### On this page

-   [Single checkbox ​](#single-checkbox)
    
-   [Multiple choice checkboxes ​](#multiple-choice-checkboxes)
    
-   [Options property ​](#options-property)
    -   [Options as an array ​](#options-as-an-array)
        
    -   [Options as an array of objects ​](#options-as-an-array-of-objects)
        
    -   [Changing the option field names ​](#changing-the-option-field-names)
        
-   [Checkbox values and v-model ​](#checkbox-values-and-v-model)
    -   [Multiple checkboxes and accessibility ​](#multiple-checkboxes-and-accessibility)
        
-   [Inline and stacked checkboxes ​](#inline-and-stacked-checkboxes)
    
-   [Control sizing ​](#control-sizing)
    
-   [Reverse ​](#reverse)
    
-   [Without Labels ​](#without-labels)
    
-   [Button style checkboxes ​](#button-style-checkboxes)
    -   [Individual checkbox button style ​](#individual-checkbox-button-style)
        
    -   [Grouped button style checkboxes ​](#grouped-button-style-checkboxes)
        
-   [Switch style checkboxes ​](#switch-style-checkboxes)
    -   [Individual checkbox switch style ​](#individual-checkbox-switch-style)
        
    -   [Grouped switch style checkboxes ​](#grouped-switch-style-checkboxes)
        
    -   [Switch sizing ​](#switch-sizing)
        
-   [Non-custom check inputs (plain) ​](#non-custom-check-inputs-plain)
    
-   [Contextual states ​](#contextual-states)
    -   [Contextual state and validation example ​](#contextual-state-and-validation-example)
        
    -   [Required constraint ​](#required-constraint)
        
-   [Autofocus ​](#autofocus)
    
-   [Indeterminate (tri-state) support ​](#indeterminate-tri-state-support)
    
-   [TypeScript Type Safety ​](#typescript-type-safety)
    
-   [Component Reference](#component-reference)
    -   [<BFormCheckbox>](#b-form-checkbox)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            
    -   [<BFormCheckboxGroup>](#b-form-checkbox-group)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            

# Form Checkbox [​](#form-checkbox)

For cross browser consistency, `BFormCheckboxGroup` and `BFormCheckbox` use Bootstrap's custom checkbox input to replace the browser default checkbox input. It is built on top of semantic and accessible markup, so it is a solid replacement for the default checkbox input.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormCheckbox/BFormCheckbox.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/form-checkbox.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bformcheckbox)

## Single checkbox [​](#single-checkbox)

 I accept the terms and use

State: **false**

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormCheckbox
      id="checkbox-1"
      v-model="status"
      name="checkbox-1"
      value="accepted"
      unchecked-value="not_accepted"
    >
      I accept the terms and use
    </BFormCheckbox>

    <div>
      State: <strong>{{ status }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const status = ref(false)
</script>
```

## Multiple choice checkboxes [​](#multiple-choice-checkboxes)

Using options array:

Orange

Apple

Pineapple

Grape

Using sub-components:

Orange

Apple

Pineapple

Grape

Selected: **\[\]**

HTML StackBlitz

vue

```
<template>
  <div>
    <b-form-group
      v-slot="{ariaDescribedby}"
      label="Using options array:"
    >
      <b-form-checkbox-group
        id="checkbox-group-1"
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="flavour-1"
      />
    </b-form-group>

    <b-form-group
      v-slot="{ariaDescribedby}"
      label="Using sub-components:"
    >
      <b-form-checkbox-group
        id="checkbox-group-2"
        v-model="selected"
        :aria-describedby="ariaDescribedby"
        name="flavour-2"
      >
        <b-form-checkbox value="orange">Orange</b-form-checkbox>
        <b-form-checkbox value="apple">Apple</b-form-checkbox>
        <b-form-checkbox value="pineapple">Pineapple</b-form-checkbox>
        <b-form-checkbox value="grape">Grape</b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>

    <div>
      Selected: <strong>{{ selected }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const selected = ref([])

const options = [
  {text: 'Orange', value: 'orange'},
  {text: 'Apple', value: 'apple'},
  {text: 'Pineapple', value: 'pineapple'},
  {text: 'Grape', value: 'grape'},
]
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

Selected: **\[ "A" \]**

HTML StackBlitz

vue

```
<template>
  <BFormCheckboxGroup
    v-model="checked"
    :options="options"
    class="mb-3"
    value-field="item"
    text-field="name"
    disabled-field="notEnabled"
  />
  <div class="mt-3">
    Selected: <strong>{{ checked }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const checked = ref(['A'])

const options = [
  {item: 'A', name: 'Option A'},
  {item: 'B', name: 'Option B'},
  {item: 'D', name: 'Option C', notEnabled: true},
  {item: {d: 1}, name: 'Option D'},
]
</script>
```

## Checkbox values and `v-model` [​](#checkbox-values-and-v-model)

By default, `BFormCheckbox` value will be true when checked and false when unchecked. You can customize the checked and unchecked values by specifying the `value` and `unchecked-value` properties, respectively.

When you have multiple checkboxes that bind to a single data state variable, you must provide an array reference (`[ ]`) to your v-model.

Note that when `v-model` is bound to multiple checkboxes (i.e an array ref), the `unchecked-value` is **not used**. Only the value(s) of the checked checkboxes will be returned in the `v-model` bound array. You should provide a unique `value` for each checkbox's `value` prop (the default of `true` will not work when bound to an array).

To pre-check any checkboxes, set the `v-model` to the value(s) of the checks that you would like pre-selected.

When placing individual `BFormCheckbox` components within a `BFormCheckboxGroup`, most props and the `v-model` are inherited from the `BFormCheckboxGroup`.

NOTE

The `unchecked-value` prop does not affect the native `<input>`'s `value` attribute, because browsers do not include unchecked boxes in form submissions. To guarantee that one of two values is submitted in a native `<form>` submit (e.g. `'yes'` or `'no'`), use radio inputs instead. This is the same limitation that [Vue has with native checkbox inputs](https://vuejs.org/guide/essentials/forms.html#checkbox-1).

BMW

Mercedes

Toyota

Selected:

HTML StackBlitz

vue

```
<template>
  <BFormCheckbox
    v-for="(car, index) in availableCars"
    :key="index"
    v-model="selectedCars"
    :value="car"
  >
    {{ car }}
  </BFormCheckbox>

  Selected: <strong>{{ concatSelectedCars }}</strong>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

const availableCars = ['BMW', 'Mercedes', 'Toyota']
const selectedCars = ref([])

const concatSelectedCars = computed(() => selectedCars.value.join(', '))
</script>
```

### Multiple checkboxes and accessibility [​](#multiple-checkboxes-and-accessibility)

When binding multiple checkboxes together, you must set the `name` prop to the same value for all `BFormCheckbox`s in the group individually. This will inform users of assistive technologies that the checkboxes are related and enables native browser keyboard navigation.

Whenever using multiple checkboxes, it is recommended that the checkboxes be placed in a [`BFormGroup`](/bootstrap-vue-next/docs/components/form-group.html) component to associate a label with the entire group of checkboxes. See examples above.

## Inline and stacked checkboxes [​](#inline-and-stacked-checkboxes)

`BFormCheckboxGroup` components render inline checkboxes by default, while `BFormCheckbox` renders block-level (stacked) checkboxes.

Set the prop `stacked` on `BFormCheckboxGroup` to place each form control one over the other, or if using individual checkboxes not inside a `BFormCheckboxGroup`, set the `inline` prop on `BFormCheckbox`.

Form-checkbox-group inline checkboxes (default)

Orange

Apple

Pineapple

Grape

Form-checkbox-group stacked checkboxes

Orange

Apple

Pineapple

Grape

Individual stacked checkboxes (default)

Orange

Apple

Pineapple

Grape

Individual inline checkboxes

Orange

Apple

Pineapple

Grape

HTML StackBlitz

vue

```
<template>
  <div class="my-2">
    <label>Form-checkbox-group inline checkboxes (default)</label>
  </div>

  <BFormCheckboxGroup
    v-model="selected"
    :options="options"
    name="flavour-1a"
  />

  <div class="my-2">
    <label>Form-checkbox-group stacked checkboxes</label>
  </div>

  <BFormCheckboxGroup
    v-model="selected"
    :options="options"
    name="flavour-2a"
    stacked
  />

  <div class="my-2">
    <label>Individual stacked checkboxes (default)</label>
  </div>

  <BFormCheckbox
    v-for="option in options"
    :key="option.value"
    v-model="selected"
    :value="option.value"
    name="flavour-3a"
  >
    {{ option.text }}
  </BFormCheckbox>

  <div class="my-2">
    <label>Individual inline checkboxes</label>
  </div>

  <BFormCheckbox
    v-for="option in options"
    :key="option.value"
    v-model="selected"
    :value="option.value"
    name="flavour-4a"
    inline
  >
    {{ option.text }}
  </BFormCheckbox>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const selected = ref(['A'])

const options = [
  {text: 'Orange', value: 'orange'},
  {text: 'Apple', value: 'apple'},
  {text: 'Pineapple', value: 'pineapple'},
  {text: 'Grape', value: 'grape'},
]
</script>
```

## Control sizing [​](#control-sizing)

Use the `size` prop to control the size of the checkbox. The default size is medium. Supported size values are `sm` (small) and `lg` (large).

Small

Default

Large

HTML StackBlitz

template

```
<BFormCheckbox size="sm">Small</BFormCheckbox>
<BFormCheckbox>Default</BFormCheckbox>
<BFormCheckbox size="lg">Large</BFormCheckbox>
```

## Reverse [​](#reverse)

Use the `reverse` prop to put your checkboxes and switches on the opposite side of the label.

Reverse checkbox

Disabled reverse checkbox

Reverse switch ceckbox input

HTML StackBlitz

template

```
<BFormCheckbox reverse>Reverse checkbox</BFormCheckbox>
<BFormCheckbox
  reverse
  disabled
  >Disabled reverse checkbox</BFormCheckbox
>
<BFormCheckbox
  reverse
  switch
  >Reverse switch ceckbox input</BFormCheckbox
>
```

## Without Labels [​](#without-labels)

In order to omit labels as described in the [bootstrap documentation](https://getbootstrap.com/docs/5.3/forms/checks-radios/#without-labels) just leave the default slot empty. Remember to still provide some form of accessible name for assistive technologies (for instance, using aria-label).

HTML StackBlitz

template

```
<BFormCheckbox />
<BFormCheckbox disabled />
<BFormCheckbox switch />
```

## Button style checkboxes [​](#button-style-checkboxes)

You can optionally render checkboxes to appear as buttons, either individually, or in a group.

Button style checkboxes will have the class `.active` automatically applied to the label when they are in the checked state.

### Individual checkbox button style [​](#individual-checkbox-button-style)

A single checkbox can be rendered with a button appearance by setting the prop `button` to `true`.

Change the button variant by setting the `button-variant` prop to one of the standard Bootstrap button variants (see [`BButton`](/bootstrap-vue-next/docs/components/button.html) for supported variants). The default variant is `secondary`.

 Button Checkbox (Checked: false)

 Button Checkbox (Checked: false)

HTML StackBlitz

vue

```
<template>
  <div class="hstack gap-3">
    <BFormCheckbox
      v-model="button1Checked"
      button
    >
      Button Checkbox (Checked: {{ button1Checked }})
    </BFormCheckbox>

    <BFormCheckbox
      v-model="button2Checked"
      button
      button-variant="danger"
    >
      Button Checkbox (Checked: {{ button2Checked }})
    </BFormCheckbox>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const button1Checked = ref(false)
const button2Checked = ref(false)
</script>
```

### Grouped button style checkboxes [​](#grouped-button-style-checkboxes)

Render groups of checkboxes with the look of a button-group by setting the prop `buttons` on `BFormCheckboxGroup`. Change the button variant by setting the `button-variant` prop to one of the standard Bootstrap button variants (see [`BButton`](/bootstrap-vue-next/docs/components/button.html) for supported variants). The default `button-variant` is `secondary`.

Form-checkbox-group inline checkboxes (default)

OrangeApplePineappleGrape

Button-group style checkboxes with variant primary and large buttons

OrangeApplePineappleGrape

Stacked (vertical) button-group style checkboxes

OrangeApplePineappleGrape

HTML StackBlitz

vue

```
<template>
  <div class="my-2">
    <label>Form-checkbox-group inline checkboxes (default)</label>
  </div>

  <BFormCheckboxGroup
    v-model="selected"
    :options="options"
    name="buttons-1"
    buttons
  />

  <div class="my-2">
    <label>Button-group style checkboxes with variant primary and large buttons</label>
  </div>

  <BFormCheckboxGroup
    v-model="selected"
    :options="options"
    buttons
    button-variant="primary"
    size="lg"
    name="buttons-2"
  />

  <div class="my-2">
    <label>Stacked (vertical) button-group style checkboxes</label>
  </div>

  <BFormCheckboxGroup
    v-model="selected"
    :options="options"
    stacked
    buttons
  />
</template>

<script setup lang="ts">
import {ref} from 'vue'

const selected = ref(['A'])

const options = [
  {text: 'Orange', value: 'orange'},
  {text: 'Apple', value: 'apple'},
  {text: 'Pineapple', value: 'pineapple'},
  {text: 'Grape', value: 'grape'},
]
</script>
```

## Switch style checkboxes [​](#switch-style-checkboxes)

Switch styling is supported on `BFormCheckbox` and `BFormCheckboxGroup` components.

NOTE

If the checkbox is in [button mode](#button-style-checkboxes), switch mode will have no effect.

### Individual checkbox switch style [​](#individual-checkbox-switch-style)

A single checkbox can be rendered with a switch appearance by setting the prop `switch` to `true`.

 Switch Checkbox **(Checked: false)**

HTML StackBlitz

vue

```
<template>
  <BFormCheckbox
    v-model="switchChecked"
    switch
  >
    Switch Checkbox <strong>(Checked: {{ switchChecked }})</strong>
  </BFormCheckbox>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const switchChecked = ref(false)
</script>
```

### Grouped switch style checkboxes [​](#grouped-switch-style-checkboxes)

Render groups of checkboxes with the look of a switches by setting the prop `switches` on `BFormCheckboxGroup`.

Inline switch style checkboxes

Red

Green

Yellow (disabled)

Blue

Stacked (vertical) switch style checkboxes

Red

Green

Yellow (disabled)

Blue

HTML StackBlitz

vue

```
<template>
  <div class="my-2">
    <label>Inline switch style checkboxes</label>
  </div>

  <BFormCheckboxGroup
    v-model="selected"
    :options="options"
    switches
  />

  <div class="my-2">
    <label>Stacked (vertical) switch style checkboxes</label>
  </div>

  <BFormCheckboxGroup
    v-model="selected"
    :options="options"
    switches
    stacked
  />
</template>

<script setup lang="ts">
import {ref} from 'vue'

const selected = ref([])

const options = [
  {text: 'Red', value: 'red'},
  {text: 'Green', value: 'green'},
  {text: 'Yellow (disabled)', value: 'yellow', disabled: true},
  {text: 'Blue', value: 'blue'},
]
</script>
```

### Switch sizing [​](#switch-sizing)

Use the `size` prop to control the size of the switch. The default size is medium. Supported size values are `sm` (small) and `lg` (large).

Small

Default

Large

HTML StackBlitz

template

```
<BFormCheckbox
  switch
  size="sm"
  >Small</BFormCheckbox
>
<BFormCheckbox switch>Default</BFormCheckbox>
<BFormCheckbox
  switch
  size="lg"
  >Large</BFormCheckbox
>
```

Sizes can be set on individual `BFormCheckbox` components, or inherited from the size setting of `BFormCheckboxGroup`.

NOTE

Bootstrap v5.x does not natively support sizes for the custom switch control. However, bootstrap-vue-next includes custom SCSS/CSS that adds support for sizing the custom switches.

## Non-custom check inputs (plain) [​](#non-custom-check-inputs-plain)

You can have `BFormCheckboxGroup` or `BFormCheckbox` render a browser native checkbox input by setting the `plain` prop.

Plain inline checkboxes

Red

Green

Yellow (disabled)

Blue

Plain stacked checkboxes

Red

Green

Yellow (disabled)

Blue

HTML StackBlitz

vue

```
<template>
  <div class="my-2">
    <label>Plain inline checkboxes</label>
  </div>

  <BFormCheckboxGroup
    v-model="selected"
    :options="options"
    plain
  />

  <div class="my-2">
    <label>Plain stacked checkboxes</label>
  </div>

  <BFormCheckboxGroup
    v-model="selected"
    :options="options"
    plain
    stacked
  />
</template>

<script setup lang="ts">
import {ref} from 'vue'

const selected = ref([])
const options = [
  {text: 'Red', value: 'red'},
  {text: 'Green', value: 'green'},
  {text: 'Yellow (disabled)', value: 'yellow', disabled: true},
  {text: 'Blue', value: 'blue'},
]
</script>
```

NOTE

The `plain` prop has no effect when `button` or `buttons` is set.

## Contextual states [​](#contextual-states)

Bootstrap includes validation styles for valid and invalid states on most form controls.

Generally speaking, you'll want to use a particular state for specific types of feedback:

-   `false` (denotes invalid state) is great for when there is a blocking or required field. A user must fill in this field properly to submit the form
-   `true` (denotes valid state) is ideal for situations when you have per-field validation throughout a form and want to encourage a user through the rest of the fields
-   `null` Displays no validation state (neither valid nor invalid)

To apply one of the contextual state icons on `BFormCheckbox`, set the `state` prop to `false` (for invalid), `true` (for valid), or `null` (no validation state).

NOTE

Contextual states are **not** supported when in button mode.

### Contextual state and validation example [​](#contextual-state-and-validation-example)

Checkbox state false

Checkbox state true

Checkbox state null

First Check

Second Check

Third Check

Please select two

HTML StackBlitz

vue

```
<template>
  <BFormCheckbox :state="false">Checkbox state false</BFormCheckbox>
  <BFormCheckbox :state="true">Checkbox state true</BFormCheckbox>
  <BFormCheckbox>Checkbox state null</BFormCheckbox>

  <BFormCheckboxGroup
    v-model="selected"
    :options="options"
    :state="contextualState"
    name="checkbox-validation"
  />

  <div v-if="!contextualState">Please select two</div>
  <div v-if="contextualState">Thank you</div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

const options = [
  {text: 'First Check', value: 'first'},
  {text: 'Second Check', value: 'second'},
  {text: 'Third Check', value: 'third'},
]

const selected = ref([])

const contextualState = computed(() => selected.value.length === 2)
</script>
```

### Required constraint [​](#required-constraint)

When using individual `BFormCheckbox` components (not in a `BFormCheckboxGroup`), and you want the checkbox(es) to be `required` in your form, you **must** provide a `name` on each `BFormCheckbox` in order for the required constraint to work. All `BFormCheckbox` components tied to the same `v-model` **must** have the same `name`.

The `name` is required in order for Assistive Technologies (such as screen readers, and keyboard only users) to know which checkboxes belong to the same form variable (the name also automatically enables native browser keyboard navigation), hence `required` will only work if `name` is set. `BFormCheckboxGroup` will automatically generate a unique input name if one is not provided on the group.

## Autofocus [​](#autofocus)

When the `autofocus` prop is set on `BFormCheckbox`, the input will be auto-focused when it is inserted (i.e. **mounted**) into the document, or re-activated when inside a Vue `KeepAlive` component. Note that this prop **does not** set the `autofocus` attribute on the input, nor can it tell when the input becomes visible.

## Indeterminate (tri-state) support [​](#indeterminate-tri-state-support)

Normally a checkbox input can only have two states: checked or unchecked. They can have any value, but they either submit that value (checked) or do not (unchecked) with a form submission (although BootstrapVueNext allows a value for the unchecked state on a single checkbox).

Visually, there are actually three states a checkbox can be in: _checked_, _unchecked_, or **_indeterminate_**.

The _indeterminate_ state is **visual only**. The checkbox is still either checked or unchecked as a value. That means the visual indeterminate state masks the real value of the checkbox, so that better make sense in your UI!.

`BFormCheckbox` supports setting this visual indeterminate state via a secondary named model called `indeterminate` (defaults to `undefined`). Clicking the checkbox will clear the `indeterminate` state and emit an `update:indeterminate=false` event. To reset the state set `v-model:indeterminate` value to `true`.

Click me to see what happens

Reset Indeterminate

Checked: **true**  
Indeterminate: **true**

HTML StackBlitz

vue

```
<template>
  <BFormCheckbox
    v-model="checked"
    v-model:indeterminate="indeterminate"
    >Click me to see what happens</BFormCheckbox
  >
  <BButton
    class="mt-2"
    :disabled="indeterminate"
    @click="indeterminate = true"
    >Reset Indeterminate</BButton
  >
  <div class="mt-2">
    Checked: <strong>{{ checked }}</strong
    ><br />
    Indeterminate: <strong>{{ indeterminate }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const checked = ref(true)
const indeterminate = ref(true)
</script>
```

**Indeterminate checkbox use-case example:**

**Choose your flavors:**  

Select All

Orange

Grape

Apple

Lime

Very Berry

Selected: **\[\]**  
All Selected: **false**  
Indeterminate: **false**

HTML StackBlitz

vue

```
<template>
  <BFormGroup>
    <template #label>
      <b>Choose your flavors:</b><br />
      <BFormCheckbox
        v-model="allSelected"
        v-model:indeterminate="asIndeterminate"
        aria-describedby="flavors"
        aria-controls="flavors"
        @update:model-value="toggleAll"
      >
        {{ allSelected ? 'Un-select All' : 'Select All' }}
      </BFormCheckbox>
    </template>

    <template #default="{ariaDescribedby}">
      <BFormCheckboxGroup
        id="flavors"
        v-model="flavorSelected"
        :options="flavors"
        :aria-describedby="ariaDescribedby"
        name="flavors"
        class="ms-4"
        aria-label="Individual flavors"
        stacked
      />
    </template>
  </BFormGroup>

  <div>
    Selected: <strong>{{ flavorSelected }}</strong
    ><br />
    All Selected: <strong>{{ allSelected }}</strong
    ><br />
    Indeterminate: <strong>{{ asIndeterminate }}</strong>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import type {CheckboxValue} from 'bootstrap-vue-next'

const flavors = ['Orange', 'Grape', 'Apple', 'Lime', 'Very Berry']
const flavorSelected = ref<string[]>([])
const allSelected = ref(false)
const asIndeterminate = ref(false)

const toggleAll = (checked?: CheckboxValue | CheckboxValue[]) => {
  flavorSelected.value = checked ? flavors.slice() : []
}

watch(flavorSelected, (newValue: string[]) => {
  // Handle changes in individual flavor checkboxes
  if (newValue.length === 0) {
    asIndeterminate.value = false
    allSelected.value = false
  } else if (newValue.length === flavors.length) {
    asIndeterminate.value = false
    allSelected.value = true
  } else {
    asIndeterminate.value = true
    allSelected.value = false
  }
})
</script>
```

## TypeScript Type Safety [​](#typescript-type-safety)

`BFormCheckboxGroup` provides TypeScript type safety for the `options` prop. When you pass typed options, the component infers the `v-model` type from the option values. See the [Type-Safe Options](/bootstrap-vue-next/docs/reference/type-safe-options.html) reference for full details and patterns.

Alice

Bob

Charlie

David

Selected user IDs: **\[ 1, 4 \]**

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormCheckboxGroup
      id="checkbox-type-safe-basic"
      v-model="selectedUsers"
      :options="userOptions"
    />
    <div class="mt-3">
      Selected user IDs: <strong>{{ selectedUsers }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

interface User {
  id: number
  name: string
  inactive?: boolean
}

const users: User[] = [
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Bob'},
  {id: 3, name: 'Charlie', inactive: true},
  {id: 4, name: 'David'},
]

// Map to standard format for full type safety
const userOptions = computed(() =>
  users.map((user) => ({
    value: user.id,
    text: user.name,
    disabled: user.inactive,
  }))
)

// TypeScript knows selectedUsers is number[]
const selectedUsers = ref<number[]>([1, 4])
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

## Component Reference

### `<BFormCheckbox>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormCheckbox/BFormCheckbox.vue)

-   [<BFormCheckbox> Properties](#comp-reference-bformcheckbox-properties)
-   [<BFormCheckbox> Events](#comp-reference-bformcheckbox-events)
-   [<BFormCheckbox> Slots](#comp-reference-bformcheckbox-slots)
-   [<BFormCheckbox> Exposed](#comp-reference-bformcheckbox-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.form‑checkbox`

##### [Properties](#comp-reference-bformcheckbox-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-label | `string` | `undefined` | Sets the value of \`aria-label\` attribute on the rendered element |
| aria-labelledby | `string` | `undefined` | The ID of the element that provides a label for this component. Used as the value for the \`aria-labelledby\` attribute |
| autofocus | `boolean` | `false` | When set to \`true\`, attempts to auto-focus the control when it is mounted, or re-activated when in a keep-alive. Does not set the \`autofocus\` attribute on the control |
| button | `boolean` | `false` | When set, renders the checkbox with the appearance of a button |
| button-group | `boolean` | `false` | When set, renders the checkbox as part of a button group (it doesn't enclose the checkbox and label with a div). It is not necessary to set this to true if this is part of a CheckboxGroup as it is handled internally |
| button-variant | `ButtonVariant | null` | `'secondary'` | Applies one of Bootstrap's theme colors when in \`button\` mode |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| form | `string` | `undefined` | ID of the form that the form control belongs to. Sets the \`form\` attribute on the control |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| indeterminate | `boolean` | `false` | Set to true to show the checkbox as indeterminate, false to show its normal checked/unchecked. |
| inline | `boolean` | `false` | When set, renders the checkbox as an inline element rather than as a 100% width block |
| input-class | `ClassValue` | `undefined` | Class to be applied to the body of the checkbox item |
| model-value | `CheckboxValue | readonly CheckboxValue[]` | `undefined` | The current value of the checkbox(es). Must be an array when there are multiple checkboxes bound to the same v-model. |
| name | `string` | `undefined` | Sets the value of the \`name\` attribute on the form control |
| plain | `boolean` | `false` | Render the form control in plain mode, rather than custom styled mode |
| required | `boolean` | `undefined` | Adds the \`required\` attribute to the form control |
| reverse | `boolean` | `false` | When set, renders the checkbox or switch on the opposite side |
| size | `Size` | `undefined` | Set the size of the component's appearance. 'sm' or 'lg' |
| state | `ValidationState` | `undefined` | Controls the validation state appearance of the component. \`true\` for valid, \`false\` for invalid, or \`null\` for no validation state |
| switch | `boolean` | `false` | When set, renders the checkbox with the appearance of a switch |
| unchecked-value | `CheckboxValue` | `false` | Value returned when this checkbox is unchecked. Note not applicable when multiple checkboxes bound to the same v-model array |
| value | `CheckboxValue` | `true` | Value returned when this checkbox is checked |
| wrapper-attrs | `Readonly<AttrsValue>` | `undefined` | Attributes to be applied to the wrapper element |

##### [Events](#comp-reference-bformcheckbox-events)

| Event | Args | Description |
| --- | --- | --- |
| update:indeterminate | 
`value``: boolean` - Value of the indeterminate state - true for indeterminate, false for deterministic state.

 | Emitted when the indeterminate state of the checkbox is changed |
| update:model-value | 

`value``: CheckboxValue | readonly CheckboxValue[]` - Value of the checkbox. Value will be an array for grouped checkboxes or a single value for standalone checkboxes. Looking for the \`input\` or \`change\` event - use \`update:model-value\` instead.

 | Emitted when the checked value is changed |

##### [Slots](#comp-reference-bformcheckbox-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the label of the form checkbox |

##### [Exposed](#comp-reference-bformcheckbox-exposed)

| Name | Type | Description |
| --- | --- | --- |
| blur | `() => void` | Removes focus from the checkbox |
| element | `HTMLInputElement` | Reference to the underlying input element |
| focus | `() => void` | Sets focus on the checkbox |

### `<BFormCheckboxGroup>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormCheckbox/BFormCheckboxGroup.vue)

-   [<BFormCheckboxGroup> Properties](#comp-reference-bformcheckboxgroup-properties)
-   [<BFormCheckboxGroup> Events](#comp-reference-bformcheckboxgroup-events)
-   [<BFormCheckboxGroup> Slots](#comp-reference-bformcheckboxgroup-slots)
-   [<BFormCheckboxGroup> Exposed](#comp-reference-bformcheckboxgroup-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.form‑checkbox‑group`

##### [Properties](#comp-reference-bformcheckboxgroup-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-invalid | `AriaInvalid` | `undefined` | Sets the \`aria-invalid\` attribute value on the wrapper element. When not provided, the \`state\` prop will control the attribute |
| autofocus | `boolean` | `false` | When set to \`true\`, attempts to auto-focus the control when it is mounted, or re-activated when in a keep-alive. Does not set the \`autofocus\` attribute on the control |
| button-variant | `ButtonVariant | null` | `'secondary'` | Specifies the Bootstrap contextual color theme variant to apply to the button style checkboxes |
| buttons | `boolean` | `false` | When set, renders the checkboxes in this group with button styling |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| disabled-field | `string` | `'disabled'` | Field name in the \`options\` array that should be used for the disabled state |
| form | `string` | `undefined` | ID of the form that the form control belongs to. Sets the \`form\` attribute on the control |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| model-value | `CheckboxValue[]` | `'() => []'` | The current value of the checkbox group. Must be an array. |
| name | `string` | `undefined` | Sets the value of the \`name\` attribute on the form control |
| options | `readonly CheckboxOptionRaw[]` | `'() => []'` |  |
| plain | `boolean` | `false` | Render the form control in plain mode, rather than custom styled mode |
| required | `boolean` | `undefined` | Adds the \`required\` attribute to the form control |
| reverse | `boolean` | `'false'` | When set, renders the checkboxes and switches on the opposite side |
| size | `Size` | `undefined` | Set the size of the component's appearance. 'sm' or 'lg' |
| stacked | `boolean` | `false` | When set, renders the checkbox group in stacked mode |
| state | `ValidationState` | `undefined` | Controls the validation state appearance of the component. \`true\` for valid, \`false\` for invalid, or \`null\` for no validation state |
| switches | `boolean` | `false` | When set, renders the checkboxes in the group with switch styling |
| text-field | `string` | `'text'` | Field name in the \`options\` array that should be used for the text label |
| validated | `boolean` | `false` | When set, adds the Bootstrap class \`was-validated\` to the group wrapper |
| value-field | `string` | `'value'` | Field name in the \`options\` array that should be used for the value |

##### [Events](#comp-reference-bformcheckboxgroup-events)

| Event | Args | Description |
| --- | --- | --- |
| update:model-value | 
`value``: CheckboxValue[]` - Value of the checkboxes. Value will be an array.

 | Emitted when the selected value(s) are changed. Looking for the \`input\` or \`change\` event - use \`update:model-value\` instead. |

##### [Slots](#comp-reference-bformcheckboxgroup-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content (form checkboxes) to place in the form checkbox group |
| first |  | Slot to place for checkboxes so that they appear before checks generated from options prop |
| option | 
`value``: string | number | undefined` - The value of the checkbox button

`disabled``: boolean | undefined` - Whether the checkbox button is disabled

`text``: string | undefined` - The text to display for the checkbox button

 | Use this slot to have finer control over the content rendered inside each checkbox button. |

##### [Exposed](#comp-reference-bformcheckboxgroup-exposed)

| Name | Type | Description |
| --- | --- | --- |
| blur | `() => void` | Removes focus from the checkbox group |
| focus | `() => void` | Sets focus on the first checkbox in the group |
