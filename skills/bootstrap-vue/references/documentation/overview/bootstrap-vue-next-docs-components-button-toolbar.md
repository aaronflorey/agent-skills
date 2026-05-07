# Button Toolbar ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/button-toolbar.html

##### On this page

-   [Usage ​](#usage)
    
-   [Sizing ​](#sizing)
    
-   [Justify ​](#justify)
    
-   [Component Reference](#component-reference)
    -   [<BButtonToolbar>](#b-button-toolbar)
        -   [Properties](#)
            
        -   [Slots](#)
            

# Button Toolbar [​](#button-toolbar)

Group a series of button-groups and/or input-groups together on a single line, with support for sizing, justification, and mixing different control types.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BButtonToolbar/BButtonToolbar.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/button-toolbar.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bbuttontoolbar)

**Example 1:** with button groups

«‹

EditUndoRedo

›»

HTML StackBlitz

template

```
<BButtonToolbar
  key-nav
  aria-label="Toolbar with button groups"
>
  <BButtonGroup class="mx-1">
    <BButton>&laquo;</BButton>
    <BButton>&lsaquo;</BButton>
  </BButtonGroup>
  <BButtonGroup class="mx-1">
    <BButton>Edit</BButton>
    <BButton>Undo</BButton>
    <BButton>Redo</BButton>
  </BButtonGroup>
  <BButtonGroup class="mx-1">
    <BButton>&rsaquo;</BButton>
    <BButton>&raquo;</BButton>
  </BButtonGroup>
</BButtonToolbar>
```

**Example 2:** with mixture of small button group and small input group.

SaveCancel

$.00

HTML StackBlitz

template

```
<BButtonToolbar aria-label="Toolbar with button groups and input groups">
  <BButtonGroup
    size="sm"
    class="me-1"
  >
    <BButton>Save</BButton>
    <BButton>Cancel</BButton>
  </BButtonGroup>
  <BInputGroup
    size="sm"
    prepend="$"
    append=".00"
  >
    <BFormInput
      value="100"
      class="text-end"
    />
  </BInputGroup>
</BButtonToolbar>
```

**Example 3:** with button groups and dropdown menu.

NewEditUndo

menu

-   Item 1
-   Item 2
-   Item 3

SaveCancel

HTML StackBlitz

template

```
<BButtonToolbar aria-label="Toolbar with button groups and dropdown menu">
  <BButtonGroup class="mx-1">
    <BButton>New</BButton>
    <BButton>Edit</BButton>
    <BButton>Undo</BButton>
  </BButtonGroup>
  <BDropdown
    class="mx-1"
    placement="right"
    text="menu"
  >
    <BDropdownItem>Item 1</BDropdownItem>
    <BDropdownItem>Item 2</BDropdownItem>
    <BDropdownItem>Item 3</BDropdownItem>
  </BDropdown>
  <BButtonGroup class="mx-1">
    <BButton>Save</BButton>
    <BButton>Cancel</BButton>
  </BButtonGroup>
</BButtonToolbar>
```

## Usage [​](#usage)

Feel free to mix input groups and dropdowns with button groups in your toolbars. Similar to the example above, you'll likely need some utility classes though to space things properly.

## Sizing [​](#sizing)

Note, if you want smaller or larger buttons or controls, set the `size` prop directly on the `BButtonGroup`, `BInputGroup`, and `BDropdown` components.

NewEditUndo

menu

-   Item 1
-   Item 2
-   Item 3

NewEditUndo

menu

-   Item 1
-   Item 2
-   Item 3

HTML StackBlitz

template

```
<div>
  <BButtonToolbar aria-label="Toolbar with size sm">
    <BButtonGroup
      size="sm"
      class="mx-1"
    >
      <BButton>New</BButton>
      <BButton>Edit</BButton>
      <BButton>Undo</BButton>
    </BButtonGroup>
  </BButtonToolbar>
</div>
<div class="mt-2">
  <BButtonToolbar aria-label="Toolbar with dropdown size sm">
    <BDropdown
      size="sm"
      class="mx-1"
      placement="right"
      text="menu"
    >
      <BDropdownItem>Item 1</BDropdownItem>
      <BDropdownItem>Item 2</BDropdownItem>
      <BDropdownItem>Item 3</BDropdownItem>
    </BDropdown>
  </BButtonToolbar>
</div>
<div class="mt-2">
  <BButtonToolbar aria-label="Toolbar with size lg">
    <BButtonGroup
      size="lg"
      class="mx-1"
    >
      <BButton>New</BButton>
      <BButton>Edit</BButton>
      <BButton>Undo</BButton>
    </BButtonGroup>
  </BButtonToolbar>
</div>
<div class="mt-2">
  <BButtonToolbar aria-label="Toolbar with dropdown size lg">
    <BDropdown
      size="lg"
      class="mx-1"
      placement="right"
      text="menu"
    >
      <BDropdownItem>Item 1</BDropdownItem>
      <BDropdownItem>Item 2</BDropdownItem>
      <BDropdownItem>Item 3</BDropdownItem>
    </BDropdown>
  </BButtonToolbar>
</div>
```

## Justify [​](#justify)

Make the toolbar span the maximum available width, by increasing spacing between the button groups, input groups and dropdowns, by setting the prop `justify`.

NewEditUndo

menu

-   Item 1
-   Item 2
-   Item 3

SaveCancel

HTML StackBlitz

template

```
<BButtonToolbar
  justify
  aria-label="Toolbar with justify"
>
  <BButtonGroup class="mx-1">
    <BButton>New</BButton>
    <BButton>Edit</BButton>
    <BButton>Undo</BButton>
  </BButtonGroup>
  <BDropdown
    class="mx-1"
    placement="right"
    text="menu"
  >
    <BDropdownItem>Item 1</BDropdownItem>
    <BDropdownItem>Item 2</BDropdownItem>
    <BDropdownItem>Item 3</BDropdownItem>
  </BDropdown>
  <BButtonGroup class="mx-1">
    <BButton>Save</BButton>
    <BButton>Cancel</BButton>
  </BButtonGroup>
</BButtonToolbar>
```

## Component Reference

### `<BButtonToolbar>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BButton/BButtonToolbar.vue)

-   [<BButtonToolbar> Properties](#comp-reference-bbuttontoolbar-properties)
-   [<BButtonToolbar> Slots](#comp-reference-bbuttontoolbar-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.btn‑toolbar`

##### [Properties](#comp-reference-bbuttontoolbar-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-label | `string` | `undefined` | Sets the value of \`aria-label\` attribute on the rendered element |
| justify | `boolean` | `false` | Make the toolbar span the maximum available width, by increasing spacing between the button groups, input groups, and dropdowns |
| key-nav | `boolean` | `false` | Enable keyboard navigation between focusable elements using arrow keys, Home/End keys, and Shift+arrow keys |
| role | `string` | `undefined` | Sets the ARIA attribute \`role\` to a specific value |

##### [Slots](#comp-reference-bbuttontoolbar-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the button toolbar |
