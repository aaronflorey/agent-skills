# Overlay ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/overlay.html

##### On this page

-   [Overview ​](#overview)
    
-   [Options ​](#options)
    -   [Overlay backdrop color ​](#overlay-backdrop-color)
        
    -   [Fade transition ​](#fade-transition)
        
    -   [Default spinner styling ​](#default-spinner-styling)
        
    -   [Overlay corner rounding ​](#overlay-corner-rounding)
        
    -   [Custom overlay content ​](#custom-overlay-content)
        
    -   [Overlay content centering ​](#overlay-content-centering)
        
    -   [Width ​](#width)
        
    -   [Non-wrapping mode ​](#non-wrapping-mode)
        -   [Absolute vs fixed positioning for no-wrap ​](#absolute-vs-fixed-positioning-for-no-wrap)
            
    -   [Overlay z-index ​](#overlay-z-index)
        
-   [Accessibility ​](#accessibility)
    
-   [Use case examples ​](#use-case-examples)
    -   [Loading button ​](#loading-button)
        
    -   [Form confirmation prompt and upload status ​](#form-confirmation-prompt-and-upload-status)
        
    -   [Using in BModal ​](#using-in-bmodal)
        
-   [Component Reference](#component-reference)
    -   [<BOverlay>](#b-overlay)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            

# Overlay [​](#overlay)

BootstrapVueNext's custom `BOverlay` component is used to _visually obscure_ a particular element or component and its content. It signals a state change within the element or component to the user and can be used for creating loaders, warnings/alerts, prompts, and more.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BOverlay/BOverlay.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/overlay.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#boverlay)

## Overview [​](#overview)

`BOverlay` can be used to obscure almost anything. [Example use cases](#use-case-examples) would be forms, tables, delete confirmation dialogs, or anywhere you need to signal that the application is busy performing a background task, to signal that a certain component is unavailable, or to provide additional context to the end user.

`BOverlay` can be used to overlay (wrap) an element or component (the default behaviour), or can be placed as a descendant of a `position: relative` element ([non-wrapping mode](#non-wrapping-mode)).

The overlay visibility is controlled via the `show` prop. By default, the overlay is _not_ shown.

NOTE

This component only _visually obscures_ its content (or the page). Refer to the [Accessibility section](#accessibility) below for additional accessibility details and concerns.

**Default wrapping mode example:**

#### Card with overlay

Laborum consequat non elit enim exercitation cillum.

Click the button to toggle the overlay:

Show overlay

Toggle overlay

HTML StackBlitz

vue

```
<template>
  <BOverlay
    :show="show"
    rounded="sm"
  >
    <BCard
      title="Card with overlay"
      :aria-hidden="show ? 'true' : null"
    >
      <BCardText>Laborum consequat non elit enim exercitation cillum.</BCardText>
      <BCardText>Click the button to toggle the overlay:</BCardText>
      <BButton
        :disabled="show"
        variant="primary"
        @click="show = true"
      >
        Show overlay
      </BButton>
    </BCard>
  </BOverlay>

  <BButton @click="show = !show">Toggle overlay</BButton>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const show = ref(false)
</script>
```

## Options [​](#options)

There are many options available for styling the overlay, and for providing custom content within the overlay.

### Overlay backdrop color [​](#overlay-backdrop-color)

You can control the backdrop background color via the `variant` prop. The variant is translated into one of Bootstrap's [background variant utility classes](/bootstrap-vue-next/docs/reference/color-variants.html#background-and-border-variants). Control the opacity of the backdrop via the `opacity` prop (opacity values can range from `0` to `1`). And background blurring can be controlled via the `blur` prop.

VarianttransparentwhitelightdarkprimarysecondarysuccessdangerwarninginfoOpacity

0.85

Blur (does not work if variant is anything other than 'transparent' or 'white' or if bgColor is defined)None1px2px5px0.5em1rem

#### Card with overlay

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Button

HTML StackBlitz

vue

```
<template>
  <div class="row">
    <div
      class="col-lg-6"
      aria-controls="overlay-background"
    >
      <label for="bg-variant">Variant</label>
      <BFormSelect
        id="bg-variant"
        v-model="variant"
        :options="variants"
      />

      <label for="bg-opacity">Opacity</label>
      <div class="d-inline">
        <BFormInput
          id="bg-opacity"
          v-model.number="opacity"
          type="range"
          min="0"
          max="1"
          step="0.01"
          class="d-inline"
        />
      </div>

      {{ opacity.toFixed(2) }}

      <div>
        <label for="bg-blur"
          >Blur (does not work if variant is anything other than 'transparent' or 'white' or if
          bgColor is defined)</label
        >
        <BFormSelect
          id="bg-blur"
          v-model="blur"
          :options="blurs"
        />
      </div>
    </div>

    <BCol lg="6">
      <BOverlay
        id="overlay-background"
        show
        :variant="variant"
        :opacity="opacity"
        :blur="blur"
        rounded="sm"
      >
        <BCard
          title="Card with overlay"
          aria-hidden="true"
        >
          <BCardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </BCardText>
          <BButton
            disabled
            variant="primary"
            >Button</BButton
          >
        </BCard>
      </BOverlay>
    </BCol>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const variants = [
  'transparent',
  'white',
  'light',
  'dark',
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
] as const
const blurs = [{text: 'None', value: ''}, '1px', '2px', '5px', '0.5em', '1rem']

const variant = ref<(typeof variants)[number]>('light')
const opacity = ref(0.85)
const blur = ref('2px')
</script>
```

As an alternative to the `variant` prop, you can specify a CSS color string value via the `bg-color` prop. When a value is provided for `bg-color`, the `variant` prop value is ignored.

**Notes:**

-   Background blurring is not available on some browsers (e.g. IE 11).
-   Blurring requires that the opacity level be relatively high for the effect to be visible.

### Fade transition [​](#fade-transition)

By default, the overlay uses Bootstrap's fade transition when showing or hiding. You can disable the fade transition via adding the `no-fade` prop to `BOverlay`.

#### Card with overlay

Laborum consequat non elit enim exercitation cillum.

Click the button to toggle the overlay:

Show overlay

Toggle overlay

HTML StackBlitz

vue

```
<template>
  <BOverlay
    no-fade
    :show="show"
    rounded="sm"
  >
    <BCard
      title="Card with overlay"
      :aria-hidden="show ? 'true' : null"
    >
      <BCardText>Laborum consequat non elit enim exercitation cillum.</BCardText>
      <BCardText>Click the button to toggle the overlay:</BCardText>
      <BButton
        :disabled="show"
        variant="primary"
        @click="show = true"
      >
        Show overlay
      </BButton>
    </BCard>
  </BOverlay>

  <BButton @click="show = !show">Toggle overlay</BButton>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const show = ref(false)
</script>
```

### Default spinner styling [​](#default-spinner-styling)

The default overlay content is a [`BSpinner`](/bootstrap-vue-next/docs/components/spinner.html) of type `'border'`. You can control the appearance of the spinner via the following props:

-   `spinner-type`: Currently supported values are `'border'` (the default) or `'grow'`
-   `spinner-variant`: Variant theme color for the spinner. Default is `null` which inherits the current font color
-   `spinner-small`: Set to `true` to render a small size spinner

#### Card with spinner style

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Button

HTML StackBlitz

template

```
<BOverlay
  show
  spinner-variant="primary"
  spinner-type="grow"
  spinner-small
  rounded="sm"
  style="max-width: 320px"
>
  <BCard
    title="Card with spinner style"
    aria-hidden="true"
  >
    <BCardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </BCardText>
    <BButton
      disabled
      variant="primary"
      >Button</BButton
    >
  </BCard>
</BOverlay>
```

### Overlay corner rounding [​](#overlay-corner-rounding)

By default, the overlay backdrop has square corners. If the content you are wrapping has rounded corners, you can use the [RadiusElementExtendables](/bootstrap-vue-next/docs/types.html#radiuselementextendables) props `rounded`, `rounded-top`, `rounded-bottom`, `rounded-start` and `rounded-end` to apply rounding to the overlay's corners to match the obscured content's rounded corners. Possible values for these props are the values of [RadiusElementExtendables](/bootstrap-vue-next/docs/types.html#radiuselement). See the [BAvatar documentation](/bootstrap-vue-next/docs/components/avatar.html#rounding) for a detailed explanation of how these props work.

Toggle overlay

With rounding

![Image 1](https://picsum.photos/200/200/?image=54)

Without rounding

![Image 1](https://picsum.photos/200/200/?image=54)

HTML StackBlitz

vue

```
<template>
  <BButton @click="showRoundedEx = !showRoundedEx">Toggle overlay</BButton>

  <BRow class="text-center mt-3">
    <BCol md="6">
      <p>With rounding</p>
      <BOverlay
        :show="showRoundedEx"
        class="d-inline-block"
        rounded="circle"
      >
        <BImg
          thumbnail
          rounded="circle"
          fluid
          src="https://picsum.photos/200/200/?image=54"
          alt="Image 1"
        />
      </BOverlay>
    </BCol>

    <BCol md="6">
      <p>Without rounding</p>
      <BOverlay
        :show="showRoundedEx"
        class="d-inline-block"
      >
        <BImg
          thumbnail
          rounded="circle"
          fluid
          src="https://picsum.photos/200/200/?image=54"
          alt="Image 1"
        />
      </BOverlay>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const showRoundedEx = ref(false)
</script>
```

### Custom overlay content [​](#custom-overlay-content)

Place custom content in the overlay (replacing the default spinner) via the optionally scoped slot `overlay`.

#### Card with custom overlay content

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Click the button to toggle the overlay:

Show overlay

HTML StackBlitz

vue

```
<template>
  <BOverlay :show="show" rounded="sm" @shown="onShown" @hidden="onHidden">
    <BCard title="Card with custom overlay content" :aria-hidden="show ? 'true' : null">
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
      <BCardText>Click the button to toggle the overlay:</BCardText>
      <BButton :disabled="show" variant="primary" @click="show = true"> Show overlay </BButton>
    </BCard>
    <template #overlay>
      <div class="text-center">
        <p id="cancel-label">Please wait...</p>
        <BButton
          variant="outline-danger"
          size="sm"
          aria-describedby="cancel-label"
          @click="show = false"
        >
          Cancel
        </BButton>
      </div>
    </template>
  </BOverlay>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)

const onShown = () => {
  console.log('shown')
}
const onHidden = () => {
  console.log('hidden')
}
</script>
```

The following scope properties are available to the `overlay` slot:

| Property | Description |
| --- | --- |
| `spinnerVariant` | Value of the `spinner-variant` prop |
| `spinnerType` | Value of the `spinner-type` prop |
| `spinnerSmall` | Value of the `spinner-small` prop |

When placing interactive content in the overlay, you should focus the container of the custom content or one of the focusable controls in the overlay content for accessibility reasons. You can listen for the `BOverlay` `'shown'` event to know when the overlay content is available in the document.

### Overlay content centering [​](#overlay-content-centering)

By default, the overlay content will be horizontally and vertically centered within the overlay region. To disable centering, set the `no-center` prop to `true`.

In the following example, we have set the `no-center` prop, and absolutely positioned the custom overlay slot content at the top right.

#### Card with no-center overlay

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Button

HTML StackBlitz

template

```
<BOverlay
  no-center
  show
  rounded="sm"
>
  <template #overlay>
    <BAvatar
      class="position-absolute"
      style="top: 0; right: 0"
  /></template>
  <BCard
    title="Card with no-center overlay"
    aria-hidden="true"
  >
    <BCardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </BCardText>
    <BButton
      disabled
      variant="primary"
      >Button</BButton
    >
  </BCard>
</BOverlay>
```

### Width [​](#width)

`BOverlay` defaults to a width of `100%`. When wrapping an inline or inline-block element, you will need to add the class `d-inline-block` (e.g. `<BOverlay class="d-inline-block">`).

You can also use the width [utility classes](/bootstrap-vue-next/docs/reference/utility-classes.html) or CSS styles to control the width of the overlay's wrapping container element.

### Non-wrapping mode [​](#non-wrapping-mode)

By default, `BOverlay` wraps the content of the default slot. In some cases you may want to obscure a parent container. Use the `no-wrap` prop to disable rendering of the wrapping (and ignore the default slot). Note that this requires that the ancestor element that is to be obscured to have relative positioning (either via the utility class `'position-relative'`, or CSS style `'position: relative;'`).

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### Card with parent overlay

Laborum consequat non elit enim exercitation cillum.

Click the button to toggle the overlay:

Show overlay

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Toggle overlay

HTML StackBlitz

vue

```
<template>
  <div class="position-relative p-4 bg-info">
    <p class="text-light fw-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <BCard title="Card with parent overlay">
      <BCardText>Laborum consequat non elit enim exercitation cillum.</BCardText>
      <BCardText>Click the button to toggle the overlay:</BCardText>
      <BButton
        :disabled="show"
        variant="primary"
        @click="show = true"
      >
        Show overlay
      </BButton>
    </BCard>
    <p class="text-light fw-bold mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <BOverlay
      :show="show"
      no-wrap
    />
  </div>
  <BButton
    class="mt-3"
    @click="show = !show"
    >Toggle overlay</BButton
  >
</template>

<script setup lang="ts">
import {ref} from 'vue'

const show = ref(false)
</script>
```

Note that some of Bootstrap v5 component styles have relative positioning defined (e.g. cards, cols, etc.). You may need to adjust the placement of `BOverlay` in your markup.

For example, `BCard` has relative positioning, so you can place the `<BOverlay no-wrap>` as a descendant of `BCard`:

Card header

![Image](https://picsum.photos/72/72/?image=58)

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Card footer

Toggle overlay

HTML StackBlitz

vue

```
<template>
  <BCard
    header="Card header"
    footer="Card footer"
  >
    <BImg
      thumbnail
      rounded="circle"
      src="https://picsum.photos/72/72/?image=58"
      alt="Image"
      class="d-inline"
    />
    <p class="d-inline align-top mb-0">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    <BOverlay
      :show="show"
      no-wrap
    />
  </BCard>
  <BButton
    class="mt-3"
    @click="show = !show"
    >Toggle overlay</BButton
  >
</template>

<script setup lang="ts">
import {ref} from 'vue'

const show = ref(false)
</script>
```

When in `no-wrap` mode, `BOverlay` will not set the `aria-busy` attribute on the obscured element. You may also want to use an `aria-live` region in your app that announces to screen reader users that the page is busy.

Refer to the [Accessibility section](#accessibility) below for additional details and concerns.

#### Absolute vs fixed positioning for `no-wrap` [​](#absolute-vs-fixed-positioning-for-no-wrap)

In cases where you want to obscure the entire app or page, when using the `no-wrap` prop, you can switch to viewport fixed positioning via setting the prop `fixed` on `BOverlay`. Note that this does not disable scrolling of the page, and note that any interactive elements on the page will still be in the document tab sequence.

You may also need to adjust the [z-index of the overlay](#overlay-z-index) to ensure that the backdrop appears above all other page elements. Use the `z-index` property to override the default `z-index` value.

Refer to the [Accessibility section](#accessibility) below for additional details and concerns.

### Overlay z-index [​](#overlay-z-index)

In some circumstances, you may need to adjust the `z-index` used by the overlay (depending on positioning in the DOM or the content being obscured). Simply set the `z-index` prop with a value suitable for your application or use case. The default `z-index` is `10`.

## Accessibility [​](#accessibility)

Note that the overlay is visual only. You **must** disable any interactive elements (buttons, links, etc.) when the overlay is showing, otherwise the obscured elements will still be reachable via keyboard navigation (i.e. still in the document tab sequence).

If you have any links in the obscured content, we recommend using the [`BLink` component](/bootstrap-vue-next/docs/components/link.html), as it supports the `disabled` state, as native links (`<a href="...">`) and `RouterLink` components do not support the disabled state.

It is also recommended adding either the `aria-hidden="true"` or `aria-busy="true"` attribute to your obscured content when the overlay is visible. Just be careful not to add `aria-hidden="true"` to the wrapper that contains the `BOverlay` component (when using `no-wrap`), as that would hide any interactive content in the `overlay` slot for screen reader users.

If you are placing interactive content in the `overlay` slot, you should focus the content once the `'shown'` event has been emitted. You can use the `hidden` event to trigger returning focus to an element as needed when the overlay is no longer visible.

When using the wrapping mode (prop `no-wrap` is not set), the wrapper will have the attribute `aria-busy="true"` set, to allow screen reader users to know that the wrapped content is in a busy or loading state. When prop `no-wrap` is set, the attribute will _not_ be applied.

When using the `no-wrap` prop, and potentially the `fixed` prop, to obscure the entire application or page, you must ensure that all interactive page elements (other than the content of the overlay) have been disabled and are _not_ in the document tab sequence.

## Use case examples [​](#use-case-examples)

Here are just a few examples of common use cases of `BOverlay`. In all cases, we disable any interactive elements in the obscured area to prevent reachability via keyboard navigation (i.e. Tab key) or screen reader access.

Please refer to the [Accessibility section](#accessibility) for additional details and concerns.

### Loading button [​](#loading-button)

Easily create a loading button:

Do something

HTML StackBlitz

vue

```
<template>
  <BOverlay
    :show="loadingBuzy"
    rounded
    opacity="0.6"
    spinner-small
    spinner-variant="primary"
    class="d-inline-block"
    @hidden="onBuzyHidden"
  >
    <BButton
      ref="buzyButton"
      :disabled="loadingBuzy"
      variant="primary"
      @click="setBuzyClick"
    >
      Do something
    </BButton>
  </BOverlay>
</template>

<script setup lang="ts">
import {ref, useTemplateRef} from 'vue'
import {BButton} from 'bootstrap-vue-next/components/BButton'

let timeout: ReturnType<typeof setTimeout> | null = null

const loadingBuzy = ref(false)
const buzyButton = useTemplateRef<typeof BButton>('buzyButton')

const clearTimer = () => {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
}
const setTimer = (callback: () => void) => {
  clearTimer()
  timeout = setTimeout(() => {
    clearTimer()
    callback()
  }, 5000)
}
const setBuzyClick = () => {
  loadingBuzy.value = true
  // Simulate an async request
  setTimer(() => {
    loadingBuzy.value = false
  })
}

const onBuzyHidden = () => {
  // Return focus to the button once hidden
  buzyButton.value?.$el.focus()
}
</script>
```

### Form confirmation prompt and upload status [​](#form-confirmation-prompt-and-upload-status)

This example is a bit more complex, but shows the use of `no-wrap`, and using the `overlay` slot to present the user with a prompt dialog, and once confirmed it shows an uploading status indicator. This example also demonstrates additional accessibility markup.

Name

Email

Submit

HTML StackBlitz

vue

```
<template>
  <BForm
    class="position-relative p-3"
    @submit.prevent="onFormSubmit"
  >
    <div class="row">
      <label
        class="col-lg-2"
        label-for="form-name"
        >Name</label
      >
      <BFormInput
        id="form-name"
        class="col"
        :disabled="formbusy"
      />
    </div>

    <div class="row mt-2">
      <label
        class="col-lg-2"
        label-for="form-email"
        >Email</label
      >
      <BFormInput
        id="form-email"
        class="col"
        type="email"
        :disabled="formbusy"
      />
    </div>

    <div class="d-flex justify-content-center mt-2">
      <BButton
        ref="formsubmit"
        type="submit"
        :disabled="formbusy"
        >Submit</BButton
      >
    </div>

    <BOverlay
      :show="formbusy"
      no-wrap
      @shown="onFormOverlayShown"
      @hidden="onFormOverlayHidden"
    >
      <template #overlay>
        <div
          v-if="processing"
          class="text-center p-4 bg-primary text-light rounded"
        >
          <div class="mb-3">Processing...</div>
          <BProgress
            min="1"
            max="20"
            :value="processingcounter"
            variant="success"
            height="3px"
            class="mx-n4 rounded-0"
          />
        </div>
        <div
          v-else
          ref="formdialog"
          tabindex="-1"
          role="dialog"
          aria-modal="false"
          aria-labelledby="form-confirm-label"
          class="text-center p-3"
        >
          <p><strong id="form-confirm-label">Are you sure?</strong></p>
          <div
            class="d-flex"
            style="column-gap: 5%"
          >
            <BButton
              variant="outline-danger"
              class="me-3"
              @click="onFormCancel"
            >
              Cancel
            </BButton>
            <BButton
              ref="successbutton"
              variant="outline-success"
              @click="onFormOK"
              >OK</BButton
            >
          </div>
        </div>
      </template>
    </BOverlay>
  </BForm>
</template>

<script setup lang="ts">
import {nextTick, ref, useTemplateRef} from 'vue'
import {BButton} from 'bootstrap-vue-next/components/BButton'

const formbusy = ref(false)
const processing = ref(false)
const processingcounter = ref(1)
const formdialog = useTemplateRef<HTMLElement>('formdialog')
const formsubmit = useTemplateRef<typeof BButton>('formsubmit')
const successbutton = useTemplateRef<typeof BButton>('successbutton')
let processingInterval: ReturnType<typeof setInterval> | null = null

const clearProcessingInterval = () => {
  if (processingInterval) {
    clearInterval(processingInterval)
    processingInterval = null
  }
}

const onFormOverlayShown = () => {
  // Focus on the dialog ok button when the overlay is shown
  successbutton.value?.$el.focus()
}

const onFormOverlayHidden = () => {
  // In this case, we return focus to the submit button
  // You may need to alter this based on your application requirements
  formsubmit.value?.$el.focus()
}

const onFormSubmit = () => {
  processing.value = false
  formbusy.value = true
}

const onFormCancel = () => {
  formbusy.value = false
}

const onFormOK = () => {
  processingcounter.value = 1
  processing.value = true
  clearProcessingInterval()
  processingInterval = setInterval(() => {
    if (processingcounter.value < 20) {
      processingcounter.value++
    } else {
      clearProcessingInterval()
      nextTick(() => {
        formbusy.value = false
        processing.value = false
      })
    }
  }, 350)
}
</script>
```

### Using in `BModal` [​](#using-in-bmodal)

The modal body has `position: relative;` set, so when using `<BOverlay no-wrap ...>` in the modal body only the modal body will be obscured. If you wish to obscure the entire modal (including the header and footer), you will need to set the `BModal` prop `body-class` to `position-static`, and also set the `rounded` prop on `BOverlay`.

## Component Reference

### `<BOverlay>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BOverlay/BOverlay.vue)

-   [<BOverlay> Properties](#comp-reference-boverlay-properties)
-   [<BOverlay> Events](#comp-reference-boverlay-events)
-   [<BOverlay> Slots](#comp-reference-boverlay-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.overlay`

##### [Properties](#comp-reference-boverlay-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| bg-color | `string` | `undefined` | CSS color to use as the opaque overlay backdrop color. If set, overrides the \`variant\` prop |
| blur | `string | null` | `'2px'` | Value for the CSS blur backdrop-filter. Be sure to include the CSS units. Not supported in IE 11. Set to null or an empty string to disable blurring |
| fixed | `boolean` | `false` | When prop \`no-wrap\` is set, will use fixed positioning instead of absolute positioning. Handy if you want to obscure the entire application page |
| no-center | `boolean` | `false` | When set, disables the vertical and horizontal centering of the overlay content |
| no-fade | `boolean` | `false` | Disables the fade transition of the overlay |
| no-spinner | `boolean` | `false` | If set, will not show the spinner |
| no-wrap | `boolean` | `false` | Disabled generating the wrapper element, and ignored the default slot. Requires that \`<b-overlay>\` be placed in an element with position relative set |
| opacity | `Numberish` | `0.85` | Opacity of the overlay backdrop. Valid range is \`0\` to \`1\` |
| overlay-tag | `string` | `'div'` | Element tag to use as for the overlay element |
| rounded | `boolean | RadiusElement` | `'false'` | Specifies the type of rounding to apply to the component or its children. The \`square\` prop takes precedence. Refer to the documentation for details |
| rounded-bottom | `boolean | RadiusElement` | `undefined` | Specifies the type of rounding to apply to the \`bottom\` corners of the component or its children |
| rounded-end | `boolean | RadiusElement` | `undefined` | Specifies the type of rounding to apply to the \`end\` corners of the component or its children |
| rounded-start | `boolean | RadiusElement` | `undefined` | Specifies the type of rounding to apply to the \`start\` corners of the component or its children |
| rounded-top | `boolean | RadiusElement` | `undefined` | Specifies the type of rounding to apply to the \`top\` corners of the component or its children |
| show | `boolean` | `false` | When set, shows the overlay |
| spinner-small | `boolean` | `false` | When set, renders the default spinner in a smaller size |
| spinner-type | `SpinnerType` | `'border'` | Type of the default spinner to show. Current supported types are 'border' and 'grow' |
| spinner-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the spinner. |
| variant | `ColorVariant | 'white' | 'transparent' | null` | `'light'` | Applies one of the Bootstrap theme color variants to the default spinner. Default is to use the current font color |
| wrap-tag | `string` | `'div'` | Element tag to use for the overall wrapper element. Has no effect if prop \`no-wrap\` is set |
| z-index | `Numberish` | `10` | Z-index value to apply to the overlay. You may need to increase this value to suit your content or placement |

##### [Events](#comp-reference-boverlay-events)

| Event | Args | Description |
| --- | --- | --- |
| click | 
`click``: MouseEvent` - The native click event

 | Emitted when overlay is clicked |
| hidden |  | Emitted when the overlay has been hidden |
| shown |  | Emitted when the overlay has been shown |

##### [Slots](#comp-reference-boverlay-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | The content to be overlayed. The default slot is ignored if the prop \`no-wrap\` is set |
| overlay | 
`type``: SpinnerType`

`variant``: ColorVariant | null`

`small``: boolean`

 | Custom content to replace the default overlay spinner |
