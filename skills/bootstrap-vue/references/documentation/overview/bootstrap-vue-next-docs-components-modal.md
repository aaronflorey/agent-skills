# Modal ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/modal.html

##### On this page

-   [Usage ​](#usage)
    
-   [Overview ​](#overview)
    
-   [Toggle modal visibility ​](#toggle-modal-visibility)
    -   [Using the v-model property ​](#using-the-v-model-property)
        
    -   [Using the vBModal directive ​](#using-the-vbmodal-directive)
        
    -   [Using exposed methods ​](#using-exposed-methods)
        
    -   [Using the useToggle composable ​](#using-the-usetoggle-composable)
        
    -   [Using scoped slot scope methods ​](#using-scoped-slot-scope-methods)
        
-   [Prevent Closing ​](#prevent-closing)
    
-   [Events ​](#events)
    -   [Visibility Events ​](#visibility-events)
        
    -   [Action Events ​](#action-events)
        
-   [Modal content ​](#modal-content)
    -   [Using the grid ​](#using-the-grid)
        
    -   [Tooltips and popovers ​](#tooltips-and-popovers)
        
-   [Teleport and rendering ​](#teleport-and-rendering)
    
-   [Styling, options, and customization ​](#styling-options-and-customization)
    -   [Modal sizing ​](#modal-sizing)
        
    -   [Scrolling long content ​](#scrolling-long-content)
        
    -   [Vertically centered modal ​](#vertically-centered-modal)
        
    -   [Variants ​](#variants)
        
    -   [Hiding the backdrop ​](#hiding-the-backdrop)
        
    -   [Disable open and close animation ​](#disable-open-and-close-animation)
        
    -   [Footer button sizing ​](#footer-button-sizing)
        
    -   [Disabling built-in footer buttons ​](#disabling-built-in-footer-buttons)
        
    -   [Custom rendering with slots ​](#custom-rendering-with-slots)
        -   [Example modal using custom scoped slots ​](#example-modal-using-custom-scoped-slots)
            
-   [Multiple Modal Support ​](#multiple-modal-support)
    -   [Modal Stacking Behavior ​](#modal-stacking-behavior)
        
    -   [Stacking CSS Variables ​](#stacking-css-variables)
        
-   [Programmatically Control ​](#programmatically-control)
    -   [Programmatically Create Modals ​](#programmatically-create-modals)
        
    -   [Modal message boxes ​](#modal-message-boxes)
        
-   [Accessibility ​](#accessibility)
    -   [Modal ARIA attributes ​](#modal-aria-attributes)
        
    -   [Auto focus on open ​](#auto-focus-on-open)
        
    -   [Returning focus to the triggering element ​](#returning-focus-to-the-triggering-element)
        
    -   [Keyboard navigation ​](#keyboard-navigation)
        
    -   [Focus Management ​](#focus-management)
        
-   [Component Reference](#component-reference)
    -   [<BModal>](#b-modal)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            

# Modal [​](#modal)

Modals are streamlined, but flexible dialog prompts. They support a number of use cases from user notification to completely custom content and feature a handful of helpful sub-components, sizes, variants, accessibility, and more.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BModal/BModal.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/modal.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bmodal)

## Usage [​](#usage)

Toggle modal

HTML StackBlitz

vue

```
<template>
  <BButton @click="modal = !modal"> Toggle modal </BButton>
  <BModal
    v-model="modal"
    title="Hello, World!"
  >
    Foobar?
  </BModal>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const modal = ref(false)
</script>
```

## Overview [​](#overview)

`<BModal>`, by default, has an **OK** and **Cancel** buttons in the footer. These buttons can be customized by setting various props on the component. You can customize the size of the buttons, disable buttons, hide the **Cancel** button (i.e. `ok-only`), choose a variant (e.g. `danger` for a red OK button) using the `ok-variant` and `cancel-variant` props, and provide custom button content using the `ok-title` and `cancel-title` props, or using the named slots `ok` and `cancel`.

`<BModal>` supports close on ESC (enabled by default), close on backdrop click (enabled by default), and the `X` close button in the header (enabled by default). These features may be disabled by setting the props `no-close-on-esc`, `no-close-on-backdrop`, and `no-header-close` respectively.

You can override the modal title via the named slot `title`, override the header completely via the `header` slot, and override the footer completely via the `footer` slot.

**Note**: when using the `footer` slot, the default **OK** and **Cancel** buttons will not be present. Also, if you use the `header` slot, the default header `X` close button will not be present, nor can you use the `title` slot.

Modals will not render their content in the document until they are shown (lazily rendered). Modals, when visible, are rendered **appended to the `<body>` element** via Vue's `<Teleport>` component. The placement of the `<BModal>` component will not affect layout, as it always renders as a placeholder comment node (`<!---->`). You can render modals in-place by setting the `teleportDisabled` prop to `true`.

## Toggle modal visibility [​](#toggle-modal-visibility)

There are several methods that you can employ to toggle the visibility of `<BModal>`.

### Using the `v-model` property [​](#using-the-v-model-property)

Toggle modal via Model

HTML StackBlitz

vue

```
<template>
  <BButton @click="modal = !modal"> Toggle modal via Model </BButton>
  <BModal
    v-model="modal"
    title="Hello, World!"
  >
    Foobar?
  </BModal>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const modal = ref(false)
</script>
```

### Using the `vBModal` directive [​](#using-the-vbmodal-directive)

Show ModalShow Modal

HTML StackBlitz

vue

```
<template>
  <div>
    <div class="d-flex gap-2">
      <!-- Using modifiers -->
      <BButton v-b-modal.directive-modal>Show Modal</BButton>

      <!-- Using value -->
      <BButton v-b-modal="'directive-modal'">Show Modal</BButton>
    </div>
    <!-- The modal -->
    <BModal id="directive-modal">Hello From My Modal!</BModal>
  </div>
</template>

<script setup lang="ts">
import {vBModal} from 'bootstrap-vue-next/directives/BModal'
</script>
```

### Using exposed methods [​](#using-exposed-methods)

You can control the modal programmatically using template ref methods. See the [Component Reference Exposed section](#comp-reference-bmodal-exposed) for available methods.

Open ModalToggle Modal

HTML StackBlitz

vue

```
<template>
  <div>
    <div class="d-flex gap-2">
      <BButton
        id="show-btn"
        @click="show"
        >Open Modal</BButton
      >
      <BButton
        id="toggle-btn"
        @click="toggle"
        >Toggle Modal</BButton
      >
    </div>
    <BModal
      ref="my-modal"
      no-footer
      title="Using Component Methods"
    >
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
      <div class="d-flex justify-content-center gap-2 mt-3">
        <BButton
          variant="outline-danger"
          block
          @click="hide"
          >Close Me</BButton
        >
        <BButton
          variant="outline-warning"
          block
          @click="toggle"
          >Toggle Me</BButton
        >
      </div>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import {useTemplateRef} from 'vue'
import {BModal} from 'bootstrap-vue-next/components/BModal'
import {type ComponentExposed} from 'vue-component-type-helpers'

const myModal = useTemplateRef<ComponentExposed<typeof BModal>>('my-modal')
const show = () => myModal.value?.show()
const hide = () => myModal.value?.hide()
const toggle = () => myModal.value?.toggle()
</script>
```

### Using the `useToggle` composable [​](#using-the-usetoggle-composable)

Click me

HTML StackBlitz

vue

```
<template>
  <BButton @click="show()">Click me</BButton>
  <BModal
    id="toggle-modal"
    title="Modal Controlled by useToggle"
  >
    <BButton @click="hide()">Hide me</BButton>
  </BModal>
</template>

<script setup lang="ts">
import {useToggle} from 'bootstrap-vue-next'

const {show, hide} = useToggle('toggle-modal')
</script>
```

### Using scoped slot scope methods [​](#using-scoped-slot-scope-methods)

Refer to the [Custom rendering with slots](#custom-rendering-with-slots) section on using the various methods passed to scoped slots for closing modals.

## Prevent Closing [​](#prevent-closing)

It is possible to prevent showing/closing modals. You can prevent hiding on the following Events: ok, cancel, close, and hide.

Toggle modal

HTML StackBlitz

vue

```
<template>
  <BButton @click="preventableModal = !preventableModal"> Toggle modal </BButton>

  <BModal
    v-model="preventableModal"
    title="Hello, World!"
    @hide="preventFn"
  >
    Foobar?
    <BFormCheckbox v-model="preventModal">Prevent close</BFormCheckbox>
  </BModal>
</template>

<script setup lang="ts">
import type {BvTriggerableEvent} from 'bootstrap-vue-next'
import {ref} from 'vue'

const preventableModal = ref(false)
const preventModal = ref(true)
const preventFn = (e: BvTriggerableEvent) => {
  if (preventModal.value) e.preventDefault()
}
</script>
```

## Events [​](#events)

BootstrapVueNext emits several events during the modal lifecycle. The main events are:

### Visibility Events [​](#visibility-events)

-   `show` - Emitted when the modal is about to be shown
-   `shown` - Emitted after the modal has been shown and transitions completed
-   `hide` - Emitted when the modal is about to be hidden
-   `hidden` - Emitted after the modal has been hidden and transitions completed
-   `show-prevented` - Emitted when show was prevented
-   `hide-prevented` - Emitted when hide was prevented
-   `toggle` - Emitted when the modal visibility is toggled
-   `toggle-prevented` - Emitted when toggle was prevented

### Action Events [​](#action-events)

-   `ok` - Emitted when the default **OK** button is clicked
-   `cancel` - Emitted when the default **Cancel** button is clicked
-   `close` - Emitted when the header close (**X**) button is clicked
-   `backdrop` - Emitted when the backdrop is clicked
-   `esc` - Emitted when the Esc key is pressed

All events receive a `BvTriggerableEvent` object with the following properties:

| Property or Method | Type | Description |
| --- | --- | --- |
| `preventDefault()` | Method | When called prevents the modal from closing |
| `trigger` | Property | Will be one of: `ok`, `cancel`, `close`, `esc`, `backdrop`, or the argument passed to the `hide()` method. For visibility events (`show`, `hide`, etc.), this indicates what triggered the action. |
| `target` | Property | A reference to the modal element |
| `componentId` | Property | The modal's ID |
| `cancelable` | Property | Whether the event can be cancelled |
| `defaultPrevented` | Property | Whether `preventDefault()` has been called |

You can set the value of `trigger` by passing an argument to the component's `hide()` method for advanced control (i.e. detecting what button or action triggered the modal to hide).

NOTE

Action events (`ok`, `cancel`, `close`) are only emitted when the corresponding built-in buttons are clicked. If you provide custom buttons via slots, these events will not be emitted automatically - use the `hide` event instead.

## Modal content [​](#modal-content)

### Using the grid [​](#using-the-grid)

Utilize the Bootstrap grid system within a modal by nesting `<BContainer fluid>` within the modal body. Then, use the normal grid system `<BRow>` and `<BCol>` as you would anywhere else.

### Tooltips and popovers [​](#tooltips-and-popovers)

Tooltips and popovers can be placed within modals as needed. When modals are closed, any tooltips and popovers within are also automatically dismissed. Tooltips and popovers are automatically appended to the modal element (to ensure correct z-indexing), although you can override where they are appended by specifying a `teleportTo` target (refer to tooltip and popover docs for details).

Show Modal

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton v-b-modal.modal-popover>Show Modal</BButton>

    <BModal
      id="modal-popover"
      title="Modal with Popover"
      ok-only
    >
      <p>
        This
        <BButton
          v-b-popover="'Popover inside a modal!'"
          title="Popover"
          >Button</BButton
        >
        triggers a popover on click.
      </p>
      <p>
        This
        <a
          v-b-tooltip
          href="#modal-popover"
          title="Tooltip in a modal!"
          >Link</a
        >
        will show a tooltip on hover.
      </p>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import {vBModal} from 'bootstrap-vue-next/directives/BModal'
import {vBPopover} from 'bootstrap-vue-next/directives/BPopover'
import {vBTooltip} from 'bootstrap-vue-next/directives/BTooltip'
</script>
```

## Teleport and rendering [​](#teleport-and-rendering)

By default, modals are rendered via Vue's `<Teleport>` component and appended to the `<body>` element. This ensures proper z-indexing and prevents layout issues. The `<BModal>` component itself renders as a placeholder comment node (`<!---->`) in its original DOM position.

You can control where modals are teleported using the `teleportTo` prop, or disable teleporting entirely with `teleportDisabled`. When teleporting is disabled, the modal will render in-place within your component tree, which may affect layout and z-indexing.

Note

The `static` prop from BootstrapVue is not implemented in BootstrapVueNext. Use `teleportDisabled` to render modals in-place if needed.

## Styling, options, and customization [​](#styling-options-and-customization)

### Modal sizing [​](#modal-sizing)

Modals have three optional sizes, available via the prop `size`. These sizes kick in at certain breakpoints to avoid horizontal scrollbars on narrower viewports. Valid optional sizes are `sm`, `lg`, and `xl`.

xl modallg modalsm modal

HTML StackBlitz

vue

```
<template>
  <div>
    <div class="d-flex gap-2 mb-3">
      <BButton
        v-b-modal.modal-xl
        variant="primary"
        >xl modal</BButton
      >
      <BButton
        v-b-modal.modal-lg
        variant="primary"
        >lg modal</BButton
      >
      <BButton
        v-b-modal.modal-sm
        variant="primary"
        >sm modal</BButton
      >
    </div>

    <BModal
      id="modal-xl"
      size="xl"
      title="Extra Large Modal"
      >Hello Extra Large Modal!</BModal
    >
    <BModal
      id="modal-lg"
      size="lg"
      title="Large Modal"
      >Hello Large Modal!</BModal
    >
    <BModal
      id="modal-sm"
      size="sm"
      title="Small Modal"
      >Hello Small Modal!</BModal
    >
  </div>
</template>

<script setup lang="ts">
import {vBModal} from 'bootstrap-vue-next/directives/BModal'
</script>
```

The `size` prop maps the size to the `.modal-<size>` classes.

### Scrolling long content [​](#scrolling-long-content)

When modals become too long for the user's viewport or device, they scroll independent of the page itself. Try the demo below to see what we mean.

Launch overflowing modal

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton v-b-modal.modal-tall>Launch overflowing modal</BButton>

    <BModal
      id="modal-tall"
      title="Overflowing Content"
    >
      <p
        v-for="i in 20"
        :key="i"
        class="my-4"
      >
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      </p>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import {vBModal} from 'bootstrap-vue-next/directives/BModal'
</script>
```

You can also create a scrollable modal that allows the scrolling of the modal body by setting the prop `scrollable` to `true`.

Launch scrolling modal

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton v-b-modal.modal-scrollable>Launch scrolling modal</BButton>

    <BModal
      id="modal-scrollable"
      scrollable
      title="Scrollable Content"
    >
      <p
        v-for="i in 20"
        :key="i"
        class="my-4"
      >
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      </p>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import {vBModal} from 'bootstrap-vue-next/directives/BModal'
</script>
```

### Vertically centered modal [​](#vertically-centered-modal)

Vertically center your modal in the viewport by setting the `centered` prop.

Launch centered modal

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton v-b-modal.modal-center>Launch centered modal</BButton>

    <BModal
      id="modal-center"
      centered
      title="BootstrapVue"
    >
      <p class="my-4">Vertically centered modal!</p>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import {vBModal} from 'bootstrap-vue-next/directives/BModal'
</script>
```

Feel free to mix vertically `centered` with `scrollable`.

### Variants [​](#variants)

Control the header, footer, and body background and text variants by setting the `header-bg-variant`, `header-text-variant`, `body-bg-variant`, `body-text-variant`, `footer-bg-variant`, and `footer-text-variant` props. Use any of the standard Bootstrap variants such as `danger`, `warning`, `info`, `success`, `dark`, `light`, etc.

The variants for the bottom border of the header and top border of the footer can be controlled by the `header-border-variant` and `footer-border-variant` props respectively.

Show Modal

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton
      variant="primary"
      @click="show = true"
      >Show Modal</BButton
    >

    <BModal
      v-model="show"
      title="Modal Variants"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-text-variant="footerTextVariant"
    >
      <BContainer fluid>
        <BRow class="mb-1 text-center">
          <BCol cols="3" />
          <BCol>Background</BCol>
          <BCol>Text</BCol>
        </BRow>

        <BRow class="mb-1">
          <BCol cols="3">Header</BCol>
          <BCol>
            <BFormSelect
              v-model="headerBgVariant"
              :options="bgVariants"
            />
          </BCol>
          <BCol>
            <BFormSelect
              v-model="headerTextVariant"
              :options="textVariants"
            />
          </BCol>
        </BRow>

        <BRow class="mb-1">
          <BCol cols="3">Body</BCol>
          <BCol>
            <BFormSelect
              v-model="bodyBgVariant"
              :options="bgVariants"
            />
          </BCol>
          <BCol>
            <BFormSelect
              v-model="bodyTextVariant"
              :options="textVariants"
            />
          </BCol>
        </BRow>

        <BRow>
          <BCol cols="3">Footer</BCol>
          <BCol>
            <BFormSelect
              v-model="footerBgVariant"
              :options="bgVariants"
            />
          </BCol>
          <BCol>
            <BFormSelect
              v-model="footerTextVariant"
              :options="textVariants"
            />
          </BCol>
        </BRow>
      </BContainer>

      <template #footer>
        <div class="w-100">
          <p class="float-start">Modal Footer Content</p>
          <BButton
            variant="primary"
            size="sm"
            class="float-end"
            @click="show = false"
          >
            Close
          </BButton>
        </div>
      </template>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const show = ref(false)

const bgVariants = [
  {value: null, text: 'None'},
  {value: 'primary', text: 'Primary'},
  {value: 'secondary', text: 'Secondary'},
  {value: 'success', text: 'Success'},
  {value: 'warning', text: 'Warning'},
  {value: 'danger', text: 'Danger'},
  {value: 'info', text: 'Info'},
  {value: 'light', text: 'Light'},
  {value: 'dark', text: 'Dark'},
] as const

const textVariants = [
  {value: null, text: 'None'},
  {value: 'primary', text: 'Primary'},
  {value: 'secondary', text: 'Secondary'},
  {value: 'success', text: 'Success'},
  {value: 'warning', text: 'Warning'},
  {value: 'danger', text: 'Danger'},
  {value: 'info', text: 'Info'},
  {value: 'light', text: 'Light'},
  {value: 'dark', text: 'Dark'},
  {value: 'white', text: 'White'},
  {value: 'body', text: 'Body'},
] as const

type BgVariant = (typeof bgVariants)[number]['value']
type TextVariant = (typeof textVariants)[number]['value']

const headerBgVariant = ref<BgVariant>('dark')
const headerTextVariant = ref<TextVariant>('white')
const bodyBgVariant = ref<BgVariant>('light')
const bodyTextVariant = ref<TextVariant>('dark')
const footerBgVariant = ref<BgVariant>('warning')
const footerTextVariant = ref<TextVariant>('dark')
</script>
```

You can also apply arbitrary classes to the modal dialog container, content (modal window itself), header, body and footer via the `modal-class`, `content-class`, `header-class`, `body-class` and `footer-class` props, respectively. The props accept either a string or array of strings.

### Hiding the backdrop [​](#hiding-the-backdrop)

Hide the modal's backdrop via setting the `no-backdrop` prop.

Open modal

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton v-b-modal.modal-no-backdrop>Open modal</BButton>

    <BModal
      id="modal-no-backdrop"
      no-backdrop
      content-class="shadow"
      title="BootstrapVue"
    >
      <p class="my-2">
        We've added the utility class <code>'shadow'</code>
        to the modal content for added effect.
      </p>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import {vBModal} from 'bootstrap-vue-next/directives/BModal'
</script>
```

Note that clicking outside of the modal will still close the modal even though the backdrop is hidden. You can disable this behaviour by setting the `no-close-on-backdrop` prop on `<BModal>`.

### Disable open and close animation [​](#disable-open-and-close-animation)

To disable the fading transition/animation when modal opens and closes, just set the prop `no-fade` on the `<BModal>` component.

### Footer button sizing [​](#footer-button-sizing)

Fancy smaller or larger buttons in the default footer? Simply set the `button-size` prop to `'sm'` for small buttons, or `'lg'` for larger buttons.

Small Footer ButtonsLarge Footer Buttons

HTML StackBlitz

vue

```
<template>
  <div>
    <div class="d-flex gap-2">
      <BButton v-b-modal.modal-footer-sm>Small Footer Buttons</BButton>
      <BButton v-b-modal.modal-footer-lg>Large Footer Buttons</BButton>
    </div>

    <BModal
      id="modal-footer-sm"
      title="BootstrapVue"
      button-size="sm"
    >
      <p class="my-2">This modal has small footer buttons</p>
    </BModal>

    <BModal
      id="modal-footer-lg"
      title="BootstrapVue"
      button-size="lg"
    >
      <p class="my-2">This modal has large footer buttons</p>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import {vBModal} from 'bootstrap-vue-next/directives/BModal'
</script>
```

The prop `button-size` has no effect if you have provided your own footer via the [`footer`](#custom-rendering-with-slots) slot.

### Disabling built-in footer buttons [​](#disabling-built-in-footer-buttons)

You can disable the built-in footer buttons programmatically.

You can disable the **Cancel** and **OK** buttons individually by setting the `cancel-disabled` and `ok-disabled` props, respectively, to `true`. Set the prop to `false` to re-enable the button.

To disable both **Cancel** and **OK** buttons at the same time, simply set the `busy` prop to `true`. Set it to `false` to re-enable both buttons.

### Custom rendering with slots [​](#custom-rendering-with-slots)

`<BModal>` provides several named slots (of which some are optionally scoped) that you can use to customize the content of various sections of the modal.

| Slot | Optionally Scoped | Description |
| --- | --- | --- |
| `default` | Yes | Main content of the modal |
| `title` | Yes | Content to place in the modal's title |
| `header` | Yes | Content to place in the header. Replaces the entire header including the close button |
| `footer` | Yes | Content to place in the footer. Replaces the entire footer including the button(s) |
| `ok` | Yes | Content to place inside the footer OK button |
| `cancel` | Yes | Content to place inside the footer CANCEL button |
| `header-close` | No | Content to place inside the header CLOSE (`x`) button |

The scope available to the slots that support optional scoping are:

| Method or Property | Description |
| --- | --- |
| `ok()` | Closes the modal and fires the `ok` and `hide` events, with `trigger = 'ok'` |
| `cancel()` | Closes the modal and fires the `cancel` and `hide` events, with `trigger = 'cancel'` |
| `close()` | Closes the modal and fires the `close` and `hide` events, with `trigger = 'close'` |
| `hide(trigger)` | Closes the modal and fires the `hide` event, with the `trigger = trigger` (trigger is optional) |
| `visible` | The visibility state of the modal. `true` if the modal is visible and `false` if not visible |

#### Example modal using custom scoped slots [​](#example-modal-using-custom-scoped-slots)

Open Modal

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton @click="show = true">Open Modal</BButton>

    <BModal v-model="show">
      <template #header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <BButton size="sm" variant="outline-danger" @click="close()"> Close Modal </BButton>
        <h5>Modal Header</h5>
      </template>

      <template #default="scope">
        <p>Modal Body with button</p>
        <BButton @click="scope.hide()">Hide Modal</BButton>
      </template>

      <template #footer="{ ok, cancel, hide }">
        <b>Custom Footer</b>
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <BButton size="sm" variant="success" @click="ok()"> OK </BButton>
        <BButton size="sm" variant="danger" @click="cancel()"> Cancel </BButton>
        <!-- Button with custom close trigger value -->
        <BButton size="sm" variant="outline-secondary" @click="hide('forget')"> Forget it </BButton>
      </template>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
```

## Multiple Modal Support [​](#multiple-modal-support)

BootstrapVueNext supports multiple modals opened at the same time with automatic stacking management.

To disable stacking for a specific modal, set the `no-stacking` prop on the `<BModal>` component. This will hide the modal before another modal is shown.

Open First Modal

HTML StackBlitz

vue

```
<template>
  <div class="stack-demo">
    <BButton @click="nestedModal1 = !nestedModal1">Open First Modal</BButton>

    <BModal
      v-model="nestedModal1"
      size="lg"
      title="First Modal"
      ok-only
      no-stacking
    >
      <p class="my-2">First Modal</p>
      <BButton @click="nestedModal2 = !nestedModal2">Open Second Modal</BButton>
    </BModal>

    <BModal
      v-model="nestedModal2"
      title="Second Modal"
      ok-only
    >
      <p class="my-2">Second Modal</p>
      <BButton
        size="sm"
        @click="nestedModal3 = !nestedModal3"
      >
        Open Third Modal
      </BButton>
    </BModal>

    <BModal
      v-model="nestedModal3"
      size="sm"
      title="Third Modal"
      ok-only
    >
      <p class="my-1">Third Modal</p>
      <BButton
        size="sm"
        @click="nestedModal4 = !nestedModal4"
      >
        Open Fourth Modal
      </BButton>
    </BModal>

    <BModal
      v-model="nestedModal4"
      size="sm"
      title="Fourth Modal"
      ok-only
    >
      <p class="my-1">Fourth Modal</p>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const nestedModal1 = ref(false)
const nestedModal2 = ref(false)
const nestedModal3 = ref(false)
const nestedModal4 = ref(false)
</script>

<style>
/* Modal stacking example styles */
.stack-demo .modal {
  --bs-modal-zindex: 1900;
  transform: translate(
    calc((var(--b-count, 0) - var(--b-position, 0)) * 20px),
    calc((var(--b-count, 0) - var(--b-position, 0)) * 20px)
  );
  transition:
    transform 0.5s,
    opacity 0.15s linear !important;
}
.stack-demo .modal:not(.stack-inverse-position-0) {
  opacity: calc(1 - ((var(--b-count, 0) - var(--b-position, 0)) * 0.1));
}
.stack-demo .modal-backdrop:not(.stack-inverse-position-0) {
  opacity: 0 !important;
}
</style>
```

### Modal Stacking Behavior [​](#modal-stacking-behavior)

-   **Automatic Z-Index Management**: BootstrapVueNext automatically manages z-index values for stacked modals
-   **CSS Variables**: The system uses CSS variables (`--b-count`, `--b-position`) for positioning and styling
-   **Visual Offset**: Each modal is slightly offset from the previous one for visual clarity
-   **Backdrop Management**: Only the topmost modal's backdrop is fully opaque

### Stacking CSS Variables [​](#stacking-css-variables)

BootstrapVueNext provides CSS variables that you can use to customize stacked modal appearance:

-   `--b-count`: Total number of active modals
-   `--b-position`: Position of the current modal in the stack (0-based)
-   `--b-inverse-position`: Inverse position for reverse calculations

**Notes:**

-   Avoid nesting a `<BModal>` _inside_ another `<BModal>`, as it may be constrained to the boundaries of the parent modal dialog
-   The backdrop opacity is automatically adjusted for better visual hierarchy
-   Use `no-stacking` prop to prevent a modal from participating in the stacking system

## Programmatically Control [​](#programmatically-control)

To programmatically control your modals with global state, refer to our documentation at [useModal](/bootstrap-vue-next/docs/composables/useModal.html)

### Programmatically Create Modals [​](#programmatically-create-modals)

To programmatically create modals, refer to the documentation at [useModal](/bootstrap-vue-next/docs/composables/useModal.html)

### Modal message boxes [​](#modal-message-boxes)

If you're looking for replacements for `$bvModal.msgBoxOk` and `$bvModal.msgBoxConfirm` please see the [migration guide](/bootstrap-vue-next/docs/migration-guide.html#replacement-for-modal-message-boxes)

## Accessibility [​](#accessibility)

`<BModal>` provides several accessibility features, including auto focus, return focus, keyboard (tab) _focus containment_, and automated `aria-*` attributes.

For information on managing ARIA attributes for modal triggers, see the [ARIA Trigger Registration for Component Visibility](/bootstrap-vue-next/docs/reference/accessibility.html#aria-trigger-registration-for-component-visibility) section in the Accessibility reference.

**Note:** The animation effect of this component is dependent on the `prefers-reduced-motion` media query. See the [reduced motion section of our accessibility documentation](/bootstrap-vue-next/docs/reference/accessibility.html) for additional details.

### Modal ARIA attributes [​](#modal-aria-attributes)

The `aria-labelledby` and `aria-describedby` attributes will appear on the modal automatically in most cases.

-   The `aria-labelledby` attribute will **not** be present if you have the header hidden, or supplied your own header, or have not supplied a modal title. It is recommended to supply a title for your modals (when using the built in header). You can visually hide the header title, but still make it available to screen readers by setting the `titleVisuallyHidden` prop.
-   The `aria-describedby` attribute will always point to the modal's body content.
-   For accessibility, you can provide additional ARIA attributes directly on the modal component using standard HTML attributes.

### Auto focus on open [​](#auto-focus-on-open)

`<BModal>` will autofocus the modal _container_ when opened.

You can pre-focus an element within the `<BModal>` by listening to the `<BModal>` `shown` event, and call the element's `focus()` method. `<BModal>` will not attempt to autofocus if an element already has focus within the `<BModal>`.

Launch demo modal

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton @click="modalShow = !modalShow">Launch demo modal</BButton>

    <BModal
      v-model="modalShow"
      title="BootstrapVueNext Modal"
      @shown="focusMyElement"
    >
      <div>
        <BButton>I Don't Have Focus</BButton>
      </div>

      <div>
        <BFormInput />
      </div>

      <div>
        <!-- Element to gain focus when modal is opened -->
        <BFormInput ref="focusThis" />
      </div>

      <div>
        <BFormInput />
      </div>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const modalShow = ref(false)
const focusThis = ref<HTMLElement>()

const focusMyElement = () => {
  focusThis.value?.focus()
}
</script>
```

Alternatively, if using `BForm*` form controls, you can use the `autofocus` prop to automatically focus a form control when the modal opens.

If you want to auto focus one of the _built-in_ modal buttons (`ok`, `cancel` or the header `close` button, you can set the prop `focus` to one of the values `'ok'`, `'cancel'` or `'close'` and `<BModal>` will focus the specified button if it exists.

**Note:** it is **not recommended** to autofocus an input or control inside of a modal for accessibility reasons, as screen reader users will not know the context of where the input is (the announcement of the modal may not be spoken). It is best to let `<b-modal>` focus the modal's container, allowing the modal information to be spoken to the user, and then allow the user to tab into the input.

### Returning focus to the triggering element [​](#returning-focus-to-the-triggering-element)

For accessibility reasons, it is desirable to return focus to the element that triggered the opening of the modal, when the modal closes.

`<BModal>` will automatically determine which element had focus before the modal was opened, and will return the focus to that element when the modal has hidden. This is handled automatically by the focus trap system unless `noTrap` is set to `true`.

### Keyboard navigation [​](#keyboard-navigation)

When tabbing through elements within a `<BModal>`, if focus attempts to leave the modal into the document, it will be brought back into the modal by the focus trap system.

Avoid setting `tabindex` on elements within the modal to any value other than `0` or `-1`. Doing so will make it difficult for people who rely on assistive technology to navigate and operate page content and can make some of your elements unreachable via keyboard navigation.

You can disable the focus trap feature completely by setting the `noTrap` prop to `true`, although this is _highly discouraged_ for accessibility reasons. When `noTrap` is enabled, focus management becomes manual and you'll need to handle focus return yourself.

### Focus Management [​](#focus-management)

BootstrapVueNext uses the `focus` prop to control initial focus behavior when the modal opens. You can:

-   Set `focus` to `'ok'`, `'cancel'`, or `'close'` to focus the respective built-in button
-   Set `focus` to an element reference, ID string, or CSS selector to focus a specific element
-   Set `focus` to `false` to prevent automatic focusing (not recommended for accessibility)
-   Leave `focus` undefined to use the default focus behavior (focuses the modal container)

## Component Reference

### `<BModal>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BModal/BModal.vue)

-   [<BModal> Properties](#comp-reference-bmodal-properties)
-   [<BModal> Events](#comp-reference-bmodal-events)
-   [<BModal> Slots](#comp-reference-bmodal-slots)
-   [<BModal> Exposed](#comp-reference-bmodal-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.modal`

##### [Properties](#comp-reference-bmodal-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| backdrop-first | `boolean` | `false` | Animates the backdrop before the modal and, on leave, animates the modal before the backdrop |
| body | `string` | `undefined` | The text content of the body |
| body-attrs | `Readonly<AttrsValue>` | `undefined` | Attributes to be applied to the body of the component |
| body-bg-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the body background |
| body-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the body |
| body-scrolling | `boolean` | `false` | Enables or disables scrolling the body while the modal is open |
| body-text-variant | `TextColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the body text |
| body-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the body |
| busy | `boolean` | `false` | Places the built-in default footer OK and Cancel buttons in a disabled state |
| button-size | `Size` | `undefined` | Size of the built in footer buttons: 'sm' or 'lg' |
| cancel-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the '.modal-cancel' button |
| cancel-disabled | `boolean` | `false` | Places the built-in default footer Cancel button in a disabled state |
| cancel-title | `string` | `'Cancel'` | Text to place in the default footer Cancel button |
| cancel-variant | `ButtonVariant | null` | `'secondary'` | Variant for the default footer Cancel button |
| centered | `boolean` | `false` | Vertically centers the modal in the viewport |
| content-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the '.modal-content' wrapper element |
| dialog-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the '.modal-dialog' wrapper element |
| focus | `'ok' | 'cancel' | 'close' | string | ComponentPublicInstance | HTMLElement | null` | `undefined` | Specify where to focus once modal opens. Can be built-in button: 'ok', 'cancel', or 'close'. Can be ref, HTMLElement, ID, or selector string. If set to 'false', no focus will be set (if noTrap isn't set, the focus trap will focus the modal element or fallback element). If set to a string, the element with that ID will be focused. If set to a ComponentPublicInstance, the $el property of the instance will be focused. |
| footer-bg-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the footer background |
| footer-border-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the footer border |
| footer-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the footer |
| footer-text-variant | `TextColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the footer text |
| footer-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the footer |
| fullscreen | `boolean | Breakpoint` | `false` | Enables full-screen mode with a boolean value or sets the breakpoint for full-screen mode below the specified breakpoint value ('sm', 'md', 'lg', 'xl', 'xxl') |
| header-attrs | `Readonly<AttrsValue>` | `undefined` | Attributes to be applied to the modal header element |
| header-bg-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the header background |
| header-border-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the header border |
| header-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the header |
| header-close-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the header close button |
| header-close-label | `string` | `'Close'` | Accessibility label for the header close button |
| header-close-variant | `ButtonVariant | null` | `'secondary'` | Variant for the header close button when using the header-close slot |
| header-text-variant | `TextColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the header text |
| header-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the header |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| initial-animation | `boolean` | `false` | When set, enables the initial animation on mount |
| lazy | `boolean` | `false` | When set, the content will not be mounted until opened |
| modal-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the '.modal' wrapper element |
| model-value | `boolean` | `false` | Controls the visibility of the component |
| no-animation | `boolean` | `false` | When set, disables the animation |
| no-backdrop | `boolean` | `false` | Disables rendering of the backdrop |
| no-close-on-backdrop | `boolean` | `false` | Prevents closing the modal when clicking the backdrop outside the modal window |
| no-close-on-esc | `boolean` | `false` | Prevents closing the modal by pressing the Esc key |
| no-fade | `boolean` | `false` | Alias for \`noAnimation\` |
| no-footer | `boolean` | `false` | Disables rendering of the modal footer |
| no-header | `boolean` | `false` | Disables rendering of the header |
| no-header-close | `boolean` | `false` | Disables rendering of the header close button |
| no-stacking | `boolean` | `false` | Prevents other modals from stacking over this one |
| no-trap | `boolean` | `false` | Disables the focus trap feature |
| ok-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the '.modal-ok' button |
| ok-disabled | `boolean` | `false` | Places the built-in default footer OK button in a disabled state |
| ok-only | `boolean` | `false` | Disables rendering of the default footer Cancel button |
| ok-title | `string` | `'OK'` | Text to place in the default footer OK button |
| ok-variant | `ButtonVariant | null` | `'primary'` | Button color theme variant for the default footer OK button |
| scrollable | `boolean` | `false` | Enables scrolling of the modal body |
| show | `boolean` | `false` | When set, and prop 'visible' is false on mount, will animate from closed to open on initial mount. Mainly to help with template show. Use model-value for reactive show/hide |
| size | `Size | 'xl'` | `undefined` | Sets the modal's width. Options: 'sm', 'lg', or 'xl' |
| teleport-disabled | `boolean` | `false` | Renders the modal where it is defined, disabling teleport |
| teleport-to | `string | RendererElement | null | undefined` | `'body'` | Overrides the default teleport location |
| title | `string` | `undefined` | Text content to place in the title |
| title-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the title |
| title-tag | `string` | `'h5'` | Specify the HTML tag to render instead of the default tag for the title |
| title-visually-hidden | `boolean` | `false` | Wraps the title in a '.visually-hidden' wrapper |
| trans-props | `TransitionProps` | `undefined` | Transition properties |
| unmount-lazy | `boolean` | `false` | When set and \`lazy\` is true, the content will be unmounted when closed |
| visible | `boolean` | `false` | When 'true', open without animation |

##### [Events](#comp-reference-bmodal-events)

| Event | Args | Description |
| --- | --- | --- |
| backdrop | 
`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the backdrop is clicked. Cancelable |
| cancel | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the default footer Cancel button is clicked. Cancelable |
| close | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the default header close button is clicked. Cancelable |
| esc | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the Esc key is pressed. Cancelable |
| hidden | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Always emits after the component is hidden |
| hide | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Always emits just before the component has hidden. Cancelable (as long as component wasn't forcibly hidden) |
| hide-prevented | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the component tried to close, but was prevented from closing. This occurs when preventDefault() is called on the event, the user clicks escape and no-close-onbackdrop is set to true, or the user clicks on the backdrop and no-close-onbackdrop is set to true. |
| ok | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the default footer OK button is clicked. Cancelable |
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

`value``: boolean` - The new value of the modal's visibility state

 | Emitted when the modal's visibility changes |

##### [Slots](#comp-reference-bmodal-slots)

| Name | Scope | Description |
| --- | --- | --- |
| backdrop |  | Content for the modal backdrop |
| cancel | 
`cancel``: Function` - Closes the modal and fires the 'cancel' and 'hide' events, with \`bvModalEvent.trigger = 'cancel'\`

`close``: Function` - Closes the modal and fires the 'close' and 'hide' events, with \`bvModalEvent.trigger = 'headerclose'\`

`hide``: Function` - Accepts one argument 'trigger'. Closes the modal and fires the 'hide' event, with \`bvModalEvent.trigger = trigger\` (\`trigger\` is optional)

`ok``: Function` - Closes the modal and fires the 'ok' and 'hide' events, with \`bvModalEvent.trigger = 'ok'\`

`visible``: boolean` - The visibility state of the modal. 'true' if the modal is visible and 'false' if not visible

 | Content for the modal Cancel button. Optionally scoped |
| default | 

`cancel``: Function` - Closes the modal and fires the 'cancel' and 'hide' events, with \`bvModalEvent.trigger = 'cancel'\`

`close``: Function` - Closes the modal and fires the 'close' and 'hide' events, with \`bvModalEvent.trigger = 'headerclose'\`

`hide``: Function` - Accepts one argument 'trigger'. Closes the modal and fires the 'hide' event, with \`bvModalEvent.trigger = trigger\` (\`trigger\` is optional)

`ok``: Function` - Closes the modal and fires the 'ok' and 'hide' events, with \`bvModalEvent.trigger = 'ok'\`

`visible``: boolean` - The visibility state of the modal. 'true' if the modal is visible and 'false' if not visible

 | Content for the modal body. Optionally scoped |
| footer | 

`cancel``: Function` - Closes the modal and fires the 'cancel' and 'hide' events, with \`bvModalEvent.trigger = 'cancel'\`

`close``: Function` - Closes the modal and fires the 'close' and 'hide' events, with \`bvModalEvent.trigger = 'headerclose'\`

`hide``: Function` - Accepts one argument 'trigger'. Closes the modal and fires the 'hide' event, with \`bvModalEvent.trigger = trigger\` (\`trigger\` is optional)

`ok``: Function` - Closes the modal and fires the 'ok' and 'hide' events, with \`bvModalEvent.trigger = 'ok'\`

`visible``: boolean` - The visibility state of the modal. 'true' if the modal is visible and 'false' if not visible

 | Content for the modal footer. Removes default OK and Cancel buttons. Optionally scoped |
| header | 

`cancel``: Function` - Closes the modal and fires the 'cancel' and 'hide' events, with \`bvModalEvent.trigger = 'cancel'\`

`close``: Function` - Closes the modal and fires the 'close' and 'hide' events, with \`bvModalEvent.trigger = 'headerclose'\`

`hide``: Function` - Accepts one argument 'trigger'. Closes the modal and fires the 'hide' event, with \`bvModalEvent.trigger = trigger\` (\`trigger\` is optional)

`ok``: Function` - Closes the modal and fires the 'ok' and 'hide' events, with \`bvModalEvent.trigger = 'ok'\`

`visible``: boolean` - The visibility state of the modal. 'true' if the modal is visible and 'false' if not visible

 | Content for the modal header. Removes the top-right close button. Optionally scoped |
| header-close |  | Content for the modal header close button. Not shown if the 'header' slot is used |
| ok | 

`cancel``: Function` - Closes the modal and fires the 'cancel' and 'hide' events, with \`bvModalEvent.trigger = 'cancel'\`

`close``: Function` - Closes the modal and fires the 'close' and 'hide' events, with \`bvModalEvent.trigger = 'headerclose'\`

`hide``: Function` - Accepts one argument 'trigger'. Closes the modal and fires the 'hide' event, with \`bvModalEvent.trigger = trigger\` (\`trigger\` is optional)

`ok``: Function` - Closes the modal and fires the 'ok' and 'hide' events, with \`bvModalEvent.trigger = 'ok'\`

`visible``: boolean` - The visibility state of the modal. 'true' if the modal is visible and 'false' if not visible

 | Content for the modal OK button. Optionally scoped |
| title | 

`cancel``: Function` - Closes the modal and fires the 'cancel' and 'hide' events, with \`bvModalEvent.trigger = 'cancel'\`

`close``: Function` - Closes the modal and fires the 'close' and 'hide' events, with \`bvModalEvent.trigger = 'headerclose'\`

`hide``: Function` - Accepts one argument 'trigger'. Closes the modal and fires the 'hide' event, with \`bvModalEvent.trigger = trigger\` (\`trigger\` is optional)

`ok``: Function` - Closes the modal and fires the 'ok' and 'hide' events, with \`bvModalEvent.trigger = 'ok'\`

`visible``: boolean` - The visibility state of the modal. 'true' if the modal is visible and 'false' if not visible

 | Content for the modal title. Not shown if the 'header' slot is used. Optionally scoped |

##### [Exposed](#comp-reference-bmodal-exposed)

| Name | Type | Description |
| --- | --- | --- |
| hide | `(trigger?: string) => void` | Hides the modal. Optionally accepts a trigger value to be included in the hide event |
| show | `() => void` | Shows the modal |
| toggle | `() => void` | Toggles the visibility of the modal |
