# Types ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/types

##### On this page

-   [Alignment ​](#alignment)
    
-   [AriaInvalid ​](#ariainvalid)
    
-   [AttrsValue ​](#attrsvalue)
    
-   [BodyProp ​](#bodyprop)
    
-   [BreadcrumbItem ​](#breadcrumbitem)
    
-   [Breakpoint ​](#breakpoint)
    
-   [ButtonType ​](#buttontype)
    
-   [ButtonVariant ​](#buttonvariant)
    
-   [CheckboxOption ​](#checkboxoption)
    
-   [CheckboxOptionRaw ​](#checkboxoptionraw)
    
-   [CheckboxValue ​](#checkboxvalue)
    
-   [ClassValue ​](#classvalue)
    
-   [ColorVariant ​](#colorvariant)
    
-   [ColsNumbers ​](#colsnumbers)
    
-   [CombinedPlacement ​](#combinedplacement)
    
-   [ContainerPosition ​](#containerposition)
    
-   [InputType ​](#inputtype)
    
-   [LinkDecorators ​](#linkdecorators)
    
-   [LinkTarget ​](#linktarget)
    
-   [MaybePromise ​](#maybepromise)
    
-   [Placement ​](#placement)
    
-   [Position ​](#position)
    
-   [PopoverPlacement ​](#popoverplacement)
    
-   [RadioOption ​](#radiooption)
    
-   [RadioOptionRaw ​](#radiooptionraw)
    
-   [RadioValue ​](#radiovalue)
    
-   [RadiusElement ​](#radiuselement)
    
-   [RadiusElementExtendables ​](#radiuselementextendables)
    
-   [ScrollspyList ​](#scrollspylist)
    
-   [SelectValue ​](#selectvalue)
    
-   [Size ​](#size)
    
-   [SpinnerType ​](#spinnertype)
    
-   [TableField ​](#tablefield)
    
-   [TableItem ​](#tableitem)
    
-   [TableProvider ​](#tableprovider)
    
-   [TableSortBy ​](#tablesortby)
    
-   [TextColorVariant ​](#textcolorvariant)
    
-   [TransitionMode ​](#transitionmode)
    
-   [VerticalAlign ​](#verticalalign)
    
-   [Extending types ​](#extending-types)
    

# Types [​](#types)

BootstrapVueNext is a complete rewrite that strives for full TypeScript compatibility. This is a list of types we use in this library and that you can use too.

[Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/types.md)

## Alignment [​](#alignment)

ts

```
type AlignmentCommon = 'start' | 'end' | 'center' | 'fill'
type AlignmentContent = AlignmentCommon | 'between' | 'around' | 'stretch'
type AlignmentHorizontal = AlignmentCommon | 'between' | 'around'
type AlignmentJustifyContent = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
type AlignmentTextHorizontal = 'start' | 'end' | 'center'
type AlignmentVertical = AlignmentCommon | 'baseline' | 'stretch'
type VerticalAlign = 'baseline' | 'top' | 'middle' | 'bottom' | 'text-top' | 'text-bottom'
type ContainerVerticalAlign = Exclude<VerticalAlign, 'baseline' | 'text-top' | 'text-bottom'>
type ContainerHorizontalAlign = 'start' | 'center' | 'end'
type ContainerPosition = `${ContainerVerticalAlign}-${ContainerHorizontalAlign}`
```

## AriaInvalid [​](#ariainvalid)

ts

```
type AriaInvalid = boolean | 'grammar' | 'spelling'
```

## AttrsValue [​](#attrsvalue)

ts

```
type AttrsValue = Record<string, any>
```

## BodyProp [​](#bodyprop)

This type is only used for the Toast component.

ts

```
type BodyProp =
  | string
  | VNode<
      RendererNode,
      RendererElement,
      {
        [key: string]: any
      }
    >
  | undefined
```

## BreadcrumbItem [​](#breadcrumbitem)

This type is only used for the Breadcrumb component.

ts

```
interface BreadcrumbItem {
  active?: boolean
  disabled?: boolean
  href?: string
  text: string
  to?: string | Record<string, any>
}
type BreadcrumbItemRaw = BreadcrumbItem | string
```

## Breakpoint [​](#breakpoint)

ts

```
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
```

## ButtonType [​](#buttontype)

ts

```
type ButtonType = 'button' | 'submit' | 'reset'
```

## ButtonVariant [​](#buttonvariant)

ts

```
type ButtonVariant =
  | ColorVariant
  | 'link'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-light'
  | 'outline-dark'
```

## CheckboxOption [​](#checkboxoption)

ts

```
type CheckboxOption = {
  text: string
  value: CheckboxValue
  disabled?: boolean
}
```

## CheckboxOptionRaw [​](#checkboxoptionraw)

ts

```
type CheckboxOptionRaw = string | number | (Partial<CheckboxOption> & Record<string, unknown>)
```

## CheckboxValue [​](#checkboxvalue)

ts

```
type CheckboxValue =
  | readonly unknown[]
  | ReadonlySet<unknown>
  | string
  | boolean
  | Readonly<Record<string, unknown>>
  | number
  | null
```

## ClassValue [​](#classvalue)

ts

```
export type ClassValue = any
```

## ColorVariant [​](#colorvariant)

ts

```
type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
```

## ColsNumbers [​](#colsnumbers)

ts

```
export type ColsBaseNumbers = 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5'

export type ColsNumbers =
  | ColsBaseNumbers
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'

export type GutterNumbers = ColsBaseNumbers | 0 | '0'

export type ColsOrderNumbers = ColsBaseNumbers | 'first' | 'last'

export type ColsOffsetNumbers = ColsNumbers | 0 | '0'
```

## CombinedPlacement [​](#combinedplacement)

ts

```
type CombinedPlacement = Placement | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
```

## ContainerPosition [​](#containerposition)

ts

```
type ContainerVerticalAlign = Exclude<VerticalAlign, 'baseline' | 'text-top' | 'text-bottom'>
type ContainerHorizontalAlign = 'left' | 'center' | 'right'
type ContainerPosition = `${ContainerVerticalAlign}-${ContainerHorizontalAlign}`
```

## InputType [​](#inputtype)

ts

```
type InputType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'search'
  | 'url'
  | 'tel'
  | 'date'
  | 'time'
  | 'range'
  | 'color'
  | 'datetime'
  | 'datetime-local'
  | 'month'
  | 'week'
```

## LinkDecorators [​](#linkdecorators)

ts

```
type LinkOpacity = 10 | 25 | 50 | 75 | 100 | '10' | '25' | '50' | '75' | '100'
type UnderlineOpacity = 0 | '0' | LinkOpacity
type UnderlineOffset = 1 | 2 | 3 | '1' | '2' | '3'
```

## LinkTarget [​](#linktarget)

ts

```
type LinkTarget = '_self' | '_blank' | '_parent' | '_top'
```

## MaybePromise [​](#maybepromise)

ts

```
type MaybePromise<T> = Promise<T> | T
```

## Placement [​](#placement)

ts

```
type Placement = 'top' | 'bottom' | 'start' | 'end'
```

## Position [​](#position)

ts

```
type Position =
  | 'position-static'
  | 'position-relative'
  | 'position-absolute'
  | 'position-fixed'
  | 'position-sticky'
```

## PopoverPlacement [​](#popoverplacement)

ts

```
type PopoverPlacement = Placement | 'auto' | 'auto-start' | 'auto-end'
```

Where `Placement` is defined in [@floating-ui/vue](https://floating-ui.com/) as

ts

```
type Placement =
  | 'top'
  | 'bottom'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end'
```

## RadioOption [​](#radiooption)

ts

```
type RadioOption = {
  text: string
  value: RadioValue
  disabled?: boolean
}
```

## RadioOptionRaw [​](#radiooptionraw)

ts

```
type RadioOptionRaw = string | number | (Partial<RadioOption> & Record<string, unknown>)
```

## RadioValue [​](#radiovalue)

ts

```
type RadioValue =
  | boolean
  | string
  | readonly unknown[]
  | Readonly<Record<string, unknown>>
  | number
  | null
```

## RadiusElement [​](#radiuselement)

ts

```
type RadiusElement =
  | 'circle'
  | 'pill'
  | 'none'
  | 'sm'
  | 'md'
  | 'lg'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
```

## RadiusElementExtendables [​](#radiuselementextendables)

ts

```
type RadiusElementExtendables = {
  rounded?: boolean | RadiusElement
  roundedTop?: boolean | RadiusElement
  roundedBottom?: boolean | RadiusElement
  roundedStart?: boolean | RadiusElement
  roundedEnd?: boolean | RadiusElement
}
```

## ScrollspyList [​](#scrollspylist)

This type is used by the `useScrollspy` composable to represent tracked elements.

ts

```
type ScrollspyListItem = {
  id: string | null // Element ID
  el: HTMLElement | null // DOM element reference
  visible: boolean // Whether element is currently visible
  text: string | null // Text content of the element
}

type ScrollspyList = ScrollspyListItem[]
```

## SelectValue [​](#selectvalue)

ts

```
type SelectValue =
  | boolean
  | string
  | readonly unknown[]
  | Readonly<Record<string, unknown>>
  | number
  | null
```

## Size [​](#size)

ts

```
type Size = 'sm' | 'md' | 'lg'
```

## SpinnerType [​](#spinnertype)

ts

```
type SpinnerType = 'border' | 'grow'
```

## TableField [​](#tablefield)

ts

```
type TableFieldFormatter<T = any> = (obj: {value: unknown; key: string; item: T}) => string

type TableRowType = 'row' | 'row-expansion' | 'row-top' | 'row-bottom' | 'table-busy'
type TableRowThead = 'top' | 'bottom'
type BTableInitialSortDirection = 'desc' | 'asc' | 'last'

interface TableField<T = Record<string, unknown>> {
  /**
   * Unique identifier for the column.
   * Must be a simple string (no nested paths like 'name.first').
   * Used for slot names and column tracking.
   */
  key: string
  /**
   * Optional accessor for reading values from row items.
   * - String: root-level property name (e.g., 'email')
   * - Function: for nested/computed values (e.g., (item) => item.name.first)
   * - If omitted: defaults to using key
   */
  accessor?: string | ((item: T) => unknown)
  label?: string
  class?: ClassValue
  filterByFormatted?: boolean | TableFieldFormatter<T>
  formatter?: TableFieldFormatter<T>
  headerAbbr?: string
  headerTitle?: string
  initialSortDirection?: BTableInitialSortDirection
  isRowHeader?: boolean
  sortable?: boolean
  sortByFormatted?: boolean | TableFieldFormatter<T>
  sortCompare?: BTableSortByComparerFunction<T>
  stickyColumn?: boolean
  tdAttr?: AttrsValue | ((obj: {value: unknown; key: string; item: T}) => AttrsValue)
  tdClass?: ClassValue
  thAttr?:
    | AttrsValue
    | ((obj: {value: unknown; key: string; item: T | null; type: TableRowThead}) => AttrsValue)
  thClass?: ClassValue
  thStyle?: StyleValue
  variant?: ColorVariant | null
}
type TableFieldRaw<T = Record<string, unknown>> = string | TableField<T>
```

## TableItem [​](#tableitem)

ts

```
type TableItem<T = Record<string, unknown>> = T & {
  _rowVariant?: ColorVariant
  _cellVariants?: Partial<Record<keyof T, ColorVariant>>
}
```

## TableProvider [​](#tableprovider)

ts

```
type BTableProviderContext<T = unknown> = {
  sortBy: BTableSortBy<T>[] | undefined
  filter: string | undefined
  currentPage: number
  perPage: number
}

type BTableProvider<T> = (
  context: Readonly<BTableProviderContext<T>>
) => MaybePromise<T[] | undefined>
```

## TableSortBy [​](#tablesortby)

ts

```
type BTableSortByOrder = 'desc' | 'asc' | undefined
type BTableSortByComparerFunction<T = any> = (a: T, b: T, key: string) => number
type BTableSortBy<T = any> = {
  order: BTableSortByOrder
  key: string
}
```

## TextColorVariant [​](#textcolorvariant)

ts

```
type TextColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'white'
  | 'body'
  | 'muted'
  | 'black-50'
  | 'white-50'
  | 'reset'
```

## TransitionMode [​](#transitionmode)

ts

```
type TransitionMode = 'in-out' | 'out-in'
```

## VerticalAlign [​](#verticalalign)

ts

```
type VerticalAlign = 'baseline' | 'top' | 'middle' | 'bottom' | 'text-top' | 'text-bottom'
```

## Extending types [​](#extending-types)

You can extend some types to use your own values (e.g. colors, sizes). This requires the use of interface augmentation. You can augment next interfaces:

-   BaseColorVariant
-   BaseButtonVariant (extends BaseColorVariant)
-   BaseTextColorVariant (extends BaseColorVariant)
-   BaseSize

Suppose we want to add a purple style and extra-large (xl) sizes. We need to create a declaration file in the root of vue project.

ts

```
// shims-bootstrap-vue-next.d.ts

import 'bootstrap-vue-next'

declare module 'bootstrap-vue-next' {
  export interface BaseColorVariant {
    purple: unknown // we use unknown type because it does not matter here
  }
  export interface BaseButtonVariant {
    // there is no need to add "purple" (it inherits from BaseColorVariant)
    'outline-purple': unknown // outline purple button
  }
  export interface BaseTextColorVariant {
    // there is no need to add "purple" (it inherits from BaseColorVariant)
  }
  export interface BaseSize {
    xl: unknown // extra large
  }
}
```

New values can be used now and the type check will be successful:

template

```
<BButton variant="purple" size="xl">Extra large purple button</BButton>
<BButton variant="outline-purple">Outline purple button</BButton>
```
