# Accordion ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/accordion.html

##### On this page

-   [How it works ​](#how-it-works)
    
-   [Example ​](#example)
    -   [Flush ​](#flush)
        
    -   [Always open ​](#always-open)
        
-   [Component Reference](#component-reference)
    -   [<BAccordion>](#b-accordion)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
    -   [<BAccordionItem>](#b-accordion-item)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            

# Accordion [​](#accordion)

Build vertically collapsing accordions in combination with `BCollapse` component.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BAccordion/BAccordion.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/accordion.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#baccordion)

## How it works [​](#how-it-works)

The `BAccordionItem` uses the `BCollapse` component internally to make it collapsible. To render an accordion that’s expanded, add the `visible` property on the `BAccordionItem` component.

The animation effect of this component is dependent on the prefers-reduced-motion media query. See the [reduced motion section of bootstrap's accessibility documentation](https://getbootstrap.com/docs/5.3/getting-started/accessibility/#reduced-motion).

## Example [​](#example)

Click the accordions below to expand/collapse the accordion content.

## Accordion Item #1

**This is the first item's accordion body.** It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It is also worth noting that just about any HTML can go within the `.accordion-body`, though the transition does limit overflow.

## Accordion Item #2

**This is the second item's accordion body.** It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It is also worth noting that just about any HTML can go within the `.accordion-body`, though the transition does limit overflow.

## Accordion Item #3

**This is the third item's accordion body.** It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It is also worth noting that just about any HTML can go within the `.accordion-body`, though the transition does limit overflow.

HTML StackBlitz

template

```
<BAccordion>
  <BAccordionItem
    title="Accordion Item #1"
    visible
  >
    <strong>This is the first item's accordion body.</strong> It is shown by default, until the
    collapse plugin adds the appropriate classes that we use to style each element. These classes
    control the overall appearance, as well as the showing and hiding via CSS transitions. You can
    modify any of this with custom CSS or overriding our default variables. It is also worth
    noting that just about any HTML can go within the <code>.accordion-body</code>, though the
    transition does limit overflow.
  </BAccordionItem>
  <BAccordionItem title="Accordion Item #2">
    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the
    collapse plugin adds the appropriate classes that we use to style each element. These classes
    control the overall appearance, as well as the showing and hiding via CSS transitions. You can
    modify any of this with custom CSS or overriding our default variables. It is also worth
    noting that just about any HTML can go within the <code>.accordion-body</code>, though the
    transition does limit overflow.
  </BAccordionItem>
  <BAccordionItem title="Accordion Item #3">
    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the
    collapse plugin adds the appropriate classes that we use to style each element. These classes
    control the overall appearance, as well as the showing and hiding via CSS transitions. You can
    modify any of this with custom CSS or overriding our default variables. It is also worth
    noting that just about any HTML can go within the <code>.accordion-body</code>, though the
    transition does limit overflow.
  </BAccordionItem>
</BAccordion>
```

### Flush [​](#flush)

Add `flush` property to remove the default background-color, some borders, and some rounded corners to render accordions edge-to-edge with their parent container.

## Accordion Item #1

Placeholder content for this accordion, which is intended to demonstrate the `flush` property. This is the first item's accordion body.

## Accordion Item #2

Placeholder content for this accordion, which is intended to demonstrate the `flush` property. This is the second item's accordion body. Let's imagine this being filled with some actual content.

## Accordion Item #3

Placeholder content for this accordion, which is intended to demonstrate the `flush` property. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.

HTML StackBlitz

template

```
<BAccordion flush>
  <BAccordionItem title="Accordion Item #1">
    Placeholder content for this accordion, which is intended to demonstrate the
    <code>flush</code> property. This is the first item's accordion body.
  </BAccordionItem>
  <BAccordionItem title="Accordion Item #2">
    Placeholder content for this accordion, which is intended to demonstrate the
    <code>flush</code> property. This is the second item's accordion body. Let's imagine this
    being filled with some actual content.
  </BAccordionItem>
  <BAccordionItem title="Accordion Item #3">
    Placeholder content for this accordion, which is intended to demonstrate the
    <code>flush</code> property. This is the third item's accordion body. Nothing more exciting
    happening here in terms of content, but just filling up the space to make it look, at least at
    first glance, a bit more representative of how this would look in a real-world application.
  </BAccordionItem>
</BAccordion>
```

### Always open [​](#always-open)

Add `free` property to make accordion items stay open when another item is opened.

## Accordion Item #1

**This is the first item's accordion body.** It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It is also worth noting that just about any HTML can go within the `default` slot, though the transition does limit overflow.

## Accordion Item #2

**This is the second item's accordion body.** It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It is also worth noting that just about any HTML can go within the `default` slot, though the transition does limit overflow.

## Accordion Item #3

**This is the third item's accordion body.** It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It is also worth noting that just about any HTML can go within the `default` slot, though the transition does limit overflow.

HTML StackBlitz

template

```
<BAccordion free>
  <BAccordionItem title="Accordion Item #1">
    <strong>This is the first item's accordion body.</strong> It is shown by default, until the
    collapse plugin adds the appropriate classes that we use to style each element. These classes
    control the overall appearance, as well as the showing and hiding via CSS transitions. You can
    modify any of this with custom CSS or overriding our default variables. It is also worth
    noting that just about any HTML can go within the <code>default</code> slot, though the
    transition does limit overflow.
  </BAccordionItem>
  <BAccordionItem title="Accordion Item #2">
    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the
    collapse plugin adds the appropriate classes that we use to style each element. These classes
    control the overall appearance, as well as the showing and hiding via CSS transitions. You can
    modify any of this with custom CSS or overriding our default variables. It is also worth
    noting that just about any HTML can go within the <code>default</code> slot, though the
    transition does limit overflow.
  </BAccordionItem>
  <BAccordionItem title="Accordion Item #3">
    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the
    collapse plugin adds the appropriate classes that we use to style each element. These classes
    control the overall appearance, as well as the showing and hiding via CSS transitions. You can
    modify any of this with custom CSS or overriding our default variables. It is also worth
    noting that just about any HTML can go within the <code>default</code> slot, though the
    transition does limit overflow.
  </BAccordionItem>
</BAccordion>
```

## Component Reference

### `<BAccordion>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BAccordion/BAccordion.vue)

-   [<BAccordion> Properties](#comp-reference-baccordion-properties)
-   [<BAccordion> Events](#comp-reference-baccordion-events)
-   [<BAccordion> Slots](#comp-reference-baccordion-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.accordion`

##### [Properties](#comp-reference-baccordion-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| flush | `boolean` | `false` | Removes the default background color, certain borders, and rounded corners to render accordions edge-to-edge with their parent container |
| free | `boolean` | `false` | Accordion items will stay open when another item is opened |
| id | `string` | `undefined` | The Id to be injected to accordion items and used in BCollapse for state management |
| index | `number | number[]` | `undefined` | Index of the accordion item that is open |
| initial-animation | `boolean` | `false` | When set, enables the initial animation on mount |
| lazy | `boolean` | `false` | When set, the content will not be mounted until opened |
| model-value | `string | string[]` | `undefined` | Id of the accordion item that is open |
| unmount-lazy | `boolean` | `false` | When set and \`lazy\` is true, the content will be unmounted when closed |

##### [Events](#comp-reference-baccordion-events)

| Event | Args | Description |
| --- | --- | --- |
| update:index | 
`value``: number | number[]` - Index of the accordion item that is open

 | Update the index of the accordion item that is open |
| update:model-value | 

`value``: string | string[]` - Id of the accordion item that is open

 | Update the currently opened accordion item |

##### [Slots](#comp-reference-baccordion-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the Accordion |

### `<BAccordionItem>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BAccordion/BAccordionItem.vue)

-   [<BAccordionItem> Properties](#comp-reference-baccordionitem-properties)
-   [<BAccordionItem> Events](#comp-reference-baccordionitem-events)
-   [<BAccordionItem> Slots](#comp-reference-baccordionitem-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.accordion‑item`

##### [Properties](#comp-reference-baccordionitem-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| body-attrs | `Readonly<AttrsValue>` | `undefined` | Attributes to be applied to the body of the component |
| body-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the body |
| button-attrs | `Readonly<AttrsValue>` | `undefined` | Attributes to be applied to the button in header |
| button-class | `ClassValue` | `undefined` | Class to be applied to the button in header |
| collapse-class | `ClassValue` | `undefined` | Class to be applied to the collapse |
| header-attrs | `Readonly<AttrsValue>` | `undefined` | Attributes to be applied to the header element |
| header-class | `ClassValue` | `undefined` | Class to be applied to the header element |
| header-tag | `string` | `'h2'` | Tag to be used for the header element |
| horizontal | `boolean` | `undefined` | Transition the \`width\` instead of \`height\` and set a \`width\` on the immediate child element |
| id | `string` | `undefined` | The Id to be injected to accordion items and used in BCollapse for state management |
| is-nav | `boolean` | `undefined` | When set, signifies that the accordion is part of a navbar, enabling certain features for navbar support |
| lazy | `boolean` | `false` | When set, the content will not be mounted until opened |
| model-value | `boolean` | `false` | Controls the visibility of the component |
| show | `boolean` | `false` | When set, and prop 'visible' is false on mount, will animate from closed to open on initial mount. Mainly to help with template show. Use model-value for reactive show/hide |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |
| title | `string` | `undefined` | Text to place in the header of the AccordionItem (title slot takes precedence) |
| unmount-lazy | `boolean` | `false` | When set and \`lazy\` is true, the content will be unmounted when closed |
| visible | `boolean` | `false` | When 'true', open without animation |
| wrapper-attrs | `Readonly<AttrsValue>` | `undefined` | Attributes to be applied to the wrapper element |

##### [Events](#comp-reference-baccordionitem-events)

| Event | Args | Description |
| --- | --- | --- |
| hidden | 
`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Always emits after the component is hidden |
| hide | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Always emits just before the component has hidden. Cancelable (as long as component wasn't forcibly hidden) |
| hide-prevented | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the component tried to close, but was prevented from closing. This occurs when preventDefault() is called on the event, the user clicks escape and no-close-onbackdrop is set to true, or the user clicks on the backdrop and no-close-onbackdrop is set to true. |
| show | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Always emits just before the component is shown. Cancelable |
| show-prevented | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the component tried to open, but was prevented from opening. This occurs when preventDefault() is called on the event |
| shown | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Always emits just after component is shown. |
| toggle | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Always emits just before the component is toggled via the exposed 'toggle()' function or useToggle composable . Cancelable (as long as component wasn't forcibly hidden) |
| toggle-prevented | 

`value``: BvTriggerableEvent` - The BvTriggerableEvent object. Includes event details and cancellation support via \`preventDefault()\`

 | Emitted when the component tried to toggle, but was prevented from doing so. This occurs when preventDefault() is called on the event, the user clicks escape and no-close-onbackdrop is set to true, or the user clicks on the backdrop and no-close-onbackdrop is set to true. |
| update:model-value | 

`value``: boolean` - Current visibility state of the AccordionItem

 | Emitted when the visibility of the AccordionItem is changed |

##### [Slots](#comp-reference-baccordionitem-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the AccordionItem |
| title |  | Content to place in the header of the AccordionItem |
