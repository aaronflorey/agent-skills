# Breadcrumb ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/breadcrumb.html

##### On this page

-   [Overview ​](#overview)
    
-   [Breadcrumb items ​](#breadcrumb-items)
    -   [Breadcrumb items as array of strings ​](#breadcrumb-items-as-array-of-strings)
        
-   [Manually placed items ​](#manually-placed-items)
    
-   [Slots ​](#slots)
    
-   [Component Reference](#component-reference)
    -   [<BBreadcrumb>](#b-breadcrumb)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BBreadcrumbItem>](#b-breadcrumb-item)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            

# Breadcrumb [​](#breadcrumb)

Indicate the current page’s location within a navigational hierarchy that automatically adds separators via CSS.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BBreadcrumb/BBreadcrumb.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/breadcrumb.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bbreadcrumb)

## Overview [​](#overview)

HTML StackBlitz

vue

```
<template>
  <BBreadcrumb :items="breadcrumbItems" />
</template>

<script setup lang="ts">
import type {BreadcrumbItem} from 'bootstrap-vue-next'
import {ref} from 'vue'

const breadcrumbItems = ref<BreadcrumbItem[]>([
  {text: 'Admin', href: 'https://getbootstrap.com/'},
  {text: 'Manage', href: '#'},
  {text: 'Library'},
])
</script>
```

## Breadcrumb items [​](#breadcrumb-items)

Items are rendered using `:items` prop. It can be an array of objects to provide link and active state or an array of strings. Links can be `href`'s for anchor tags, or `to`'s for router-links. The active state of last element is automatically set if it is `undefined`.

### Breadcrumb items as array of strings [​](#breadcrumb-items-as-array-of-strings)

HTML StackBlitz

vue

```
<template>
  <BBreadcrumb :items="breadcrumbStringArray" />
</template>

<script setup lang="ts">
const breadcrumbStringArray = ['Admin', 'Manage', 'Library']
</script>
```

## Manually placed items [​](#manually-placed-items)

You may also manually place individual `BBreadcrumbItem` child components in the default slot of the `BBreadcrumb` component, as an alternative to using the `items` prop, for greater control over the content of each item:

HTML StackBlitz

vue

```
<template>
  <BBreadcrumb>
    <BBreadcrumbItem href="#home"> Home </BBreadcrumbItem>
    <BBreadcrumbItem href="#foo">Foo</BBreadcrumbItem>
    <BBreadcrumbItem href="#bar" @click="alertEvent">Bar</BBreadcrumbItem>
    <BBreadcrumbItem active>Baz</BBreadcrumbItem>
  </BBreadcrumb>
</template>

<script setup lang="ts">
const alertEvent = (event: MouseEvent) => {
  alert(`Event ${event.target}`)
}
</script>
```

Remember to set the `active` prop on the last item.

`BBreadcrumbItem` also supports the various `RouterLink` props such as `to`, etc. See the [Router Links](/bootstrap-vue-next/docs/reference/router-links.html) refererence page for more information.

## Slots [​](#slots)

Two slots are provided to put additional content before and after the breadcrumb. Use slot `prepend` to put content before the breadcrumb. Use slot `append` to put content after the breadcrumb.

HTML StackBlitz

template

```
<BBreadcrumb>
  <BBreadcrumbItem href="#home"> Home </BBreadcrumbItem>
  <BBreadcrumbItem href="#foo">Foo</BBreadcrumbItem>
  <BBreadcrumbItem href="#bar">Bar</BBreadcrumbItem>
  <BBreadcrumbItem active>Baz</BBreadcrumbItem>
  <template #prepend><span class="mx-2">prepend text</span></template>
  <template #append><span class="mx-2">append text</span></template>
</BBreadcrumb>
```

## Component Reference

### `<BBreadcrumb>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BBreadcrumb/BBreadcrumb.vue)

-   [<BBreadcrumb> Properties](#comp-reference-bbreadcrumb-properties)
-   [<BBreadcrumb> Slots](#comp-reference-bbreadcrumb-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.breadcrumb`

##### [Properties](#comp-reference-bbreadcrumb-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | `undefined` | ID of the breadcrumb component. When combined with the \`useBreadcrumb\` composable, it will use this id as a breadcrumb trail instead of the global trail. |
| items | `BreadcrumbItemRaw[]` | `undefined` | Array of \`BreadCrumbItem\`s or strings to render. See above for details. |
| ol-attrs | `Readonly<AttrsValue>` | `undefined` | Attributes to be applied to the inner ol element |
| ol-class | `ClassValue` | `undefined` | Class to be applied to the inner ol element |

##### [Slots](#comp-reference-bbreadcrumb-slots)

| Name | Scope | Description |
| --- | --- | --- |
| append |  | Content to append to the breadcrumb |
| default |  | Content (breadcrumb items) to place in the breadcrumb |
| prepend |  | Content to prepend to the breadcrumb |

### `<BBreadcrumbItem>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BBreadcrumb/BBreadcrumbItem.vue)

-   [<BBreadcrumbItem> Properties](#comp-reference-bbreadcrumbitem-properties)
-   [<BBreadcrumbItem> Events](#comp-reference-bbreadcrumbitem-events)
-   [<BBreadcrumbItem> Slots](#comp-reference-bbreadcrumbitem-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.breadcrumb‑item`

##### [Properties](#comp-reference-bbreadcrumbitem-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-current | `string` | `'location'` | Sets the value of the 'aria-current' attribute (when the item is the active item). Supported string values are 'location', 'page', or 'true' |
| text | `string` | `undefined` | Text to render in the breadcrumb item |

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

##### [Events](#comp-reference-bbreadcrumbitem-events)

| Event | Args | Description |
| --- | --- | --- |
| click | 
`click``: MouseEvent` - Native click event object

 | Emitted when the breadcrumb item is clicked |

##### [Slots](#comp-reference-bbreadcrumbitem-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the breadcrumb item |
