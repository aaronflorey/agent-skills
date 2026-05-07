# Placeholder ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/placeholder.html

##### On this page

-   [Basic Usage ​](#basic-usage)
    
-   [Width ​](#width)
    
-   [Placeholder Animations ​](#placeholder-animations)
    
-   [Sizing ​](#sizing)
    
-   [Helper Components ​](#helper-components)
    -   [Placeholder Wrapper ​](#placeholder-wrapper)
        
    -   [Placeholder Buttons ​](#placeholder-buttons)
        
    -   [Placeholder Cards ​](#placeholder-cards)
        
    -   [Placeholder Tables ​](#placeholder-tables)
        
    -   [Advanced Helper Component Usage ​](#advanced-helper-component-usage)
        -   [Advanced Cards ​](#advanced-cards)
            
        -   [Advanced Tables ​](#advanced-tables)
            
-   [Styling and customization ​](#styling-and-customization)
    
-   [Component Reference](#component-reference)
    -   [<BPlaceholder>](#b-placeholder)
        -   [Properties](#)
            
    -   [<BPlaceholderCard>](#b-placeholder-card)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BPlaceholderWrapper>](#b-placeholder-wrapper)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BPlaceholderTable>](#b-placeholder-table)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BPlaceholderButton>](#b-placeholder-button)
        -   [Properties](#)
            

# Placeholder [​](#placeholder)

Placeholders are components that allows you to display a loading state for several component types while your data is being fetched or computed.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BPlaceholder/BPlaceholder.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/placeholder.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bskeleton)

## Basic Usage [​](#basic-usage)

At the placeholder core, you have the `BPlaceholder` component:

HTML StackBlitz

template

```
<template>
  <BPlaceholder cols="7" />
  <BPlaceholder width="65" />
  <BPlaceholder cols="6" />
</template>
```

## Width [​](#width)

You can adjust the width using props `width` and `cols`. Cols is a number value 1-12, whereas width is a percentage. Width takes priority over cols.

HTML StackBlitz

template

```
<template>
  <BPlaceholder
    width="30"
    :cols="12"
  />
  <BPlaceholder
    width="75%"
    variant="danger"
  />
  <BPlaceholder
    width="12"
    variant="warning"
  />
  <BPlaceholder
    :cols="6"
    variant="info"
  />
  <BPlaceholder
    :cols="8"
    variant="info"
  />
</template>
```

## Placeholder Animations [​](#placeholder-animations)

Bootstrap supports two types of animations, `wave` and `glow`.

NOTE

When using `BPlaceholderCard`, the image does not inherit an animation

![](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3A%23868e96%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)

![](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3A%23868e96%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)

HTML StackBlitz

template

```
<template>
  <BPlaceholderCard
    style="max-width: 20rem"
    animation="glow"
  />
  <BPlaceholderCard
    style="max-width: 20rem"
    animation="wave"
  />
  <BPlaceholder animation="glow" />
</template>
```

## Sizing [​](#sizing)

You can adjust the sizing of a placeholder by using the `size` prop. Acceptable values are 'xs', 'sm', or 'lg'.

HTML StackBlitz

template

```
<template>
  <BPlaceholder size="lg" />
  <BPlaceholder size="sm" />
  <BPlaceholder size="xs" />
</template>
```

## Helper Components [​](#helper-components)

`BPlaceholder` has several wrapper components to quickly create larger component sets, such as `BPlaceholderCard`, `BPlaceholderTable`, and `BPlaceholderButton`.

### Placeholder Wrapper [​](#placeholder-wrapper)

The `BPlaceholderWrapper` is a renderless component that picks between a 'loading' component, and a 'finished' component. It is useful when you have to wait for loading to finish, before rendering the actual content. Depending on the use case, you may prefer to use [Suspense](https://vuejs.org/guide/built-ins/suspense.html) instead.

![](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3A%23868e96%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)

Restart

HTML StackBlitz

vue

```
<template>
  <BPlaceholderWrapper :loading="loading">
    <template #loading>
      <BPlaceholderCard
        style="max-width: 20rem"
        no-footer
      />
    </template>
    <BCard
      title="Card Title"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem"
      class="mb-2"
    >
      <BCardText>
        Some quick example text to build on the card title and make up the bulk of the card's
        content.
      </BCardText>
      <BButton
        href="#placeholder-wrapper"
        variant="primary"
        >Go somewhere</BButton
      >
    </BCard>
  </BPlaceholderWrapper>
  <BButton @click="startLoading">Restart</BButton>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref, watchEffect} from 'vue'

const loading = ref(false)
let timeoutId: ReturnType<typeof setTimeout> | null = null

watchEffect(() => {
  if (loading.value === true) {
    timeoutId = setTimeout(() => {
      loading.value = false
      timeoutId = null
    }, 5000)
  }
})

onUnmounted(() => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId)
  }
})

const startLoading = () => {
  if (loading.value === true) return
  loading.value = true
}

onMounted(startLoading)
</script>
```

### Placeholder Buttons [​](#placeholder-buttons)

You can easily render a placeholder that has the button styling by using `BPlaceholderButton`.

HTML StackBlitz

template

```
<template>
  <BPlaceholderButton cols="3" />
</template>
```

### Placeholder Cards [​](#placeholder-cards)

Placeholders have built-in support for rendering a placeholder card with `BPlaceholderCard`.

![](data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3A%23868e96%3B%22%3E%3C%2Frect%3E%0A%20%20%20%20%3C%2Fsvg%3E)

HTML StackBlitz

template

```
<template>
  <BPlaceholderCard style="max-width: 20rem" />
</template>
```

### Placeholder Tables [​](#placeholder-tables)

You can also render a full placeholder table with `BPlaceholderTable`.

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

HTML StackBlitz

template

```
<template>
  <BPlaceholderTable />
</template>
```

### Advanced Helper Component Usage [​](#advanced-helper-component-usage)

#### Advanced Cards [​](#advanced-cards)

Cards expose various props and slots to make them more personalized.

You can adjust the image using various props, such as `imgBlankColor`, and `imgBottom`, or you can optionally use `imgSrc` to place a real image, rather than a blank.

Each section of the `BPlaceholderCard` exposes its slot elements, so you can easily override the defaults. Available slots are: `img`, `header`, `default`, and `footer`.

The footer also exposes some props that you can use to adjust the behavior of a button. Most notably prop `noButton`. If set to true, it will convert it to a basic placeholder appearance. Alternatively, you can use the `noFooter` prop to remove it altogether.

![](https://picsum.photos/1024/480/?image=1)

Footer

HTML StackBlitz

template

```
<template>
  <BPlaceholderCard
    img-src="https://picsum.photos/1024/480/?image=1"
    img-bottom
    no-header
  >
    <template #footer> Footer </template>

    <template #default>
      <BPlaceholder />
      <BPlaceholder
        width="65"
        variant="danger"
      />
      <BPlaceholder
        cols="6"
        variant="info"
      />
    </template>
  </BPlaceholderCard>
</template>
```

#### Advanced Tables [​](#advanced-tables)

`BPlaceholderTable` comes with various props to adjust the number of rows, columns, header/footer, and their stylings.

You can adjust the number of columns and rows using props `columns` and `rows` respectively. You can use `showFooter` to show the footer, or `noHeader` to hide the header. Both the footer and header have cellWidth, size, animation, and variant adjustments by prepending the type with the styling, eg: `headerCellWidth`, `headerSize`, `footerAnimation`, `footerVariant`.

Optionally, you can manually adjust any scope of the table using slots. The following slots are available: `thead`, `default`, and `tfoot`. Do note that the slots wrap the **entire** table scope, slot `thead` is the entire thead, and slot `default` is the entire tbody, so you will likely need to manually wrap your slot usages in these elements if you plan on using them.

|  |  |  |  |
| --- | --- | --- | --- |
|  |  |  |
|  |

HTML StackBlitz

template

```
<template>
  <BPlaceholderTable
    columns="3"
    rows="2"
    show-footer
    footer-variant="info"
    header-size="lg"
    footer-size="xs"
    footer-columns="1"
    header-columns="4"
  >
    <template #default>
      <tbody>
        <tr>
          <td>
            <BPlaceholder
              size="lg"
              variant="secondary"
            />
            <BPlaceholder
              size="sm"
              variant="secondary"
            />
            <BPlaceholder
              size="xs"
              variant="secondary"
            />
          </td>
          <td>
            <BPlaceholder variant="warning" />
            <BPlaceholder
              animation="wave"
              variant="warning"
            />
          </td>
          <td>
            <BPlaceholder
              animation="glow"
              variant="danger"
            />
          </td>
        </tr>
      </tbody>
    </template>
  </BPlaceholderTable>
</template>
```

## Styling and customization [​](#styling-and-customization)

The `<BPlaceholder>` component and helper components utilize Bootstrap SCSS variables, as much as possible to best match the styling and sizing of the native components. This means if you've customized Bootstrap SCSS, the skeleton components should adapt to fit your custom theming.

## Component Reference

### `<BPlaceholder>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BPlaceholder/BPlaceholder.vue)

-   [<BPlaceholder> Properties](#comp-reference-bplaceholder-properties)

[Adding styles](../configurations/customizing-styles#adding-styles): `.placeholder`

##### [Properties](#comp-reference-bplaceholder-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| animation | `PlaceholderAnimation` | `undefined` |  |
| cols | `Numberish` | `12` |  |
| size | `PlaceholderSize` | `undefined` |  |
| tag | `string` | `'span'` |  |
| variant | `BgColorVariant | null` | `null` |  |
| width | `Numberish` | `undefined` |  |
| wrapper-tag | `string` | `'span'` |  |

### `<BPlaceholderCard>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BPlaceholder/BPlaceholderCard.vue)

-   [<BPlaceholderCard> Properties](#comp-reference-bplaceholdercard-properties)
-   [<BPlaceholderCard> Slots](#comp-reference-bplaceholdercard-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.card`

##### [Properties](#comp-reference-bplaceholdercard-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| animation | `PlaceholderAnimation` | `undefined` |  |
| footer-animation | `PlaceholderAnimation` | `undefined` |  |
| footer-size | `PlaceholderSize` | `undefined` |  |
| footer-variant | `ColorVariant | null` | `undefined` |  |
| footer-width | `Numberish` | `100` |  |
| header-animation | `PlaceholderAnimation` | `undefined` |  |
| header-size | `PlaceholderSize` | `undefined` |  |
| header-variant | `ColorVariant | null` | `undefined` |  |
| header-width | `Numberish` | `100` |  |
| img-blank-color | `string` | `'#868e96'` |  |
| img-height | `Numberish` | `100` |  |
| img-placement | `'top' | 'bottom'` | `'top'` |  |
| img-src | `string` | `undefined` |  |
| no-button | `boolean` | `false` |  |
| no-footer | `boolean` | `false` |  |
| no-header | `boolean` | `false` |  |
| no-img | `boolean` | `false` |  |
| size | `PlaceholderSize` | `undefined` |  |
| variant | `ColorVariant | null` | `undefined` |  |

##### [Slots](#comp-reference-bplaceholdercard-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Overrides the default placeholders |
| footer |  | Overrides the default footer placeholder |
| header |  | Overrides the default header placeholder |
| img |  | Overrides the default image placeholder |

### `<BPlaceholderWrapper>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BPlaceholder/BPlaceholderWrapper.vue)

-   [<BPlaceholderWrapper> Properties](#comp-reference-bplaceholderwrapper-properties)
-   [<BPlaceholderWrapper> Slots](#comp-reference-bplaceholderwrapper-slots)

##### [Properties](#comp-reference-bplaceholderwrapper-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| loading | `boolean` | `false` | Determines whether the loading slot is displayed |

##### [Slots](#comp-reference-bplaceholderwrapper-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to show when the \`loading\` prop is \`false\` |
| loading |  | Content to show when the \`loading\` prop is \`true\` |

### `<BPlaceholderTable>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BPlaceholder/BPlaceholderTable.vue)

-   [<BPlaceholderTable> Properties](#comp-reference-bplaceholdertable-properties)
-   [<BPlaceholderTable> Slots](#comp-reference-bplaceholdertable-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.table`

##### [Properties](#comp-reference-bplaceholdertable-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| animation | `PlaceholderAnimation` | `undefined` |  |
| cell-width | `Numberish` | `100` |  |
| columns | `Numberish` | `5` |  |
| footer-animation | `PlaceholderAnimation` | `undefined` |  |
| footer-cell-width | `Numberish` | `100` |  |
| footer-columns | `Numberish` | `undefined` |  |
| footer-size | `PlaceholderSize` | `undefined` |  |
| footer-variant | `ColorVariant | null` | `undefined` |  |
| header-animation | `PlaceholderAnimation` | `undefined` |  |
| header-cell-width | `Numberish` | `100` |  |
| header-columns | `Numberish` | `undefined` |  |
| header-size | `PlaceholderSize` | `undefined` |  |
| header-variant | `ColorVariant | null` | `undefined` |  |
| no-header | `boolean` | `false` |  |
| rows | `Numberish` | `3` |  |
| show-footer | `boolean` | `false` |  |
| size | `PlaceholderSize` | `undefined` |  |
| variant | `ColorVariant | null` | `undefined` |  |

##### [Slots](#comp-reference-bplaceholdertable-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Overrides the table body (tbody) placeholder |
| tfoot |  | Overrides the table footer (tfoot) placeholder |
| thead |  | Overrides the table header (thead) placeholder |

### `<BPlaceholderButton>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BPlaceholder/BPlaceholderButton.vue)

-   [<BPlaceholderButton> Properties](#comp-reference-bplaceholderbutton-properties)

[Adding styles](../configurations/customizing-styles#adding-styles): `.placeholder.btn`

##### [Properties](#comp-reference-bplaceholderbutton-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| animation | `PlaceholderAnimation` | `undefined` |  |
| cols | `Numberish` | `undefined` |  |
| tag | `string` | `'div'` |  |
| variant | `ColorVariant | null` | `'primary'` |  |
| width | `Numberish` | `undefined` |  |
