# Collapse ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/collapse.html

##### On this page

-   [Usage ​](#usage)
    
-   [Initial visibility (start expanded) ​](#initial-visibility-start-expanded)
    
-   [v-model support ​](#v-model-support)
    
-   [Horizontal collapse ​](#horizontal-collapse)
    
-   [Trigger multiple collapse elements ​](#trigger-multiple-collapse-elements)
    
-   [Slots ​](#slots)
    
-   [Exposed functions ​](#exposed-functions)
    
-   [Accessibility ​](#accessibility)
    
-   [Component Reference](#component-reference)
    -   [<BCollapse>](#b-collapse)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            

# Collapse [​](#collapse)

Easily toggle visibility of almost any content on your pages in a vertically collapsing container. Includes support for making accordions. Visibility can be easily toggled with our [`v-b-toggle` directive](/bootstrap-vue-next/docs/directives/BToggle), or via [`v-model`](#v-model-support).

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BCollapse/BCollapse.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/collapse.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bcollapse)

Toggle Collapse

Collapse contents Here

Toggle Inner Collapse

Hello!

HTML StackBlitz

template

```
<BButton
  v-b-toggle.collapse-1
  variant="primary"
  >Toggle Collapse</BButton
>

<BCollapse id="collapse-1">
  <BCard class="mt-4">
    <p class="card-text">Collapse contents Here</p>
    <BButton
      v-b-toggle.collapse-1-inner
      size="sm"
      >Toggle Inner Collapse</BButton
    >
    <BCollapse id="collapse-1-inner">
      <BCard class="mt-4">Hello!</BCard>
    </BCollapse>
  </BCard>
</BCollapse>
```

## Usage [​](#usage)

Other elements can easily toggle `BCollapse` components using the [`v-b-toggle` directive](/bootstrap-vue-next/docs/directives/BToggle.html).

Toggle CollapseToggle Collapse

I am collapsible content!

HTML StackBlitz

template

```
<!-- Using modifiers -->
<BButton
  v-b-toggle.collapse-2
  class="m-1"
  >Toggle Collapse</BButton
>

<!-- Using value -->
<BButton
  v-b-toggle="'collapse-2'"
  class="m-1"
  >Toggle Collapse</BButton
>

<!-- Element to collapse -->
<BCollapse id="collapse-2">
  <BCard class="mt-4">I am collapsible content!</BCard>
</BCollapse>
```

## Initial visibility (start expanded) [​](#initial-visibility-start-expanded)

To make the `BCollapse` show initially, set the `v-model` prop:

Toggle Collapse

I should start open!

HTML StackBlitz

template

```
<!-- Using modifiers -->
<BButton
  v-b-toggle.collapse-3
  class="m-1"
  >Toggle Collapse</BButton
>

<BCollapse
  id="collapse-3"
  visible
>
  <BCard class="mt-4">I should start open!</BCard>
</BCollapse>
```

## `v-model` support [​](#v-model-support)

The component's collapsed (visible) state can also be set with `v-model` which binds internally to the `visible` prop.

Note, when using `v-model` to control `BCollapse`, the `aria-*` attributes and class `collapsed` are not automatically placed on the trigger button (as is the case when using the `v-b-toggle` directive). In this example we **must control the attributes ourselves** for proper accessibility support.

By default, an initially visible collapse will not animate on mount. To enable the collapse expanding animation on mount, set the `initial-animation` prop on `<BCollapse>` and leave the `visible` prop as false.

Toggle Collapse

I should start open!

HTML StackBlitz

vue

```
<template>
  <BCard>
    <BButton
      :class="visible ? null : 'collapsed'"
      :aria-expanded="visible ? 'true' : 'false'"
      aria-controls="collapse-4"
      @click="visible = !visible"
    >
      Toggle Collapse
    </BButton>
    <BCollapse
      id="collapse-4"
      v-model="visible"
      class="mt-2"
    >
      <BCard>I should start open!</BCard>
    </BCollapse>
  </BCard>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const visible = ref(true)
</script>
```

## Horizontal collapse [​](#horizontal-collapse)

Set the `horizontal` prop on `BCollapse` to collapse along the horizontal axis instead of the default vertical axis. The element still animates between collapsed and expanded states, but its width is what transitions rather than its height.

Toggle Horizontal Collapse

I collapse horizontally instead of vertically.

HTML StackBlitz

template

```
<BButton
  v-b-toggle.collapse-horizontal
  class="m-1"
  >Toggle Horizontal Collapse</BButton
>

<div style="min-height: 120px">
  <BCollapse
    id="collapse-horizontal"
    horizontal
  >
    <BCard style="width: 300px">
      I collapse horizontally instead of vertically.
    </BCard>
  </BCollapse>
</div>
```

## Trigger multiple collapse elements [​](#trigger-multiple-collapse-elements)

You can even collapse multiple `BCollapse` components via a single `v-b-toggle` by providing multiple target Ids using _modifiers_.

You can also pass multiple target Ids via the directive _value_ in BootstrapVueNext.

Toggle Collapse A and BToggle Collapse A and BToggle Collapse A and B

I am collapsible content A!

I am collapsible content B!

HTML StackBlitz

template

```
<div class="d-flex gap-2">
  <!-- Via multiple directive modifiers -->
  <BButton v-b-toggle.collapse-a.collapse-b>Toggle Collapse A and B</BButton>
  <!-- Via space separated string of Ids passed to directive value -->
  <BButton v-b-toggle="'collapse-a collapse-b'">Toggle Collapse A and B</BButton>
  <!-- Via array of string Ids passed to directive value -->
  <BButton v-b-toggle="['collapse-a', 'collapse-b']">Toggle Collapse A and B</BButton>
</div>
<!-- Elements to collapse -->
<BCollapse id="collapse-a">
  <BCard class="mt-4">I am collapsible content A!</BCard>
</BCollapse>
<BCollapse id="collapse-b">
  <BCard class="mt-4">I am collapsible content B!</BCard>
</BCollapse>
```

## Slots [​](#slots)

The `header` and `footer` slots can be used to create custom toggles for your collapsible content. The default slot is used for the content to be hidden or shown.

The following properties are available for the `header` and `footer` and `default` slots:

| Property | Type | Description |
| --- | --- | --- |
| `visible` | Boolean | Visible state of the collapse |
| `toggle` | Function | When called, will toggle the collapse |
| `show` | Function | When called, will open the collapse |
| `hide` | Function | When called, will close the collapse |
| `id` | String | The ID of the collapsible element |

`BCollapse` also [provides](https://vuejs.org/guide/components/provide-inject.html) the above variables to its children as well as the value of the `isNav` prop.

Open My Collapse

This is data that is being collapsed

HTML StackBlitz

template

```
<BCollapse id="my-collapse">
  <template #header="{visible, toggle, id}">
    <BButton
      variant="primary"
      :aria-expanded="visible"
      :aria-controls="id"
      @click="toggle"
    >
      <span>{{ visible ? 'Close' : 'Open' }}</span> My Collapse
    </BButton>
  </template>
  <!-- Content here -->
  <div class="mt-2">This is data that is being collapsed</div>
</BCollapse>
```

## Exposed functions [​](#exposed-functions)

`BCollapse` exposes several functions and properties through template refs. See the [Component Reference Exposed section](#comp-reference-bcollapse-exposed) for details.

showhidetoggle

I am controlled by exposed functions!

    isNav = false
    visible = false
  

HTML StackBlitz

vue

```
<template>
  <BButtonGroup>
    <BButton @click="show">show</BButton>
    <BButton @click="hide">hide</BButton>
    <BButton @click="toggle">toggle</BButton>
  </BButtonGroup>
  <BCollapse
    ref="myCollapse"
    class="mt-2"
  >
    <BCard>I am controlled by exposed functions!</BCard>
  </BCollapse>
  <pre class="mt-2">
    isNav = {{ myCollapse?.isNav }}
    visible = {{ myCollapse?.visible }}
  </pre>
</template>

<script setup lang="ts">
import {useTemplateRef} from 'vue'
import {BCollapse} from 'bootstrap-vue-next/components/BCollapse'

const myCollapse = useTemplateRef('myCollapse')
const show = () => myCollapse.value?.show()
const hide = () => myCollapse.value?.hide()
const toggle = () => myCollapse.value?.toggle()
</script>
```

## Accessibility [​](#accessibility)

The `v-b-toggle` directive will automatically add the ARIA attribute `aria-controls` to the trigger element and register it with the target `BCollapse` component. The collapse component will then automatically manage the `aria-expanded` attribute and `collapsed` class on the trigger element to reflect its visibility state.

For detailed information on managing ARIA attributes for triggers, including examples of using `v-b-toggle` with `v-model` and manual ARIA management, see the [ARIA Trigger Registration for Component Visibility](/bootstrap-vue-next/docs/reference/accessibility.html#aria-trigger-registration-for-component-visibility) section in the Accessibility reference.

While the `v-b-toggle` directive can be placed on almost any HTML element or Vue component, it is recommended to use a button or link (or similar component) to act as your toggler; otherwise your trigger elements may be inaccessible to keyboard or screen reader users. If you do place them on something other than a button or link (or similar component), you should add the attributes `tabindex="0"` and `role="button"` to allow users of assistive technology to reach your trigger element.

## Component Reference

### `<BCollapse>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BCollapse/BCollapse.vue)

-   [<BCollapse> Properties](#comp-reference-bcollapse-properties)
-   [<BCollapse> Events](#comp-reference-bcollapse-events)
-   [<BCollapse> Slots](#comp-reference-bcollapse-slots)
-   [<BCollapse> Exposed](#comp-reference-bcollapse-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.collapse`

##### [Properties](#comp-reference-bcollapse-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| horizontal | `boolean` | `false` | When set, collapses horizontally instead of vertically |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| initial-animation | `boolean` | `false` | When set, enables the initial animation on mount |
| is-nav | `boolean` | `false` | When set, signifies that the collapse is part of a navbar, enabling certain features for navbar support |
| lazy | `boolean` | `false` | When set, the content will not be mounted until opened |
| model-value | `boolean` | `false` | Controls the visibility of the component |
| no-animation | `boolean` | `false` | When set, disables the animation |
| no-fade | `boolean` | `false` | Alias for \`noAnimation\` |
| show | `boolean` | `false` | When set, and prop 'visible' is false on mount, will animate from closed to open on initial mount. Mainly to help with template show. Use model-value for reactive show/hide |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |
| trans-props | `TransitionProps` | `undefined` | Transition properties |
| unmount-lazy | `boolean` | `false` | When set and \`lazy\` is true, the content will be unmounted when closed |
| visible | `boolean` | `false` | When 'true', open without animation |

##### [Events](#comp-reference-bcollapse-events)

| Event | Args | Description |
| --- | --- | --- |
| hidden | 
`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Always emits after the component is hidden |
| hide | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Always emits just before the component has hidden. Cancelable (as long as component wasn't forcibly hidden) |
| hide-prevented | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the component tried to close, but was prevented from closing. This occurs when preventDefault() is called on the event, the user clicks escape and no-close-onbackdrop is set to true, or the user clicks on the backdrop and no-close-onbackdrop is set to true. |
| show | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Always emits just before the component is shown. Cancelable |
| show-prevented | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the component tried to open, but was prevented from opening. This occurs when preventDefault() is called on the event |
| shown | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Always emits just after component is shown. |
| toggle | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when collapse has started to toggle |
| toggle-prevented | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the component tried to toggle, but was prevented from doing so. This occurs when preventDefault() is called on the event, the user clicks escape and no-close-onbackdrop is set to true, or the user clicks on the backdrop and no-close-onbackdrop is set to true. |
| update:model-value | 

`value``: boolean` - Will be true if the collapse is visible

 | Used to update the v-model |

##### [Slots](#comp-reference-bcollapse-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default | 
`hide``: () => void` - Hides the collapse and fires the 'hide' event

`id``: string` - The id of the collapse element

`show``: () => void` - Shows the collapse and fires the 'show' event

`toggle``: () => void` - Toggles the collapse and fires the 'hide' or 'show' event, as appropriate

`visible``: () => void` - Visible state of the collapse. \`true\` if the collapse is visible

 | The content shown and hidden by the collapse |
| footer | 

`hide``: () => void` - Hides the collapse and fires the 'hide' event

`id``: string` - The id of the collapse element

`show``: () => void` - Shows the collapse and fires the 'show' event

`toggle``: () => void` - Toggles the collapse and fires the 'hide' or 'show' event, as appropriate

`visible``: () => void` - Visible state of the collapse. \`true\` if the collapse is visible

 | Used to create custom toggles for your collapsible content. Placed directly below the content |
| header | 

`hide``: () => void` - Hides the collapse and fires the 'hide' event

`id``: string` - The id of the collapse element

`show``: () => void` - Shows the collapse and fires the 'show' event

`toggle``: () => void` - Toggles the collapse and fires the 'hide' or 'show' event, as appropriate

`visible``: () => void` - Visible state of the collapse. \`true\` if the collapse is visible

 | Used to create custom toggles for your collapsible content. Placed directly above the content |

##### [Exposed](#comp-reference-bcollapse-exposed)

| Name | Type | Description |
| --- | --- | --- |
| hide | `() => void` | Hides the collapse |
| show | `() => void` | Shows the collapse |
| toggle | `() => void` | Toggles the visibility of the collapse |
