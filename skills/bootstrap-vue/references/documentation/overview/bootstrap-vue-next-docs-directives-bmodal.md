# BModal ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/directives/BModal.html

##### On this page

-   [Overview ​](#overview)
    
-   [Target Specification ​](#target-specification)
    -   [Using Modifiers ​](#using-modifiers)
        
    -   [Using Directive Argument ​](#using-directive-argument)
        
    -   [Using Directive Value ​](#using-directive-value)
        
    -   [All Methods ​](#all-methods)
        
-   [Multiple Modals ​](#multiple-modals)
    
-   [Using on Links ​](#using-on-links)
    
-   [Conditional CSS Classes ​](#conditional-css-classes)
    
-   [Disabled State ​](#disabled-state)
    
-   [Comparison with Other Approaches ​](#comparison-with-other-approaches)
    -   [When to Use Each Approach ​](#when-to-use-each-approach)
        
-   [Accessibility ​](#accessibility)
    -   [What the Directive Manages ​](#what-the-directive-manages)
        
    -   [What the Modal Component Manages ​](#what-the-modal-component-manages)
        
    -   [Best Practices ​](#best-practices)
        
-   [Related Components ​](#related-components)
    

# BModal [​](#bmodal)

A light-weight directive for showing modals by ID. It provides a semantically clear way to trigger modals and automatically handles accessibility attributes and trigger registration

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/directives/BModal/index.ts) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/directives/BModal.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#modal)

> The `v-b-modal` directive provides a simple, declarative way to show `BModal` components. The directive automatically handles accessibility and provides a semantic alternative to the more general `v-b-toggle` directive.

Show Modal

HTML StackBlitz

template

```
<div>
  <BButton
    v-b-modal.modal-overview
    variant="primary"
    >Show Modal</BButton
  >
  <BModal
    id="modal-overview"
    title="Hello Modal!"
  >
    <p>This modal can be triggered with the v-b-modal directive.</p>
  </BModal>
</div>
```

## Overview [​](#overview)

Things to know when using the modal directive:

-   The directive works exclusively with `BModal` components
-   Target modals are specified by their `id` attribute
-   Multiple modals can be shown simultaneously
-   The directive automatically manages ARIA accessibility attributes
-   The trigger element receives `collapsed` and `not-collapsed` CSS classes based on modal state
-   Disabled buttons will not trigger modal events
-   `v-b-modal` is an alias for `v-b-toggle` - both work identically but `v-b-modal` is semantically clearer for modals

## Target Specification [​](#target-specification)

The v-b-modal directive offers flexible ways to specify target modals:

### Using Modifiers [​](#using-modifiers)

The most common approach is using modifiers, where each modifier represents a modal ID:

Open Modal

HTML StackBlitz

template

```
<div>
  <BButton
    v-b-modal.my-modal
    variant="primary"
    >Open Modal</BButton
  >
  <BModal
    id="my-modal"
    title="Using Modifiers"
  >
    <p>The modal ID is specified as a modifier: <code>.my-modal</code></p>
  </BModal>
</div>
```

### Using Directive Argument [​](#using-directive-argument)

You can specify the target as a directive argument (supports Vue's dynamic arguments):

Open Modal

HTML StackBlitz

template

```
<div>
  <BButton
    v-b-modal:modal-arg
    variant="primary"
    >Open Modal</BButton
  >
  <BModal
    id="modal-arg"
    title="Using Directive Argument"
  >
    <p>The modal ID is specified as an argument: <code>:modal-arg</code></p>
  </BModal>
</div>
```

### Using Directive Value [​](#using-directive-value)

The directive value can be a string ID or an array of IDs:

String ValueArray Value

HTML StackBlitz

template

```
<div>
  <div class="d-flex gap-2 mb-3">
    <BButton
      v-b-modal="'modal-value'"
      variant="primary"
      >String Value</BButton
    >
    <BButton
      v-b-modal="['modal-value']"
      variant="success"
      >Array Value</BButton
    >
  </div>
  <BModal
    id="modal-value"
    title="Using Directive Value"
  >
    <p>The modal ID can be specified as a string or array value.</p>
  </BModal>
</div>
```

### All Methods [​](#all-methods)

Here are all the ways to specify targets:

template

```
<!-- Using modifiers: Chain modifiers for multiple modals -->
<BButton v-b-modal.target-1.target-2>Toggle Multiple</BButton>
```

template

```
<!-- Using directive argument -->
<BButton v-b-modal:my-modal>Open Modal</BButton>

<!-- Dynamic argument (Vue 3+) -->
<BButton v-b-modal:[dynamicId]>Open Dynamic Modal</BButton>
```

template

```
<!-- Using string value -->
<BButton v-b-modal="'my-modal'">Open Modal</BButton>

<!-- Using array value for multiple modals -->
<BButton v-b-modal="['modal-1', 'modal-2']">Open Multiple</BButton>

<!-- Space-separated string for multiple modals -->
<BButton v-b-modal="'modal-1 modal-2'">Open Multiple</BButton>
```

template

```
<!-- Using href on links -->
<blink
  v-b-modal
  href="#my-modal"
  @click.prevent
  >Open Modal</blink
>

<a
  v-b-modal
  href="#my-modal"
  @click.prevent
  >Open Modal</a
>
```

template

```
<!-- Combined: modifier + argument + value -->
<BButton v-b-modal:another-modal.my-modal="'third-modal'"> Open Three Modals </BButton>
```

## Multiple Modals [​](#multiple-modals)

Show multiple modals simultaneously using any of these methods:

Using ModifiersSpace-separated StringArray Value

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <div>
    <div class="d-flex gap-2 mb-3">
      <BButton
        v-b-modal.modal-1.modal-2
        variant="primary"
        >Using Modifiers</BButton
      >
      <BButton
        v-b-modal="'modal-1 modal-2'"
        variant="success"
        >Space-separated String</BButton
      >
      <BButton
        v-b-modal="['modal-1', 'modal-2']"
        variant="info"
        >Array Value</BButton
      >
    </div>
    <BModal
      id="modal-1"
      title="First Modal"
    >
      <p>This is the first modal.</p>
    </BModal>
    <BModal
      id="modal-2"
      title="Second Modal"
    >
      <p>This is the second modal.</p>
    </BModal>
  </div>
  <!-- #endregion template -->
</template>
```

## Using on Links [​](#using-on-links)

When the directive is applied to an `<a>` tag or `BLink`, the target can be specified via the `href` attribute:

[BLink with href](#modal-link)[Anchor with href](#modal-link)

HTML StackBlitz

template

```
<div>
  <div class="d-flex gap-2 mb-3">
    <BLink
      v-b-modal
      href="#modal-link"
      @click.prevent
      >BLink with href</BLink
    >
    <a
      v-b-modal
      href="#modal-link"
      @click.prevent
      >Anchor with href</a
    >
  </div>
  <BModal
    id="modal-link"
    title="Triggered from Link"
  >
    <p>The modal ID can be extracted from the <code>href</code> attribute.</p>
  </BModal>
</div>
```

URL Navigation

Without `@click.prevent`, clicking the link will change the browser URL. Add `@click.prevent` to prevent this behavior while still showing the modal.

## Conditional CSS Classes [​](#conditional-css-classes)

The directive automatically adds CSS classes to the trigger element based on the modal's visibility state:

-   `collapsed` - Added when the modal is hidden
-   `not-collapsed` - Added when the modal is visible

You can use these classes to conditionally style the trigger:

css

```
.collapsed .when-open { display: none; } .not-collapsed .when-closed { display: none; }
```

## Disabled State [​](#disabled-state)

Disabled elements will not trigger modals:

template

```
<!-- This button will not trigger the modal when disabled -->
<BButton
  v-b-modal.my-modal
  :disabled="true"
>
  Disabled Button
</BButton>
```

## Comparison with Other Approaches [​](#comparison-with-other-approaches)

The v-b-modal directive is one of several ways to control modals. Choose the approach that best fits your use case:

##### Using v-b-modal Directive

Open with Directive

##### Using v-model

Open with v-model

##### Using Template Refs

Open with Template Ref

##### Using useModal Composable

Open with Composable

HTML StackBlitz

vue

```
<template>
  <div>
    <h5>Using v-b-modal Directive</h5>
    <BButton
      v-b-modal.modal-directive
      variant="primary"
      class="mb-3"
    >
      Open with Directive
    </BButton>
    <BModal
      id="modal-directive"
      title="Directive Approach"
    >
      <p class="card-text">Simple, declarative approach for triggering modals.</p>
    </BModal>

    <h5>Using v-model</h5>
    <BButton
      variant="success"
      class="mb-3"
      @click="showVModel = true"
    >
      Open with v-model
    </BButton>
    <BModal
      v-model="showVModel"
      title="v-model Approach"
    >
      <p class="card-text">Direct control via reactive state binding.</p>
      <p class="mb-0">Current state: {{ showVModel ? 'Visible' : 'Hidden' }}</p>
    </BModal>

    <h5>Using Template Refs</h5>
    <BButton
      variant="info"
      class="mb-3"
      @click="modalRef?.show()"
    >
      Open with Template Ref
    </BButton>
    <BModal
      ref="modalRef"
      title="Template Ref Approach"
    >
      <p class="card-text">Programmatic control using component methods.</p>
      <div class="d-flex gap-2 mt-3">
        <BButton
          size="sm"
          variant="outline-primary"
          @click="modalRef?.show()"
          >Show</BButton
        >
        <BButton
          size="sm"
          variant="outline-secondary"
          @click="modalRef?.hide()"
          >Hide</BButton
        >
        <BButton
          size="sm"
          variant="outline-info"
          @click="modalRef?.toggle()"
          >Toggle</BButton
        >
      </div>
    </BModal>

    <h5>Using useModal Composable</h5>
    <BButton
      variant="warning"
      class="mb-3"
      @click="openComposableModal"
    >
      Open with Composable
    </BButton>
  </div>
</template>

<script setup lang="ts">
import {ref, useTemplateRef} from 'vue'
import {useModal} from 'bootstrap-vue-next/composables/useModal'
import {BModal} from 'bootstrap-vue-next/components/BModal'
import {type ComponentExposed} from 'vue-component-type-helpers'

// v-model approach
const showVModel = ref(false)

// Template ref approach
const modalRef = useTemplateRef<ComponentExposed<typeof BModal>>('modalRef')

// Composable approach
const modal = useModal()
const openComposableModal = () => {
  modal
    .create({
      body: 'This modal was created dynamically using the useModal composable.',
      title: 'Composable Approach',
    })
    .show()
}
</script>
```

### When to Use Each Approach [​](#when-to-use-each-approach)

**Use `v-b-modal` directive when:**

-   You need a simple, declarative way to trigger modals
-   The trigger element is separate from modal state management
-   You want automatic accessibility handling
-   You're triggering modals from static elements (buttons, links)

**Use `v-model` when:**

-   You need two-way binding with modal visibility
-   Modal state is part of your component's reactive data
-   You want to react to modal visibility changes
-   You need to control the modal from multiple places

**Use template refs when:**

-   You need programmatic control with explicit method calls
-   You want access to the full component API (`show()`, `hide()`, `toggle()`)
-   You're building wrapper components
-   You need to call methods from lifecycle hooks or watchers

**Use `useModal` composable when:**

-   You need to create modals dynamically
-   You're building message boxes or confirmation dialogs
-   You need to return values from modals (Promise-based API)
-   You want to show modals without declaring them in the template

## Accessibility [​](#accessibility)

The directive automatically handles accessibility by setting and managing ARIA attributes:

### What the Directive Manages [​](#what-the-directive-manages)

The `v-b-modal` directive sets:

-   `aria-controls` - Lists the IDs of all target modals (static, set once)

### What the Modal Component Manages [​](#what-the-modal-component-manages)

The modal component manages:

-   `aria-expanded` - Reflects current visibility state (`'true'` or `'false'`)

The directive itself handles the CSS classes (`collapsed`/`not-collapsed`) and click event handlers on the trigger element.

This separation of responsibilities ensures consistent accessibility across all show/hide components. For detailed information, see the [ARIA Visibility Architecture documentation](/bootstrap-vue-next/docs/reference/accessibility.html#aria-trigger-registration-for-component-visibility).

### Best Practices [​](#best-practices)

-   Only use the directive on keyboard-focusable elements (buttons, links, form controls)
-   Avoid applying to decorative elements like `<div>` or `<span>` unless you also add appropriate ARIA attributes and keyboard handling yourself
-   For elements that don't have a native role of `button` or `link`, manually add an appropriate `role` (for example, `role="button"`) and a `tabindex` (such as `tabindex="0"`) so they are keyboard-focusable

## Related Components [​](#related-components)

-   [BModal Component](/bootstrap-vue-next/docs/components/modal.html) - Full modal component documentation
-   [v-b-toggle Directive](/bootstrap-vue-next/docs/directives/BToggle.html) - The underlying directive (v-b-modal is an alias)
-   [useModal Composable](/bootstrap-vue-next/docs/composables/useModal.html) - For creating modals dynamically
