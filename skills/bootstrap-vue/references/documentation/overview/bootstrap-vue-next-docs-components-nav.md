# Nav ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/nav.html

##### On this page

-   [Overview ​](#overview)
    
-   [Link appearance ​](#link-appearance)
    -   [Tab style ​](#tab-style)
        
    -   [Pill style ​](#pill-style)
        
    -   [Small ​](#small)
        
-   [Fill and justify ​](#fill-and-justify)
    -   [Fill ​](#fill)
        
    -   [Justified ​](#justified)
        
-   [Alignment ​](#alignment)
    
-   [Vertical variation ​](#vertical-variation)
    
-   [Dropdown support ​](#dropdown-support)
    -   [Optionally scoped default slot ​](#optionally-scoped-default-slot)
        
    -   [Lazy dropdown ​](#lazy-dropdown)
        
    -   [Dropdown placement ​](#dropdown-placement)
        
    -   [Dropdown implementation note ​](#dropdown-implementation-note)
        
    -   [Dropdown Exposed Methods ​](#dropdown-exposed-methods)
        
-   [Nav text content ​](#nav-text-content)
    
-   [Nav inline forms ​](#nav-inline-forms)
    
-   [Tabbed local content support ​](#tabbed-local-content-support)
    
-   [Card integration ​](#card-integration)
    -   [Using with Vue Router ​](#using-with-vue-router)
        
-   [Component Reference](#component-reference)
    -   [<BNav>](#b-nav)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BNavForm>](#b-nav-form)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
    -   [<BNavItem>](#b-nav-item)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
    -   [<BNavItemDropdown>](#b-nav-item-dropdown)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            
    -   [<BNavText>](#b-nav-text)
        -   [Properties](#)
            
        -   [Slots](#)
            

# Nav [​](#nav)

Navigation available in Bootstrap share general markup and styles, from the base `<BNav>` class to the `active` and `disabled` states. Swap modifier props to switch between each style.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BNav/BNav.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/nav.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bnav)

-   [Active](#nav-overview)
-   [Link](#nav-overview)
-   [Another Link](#nav-overview)
-   [Disabled](#nav-overview)

HTML StackBlitz

template

```
<BNav>
  <BNavItem
    active
    href="#nav-overview"
    >Active</BNavItem
  >
  <BNavItem href="#nav-overview">Link</BNavItem>
  <BNavItem href="#nav-overview">Another Link</BNavItem>
  <BNavItem
    disabled
    href="#nav-overview"
    >Disabled</BNavItem
  >
</BNav>
```

## Overview [​](#overview)

The base `<BNav>` component is built with flexbox and provides a strong foundation for building all types of navigation components. It includes some style overrides (for working with lists), some link padding for larger hit areas, and basic disabled styling. No active states are included in the base nav.

`<BNav>` supports the following child components:

-   `<BNavItem>` for actionable links (or router-links)
-   `<BNavItemDropdown>` for dropdowns
-   `<BNavText>` for plain text content
-   `<BNavForm>` for inline forms

## Link appearance [​](#link-appearance)

Two style variations are supported: `tabs` and `pills`, which support `active` state styling. These variants are mutually exclusive - use only one style or the other.

### Tab style [​](#tab-style)

Make the nav look like tabs by setting the `tabs` prop.

-   [Active](#nav-tab)
-   [Link](#nav-tab)
-   [Another Link](#nav-tab)
-   [Disabled](#nav-tab)

HTML StackBlitz

template

```
<BNav tabs>
  <BNavItem
    active
    href="#nav-tab"
    >Active</BNavItem
  >
  <BNavItem href="#nav-tab">Link</BNavItem>
  <BNavItem href="#nav-tab">Another Link</BNavItem>
  <BNavItem
    disabled
    href="#nav-tab"
    >Disabled</BNavItem
  >
</BNav>
```

### Pill style [​](#pill-style)

Use the pill style by setting the `pills` prop.

-   [Active](#nav-pill)
-   [Link](#nav-pill)
-   [Another Link](#nav-pill)
-   [Disabled](#nav-pill)

HTML StackBlitz

template

```
<BNav pills>
  <BNavItem
    active
    href="#nav-pill"
    >Active</BNavItem
  >
  <BNavItem href="#nav-pill">Link</BNavItem>
  <BNavItem href="#nav-pill">Another Link</BNavItem>
  <BNavItem
    disabled
    href="#nav-pill"
    >Disabled</BNavItem
  >
</BNav>
```

### Small [​](#small)

Make the nav smaller by setting the `small` prop.

-   [Active](#nav-small)
-   [Link](#nav-small)
-   [Another Link](#nav-small)
-   [Disabled](#nav-small)

HTML StackBlitz

template

```
<BNav small>
  <BNavItem
    active
    href="#nav-small"
    >Active</BNavItem
  >
  <BNavItem href="#nav-small">Link</BNavItem>
  <BNavItem href="#nav-small">Another Link</BNavItem>
  <BNavItem
    disabled
    href="#nav-small"
    >Disabled</BNavItem
  >
</BNav>
```

## Fill and justify [​](#fill-and-justify)

Force your `<BNav>` content to extend the full available width.

### Fill [​](#fill)

To proportionately fill all available space with your `<BNavItem>` components, set the `fill` prop. Notice that all horizontal space is occupied, but not every nav item has the same width.

-   [Active](#nav-fill)
-   [Link](#nav-fill)
-   [Link with a long name](#nav-fill)
-   [Disabled](#nav-fill)

HTML StackBlitz

template

```
<BNav
  tabs
  fill
>
  <BNavItem
    active
    href="#nav-fill"
    >Active</BNavItem
  >
  <BNavItem href="#nav-fill">Link</BNavItem>
  <BNavItem href="#nav-fill">Link with a long name </BNavItem>
  <BNavItem
    disabled
    href="#nav-fill"
    >Disabled</BNavItem
  >
</BNav>
```

### Justified [​](#justified)

For equal-width elements, set the `justified` prop instead. All horizontal space will be occupied by nav links, but unlike `fill` above, every `<BNavItem>` will be the same width.

-   [Active](#nav-justified)
-   [Link](#nav-justified)
-   [Link with a long name](#nav-justified)
-   [Disabled](#nav-justified)

HTML StackBlitz

template

```
<BNav
  tabs
  justified
>
  <BNavItem
    active
    href="#nav-justified"
    >Active</BNavItem
  >
  <BNavItem href="#nav-justified">Link</BNavItem>
  <BNavItem href="#nav-justified">Link with a long name </BNavItem>
  <BNavItem
    disabled
    href="#nav-justified"
    >Disabled</BNavItem
  >
</BNav>
```

## Alignment [​](#alignment)

To align your `<BNavItem>` components, use the `align` prop. Available values are those from [`AlignmentJustifyContent`](/bootstrap-vue-next/docs/types.html#alignment): `start`, `center`, `end`, `between`, `around`, and `evenly`.

-   [Active](#nav-alignment)
-   [Link](#nav-alignment)
-   [Link with a long name](#nav-alignment)
-   [Disabled](#nav-alignment)

HTML StackBlitz

template

```
<BNav
  tabs
  align="center"
>
  <BNavItem
    active
    href="#nav-alignment"
    >Active</BNavItem
  >
  <BNavItem href="#nav-alignment">Link</BNavItem>
  <BNavItem href="#nav-alignment">Link with a long name </BNavItem>
  <BNavItem
    disabled
    href="#nav-alignment"
    >Disabled</BNavItem
  >
</BNav>
```

## Vertical variation [​](#vertical-variation)

By default `<BNav>` appear on a horizontal line. Stack your navigation by setting the `vertical` prop.

-   [Active](#nav-vertical)
-   [Link](#nav-vertical)
-   [Another Link](#nav-vertical)
-   [Disabled](#nav-vertical)

HTML StackBlitz

template

```
<BNav
  vertical
  class="w-25"
>
  <BNavItem
    active
    href="#nav-vertical"
    >Active</BNavItem
  >
  <BNavItem href="#nav-vertical">Link</BNavItem>
  <BNavItem href="#nav-vertical">Another Link</BNavItem>
  <BNavItem
    disabled
    href="#nav-vertical"
    >Disabled</BNavItem
  >
</BNav>
```

## Dropdown support [​](#dropdown-support)

Use `<BNavItemDropdown>` to place dropdown items within your nav.

-   [Active](#nav-dropdown)
-   [Link](#nav-dropdown)
-   Dropdown
    
    -   One
    -   Two
    -   * * *
        
    -   Three
    

HTML StackBlitz

template

```
<BNav pills>
  <BNavItem
    active
    href="#nav-dropdown"
    >Active</BNavItem
  >
  <BNavItem href="#nav-dropdown">Link</BNavItem>
  <BNavItemDropdown
    id="my-nav-dropdown"
    text="Dropdown"
    toggle-class="nav-link-custom"
    right
  >
    <BDropdownItem>One</BDropdownItem>
    <BDropdownItem>Two</BDropdownItem>
    <BDropdownDivider />
    <BDropdownItem>Three</BDropdownItem>
  </BNavItemDropdown>
</BNav>
```

Sometimes you want to add your own class names to the generated dropdown toggle button, that by default have the classes `nav-link` and `dropdown-toggle`. Use the `toggle-class` prop to add them (like above) which will render HTML similar to:

html

```
<li id="my-nav-dropdown" class="nav-item b-nav-dropdown dropdown">
  <a role="button" href="#my-nav-dropdown" id="my-nav-dropdown__BV_button_" aria-haspopup="true" aria-expanded="false"
    class="nav-link dropdown-toggle nav-link-custom"></a>
  ...
</li>
```

Refer to [`<BDropdown>`](/bootstrap-vue-next/docs/components/dropdown.html) for a list of supported sub-components.

### Optionally scoped default slot [​](#optionally-scoped-default-slot)

The dropdown default slot is optionally scoped with the following scope available:

| Property or Method | Description |
| --- | --- |
| `hide()` | Can be used to close the dropdown menu. |
| `show()` | Can be used to show the dropdown menu. |

### Lazy dropdown [​](#lazy-dropdown)

By default, `<BNavItemDropdown>` renders the menu contents in the DOM even when the menu is not shown. When there are a large number of dropdowns rendered on the same page, performance could be impacted due to larger overall memory utilization. You can instruct `<BNavItemDropdown>` to render the menu contents only when it is shown by setting the `lazy` prop to true.

### Dropdown placement [​](#dropdown-placement)

Use the `start`, `end`, `center`, `placement`, `no-flip`, and `offset` to control the positioning of `<BNavItemDropdown>`.

Refer to the [`<BDropdown>` positioning section](/bootstrap-vue-next/docs/components/dropdown.html#positioning) for details on the effects and usage of these props.

### Dropdown implementation note [​](#dropdown-implementation-note)

Note that the toggle button is actually rendered as a link `<a>` tag with `role="button"` for styling purposes, and typically has the `href` set to `#` unless an ID is provided via the `id` prop.

The toggle will prevent scroll-top-top behaviour (via JavaScript) when clicking the toggle link. In some cases when using SSR, and the user clicks the toggle button _before_ Vue has had a chance to hydrate the component, the page will scroll to top. In these cases, simply providing a unique ID via the `id` prop will prevent the unwanted scroll-to-top behaviour.

### Dropdown Exposed Methods [​](#dropdown-exposed-methods)

`<BNavItemDropdown>` exposes the same methods as `<BDropdown>`, see the [dropdown documentation](/bootstrap-vue-next/docs/components/dropdown.html#exposed-methods) for details.

## Nav text content [​](#nav-text-content)

Use the `<BNavText>` child component to place plain text content into the nav:

-   [Link 1](#1)
-   [Link 2](#2)
-   Plain text

HTML StackBlitz

template

```
<BNav>
  <BNavItem href="#1">Link 1</BNavItem>
  <BNavItem href="#2">Link 2</BNavItem>
  <BNavText>Plain text</BNavText>
</BNav>
```

## Nav inline forms [​](#nav-inline-forms)

Use the `<BNavForm>` child component to place an _inline_ form into the nav:

-   [Link 1](#1)
-   [Link 2](#2)
-   Ok
    

HTML StackBlitz

vue

```
<template>
  <BNav
    pills
    class="mb-1"
  >
    <BNavItem
      href="#1"
      active
      >Link 1</BNavItem
    >
    <BNavItem href="#2">Link 2</BNavItem>
    <BNavForm @submit.stop.prevent="submitted = true">
      <BFormInput
        aria-label="Input"
        class="mr-1"
      />
      <BButton
        class="ms-2"
        type="submit"
        >Ok</BButton
      >
    </BNavForm>
  </BNav>
  <span v-if="submitted">Form Submitted</span>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const submitted = ref(false)
</script>
```

Refer to the [`<BForm>` inline](/bootstrap-vue-next/docs/components/form.html#inline-form) documentation for additional details on placing form controls.

## Tabbed local content support [​](#tabbed-local-content-support)

See the [`<BTabs>`](/bootstrap-vue-next/docs/components/tabs.html) component for creating tabbable panes of local content (not suited for navigation).

## Card integration [​](#card-integration)

Use a `<BNav>` in a [`<BCard>`](/bootstrap-vue-next/docs/components/card.html) header, by enabling the `card-header` prop on `<BNav>` and setting either the `pills` or `tabs` props:

**Tabs style:**

-   [Active](#nav-tab-card)
-   [Inactive](#nav-tab-card)
-   [Disabled](#nav-tab-card)

With supporting text below as a natural lead-in to additional content.

Go somewhere

HTML StackBlitz

template

```
<BCard
  title="Card Title"
  no-body
>
  <BCardHeader header-tag="nav">
    <BNav
      card-header
      tabs
    >
      <BNavItem
        active
        href="#nav-tab-card"
        >Active</BNavItem
      >
      <BNavItem href="#nav-tab-card">Inactive</BNavItem>
      <BNavItem
        disabled
        href="#nav-tab-card"
        >Disabled</BNavItem
      >
    </BNav>
  </BCardHeader>

  <BCardBody class="text-center">
    <BCardText>
      With supporting text below as a natural lead-in to additional content.
    </BCardText>

    <BButton variant="primary">Go somewhere</BButton>
  </BCardBody>
</BCard>
```

**Pill style:**

-   [Active](#nav-pill-card)
-   [Inactive](#nav-pill-card)
-   [Disabled](#nav-pill-card)

With supporting text below as a natural lead-in to additional content.

Go somewhere

HTML StackBlitz

template

```
<BCard
  title="Card Title"
  no-body
>
  <BCardHeader header-tag="nav">
    <BNav
      card-header
      pills
    >
      <BNavItem
        active
        href="#nav-pill-card"
        >Active</BNavItem
      >
      <BNavItem href="#nav-pill-card">Inactive</BNavItem>
      <BNavItem
        disabled
        href="#nav-pill-card"
        >Disabled</BNavItem
      >
    </BNav>
  </BCardHeader>

  <BCardBody class="text-center">
    <BCardText>
      With supporting text below as a natural lead-in to additional content.
    </BCardText>

    <BButton variant="primary">Go somewhere</BButton>
  </BCardBody>
</BCard>
```

**Plain style:**

The `card-header` prop is only needed when you are applying `tabs` or `pills` style. Note that Bootstrap v5 SCSS does not have special styling for `active` state plain style nav items.

-   [Active](#nav-plain-card)
-   [Inactive](#nav-plain-card)
-   [Disabled](#nav-plain-card)

With supporting text below as a natural lead-in to additional content.

Go somewhere

HTML StackBlitz

template

```
<BCard
  title="Card Title"
  no-body
>
  <BCardHeader header-tag="nav">
    <BNav>
      <BNavItem
        active
        href="#nav-plain-card"
        >Active</BNavItem
      >
      <BNavItem href="#nav-plain-card">Inactive</BNavItem>
      <BNavItem
        disabled
        href="#nav-plain-card"
        >Disabled</BNavItem
      >
    </BNav>
  </BCardHeader>

  <BCardBody class="text-center">
    <BCardText>
      With supporting text below as a natural lead-in to additional content.
    </BCardText>

    <BButton variant="primary">Go somewhere</BButton>
  </BCardBody>
</BCard>
```

The `card-header` prop has no styling effect if the `<BNav>` is in `vertical` mode.

### Using with Vue Router [​](#using-with-vue-router)

Have your card `<BNav>` control vue router nested routes via `<router-view>` or `<nuxt-child>` components, to created tabbed content that changes with route URL:

template

```
<!-- On page with route `/some/route` -->
<BCard
  title="Card Title"
  no-body
>
  <BCardHeader header-tag="nav">
    <BNav
      card-header
      tabs
    >
      <!-- <BNavItem>'s with child routes. Note the trailing slash on the first <BNavItem> -->
      <BNavItem
        to="/some/route/"
        exact
        exact-active-class="active"
        >Active</BNavItem
      >
      <BNavItem
        to="/some/route/foo"
        exact
        exact-active-class="active"
        >Foo</BNavItem
      >
      <BNavItem
        to="/some/route/bar"
        exact
        exact-active-class="active"
        >Bar</BNavItem
      >
    </BNav>
  </BCardHeader>

  <BCardBody>
    <!-- Child route gets rendered in <RouterView> or <NuxtPage> -->
    <RouterView />
    <!-- Or if using Nuxt.js
    <NuxtPage />
    -->
  </BCardBody>
</BCard>
```

INFO

Vue Router does not support defining active routes with hashes (`#`), which is why you must define the "tab" content as child routes.

**Example router config for above:**

js

```
const routes = [
  {
    path: '/some/route',
    // We don't provide a name on this parent route, but rather
    // set the name on the default child route instead
    // name: 'some-route',
    component: SomeRouteComponent,
    // Child route "tabs"
    children: [
      // Note we provide the above parent route name on the default child tab
      // route to ensure this tab is rendered by default when using named routes
      { path: '', component: DefaultTabComponent, name: 'some-route' },
      { path: 'foo', component: FooTabComponent },
      { path: 'bar', component: BarTabComponent },
    ],
  },
]
```

One can also use Vue Router [named routes](https://router.vuejs.org/guide/essentials/named-routes.html#named-routes) and/or route params instead of path based routes.

For more details see:

-   [Vue Router `<router-view>`](https://router.vuejs.org/api/#router-view)
-   [Nuxt.JS `<nuxt-child>`](https://nuxtjs.org/api/components-nuxt-child)

## Component Reference

### `<BNav>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BNav/BNav.vue)

-   [<BNav> Properties](#comp-reference-bnav-properties)
-   [<BNav> Slots](#comp-reference-bnav-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.nav`

##### [Properties](#comp-reference-bnav-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| align | `AlignmentJustifyContent` | `undefined` | Aligns the nav items to any value of AlignmentJustifyContent |
| card-header | `boolean` | `false` | Indicates the nav is placed inside a card header |
| fill | `boolean` | `false` | Fills all horizontal space with nav items proportionally, with varying widths |
| justified | `boolean` | `false` | Fills all horizontal space with nav items, each having equal width |
| pills | `boolean` | `false` | Styles nav items as pill buttons |
| small | `boolean` | `false` | Reduces the nav size |
| tabs | `boolean` | `false` | Styles nav items as tabs |
| tag | `string` | `'ul'` | Specify the HTML tag to render instead of the default tag |
| underline | `boolean` | `false` | Underlines the active nav item |
| vertical | `boolean` | `false` | Stacks nav items vertically |

##### [Slots](#comp-reference-bnav-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content for the nav |

### `<BNavForm>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BNav/BNavForm.vue)

-   [<BNavForm> Properties](#comp-reference-bnavform-properties)
-   [<BNavForm> Events](#comp-reference-bnavform-events)
-   [<BNavForm> Slots](#comp-reference-bnavform-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `li > form`

##### [Properties](#comp-reference-bnavform-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| floating | `boolean` | `false` | When set, renders a single control form with a floating label. This only works for forms where the immediate children are a label and one of the supported controls. See above for details. |
| form-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the form element |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| novalidate | `boolean` | `false` | When set, disables browser native HTML5 validation on controls in the form |
| role | `string` | `undefined` | Sets the ARIA attribute \`role\` to a specific value |
| validated | `boolean` | `false` | When set, adds the Bootstrap class 'was-validated' on the form, triggering the native browser validation states |
| wrapper-attrs | `Readonly<AttrsValue>` | `undefined` | Attributes to be applied to the wrapper element |

##### [Events](#comp-reference-bnavform-events)

| Event | Args | Description |
| --- | --- | --- |
| submit | 
`submit``: Event` - Native submit event

 | Emitted when the form is submitted |

##### [Slots](#comp-reference-bnavform-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content for the nav form |

### `<BNavItem>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BNav/BNavItem.vue)

-   [<BNavItem> Properties](#comp-reference-bnavitem-properties)
-   [<BNavItem> Events](#comp-reference-bnavitem-events)
-   [<BNavItem> Slots](#comp-reference-bnavitem-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.nav‑item`

##### [Properties](#comp-reference-bnavitem-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| link-attrs | `Readonly<AttrsValue>` | `undefined` | Additional attributes for the nested link element |
| link-class | `ClassValue` | `undefined` | CSS class (or classes) for the nested link element |

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
| stretched | `boolean` | `false` | When set to \`true\`, makes the link's \`containing block\` clickable via an \`::after\` pseudo element |
| target | `LinkTarget` | `undefined` | Sets the 'target' attribute on the rendered link |
| to | `RouteLocationRaw` | `undefined` | Denotes the target route of the link. When clicked, the value of the to prop will be passed to \`router.push()\` internally |
| underline-offset | `1 | 2 | 3 | '1' | '2' | '3'` | `undefined` | Change the distance of the underline from the bottom of the link text |
| underline-offset-hover | `1 | 2 | 3 | '1' | '2' | '3'` | `undefined` | Change the distance of the underline from the bottom of the link text on hover |
| underline-opacity | `0 | 10 | 25 | 50 | 75 | 100 | '0' | '10' | '25' | '50' | '75' | '100'` | `undefined` | Set's the opacity of the link's underline |
| underline-opacity-hover | `0 | 10 | 25 | 50 | 75 | 100 | '0' | '10' | '25' | '50' | '75' | '100'` | `undefined` | Set's the opacity of the link's underline on hover |
| underline-variant | `ColorVariant | null` | `null` | Set the color variant for the link underline independently of the link text |
| variant | `ColorVariant | null` | `null` | Set the color variant for the link |

##### [Events](#comp-reference-bnavitem-events)

| Event | Args | Description |
| --- | --- | --- |
| click | 
`click``: MouseEvent` - Click event details

 | Emitted when a non-disabled nav item is clicked |

##### [Slots](#comp-reference-bnavitem-slots)

| Name | Scope | Description |
| --- | --- | --- |
| after |  | Content placed after the nav item link (useful for nested navs) |
| default |  | Content for the nav item |

### `<BNavItemDropdown>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BNav/BNavItemDropdown.vue)

-   [<BNavItemDropdown> Properties](#comp-reference-bnavitemdropdown-properties)
-   [<BNavItemDropdown> Events](#comp-reference-bnavitemdropdown-events)
-   [<BNavItemDropdown> Slots](#comp-reference-bnavitemdropdown-slots)
-   [<BNavItemDropdown> Exposed](#comp-reference-bnavitemdropdown-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.nav‑item.dropdown`

##### [Properties](#comp-reference-bnavitemdropdown-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-label | `string` | `undefined` | Sets the value of \`aria-label\` attribute on the rendered element |
| auto-close | `boolean | 'inside' | 'outside'` | `true` | Controls the automatic closing of the dropdown when clicking. See above for details. |
| boundary | `Boundary | RootBoundary` | `'clippingAncestors'` | The boundary constraint of dropdown: any value of floating-us's Boundary or RootBoundary type. See above for details. |
| boundary-padding | `Padding` | `undefined` | The virtual padding around the boundary to check for overflow |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| floating-middleware | `Middleware[]` | `undefined` | Directly set the floating-ui middleware behavior. See above for details. |
| icon | `boolean` | `false` | When set, styles an icon at the beginning or end of the button text |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| initial-animation | `boolean` | `false` | When set, enables the initial animation on mount |
| is-nav | `boolean` | `false` | Indicates the dropdown is a nav dropdown |
| lazy | `boolean` | `false` | When set, the content will not be mounted until opened |
| menu-class | `ClassValue` | `undefined` | CSS class (or classes) to add to the menu container |
| model-value | `boolean` | `false` | Controls the visibility of the component |
| no-animation | `boolean` | `false` | When set, disables the animation |
| no-caret | `boolean` | `false` | Hide the caret indicator on the toggle button |
| no-fade | `boolean` | `false` | Alias for \`noAnimation\` |
| no-flip | `boolean` | `false` | Prevent the menu from auto flipping positions |
| no-shift | `boolean` | `false` | Prevent the menu from automatically shifting positions |
| no-size | `boolean` | `false` | Prevent the menu from automatically resizing |
| no-wrapper | `boolean` | `false` | Do not render the dropdown wrapper element |
| offset | `number | string | {mainAxis?: number; crossAxis?: number; alignmentAxis?: number | null` | `0` | Specify the number of pixels to shift the menu by. See above for details. |
| placement | `Placement` | `'bottom-start'` | Placement of a floating element |
| role | `string` | `'menu'` | Sets the ARIA attribute \`role\` to a specific value |
| show | `boolean` | `false` | When set, and prop 'visible' is false on mount, will animate from closed to open on initial mount. Mainly to help with template show. Use model-value for reactive show/hide |
| size | `Size` | `undefined` | Set the size of the component's appearance. 'sm' or 'lg' |
| split | `boolean` | `false` | When set, renders a split button dropdown |
| split-button-type | `ButtonType` | `'button'` | Value to place in the 'type' attribute on the split button: 'button', 'submit', 'reset' |
| split-class | `ClassValue` | `undefined` | CSS class (or classes) to add to the split button |
| split-disabled | `boolean` | `undefined` | When set, the split button is disabled |
| split-href | `string` | `undefined` | Denotes the target URL of the link for the split button |
| split-to | `RouteLocationRaw` | `undefined` | Denotes the target route of the split button. When clicked, the value of the to prop will be passed to router.push() internally, so the value can be either a string or a Location descriptor object |
| split-variant | `ButtonVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the split button. Defaults to the 'variant' prop value |
| strategy | `Strategy` | `'absolute'` | The strategy used to determine when to hide the dropdown. See above for details. |
| teleport-disabled | `boolean` | `false` | Renders the dropdown in the exact place it was defined |
| teleport-to | `string | RendererElement | null | undefined` | `undefined` | Overrides the default teleport location |
| text | `string` | `undefined` | Text to place in the toggle button, or in the split button is split mode |
| toggle-attrs | `Readonly<AttrsValue>` | `undefined` | Additional attributes to apply to the toggle button |
| toggle-class | `ClassValue` | `undefined` | CSS class (or classes) to add to the toggle button |
| toggle-text | `string` | `'Toggle dropdown'` | ARIA label (visually-hidden) to set on the toggle when in split mode. Overriden by the slot of the same name |
| trans-props | `TransitionProps` | `undefined` | Transition properties |
| unmount-lazy | `boolean` | `false` | When set and \`lazy\` is true, the content will be unmounted when closed |
| variant | `ColorVariant | null` | `'secondary'` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |
| visible | `boolean` | `false` | When 'true', open without animation |
| wrapper-class | `ClassValue` | `undefined` | CSS class (or classes) to add to the wrapper element |

##### [Events](#comp-reference-bnavitemdropdown-events)

| Event | Args | Description |
| --- | --- | --- |
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
| split-click | 

`event``: MouseEvent` - Native click event object

 | Emitted when split button is clicked in split mode |
| toggle |  | Emitted when toggle button is clicked |
| toggle-prevented | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the component tried to toggle, but was prevented from doing so. This occurs when preventDefault() is called on the event, the user clicks escape and no-close-onbackdrop is set to true, or the user clicks on the backdrop and no-close-onbackdrop is set to true. |

##### [Slots](#comp-reference-bnavitemdropdown-slots)

| Name | Scope | Description |
| --- | --- | --- |
| button-content |  | Can be used to implement custom text with icons and more styling |
| default | 
`hide``: () => void` - Can be used to close the dropdown

`show``: () => void` - Can be used to open the dropdown

 | Optionally scoped default slot for dropdown menu content |
| toggle-text |  | ARIA label (visually-hidden) to set on the toggle when in split mode. Overrides the toggle-text prop |

##### [Exposed](#comp-reference-bnavitemdropdown-exposed)

| Name | Type | Description |
| --- | --- | --- |
| hide | `() => void` | Hides the dropdown |
| show | `() => void` | Shows the dropdown |
| toggle | `() => void` | Toggles the visibility of the dropdown |

### `<BNavText>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BNav/BNavText.vue)

-   [<BNavText> Properties](#comp-reference-bnavtext-properties)
-   [<BNavText> Slots](#comp-reference-bnavtext-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.navbar‑text`

##### [Properties](#comp-reference-bnavtext-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| text | `string` | `undefined` | Plain text to display in the nav |

##### [Slots](#comp-reference-bnavtext-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to display in the nav |
