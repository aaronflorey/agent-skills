# Accessibility ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/reference/accessibility.html

##### On this page

-   [Overview and Limitations ​](#overview-and-limitations)
    
-   [Structural markup ​](#structural-markup)
    
-   [Interactive components ​](#interactive-components)
    
-   [ARIA Trigger Registration for component visibility ​](#aria-trigger-registration-for-component-visibility)
    -   [How Trigger Registration Works ​](#how-trigger-registration-works)
        -   [What the v-b-toggle Directive Does ​](#what-the-v-b-toggle-directive-does)
            
        -   [What the Component's Visibility System Does ​](#what-the-component-s-visibility-system-does)
            
    -   [Method 1: Using v-b-toggle (Automatic Registration) ​](#method-1-using-v-b-toggle-automatic-registration)
        
    -   [Method 2: Using v-model with v-b-toggle ​](#method-2-using-v-model-with-v-b-toggle)
        
    -   [Method 3: Manual ARIA Management ​](#method-3-manual-aria-management)
        
    -   [When to Use Each Method ​](#when-to-use-each-method)
        
    -   [Components Supporting Trigger Registration ​](#components-supporting-trigger-registration)
        
-   [Color contrast ​](#color-contrast)
    
-   [Visually hidden content ​](#visually-hidden-content)
    
-   [Reduced motion ​](#reduced-motion)
    
-   [Testing your application for accessibility ​](#testing-your-application-for-accessibility)
    
-   [Additional resources ​](#additional-resources)
    

# Accessibility [​](#accessibility)

A brief overview of BootstrapVueNext's features and limitations for the creation of accessible content.

[Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/reference/accessibility.md)

## Overview and Limitations [​](#overview-and-limitations)

BootstrapVueNext will automatically add in the appropriate accessibility markup for most interactive components. But the overall accessibility of any project built with Bootstrap and BootstrapVueNext depends in large part on the author's markup, additional styling, and scripting they've included. However, provided that these have been implemented correctly, it should be perfectly possible to create websites and applications with BootstrapVueNext that fulfill [WCAG 2.0](https://www.w3.org/TR/WCAG20/) (A/AA/AAA), [Section 508](https://www.section508.gov) and similar accessibility standards and requirements.

## Structural markup [​](#structural-markup)

BootstrapVue's custom components have been optimized for accessible/semantic generated HTML markup out of the box. This documentation aims to provide developers with best practice examples to demonstrate the use of Bootstrap itself and illustrate appropriate semantic markup, including ways in which potential accessibility concerns can be addressed.

Most component documentation pages include an accessibility section (or sections) noting best practices and limitations.

## Interactive components [​](#interactive-components)

BootstrapVue's interactive components — such as modal dialogs, dropdown menus and custom tooltips — are designed to work for touch, mouse and keyboard users. Through the use of relevant [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) roles and attributes, these components should also be understandable and operable using assistive technologies (such as screen readers).

Because BootstrapVue's components are purposely designed to be fairly generic, authors may need to include further ARIA roles and attributes, as well as JavaScript behavior, to more accurately convey the precise nature and functionality of their component. This is usually noted in the documentation.

## ARIA Trigger Registration for component visibility [​](#aria-trigger-registration-for-component-visibility)

Several BootstrapVueNext components (`BCollapse`, `BOffcanvas`, `BModal`, `BDropdown`, `BAlert`, `BToast`, `BPopover`) support automatic ARIA attribute management for trigger elements that control their visibility. This system ensures proper accessibility by automatically updating `aria-expanded` attributes and CSS classes (`collapsed`/`not-collapsed`) on trigger elements as the component's visibility changes.

### How Trigger Registration Works [​](#how-trigger-registration-works)

Trigger registration is **opt-in** and happens through one of these methods:

1.  **Using the `v-b-toggle` directive** (recommended for most cases)
2.  **Manual ARIA management** for unregistered triggers

#### What the `v-b-toggle` Directive Does [​](#what-the-v-b-toggle-directive-does)

When you use `v-b-toggle`, the directive:

-   Sets the `aria-controls` attribute on the trigger element (pointing to the target component's ID)
-   Registers the trigger element with the target component's visibility system
-   Removes only the `aria-controls` attribute when the trigger unmounts

#### What the Component's Visibility System Does [​](#what-the-component-s-visibility-system-does)

Once a trigger is registered (via `v-b-toggle`), the component automatically:

-   Sets and maintains the `aria-expanded` attribute (`"true"` or `"false"`) based on visibility state
-   Adds/removes the `collapsed` and `not-collapsed` CSS classes for visual state
-   Updates these attributes and classes whenever visibility changes, regardless of the method used (`v-b-toggle` click, `v-model` change, slot functions, etc.)
-   Cleans up the `aria-expanded` attribute and classes when the trigger unregisters

This split responsibility ensures that `aria-controls` (which depends on target IDs known by the directive) is managed separately from `aria-expanded` and visual classes (which depend on the component's visibility state).

### Method 1: Using v-b-toggle (Automatic Registration) [​](#method-1-using-v-b-toggle-automatic-registration)

The simplest approach is to use the [`v-b-toggle` directive](/bootstrap-vue-next/docs/directives/BToggle.html), which automatically handles both `aria-controls` and trigger registration:

Toggle Collapse

Collapsible content

HTML StackBlitz

template

```
<BButton v-b-toggle.aria-demo-directive>Toggle Collapse</BButton>
<BCollapse id="aria-demo-directive">
  <BCard>Collapsible content</BCard>
</BCollapse>
```

With this approach, the button automatically receives:

-   `aria-controls="aria-demo-directive"`
-   `aria-expanded="true"` or `aria-expanded="false"` (updated automatically)
-   `collapsed` or `not-collapsed` CSS class (updated automatically)

### Method 2: Using v-model with v-b-toggle [​](#method-2-using-v-model-with-v-b-toggle)

You can combine `v-model` for programmatic control with `v-b-toggle` for automatic ARIA management. This is useful when you need to control visibility from code while still having trigger buttons with proper accessibility:

Toggle using v-b-toggle

This demonstrates combining v-model with v-b-toggle.

The v-b-toggle button above has automatic ARIA management.

You can close this from inside using the slot's hide function:

Close (slot function) Close (v-model)

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton v-b-toggle.aria-demo-programmatic class="mb-2"> Toggle using v-b-toggle </BButton>

    <BCollapse id="aria-demo-programmatic" v-model="visible">
      <template #default="scope">
        <BCard>
          <p>This demonstrates combining v-model with v-b-toggle.</p>
          <p>The v-b-toggle button above has automatic ARIA management.</p>
          <p>You can close this from inside using the slot's hide function:</p>
          <div class="d-flex gap-2">
            <BButton variant="danger" size="sm" @click="() => scope.hide()">
              Close (slot function)
            </BButton>
            <BButton variant="secondary" size="sm" @click="closeFromCode">
              Close (v-model)
            </BButton>
          </div>
        </BCard>
      </template>
    </BCollapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

// You can also control visibility programmatically
const closeFromCode = () => {
  visible.value = false
}
</script>
```

**Key Points**:

-   The `v-b-toggle` directive handles all ARIA attributes automatically
-   You can still use `v-model` to control visibility programmatically
-   Slot functions like `toggle`, `show`, and `hide` work seamlessly with registered triggers

### Method 3: Manual ARIA Management [​](#method-3-manual-aria-management)

If you don't register a trigger (via directive or programmatically), you must manually manage all ARIA attributes yourself:

Toggle Collapse

Collapsible content

HTML StackBlitz

vue

```
<template>
  <BButton
    aria-controls="aria-demo-manual"
    :aria-expanded="visible ? 'true' : 'false'"
    :class="visible ? 'not-collapsed' : 'collapsed'"
    @click="toggle"
  >
    Toggle Collapse
  </BButton>

  <BCollapse
    id="aria-demo-manual"
    v-model="visible"
  >
    <BCard>Collapsible content</BCard>
  </BCollapse>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const visible = ref(false)

const toggle = () => {
  visible.value = !visible.value
}
</script>
```

This approach requires you to manually:

-   Set `aria-controls` to the component's ID
-   Update `aria-expanded` based on visibility state
-   Toggle `collapsed`/`not-collapsed` CSS classes

### When to Use Each Method [​](#when-to-use-each-method)

-   **Use `v-b-toggle`** when you want automatic ARIA management (recommended for most cases)
-   **Combine `v-b-toggle` with `v-model`** when you need both automatic ARIA management and programmatic control
-   **Use manual ARIA management** only when you have specific requirements that prevent using `v-b-toggle`

### Components Supporting Trigger Registration [​](#components-supporting-trigger-registration)

The following components support the trigger registration system:

-   [`BAlert`](/bootstrap-vue-next/docs/components/alert.html)
-   [`BCollapse`](/bootstrap-vue-next/docs/components/collapse.html#accessibility)
-   [`BDropdown`](/bootstrap-vue-next/docs/components/dropdown.html)
-   [`BModal`](/bootstrap-vue-next/docs/components/modal.html)
-   [`BOffcanvas`](/bootstrap-vue-next/docs/components/offcanvas.html#accessibility)
-   [`BPopover`](/bootstrap-vue-next/docs/components/popover.html)
-   [`BToast`](/bootstrap-vue-next/docs/components/toast.html)
-   [`BTooltip`](/bootstrap-vue-next/docs/components/tooltip.html)

See each component's accessibility section for specific guidance and examples.

## Color contrast [​](#color-contrast)

Most colors that currently make up Bootstrap V5's default palette — used throughout the framework for things such as button variations, alert variations, form validation indicators — lead to insufficient color contrast (below the recommended [WCAG 2.0 color contrast ratio of 4.5:1)](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) when used against a light background. Authors will need to manually modify/extend these default colors to ensure adequate color contrast ratios.

Refer to the Theming section for customizing Bootstrap's SCSS.

## Visually hidden content [​](#visually-hidden-content)

Content which should be visually hidden, but remain accessible to assistive technologies such as screen readers, can be styled using the `.visually-hidden` class. This can be useful in situations where additional visual information or cues (such as meaning denoted through the use of color) need to also be conveyed to non-visual users.

template

```
<p class="text-danger mb-0">
  <span class="visually-hidden">Danger: </span>
  This action is not reversible
</p>
```

For visually hidden interactive controls, such as traditional “skip” links, use the `.visually-hidden-focusable` class. This will ensure that the control becomes visible once focused (for sighted keyboard users). Watch out, compared to the equivalent `.sr-only` and `.sr-only-focusable` classes in past versions, Bootstrap 5’s `.visually-hidden-focusable` is a standalone class, and must not be used in combination with the `.visually-hidden` class.

template

```
<a class="visually-hidden-focusable" href="#content">Skip to main content</a>
```

## Reduced motion [​](#reduced-motion)

Bootstrap includes support for the [prefers-reduced-motion media feature](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion). In browsers/environments that allow the user to specify their preference for reduced motion, most CSS transition effects in Bootstrap (for instance, when a modal dialog is opened or closed, or the sliding animation in carousels) will be disabled, and meaningful animations (such as spinners) will be slowed down.

On browsers that support `prefers-reduced-motion`, and where the user has not explicitly signaled that they’d prefer reduced motion (i.e. where `prefers-reduced-motion: no-preference`), Bootstrap enables smooth scrolling using the `scroll-behavior` property.

## Testing your application for accessibility [​](#testing-your-application-for-accessibility)

It is highly recommended to test your app for accessibility before deployment. Note that some countries even have laws [requiring all websites to be accessible](https://webaim.org/articles/laws/world/).

There are just two main things to think about when making your web app accessible:

-   Defining the right keyboard behavior. BootstrapVueNext provides keyboard control for most of our components, but you should make sure your custom components are also keyboard accessible.
-   Making it possible for screen readers to understand your app. Bootstrap, in most situations, will automatically set the correct `role` and `aria-*` attributes on our components. You should also make sure that all of your custom components provide the correct roles and attributes (use semantic HTML elements and markup where possible).

Steps you should do for testing:

\-Try using the keyboard only to see if all interactive components can be reached and controlled. Ensure that controls have focus styling so that the user knows which interactive element they are on. Remember, keyboard user cannot trigger an element's `hover` state.

-   Use a screen reader (combined with keyboard only) to navigate and interact with your app. There are several free screen readers available for various operating systems and browsers. Remember that screen reader users can only "see" what they hear.
-   See how your app looks and works when increasing the zoom level (and/or font size) of your browser.

## Additional resources [​](#additional-resources)

-   [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG/)
-   [The A11Y Project](https://www.a11yproject.com)
-   [MDN accessibility documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
-   [Tenon.io Accessibility Checker](https://tenon.io)
-   [Color Contrast Analyser (CCA)](https://www.tpgi.com/color-contrast-checker/)
-   [“HTML Codesniffer” bookmarklet for identifying accessibility issues](https://github.com/squizlabs/HTML_CodeSniffer)
-   [Microsoft Accessibility Insights](https://accessibilityinsights.io)
-   [Deque Axe testing tools](https://www.deque.com/axe/)
-   [Introduction to Web Accessibility](https://www.w3.org/WAI/fundamentals/accessibility-intro/)
