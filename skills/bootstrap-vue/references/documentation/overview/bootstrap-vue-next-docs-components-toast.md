# Toast ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/toast.html

##### On this page

-   [Overview ​](#overview)
    -   [Toast features and notes ​](#toast-features-and-notes)
        
-   [Positioning ​](#positioning)
    
-   [Static placement ​](#static-placement)
    
-   [Auto-dismissing Toasts ​](#auto-dismissing-toasts)
    -   [Toast roles ​](#toast-roles)
        
    -   [ProgressBar Integration ​](#progressbar-integration)
        
-   [BLink Integration ​](#blink-integration)
    
-   [Programmatically Control ​](#programmatically-control)
    
-   [Accessibility ​](#accessibility)
    -   [Accessibility tips ​](#accessibility-tips)
        
-   [Component Reference](#component-reference)
    -   [<BToast>](#b-toast)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            

# Toast [​](#toast)

Push notifications to your visitors with `BToast` and `useToast`. These are easily customizable for generating alert messages.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BToast/BToast.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/toast.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#btoast)

Toasts are lightweight notifications designed to mimic the push notifications that have been popularized by mobile and desktop operating systems.

Toasts are intended to be small interruptions to your visitors or users and therefore should contain minimal, to-the-point, non-interactive content. Please refer to the Accessibility Tips section below for important usage information

## Overview [​](#overview)

This section only refers to using the raw component variation. `Toasts` are often generated in a global context programmatically, like showing a success message after saving a form. That functionality is covered under the [composable docs](/bootstrap-vue-next/docs/composables/useToast.html)

The component variation is shown by using the `v-model` like so

Show Toast

Example toast

This is a toast with a title.

HTML StackBlitz

vue

```
<template>
  <div
    class="p-3"
    style="
      min-height: 170px;
      background: repeating-linear-gradient(
        45deg,
        #f8f9fa 0px,
        #f8f9fa 10px,
        #e9ecef 10px,
        #e9ecef 20px
      );
    "
  >
    <BButton
      class="mb-2"
      @click="showToast"
    >
      Show Toast
    </BButton>
    <BToast
      v-model="show"
      variant="info"
      solid
    >
      <template #title> Example toast </template>
      This is a toast with a title.
    </BToast>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const show = ref(false)

const showToast = () => {
  show.value = true
}
</script>
```

By default Toasts are rendered in place. You can use Vue's `Teleport` to change the location, commonly to `body` or, more commonly, create toasts using the [useToast](/bootstrap-vue-next/docs/composables/useToast.html) composable.

### Toast features and notes [​](#toast-features-and-notes)

-   Toasts can be generated programmatically via the `useToast` composable, or manually created using the `<BToast>` component.
-   Titles are optional but recommended for accessibility. Titles are rendered inside a `<strong>` element unless using the `title` slot.
-   The close button can be hidden via the `no-close-button` prop.
-   A title bar is shown when a title is provided, unless both title and close button are hidden.
-   Auto-dismissing is controlled by setting `model-value` to a number of milliseconds. No default auto-hide duration.
-   When auto-hide is enabled, hovering over the toast pauses the countdown. This can be disabled with the `no-hover-pause` prop.
-   Toast transparency can be disabled by setting the `solid` prop to `true`.
-   Toasts use Vue's `Teleport` component for positioning. By default, toasts created with `useToast` are teleported to the body.
-   Toasts include built-in progress bar support via the `progress-props` prop when using timed dismissal.
-   Toasts support `BLink` integration for interactive toast bodies.

## Positioning [​](#positioning)

In combination with `Teleport`, you can render Toasts above the page, and in specific locations. You will need to create a wrapper component around said Toast to declare its location

top-0 start-0top-0 start-50 translate-middle-xtop-0 end-0top-50 start-0 translate-middle-ytop-50 start-50 translate-middletop-50 end-0 translate-middle-ybottom-0 start-0bottom-0 start-50 translate-middle-xbottom-0 end-0

HTML StackBlitz

vue

```
<template>
  <template
    v-for="(pos, index) in values"
    :key="index"
  >
    <BButton
      class="m-2"
      @click="values[index] = !values[index]"
    >
      {{ locations[index] }}
    </BButton>
    <Teleport to="body">
      <div
        :class="locations[index]"
        class="toast-container position-fixed p-3"
      >
        <BToast v-model="values[index]">
          <template #title> Title </template>
          {{ locations[index] }}
        </BToast>
      </div>
    </Teleport>
  </template>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const locations = [
  'top-0 start-0',
  'top-0 start-50 translate-middle-x',
  'top-0 end-0',
  'top-50 start-0 translate-middle-y',
  'top-50 start-50 translate-middle',
  'top-50 end-0 translate-middle-y',
  'bottom-0 start-0',
  'bottom-0 start-50 translate-middle-x',
  'bottom-0 end-0',
]

const values = ref(Array.from({length: locations.length}, () => false))
</script>
```

## Static placement [​](#static-placement)

You can place toasts in static placements, and with more control by using them directly. Although, it is more uncommon

Title

Body

Toggle

HTML StackBlitz

vue

```
<template>
  <BToast
    v-model="active"
    variant="info"
  >
    <template #title> Title </template>
    Body
  </BToast>
  <BButton @click="active = !active">Toggle</BButton>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const active = ref(false)
</script>
```

## Auto-dismissing Toasts [​](#auto-dismissing-toasts)

To create a `BToast` that dismisses automatically after a specified duration, set the `model-value` prop to the number of **milliseconds** you want the `BToast` to remain visible. By default, the timer updates on every browser frame via `requestAnimationFrame` (roughly every 16 ms). To throttle updates for example to once per second—set the `interval` prop to `1000` (or any millisecond value). Timed Toasts automatically pause when hovered over with a mouse, but you can disable this behavior using the `no-hover-pause` prop. Ensure that the `model-value` is an integer representing milliseconds. Any change to the `model-value` will reset the timer.

The **interval** prop determines how frequently the timer updates. While the default is `requestAnimationFrame`, you can set a custom interval. Negative values for either `model-value` or `interval` will stop the timer. If the `model-value` does not divide evenly by the interval, the timer will continue to the nearest interval. For example, a `model-value` of 5400 ms with an interval of 1000 ms will run for 6000 ms. To avoid this, choose an interval that divides evenly into the `model-value`, such as 540 ms or 1080 ms.

Show

HTML StackBlitz

vue

```
<template>
  <BButton
    @click="
      create({
        title: 'Counting down!',
        variant: 'info',
        pos: 'middle-center',
        modelValue: 10000,
        progressProps: {
          variant: 'danger',
        },
        body: 'Watch me!',
      })
    "
  >
    Show
  </BButton>
</template>

<script setup lang="ts">
import {useToast} from 'bootstrap-vue-next'

const {create} = useToast()
</script>
```

### Toast roles [​](#toast-roles)

Toasts are rendered with a default `role` attribute of `'alert'` and `aria-live` attribute of `'assertive'`. For toasts that are meant for a casual notification, set the `is-status` prop to `true`, which will change the `role` and `aria-live` attributes to `'status'` and `'polite'` respectively.

For more information, please see the [Accessibility](#accessibility) section below.

### ProgressBar Integration [​](#progressbar-integration)

As you may have noticed in that example, there was a built-in progress bar. This is triggered when using a value that is a `number` and when `progress-props` is not `undefined`. This was implemented because it can be difficult to modify the behavior of `BToast` when using a pure method, and the appearance of a ticking down progress bar is a "nice-to-have". Although it is not out of the box behavior by Bootstrap, its behavior is opt-in. This functions similarly to examples in `BAlert`

## BLink Integration [​](#blink-integration)

`Toast` can accept `BLink` props which will modify its behavior

Show

HTML StackBlitz

vue

```
<template>
  <BButton
    @click="
      create({
        href: 'https://getbootstrap.com/',
        modelValue: true,
        target: '_blank',
        body: 'I am a BLink',
      })
    "
  >
    Show
  </BButton>
</template>

<script setup lang="ts">
import {useToast} from 'bootstrap-vue-next'

const {create} = useToast()
</script>
```

## Programmatically Control [​](#programmatically-control)

To programmatically control your toasts with global state, refer to our documentation at [useToast](/bootstrap-vue-next/docs/composables/useToast.html)

## Accessibility [​](#accessibility)

Toasts are intended to be **small interruptions** to your visitors or users, so to help those with screen readers and similar assistive technologies, toasts are wrapped in an aria-live region. Changes to live regions (such as injecting/updating a toast component) are automatically announced by screen readers without needing to move the user's focus or otherwise interrupt the user. Additionally, `aria-atomic="true"` is automatically set to ensure that the entire toast is always announced as a single (atomic) unit, rather than announcing what was changed (which could lead to problems if you only update part of the toast's content, or if displaying the same toast content at a later point in time).

If you just need a single simple message to appear along the bottom or top of the user's window, use a fixed position `BAlert` instead.

For information on managing ARIA attributes for toast triggers, see the [ARIA Trigger Registration for Component Visibility](/bootstrap-vue-next/docs/reference/accessibility.html#aria-trigger-registration-for-component-visibility) section in the Accessibility reference.

### Accessibility tips [​](#accessibility-tips)

Typically, toast messages should display one or two-line non-critical messages that **do not** require user interaction. Without taking extra steps, toasts can have numerous accessibility issues that can impact both people with and without disabilities. The following list, while not complete, provides general guidelines when using toasts.

-   If the information needed is important for the process, e.g. for a list of errors in a form, then use the [`<BAlert>`](/bootstrap-vue-next/docs/components/alert.html) component instead of `<BToast>`.
-   `<BToast>`, by default, sets the attributes `role` to `'alert'` and `aria-live` to `'assertive'`. If it's an important message like an error, this default setting is appropriate, otherwise set the prop `is-status` to `true` which will change the attributes `role` to `'status'` and `aria-live` to `'polite'`.
-   Avoid popping up a toast message on page load. Performing unexpected actions on page load is very confusing to screen reader users. If a toast is needed on page load or route change, delay showing the toast by several seconds so that the screen reader will finish announcing information about the current page without interruption by the toast.
-   When the toast is persistently visible (i.e., when `model-value` is set to `true` and the toast does not auto-dismiss), you must have a close button to allow users to dismiss the toast. If you have also set the prop `no-close-button` to `true`, you must provide your own close button or dismiss the toast by some other means. Toasts have a tab index of `0` so that they can be reached by keyboard-only users. If `model-value` is set to `false`, the toast is not visible and no close button is required.
-   Avoid initiating many toasts in quick succession, as screen readers may interrupt reading the current toast and announce the new toast, causing the context of the previous toast to be missed.
-   For toasts with long textual content, set `model-value` to a larger timeout value, to allow users time to read the content of the toast. The average person reads about 200 words per minute, so a good length of time to keep messages up is 5 seconds, plus 300 extra milliseconds per word. The shortest default that should be used as a best practice is 5 seconds (5000ms). In addition to a reasonable default timeout, you could also allow the user to choose how long they want toasts to stay up for. Most people inherently understand whether they are fast or slow readers. Having a profile setting that is part of the user login will allow slow readers to pick a longer time if the messages are going away too fast, and fast readers to pick a short time if the messages are staying up too long.
-   To account for memory loss and distraction as well as disability-related issues such as ADHD, a best practice would be to implement a location where users can refer to a list of past toast messages which have been shown. Preferably this list should be sortable, with the default being chronological.

## Component Reference

### `<BToast>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BToast/BToast.vue)

-   [<BToast> Properties](#comp-reference-btoast-properties)
-   [<BToast> Events](#comp-reference-btoast-events)
-   [<BToast> Slots](#comp-reference-btoast-slots)
-   [<BToast> Exposed](#comp-reference-btoast-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.toast`

##### [Properties](#comp-reference-btoast-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| bg-variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to background of the component |
| body | `string` | `undefined` | The text content of the body |
| body-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the body |
| close-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the close button |
| close-content | `string` | `undefined` | Sets the text for the close button. The \`close\` slot takes precedence |
| close-label | `string` | `'Close'` | Sets the \`aria-label\` attribute for the close button |
| close-variant | `ButtonVariant | null` | `null` | Sets the color variant for the close button |
| header-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the header |
| header-tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag for the header |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| initial-animation | `boolean` | `false` | When set, enables the initial animation on mount |
| interval | `number | "requestAnimationFrame"` | `'requestAnimationFrame'` | Sets the interval for refreshing the countdown timer |
| is-status | `boolean` | `false` | When set to \`true\`, sets \`aria-live="polite"\` and \`role="status"\`; otherwise, \`aria-live="assertive"\` and \`role="alert"\` |
| lazy | `boolean` | `false` | When set, the content will not be mounted until opened |
| model-value | `boolean | number` | `false` | Controls toast visibility (\`boolean\`) or sets the auto-dismiss duration in milliseconds (\`number\`). |
| no-animation | `boolean` | `false` | When set, disables the animation |
| no-close-button | `boolean` | `false` | Hides the close button in the toast header. |
| no-fade | `boolean` | `false` | Alias for \`noAnimation\` |
| no-hover-pause | `boolean` | `false` | When set to true, disables pausing the timer on hover behavior |
| no-progress | `boolean` | `false` | Hides the progress bar in the toast. |
| no-resume-on-hover-leave | `boolean` | `false` | When set to true, the timer will not resume when the mouse leaves the element. It will need to be manually resumed |
| progress-props | `Omit<BProgressBarProps, 'label' | 'max' | 'value'>` | `undefined` | Configures the progress bar. No progress bar is shown if undefined |
| show | `boolean` | `false` | When set, and prop 'visible' is false on mount, will animate from closed to open on initial mount. Mainly to help with template show. Use model-value for reactive show/hide |
| show-on-pause | `boolean` | `true` | Keeps the component visible when paused |
| solid | `boolean` | `false` | Renders the toast with a solid background instead of a translucent one. |
| text-variant | `TextColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the text |
| title | `string` | `undefined` | Text content to place in the title |
| toast-class | `ClassValue` | `undefined` | Sets the CSS class(es) for the toast wrapper element. |
| trans-props | `TransitionProps` | `undefined` | Transition properties |
| unmount-lazy | `boolean` | `false` | When set and \`lazy\` is true, the content will be unmounted when closed |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |
| visible | `boolean` | `false` | When 'true', open without animation |

Extensions:

Extensions are selected properties from another component, integrated here. It may not include all original properties

[BLink props](#)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| active | `boolean` | `undefined` | When set to \`true\`, places the component in the active state with active styling |
| active-class | `string` | `'router-link-active'` | Configure the active CSS class applied when the link is active. |
| disabled | `boolean` | `false` | When set to \`true\`, disables the link's functionality. See above for details and limitations |
| exact-active-class | `string` | `'router-link-exact-active'` | Configure the active CSS class applied when the link is active with exact match. |
| href | `string` | `undefined` | Denotes the target URL of the link for standard a links |
| icon | `boolean` | `false` | When set to \`true\`, styles an icon at the beginning or end of the link text |
| no-prefetch | `boolean` | `false` | To improve the responsiveness of your Nuxt.js applications, when the link will be displayed within the viewport, Nuxt.js will automatically prefetch the code splitted page. Setting \`no-prefetch\` will disabled this feature for the specific link |
| no-rel |  | `undefined` |  |
| opacity | `10 | 25 | 50 | 75 | 100 | '10' | '25' | '50' | '75' | '100'` | `undefined` | Change the alpha opacity of the link \`rgba()\` color value |
| opacity-hover | `10 | 25 | 50 | 75 | 100 | '10' | '25' | '50' | '75' | '100'` | `undefined` | Change the alpha opacity of the link \`rgba()\` color value on hover |
| prefetch | `boolean` | `undefined` | To improve the responsiveness of your Nuxt.js applications, when the link will be displayed within the viewport, Nuxt.js will automatically prefetch the code splitted page. Setting \`prefetch\` to \`true\` or \`false\` will overwrite the default value of \`router.prefetchLinks\` |
| prefetch-on | `Partial<{visibility: boolean, interaction: boolean}>` | `undefined` | Allows custom control of when to prefetch links. Possible options are 'interaction' and 'visibility' (default). |
| prefetched-class | `string` | `undefined` | Not Yet Implmented: A class to apply to links that have been prefetched. |
| rel | `string` | `undefined` | Sets the 'rel' attribute on the rendered link |
| replace | `boolean` | `false` | Setting replace prop will call router.replace() instead of router.push() when clicked |
| router-component-name | `string` | `'router-link'` | BootstrapVue auto detects between \`<router-link>\` and \`<nuxt-link>\`. Set this this property to explicity set the name of the router component. |
| router-tag | `string` | `'a'` | Set the tag type for the link |
| stretched | `boolean` | `false` | When set to \`true\`, makes the link's \`containing block\` clickable via an \`::after\` pseudo element |
| target | `LinkTarget` | `undefined` | Sets the 'target' attribute on the rendered link |
| to | `RouteLocationRaw` | `undefined` | Denotes the target route of the link. When clicked, the value of the to prop will be passed to \`router.push()\` internally |
| underline-offset | `1 | 2 | 3 | '1' | '2' | '3'` | `undefined` | Change the distance of the underline from the bottom of the link text |
| underline-offset-hover | `1 | 2 | 3 | '1' | '2' | '3'` | `undefined` | Change the distance of the underline from the bottom of the link text on hover |
| underline-opacity | `0 | 10 | 25 | 50 | 75 | 100 | '0' | '10' | '25' | '50' | '75' | '100'` | `undefined` | Set's the opacity of the link's underline |
| underline-opacity-hover | `0 | 10 | 25 | 50 | 75 | 100 | '0' | '10' | '25' | '50' | '75' | '100'` | `undefined` | Set's the opacity of the link's underline on hover |
| underline-variant | `ColorVariant | null` | `null` | Set the color variant for the link underline independently of the link text |
| variant | `ColorVariant | null` | `null` | Set the color variant for the link |

##### [Events](#comp-reference-btoast-events)

| Event | Args | Description |
| --- | --- | --- |
| close | 
`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the close button is clicked. |
| close-countdown | 

`value``: number` - The remaining time in milliseconds before auto-dismissal.

 | Emitted during the countdown to auto-dismiss. |
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

 | Always emits just before the component is toggled via the exposed 'toggle()' function or useToggle composable . Cancelable (as long as component wasn't forcibly hidden) |
| toggle-prevented | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the component tried to toggle, but was prevented from doing so. This occurs when preventDefault() is called on the event, the user clicks escape and no-close-onbackdrop is set to true, or the user clicks on the backdrop and no-close-onbackdrop is set to true. |
| update:model-value | 

`value``: boolean | number` - The new visibility state (boolean) or countdown duration in milliseconds (number). When boolean: true = visible, false = hidden. When number: > 0 = countdown duration, 0 = countdown finished.

 | Emitted when the toast visibility or countdown duration changes. |

##### [Slots](#comp-reference-btoast-slots)

| Name | Scope | Description |
| --- | --- | --- |
| close | 
`id``: string` - The toast component ID

`show``: () => void` - Function to show the toast

`hide``: (trigger?: string, noTriggerEmit?: boolean) => void` - Function to hide the toast

`toggle``: () => void` - Function to toggle toast visibility

`active``: boolean` - Whether the countdown timer is active

`visible``: boolean` - Current visibility state of the toast

 | Content to place in the close button |
| default | 

`id``: string` - The toast component ID

`show``: () => void` - Function to show the toast

`hide``: (trigger?: string, noTriggerEmit?: boolean) => void` - Function to hide the toast

`toggle``: () => void` - Function to toggle toast visibility

`active``: boolean` - Whether the countdown timer is active

`visible``: boolean` - Current visibility state of the toast

 | Content to place in the toast body |
| title | 

`id``: string` - The toast component ID

`show``: () => void` - Function to show the toast

`hide``: (trigger?: string, noTriggerEmit?: boolean) => void` - Function to hide the toast

`toggle``: () => void` - Function to toggle toast visibility

`active``: boolean` - Whether the countdown timer is active

`visible``: boolean` - Current visibility state of the toast

 | Content to place in the toast header as title |

##### [Exposed](#comp-reference-btoast-exposed)

| Name | Type | Description |
| --- | --- | --- |
| hide | `() => void` | Hides the toast |
| pause | `() => void` | Pauses the countdown timer |
| restart | `() => void` | Restarts the countdown timer |
| resume | `() => void` | Resumes the countdown timer |
| show | `() => void` | Shows the toast |
| stop | `() => void` | Stops the countdown timer |
| toggle | `() => void` | Toggles the visibility of the toast |
