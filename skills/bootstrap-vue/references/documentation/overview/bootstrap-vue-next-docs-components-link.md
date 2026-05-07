# Link ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/link.html

##### On this page

-   [Links without Router ​](#links-without-router)
    
-   [Links with Router and External Links ​](#links-with-router-and-external-links)
    
-   [Styling Links ​](#styling-links)
    
-   [Link opacity ​](#link-opacity)
    
-   [Link underlines ​](#link-underlines)
    -   [Underline color ​](#underline-color)
        
    -   [Underline offset ​](#underline-offset)
        
    -   [Underline opacity ​](#underline-opacity)
        
    -   [Hover variants ​](#hover-variants)
        
-   [Colored Links ​](#colored-links)
    
-   [Link disabled state ​](#link-disabled-state)
    
-   [Component Reference](#component-reference)
    -   [<BLink>](#b-link)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            

# Link [​](#link)

Use BootstrapVue's custom b-link component for generating a standard `<a>` link or `RouterLink`. `BLink` supports the `disabled` state and `click` event propagation.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BLink/BLink.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/link.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#blink)

## Links without Router [​](#links-without-router)

By defaut links with no options will default to # location.

[Link](#)

HTML StackBlitz

template

```
<BLink>Link</BLink>
```

## Links with Router and External Links [​](#links-with-router-and-external-links)

By specifying a value in the `href` prop, a standard link (`<a>`) element will be rendered. To generate a `<router-link>` instead, specify the route location via the `to` prop.

Router links support various additional props. Refer to the [Router support](/bootstrap-vue-next/docs/reference/router-links.html) reference section for details.

If your app is running under [Nuxt.js](https://nuxtjs.org), the [`<nuxt-link>`](https://nuxtjs.org/api/components-nuxt-link) component will be used instead of `<router-link>`. The `<nuxt-link>` component supports all the same features as `<router-link>` (as it is a wrapper component for `<router-link>`) and more.

[External Link to Bootstrap](https://getbootstrap.com/docs/5.3) [To page sample](sample) [Jump to Properties](#comp-ref--props)

HTML StackBlitz

template

```
<BLink
  href="https://getbootstrap.com/docs/5.3"
  target="_blank"
  rel="noopener"
  class="me-2"
>
  External Link to Bootstrap
</BLink>
<BLink
  to="sample"
  class="me-2"
>
  To page sample
</BLink>
<BLink href="#comp-ref--props"> Jump to Properties </BLink>
```

## Styling Links [​](#styling-links)

External Links can be specified with the `href` prop.

[External Link to Bootstrap](https://getbootstrap.com/docs/5.3) [Disabled Link](https://getbootstrap.com/docs/5.3)

HTML StackBlitz

template

```
<BLink
  class="btn btn-primary me-2"
  href="https://getbootstrap.com/docs/5.3"
  target="_blank"
  rel="noopener"
>
  External Link to Bootstrap
</BLink>
<BLink
  class="btn btn-primary disabled"
  href="https://getbootstrap.com/docs/5.3"
  target="_blank"
  rel="noopener"
>
  Disabled Link
</BLink>
```

## Link opacity [​](#link-opacity)

Change the alpha opacity of the link `rgba()` color value. Please be aware that changes to a color’s opacity can lead to links with [insufficient contrast](https://getbootstrap.com/docs/5.3/getting-started/accessibility/#color-contrast).

[10 link](#)

[25 link](#)

[50 link](#)

[75 link](#)

[100 link](#)

HTML StackBlitz

vue

```
<template>
  <p
    v-for="opacity in opacities"
    :key="opacity"
  >
    <BLink :opacity="opacity"> {{ opacity }} link </BLink>
  </p>
</template>

<script setup lang="ts">
import type {LinkOpacity} from 'bootstrap-vue-next'
const opacities: LinkOpacity[] = [10, 25, 50, 75, 100]
</script>
```

You can even change the opacity level on hover.

[10 link](#)

[25 link](#)

[50 link](#)

[75 link](#)

[100 link](#)

HTML StackBlitz

vue

```
<template>
  <p
    v-for="opacity in opacities"
    :key="opacity"
  >
    <BLink :opacity-hover="opacity"> {{ opacity }} link </BLink>
  </p>
</template>

<script setup lang="ts">
import type {LinkOpacity} from 'bootstrap-vue-next'
const opacities: LinkOpacity[] = [10, 25, 50, 75, 100]
</script>
```

## Link underlines [​](#link-underlines)

### Underline color [​](#underline-color)

Change the underline’s color independent of the link text color.

[primary link](#)

[secondary link](#)

[success link](#)

[danger link](#)

[warning link](#)

[info link](#)

[light link](#)

[dark link](#)

HTML StackBlitz

vue

```
<template>
  <p
    v-for="color in variants"
    :key="color"
  >
    <BLink :underline-variant="color"> {{ color }} link </BLink>
  </p>
</template>

<script setup lang="ts">
import type {BaseColorVariant} from 'bootstrap-vue-next'
const variants: (keyof BaseColorVariant)[] = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
]
</script>
```

### Underline offset [​](#underline-offset)

Change the underline’s distance from your text. Offset is set in `em` units to automatically scale with the element’s current `font-size`.

[1 link](#)

[2 link](#)

[3 link](#)

HTML StackBlitz

vue

```
<template>
  <p
    v-for="offset in offsets"
    :key="offset"
  >
    <BLink :underline-offset="offset"> {{ offset }} link </BLink>
  </p>
</template>

<script setup lang="ts">
import type {UnderlineOffset} from 'bootstrap-vue-next'
const offsets: UnderlineOffset[] = [1, 2, 3]
</script>
```

### Underline opacity [​](#underline-opacity)

Change the underline’s opacity.

[10 link](#)

[25 link](#)

[50 link](#)

[75 link](#)

[100 link](#)

HTML StackBlitz

vue

```
<template>
  <p
    v-for="opacity in opacities"
    :key="opacity"
  >
    <BLink :underline-opacity="opacity"> {{ opacity }} link </BLink>
  </p>
</template>

<script setup lang="ts">
import type {UnderlineOpacity} from 'bootstrap-vue-next'
const opacities: UnderlineOpacity[] = [10, 25, 50, 75, 100]
</script>
```

### Hover variants [​](#hover-variants)

Just like the setting `opacity` has a matching `opacity-hover` prop, `underline-offset` and `underline-opacity` have matching `underline-offset-hover` and `underline-opacity-hover` props. Mix and match to create unique link styles.

[Mutliple variants](#)

HTML StackBlitz

template

```
<BLink
  :underline-offset="3"
  underline-opacity="25"
  underline-offset-hover="1"
  underline-opacity-hover="100"
>
  Mutliple variants
</BLink>
```

## Colored Links [​](#colored-links)

You can use the `variant` prop to colorize links. Some of the link styles use a relatively light foreground color, and should only be used on a dark background in order to have sufficient contrast.

[primary link](#)

[secondary link](#)

[success link](#)

[danger link](#)

[warning link](#)

[info link](#)

[light link](#)

[dark link](#)

HTML StackBlitz

vue

```
<template>
  <p
    v-for="color in variants"
    :key="color"
  >
    <BLink :variant="color"> {{ color }} link </BLink>
  </p>
</template>

<script setup lang="ts">
import type {BaseColorVariant} from 'bootstrap-vue-next'

const variants: (keyof BaseColorVariant)[] = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
]
</script>
```

## Link disabled state [​](#link-disabled-state)

Disable link functionality by setting the `disabled` prop to true.

[Disabled Link](#foo)

HTML StackBlitz

template

```
<BLink
  href="#foo"
  disabled
  >Disabled Link</BLink
>
```

Disabling a link will set the Bootstrap v5 `.disabled` class on the link as well as handles stopping event propagation, preventing the default action from occurring, and removing the link from the document tab sequence (`tabindex="-1"`).

NOTE

Bootstrap v5 CSS currently does not style disabled links differently than non-disabled links. You can use the following custom CSS to style disabled links (by preventing hover style changes).

css

```
a.disabled {
  pointer-events: none;
}
```

## Component Reference

### `<BLink>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BLink/BLink.vue)

-   [<BLink> Properties](#comp-reference-blink-properties)
-   [<BLink> Events](#comp-reference-blink-events)
-   [<BLink> Slots](#comp-reference-blink-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `a, router‑link`

##### [Properties](#comp-reference-blink-properties)

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

##### [Events](#comp-reference-blink-events)

| Event | Args | Description |
| --- | --- | --- |
| click | 
`value``: MouseEvent` - Native click event

 | Emitted when the link is clicked |

##### [Slots](#comp-reference-blink-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the link |
