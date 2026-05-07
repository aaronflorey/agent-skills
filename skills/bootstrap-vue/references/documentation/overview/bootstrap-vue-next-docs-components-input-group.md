# Input Group ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/input-group.html

##### On this page

-   [Usage ​](#usage)
    -   [Using prepend and append props ​](#using-prepend-and-append-props)
        
    -   [Using named slots ​](#using-named-slots)
        
    -   [Using BInputGroupText ​](#using-binputgrouptext)
        
-   [Supported form-controls ​](#supported-form-controls)
    
-   [Checkbox and radio addons ​](#checkbox-and-radio-addons)
    -   [Native checkbox and radio addons ​](#native-checkbox-and-radio-addons)
        
    -   [Custom radio, checkbox, and switch addons ​](#custom-radio-checkbox-and-switch-addons)
        
-   [Multiple inputs ​](#multiple-inputs)
    
-   [Multiple addons ​](#multiple-addons)
    
-   [Dropdown addons ​](#dropdown-addons)
    
-   [Control sizing ​](#control-sizing)
    -   [Sizing custom radio, checkbox and switch addons ​](#sizing-custom-radio-checkbox-and-switch-addons)
        
-   [Contextual states ​](#contextual-states)
    
-   [Component Reference](#component-reference)
    -   [<BInputGroup>](#b-input-group)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BInputGroupText>](#b-input-group-text)
        -   [Properties](#)
            
        -   [Slots](#)
            

# Input Group [​](#input-group)

Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BInputGroup/BInputGroup.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/input-group.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#binputgroup)

$.00

**!**

UsernameButtonButton

HTML StackBlitz

template

```
<!-- Using props -->
<BInputGroup
  size="lg"
  prepend="$"
  append=".00"
>
  <BFormInput />
</BInputGroup>
<!-- Using slots -->
<BInputGroup class="mt-3">
  <template #append>
    <BInputGroupText><strong class="text-danger">!</strong></BInputGroupText>
  </template>
  <BFormInput />
</BInputGroup>
<!-- Using components -->
<BInputGroup
  prepend="Username"
  class="mt-3"
>
  <BFormInput />
  <BButton variant="outline-success">Button</BButton>
  <BButton variant="info">Button</BButton>
</BInputGroup>
```

## Usage [​](#usage)

You can attach addons using either props, named slots and/or sub-components.

NOTE

Bootstrap 5 dropped `.input-group-append` and `.input-group-prepend`. You can now just add buttons and `.input-group-text` as direct children of the input groups.

### Using `prepend` and `append` props [​](#using-prepend-and-append-props)

Values will be internally wrapped by a `BInputGroupText` to display correctly.

$.00

0100

HTML StackBlitz

template

```
<BInputGroup
  prepend="$"
  append=".00"
>
  <BFormInput />
</BInputGroup>
<BInputGroup
  prepend="0"
  append="100"
  class="mt-3"
>
  <BFormInput
    type="range"
    min="0"
    max="100"
    class="form-control"
  />
</BInputGroup>
```

### Using named slots [​](#using-named-slots)

Username

Dropdown

-   Action A
-   Action B

HTML StackBlitz

template

```
<BInputGroup>
  <template #prepend>
    <BInputGroupText>Username</BInputGroupText>
  </template>
  <BFormInput />
  <template #append>
    <BDropdown
      text="Dropdown"
      variant="success"
    >
      <BDropdownItem>Action A</BDropdownItem>
      <BDropdownItem>Action B</BDropdownItem>
    </BDropdown>
  </template>
</BInputGroup>
```

### Using `BInputGroupText` [​](#using-binputgrouptext)

Use the `BInputGroupText` to add styled text before or after the control.

Do not use `BInputGroupText` to group sub-components as was done in Bootstrap-Vue, see the [migration guide](/bootstrap-vue-next/docs/migration-guide.html#binputgroup) for details.

$

.00

HTML StackBlitz

template

```
<BInputGroup>
  <BInputGroupText>$</BInputGroupText>
  <BFormInput
    type="number"
    min="0.00"
  />
  <BInputGroupText>.00</BInputGroupText>
</BInputGroup>
```

## Supported form-controls [​](#supported-form-controls)

The following are the form controls supported as the input-group's _main_ input element:

-   [`BFormInput`](/bootstrap-vue-next/docs/components/form-input.html)
-   [`BFormTextarea`](/bootstrap-vue-next/docs/components/form-textarea.html)
-   [`BFormSelect`](/bootstrap-vue-next/docs/components/form-select.html)
-   [`BFormFile`](/bootstrap-vue-next/docs/components/form-file.html)
-   [`BFormRating`](/bootstrap-vue-next/docs/components/form-rating.html)
-   [`BFormTags`](/bootstrap-vue-next/docs/components/form-tags.html)
-   [`BFormSpinbutton`](/bootstrap-vue-next/docs/components/form-spinbutton.html)

## Checkbox and radio addons [​](#checkbox-and-radio-addons)

Place any checkbox or radio within an input group's addon instead of text.

NOTE

Bootstrap v5 recommends adding `.mt-0` to the `.form-check-input` when there’s no visible text next to the input. It is also possible to use as `BFormRadio` and `BFormCheckbox` with a few utility classes applied.

### Native checkbox and radio addons [​](#native-checkbox-and-radio-addons)

HTML StackBlitz

template

```
<BInputGroup class="mb-2">
  <BInputGroupText>
    <input
      type="checkbox"
      aria-label="Checkbox for following text input"
    />
  </BInputGroupText>
  <BFormInput aria-label="Text input with checkbox" />
</BInputGroup>
<BInputGroup>
  <BInputGroupText>
    <input
      type="radio"
      aria-label="Radio for following text input"
    />
  </BInputGroupText>
  <BFormInput aria-label="Text input with radio input" />
</BInputGroup>
```

### Custom radio, checkbox, and switch addons [​](#custom-radio-checkbox-and-switch-addons)

Using `BFormCheckbox` and `BFormRadio` components as addons, using Bootstrap [utility classes](/bootstrap-vue-next/docs/reference/utility-classes.html) for additional styling to get them to "fit" in the addon:

Checkbox for following text input

Radio for following text input

Switch for following text input

HTML StackBlitz

template

```
<BInputGroup class="mb-2">
  <BInputGroupText>
    <BFormCheckbox class="me-n2">
      <span class="visually-hidden">Checkbox for following text input</span>
    </BFormCheckbox>
  </BInputGroupText>
  <BFormInput aria-label="Text input with checkbox" />
</BInputGroup>
<BInputGroup class="mb-2">
  <BInputGroupText>
    <BFormRadio class="me-n2">
      <span class="visually-hidden">Radio for following text input</span>
    </BFormRadio>
  </BInputGroupText>
  <BFormInput aria-label="Text input with radio input" />
</BInputGroup>
<BInputGroup>
  <BInputGroupText>
    <BFormCheckbox
      switch
      class="me-n2"
    >
      <span class="visually-hidden">Switch for following text input</span>
    </BFormCheckbox>
  </BInputGroupText>
  <BFormInput aria-label="Text input with switch" />
</BInputGroup>
```

In the above example, we have used the `.visually-hidden` class on a `<span>` to visually hide the custom control's label content (while making them still accessible to screen reader users), and used the utility class `.me-n2` to add a negative right margin to compensate for the "gutter" space between the control and the hidden label.

## Multiple inputs [​](#multiple-inputs)

First and last name

HTML StackBlitz

template

```
<BInputGroup
  prepend="First and last name"
  class="mb-2"
>
  <BFormInput aria-label="First name" />
  <BFormInput aria-label="Last name" />
</BInputGroup>
```

## Multiple addons [​](#multiple-addons)

Multiple add-ons are supported and can be mixed with checkbox and radio input versions.

Item

**$**

ButtonButtonButton

HTML StackBlitz

template

```
<BInputGroup prepend="Item">
  <BInputGroupText>
    <input
      type="checkbox"
      aria-label="Checkbox for following text input"
    />
  </BInputGroupText>
  <BInputGroupText><b>$</b></BInputGroupText>
  <BFormInput
    type="number"
    aria-label="Text input with checkbox"
  />
</BInputGroup>
<BInputGroup class="mt-2">
  <BButton variant="outline-info">Button</BButton>
  <BFormInput
    type="number"
    min="0.00"
  />
  <BButton variant="outline-secondary">Button</BButton>
  <BButton variant="outline-primary">Button</BButton>
</BInputGroup>
```

## Dropdown addons [​](#dropdown-addons)

Dropdown

-   Action A
-   Action B

Dropdown

-   Action C
-   Action D

Dropdown

-   Action C
-   Action D

HTML StackBlitz

template

```
<BInputGroup>
  <template #prepend>
    <BDropdown
      text="Dropdown"
      variant="info"
    >
      <BDropdownItem>Action A</BDropdownItem>
      <BDropdownItem>Action B</BDropdownItem>
    </BDropdown>
  </template>
  <BFormInput />
  <template #append>
    <BDropdown
      v-for="i in 2"
      :key="i"
      text="Dropdown"
      variant="outline-secondary"
    >
      <BDropdownItem>Action C</BDropdownItem>
      <BDropdownItem>Action D</BDropdownItem>
    </BDropdown>
  </template>
</BInputGroup>
```

## Control sizing [​](#control-sizing)

Set height using the `size` prop to `sm` or `lg` for small or large respectively. There is no need to set size on the individual inputs or buttons. Note however, you _will be required_ to also set the size on dropdowns.

LabelButton

LabelButton

LabelButton

HTML StackBlitz

vue

```
<template>
  <BInputGroup
    v-for="size in ['sm', 'md', 'lg']"
    :key="size"
    :size="size as keyof BaseSize"
    class="mb-3"
    prepend="Label"
  >
    <BFormInput />
    <BButton
      size="sm"
      text="Button"
      variant="success"
      >Button</BButton
    >
  </BInputGroup>
</template>

<script setup lang="ts">
import type {BaseSize} from 'bootstrap-vue-next'
</script>
```

To control width, place the input inside standard Bootstrap grid column.

### Sizing custom radio, checkbox and switch addons [​](#sizing-custom-radio-checkbox-and-switch-addons)

If using `BFormRadio` or `BFormCheckbox` as addons, additional utility classes may be required to make everything fit correctly, depending on the size chosen:

Small

Checkbox for previous text input

Large

Switch for previous text input

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <BInputGroup
    size="sm"
    prepend="Small"
    class="mb-2"
  >
    <BFormInput aria-label="Small text input with custom switch" />
    <BInputGroupText>
      <BFormCheckbox
        switch
        class="me-n2 mb-n1"
      >
        <span class="visually-hidden">Checkbox for previous text input</span>
      </BFormCheckbox>
    </BInputGroupText>
  </BInputGroup>
  <BInputGroup
    size="lg"
    prepend="Large"
    class="mb-2"
  >
    <BFormInput aria-label="Large text input with switch" />
    <BInputGroupText>
      <BFormCheckbox
        switch
        class="me-n2"
      >
        <span class="visually-hidden">Switch for previous text input</span>
      </BFormCheckbox>
    </BInputGroupText>
  </BInputGroup>
  <!-- #endregion template -->
</template>
```

Specifically, when using the `sm` size on `BInputGroup` you will need to add a negative bottom margin, via the use of the `.mb-n1` [utility class](/bootstrap-vue-next/docs/reference/utility-classes.html).

## Contextual states [​](#contextual-states)

Bootstrap v5 currently **does not** support contextual state styling (i.e. valid or invalid) of input groups. However, the inputs inside the input group do support contextual state.

## Component Reference

### `<BInputGroup>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BInputGroup/BInputGroup.vue)

-   [<BInputGroup> Properties](#comp-reference-binputgroup-properties)
-   [<BInputGroup> Slots](#comp-reference-binputgroup-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.input‑group`

##### [Properties](#comp-reference-binputgroup-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| append | `string` | `undefined` | Text to append to the input group |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| prepend | `string` | `undefined` | Text to prepend to the input group |
| size | `Size` | `undefined` | Set the size of the component's appearance. 'sm' or 'lg' |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |

##### [Slots](#comp-reference-binputgroup-slots)

| Name | Scope | Description |
| --- | --- | --- |
| append |  | Content to append to the input group |
| default |  | Content to place in the input group |
| prepend |  | Content to prepend to the input group |

### `<BInputGroupText>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BInputGroup/BInputGroupText.vue)

-   [<BInputGroupText> Properties](#comp-reference-binputgrouptext-properties)
-   [<BInputGroupText> Slots](#comp-reference-binputgrouptext-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.input‑group‑text`

##### [Properties](#comp-reference-binputgrouptext-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |
| text | `string` | `undefined` | Content to place in the input group text |

##### [Slots](#comp-reference-binputgrouptext-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the input group text |
