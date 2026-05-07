# BTooltip ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/directives/BTooltip.html

##### On this page

-   [Overview ​](#overview)
    
-   [Directive Syntax ​](#directive-syntax)
    
-   [Trigger Modifiers ​](#trigger-modifiers)
    -   [Default Behavior ​](#default-behavior)
        
    -   [Multiple Triggers ​](#multiple-triggers)
        
    -   [Manual Control ​](#manual-control)
        
-   [Placement Modifiers ​](#placement-modifiers)
    
-   [Value ​](#value)
    -   [String Values ​](#string-values)
        
    -   [Object Values ​](#object-values)
        
-   [Title Attribute ​](#title-attribute)
    
-   [Delay ​](#delay)
    
-   [Advanced Modifiers ​](#advanced-modifiers)
    -   [Positioning Modifiers ​](#positioning-modifiers)
        
    -   [Rendering Modifiers ​](#rendering-modifiers)
        
    -   [Combined Example ​](#combined-example)
        
-   [Common Pitfalls ​](#common-pitfalls)
    -   [Using Components with Title Prop ​](#using-components-with-title-prop)
        
    -   [Using with Plain HTML ​](#using-with-plain-html)
        
-   [Comparison with Component ​](#comparison-with-component)
    
-   [Accessibility ​](#accessibility)
    -   [Focus Trigger on Buttons ​](#focus-trigger-on-buttons)
        
    -   [Keyboard Users ​](#keyboard-users)
        

# BTooltip [​](#btooltip)

Add tooltips to any element using the v-b-tooltip directive. Tooltips can be triggered by hovering, focusing, or clicking an element

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/directives/BTooltip/index.ts) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/directives/BTooltip.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#tooltip)

> The `v-b-tooltip` directive makes it easy to add tooltips to elements. Tooltips provide helpful hints and can be triggered by various user interactions.

Hover me

Tooltip on top

HTML StackBlitz

template

```
<BButton
  v-b-tooltip="'Tooltip on top'"
  variant="primary"
>
  Hover me
</BButton>
```

## Overview [​](#overview)

Things to know when using the tooltip directive:

-   Tooltips rely on [floating-ui](https://floating-ui.com/) for positioning
-   Triggering tooltips on hidden elements will not work
-   Tooltips for `disabled` elements must be triggered on a wrapper element
-   When triggered from hyperlinks that span multiple lines, tooltips will be centered. Use the `inline` modifier to improve positioning
-   Tooltips are lightweight and ideal for short text hints (for longer content, consider using [popover](/bootstrap-vue-next/docs/directives/BPopover.html))

## Directive Syntax [​](#directive-syntax)

As shown above, the BootstrapVueNext directive `v-b-tooltip` can have a value and optionally one or more modifiers. The general format for directives is:

template

```
v-{name}.{modifier1}.{modifier2}.{etc}={value}
```

For example:

template

```
<BButton v-b-tooltip.hover.top="'Tooltip content'">
  Button
</BButton>
```

## Trigger Modifiers [​](#trigger-modifiers)

You can define when to trigger a tooltip with the following modifiers:

-   `.click` - Toggle tooltip on click
-   `.hover` - Show tooltip on hover (mouseenter/mouseleave)
-   `.focus` - Show tooltip on focus/blur
-   `.manual` - Disable automatic triggers (control via `.show` modifier)

If you do not specify any trigger modifiers, the tooltip is enabled by default for **both hover and focus** events.

Click me

Click to toggle

Hover me

Hover to show

Focus me

Focus to show

HTML StackBlitz

template

```
<div class="d-flex gap-2 flex-wrap">
  <BButton
    v-b-tooltip.click="'Click to toggle'"
    variant="primary"
  >
    Click me
  </BButton>
  <BButton
    v-b-tooltip.hover="'Hover to show'"
    variant="secondary"
  >
    Hover me
  </BButton>
  <BButton
    v-b-tooltip.focus="'Focus to show'"
    variant="success"
  >
    Focus me
  </BButton>
</div>
```

### Default Behavior [​](#default-behavior)

Default triggers

Default: hover and focus

HTML StackBlitz

template

```
<BButton
  v-b-tooltip="'Default: hover and focus'"
  variant="primary"
>
  Default triggers
</BButton>
```

### Multiple Triggers [​](#multiple-triggers)

You can combine multiple trigger modifiers:

Hover or focus me

Shows on hover or focus

HTML StackBlitz

template

```
<BButton
  v-b-tooltip.hover.focus="'Shows on hover or focus'"
  variant="primary"
>
  Hover or focus me
</BButton>
```

### Manual Control [​](#manual-control)

Use `.manual` combined with `modelValue` to control visibility:

Show tooltip

Manually controlled tooltip

HTML StackBlitz

vue

```
<template>
  <div class="d-flex gap-2">
    <BButton
      v-b-tooltip.manual="{
        modelValue: tooltipVisible,
        title: 'Manually controlled tooltip',
      }"
      variant="primary"
      @click="tooltipVisible = !tooltipVisible"
    >
      {{ tooltipVisible ? 'Hide' : 'Show' }} tooltip
    </BButton>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const tooltipVisible = ref(false)
</script>
```

## Placement Modifiers [​](#placement-modifiers)

Specify where to place the tooltip with the following modifiers:

-   `.top` - Above the element
-   `.bottom` - Below the element
-   `.left` - To the left of the element
-   `.right` - To the right of the element

If you do not define a placement modifier, the default placement is **top**.

Top

Tooltip on top

Bottom

Tooltip on bottom

Left

Tooltip on left

Right

Tooltip on right

HTML StackBlitz

template

```
<div class="d-flex gap-2 flex-wrap justify-content-center">
  <BButton
    v-b-tooltip.top="'Tooltip on top'"
    variant="primary"
  >
    Top
  </BButton>
  <BButton
    v-b-tooltip.bottom="'Tooltip on bottom'"
    variant="secondary"
  >
    Bottom
  </BButton>
  <BButton
    v-b-tooltip.left="'Tooltip on left'"
    variant="success"
  >
    Left
  </BButton>
  <BButton
    v-b-tooltip.right="'Tooltip on right'"
    variant="danger"
  >
    Right
  </BButton>
</div>
```

## Value [​](#value)

The tooltip content and configuration is specified in the directive value. The value can be:

-   A **string** - used as the tooltip text content
-   An **object** - for advanced configuration
-   A **reactive variable** - dynamically updated content

### String Values [​](#string-values)

For simple text content, use a string literal (remember to use quotes):

String value

Simple text tooltip

Reactive content

Dynamic tooltip content

HTML StackBlitz

vue

```
<template>
  <div class="d-flex gap-2 flex-wrap">
    <!-- #region simple -->
    <BButton v-b-tooltip="'Simple text tooltip'"> String value </BButton>
    <!-- #endregion simple -->

    <!-- #region reactive -->
    <BButton v-b-tooltip="tooltipText"> Reactive content </BButton>
    <!-- #endregion reactive -->
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const tooltipText = ref('Dynamic tooltip content')
</script>
```

Important

What is inside the quotes (`""`) is interpreted as JavaScript, not as a string literal. To display literal text like "My tooltip", you must use an extra pair of quotes:

template

```
<!-- ❌ Wrong: missing inner quotes -->
<!-- eslint-disable-next-line vue/no-parsing-error -->
<BButton v-b-tooltip="My tooltip">Button</BButton>

<!-- ✅ Correct: string literal with quotes -->
<BButton v-b-tooltip="'My tooltip'">Button</BButton>
```

### Object Values [​](#object-values)

For advanced configuration, pass an object:

Object configuration

Tooltip title

HTML StackBlitz

template

```
<BButton
  v-b-tooltip.hover.top="{
    title: 'Tooltip title',
    delay: {show: 500, hide: 100},
  }"
  variant="primary"
>
  Object configuration
</BButton>
```

The directive accepts any property from `BTooltipProps` (which extends `BPopoverProps`). Common properties include:

-   `title` - The tooltip text content
-   `body` - Alternative content (used if `title` not provided)
-   `delay` - Show/hide delay in milliseconds or `{show: number, hide: number}`
-   `bodyClass` - Custom class for the tooltip body
-   `titleClass` - Custom class for the tooltip title
-   `placement` - Position: `'auto'` | `'auto-start'` | `'auto-end'` | `'top'` | `'top-start'` | `'top-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'` | `'left'` | `'left-start'` | `'left-end'` | `'right'` | `'right-start'` | `'right-end'`
-   `interactive` - Allow hovering over the tooltip (default: `false`)

See the [BTooltip component reference](/bootstrap-vue-next/docs/components/tooltip.html#comp-reference-btooltip-props) for all available properties.

Type Definition

The directive value accepts the TypeScript interface [`BTooltipProps`](https://github.com/bootstrap-vue-next/bootstrap-vue-next/blob/main/packages/bootstrap-vue-next/src/types/ComponentProps.ts), which is exported from `bootstrap-vue-next` for use in your code:

typescript

```
import type {BTooltipProps} from 'bootstrap-vue-next'
```

Rendering Behavior

**Tooltips display either `title` OR `body`, never both:**

-   If `title` is provided → renders with `titleClass` applied
-   If only `body` is provided → renders with `bodyClass` applied
-   Both `title` and `body` → only `title` is rendered

This differs from popovers, which can display both title and body content simultaneously.

## Title Attribute [​](#title-attribute)

When the directive value doesn't include a `title`, the tooltip will use the element's `title` attribute if present:

Hover me

Tooltip from title attribute

HTML StackBlitz

template

```
<BButton
  v-b-tooltip.hover.top
  title="Tooltip from title attribute"
  variant="primary"
>
  Hover me
</BButton>
```

Note

When using the `title` attribute, the directive automatically removes it from the element and stores it as `data-original-title` to prevent the browser's native tooltip from showing.

## Delay [​](#delay)

Control the delay for showing and hiding tooltips using the `delay` option:

Delayed show

Appears after 500ms

Instant

No delay

HTML StackBlitz

template

```
<div class="d-flex gap-2 flex-wrap">
  <BButton
    v-b-tooltip.hover.top="{
      title: 'Appears after 500ms',
      delay: {show: 500, hide: 100},
    }"
    variant="primary"
  >
    Delayed show
  </BButton>

  <BButton
    v-b-tooltip.hover.top="{
      title: 'No delay',
      delay: 0,
    }"
    variant="secondary"
  >
    Instant
  </BButton>
</div>
```

The default delay is `0` milliseconds (immediate show/hide).

## Advanced Modifiers [​](#advanced-modifiers)

### Positioning Modifiers [​](#positioning-modifiers)

-   `.body` - Append tooltip to `<body>` instead of next to the element
-   `.child` - Append tooltip as a child of the element
-   `.inline` - Use inline positioning for better alignment with multi-line text

### Rendering Modifiers [​](#rendering-modifiers)

-   `.lazy` - Defer rendering until first shown (improves initial performance)
-   `.realtime` - Update position in real-time (useful for scrolling scenarios)

### Combined Example [​](#combined-example)

Combined modifiers

HTML StackBlitz

template

```
<BButton
  v-b-tooltip.hover.focus.top.body.lazy="{
    title: 'Advanced tooltip',
    delay: {show: 300, hide: 150},
  }"
  variant="primary"
>
  Combined modifiers
</BButton>
```

## Common Pitfalls [​](#common-pitfalls)

### Using Components with Title Prop [​](#using-components-with-title-prop)

When using the directive on components that have a `title` prop (like `BCard`), you must provide the tooltip content via the directive value, not the `title` prop:

template

```
<!-- ❌ Wrong: title prop goes to child element -->
<BCard
  v-b-tooltip.hover.top
  title="My tooltip"
  >Card</BCard
>

<!-- ✅ Correct: use directive value -->
<BCard v-b-tooltip.hover.top="'My tooltip'">Card</BCard>
```

This is because the component's `title` prop is applied to a child element, while the directive is attached to the root element.

### Using with Plain HTML [​](#using-with-plain-html)

The directive works best with plain HTML elements when using the `title` attribute:

template

```
<!-- ✅ Correct: plain HTML with title attribute -->
<div
  v-b-tooltip.hover.top
  title="My tooltip"
>
  Content
</div>
```

## Comparison with Component [​](#comparison-with-component)

The `v-b-tooltip` directive is ideal for simple tooltips with basic content. For more complex scenarios, consider using the [`<BTooltip>` component](/bootstrap-vue-next/docs/components/tooltip.html):

| Feature | Directive | Component |
| --- | --- | --- |
| Simple text content | ✅ Ideal | ✅ Supported |
| Reactive content | ✅ Good | ✅ Excellent |
| HTML/Vue components in content | ❌ Limited | ✅ Full support (via slots) |
| Programmatic control | ⚠️ Via modifiers | ✅ Full API |
| Interactive content | ❌ Not recommended | ✅ Designed for it |

For tooltips with interactive elements or complex layouts, use the component version.

## Accessibility [​](#accessibility)

### Focus Trigger on Buttons [​](#focus-trigger-on-buttons)

For proper cross-browser behavior when using only the `.focus` trigger, use an element that renders an `<a>` tag with `tabindex="0"`:

template

```
<BLink
  v-b-tooltip.focus="'Focus tooltip'"
  href="#"
>
  Focusable link
</BLink>
```

### Keyboard Users [​](#keyboard-users)

-   Only add tooltips to keyboard-focusable elements (links, buttons, form controls)
-   Avoid using `.hover` as the only trigger - keyboard users cannot trigger hover events
-   For interactive content, use the `<BTooltip>` component instead
