# Navbar ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/navbar.html

##### On this page

-   [Color schemes ​](#color-schemes)
    
-   [Placement ​](#placement)
    
-   [Supported content ​](#supported-content)
    -   [BNavbarBrand ​](#bnavbarbrand)
        
    -   [BNavbarNav ​](#bnavbarnav)
        
    -   [BNavItem ​](#bnavitem)
        
    -   [BNavText ​](#bnavtext)
        
    -   [BNavItemDropdown ​](#bnavitemdropdown)
        
    -   [BNavForm ​](#bnavform)
        
-   [BNavbarToggle and <BCollapse is-nav> ​](#bnavbartoggle-and-bcollapse-is-nav)
    -   [Custom navbar toggle ​](#custom-navbar-toggle)
        
    -   [Offcanvas ​](#offcanvas)
        
    -   [Scrolling ​](#scrolling)
        
    -   [Auto close behavior ​](#auto-close-behavior)
        
-   [Printing ​](#printing)
    
-   [See also ​](#see-also)
    
-   [Component Reference](#component-reference)
    -   [<BNavbar>](#b-navbar)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BNavbarBrand>](#b-navbar-brand)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BNavbarNav>](#b-navbar-nav)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BNavbarToggle>](#b-navbar-toggle)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            

# Navbar [​](#navbar)

The component `BNavbar` is a wrapper that positions branding, navigation, and other elements into a concise header. It is easily extensible and thanks to the `BCollapse` component, it can easily integrate responsive behaviors.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BNavbar/BNavbar.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/navbar.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bnavbar)

HTML StackBlitz

template

```
<BNavbar
  v-b-color-mode="'dark'"
  toggleable="lg"
  variant="primary"
>
  <BNavbarBrand href="#navbar-overview">NavBar</BNavbarBrand>
  <BNavbarToggle target="nav-collapse" />
  <BCollapse
    id="nav-collapse"
    is-nav
  >
    <BNavbarNav>
      <BNavItem href="#navbar-overview">Link</BNavItem>
      <BNavItem
        href="#navbar-overview"
        disabled
        >Disabled</BNavItem
      >
    </BNavbarNav>
    <!-- Right aligned nav items -->
    <BNavbarNav class="ms-auto mb-2 mb-lg-0">
      <BNavItemDropdown
        text="Lang"
        right
      >
        <BDropdownItem>EN</BDropdownItem>
        <BDropdownItem>ES</BDropdownItem>
        <BDropdownItem>RU</BDropdownItem>
        <BDropdownItem>FA</BDropdownItem>
      </BNavItemDropdown>
      <BNavItemDropdown right>
        <!-- Using 'button-content' slot -->
        <template #button-content>
          <em>User</em>
        </template>
        <BDropdownItem>Profile</BDropdownItem>
        <BDropdownItem>Sign Out</BDropdownItem>
      </BNavItemDropdown>
    </BNavbarNav>
    <BNavForm class="d-flex">
      <BFormInput
        class="me-2"
        placeholder="Search"
      />
      <BButton
        type="submit"
        variant="outline-success"
        >Search</BButton
      >
    </BNavForm>
  </BCollapse>
</BNavbar>
```

## Color schemes [​](#color-schemes)

`BNavbar` supports the standard Bootstrap v5 available background color variants. Set the `variant` prop to one of the following values to change the background color: `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `dark`, `light`, or any of the \*-subtle variants.

If the `variant` prop is set, it may be necessary to control the text color so that it contrasts with the variant irrespective of the theme. This can be done by using the `v-b-color-mode` directive or `useColorMode` composable

The example below uses `v-b-colorMode`. For more information see the [BColorMode directive](/bootstrap-vue-next/docs/directives/BColorMode.html).

HTML StackBlitz

template

```
<BNavbar
  v-b-color-mode="'dark'"
  variant="primary"
>
  <BNavbarBrand
    tag="h1"
    class="mb-0"
    >BootstrapVue</BNavbarBrand
  >
</BNavbar>
```

`BNavbar` will conform to the current color theme if the `variant` prop is not set.

## Placement [​](#placement)

Control the placement of the navbar by setting one of two props:

| prop | type | default | description |
| --- | --- | --- | --- |
| `fixed` | `Extract<Placement, 'top' | 'bottom'>` | `undefined` | Set to `top` for fixed to the top of the viewport, or `bottom` for fixed to the `bottom` of the viewport. |
| `sticky` | `Extract<Placement, 'top' | 'bottom'>` | `undefined` | Set to `true` to make the navbar stick to the top of the viewport (or parent container that has `position: relative` set) when scrolled. |

Notes:

-   Fixed positioning uses CSS `position: fixed`. You may need to adjust your document top/bottom padding or margin.
-   CSS `position: sticky` (used for `sticky`) is not fully supported in every browser. For browsers that do not support `position: sticky`, it will fallback natively to `position: relative`.

## Supported content [​](#supported-content)

Navbars come with built-in support for a handful of sub-components. Choose from the following as needed:

-   `BNavbarBrand` for your company, product, or project name.
-   `BNavbarToggle` for use with the `<BCollapse is-nav>` component.
-   `<BCollapse is-nav>` for grouping and hiding navbar contents by a parent breakpoint.
-   `BNavbarNav` for a full-height and lightweight navigation (including support for dropdowns). The following sub-components inside `BNavbarNav` are supported:
    -   `BNavItem` for link (and router-link) action items
    -   `BNavItemDropdown` for nav dropdown menus
    -   `BNavText` for adding vertically centered strings of text.
    -   `BNavForm` for any form controls and actions.

### `BNavbarBrand` [​](#bnavbarbrand)

The `BNavbarBrand` generates a link if `href` is provided, or a `RouterLink` if `to` is provided. If neither is given it renders as a `<div>` tag. You can override the tag type by setting the tag prop to the element you would like rendered:

HTML StackBlitz

template

```
<!-- As a link -->
<BNavbar
  v-b-color-mode="'dark'"
  variant="secondary"
>
  <BNavbarBrand href="#navbar-brand-link">BootstrapVueNext</BNavbarBrand>
</BNavbar>
```

HTML StackBlitz

template

```
<!-- As a heading -->
<BNavbar
  v-b-color-mode="'dark'"
  variant="secondary"
>
  <BNavbarBrand
    tag="h1"
    class="mb-0"
    >BootstrapVueNext</BNavbarBrand
  >
</BNavbar>
```

Adding images to the `BNavbarBrand` will likely always require custom styles or utilities to properly size. Here are some examples to demonstrate:

HTML StackBlitz

template

```
<!-- As a link -->
<BNavbar
  v-b-color-mode="'dark'"
  variant="success"
>
  <BNavbarBrand href="#navbar-brand-image">
    <img
      src="https://picsum.photos/30/30/?image=40"
      alt="Kitten"
    />
  </BNavbarBrand>
</BNavbar>
```

HTML StackBlitz

template

```
<!-- As a link -->
<BNavbar
  v-b-color-mode="'dark'"
  variant="success"
>
  <BNavbarBrand href="#navbar-brand-image-text">
    <img
      src="https://picsum.photos/30/30/?image=40"
      class="d-inline-block align-top"
      alt="Kitten"
    />
    BootstrapVueNext
  </BNavbarBrand>
</BNavbar>
```

### `BNavbarNav` [​](#bnavbarnav)

Navbar navigation links build on the `BNavbarNav` parent component and requires the use of `<BCollapse is-nav>` and `<-toggle>` toggler for proper responsive styling. Navigation in navbars will also grow to occupy as much horizontal space as possible to keep your navbar contents securely aligned.

`BNavbarNav` supports the following child components:

-   `BNavItem` for link (and router-link) action items
-   `BNavText` for adding vertically centered strings of text.
-   `BNavItemDropdown` for navbar dropdown menus
-   `BNavForm` for adding simple forms to the navbar.

### `BNavItem` [​](#bnavitem)

`BNavItem` is the primary link (and `RouterLink`) component. Providing a to prop value will generate a `RouterLink` while providing an href prop value will generate a standard link.

Set the `BNavItem` active prop will highlight the item as being the active page, Disable a `BNavItem` by setting the prop disabled to true.

Handle click events by specifying a handler for the `@click` event on `BNavItem`.

### `BNavText` [​](#bnavtext)

Navbars may contain bits of text with the help of `BNavText`. This component adjusts vertical alignment and horizontal spacing for strings of text.

HTML StackBlitz

template

```
<BNavbar
  v-b-color-mode="'dark'"
  toggleable="sm"
  variant="primary"
>
  <BNavbarToggle target="nav-text-collapse" />
  <BNavbarBrand>BootstrapVue</BNavbarBrand>
  <BCollapse
    id="nav-text-collapse"
    is-nav
  >
    <BNavbarNav>
      <BNavText>Navbar text</BNavText>
    </BNavbarNav>
  </BCollapse>
</BNavbar>
```

### `BNavItemDropdown` [​](#bnavitemdropdown)

For `BNavItemDropdown` usage, see the [`BDropdown`](./dropdown.html) docs. Note split dropdowns are not supported in `BNavbar` and `BNavbarNav`.

HTML StackBlitz

template

```
<BNavbar
  v-b-color-mode="'dark'"
  variant="dark"
>
  <BNavbarNav>
    <BNavItem href="#navbar-item-dropdown">Home</BNavItem>
    <BNavItemDropdown
      text="Lang"
      right
    >
      <BDropdownItem>EN</BDropdownItem>
      <BDropdownItem>ES</BDropdownItem>
      <BDropdownItem>RU</BDropdownItem>
      <BDropdownItem>FA</BDropdownItem>
    </BNavItemDropdown>
    <BNavItemDropdown
      text="User"
      right
    >
      <BDropdownItem>Account</BDropdownItem>
      <BDropdownItem>Settings</BDropdownItem>
    </BNavItemDropdown>
  </BNavbarNav>
</BNavbar>
```

### `BNavForm` [​](#bnavform)

Use `BNavForm` to place inline form controls into your navbar. See [`BNavForm`](./nav.html#nav-inline-forms) docs for details.

HTML StackBlitz

template

```
<BNavbar
  v-b-color-mode="'dark'"
  variant="primary"
>
  <BNavForm>
    <BFormInput
      class="me-sm-2"
      placeholder="Search"
    />
    <BButton
      variant="outline-success"
      class="my-2 my-sm-0"
      type="submit"
      >Search</BButton
    >
  </BNavForm>
</BNavbar>
```

Input Groups work as well:

HTML StackBlitz

template

```
<BNavbar
  v-b-color-mode="'dark'"
  variant="primary"
>
  <BNavForm>
    <BInputGroup prepend="@">
      <BFormInput placeholder="Username" />
    </BInputGroup>
  </BNavForm>
</BNavbar>
```

## `BNavbarToggle` and `<BCollapse is-nav>` [​](#bnavbartoggle-and-bcollapse-is-nav)

Navbars are not responsive by default, but you can easily modify them to change that. Responsive behavior depends on our `BCollapse` component.

Wrap `BNavbarNav` components in a `<BCollapse is-nav>` (remember to set the is-nav prop!) to specify content that will collapse based on a particular breakpoint. Assign a document unique id value on the `BCollapse`.

Use the `BNavbarToggle` component to control the collapse component, and set the target prop of `BNavbarToggle` to the id of `BCollapse`.

Set the toggleable prop on `BNavbar` to the desired breakpoint you would like content to automatically expand at. Possible toggleable values are sm, md, lg and xl. Setting toggleable to true (or an empty string) will set the navbar to be always collapsed, while setting it to false (the default) will disable collapsing (always expanded).

`BNavbarToggle` components are left-aligned by default, but should they follow a sibling element like `BNavbarBrand`, they'll automatically be aligned to the far right. Reversing your markup will reverse the placement of the toggler.

See the first example on this page for reference, and also refer to `BCollapse` for details on the collapse component.

Besides being used to control a collapse, the `BNavbarToggle` can also be used to toggle visibility of the `BSidebar` component. Just specify the ID of the `BSidebar` via the target prop.

Internally, `BNavbarToggle` uses the v-b-toggle directive.

### Custom navbar toggle [​](#custom-navbar-toggle)

`BNavbarToggle` renders the default Bootstrap v5 hamburger (which is a background SVG image). You can supply your own content (such as an icon) via the optionally scoped default slot. The default slot scope contains the property expanded, which will be true when the collapse is expanded, or false when the collapse is collapsed.

Note that the expanded scope property only works when supplying the target prop as a string, and not an array.

HTML StackBlitz

vue

```
<template>
  <BNavbar
    v-b-color-mode="'dark'"
    toggleable
    variant="dark"
  >
    <BNavbarBrand href="#navbar-toggle">NavBar</BNavbarBrand>
    <BNavbarToggle target="navbar-toggle-collapse">
      <template #default="{expanded}">
        <ChevronBarUpIcon v-if="expanded" />
        <ChevronBarDownIcon
          v-else
          icon="chevron-bar-down"
        />
      </template>
    </BNavbarToggle>
    <BCollapse
      id="navbar-toggle-collapse"
      is-nav
    >
      <BNavbarNav class="ms-auto">
        <BNavItem href="#navbar-toggle">Link 1</BNavItem>
        <BNavItem href="#navbar-toggle">Link 2</BNavItem>
        <BNavItem
          href="#navbar-toggle"
          disabled
          >Disabled</BNavItem
        >
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>

<script setup lang="ts">
import ChevronBarUpIcon from '~icons/bi/chevron-bar-up'
import ChevronBarDownIcon from '~icons/bi/chevron-bar-down'
</script>
```

### Offcanvas [​](#offcanvas)

Transform your expanding and collapsing navbar into an offcanvas drawer with the [`BOffoffcanvas`](./offcanvas.html) component.

In the example below, to create an offcanvas navbar that is always collapsed across all breakpoints, set `toggleable='true'`.

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <BNavbar
    v-b-color-mode="'dark'"
    :toggleable="true"
    variant="primary"
  >
    <BNavbarBrand href="#navbar-offcanvas">NavBar</BNavbarBrand>
    <BNavbarToggle target="nav-offcanvas" />
    <BOffcanvas
      id="nav-offcanvas"
      title="Offcanvas"
      placement="end"
      is-nav
    >
      <BNavbarNav>
        <BNavItem href="#navbar-offcanvas">Link</BNavItem>
        <BNavItem
          href="#navbar-offcanvas"
          disabled
          >Disabled</BNavItem
        >
      </BNavbarNav>
      <!-- Right aligned nav items -->
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavItemDropdown
          text="Lang"
          right
        >
          <BDropdownItem>EN</BDropdownItem>
          <BDropdownItem>ES</BDropdownItem>
          <BDropdownItem>RU</BDropdownItem>
          <BDropdownItem>FA</BDropdownItem>
        </BNavItemDropdown>
        <BNavItemDropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <BDropdownItem>Profile</BDropdownItem>
          <BDropdownItem>Sign Out</BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
      <BNavForm class="d-flex">
        <BFormInput
          class="me-2"
          placeholder="Search"
        />
        <BButton
          type="submit"
          variant="outline-success"
          >Search</BButton
        >
      </BNavForm>
    </BOffcanvas>
  </BNavbar>
  <!-- #endregion template -->
</template>
```

### Scrolling [​](#scrolling)

Add `.navbar-nav-scroll` to the `Navbar` (or other navbar sub-component) to enable vertical scrolling within the toggleable contents of a collapsed navbar. By default, scrolling kicks in at 75vh (or 75% of the viewport height), see the [bootstrap documentation](https://getbootstrap.com/docs/5.3/components/navbar/#scrolling) for details on overriding.

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <BNavbar
    v-b-color-mode="'dark'"
    :toggleable="true"
    variant="primary"
    class="navbar-nav-scroll"
  >
    <BNavbarBrand href="#navbar-scroll">NavBar</BNavbarBrand>
    <BNavbarToggle target="nav-scroll" />
    <BCollapse
      id="nav-scroll"
      is-nav
    >
      <BNavbarNav>
        <BNavItem href="#navbar-scroll">Link</BNavItem>
        <BNavItem
          href="#navbar-scroll"
          disabled
          >Disabled</BNavItem
        >
      </BNavbarNav>
      <!-- Right aligned nav items -->
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavItemDropdown
          text="Lang"
          right
        >
          <BDropdownItem>EN</BDropdownItem>
          <BDropdownItem>ES</BDropdownItem>
          <BDropdownItem>RU</BDropdownItem>
          <BDropdownItem>FA</BDropdownItem>
        </BNavItemDropdown>
        <BNavItemDropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <BDropdownItem>Profile</BDropdownItem>
          <BDropdownItem>Sign Out</BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
      <BNavForm class="d-flex">
        <BFormInput
          class="me-2"
          placeholder="Search"
        />
        <BButton
          type="submit"
          variant="outline-success"
          >Search</BButton
        >
      </BNavForm>
    </BCollapse>
  </BNavbar>
  <!-- #endregion template -->
</template>
```

### Auto close behavior [​](#auto-close-behavior)

By default, the collapsible component is closed when clicking inside or outside the dropdown menu. You can use the `auto-close` property to change this behavior of the collapsible component.

The `auto-close`property has 4 options.

-   `true` : the collapsible component will be closed by clicking outside or inside the collapsible component
-   `false` : the collapsible component will be closed by clicking the toggle button and manually calling the hide method. (Also will not be closed by pressing esc key)
-   `inside` : the collapsible component will be closed (only) by clicking inside the collapsible component menu
-   `outside` : the collapsible component will be closed (only) by clicking outside the dropdown menu

## Printing [​](#printing)

Navbars are hidden by default when printing. Force them to be printed by setting the print prop.

## See also [​](#see-also)

-   `BCollapse` component
-   `BSidebar` component
-   v-b-toggle directive
-   `BNav` documentation for additional components and sub-component aliases Refer to the Router support reference page for router-link specific props.

## Component Reference

### `<BNavbar>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BNavbar/BNavbar.vue)

-   [<BNavbar> Properties](#comp-reference-bnavbar-properties)
-   [<BNavbar> Slots](#comp-reference-bnavbar-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.navbar`

##### [Properties](#comp-reference-bnavbar-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| container | `boolean | 'fluid' | Breakpoint` | `'fluid'` | Use the container option to change the layout of the navbar. By default, the navbar is a fluid container. Use 'fluid' for a full width navbar, or a responsive breakpoint for a container width navbar. |
| fixed | `'top' | 'bottom'` | `undefined` | Set to 'top' for fixed to the top of the viewport, or 'bottom' for fixed to the bottom of the viewport |
| no-auto-close | `boolean` | `false` | Disable auto-closing of the navbar when a child component is clicked |
| print | `boolean` | `false` | Navbars are hidden by default when printing. When this prop is set it will be printed |
| sticky | `'top' | 'bottom'` | `undefined` | Set to 'true' to make the navbar stick to the top of the viewport (or parent container that has 'position: relative' set) when scrolled |
| tag | `string` | `'nav'` | Specify the HTML tag to render instead of the default tag |
| toggleable | `boolean | Breakpoint` | `false` | Set to 'true' for an always collapsed navbar, or to a specific breakpoint at which point the navbar will be expanded: 'sm', 'md', 'lg', 'xl', or 'xxl' |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Slots](#comp-reference-bnavbar-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the navbar |

### `<BNavbarBrand>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BNavbar/BNavbarBrand.vue)

-   [<BNavbarBrand> Properties](#comp-reference-bnavbarbrand-properties)
-   [<BNavbarBrand> Slots](#comp-reference-bnavbarbrand-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.navbar‑brand`

##### [Properties](#comp-reference-bnavbarbrand-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| tag | `string` | `'ul'` | Specify the HTML tag to render instead of the default tag |

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

##### [Slots](#comp-reference-bnavbarbrand-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the navbar brand |

### `<BNavbarNav>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BNavbar/BNavbarNav.vue)

-   [<BNavbarNav> Properties](#comp-reference-bnavbarnav-properties)
-   [<BNavbarNav> Slots](#comp-reference-bnavbarnav-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.navbar‑nav`

##### [Properties](#comp-reference-bnavbarnav-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| align | `AlignmentJustifyContent` | `undefined` | Align the nav items in the nav: 'start', 'end', 'center', 'between', 'around', or 'evenly' |
| fill | `boolean` | `false` | Proportionately fills all horizontal space with nav items. All horizontal space is occupied, but not every nav item has the same width |
| justified | `boolean` | `false` | Fills all horizontal space with nav items, but unlike 'fill', every nav item will be the same width |
| small | `boolean` | `false` | Makes the nav smaller |
| tag | `string` | `'ul'` | Specify the HTML tag to render instead of the default tag |

##### [Slots](#comp-reference-bnavbarnav-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the navbar nav |

### `<BNavbarToggle>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BNavbar/BNavbarToggle.vue)

-   [<BNavbarToggle> Properties](#comp-reference-bnavbartoggle-properties)
-   [<BNavbarToggle> Events](#comp-reference-bnavbartoggle-events)
-   [<BNavbarToggle> Slots](#comp-reference-bnavbartoggle-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.navbar‑toggle`

##### [Properties](#comp-reference-bnavbartoggle-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| label | `string` | `'Toggle navigation'` | String to place in the toggle's 'aria-label' attribute |
| target | `string | readonly string[]` | `undefined` | ID (or array of IDs) of the collapse/sidebar components that should be toggled |

##### [Events](#comp-reference-bnavbartoggle-events)

| Event | Args | Description |
| --- | --- | --- |
| click | 
`click``: MouseEvent` - Native mouse event object

 | Emitted when the toggle is clicked |

##### [Slots](#comp-reference-bnavbartoggle-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default | 
`expanded``: boolean` - \`true\` if the collapse is expanded, \`false\` otherwise

 | Alternate content to replace the default Bootstrap hamburger |
