# Image ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/image.html

##### On this page

-   [Image src resolving ​](#image-src-resolving)
    
-   [Styling images ​](#styling-images)
    -   [Responsive images ​](#responsive-images)
        
    -   [Image thumbnails ​](#image-thumbnails)
        
    -   [Rounded corners ​](#rounded-corners)
        
    -   [Aligning images ​](#aligning-images)
        
-   [Blank (or solid color) images ​](#blank-or-solid-color-images)
    
-   [srcset support ​](#srcset-support)
    
-   [Lazy loaded images ​](#lazy-loaded-images)
    
-   [Using with NuxtImg ​](#using-with-nuxtimg)
    
-   [Component Reference](#component-reference)
    

# Image [​](#image)

Documentation and examples for opting images (via `BImg` component) into responsive behavior (so they never become larger than their parent elements), optionally adding lightweight styles to them — all via props.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BImage/BImage.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/image.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bimg)

BootstrapVueNext's image components support rounded images, thumbnail styling, alignment, and even the ability to create blank images with an optional solid background color. Support for lazy loaded images is available via the `lazy` prop.

## Image src resolving [​](#image-src-resolving)

The `src` prop and `blank-src` prop, out of the box, works only with absolute or fully-qualified-domain-name URLs. See the [Image Support](/bootstrap-vue-next/docs/reference/images.html) referece page for more details.

## Styling images [​](#styling-images)

Several props are available for styling the rendered image element. The following sub-sections cover the various options.

### Responsive images [​](#responsive-images)

Images in BootstrapVueNext can be made responsive with the `fluid` prop (which sets `max-width: 100%; height: auto;` via CSS classes) so that it scales with the parent element - up to the maximum native width of the image.

![Responsive image](https://picsum.photos/1024/400/?image=41)

HTML StackBlitz

template

```
<BImg
  src="https://picsum.photos/1024/400/?image=41"
  fluid
  alt="Responsive image"
/>
```

To make a fluid image that will grow to fill the width of its container, use the `fluid-grow` prop. Note this may cause blurring on small bitmap images.

##### Small image with `fluid`:

![Fluid image](https://picsum.photos/300/150/?image=41)

##### Small image with `fluid-grow`:

![Fluid-grow image](https://picsum.photos/300/150/?image=41)

HTML StackBlitz

template

```
<h5>Small image with <code>fluid</code>:</h5>
<BImg
  src="https://picsum.photos/300/150/?image=41"
  fluid
  alt="Fluid image"
/>
<h5 class="my-3">Small image with <code>fluid-grow</code>:</h5>
<BImg
  src="https://picsum.photos/300/150/?image=41"
  fluid-grow
  alt="Fluid-grow image"
/>
```

Use the `block` prop to force the image to display as a block element rather than the browser default of inline-block element.

### Image thumbnails [​](#image-thumbnails)

You can use prop `thumbnail` to give an image a rounded light border appearance.

![Image 1](https://picsum.photos/250/250/?image=54)

![Image 2](https://picsum.photos/250/250/?image=58)

![Image 3](https://picsum.photos/250/250/?image=59)

HTML StackBlitz

template

```
<BContainer
  fluid
  class="p-4 bg-dark"
>
  <BRow>
    <BCol>
      <BImg
        thumbnail
        fluid
        src="https://picsum.photos/250/250/?image=54"
        alt="Image 1"
      />
    </BCol>
    <BCol>
      <BImg
        thumbnail
        fluid
        src="https://picsum.photos/250/250/?image=58"
        alt="Image 2"
      />
    </BCol>
    <BCol>
      <BImg
        thumbnail
        fluid
        src="https://picsum.photos/250/250/?image=59"
        alt="Image 3"
      />
    </BCol>
  </BRow>
</BContainer>
```

### Rounded corners [​](#rounded-corners)

`BImg` renders without rounding by default. You can change the rounding by setting the prop `rounded` to any of the values of [`RadiusElement`](/bootstrap-vue-next/docs/types.html#radiuselement). When set to `true` (or the empty string `''`), it uses the Bootstrap default of medium rounding. When set to `circle`, it uses a border radius of 50%, resulting in a circle. Rounding specific edges is accomplished via the `rounded-top`, `rounded-bottom`, `rounded-start` and `rounded-end` props. See the [migration guide](/bootstrap-vue-next/docs/migration-guide.html#BAvatar) for differences from `bootstrap-vue`

![Rounded image](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2275%22%20height%3D%2275%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2075%2075%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3A%23777%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)![Rounded image](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2275%22%20height%3D%2275%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2075%2075%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3A%23777%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)![Top-rounded image](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2275%22%20height%3D%2275%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2075%2075%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3A%23777%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)![Right-rounded image](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2275%22%20height%3D%2275%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2075%2075%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3A%23777%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)![Bottom-rounded image](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2275%22%20height%3D%2275%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2075%2075%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3A%23777%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)![Left-rounded image](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2275%22%20height%3D%2275%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2075%2075%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3A%23777%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)![Circle image](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2275%22%20height%3D%2275%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2075%2075%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3A%23777%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)![Not rounded image](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2275%22%20height%3D%2275%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2075%2075%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3A%23777%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)

HTML StackBlitz

vue

```
<template>
  <div class="d-flex gap-2">
    <BImg
      v-bind="mainProps"
      alt="Rounded image"
    />
    <BImg
      v-bind="mainProps"
      rounded
      alt="Rounded image"
    />
    <BImg
      v-bind="mainProps"
      rounded-top
      alt="Top-rounded image"
    />
    <BImg
      v-bind="mainProps"
      rounded-end
      alt="Right-rounded image"
    />
    <BImg
      v-bind="mainProps"
      rounded-bottom
      alt="Bottom-rounded image"
    />
    <BImg
      v-bind="mainProps"
      rounded-start
      alt="Left-rounded image"
    />
    <BImg
      v-bind="mainProps"
      rounded="circle"
      alt="Circle image"
    />
    <BImg
      v-bind="mainProps"
      rounded="0"
      alt="Not rounded image"
    />
  </div>
</template>

<script setup lang="ts">
const mainProps = {
  blank: true,
  blankColor: '#777',
  width: 75,
  height: 75,
  class: 'm1',
}
</script>
```

### Aligning images [​](#aligning-images)

Align images with the boolean props `left` (floats left) `right`(floats right), and `center` (auto left+right margins). You can also center images by placing them in a container that has the class `text-center`.

**Left and right aligned: (float)**

![Left image](https://picsum.photos/125/125/?image=58)![Right image](https://picsum.photos/125/125/?image=58)

HTML StackBlitz

template

```
<BImg
  placement="start"
  src="https://picsum.photos/125/125/?image=58"
  alt="Left image"
/>
<BImg
  placement="end"
  src="https://picsum.photos/125/125/?image=58"
  alt="Right image"
/>
```

**Center aligned: (block)**

![Center image](https://picsum.photos/125/125/?image=58)

HTML StackBlitz

template

```
<BImg
  placement="center"
  src="https://picsum.photos/125/125/?image=58"
  alt="Center image"
/>
```

Note: `left` takes precedence over `right` which takes precedence over `center`.

## Blank (or solid color) images [​](#blank-or-solid-color-images)

`BImg` provides built-in support for generating blank images (transparent by default) of any width and height, by setting the `blank` prop, and specifying `width` and `height` values (in pixels). You can apply any of the other `BImg` props to change the style/behavior of the generated image.

Use the `blank-color` prop to set the blank image color. The `blank-color`prop can accept any CSS color value:

-   Named colors — i.e. `orange` or `blue`
-   Hex colors — i.e. `#FF9E2C`
-   RGB and RGBa colors — i.e. `rgb(255, 158, 44)` and `rgba(255, 158, 44, .5)`
-   HSL and HSLa colors — i.e. `hsl(32, 100%, 59%)` and `hsla(32, 100%, 59%, .5)`

The default `blank-color` is `transparent`.

![Transparent image](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2275%22%20height%3D%2275%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2075%2075%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3Atransparent%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)![HEX shorthand color image (#777)](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2275%22%20height%3D%2275%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2075%2075%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3A%23777%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)![Named color image (red)](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2275%22%20height%3D%2275%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2075%2075%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3Ared%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)![Named color image (black)](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2275%22%20height%3D%2275%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2075%2075%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3Ablack%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)![HEX color image](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2275%22%20height%3D%2275%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2075%2075%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3A%23338833%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)![RGBa color image](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2275%22%20height%3D%2275%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2075%2075%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3Argba\(128%2C%20255%2C%20255%2C%200.5\)%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)![HEX shorthand color (#88f)](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2275%22%20height%3D%2275%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2075%2075%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3A%2388f%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)

HTML StackBlitz

vue

```
<template>
  <div class="d-flex gap-2">
    <BImg
      v-bind="propsTr"
      alt="Transparent image"
    />
    <BImg
      v-bind="propsTr"
      blank-color="#777"
      alt="HEX shorthand color image (#777)"
    />
    <BImg
      v-bind="propsTr"
      blank-color="red"
      alt="Named color image (red)"
    />
    <BImg
      v-bind="propsTr"
      blank-color="black"
      alt="Named color image (black)"
    />
    <BImg
      v-bind="propsTr"
      blank-color="#338833"
      alt="HEX color image"
    />
    <BImg
      v-bind="propsTr"
      blank-color="rgba(128, 255, 255, 0.5)"
      alt="RGBa color image"
    />
    <BImg
      v-bind="propsTr"
      blank-color="#88f"
      alt="HEX shorthand color (#88f)"
    />
  </div>
</template>

<script setup lang="ts">
const propsTr = {
  blank: true,
  width: 75,
  height: 75,
  class: 'm1',
}
</script>
```

**Notes:**

-   In blank image mode, if only one of width or height is set, the image will have both width and height set to the same value
-   In blank image mode, if width and height are not set, both width and height will internally be set to 1
-   The `blank` prop takes precedence over the `src` prop. If you set both and later set `blank` to `false` the image specified in `src` will then be displayed
-   Blank images are rendered using SVG image data URLs
-   The `width` and `height` props will also apply the `width` and `height` attributes to the rendered `<img>` tag, even if `blank` is not set

## `srcset` support [​](#srcset-support)

`BImg` supports the [`srcset` and `sizes` attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) on images. The props accept either a string value, or an array of strings (the array of strings will be converted into a single string separated by commas).

For details on usage of these attributes, refer to [MDN's Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) guide.

**Notes:**

-   If the `blank` prop is set, then `srcset` and `sizes` props are ignored
-   IE 11 does not support `srcset` and `sizes`, so ensure you have a value for the `src` prop
-   Vue-loader does not support project relative URLs (asset URLs) on the `srcset` attribute; instead use `require(...)` to resolve the individual URL paths. Be cautious of creating a string of data URI's longer than supported by the maximum attribute value length of the browser. If your webpack config has a limit for the `url-loader` and you want to prevent inline data-urls, you may have to overwrite the loader limits: `require('!!url-loader?limit=0!./assets/photo.jpg')`

## Lazy loaded images [​](#lazy-loaded-images)

Lazy loaded images are actived through the `lazy` prop. Eventually, the component will be expanded to include placeholder slots, but are not available at this time. See the [migration guide](/bootstrap-vue-next/docs/migration-guide.html#bimg) for details.

We implement this `lazy` prop using the native `loading` attribute. See the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading) for details including how this effect how the native [`load` event](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event) works.

## Using with NuxtImg [​](#using-with-nuxtimg)

If you are using [Nuxt](https://nuxt.com/) and want to leverage [`NuxtImg`](https://image.nuxt.com/usage/nuxt-img) for optimized image handling, you can do so by creating a wrapper component around `BImg`. Since the library cannot automatically detect whether `NuxtImg` is available, you need to set this up yourself.

First, create a wrapper component that passes `NuxtImg` as the `tag` prop:

vue

```
<!-- components/BNuxtImg.vue -->
<template>
  <BImg v-bind="$attrs" tag="NuxtImg" />
</template>

<script setup lang="ts">
import {data} from '../../data/components/image.data'

import {BImg} from 'bootstrap-vue-next'
</script>
```

Then, use your wrapper component in place of `BImg`:

vue

```
<template>
  <BNuxtImg src="/my-image.png" fluid />
</template>

<script setup lang="ts">
import BNuxtImg from '~/components/BNuxtImg.vue'
</script>
```

This approach allows you to use all of `BImg`'s styling and functionality (such as `fluid`, `thumbnail`, `rounded`, etc.) while benefiting from `NuxtImg`'s image optimizations.

## Component Reference
