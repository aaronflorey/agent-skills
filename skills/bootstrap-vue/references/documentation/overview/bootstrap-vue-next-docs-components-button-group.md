# Button Group ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/button-group.html

##### On this page

-   [Overview ​](#overview)
    
-   [Sizing ​](#sizing)
    
-   [Vertical variation ​](#vertical-variation)
    
-   [Dropdown menu support ​](#dropdown-menu-support)
    
-   [See also ​](#see-also)
    
-   [Component Reference](#component-reference)
    -   [<BButtonGroup>](#b-button-group)
        -   [Properties](#)
            
        -   [Slots](#)
            

# Button Group [​](#button-group)

Group a series of buttons together on a single line or stack them in a vertical column with `BButtonGroup`.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BButtonGroup/BButtonGroup.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/button-group.md)

## Overview [​](#overview)

Button Groups are an easy way to group a series of buttons together.

Button 1Button 2Button 3

SuccessInfoWarning

HTML StackBlitz

template

```
<div>
  <BButtonGroup aria-label="Basic example">
    <BButton>Button 1</BButton>
    <BButton>Button 2</BButton>
    <BButton>Button 3</BButton>
  </BButtonGroup>
</div>
<div class="mt-3">
  <BButtonGroup>
    <BButton variant="success">Success</BButton>
    <BButton variant="info">Info</BButton>
    <BButton variant="warning">Warning</BButton>
  </BButtonGroup>
</div>
```

**Note:** In order for assistive technologies (such as screen readers) to convey that a series of buttons is grouped, an appropriate role attribute needs to be provided. `bootstrap-vue-next` will put the `role="group"` and `aria-role` attributes on the groups. By default, `aria-role` is set to `group`, but you can override that with the `aria-role` property.

In addition, groups should be given an explicit label, as most assistive technologies will otherwise not announce them, despite the presence of the correct role attribute. In the examples provided here, we use `aria-label`, but alternatives such as `aria-labelledby` can also be used.

## Sizing [​](#sizing)

Set the `size` prop to `lg` or `sm` to render larger or smaller buttons. There is no need to specify the size on the individual buttons.

LeftMiddleRight

LeftMiddleRight

LeftMiddleRight

HTML StackBlitz

template

```
<div>
  <BButtonGroup size="sm" aria-label="Large button group">
    <BButton variant="secondary">Left</BButton>
    <BButton variant="secondary">Middle</BButton>
    <BButton variant="secondary">Right</BButton>
  </BButtonGroup>
</div>
<div class="mt-3">
  <BButtonGroup :size="undefined" aria-label="Small button group">
    <BButton variant="secondary">Left</BButton>
    <BButton variant="secondary">Middle</BButton>
    <BButton variant="secondary">Right</BButton>
  </BButtonGroup>
</div>
<div class="mt-3">
  <BButtonGroup size="lg" aria-label="Large button group">
    <BButton variant="secondary">Left</BButton>
    <BButton variant="secondary">Middle</BButton>
    <BButton variant="secondary">Right</BButton>
  </BButtonGroup>
</div>
```

## Vertical variation [​](#vertical-variation)

Make a set of buttons appear vertically stacked rather than horizontally by setting the `vertical` prop. Split button dropdowns are not supported here.

TopMiddleBottom

HTML StackBlitz

template

```
<BButtonGroup vertical>
  <BButton>Top</BButton>
  <BButton>Middle</BButton>
  <BButton>Bottom</BButton>
</BButtonGroup>
```

## Dropdown menu support [​](#dropdown-menu-support)

Add [`BDropdown`](/bootstrap-vue-next/docs/components/dropdown.html) menus directly inside your `BButtonGroup`. Note that split dropdown menus are not supported when prop `vertical` is set.

Button

Dropdown

-   Action
-   Another action
-   Something else here
-   * * *
    
-   Separated link

HTML StackBlitz

template

```
<BButtonGroup aria-label="Button group with dropdown">
  <BButton variant="secondary">Button</BButton>
  <BDropdown
    text="Dropdown"
    variant="secondary"
  >
    <BDropdownItem>Action</BDropdownItem>
    <BDropdownItem>Another action</BDropdownItem>
    <BDropdownItem>Something else here</BDropdownItem>
    <BDropdownDivider />
    <BDropdownItem>Separated link</BDropdownItem>
  </BDropdown>
</BButtonGroup>
```

## See also [​](#see-also)

Also check out the [`BButtonToolbar`](/bootstrap-vue-next/docs/components/button-toolbar.html) component for generating toolbars containing button groups and input groups.

## Component Reference

### `<BButtonGroup>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BButton/BButtonGroup.vue)

-   [<BButtonGroup> Properties](#comp-reference-bbuttongroup-properties)
-   [<BButtonGroup> Slots](#comp-reference-bbuttongroup-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.btn‑group`

##### [Properties](#comp-reference-bbuttongroup-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-label | `string` | `undefined` | Sets the value of \`aria-label\` attribute on the rendered element |
| size | `Size` | `undefined` | Set the size of the component's appearance. 'sm' or 'lg' |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |
| vertical | `boolean` | `false` | When set, renders the button group in vertical mode |

##### [Slots](#comp-reference-bbuttongroup-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content (buttons) to place in the button group |
