# Popover ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/popover.html

##### On this page

-   [Overview ​](#overview)
    
-   [Target ​](#target)
    -   [Target Requirements ​](#target-requirements)
        
-   [Positioning ​](#positioning)
    
-   [Triggers ​](#triggers)
    -   [Basic Trigger Configuration ​](#basic-trigger-configuration)
        
    -   [Trigger Logic ​](#trigger-logic)
        
-   [Content ​](#content)
    
-   [Custom Classes and Variants ​](#custom-classes-and-variants)
    
-   [Programmatic control via v-model ​](#programmatic-control-via-v-model)
    
-   [Delay ​](#delay)
    
-   [Boundary ​](#boundary)
    
-   [Close on Hide ​](#close-on-hide)
    
-   [Disabled State ​](#disabled-state)
    
-   [Exposed functions ​](#exposed-functions)
    
-   [Interactive Content ​](#interactive-content)
    
-   [Accessibility ​](#accessibility)
    -   [Making popovers work for keyboard and assistive technology users ​](#making-popovers-work-for-keyboard-and-assistive-technology-users)
        
    -   [Content Considerations ​](#content-considerations)
        
-   [Component Reference](#component-reference)
    -   [<BPopover>](#b-popover)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            

# Popover [​](#popover)

The Popover feature, which provides a tooltip-like behavior, can be easily applied to any interactive element via the `<BPopover>` component or [`v-b-popover`](/bootstrap-vue-next/docs/directives/BPopover) directive. Popovers can also be created and programmatically controlled via the composable [`usePopover`](/bootstrap-vue-next/docs/composables/usePopover)

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BPopover/BPopover.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/popover.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bpopover)

Hover Me

Popover Title

I am popover **component** content using the **#target** slot!

Hover Me

Popover Title

I am popover **component** content using the **target** prop!

HTML StackBlitz

template

```
<div class="d-flex gap-2">
  <BPopover>
    <template #target> <BButton> Hover Me </BButton></template>
    <template #title>Popover Title</template>
    I am popover <b>component</b> content using the <b>#target</b> slot!
  </BPopover>

  <BButton id="overview-popover"> Hover Me </BButton>
  <BPopover target="overview-popover">
    <template #title>Popover Title</template>
    I am popover <b>component</b> content using the <b>target</b> prop!
  </BPopover>
</div>
```

## Overview [​](#overview)

Things to know when using the popover component:

-   Popovers rely on the 3rd party library [floating-ui](https://floating-ui.com/) for positioning.
-   Use `teleportTo` and `teleportDisabled` to control where in the DOM the popover is rendered. See the [Vue.js Docs](https://vuejs.org/guide/built-ins/teleport.html) for details. `teleportTo` defaults to `undefined`.
-   Triggering popovers on hidden elements will not work.
-   Popovers for `disabled` elements must be triggered on a wrapper element.
-   When triggered from hyperlinks that span multiple lines, popovers will be centered. Set the `inline` prop to improve the positioning see the [Floating UI docs](https://floating-ui.com/docs/inline) for details.

## Target [​](#target)

The target is the _trigger_ element (or component) that will trigger the popover. The target is specified via the `target` slot or prop, and can be any of the following:

The `target` prop may be any of the following:

-   A string identifying the ID of the trigger element (or ID of the root element of a component)
-   A string with querySelector. (i.e. '#toolbar > div:first-child')
-   A reference (ref) to an `HTMLElement` or an `SVGElement` via a [Template Ref](https://vuejs.org/guide/essentials/template-refs.html)
-   A reference (ref) to a component that has either an `HTMLElement` or `SVGElement` as its root element via [Template Ref](https://vuejs.org/guide/essentials/template-refs.html)

Target by ID String

String ID Target

This popover targets an element by its ID string

Target by Ref

Template Ref Target

This popover targets an element via a template ref

querySelector Target

Target by querySelectorNot targeted

This popover targets an element using a querySelector string

HTML StackBlitz

vue

```
<template>
  <div class="d-flex flex-column gap-3">
    <BPopover title="String ID Target">
      <template #target>
        <BButton
          id="target-string"
          variant="primary"
          >Target by ID String</BButton
        >
      </template>
      This popover targets an element by its ID string
    </BPopover>

    <BPopover
      :target="buttonRef"
      title="Template Ref Target"
    >
      <template #target>
        <BButton
          ref="buttonRef"
          variant="success"
          >Target by Ref</BButton
        >
      </template>
      This popover targets an element via a template ref
    </BPopover>

    <BPopover
      target="#toolbar > button:first-child"
      title="querySelector Target"
    >
      <div
        id="toolbar"
        class="d-flex gap-2"
      >
        <BButton variant="info">Target by querySelector</BButton>
        <BButton variant="secondary">Not targeted</BButton>
      </div>
      This popover targets an element using a querySelector string
    </BPopover>
  </div>
</template>

<script setup lang="ts">
import {type ComponentPublicInstance, ref} from 'vue'

const buttonRef = ref<ComponentPublicInstance>()
</script>
```

NOTE

`HTMLElement` refers to standard HTML elements such as `<div>`, `<button>`, etc., while `SVGElement` refers to `<svg>` or supported child elements of SVGs.

### Target Requirements [​](#target-requirements)

The target element **must** exist in the document before `<BPopover>` is mounted. If the target element is not found during mount, the popover will never open. Always place your `<BPopover>` component lower in the DOM than your target element (or use the `target` slot to wrap the trigger inline).

## Positioning [​](#positioning)

Twelve static options are available for the `placement` prop: `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end` from [@floating-ui/vue](https://floating-ui.com/) as well as three [auto placement](https://floating-ui.com/docs/autoplacement) options `auto`, `auto-start` and `auto-end`.

Positioning is relative to the trigger element.

Top

Popover Top

I am popover **component** content!

Top Start

Popover Top Start

I am popover **component** content!

Top End

Popover Top End

I am popover **component** content!

Bottom

Popover Bottom

I am popover **component** content!

Bottom Start

Popover Bottom Start

I am popover **component** content!

Bottom End

Popover Bottom End

I am popover **component** content!

Left

Popover Left

I am popover **component** content!

Left Start

Popover Left Start

I am popover **component** content!

Left End

Popover Left End

I am popover **component** content!

Right

Popover Right

I am popover **component** content!

Right Start

Popover Right Start

I am popover **component** content!

Right End

Popover Right End

I am popover **component** content!

Auto

Popover Auto

I am popover **component** content!

Auto Start

Popover Auto Start

I am popover **component** content!

Auto End

Popover Auto End

I am popover **component** content!

HTML StackBlitz

template

```
<BContainer>
  <BRow class="my-2">
    <BCol class="d-grid gap-2">
      <BPopover placement="top">
        <template #target><BButton>Top</BButton></template>
        <template #title>Popover Top</template>
        I am popover <b>component</b> content!
      </BPopover>
      <BPopover placement="top-start">
        <template #target><BButton>Top Start</BButton></template>
        <template #title>Popover Top Start</template>
        I am popover <b>component</b> content!
      </BPopover>
      <BPopover placement="top-end">
        <template #target><BButton>Top End</BButton></template>
        <template #title>Popover Top End</template>
        I am popover <b>component</b> content!
      </BPopover>
    </BCol>
    <BCol class="d-grid gap-2">
      <BPopover placement="bottom">
        <template #target><BButton>Bottom</BButton></template>
        <template #title>Popover Bottom</template>
        I am popover <b>component</b> content!
      </BPopover>
      <BPopover placement="bottom-start">
        <template #target><BButton>Bottom Start</BButton></template>
        <template #title>Popover Bottom Start</template>
        I am popover <b>component</b> content!
      </BPopover>
      <BPopover placement="bottom-end">
        <template #target><BButton>Bottom End</BButton></template>
        <template #title>Popover Bottom End</template>
        I am popover <b>component</b> content!
      </BPopover>
    </BCol>
    <BCol class="d-grid gap-2">
      <BPopover placement="left">
        <template #target><BButton>Left</BButton></template>
        <template #title>Popover Left</template>
        I am popover <b>component</b> content!
      </BPopover>
      <BPopover placement="left-start">
        <template #target><BButton>Left Start</BButton></template>
        <template #title>Popover Left Start</template>
        I am popover <b>component</b> content!
      </BPopover>
      <BPopover placement="left-end">
        <template #target><BButton>Left End</BButton></template>
        <template #title>Popover Left End</template>
        I am popover <b>component</b> content!
      </BPopover>
    </BCol>
    <BCol class="d-grid gap-2">
      <BPopover placement="right">
        <template #target><BButton>Right</BButton></template>
        <template #title>Popover Right</template>
        I am popover <b>component</b> content!
      </BPopover>
      <BPopover placement="right-start">
        <template #target><BButton>Right Start</BButton></template>
        <template #title>Popover Right Start</template>
        I am popover <b>component</b> content!
      </BPopover>
      <BPopover placement="right-end">
        <template #target><BButton>Right End</BButton></template>
        <template #title>Popover Right End</template>
        I am popover <b>component</b> content!
      </BPopover>
    </BCol>
  </BRow>
</BContainer>
<BContainer>
  <BRow class="my-2">
    <BCol class="d-grid gap-2">
      <BPopover placement="auto">
        <template #target><BButton>Auto</BButton></template>
        <template #title>Popover Auto</template>
        I am popover <b>component</b> content!
      </BPopover>
    </BCol>
    <BCol class="d-grid gap-2">
      <BPopover placement="auto-start">
        <template #target><BButton>Auto Start</BButton></template>
        <template #title>Popover Auto Start</template>
        I am popover <b>component</b> content!
      </BPopover>
    </BCol>
    <BCol class="d-grid gap-2">
      <BPopover placement="auto-end">
        <template #target><BButton>Auto End</BButton></template>
        <template #title>Popover Auto End</template>
        I am popover <b>component</b> content!
      </BPopover>
    </BCol></BRow
  ></BContainer
>
```

## Triggers [​](#triggers)

By default, popovers are triggered by `pointerenter` (hover) and `focus` events and hidden by `pointerleave` and `blur` events on the target element. You can customize which triggers are active using the `hover`, `focus`, and `click` props.

### Basic Trigger Configuration [​](#basic-trigger-configuration)

-   **Default behavior**: Both hover and focus triggers are active
-   **Click only**: Add the `click` prop (`<BPopover click>`)
-   **Hover only**: Add the `hover` prop (`<BPopover hover>`)
-   **Focus only**: Add the `focus` prop (`<BPopover focus>`)
-   **Multiple triggers**: Combine props, e.g. `<BPopover click hover focus>`
-   **Manual control**: Set `<BPopover manual>` to disable all automatic triggers

Default (hover/focus)

Default triggers: hover and focus

Click Only

Click to toggle

Hover Only

Hover to show (no focus)

Focus Only

Focus to show (no hover)

All Triggers

Click, hover, or focus

Manual (show)

Controlled manually via v-model

HTML StackBlitz

vue

```
<template>
  <div class="d-flex flex-wrap gap-2">
    <!-- Default: Hover + Focus -->
    <BPopover>
      <template #target>
        <BButton variant="secondary">Default (hover/focus)</BButton>
      </template>
      Default triggers: hover and focus
    </BPopover>

    <!-- Click only -->
    <BPopover click>
      <template #target>
        <BButton variant="primary">Click Only</BButton>
      </template>
      Click to toggle
    </BPopover>

    <!-- Hover only -->
    <BPopover hover>
      <template #target>
        <BButton variant="success">Hover Only</BButton>
      </template>
      Hover to show (no focus)
    </BPopover>

    <!-- Focus only -->
    <BPopover focus>
      <template #target>
        <BButton variant="info">Focus Only</BButton>
      </template>
      Focus to show (no hover)
    </BPopover>

    <!-- Multiple triggers -->
    <BPopover
      click
      hover
      focus
    >
      <template #target>
        <BButton variant="warning">All Triggers</BButton>
      </template>
      Click, hover, or focus
    </BPopover>

    <!-- Manual control -->
    <BPopover
      v-model="manualShow"
      manual
    >
      <template #target>
        <BButton
          variant="danger"
          @click="manualShow = !manualShow"
        >
          Manual ({{ manualShow ? 'hide' : 'show' }})
        </BButton>
      </template>
      Controlled manually via v-model
    </BPopover>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const manualShow = ref(false)
</script>
```

### Trigger Logic [​](#trigger-logic)

The trigger system uses the following priority order:

1.  **Manual mode**: If `manual="true"`, all automatic triggers are disabled
2.  **Explicit configuration**: If `click`,`hover` or `focus` props are explicitly set (true or false), those values are used
3.  **Default behavior**: Both hover and focus triggers are active

To take finer control of popover visibility, you can use the [useToggle](/bootstrap-vue-next/docs/composables/useToggle.html) or [usePopover](/bootstrap-vue-next/docs/composables/usePopover.html). Alternatively, you can set the `manual` prop and use the [`v-model`](#programmatic-control-via-v-model) or [exposed functions](#exposed-functions) to control visibility.

## Content [​](#content)

The title and body content of a popover can be set via the `title` and `body` props or the `title` and `default` slots. Slots allow you to include HTML markup and Vue components.

Using properties

Prop Examples

Embedding content using properties is easy

Using slots

Content via Slots

Embedding content using slots affords you _greater **control.**_ and HTML support.

HTML StackBlitz

template

```
<div class="d-flex gap-2">
  <BPopover
    title="Prop Examples"
    body="Embedding content using properties is easy"
  >
    <template #target>
      <BButton variant="primary">Using properties</BButton>
    </template>
  </BPopover>
  <BPopover>
    <template #target>
      <BButton variant="primary">Using slots</BButton>
    </template>
    <template #title>Content via Slots</template>
    Embedding content <span class="text-danger">using slots</span> affords you
    <em>greater <strong>control.</strong></em> and HTML support.
  </BPopover>
</div>
```

TIP

For reactive or complex content, always use slots instead of props. Slots provide greater control and support for HTML markup and interactive components.

## Custom Classes and Variants [​](#custom-classes-and-variants)

Custom classes can be applied to the popover's title `<div>` by using the `title-class` prop and to the popover's body `<div>` by using the `body-class` prop:

template

```
<div class="d-flex gap-2">
  <BPopover
    title-class="my-popover-title-class"
    body-class="my-popover-body-class"
  >
    <template #target>
      <BButton
        href="#popover-custom-class"
        tabindex="0"
        >Button</BButton
      >
    </template>
    <template #title>Popover Title</template>
    Popover content
  </BPopover>
</div>
```

Similarly, use [Bootstrap's Color and background](https://getbootstrap.com/docs/5.3/helpers/color-background/) utilities to change the variant of the popover.

Button

Danger!

Danger variant popover

HTML StackBlitz

template

```
<div class="d-flex gap-2">
  <BPopover
    title-class="text-bg-danger"
    class="text-bg-danger"
    title="Danger!"
    body="Danger variant popover"
  >
    <template #target>
      <BButton>Button</BButton>
    </template>
  </BPopover>
</div>
```

`body-class` and `title-class` are reactive and can be changed while the popover is open.

Refer to the [popover directive](/bootstrap-vue-next/docs/directives/BPopover.html) docs on applying custom classes to the directive version.

For finer control, use the bootstrap 5 css variables to apply styles directly.

Button

Danger!

This is **important**

HTML StackBlitz

template

```
<div class="d-flex gap-2">
  <BPopover
    title="Danger!"
    style="
      --bs-popover-header-bg: var(--bs-danger);
      --bs-popover-bg: var(--bs-danger-bg-subtle);
      --bs-popover-border-color: var(--bs-emphasis-color);
    "
  >
    <template #target>
      <BButton>Button</BButton>
    </template>
    This is <strong>important</strong>
  </BPopover>
</div>
```

## Programmatic control via v-model [​](#programmatic-control-via-v-model)

You can manually control the visibility of a popover via the v-model. Setting it to true will show the popover, while setting it to false will hide the popover.

Popover is hidden

Toggle Popover

Popover

Hello **World!**

HTML StackBlitz

vue

```
<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <p>Popover is {{ model ? 'visible' : 'hidden' }}</p>
    </div>

    <div class="p-2">
      <BPopover
        v-model="model"
        placement="right"
        title="Popover"
      >
        <template #target>
          <BButton
            class="mx-2"
            @click="model = !model"
            >Toggle Popover</BButton
          >
        </template>
        Hello <strong>World!</strong>
      </BPopover>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const model = ref(false)
</script>
```

To make the popover shown on initial render, simply add prop `show` to `<BPopover>`:

Button

Popover

I start **open**

HTML StackBlitz

template

```
<template>
  <div class="text-center">
    <BPopover
      show
      title="Popover"
    >
      <template #target>
        <BButton variant="primary">Button</BButton>
      </template>
      I start <strong>open</strong>
    </BPopover>
  </div>
</template>
```

Popovers can also be controlled via [Exposed functions](#exposed-functions).

## Delay [​](#delay)

You can control the delay for showing and hiding popovers using the `delay` prop. It accepts either a number (in milliseconds) that applies to both show and hide, or an object with separate `show` and `hide` values.

Hover with delay

Delayed Popover

This popover has a 500ms show delay and 100ms hide delay

HTML StackBlitz

template

```
<div class="d-flex gap-2">
  <BPopover
    hover
    :delay="{show: 500, hide: 100}"
    title="Delayed Popover"
  >
    <template #target>
      <BButton variant="primary">Hover with delay</BButton>
    </template>
    This popover has a 500ms show delay and 100ms hide delay
  </BPopover>
</div>
```

## Boundary [​](#boundary)

The `boundary` prop determines the container that constrains the popover visually. The `boundary-padding` prop specifies the minimum distance (in pixels) between the popover and the boundary edges.

Scroll to see boundary

Constrained Popover

This popover is constrained within its scrollable container

HTML StackBlitz

vue

```
<template>
  <div
    ref="container"
    class="overflow-auto border"
    style="height: 200px; width: 100%"
  >
    <div style="height: 400px; padding: 100px">
      <BPopover
        hover
        boundary="clippingAncestors"
        :boundary-padding="10"
        title="Constrained Popover"
      >
        <template #target>
          <BButton variant="primary">Scroll to see boundary</BButton>
        </template>
        This popover is constrained within its scrollable container
      </BPopover>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const container = ref<HTMLElement>()
</script>
```

Valid `boundary` values include:

-   `'clippingAncestors'` (default) - constrained by scrollable ancestors
-   `'viewport'` - constrained by the browser viewport
-   An HTML element reference - constrained by a specific element

## Close on Hide [​](#close-on-hide)

The `close-on-hide` prop can be used to have the popover automatically close when the target is scrolled out of view. The `boundary` and `boundary-padding` props can be used to control what's considered clipping.

Click me. Popover closes when clipped

Scroll me out of view

This popover gets hidden by the top nav

Scroll me out of view

HTML StackBlitz

vue

```
<template>
  <div class="d-flex gap-2">
    <BPopover
      :click="true"
      :close-on-hide="true"
      :delay="{show: 0, hide: 0}"
    >
      <template #target>
        <BButton>Click me. Popover closes when clipped</BButton>
      </template>
      Scroll me out of view
    </BPopover>
    <BPopover
      :click="true"
      :close-on-hide="true"
      :delay="{show: 0, hide: 0}"
      :boundary-padding="{top: navHeight}"
    >
      <template #title>Scroll me out of view</template>
      <template #target>
        <BButton>This popover gets hidden by the top nav</BButton>
      </template>
    </BPopover>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'

const navRef = ref<Element>()
onMounted(() => {
  navRef.value = document.body.querySelector('#app > nav') ?? undefined
})
const navHeight = computed(() => navRef.value?.clientHeight)
</script>
```

## Disabled State [​](#disabled-state)

You can programmatically disable a popover using `v-model` combined with the `manual` prop. When disabled (manual mode), the popover will not respond to trigger events, but can still be controlled programmatically.

Enabled Popover

Controlled Popover

Hello **World!**

Disable Popover Toggle Visibility

HTML StackBlitz

vue

```
<template>
  <div class="d-flex flex-column gap-3 align-items-start">
    <BPopover
      v-model:show="showPopover"
      :manual="isDisabled"
      title="Controlled Popover"
    >
      <template #target>
        <BButton variant="primary">{{ isDisabled ? 'Disabled' : 'Enabled' }} Popover</BButton>
      </template>
      Hello <strong>World!</strong>
    </BPopover>

    <div class="d-flex gap-2">
      <BButton @click="toggleDisabled"> {{ isDisabled ? 'Enable' : 'Disable' }} Popover </BButton>
      <BButton
        :disabled="isDisabled"
        @click="toggleShow"
      >
        Toggle Visibility
      </BButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const isDisabled = ref(false)
const showPopover = ref(false)

const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value
}

const toggleShow = () => {
  showPopover.value = !showPopover.value
}
</script>
```

## Exposed functions [​](#exposed-functions)

`BPopover` exposes functions through template refs. See the [Component Reference Exposed section](#comp-reference-bpopover-exposed) for details.

I have a popover

ShowHideToggle

Popover

Hello **World!**

HTML StackBlitz

vue

```
<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <BButton
        id="popover-expose"
        variant="primary"
        >I have a popover</BButton
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

      <BPopover
        ref="myPopover"
        v-model="model"
        target="popover-expose"
        title="Popover"
      >
        Hello <strong>World!</strong>
      </BPopover>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, useTemplateRef} from 'vue'
import {BPopover} from 'bootstrap-vue-next/components/BPopover'

const myPopover = useTemplateRef('myPopover')
const show = () => myPopover.value?.show()
const hide = () => myPopover.value?.hide()
const toggle = () => myPopover.value?.toggle()
const model = ref(false)
</script>
```

## Interactive Content [​](#interactive-content)

You can create popovers with interactive content such as forms and buttons. When using interactive content:

-   Use the `click` trigger (avoid `hover` or `focus` triggers)
-   Keep interactive content minimal for better mobile experience
-   Manage focus properly - move focus into the popover when shown and return it when hidden
-   Consider using `<BModal>` for complex interactive content with extensive form controls

Interactive Popover

Interactive Content×

Name

This field is required

Enter your name

Color\- Choose 1 -RedGreenBlue

This field is required

Pick a color

CancelOk

HTML StackBlitz

vue

```
<template>
  <div class="d-flex flex-column gap-3 align-items-start">
    <BPopover
      v-model="showPopover"
      click
      title="Interactive Content"
      @show="onShow"
      @shown="onShown"
      @hidden="onHidden"
    >
      <template #target>
        <BButton
          ref="targetButton"
          variant="primary"
        >
          Interactive Popover
        </BButton>
      </template>

      <template #title>
        <div class="d-flex justify-content-between align-items-center">
          <span>Interactive Content</span>
          <BButton
            variant="link"
            class="text-decoration-none p-0 text-white"
            aria-label="Close"
            @click="onClose"
          >
            <span aria-hidden="true">&times;</span>
          </BButton>
        </div>
      </template>

      <div>
        <BFormGroup
          label="Name"
          label-for="popover-input-1"
          :state="input1State"
          class="mb-2"
          description="Enter your name"
          invalid-feedback="This field is required"
        >
          <BFormInput
            id="popover-input-1"
            ref="input1Ref"
            v-model="input1"
            :state="input1State"
            size="sm"
          />
        </BFormGroup>

        <BFormGroup
          label="Color"
          label-for="popover-input-2"
          :state="input2State"
          class="mb-2"
          description="Pick a color"
          invalid-feedback="This field is required"
        >
          <BFormSelect
            id="popover-input-2"
            v-model="input2"
            :state="input2State"
            :options="options"
            size="sm"
          />
        </BFormGroup>

        <BAlert
          v-if="input1 || input2"
          variant="info"
          class="small mb-2"
        >
          <strong>Current Values:</strong><br />
          Name: <strong>{{ input1 || '(empty)' }}</strong
          ><br />
          Color: <strong>{{ input2 || '(empty)' }}</strong>
        </BAlert>

        <div class="d-flex gap-2">
          <BButton
            size="sm"
            variant="secondary"
            @click="onClose"
            >Cancel</BButton
          >
          <BButton
            size="sm"
            variant="primary"
            @click="onOk"
            >Ok</BButton
          >
        </div>
      </div>
    </BPopover>

    <BCard
      v-if="input1Return && input2Return"
      title="Returned values:"
      class="mt-3"
    >
      <BCardText>
        Name: <strong>{{ input1Return }}</strong
        ><br />
        Color: <strong>{{ input2Return }}</strong>
      </BCardText>
    </BCard>
  </div>
</template>

<script setup lang="ts">
import {nextTick, ref} from 'vue'
import {BButton} from 'bootstrap-vue-next/components/BButton'

interface SelectOption {
  text: string
  value: string
}

const showPopover = ref(false)
const input1 = ref('')
const input2 = ref<string>('')
const input1State = ref<boolean | null>(null)
const input2State = ref<boolean | null>(null)
const input1Return = ref('')
const input2Return = ref('')

const input1Ref = ref<HTMLInputElement>()
const targetButton = ref<InstanceType<typeof BButton>>()

const options: SelectOption[] = [
  {text: '- Choose 1 -', value: ''},
  {text: 'Red', value: 'Red'},
  {text: 'Green', value: 'Green'},
  {text: 'Blue', value: 'Blue'},
]

const onClose = () => {
  showPopover.value = false
}

const onOk = () => {
  input1State.value = !!input1.value
  input2State.value = !!input2.value

  if (input1.value && input2.value) {
    input1Return.value = input1.value
    input2Return.value = input2.value
    onClose()
  }
}

const onShow = () => {
  // Reset form variables
  input1.value = ''
  input2.value = ''
  input1State.value = null
  input2State.value = null
  input1Return.value = ''
  input2Return.value = ''
}

const onShown = () => {
  // Focus the first input
  nextTick(() => {
    input1Ref.value?.focus()
  })
}

const onHidden = () => {
  // Return focus to the button
  nextTick(() => {
    targetButton.value?.$el?.focus()
  })
}
</script>
```

Important

The maximum width of popovers is constrained by Bootstrap's CSS (276px by default). For more complex interactive forms with multiple controls, consider using a modal dialog instead.

## Accessibility [​](#accessibility)

For information on managing ARIA attributes for popover triggers, see the [ARIA Trigger Registration for Component Visibility](/bootstrap-vue-next/docs/reference/accessibility.html#aria-trigger-registration-for-component-visibility) section in the Accessibility reference.

### Making popovers work for keyboard and assistive technology users [​](#making-popovers-work-for-keyboard-and-assistive-technology-users)

To allow keyboard users to activate your popovers, you should only add them to HTML elements that are traditionally keyboard-focusable and interactive (such as links or form controls). Although arbitrary HTML elements (such as `<span>`s) can be made focusable by adding the `tabindex="0"` attribute, this will add potentially annoying and confusing tab stops on non-interactive elements for keyboard users. Most assistive technologies currently do not announce the popover's content in this situation.

Additionally, do not rely solely on `hover` as the trigger for your popovers, as this will make them impossible to trigger for keyboard users.

### Content Considerations [​](#content-considerations)

The content displayed in popovers is tied to the trigger element with the `aria-describedby` attribute. As a result, the entirety of the popover's content will be announced to assistive technology users as one long, uninterrupted stream. Keep content concise and well-structured.

When including interactive controls (such as form elements or links) in popovers, be aware that:

-   Keyboard focus remains on the triggering element when the popover opens
-   The popover may not immediately follow the trigger in the document's tab order
-   Moving forward with Tab may not move a keyboard user into the popover
-   Interactive controls may be unreachable for keyboard users

**For complex interactive content, use `<BModal>` instead of popovers** to ensure proper keyboard navigation and focus management.

Note

The animation effect of popovers is dependent on the `prefers-reduced-motion` media query. See the [reduced motion section of our accessibility documentation](/bootstrap-vue-next/docs/reference/accessibility.html) for additional details.

## Component Reference

### `<BPopover>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BPopover/BPopover.vue)

-   [<BPopover> Properties](#comp-reference-bpopover-properties)
-   [<BPopover> Events](#comp-reference-bpopover-events)
-   [<BPopover> Slots](#comp-reference-bpopover-slots)
-   [<BPopover> Exposed](#comp-reference-bpopover-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.tooltip, .popover`

##### [Properties](#comp-reference-bpopover-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| body | `string` | `undefined` | Text to place in the body of the popover |
| body-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the body |
| boundary | `Boundary | RootBoundary` | `'clippingAncestors'` | The boundary constraint of the popover: members of \`Boundary\` and \`RootBoundary\`. |
| boundary-padding | `Padding` | `undefined` | The popover will try and stay away from the edge of the boundary element by the number of pixels specified |
| click | `boolean` | `false` | show/hide the popover on click of the target element (default is hover/focus) |
| close-on-hide | `boolean` | `false` | When \`noAutoClose\` is set, this prop will close the popover when the target is hidden |
| delay | `number | { show: number; hide: number }` | `'() => {show: 100, hide: 300})'` | Value for the show and hide delay. Applies to both show and hide when specified as a number or string. Use object form to set show and hide delays individually |
| floating-middleware | `Middleware[]` | `undefined` | Directly set the floating-ui middleware behavior. See above for details. |
| focus | `boolean` | `undefined` | Enable/disable focus trigger. See \[Triggers\](#triggers) for details. |
| hide-margin | `number` | `0` | The margin to apply when hiding the popover on pointer leave (how far the pointer can move off the target before hiding the popover) |
| hover | `boolean` | `undefined` | Enable/disable hover trigger. See \[Triggers\](#triggers) for details. |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| initial-animation | `boolean` | `false` | When set, enables the initial animation on mount |
| inline | `boolean` | `false` | Improves positioning for inline reference elements that span over multiple lines (from floating-ui). |
| lazy | `boolean` | `false` | When set, the content will not be mounted until opened |
| manual | `boolean` | `false` | Disables all triggers. Use programmatic API to show/hide the popover |
| model-value | `boolean` | `false` | Controls the visibility of the component |
| no-animation | `boolean` | `false` | When set, disables the animation |
| no-auto-close | `boolean` | `false` | Disables automatic closing on click outside or scroll out of view. Overrides \`close-on-hide\` |
| no-fade | `boolean` | `false` | Alias for \`noAnimation\` |
| no-flip | `boolean` | `false` | Disables the automatic flipping of the popover when it goes out of view. |
| no-hide | `boolean` | `false` | Overrides the default behavior of hiding the popover based on boundary & rootBoundary. |
| no-shift | `boolean` | `false` | Disables the automatic shifting of the popover to keep it in view. |
| no-size | `boolean` | `false` | Disables the automatic sizing of the popover to fit the clipping region. |
| noninteractive | `boolean` | `false` | Make popover noninteractive. Interactive popover can be hovered/focused without it closing. |
| offset | `Numberish | null` | `null` | Offset of the popover, how many pixels away from the target the popover is. If null it's translated to the size of the arrow in bootstrap css. |
| placement | `PopoverPlacement` | `'top'` | Placement of a floating element |
| realtime | `boolean` | `false` | Whether to update the position of the floating element on every animation frame if required. Very cpu intensive, the default is to listen to browser events. |
| reference | `string | ComponentPublicInstance | HTMLElement | null` | `null` | The reference element to which the popover is anchored. If not specified, the popover will be positioned relative to the target element. |
| show | `boolean` | `false` | When set, and prop 'visible' is false on mount, will animate from closed to open on initial mount. Mainly to help with template show. Use model-value for reactive show/hide |
| strategy | `Strategy` | `'absolute'` |  |
| target | `string | ComponentPublicInstance | HTMLElement | null` | `null` | The trigger element to invoke the popover as well as the reference element to which the popover is anchored, unless \`reference\` is defined. |
| teleport-disabled | `boolean` | `false` | Renders the popover in the exact place it was defined |
| teleport-to | `string | RendererElement | null | undefined` | `undefined` | Overrides the default teleport location |
| title | `string` | `undefined` | Text content to place in the title |
| title-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the title |
| tooltip | `boolean` | `false` | The popover is rendered as a tooltip (used internally by BTooltip) |
| trans-props | `TransitionProps` | `undefined` | Transition properties |
| unmount-lazy | `boolean` | `false` | When set and \`lazy\` is true, the content will be unmounted when closed |
| visible | `boolean` | `false` | When 'true', open without animation |

##### [Events](#comp-reference-bpopover-events)

| Event | Args | Description |
| --- | --- | --- |
| blur | 
`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the target element loses focus. |
| click | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the popover is hidden by a click on the trigger element. |
| click-outside | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the mouse is clicked outside the popover. |
| close-on-hide | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the popover is closed due to being clipped. |
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

`value``: boolean` - New visibility state of the popover.

 | Emitted when the visibility of the popover changes. |

##### [Slots](#comp-reference-bpopover-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default | 
`id``: string` - Unique ID for the component

`show``: () => void` - Function to show the component

`hide``: (trigger?: string, noTriggerEmit?: boolean) => void` - Function to hide the component. \`trigger\` is the trigger that caused the hide. \`noTriggerEmit\` prevents the emit of the trigger event.

`toggle``: () => void` - Function to toggle the component visibility

`active``: boolean` - Indicates if the component is active (starting show, before/after animations)

`visible``: boolean` - Indicates if the component is visible (shown)

 | Content for the popover body. |
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

 | Content for the popover title. |

##### [Exposed](#comp-reference-bpopover-exposed)

| Name | Type | Description |
| --- | --- | --- |
| hide | `() => void` | Hides the popover |
| show | `() => void` | Shows the popover |
| toggle | `() => void` | Toggles the visibility of the popover |
