# Spinner ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/spinner.html

##### On this page

-   [Spinner types ​](#spinner-types)
    -   [Border spinner ​](#border-spinner)
        
    -   [Growing spinner ​](#growing-spinner)
        
-   [Spinner color variants ​](#spinner-color-variants)
    
-   [Size ​](#size)
    
-   [Alignment ​](#alignment)
    -   [Margin ​](#margin)
        
    -   [Placement ​](#placement)
        -   [Flex ​](#flex)
            
        -   [Floats ​](#floats)
            
        -   [Text align ​](#text-align)
            
-   [Spinners in buttons ​](#spinners-in-buttons)
    
-   [Spinner accessibility ​](#spinner-accessibility)
    
-   [Component Reference](#component-reference)
    -   [<BSpinner>](#b-spinner)
        -   [Properties](#)
            
        -   [Slots](#)
            

# Spinner [​](#spinner)

The `<BSpinner>` component can be used to show the loading state in your projects. They're rendered only with basic HTML and CSS as a lightweight Vue component. Their appearance, alignment, and sizing can be easily customized with a few built-in props and/or Bootstrap v5 utility classes.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BSpinner/BSpinner.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/spinner.md)

Spinners can be placed just about anywhere, including inside buttons, alerts, and even `<BTable>`'s busy slot.

SpinningSpinningSpinningSpinningSpinningSpinning

HTML StackBlitz

template

```
<div class="text-center">
  <BSpinner
    label="Spinning"
    class="mx-1"
  />
  <BSpinner
    type="grow"
    label="Spinning"
    class="mx-1"
  />
  <BSpinner
    variant="primary"
    label="Spinning"
    class="mx-1"
  />
  <BSpinner
    variant="primary"
    type="grow"
    label="Spinning"
    class="mx-1"
  />
  <BSpinner
    variant="success"
    label="Spinning"
    class="mx-1"
  />
  <BSpinner
    variant="success"
    type="grow"
    label="Spinning"
    class="mx-1"
  />
</div>
```

## Spinner types [​](#spinner-types)

### Border spinner [​](#border-spinner)

Use the default `border` type spinners for a lightweight loading indicator.

HTML StackBlitz

template

```
<BSpinner />
```

### Growing spinner [​](#growing-spinner)

If you don't fancy a `border` spinner, switch to the `grow` spinner by setting the prop `type` to `'grow'`. While it doesn't technically spin, it does repeatedly grow!

HTML StackBlitz

template

```
<BSpinner type="grow" />
```

## Spinner color variants [​](#spinner-color-variants)

Spinners use `currentColor` for their color, meaning it inherits the current font color. You can customize the color using the standard text color variants using the `variant` prop, or place classes or styles on the component to change its color.

The `variant` prop translates the variant name to the Bootstrap v5 class `.text-{variant}`, so if you have custom defined text color variants, feel free to use them via the `variant` prop.

HTML StackBlitz

template

```
<template>
  <div>
    <div class="text-center mb-3 d-flex justify-content-between">
      <BSpinner
        v-for="variant in variants"
        :key="variant"
        :variant="variant"
      />
    </div>

    <div class="text-center d-flex justify-content-between">
      <BSpinner
        v-for="variant in variants"
        :key="variant"
        :variant="variant"
        type="grow"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ColorVariant} from 'bootstrap-vue-next'

const variants = [
  'primary',
  'secondary',
  'danger',
  'warning',
  'success',
  'info',
  'light',
  'dark',
] as ColorVariant[]
</script>
```

INFO

**Why not use `border-color` utilities?** Each `border` spinner specifies a `transparent` border for at least one side, so `.border-{color}` utilities would override that.

## Size [​](#size)

Set the prop `small` to `true` to make a smaller spinner that can quickly be used within other components.

HTML StackBlitz

template

```
<BSpinner
  small
  class="me-2"
/>
<BSpinner
  small
  type="grow"
/>
```

Or, use custom CSS or inline styles to change the dimensions as needed.

Large SpinnerLarge Spinner

HTML StackBlitz

template

```
<BSpinner
  style="width: 3rem; height: 3rem"
  class="me-2"
  label="Large Spinner"
/>
<BSpinner
  style="width: 3rem; height: 3rem"
  label="Large Spinner"
  type="grow"
/>
```

## Alignment [​](#alignment)

Spinners in Bootstrap are built with `rem`s, currentColor, and `display: inline-flex`. This means they can easily be resized, recolored, and quickly aligned.

### Margin [​](#margin)

Use [margin utilities](https://getbootstrap.com/docs/5.3/utilities/spacing/) like `.m-5` for easy spacing.

Busy

HTML StackBlitz

template

```
<BSpinner
  class="m-5"
  label="Busy"
/>
```

### Placement [​](#placement)

Use [flexbox utilities](https://getbootstrap.com/docs/5.3/utilities/flex/), [float utilities](https://getbootstrap.com/docs/5.3/utilities/float/), or [text alignment](https://getbootstrap.com/docs/5.3/utilities/text/) utilities to place spinners exactly where you need them in any situation.

#### Flex [​](#flex)

Using flex utility classes:

HTML StackBlitz

template

```
<div class="d-flex justify-content-center">
  <BSpinner />
</div>
```

#### Floats [​](#floats)

Using float utility classes:

HTML StackBlitz

template

```
<div class="clearfix">
  <BSpinner class="float-end" />
</div>
```

#### Text align [​](#text-align)

Using text alignment utility classes:

HTML StackBlitz

template

```
<div class="text-center">
  <BSpinner />
</div>
```

## Spinners in buttons [​](#spinners-in-buttons)

Use spinners within buttons to indicate an action is currently processing or taking place. You may also swap the text out of the spinner element and utilize button text as needed.

Loading... Loading...

HTML StackBlitz

template

```
<BButton
  variant="primary"
  disabled
  class="me-2"
>
  <BSpinner small />
  <span class="visually-hidden">Loading...</span>
</BButton>
<BButton
  variant="primary"
  disabled
>
  <BSpinner small />
  Loading...
</BButton>
```

Loading... Loading...

HTML StackBlitz

template

```
<BButton
  variant="primary"
  disabled
  class="me-2"
>
  <BSpinner
    small
    type="grow"
  />
  <span class="visually-hidden">Loading...</span>
</BButton>
<BButton
  variant="primary"
  disabled
>
  <BSpinner
    small
    type="grow"
  />
  Loading...
</BButton>
```

## Spinner accessibility [​](#spinner-accessibility)

Place a hidden label text inside the spinner for screen reader users, via the `label` prop or `label` slot. The content will be placed _inside_ the spinner wrapped in a `<span>` element that has the class `visually-hidden`, which will make the label available to screen reader users.

For accessibility purposes, each spinner will automatically have a `role="status"` attribute when a label is provided. You can easily customize the role if required via prop `role`. The specified `role` will not be applied when no label is provided.

As well, when no label is provided, the spinner will automatically have the attribute `aria-hidden="true"` to hide the spinner from screen reader users.

## Component Reference

### `<BSpinner>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BSpinner/BSpinner.vue)

-   [<BSpinner> Properties](#comp-reference-bspinner-properties)
-   [<BSpinner> Slots](#comp-reference-bspinner-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.spinner‑*`

##### [Properties](#comp-reference-bspinner-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| label | `string` | `undefined` | Text content for the visually-hidden label. |
| role | `string` | `undefined` | Sets the ARIA attribute \`role\` to a specific value |
| small | `boolean` | `false` | Renders a smaller spinner suitable for placement in buttons. |
| tag | `string` | `'span'` | Specify the HTML tag to render instead of the default tag |
| type | `SpinnerType` | `'border'` | Sets the spinner type. Supported types are 'border' and 'grow'. |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Slots](#comp-reference-bspinner-slots)

| Name | Scope | Description |
| --- | --- | --- |
| label |  | Content for the visually hidden label. |
