# Badge ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/badge.html

##### On this page

-   [Examples ​](#examples)
    -   [Headings ​](#headings)
        
    -   [Buttons ​](#buttons)
        
    -   [Positioned ​](#positioned)
        
    -   [Dot Indicator ​](#dot-indicator)
        
-   [Background colors ​](#background-colors)
    
-   [Pill badges ​](#pill-badges)
    
-   [Actionable badges ​](#actionable-badges)
    
-   [Component Reference](#component-reference)
    -   [<BBadge>](#b-badge)
        -   [Properties](#)
            
        -   [Slots](#)
            

# Badge [​](#badge)

Documentation and examples for badges, our small count and labeling component.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BBadge/BBadge.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/badge.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#bbadge)

## Examples [​](#examples)

Badges scale to match the size of the immediate parent element by using relative font sizing and em units. As of v5, badges no longer have focus or hover styles for links.

### Headings [​](#headings)

# Example heading New

## Example heading New

### Example heading New

#### Example heading New

##### Example heading New

###### Example heading New

HTML StackBlitz

template

```
<h1>
  Example heading
  <BBadge>New</BBadge>
</h1>
<h2>
  Example heading
  <BBadge>New</BBadge>
</h2>
<h3>
  Example heading
  <BBadge>New</BBadge>
</h3>
<h4>
  Example heading
  <BBadge>New</BBadge>
</h4>
<h5>
  Example heading
  <BBadge>New</BBadge>
</h5>
<h6>
  Example heading
  <BBadge>New</BBadge>
</h6>
```

### Buttons [​](#buttons)

Badges can be used as part of links or buttons to provide a counter.

Notifications 4

HTML StackBlitz

template

```

<BButton variant="primary">
  Notifications
  <BBadge variant="light">4</BBadge>
</BButton>
```

Note that depending on how they are used, badges may be confusing for users of screen readers and similar assistive technologies. While the styling of badges provides a visual cue as to their purpose, these users will simply be presented with the content of the badge. Depending on the specific situation, these badges may seem like random additional words or numbers at the end of a sentence, link, or button.

Unless the context is clear (as with the “Notifications” example, where it is understood that the “4” is the number of notifications), consider including additional context with a visually hidden piece of additional text.

### Positioned [​](#positioned)

Use the `placement` property to position it relative to a parent [link](/bootstrap-vue-next/docs/components/link.html) or [button](/bootstrap-vue-next/docs/components/button.html). Note that for links of buttons, you haveto manually apply the `postition-relative` class to the badge's parent, unlike with [`Avatars`](/bootstrap-vue-next/docs/components/avatar.html) where that is hanlded automatically.

Inbox 99+

HTML StackBlitz

template

```
<BButton
  variant="primary"
  class="position-relative"
>
  Inbox
  <BBadge
    variant="danger"
    class="position-absolute top-0 start-100 translate-middle"
    >99+</BBadge
  >
</BButton>
```

### Dot Indicator [​](#dot-indicator)

The `Badge` component also implements a `dot-indicator` property to transform the badge into a more generic indicator. Please note that you have to manually apply the `position-relative` class to the parent button.

Inbox

HTML StackBlitz

template

```
<BButton
  variant="primary"
  class="position-relative"
>
  Inbox
  <BBadge
    dot-indicator
    variant="danger"
    class="position-absolute top-0 start-100 translate-middle"
  />
</BButton>
```

## Background colors [​](#background-colors)

PrimarySecondarySuccessDangerWarningInfoLightDark

HTML StackBlitz

template

```
  <BBadge>Primary</BBadge>
  <BBadge variant="secondary">Secondary</BBadge>
  <BBadge variant="success">Success</BBadge>
  <BBadge variant="danger">Danger</BBadge>
  <BBadge variant="warning">Warning</BBadge>
  <BBadge variant="info">Info</BBadge>
  <BBadge variant="light">Light</BBadge>
  <BBadge variant="dark">Dark</BBadge>
</div>
```

Conveying meaning to assistive technologies

Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies – such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (e.g. the visible text), or is included through alternative means, such as additional text hidden with the `.visually-hidden` class.

Interactions between Variant props

`BBadge` implements `bg-variant` and `text-variant` to provide finer control of colors, they take precedence over the `variant` prop. See the [Color Variant Reference](/bootstrap-vue-next/docs/reference/color-variants.html#variant-interactions) for details.

## Pill badges [​](#pill-badges)

Use the `pill` prop to make badges more rounded with a larger border-radius. <<< DEMO ./demo/BadgePill.vue#template

## Actionable badges [​](#actionable-badges)

Quickly provide actionable badges by specifying either the `href` prop (links) or `to` prop (router-links):

Notifications 4

HTML StackBlitz

template

```
<div>
  <BButton variant="primary">
    Notifications
    <BBadge>4</BBadge>
  </BButton>
</div>
```

## Component Reference

### `<BBadge>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BBadge/BBadge.vue)

-   [<BBadge> Properties](#comp-reference-bbadge-properties)
-   [<BBadge> Slots](#comp-reference-bbadge-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.badge`

##### [Properties](#comp-reference-bbadge-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| bg-variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to background of the component |
| dot-indicator | `boolean` | `'false'` | Indication position and dot styling applied |
| pill | `boolean` | `'false'` | When set to 'true', renders the badge in pill style |
| placement | `CombinedPlacement` | `undefined` | Placement of the badge relative to its parent. One of the values of \`CombinedPlacement\` |
| tag | `string` | `'span'` | Specify the HTML tag to render instead of the default tag |
| text-variant | `TextColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the text |
| variant | `ColorVariant | null` | `'secondary'` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

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
| router-tag | `string` | `'a'` | Set the tag type for the link |
| stretched | `boolean` | `false` | When set to \`true\`, makes the link's \`containing block\` clickable via an \`::after\` pseudo element |
| target | `LinkTarget` | `undefined` | Sets the 'target' attribute on the rendered link |
| to | `RouteLocationRaw` | `undefined` | Denotes the target route of the link. When clicked, the value of the to prop will be passed to \`router.push()\` internally |
| underline-offset | `1 | 2 | 3 | '1' | '2' | '3'` | `undefined` | Change the distance of the underline from the bottom of the link text |
| underline-offset-hover | `1 | 2 | 3 | '1' | '2' | '3'` | `undefined` | Change the distance of the underline from the bottom of the link text on hover |
| underline-opacity | `0 | 10 | 25 | 50 | 75 | 100 | '0' | '10' | '25' | '50' | '75' | '100'` | `undefined` | Set's the opacity of the link's underline |
| underline-opacity-hover | `0 | 10 | 25 | 50 | 75 | 100 | '0' | '10' | '25' | '50' | '75' | '100'` | `undefined` | Set's the opacity of the link's underline on hover |
| underline-variant | `ColorVariant | null` | `null` | Set the color variant for the link underline independently of the link text |
| variant | `ColorVariant | null` | `null` | Set the color variant for the link |

##### [Slots](#comp-reference-bbadge-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the badge |
