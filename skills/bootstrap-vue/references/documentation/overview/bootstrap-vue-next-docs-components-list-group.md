# List Group ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/list-group.html

##### On this page

-   [Active items ​](#active-items)
    
-   [Disabled items ​](#disabled-items)
    
-   [Actionable list group items ​](#actionable-list-group-items)
    
-   [Contextual variants ​](#contextual-variants)
    -   [Conveying meaning to assistive technologies ​](#conveying-meaning-to-assistive-technologies)
        
-   [With badges ​](#with-badges)
    
-   [Numbered ​](#numbered)
    
-   [Checkboxes and radios ​](#checkboxes-and-radios)
    
-   [List Groups inside cards ​](#list-groups-inside-cards)
    
-   [Horizontal list groups ​](#horizontal-list-groups)
    
-   [Custom content ​](#custom-content)
    
-   [Component Reference](#component-reference)
    -   [<BListGroup>](#b-list-group)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BListGroupItem>](#b-list-group-item)
        -   [Properties](#)
            
        -   [Slots](#)
            

# List Group [​](#list-group)

List Groups are a flexible and powerful component for displaying a series of content. List Group items can be modified to support just about any content within. They can also be used as navigation via various props.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BListGroup/BListGroup.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/list-group.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#blistgroup)

Cras justo odio

Dapibus ac facilisis in

Dapibus ac facilisis in

Morbi leo risus

Porta ac consectetur ac

Vestibulum at eros

HTML StackBlitz

template

```
<BListGroup>
  <BListGroupItem>Cras justo odio</BListGroupItem>
  <BListGroupItem>Dapibus ac facilisis in</BListGroupItem>
  <BListGroupItem>Dapibus ac facilisis in</BListGroupItem>
  <BListGroupItem>Morbi leo risus</BListGroupItem>
  <BListGroupItem>Porta ac consectetur ac</BListGroupItem>
  <BListGroupItem>Vestibulum at eros</BListGroupItem>
</BListGroup>
```

## Active items [​](#active-items)

Set the `active` prop on a `BListGroupItem` to indicate the current active selection.

Cras justo odio

Dapibus ac facilisis in

Morbi leo risus

Porta ac consectetur ac

Vestibulum at eros

HTML StackBlitz

template

```
<BListGroup>
  <BListGroupItem>Cras justo odio</BListGroupItem>
  <BListGroupItem active>Dapibus ac facilisis in</BListGroupItem>
  <BListGroupItem>Morbi leo risus</BListGroupItem>
  <BListGroupItem>Porta ac consectetur ac</BListGroupItem>
  <BListGroupItem>Vestibulum at eros</BListGroupItem>
</BListGroup>
```

## Disabled items [​](#disabled-items)

Set the `disabled` prop on a `BListGroupItem` to make it appear disabled (also works with actionable items. see below).

Cras justo odio

Dapibus ac facilisis in

Morbi leo risus

Porta ac consectetur ac

Vestibulum at eros

HTML StackBlitz

template

```
<BListGroup>
  <BListGroupItem disabled>Cras justo odio</BListGroupItem>
  <BListGroupItem>Dapibus ac facilisis in</BListGroupItem>
  <BListGroupItem>Morbi leo risus</BListGroupItem>
  <BListGroupItem disabled>Porta ac consectetur ac</BListGroupItem>
  <BListGroupItem>Vestibulum at eros</BListGroupItem>
</BListGroup>
```

## Actionable list group items [​](#actionable-list-group-items)

Turn a `BListGroupItem` into an actionable _link_ (`<a href="...">`) by specifying either an `href` prop or [router-link](/bootstrap-vue-next/docs/reference/router-links.html) `to` prop.

[Awesome link](#some-link)[Link with active state](#list-group-actionable)[Action links are easy](#list-group-actionable)[Disabled link](#foobar)

HTML StackBlitz

template

```
<BListGroup>
  <BListGroupItem href="#some-link">Awesome link</BListGroupItem>
  <BListGroupItem
    href="#list-group-actionable"
    active
    >Link with active state</BListGroupItem
  >
  <BListGroupItem href="#list-group-actionable">Action links are easy</BListGroupItem>
  <BListGroupItem
    href="#foobar"
    disabled
    >Disabled link</BListGroupItem
  >
</BListGroup>
```

Or if you prefer `<button>` elements over links, set the `button` prop to `true`.

Button itemI am a buttonDisabled buttonThis is a button too

HTML StackBlitz

template

```
<BListGroup>
  <BListGroupItem button>Button item</BListGroupItem>
  <BListGroupItem button>I am a button</BListGroupItem>
  <BListGroupItem
    button
    disabled
    >Disabled button</BListGroupItem
  >
  <BListGroupItem button>This is a button too</BListGroupItem>
</BListGroup>
```

**Notes:**

-   When the prop `button` is `true`, all [link related props](/bootstrap-vue-next/docs/components/link.html) (other than `active`) and the `tag` prop will have no effect
-   When `href` or `to` are set, the `tag` prop has no effect

Refer to the [Router support](/bootstrap-vue-next/docs/reference/router-links.html) reference page for router-link specific props.

## Contextual variants [​](#contextual-variants)

Use contextual variants to style list items with a stateful background and color, via the `variant` prop.

Default list group item

Primary list group item

Secondary list group item

Success list group item

Danger list group item

Warning list group item

Info list group item

Light list group item

Dark list group item

HTML StackBlitz

template

```
<BListGroup>
  <BListGroupItem>Default list group item</BListGroupItem>
  <BListGroupItem variant="primary">Primary list group item</BListGroupItem>
  <BListGroupItem variant="secondary">Secondary list group item</BListGroupItem>
  <BListGroupItem variant="success">Success list group item</BListGroupItem>
  <BListGroupItem variant="danger">Danger list group item</BListGroupItem>
  <BListGroupItem variant="warning">Warning list group item</BListGroupItem>
  <BListGroupItem variant="info">Info list group item</BListGroupItem>
  <BListGroupItem variant="light">Light list group item</BListGroupItem>
  <BListGroupItem variant="dark">Dark list group item</BListGroupItem>
</BListGroup>
```

Contextual variants also work with action items. Note the addition of the hover styling here not present in the previous example. Also supported is the `active` state; set it to indicate an active selection on a contextual list group item.

[Default list group item](#list-group-actionable-variants)[Primary list group item](#list-group-actionable-variants)[Secondary list group item](#list-group-actionable-variants)[Success list group item](#list-group-actionable-variants)[Danger list group item](#list-group-actionable-variants)[Warning list group item](#list-group-actionable-variants)[Info list group item](#list-group-actionable-variants)[Light list group item](#list-group-actionable-variants)[Dark list group item](#list-group-actionable-variants)

HTML StackBlitz

template

```
<BListGroup>
  <BListGroupItem href="#list-group-actionable-variants">Default list group item</BListGroupItem>
  <BListGroupItem
    href="#list-group-actionable-variants"
    variant="primary"
    >Primary list group item</BListGroupItem
  >
  <BListGroupItem
    href="#list-group-actionable-variants"
    variant="secondary"
    >Secondary list group item</BListGroupItem
  >
  <BListGroupItem
    href="#list-group-actionable-variants"
    variant="success"
    >Success list group item</BListGroupItem
  >
  <BListGroupItem
    href="#list-group-actionable-variants"
    variant="danger"
    >Danger list group item</BListGroupItem
  >
  <BListGroupItem
    href="#list-group-actionable-variants"
    variant="warning"
    >Warning list group item</BListGroupItem
  >
  <BListGroupItem
    href="#list-group-actionable-variants"
    variant="info"
    >Info list group item</BListGroupItem
  >
  <BListGroupItem
    href="#list-group-actionable-variants"
    variant="light"
    >Light list group item</BListGroupItem
  >
  <BListGroupItem
    href="#list-group-actionable-variants"
    variant="dark"
    >Dark list group item</BListGroupItem
  >
</BListGroup>
```

### Conveying meaning to assistive technologies [​](#conveying-meaning-to-assistive-technologies)

Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies – such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (e.g. the visible text), or is included through alternative means, such as additional text hidden using the `.visually-hidden` class.

## With badges [​](#with-badges)

Add [badges](/bootstrap-vue-next/docs/components/badge.html) to any list group item to show unread counts, activity, and more with the help of some [flex utility classes](/bootstrap-vue-next/docs/reference/utility-classes.html).

Cras justo odio 14

Dapibus ac facilisis in 2

Morbi leo risus 1

HTML StackBlitz

template

```
<BListGroup>
  <BListGroupItem class="d-flex justify-content-between align-items-center">
    Cras justo odio
    <BBadge
      variant="primary"
      pill
      >14</BBadge
    >
  </BListGroupItem>
  <BListGroupItem class="d-flex justify-content-between align-items-center">
    Dapibus ac facilisis in
    <BBadge
      variant="primary"
      pill
      >2</BBadge
    >
  </BListGroupItem>
  <BListGroupItem class="d-flex justify-content-between align-items-center">
    Morbi leo risus
    <BBadge
      variant="primary"
      pill
      >1</BBadge
    >
  </BListGroupItem>
</BListGroup>
```

## Numbered [​](#numbered)

Add the `numbered` property to opt into numbered list group items. Numbers are generated via CSS (as opposed to a `<ol>s` default browser styling) for better placement inside list group items and to allow for better customization.

1.  Cras justo odioo
2.  Dapibus ac facilisis in
3.  Morbi leo risus
4.  Porta ac consectetur ac
5.  Vestibulum at eros

HTML StackBlitz

template

```
<BListGroup numbered>
  <BListGroupItem>Cras justo odioo</BListGroupItem>
  <BListGroupItem>Dapibus ac facilisis in</BListGroupItem>
  <BListGroupItem>Morbi leo risus</BListGroupItem>
  <BListGroupItem>Porta ac consectetur ac</BListGroupItem>
  <BListGroupItem>Vestibulum at eros</BListGroupItem>
</BListGroup>
```

These work great with custom content as well.

1.  Subheading
    
    Cras justo odio
    
    14
2.  Subheading
    
    Dapibus ac facilisis in
    
    2
3.  Subheading
    
    Morbi leo risus
    
    1

HTML StackBlitz

template

```
<BListGroup numbered>
  <BListGroupItem class="d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">Subheading</div>
      Cras justo odio
    </div>
    <BBadge
      variant="primary"
      pill
      >14</BBadge
    >
  </BListGroupItem>
  <BListGroupItem class="d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">Subheading</div>
      Dapibus ac facilisis in
    </div>
    <BBadge
      variant="primary"
      pill
      >2</BBadge
    >
  </BListGroupItem>
  <BListGroupItem class="d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">Subheading</div>
      Morbi leo risus
    </div>
    <BBadge
      variant="primary"
      pill
      >1</BBadge
    >
  </BListGroupItem>
</BListGroup>
```

**Note:** When using the numbered property, it supersedes the tag property on `BListGroup` and `BListGroupItem`. With numbered set, the `BListGroup`is always rendered as a `ol`, while the `BListGroupItem` is rendered as a `li`.

## Checkboxes and radios [​](#checkboxes-and-radios)

Place \[\]checkboxes and radios within list group items and customize as needed. You can use them without `<label>`s, but please remember to include an aria-label attribute and value for accessibility

First checkbox

Second checkbox

Third checkbox

HTML StackBlitz

template

```
<BListGroup>
  <BListGroupItem class="d-flex justify-content-between align-items-center">
    <BFormCheckbox
      id="list-check-1"
      value="1"
      >First checkbox</BFormCheckbox
    >
  </BListGroupItem>
  <BListGroupItem class="d-flex justify-content-between align-items-center">
    <BFormCheckbox
      id="list-check-2"
      value="2"
      >Second checkbox</BFormCheckbox
    >
  </BListGroupItem>
  <BListGroupItem class="d-flex justify-content-between align-items-center">
    <BFormCheckbox
      id="list-check-3"
      value="3"
      >Third checkbox</BFormCheckbox
    >
  </BListGroupItem>
</BListGroup>
```

First radio

Second radio

Third radio

HTML StackBlitz

template

```
<BListGroup>
  <BListGroupItem class="d-flex justify-content-between align-items-center">
    <BFormRadio
      id="list-radio-1"
      name="some-radios"
      value="1"
      >First radio</BFormRadio
    >
  </BListGroupItem>
  <BListGroupItem class="d-flex justify-content-between align-items-center">
    <BFormRadio
      id="list-radio-2"
      name="some-radios"
      value="2"
      >Second radio</BFormRadio
    >
  </BListGroupItem>
  <BListGroupItem class="d-flex justify-content-between align-items-center">
    <BFormRadio
      id="list-radio-3"
      name="some-radios"
      value="3"
      >Third radio</BFormRadio
    >
  </BListGroupItem>
</BListGroup>
```

## List Groups inside cards [​](#list-groups-inside-cards)

Incorporate list groups into [cards](/bootstrap-vue-next/docs/components/card.html). Use the `BListGroup` prop `flush` prop when using cards with `no-body` to make the sides of the list group flush with the card.

Card with list group

[Cras justo odio](#list-group-card)[Dapibus ac facilisis in](#list-group-card)[Vestibulum at eros](#list-group-card)

Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur mollit voluptate est in duis laboris ad sit ipsum anim Lorem.

Card with flush list group

[Cras justo odio](#list-group-card)[Dapibus ac facilisis in](#list-group-card)[Vestibulum at eros](#list-group-card)

Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur mollit voluptate est in duis laboris ad sit ipsum anim Lorem.

HTML StackBlitz

template

```
<BCardGroup deck>
  <BCard header="Card with list group">
    <BListGroup>
      <BListGroupItem href="#list-group-card">Cras justo odio</BListGroupItem>
      <BListGroupItem href="#list-group-card">Dapibus ac facilisis in</BListGroupItem>
      <BListGroupItem href="#list-group-card">Vestibulum at eros</BListGroupItem>
    </BListGroup>
    <p class="card-text mt-2">
      Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum
      consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur
      mollit voluptate est in duis laboris ad sit ipsum anim Lorem.
    </p>
  </BCard>
  <BCard
    no-body
    header="Card with flush list group"
  >
    <BListGroup flush>
      <BListGroupItem href="#list-group-card">Cras justo odio</BListGroupItem>
      <BListGroupItem href="#list-group-card">Dapibus ac facilisis in</BListGroupItem>
      <BListGroupItem href="#list-group-card">Vestibulum at eros</BListGroupItem>
    </BListGroup>
    <BCardBody>
      Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum
      consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur
      mollit voluptate est in duis laboris ad sit ipsum anim Lorem.
    </BCardBody>
  </BCard>
</BCardGroup>
```

## Horizontal list groups [​](#horizontal-list-groups)

Set the prop `horizontal` to `true` to change the layout of list group items from vertical to horizontal across all breakpoints. Alternatively, set `horizontal` to a responsive breakpoint (`sm`, `md`, `lg` or `xl`) to make a list group horizontal starting at that breakpoint's min-width. Currently, horizontal list groups cannot be combined with `flush` list groups.

**ProTip:** Want equal-width list group items when horizontal? Add the class `flex-fill` to each list group item.

**Always horizontal:**

Cras justo odio

Dapibus ac facilisis in

Morbi leo risus

HTML StackBlitz

template

```
<BListGroup horizontal="md">
  <BListGroupItem>Cras justo odio</BListGroupItem>
  <BListGroupItem>Dapibus ac facilisis in</BListGroupItem>
  <BListGroupItem>Morbi leo risus</BListGroupItem>
</BListGroup>
```

**Horizontal at breakpoint `md` and above:**

Cras justo odio

Dapibus ac facilisis in

Morbi leo risus

HTML StackBlitz

template

```
<BListGroup horizontal>
  <BListGroupItem>Cras justo odio</BListGroupItem>
  <BListGroupItem>Dapibus ac facilisis in</BListGroupItem>
  <BListGroupItem>Morbi leo risus</BListGroupItem>
</BListGroup>
```

## Custom content [​](#custom-content)

Add nearly any HTML or component within, even for linked list groups like the one below, with the help of [flexbox utility classes](/bootstrap-vue-next/docs/reference/utility-classes.html).

[

##### List Group item heading

3 days ago

Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.

Donec id elit non mi porta.](#list-group-custom)[

##### List Group item heading

3 days ago

Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.

Donec id elit non mi porta.](#list-group-custom)[

##### Disabled List Group item

3 days ago

Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.

Donec id elit non mi porta.](#list-group-custom)

HTML StackBlitz

template

```
<BListGroup>
  <BListGroupItem
    href="#list-group-custom"
    active
    class="flex-column align-items-start"
  >
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List Group item heading</h5>
      <small>3 days ago</small>
    </div>
    <p class="mb-1">
      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
      blandit.
    </p>
    <small>Donec id elit non mi porta.</small>
  </BListGroupItem>
  <BListGroupItem
    href="#list-group-custom"
    class="flex-column align-items-start"
  >
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List Group item heading</h5>
      <small class="text-body-secondary">3 days ago</small>
    </div>
    <p class="mb-1">
      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
      blandit.
    </p>
    <small class="text-body-secondary">Donec id elit non mi porta.</small>
  </BListGroupItem>
  <BListGroupItem
    href="#list-group-custom"
    disabled
    class="flex-column align-items-start"
  >
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Disabled List Group item</h5>
      <small class="text-body-secondary">3 days ago</small>
    </div>
    <p class="mb-1">
      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
      blandit.
    </p>
    <small class="text-body-secondary">Donec id elit non mi porta.</small>
  </BListGroupItem>
</BListGroup>
```

## Component Reference

### `<BListGroup>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BListGroup/BListGroup.vue)

-   [<BListGroup> Properties](#comp-reference-blistgroup-properties)
-   [<BListGroup> Slots](#comp-reference-blistgroup-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.list‑group`

##### [Properties](#comp-reference-blistgroup-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| flush | `boolean` | `false` | When set, renders a flush list group with no left and right borders |
| horizontal | `boolean | Breakpoint` | `false` | When set, renders the list group horizontally rather than vertically |
| numbered | `boolean` | `false` | When set, renders the list group items with a number on the left side |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |

##### [Slots](#comp-reference-blistgroup-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content (items) to place in the list group |

### `<BListGroupItem>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BListGroup/BListGroupItem.vue)

-   [<BListGroupItem> Properties](#comp-reference-blistgroupitem-properties)
-   [<BListGroupItem> Slots](#comp-reference-blistgroupitem-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.list‑group‑item`

##### [Properties](#comp-reference-blistgroupitem-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| action | `boolean` | `false` |  |
| button | `boolean` | `false` |  |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |

##### [Slots](#comp-reference-blistgroupitem-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the list group item |
