# Offcanvas ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/offcanvas.html

##### On this page

-   [Overview ​](#overview)
    
-   [Styling ​](#styling)
    -   [Title ​](#title)
        
    -   [Customizing Location ​](#customizing-location)
        
    -   [Variants ​](#variants)
        
    -   [Shadow ​](#shadow)
        
    -   [Borders ​](#borders)
        
    -   [Width ​](#width)
        
    -   [Padding ​](#padding)
        
    -   [Disable slide transition ​](#disable-slide-transition)
        
    -   [Scoped default slot ​](#scoped-default-slot)
        
    -   [Header ​](#header)
        -   [Hiding the default header ​](#hiding-the-default-header)
            
    -   [Footer ​](#footer)
        
    -   [Lazy rendering ​](#lazy-rendering)
        
    -   [Backdrop ​](#backdrop)
        
-   [Visibility control ​](#visibility-control)
    -   [v-b-toggle directive ​](#v-b-toggle-directive)
        
    -   [v-model ​](#v-model)
        
-   [Events ​](#events)
    
-   [Responsive ​](#responsive)
    
-   [Sidebar ​](#sidebar)
    
-   [Accessibility ​](#accessibility)
    
-   [Implementation notes ​](#implementation-notes)
    
-   [See also ​](#see-also)
    
-   [Component Reference](#component-reference)
    -   [<BOffcanvas>](#b-offcanvas)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            

# Offcanvas [​](#offcanvas)

The `<BOffcanvas>` component is a fixed-position toggleable slide out box, which can be used for navigation, menus, details, etc. It can be positioned on any side of the viewport (top, bottom, start, or end), with optional backdrop support.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BOffcanvas/BOffcanvas.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/offcanvas.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bsidebar)

## Overview [​](#overview)

You can place almost any content inside the `<BOffcanvas>`[optionally scoped default slot](#scoped-default-slot), such as text, buttons, forms, images, or [vertical navs](/bootstrap-vue-next/docs/components/nav.html#vertical-variation).

The component supports a header and built-in close button, of which you can optionally disable and provide your own header (if needed), and can be easily toggled with our [`v-b-toggle` directive](/bootstrap-vue-next/docs/directives/BToggle.html).

The component has minimal default styling, which provides you with great flexibility in laying out the content of the offcanvas.

Toggle Offcanvas

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton v-b-toggle.offcanvas-1>Toggle Offcanvas</BButton>
    <BOffcanvas
      id="offcanvas-1"
      title="Offcanvas"
      shadow
    >
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <BImg
          src="https://picsum.photos/500/500/?image=54"
          fluid
          thumbnail
        />
      </div>
    </BOffcanvas>
  </div>
</template>
```

If the content is taller than the available viewport height, vertical scrolling will automatically be enabled via CSS on the body of the offcanvas.

## Styling [​](#styling)

Several props are provided for controlling the appearance of the offcanvas.

### Title [​](#title)

Offcanvas components should have a title (specifically for accessibility reasons). Easily set the title that appears in the header either via the `title` prop or the `title` slot. Note the `title` slot takes precedence over the `title` prop.

If the [`no-header` prop](#header) is set, then neither the `title` prop or `title` slot have any effect.

If you do not provide a title, use either the `aria-label` or `aria-labelledby` props to provide an accessible title for the offcanvas. See the [Accessibility section](#accessibility) below for additional details.

### Customizing Location [​](#customizing-location)

Customize location with four standard options `top, bottom, start, end`.

Show startShow endShow bottomShow top

HTML StackBlitz

vue

```
<template>
  <BButton
    class="m-2"
    aria-controls="offcanvas-locations"
    :aria-expanded="show ? 'true' : 'false'"
    @click="click('start')"
    >Show start</BButton
  >
  <BButton
    class="m-2"
    aria-controls="offcanvas-locations"
    :aria-expanded="show ? 'true' : 'false'"
    @click="click('end')"
    >Show end</BButton
  >
  <BButton
    class="m-2"
    aria-controls="offcanvas-locations"
    :aria-expanded="show ? 'true' : 'false'"
    @click="click('bottom')"
    >Show bottom</BButton
  >
  <BButton
    class="m-2"
    aria-controls="offcanvas-locations"
    :aria-expanded="show ? 'true' : 'false'"
    @click="click('top')"
    >Show top</BButton
  >

  <BOffcanvas
    id="offcanvas-locations"
    v-model="show"
    :title="`Offcanvas ${placement}`"
    :placement="placement"
  />
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type {Placement} from 'bootstrap-vue-next'

const show = ref(false)
const placement = ref<Placement>('start')

const click = (place: Placement = 'start') => {
  placement.value = place
  show.value = !show.value
}
</script>
```

### Variants [​](#variants)

Bootstrap 5 offcanvas components use utility classes for styling. You can apply background and text color utilities via the `body-class` or `header-class` props, or by wrapping content in elements with appropriate classes.

Toggle Offcanvas

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton v-b-toggle.offcanvas-variant>Toggle Offcanvas</BButton>
    <BOffcanvas
      id="offcanvas-variant"
      title="Offcanvas"
      shadow
    >
      <div class="px-3 py-2 bg-dark text-light">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <BImg
          src="https://picsum.photos/500/500/?image=54"
          fluid
          thumbnail
        />
      </div>
    </BOffcanvas>
  </div>
</template>
```

### Shadow [​](#shadow)

Prefer an offcanvas with a backdrop shadow? Set the `shadow` prop to either boolean `true` for a medium shadow, `'sm'` for a small shadow, or `'lg'` for a larger shadow. Set it to `false` (the default) for no shadow.

### Borders [​](#borders)

By default, `<BOffcanvas>` has no borders. Use [border utility classes](/bootstrap-vue-next/docs/reference/utility-classes.html) to add border(s) to `<BOffcanvas>` via the `class` prop, or use CSS style overrides.

Toggle Offcanvas

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton v-b-toggle.offcanvas-border>Toggle Offcanvas</BButton>
    <BOffcanvas
      id="offcanvas-border"
      title="Offcanvas with Border"
      class="border-end border-danger"
    >
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <BImg
          src="https://picsum.photos/500/500/?image=54"
          fluid
          thumbnail
        />
      </div>
    </BOffcanvas>
  </div>
</template>
```

### Width [​](#width)

By default the width of `<BOffcanvas>` is set to `320px` (100% on 'xs' screens). Simply provide a value via the `width` prop (i.e. `'180px'`, `'20em'`, etc.) to override this default. The max width is set to `100%` via CSS.

### Padding [​](#padding)

The offcanvas by default has no padding on the body. You can apply padding utility classes via the `body-class` prop, or use margin/padding utility classes on the content of the offcanvas.

### Disable slide transition [​](#disable-slide-transition)

By default the offcanvas will use a sliding transition when showing and hiding. You can disable the slide transition via the `no-animation` prop.

**Note:** The BootstrapVueNext defined transition effect of this component is dependent on the `prefers-reduced-motion` media query. See the [reduced motion section of our accessibility documentation](/bootstrap-vue-next/docs/reference/accessibility.html) for additional details.

When disabling the slide transition, the fade transition of the [optional backdrop](#backdrop) will also be disabled.

### Scoped default slot [​](#scoped-default-slot)

The `default` slot allows you to provide the body content for your offcanvas. It is optionally scoped. The examples in the following sections demonstrate the use of the default slot scope.

You can apply arbitrary classes to the body section via the `body-class` prop.

### Header [​](#header)

By default, `<BOffcanvas>` has a header with optional title and a close button. You can supply a title via the `title` prop, or via the optionally scoped slot `title`.

If you want to provide a completely custom header, you can use the optionally scoped `header` slot.

You can apply arbitrary classes to the header section via the `header-class` prop, to override the default padding, etc.

#### Hiding the default header [​](#hiding-the-default-header)

You can disable the default header (including the close button) via the `no-header` prop. Note that you will need to provide a method of closing the offcanvas. The `default` slot is scoped, which includes a `hide()` method that can be used to close the offcanvas.

Toggle Offcanvas

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton v-b-toggle.offcanvas-no-header>Toggle Offcanvas</BButton>
    <BOffcanvas
      id="offcanvas-no-header"
      aria-labelledby="offcanvas-no-header-title"
      no-header
      shadow
    >
      <template #default="scope">
        <div class="p-3">
          <h4 id="offcanvas-no-header-title">Custom header offcanvas</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <BImg src="https://picsum.photos/500/500/?image=54" fluid thumbnail />
          <BButton variant="primary" block @click="() => scope.hide()">Close Offcanvas</BButton>
        </div>
      </template>
    </BOffcanvas>
  </div>
</template>
```

### Footer [​](#footer)

`<BOffcanvas>` provides a `footer` slot (optionally scoped), to allow you to provide content that appears at the bottom of the offcanvas. The `footer` slot is scoped, which includes a `hide()` method that can be used to close the offcanvas.

Toggle Offcanvas

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton v-b-toggle.offcanvas-footer>Toggle Offcanvas</BButton>
    <BOffcanvas id="offcanvas-footer" aria-label="Offcanvas with custom footer" no-header shadow>
      <template #footer="scope">
        <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
          <strong class="me-auto">Footer</strong>
          <BButton size="sm" @click="() => scope?.hide()">Close</BButton>
        </div>
      </template>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <BImg src="https://picsum.photos/500/500/?image=54" fluid thumbnail />
      </div>
    </BOffcanvas>
  </div>
</template>
```

You can apply arbitrary classes to the footer section via the `footer-class` prop.

### Lazy rendering [​](#lazy-rendering)

In some instances, you may not want the content rendered when the offcanvas is not visible. Simply set the `lazy` prop on `<BOffcanvas>`. When `lazy` is `true`, the body and optional footer will _not_ be rendered (removed from DOM) whenever the offcanvas is closed.

### Backdrop [​](#backdrop)

Add a basic backdrop when the offcanvas is open via enabling the backdrop (default behavior). When shown, the offcanvas will display an opaque backdrop. Clicking on the backdrop will close the offcanvas, unless the `no-close-on-backdrop` prop is set to `true`.

To disable the backdrop entirely, set the `no-backdrop` prop to `true`.

Toggle Offcanvas

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton v-b-toggle.offcanvas-backdrop>Toggle Offcanvas</BButton>

    <BOffcanvas
      id="offcanvas-backdrop"
      title="Offcanvas with backdrop"
      no-backdrop
      shadow
    >
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <BImg
          src="https://picsum.photos/500/500/?image=54"
          fluid
          thumbnail
        />
      </div>
    </BOffcanvas>
  </div>
</template>
```

Note that when the offcanvas is open, it may still be possible to scroll the body (unless `body-scrolling` is disabled). When the backdrop is enabled, focus constraint will attempt to keep focus within the offcanvas. Note that in rare circumstances it might be possible for users to move focus to elements outside of the offcanvas.

## Visibility control [​](#visibility-control)

### `v-b-toggle` directive [​](#v-b-toggle-directive)

Using the [`v-b-toggle` directive](/bootstrap-vue-next/docs/directives/BToggle.html) is the preferred method for _opening_ the offcanvas, as it automatically handles applying the `aria-controls` attribute and registering the trigger with the offcanvas. The offcanvas will then manage the `aria-expanded` attribute and visual state classes on the trigger element to reflect its open/closed state.

The majority of examples on this page use the `v-b-toggle` directive.

### `v-model` [​](#v-model)

The `v-model` reflects the current visibility state of the offcanvas. While it can be used to control the visibility state of the offcanvas, it is recommended to use the [`v-b-toggle` directive](#v-b-toggle-directive) to _show_ the offcanvas for accessibility reasons.

For detailed information on managing ARIA attributes when using `v-model`, including examples of programmatic trigger registration and manual ARIA management, see the [ARIA Trigger Registration for Component Visibility](/bootstrap-vue-next/docs/reference/accessibility.html#aria-trigger-registration-for-component-visibility) section in the Accessibility reference.

## Events [​](#events)

The offcanvas will emit the `show` event when beginning to open, `shown` event once fully opened, `hide` event when beginning to close, and the `hidden` event when fully closed.

## Responsive [​](#responsive)

The `responsive` prop in the BOffcanvas component enables adaptive display behavior based on the viewport size. When set, the offcanvas content displays inline for viewports wider than the specified breakpoint, and as a traditional offcanvas for narrower viewports

NOTE

In SSR environments, the BOffcanvas component must be rendered client-side due to its dependency on browser context for responsive behavior. Use client-only directives or components to ensure proper functionality

template

```
<BOffcanvas
  responsive="md"
  title="Responsive Offcanvas"
/>
```

## Sidebar [​](#sidebar)

One common use of offcanvas is to create a table of contents sidebar that is visible on a large screen, but becomes an offcanvas component below a certain breakpoint. This is common for documentation sites like the one you're reading now which includes two such sidebars - a "table of contents" on the left and a "on this page" on the right.

Below is a simple example showing how to set up such a site.

vue

```
<template>
  <BContainer fluid="xxl">
    <BRow class="d-md-none"
      ><BCol>
        <BButton
          variant="link"
          underline-opacity="0"
          aria-controls="offcanvas-toc"
          :aria-expanded="tocVisible ? 'true' : 'false'"
          @click="showToc"
          >&lt; Table of Contents</BButton
        > </BCol
      ><BCol
        ><div class="text-end">
          <BButton
            variant="link"
            underline-opacity="0"
            aria-controls="offcanvas-otp"
            :aria-expanded="otpVisible ? 'true' : 'false'"
            @click="showOtp"
            >On this page &gt;</BButton
          >
        </div></BCol
      ></BRow
    >
    <BRow>
      <BCol
        md="2"
        class="scrollable-column"
      >
        <BOffcanvas
          id="offcanvas-toc"
          v-model="tocVisible"
          title="Table of Contents"
          placement="start"
          responsive="md"
        >
          <ul>
            <ul>
              <li
                v-for="item in toc"
                :key="item"
              >
                {{ item }}
              </li>
              <li>A very large entry in table of contents</li>
            </ul>
          </ul>
        </BOffcanvas>
      </BCol>
      <BCol md="8">
        Lorem ipsum odor amet, consectetuer adipiscing elit. Pellentesque imperdiet libero litora
        nisl condimentum ullamcorper. Convallis vel auctor morbi mauris lectus mi. Consequat urna
        tempus tristique id augue luctus. Quis ullamcorper faucibus laoreet dapibus elit. Habitant
        vulputate maecenas varius massa dui dolor augue. Dictum aliquam justo tempor integer
        placerat scelerisque per duis facilisis. Orci ex parturient fusce vestibulum quis euismod
        elementum habitasse. Vitae suscipit vehicula pellentesque massa facilisi erat dapibus. Urna
        torquent praesent eleifend lobortis nec ullamcorper dignissim eu? Neque scelerisque leo nisl
        duis taciti faucibus nam ut. Sit ultrices aenean magna nam cubilia lacus torquent? Eu purus
        posuere ad metus ultrices. Netus id hac lobortis vel habitant ad morbi finibus vulputate.
        Luctus pellentesque metus diam curae nostra praesent ullamcorper elit. Varius commodo
        scelerisque in libero magna senectus. Magnis dis metus penatibus finibus mattis velit. Leo
        imperdiet metus accumsan nascetur mus id. Torquent elementum natoque dictum risus non mollis
        euismod mauris mus. Lobortis aliquet class at scelerisque egestas at scelerisque condimentum
        tellus. Mollis consequat dui risus consequat ipsum, penatibus neque. Ultrices tristique sed
        parturient ex integer ac tristique fusce. Amet imperdiet condimentum enim semper proin
        lacinia. Montes in iaculis dui penatibus vulputate nulla; mauris venenatis. Malesuada metus
        luctus dictumst; ante sapien dis facilisi himenaeos. Finibus nibh ut est faucibus ut
        molestie. Magna nascetur imperdiet imperdiet; fringilla velit ac condimentum ullamcorper.
        Ornare arcu feugiat phasellus nisl morbi porta. Auctor praesent duis quam euismod maximus et
        varius. Parturient class proin tristique egestas consequat. Eleifend magna dictum aenean,
        sagittis diam gravida. Taciti nam donec fringilla commodo ullamcorper accumsan fames ante
        accumsan. Quis nulla porttitor blandit interdum vel scelerisque senectus. Odio lorem blandit
        aliquam tempor, eu egestas maecenas ligula. Commodo egestas maximus euismod eleifend natoque
        sagittis; viverra himenaeos. Vel dis justo odio conubia fringilla bibendum scelerisque dis.
        Lorem pulvinar dapibus porta viverra massa potenti laoreet fringilla. Augue odio gravida a
        nunc rhoncus aliquet parturient imperdiet natoque. Hac neque semper pretium, parturient hac
        nascetur. Elit mollis convallis sagittis scelerisque tristique. Fermentum justo efficitur
        congue nascetur mi eu amet conubia. Purus semper blandit feugiat hac vel sapien convallis
        quisque. Mi justo tempus quis enim tellus? Risus et ipsum in; aliquam nisl habitant.
        Praesent laoreet luctus nunc; pellentesque aptent porta. Vulputate risus lacinia imperdiet
        aptent habitasse facilisi venenatis ipsum. Integer varius porttitor aenean laoreet maecenas
        luctus id viverra porta. Habitasse lorem bibendum semper maecenas volutpat porta. Eros
        praesent duis odio sagittis metus montes interdum.
      </BCol>
      <BCol
        md="2"
        class="scrollable-column"
      >
        <BOffcanvas
          id="offcanvas-otp"
          v-model="otpVisible"
          title="On this page"
          placement="end"
          responsive="md"
        >
          <ul>
            <li
              v-for="item in otp"
              :key="item"
            >
              {{ item }}
            </li>
            <li>A very large entry in on this page</li>
          </ul>
        </BOffcanvas>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const otpVisible = ref(false)
const tocVisible = ref(false)

// This example uses buttons to show the hidden sidebars, but you could also use a menu item or any other
//  UX element that can change the state of the model value for the BOffcanvas
const showOtp = () => {
  otpVisible.value = true
}
const showToc = () => {
  tocVisible.value = true
}

const tocGenerator = (s: string, c: number): string[] =>
  [...Array(c).keys()].map((i) => `${s} ${i}`)

const toc = tocGenerator('Chapter', 100) // Replace this with your own table of contents
const otp = tocGenerator('Section', 100) // Replace this with your own "on this page"
</script>

<style scoped lang="scss">
// The styling below makes a colum scroll independently of the rest of the page if
//  its content is too large to fit in the current viewport
.scrollable-column {
  max-height: 100vh;
  overflow-y: auto;
  position: sticky;
  top: 0;
}
</style>
```

## Accessibility [​](#accessibility)

`<BOffcanvas>` provides several accessibility features.

When the offcanvas is opened, the entire offcanvas will receive focus, which is desirable for screen reader and keyboard-only users. When the offcanvas is closed, the element that previously had focus before the offcanvas was opened will be re-focused.

In some circumstances, you may need to disable the enforce focus feature completely. You can do this by setting the prop `no-trap`, although this is generally discouraged for accessibility reasons.

When the offcanvas is open, users can press Esc to close the offcanvas. To disable this feature, set the `no-close-on-esc` prop to `true`. With the backdrop enabled, you can use the prop `no-close-on-backdrop` to disable the close on backdrop click feature.

When the backdrop is not disabled (default), the offcanvas will attempt to constrain focus within the offcanvas, and the offcanvas will have the attribute `aria-modal="true"` set.

When you have hidden the header, or do not have a title for the offcanvas, set either `aria-label` to a string that describes the offcanvas, or set `aria-labelledby` to an ID of an element that contains the title. When using the `lazy` prop _and_ you do not have a header, use the `aria-label` prop to provide an appropriate string to label the offcanvas.

## Implementation notes [​](#implementation-notes)

BootstrapVueNext's custom SCSS/CSS is required for proper styling, and positioning of the offcanvas.

Bootstrap v5 background (`'bg-*'`) and text (`'text-*'`) utility classes can be used for controlling the background and font color via the `body-class` and `header-class` props.

## See also [​](#see-also)

-   [`v-b-toggle` directive](/bootstrap-vue-next/docs/directives/BToggle.html)
-   [`<BCollapse>` component](/bootstrap-vue-next/docs/components/collapse.html)
-   [`<BCloseButton>` component](/bootstrap-vue-next/docs/components/button.html#comp-ref-b-close-button)

## Component Reference

### `<BOffcanvas>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BOffcanvas/BOffcanvas.vue)

-   [<BOffcanvas> Properties](#comp-reference-boffcanvas-properties)
-   [<BOffcanvas> Events](#comp-reference-boffcanvas-events)
-   [<BOffcanvas> Slots](#comp-reference-boffcanvas-slots)
-   [<BOffcanvas> Exposed](#comp-reference-boffcanvas-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.offcanvas[‑*]`

##### [Properties](#comp-reference-boffcanvas-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| backdrop-first | `boolean` | `false` | Animate the backdrop before the offcanvas, and on leave animate the offcanvas before the backdrop |
| body-attrs | `Readonly<AttrsValue>` | `undefined` | Attributes to be applied to the body of the component |
| body-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the body |
| body-scrolling | `boolean` | `false` | Allow body scrolling while offcanvas is open. By default, body scrolling is disabled when the offcanvas is open |
| focus | `'ok' | 'cancel' | 'close' | string | ComponentPublicInstance | HTMLElement | null` | `undefined` | Specify where to focus once offcanvas opens. Can be built-in button 'close'. Can be ref, HTMLElement, id or selector string. If set to 'false', no focus will be set (if noTrap isn't set the focus trap will focus the modal element or fallback element). If set to a string, the element with that id will be focused. If set to a ComponentPublicInstance, the $el property of the instance will be focused. |
| footer-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the footer |
| header-attrs | `Readonly<AttrsValue>` | `undefined` | Attributes to be applied to the offcanvas header element |
| header-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the header |
| header-close-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the header close button |
| header-close-label | `string` | `'Close'` | Accessibility label for the header close button |
| header-close-variant | `ButtonVariant | null` | `'secondary'` | Button variant to use for the header close button when using a custom close slot |
| id | `string` | `undefined` | The Id to be injected to offcanvas and used for state management |
| initial-animation | `boolean` | `false` | When set, enables the initial animation on mount |
| lazy | `boolean` | `false` | When set, the content will not be mounted until opened |
| model-value | `boolean` | `false` | Controls the visibility of the component |
| no-animation | `boolean` | `false` | When set, disables the animation |
| no-backdrop | `boolean` | `false` | Disables rendering of the backdrop |
| no-close-on-backdrop | `boolean` | `false` | Disable closing the offcanvas when the backdrop is clicked |
| no-close-on-esc | `boolean` | `false` | Disable closing the offcanvas when the Escape key is pressed |
| no-fade | `boolean` | `false` | Alias for \`noAnimation\` |
| no-header | `boolean` | `false` | Disables rendering of the header |
| no-header-close | `boolean` | `false` | Disables rendering of the header close button |
| no-trap | `boolean` | `false` | Disables the focus trap feature |
| placement | `Placement` | `'bottom-start'` | Position of the offcanvas: 'start', 'end', 'top', or 'bottom' |
| responsive | `Breakpoint` | `undefined` | Makes offcanvas responsive - displays as offcanvas below the breakpoint and inline above it |
| shadow | `Size | boolean` | `false` | Add a shadow to the offcanvas. Can be 'sm', true (medium), or 'lg' |
| show | `boolean` | `false` | When set, and prop 'visible' is false on mount, will animate from closed to open on initial mount. Mainly to help with template show. Use model-value for reactive show/hide |
| teleport-disabled | `boolean` | `false` | Disable teleporting the offcanvas to the body |
| teleport-to | `string | RendererElement | null | undefined` | `'body'` | Teleport the offcanvas to a specific element |
| title | `string` | `undefined` | Text content to place in the title |
| trans-props | `TransitionProps` | `undefined` | Transition properties |
| unmount-lazy | `boolean` | `false` | When set and \`lazy\` is true, the content will be unmounted when closed |
| visible | `boolean` | `false` | When 'true', open without animation |
| width | `string` | `undefined` | Width of the offcanvas (e.g., "320px", "20rem") |

##### [Events](#comp-reference-boffcanvas-events)

| Event | Args | Description |
| --- | --- | --- |
| backdrop | 
`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the backdrop is clicked |
| breakpoint | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

`opened``: boolean` - Whether or not the offcanvas is above the breakpoint and is open by it

 | Emitted when the offcanvas's responsive breakpoint state changes |
| close | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the close button is clicked |
| esc | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the Escape key is pressed while the offcanvas is open |
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

`update:model-value``: boolean` - Emitted when the offcanvas visibility state changes

 | Standard event to update the v-model |

##### [Slots](#comp-reference-boffcanvas-slots)

| Name | Scope | Description |
| --- | --- | --- |
| backdrop |  | Content to replace the default backdrop |
| default | 
`visible``: boolean` - Current visibility state of the offcanvas

`placement``: 'top' | 'bottom' | 'start' | 'end'` - Current placement of the offcanvas

`hide``: (trigger?: string) => void` - Function to close the offcanvas

 | Content to place in the body of the offcanvas |
| footer | 

`visible``: boolean` - Current visibility state of the offcanvas

`placement``: 'top' | 'bottom' | 'start' | 'end'` - Current placement of the offcanvas

`hide``: (trigger?: string) => void` - Function to close the offcanvas

 | Content to place in the footer of the offcanvas |
| header | 

`visible``: boolean` - Current visibility state of the offcanvas

`placement``: 'top' | 'bottom' | 'start' | 'end'` - Current placement of the offcanvas

`hide``: (trigger?: string) => void` - Function to close the offcanvas

 | Content to replace the entire default header |
| header-close |  | Content to replace the default close button in the header |
| title | 

`visible``: boolean` - Current visibility state of the offcanvas

`placement``: 'top' | 'bottom' | 'start' | 'end'` - Current placement of the offcanvas

`hide``: (trigger?: string) => void` - Function to close the offcanvas

 | Content to place in the title section of the header |

##### [Exposed](#comp-reference-boffcanvas-exposed)

| Name | Type | Description |
| --- | --- | --- |
| hide | `() => void` | Hides the offcanvas |
| isOpenByBreakpoint | `Ref<boolean>` | Reactive boolean indicating if the offcanvas is opened by responsive breakpoint |
| show | `() => void` | Shows the offcanvas |
| toggle | `() => void` | Toggles the visibility of the offcanvas |
