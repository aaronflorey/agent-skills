# Form Rating ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/form-rating.html

##### On this page

-   [Overview ​](#overview)
    
-   [Styling ​](#styling)
    -   [Variant and color ​](#variant-and-color)
        
    -   [Number of stars ​](#number-of-stars)
        
    -   [Show value ​](#show-value)
        -   [Show maximum value ​](#show-maximum-value)
            
    -   [Control sizing ​](#control-sizing)
        
    -   [Inline mode ​](#inline-mode)
        
    -   [Borderless ​](#borderless)
        
    -   [Disabled ​](#disabled)
        
    -   [Readonly ​](#readonly)
        
    -   [Clear button ​](#clear-button)
        -   [Custom clear icon ​](#custom-clear-icon)
            
    -   [Icons ​](#icons)
        -   [Default icons styling ​](#default-icons-styling)
            
        -   [Custom icons ​](#custom-icons)
            
        -   [Icon props (Advanced) ​](#icon-props-advanced)
            
-   [Form submission ​](#form-submission)
    
-   [Using in input groups ​](#using-in-input-groups)
    
-   [Implementation notes ​](#implementation-notes)
    
-   [Accessibility ​](#accessibility)
    
-   [Component Reference](#component-reference)
    -   [<BFormRating>](#b-form-rating)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            

# Form Rating [​](#form-rating)

Custom star rating component for entering or displaying rating values. Fully WAI-ARIA accessible with keyboard control, supporting both interactive and readonly modes with customizable styling and icons.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormRating/BFormRating.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/form-rating.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bformrating)

## Overview [​](#overview)

Rating values range from 1 to the number of stars allowed (default stars is `5`, minimum stars is `3`). Since `BFormRating` uses the Bootstrap class `form-control`, it can easily be placed inside [input groups](/bootstrap-vue-next/docs/components/input-group.html).

There are two main modes for `BFormRating`: interactive and readonly.

Interactive mode allows the user to choose a rating from 1 to the number of stars (default 5) in whole number increments.

**Interactive rating (input mode):**

Current rating: 0

HTML StackBlitz

vue

```
<template>
  <BFormRating v-model="rating" />

  <p>Current rating: {{ rating }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const rating = ref(0)
</script>
```

Readonly mode is used for displaying an aggregated rating, and supports `half` stars.

**Readonly (non-interactive) rating:**

Current rating: 2.567

HTML StackBlitz

vue

```
<template>
  <BFormRating
    v-model="rating"
    :readonly="true"
  />

  <p>Current rating: {{ rating }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const rating = ref(2.567)
</script>
```

## Styling [​](#styling)

### Variant and color [​](#variant-and-color)

Easily apply one of the Bootstrap theme color variants to the rating icon via the `variant` prop. The default is to use the default form control text color.

Current rating: 3

HTML StackBlitz

vue

```
<template>
  <BFormRating
    v-model="rating"
    variant="primary"
    aria-label="Primary rating"
  />
  <BFormRating
    v-model="rating"
    variant="secondary"
    aria-label="Secondary rating"
  />
  <BFormRating
    v-model="rating"
    variant="success"
    aria-label="Success rating"
  />
  <BFormRating
    v-model="rating"
    variant="danger"
    aria-label="Danger rating"
  />
  <BFormRating
    v-model="rating"
    variant="warning"
    aria-label="Warning rating"
  />
  <BFormRating
    v-model="rating"
    variant="info"
    aria-label="Info rating"
  />
  <p>Current rating: {{ rating }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const rating = ref(3)
</script>
```

To apply a _custom color_, use the `color` prop which accepts a standard CSS color name, HEX color value (`#...`) or RGB/RGBA (`rgb(...)`/`rgba(...)`) color value:

Current rating: 3

HTML StackBlitz

vue

```
<template>
  <BFormRating
    v-model="rating"
    color="indigo"
  />
  <BFormRating
    v-model="rating"
    color="#ff00ff"
  />
  <BFormRating
    v-model="rating"
    color="rgb(64, 192, 128)"
  />
  <BFormRating
    v-model="rating"
    color="rgba(64, 192, 128, 0.75)"
  />

  <p>Current rating: {{ rating }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const rating = ref(3)
</script>
```

**Notes:**

-   The prop `color` takes precedence over the `variant` prop
-   Variants translate to the `text-{variant}` utility class on the icon

### Number of stars [​](#number-of-stars)

By default, `<BFormRating>` defaults to `5` stars. You can change the number of stars via the `stars` prop. The minimum allowed stars is `3`.

Rating with 10 stars:

Value: 0

Rating with 7 stars:

Value: 0

HTML StackBlitz

vue

```
<template>
  <label>Rating with 10 stars:</label>
  <BFormRating
    v-model="rating10"
    :stars="10"
  />
  <p>Value: {{ rating10 }}</p>

  <label>Rating with 7 stars:</label>
  <BFormRating
    v-model="rating7"
    :stars="7"
  />
  <p class="mt-2">Value: {{ rating7 }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const rating10 = ref(0)
const rating7 = ref(0)
</script>
```

### Show value [​](#show-value)

By default, `<BFormRating>` does not display the current numerical value. To show the current value simply set the `show-value` prop to `true`. To control the precision (number of digits after the decimal) simply set the `precision` prop to the number of digits after the decimal to show. The `precision` setting is useful when showing an aggregated or average rating value in `readonly` mode.

4

Current rating: 4

HTML StackBlitz

vue

```
<template>
  <BFormRating
    v-model="rating"
    show-value
  />

  <p>Current rating: {{ rating }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const rating = ref(4)
</script>
```

**With precision set:**

3.56

Current rating: 3.555

HTML StackBlitz

vue

```
<template>
  <BFormRating
    v-model="rating"
    show-value
    :precision="2"
  />

  <p>Current rating: {{ rating }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const rating = ref(3.555)
</script>
```

#### Show maximum value [​](#show-maximum-value)

Optionally, show the maximum rating possible by also setting the prop `show-value-max` to `true`:

3.56/5.00

Current rating: 3.555

HTML StackBlitz

vue

```
<template>
  <BFormRating
    v-model="rating"
    show-value-max
    :precision="2"
  />
  <p>Current rating: {{ rating }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const rating = ref(3.555)
</script>
```

### Control sizing [​](#control-sizing)

Fancy a small or large rating control? Simply set the prop `size` to either `'sm'` or `'lg'` respectively.

Small rating

Default rating (medium)

Large rating

Current rating: 4

HTML StackBlitz

vue

```
<template>
  <label for="rating-sm">Small rating</label>
  <BFormRating
    id="rating-sm"
    v-model="rating"
    size="sm"
  />

  <label for="rating-md">Default rating (medium)</label>
  <BFormRating
    id="rating-md"
    v-model="rating"
  />

  <label for="rating-lg">Large rating</label>
  <BFormRating
    id="rating-lg"
    v-model="rating"
    size="lg"
  />

  <p>Current rating: {{ rating }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const rating = ref(4)
</script>
```

### Inline mode [​](#inline-mode)

By default, `<BFormRating>` occupies 100% width of the parent container. In some situations, you may prefer the custom input to occupy only the space required for its contents. Simply set the `inline` prop to `true` to render the component in inline mode:

Inline rating:

HTML StackBlitz

vue

```
<template>
  <label for="rating-inline">Inline rating:</label>
  <BFormRating
    id="rating-inline"
    v-model="rating"
    inline
  />
</template>

<script setup lang="ts">
import {ref} from 'vue'
const rating = ref(4)
</script>
```

### Borderless [​](#borderless)

By default, `BFormRating` has standard Bootstrap form-control styling. To disable the default form-control border, simply set the no-border prop to true.

Small rating with no border

Default rating (medium) with no border

Large rating with no border

Current rating: 4

HTML StackBlitz

vue

```
<template>
  <label for="rating-sm">Small rating with no border </label>
  <BFormRating
    id="rating-sm"
    v-model="rating"
    size="sm"
    no-border
  />

  <label for="rating-md">Default rating (medium) with no border </label>
  <BFormRating
    id="rating-md"
    v-model="rating"
    no-border
  />

  <label for="rating-lg">Large rating with no border </label>
  <BFormRating
    id="rating-lg"
    v-model="rating"
    size="lg"
    no-border
  />

  <p>Current rating: {{ rating }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const rating = ref(4)
</script>
```

### Disabled [​](#disabled)

If you require additional information before a user can chose a ratings value, simply set the `disabled` prop to `true` to disable any user interactivity on the component:

Disabled rating

HTML StackBlitz

vue

```
<template>
  <label for="rating-disabled">Disabled rating</label>
  <BFormRating
    id="rating-disabled"
    v-model="rating"
    disabled
  />
</template>

<script setup lang="ts">
import {ref} from 'vue'
const rating = ref(2.75)
</script>
```

### Readonly [​](#readonly)

Readonly ratings remain focusable, but are not interactive. This state is useful for displaying an aggregated or average ratings value. Fractional values are allowed and will result in the displaying of _half icons_ when the `value` is not a whole number (the half icon threshold is `0.5`).

Readonly rating

3.654

HTML StackBlitz

vue

```
<template>
  <label for="rating-readonly">Readonly rating</label>
  <BFormRating
    id="rating-readonly"
    v-model="rating"
    readonly
    show-value
    :precision="3"
  />
</template>

<script setup lang="ts">
import {ref} from 'vue'
const rating = ref(3.6536)
</script>
```

### Clear button [​](#clear-button)

Optionally show a clear icon via the `show-clear` prop. The value will be set to `null` when the clear icon is clicked.

2.50

Current rating: 2.5

HTML StackBlitz

vue

```
<template>
  <BFormRating
    v-model="rating"
    show-value
    :precision="2"
    show-clear
  />

  <p>Current rating: {{ rating }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const rating = ref(2.5)
</script>
```

**Notes:**

-   The clear icon will not be shown when the props `readonly` or `disabled` are set.

#### Custom clear icon [​](#custom-clear-icon)

You can replace the default clear icon using the `#icon-clear` slot. This slot is **not scoped** — you can insert any content you like.

Clear

Current rating: 2.5

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormRating
      v-model="rating"
      show-clear
    >
      <template #icon-clear>
        <b-button variant="dark"> Clear </b-button>
      </template>
    </BFormRating>
    <p>Current rating: {{ rating }}</p>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const rating = ref(2.5)
</script>
```

### Icons [​](#icons)

By default, `BFormRating` uses built-in star SVG icons:

-   Empty star: outlined star
-   Half star: half-filled star
-   Full star: filled star
-   Clear button: x icon

#### Default icons styling [​](#default-icons-styling)

When using the default icons, you can style them with the `variant`, `color`, and `size` props. These props apply Bootstrap classes and styles to the built-in SVG icons.

#### Custom icons [​](#custom-icons)

To use completely custom icons, use the default scoped slot which provides access to `starIndex`, `isFilled`, and `isHalf` properties:

0

Rating: 0

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormRating
      v-model="rating"
      :stars="5"
      show-value
      show-clear
    >
      <template #default="{starIndex, isFilled}">
        <!-- Full heart -->
        <svg
          v-if="isFilled"
          aria-hidden="true"
          class="custom-icon"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
          fill="currentColor"
          @click="rating = starIndex"
        >
          <path
            d="M12 4.528a6 6 0 0 0-8.243 8.715l6.829 6.828a2 2 0 0 0 2.828 0l6.829-6.828A6 6 0 0 0 12 4.528z"
            fill="currentColor"
          />
        </svg>

        <!-- Empty heart -->
        <svg
          v-else
          aria-hidden="true"
          class="custom-icon"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          @click="rating = starIndex"
        >
          <path
            d="M12 4.528a6 6 0 0 0-8.243 8.715l6.829 6.828a2 2 0 0 0 2.828 0l6.829-6.828A6 6 0 0 0 12 4.528z"
          />
        </svg>
      </template>
    </BFormRating>

    <p class="mt-2">Rating: {{ rating }}</p>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {BFormRating} from 'bootstrap-vue-next/components/BFormRating'

const rating = ref(0)
</script>

<style scoped>
.custom-icon {
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s ease;
  color: #a01918;
}

.b-form-rating.is-disabled .custom-icon {
  color: var(--bs-secondary);
  cursor: default;
}

.b-form-rating:not(.is-readonly):not(.is-disabled) .custom-icon:hover {
  transform: scale(1.25);
}
</style>
```

**Important notes for custom icons:**

-   The `variant`, `color`, and `size` props **do not apply** to custom icons provided via scoped slots
-   You must handle all styling (colors, sizes, hover effects) yourself in your custom CSS
-   You're responsible for implementing click handlers if needed: `@click="rating = starIndex"`
-   Custom icons completely replace the default star rendering

#### Icon props (Advanced) [​](#icon-props-advanced)

The `icon-empty`, `icon-half`, `icon-full`, and `icon-clear` props are available for specifying alternate Bootstrap Icon names, but require the corresponding Bootstrap Icon components to be registered. Most users should use the scoped slot approach shown above for custom icons.

## Form submission [​](#form-submission)

If you intend to submit the rating value via standard form submission, set the `name` prop to the desired form field name. A hidden input will be generated with the current value (or an empty string if there is no value). You can also use the `form` prop to associate the rating with a form by its `id` when the rating is not a descendant of the form.

The root element of `BFormRating` is an `<output>` element, which is a form-associated element.

Submit

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <BForm @submit.prevent="onSubmit">
    <BFormRating
      v-model="rating"
      name="rating"
    />
    <div class="mt-2">
      <BButton
        type="submit"
        variant="primary"
        >Submit</BButton
      >
    </div>
    <div
      v-if="result"
      class="mt-2"
    >
      Submitted value: {{ result }}
    </div>
  </BForm>
  <!-- #endregion template -->
</template>

<script setup lang="ts">
import {ref} from 'vue'

const rating = ref(3)
const result = ref<string | null>(null)

function onSubmit(event: Event) {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)
  result.value = formData.get('rating')?.toString() ?? ''
}
</script>
```

## Using in input groups [​](#using-in-input-groups)

`BFormRating` can be placed inside input groups. Since it uses the Bootstrap `form-control` class, it integrates seamlessly with `BInputGroup` components.

Rating:

Quality:

4

Your Rating

0

stars

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <BInputGroup prepend="Rating:">
    <BFormRating v-model="rating" />
  </BInputGroup>

  <BInputGroup
    prepend="Quality:"
    class="mt-3"
  >
    <BFormRating
      v-model="quality"
      show-value
    />
  </BInputGroup>

  <BInputGroup class="mt-3">
    <BInputGroupText>Your Rating</BInputGroupText>
    <BFormRating
      v-model="userRating"
      show-value
      show-clear
    />
    <BInputGroupText>stars</BInputGroupText>
  </BInputGroup>
  <!-- #endregion template -->
</template>

<script setup lang="ts">
import {ref} from 'vue'

const rating = ref(3)
const quality = ref(4)
const userRating = ref(0)
</script>
```

## Implementation notes [​](#implementation-notes)

The ratings control uses the Bootstrap v5 `form-control*`, `d-*` (display), and `text-{variant}` classes, as well as BootstrapVue's custom CSS for proper styling.

## Accessibility [​](#accessibility)

To screen reader users `<BFormRating>` appears as a _slider_ type input input.

Keyboard navigation is employed to select the rating value, and mimics the keyboard controls of `range` inputs:

-   Left or Down will decrement the rating value by `1`
-   Right or Up will increment the rating value by `1`
-   When the [`locale`](#internationalization) resolves to a right-to-left language, the Left and Right behaviour is reversed.

## Component Reference

### `<BFormRating>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BFormRating/BFormRating.vue)

-   [<BFormRating> Properties](#comp-reference-bformrating-properties)
-   [<BFormRating> Events](#comp-reference-bformrating-events)
-   [<BFormRating> Slots](#comp-reference-bformrating-slots)
-   [<BFormRating> Exposed](#comp-reference-bformrating-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.form‑rating`

##### [Properties](#comp-reference-bformrating-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| color | `string` | `undefined` | CSS color to use instead of variant. Accepts either a HEX or RGB/RGBA string |
| disabled | `boolean` | `'false'` | When \`true\` makes the rating disabled |
| form | `string` | `undefined` | The id of the form that the rating input belongs to. If not set, the rating will be associated with the closest parent form |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| inline | `boolean` | `'false'` | When \`true\` renders as an inline element rather than a block (100% width) element |
| locale | `string` | `'undefined'` | Locale (or locales) to use when showing the value when prop \`show-value\` is set. Defaults to the browser default locale. Also affects the left-to-right or right-to-left orientation of the component |
| model-value | `number` | `0` | The current rating value (supports v-model two-way binding). |
| name | `string` | `undefined` | Sets the name attribute on the hidden input element. Required for form submission |
| no-border | `boolean` | `'false'` | When \`true\`, removes the border around the rating component |
| precision | `number` | `undefined` | Specify the number of digits after the decimal to show. Defaults to to no defined precision |
| readonly | `boolean` | `'false'` | When \`true\` makes the rating readonly. When \`true\`, fractional ratings values are allowed (half icons will be shown) |
| show-clear | `boolean` | `'false'` | When \`true\`, shows a clear button to reset the rating |
| show-value | `boolean` | `'false'` | When \`true\` shows the current rating value in the control |
| show-value-max | `boolean` | `'false'` | When set to \`true\` and prop \`show-value\` is \`true\`, includes the maximum star rating possible in the formatted value |
| size | `'sm' | 'lg' | string` | `'1rem'` | Icon size: accepts CSS units (e.g. '1.5rem', '24px') or the presets 'sm' (.875rem) and 'lg' (1.25rem); defaults to 1rem. |
| stars | `number` | `5` | The number of stars to show. Minimum value is \`3\`, default is \`5\` |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Events](#comp-reference-bformrating-events)

| Event | Args | Description |
| --- | --- | --- |
| update:model-value | 
`value``: number` - Currently selected rating value.

 | Emitted when the selected value(s) are changed. Looking for the \`input\` or \`change\` event - use \`update:model-value\` instead. |

##### [Slots](#comp-reference-bformrating-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default | 
`star-index``: number` - The index of the star being rendered (0-based index)

`is-filled``: boolean` - When \`true\`, the star is filled (selected)

`is-half``: boolean` - When \`true\`, the star is half-filled (partially selected)

 | Custom renderer for each star. |
| icon-clear |  | Content for the optional clear button |

##### [Exposed](#comp-reference-bformrating-exposed)

| Name | Type | Description |
| --- | --- | --- |
| hoverValue | `Ref<number | null>` | Reactive reference to the currently hovered rating value |
