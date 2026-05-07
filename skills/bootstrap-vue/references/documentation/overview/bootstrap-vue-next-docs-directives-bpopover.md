# BPopover ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/directives/BPopover.html

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
        

# BPopover [​](#bpopover)

Add popovers to any element using the v-b-popover directive. Popovers can be triggered by hovering, focusing, or clicking an element

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/directives/BPopover/index.ts) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/directives/BPopover.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#popover)

> The `v-b-popover` directive makes it easy to add popovers to elements. Popovers provide contextual information and can be triggered by various user interactions.

Hover Me

Popover Title

I am popover directive content!

Object Syntax

Object Syntax

Using object notation

Top Hover

Top placement with hover trigger

Click Right

Click me

Right side popover

HTML StackBlitz

template

```
<div class="d-flex gap-2 flex-wrap">
  <BButton
    v-b-popover="'I am popover directive content!'"
    title="Popover Title"
  >
    Hover Me
  </BButton>
  <BButton v-b-popover="{title: 'Object Syntax', body: 'Using object notation'}">
    Object Syntax
  </BButton>
  <BButton v-b-popover.hover.top="'Top placement with hover trigger'"> Top Hover </BButton>
  <BButton v-b-popover.click.right="{title: 'Click me', body: 'Right side popover'}">
    Click Right
  </BButton>
</div>
```

## Overview [​](#overview)

The `v-b-popover` directive makes it easy to add popovers to elements. Popovers provide contextual information and can be triggered by various user interactions.

Things to know when using the popover directive:

-   Popovers rely on [floating-ui](https://floating-ui.com/) for positioning
-   Triggering popovers on hidden elements will not work
-   Popovers for `disabled` elements must be triggered on a wrapper element
-   When triggered from hyperlinks that span multiple lines, popovers will be centered. Use the `inline` modifier to improve positioning

## Directive Syntax [​](#directive-syntax)

As shown above, the BootstrapVueNext directive `v-b-popover` can have a value and optionally one or more modifiers. The general format for directives is:

template

```
v-{name}.{modifier1}.{modifier2}.{etc}={value}
```

For example:

template

```
<BButton v-b-popover.hover.top="'My popover content'" />
<BButton v-b-popover.click.right="{title: 'Title', body: 'Content'}" />
```

## Trigger Modifiers [​](#trigger-modifiers)

You can define when to trigger a popover with the following modifiers:

-   `.click` - Toggle popover on click
-   `.hover` - Show popover on hover (mouseenter/mouseleave)
-   `.focus` - Show popover on focus/blur
-   `.manual` - Disable automatic triggers (control via `.show` modifier)

If you do not specify any trigger modifiers, the popover is enabled by default for **both hover and focus** events.

Click

Click Trigger

Click to toggle popover

Hover

Hover Trigger

Hover to show popover

Focus

Focus Trigger

Focus to show popover

Manual (shown)

Manual

Always visible (manual + show)

HTML StackBlitz

template

```
<div class="d-flex gap-2 flex-wrap">
  <BButton
    v-b-popover.click="'Click to toggle popover'"
    title="Click Trigger"
  >
    Click
  </BButton>
  <BButton
    v-b-popover.hover="'Hover to show popover'"
    title="Hover Trigger"
  >
    Hover
  </BButton>
  <BButton
    v-b-popover.focus="'Focus to show popover'"
    title="Focus Trigger"
  >
    Focus
  </BButton>
  <BButton
    v-b-popover.manual.show="'Always visible (manual + show)'"
    title="Manual"
  >
    Manual (shown)
  </BButton>
</div>
```

### Default Behavior [​](#default-behavior)

Button

Title

Content

HTML StackBlitz

template

```
<!-- Default: hover + focus triggers -->
<BButton
  v-b-popover="'Content'"
  title="Title"
  >Button</BButton
>
```

### Multiple Triggers [​](#multiple-triggers)

You can combine multiple trigger modifiers:

Button

Content

HTML StackBlitz

template

```
<!-- Both click and hover -->
<BButton v-b-popover.click.hover="'Content'">Button</BButton>
```

### Manual Control [​](#manual-control)

Use `.manual` combined with `modelValue` to control visibility:

Show popover

Manual Popover

Click the button to toggle

HTML StackBlitz

template

```
<BButton
  v-b-popover.manual="{
    modelValue: popoverVisible,
    title: 'Manual Popover',
    body: 'Click the button to toggle',
  }"
  variant="primary"
  @click="popoverVisible = !popoverVisible"
>
  {{ popoverVisible ? 'Hide' : 'Show' }} popover
</BButton>
```

## Placement Modifiers [​](#placement-modifiers)

Specify where to place the popover with the following modifiers:

-   `.top` - Above the element
-   `.bottom` - Below the element
-   `.left` - To the left of the element
-   `.right` - To the right of the element

If you do not define a placement modifier, the default placement is **top**.

Top

Top

Popover on top

Bottom

Bottom

Popover on bottom

Left

Left

Popover on left

Right

Right

Popover on right

HTML StackBlitz

template

```
<div class="d-flex gap-2 flex-wrap justify-content-center">
  <BButton
    v-b-popover.hover.top="'Popover on top'"
    title="Top"
  >
    Top
  </BButton>
  <BButton
    v-b-popover.hover.bottom="'Popover on bottom'"
    title="Bottom"
  >
    Bottom
  </BButton>
  <BButton
    v-b-popover.hover.left="'Popover on left'"
    title="Left"
  >
    Left
  </BButton>
  <BButton
    v-b-popover.hover.right="'Popover on right'"
    title="Right"
  >
    Right
  </BButton>
</div>
```

## Value [​](#value)

The popover content and configuration is specified in the directive value. The value can be:

-   A **string** - used as the popover body content
-   An **object** - for advanced configuration
-   A **reactive variable** - dynamically updated content

### String Values [​](#string-values)

For simple text content, use a string literal (remember to use quotes):

String Value

String Value

Simple string content

Reactive Value: John Doe

Reactive Variable

John Doe

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <div class="d-flex gap-2 flex-wrap">
    <BButton
      v-b-popover="'Simple string content'"
      title="String Value"
    >
      String Value
    </BButton>
    <BButton
      v-b-popover="userName"
      title="Reactive Variable"
    >
      Reactive Value: {{ userName }}
    </BButton>

    <BFormInput
      v-model="userName"
      placeholder="Change name"
      class="mt-2"
    />
  </div>
  <!-- #endregion template -->
</template>

<script setup lang="ts">
import {ref} from 'vue'

const userName = ref('John Doe')
</script>
```

Important

What is inside the quotes (`""`) is interpreted as JavaScript, not as a string literal. To display literal text like "My title", you must use an extra pair of quotes:

template

```
<!-- Correct -->
<BButton v-b-popover="'My title'">Button</BButton>

<!-- Incorrect - tries to reference variable myTitle -->
<BButton v-b-popover="myTitle">Button</BButton>
```

### Object Values [​](#object-values)

For advanced configuration, pass an object:

Object Configuration

Advanced Configuration

With custom delay and placement

Object + Modifier

Click Trigger

This uses click trigger via object

HTML StackBlitz

template

```
<div class="d-flex gap-2 flex-wrap">
  <BButton
    v-b-popover="{
      title: 'Advanced Configuration',
      body: 'With custom delay and placement',
      delay: {show: 500, hide: 100},
      placement: 'bottom',
    }"
  >
    Object Configuration
  </BButton>
  <BButton
    v-b-popover.click="{
      title: 'Click Trigger',
      body: 'This uses click trigger via object',
    }"
  >
    Object + Modifier
  </BButton>
</div>
```

The directive accepts any property from `BPopoverProps`. Common properties include:

-   `title` - The popover header text
-   `body` - The popover body content
-   `delay` - Show/hide delay in milliseconds or `{show: number, hide: number}`
-   `bodyClass` - Custom class for the popover body
-   `titleClass` - Custom class for the popover title
-   `placement` - Position: `'auto'` | `'auto-start'` | `'auto-end'` | `'top'` | `'top-start'` | `'top-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'` | `'left'` | `'left-start'` | `'left-end'` | `'right'` | `'right-start'` | `'right-end'`
-   `click` - Enable click trigger
-   `hover` - Enable hover trigger
-   `focus` - Enable focus trigger
-   `manual` - Disable automatic triggers

See the [BPopover component reference](/bootstrap-vue-next/docs/components/popover.html#comp-reference-bpopover-props) for all available properties.

Type Definition

The directive value accepts the TypeScript interface [`BPopoverProps`](https://github.com/bootstrap-vue-next/bootstrap-vue-next/blob/main/packages/bootstrap-vue-next/src/types/ComponentProps.ts), which is exported from `bootstrap-vue-next` for use in your code:

typescript

```
import type {BPopoverProps} from 'bootstrap-vue-next'
```

Rendering Behavior

**Popovers can display both `title` AND `body` simultaneously:**

-   `title` → renders in header with `titleClass` applied
-   `body` → renders in body with `bodyClass` applied
-   Both provided → displays header + body (like a card)

This differs from tooltips, which only display either title or body, never both.

## Title Attribute [​](#title-attribute)

When the directive value doesn't include a `title`, the popover will use the element's `title` attribute if present:

Using title attribute

Title from attribute

Using directive value

Explicit body text

Title + Body

Custom Title

Custom body

HTML StackBlitz

template

```
<div class="d-flex gap-2 flex-wrap">
  <!-- Correct: div element with title attribute -->
  <div
    v-b-popover.hover.top
    title="Title from attribute"
    class="btn btn-primary"
  >
    Using title attribute
  </div>

  <!-- Correct: Explicit body in directive value -->
  <BButton v-b-popover.hover.top="'Explicit body text'"> Using directive value </BButton>

  <!-- Both title and body -->
  <BButton
    v-b-popover.hover.top="{title: 'Custom Title', body: 'Custom body'}"
    title="This will be overridden"
  >
    Title + Body
  </BButton>
</div>
```

Note

When using the `title` attribute, the directive automatically removes it from the element and stores it as `data-original-title` to prevent the browser's native tooltip from showing.

## Delay [​](#delay)

Control the delay for showing and hiding popovers using the `delay` option:

No Delay

Default delay

300ms Delay

300ms delay

Custom Delays

Custom show/hide delays

HTML StackBlitz

template

```
<div class="d-flex gap-2 flex-wrap">
  <BButton v-b-popover.hover="{body: 'Default delay', delay: 0}"> No Delay </BButton>
  <BButton v-b-popover.hover="{body: '300ms delay', delay: 300}"> 300ms Delay </BButton>
  <BButton
    v-b-popover.hover="{
      body: 'Custom show/hide delays',
      delay: {show: 500, hide: 100},
    }"
  >
    Custom Delays
  </BButton>
</div>
```

The default delay is `{show: 100, hide: 300}` milliseconds.

## Advanced Modifiers [​](#advanced-modifiers)

### Positioning Modifiers [​](#positioning-modifiers)

-   `.body` - Append popover to `<body>` instead of next to the element
-   `.child` - Append popover as a child of the element
-   `.inline` - Use inline positioning for better alignment with multi-line text

### Rendering Modifiers [​](#rendering-modifiers)

-   `.lazy` - Defer rendering until first shown (improves initial performance)
-   `.realtime` - Update position in real-time (useful for scrolling scenarios)

### Combined Example [​](#combined-example)

Body + Top Child + Bottom

Appended as child element

Inline + Hover + Right

Inline positioning with hover

Lazy + Click

HTML StackBlitz

template

```
<div class="d-flex gap-2 flex-wrap">
  <BButton v-b-popover.body.top="'Appended to body, placed at top'"> Body + Top </BButton>
  <BButton v-b-popover.child.bottom="'Appended as child element'"> Child + Bottom </BButton>
  <BButton v-b-popover.inline.hover.right="'Inline positioning with hover'">
    Inline + Hover + Right
  </BButton>
  <BButton v-b-popover.lazy.click="'Lazy rendering on first click'"> Lazy + Click </BButton>
</div>
```

## Common Pitfalls [​](#common-pitfalls)

### Using Components with Title Prop [​](#using-components-with-title-prop)

When using the directive on components that have a `title` prop (like `BCard`), you must provide the popover content via the directive value, not the `title` prop:

template

```
<!-- ❌ Incorrect - title prop goes to BCard, not the popover -->
<BCard v-b-popover.hover.top title="my title" />

<!-- ✅ Correct - provide title in directive value -->
<BCard v-b-popover.hover.top="{title: 'Popover', body: 'Content'}" />
```

This is because the component's `title` prop is applied to a child element, while the directive is attached to the root element.

### Using with Plain HTML [​](#using-with-plain-html)

The directive works best with plain HTML elements when using the `title` attribute:

template

```
<!-- ✅ Works well -->
<button v-b-popover.hover.top title="my title">
  Click me
</button>

<!-- ✅ Also works with directive value -->
<div v-b-popover.hover.top="'Popover content'">Hover me</div>
```

## Comparison with Component [​](#comparison-with-component)

The `v-b-popover` directive is ideal for simple popovers with basic content. For more complex scenarios, consider using the [`<BPopover>` component](/bootstrap-vue-next/docs/components/popover.html):

| Feature | Directive | Component |
| --- | --- | --- |
| Simple text content | ✅ Ideal | ✅ Supported |
| Reactive content | ✅ Good | ✅ Excellent |
| HTML/Vue components in content | ❌ Limited | ✅ Full support (via slots) |
| Programmatic control | ⚠️ Via modifiers | ✅ Full API |
| Interactive content | ❌ Not recommended | ✅ Designed for it |

For popovers with forms, buttons, or complex layouts, use the component version.

## Accessibility [​](#accessibility)

### Focus Trigger on Buttons [​](#focus-trigger-on-buttons)

For proper cross-browser behavior when using only the `.focus` trigger, use an element that renders an `<a>` tag with `tabindex="0"`:

template

```
<BButton href="#" tabindex="0" v-b-popover.focus="'Content'">
  Link Button
</BButton>
```

### Keyboard Users [​](#keyboard-users)

-   Only add popovers to keyboard-focusable elements (links, buttons, form controls)
-   Avoid using `.hover` as the only trigger - keyboard users cannot trigger hover events
-   For interactive content, use the `<BPopover>` component instead
