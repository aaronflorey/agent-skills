# Alert ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/alert.html

##### On this page

-   [Overview ​](#overview)
    -   [v-model Support ​](#v-model-support)
        
-   [Contextual Variants ​](#contextual-variants)
    -   [Conveying Meaning to Assistive Technologies ​](#conveying-meaning-to-assistive-technologies)
        
-   [Additional Content Inside Alerts ​](#additional-content-inside-alerts)
    -   [Color of Links Within Alerts ​](#color-of-links-within-alerts)
        
    -   [Custom title ​](#custom-title)
        
-   [Dismissible Alerts ​](#dismissible-alerts)
    -   [Auto-dismissing Alerts ​](#auto-dismissing-alerts)
        
-   [Fading alerts ​](#fading-alerts)
    
-   [Exposed functions ​](#exposed-functions)
    
-   [Accessibility ​](#accessibility)
    
-   [Timer Props ​](#timer-props)
    
-   [Component Reference](#component-reference)
    -   [<BAlert>](#b-alert)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            

# Alert [​](#alert)

Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BAlert/BAlert.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/alert.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#balert)

## Overview [​](#overview)

Alerts are available for any length of text, as well as an optional dismiss button (and optional auto-dismissing).

Default Alert

Success Alert

Dismissible Alert!

This alert will dismiss after 9.184 seconds...

Add a five seconds to the alert with countdown timer Show dismissible alert

HTML StackBlitz

vue

```
<template>
  <BAlert :model-value="true">Default Alert</BAlert>

  <BAlert
    variant="success"
    :model-value="true"
    >Success Alert</BAlert
  >

  <BAlert
    v-model="showDismissibleAlert"
    variant="danger"
    dismissible
  >
    Dismissible Alert!
  </BAlert>

  <BAlert
    v-model="dismissCountDown"
    dismissible
    variant="warning"
    @close-countdown="countdown = $event"
  >
    <p>This alert will dismiss after {{ countdown / 1000 }} seconds...</p>
    <BProgress
      variant="warning"
      :max="dismissCountDown"
      :value="countdown"
      height="4px"
    />
  </BAlert>

  <BButton
    variant="info"
    class="m-1"
    @click="dismissCountDown = dismissCountDown + 5000"
  >
    Add a five seconds to the alert with countdown timer
  </BButton>

  <BButton
    variant="info"
    class="m-1"
    @click="showDismissibleAlert = !showDismissibleAlert"
  >
    {{ !showDismissibleAlert ? 'Show' : 'Hide' }} dismissible alert
  </BButton>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const showDismissibleAlert = ref(false)

const dismissCountDown = ref(10000)
const countdown = ref(0)
</script>
```

### `v-model` Support [​](#v-model-support)

You can use the `v-model` directive to create two-way data bindings as in `v-model="showDismissibleAlert"`. This is useful when you use dismissible because when the user closes the alert, your variable will be updated. The v-model prop accepts boolean `true` or `false` to show and hide the alert respectively. It can also be set to a positive integer (representing seconds) to create a self-dismissing alert. See the [Auto Dismissing Alerts](#auto-dismissing-alerts) section below for details. `:model-value="true"` can be used to unconditionally show the alert, as the `show` prop did in `bootstrap-vue`. See the [migration guide](/bootstrap-vue-next/docs/migration-guide.html#balert) for details.

## Contextual Variants [​](#contextual-variants)

For proper styling of `BAlert`, use one of the four required contextual variants by setting the `variant` prop to one of the following: `info`, `success`, `warning`, or `danger`. The default is `info`.

Primary Alert

Secondary Alert

Success Alert

Danger Alert

Warning Alert

Info Alert

Light Alert

Dark Alert

HTML StackBlitz

template

```
<BAlert
  :model-value="true"
  variant="primary"
  >Primary Alert</BAlert
>
<BAlert
  :model-value="true"
  variant="secondary"
  >Secondary Alert</BAlert
>
<BAlert
  :model-value="true"
  variant="success"
  >Success Alert</BAlert
>
<BAlert
  :model-value="true"
  variant="danger"
  >Danger Alert</BAlert
>
<BAlert
  :model-value="true"
  variant="warning"
  >Warning Alert</BAlert
>
<BAlert
  :model-value="true"
  variant="info"
  >Info Alert</BAlert
>
<BAlert
  :model-value="true"
  variant="light"
  >Light Alert</BAlert
>
<BAlert
  :model-value="true"
  variant="dark"
  >Dark Alert</BAlert
>
```

### Conveying Meaning to Assistive Technologies [​](#conveying-meaning-to-assistive-technologies)

Using color variants to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies – such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (e.g. the visible text) or is included through alternative means, such as additional text hidden with the `.visually-hidden` class.

## Additional Content Inside Alerts [​](#additional-content-inside-alerts)

`BAlerts` can also contain additional HTML elements like headings and paragraphs, which will be styled with the appropriate color matching the variant.

#### Well done!

Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.

* * *

Whenever you need to, be sure to use margin utilities to keep things nice and tidy.

HTML StackBlitz

template

```
<BAlert
  :model-value="true"
  variant="success"
>
  <h4 class="alert-heading">Well done!</h4>
  <p>
    Aww yeah, you successfully read this important alert message. This example text is going to
    run a bit longer so that you can see how spacing within an alert works with this kind of
    content.
  </p>
  <hr />
  <p class="mb-0">
    Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
  </p>
</BAlert>
```

### Color of Links Within Alerts [​](#color-of-links-within-alerts)

Use the `.alert-link` utility CSS class to quickly provide matching colored links within any alert. Use on `<a>` or `BLink`.

[Primary Alert](#alert-link-colors)

[Secondary Alert](#alert-link-colors)

[Success Alert](#alert-link-colors)

[Danger Alert](#alert-link-colors)

[Warning Alert](#alert-link-colors)

[Info Alert](#alert-link-colors)

[Light Alert](#alert-link-colors)

[Dark Alert](#alert-link-colors)

HTML StackBlitz

template

```
<BAlert
  :model-value="true"
  variant="primary"
  ><a
    href="#alert-link-colors"
    class="alert-link"
    >Primary Alert</a
  ></BAlert
>
<BAlert
  :model-value="true"
  variant="secondary"
  ><a
    href="#alert-link-colors"
    class="alert-link"
    >Secondary Alert</a
  ></BAlert
>
<BAlert
  :model-value="true"
  variant="success"
  ><a
    href="#alert-link-colors"
    class="alert-link"
    >Success Alert</a
  ></BAlert
>
<BAlert
  :model-value="true"
  variant="danger"
  ><a
    href="#alert-link-colors"
    class="alert-link"
    >Danger Alert</a
  ></BAlert
>
<BAlert
  :model-value="true"
  variant="warning"
  ><a
    href="#alert-link-colors"
    class="alert-link"
    >Warning Alert</a
  ></BAlert
>
<BAlert
  :model-value="true"
  variant="info"
  ><a
    href="#alert-link-colors"
    class="alert-link"
    >Info Alert</a
  ></BAlert
>
<BAlert
  :model-value="true"
  variant="light"
  ><a
    href="#alert-link-colors"
    class="alert-link"
    >Light Alert</a
  ></BAlert
>
<BAlert
  :model-value="true"
  variant="dark"
  ><a
    href="#alert-link-colors"
    class="alert-link"
    >Dark Alert</a
  ></BAlert
>
```

### Custom title [​](#custom-title)

Use the `title` slot to render custom markup (icons, badges, styled text) in the alert heading. When provided, the slot overrides the `title` prop. If neither the `title` slot nor the `title` prop is set, the heading element is not rendered.

⚠️ Heads up!

The `title` slot lets you render custom markup in the alert heading — icons, badges, or any components you like.

HTML StackBlitz

template

```
<BAlert :model-value="true" variant="warning" dismissible>
  <template #title>
    <span class="fw-bold">⚠️ Heads up!</span>
  </template>
  <p class="mb-0">
    The <code>title</code> slot lets you render custom markup in the alert heading — icons,
    badges, or any components you like.
  </p>
</BAlert>
```

## Dismissible Alerts [​](#dismissible-alerts)

Using the `dismissible` prop it is possible to dismiss any `BAlert` inline. The alert must be v-modeled to a reactive value. This will add a close `X` button. Use the `dismiss-label` prop to change the hidden aria-label text associated with the dismiss button.

Dismissible Alert! Click the close button over there **⇒**

HTML StackBlitz

vue

```
<template>
  <BAlert
    v-model="showDismissibleAlert"
    dismissible
  >
    Dismissible Alert! Click the close button over there <b>&rArr;</b>
  </BAlert>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const showDismissibleAlert = ref(true)
</script>
```

### Auto-dismissing Alerts [​](#auto-dismissing-alerts)

To create a `BAlert` that dismisses automatically after a specified duration, set the `v-model` to the number of **milliseconds** you want the `BAlert` to remain visible. By default, the timer updates using `requestAnimationFrame`, which triggers an update approximately every second. Timed Alerts automatically pause when hovered over with a mouse, but you can disable this behavior using the `noHoverPause` prop. Ensure that the `v-model` value is an integer representing milliseconds. Any change to the `v-model` will reset the timer.

The **interval** prop determines how frequently the timer updates. While the default is `requestAnimationFrame`, you can set a custom interval. Negative values for either `v-model` or `interval` will stop the timer. If the `v-model` value does not divide evenly by the interval, the timer will continue to the nearest interval. For example, a `v-model` of 5400 ms with an interval of 1000 ms will run for 6000 ms. To avoid this, choose an interval that divides evenly into the `v-model`, such as 540 ms or 1080 ms.

Alert countdown: 10000 interval: 1000

Adjust Alert Time +1000Adjust Alert Time -1000Adjust Alert interval +100Adjust Alert interval -100Use requestAnimationFrame

HTML StackBlitz

vue

```
<template>
  <BAlert
    v-model="autoDismissingAlert"
    :interval="autoDismissingAlertInterval"
    @close-countdown="autoDismissingAlertCountdown = $event"
  >
    Alert countdown: {{ autoDismissingAlertCountdown }} interval: {{ autoDismissingAlertInterval }}
  </BAlert>

  <BButtonGroup>
    <BButton @click="autoDismissingAlert += 1000">Adjust Alert Time +1000</BButton>
    <BButton @click="autoDismissingAlert -= 1000">Adjust Alert Time -1000</BButton>
    <BButton
      @click="
        autoDismissingAlertInterval =
          typeof autoDismissingAlertInterval === 'string'
            ? 'requestAnimationFrame'
            : autoDismissingAlertInterval + 100
      "
      >Adjust Alert interval +100</BButton
    >
    <BButton
      @click="
        autoDismissingAlertInterval =
          typeof autoDismissingAlertInterval === 'string'
            ? 'requestAnimationFrame'
            : autoDismissingAlertInterval - 100
      "
      >Adjust Alert interval -100</BButton
    >
    <BButton @click="autoDismissingAlertInterval = 'requestAnimationFrame'"
      >Use requestAnimationFrame</BButton
    >
  </BButtonGroup>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const autoDismissingAlert = ref(10000)
const autoDismissingAlertInterval = ref<number | 'requestAnimationFrame'>(1000)
const autoDismissingAlertCountdown = ref(0)
</script>
```

## Fading alerts [​](#fading-alerts)

Use the `fade` prop to enable animation. By default alerts are not animated.

Note that `bootstrap-vue-next` uses Vue's transitions for this animation rather than bootstrap's `.fade` class.

Default Alert

Success Alert

Dismissible Alert!

This alert will dismiss after 9.195 seconds...

Add a five seconds to the alert with countdown timer Show dismissible alert

HTML StackBlitz

vue

```
<template>
  <BAlert
    :model-value="true"
    fade
    >Default Alert</BAlert
  >

  <BAlert
    variant="success"
    :model-value="true"
    fade
    >Success Alert</BAlert
  >

  <BAlert
    v-model="showDismissibleAlert"
    variant="danger"
    dismissible
    fade
  >
    Dismissible Alert!
  </BAlert>

  <BAlert
    v-model="dismissCountDown"
    dismissible
    variant="warning"
    fade
    @close-countdown="countdown = $event"
  >
    <p>This alert will dismiss after {{ countdown / 1000 }} seconds...</p>
    <BProgress
      variant="warning"
      :max="dismissCountDown"
      :value="countdown"
      height="4px"
    />
  </BAlert>

  <BButton
    variant="info"
    class="m-1"
    @click="dismissCountDown = dismissCountDown + 5000"
  >
    Add a five seconds to the alert with countdown timer
  </BButton>

  <BButton
    variant="info"
    class="m-1"
    @click="showDismissibleAlert = !showDismissibleAlert"
  >
    {{ !showDismissibleAlert ? 'Show' : 'Hide' }} dismissible alert
  </BButton>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const showDismissibleAlert = ref(false)

const dismissCountDown = ref(10000)
const countdown = ref(0)
</script>
```

## Exposed functions [​](#exposed-functions)

`BAlert` exposes functions to manipulate the timer state through template refs. See the [Component Reference Exposed section](#comp-reference-balert-exposed) for details.

Alert countdown: 9196

pauseresumerestartstop

HTML StackBlitz

vue

```
<template>
  <BAlert
    ref="myAlert"
    v-model="secondAutoDismissingAlert"
    @close-countdown="secondAutoDismissingAlertCountdown = $event"
  >
    Alert countdown: {{ secondAutoDismissingAlertCountdown }}
  </BAlert>

  <BButtonGroup>
    <BButton @click="pause">pause</BButton>
    <BButton @click="resume">resume</BButton>
    <BButton @click="restart">restart</BButton>
    <BButton @click="stop">stop</BButton>
  </BButtonGroup>
</template>

<script setup lang="ts">
import {BAlert} from 'bootstrap-vue-next/components/BAlert'
import {ref, useTemplateRef} from 'vue'

const secondAutoDismissingAlert = ref(10000)
const secondAutoDismissingAlertCountdown = ref(0)
const myAlert = useTemplateRef('myAlert')

// Where 'myAlert' is the **ref** of the BAlert
const pause = () => myAlert.value?.pause()
const resume = () => myAlert.value?.resume()
const restart = () => myAlert.value?.restart()
const stop = () => myAlert.value?.stop()
</script>
```

## Accessibility [​](#accessibility)

For information on managing ARIA attributes for alert triggers (when using dismissible alerts), see the [ARIA Trigger Registration for Component Visibility](/bootstrap-vue-next/docs/reference/accessibility.html#aria-trigger-registration-for-component-visibility) section in the Accessibility reference.

## Timer Props [​](#timer-props)

-   `Immediate`: Setting this property to `false` will cause a timer to not start immediately upon render. A timer that is not started is not rendered. It must manually be started with `resume()` or `restart()`. Default is `true`.
-   `showOnPause`: Setting this property to `false` will override the behavior of showing the Alert when the timer is paused. Default is `true`.

## Component Reference

### `<BAlert>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BAlert/BAlert.vue)

-   [<BAlert> Properties](#comp-reference-balert-properties)
-   [<BAlert> Events](#comp-reference-balert-events)
-   [<BAlert> Slots](#comp-reference-balert-slots)
-   [<BAlert> Exposed](#comp-reference-balert-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.alert`

##### [Properties](#comp-reference-balert-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| alert-class | `ClassValue` | `undefined` | CSS class (or classes) to add to the alert wrapper element |
| bg-variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to background of the component |
| body | `string` | `undefined` | The text content of the body |
| body-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the body |
| close-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the close button |
| close-content | `string` | `undefined` | Sets the text for the close button. The \`close\` slot takes precedence |
| close-label | `string` | `'Close'` | Sets the \`aria-label\` attribute for the close button |
| close-variant | `ButtonVariant | null` | `null` | Sets the color variant for the close button |
| dismissible | `boolean` | `false` | When set, enables the close button |
| header-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the header |
| header-tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag for the header |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| initial-animation | `boolean` | `false` | When set, enables the initial animation on mount |
| interval | `number | "requestAnimationFrame"` | `'requestAnimationFrame'` | Sets the interval for refreshing the countdown timer |
| is-status | `boolean` | `false` | When set to \`true\`, sets \`aria-live="polite"\` and \`role="status"\`; otherwise, \`aria-live="assertive"\` and \`role="alert"\` |
| lazy | `boolean` | `false` | When set, the content will not be mounted until opened |
| model-value | `boolean | number` | `false` | Controls the visibility of the alert. A \`boolean\` value directly controls the visibility. A number starts the countdown timer |
| no-animation | `boolean` | `false` | When set, disables the animation |
| no-fade | `boolean` | `false` | Alias for \`noAnimation\` |
| no-hover-pause | `boolean` | `false` | When set to true, disables pausing the timer on hover behavior |
| no-resume-on-hover-leave | `boolean` | `false` | When set to true, the timer will not resume when the mouse leaves the element. It will need to be manually resumed |
| progress-props | `Omit<BProgressBarProps, 'label' | 'max' | 'value'>` | `undefined` | Configures the progress bar. No progress bar is shown if undefined |
| show | `boolean` | `false` | When set, and prop 'visible' is false on mount, will animate from closed to open on initial mount. Mainly to help with template show. Use model-value for reactive show/hide |
| show-on-pause | `boolean` | `true` | Keeps the component visible when paused |
| text-variant | `TextColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the text |
| title | `string` | `undefined` | Text content to place in the title |
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

##### [Events](#comp-reference-balert-events)

| Event | Args | Description |
| --- | --- | --- |
| close | 
`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the close button is clicked. |
| close-countdown | 

`close-countdown``: number` - Time remaining on the timer

 | Emitted during the countdown with the time remaining |
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

`update:model-value``: boolean | number` - modelValue

 | Standard event to update the v-model |

##### [Slots](#comp-reference-balert-slots)

| Name | Scope | Description |
| --- | --- | --- |
| close |  | Content to place in the close button |
| default |  | Content to place in the Alert |
| title |  | Custom heading content for the alert. When provided, overrides the \`title\` prop. |

##### [Exposed](#comp-reference-balert-exposed)

| Name | Type | Description |
| --- | --- | --- |
| hide | `() => void` | Hides the alert |
| pause | `() => void` | Pauses the countdown timer |
| restart | `() => void` | Restarts the countdown timer |
| resume | `() => void` | Resumes the countdown timer |
| show | `() => void` | Shows the alert |
| stop | `() => void` | Stops the countdown timer |
| toggle | `() => void` | Toggles the visibility of the alert |
