# Color Variants ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/reference/color-variants.html

##### On this page

-   [Base variants ​](#base-variants)
    
-   [Background and border variants ​](#background-and-border-variants)
    
-   [Text variants ​](#text-variants)
    
-   [Variant Interactions ​](#variant-interactions)
    
-   [Component specific variants ​](#component-specific-variants)
    -   [Alert variants ​](#alert-variants)
        
    -   [Badge variants ​](#badge-variants)
        
    -   [Button variants ​](#button-variants)
        
    -   [Table variants ​](#table-variants)
        
    -   [Popover variants ​](#popover-variants)
        
    -   [Tooltip variants ​](#tooltip-variants)
        
    -   [Toast variants ​](#toast-variants)
        
-   [Using variant classes ​](#using-variant-classes)
    
-   [Creating custom variants ​](#creating-custom-variants)
    

# Color Variants [​](#color-variants)

Color variants are available when using the default Bootstrap v5 CSS and their mappings to CSS classes. Below are the variants available when using the default Bootstrap v5 CSS. When using BootstrapVueNext components, the variants are referred to by their variant name, rather than by the underlying CSS classname.

[Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/reference/color-variants.md)

## Base variants [​](#base-variants)

.text-primary

.text-secondary

.text-success

.text-danger

.text-warning

.text-info

.text-light

.text-dark

The base variants will translate to various Bootstrap v5 contextual class names based on the component (and variant purpose) where they are used. See the sections below for details.

## Background and border variants [​](#background-and-border-variants)

All the base variants plus:

-   `white`
-   `transparent`

These translate to class names `bg-{variant}` for backgrounds and `border-{variant}` for borders.

These variants are used by components (such as `BCard`, `BModal`, etc.) that provide `bg-variant`, `_-bg-variant`, `border-variant` and `_-border-variant` props.

## Text variants [​](#text-variants)

All the base variants plus:

-   `muted`
-   `white`
-   `black`

.text-primary

.text-primary-emphasis

.text-secondary

.text-secondary-emphasis

.text-success

.text-success-emphasis

.text-danger

.text-danger-emphasis

.text-warning

.text-warning-emphasis

.text-info

.text-info-emphasis

.text-light

.text-light-emphasis

.text-dark

.text-dark-emphasis

.text-body

.text-body-emphasis

.text-body-secondary

.text-body-tertiary

.text-black

.text-white

.text-black-50

.text-white-50

These translate to class names `text-{variant}`

These variants are used by components (such as `BCard`, `BModal`, etc.) that provide `text-variant` and `*-text-variant` props.

## Variant Interactions [​](#variant-interactions)

The `bg-variant` and `text-variant` props take precedence over the `variant` prop. It is more straightforward to set **either** `variant` **or** `bg-variant` and `text-variant`, but not a combination of `variant` with the other two. But the more specific props effectively override the `text` or `bg` portion of the `variant` prop, so an alternative is to use the `variant` prop and then override the `text` or `bg` as needed.

Set 'variant': testing

Set 'bg-variant': testing

Set 'text-variant' (background is 'secondary' since 'variant' defaults to 'secondary'): testing

Set 'text-variant' and 'bg-variant': testing

Set all three - 'variant' is overridden by 'bg-variant' and 'text-variant': testing

HTML StackBlitz

template

```
<BRow
  ><BCol>Set 'variant': <BBadge variant="success"> testing </BBadge></BCol></BRow
>
<BRow
  ><BCol>Set 'bg-variant': <BBadge bg-variant="info"> testing </BBadge></BCol></BRow
>
<BRow
  ><BCol
    >Set 'text-variant' (background is 'secondary' since 'variant' defaults to 'secondary'):
    <BBadge text-variant="info"> testing </BBadge></BCol
  ></BRow
>
<BRow
  ><BCol
    >Set 'text-variant' and 'bg-variant':
    <BBadge
      text-variant="primary"
      bg-variant="danger"
    >
      testing
    </BBadge></BCol
  ></BRow
>
<BRow
  ><BCol
    >Set all three - 'variant' is overridden by 'bg-variant' and 'text-variant':
    <BBadge
      text-variant="primary"
      bg-variant="danger"
      variant="success"
    >
      testing
    </BBadge></BCol
  ></BRow
>
```

## Component specific variants [​](#component-specific-variants)

Some Bootstrap v5 components require additional CSS styling, or additional pseudo selector styling (i.e buttons), and hence have their own underlying variant CSS classes.

### Alert variants [​](#alert-variants)

All the base variants

These translate to class names `alert-{variant}`.

See [Variant Interactions](#variant-interactions) for details on interactions between `variant`, `bg-variant`, and `text-variant`.

### Badge variants [​](#badge-variants)

All the base variants

These translate to class names `badge-{variant}`.

See [Variant Interactions](#variant-interactions) for details on interactions between `variant`, `bg-variant`, and `text-variant`.

### Button variants [​](#button-variants)

All the base variants plus:

-   `outline-{base variant}` which generates an outline button version of the base variant
-   `link` which renders the button with the look of a link but retains button padding and margins

These translate to class names `btn-{variant}` and `btn-outline-{variant}`.

Note the `link` variant does not have an outline version.

See [Variant Interactions](#variant-interactions) for details on interactions between `variant`, `bg-variant`, and `text-variant`.

### Table variants [​](#table-variants)

All the base variants plus:

-   `active`

These variants translate to class names `table-{variant}`.

When the table has the `dark` prop set, the variants translate to the `bg-{variant}` classes.

Note that the `active` variant is only applicable to `<tr>` elements within the `<tbody>`, and can not be applied to individual table cells or used as the `table-variant`.

### Popover variants [​](#popover-variants)

All the base variants

These translate to BootstrapVueNext custom class names `b-popover-{variant}`.

### Tooltip variants [​](#tooltip-variants)

All the base variants

These translate to BootstrapVueNext custom class names `b-tooltip-{variant}`.

### Toast variants [​](#toast-variants)

All the base variants

These translate to BootstrapVueNext custom class names `b-toast-{variant}`.

## Using variant classes [​](#using-variant-classes)

You may also use the underlying class names directly on elements (and some components) via the standard HTML `class="..."` attribute.

## Creating custom variants [​](#creating-custom-variants)

When creating custom variants, follow the Bootstrap v5 variant CSS class naming scheme and they will become available to the various components that use that scheme (i.e. create a custom CSS class `btn-purple` and `purple` becomes a valid variant to use on `BButton`).

To make TypeScript recognize your custom variants, you also need to augment the type interfaces. See the [Extending types](/bootstrap-vue-next/docs/types.html#extending-types) section for details.

Alternatively, you can create new variant theme colors by supplying custom Bootstrap SCSS theme color maps. The default theme color map is (from `bootstrap/scss/\_variables.scss`):

Base grayscale colors definitions

HTML

scss

```
$white: #fff;
$gray-100: #f8f9fa;
$gray-200: #e9ecef;
$gray-300: #dee2e6;
$gray-400: #ced4da;
$gray-500: #adb5bd;
$gray-600: #6c757d;
$gray-700: #495057;
$gray-800: #343a40;
$gray-900: #212529;
$black: #000;
```

Base colors definitions

HTML

scss

```
$blue: #0d6efd;
$indigo: #6610f2;
$purple: #6f42c1;
$pink: #d63384;
$red: #dc3545;
$orange: #fd7e14;
$yellow: #ffc107;
$green: #198754;
$teal: #20c997;
$cyan: #0dcaf0;
```

Theme color default definitions

HTML

scss

```
$primary: $blue;
$secondary: $gray-600;
$success: $green;
$info: $cyan;
$warning: $yellow;
$danger: $red;
$light: $gray-100;
$dark: $gray-900;
```
