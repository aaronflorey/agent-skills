# Button ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/button.html

##### On this page

-   [Overview ​](#overview)
    
-   [Element type ​](#element-type)
    
-   [Type ​](#type)
    
-   [Sizing ​](#sizing)
    
-   [Contextual variants ​](#contextual-variants)
    -   [Solid color variants ​](#solid-color-variants)
        
    -   [Outline color variants ​](#outline-color-variants)
        
    -   [Link variant ​](#link-variant)
        
-   [Block level buttons ​](#block-level-buttons)
    
-   [Pill style ​](#pill-style)
    
-   [Squared style ​](#squared-style)
    
-   [Disabled state ​](#disabled-state)
    
-   [Pressed state and toggling ​](#pressed-state-and-toggling)
    
-   [Loading ​](#loading)
    
-   [Router link support ​](#router-link-support)
    
-   [Accessibility ​](#accessibility)
    
-   [Component Reference](#component-reference)
    -   [<BButton>](#b-button)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
    -   [<BCloseButton>](#b-close-button)
        -   [Properties](#)
            
        -   [Events](#)
            

# Button [​](#button)

Use Bootstrap's custom `BButton` component for actions in forms, dialogs, and more. Includes support for a handful of contextual variations, sizes, states, and more.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BButton/BButton.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/button.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bbutton)

## Overview [​](#overview)

BootstrapVueNext's `BButton` component generates either a `<button>` element, `<a>` element, or `RouterLink` component with the styling of a button.

ButtonButtonButtonButton

HTML StackBlitz

template

```
<BButton>Button</BButton>
<BButton variant="danger">Button</BButton>
<BButton variant="success">Button</BButton>
<BButton variant="outline-primary">Button</BButton>
```

## Element type [​](#element-type)

The `BButton` component generally renders a `<button>` element. However, you can also render an `<a>` element by providing an `href` prop value. You may also generate `vue-router` `RouterLink` when providing a value for the `to` prop (`vue-router` is required).

I am a Button[I am a Link](#button-element-type)

HTML StackBlitz

template

```
<BButton>I am a Button</BButton>
<BButton href="#button-element-type">I am a Link</BButton>
```

## Type [​](#type)

You can specify the button's type by setting the prop `type` to `'button'`, `'submit'` or `'reset'`. The default type is `'button'`.

Note the `type` prop has no effect when either `href` or `to` props are set.

## Sizing [​](#sizing)

Fancy larger or smaller buttons? Specify `lg` or `sm` via the `size` prop.

Small ButtonDefault ButtonLarge Button

HTML StackBlitz

template

```
<BButton
  size="sm"
  class="mx-1"
  >Small Button</BButton
>
<BButton class="mx-1">Default Button</BButton>
<BButton
  size="lg"
  class="mx-1"
  >Large Button</BButton
>
```

## Contextual variants [​](#contextual-variants)

Use the `variant` prop to generate the various Bootstrap contextual button variants.

By default, `BButton` will render with the `secondary` variant.

The `variant` prop adds the Bootstrap class `.btn-<variant>` on the rendered button. See the [Color Variants](/bootstrap-vue-next/docs/reference/color-variants.html) page for details.

### Solid color variants [​](#solid-color-variants)

`primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light` and `dark`.

PrimarySecondarySuccessDangerWarningInfoLightDark

HTML StackBlitz

template

```
<BButton variant="primary">Primary</BButton>
<BButton variant="secondary">Secondary</BButton>
<BButton variant="success">Success</BButton>
<BButton variant="danger">Danger</BButton>
<BButton variant="warning">Warning</BButton>
<BButton variant="info">Info</BButton>
<BButton variant="light">Light</BButton>
<BButton variant="dark">Dark</BButton>
```

### Outline color variants [​](#outline-color-variants)

In need of a button, but not the hefty background colors they bring? Use the `outline-*` variants to remove all background images and colors on any `BButton`:

`outline-primary`, `outline-secondary`, `outline-success`, `outline-danger`, `outline-warning`, `outline-info`, `outline-light` and `outline-dark`.

PrimarySecondarySuccessDangerWarningInfoLightDark

HTML StackBlitz

template

```
<BButton variant="outline-primary">Primary</BButton>
<BButton variant="outline-secondary">Secondary</BButton>
<BButton variant="outline-success">Success</BButton>
<BButton variant="outline-danger">Danger</BButton>
<BButton variant="outline-warning">Warning</BButton>
<BButton variant="outline-info">Info</BButton>
<BButton variant="outline-light">Light</BButton>
<BButton variant="outline-dark">Dark</BButton>
```

### Link variant [​](#link-variant)

Variant `link` will render a button with the appearance of a link while maintaining the default padding and size of a button.

Link

HTML StackBlitz

template

```
<BButton variant="link">Link</BButton>
```

**Tip:** remove the hover underline from a link variant button by setting `underline-opacity="0"`.

## Block level buttons [​](#block-level-buttons)

Create responsive stacks of full-width, “block buttons” by wrapping the button(s) in a div and specifying `d-grid` and `gap-*`. By using CSS utilities instead a boolean property on the button, we have much greater control over spacing, alignment, and responsive behaviors. See the [Bootstrap 5](https://getbootstrap.com/docs/5.3/components/buttons/#block-buttons) documentation for details

Block Level ButtonAnother Block Level Button

HTML StackBlitz

template

```
<div class="d-grid gap-2">
  <BButton variant="primary">Block Level Button</BButton>
  <BButton variant="primary">Another Block Level Button</BButton>
</div>
```

## Pill style [​](#pill-style)

Prefer buttons with a more rounded-pill style? Just set the prop `pill` to true.

ButtonButtonButtonButtonButtonButton

HTML StackBlitz

template

```
<BButton pill>Button</BButton>
<BButton
  pill
  variant="primary"
  >Button</BButton
>
<BButton
  pill
  variant="outline-secondary"
  >Button</BButton
>
<BButton
  pill
  variant="success"
  >Button</BButton
>
<BButton
  pill
  variant="outline-danger"
  >Button</BButton
>
<BButton
  pill
  variant="info"
  >Button</BButton
>
```

This prop adds the Bootstrap v5 utility class `.rounded-pill` on the rendered button.

## Squared style [​](#squared-style)

Prefer buttons with a more square corner style? Just set the prop `squared` to true.

ButtonButtonButtonButtonButtonButton

HTML StackBlitz

template

```
<BButton squared>Button</BButton>
<BButton
  squared
  variant="primary"
  >Button</BButton
>
<BButton
  squared
  variant="outline-secondary"
  >Button</BButton
>
<BButton
  squared
  variant="success"
  >Button</BButton
>
<BButton
  squared
  variant="outline-danger"
  >Button</BButton
>
<BButton
  squared
  variant="info"
  >Button</BButton
>
```

The `squared` prop adds the Bootstrap v5 utility class `.rounded-0` on the rendered button. The `pill` prop takes precedence over the `squared` prop.

## Disabled state [​](#disabled-state)

Set the `disabled` prop to disable button default functionality. `disabled` also works with buttons rendered as `<a>` elements and `RouterLink` (i.e. with the `href` or `to` prop set).

DisabledAlso Disabled

HTML StackBlitz

template

```
<BButton
  disabled
  size="lg"
  variant="primary"
  >Disabled</BButton
>
<BButton
  disabled
  size="lg"
  >Also Disabled</BButton
>
```

## Pressed state and toggling [​](#pressed-state-and-toggling)

Buttons will appear pressed (with a darker background, darker border, and inset shadow) when the prop `pressed` is set to `true`.

The `pressed` prop can be set to one of three values:

-   `true`: Sets the `.active` class and adds the attribute `aria-pressed="true"`.
-   `false`: Clears the `.active` class and adds the attribute `aria-pressed="false"`.
-   `null`: (default) Neither the class `.active` nor the attribute `aria-pressed` will be set.

To create a button that can be toggled between active and non-active states, use the `v-model` (available in Vue 3.0+) on the `pressed` property by specifying `v-model:pressed`.

##### Pressed and un-pressed state

Always PressedNot Pressed

##### Toggleable Button

Toggle Me

Pressed State: **false**

##### In a button group

Toggle 1Toggle 2Toggle 3Toggle 4

Pressed States: **\[ true, false, true, false \]**

HTML StackBlitz

template

```
<template>
  <h5>Pressed and un-pressed state</h5>
  <div class="d-flex gap-2">
    <BButton
      :pressed="true"
      variant="success"
      >Always Pressed</BButton
    >
    <BButton
      :pressed="false"
      variant="success"
      >Not Pressed</BButton
    >
  </div>
  <h5 class="mt-3">Toggleable Button</h5>
  <BButton
    v-model:pressed="buttonToggle"
    variant="primary"
    >Toggle Me</BButton
  >
  <p>
    Pressed State: <strong>{{ buttonToggle }}</strong>
  </p>
  <h5>In a button group</h5>
  <BButtonGroup size="sm">
    <BButton
      v-for="(btn, idx) in buttons"
      :key="idx"
      v-model:pressed="btn.state"
      variant="primary"
    >
      {{ btn.caption }}
    </BButton>
  </BButtonGroup>
  <p>
    Pressed States: <strong>{{ btnStates }}</strong>
  </p>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

const buttonToggle = ref(false)
const buttons = ref([
  {caption: 'Toggle 1', state: true},
  {caption: 'Toggle 2', state: false},
  {caption: 'Toggle 3', state: true},
  {caption: 'Toggle 4', state: false},
])

const btnStates = computed(() => buttons.value.map((b) => b.state))
</script>
```

If using toggle button style for a radio or checkbox style interface, it is best to use the built-in `button` style support of [`BFormRadioGroup`](/bootstrap-vue-next/docs/components/form-radio.html) and [`BFormCheckboxGroup`](/bootstrap-vue-next/docs/components/form-checkbox.html).

## Loading [​](#loading)

`BButton` supports several properties to indicate a loading state. When `loading` is true, the loading state is active, otherwise the normal button is displayed. When loading is active, `loading-text` is shown along with a spinner. If `loading-fill` is true, the button shows only the spinner and the `loading-text` is ignored. You can also override the spinner with an arbitrary component by using the `loading-spinner` slot or the entire content of the button with the `loading` slot.

Loading...Loading...Please Wait...Button

HTML StackBlitz

template

```
<BButton :loading="true">Button</BButton>
<BButton
  :loading="true"
  loading-fill
  >Button</BButton
>
<BButton
  :loading="true"
  loading-text="Please Wait..."
  >Button</BButton
>
<BButton
  :loading="false"
  loading-text="Please Wait..."
  >Button</BButton
>
```

## Router link support [​](#router-link-support)

Refer to the [`Router support`](/bootstrap-vue-next/docs/reference/router-links.html) reference docs for the various supported `RouterLink` related props.

## Accessibility [​](#accessibility)

When the `href` prop is set to `'#'`, `BButton` will render a link (`<a>`) element with attribute `role="button"` set and appropriate keydown listeners (Enter and Space) so that the link acts like a native HTML `<button>` for screen reader and keyboard-only users. When disabled, the `aria-disabled="true"` attribute will be set on the `<a>` element.

When the `href` is set to any other value (~or the `to` prop is used~), `role="button"` will not be added, nor will the keyboard event listeners be enabled.

## Component Reference

### `<BButton>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BButton/BButton.vue)

-   [<BButton> Properties](#comp-reference-bbutton-properties)
-   [<BButton> Events](#comp-reference-bbutton-events)
-   [<BButton> Slots](#comp-reference-bbutton-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.btn`

##### [Properties](#comp-reference-bbutton-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| loading | `boolean` | `false` | When set to \`true\`, renders the button in loading state |
| loading-fill | `boolean` | `false` | When set to \`true\`, fills the button with the loading spinner and ignores \`loading-text\` |
| loading-text | `string` | `'Loading...'` | The text to display when the button is in a loading state |
| pill | `boolean` | `false` | Renders the button with the pill style appearance when set to 'true' |
| pressed | `boolean` | `undefined` | When set to 'true', gives the button the appearance of being pressed and adds attribute 'aria-pressed="true"'. When set to \`false\` adds attribute 'aria-pressed="false"'. Tri-state prop. Syncable with the .sync modifier |
| size | `Size` | `undefined` | Set the size of the component's appearance. 'sm' or 'lg' |
| squared | `boolean` | `false` | Renders the button with non-rounded corners when set to 'true' |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |
| type | `ButtonType` | `'button'` | The value to set the button's 'type' attribute to. Can be one of 'button', 'submit', or 'reset' |
| variant | `ColorVariant | null` | `'secondary'` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

Extensions:

Extensions are selected properties from another component, integrated here. It may not include all original properties

[BLink props](#)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| active-class | `string` | `'router-link-active'` | Configure the active CSS class applied when the link is active. |
| exact-active-class | `string` | `'router-link-exact-active'` | Configure the active CSS class applied when the link is active with exact match. |
| replace | `boolean` | `false` | Setting replace prop will call router.replace() instead of router.push() when clicked |
| router-component-name | `string` | `'router-link'` | BootstrapVue auto detects between \`<router-link>\` and \`<nuxt-link>\`. Set this this property to explicity set the name of the router component. |
| router-tag | `string` | `'a'` | Set the tag type for the link |

##### [Events](#comp-reference-bbutton-events)

| Event | Args | Description |
| --- | --- | --- |
| click | 
`click``: MouseEvent`

 | On click event |
| update:pressed | 

`value``: boolean` - The new value of the \`pressed\` prop

 | Emitted when the \`pressed\` prop is changed |

##### [Slots](#comp-reference-bbutton-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the button |
| loading |  | The content to replace the default loader |
| loading-spinner |  | The content to replace the default loading spinner |

### `<BCloseButton>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BButton/BCloseButton.vue)

-   [<BCloseButton> Properties](#comp-reference-bclosebutton-properties)
-   [<BCloseButton> Events](#comp-reference-bclosebutton-events)

[Adding styles](../configurations/customizing-styles#adding-styles): `.btn‑close`

##### [Properties](#comp-reference-bclosebutton-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-label | `string` | `'Close'` | Sets the value of \`aria-label\` attribute on the rendered element |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| type | `ButtonType` | `'button'` | The value to set the button's 'type' attribute to. Can be one of 'button', 'submit', or 'reset' |

##### [Events](#comp-reference-bclosebutton-events)

| Event | Args | Description |
| --- | --- | --- |
| click | 
`click``: MouseEvent` - Native click event object

 | Emitted when non-disabled button clicked |
