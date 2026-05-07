# Aspect ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/aspect.html

##### On this page

-   [Overview ​](#overview)
    
-   [Component Reference](#component-reference)
    -   [<BAspect>](#b-aspect)
        -   [Properties](#)
            
        -   [Slots](#)
            

# Aspect [​](#aspect)

The <BAspect> component can be used to maintain a minimum responsive aspect ratio for content. When the content is longer than the available height, then the component will expand vertically to fit all content. If the content is shorter than the computed aspect height, the component will ensure a minimum height is maintained.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BAspect/BAspect.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/aspect.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#baspect)

## Overview [​](#overview)

The default aspect ratio is 1:1 (ratio of 1), which makes the height always be at least the same as the width. The aspect prop can be used to specify an arbitrary aspect ratio (i.e. 1.5) or a ratio as a string such as '16:9' or '4:3'.

The width will always be 100% of the available width in the parent element/component.

Content placed in a 16:9 container

HTML StackBlitz

template

```
<BAspect aspect="16:9">
  <div class="bg-secondary d-flex align-items-center justify-content-center text-white h-100">
    Content placed in a 16:9 container
  </div>
</BAspect>
```

## Component Reference

### `<BAspect>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BAspect/BAspect.vue)

-   [<BAspect> Properties](#comp-reference-baspect-properties)
-   [<BAspect> Slots](#comp-reference-baspect-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.aspect`

##### [Properties](#comp-reference-baspect-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aspect | `string | number` | `'1:1'` | Aspect ratio of the container, eg: 16/9, 16:9, 16x9, 1.77 |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |

##### [Slots](#comp-reference-baspect-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the aspect container. |
