# BToggle ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/directives/BToggle.html

##### On this page

-   [Overview ​](#overview)
    
-   [Target Specification ​](#target-specification)
    -   [Using Modifiers ​](#using-modifiers)
        
    -   [Using Directive Argument ​](#using-directive-argument)
        
    -   [Using Directive Value ​](#using-directive-value)
        
    -   [All Methods ​](#all-methods)
        
-   [Multiple Targets ​](#multiple-targets)
    
-   [Using on Links ​](#using-on-links)
    
-   [Conditional CSS Classes ​](#conditional-css-classes)
    
-   [Preventing Toggle ​](#preventing-toggle)
    
-   [Compatible Components ​](#compatible-components)
    -   [BCollapse ​](#bcollapse)
        
    -   [BOffcanvas ​](#boffcanvas)
        
    -   [BModal ​](#bmodal)
        
-   [Comparison with Programmatic Control ​](#comparison-with-programmatic-control)
    
-   [Accessibility ​](#accessibility)
    -   [What the Directive Manages ​](#what-the-directive-manages)
        
    -   [What the Target Component Manages ​](#what-the-target-component-manages)
        
    -   [Best Practices ​](#best-practices)
        
    -   [Multiple Target Caveats ​](#multiple-target-caveats)
        
-   [See Also ​](#see-also)
    

# BToggle [​](#btoggle)

A light-weight directive for toggling visibility state for collapses, offcanvas, and modals by ID. It automatically sets the aria-controls attribute and registers the trigger with the target component, which then manages aria-expanded and visual state

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/directives/BToggle/index.ts) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/directives/BToggle.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#toggle)

> The `v-b-toggle` directive provides a simple, declarative way to toggle visibility of components like `BCollapse`, `BOffcanvas`, and `BModal`. The directive automatically handles accessibility and can target multiple components at once.

Toggle Collapse

This content can be toggled visible or hidden.

HTML StackBlitz

template

```
<div>
  <BButton
    v-b-toggle.collapse-overview
    variant="primary"
    >Toggle Collapse</BButton
  >
  <BCollapse
    id="collapse-overview"
    class="mt-3"
  >
    <BCard>
      <p class="card-text">This content can be toggled visible or hidden.</p>
    </BCard>
  </BCollapse>
</div>
```

## Overview [​](#overview)

Things to know when using the toggle directive:

-   The directive works with `BCollapse`, `BOffcanvas`, and `BModal` components
-   Target components are specified by their `id` attribute
-   Multiple targets can be toggled simultaneously
-   The directive automatically manages ARIA accessibility attributes
-   The trigger element receives `collapsed` and `not-collapsed` CSS classes based on target state
-   Disabled buttons will not trigger toggle events

## Target Specification [​](#target-specification)

The v-b-toggle directive offers flexible ways to specify target components:

### Using Modifiers [​](#using-modifiers)

The most common approach is using modifiers, where each modifier represents a target ID:

Toggle with Modifier

Toggled using `v-b-toggle.collapse-modifier`

HTML StackBlitz

template

```
<BButton
  v-b-toggle.collapse-modifier
  variant="primary"
>
  Toggle with Modifier
</BButton>

<BCollapse
  id="collapse-modifier"
  class="mt-3"
>
  <BCard>
    <p class="card-text">Toggled using <code>v-b-toggle.collapse-modifier</code></p>
  </BCard>
</BCollapse>
```

### Using Directive Argument [​](#using-directive-argument)

You can specify the target as a directive argument (supports Vue's dynamic arguments):

Toggle with Argument

Toggled using `v-b-toggle:collapse-argument`

HTML StackBlitz

template

```
<div>
  <BButton
    v-b-toggle:collapse-argument
    variant="primary"
    >Toggle with Argument</BButton
  >
  <BCollapse
    id="collapse-argument"
    class="mt-3"
  >
    <BCard>
      <p class="card-text">Toggled using <code>v-b-toggle:collapse-argument</code></p>
    </BCard>
  </BCollapse>
</div>
```

### Using Directive Value [​](#using-directive-value)

The directive value can be a string ID or an array of IDs:

Toggle with Value

Toggled using `v-b-toggle="'collapse-value'"`

HTML StackBlitz

template

```
<div>
  <BButton
    v-b-toggle="'collapse-value'"
    variant="primary"
    >Toggle with Value</BButton
  >
  <BCollapse
    id="collapse-value"
    class="mt-3"
  >
    <BCard>
      <p class="card-text">Toggled using <code>v-b-toggle="'collapse-value'"</code></p>
    </BCard>
  </BCollapse>
</div>
```

### All Methods [​](#all-methods)

Here are all the ways to specify targets:

template

```
<!-- Using modifiers (multiple targets allowed) -->
<BButton v-b-toggle.target-id>Toggle</BButton>
<BButton v-b-toggle.target-1.target-2>Toggle Multiple</BButton>
```

template

```
<!-- Using directive argument (supports Vue dynamic arguments) -->
<BButton v-b-toggle:target-id>Toggle</BButton>
<BButton v-b-toggle:[dynamicTarget]>Toggle</BButton>
```

template

```
<!-- Using directive value (string or array) -->
<BButton v-b-toggle="'target-id'">Toggle</BButton>
<BButton v-b-toggle="'target-1 target-2'">Toggle Multiple (space-separated)</BButton>
<BButton v-b-toggle="['target-1', 'target-2']">Toggle Multiple (array)</BButton>
```

template

```
<!-- Using href attribute on links -->
<BLink
  v-b-toggle
  href="#target-id"
  @click.prevent
  >Toggle</BLink
>
<a
  v-b-toggle
  href="#target-id"
  @click.prevent
  >Toggle</a
>
```

template

```
<!-- Combining multiple methods (all targets will be toggled) -->
<BButton v-b-toggle.target-1:target-2="['target-3', 'target-4']">Toggle 4 Targets</BButton>
```

## Multiple Targets [​](#multiple-targets)

Toggle multiple components simultaneously using any of these methods:

##### Using Modifiers

Toggle Both Collapses

##### Using Space-Separated String

Toggle Both Collapses

##### Using Array

Toggle Both Collapses

Collapse A

This is collapse A

Collapse B

This is collapse B

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <div>
    <h5>Using Modifiers</h5>
    <BButton
      v-b-toggle.collapse-a.collapse-b
      variant="primary"
      class="mb-2"
    >
      Toggle Both Collapses
    </BButton>

    <h5>Using Space-Separated String</h5>
    <BButton
      v-b-toggle="'collapse-a collapse-b'"
      variant="success"
      class="mb-2"
    >
      Toggle Both Collapses
    </BButton>

    <h5>Using Array</h5>
    <BButton
      v-b-toggle="['collapse-a', 'collapse-b']"
      variant="info"
      class="mb-3"
    >
      Toggle Both Collapses
    </BButton>

    <BCollapse
      id="collapse-a"
      class="mb-2"
    >
      <BCard
        header="Collapse A"
        border-variant="primary"
      >
        <p class="card-text">This is collapse A</p>
      </BCard>
    </BCollapse>

    <BCollapse id="collapse-b">
      <BCard
        header="Collapse B"
        border-variant="success"
      >
        <p class="card-text">This is collapse B</p>
      </BCard>
    </BCollapse>
  </div>
  <!-- #endregion template -->
</template>
```

## Using on Links [​](#using-on-links)

When the directive is applied to an `<a>` tag or `BLink`, the target can be specified via the `href` attribute:

[Toggle with BLink (prevents navigation)](#collapse-href)

[Toggle with anchor tag (prevents navigation)](#collapse-href)

[Toggle with anchor tag (allows navigation - URL will change)](#collapse-href)

Toggled using `href="#collapse-href"`

HTML StackBlitz

template

```
<div>
  <p>
    <BLink
      v-b-toggle
      href="#collapse-href"
      @click.prevent
    >
      Toggle with BLink (prevents navigation)
    </BLink>
  </p>
  <p>
    <a
      v-b-toggle
      href="#collapse-href"
      @click.prevent
    >
      Toggle with anchor tag (prevents navigation)
    </a>
  </p>
  <p>
    <a
      v-b-toggle
      href="#collapse-href"
    >
      Toggle with anchor tag (allows navigation - URL will change)
    </a>
  </p>

  <BCollapse
    id="collapse-href"
    class="mt-3"
  >
    <BCard>
      <p class="card-text">Toggled using <code>href="#collapse-href"</code></p>
    </BCard>
  </BCollapse>
</div>
```

URL Navigation

Without `@click.prevent`, clicking the link will change the browser URL and may scroll the page. Add `@click.prevent` to prevent this behavior.

## Conditional CSS Classes [​](#conditional-css-classes)

The directive automatically adds CSS classes to the trigger element based on the target's visibility state:

-   `collapsed` - Added when the target is hidden
-   `not-collapsed` - Added when the target is visible

You can use these classes to conditionally show/hide content:

HideShow Content

The button text changes based on the collapse state using CSS classes.

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton
      v-b-toggle.collapse-css
      variant="primary"
    >
      <span class="when-open">Hide</span>
      <span class="when-closed">Show</span>
      Content
    </BButton>

    <BCollapse
      id="collapse-css"
      class="mt-3"
    >
      <BCard>
        <p class="card-text">
          The button text changes based on the collapse state using CSS classes.
        </p>
      </BCard>
    </BCollapse>
  </div>
</template>

<style scoped>
/* Hide "Hide" text when collapsed, show "Show" text */
.collapsed > .when-open {
  display: none;
}

/* Hide "Show" text when not collapsed, show "Hide" text */
.not-collapsed > .when-closed {
  display: none;
}
</style>
```

The CSS pattern for conditional display:

css

```
.collapsed > .when-open, .not-collapsed > .when-closed { display: none; }
```

## Preventing Toggle [​](#preventing-toggle)

Set the `disabled` attribute on the trigger element to prevent it from toggling the target:

Toggle (Currently Enabled) Disable Toggle Button

When the toggle button is disabled, clicking it will not affect this collapse.

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton
      v-b-toggle.collapse-disabled
      :disabled="isDisabled"
      variant="primary"
      class="mb-2"
    >
      Toggle (Currently {{ isDisabled ? 'Disabled' : 'Enabled' }})
    </BButton>

    <BButton
      variant="secondary"
      class="mb-2 ms-2"
      @click="isDisabled = !isDisabled"
    >
      {{ isDisabled ? 'Enable' : 'Disable' }} Toggle Button
    </BButton>

    <BCollapse
      id="collapse-disabled"
      class="mt-2"
    >
      <BCard>
        <p class="card-text">
          When the toggle button is disabled, clicking it will not affect this collapse.
        </p>
      </BCard>
    </BCollapse>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const isDisabled = ref(false)
</script>
```

This works with `<button>`, `BButton`, `BLink`, and any element that supports the `disabled` attribute.

## Compatible Components [​](#compatible-components)

The v-b-toggle directive works with these components:

### BCollapse [​](#bcollapse)

Toggle collapsible content. See the [modifier example above](#using-modifiers) for a demonstration.

For more details, see the [BCollapse documentation](/bootstrap-vue-next/docs/components/collapse.html#v-b-toggle-directive).

### BOffcanvas [​](#boffcanvas)

Toggle off-canvas sidebars:

Toggle Offcanvas

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <div>
    <BButton
      v-b-toggle.offcanvas-demo
      variant="primary"
      >Toggle Offcanvas</BButton
    >

    <BOffcanvas
      id="offcanvas-demo"
      title="Offcanvas Title"
    >
      <p>This offcanvas is controlled by the v-b-toggle directive.</p>
      <p>Click the close button or outside the offcanvas to hide it.</p>
    </BOffcanvas>
  </div>
  <!-- #endregion template -->
</template>
```

See the [BOffcanvas documentation](/bootstrap-vue-next/docs/components/offcanvas.html#v-b-toggle-directive) for more details.

### BModal [​](#bmodal)

The v-b-toggle directive also works with modals. However, for modals, the dedicated `v-b-modal` directive is recommended as it's an alias specifically designed for modal use cases.

See the [BModal documentation](/bootstrap-vue-next/docs/components/modal.html) for more details.

## Comparison with Programmatic Control [​](#comparison-with-programmatic-control)

The v-b-toggle directive is ideal for simple, declarative toggling. For programmatic control, use the `useToggle` composable or `v-model`:

##### Using v-b-toggle Directive

Toggle with Directive

Simple, declarative approach for basic toggle functionality.

##### Using useToggle Composable

Toggle with Composable

Programmatic control with full access to visibility state.

Current state: Visible

##### Using v-model

Toggle with v-model

Direct control via reactive state binding.

Current state: Hidden

HTML StackBlitz

vue

```
<template>
  <div>
    <h5>Using v-b-toggle Directive</h5>
    <BButton
      v-b-toggle.collapse-directive
      variant="primary"
      class="mb-3"
    >
      Toggle with Directive
    </BButton>
    <BCollapse
      id="collapse-directive"
      class="mb-4"
    >
      <BCard>
        <p class="card-text">Simple, declarative approach for basic toggle functionality.</p>
      </BCard>
    </BCollapse>

    <h5>Using useToggle Composable</h5>
    <BButton
      variant="success"
      class="mb-3"
      @click="() => toggleComposable()"
    >
      Toggle with Composable
    </BButton>
    <BCollapse
      id="collapse-composable"
      class="mb-4"
    >
      <BCard>
        <p class="card-text">Programmatic control with full access to visibility state.</p>
        <p class="mb-0">Current state: {{ composableValue ? 'Visible' : 'Hidden' }}</p>
      </BCard>
    </BCollapse>

    <h5>Using v-model</h5>
    <BButton
      variant="info"
      class="mb-3"
      @click="isManual = !isManual"
    >
      Toggle with v-model
    </BButton>
    <BCollapse
      id="collapse-manual"
      v-model="isManual"
    >
      <BCard>
        <p class="card-text">Direct control via reactive state binding.</p>
        <p class="mb-0">Current state: {{ isManual ? 'Visible' : 'Hidden' }}</p>
      </BCard>
    </BCollapse>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useToggle} from 'bootstrap-vue-next/composables/useToggle'

// Using useToggle composable
const {toggle: toggleComposable, value: composableValue} = useToggle('collapse-composable')

// Using v-model
const isManual = ref(false)
</script>
```

| Approach | Use When | Pros | Cons |
| --- | --- | --- | --- |
| `v-b-toggle` | Simple click-to-toggle | Declarative, minimal code | Click-only, no state access |
| `useToggle` | Need programmatic control + state access | Full API, reactive state | More code |
| `v-model` | Direct reactive binding | Simple, two-way binding | Manual event handling required |

## Accessibility [​](#accessibility)

The directive automatically handles accessibility by setting and managing ARIA attributes:

### What the Directive Manages [​](#what-the-directive-manages)

The `v-b-toggle` directive sets:

-   `aria-controls` - Lists the IDs of all target components (static, set once)

### What the Target Component Manages [​](#what-the-target-component-manages)

The target component (BCollapse, BOffcanvas, etc.) manages:

-   `aria-expanded` - Reflects current visibility state (`'true'` or `'false'`)

The directive itself handles the CSS classes (`collapsed`/`not-collapsed`) and click event handlers on the trigger element.

This separation of responsibilities ensures consistent accessibility across all show/hide components. For detailed information, see the [ARIA Visibility Architecture documentation](/bootstrap-vue-next/docs/reference/accessibility.html#aria-trigger-registration-for-component-visibility).

### Best Practices [​](#best-practices)

-   Only use the directive on keyboard-focusable elements (buttons, links, form controls)
-   Avoid applying to decorative elements like `<div>` or `<span>` unless you also add appropriate ARIA attributes and keyboard handling yourself
-   For elements that don't have a native role of `button` or `link`, manually add an appropriate `role` (for example, `role="button"`) and a `tabindex` (such as `tabindex="0"`) so they are keyboard-focusable

### Multiple Target Caveats [​](#multiple-target-caveats)

When toggling multiple targets, the `aria-expanded` attribute on the trigger reflects the state based on the **first** target component. If individual targets have independent visibility controls (via `v-model`, other toggle buttons, or programmatic control), the `aria-expanded` value may not accurately reflect all targets' states.

For better accessibility with multiple independent targets, use separate toggle buttons for each target.

## See Also [​](#see-also)

-   [BCollapse component](/bootstrap-vue-next/docs/components/collapse.html) - Collapsible content with accordion support
-   [BOffcanvas component](/bootstrap-vue-next/docs/components/offcanvas.html) - Off-canvas sidebars
-   [BModal component](/bootstrap-vue-next/docs/components/modal.html) - Modal dialogs
-   [useToggle composable](/bootstrap-vue-next/docs/composables/useToggle.html) - Programmatic visibility control
-   [ARIA Visibility Architecture](/bootstrap-vue-next/docs/reference/accessibility.html#aria-trigger-registration-for-component-visibility) - Technical details on accessibility implementation
