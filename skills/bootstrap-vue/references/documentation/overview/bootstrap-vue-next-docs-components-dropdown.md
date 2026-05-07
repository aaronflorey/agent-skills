# Dropdown ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/dropdown.html

##### On this page

-   [Button content ​](#button-content)
    
-   [Positioning ​](#positioning)
    -   [Auto "flipping" ​](#auto-flipping)
        
    -   [Menu offset ​](#menu-offset)
        
    -   [Floating Strategy ​](#floating-strategy)
        
    -   [Boundary constraint ​](#boundary-constraint)
        
    -   [Container element ​](#container-element)
        
    -   [Dropdown auto close behavior ​](#dropdown-auto-close-behavior)
        
    -   [Advanced floating-ui configuration ​](#advanced-floating-ui-configuration)
        
-   [Split button support ​](#split-button-support)
    -   [Split button link support ​](#split-button-link-support)
        
    -   [Split button type ​](#split-button-type)
        
-   [Styling options ​](#styling-options)
    -   [Sizing ​](#sizing)
        
    -   [Dropdown color variants ​](#dropdown-color-variants)
        
    -   [Split button color variant ​](#split-button-color-variant)
        
    -   [Dark mode ​](#dark-mode)
        
    -   [Block level dropdowns ​](#block-level-dropdowns)
        
    -   [Dropdown sub-component color variants ​](#dropdown-sub-component-color-variants)
        
    -   [Hidden caret ​](#hidden-caret)
        
-   [v-model support ​](#v-model-support)
    
-   [Exposed Methods ​](#exposed-methods)
    
-   [Dropdown supported sub-components ​](#dropdown-supported-sub-components)
    -   [BDropdownItem ​](#bdropdownitem)
        
    -   [BDropdownItemButton ​](#bdropdownitembutton)
        
    -   [BDropdownDivider ​](#bdropdowndivider)
        
    -   [BDropdownText ​](#bdropdowntext)
        
    -   [BDropdownGroup ​](#bdropdowngroup)
        
    -   [BDropdownHeader ​](#bdropdownheader)
        
    -   [BDropdownForm ​](#bdropdownform)
        
-   [Accessibility ​](#accessibility)
    -   [Headers and accessibility ​](#headers-and-accessibility)
        
    -   [Keyboard navigation ​](#keyboard-navigation)
        
-   [Lazy ​](#lazy)
    
-   [Implementation notes ​](#implementation-notes)
    
-   [See also ​](#see-also)
    
-   [Component Reference](#component-reference)
    -   [<BDropdown>](#b-dropdown)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            
    -   [<BDropdownDivider>](#b-dropdown-divider)
        -   [Properties](#)
            
    -   [<BDropdownForm>](#b-dropdown-form)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BDropdownGroup>](#b-dropdown-group)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BDropdownHeader>](#b-dropdown-header)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BDropdownItem>](#b-dropdown-item)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
    -   [<BDropdownItemButton>](#b-dropdown-item-button)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
    -   [<BDropdownText>](#b-dropdown-text)
        -   [Properties](#)
            
        -   [Slots](#)
            

# Dropdown [​](#dropdown)

Dropdowns are toggleable, contextual overlays for displaying lists of links and actions in a dropdown menu format.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BDropdown/BDropdown.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/dropdown.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bdropdown)

`BDropdown` components are toggleable, contextual overlays for displaying lists of links, and more. They're toggled by clicking (or pressing space or enter when focused), not by hovering; this is an [intentional design decision](https://markdotto.com/2012/02/27/bootstrap-explained-dropdowns/).

Dropdown Button

-   First Action
-   Second Action
-   Third Action
-   * * *
    
-   Active action
-   Disabled action

HTML StackBlitz

template

```
<BDropdown
  text="Dropdown Button"
  class="me-2"
>
  <BDropdownItem>First Action</BDropdownItem>
  <BDropdownItem>Second Action</BDropdownItem>
  <BDropdownItem>Third Action</BDropdownItem>
  <BDropdownDivider />
  <BDropdownItem active>Active action</BDropdownItem>
  <BDropdownItem disabled>Disabled action</BDropdownItem>
</BDropdown>
```

## Button content [​](#button-content)

You can customize the text of the dropdown button by using either the `text` prop (shown in previous examples), or use the `button-content` slot instead of the `text` prop. The `button-content` slot allows you to use basic HTML and icons in the button content.

If both the prop `text` and slot `button-content` are present, the slot `button-content` will take precedence.

Button text via Prop

-   An item
-   Another item

Custom **Content** with _HTML_ via Slot

-   An item
-   Another item

HTML StackBlitz

template

```
<div class="d-flex gap-2">
  <BDropdown
    text="Button text via Prop"
    class="me-2"
  >
    <BDropdownItem>An item</BDropdownItem>
    <BDropdownItem>Another item</BDropdownItem>
  </BDropdown>
  <BDropdown class="me-2">
    <template #button-content>
      Custom <strong>Content</strong> with <em>HTML</em> via Slot
    </template>
    <BDropdownItem>An item</BDropdownItem>
    <BDropdownItem>Another item</BDropdownItem>
  </BDropdown>
</div>
```

## Positioning [​](#positioning)

Twelve options are available for the `placement` prop: `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end` from [@floating-ui/vue](https://floating-ui.com/). The default placement is `bottom-start`.

Positioning is relative to the toggle button.

Top

-   Action
-   Another action
-   Something else here

Top Start

-   Action
-   Another action
-   Something else here

Top End

-   Action
-   Another action
-   Something else here

Bottom

-   Action
-   Another action
-   Something else here

Bottom Start

-   Action
-   Another action
-   Something else here

Bottom End

-   Action
-   Another action
-   Something else here

Left

-   Action
-   Another action
-   Something else here

Left Start

-   Action
-   Another action
-   Something else here

Left End

-   Action
-   Another action
-   Something else here

Right

-   Action
-   Another action
-   Something else here

Right Start

-   Action
-   Another action
-   Something else here

Right End

-   Action
-   Another action
-   Something else here

HTML StackBlitz

template

```
<BContainer>
  <BRow class="my-2">
    <BCol class="d-grid gap-2">
      <BDropdown
        placement="top"
        text="Top"
        variant="primary"
      >
        <BDropdownItem>Action</BDropdownItem>
        <BDropdownItem>Another action</BDropdownItem>
        <BDropdownItem>Something else here</BDropdownItem>
      </BDropdown>
      <BDropdown
        placement="top-start"
        text="Top Start"
        variant="primary"
      >
        <BDropdownItem>Action</BDropdownItem>
        <BDropdownItem>Another action</BDropdownItem>
        <BDropdownItem>Something else here</BDropdownItem>
      </BDropdown>
      <BDropdown
        placement="top-end"
        text="Top End"
        variant="primary"
      >
        <BDropdownItem>Action</BDropdownItem>
        <BDropdownItem>Another action</BDropdownItem>
        <BDropdownItem>Something else here</BDropdownItem>
      </BDropdown>
    </BCol>
    <BCol class="d-grid gap-2">
      <BDropdown
        placement="bottom"
        text="Bottom"
        variant="primary"
      >
        <BDropdownItem>Action</BDropdownItem>
        <BDropdownItem>Another action</BDropdownItem>
        <BDropdownItem>Something else here</BDropdownItem>
      </BDropdown>
      <BDropdown
        placement="bottom-start"
        text="Bottom Start"
        variant="primary"
      >
        <BDropdownItem>Action</BDropdownItem>
        <BDropdownItem>Another action</BDropdownItem>
        <BDropdownItem>Something else here</BDropdownItem>
      </BDropdown>
      <BDropdown
        placement="bottom-end"
        text="Bottom End"
        variant="primary"
      >
        <BDropdownItem>Action</BDropdownItem>
        <BDropdownItem>Another action</BDropdownItem>
        <BDropdownItem>Something else here</BDropdownItem>
      </BDropdown>
    </BCol>
    <BCol class="d-grid gap-2">
      <BDropdown
        placement="left"
        text="Left"
        variant="primary"
      >
        <BDropdownItem>Action</BDropdownItem>
        <BDropdownItem>Another action</BDropdownItem>
        <BDropdownItem>Something else here</BDropdownItem>
      </BDropdown>
      <BDropdown
        placement="left-start"
        text="Left Start"
        variant="primary"
      >
        <BDropdownItem>Action</BDropdownItem>
        <BDropdownItem>Another action</BDropdownItem>
        <BDropdownItem>Something else here</BDropdownItem>
      </BDropdown>
      <BDropdown
        placement="left-end"
        text="Left End"
        variant="primary"
      >
        <BDropdownItem>Action</BDropdownItem>
        <BDropdownItem>Another action</BDropdownItem>
        <BDropdownItem>Something else here</BDropdownItem>
      </BDropdown>
    </BCol>
    <BCol class="d-grid gap-2">
      <BDropdown
        placement="right"
        text="Right"
        variant="primary"
      >
        <BDropdownItem>Action</BDropdownItem>
        <BDropdownItem>Another action</BDropdownItem>
        <BDropdownItem>Something else here</BDropdownItem>
      </BDropdown>
      <BDropdown
        placement="right-start"
        text="Right Start"
        variant="primary"
      >
        <BDropdownItem>Action</BDropdownItem>
        <BDropdownItem>Another action</BDropdownItem>
        <BDropdownItem>Something else here</BDropdownItem>
      </BDropdown>
      <BDropdown
        placement="right-end"
        text="Right End"
        variant="primary"
      >
        <BDropdownItem>Action</BDropdownItem>
        <BDropdownItem>Another action</BDropdownItem>
        <BDropdownItem>Something else here</BDropdownItem>
      </BDropdown>
    </BCol>
  </BRow>
</BContainer>
```

### Auto "flipping" [​](#auto-flipping)

By default, dropdowns may flip to the top, or the bottom, based on their current position in the viewport. To disable this auto-flip feature, set the `no-flip` prop.

No flipping

-   An item
-   Another item
-   Yet Another item

HTML StackBlitz

template

```
<BDropdown
  text="No flipping"
  no-flip
  class="me-2"
>
  <BDropdownItem>An item</BDropdownItem>
  <BDropdownItem>Another item</BDropdownItem>
  <BDropdownItem>Yet Another item</BDropdownItem>
</BDropdown>
```

### Menu offset [​](#menu-offset)

Like to move your menu away from the toggle buttons a bit? Then use the `offset` prop to specify the number of pixels to push right (or left when negative) from the toggle button:

Offset Dropdown

-   Action
-   Another action
-   Something else here

Offset Dropdown 2 dimensions

-   Action
-   Another action
-   Something else here

HTML StackBlitz

template

```
<BDropdown
  offset="25"
  text="Offset Dropdown"
  class="me-2"
>
  <BDropdownItem>Action</BDropdownItem>
  <BDropdownItem>Another action</BDropdownItem>
  <BDropdownItem>Something else here</BDropdownItem>
</BDropdown>
<BDropdown
  :offset="{alignmentAxis: 50, crossAxis: 60, mainAxis: 70}"
  text="Offset Dropdown 2 dimensions"
  class="me-2"
>
  <BDropdownItem>Action</BDropdownItem>
  <BDropdownItem>Another action</BDropdownItem>
  <BDropdownItem>Something else here</BDropdownItem>
</BDropdown>
```

### Floating Strategy [​](#floating-strategy)

By default, the floating element will render using _absolute_. You can change this using the `strategy` prop. The only other option is `fixed`. See the [floating-ui documentation](https://floating-ui.com/docs/hide#strategy) for details.

Strategy fixed

-   Action
-   Another action
-   Something else here

HTML StackBlitz

template

```
<BDropdown
  text="Strategy fixed"
  strategy="fixed"
  class="me-2"
>
  <BDropdownItem>Action</BDropdownItem>
  <BDropdownItem>Another action</BDropdownItem>
  <BDropdownItem>Something else here</BDropdownItem>
</BDropdown>
```

### Boundary constraint [​](#boundary-constraint)

By default, dropdowns are visually constrained to their clipping ancestors, which will suffice in most situations. However, if you place a dropdown inside an element that has `overflow: scroll` (or similar) set, the dropdown menu may - in some situations - get cut off. To get around this, you can specify a boundary element via the `boundary` prop. Supported values any values from [floating-ui](https://floating-ui.com/)[Boundary](https://floating-ui.com/docs/detectoverflow#boundary) or [RootBoundary](https://floating-ui.com/docs/detectoverflow#rootboundary) types. The default value is `clippingAncestors`.

**Note:** When `boundary` is any value other than the default of `clippingAncestors`, the style `position: static` is applied to the dropdown component's root element to allow the menu to "break out" of its scroll container. In some situations, this may affect your layout or positioning of the dropdown trigger button. In these cases, you may need to wrap your dropdown inside another element

**Note:** BootstrapVueNext uses [floating-ui](https://floating-ui.com/) under the hood, so please read [their options documnetation](https://floating-ui.com/docs/detectoverflow#options) for details on `boundary` and `boundary-padding`.

### Container element [​](#container-element)

By default, dropdowns are next to the toggle button. However, you can specify a container element via the `container` prop where dropdowns will be teleported to instead. Supported values are CSS selector string, an actual DOM node or a reference to an HTML element.

### Dropdown auto close behavior [​](#dropdown-auto-close-behavior)

By default, the dropdown menu is closed when clicking inside or outside the dropdown menu. You can use the `auto-close` property to change this behavior of the dropdown.

The `auto-close`property has 4 options.

-   `true` : the dropdown will be closed by clicking outside or inside the dropdown menu
-   `false` : the dropdown will be closed by clicking the toggle button and manually calling the hide method. (Also will not be closed by pressing esc key)
-   `inside` : the dropdown will be closed (only) by clicking inside the dropdown menu
-   `outside` : the dropdown will be closed (only) by clicking outside the dropdown menu

Default Dropdown

-   Action
-   Another action
-   Something else here

Clickable outside (auto-close=inside)

-   Action
-   Another action
-   Something else here

Clickable inside (auto-close=outside)

-   Action
-   Another action
-   Something else here

Manual close (auto-close=false)

-   Action
-   Another action
-   Something else here

HTML StackBlitz

template

```
<BDropdown
  text="Default Dropdown"
  class="me-2"
>
  <BDropdownItemButton>Action</BDropdownItemButton>
  <BDropdownItemButton>Another action</BDropdownItemButton>
  <BDropdownItemButton>Something else here</BDropdownItemButton>
</BDropdown>
<BDropdown
  text="Clickable outside (auto-close=inside)"
  auto-close="inside"
  class="me-2"
>
  <BDropdownItemButton>Action</BDropdownItemButton>
  <BDropdownItemButton>Another action</BDropdownItemButton>
  <BDropdownItemButton>Something else here</BDropdownItemButton>
</BDropdown>
<BDropdown
  text="Clickable inside (auto-close=outside)"
  auto-close="outside"
  class="me-2"
>
  <BDropdownItemButton>Action</BDropdownItemButton>
  <BDropdownItemButton>Another action</BDropdownItemButton>
  <BDropdownItemButton>Something else here</BDropdownItemButton>
</BDropdown>
<BDropdown
  text="Manual close (auto-close=false)"
  :auto-close="false"
  class="me-2"
>
  <BDropdownItemButton>Action</BDropdownItemButton>
  <BDropdownItemButton>Another action</BDropdownItemButton>
  <BDropdownItemButton>Something else here</BDropdownItemButton>
</BDropdown>
```

### Advanced floating-ui configuration [​](#advanced-floating-ui-configuration)

Occasionally you may want to modify the floating-ui behavior. We already expose some configurations through the `no-flip`, `no-shift`, `strategy`, and `offset` props. However, lower-level access to the API may sometimes be required. You can use the `floatingMiddleware` prop to define middleware to pass through to the floating-ui element.

You can view the [Floating-ui docs](https://floating-ui.com/docs/middleware) to learn more about their middleware. Note: You will likely want to install `@floating-ui/vue` to use their middleware directly, rather than rebuilding middleware options.

**Note**: Using the `floatingMiddleware` prop will overwrite other defined middleware such as `offset`, `noFlip`, and `noShift`. They are not merged.

## Split button support [​](#split-button-support)

Create a split dropdown button, where the left button provides a `split-click` event and link support, while the right-hand side is the dropdown menu toggle button.

Split DropdownToggle dropdown

-   Action
-   Another action
-   Something else here...

HTML StackBlitz

template

```
<BDropdown
  split
  text="Split Dropdown"
  class="me-2"
>
  <BDropdownItem>Action</BDropdownItem>
  <BDropdownItem>Another action</BDropdownItem>
  <BDropdownItem>Something else here...</BDropdownItem>
</BDropdown>
```

### Split button link support [​](#split-button-link-support)

The left split button defaults to an element of type `<button>` (a `BButton` to be exact). To convert this button into a link or `RouterLink`, specify the href via the `split-href` prop or a router link `to` value via the `split-to` prop, while maintaining the look of a button.

[Split Link](#foo/bar)Toggle dropdown

-   Action
-   Another action
-   Something else here...

HTML StackBlitz

template

```
<BDropdown
  split
  split-href="#foo/bar"
  text="Split Link"
  class="me-2"
>
  <BDropdownItem>Action</BDropdownItem>
  <BDropdownItem>Another action</BDropdownItem>
  <BDropdownItem>Something else here...</BDropdownItem>
</BDropdown>
```

### Split button type [​](#split-button-type)

The split button defaults to a button `type` of `button`. You can specify an alternate type via the `split-button-type` prop. Supported values are: `button`, `submit`, and `reset`.

If props `split-to` or `split-href` are set, the `split-button-type` prop will be ignored.

## Styling options [​](#styling-options)

Dropdowns support various props for styling the dropdown trigger button.

### Sizing [​](#sizing)

Dropdowns work with trigger buttons of all sizes, including default and split dropdown buttons.

Set the `size` prop to either `sm` for a small button, or `lg` for a large button.

Large

-   Action
-   Another action
-   Something else here

Large SplitToggle dropdown

-   Action
-   Another action
-   Something else here...

Small

-   Action
-   Another action
-   Something else here...

Small SplitToggle dropdown

-   Action
-   Another action
-   Something else here...

HTML StackBlitz

template

```
<div class="d-flex flex-wrap gap-2">
  <BDropdown
    size="lg"
    text="Large"
    class="me-2"
  >
    <BDropdownItemButton>Action</BDropdownItemButton>
    <BDropdownItemButton>Another action</BDropdownItemButton>
    <BDropdownItemButton>Something else here</BDropdownItemButton>
  </BDropdown>
  <BDropdown
    size="lg"
    split
    text="Large Split"
    class="me-2"
  >
    <BDropdownItemButton>Action</BDropdownItemButton>
    <BDropdownItemButton>Another action</BDropdownItemButton>
    <BDropdownItemButton>Something else here...</BDropdownItemButton>
  </BDropdown>
</div>
<div class="d-flex flex-wrap gap-2 mt-2">
  <BDropdown
    size="sm"
    text="Small"
    class="me-2"
  >
    <BDropdownItemButton>Action</BDropdownItemButton>
    <BDropdownItemButton>Another action</BDropdownItemButton>
    <BDropdownItemButton>Something else here...</BDropdownItemButton>
  </BDropdown>
  <BDropdown
    size="sm"
    split
    text="Small Split"
    class="me-2"
  >
    <BDropdownItemButton>Action</BDropdownItemButton>
    <BDropdownItemButton>Another action</BDropdownItemButton>
    <BDropdownItemButton>Something else here...</BDropdownItemButton>
  </BDropdown>
</div>
```

**Note:** _changing the size of the button(s) does not affect the size of the menu items!_

### Dropdown color variants [​](#dropdown-color-variants)

The dropdown toggle button can have one of the standard Bootstrap contextual variants applied by setting the prop `variant` to `success`, `primary`, `info`, `danger`, `link`, `outline-dark`, etc. (or custom variants, if defined). The default variant is `secondary`.

See the [Variant Reference](/bootstrap-vue-next/docs/reference/color-variants.html) for a full list of built-in contextual variants.

Primary

-   Action
-   Another action
-   Something else here

Success

-   Action
-   Another action
-   Something else here

Outline Danger

-   Action
-   Another action
-   Something else here

HTML StackBlitz

template

```
<BDropdown
  text="Primary"
  variant="primary"
  class="me-2"
>
  <BDropdownItem>Action</BDropdownItem>
  <BDropdownItem>Another action</BDropdownItem>
  <BDropdownItem>Something else here</BDropdownItem>
</BDropdown>
<BDropdown
  text="Success"
  variant="success"
  class="me-2"
>
  <BDropdownItem>Action</BDropdownItem>
  <BDropdownItem>Another action</BDropdownItem>
  <BDropdownItem>Something else here</BDropdownItem>
</BDropdown>
<BDropdown
  text="Outline Danger"
  variant="outline-danger"
  class="me-2"
>
  <BDropdownItem>Action</BDropdownItem>
  <BDropdownItem>Another action</BDropdownItem>
  <BDropdownItem>Something else here</BDropdownItem>
</BDropdown>
```

You can also apply arbitrary classes to the toggle button via the `toggle-class` prop.

### Split button color variant [​](#split-button-color-variant)

By default, the left split button uses the same `variant` as the `toggle` button. You can give the split button its variant via the `split-variant` prop.

Split Variant DropdownToggle dropdown

-   Action
-   Another action
-   Something else here...

HTML StackBlitz

template

```
<BDropdown
  split
  split-variant="outline-primary"
  variant="primary"
  text="Split Variant Dropdown"
  class="me-2"
>
  <BDropdownItem>Action</BDropdownItem>
  <BDropdownItem>Another action</BDropdownItem>
  <BDropdownItem>Something else here...</BDropdownItem>
</BDropdown>
```

### Dark mode [​](#dark-mode)

Dark variants for components were deprecated in Bootstrap v5.3.0. See [their documentation](https://getbootstrap.com/docs/5.3/components/dropdowns/#dark-dropdowns) for details.

### Block level dropdowns [​](#block-level-dropdowns)

By default, dropdowns act like buttons and are displayed inline. Create a full-width, “block button” by adding the classes `d-grid` and `gap-2` to the `BDropdown`. For split buttons, wrap the `BDropdown` in a div that has the `d-grid` and `gap-2` classes and add `split-class="w-100"` to the `BDropdown` itself. See the [Bootstrap 5](https://getbootstrap.com/docs/5.3/components/buttons/#block-buttons) button documentation for details

Block Level Dropdown

-   Action
-   Another action
-   Something else here

Block Level Split DropdownToggle dropdown

-   Action
-   Another action
-   Something else here...

HTML StackBlitz

template

```
<BDropdown
  text="Block Level Dropdown"
  variant="primary"
  class="d-grid gap-2 mb-2"
>
  <BDropdownItem>Action</BDropdownItem>
  <BDropdownItem>Another action</BDropdownItem>
  <BDropdownItem>Something else here</BDropdownItem>
</BDropdown>
<div class="d-grid gap-2">
  <BDropdown
    text="Block Level Split Dropdown"
    split
    split-variant="outline-primary"
    variant="primary"
    split-class="w-100"
  >
    <BDropdownItem>Action</BDropdownItem>
    <BDropdownItem>Another action</BDropdownItem>
    <BDropdownItem>Something else here...</BDropdownItem>
  </BDropdown>
</div>
```

If you want the dropdown menu to span to the full width of the parent container too, add the `w-100` utility class to the `menu-class` prop.

Block Level Dropdown Menu

-   Action
-   Another action
-   Something else here

HTML StackBlitz

template

```
<BDropdown
  text="Block Level Dropdown Menu"
  block
  variant="primary"
  menu-class="w-100"
>
  <BDropdownItem>Action</BDropdownItem>
  <BDropdownItem>Another action</BDropdownItem>
  <BDropdownItem>Something else here</BDropdownItem>
</BDropdown>
```

### Dropdown sub-component color variants [​](#dropdown-sub-component-color-variants)

Many of the supported dropdown [sub-components](#dropdown-supported-sub-components) provide a `variant` prop for controlling their text color.

### Hidden caret [​](#hidden-caret)

The dropdown can be created with the toggle's caret visually hidden by setting the `no-caret` prop to `true`. This is useful when the dropdown is to be displayed as an icon.

🔍Search

-   Action
-   Another action
-   Something else here...

HTML StackBlitz

template

```
<BDropdown
  size="lg"
  variant="link"
  toggle-class="text-decoration-none"
  no-caret
>
  <template #button-content> &#x1f50d;<span class="visually-hidden">Search</span> </template>
  <BDropdownItem>Action</BDropdownItem>
  <BDropdownItem>Another action</BDropdownItem>
  <BDropdownItem>Something else here...</BDropdownItem>
</BDropdown>
```

**Note:** The caret will always be shown when using `split` mode.

## v-model support [​](#v-model-support)

The dropdown's opened state is bound to the component's `v-model`. Programatic control of the state of the dropdown can be managed via the model. The model can also be used to observe the state of the dropdown.

Open: false

Open DropdownClose Dropdown

Dropdown Button

-   First Action
-   Second Action
-   Third Action
-   * * *
    
-   Active action
-   Disabled action

HTML StackBlitz

vue

```
<template>
  <p>Open: {{ model }}</p>

  <div class="d-flex gap-2 mb-2">
    <BButton @click="model = true">Open Dropdown</BButton>
    <BButton @click="model = false">Close Dropdown</BButton>
  </div>

  <BDropdown
    v-model="model"
    text="Dropdown Button"
    class="me-2"
  >
    <BDropdownItem>First Action</BDropdownItem>
    <BDropdownItem>Second Action</BDropdownItem>
    <BDropdownItem>Third Action</BDropdownItem>
    <BDropdownDivider />
    <BDropdownItem active>Active action</BDropdownItem>
    <BDropdownItem disabled>Disabled action</BDropdownItem>
  </BDropdown>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const model = ref<boolean>(false)
</script>
```

## Exposed Methods [​](#exposed-methods)

You can control the dropdown programmatically using template ref methods. See the [Component Reference Exposed section](#comp-reference-bdropdown-exposed) for available methods.

ShowHideToggle

Dropdown Button

-   First Action
-   Second Action
-   Third Action
-   * * *
    
-   Active action
-   Disabled action

HTML StackBlitz

vue

```
<template>
  <div class="d-flex gap-2 mb-2">
    <BButton
      variant="danger"
      @click="show"
      >Show</BButton
    >
    <BButton
      variant="success"
      @click="hide"
      >Hide</BButton
    >
    <BButton @click="toggle">Toggle</BButton>
  </div>

  <BDropdown
    ref="myDropdown"
    text="Dropdown Button"
    :auto-close="false"
    class="me-2"
  >
    <BDropdownItem>First Action</BDropdownItem>
    <BDropdownItem>Second Action</BDropdownItem>
    <BDropdownItem>Third Action</BDropdownItem>
    <BDropdownDivider />
    <BDropdownItem active>Active action</BDropdownItem>
    <BDropdownItem disabled>Disabled action</BDropdownItem>
  </BDropdown>
</template>

<script setup lang="ts">
import {BDropdown} from 'bootstrap-vue-next/components/BDropdown'
import {useTemplateRef} from 'vue'

const myDropdown = useTemplateRef('myDropdown')

const show = () => myDropdown.value?.show()
const hide = () => myDropdown.value?.hide()
const toggle = () => myDropdown.value?.toggle()
</script>
```

## Dropdown supported sub-components [​](#dropdown-supported-sub-components)

The following components can be placed inside your dropdowns. Using any other component or markup may break layout and/or keyboard navigation.

| Sub-component | Description |
| --- | --- |
| `BDropdownItem` | Action items that provide click, link, and `RouterLink`/`NuxtLink` functionality. Renders as an `<a>` element by default |
| `BDropdownItemButton` | An alternative to `BDropdownItem` that renders a menu item using a `<button>` element |
| `BDropdownDivider` | A divider/spacer which can be used to separate dropdown items |
| `BDropdownText` | Free flowing text content in a menu |
| `BDropdownGroup` | For grouping dropdown sub-components with an optional header |
| `BDropdownHeader` | A header item, used to help identify a group of dropdown items |
| `BDropdownForm` | For placing form controls within a dropdown menu. |

WARNING

_Nested sub-menus are **not** supported._

TIP

There are small differences in how the sub-components behave, please read our [migration guide](/bootstrap-vue-next/docs/migration-guide.html#dropdown-sub-components) if you are converting from `bootstrap-vue`.

### BDropdownItem [​](#bdropdownitem)

The `BDropdownItem` is typically used to create a navigation link inside your menu. Use either the `href` prop or the `to` prop (for router link support) to generate the appropriate navigation link. If neither `href` nor `to` are provided, a standard `<a>` link will be generated with an `href` of `#` (with an event handler that will prevent scroll to top behavior by preventing the default link action).

Disabled the dropdown item by setting the `disabled` prop.

Dropdown

-   First Action
-   Second Action
-   Active action
-   Disabled action
-   [Badge](/docs/components/badge)

HTML StackBlitz

template

```
<BDropdown text="Dropdown">
  <BDropdownItem>First Action</BDropdownItem>
  <BDropdownItem variant="primary">Second Action</BDropdownItem>
  <BDropdownItem active>Active action</BDropdownItem>
  <BDropdownItem disabled>Disabled action</BDropdownItem>
  <BDropdownItem to="/docs/components/badge">Badge</BDropdownItem>
</BDropdown>
```

### BDropdownItemButton [​](#bdropdownitembutton)

Historically dropdown menu contents had to be links (`BDropdownItem`), but that is no longer the case with Bootstrap v5. Now you can optionally create `<button>` elements in your dropdowns by using the `BDropdownItemButton` sub-component. `BDropdownItemButton` does not support the `href` or `to` props.

Disabled the dropdown item button by setting the `disabled` prop.

Dropdown using buttons as menu items

-   I am a button
-   I am a active button
-   I am a button, but disabled!
-   I do not look like a button, but I am!

HTML StackBlitz

template

```
<BDropdown text="Dropdown using buttons as menu items">
  <BDropdownItemButton>I am a button</BDropdownItemButton>
  <BDropdownItemButton active>I am a active button</BDropdownItemButton>
  <BDropdownItemButton disabled>I am a button, but disabled!</BDropdownItemButton>
  <BDropdownItemButton>I do not look like a button, but I am!</BDropdownItemButton>
</BDropdown>
```

When the menu item does not trigger navigation, it is recommended to use the `BDropdownItemButton` sub-component.

### BDropdownDivider [​](#bdropdowndivider)

Separate groups of related menu items with `BDropdownDivider`.

Dropdown with divider

-   First item
-   Second item
-   * * *
    
-   Separated Item

HTML StackBlitz

template

```
<BDropdown text="Dropdown with divider">
  <BDropdownItemButton>First item</BDropdownItemButton>
  <BDropdownItemButton>Second item</BDropdownItemButton>
  <BDropdownDivider />
  <BDropdownItemButton>Separated Item</BDropdownItemButton>
</BDropdown>
```

### BDropdownText [​](#bdropdowntext)

Place any freeform text within a dropdown menu using the `BDropdownText` sub-component or use text combined with spacing utilities. Note that you'll likely need additional sizing styles to constrain/set the menu width.

Dropdown with text

-   Some example text that is free-flowing within the dropdown menu.
-   And this is more example text.
-   * * *
    
-   First item
-   Second Item

HTML StackBlitz

template

```
<BDropdown text="Dropdown with text">
  <BDropdownText style="width: 240px">
    Some example text that is free-flowing within the dropdown menu.
  </BDropdownText>
  <BDropdownText tag="span">And this is more example text.</BDropdownText>
  <BDropdownDivider />
  <BDropdownItemButton>First item</BDropdownItemButton>
  <BDropdownItemButton>Second Item</BDropdownItemButton>
</BDropdown>
```

`BDropdownText` has the BootstrapVueNext custom class `.b-dropdown-text` applied to it which sets some basic styles which are suitable in most situations. By default, its width will be the same as the widest `BDropdownItem` content. You may need to place additional styles or helper classes on the component.

`variant`)

### BDropdownGroup [​](#bdropdowngroup)

Group a set of dropdown sub-components with an optional associated header. Place a `BDropdownDivider` between your `BDropdownGroup` and other groups or non-grouped dropdown contents.

Dropdown with group

-   Non-grouped Item
-   * * *
    
-   -   First Grouped item
    -   Second Grouped Item
-   -   First Grouped item
    -   Second Grouped Item
-   * * *
    
-   Another Non-grouped Item

HTML StackBlitz

template

```
<BDropdown text="Dropdown with group">
  <BDropdownItemButton> Non-grouped Item </BDropdownItemButton>
  <BDropdownDivider />
  <BDropdownGroup header="Group 1">
    <BDropdownItemButton>First Grouped item</BDropdownItemButton>
    <BDropdownItemButton>Second Grouped Item</BDropdownItemButton>
  </BDropdownGroup>
  <BDropdownGroup
    header="Group 2"
    header-variant="primary"
  >
    <BDropdownItemButton>First Grouped item</BDropdownItemButton>
    <BDropdownItemButton>Second Grouped Item</BDropdownItemButton>
  </BDropdownGroup>
  <BDropdownDivider />
  <BDropdownItemButton> Another Non-grouped Item </BDropdownItemButton>
</BDropdown>
```

### BDropdownHeader [​](#bdropdownheader)

Add a header to label sections of actions in any dropdown menu.

Dropdown with header

-   ###### Dropdown header
    
-   First item
-   Second Item

HTML StackBlitz

template

```
<BDropdown text="Dropdown with header">
  <BDropdownHeader> Dropdown header </BDropdownHeader>
  <BDropdownItemButton aria-describedby="dropdown-header-label"> First item </BDropdownItemButton>
  <BDropdownItemButton aria-describedby="dropdown-header-label">
    Second Item
  </BDropdownItemButton>
</BDropdown>
```

See Section [Headers and accessibility](#headers-and-accessibility) for details on making headers more accessible for users of assistive technologies.

Using the `BDropdownGroup` sub-component simplifies creating accessible grouped dropdown items with an associated header.

### BDropdownForm [​](#bdropdownform)

Add a form into your dropdown with `BDropdownForm`.

Dropdown with form

-   Email address:We'll never share your email with anyone else.
    
    Password:We'll never share your email with anyone else.
    
     Remember me
    
    Sign In
    
-   * * *
    
-   New around here? Sign up
-   Forget Password

HTML StackBlitz

template

```
<BDropdown
  text="Dropdown with form"
  auto-close="outside"
>
  <BDropdownForm>
    <BFormGroup
      label="Email address:"
      label-for="email"
      description="We'll never share your email with anyone else."
    >
      <BFormInput
        id="email"
        type="email"
        placeholder="Enter email"
        required
      />
    </BFormGroup>
    <BFormGroup
      label="Password:"
      label-for="password"
      description="We'll never share your email with anyone else."
    >
      <BFormInput
        id="password"
        type="password"
        required
      />
    </BFormGroup>
    <BFormCheckbox
      id="remember"
      name="remember"
      value="remember"
      checked
    >
      Remember me</BFormCheckbox
    >
    <BButton
      type="submit"
      variant="primary"
      >Sign In</BButton
    >
  </BDropdownForm>
  <BDropdownDivider />
  <BDropdownItemButton>New around here? Sign up</BDropdownItemButton>
  <BDropdownItemButton>Forget Password</BDropdownItemButton>
</BDropdown>
```

Or make it inline.

Dropdown with inline form

-   Email:
    
    Password:
    
-   * * *
    
-   New around here? Sign up
-   Forget Password

HTML StackBlitz

template

```
<BDropdown
  text="Dropdown with inline form"
  auto-close="outside"
>
  <BDropdownForm form-class="d-flex flex-row align-items-center flex-wrap">
    <BFormGroup
      label="Email:"
      label-for="email-inline"
      label-cols="3"
      label-align="end"
    >
      <BFormInput
        id="email-inline"
        type="email"
        placeholder="Enter email"
        required
      />
    </BFormGroup>
    <BFormGroup
      label="Password:"
      label-for="password-inline"
      label-cols="4"
      label-align="end"
    >
      <BFormInput
        id="password-inline"
        type="password"
        required
      />
    </BFormGroup>
  </BDropdownForm>
  <BDropdownDivider />
  <BDropdownItemButton>New around here? Sign up</BDropdownItemButton>
  <BDropdownItemButton>Forget Password</BDropdownItemButton>
</BDropdown>
```

## Accessibility [​](#accessibility)

Providing a unique `id` prop ensures ARIA compliance by automatically adding the appropriate `aria-*` attributes in the rendered markup. By default, the dropdown will render a unique id for every dropdown. However, this can be overwritten with the prop `id`.

The default ARIA role is set to `menu`, but you can change this default to another role (such as `navigation`) via the `role` prop, depending on your use case.

When a menu item does not trigger navigation, it is recommended to use the `BDropdownItemButton` sub-component (which is not announced as a link) instead of `BDropdownItem` (which is presented as a link to the user).

For information on managing ARIA attributes for dropdown triggers, see the [ARIA Trigger Registration for Component Visibility](/bootstrap-vue-next/docs/reference/accessibility.html#aria-trigger-registration-for-component-visibility) section in the Accessibility reference.

### Headers and accessibility [​](#headers-and-accessibility)

When using `BDropdownHeader` components in the dropdown menu, it is recommended to add an `id` attribute to each of the headers, and then set the `aria-describedby` attribute (set to the `id` value of the associated header) on each following dropdown items under that header. This will provide users of assistive technologies (i.e. sight-impaired users) additional context about the dropdown item:

Dropdown ARIA

-   ###### Groups
    
-   Add
-   Delete
-   ###### Users
    
-   Add
-   Delete
-   * * *
    
-   Something **not** associated with Users

HTML StackBlitz

template

```
<BDropdown
  text="Dropdown ARIA"
  variant="primary"
>
  <BDropdownHeader id="dropdown-header-1">Groups</BDropdownHeader>
  <BDropdownItemButton aria-describedby="dropdown-header-1">Add</BDropdownItemButton>
  <BDropdownItemButton aria-describedby="dropdown-header-1">Delete</BDropdownItemButton>
  <BDropdownHeader id="dropdown-header-2">Users</BDropdownHeader>
  <BDropdownItemButton aria-describedby="dropdown-header-2">Add</BDropdownItemButton>
  <BDropdownItemButton aria-describedby="dropdown-header-2">Delete</BDropdownItemButton>
  <BDropdownDivider />
  <BDropdownItemButton>
    Something <strong>not</strong> associated with Users
  </BDropdownItemButton>
</BDropdown>
```

As a simplified alternative, use the `BDropdownGroup` instead to easily associate header text to the contained dropdown sub-components.

### Keyboard navigation [​](#keyboard-navigation)

Dropdowns support keyboard navigation, emulating native `<select>` behavior.

Note that Down and Up will not move focus into `BDropdownForm` sub-components, but users can still use Tab or Shift+Tab to move into form controls within the menu.

## Lazy [​](#lazy)

Dropdown menus can have their inner content rendered lazily through the `lazy` prop. By default, this is turned off. For navigation elements, it may be beneficial to keep lazy off, so web crawlers can properly comb through your sites navigation.

Dropdown

HTML StackBlitz

template

```
<BDropdown
  lazy
  text="Dropdown"
>
  <BDropdownItem>First Action</BDropdownItem>
  <BDropdownItem>Second Action</BDropdownItem>
  <BDropdownItem>Third Action</BDropdownItem>
  <BDropdownDivider />
  <BDropdownItem active>Active action</BDropdownItem>
  <BDropdownItem disabled>Disabled action</BDropdownItem>
</BDropdown>
```

## Implementation notes [​](#implementation-notes)

The dropdown menu is rendered with semantic `<ul>` and `<li>` elements for accessibility reasons. The `.dropdown-menu` is the `<ul>` element, while dropdown items (items, buttons, text, form, headers, and dividers) are wrapped in an `<li>` element. If creating custom items to place inside the dropdown menu, ensure they are wrapped with a plain `<li>`.

## See also [​](#see-also)

-   [`BNavItemDropdown`](/bootstrap-vue-next/docs/components/nav.html#dropdown) for dropdown support inside `BNav` and `BNavbar`
-   [Router Link Support](/bootstrap-vue-next/docs/reference/router-links.html) reference for information about router-link specific props available on `BDropdownItem`

## Component Reference

### `<BDropdown>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BDropdown/BDropdown.vue)

-   [<BDropdown> Properties](#comp-reference-bdropdown-properties)
-   [<BDropdown> Events](#comp-reference-bdropdown-events)
-   [<BDropdown> Slots](#comp-reference-bdropdown-slots)
-   [<BDropdown> Exposed](#comp-reference-bdropdown-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.dropdown`

##### [Properties](#comp-reference-bdropdown-properties)

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

##### [Events](#comp-reference-bdropdown-events)

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

##### [Slots](#comp-reference-bdropdown-slots)

| Name | Scope | Description |
| --- | --- | --- |
| button-content |  | Can be used to implement custom text with icons and more styling |
| default | 
`hide``: () => void` - Can be used to close the dropdown

`show``: () => void` - Can be used to open the dropdown

 | Optionally scoped default slot for dropdown menu content |
| toggle-text |  | ARIA label (visually-hidden) to set on the toggle when in split mode. Overrides the toggle-text prop |

##### [Exposed](#comp-reference-bdropdown-exposed)

| Name | Type | Description |
| --- | --- | --- |
| hide | `() => void` | Hides the dropdown |
| show | `() => void` | Shows the dropdown |
| toggle | `() => void` | Toggles the visibility of the dropdown |

### `<BDropdownDivider>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BDropdown/BDropdownDivider.vue)

-   [<BDropdownDivider> Properties](#comp-reference-bdropdowndivider-properties)

[Adding styles](../configurations/customizing-styles#adding-styles): `.dropdown‑divider`

##### [Properties](#comp-reference-bdropdowndivider-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| divider-class | `ClassValue` | `undefined` | CSS class (or classes) to add to the divider component |
| tag | `string` | `'hr'` | Specify the HTML tag to render instead of the default tag |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |
| wrapper-attrs | `Readonly<AttrsValue>` | `undefined` | Attributes to be applied to the wrapper element |

### `<BDropdownForm>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BDropdown/BDropdownForm.vue)

-   [<BDropdownForm> Properties](#comp-reference-bdropdownform-properties)
-   [<BDropdownForm> Slots](#comp-reference-bdropdownform-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.dropdown‑form`

##### [Properties](#comp-reference-bdropdownform-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| form-class | `ClassValue` | `undefined` | CSS class (or classes) to add to the form component |
| novalidate | `boolean` | `false` | When set, disables browser native HTML5 validation on controls in the form |
| validated | `boolean` | `false` | When set, adds the Bootstrap class 'was-validated' on the form, triggering the native browser validation states |
| wrapper-attrs | `Readonly<AttrsValue>` | `undefined` | Attributes to be applied to the wrapper element |

##### [Slots](#comp-reference-bdropdownform-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the dropdown form |

### `<BDropdownGroup>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BDropdown/BDropdownGroup.vue)

-   [<BDropdownGroup> Properties](#comp-reference-bdropdowngroup-properties)
-   [<BDropdownGroup> Slots](#comp-reference-bdropdowngroup-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.dropdown‑group`

##### [Properties](#comp-reference-bdropdowngroup-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-describedby | `string` | `undefined` | The ID of the element that provides a description for this component. Used as the value for the \`aria-describedby\` attribute |
| header | `string` | `undefined` | Text content for the dropdown group header |
| header-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the header |
| header-tag | `string` | `'header'` | Specify the HTML tag to render instead of the default tag for the header |
| header-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the header |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |

##### [Slots](#comp-reference-bdropdowngroup-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content (items) to place in the dropdown group |
| header |  | Optional header content for the dropdown group |

### `<BDropdownHeader>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BDropdown/BDropdownHeader.vue)

-   [<BDropdownHeader> Properties](#comp-reference-bdropdownheader-properties)
-   [<BDropdownHeader> Slots](#comp-reference-bdropdownheader-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.dropdown‑header`

##### [Properties](#comp-reference-bdropdownheader-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| header-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the header |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |
| text | `string` | `undefined` | Content to place in the dropdown header. Default slot takes precedence |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |
| wrapper-attrs | `Readonly<AttrsValue>` | `undefined` | Attributes to be applied to the wrapper element |

##### [Slots](#comp-reference-bdropdownheader-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the dropdown header |

### `<BDropdownItem>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BDropdown/BDropdownItem.vue)

-   [<BDropdownItem> Properties](#comp-reference-bdropdownitem-properties)
-   [<BDropdownItem> Events](#comp-reference-bdropdownitem-events)
-   [<BDropdownItem> Slots](#comp-reference-bdropdownitem-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.dropdown‑item`

##### [Properties](#comp-reference-bdropdownitem-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| link-class | `ClassValue` | `undefined` | Class or classes to apply to the inner link element |
| wrapper-attrs | `Readonly<AttrsValue>` | `undefined` | Attributes to be applied to the wrapper element |

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

##### [Events](#comp-reference-bdropdownitem-events)

| Event | Args | Description |
| --- | --- | --- |
| click | 
`value``: MouseEvent` - Native click event object

 | Emitted when item is clicked |

##### [Slots](#comp-reference-bdropdownitem-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the dropdown item |

### `<BDropdownItemButton>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BDropdown/BDropdownItemButton.vue)

-   [<BDropdownItemButton> Properties](#comp-reference-bdropdownitembutton-properties)
-   [<BDropdownItemButton> Events](#comp-reference-bdropdownitembutton-events)
-   [<BDropdownItemButton> Slots](#comp-reference-bdropdownitembutton-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.dropdown‑item‑button`

##### [Properties](#comp-reference-bdropdownitembutton-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| active | `boolean` | `false` | When set to \`true\`, places the component in the active state with active styling |
| active-class | `ClassValue` | `'active'` | Configure the active CSS class applied when the link is active. Typically you will want to set this to class name 'active' |
| button-class | `ClassValue` | `undefined` | Class or classes to apply to the inner button element |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |
| wrapper-attrs | `Readonly<AttrsValue>` | `undefined` | Attributes to be applied to the wrapper element |

##### [Events](#comp-reference-bdropdownitembutton-events)

| Event | Args | Description |
| --- | --- | --- |
| click | 
`value``: MouseEvent` - Native click event object

 | Emitted when item is clicked |

##### [Slots](#comp-reference-bdropdownitembutton-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the dropdown item button |

### `<BDropdownText>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BDropdown/BDropdownText.vue)

-   [<BDropdownText> Properties](#comp-reference-bdropdowntext-properties)
-   [<BDropdownText> Slots](#comp-reference-bdropdowntext-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.dropdown‑text`

##### [Properties](#comp-reference-bdropdowntext-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| tag | `string` | `'span'` | Specify the HTML tag to render instead of the default tag |
| text | `string` | `undefined` | Content to place in the dropdown text. Default slot takes precedence |
| text-class | `ClassValue` | `undefined` | CSS class (or classes) to add to the text component |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |
| wrapper-attrs | `Readonly<AttrsValue>` | `undefined` | Attributes to be applied to the wrapper element |

##### [Slots](#comp-reference-bdropdowntext-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the dropdown text |
