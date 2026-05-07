# Card ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/card.html

##### On this page

-   [Overview ​](#overview)
    
-   [Content types ​](#content-types)
    -   [Card body ​](#card-body)
        -   [Titles, text, and links ​](#titles-text-and-links)
            
    -   [Images ​](#images)
        -   [Overlay image ​](#overlay-image)
            
        -   [Lazy loaded images ​](#lazy-loaded-images)
            
    -   [Header and footer ​](#header-and-footer)
        
    -   [Kitchen sink example ​](#kitchen-sink-example)
        
-   [Horizontal card layout ​](#horizontal-card-layout)
    
-   [Text variants ​](#text-variants)
    
-   [Background and border variants ​](#background-and-border-variants)
    -   [Solid ​](#solid)
        
    -   [Bordered ​](#bordered)
        -   [Variant to class mapping ​](#variant-to-class-mapping)
            
    -   [Header and footer variants ​](#header-and-footer-variants)
        
    -   [Conveying meaning to assistive technologies ​](#conveying-meaning-to-assistive-technologies)
        
-   [Nav integration ​](#nav-integration)
    
-   [Card groups ​](#card-groups)
    -   [Default card group ​](#default-card-group)
        
-   [Component Reference](#component-reference)
    -   [<BCard>](#b-card)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BCardBody>](#b-card-body)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BCardFooter>](#b-card-footer)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BCardGroup>](#b-card-group)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BCardHeader>](#b-card-header)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BCardImg>](#b-card-img)
        -   [Properties](#)
            
    -   [<BCardSubtitle>](#b-card-subtitle)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BCardText>](#b-card-text)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BCardTitle>](#b-card-title)
        -   [Properties](#)
            
        -   [Slots](#)
            

# Card [​](#card)

A card is a flexible and extensible content container. It includes options for headers and footers, a wide variety of content, contextual background colors, and powerful display options.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BCard/BCard.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/card.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bcard)

## Overview [​](#overview)

Cards are built with as little markup and styles as possible, but still manage to deliver a ton of control and customization. Built with flexbox, they offer easy alignment and mix well with other components.

`BCard` has no fixed width to start, so they'll naturally fill the full width of its parent element. This is easily customized via styles or standard Bootstrap 5 sizing classes.

Change the default `div` root tag to any other HTML element by specifying via the `tag` prop.

![Image](https://picsum.photos/id/25/600/300)

#### Card Title

Some quick example text to build on the card title and make up the bulk of the card's content.

[Go somewhere](#card-overview)

HTML StackBlitz

template

```
<BCard
  title="Card Title"
  img-src="https://picsum.photos/id/25/600/300"
  img-alt="Image"
  img-top
  tag="article"
  style="max-width: 20rem"
>
  <BCardText>
    Some quick example text to build on the card title and make up the bulk of the card's content.
  </BCardText>
  <BButton
    href="#card-overview"
    variant="primary"
    >Go somewhere</BButton
  >
</BCard>
```

## Content types [​](#content-types)

Cards support a wide variety of content, including images, text, list groups, links and more. The following are examples of what is supported inside a `BCard`.

### Card body [​](#card-body)

The building block of a `BCard` is the `BCardBody` section which provides a padded section within a card.

By default, the `BCard` content is automatically placed in a `BCardBody` section:

This is some content within the default <BCardBody> block of the <BCard> component. Notice the padding between the card's border and this gray <div>.

HTML StackBlitz

template

```
<BCard class="text-center">
  <div class="bg-secondary text-light">
    This is some content within the default <samp>&lt;BCardBody&gt;</samp> block of the
    <samp>&lt;BCard&gt;</samp> component. Notice the padding between the card's border and this
    gray <samp>&lt;div&gt;</samp>.
  </div>
</BCard>
```

Disable the automatic `BCardBody` section (and associated padding) by setting the prop `no-body` on the `BCard`.

This is some content without the default <BCardBody> section. Notice the lack of padding between the card's border and this gray <div>.

HTML StackBlitz

template

```
<BCard
  no-body
  class="text-center"
>
  <div class="bg-secondary text-light">
    This is some content without the default <samp>&lt;BCardBody&gt;</samp> section. Notice the
    lack of padding between the card's border and this gray <samp>&lt;div&gt;</samp>.
  </div>
</BCard>
```

Note that with `no-body` enabled, the content of the `title` and `subtitle` props will not be rendered.

Use the `BCardBody` sub-component to place your own card body anywhere in a `BCard` component that has `no-body` set.

#### Titles, text, and links [​](#titles-text-and-links)

_Card titles_ are adding via the `title` prop, and _sub titles_ are added via the `subtitle` prop. The title is rendered using the sub-component `BCardTitle` while the Sub Title is rendered using the sub-component `BCardSubtitle`.

With sub-component `BCardText`, paragraph text can be added to the card. The last `BCardText` in the card body will have its bottom margin automatically removed (via CSS). Text within `BCardText` can also be styled with the standard HTML tags.

Links can be added and placed next to each other by adding the `.card-link` class to a `<a>` tag (or `BLink` component).

![Image](https://picsum.photos/600/300/?image=25)

#### Card Title

Some quick example text to build on the card title and make up the bulk of the card's content.

[Go somewhere](#card-parts)

HTML StackBlitz

template

```
<BCard
  title="Card Title"
  img-src="https://picsum.photos/600/300/?image=25"
  img-alt="Image"
  img-top
  tag="article"
  style="max-width: 20rem"
>
  <BCardText>
    Some quick example text to build on the card title and make up the bulk of the card's content.
  </BCardText>
  <BButton
    href="#card-parts"
    variant="primary"
    >Go somewhere</BButton
  >
</BCard>
```

### Images [​](#images)

The `BCard` prop `img-src` places an image on the top of the card, and use the `img-alt` prop to specify a string to be placed in the image's `alt` attribute. The image specified by the `img-src` prop will be responsive and will adjust its width when the width of the card is changed.

Alternatively you can manually place images inside `BCard` using the sub-component `BCardImg`. See the kitchen sink example below for usage.

#### Top and Bottom

![Card image](https://picsum.photos/1000/300)

Some quick example text to build on the card and make up the bulk of the card's content.

![Card image](https://picsum.photos/1000/300)

Some quick example text to build on the card and make up the bulk of the card's content.

#### Left and Right (or Start and End)

![Card image](https://picsum.photos/300/300)

Some quick example text to build on the card and make up the bulk of the card's content.

![Card image](https://picsum.photos/300/300)

Some quick example text to build on the card and make up the bulk of the card's content.

HTML StackBlitz

template

```
<div>
  <h4>Top and Bottom</h4>
  <BCardGroup deck>
    <BCard
      img-src="https://picsum.photos/1000/300"
      img-alt="Card image"
      img-top
    >
      <BCardText>
        Some quick example text to build on the card and make up the bulk of the card's content.
      </BCardText>
    </BCard>
    <BCard
      img-src="https://picsum.photos/1000/300"
      img-alt="Card image"
      img-bottom
    >
      <BCardText>
        Some quick example text to build on the card and make up the bulk of the card's content.
      </BCardText>
    </BCard>
  </BCardGroup>
</div>
<div class="mt-4">
  <h4>Left and Right (or Start and End)</h4>
  <BCard
    img-src="https://picsum.photos/300/300"
    img-alt="Card image"
    img-left
    class="mb-3"
  >
    <BCardText>
      Some quick example text to build on the card and make up the bulk of the card's content.
    </BCardText>
  </BCard>
  <BCard
    img-src="https://picsum.photos/300/300"
    img-alt="Card image"
    img-right
  >
    <BCardText>
      Some quick example text to build on the card and make up the bulk of the card's content.
    </BCardText>
  </BCard>
</div>
```

**Note:** For left and right images, you may need to apply additional styles to classes `.card-img-start` and `.card-img-end`, as images will "stretch" in height if you have content that is taller than your image. Note headers and footers are not supported when images are left or right aligned. You may find the [Horizontal Card Layout](#horizontal-card-layout) example to be more flexible when creating a responsive horizontal card.

#### Overlay image [​](#overlay-image)

Place the image in the background of the card by setting the boolean prop `overlay`:

![Card Image](https://picsum.photos/900/250/?image=3)

#### Image Overlay

###### Subtitle

Some quick example text to build on the card and make up the bulk of the card's content.

HTML StackBlitz

template

```
<BCard
  overlay
  img-src="https://picsum.photos/900/250/?image=3"
  img-alt="Card Image"
  text-variant="white"
  title="Image Overlay"
  subtitle="Subtitle"
>
  <BCardText>
    Some quick example text to build on the card and make up the bulk of the card's content.
  </BCardText>
</BCard>
```

#### Lazy loaded images [​](#lazy-loaded-images)

`BCardImgLazy` has been removed in favor of using a standalone prop on BImg. Use prop `lazy` on BImg and it will automatically use the browsers built in lazy-loading features that are supported natively on all major browsers.

### Header and footer [​](#header-and-footer)

Add an optional header and/or footer within a card via the `header`/`footer` props or named slots. You can control the wrapper element tags used by setting the `header-tag` and `footer-tag` props (both default is `div`).

#### Title

Header and footers using props.

[Go somewhere](#card-header-footer)

#### Title

Header and footers using slots.

[Go somewhere](#card-header-footer)

HTML StackBlitz

template

```
<BCardGroup deck>
  <BCard
    header="featured"
    header-tag="header"
    footer="Card Footer"
    footer-tag="footer"
    title="Title"
  >
    <BCardText>Header and footers using props.</BCardText>
    <BButton
      href="#card-header-footer"
      variant="primary"
      >Go somewhere</BButton
    >
  </BCard>
  <BCard
    title="Title"
    header-tag="header"
    footer-tag="footer"
  >
    <template #header>
      <h6 class="mb-0">Header Slot</h6>
    </template>
    <BCardText>Header and footers using slots.</BCardText>
    <BButton
      href="#card-header-footer"
      variant="primary"
      >Go somewhere</BButton
    >
    <template #footer>
      <em>Footer Slot</em>
    </template>
  </BCard>
</BCardGroup>
```

### Kitchen sink example [​](#kitchen-sink-example)

Mix and match multiple content types to create the card you need, or throw everything in there. Shown below are image styles, blocks, text styles, and a list group—all wrapped in a fixed-width card.

![Image](https://picsum.photos/380/200)

#### Hello World

#### Card Title

###### Card Sub Title

Some quick example text to build on the card title and make up the bulk of the card's content.

Cras justo odio

Dapibus ac facilisis in

Vestibulum at eros

[Card link](#card-kitchen-sink)[Another link](#card-kitchen-sink)

This is a footer

![Image](https://picsum.photos/480/210)

HTML StackBlitz

template

```
<BCard
  no-body
  style="max-width: 20rem"
  img-src="https://picsum.photos/380/200"
  img-alt="Image"
  img-top
>
  <template #header>
    <h4 class="mb-0">Hello World</h4>
  </template>
  <BCardBody>
    <BCardTitle>Card Title</BCardTitle>
    <BCardSubtitle class="mb-2">Card Sub Title</BCardSubtitle>
    <BCardText>
      Some quick example text to build on the card title and make up the bulk of the card's
      content.
    </BCardText>
  </BCardBody>
  <BListGroup flush>
    <BListGroupItem>Cras justo odio</BListGroupItem>
    <BListGroupItem>Dapibus ac facilisis in</BListGroupItem>
    <BListGroupItem>Vestibulum at eros</BListGroupItem>
  </BListGroup>
  <BCardBody>
    <a
      href="#card-kitchen-sink"
      class="card-link"
      >Card link</a
    >
    <a
      href="#card-kitchen-sink"
      class="card-link"
      >Another link</a
    >
  </BCardBody>
  <BCardFooter>This is a footer</BCardFooter>
  <BCardImg
    src="https://picsum.photos/480/210"
    alt="Image"
    bottom
  />
</BCard>
```

## Horizontal card layout [​](#horizontal-card-layout)

Using a combination of grid components, utility classes and individual card sub-components, cards can be made horizontal in a mobile-friendly and responsive way.

In the example below, we remove the row grid gutters with the `class="g-0"` prop on `BRow` and use `md` props on `BCol` to make the card horizontal at the `md` breakpoint. Class `rounded-0` removes the rounding of the `BCardImg` corners while class `overflow-hidden` on `BCard` will appropriately clip the image's corners based on the border-radius of the card. Further adjustments may be needed depending on your card content.

![Image](https://picsum.photos/400/400/?image=20)

#### Horizontal Card

This is a wider card with supporting text as a natural lead-in to additional content. This content is a little bit longer.

HTML StackBlitz

template

```
<BCard
  no-body
  class="overflow-hidden"
  style="max-width: 540px"
>
  <BRow class="g-0">
    <BCol md="6">
      <BCardImg
        src="https://picsum.photos/400/400/?image=20"
        alt="Image"
        class="rounded-0"
      />
    </BCol>
    <BCol md="6">
      <BCardBody title="Horizontal Card">
        <BCardText>
          This is a wider card with supporting text as a natural lead-in to additional content.
          This content is a little bit longer.
        </BCardText>
      </BCardBody>
    </BCol>
  </BRow>
</BCard>
```

## Text variants [​](#text-variants)

By default, cards use dark text and assume a light background. You can reverse that by toggling the color of text within, as well as that of the card's sub-components, via the prop `text-variant`. Then, specify a dark background variant.

#### Card Title

With supporting text below as a natural lead-in to additional content.

[Go somewhere](#card-text-variants)

HTML StackBlitz

template

```
<BCard
  bg-variant="dark"
  text-variant="white"
  title="Card Title"
>
  <BCardText> With supporting text below as a natural lead-in to additional content. </BCardText>
  <BButton
    href="#card-text-variants"
    variant="primary"
    >Go somewhere</BButton
  >
</BCard>
```

## Background and border variants [​](#background-and-border-variants)

Cards include their own variant style for quickly changing the background-color and of a card via the `bg-variant` and `border-variant` props. Darker solid variants may require setting the prop `text-variant` to adjust the text color.

### Solid [​](#solid)

Primary

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Secondary

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Success

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Info

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Warning

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Danger

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Light

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Dark

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Default

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

HTML StackBlitz

template

```
<div>
  <BCardGroup deck>
    <BCard
      bg-variant="primary"
      text-variant="white"
      header="Primary"
      class="text-center"
    >
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
    </BCard>
    <BCard
      bg-variant="secondary"
      text-variant="white"
      header="Secondary"
      class="text-center"
    >
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
    </BCard>
    <BCard
      bg-variant="success"
      text-variant="white"
      header="Success"
      class="text-center"
    >
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
    </BCard>
  </BCardGroup>
</div>
<div class="mt-3">
  <BCardGroup deck>
    <BCard
      bg-variant="info"
      text-variant="white"
      header="Info"
      class="text-center"
    >
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
    </BCard>
    <BCard
      bg-variant="warning"
      text-variant="white"
      header="Warning"
      class="text-center"
    >
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
    </BCard>
    <BCard
      bg-variant="danger"
      text-variant="white"
      header="Danger"
      class="text-center"
    >
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
    </BCard>
  </BCardGroup>
</div>
<div class="mt-3">
  <BCardGroup deck>
    <BCard
      bg-variant="light"
      header="Light"
      class="text-center"
    >
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
    </BCard>
    <BCard
      bg-variant="dark"
      header="Dark"
      text-variant="white"
      class="text-center"
    >
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
    </BCard>
    <BCard
      header="Default"
      class="text-center"
    >
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
    </BCard>
  </BCardGroup>
</div>
```

### Bordered [​](#bordered)

Primary

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Secondary

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Success

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Info

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Warning

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Danger

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Light

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Dark

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

HTML StackBlitz

template

```
<div>
  <BCardGroup deck>
    <BCard
      border-variant="primary"
      header="Primary"
      header-bg-variant="primary"
      header-text-variant="white"
      align="center"
    >
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
    </BCard>
    <BCard
      border-variant="secondary"
      header="Secondary"
      header-border-variant="secondary"
      align="center"
    >
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
    </BCard>
    <BCard
      border-variant="success"
      header="Success"
      align="center"
    >
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
    </BCard>
  </BCardGroup>
</div>
<div class="mt-3">
  <BCardGroup deck>
    <BCard
      border-variant="info"
      header="Info"
      align="center"
    >
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
    </BCard>
    <BCard
      border-variant="warning"
      header="Warning"
      align="center"
    >
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
    </BCard>
    <BCard
      border-variant="danger"
      header="Danger"
      header-border-variant="danger"
      header-text-variant="danger"
      align="center"
    >
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
    </BCard>
  </BCardGroup>
</div>
<div class="mt-3">
  <BCardGroup
    deck
    class="mb-3"
  >
    <BCard
      border-variant="light"
      header="Light"
      class="text-center"
    >
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
    </BCard>
    <BCard
      border-variant="dark"
      header="Dark"
      align="center"
    >
      <BCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BCardText>
    </BCard>
  </BCardGroup>
</div>
```

#### Variant to class mapping [​](#variant-to-class-mapping)

bootstrap-vue-next `BCard` variants are directly mapped to Bootstrap v5 card classes by pre-pending `bg-` (for solid) or `border-` (for bordered) to the above variant names.

### Header and footer variants [​](#header-and-footer-variants)

You can also apply the solid and border variants individually to card headers and footers via the `header-bg-variant`, `header-border-variant`, `header-text-variant`, `footer-bg-variant`, `footer-border-variant`, and `footer-text-variant` props.

#### Title

Header and footers variants.

HTML StackBlitz

template

```
<BCard
  header="Card Header"
  header-text-variant="white"
  header-tag="header"
  header-bg-variant="dark"
  footer="Card Footer"
  footer-tag="footer"
  footer-bg-variant="success"
  footer-border-variant="dark"
  title="Title"
  style="max-width: 20rem"
>
  <BCardText>Header and footers variants.</BCardText>
</BCard>
```

### Conveying meaning to assistive technologies [​](#conveying-meaning-to-assistive-technologies)

Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies – such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (e.g. the visible text), or is included through alternative means, such as additional text hidden with the `.visually-hidden` class.

## Nav integration [​](#nav-integration)

Integrate [`BNav`](/bootstrap-vue-next/docs/components/nav.html) into card headers easily.

**Using the `header` slot**:

#### Card Title

With supporting text below as a natural lead-in to additional content.

Go somewhere

HTML StackBlitz

template

```
<BCard
  title="Card Title"
  body-class="text-center"
  header-tag="nav"
>
  <template #header>
    <BNav
      card-header
      tabs
    >
      <BNavItem active>Active</BNavItem>
      <BNavItem>Inactive</BNavItem>
      <BNavItem disabled>Disabled</BNavItem>
    </BNav>
  </template>
  <BCardText> With supporting text below as a natural lead-in to additional content. </BCardText>
  <BButton variant="primary">Go somewhere</BButton>
</BCard>
```

**Using `BCardHeader` sub-component:**

-   [Active](#)
-   [Inactive](#)
-   [Disabled](#)

#### Card Title

With supporting text below as a natural lead-in to additional content.

Go somewhere

HTML StackBlitz

template

```
<BCard no-body>
  <BCardHeader header-tag="nav">
    <BNav
      card-header
      tabs
    >
      <BNavItem active>Active</BNavItem>
      <BNavItem>Inactive</BNavItem>
      <BNavItem disabled>Disabled</BNavItem>
    </BNav>
  </BCardHeader>
  <BCardBody class="text-center">
    <BCardTitle>Card Title</BCardTitle>
    <BCardText>
      With supporting text below as a natural lead-in to additional content.
    </BCardText>
    <BButton variant="primary">Go somewhere</BButton>
  </BCardBody>
</BCard>
```

For more information on using `BNav` in card headers, refer to the [Navs documentation](/bootstrap-vue-next/docs/components/nav.html).

## Card groups [​](#card-groups)

In addition to styling the content within cards, BootstrapVueNext includes a `BCardGroup` component for laying out series of cards.

### Default card group [​](#default-card-group)

Use card groups to render cards as a single, attached element with equal width and height columns. Card groups use display: flex; to achieve their uniform sizing.

When using card groups with footers, their content will automatically line up.

![Image](https://picsum.photos/g/300/450)

#### Title

This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.

Last updated 3 mins ago

![Image](https://picsum.photos/g/300/450)

#### Title

This card has supporting text below as a natural lead-in to additional content.

Last updated 3 mins ago

![Image](https://picsum.photos/g/300/450)

#### Title

This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.

Last updated 3 mins ago

HTML StackBlitz

template

```
<BCardGroup>
  <BCard
    title="Title"
    img-src="https://picsum.photos/g/300/450"
    img-alt="Image"
    img-top
  >
    <BCardText>
      This is a wider card with supporting text below as a natural lead-in to additional content.
      This content is a little bit longer.
    </BCardText>
    <template #footer>
      <small class="text-body-secondary">Last updated 3 mins ago</small>
    </template>
  </BCard>
  <BCard
    title="Title"
    img-src="https://picsum.photos/g/300/450"
    img-alt="Image"
    img-top
  >
    <BCardText>
      This card has supporting text below as a natural lead-in to additional content.
    </BCardText>
    <template #footer>
      <small class="text-body-secondary">Last updated 3 mins ago</small>
    </template>
  </BCard>
  <BCard
    title="Title"
    img-src="https://picsum.photos/g/300/450"
    img-alt="Image"
    img-top
  >
    <BCardText>
      This is a wider card with supporting text below as a natural lead-in to additional content.
      This card has even longer content than the first to show that equal height action.
    </BCardText>
    <template #footer>
      <small class="text-body-secondary">Last updated 3 mins ago</small>
    </template>
  </BCard>
</BCardGroup>
```

## Component Reference

### `<BCard>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BCard/BCard.vue)

-   [<BCard> Properties](#comp-reference-bcard-properties)
-   [<BCard> Slots](#comp-reference-bcard-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.card`

##### [Properties](#comp-reference-bcard-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| align | `AlignmentTextHorizontal` | `undefined` | Text alignment for the card's content: 'start', 'center' or 'end' |
| bg-variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to background of the component |
| body-bg-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the body background |
| body-border-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the body border |
| body-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the body |
| body-tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag for the body |
| body-text | `string` | `''''` | Text content to place in the card body, default slot takes precedence |
| body-text-variant | `TextColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the body text |
| border-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the border |
| footer | `string` | `undefined` | Text content to place in the footer |
| footer-bg-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the footer background |
| footer-border-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the footer border |
| footer-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the footer |
| footer-tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag for the footer |
| footer-text-variant | `TextColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the footer text |
| footer-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the footer |
| header | `string` | `undefined` | Text content to place in the header |
| header-bg-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the header background |
| header-border-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the header border |
| header-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the header |
| header-tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag for the header |
| header-text-variant | `TextColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the header text |
| header-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the header |
| img-alt | `string` | `undefined` | Alt text for the optional image |
| img-height | `Numberish` | `undefined` | The value to set on the image's 'height' attribute |
| img-placement | `Placement | "overlay"` | `'top'` | Placement for the optional image ('top', 'bottom', 'start', 'end', or 'overlay') |
| img-src | `string` | `undefined` | URL for the optional image |
| img-width | `Numberish` | `undefined` | The value to set on the image's 'width' attribute |
| no-body | `boolean` | `false` | Disable rendering of the default inner card-body element |
| subtitle | `string` | `undefined` | Text content to place in the subtitle |
| subtitle-tag | `string` | `'h6'` | Specify the HTML tag to render instead of the default tag for the subtitle |
| subtitle-text-variant | `TextColorVariant | null` | `'body-secondary'` | Applies one of the Bootstrap theme color variants to the subtitle text |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |
| text-variant | `TextColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the text |
| title | `string` | `undefined` | Text content to place in the title |
| title-tag | `string` | `'h4'` | Specify the HTML tag to render instead of the default tag for the title |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Slots](#comp-reference-bcard-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the card |
| footer |  | For custom rendering of footer content |
| header |  | For custom rendering of header content |
| img |  | For custom rendering of image content |

### `<BCardBody>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BCard/BCardBody.vue)

-   [<BCardBody> Properties](#comp-reference-bcardbody-properties)
-   [<BCardBody> Slots](#comp-reference-bcardbody-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.card‑body, .card‑img‑overlay`

##### [Properties](#comp-reference-bcardbody-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| bg-variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to background of the component |
| border-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the border |
| overlay | `boolean` | `false` |  |
| subtitle | `string` | `undefined` | Text content to place in the subtitle |
| subtitle-tag | `string` | `'h6'` | Specify the HTML tag to render instead of the default tag for the subtitle |
| subtitle-text-variant | `TextColorVariant | null` | `'body-secondary'` | Applies one of the Bootstrap theme color variants to the subtitle text |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |
| text | `string` | `undefined` | Text content to place in the card body, default slot takes precedence |
| text-variant | `TextColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the text |
| title | `string` | `undefined` | Text content to place in the title |
| title-tag | `string` | `'h4'` | Specify the HTML tag to render instead of the default tag for the title |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Slots](#comp-reference-bcardbody-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the card body |
| subtitle |  | Content to place in the card subtitle |
| title |  | Content to place in the card title |

### `<BCardFooter>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BCard/BCardFooter.vue)

-   [<BCardFooter> Properties](#comp-reference-bcardfooter-properties)
-   [<BCardFooter> Slots](#comp-reference-bcardfooter-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.card‑footer`

##### [Properties](#comp-reference-bcardfooter-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| bg-variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to background of the component |
| border-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the border |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |
| text | `string` | `undefined` | Text content to place in the card footer, default slot takes precedence |
| text-variant | `TextColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the text |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Slots](#comp-reference-bcardfooter-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the card footer |

### `<BCardGroup>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BCard/BCardGroup.vue)

-   [<BCardGroup> Properties](#comp-reference-bcardgroup-properties)
-   [<BCardGroup> Slots](#comp-reference-bcardgroup-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.card‑group`

##### [Properties](#comp-reference-bcardgroup-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |

##### [Slots](#comp-reference-bcardgroup-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content (cards) to place in the card group |

### `<BCardHeader>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BCard/BCardHeader.vue)

-   [<BCardHeader> Properties](#comp-reference-bcardheader-properties)
-   [<BCardHeader> Slots](#comp-reference-bcardheader-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.card‑header`

##### [Properties](#comp-reference-bcardheader-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| bg-variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to background of the component |
| border-variant | `ColorVariant | null` | `undefined` | Applies one of the Bootstrap theme color variants to the border |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |
| text | `string` | `undefined` | Text content to place in the card header, default slot takes precedence |
| text-variant | `TextColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the text |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Slots](#comp-reference-bcardheader-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the card header |

### `<BCardImg>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BCard/BCardImg.vue)

-   [<BCardImg> Properties](#comp-reference-bcardimg-properties)

[Adding styles](../configurations/customizing-styles#adding-styles): `.card‑img`

##### [Properties](#comp-reference-bcardimg-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| placement | `Placement | "overlay"` | `'top'` |  |

Extensions:

Extensions are selected properties from another component, integrated here. It may not include all original properties

[BImg props](#)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| alt | `string` | `'undefined'` | Value to set for the \`alt\` attribute |
| blank | `boolean` | `false` | Creates a blank/transparent image via an SVG data URI |
| blank-color | `string` | `'transparent'` | Sets the color of the blank image to the CSS color value specified |
| block | `boolean` | `false` | Forces the image to display as a block element rather than the browser default of inline-block element |
| fluid | `boolean` | `false` | Makes the image responsive. The image will shrink as needed or grow up to the image's native width |
| fluid-grow | `boolean` | `false` | Similar to the 'fluid' prop, but allows the image to scale up past its native width |
| height | `Numberish` | `undefined` | The value to set on the image's 'height' attribute |
| lazy | `boolean` | `false` | Enables lazy loading of the image via the \`loading\` attribute on the underlying image. |
| rounded | `boolean | RadiusElement` | `'false'` | Specifies the type of rounding to apply to the component or its children. The \`square\` prop takes precedence. Refer to the documentation for details |
| rounded-bottom | `boolean | RadiusElement` | `undefined` | Specifies the type of rounding to apply to the \`bottom\` corners of the component or its children |
| rounded-end | `boolean | RadiusElement` | `undefined` | Specifies the type of rounding to apply to the \`end\` corners of the component or its children |
| rounded-start | `boolean | RadiusElement` | `undefined` | Specifies the type of rounding to apply to the \`start\` corners of the component or its children |
| rounded-top | `boolean | RadiusElement` | `undefined` | Specifies the type of rounding to apply to the \`top\` corners of the component or its children |
| sizes | `string | string[]` | `undefined` | One or more strings separated by commas (or an array of strings), indicating a set of source sizes. Optionally used in combination with the srcset prop |
| src | `string` | `undefined` | URL to set for the \`src\` attribute |
| srcset | `string | string[]` | `undefined` | One or more strings separated by commas (or an array of strings), indicating possible image sources for the user agent to use |
| tag | `string` | `'img'` | Specify the HTML tag to render instead of the default tag |
| thumbnail | `boolean` | `false` | Adds a thumbnail border around the image |
| width | `Numberish` | `undefined` | The value to set on the image's 'width' attribute |

### `<BCardSubtitle>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BCard/BCardSubtitle.vue)

-   [<BCardSubtitle> Properties](#comp-reference-bcardsubtitle-properties)
-   [<BCardSubtitle> Slots](#comp-reference-bcardsubtitle-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.card‑subtitle`

##### [Properties](#comp-reference-bcardsubtitle-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| tag | `string` | `'h6'` | Specify the HTML tag to render instead of the default tag |
| text | `string` | `undefined` | Text content to place in the card subtitle, default slot takes precedence |
| text-variant | `TextColorVariant | null` | `'body-secondary'` | Applies one of the Bootstrap theme color variants to the text |

##### [Slots](#comp-reference-bcardsubtitle-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the card subtitle |

### `<BCardText>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BCard/BCardText.vue)

-   [<BCardText> Properties](#comp-reference-bcardtext-properties)
-   [<BCardText> Slots](#comp-reference-bcardtext-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.card‑text`

##### [Properties](#comp-reference-bcardtext-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| tag | `string` | `'p'` | Specify the HTML tag to render instead of the default tag |
| text | `string` | `undefined` | Text content to place in the card text, default slot takes precedence |

##### [Slots](#comp-reference-bcardtext-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the card text |

### `<BCardTitle>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BCard/BCardTitle.vue)

-   [<BCardTitle> Properties](#comp-reference-bcardtitle-properties)
-   [<BCardTitle> Slots](#comp-reference-bcardtitle-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.card‑title`

##### [Properties](#comp-reference-bcardtitle-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| tag | `string` | `'h4'` | Specify the HTML tag to render instead of the default tag |
| text | `string` | `undefined` | Text content to place in the card title, default slot takes precedence |

##### [Slots](#comp-reference-bcardtitle-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the card title |
