# Progress ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/progress.html

##### On this page

-   [Basic Usage ​](#basic-usage)
    
-   [Value ​](#value)
    
-   [Labels ​](#labels)
    -   [Custom progress label ​](#custom-progress-label)
        
-   [Width ​](#width)
    
-   [Height ​](#height)
    
-   [Backgrounds ​](#backgrounds)
    
-   [Striped Background ​](#striped-background)
    
-   [Animated Background ​](#animated-background)
    
-   [Multiple bars ​](#multiple-bars)
    
-   [Component Reference](#component-reference)
    -   [<BProgress>](#b-progress)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BProgressBar>](#b-progress-bar)
        -   [Properties](#)
            
        -   [Slots](#)
            

# Progress [​](#progress)

Use our custom progress component for displaying simple or complex progress bars, featuring support for horizontally stacked bars, animated backgrounds, and text labels.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BProgress/BProgress.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/progress.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bprogressbar)

## Basic Usage [​](#basic-usage)

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <BProgress :value="0" />
  <BProgress
    class="mt-3"
    :value="25"
  />
  <BProgress
    class="mt-3"
    :value="50"
  />
  <BProgress
    class="mt-3"
    :value="75"
  />
  <BProgress
    class="mt-3"
    :value="100"
  />
  <!-- #endregion template -->
</template>
```

## Value [​](#value)

Set the maximum value with the `max` prop (default is `100`), and the current value via the `value` prop (default `0`).

When creating multiple bars in a single process, place the value prop on the individual `BProgressBar` sub-components (see the [Multiple Bars](#multiple-bars) section below for more details)

## Labels [​](#labels)

Add labels to your progress bars by either enabling `show-progress` (percentage of max) or `show-value` for the current absolute value. You may also set the precision (number of digits after the decimal) via the `precision` prop (default is `0` digits after the decimal).

##### No label

##### Value label

33

##### Progress label

67

##### Value label with precision

33.33

##### Progress label with precision

66.67

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <h5>No label</h5>
  <BProgress
    :value="33.3333"
    :max="50"
  />
  <h5>Value label</h5>
  <BProgress
    :value="33.3333"
    :max="50"
    show-value
  />
  <h5>Progress label</h5>
  <BProgress
    :value="33.3333"
    :max="50"
    show-progress
  />
  <h5>Value label with precision</h5>
  <BProgress
    :value="33.3333"
    :max="50"
    :precision="2"
    show-value
  />
  <h5>Progress label with precision</h5>
  <BProgress
    :value="33.3333"
    :max="50"
    :precision="2"
    show-progress
  />
  <!-- #endregion template -->
</template>
```

### Custom progress label [​](#custom-progress-label)

Need more control over the label? Provide your own label by using the default slot within a `BProgressBar` sub-component, or by using the `label` property on `BProgressBar`:

##### Custom label via default slot

Progress: **33.33 / 50**

##### Custom label via property

66.67%

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <h5>Custom label via default slot</h5>
  <BProgress
    :max="50"
    height="2rem"
  >
    <BProgressBar :value="33.333333">
      <span
        >Progress: <strong>{{ (33.333333).toFixed(2) }} / {{ 50 }}</strong></span
      >
    </BProgressBar>
  </BProgress>

  <h5 class="mt-3">Custom label via property</h5>
  <BProgress :max="50">
    <BProgressBar
      :value="33.333333"
      :label="`${((33.333333 / 50) * 100).toFixed(2)}%`"
    />
  </BProgress>
  <!-- #endregion template -->
</template>
```

## Width [​](#width)

`<BProgress>` will always expand to the maximum with of its parent container. To change the width, place `<BProgress>` in a standard Bootstrap column or apply one of the standard Bootstrap width classes.

##### Default width

##### Custom widths

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <h5>Default width</h5>
  <BProgress
    :value="75"
    class="mb-3"
  />

  <h5>Custom widths</h5>
  <BProgress
    :value="75"
    class="w-75 mb-2"
  />
  <BProgress
    :value="75"
    class="w-50 mb-2"
  />
  <BProgress
    :value="75"
    class="w-25"
  />
  <!-- #endregion template -->
</template>
```

## Height [​](#height)

The height of the progress bar can be controlled with the height prop. The height value should be a standard CSS dimension (px, rem, em, etc.). The default height is 1rem.

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <BProgress
    :value="25"
    height="1px"
  />
  <BProgress
    class="mt-3"
    :value="25"
    height="20px"
  />
  <!-- #endregion template -->
</template>
```

## Backgrounds [​](#backgrounds)

Use background variants to change the appearance of individual progress bars. The default variant is `primary`.

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <BProgress
    variant="success"
    :value="25"
  />
  <BProgress
    class="mt-3"
    variant="info"
    :value="50"
  />
  <BProgress
    class="mt-3"
    variant="warning"
    :value="75"
  />
  <BProgress
    class="mt-3"
    variant="danger"
    :value="100"
  />
  <!-- #endregion template -->
</template>
```

## Striped Background [​](#striped-background)

Set `striped` to apply a stripe via CSS gradient over the progress bar's background variant.

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <BProgress
    striped
    :value="10"
  />
  <BProgress
    striped
    class="mt-3"
    variant="success"
    :value="25"
  />
  <BProgress
    striped
    class="mt-3"
    variant="info"
    :value="50"
  />
  <BProgress
    striped
    class="mt-3"
    variant="warning"
    :value="75"
  />
  <BProgress
    striped
    class="mt-3"
    variant="danger"
    :value="100"
  />
  <!-- #endregion template -->
</template>
```

## Animated Background [​](#animated-background)

The striped gradient can also be animated by setting the `animated` prop.

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <BProgress
    variant="success"
    :value="25"
    striped
    animated
  />
  <BProgress
    class="mt-3"
    variant="info"
    :value="50"
    striped
    animated
  />
  <BProgress
    class="mt-3"
    variant="warning"
    :value="75"
    striped
    animated
  />
  <BProgress
    class="mt-3"
    variant="danger"
    :value="100"
    striped
    animated
  />
  <!-- #endregion template -->
</template>
```

NOTE

If `animated` is true, `striped` will automatically be enabled.

## Multiple bars [​](#multiple-bars)

Include multiple `BProgressBar` sub-components in a `BProgress` component to build a horizontally stacked set of progress bars.

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <BProgress>
    <BProgressBar :value="15" />
    <BProgressBar
      :value="30"
      variant="success"
    />
    <BProgressBar
      :value="20"
      variant="info"
    />
  </BProgress>
  <!-- #endregion template -->
</template>
```

NOTE

-   height, if specified, should always set on the `<BProgress>` component.
-   `<BProgressBar>` will not inherit value from `<BProgress>`.

## Component Reference

### `<BProgress>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BProgress/BProgress.vue)

-   [<BProgress> Properties](#comp-reference-bprogress-properties)
-   [<BProgress> Slots](#comp-reference-bprogress-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.progress`

##### [Properties](#comp-reference-bprogress-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| animated | `boolean` | `undefined` | Enables the animated background. Automatically sets 'striped'. |
| bg-variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to background of the component |
| height | `string` | `undefined` | Overrides the default height with a CSS height value (including units). |
| max | `Numberish` | `100` | Sets the maximum value. |
| precision | `Numberish` | `undefined` | Specifies the number of digits after the decimal to round the value to. |
| show-progress | `boolean` | `undefined` | Displays the current progress value as a percentage. |
| show-value | `boolean` | `undefined` | Displays the current progress value. |
| striped | `boolean` | `undefined` | Enables the striped background. |
| text-variant | `TextColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the text |
| value | `Numberish` | `undefined` | Sets the current value of the progress bar. |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Slots](#comp-reference-bprogress-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content (progress bars) to place in the progress element. |

### `<BProgressBar>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BProgress/BProgressBar.vue)

-   [<BProgressBar> Properties](#comp-reference-bprogressbar-properties)
-   [<BProgressBar> Slots](#comp-reference-bprogressbar-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.progress‑bar`

##### [Properties](#comp-reference-bprogressbar-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| animated | `boolean` | `false` | Enables the animated background. Automatically sets 'striped'. |
| bg-variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to background of the component |
| label | `string` | `undefined` | Sets the text string for the label. |
| max | `Numberish` | `undefined` | Sets the maximum value. |
| precision | `Numberish` | `0` | Specifies the number of digits after the decimal to round the value to. |
| show-progress | `boolean` | `false` | Displays the current progress value as a percentage. |
| show-value | `boolean` | `false` | Displays the current progress value. |
| striped | `boolean` | `false` | Enables the striped background. |
| text-variant | `TextColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the text |
| value | `Numberish` | `0` | Sets the current value of the progress bar. |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Slots](#comp-reference-bprogressbar-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the progress bar, overriding the \`label\`, \`showProgress\`, and \`showValue\` props. |
