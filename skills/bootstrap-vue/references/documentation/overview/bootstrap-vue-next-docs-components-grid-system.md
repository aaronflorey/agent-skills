# Grid System ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/grid-system.html

##### On this page

-   [Overview ​](#overview)
    
-   [How it works ​](#how-it-works)
    
-   [Containers ​](#containers)
    -   [Default container ​](#default-container)
        
    -   [Fluid width container ​](#fluid-width-container)
        
    -   [Responsive fluid containers ​](#responsive-fluid-containers)
        
-   [Rows ​](#rows)
    
-   [Columns ​](#columns)
    
-   [Grid options ​](#grid-options)
    -   [Container sizes ​](#container-sizes)
        
-   [Auto-layout columns ​](#auto-layout-columns)
    -   [Equal-width columns ​](#equal-width-columns)
        
    -   [Equal-width multi-line ​](#equal-width-multi-line)
        
    -   [Setting one column width ​](#setting-one-column-width)
        
    -   [Variable width content ​](#variable-width-content)
        
-   [Responsive classes ​](#responsive-classes)
    -   [All breakpoints ​](#all-breakpoints)
        
    -   [Stacked to horizontal ​](#stacked-to-horizontal)
        
    -   [Mix and match ​](#mix-and-match)
        
-   [Alignment ​](#alignment)
    -   [Vertical alignment ​](#vertical-alignment)
        
    -   [Horizontal alignment ​](#horizontal-alignment)
        
-   [Reordering ​](#reordering)
    -   [Ordering columns ​](#ordering-columns)
        
    -   [Offsetting columns ​](#offsetting-columns)
        
    -   [Margin utilities on columns ​](#margin-utilities-on-columns)
        
-   [Nesting grids ​](#nesting-grids)
    
-   [Row columns ​](#row-columns)
    
-   [Utilities for layout ​](#utilities-for-layout)
    -   [Changing display ​](#changing-display)
        
    -   [Flexbox options ​](#flexbox-options)
        
    -   [Margin and padding ​](#margin-and-padding)
        
    -   [Toggle visibility ​](#toggle-visibility)
        
-   [Component Reference](#component-reference)
    -   [<BContainer>](#b-container)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BRow>](#b-row)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BCol>](#b-col)
        -   [Properties](#)
            
        -   [Slots](#)
            

# Grid System [​](#grid-system)

Use the powerful mobile-first flexbox grid (via the `<BContainer>`, `<BRow>` and `<BCol>` components) to build layouts of all shapes and sizes thanks to a twelve column system, five default responsive tiers, CSS Sass variables and mixins, and dozens of predefined classes.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BGridSystem/BGridSystem.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/grid-system.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#grid)

## Overview [​](#overview)

Bootstrap's grid system uses a series of containers, rows, and columns to layout and align content. It's built with [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox) and is fully responsive. Below is an example and an in-depth look at how the grid comes together.

Column

Column

Column

HTML StackBlitz

template

```
<BContainer class="bv-example-row">
  <BRow>
    <BCol> Column </BCol>
    <BCol> Column </BCol>
    <BCol> Column </BCol>
  </BRow>
</BContainer>
```

The above example creates three equal-width columns across all devices and viewports using our predefined grid classes. Those columns are centered in the page with the parent `<BContainer>`.

TIP

New to or unfamiliar with flexbox? [Read this CSS Tricks flexbox guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background) for background, terminology, guidelines, and code snippets.

## How it works [​](#how-it-works)

Breaking it down, here's how it works:

-   Containers provide a means to center and horizontally pad your site's contents. Use `<BContainer>` for a responsive pixel width, `<BContainer fluid>` for `width: 100%` across all viewport and device sizes or set `fluid` to a [`Breakpoint`](/bootstrap-vue-next/docs/types.html#breakpoint) value for a responsive container (e.g. `<BContainer fluid='md'`).
-   Rows are wrappers for columns. Each column has horizontal `padding` (called a gutter) for controlling the space between them. This `padding` is then counteracted on the rows with negative margins. This way, all the content in your columns is visually aligned down the left side.
-   In a grid layout, content must be placed within columns and only columns may be immediate children of rows.
-   Thanks to flexbox, grid columns without a set width will automatically layout with equal widths. For example, four instances of `<BCol sm="auto">` will each automatically be 25% wide for small breakpoints.
-   Column prop `cols` indicates the number of columns you'd like to use out of the possible 12 per row regardless of breakpoint (starting at breakpoint `xs`). So, if you want three equal-width columns at any breakpoint, you can use `<BCol cols="4">`.
-   Column props `sm`, `md`, `lg`, `xl`, `xxl` indicate the number of columns you'd like to use out of the possible 12 per row, at the various breakpoints. So, if you want three equal-width columns at breakpoint `sm`, you can use `<BCol sm="4">`. the special value `auto` can be used to take up the remaining available column space in a row.
-   Column `width`s are set in percentages, so they're always fluid and sized relative to their parent element.
-   Columns have horizontal `padding` to create the gutters between individual columns, however, you can remove the `margin` from `<BRow>` and `padding` from `<BCol>` by setting the `no-gutters` prop on `<BRow>`.
-   To make the grid responsive, there are six grid breakpoints, one for each responsive breakpoint: all breakpoints (extra small), small, medium, large, extra large, and xxl.
-   Grid breakpoints are based on minimum width media queries, meaning **they apply to that one breakpoint and all those above it** (e.g., `<BCol sm="4">` applies to small, medium, large, and extra large devices, but not the first `xs` breakpoint).
-   You can use predefined grid classes or Sass mixins for more semantic markup. See the [Bootstrap 5 docs](https://getbootstrap.com/docs/5.3/layout/grid#sass-variables) for details

Be aware of the limitations and [bugs around flexbox](https://github.com/philipwalton/flexbugs), like the [inability to use some HTML elements as flex containers](https://github.com/philipwalton/flexbugs#flexbug-9).

## Containers [​](#containers)

`<BContainer>` is the most basic layout element in Bootstrap. Choose from a responsive, fixed-width container (meaning its `max-width` changes at each breakpoint) by default, fluid-width (meaning it's 100% wide all the time) by setting 'fluid' prop, or responsive containers where the container is fluid up until a specific breakpoint.

While containers can be nested, most layouts do not require a nested container.

The default breakpoint widths can be configured using Bootstrap V5.x SCSS variables. See the [Grid options](#grid-options) section below.

### Default container [​](#default-container)

The default `<BContainer>` is a responsive, fixed-width container, meaning its `max-width` changes at each viewport width breakpoint.

template

```
<BContainer>
  <!-- Content here -->
</BContainer>
```

### Fluid width container [​](#fluid-width-container)

Using the `fluid` prop on `<BContainer>` will render a container that is always 100% width, regardless of viewport breakpoint.

template

```
<BContainer fluid>
  <!-- Content here -->
</BContainer>
```

Setting the `fluid` prop to true (or an empty string) is equivalent to the Bootstrap `.container-fluid` class.

### Responsive fluid containers [​](#responsive-fluid-containers)

Responsive containers allow you to specify a container that is 100% wide (fluid) until particular breakpoint is reached at which point a `max-width` is applied. For example, setting prop `fluid` to `'md'` will render a container that is 100% wide to start until the `'md'` breakpoint is reached, at which point it will become a standard non-fluid container.

template

```
<BContainer fluid="sm"> 100% wide until small breakpoint </BContainer>
<BContainer fluid="md"> 100% wide until medium breakpoint </BContainer>
<BContainer fluid="lg"> 100% wide until large breakpoint </BContainer>
<BContainer fluid="xl"> 100% wide until extra large breakpoint </BContainer>
```

Setting the fluid prop to a breakpoint name translates to the Bootstrap class `.container-{breakpoint}`.

Refer to the [Grid options section](#grid-options) table below for the default container width values.

## Rows [​](#rows)

Rows are wrappers for [columns](#columns). Each column has horizontal padding (called a gutter) for controlling the space between them. This padding is then counteracted on the rows with negative margins. This way, all the content in your columns is visually aligned down the left side.

You can remove the margin from `<BRow>` and padding from `<BCol>` by setting the `no-gutters` prop on `<BRow>`.

INFO

`<BFormRow>` is deprecated, see our [migration guide](/bootstrap-vue-next/docs/migration-guide.html#bform) for details.

## Columns [​](#columns)

`<BCol>` Must be placed inside a `<BRow>` component, or an element (such as a `<div>`) that has the class `row` applied to it.

## Grid options [​](#grid-options)

While Bootstrap uses `em` or `rem` units for defining most sizes, `px`s are used for grid breakpoints and container widths. This is because the viewport width is in pixels and does not change with the [font size](https://drafts.csswg.org/mediaqueries-3/#units).

See how aspects of the Bootstrap grid system work across multiple devices with a handy table.

|  | **Extra small** (xs)  
`<576px` | **Small** (sm)  
`≥576px` | **Medium** (md)  
`≥768px` | **Large** (lg)  
`≥992px` | **Extra large** (xl)  
`≥1200px` | **Extra extra large** (xl)  
`≥1400px` |
| --- | --- | --- | --- | --- | --- | --- |
| Max container width | None (auto) | 540px | 720px | 960px | 1140px | 1320px |
| Prop | `cols="*"` | `sm="*"` | `md="*"` | `lg="*"` | `xl="*"` | `xxl="*"` |
| \# of columns | 12 |
| Gutter width | 30px (15px on each side of a column) |
| Nestable | Yes |
| Offset | `offset="*"` | `offset-sm="*"` | `offset-md="*"` | `offset-lg="*"` | `offset-xl="*"` | `offset-xxl="*"` |
| Order | `order="*"` | `order-sm="*"` | `order-md="*"` | `order-lg="*"` | `order-xl="*"` | `order-xxl="*"` |

**Notes:**

-   There is no `xs` prop. The `cols` prop refers to the `xs` (smallest) breakpoint.
-   The above breakpoint values are Bootstrap defaults. They can be customized via [SCSS variables](https://getbootstrap.com/docs/5.3/layout/grid#customizing-the-grid).

### Container sizes [​](#container-sizes)

The following table outlines the default container maximum widths at the various breakpoints. These may vary if you are using custom themed Bootstrap v4 SCSS/CSS.

| Container type | Extra small `<576px` | Small `≥576px` | Medium `≥768px` | Large `≥992px` | Extra large `≥1200px` | Extra extra large `≥1200px` |
| --- | --- | --- | --- | --- | --- | --- |
| _default_ | `100%` | `540px` | `720px` | `960px` | `1140px` | `1140px` |
| `fluid` | `100%` | `100%` | `100%` | `100%` | `100%` | `100%` |
| `fluid="sm"` | `100%` | `540px` | `720px` | `960px` | `1140px` | `1320px` |
| `fluid="md"` | `100%` | `100%` | `720px` | `960px` | `1140px` | `1320px` |
| `fluid="lg"` | `100%` | `100%` | `100%` | `960px` | `1140px` | `1320px` |
| `fluid="xl"` | `100%` | `100%` | `100%` | `100%` | `100%` | `1320px` |
| `fluid="xxl"` | `100%` | `100%` | `100%` | `100%` | `1140px` | `1320px` |

Refer to the [Containers section](#containers) section above for additional information

## Auto-layout columns [​](#auto-layout-columns)

Utilize breakpoint-specific column classes for easy column sizing without an explicit numbered prop like `<BCol sm="6">`.

### Equal-width columns [​](#equal-width-columns)

For example, here are two grid layouts that apply to every device and viewport, from `xs` to `xl`. Add any number of unit-less classes for each breakpoint you need and every column will be the same width.

1 of 2

2 of 2

1 of 3

2 of 3

3 of 3

HTML StackBlitz

template

```
<BContainer class="bv-example-row">
  <BRow>
    <BCol>1 of 2</BCol>
    <BCol>2 of 2</BCol>
  </BRow>

  <BRow>
    <BCol>1 of 3</BCol>
    <BCol>2 of 3</BCol>
    <BCol>3 of 3</BCol>
  </BRow>
</BContainer>
```

### Equal-width multi-line [​](#equal-width-multi-line)

Create equal-width columns that span multiple lines by inserting a `.w-100` where you want the columns to break to a new line. Make the breaks responsive by mixing `.w-100` with some [responsive display utilities](https://getbootstrap.com/docs/4.5/utilities/display/).

There was a [Safari flexbox bug](https://github.com/philipwalton/flexbugs#flexbug-11) that prevented this from working without an explicit `flex-basis` or `border`. There are workarounds for older browser versions, but they shouldn't be necessary if your target browsers don't fall into the buggy versions.

Column

Column

Column

Column

HTML StackBlitz

template

```
<BContainer class="bv-example-row">
  <BRow>
    <BCol>Column</BCol>
    <BCol>Column</BCol>
    <div class="w-100" />
    <BCol>Column</BCol>
    <BCol>Column</BCol>
  </BRow>
</BContainer>
```

### Setting one column width [​](#setting-one-column-width)

Auto-layout for flexbox grid columns also means you can set the width of one column and have the sibling columns automatically resize around it. You may use predefined grid classes (as shown below), grid mixins, or inline widths. Note that the other columns will resize no matter the width of the center column.

1 of 3

2 of 3 (wider)

3 of 3

1 of 3

2 of 3 (wider)

3 of 3

HTML StackBlitz

template

```
<BContainer class="bv-example-row">
  <BRow class="text-center">
    <BCol>1 of 3</BCol>
    <BCol cols="8">2 of 3 (wider)</BCol>
    <BCol>3 of 3</BCol>
  </BRow>

  <BRow class="text-center">
    <BCol>1 of 3</BCol>
    <BCol cols="5">2 of 3 (wider)</BCol>
    <BCol>3 of 3</BCol>
  </BRow>
</BContainer>
```

### Variable width content [​](#variable-width-content)

Use `{breakpoint}="auto"` props to size columns based on the natural width of their content.

1 of 3

Variable width content

3 of 3

1 of 3

Variable width content

3 of 3

HTML StackBlitz

template

```
<BContainer class="bv-example-row">
  <BRow class="justify-content-md-center">
    <BCol
      col
      lg="2"
      >1 of 3</BCol
    >
    <BCol
      cols="12"
      md="auto"
      >Variable width content</BCol
    >
    <BCol
      col
      lg="2"
      >3 of 3</BCol
    >
  </BRow>

  <BRow>
    <BCol>1 of 3</BCol>
    <BCol
      cols="12"
      md="auto"
      >Variable width content</BCol
    >
    <BCol
      col
      lg="2"
      >3 of 3</BCol
    >
  </BRow>
</BContainer>
```

## Responsive classes [​](#responsive-classes)

Bootstrap's grid includes six tiers of predefined classes for building complex responsive layouts. Customize the size of your columns on extra small, small, medium, large, extra large, or extra extra large devices however you see fit.

### All breakpoints [​](#all-breakpoints)

For grids that are the same from the smallest of devices to the largest, use the `col` and `cols="*"` props. Specify a number of `cols` when you need a particularly sized column; otherwise, feel free to stick to `col` (which is applied automatically if no `cols` are specified).

col

col

col

col

col-8

col-4

HTML StackBlitz

template

```
<BContainer class="bv-example-row">
  <BRow>
    <BCol>col</BCol>
    <BCol>col</BCol>
    <BCol>col</BCol>
    <BCol>col</BCol>
  </BRow>

  <BRow>
    <BCol cols="8">col-8</BCol>
    <BCol cols="4">col-4</BCol>
  </BRow>
</BContainer>
```

### Stacked to horizontal [​](#stacked-to-horizontal)

Using a single set of `sm="*"` or `sm` (boolean for equal width @sm) props, you can create a basic grid system that starts out stacked on extra small devices before becoming horizontal on desktop (medium) devices.

col-sm-8

col-sm-4

col-sm

col-sm

col-sm

HTML StackBlitz

template

```
<BContainer class="bv-example-row">
  <BRow>
    <BCol sm="8">col-sm-8</BCol>
    <BCol sm="4">col-sm-4</BCol>
  </BRow>

  <BRow>
    <BCol sm>col-sm</BCol>
    <BCol sm>col-sm</BCol>
    <BCol sm>col-sm</BCol>
  </BRow>
</BContainer>
```

### Mix and match [​](#mix-and-match)

Don't want your columns to simply stack in some grid tiers? Use a combination of different props for each tier as needed. See the example below for a better idea of how it all works.

cols="12" md="8"

cols="6" md="4"

cols="6" md="4"

cols="6" md="4"

cols="6" md="4"

cols="6"

cols="6"

HTML StackBlitz

template

```
<BContainer class="bv-example-row">
  <!-- Stack the columns on mobile by making one full-width and the other half-width -->
  <BRow>
    <BCol
      cols="12"
      md="8"
      >cols="12" md="8"</BCol
    >
    <BCol
      cols="6"
      md="4"
      >cols="6" md="4"</BCol
    >
  </BRow>

  <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
  <BRow>
    <BCol
      cols="6"
      md="4"
      >cols="6" md="4"</BCol
    >
    <BCol
      cols="6"
      md="4"
      >cols="6" md="4"</BCol
    >
    <BCol
      cols="6"
      md="4"
      >cols="6" md="4"</BCol
    >
  </BRow>

  <!-- Columns are always 50% wide, on mobile and desktop -->
  <BRow>
    <BCol cols="6">cols="6"</BCol>
    <BCol cols="6">cols="6"</BCol>
  </BRow>
</BContainer>
```

## Alignment [​](#alignment)

Use flexbox alignment utilities to vertically and horizontally align columns.

**Note:** Internet Explorer 11 does not support vertical alignment of flex items when the flex container has a `min-height` as shown below. [See Flexbugs #3 for more details](https://github.com/philipwalton/flexbugs#flexbug-3).

### Vertical alignment [​](#vertical-alignment)

For vertical alignment of all grid cells in a row, use the `align-v` prop on `<BRow>`. Possible values are `'start'`, `'center'`, `'end'`, `'fill`, `'baseline'`, and `'stretch'` from [`AlignmentVertical`](/bootstrap-vue-next/docs/migration-guide.html#alignment):

One of three columns

One of three columns

One of three columns

One of three columns

One of three columns

One of three columns

One of three columns

One of three columns

One of three columns

One of three columns

One of three columns

One of three columns

One of three columns

One of three columns

One of three columns

One of three columns

One of three columns

One of three columns

HTML StackBlitz

template

```
<BContainer class="bv-example-row bv-example-row-flex-cols">
  <BRow align-v="start">
    <BCol>One of three columns</BCol>
    <BCol>One of three columns</BCol>
    <BCol>One of three columns</BCol>
  </BRow>

  <BRow align-v="center">
    <BCol>One of three columns</BCol>
    <BCol>One of three columns</BCol>
    <BCol>One of three columns</BCol>
  </BRow>

  <BRow align-v="end">
    <BCol>One of three columns</BCol>
    <BCol>One of three columns</BCol>
    <BCol>One of three columns</BCol>
  </BRow>

  <BRow align-v="fill">
    <BCol>One of three columns</BCol>
    <BCol>One of three columns</BCol>
    <BCol>One of three columns</BCol>
  </BRow>

  <BRow align-v="baseline">
    <BCol style="font-size: 0.75rem">One of three columns</BCol>
    <BCol>One of three columns</BCol>
    <BCol style="font-size: 1.25rem">One of three columns</BCol>
  </BRow>

  <BRow align-v="stretch">
    <BCol>One of three columns</BCol>
    <BCol>One of three columns</BCol>
    <BCol>One of three columns</BCol>
  </BRow>
</BContainer>
```

For individual grid cell vertical alignment, use the `align-self` prop on `<BCol>`. Possible values are the values [`AlignmentVertical`](/bootstrap-vue-next/docs/migration-guide.html#alignment) and `auto`:

One of three columns

One of three columns

One of three columns

One of four columns

One of four columns

One of four columns

One of four columns

HTML StackBlitz

template

```
<BContainer class="bv-example-row bv-example-row-flex-cols">
  <BRow>
    <BCol align-self="start">One of three columns</BCol>
    <BCol align-self="center">One of three columns</BCol>
    <BCol align-self="end">One of three columns</BCol>
  </BRow>
  <BRow>
    <BCol align-self="baseline">One of four columns</BCol>
    <BCol align-self="stretch">One of four columns</BCol>
    <BCol align-self="fill">One of four columns</BCol>
    <BCol align-self="auto">One of four columns</BCol>
  </BRow>
</BContainer>
```

### Horizontal alignment [​](#horizontal-alignment)

To horizontally align grid cells within a row, use the `align-h` prop on `<BRow>`. Possible values are: `'start'`, `'center'`, `'end'`, `'around'`, `'between'` and `'evenly'` from [`AlignmentJustifyContent`](/bootstrap-vue-next/docs/migration-guide.html#alignment):

One of two columns

One of two columns

One of two columns

One of two columns

One of two columns

One of two columns

One of two columns

One of two columns

One of two columns

One of two columns

One of two columns

One of two columns

HTML StackBlitz

template

```
<BContainer class="bv-example-row">
  <BRow align-h="start">
    <BCol cols="4">One of two columns</BCol>
    <BCol cols="4">One of two columns</BCol>
  </BRow>

  <BRow align-h="center">
    <BCol cols="4">One of two columns</BCol>
    <BCol cols="4">One of two columns</BCol>
  </BRow>

  <BRow align-h="end">
    <BCol cols="4">One of two columns</BCol>
    <BCol cols="4">One of two columns</BCol>
  </BRow>

  <BRow align-h="around">
    <BCol cols="4">One of two columns</BCol>
    <BCol cols="4">One of two columns</BCol>
  </BRow>

  <BRow align-h="between">
    <BCol cols="4">One of two columns</BCol>
    <BCol cols="4">One of two columns</BCol>
  </BRow>

  <BRow align-h="evenly">
    <BCol cols="4">One of two columns</BCol>
    <BCol cols="4">One of two columns</BCol>
  </BRow>
</BContainer>
```

## Reordering [​](#reordering)

### Ordering columns [​](#ordering-columns)

Use `order-*` props for controlling the visual order of your content. These props are responsive, so you can set the order by breakpoint (e.g., `order="1" order-md="2"`). Includes support for 1 through 5 across all six grid tiers. `<BCol>` defaults to an order value of `0`.

First in DOM, no order applied

Second in DOM, with a larger order

Third in DOM, with an order of 1

First in DOM, with order of 65

Second in DOM, with an order of 1

Third in DOM, no order applied

HTML StackBlitz

template

```
<BContainer
  fluid
  class="bv-example-row"
>
  <BRow class="mb-3">
    <BCol>First in DOM, no order applied</BCol>
    <BCol order="5">Second in DOM, with a larger order</BCol>
    <BCol order="1">Third in DOM, with an order of 1</BCol>
  </BRow>

  <BRow class="mb-3">
    <BCol order="5">First in DOM, with order of 65</BCol>
    <BCol order="1">Second in DOM, with an order of 1</BCol>
    <BCol>Third in DOM, no order applied</BCol>
  </BRow>
</BContainer>
```

Ordering is controlled by flexbox's CSS style `order`.

### Offsetting columns [​](#offsetting-columns)

You can offset grid columns in two ways: our responsive `offset-*` props or the [spacing](https://getbootstrap.com/docs/5.3/utilities/spacing) utility classes. Grid `offset-*` props are sized to match columns while margins utility classes are more useful for quick layouts where the width of the offset is variable.

md="4"

md="4" offset-md="4"

md="3" offset-md="3"

md="3" offset-md="3"

md="6" offset-md="3"

HTML StackBlitz

template

```
<BContainer
  fluid
  class="bv-example-row"
>
  <BRow>
    <BCol md="4">md="4"</BCol>
    <BCol
      md="4"
      offset-md="4"
      >md="4" offset-md="4"</BCol
    >
  </BRow>

  <BRow>
    <BCol
      md="3"
      offset-md="3"
      >md="3" offset-md="3"</BCol
    >
    <BCol
      md="3"
      offset-md="3"
      >md="3" offset-md="3"</BCol
    >
  </BRow>

  <BRow>
    <BCol
      md="6"
      offset-md="3"
      >md="6" offset-md="3"</BCol
    >
  </BRow>
</BContainer>
```

In addition to column clearing at responsive breakpoints, you may need to reset offsets by setting the offset to `0` at a larger breakpoint:

sm="5" md="6"

sm="5" offset-sm="2" md="6" offset-md="0"

sm="6" md="5" lg="6"

sm="6" md="5" offset-md="2" col-lg="6" offset-lg="0"

HTML StackBlitz

template

```
<BContainer
  fluid
  class="bv-example-row"
>
  <BRow>
    <BCol
      sm="5"
      md="6"
      >sm="5" md="6"</BCol
    >
    <BCol
      sm="5"
      offset-sm="2"
      md="6"
      offset-md="0"
      >sm="5" offset-sm="2" md="6" offset-md="0"</BCol
    >
  </BRow>

  <BRow>
    <BCol
      sm="6"
      md="5"
      lg="6"
      >sm="6" md="5" lg="6"</BCol
    >
    <BCol
      sm="6"
      md="5"
      offset-md="2"
      lg="6"
      offset-lg="0"
      >sm="6" md="5" offset-md="2" col-lg="6" offset-lg="0"</BCol
    >
  </BRow>
</BContainer>
```

### Margin utilities on columns [​](#margin-utilities-on-columns)

You can use [margin and spacing](https://getbootstrap.com/docs/5.3/utilities/spacing) utility classes like `.mr-auto` to force sibling columns away from one another.

md="4"

md="4" .ml-auto

md="3" .ml-md-auto

md="3" .ml-md-auto

cols="auto" .mr-auto

cols="auto" .mr-auto

cols="auto"

HTML StackBlitz

template

```
<BContainer
  fluid
  class="text-light text-center"
>
  <BRow class="mb-3">
    <BCol
      md="4"
      class="p-3 bg-info"
      >md="4"</BCol
    >
    <BCol
      md="4"
      class="ms-auto p-3 bg-info"
      >md="4" .ml-auto</BCol
    >
  </BRow>

  <BRow class="mb-3">
    <BCol
      md="3"
      class="ms-md-auto p-3 bg-info"
      >md="3" .ml-md-auto</BCol
    >
    <BCol
      md="3"
      class="ms-md-auto p-3 bg-info"
      >md="3" .ml-md-auto</BCol
    >
  </BRow>

  <BRow>
    <BCol
      cols="auto"
      class="me-auto p-3 bg-info"
      >cols="auto" .mr-auto</BCol
    >
    <BCol
      cols="auto"
      class="me-auto p-3 bg-info"
      >cols="auto" .mr-auto</BCol
    >
    <BCol
      cols="auto"
      class="p-3 bg-info"
      >cols="auto"</BCol
    >
  </BRow>
</BContainer>
```

## Nesting grids [​](#nesting-grids)

To nest your content with the default grid, add a new `<BRow>` and set of `<BCol>` components within an existing `<BCol>` component. Nested rows should include a set of columns that add up to 12 or fewer (it is not required that you use all 12 available columns).

Level 1: sm="9"

Level 2: cols="8" sm="6"

Level 2: cols="4" sm="6"

HTML StackBlitz

template

```
<BContainer
  fluid
  class="bv-example-row"
>
  <BRow>
    <BCol sm="9">
      Level 1: sm="9"
      <BRow>
        <BCol
          cols="8"
          sm="6"
          >Level 2: cols="8" sm="6"</BCol
        >
        <BCol
          cols="4"
          sm="6"
          >Level 2: cols="4" sm="6"</BCol
        >
      </BRow>
    </BCol>
  </BRow>
</BContainer>
```

## Row columns [​](#row-columns)

Use the responsive `cols-*` props in `<BRow>` to quickly set the number of columns that best render your content and layout. Whereas normal column widths are apply to the individual `<BCol>` columns (e.g., `<BCol md="4">`), the row columns `col-*` props are set on the parent `<BRow>` as a shortcut.

Use these row columns to quickly create basic grid layouts or to control your card layouts. The default maximum number of row columns in Bootstrap v4.4 is `6` (unlike the regular columns which have a default maximum of `12` columns)

The value specified in the `<BRow>` prop(s) is the number of columns to create per row (whereas the props on `<BCol>` refer to the number of columns to occupy).

Column

Column

Column

Column

Column

Column

Column

Column

Column

Column

Column

Column

Column

Column

Column

Column

HTML StackBlitz

template

```
<BContainer class="bv-example-row mb-3">
  <BRow cols="2">
    <BCol>Column</BCol>
    <BCol>Column</BCol>
    <BCol>Column</BCol>
    <BCol>Column</BCol>
  </BRow>
</BContainer>

<BContainer class="bv-example-row mb-3">
  <BRow cols="3">
    <BCol>Column</BCol>
    <BCol>Column</BCol>
    <BCol>Column</BCol>
    <BCol>Column</BCol>
  </BRow>
</BContainer>

<BContainer class="bv-example-row mb-3">
  <BRow cols="4">
    <BCol>Column</BCol>
    <BCol>Column</BCol>
    <BCol>Column</BCol>
    <BCol>Column</BCol>
  </BRow>
</BContainer>

<BContainer class="bv-example-row">
  <BRow cols="4">
    <BCol>Column</BCol>
    <BCol>Column</BCol>
    <BCol cols="6">Column</BCol>
    <BCol>Column</BCol>
  </BRow>
</BContainer>
```

You can control the number of columns at each breakpoint level via the following `<BRow>` props:

-   `cols` for `xs` and up screens
-   `cols-sm` for `sm` and up screens
-   `cols-md` for `md` and up screens
-   `cols-lg` for `lg` and up screens
-   `cols-xl` for `xl` and up screens
-   `cols-xxl` for `xxl` and up screens

Column

Column

Column

Column

Column

Column

HTML StackBlitz

template

```
<BContainer class="bv-example-row">
  <BRow
    cols="1"
    cols-sm="2"
    cols-md="4"
    cols-lg="6"
  >
    <BCol>Column</BCol>
    <BCol>Column</BCol>
    <BCol>Column</BCol>
    <BCol>Column</BCol>
    <BCol>Column</BCol>
    <BCol>Column</BCol>
  </BRow>
</BContainer>
```

## Utilities for layout [​](#utilities-for-layout)

For faster mobile-friendly and responsive development, Bootstrap includes dozens of [utility classes](/bootstrap-vue-next/docs/reference/utility-classes.html) for showing, hiding, aligning, and spacing content.

### Changing `display` [​](#changing-display)

Use Bootstrap's [display utilities](https://getbootstrap.com/docs/5.3/utilities/display) for responsively toggling common values of the `display` property. Mix it with the grid system, content, or components to show or hide them across specific viewports.

### Flexbox options [​](#flexbox-options)

Bootstrap 5 is built with flexbox, but not every element’s `display` has been changed to `display: flex` as this would add many unnecessary overrides and unexpectedly change key browser behaviors. Most of the components are built with flexbox enabled.

Should you need to add `display: flex` to an element, do so with `.d-flex` or one of the responsive variants (e.g., `.d-sm-flex`). You’ll need this class or `display` value to allow the use of the extra [flexbox utilities](https://getbootstrap.com/docs/5.3/utilities/flex) for sizing, alignment, spacing, and more.

### Margin and padding [​](#margin-and-padding)

Use the `margin` and `padding` [spacing utilities](https://getbootstrap.com/docs/5.3/utilities/spacing) o control how elements and components are spaced and sized. Bootstrap 5 includes a six-level scale for spacing utilities, based on a `1rem` value default SASS `$spacer` variable. Choose values for all viewports (e.g., `.me-3` for `margin-right: 1rem` in LTR), or pick responsive variants to target specific viewports (e.g., `.me-md-3` for `margin-right: 1rem` —in LTR— starting at the `md` breakpoint).

### Toggle `visibility` [​](#toggle-visibility)

When toggling `display` isn’t needed, you can toggle the `visibility` of an element with the [visibility utility classes](https://getbootstrap.com/docs/5.3/utilities/visibility). Invisible elements will still affect the layout of the page, but are visually hidden from visitors.

## Component Reference

### `<BContainer>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BContainer/BContainer.vue)

-   [<BContainer> Properties](#comp-reference-bcontainer-properties)
-   [<BContainer> Slots](#comp-reference-bcontainer-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.container[‑*]`

##### [Properties](#comp-reference-bcontainer-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| fluid | `boolean | Breakpoint` | `false` | When set to true, makes the container 100% wide all the time, or set to one of the Bootstrap breakpoint names for 100% width up to the breakpoint |
| gutter-x | `GutterNumbers` | `undefined` | Horizontal gutter |
| gutter-y | `GutterNumbers` | `undefined` | Vertical gutter |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |

##### [Slots](#comp-reference-bcontainer-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the container |

### `<BRow>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BContainer/BRow.vue)

-   [<BRow> Properties](#comp-reference-brow-properties)
-   [<BRow> Slots](#comp-reference-brow-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.row`

##### [Properties](#comp-reference-brow-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| align-content | `AlignmentContent` | `undefined` | Aligns column items together on the cross axis: 'start', 'center', 'end', 'around', 'between', 'fill' or 'stretch'. Has no effect on single rows of items |
| align-h | `AlignmentJustifyContent` | `undefined` | Horizontal alignment/spacing of all columns: 'start', 'center', 'end', 'around', 'between', or 'evenly' |
| align-v | `AlignmentVertical` | `undefined` | Vertical alignment of all columns in a row: 'start', 'center', 'end', 'baseline', 'fill', or 'stretch' |
| cols | `ColsNumbers` | `undefined` | The number of row columns to create at the 'xs' breakpoint. |
| cols-lg | `ColsNumbers` | `undefined` | The number of row columns to create at the 'lg' breakpoint. |
| cols-md | `ColsNumbers` | `undefined` | The number of row columns to create at the 'md' breakpoint. |
| cols-sm | `ColsNumbers` | `undefined` | The number of row columns to create at the 'sm' breakpoint. |
| cols-xl | `ColsNumbers` | `undefined` | The number of row columns to create at the 'xl' breakpoint. |
| cols-xxl | `ColsNumbers` | `undefined` | The number of row columns to create at the 'xxl' breakpoint. |
| gutter-x | `GutterNumbers` | `undefined` | Horizontal gutter |
| gutter-y | `GutterNumbers` | `undefined` | Vertical gutter |
| no-gutters | `boolean` | `false` | When set, removes the margin from the row and removes the padding from the child columns |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |

##### [Slots](#comp-reference-brow-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the row |

### `<BCol>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BContainer/BCol.vue)

-   [<BCol> Properties](#comp-reference-bcol-properties)
-   [<BCol> Slots](#comp-reference-bcol-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.col[‑*]`

##### [Properties](#comp-reference-bcol-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| align-self | `AlignmentVertical | 'auto'` | `undefined` | Vertical alignment of the grid cell with respect to the row: 'start', 'center', 'fill', 'end', 'baseline', or 'stretch' |
| col | `boolean` | `false` | When true, makes the column grid cell span equal width for xs and up breakpoints |
| cols | `ColsNumbers | 'auto'` | `undefined` | Number of columns the grid cell spans for xs and up breakpoints |
| lg | `boolean | ColsNumbers | 'auto'` | `false` | Number of columns the grid cell spans for lg and up breakpoints |
| md | `boolean | ColsNumbers | 'auto'` | `false` | Number of columns the grid cell spans for md and up breakpoints |
| offset | `ColsOffsetNumbers` | `undefined` | Number of columns the grid cell is offset for xs and up breakpoints (0-12) |
| offset-lg | `ColsOffsetNumbers` | `undefined` | Number of columns the grid cell is offset for lg and up breakpoints (0-12) |
| offset-md | `ColsOffsetNumbers` | `undefined` | Number of columns the grid cell is offset for md and up breakpoints (0-12) |
| offset-sm | `ColsOffsetNumbers` | `undefined` | Number of columns the grid cell is offset for sm and up breakpoints (0-12) |
| offset-xl | `ColsOffsetNumbers` | `undefined` | Number of columns the grid cell is offset for xl and up breakpoints (0-12) |
| offset-xxl | `ColsOffsetNumbers` | `undefined` | Number of columns the grid cell is offset for xxl and up breakpoints (0-12) |
| order | `ColsOrderNumbers` | `undefined` | Flex order of the grid cell for xs and up breakpoints (1-5, 'first', or 'last') |
| order-lg | `ColsOrderNumbers` | `undefined` | Flex order of the grid cell for lg and up breakpoints (1-5, 'first', or 'last') |
| order-md | `ColsOrderNumbers` | `undefined` | Flex order of the grid cell for md and up breakpoints (1-5, 'first', or 'last') |
| order-sm | `ColsOrderNumbers` | `undefined` | Flex order of the grid cell for sm and up breakpoints (1-5, 'first', or 'last') |
| order-xl | `ColsOrderNumbers` | `undefined` | Flex order of the grid cell for xl and up breakpoints (1-5, 'first', or 'last') |
| order-xxl | `ColsOrderNumbers` | `undefined` | Flex order of the grid cell for xxl and up breakpoints (1-5, 'first', or 'last') |
| sm | `boolean | ColsNumbers | 'auto'` | `false` | Number of columns the grid cell spans for sm and up breakpoints |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |
| xl | `boolean | ColsNumbers | 'auto'` | `false` | Number of columns the grid cell spans for xl and up breakpoints |
| xxl | `boolean | ColsNumbers | 'auto'` | `false` | Number of columns the grid cell spans for xxl and up breakpoints |

##### [Slots](#comp-reference-bcol-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the col |
