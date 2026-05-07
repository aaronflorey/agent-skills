# Avatar ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/avatar.html

##### On this page

-   [Overview ​](#overview)
    
-   [Avatar types ​](#avatar-types)
    -   [Image content ​](#image-content)
        
    -   [Text content ​](#text-content)
        
    -   [Custom content ​](#custom-content)
        
-   [Styling ​](#styling)
    -   [Variants ​](#variants)
        
    -   [Sizing ​](#sizing)
        
    -   [Square ​](#square)
        
    -   [Rounding ​](#rounding)
        
    -   [Alignment ​](#alignment)
        
-   [Actionable avatars ​](#actionable-avatars)
    -   [Button ​](#button)
        
    -   [Link ​](#link)
        
-   [Badge avatars ​](#badge-avatars)
    -   [Badge content ​](#badge-content)
        
    -   [Badge positioning ​](#badge-positioning)
        
-   [Avatar groups ​](#avatar-groups)
    -   [Group size ​](#group-size)
        
    -   [Group variant ​](#group-variant)
        
    -   [Group rounding ​](#group-rounding)
        
    -   [Group overlap ​](#group-overlap)
        
-   [Accessibility ​](#accessibility)
    
-   [Implementation notes ​](#implementation-notes)
    
-   [Component Reference](#component-reference)
    -   [<BAvatar>](#b-avatar)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
    -   [<BAvatarGroup>](#b-avatar-group)
        -   [Properties](#)
            
        -   [Slots](#)
            

# Avatar [​](#avatar)

Avatars are a custom component, and are typically used to display a user profile as a picture or short text. `BAvatar` provides several props for customizing its appearance such as color variant and roundness, and optionally supports acting as a button, link, or a [router link](/bootstrap-vue-next/docs/reference/router-links).

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BAvatar/BAvatar.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/avatar.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bavatar)

## Overview [​](#overview)

Avatars are lightweight components, which render inline by default, so that they are vertically centered beside any adjoining plain text. They also can be used as children of other components.

Using stand-alone:

BV

Using in components (list group) example:

J. Circlehead5

BVBootstrapVueNext12

Super Kitty9

ACME group7

HTML StackBlitz

template

```
<p>Using stand-alone:</p>
<div
  class="d-flex mb-4"
  style="column-gap: 1%"
>
  <BAvatar />
  <BAvatar
    variant="primary"
    text="BV"
  />
  <BAvatar
    variant="info"
    src="https://placekitten.com/300/300"
  />
  <BAvatar variant="success" />
</div>
<p>Using in components (list group) example:</p>
<BListGroup style="max-width: 300px">
  <BListGroupItem class="d-flex align-items-center">
    <BAvatar class="mx-3" />
    <span class="me-auto">J. Circlehead</span>
    <BBadge>5</BBadge>
  </BListGroupItem>
  <BListGroupItem class="d-flex align-items-center">
    <BAvatar
      variant="primary"
      text="BV"
      class="mx-3"
    />
    <span class="me-auto">BootstrapVueNext</span>
    <BBadge>12</BBadge>
  </BListGroupItem>
  <BListGroupItem class="d-flex align-items-center">
    <BAvatar
      variant="info"
      src="https://placekitten.com/300/300"
      class="mx-3"
    />
    <span class="me-auto">Super Kitty</span>
    <BBadge>9</BBadge>
  </BListGroupItem>
  <BListGroupItem class="d-flex align-items-center">
    <BAvatar
      variant="success"
      class="mx-3"
    />
    <span class="me-auto">ACME group</span>
    <BBadge>7</BBadge>
  </BListGroupItem>
</BListGroup>
```

## Avatar types [​](#avatar-types)

The avatar content can be either an image or short text string. Avatar content defaults to the [`'person-fill'` icon](https://icons.getbootstrap.com/icons/person-fill/) when no other content is specified.

You can also supply custom content via the default slot, although you may need to apply additional styling on the content.

### Image content [​](#image-content)

Use the `src` prop to specify a URL of an image to use as the avatar content. The image should have an aspect ratio of `1:1` (meaning the width and height should be equal), otherwise image aspect distortion will occur. The image will be scaled up or down to fit within the avatar's bounding box.

![avatar](https://picsum.photos/30/30/?image=40)![avatar](https://picsum.photos/30/30/?image=40)

HTML StackBlitz

template

```
<div
  class="d-flex"
  style="column-gap: 1%"
>
  <BAvatar src="https://picsum.photos/30/30/?image=40" />
  <BAvatar
    src="https://picsum.photos/30/30/?image=40"
    size="6rem"
  />
</div>
```

**Notes:**

-   When using a module bundler and project relative image URLs, please refer to the [Image Support](/bootstrap-vue-next/docs/reference/images.html) reference section for additional details
-   The `src` prop takes precedence over the `text` prop
-   If the image fails to load, the avatar will fall back to the value of the `text` prop. If the `text` props is not provided, then the default avatar image will be shown. Also, when the image fails to load, the `img-error` event will be emitted
-   [Variant colors](#variants) when using images not normally visible, unless the image fails load. The variant will affect the focus styling when the image avatar is also an [actionable avatar](#actionable-avatars)
-   If neither the `text` or `src` prop is provided _and_ the [default slot](#custom-content) has no content, then the `person-fill` image will be used

### Text content [​](#text-content)

You can specify a short string as the content of an avatar via the `text` prop. The string should be short (1 to 3 characters), and will be transformed via CSS to be all uppercase. The font size will be scaled relative to the [`size` prop setting](#sizing).

BVaFooBV

HTML StackBlitz

template

```
<div
  class="d-flex"
  style="column-gap: 1%"
>
  <BAvatar text="BV" />
  <BAvatar text="a" />
  <BAvatar text="Foo" />
  <BAvatar
    text="BV"
    size="4rem"
  />
</div>
```

### Custom content [​](#custom-content)

Use the `default` slot to render custom content in the avatar, for finer grained control of its appearance, or if using custom icons or SVGs e.g.:

Hello  
World你好  
世界

HTML StackBlitz

template

```
<div
  class="d-flex"
  style="column-gap: 1%"
>
  <BAvatar size="4em">Hello<br />World</BAvatar>
  <BAvatar size="4em">你好<br />世界</BAvatar>
  <BAvatar size="4em"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="80%"
      height="80%"
      fill="currentColor"
      class="bi bi-person-hearts"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M11.5 1.246c.832-.855 2.913.642 0 2.566-2.913-1.924-.832-3.421 0-2.566M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276ZM15 2.165c.555-.57 1.942.428 0 1.711-1.942-1.283-.555-2.281 0-1.71Z"
      /></svg
  ></BAvatar>
</div>
```

**Notes:**

-   The default slot takes precedence over the `text` or `src` props.
-   The default slot content will be wrapped in a `<span>` element to ensure proper centering.
-   You may need additional styling applied to the custom content to compensate for the [shape of avatar component](#rounding).

## Styling [​](#styling)

### Variants [​](#variants)

Use the `variant` prop to specify one of Bootstrap theme variant colors. The default variant is `secondary`.

HTML StackBlitz

template

```
<div
  class="d-flex"
  style="column-gap: 1%"
>
  <BAvatar variant="secondary" />
  <BAvatar variant="primary" />
  <BAvatar variant="dark" />
  <BAvatar variant="light" />
  <BAvatar variant="success" />
  <BAvatar variant="danger" />
  <BAvatar variant="warning" />
  <BAvatar variant="info" />
</div>
```

When displaying text inside the avatar, text colors are calculated based on the `variant` prop. The result is either `light` or `dark`. You can override the calculated text color by manually specifying the `bg-variant` and `text-variant` props. Note that `bg-variant` and `text-variant` take precedence over `variant`. See the [Color Variant Reference](/bootstrap-vue-next/docs/reference/color-variants.html#variant-interactions) for details.

PPAAAA

HTML StackBlitz

template

```
<div
  class="d-flex"
  style="column-gap: 1%"
>
  <BAvatar
    bg-variant="primary"
    text="P"
  />
  <BAvatar
    bg-variant="primary"
    text-variant="info"
    text="P"
  />
  <BAvatar
    bg-variant="secondary"
    text="A"
  />
  <BAvatar
    bg-variant="secondary"
    text-variant="info"
    text="A"
  />
  <BAvatar
    bg-variant="warning"
    text="A"
  />
  <BAvatar
    bg-variant="warning"
    text-variant="light"
    text="A"
  />
</div>
```

### Sizing [​](#sizing)

By default, avatars are sized to `2.5em` (which is relative to the current font size). You can change the size of the avatar by changing the current font size, or use the prop `size` to specify an explicit size. The sizes `sm`, `md` and `lg` default to `1.5em`, `2.5em` and `3.5em`. Numbers get converted to pixel values. Any other value _must_ include the units (such as `px`, `em`, or `rem`).

HTML StackBlitz

template

```
<div
  class="d-flex"
  style="column-gap: 1%"
>
  <BAvatar />
  <BAvatar size="sm" />
  <BAvatar size="lg" />
  <BAvatar :size="24" />
  <BAvatar size="3em" />
  <BAvatar size="72px" />
</div>
```

**Note:** Avatars are _always_ rendered with an aspect ratio of `1:1`.

### Square [​](#square)

Prefer a square avatar? simply set the `square` prop to `true`.

HTML StackBlitz

template

```
<BAvatar square />
```

### Rounding [​](#rounding)

`BAvatar` renders with a circular border radius. You can change the rounding by setting the prop `rounded` to any of the values of [`RadiusElement`](/bootstrap-vue-next/docs/types.html#radiuselement). When set to `true` (or the empty string `''`), it uses the Bootstrap default of medium rounding. When set to `circle`, it uses a border radius of 50%, resulting in a circle. Rounding specific edges is accomplished via the `rounded-top`, `rounded-bottom`, `rounded-start` and `rounded-end` props. See the [migration guide](/bootstrap-vue-next/docs/migration-guide.html#BAvatar) for differences from `bootstrap-vue`

HTML StackBlitz

template

```
<div
  class="d-flex"
  style="column-gap: 1%"
>
  <BAvatar rounded="sm" />
  <BAvatar rounded />
  <BAvatar rounded="lg" />
  <BAvatar rounded-bottom="sm" />
  <BAvatar rounded-start="md" />
  <BAvatar rounded-top="lg" />
  <BAvatar rounded-end="md" />
  <BAvatar rounded="circle" />
  <BAvatar
    rounded="circle"
    rounded-top="0"
  />
  <BAvatar rounded="0" />
</div>
```

**Notes:**

-   The `square` prop takes precedence over the `rounded` prop
-   Rather than `square` prop, you can set the `rounded` prop to the string `'0'` to achieve a square avatar

### Alignment [​](#alignment)

By default, `BAvatar` will be vertically centered with its adjoining content. In some cases you may want to alter the alignment, such as ensuring that a text-only avatar aligns its text with the adjoining text. Simply set a [vertical alignment utility](/bootstrap-vue-next/docs/reference/utility-classes.html) class on the component, such as `<BAvatar class="align-baseline" ...>` or `<BAvatar class="align-top" ...>`, etc.

## Actionable avatars [​](#actionable-avatars)

Easily create avatars that respond to clicks. Actionable avatars will appear in the document tab sequence, and are accessible for both screen reader and keyboard-only users.

Image avatars, when actionable, employ a basic scale transform on the image when hovered.

### Button [​](#button)

Want to trigger the opening of a modal or trigger an action? Set the `button` prop to instruct `BAvatar` to render as a `<button>` element. When rendered as a button, the component will emit the `click` event whenever clicked.

FF Button Text Avatar

![avatar](https://picsum.photos/30/30/?image=40) Button Image Avatar

HTML StackBlitz

template

```
<!-- eslint-disable no-alert -->
<template>
  <BListGroup>
    <BListGroupItem>
      <BAvatar button variant="primary" text="FF" class="align-baseline" @click="alertEvent" />
      Button Text Avatar
    </BListGroupItem>
    <BListGroupItem>
      <BAvatar button src="https://picsum.photos/30/30/?image=40" @click="alertEvent" />
      Button Image Avatar
    </BListGroupItem>
  </BListGroup>
</template>

<script setup lang="ts">
const alertEvent = () => {
  alert(`Clicked`)
}
</script>
```

The prop `button-type` can be used to control the type of button to render. Supported values are `'button'` (the default), `'submit'`, or `'reset'`.

### Link [​](#link)

Fancy an avatar as a link or router link? Simply set either the `href` or `to` prop (respectively). The `to` prop required that the [Vue Router](https://router.vuejs.org/) is installed.

[FF](#foo) Link Text Avatar

[![avatar](https://picsum.photos/30/30/?image=40)](#bar) Link Image Avatar

HTML StackBlitz

template

```
<BListGroup>
  <BListGroupItem>
    <BAvatar
      href="#foo"
      variant="primary"
      text="FF"
      class="align-baseline"
    />
    Link Text Avatar
  </BListGroupItem>
  <BListGroupItem>
    <BAvatar
      href="#bar"
      src="https://picsum.photos/30/30/?image=40"
    />
    Link Image Avatar
  </BListGroupItem>
</BListGroup>
```

**Note:**

The `button` prop takes precedence over the `href` and `to` props. For additional details on the `RouterLink` compatible props, please refer to the [Router support reference section](/bootstrap-vue-next/docs/reference/router-links.html).

## Badge avatars [​](#badge-avatars)

Easily add a badge to your avatar via the `badge` prop or `'badge'` slot, and the badge variant can be set via the `badge-variant` prop. The badge will scale with the size of the avatar.

![avatar](https://picsum.photos/30/30/?image=40)![avatar](https://picsum.photos/30/30/?image=40)BVBV

HTML StackBlitz

template

```
<div
  class="d-flex"
  style="column-gap: 1%"
>
  <BAvatar badge />
  <BAvatar
    badge
    badge-variant="danger"
    src="https://picsum.photos/30/30/?image=40"
  />
  <BAvatar
    badge
    badge-variant="warning"
  />
  <BAvatar
    badge
    badge-variant="success"
    src="https://picsum.photos/30/30/?image=40"
  />
  <BAvatar
    badge
    badge-variant="dark"
    text="BV"
  />
  <BAvatar
    square
    badge
    badge-variant="dark"
    text="BV"
  />
</div>
```

### Badge content [​](#badge-content)

Add textual content to the badge by supplying a string to the `badge` prop, or use the named slot `'badge'`.

BV7

HTML StackBlitz

template

```
<div
  class="d-flex"
  style="column-gap: 3%"
>
  <BAvatar badge="BV" />
  <BAvatar
    badge="7"
    variant="primary"
    badge-variant="dark"
  />
</div>
```

### Badge positioning [​](#badge-positioning)

By default, the badge appears on the bottom right of the avatar. You can use the `badge-placement` props to change the position. Badge positioning properties have changed from `bootstrap-vue`. See the [migration guide](/bootstrap-vue-next/docs/migration-guide.html#bavatar) for details.

HTML StackBlitz

template

```
<div
  class="d-flex"
  style="column-gap: 3%"
>
  <BAvatar badge />
  <BAvatar
    badge
    badge-placement="start"
  />
  <BAvatar
    badge
    badge-placement="top"
  />
  <BAvatar
    badge
    badge-placement="top-start"
  />
</div>
```

## Avatar groups [​](#avatar-groups)

BVOK

HTML StackBlitz

template

```
<BAvatarGroup size="60px">
  <BAvatar />
  <BAvatar
    text="BV"
    variant="primary"
  />
  <BAvatar
    src="https://placekitten.com/300/300"
    variant="info"
  />
  <BAvatar
    text="OK"
    variant="danger"
  />
  <BAvatar variant="warning" />
  <BAvatar
    src="https://placekitten.com/320/320"
    variant="dark"
  />
  <BAvatar variant="success" />
</BAvatarGroup>
```

**Notes:**

-   The `variant`, `square` and `rounded` props on `BAvatarGroup` will take precedence over the respective props on individual avatars.

### Group size [​](#group-size)

To size the avatars, use the prop `size` on `BAvatarGroup`. The `size` prop accepts the same type of values as the `size` prop on `BAvatar`. Note that the `size` prop will be ignored on individual avatars when they are placed inside a `BAvatarGroup`.

HTML StackBlitz

template

```
<BAvatarGroup size="5rem">
  <BAvatar />
  <BAvatar />
  <BAvatar />
  <BAvatar />
  <BAvatar />
</BAvatarGroup>
```

### Group variant [​](#group-variant)

Use the `variant` prop to color all child avatars in the `BAvatarGroup`. Note that the `variant` prop, when set, will override the the `variant` specified on individual avatars.

HTML StackBlitz

template

```
<BAvatarGroup variant="success">
  <BAvatar />
  <BAvatar variant="info" />
  <BAvatar />
  <BAvatar />
  <BAvatar />
</BAvatarGroup>
```

### Group rounding [​](#group-rounding)

Similar to the `variant` prop, the `BAvatarGroup` props `square` and `rounded` take precedence over the respective props on individual child avatars.

HTML StackBlitz

template

```
<BAvatarGroup rounded>
  <BAvatar />
  <BAvatar />
  <BAvatar />
  <BAvatar />
  <BAvatar />
</BAvatarGroup>
```

### Group overlap [​](#group-overlap)

By default, child avatars inside a `BAvatarGroup` will overlap by a factor of `0.3` (relative to the size of the avatar). You can control the overlap amount by setting the `overlap` prop to a value between `0` and `1`, where `0` means no overlap and `1` means 100% overlap.

HTML StackBlitz

template

```
<BAvatarGroup
  size="3rem"
  overlap="0.65"
>
  <BAvatar />
  <BAvatar />
  <BAvatar />
  <BAvatar />
  <BAvatar />
</BAvatarGroup>
```

**Note:**

`overlap` only has an effect when you explicitly set the `size` property as well.

## Accessibility [​](#accessibility)

Use the `aria-label` prop to provide an accessible, screen reader friendly, label for your avatar. If you have a badge, it is recommended to add information to your aria-label regarding the badge purpose or content (i.g. `'3 messages'`, `'online'`, etc.).

While the `click` event is emitted regardless if the `button`, `href`, or `to` props are set, it is highly recommended using the `button` prop when the click event should trigger an action (or use the `to` or `href` props when changing routes or changing URLs) for accessibility reasons.

## Implementation notes [​](#implementation-notes)

Avatars are based upon `BBadge` and `BButton` components, and as such, rely upon Bootstrap's `badge-*` and `btn-*` variant classes, as well as the `rounded-*`[utility classes](/bootstrap-vue-next/docs/reference/utility-classes.html).

## Component Reference

### `<BAvatar>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BAvatar/BAvatar.vue)

-   [<BAvatar> Properties](#comp-reference-bavatar-properties)
-   [<BAvatar> Events](#comp-reference-bavatar-events)
-   [<BAvatar> Slots](#comp-reference-bavatar-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.avatar`

##### [Properties](#comp-reference-bavatar-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| alt | `string` | `'avatar'` | Value to set for the \`alt\` attribute |
| aria-label | `string` | `undefined` | Sets the value of \`aria-label\` attribute on the rendered element |
| badge | `boolean | string` | `false` | When \`true\` shows an empty badge on the avatar, alternatively set to a string for content in the badge |
| badge-bg-variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the background of the badge |
| badge-dot-indicator | `boolean` | `false` | When \`true\` shows a small dot indicator on the Avatar. All of the badge props are applied to the dot. \`badge-dot-indicator\` takes precedence over \`badge\` |
| badge-pill | `boolean` | `false` | Renders the badge with pill styling |
| badge-placement | `CombinedPlacement` | `'bottom-end'` | Placement of the badge relative to the avatar. One of the values of \`CombinedPlacement\` |
| badge-text-variant | `TextColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the text |
| badge-variant | `ColorVariant | null` | `'primary'` | Applies one of the Bootstrap theme color variants to the badge |
| bg-variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to background of the component |
| button | `boolean` | `false` | When set to \`true\`, renders the avatar as a button |
| button-type | `ButtonType` | `'button'` | Type of button to render (i.e. \`button\`, \`submit\`, \`reset\`). Has no effect if prop button is not set |
| rounded | `boolean | RadiusElement` | `'circle'` | Specifies the type of rounding to apply to the component or its children. The \`square\` prop takes precedence |
| rounded-bottom | `boolean | RadiusElement` | `undefined` | Specifies the type of rounding to apply to the \`bottom\` corners of the component or its children |
| rounded-end | `boolean | RadiusElement` | `undefined` | Specifies the type of rounding to apply to the \`end\` corners of the component or its children |
| rounded-start | `boolean | RadiusElement` | `undefined` | Specifies the type of rounding to apply to the \`start\` corners of the component or its children |
| rounded-top | `boolean | RadiusElement` | `undefined` | Specifies the type of rounding to apply to the \`top\` corners of the component or its children |
| size | `Size | string` | `undefined` | Size of the avatar. Refer to the documentation for details |
| square | `boolean` | `false` | Disables rounding of the avatar, rendering the avatar with square corners |
| src | `string` | `undefined` | Image URL to use for the avatar |
| text | `string` | `undefined` | Text to place in the avatar |
| text-variant | `TextColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the text |
| variant | `ColorVariant | null` | `'secondary'` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

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

##### [Events](#comp-reference-bavatar-events)

| Event | Args | Description |
| --- | --- | --- |
| click | 
`click``: MouseEvent` - Native click event

 |  |
| img-error | 

`img-error``: Event` - On img-error

 | On image error |

##### [Slots](#comp-reference-bavatar-slots)

| Name | Scope | Description |
| --- | --- | --- |
| badge |  | Content to place in the avatar. Overrides props \`text\`, \`src\`, and \`icon-name\` |
| default |  | Content to place in the avatars optional badge. Overrides the \`badge\` prop |

### `<BAvatarGroup>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BAvatar/BAvatarGroup.vue)

-   [<BAvatarGroup> Properties](#comp-reference-bavatargroup-properties)
-   [<BAvatarGroup> Slots](#comp-reference-bavatargroup-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.avatar‑group`

##### [Properties](#comp-reference-bavatargroup-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| bg-variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to background of the component |
| overlap | `Numberish` | `0.3` | Specifies the amount of overlap between child avatars as a number between 0 and 1 |
| rounded | `boolean | RadiusElement` | `'circle'` | Specifies the type of rounding to apply to the component or its children. The \`square\` prop takes precedence. Refer to the documentation for details. |
| rounded-bottom | `boolean | RadiusElement` | `undefined` | Specifies the type of rounding to apply to the \`bottom\` corners of the component or its children |
| rounded-end | `boolean | RadiusElement` | `undefined` | Specifies the type of rounding to apply to the \`end\` corners of the component or its children |
| rounded-start | `boolean | RadiusElement` | `undefined` | Specifies the type of rounding to apply to the \`start\` corners of the component or its children |
| rounded-top | `boolean | RadiusElement` | `undefined` | Specifies the type of rounding to apply to the \`top\` corners of the component or its children |
| size | `Size | string` | `undefined` | Size of the child avatars. Refer to the documentation for details |
| square | `boolean` | `false` | Disables rounding of the child avatars, rendering the avatar with square corners |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |
| text-variant | `TextColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the text |
| variant | `ColorVariant | null` | `'secondary'` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Slots](#comp-reference-bavatargroup-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content (avatars) to place in the avatar group |
