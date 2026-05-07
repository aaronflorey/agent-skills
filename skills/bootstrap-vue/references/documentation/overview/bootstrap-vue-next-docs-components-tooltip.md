# Tooltip ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/tooltip.html

##### On this page

-   [Overview ​](#overview)
    
-   [Target ​](#target)
    -   [Making tooltips work for keyboard and assistive technology users ​](#making-tooltips-work-for-keyboard-and-assistive-technology-users)
        
    -   [Disabled elements ​](#disabled-elements)
        
-   [Positioning ​](#positioning)
    
-   [Interactive ​](#interactive)
    
-   [Triggers ​](#triggers)
    
-   [Content ​](#content)
    
-   [Custom Classes and Variants ​](#custom-classes-and-variants)
    
-   [Programmatic control via v-model ​](#programmatic-control-via-v-model)
    
-   [Close on Hide ​](#close-on-hide)
    
-   [Exposed functions ​](#exposed-functions)
    
-   [Accessibility ​](#accessibility)
    
-   [Component Reference](#component-reference)
    -   [<BTooltip>](#b-tooltip)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            

# Tooltip [​](#tooltip)

Easily add tooltips to an interactive element or component via the `<BTooltip>` component or [`v-b-tooltip`](/bootstrap-vue-next/docs/directives/BTooltip) directive. Tooltips can also be created and programmatically controlled via the composable [`usePopover`](/bootstrap-vue-next/docs/composables/usePopover)

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BTooltip/BTooltip.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/tooltip.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#btooltip)

Hover Me

I am tooltip **component** content using the **#target** slot!

Hover Me

I am tooltip **component** content using the **target** prop!

Hover Me

I am tooltip directive content!

HTML StackBlitz

template

```
<div class="d-flex gap-2">
  <BTooltip>
    <template #target> <BButton> Hover Me </BButton></template>
    I am tooltip <b>component</b> content using the <b>#target</b> slot!
  </BTooltip>

  <BButton id="overview-tooltip"> Hover Me </BButton>
  <BTooltip target="overview-tooltip">
    I am tooltip <b>component</b> content using the <b>target</b> prop!
  </BTooltip>

  <BButton v-b-tooltip.focus.top="'I am tooltip directive content!'"> Hover Me </BButton>
</div>
```

## Overview [​](#overview)

Things to know when using the tooltip component:

-   Tooltip is a wrapper for Popover, providing a simple way to create tooltips in your application. It uses the same API as Popover, but with some default properties set for tooltips.
    -   The delay is zero
    -   sideMargin is 0
    -   Tooltips are non-interactive by default.
-   Tooltips rely on the 3rd party library [floating-ui](https://floating-ui.com/) for positioning.
-   Use `teleportTo` and `teleportDisabled` to control where in the DOM the tooltip is rendered. See the [Vue.js Docs](https://vuejs.org/guide/built-ins/teleport.html) for details. `teleportTo` defaults to `undefined`.
-   Triggering tooltips on hidden elements will not work.
-   Tooltips for `disabled` elements must be triggered on a wrapper element.
-   When triggered from hyperlinks that span multiple lines, tooltips will be centered. Set the `inline` prop to improve the positioning. See the [Floating UI docs](https://floating-ui.com/docs/inline) for details.

## Target [​](#target)

The target is the _trigger_ element (or component) that will trigger the tooltip. The target is specified via the `target` slot or prop, and can be any of the following:

The `target` prop may be any of the following:

-   A string identifying the ID of the trigger element (or ID of the root element of a component)
-   A string with querySelector. (i.e. '#toolbar > div:first-child')
-   A reference (ref) to an `HTMLElement` or an `SVGElement` via a [Template Ref](https://vuejs.org/guide/essentials/template-refs.html)
-   A reference (ref) to a component that has either an `HTMLElement` or `SVGElement` as its root element via [Template Ref](https://vuejs.org/guide/essentials/template-refs.html)

NOTE

`HTMLElement` refers to standard HTML elements such as `<div>`, `<button>`, etc., while `SVGElement` refers to `<svg>` or supported child elements of SVGs.

### Making tooltips work for keyboard and assistive technology users [​](#making-tooltips-work-for-keyboard-and-assistive-technology-users)

You should only add tooltips to HTML elements that are traditionally keyboard-focusable and interactive (such as links, buttons, or form controls). Although arbitrary HTML elements (such as `<span>`s) can be made focusable by adding the `tabindex="0"` attribute, this will add potentially annoying and confusing tab stops on non-interactive elements for keyboard users. In addition, most assistive technologies currently do not announce the tooltip in this situation.

Additionally, do not rely solely on `hover` as the trigger for your tooltip, as this will make your tooltips _impossible to trigger for keyboard-only users_.

### Disabled elements [​](#disabled-elements)

Elements with the `disabled` attribute aren’t interactive, meaning users cannot focus, hover, or click them to trigger a tooltip (or popover). As a workaround, you’ll want to trigger the tooltip from a wrapper `<div>` or `<span>`, ideally made keyboard-focusable using `tabindex="0"`, and override the `pointer-events` on the disabled element.

## Positioning [​](#positioning)

Twelve static options are available for the `placement` prop: `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, and `right-end` from [@floating-ui/vue](https://floating-ui.com/) plus three [auto placement](https://floating-ui.com/docs/autoplacement) options `auto`, `auto-start` and `auto-end`.

Positioning is relative to the trigger element.

Top

I am tooltip **component** content!

Top Start

I am tooltip **component** content!

Top End

I am tooltip **component** content!

Bottom

I am tooltip **component** content!

Bottom Start

I am tooltip **component** content!

Bottom End

I am tooltip **component** content!

Left

I am tooltip **component** content!

Left Start

I am tooltip **component** content!

Left End

I am tooltip **component** content!

Right

I am tooltip **component** content!

Right Start

I am tooltip **component** content!

Right End

I am tooltip **component** content!

Auto

I am tooltip **component** content!

Auto Start

I am tooltip **component** content!

Auto End

I am tooltip **component** content!

HTML StackBlitz

template

```
<BContainer>
  <BRow class="my-2">
    <BCol class="d-grid gap-2">
      <BTooltip placement="top">
        <template #target><BButton>Top</BButton></template>
        I am tooltip <b>component</b> content!
      </BTooltip>
      <BTooltip placement="top-start">
        <template #target><BButton>Top Start</BButton></template>
        I am tooltip <b>component</b> content!
      </BTooltip>
      <BTooltip placement="top-end">
        <template #target><BButton>Top End</BButton></template>
        I am tooltip <b>component</b> content!
      </BTooltip>
    </BCol>
    <BCol class="d-grid gap-2">
      <BTooltip placement="bottom">
        <template #target><BButton>Bottom</BButton></template>
        I am tooltip <b>component</b> content!
      </BTooltip>
      <BTooltip placement="bottom-start">
        <template #target><BButton>Bottom Start</BButton></template>
        I am tooltip <b>component</b> content!
      </BTooltip>
      <BTooltip placement="bottom-end">
        <template #target><BButton>Bottom End</BButton></template>
        I am tooltip <b>component</b> content!
      </BTooltip>
    </BCol>
    <BCol class="d-grid gap-2">
      <BTooltip placement="left">
        <template #target><BButton>Left</BButton></template>
        I am tooltip <b>component</b> content!
      </BTooltip>
      <BTooltip placement="left-start">
        <template #target><BButton>Left Start</BButton></template>
        I am tooltip <b>component</b> content!
      </BTooltip>
      <BTooltip placement="left-end">
        <template #target><BButton>Left End</BButton></template>
        I am tooltip <b>component</b> content!
      </BTooltip>
    </BCol>
    <BCol class="d-grid gap-2">
      <BTooltip placement="right">
        <template #target><BButton>Right</BButton></template>
        I am tooltip <b>component</b> content!
      </BTooltip>
      <BTooltip placement="right-start">
        <template #target><BButton>Right Start</BButton></template>
        I am tooltip <b>component</b> content!
      </BTooltip>
      <BTooltip placement="right-end">
        <template #target><BButton>Right End</BButton></template>
        I am tooltip <b>component</b> content!
      </BTooltip>
    </BCol>
  </BRow>
</BContainer>
<BContainer>
  <BRow class="my-2">
    <BCol class="d-grid gap-2">
      <BTooltip placement="auto">
        <template #target><BButton>Auto</BButton></template>
        I am tooltip <b>component</b> content!
      </BTooltip>
    </BCol>
    <BCol class="d-grid gap-2">
      <BTooltip placement="auto-start">
        <template #target><BButton>Auto Start</BButton></template>
        I am tooltip <b>component</b> content!
      </BTooltip>
    </BCol>
    <BCol class="d-grid gap-2">
      <BTooltip placement="auto-end">
        <template #target><BButton>Auto End</BButton></template>
        I am tooltip <b>component</b> content!
      </BTooltip>
    </BCol>
  </BRow>
</BContainer>
```

## Interactive [​](#interactive)

`BTooltip` has an interactive prop, which allows you to set the tooltip to be interactive. This means that the tooltip will remain open when the mouse is over it or focus is within it, allowing users to interact with its content.

Hover me

0+

HTML StackBlitz

vue

```
<template>
  <div class="d-flex gap-2">
    <BTooltip interactive>
      <template #target>
        <BButton>Hover me</BButton>
      </template>
      <span class="me-2">{{ count }}</span>
      <BButton @click="count++">+</BButton>
    </BTooltip>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const count = ref(0)
</script>
```

## Triggers [​](#triggers)

By default, tooltips are shown by `pointerenter` and `focus` events and closed by `pointerleave` and `blur` events on the `target` element. To override this behavior and make the tooltip show and hide based on `click` events, set the `click` prop to `true`.

Default Trigger

Default Trigger

Click Trigger

Click Trigger

HTML StackBlitz

template

```
<div class="d-flex gap-2">
  <BTooltip
    placement="top"
    body="Default Trigger"
  >
    <template #target>
      <BButton> Default Trigger </BButton>
    </template>
  </BTooltip>
  <BTooltip
    click
    placement="top"
    body="Click Trigger"
  >
    <template #target>
      <BButton> Click Trigger </BButton>
    </template>
  </BTooltip>
</div>
```

To take finer control of tooltip visibility, you can use the [useToggle](/bootstrap-vue-next/docs/composables/useToggle.html) or [usePopover](/bootstrap-vue-next/docs/composables/usePopover.html). Alternately, you can set the `manual` prop and use the [`v-model`](#programmatic-control-via-v-model) or [exposed functions](#exposed-functions) to control visibility.

## Content [​](#content)

The content of a tooltip can be set via the `title` or `body` props, or the `title` or `default` slots.

NOTE

Unlike [popover content](/bootstrap-vue-next/docs/components/popover.html#content) which has a separate title and body, tooltips only have one location to place the content. The `title` prop and slot take precedence over the `body` and `default` slot, and the slots (as always) take precedence over the props.

Using property

Tooltip Title via Property

Using slot

Embedding content using slots affords you _greater **control.**_ and HTML support.

HTML StackBlitz

template

```
<div class="d-flex gap-2">
  <BTooltip title="Tooltip Title via Property">
    <template #target>
      <BButton variant="primary">Using property</BButton>
    </template>
  </BTooltip>
  <BTooltip>
    <template #target>
      <BButton variant="primary">Using slot</BButton>
    </template>
    Embedding content <span class="text-danger">using slots</span> affords you
    <em>greater <strong>control.</strong></em> and HTML support.
  </BTooltip>
</div>
```

## Custom Classes and Variants [​](#custom-classes-and-variants)

Custom classes can be applied to the tooltip using the `title-class` prop or `body-class` prop (depending on which prop or slot you use to populate the tooltip):

template

```
<div class="d-flex gap-2">
  <BTooltip body-class="my-tooltip-body-class">
    <template #target>
      <BButton
        href="#tooltip-custom-class"
        tabindex="0"
        >Button</BButton
      >
    </template>
    My tooltip
  </BTooltip>
  <BTooltip
    title="My tooltip"
    title-class="my-tooltip-title-class"
  >
    <template #target>
      <BButton
        href="#tooltip-custom-class"
        tabindex="1"
        >Button</BButton
      >
    </template>
  </BTooltip>
</div>
```

Similarly, use [Bootstrap's Color and background](https://getbootstrap.com/docs/5.3/helpers/color-background/) utilities to change the variant of the tooltip.

Button

Danger variant tooltip

HTML StackBlitz

template

```
<BTooltip
  title-class="text-bg-danger"
  title="Danger variant tooltip"
>
  <template #target>
    <BButton>Button</BButton>
  </template>
</BTooltip>
```

`body-class` and `title-class` are reactive and can be changed while the tooltip is open.

Refer to the [tooltip directive](/bootstrap-vue-next/docs/directives/BTooltip.html) docs on applying custom classes to the directive version.

For finer control, use the bootstrap 5 css variables to apply styles directly.

Button

This is **important**

HTML StackBlitz

template

```
<BTooltip
  style="--bs-tooltip-color: var(--bs-body-color); --bs-tooltip-bg: var(--bs-danger-bg-subtle)"
>
  <template #target>
    <BButton>Button</BButton>
  </template>
  This is <strong>important</strong>
</BTooltip>
```

## Programmatic control via v-model [​](#programmatic-control-via-v-model)

You can manually control the visibility of a tooltip via the v-model. Setting it to true will show the tooltip, while setting it to false will hide the tooltip.

Tooltip is hidden

Toggle Tooltip

Hello **World!**

HTML StackBlitz

vue

```
<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <p>Tooltip is {{ model ? 'visible' : 'hidden' }}</p>
    </div>

    <div class="p-2">
      <BTooltip
        v-model="model"
        placement="right"
      >
        <template #target>
          <BButton
            class="mx-2"
            @click="model = !model"
            >Toggle Tooltip</BButton
          >
        </template>
        Hello <strong>World!</strong>
      </BTooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const model = ref(false)
</script>
```

To make the tooltip show on initial render, simply add prop `show` to `<BTooltip>`:

Button

I start **open**

HTML StackBlitz

template

```
<template>
  <div class="text-center">
    <BTooltip show>
      <template #target>
        <BButton variant="primary">Button</BButton>
      </template>
      I start <strong>open</strong>
    </BTooltip>
  </div>
</template>
```

Tooltips can also be controlled via [Exposed functions](#exposed-functions).

## Close on Hide [​](#close-on-hide)

The `close-on-hide` prop can be used to have the tooltip automatically close when the target is scrolled out of view. The `boundary` and `boundary-padding` props can be used to control what's considered clipping.

Click me. Tooltip closes when clipped

Scroll me out of view

This tooltip gets hidden by the top nav

Scroll me out of view

HTML StackBlitz

vue

```
<template>
  <div class="d-flex gap-2">
    <BTooltip
      :click="true"
      :close-on-hide="true"
      :delay="{show: 0, hide: 0}"
    >
      <template #target>
        <BButton>Click me. Tooltip closes when clipped</BButton>
      </template>
      Scroll me out of view
    </BTooltip>
    <BTooltip
      :click="true"
      :close-on-hide="true"
      :delay="{show: 0, hide: 0}"
      :boundary-padding="{top: navHeight}"
    >
      <template #title>Scroll me out of view</template>
      <template #target>
        <BButton>This tooltip gets hidden by the top nav</BButton>
      </template>
    </BTooltip>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'

const navRef = ref<Element | null>(null)
onMounted(() => {
  navRef.value = document.body.querySelector('#app > nav')
})
const navHeight = computed(() => navRef.value?.clientHeight)
</script>
```

## Exposed functions [​](#exposed-functions)

`BTooltip` exposes functions through template refs. See the [Component Reference Exposed section](#comp-reference-btooltip-exposed) for details.

I have a tooltip

ShowHideToggle

Tooltip

HTML StackBlitz

vue

```
<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <BButton
        id="tooltip-expose"
        variant="primary"
        >I have a tooltip</BButton
      >
    </div>

    <div class="p-2">
      <BButton
        class="mx-2"
        @click="show"
        >Show</BButton
      >
      <BButton
        class="mx-2"
        @click="hide"
        >Hide</BButton
      >
      <BButton
        class="mx-2"
        @click="toggle"
        >Toggle</BButton
      >

      <BTooltip
        ref="myTooltip"
        v-model="model"
        target="tooltip-expose"
        title="Tooltip"
      >
        Hello <strong>World!</strong>
      </BTooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {BTooltip} from 'bootstrap-vue-next/components/BTooltip'
const myTooltip = ref<InstanceType<typeof BTooltip> | null>(null)
const show = () => myTooltip.value?.show()
const hide = () => myTooltip.value?.hide()
const toggle = () => myTooltip.value?.toggle()
const model = ref(false)
</script>
```

## Accessibility [​](#accessibility)

For information on managing ARIA attributes for tooltip triggers, see the [ARIA Trigger Registration for Component Visibility](/bootstrap-vue-next/docs/reference/accessibility.html#aria-trigger-registration-for-component-visibility) section in the Accessibility reference.

## Component Reference

### `<BTooltip>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BTooltip/BTooltip.vue)

-   [<BTooltip> Properties](#comp-reference-btooltip-properties)
-   [<BTooltip> Events](#comp-reference-btooltip-events)
-   [<BTooltip> Slots](#comp-reference-btooltip-slots)
-   [<BTooltip> Exposed](#comp-reference-btooltip-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.tooltip, .popover`

##### [Properties](#comp-reference-btooltip-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| body | `string` | `undefined` | Text to place in the body of the tooltip |
| body-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the body |
| boundary | `Boundary | RootBoundary` | `'clippingAncestors'` | The boundary constraint of the tooltip: members of \`Boundary\` and \`RootBoundary\`. |
| boundary-padding | `Padding` | `undefined` | The tooltip will try and stay away from the edge of the boundary element by the number of pixels specified |
| click | `boolean` | `false` | show/hide the tooltip on click of the target element (default is hover/focus) |
| close-on-hide | `boolean` | `false` | When \`noAutoClose\` is set, this prop will close the tooltip when the target is hidden |
| delay | `number | { show: number; hide: number }` | `'() => {show: 100, hide: 300})'` | Value for the show and hide delay. Applies to both show and hide when specified as a number or string. Use object form to set show and hide delays individually |
| floating-middleware | `Middleware[]` | `undefined` | Directly set the floating-ui middleware behavior. See above for details. |
| focus | `boolean` | `undefined` | Enable/disable focus trigger. See \[Triggers\](#triggers) for details. |
| hide-margin | `number` | `0` | The margin to apply when hiding the tooltip on pointer leave (how far the pointer can move off the target before hiding the tooltip) |
| hover | `boolean` | `undefined` | Enable/disable hover trigger. See \[Triggers\](#triggers) for details. |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| initial-animation | `boolean` | `false` | When set, enables the initial animation on mount |
| inline | `boolean` | `false` | Improves positioning for inline reference elements that span over multiple lines (from floating-ui). |
| interactive | `boolean` | `false` | Whether the tooltip is interactive (can be hovered/focused without closing). |
| lazy | `boolean` | `false` | When set, the content will not be mounted until opened |
| manual | `boolean` | `false` | Disables all triggers. Use programmatic API to show/hide the tooltip |
| model-value | `boolean` | `false` | Controls the visibility of the component |
| no-animation | `boolean` | `false` | When set, disables the animation |
| no-auto-close | `boolean` | `false` | Disables automatic closing on click outside or scroll out of view. Overrides \`close-on-hide\` |
| no-fade | `boolean` | `false` | Alias for \`noAnimation\` |
| no-flip | `boolean` | `false` | Disables the automatic flipping of the tooltip when it goes out of view. |
| no-hide | `boolean` | `false` | Overrides the default behavior of hiding the tooltip based on boundary & rootBoundary. |
| no-shift | `boolean` | `false` | Disables the automatic shifting of the tooltip to keep it in view. |
| no-size | `boolean` | `false` | Disables the automatic sizing of the tooltip to fit the clipping region. |
| noninteractive | `boolean` | `false` | Make tooltip noninteractive. Interactive tooltip can be hovered/focused without it closing. |
| offset | `Numberish | null` | `null` | Offset of the tooltip, how many pixels away from the target the tooltip is. If null it's translated to the size of the arrow in bootstrap css. |
| placement | `PopoverPlacement` | `'top'` | Placement of a floating element |
| realtime | `boolean` | `false` | Whether to update the position of the floating element on every animation frame if required. Very cpu intensive, the default is to listen to browser events. |
| reference | `string | ComponentPublicInstance | HTMLElement | null` | `null` | The reference element to which the tooltip is anchored. If not specified, the tooltip will be positioned relative to the target element. |
| show | `boolean` | `false` | When set, and prop 'visible' is false on mount, will animate from closed to open on initial mount. Mainly to help with template show. Use model-value for reactive show/hide |
| strategy | `Strategy` | `'absolute'` |  |
| target | `string | ComponentPublicInstance | HTMLElement | null` | `null` | The trigger element to invoke the tooltip as well as the reference element to which the tooltip is anchored, unless \`reference\` is defined. |
| teleport-disabled | `boolean` | `false` | Renders the tooltip in the exact place it was defined |
| teleport-to | `string | RendererElement | null | undefined` | `undefined` | Overrides the default teleport location |
| title | `string` | `undefined` | Text content to place in the title |
| title-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the title |
| tooltip | `boolean` | `false` | The tooltip is rendered as a tooltip (used internally by BTooltip) |
| trans-props | `TransitionProps` | `undefined` | Transition properties |
| unmount-lazy | `boolean` | `false` | When set and \`lazy\` is true, the content will be unmounted when closed |
| visible | `boolean` | `false` | When 'true', open without animation |

##### [Events](#comp-reference-btooltip-events)

| Event | Args | Description |
| --- | --- | --- |
| blur | 
`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the target element loses focus. |
| click | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the tooltip is hidden by a click on the trigger element. |
| click-outside | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the mouse is clicked outside the tooltip. |
| close-on-hide | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the tooltip is closed due to being clipped. |
| hidden | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Always emits after the component is hidden |
| hide | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Always emits just before the component has hidden. Cancelable (as long as component wasn't forcibly hidden) |
| hide-prevented | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the component tried to close, but was prevented from closing. This occurs when preventDefault() is called on the event, the user clicks escape and no-close-onbackdrop is set to true, or the user clicks on the backdrop and no-close-onbackdrop is set to true. |
| pointerleave | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the pointer leaves the target element, but not when leaving the popover element. |
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

 | Always emits just before the component is toggled via the exposed 'toggle()' function or useToggle composable . Cancelable (as long as component wasn't forcibly hidden) |
| toggle-prevented | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the component tried to toggle, but was prevented from doing so. This occurs when preventDefault() is called on the event, the user clicks escape and no-close-onbackdrop is set to true, or the user clicks on the backdrop and no-close-onbackdrop is set to true. |
| update:model-value | 

`value``: boolean` - New visibility state of the tooltip.

 | Emitted when the visibility of the tooltip changes. |

##### [Slots](#comp-reference-btooltip-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default | 
`id``: string` - Unique ID for the component

`show``: () => void` - Function to show the component

`hide``: (trigger?: string, noTriggerEmit?: boolean) => void` - Function to hide the component. \`trigger\` is the trigger that caused the hide. \`noTriggerEmit\` prevents the emit of the trigger event.

`toggle``: () => void` - Function to toggle the component visibility

`active``: boolean` - Indicates if the component is active (starting show, before/after animations)

`visible``: boolean` - Indicates if the component is visible (shown)

 | Content for the tooltip body. |
| target | 

`id``: string` - Unique ID for the component

`show``: () => void` - Function to show the component

`hide``: (trigger?: string, noTriggerEmit?: boolean) => void` - Function to hide the component. \`trigger\` is the trigger that caused the hide. \`noTriggerEmit\` prevents the emit of the trigger event.

`toggle``: () => void` - Function to toggle the component visibility

`active``: boolean` - Indicates if the component is active (starting show, before/after animations)

`visible``: boolean` - Indicates if the component is visible (shown)

 | Content for the target or trigger element. |
| title | 

`id``: string` - Unique ID for the component

`show``: () => void` - Function to show the component

`hide``: (trigger?: string, noTriggerEmit?: boolean) => void` - Function to hide the component. \`trigger\` is the trigger that caused the hide. \`noTriggerEmit\` prevents the emit of the trigger event.

`toggle``: () => void` - Function to toggle the component visibility

`active``: boolean` - Indicates if the component is active (starting show, before/after animations)

`visible``: boolean` - Indicates if the component is visible (shown)

 | Content for the tooltip title. |

##### [Exposed](#comp-reference-btooltip-exposed)

| Name | Type | Description |
| --- | --- | --- |
| hide | `() => void` | Hides the tooltip |
| show | `() => void` | Shows the tooltip |
| toggle | `() => void` | Toggles the visibility of the tooltip |
