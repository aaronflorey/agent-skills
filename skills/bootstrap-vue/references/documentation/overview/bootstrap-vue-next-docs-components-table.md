# Table ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/table.html

##### On this page

-   [Basic Usage ​](#basic-usage)
    
-   [Items (record data) ​](#items-record-data)
    -   [Example: Using variants for table cells ​](#example-using-variants-for-table-cells)
        
    -   [Table item notes and warnings ​](#table-item-notes-and-warnings)
        
-   [Fields (column definitions) ​](#fields-column-definitions)
    -   [Fields as a simple array ​](#fields-as-a-simple-array)
        
    -   [Fields as an array of objects ​](#fields-as-an-array-of-objects)
        
    -   [Accessing nested and computed data ​](#accessing-nested-and-computed-data)
        
    -   [Field Definition Reference ​](#field-definition-reference)
        
-   [Primary Key ​](#primary-key)
    -   [Table row ID generation ​](#table-row-id-generation)
        
    -   [Table render and transition optimization ​](#table-render-and-transition-optimization)
        
-   [Table Style Options ​](#table-style-options)
    -   [Table styling ​](#table-styling)
        
    -   [Fixed table layout ​](#fixed-table-layout)
        
    -   [Row styling and attributes ​](#row-styling-and-attributes)
        
    -   [Responsive tables ​](#responsive-tables)
        
    -   [Stacked tables ​](#stacked-tables)
        
    -   [Table caption ​](#table-caption)
        
    -   [Table colgroup ​](#table-colgroup)
        
    -   [Table busy state ​](#table-busy-state)
        -   [table-busy slot ​](#table-busy-slot)
            
-   [Custom data rendering ​](#custom-data-rendering)
    -   [Scoped field slots ​](#scoped-field-slots)
        -   [Displaying raw HTML ​](#displaying-raw-html)
            
    -   [Formatter callback ​](#formatter-callback)
        
-   [Header and Footer custom rendering via scoped slots ​](#header-and-footer-custom-rendering-via-scoped-slots)
    -   [Adding additional rows to the header ​](#adding-additional-rows-to-the-header)
        
    -   [Creating a custom footer ​](#creating-a-custom-footer)
        
-   [Custom empty and empty-filtered rendering ​](#custom-empty-and-empty-filtered-rendering)
    
-   [Advanced Features ​](#advanced-features)
    -   [Sticky headers ​](#sticky-headers)
        
    -   [Sticky columns ​](#sticky-columns)
        
    -   [Row expansion support ​](#row-expansion-support)
        
    -   [Row select support ​](#row-select-support)
        
    -   [Exposed API ​](#exposed-api)
        
-   [Sorting ​](#sorting)
    -   [Change initial sort direction ​](#change-initial-sort-direction)
        
    -   [Custom Sort Comparers ​](#custom-sort-comparers)
        
    -   [Sort Icon Positioning ​](#sort-icon-positioning)
        
    -   [Customizing Sort Icons ​](#customizing-sort-icons)
        -   [CSS Custom Properties ​](#css-custom-properties)
            
        -   [Header Scoped Slots ​](#header-scoped-slots)
            
        -   [Disabling Sort Icons ​](#disabling-sort-icons)
            
-   [Filtering ​](#filtering)
    -   [Built in filtering ​](#built-in-filtering)
        
    -   [Built in filtering options ​](#built-in-filtering-options)
        
    -   [Custom filter function ​](#custom-filter-function)
        
-   [Pagination and Filtering ​](#pagination-and-filtering)
    -   [Pagination ​](#pagination)
        
    -   [Filter events ​](#filter-events)
        
-   [Using items provider functions ​](#using-items-provider-functions)
    -   [Debouncing Provider Calls ​](#debouncing-provider-calls)
        
    -   [Handling Request Cancellation ​](#handling-request-cancellation)
        
-   [Light-weight tables ​](#light-weight-tables)
    
-   [Simple tables ​](#simple-tables)
    -   [Simple tables and stacked mode ​](#simple-tables-and-stacked-mode)
        
    -   [Simple tables and sticky columns ​](#simple-tables-and-sticky-columns)
        
-   [Table Helper Components ​](#table-helper-components)
    
-   [Accessibility ​](#accessibility)
    -   [Heading accessibility ​](#heading-accessibility)
        
    -   [Data row accessibility ​](#data-row-accessibility)
        
    -   [Row event accessibility ​](#row-event-accessibility)
        
-   [Complete Example ​](#complete-example)
    
-   [Component Reference](#component-reference)
    -   [<BTable>](#b-table)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            
    -   [<BTableLite>](#b-table-lite)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
        -   [Exposed](#)
            
    -   [<BTableSimple>](#b-table-simple)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BTbody>](#b-tbody)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BTd>](#b-td)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BTfoot>](#b-tfoot)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BTh>](#b-th)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BThead>](#b-thead)
        -   [Properties](#)
            
        -   [Slots](#)
            
    -   [<BTr>](#b-tr)
        -   [Properties](#)
            
        -   [Slots](#)
            

# Table [​](#table)

For displaying tabular data, `BTable` supports pagination, filtering, sorting, custom rendering, various style options, events, and asynchronous data. For simple display of tabular data without all the fancy features, BootstrapVueNext provides two lightweight alternative components [`BTableLite`](#light-weight-tables) and [`BTableSimple`](#simple-tables).

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BTable/BTable.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/table.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#btable)

## Basic Usage [​](#basic-usage)

| Age | First name | Last name |
| --- | --- | --- |
| 40 | Dickerson | Macdonald |
| 21 | Larsen | Shaw |
| 89 | Geneva | Wilson |
| 38 | Jami | Carney |

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      striped
      hover
      :items="items"
    />
  </div>
</template>

<script setup lang="ts">
const items = [
  {age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
  {age: 21, first_name: 'Larsen', last_name: 'Shaw'},
  {age: 89, first_name: 'Geneva', last_name: 'Wilson'},
  {age: 38, first_name: 'Jami', last_name: 'Carney'},
]
</script>
```

## Items (record data) [​](#items-record-data)

`items` is the table data in array format, where each record (row) data are keyed objects. Example format:

ts

```
const items = [
  { age: 32, first_name: 'Cyndi' },
  { age: 27, first_name: 'Havij' },
  { age: 42, first_name: 'Robert' },
]
```

`<BTable>` automatically samples the first row to extract field names (the keys in the record data). Field names are automatically "humanized" by converting `kebab-case`, `snake_case`, and `camelCase` to individual words and capitalizes each word. Example conversions:

-   `first_name` becomes `First Name`
-   `last-name` becomes `Last Name`
-   `age` becomes `Age`
-   `YEAR` remains `YEAR`
-   `isActive` becomes `Is Active`

These titles will be displayed in the table header, in the order they appear in the **first** record of data. See the [Fields](#fields-column-definitions) section below for customizing how field headings appear.

NOTE

Field order is not guaranteed. Fields will typically appear in the order they were defined in the first row, but this may not always be the case depending on the version of browser in use. See section [Fields (column definitions)](#fields-column-definitions) below to see how to guarantee the order of fields, and to override the headings generated.

Record data may also have additional special reserved name keys for colorizing rows and individual cells (variants), and for triggering additional row detail. The type [TableItem](/bootstrap-vue-next/docs/types.html#tableitem) defines the supported optional item record modifier properties (make sure your field keys do not conflict with these names):

| Property | Type | Description |
| --- | --- | --- |
| `_cellVariants` | Partial<Record<keyof T, ColorVariant>> | Bootstrap contextual state applied to individual cells. Keyed by field (See the [Color Variants](/bootstrap-vue-next/docs/reference/color-variants.html) for supported values). These variants map to classes `table-${variant}` or `bg-${variant}` (when the `dark` prop is set). |
| `_rowVariant` | ColorVariant | Bootstrap contextual state applied to the entire row (See the [Color Variants](/bootstrap-vue-next/docs/reference/color-variants.html) for supported values). These variants map to classes `table-${variant}` or `bg-${variant}` (when the `dark` prop is set) |

### Example: Using variants for table cells [​](#example-using-variants-for-table-cells)

| Age | First name | Last name |
| --- | --- | --- |
| 40 | Dickerson | Macdonald |
| 21 | Larsen | Shaw |
| 89 | Geneva | Wilson |
| 40 | Thor | MacDonald |
| 29 | Dick | Dunlap |

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      hover
      :items="items"
    />
  </div>
</template>

<script setup lang="ts">
const items = [
  {age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
  {age: 21, first_name: 'Larsen', last_name: 'Shaw'},
  {
    age: 89,
    first_name: 'Geneva',
    last_name: 'Wilson',
    _rowVariant: 'danger',
  },
  {
    age: 40,
    first_name: 'Thor',
    last_name: 'MacDonald',
    _cellVariants: {age: 'info', first_name: 'warning'},
  },
  {age: 29, first_name: 'Dick', last_name: 'Dunlap'},
]
</script>
```

A provider function can be provided instead of setting `items` to return items syncronously or asyncronously. See the ["Using items Provider functions"](#using-items-provider-functions) section below for more details.

### Table item notes and warnings [​](#table-item-notes-and-warnings)

-   Avoid manipulating record data in place, as changes to the underlying items data will cause either the row or entire table to be re-rendered. See [Primary Key](#primary-key), below, for ways to minimize Vue's re-rendering of rows.
-   `items` array records should be a simple object and **must** avoid placing data that may have circular references in the values within a row. `<BTable>` serializes the row data into strings for sorting and filtering, and circular references will cause stack overflows to occur and your app to crash!

## Fields (column definitions) [​](#fields-column-definitions)

The `fields` prop is used to customize the table columns headings, and in which order the columns of data are displayed. The field object keys (i.e. `age` or `first_name` as shown below) are used to extract the value from each item (record) row, and to provide additional features such as enabling [sorting](#sorting) on the column, etc.

Fields can be provided as a _simple array_ or an _array of objects_. **Internally the fields data will be normalized into the _array of objects_ format**. Events or slots that include the column `field` data will be in the normalized field object format (array of objects for `fields`, or an object for an individual `field`).

### Fields as a simple array [​](#fields-as-a-simple-array)

Fields can be a simple array, for defining the order of the columns, and which columns to display:

| First name | Last name | Age |
| --- | --- | --- |
| Dickerson | Macdonald | 40 |
| Larsen | Shaw | 21 |
| Geneva | Wilson | 89 |
| Jami | Carney | 38 |

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      striped
      hover
      :items="items"
      :fields="fields"
    />
  </div>
</template>

<script setup lang="ts">
// Note `isActive` is left out and will not appear in the rendered table
const fields = ['first_name', 'last_name', 'age']
const items = [
  {isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
  {isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw'},
  {isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson'},
  {isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney'},
]
</script>
```

### Fields as an array of objects [​](#fields-as-an-array-of-objects)

Fields can be a an array of objects, providing additional control over the fields (such as sorting, formatting, etc.). Only columns (keys) that appear in the fields array will be shown:

| Last Name | First Name | Person age |
| --- | --- | --- |
| Macdonald | Dickerson | 40 |
| Shaw | Larsen | 21 |
| Wilson | Geneva | 89 |
| Carney | Jami | 38 |

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      striped
      hover
      :items="items"
      :fields="fields"
    />
  </div>
</template>

<script setup lang="ts">
import type {TableFieldRaw} from 'bootstrap-vue-next'

interface Person {
  first_name: string
  last_name: string
  age: number
  isActive: boolean
}

// Note 'isActive' is left out and will not appear in the rendered table
const fields: TableFieldRaw<Person>[] = [
  {
    key: 'last_name',
    sortable: true,
  },
  {
    key: 'first_name',
    sortable: false,
  },
  {
    key: 'age',
    label: 'Person age',
    sortable: true,
    // Variant applies to the whole column, including the header and footer
    variant: 'danger',
  },
]

const items: Person[] = [
  {isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
  {isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw'},
  {isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson'},
  {isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney'},
]
</script>
```

### Accessing nested and computed data [​](#accessing-nested-and-computed-data)

The `key` property must be a simple string identifier and cannot use nested paths like `name.firstName`. To access nested or computed data from your items, use the `accessor` property:

| ID | First Name | Last Name | Location | Age |
| --- | --- | --- | --- | --- |
| 1 | John | Doe | New York, NY | 30 |
| 2 | Jane | Smith | Los Angeles, CA | 25 |
| 3 | Bob | Johnson | Chicago, IL | 35 |

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      striped
      hover
      :items="items"
      :fields="fields"
    />
  </div>
</template>

<script setup lang="ts">
import type {TableFieldRaw} from 'bootstrap-vue-next'

interface Address {
  street: string
  city: string
  state: string
}

interface Person {
  id: number
  name: {
    first: string
    last: string
  }
  address: Address
  age: number
}

const fields: TableFieldRaw<Person>[] = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'firstName',
    label: 'First Name',
    // Use accessor function for nested property
    accessor: (item) => item.name.first,
  },
  {
    key: 'lastName',
    label: 'Last Name',
    // Use accessor function for nested property
    accessor: (item) => item.name.last,
  },
  {
    key: 'location',
    label: 'Location',
    // Accessor can compute values from multiple properties
    accessor: (item) => `${item.address.city}, ${item.address.state}`,
  },
  {
    key: 'age',
    label: 'Age',
    // Simple root property doesn't need accessor
  },
]

const items: Person[] = [
  {
    id: 1,
    name: {first: 'John', last: 'Doe'},
    address: {street: '123 Main St', city: 'New York', state: 'NY'},
    age: 30,
  },
  {
    id: 2,
    name: {first: 'Jane', last: 'Smith'},
    address: {street: '456 Oak Ave', city: 'Los Angeles', state: 'CA'},
    age: 25,
  },
  {
    id: 3,
    name: {first: 'Bob', last: 'Johnson'},
    address: {street: '789 Pine Rd', city: 'Chicago', state: 'IL'},
    age: 35,
  },
]
</script>
```

The `accessor` can be:

-   A **string** for root-level properties (e.g., `'email'`)
-   A **function** that receives the item and returns the value (recommended for nested or computed values)
-   If omitted, the `key` is used by default

### Field Definition Reference [​](#field-definition-reference)

The following field properties (defined as [TableField](/bootstrap-vue-next/docs/types.html#tableitem)) are recognized:

| Property | Type | Description |
| --- | --- | --- |
| `key` | `string` | **Required.** Unique identifier for the column. Used for generating slot names (e.g., `head(<key>)`, `cell(<key>)`) and tracking column state. This value must be a simple string and does **not** support nested paths like `name.firstName`. For nested or computed data access, use the `accessor` property. See the [migration guide](/bootstrap-vue-next/docs/migration-guide.html#field-definitions) for details on migrating from nested keys. |
| `accessor` | `string | ((item: T) => unknown)` | **Optional.** Specifies how to read the value from each row item. Can be a string representing a root-level property name (e.g., `'email'`), or a function that receives the row item and returns the value (recommended for nested or computed values). If omitted, defaults to using the `key` property. **Note:** String accessors only work for root-level properties; use a function for nested paths (e.g., `(item) => item.name.first`). |
| `label` | `string` | Appears in the columns table header (and footer if `foot-clone` is set). Defaults to the field's key (in humanized format) if not provided. It's possible to use empty labels by assigning an empty string `""` but be sure you also set `headerTitle` to provide non-sighted users a hint about the column contents. |
| `headerTitle` | `string` | Text to place on the fields header `<th>` attribute `title`. Defaults to no `title` attribute. |
| `headerAbbr` | `string` | Text to place on the fields header `<th>` attribute `abbr`. Set this to the unabbreviated version of the label (or title) if label (or title) is an abbreviation. Defaults to no `abbr` attribute. |
| `class` | `ClassValue` | Class name (or array of class names) to add to `<th>` **and** `<td>` in the column. |
| `formatter` | `TableFieldFormatter<T>` | A formatter callback function can be used instead of (or in conjunction with) scoped field slots. The formatter receives a single parameter object with the signature `({value, key, item}) => string`. The `value` is determined by the `accessor` (or `key` if no accessor is provided). Refer to [Custom Data Rendering](#custom-data-rendering) for more details. |
| `sortable` | `boolean` | Enable sorting on this column. Refer to the [Sorting](#sorting) Section for more details. |
| `initialSortDirection` | `BTableInitialSortDirection` | Control the sort direction on this column when it becomes sorted. Refer to the [Change initial sort direction](#change-initial-sort-direction) Section for more details. |
| `sortByFormatted` | `boolean | TableFieldFormatter<T>` | Sort the column by the result of the field's `formatter` callback function when set to `true`. Default is `false`. Boolean has no effect if the field does not have a `formatter`. Optionally accepts a formatter function _reference_ to format the value for sorting purposes only. Refer to the [Sorting](#sorting) Section for more details. |
| `filterByFormatted` | `boolean | TableFieldFormatter<T>` | Filter the column by the result of the field's `formatter` callback function when set to `true`. Default is `false`. Boolean has no effect if the field does not have a `formatter`. Optionally accepts a formatter function _reference_ to format the value for filtering purposes only. Refer to the [Filtering](#filtering) section for more details. |
| `sortCompare` | `BTableSortByComparerFunction` | A custom comparison function for sorting this field. The function signature is `(a: T, b: T, key: string) => number`. If not provided, uses default string comparison. See [Custom Sort Comparers](#custom-sort-comparers) for more details. |
| `tdClass` | `TableStrictClassValue | ((value: unknown, key: string, item: T) => TableStrictClassValue)` | Class name (or array of class names) to add to `<tbody>` data `<td>` cells in the column. If custom classes per cell are required, a callback function can be specified instead. See the typescript definition for accepted parameters and return types. |
| `thClass` | `ClassValue` | Class name (or array of class names) to add to this field's `<thead>`/`<tfoot>` heading `<th>` cell. |
| `thStyle` | `StyleValue` | CSS styles you would like to apply to the table `<thead>`/`<tfoot>` field `<th>` cell. |
| `variant` | `ColorVariant | null` | Apply contextual class to all the `<th>` **and** `<td>` in the column. |
| `tdAttr` | `AttrsValue | (({value, key, item}) => AttrsValue)` | Object representing additional attributes to apply to the `<tbody>` field `<td>` cell. If custom attributes per cell are required, a callback function can be specified. The function receives a single parameter object with properties `{value, key, item}` and should return an object of attributes. |
| `thAttr` | `AttrsValue | (({value, key, item, type}) => AttrsValue)` | Object representing additional attributes to apply to the field's `<thead>`/`<tfoot>` heading `<th>` cell. If the field's `isRowHeader` is set to `true`, the attributes will also apply to the `<tbody>` field `<th>` cell. If custom attributes per cell are required, a callback function can be specified. The function receives a single parameter object with properties `{value, key, item, type}` (where `type` is `'top'` or `'bottom'` for thead/tfoot) and should return an object of attributes. |
| `isRowHeader` | `boolean` | When set to `true`, the field's item data cell will be rendered with `<th>` rather than the default of `<td>`. |
| `stickyColumn` | `boolean` | When set to `true`, and the table in [responsive](#responsive-tables) mode or has [sticky headers](#sticky-headers), will cause the column to become fixed to the left when the table's horizontal scrollbar is scrolled. See [Sticky columns](#sticky-columns) for more details |
| `scope` | `TableThScope` | The scope attribute for the field's `<th>` element. This is used to specify the relationship of the header cell to the data cells. Valid values are `row`, `col`, `rowgroup`, and `colgroup`. Defaults to `colgroup` if `colspan` specified, `rowgroup` if `rowspan` specified, otherwise `col`. |

**Notes:**

-   Field properties, if not present, default to `null` (falsey) unless otherwise stated above.
-   `class`, `thClass`, `tdClass` etc. will not work with classes that are defined in scoped CSS, unless you are using Vue's [Deep selector](https://vuejs.org/api/sfc-css-features.html#deep-selectors).
-   For information on the syntax supported by `thStyle`, see [Class and Style Bindings](https://vuejs.org/guide/essentials/class-and-style.html#Binding-Inline-Styles) in the Vue.js guide.
-   Any additional properties added to the field definition objects will be left intact - so you can access them via the named scoped slots for custom data, header, and footer rendering.

For information and usage about scoped slots and formatters, refer to the [Custom Data Rendering](#custom-data-rendering) section below.

Feel free to mix and match simple array and object array together:

ts

```
const fields = [
  { key: 'first_name', label: 'First' },
  { key: 'last_name', label: 'Last' },
  'age',
  'sex',
]
```

## Primary Key [​](#primary-key)

`<BTable>` provides an additional prop `primary-key`, which you can use to identify the _name_ of the field key that _uniquely_ identifies the row.

The value specified by the primary column key **must be** either a `string` or `number`, and **must be unique** across all rows in the table.

The primary key column does not need to appear in the displayed fields.

### Table row ID generation [​](#table-row-id-generation)

When provided, the `primary-key` will generate a unique ID for each item row `<tr>` element. The ID will be in the format of `{table-id}__row_{primary-key-value}`, where `{table-id}` is the unique ID of the `<BTable>` and `{primary-key-value}` is the value of the item's field value for the field specified by `primary-key`.

### Table render and transition optimization [​](#table-render-and-transition-optimization)

The `primary-key` is also used by `<BTable>` to help Vue optimize the rendering of table rows. Internally, the value of the field key specified by the `primary-key` prop is used as the Vue `:key` value for each rendered item row `<tr>` element.

If you are seeing rendering issue (i.e. tooltips hiding or unexpected subcomponent re-usage when item data changes or data is sorted/filtered/edited) or table row transitions are not working, setting the `primary-key` prop (if you have a unique identifier per row) can alleviate these issues.

Specifying the `primary-key` column is handy if you are using 3rd party table transitions or drag and drop plugins, as they rely on having a consistent and unique per row `:key` value.

If `primary-key` is not provided, `<BTable>` will auto-generate keys based on the displayed row's index number (i.e. position in the _displayed_ table rows). This may cause GUI issues such as sub components/elements that are rendering with previous results (i.e. being re-used by Vue's render patch optimization routines). Specifying a `primary-key` column can alleviate this issue (or you can place a unique `:key` on your element/components in your custom formatted field slots).

Refer to the [Table body transition support](#table-body-transition-support) section for additional details.

## Table Style Options [​](#table-style-options)

### Table styling [​](#table-styling)

`<BTable>` provides several props to alter the style of the table:

| prop | Type | Description |
| --- | --- | --- |
| `striped` | boolean | Add zebra-striping to the table rows within the `<tbody>` |
| `striped-columns` | boolean | Add zebra-striping to the table colums within the `<tbody>` |
| `bordered` | boolean | For borders on all sides of the table and cells. |
| `borderless` | boolean | removes inner borders from table. |
| `outlined` | boolean | For a thin border on all sides of the table. Has no effect if `bordered` is set. |
| `small` | boolean | To make tables more compact by cutting cell padding in half. |
| `hover` | boolean | To enable a hover highlighting state on table rows within a `<tbody>` |
| `dark` | boolean | Invert the colors — with light text on dark backgrounds (equivalent to Bootstrap v5 class `.table-dark`) |
| `fixed` | boolean | Generate a table with equal fixed-width columns (`table-layout: fixed;`) |
| `responsive` | boolean | Breakpoint | Generate a responsive table to make it scroll horizontally. Set to `true` for an always responsive table, or set it to one of the [breakpoints](/bootstrap-vue-next/docs/types.html#breakpoint) `'sm'`, `'md'`, `'lg'`, `'xl'` or `'xxl'` to make the table responsive (horizontally scroll) only on screens smaller than the breakpoint. See [Responsive tables](#responsive-tables) below for details. |
| `sticky-header` | boolean | Numberish | Generates a vertically scrollable table with sticky headers. Set to `true` to enable sticky headers (default table max-height of `300px`), or set it to a string containing a height (with CSS units) to specify a maximum height other than `300px`. See the [Sticky header](#sticky-headers) section below for details. |
| `stacked` | boolean | Breakpoint | Generate a responsive stacked table. Set to `true` for an always stacked table, or set it to one of the [breakpoints](/bootstrap-vue-next/docs/types.html#breakpoint) `'sm'`, `'md'`, `'lg'`, `'xl'` or `'xxl'` to make the table visually stacked only on screens smaller than the breakpoint. See [Stacked tables](#stacked-tables) below for details. |
| `caption-top` | boolean | Numberish | If the table has a caption, and this prop is set to `true`, the caption will be visually placed above the table. If `false` (the default), the caption will be visually placed below the table. |
| `variant` | ColorVariant | null | Give the table an overall theme color variant. |
| `head-variant` | ColorVariant | null | Make the table head a theme color different from the table |
| `foot-row-variant` | ColorVariant | null | Make the table foot a theme color different from the table. If not set, `head-variant` will be used. Has no effect if `foot-clone` is not set |
| `head-row-variant` | ColorVariant | null | Make the only the `<tr>` part of the `<head>` a specific theme color |
| `foot-variant` | ColorVariant | null | Make the only the `<tr>` part of the `<foot>` a specific theme color. If not set, `head-row-variant` will be used. Has no effect if `foot-clone` is not set |
| `foot-clone` | boolean | Turns on the table footer, and defaults with the same contents a the table header |
| `no-border-collapse` | Boolean | Disables the default of collapsing of the table borders. Mainly for use with [sticky headers](#sticky-headers) and/or [sticky columns](#sticky-columns). Will cause the appearance of double borders in some situations. |

NOTE

The table style options `fixed`, `stacked`, `no-border-collapse`, sticky headers, sticky columns and the table sorting feature, all require BootstrapVueNext's custom CSS.

Table Options

Striped

Striped Columns

Bordered

Borderless

Outlined

Small

Hover

Dark

Fixed

Foot Clone

No border collapse

Variant

\-- None --PrimarySecondaryInfoDangerWarningSuccessLightDark

Head Variant

\-- None --PrimarySecondaryInfoDangerWarningSuccessLightDark

Foot Variant

\-- None --PrimarySecondaryInfoDangerWarningSuccessLightDark

| First name | Last name | Age |
| --- | --- | --- |
| Dickerson | Macdonald | 40 |
| Larsen | Shaw | 21 |
| Geneva | Wilson | 89 |

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormGroup
      v-slot="{ariaDescribedby}"
      label="Table Options"
      label-cols-lg="2"
    >
      <BFormCheckbox
        v-model="striped"
        :aria-describedby="ariaDescribedby"
        inline
        >Striped</BFormCheckbox
      >
      <BFormCheckbox
        v-model="stripedColumns"
        :aria-describedby="ariaDescribedby"
        inline
        >Striped Columns</BFormCheckbox
      >
      <BFormCheckbox
        v-model="bordered"
        :aria-describedby="ariaDescribedby"
        inline
        >Bordered</BFormCheckbox
      >
      <BFormCheckbox
        v-model="borderless"
        :aria-describedby="ariaDescribedby"
        inline
        >Borderless</BFormCheckbox
      >
      <BFormCheckbox
        v-model="outlined"
        :aria-describedby="ariaDescribedby"
        inline
        >Outlined</BFormCheckbox
      >
      <BFormCheckbox
        v-model="small"
        :aria-describedby="ariaDescribedby"
        inline
        >Small</BFormCheckbox
      >
      <BFormCheckbox
        v-model="hover"
        :aria-describedby="ariaDescribedby"
        inline
        >Hover</BFormCheckbox
      >
      <BFormCheckbox
        v-model="dark"
        :aria-describedby="ariaDescribedby"
        inline
        >Dark</BFormCheckbox
      >
      <BFormCheckbox
        v-model="fixed"
        :aria-describedby="ariaDescribedby"
        inline
        >Fixed</BFormCheckbox
      >
      <BFormCheckbox
        v-model="footClone"
        :aria-describedby="ariaDescribedby"
        inline
        >Foot Clone</BFormCheckbox
      >
      <BFormCheckbox
        v-model="noCollapse"
        :aria-describedby="ariaDescribedby"
        inline
        >No border collapse</BFormCheckbox
      >
    </BFormGroup>

    <BFormGroup
      label="Variant"
      label-for="table-style-variant"
      label-cols-lg="2"
      class="my-2"
    >
      <BFormSelect
        id="table-style-variant"
        v-model="variant"
        :options="variants"
      >
        <template #first>
          <option :value="null">-- None --</option>
        </template>
      </BFormSelect>
    </BFormGroup>

    <BFormGroup
      label="Head Variant"
      label-for="head-style-variant"
      label-cols-lg="2"
      class="my-2"
    >
      <BFormSelect
        id="head-style-variant"
        v-model="headVariant"
        :options="variants"
      >
        <template #first>
          <option :value="null">-- None --</option>
        </template>
      </BFormSelect>
    </BFormGroup>

    <BFormGroup
      label="Foot Variant"
      label-for="foot-style-variant"
      label-cols-lg="2"
      class="my-2"
    >
      <BFormSelect
        id="foot-style-variant"
        v-model="footVariant"
        :options="variants"
      >
        <template #first>
          <option :value="null">-- None --</option>
        </template>
      </BFormSelect>
    </BFormGroup>

    <BTable
      :striped="striped"
      :striped-columns="stripedColumns"
      :bordered="bordered"
      :borderless="borderless"
      :outlined="outlined"
      :small="small"
      :hover="hover"
      :dark="dark"
      :fixed="fixed"
      :foot-clone="footClone"
      :no-border-collapse="noCollapse"
      :items="items"
      :fields="fields"
      :variant="variant"
      :head-variant="headVariant"
      :foot-variant="footVariant"
    />
  </div>
</template>

<script setup lang="ts">
import type {ColorVariant} from 'bootstrap-vue-next'
import {ref} from 'vue'

const fields = ['first_name', 'last_name', 'age']
const items = [
  {age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
  {age: 21, first_name: 'Larsen', last_name: 'Shaw'},
  {age: 89, first_name: 'Geneva', last_name: 'Wilson'},
]

const striped = ref(false)
const stripedColumns = ref(false)
const bordered = ref(false)
const borderless = ref(false)
const outlined = ref(false)
const small = ref(false)
const hover = ref(false)
const dark = ref(false)
const fixed = ref(false)
const footClone = ref(false)
const variant = ref<ColorVariant | null>(null)
const headVariant = ref<ColorVariant | null>(null)
const footVariant = ref<ColorVariant | null>(null)
const noCollapse = ref(false)

const variants = [
  {text: 'Primary', value: 'primary' as ColorVariant},
  {text: 'Secondary', value: 'secondary' as ColorVariant},
  {text: 'Info', value: 'info' as ColorVariant},
  {text: 'Danger', value: 'danger' as ColorVariant},
  {text: 'Warning', value: 'warning' as ColorVariant},
  {text: 'Success', value: 'success' as ColorVariant},
  {text: 'Light', value: 'light' as ColorVariant},
  {text: 'Dark', value: 'dark' as ColorVariant},
]
</script>
```

### Fixed table layout [​](#fixed-table-layout)

The `fixed` prop generates a table with equal fixed-width columns using `table-layout: fixed`. This can be useful when you want consistent column widths regardless of content length.

 Use fixed table layout (`table-layout: fixed`)

| ID | Name | Status | Long Text |
| --- | --- | --- | --- |
| 1 | Item 1 | Active | This is a very long text that demonstrates how fixed table layout affects column width. In fixed mode, this column will not expand. |
| 2 | Item 2 | Inactive | Short text |
| 3 | Item 3 | Active | Another example of longer content that would normally cause the column to expand in auto layout mode. |

**Fixed layout:** All columns have equal width regardless of content length. This is useful when you want predictable column widths. Notice how the "Long Text" column doesn't expand to fit its content when fixed layout is enabled.

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <div>
    <BFormCheckbox
      id="table-fixed-checkbox"
      v-model="useFixed"
      class="mb-3"
    >
      Use fixed table layout (<code>table-layout: fixed</code>)
    </BFormCheckbox>

    <BTable
      id="table-fixed-table"
      :items="items"
      :fields="fields"
      :fixed="useFixed"
      bordered
    >
      <template #cell(longText)="data">
        {{ data.value }}
      </template>
    </BTable>

    <p class="text-muted mt-3">
      <strong>Fixed layout:</strong> All columns have equal width regardless of content length. This
      is useful when you want predictable column widths. Notice how the "Long Text" column doesn't
      expand to fit its content when fixed layout is enabled.
    </p>
  </div>
  <!-- #endregion template -->
</template>

<script setup lang="ts">
import {ref} from 'vue'

const useFixed = ref(false)

const fields = [
  {key: 'id', label: 'ID'},
  {key: 'name', label: 'Name'},
  {key: 'status', label: 'Status'},
  {key: 'longText', label: 'Long Text'},
]

const items = [
  {
    id: 1,
    name: 'Item 1',
    status: 'Active',
    longText:
      'This is a very long text that demonstrates how fixed table layout affects column width. In fixed mode, this column will not expand.',
  },
  {
    id: 2,
    name: 'Item 2',
    status: 'Inactive',
    longText: 'Short text',
  },
  {
    id: 3,
    name: 'Item 3',
    status: 'Active',
    longText:
      'Another example of longer content that would normally cause the column to expand in auto layout mode.',
  },
]
</script>
```

### Row styling and attributes [​](#row-styling-and-attributes)

You can also style every row using the `tbody-tr-class` prop, and optionally supply additional attributes via the `tbody-tr-attr` prop:

| Property | Type | Description |
| --- | --- | --- |
| `tbody-tr-class` | `((item: Item | null, type: TableRowType) => TableStrictClassValue) | TableStrictClassValue` | Classes to be applied to every row on the table. |
| `tbody-tr-attr` | `((item: Item | null, type: TableRowType) => AttrsValue) | AttrsValue` | Attributes to be applied to every row on the table. |

When passing a function reference to `tbody-tr-class` or `tbody-tr-attr`, the function's arguments will be as follows:

-   `item` - The item record data associated with the row. For rows that are not associated with an item record, this value will be `null` or `undefined`
-   `type` - The type of row being rendered ([TableRowType](/bootstrap-vue-next/docs/types.html#tablefield)). `'row'` for an item row, `'row-expansion'` for an item details row, `'row-top'` for the fixed row top slot, `'row-bottom'` for the fixed row bottom slot, or `'table-busy'` for the table busy slot.

| First name | Last name | Age |
| --- | --- | --- |
| Dickerson | Macdonald | 40 |
| Larsen | Shaw | 21 |
| Geneva | Wilson | 89 |

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      :items="items"
      :fields="fields"
      :tbody-tr-class="rowClass"
    />
  </div>
</template>

<script setup lang="ts">
import type {TableRowType, TableStrictClassValue} from 'bootstrap-vue-next'

interface Person {
  age: number
  first_name: string
  last_name: string
  status?: string
}

const fields = ['first_name', 'last_name', 'age']
const items = [
  {age: 40, first_name: 'Dickerson', last_name: 'Macdonald', status: 'awesome'},
  {age: 21, first_name: 'Larsen', last_name: 'Shaw'},
  {age: 89, first_name: 'Geneva', last_name: 'Wilson'},
]

const rowClass = (item: Person | null, type: TableRowType): TableStrictClassValue =>
  type === 'row' && item?.status === 'awesome' ? 'table-success' : ''
</script>
```

### Responsive tables [​](#responsive-tables)

Responsive tables allow tables to be scrolled horizontally with ease. Make any table responsive across all viewports by setting the prop `responsive` to `true`. Or, pick a maximum breakpoint with which to have a responsive table up to by setting the prop `responsive` to one of the breakpoint values: `sm`, `md`, `lg`, or `xl`.

| Heading1 | Heading2 | Heading3 | Heading4 | Heading5 | Heading6 | Heading7 | Heading8 | Heading9 | Heading10 | Heading11 | Heading12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| table cell | table cell | table cell | table cell | table cell | table cell | table cell | table cell | table cell | table cell | table cell | table cell |
| table cell | table cell | table cell | table cell | table cell | table cell | table cell | table cell | table cell | table cell | table cell | table cell |
| table cell | table cell | table cell | table cell | table cell | table cell | table cell | table cell | table cell | table cell | table cell | table cell |

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      responsive
      :items="items"
    />
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    heading1: 'table cell',
    heading2: 'table cell',
    heading3: 'table cell',
    heading4: 'table cell',
    heading5: 'table cell',
    heading6: 'table cell',
    heading7: 'table cell',
    heading8: 'table cell',
    heading9: 'table cell',
    heading10: 'table cell',
    heading11: 'table cell',
    heading12: 'table cell',
  },
  {
    heading1: 'table cell',
    heading2: 'table cell',
    heading3: 'table cell',
    heading4: 'table cell',
    heading5: 'table cell',
    heading6: 'table cell',
    heading7: 'table cell',
    heading8: 'table cell',
    heading9: 'table cell',
    heading10: 'table cell',
    heading11: 'table cell',
    heading12: 'table cell',
  },
  {
    heading1: 'table cell',
    heading2: 'table cell',
    heading3: 'table cell',
    heading4: 'table cell',
    heading5: 'table cell',
    heading6: 'table cell',
    heading7: 'table cell',
    heading8: 'table cell',
    heading9: 'table cell',
    heading10: 'table cell',
    heading11: 'table cell',
    heading12: 'table cell',
  },
]
</script>
```

**Responsive table notes:**

-   _Possible vertical clipping/truncation_. Responsive tables make use of `overflow-y: hidden`, which clips off any content that goes beyond the bottom or top edges of the table. In particular, this may clip off dropdown menus and other third-party widgets.
-   Using props `responsive` and `fixed` together will **not** work as expected. Fixed table layout uses the first row (table header in this case) to compute the width required by each column (and the overall table width) to fit within the width of the parent container — without taking cells in the `<tbody>` into consideration — resulting in table that may not be responsive. To get around this limitation, you would need to specify widths for the columns (or certain columns) via one of the following methods:
    -   Use `<col>` elements within the [`table-colgroup` slot](#table-colgroup) that have widths set (e.g. `<col style="width: 20rem">`), or
    -   Wrap header cells in `<div>` elements, via the use of [custom header rendering](#header-and-footer-custom-rendering-via-scoped-slots), which have a minimum width set on them, or
    -   Use the `thStyle` property of the [field definition object](#field-definition-reference) to set a width for the column(s), or
    -   Use custom CSS to define classes to apply to the columns to set widths, via the `thClass` or `class` properties of the [field definition object](#field-definition-reference).

### Stacked tables [​](#stacked-tables)

An alternative to responsive tables, BootstrapVueNext includes the stacked table option (using custom SCSS/CSS), which allow tables to be rendered in a visually stacked format. Make any table stacked across _all viewports_ by setting the prop `stacked` to `true`. Or, alternatively, set a breakpoint at which the table will return to normal table format by setting the prop `stacked` to one of the breakpoint values `'sm'`, `'md'`, `'lg'`, or `'xl'`.

Column header labels will be rendered to the left of each field value using a CSS `::before` pseudo element, with a width of 40%.

The `stacked` prop takes precedence over the [`sticky-header`](#sticky-headers) prop and the [`stickyColumn`](#sticky-columns) field definition property.

| Age | First name | Last name |
| --- | --- | --- |
| 40 | Dickerson | Macdonald |
| 21 | Larsen | Shaw |
| 89 | Geneva | Wilson |

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      stacked
      :items="items"
    />
  </div>
</template>

<script setup lang="ts">
const items = [
  {age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
  {age: 21, first_name: 'Larsen', last_name: 'Shaw'},
  {age: 89, first_name: 'Geneva', last_name: 'Wilson'},
]
</script>
```

**Note: When the table is visually stacked:**

-   The table header will be hidden. The table footer will remain visible if `foot-clone` or `custom-foot` slots are used.
-   Custom rendered header slots will not be shown, rather, the fields' `label` will be used.
-   The table **cannot** be sorted by clicking the rendered field labels. You will need to provide an external control to select the field to sort by and the sort direction. See the [Sorting](#sorting) section below for sorting control information, as well as the [complete example](#complete-example) at the bottom of this page for an example of controlling sorting via the use of form controls.
-   The slots `top-row` and `bottom-row` will be hidden when visually stacked.
-   The table caption, if provided, will always appear at the top of the table when visually stacked.
-   In an always stacked table, the table header and the fixed top and bottom row slots will not be rendered.

BootstrapVueNext's custom CSS is required in order to support stacked tables.

### Table caption [​](#table-caption)

Add an optional caption to your table via the prop `caption` or the named slot `table-caption` (the slot takes precedence over the prop). The default Bootstrap v5 styling places the caption at the bottom of the table:

| First name | Last name | Age |
| --- | --- | --- |
| Dickerson | Macdonald | 40 |
| Larsen | Shaw | 21 |
| Geneva | Wilson | 89 |This is a table caption.

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      :items="items"
      :fields="fields"
    >
      <template #table-caption>This is a table caption.</template>
    </BTable>
  </div>
</template>

<script setup lang="ts">
const fields = ['first_name', 'last_name', 'age']
const items = [
  {age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
  {age: 21, first_name: 'Larsen', last_name: 'Shaw'},
  {age: 89, first_name: 'Geneva', last_name: 'Wilson'},
]
</script>
```

You can have the caption placed at the top of the table by setting the `caption-top` prop to `true`:

| First name | Last name | Age |
| --- | --- | --- |
| Dickerson | Macdonald | 40 |
| Larsen | Shaw | 21 |
| Geneva | Wilson | 89 |This is a table caption at the top.

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      :items="items"
      :fields="fields"
      caption-top
    >
      <template #table-caption>This is a table caption at the top.</template>
    </BTable>
  </div>
</template>

<script setup lang="ts">
const fields = ['first_name', 'last_name', 'age']
const items = [
  {age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
  {age: 21, first_name: 'Larsen', last_name: 'Shaw'},
  {age: 89, first_name: 'Geneva', last_name: 'Wilson'},
]
</script>
```

You can also use [custom CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/caption-side) to control the caption positioning.

### Table colgroup [​](#table-colgroup)

The `table-colgroup` slot allows you to include a `<colgroup>` element in your table. You can use this slot to specify widths for columns using the `<col>` element.

| First name | Last name | Age |
| --- | --- | --- |
| Dickerson | Macdonald | 40 |
| Larsen | Shaw | 21 |
| Geneva | Wilson | 89 |

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      :items="items"
      :fields="fields"
    >
      <template #table-colgroup>
        <col style="width: 30%" />
        <col style="width: 45%" />
        <col style="width: 25%" />
      </template>
    </BTable>
  </div>
</template>

<script setup lang="ts">
const fields = ['first_name', 'last_name', 'age']
const items = [
  {age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
  {age: 21, first_name: 'Larsen', last_name: 'Shaw'},
  {age: 89, first_name: 'Geneva', last_name: 'Wilson'},
]
</script>
```

### Table busy state [​](#table-busy-state)

`<BTable>` provides a `busy` model that will flag the table as busy, which you can set to `true` just before you update your items, and then set it to `false` once you have your items. When in the busy state, the table will have the attribute `aria-busy="true"`.

During the busy state, the table will be rendered in a "muted" look (`opacity: 0.55`), using the following custom CSS:

css

```
/* Busy table styling */
.table.b-table[aria-busy="true"] {
  opacity: 0.55;
}
```

#### table-busy slot [​](#table-busy-slot)

Toggle Busy State

| First name | Last name | Age |
| --- | --- | --- |
| Dickerson | MacDonald | 40 |
| Larsen | Shaw | 21 |
| Geneva | Wilson | 89 |
| Jami | Carney | 38 |

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton @click="toggleBusy">Toggle Busy State</BButton>

    <BTable
      :items="items"
      :busy="isBusy"
      class="mt-3"
      outlined
    >
      <!-- <template #table-busy>
        <div class="text-center text-danger my-2">
          <BSpinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </template> -->
    </BTable>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const isBusy = ref(false)
const items = [
  {first_name: 'Dickerson', last_name: 'MacDonald', age: 40},
  {first_name: 'Larsen', last_name: 'Shaw', age: 21},
  {first_name: 'Geneva', last_name: 'Wilson', age: 89},
  {first_name: 'Jami', last_name: 'Carney', age: 38},
]

const toggleBusy = () => {
  isBusy.value = !isBusy.value
}
</script>
```

Also see the [Using Item Provider Functions](#using-items-provider-functions) below for additional information on the `busy` state.

**Notes:**

-   All click related and hover events, and sort-changed events will **not** be emitted when the table is in the `busy` state.
-   Busy styling and slot are not available in the `<BTableLite>` component.

## Custom data rendering [​](#custom-data-rendering)

Custom rendering for each data field in a row is possible using either [scoped slots](https://vuejs.org/guide/components/slots.html#scoped-slots) or a formatter callback function, or a combination of both.

### Scoped field slots [​](#scoped-field-slots)

Scoped field slots give you greater control over how the record data appears. You can use scoped slots to provided custom rendering for a particular field. If you want to add an extra field which does not exist in the records, just add it to the [`fields`](#fields-column-definitions) array, and then reference the field(s) in the scoped slot(s). Scoped field slots use the following naming syntax: `` `'cell(${field_key})'` ``.

You can use the default _fall-back_ scoped slot `'cell()'` to format any cells that do not have an explicit scoped slot provided.

| Index | Full Name | Age | Sex | First name and age |
| --- | --- | --- | --- | --- |
| 1 | **DOE**, **John** | _42_ | _Male_ | John is 42 years old |
| 2 | **DOE**, **Jane** | _36_ | _Female_ | Jane is 36 years old |
| 3 | **KINCADE**, **Rubin** | _73_ | _Male_ | Rubin is 73 years old |
| 4 | **PARTRIDGE**, **Shirley** | _62_ | _Female_ | Shirley is 62 years old |

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      small
      :fields="fields"
      :items="items"
      responsive="sm"
    >
      <!-- A virtual column -->
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <!-- A custom formatted column -->
      <template #cell(name)="data">
        <b class="text-info">{{ data.item.name.last.toUpperCase() }}</b
        >, <b>{{ data.item.name.first }}</b>
      </template>

      <!-- A virtual composite column -->
      <template #cell(nameage)="data">
        {{ data.item.name.first }} is {{ data.item.age }} years old
      </template>

      <!-- Optional default data cell scoped slot -->
      <template #cell()="data">
        <i>{{ data.value }}</i>
      </template>
    </BTable>
  </div>
</template>

<script setup lang="ts">
interface Person {
  name: {first: string; last: string}
  sex: string
  age: number
}

const fields = [
  // A virtual column that doesn't exist in items
  'index',
  // A column that needs custom formatting
  {key: 'name', label: 'Full Name'},
  // A regular column
  'age',
  // A regular column
  'sex',
  // A virtual column made up from two fields
  {key: 'nameage', label: 'First name and age'},
]
const items: Person[] = [
  {name: {first: 'John', last: 'Doe'}, sex: 'Male', age: 42},
  {name: {first: 'Jane', last: 'Doe'}, sex: 'Female', age: 36},
  {name: {first: 'Rubin', last: 'Kincade'}, sex: 'Male', age: 73},
  {name: {first: 'Shirley', last: 'Partridge'}, sex: 'Female', age: 62},
]
</script>
```

The slot's scope variable (`data` in the above sample) will have the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `index` | number | The row number (indexed from zero) relative to the _displayed_ rows |
| `item` | Item | The entire raw record data (i.e. `items[index]`) for this row (before any formatter is applied) |
| `value` | unknown | The value for this key in the record (`null` or `undefined` if a virtual column), or the output of the field's [`formatter` function](#formatter-callback) |
| `unformatted` | unknown | The raw value for this key in the item record (`null` or `undefined` if a virtual column), before being passed to the field's [`formatter` function](#formatter-callback) |
| `field` | `(typeof computedFields.value)[0]` | The field's normalized field definition object |
| `expansionShowing` | boolean | Will be `true` if the row's `row-expansion` scoped slot is visible. See section [Row expansion support](#row-expansion-support) below for additional information |
| `toggleExpansion` | `() => void` | Can be called to toggle the visibility of the rows `row-expansion` scoped slot. See section [Row expansion support](#row-expansion-support) below for additional information |
| `rowSelected` | boolean | Will be `true` if the row has been selected. See section [Row select support](#row-select-support) for additional information |
| `selectRow` | `(index?: number) => void` | When called, selects the current row. See section [Row select support](#row-select-support) for additional information |
| `unselectRow` | `(index?: number) => void` | When called, unselects the current row. See section [Row select support](#row-select-support) for additional information |

**Notes:**

-   `index` will not always be the actual row's index number, as it is computed after filtering, sorting and pagination have been applied to the original table data. The `index` value will refer to the **displayed row number**.
-   When using the `v-slot` syntax, note that slot names **cannot** contain spaces, and when using in-browser DOM templates the slot names will _always_ be lower cased. To get around this, you can pass the slot name using Vue's [dynamic slot names](https://vuejs.org/guide/components/slots.html#dynamic-slot-names)

#### Displaying raw HTML [​](#displaying-raw-html)

By default `BTable` escapes HTML tags in items data and results of formatter functions, if you need to display raw HTML code in `BTable`, you should use `v-html` directive on an element in a in scoped field slot.

| Text | Html |
| --- | --- |
| This is <i>escaped</i> content | This is _raw **HTML**_ content |

HTML StackBlitz

vue

```
<template>
  <div>
    <b-table :items="items">
      <template #cell(html)="data">
        <!-- eslint-disable vue/no-v-html -->
        <span v-html="data.value" />
      </template>
    </b-table>
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    text: 'This is <i>escaped</i> content',
    html: 'This is <i>raw <strong>HTML</strong></i> <span style="color:red">content</span>',
  },
]
</script>
```

WARNING

Be cautious of using the `v-html` method to display user supplied content, as it may make your application vulnerable to [XSS attacks](https://en.wikipedia.org/wiki/Cross-site_scripting), if you do not first [sanitize](https://en.wikipedia.org/wiki/HTML_sanitization) the user supplied string.

### Formatter callback [​](#formatter-callback)

Optionally, you can customize field output by using a formatter callback function. To enable this, the field's `formatter` property is used. The value of this property may be String or function reference. In case of a String value, the function must be defined at the parent component's methods. When providing `formatter` as a `Function`, it must be declared at global scope (window or as global mixin at Vue, or as an anonymous function), unless it has been bound to a `this` context.

The callback function receives a single parameter object with properties `{value, key, item}` and should return the formatted value as a string (HTML strings are not supported). The `value` is extracted from the item using the field's `accessor` property (or `key` if no accessor is provided).

| Full Name | Age | Sex | Calculated Birth Year |
| --- | --- | --- | --- |
| [John Doe](#john-doe) | 42 | M | 1984 |
| [Jane Doe](#jane-doe) | 36 | F | 1990 |
| [Rubin Kincade](#rubin-kincade) | 73 | M | 1953 |
| [Shirley Partridge](#shirley-partridge) | 62 | F | 1964 |

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      :fields="fields"
      :items="items"
    >
      <template #cell(name)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <a :href="`#${(data.value as any as string).replace(/[^a-z]+/i, '-').toLowerCase()}`">{{
          data.value
        }}</a>
      </template>
    </BTable>
  </div>
</template>

<script setup lang="ts">
import type {TableFieldFormatter, TableFieldRaw} from 'bootstrap-vue-next'

interface Name {
  first: string
  last: string
}

interface Person {
  name: Name
  sex: string
  age: number
}

const fullName: TableFieldFormatter<Person> = ({item}) => `${item.name.first} ${item.name.last}`

const fields: TableFieldRaw<Person>[] = [
  {
    // A column that needs custom formatting,
    // calling formatter 'fullName' in this app
    key: 'name',
    label: 'Full Name',
    formatter: fullName,
  },
  // A regular column
  'age',
  {
    // A regular column with custom formatter
    key: 'sex',
    formatter: ({value}) =>
      typeof value === 'string' ? value.charAt(0).toUpperCase() : `${value}`,
  },
  {
    // A virtual column with custom formatter
    key: 'birthYear',
    label: 'Calculated Birth Year',
    formatter: ({item}) => (new Date().getFullYear() - item.age).toString(),
  },
]

const items = [
  {name: {first: 'John', last: 'Doe'}, sex: 'Male', age: 42},
  {name: {first: 'Jane', last: 'Doe'}, sex: 'Female', age: 36},
  {name: {first: 'Rubin', last: 'Kincade'}, sex: 'male', age: 73},
  {name: {first: 'Shirley', last: 'Partridge'}, sex: 'female', age: 62},
]
</script>
```

## Header and Footer custom rendering via scoped slots [​](#header-and-footer-custom-rendering-via-scoped-slots)

It is also possible to provide custom rendering for the table's `thead` and `tfoot` elements. Note by default the table footer is not rendered unless `foot-clone` is set to `true`.

Scoped slots for the header and footer cells uses a special naming convention of `'head(<fieldkey>)'` and `'foot(<fieldkey>)'` respectively.

You can use a default _fall-back_ scoped slot `'head()'` or `'foot()'` to format any header or footer cells that do not have an explicit scoped slot provided.

In `BTableLight`, `'foot(<fieldkey>)'` will _fall-back_ first to `'foot()'` if it is provided, then to `'head(<fieldkey>)'`, and finally to `'head()'`. For `BTable`, there is a default for `'head(<fieldkey>)'`, so the fallback chain will stop with the default `'head(<fieldkey>)'` rather than falling back to `'head()'`.

| FULL NAME | Age | Sex |
| --- | --- | --- |
| John Doe | 42 | Male |
| Jane Doe | 36 | Female |
| Rubin Kincade | 73 | Male |
| Shirley Partridge | 62 | Female |
| 
Full Name



 | 

_Age_



 | 

_Sex_



 |

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      :fields="fields"
      :items="items"
      foot-clone
    >
      <!-- A custom formatted data column cell -->
      <template #cell(name)="data">
        {{ (data.value as any as Name).first }} {{ (data.value as any as Name).last }}
      </template>

      <!-- A custom formatted header cell for field 'name' -->
      <template #head(name)="data">
        <span class="text-info">{{ data.label!.toUpperCase() }}</span>
      </template>

      <!-- A custom formatted footer cell for field 'name' -->
      <template #foot(name)="data">
        <span class="text-danger">{{ data.label }}</span>
      </template>

      <!-- Default fall-back custom formatted footer cell -->
      <template #foot()="data">
        <i>{{ data.label }}</i>
      </template>
    </BTable>
  </div>
</template>

<script setup lang="ts">
type Name = {first: string; last: string}

const fields = [
  // A column that needs custom formatting
  {key: 'name', label: 'Full Name'},
  // A regular column
  'age',
  // A regular column
  'sex',
]
const items = [
  {name: {first: 'John', last: 'Doe'}, sex: 'Male', age: 42},
  {name: {first: 'Jane', last: 'Doe'}, sex: 'Female', age: 36},
  {name: {first: 'Rubin', last: 'Kincade'}, sex: 'Male', age: 73},
  {name: {first: 'Shirley', last: 'Partridge'}, sex: 'Female', age: 62},
]
</script>
```

The slots can be optionally scoped (`data` in the above example), and will have the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `column` | `LiteralUnion<keyof Item>` | The fields's `key` value |
| `field` | `TableField<Item>` | the field's object (from the `fields` prop) |
| `label` | `string | undefined` | The fields label value (also available as `data.field.label`) |
| `isFoot` | `boolean` | Currently rending the foot if `true` |
| `selectAllRows` | `() => void` | Select all rows (applicable if the table is in [`selectable`](#row-select-support) mode |
| `clearSelected` | `() => void` | Unselect all rows (applicable if the table is in [`selectable`](#row-select-support) mode |

When placing inputs, buttons, selects or links within a `head(...)` or `foot(...)` slot, note that `head-clicked` event will not be emitted when the input, select, textarea is clicked (unless they are disabled). `head-clicked` will never be emitted when clicking on links or buttons inside the scoped slots (even when disabled)

**Notes:**

-   Slot names **cannot** contain spaces, and when using in-browser DOM templates the slot names will _always_ be lower cased. To get around this, you can pass the slot name using Vue's [dynamic slot names](https://vuejs.org/guide/components/slots.html#dynamic-slot-names)

### Adding additional rows to the header [​](#adding-additional-rows-to-the-header)

If you wish to add additional rows to the header you may do so via the `thead-top` slot. This slot is inserted before the header cells row, and is not automatically encapsulated by `<tr>..</tr>` tags. It is recommended to use the BootstrapVueNext [table helper components](#table-helper-components), rather than native browser table child elements.

| Name and ID | Type 1 | Type 2 | Type 3 |
| --- | --- | --- | --- |
| Name | ID | Type 1 | Type 2A | Type 2B | Type 2C | Type 3 |
| --- | --- | --- | --- | --- | --- | --- |
| Stephen Hawking | 1 | false | true | false | false | false |
| Johnny Appleseed | 2 | false | true | true | false | false |
| George Washington | 3 | false | false | false | false | true |
| Albert Einstein | 4 | true | false | false | true | false |
| Isaac Newton | 5 | true | true | false | true | false |

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      :items="items"
      :fields="fields"
      responsive="sm"
    >
      <template #thead-top>
        <BTr>
          <BTh colspan="2"><span class="visually-hidden">Name and ID</span></BTh>
          <BTh variant="secondary">Type 1</BTh>
          <BTh
            variant="primary"
            colspan="3"
            >Type 2</BTh
          >
          <BTh variant="danger">Type 3</BTh>
        </BTr>
      </template>
    </BTable>
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    name: 'Stephen Hawking',
    id: 1,
    type1: false,
    type2a: true,
    type2b: false,
    type2c: false,
    type3: false,
  },
  {
    name: 'Johnny Appleseed',
    id: 2,
    type1: false,
    type2a: true,
    type2b: true,
    type2c: false,
    type3: false,
  },
  {
    name: 'George Washington',
    id: 3,
    type1: false,
    type2a: false,
    type2b: false,
    type2c: false,
    type3: true,
  },
  {
    name: 'Albert Einstein',
    id: 4,
    type1: true,
    type2a: false,
    type2b: false,
    type2c: true,
    type3: false,
  },
  {
    name: 'Isaac Newton',
    id: 5,
    type1: true,
    type2a: true,
    type2b: false,
    type2c: true,
    type3: false,
  },
]
const fields = [
  'name',
  {key: 'id', label: 'ID'},
  {key: 'type1', label: 'Type 1'},
  {key: 'type2a', label: 'Type 2A'},
  {key: 'type2b', label: 'Type 2B'},
  {key: 'type2c', label: 'Type 2C'},
  {key: 'type3', label: 'Type 3'},
]
</script>
```

Slot `thead-top` can be optionally scoped, receiving an object with the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `columns` | `number` | The number of columns in the rendered table |
| `fields` | `TableField<Item>[]` | Array of field definition objects (normalized to the array of objects format) |
| `selectAllRows` | `() => void` | Select all rows (applicable if the table is in [`selectable`](#row-select-support) mode |
| `clearSelected` | `() => void` | Unselect all rows (applicable if the table is in [`selectable`](#row-select-support) mode |

### Creating a custom footer [​](#creating-a-custom-footer)

If you need greater layout control of the content of the `<tfoot>`, you can use the optionally scoped slot `custom-foot` to provide your own rows and cells. Use BootstrapVue's [table helper sub-components](#table-helper-components) `<BTr>`, `<BTh>`, and `<BTd>` to generate your custom footer layout.

Slot `custom-foot` can be optionally scoped, receiving an object with the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `columns` | `number` | The number of columns in the rendered table |
| `fields` | `TableField<Item>[]` | Array of field definition objects (normalized to the array of objects format) |
| `items` | `readonly Item[]` | Array of the currently _displayed_ items records - after filtering, sorting and pagination |

**Notes:**

-   The `custom-foot` slot will **not** be rendered if the `foot-clone` prop has been set.
-   `head-clicked` events are not be emitted when clicking on `custom-foot` cells.
-   Sorting and sorting icons are not available for cells in the `custom-foot` slot.
-   The custom footer will not be shown when the table is in visually stacked mode.

## Custom empty and empty-filtered rendering [​](#custom-empty-and-empty-filtered-rendering)

The content to show when the table is empty can be specified by setting the `show-empty` prop and then specifying:

-   Either the `empty-text` prop or the `empty` named slot, for the case where unfiltered items are an empty or falsy array
-   Either the `empty-filtered-text` prop or the `empty-filtered` named slot, for the case where filtered items are an empty or falsy array

In order for these props or slots to be shown, the `show-empty` attribute must be set and `items` must be either falsy or an array of length 0.

template

```
<BTable
  :fields="fields"
  :items="items"
  show-empty
>
  <template #empty="scope">
    <h4>{{ scope.emptyText }}</h4>
  </template>
  <template #empty-filtered="scope">
    <h4>{{ scope.emptyFilteredText }}</h4>
  </template>
</BTable>
```

The slot can optionally be scoped. The slot's scope (`scope` in the above example) will have the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `emptyFilteredHtml` | `string` | The `empty-filtered-html` prop |
| `emptyFilteredText` | `string` | The `empty-filtered-text` prop |
| `fields` | `TableField<Item>[]` | The `fields` prop |
| `items` | `Item[]` | The `items` prop. Exposed here to check null vs \[\] |

NOTE

If you previously used the `emptyHtml` or `emtpyFilteredHtml` scoped slots or the `empty-html` or `empty-filtered-html` props, please convert to using the `empty-text` or `empty-filtered-text` slots instead. See our [migration guide](/bootstrap-vue-next/docs/migration-guide.html#v-html) for details.

## Advanced Features [​](#advanced-features)

### Sticky headers [​](#sticky-headers)

Use the `sticky-header` prop to enable a vertically scrolling table with headers that remain fixed (sticky) as the table body scrolls. Setting the prop to `true` (or no explicit value) will generate a table that has a maximum height of `300px`. To specify a maximum height other than `300px`, set the `sticky-header` prop to a valid CSS height (including units), i.e. `sticky-header="200px"`. Tables with `sticky-header` enabled will also automatically become always responsive horizontally, regardless of the [`responsive`](#responsive-tables) prop setting, if the table is wider than the available horizontal space.

| Heading1 | Heading2 | Heading3 |
| --- | --- | --- |
| table cell | table cell | table cell |
| table cell | table cell | table cell |
| table cell | table cell | table cell |
| table cell | table cell | table cell |
| table cell | table cell | table cell |
| table cell | table cell | table cell |
| table cell | table cell | table cell |
| table cell | table cell | table cell |
| table cell | table cell | table cell |
| table cell | table cell | table cell |
| table cell | table cell | table cell |
| table cell | table cell | table cell |

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      sticky-header
      :items="items"
      head-variant="light"
    />
  </div>
</template>

<script setup lang="ts">
const items = [
  {heading1: 'table cell', heading2: 'table cell', heading3: 'table cell'},
  {heading1: 'table cell', heading2: 'table cell', heading3: 'table cell'},
  {heading1: 'table cell', heading2: 'table cell', heading3: 'table cell'},
  {heading1: 'table cell', heading2: 'table cell', heading3: 'table cell'},
  {heading1: 'table cell', heading2: 'table cell', heading3: 'table cell'},
  {heading1: 'table cell', heading2: 'table cell', heading3: 'table cell'},
  {heading1: 'table cell', heading2: 'table cell', heading3: 'table cell'},
  {heading1: 'table cell', heading2: 'table cell', heading3: 'table cell'},
  {heading1: 'table cell', heading2: 'table cell', heading3: 'table cell'},
  {heading1: 'table cell', heading2: 'table cell', heading3: 'table cell'},
  {heading1: 'table cell', heading2: 'table cell', heading3: 'table cell'},
  {heading1: 'table cell', heading2: 'table cell', heading3: 'table cell'},
]
</script>
```

**Sticky header notes:**

-   The `sticky-header` prop has no effect if the table has the [`stacked`](#stacked-tables) prop set.
-   Sticky header tables are wrapped inside a vertically scrollable `<div>` with a maximum height set.
-   BootstrapVue's custom CSS is required in order to support `sticky-header`.
-   Bootstrap v5 uses the CSS style `border-collapse: collapsed` on table elements. This prevents the borders on the sticky header from "sticking" to the header, and hence the borders will scroll when the body scrolls. To get around this issue, set the prop `no-border-collapse` on the table (note that this may cause double width borders when using features such as `bordered`, etc.).

 Disable border collapse (`border-collapse: separate`)

| ID | Name | Email | Phone | City |
| --- | --- | --- | --- | --- |
| 1 | Person 1 | person1@example.com | 555-0001 | New York |
| 2 | Person 2 | person2@example.com | 555-0002 | Los Angeles |
| 3 | Person 3 | person3@example.com | 555-0003 | Chicago |
| 4 | Person 4 | person4@example.com | 555-0004 | Houston |
| 5 | Person 5 | person5@example.com | 555-0005 | Phoenix |
| 6 | Person 6 | person6@example.com | 555-0006 | New York |
| 7 | Person 7 | person7@example.com | 555-0007 | Los Angeles |
| 8 | Person 8 | person8@example.com | 555-0008 | Chicago |
| 9 | Person 9 | person9@example.com | 555-0009 | Houston |
| 10 | Person 10 | person10@example.com | 555-0010 | Phoenix |
| 11 | Person 11 | person11@example.com | 555-0011 | New York |
| 12 | Person 12 | person12@example.com | 555-0012 | Los Angeles |
| 13 | Person 13 | person13@example.com | 555-0013 | Chicago |
| 14 | Person 14 | person14@example.com | 555-0014 | Houston |
| 15 | Person 15 | person15@example.com | 555-0015 | Phoenix |
| 16 | Person 16 | person16@example.com | 555-0016 | New York |
| 17 | Person 17 | person17@example.com | 555-0017 | Los Angeles |
| 18 | Person 18 | person18@example.com | 555-0018 | Chicago |
| 19 | Person 19 | person19@example.com | 555-0019 | Houston |
| 20 | Person 20 | person20@example.com | 555-0020 | Phoenix |

**No border collapse** is mainly useful with sticky headers or sticky columns to prevent borders from appearing incorrectly. Toggle the checkbox to see how borders behave differently when scrolling with sticky headers.

HTML StackBlitz

vue

```
<template>
  <!-- #region template -->
  <div>
    <BFormCheckbox
      id="table-no-border-collapse-checkbox"
      v-model="noBorderCollapse"
      class="mb-3"
    >
      Disable border collapse (<code>border-collapse: separate</code>)
    </BFormCheckbox>

    <div
      class="table-responsive"
      style="max-height: 300px; overflow-y: auto"
    >
      <BTable
        id="table-no-border-collapse-table"
        :items="items"
        :fields="fields"
        :no-border-collapse="noBorderCollapse"
        :sticky-header="true"
        bordered
        striped
      />
    </div>

    <BAlert
      id="table-no-border-collapse-alert"
      variant="info"
      show
      class="mt-3"
    >
      <strong>No border collapse</strong> is mainly useful with sticky headers or sticky columns to
      prevent borders from appearing incorrectly. Toggle the checkbox to see how borders behave
      differently when scrolling with sticky headers.
    </BAlert>
  </div>
  <!-- #endregion template -->
</template>

<script setup lang="ts">
import {ref} from 'vue'

const noBorderCollapse = ref(false)

const fields = [
  {key: 'id', label: 'ID', stickyColumn: true},
  {key: 'name', label: 'Name'},
  {key: 'email', label: 'Email'},
  {key: 'phone', label: 'Phone'},
  {key: 'city', label: 'City'},
]

const items = Array.from({length: 20}, (_, i) => ({
  id: i + 1,
  name: `Person ${i + 1}`,
  email: `person${i + 1}@example.com`,
  phone: `555-${String(i + 1).padStart(4, '0')}`,
  city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][i % 5],
}))
</script>
```

### Sticky columns [​](#sticky-columns)

Columns can be made sticky, where they stick to the left of the table when the table has a horizontal scrollbar. To make a column a sticky column, set the `stickyColumn` prop in the [field's header definition](#field-definition-reference). Sticky columns will only work when the table has either the `sticky-header` prop set and/or the [`responsive`](#responsive-tables) prop is set.

Sticky header

No border collapse

| 
Row ID

 | 

Heading A

 | 

Heading B

 | 

Heading

 | 

Heading D

 | 

Heading E

 | 

Heading F

 | 

Heading G

 | 

Heading H

 | 

Heading I

 | 

Heading J

 | 

Heading K

 | 

Heading L

 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| 2 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| 3 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| 4 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| 5 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| 6 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| 7 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| 8 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| 9 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| 10 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |

HTML StackBlitz

vue

```
<template>
  <div>
    <div class="mb-2">
      <b-form-checkbox
        v-model="stickyHeader"
        inline
        >Sticky header</b-form-checkbox
      >
      <b-form-checkbox
        v-model="noCollapse"
        inline
        >No border collapse</b-form-checkbox
      >
    </div>
    <b-table
      :sticky-header="stickyHeader"
      :no-border-collapse="noCollapse"
      responsive
      :items="items"
      :fields="fields"
    >
      <!-- We are using utility class `text-nowrap` to help illustrate horizontal scrolling -->
      <template #head(id)>
        <div class="text-nowrap">Row ID</div>
      </template>
      <template #head()="scope">
        <div class="text-nowrap">Heading {{ scope.label }}</div>
      </template>
    </b-table>
  </div>
</template>

<script setup lang="ts">
import type {TableFieldRaw} from 'bootstrap-vue-next'
import {ref} from 'vue'

const fields: TableFieldRaw[] = [
  {key: 'id', stickyColumn: true, isRowHeader: true, variant: 'primary'},
  'a',
  'b',
  {key: 'c', stickyColumn: true, variant: 'info'},
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
]
const items = [
  {id: 1, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11},
  {id: 2, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11},
  {id: 3, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11},
  {id: 4, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11},
  {id: 5, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11},
  {id: 6, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11},
  {id: 7, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11},
  {id: 8, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11},
  {id: 9, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11},
  {id: 10, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11},
]

const stickyHeader = ref(true)
const noCollapse = ref(false)
</script>
```

**Sticky column notes:**

-   Sticky columns has no effect if the table has the [`stacked`](#stacked-tables) prop set.
-   Sticky columns tables require either the `sticky-header` and/or `responsive` modes, and are wrapped inside a horizontally scrollable `<div>`.
-   When you have multiple columns that are set as `stickyColumn`, the columns will stack over each other visually, and the left-most sticky columns may "peek" out from under the next sticky column. To get around this behaviour, make sure your latter sticky columns are the same width or wider than previous sticky columns.
-   Bootstrap v5 uses the CSS style `border-collapse: collapsed` on table elements. This prevents any borders on the sticky columns from "sticking" to the column, and hence those borders will scroll when the body scrolls. To get around this issue, set the prop `no-border-collapse` on the table (note that this may cause double width borders when using features such as `bordered`, etc.).
-   BootstrapVue's custom CSS is required in order to support sticky columns.
-   The sticky column feature uses CSS style `position: sticky` to position the column cells. Internet Explorer does not support `position: sticky`, hence for IE 11 the sticky column will scroll with the table body.

### Row expansion support [​](#row-expansion-support)

If you would optionally like to display additional record information (such as columns not specified in the fields definition array), you can use the scoped slot `row-expansion`, in combination with the `v-model:expanded-items` binding (or its alias `v-model:item-details`).

**Using v-model for expansion state:**

The expanded/collapsed state of rows is controlled via the `v-model:expanded-items` binding, which maintains an array of the currently expanded items. When a `primary-key` is provided, the expansion state persists even when the items array is replaced with new object references (as long as the primary key values remain the same).

When an item is present in the `expanded-items` array **and** a `row-expansion` scoped slot exists, a new row will be shown just below the item, with the rendered contents of the `row-expansion` scoped slot.

In the scoped field slot, you can toggle the visibility of the row's `row-expansion` scoped slot by calling the `toggleExpansion` function passed to the field's scoped slot variable. You can use the scoped fields slot variable `expansionShowing` to determine the visibility of the `row-expansion` slot.

NOTE

When using the `primary-key` prop, row expansion state will persist even when items are replaced with new object references, as long as the primary key value remains the same. This allows row expansion to stay open in scenarios like "Load more" or pagination.

NOTE

[Sorting](#sorting), [filtering](#filtering), or [paginating](#pagination) the table will **not** automatically clear the expanded rows. If you want the expansion state to be cleared when these operations occur, you must clear it manually (for example, by watching for changes to the current page, filter, or sort and resetting your `expanded-items` binding to `[]`).

IMPORTANT: Default Expansion with Primary Key

When using a `primary-key` and you want to set default expanded rows by including items in the initial `v-model:expanded-items` array, you **must** use the exposed `expansion.get()` function to retrieve the actual item reference from the table's template ref.

**Example:**

vue

```
<template>
  <BTable ref="tableRef" :items="items" primary-key="id" v-model:expanded-items="expandedItems">
    <!-- ... -->
  </BTable>
</template>

<script setup>
import {ref, onMounted} from 'vue'

const tableRef = ref()
const expandedItems = ref([])

onMounted(() => {
  expandedItems.value.push(tableRef.value.expansion.get(items[1]))
})
</script>
```

**Available `row-expansion` scoped variable properties:**

| Property | Type | Description |
| --- | --- | --- |
| `item` | `Item` | The entire row record data object |
| `index` | `number` | The current visible row number |
| `fields` | `TableField<Item>[]` | The normalized fields definition array (in the _array of objects_ format) |
| `toggleExpansion` | `() => void` | Function to toggle visibility of the row's expansion slot |
| `rowSelected` | `boolean` | Will be `true` if the row has been selected. See section [Row select support](#row-select-support) for additional information |
| `selectRow` | `(index?: number) => void` | When called, selects the current row. See section [Row select support](#row-select-support) for additional information |
| `unselectRow` | `(index?: number) => void` | When called, unselects the current row. See section [Row select support](#row-select-support) for additional information |

NOTE

the row select related scope properties are only available in `<BTable>`.

In the following example, we show two methods of toggling the visibility of the details: one via a button, and one via a checkbox. We also show the third row details defaulting to have details initially showing.

| First name | Last name | Show details |
| --- | --- | --- |
| Dickerson | Macdonald | Show Details
 Details via check

 |
| Larsen | Shaw | Show Details

 Details via check

 |
| Geneva | Wilson | Hide Details

 Details via check

 |

| 

**Age:**

89

**Is Active:**

false

Hide Details



 |
| Jami | Carney | Show Details

 Details via check

 |

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      v-model:expanded-items="expandedItems"
      :items="items"
      :fields="fields"
      striped
      responsive="sm"
    >
      <template #cell(show_details)="row">
        <BButton size="sm" class="mr-2" @click="row.toggleExpansion">
          {{ row.expansionShowing ? 'Hide' : 'Show' }} Details
        </BButton>

        <!-- As `row.expansionShowing` is one-way, we call the toggleExpansion function on @change -->
        <BFormCheckbox v-model="row.expansionShowing" @change="row.toggleExpansion">
          Details via check
        </BFormCheckbox>
      </template>

      <template #row-expansion="row">
        <BCard>
          <BRow class="mb-2">
            <BCol sm="3" class="text-sm-right"><b>Age:</b></BCol>
            <BCol>{{ row.item?.age }}</BCol>
          </BRow>

          <BRow class="mb-2">
            <BCol sm="3" class="text-sm-right"><b>Is Active:</b></BCol>
            <BCol>{{ row.item?.isActive }}</BCol>
          </BRow>

          <BButton size="sm" @click="row.toggleExpansion">Hide Details</BButton>
        </BCard>
      </template>
    </BTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fields = ['first_name', 'last_name', 'show_details']
const items = [
  { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
  { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
  {
    isActive: false,
    age: 89,
    first_name: 'Geneva',
    last_name: 'Wilson',
  },
  { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
]
// The third row (Geneva Wilson) defaults to having details shown
const expandedItems = ref([items[2]])
// If we were using primary keys we would need the following
/*
const table = useTemplateRef<ComponentExposed<typeof BTable>>('table')
const expandedItems = ref([])

onMounted(() => {
  expandedItems.value.push(table.value?.expansion.get(items[2])) // Geneva Wilson
})

// The get function simply looks up by primary key
 */
</script>
```

### Row select support [​](#row-select-support)

You can make rows selectable, by using the `<BTable>` prop `selectable`.

Users can easily change the selecting mode by setting the `select-mode` prop.

-   `'multi'`: Each click will select/deselect the row (default mode)
-   `'single'`: Only a single row can be selected at one time
-   `'range'`: Any row clicked is selected, any other deselected. Shift + click selects a range of rows, and Ctrl (or Cmd) + click will toggle the selected row.

When a table is `selectable` and the user clicks on a row, `<BTable>` will emit the `update:selected-items` event, passing a single argument which is the complete list of selected items. **This argument is read-only.** In addition, `row-selected` or `row-unselected` events are emitted for each row.

Rows can also be programmatically selected and unselected via the `selection` API on the `<BTable>` instance:

| Member | Description |
| --- | --- |
| `selection.add(item: Item)` | Selects the given item. In `single` mode, replaces any previous selection. |
| `selection.remove(item: Item)` | Unselects the given item. |
| `selection.set(items: readonly Item[])` | Replaces the selection with the provided items. |
| `selection.setAll()` | Selects all items (no effect in `single` mode). |
| `selection.clear()` | Clears all selections. |
| `selection.has(item: Item): boolean` | Returns whether the given item is currently selected. |
| `selection.selectedItems: readonly Item[]` | The current selected items (same values as bound via `v-model:selected-items`). |
| `selection.isActivated: boolean` | Indicates whether selection is active and at least one item is selected. |

**Programmatic row selection notes:**

-   `index` is the zero-based index of the table's **visible rows**, after filtering, sorting, and pagination have been applied.
-   In `single` mode, `selectRow(index)` will unselect any previous selected row.
-   Attempting to `selectRow(index)` or `unselectRow(index)` on a non-existent row will be ignored.
-   The table must be `selectable` for any of these methods to have effect.
-   You can disable selection of rows via click events by setting the `no-select-on-click` prop. Rows will then only be selectable programmatically.

**Row select notes:**

-   [Sorting](#sorting), [filtering](#filtering), or [paginating](#pagination) the table will **not** automatically clear the active selection. If you want the selection to be cleared when these operations occur, you must clear it manually (for example, by watching for changes to the current page, filter, or sort and resetting your `selected-items` binding to `[]`).
-   When the table is in `selectable` mode, all data item `<tr>` elements will be in the document tab sequence (`tabindex="0"`) for [accessibility](#accessibility) reasons, and will have the attribute `aria-selected` set to either `'true'` or `'false'` depending on the selected state of the row.
-   **Primary Key Usage:** When using a `primary-key`, the selected items state persists across item array updates (like pagination or "Load more") as long as the primary key values remain the same.

Use the prop `selection-variant` to apply a Bootstrap theme color to the selected row(s). Note, due to the order that the table variants are defined in Bootstrap's CSS, any row-variant _might_ take precedence over the `selected-variant`. You can set `selected-variant` to an empty string if you will be using other means to convey that a row is selected (such as a scoped field slot in the below example).

The `selected-variant` can be any of the [standard (or custom) Bootstrap base color variants](/bootstrap-vue-next/docs/reference/color-variants.html), or the special [table `active` variant](/bootstrap-vue-next/docs/reference/color-variants.html#table-variants) (the default) which takes precedence over any specific row or cell variants.

For accessibility reasons (specifically for color blind users, or users with color contrast issues), it is highly recommended to always provide some other visual means of conveying that a row is selected, such as a virtual column as shown in the example below.

Selection mode:

multisinglerange

| Selected | Is Active | Age | First name | Last name |
| --- | --- | --- | --- | --- |
|  Not selected | true | 40 | Dickerson | Macdonald |
|  Not selected | false | 21 | Larsen | Shaw |
|  Not selected | false | 89 | Geneva | Wilson |
|  Not selected | true | 38 | Jami | Carney |

Select allClear selectedSelect 3rd rowUnselect 3rd row

Selected Rows:  
\[\]

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormGroup
      label="Selection mode:"
      label-for="table-select-mode-select"
      label-cols-md="4"
    >
      <BFormSelect
        id="table-select-mode-select"
        v-model="selectMode"
        :options="modes"
        class="mb-3"
      />
    </BFormGroup>

    <BTable
      ref="selectable-table"
      :items="items"
      :fields="fields"
      :select-mode="selectMode"
      responsive="sm"
      selectable
      @update:selected-items="onSelectedItems"
    >
      <!-- Example scoped slot for select state illustrative purposes -->
      <template #cell(selected)="{rowSelected}">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </BTable>
    <p>
      <BButton
        size="sm"
        class="me-2"
        @click="selectAllRows"
        >Select all</BButton
      >
      <BButton
        size="sm"
        class="me-2"
        @click="clearSelected"
        >Clear selected</BButton
      >
      <BButton
        size="sm"
        class="me-2"
        @click="selectThirdRow"
        >Select 3rd row</BButton
      >
      <BButton
        size="sm"
        @click="unselectThirdRow"
        >Unselect 3rd row</BButton
      >
    </p>
    <p>
      Selected Rows:<br />
      {{ selected }}
    </p>
  </div>
</template>

<script setup lang="ts">
import {ref, useTemplateRef} from 'vue'
import {BTable} from 'bootstrap-vue-next/components/BTable'
import type {ComponentExposed} from 'vue-component-type-helpers'

interface Person {
  first_name: string
  last_name: string
  age: number
  isActive: boolean
}

const selectableTable = useTemplateRef<ComponentExposed<typeof BTable>>('selectable-table')

const modes = ['multi', 'single', 'range']
const fields = ['selected', 'isActive', 'age', 'first_name', 'last_name']
const items: Person[] = [
  {isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
  {isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw'},
  {isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson'},
  {isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney'},
]
const selectMode = ref<'multi' | 'single' | 'range'>('multi')

const selected = ref<Person[]>([])

const onSelectedItems = (selectedItems: readonly Person[]) => {
  selected.value = [...selectedItems]
}

const selectAllRows = () => {
  selectableTable?.value?.selection.setAll()
}
const clearSelected = () => {
  selectableTable?.value?.selection.clear()
}
const selectThirdRow = () => {
  // Rows are indexed from 0, so the third row is index 2
  // Must be the item object, not the index
  selectableTable?.value?.selection.add(items[2])
}
const unselectThirdRow = () => {
  // Rows are indexed from 0, so the third row is index 2
  // Must be the item object, not the index
  selectableTable?.value?.selection.remove(items[2])
}
</script>
```

### Exposed API [​](#exposed-api)

`<BTable>` and `<BTableLite>` expose methods and properties through template refs. See the Component Reference Exposed sections for [BTable](#comp-reference-btable-exposed) and [BTableLite](#comp-reference-btablelite-exposed) for complete details on all exposed members including the `selection` and `expansion` controllers.

## Sorting [​](#sorting)

As mentioned in the [Fields](#fields-column-definitions) section above, you can make columns sortable in `<BTable>`. Clicking on a sortable column header will sort the column in ascending direction (smallest first), while clicking on it again will switch the direction of sorting to descending (largest first). Clicking on it a third time will stop sorting on the column. For single column sorting (e.g. `multisort===false`) clicking on a differnt sortable column header will sort that column in ascending order and clear the sort order for the previously sorted column.

You can control which column is pre-sorted and the order of sorting (ascending or descending). To pre-specify the column to be sorted use the `sortBy` model. For single column sorting (e.g. `multisort===false`) `sortBy` should be an array containing a single `BTableSortBy` object with a defined `order` field.

ts

```
type BTableSortByOrder = 'desc' | 'asc' | undefined
type BTableSortBy<T = unknown> = {
  order: BTableSortByOrder
  key: string
}
```

-   **Ascending**: Items are sorted lowest to highest (i.e. `A` to `Z`) and will be displayed with the lowest value in the first row with progressively higher values in the following rows.
-   **Descending**: Items are sorted highest to lowest (i.e. `Z` to `A`) and will be displayed with the highest value in the first row with progressively lower values in the following rows.

By default the comparer function does a `numeric localeCompare`. If one wishes to change this, use a custom comparer function in the field definition.

| Last Name | First Name | Age | Is Active |
| --- | --- | --- | --- |
| Macdonald | Zelda | 45 | true |
| Shaw | Larsen | 21 | false |
| Carney | Jami | 38 | true |
| Wilson | Geneva | 89 | false |
| Wilson | Gary | 89 | false |
| Macdonald | Dickerson | 40 | true |

HTML StackBlitz

vue

```
<template>
  <BTable
    :sort-by="[{key: 'first_name', order: 'desc'}]"
    :items="items"
    :fields="fields"
  />
</template>

<script setup lang="ts">
import type {TableFieldRaw, TableItem} from 'bootstrap-vue-next'

interface SortPerson {
  first_name: string
  last_name: string
  age: number
  isActive: boolean
}

const items: TableItem<SortPerson>[] = [
  {isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
  {isActive: true, age: 45, first_name: 'Zelda', last_name: 'Macdonald'},
  {isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw'},
  {isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson'},
  {isActive: false, age: 89, first_name: 'Gary', last_name: 'Wilson'},
  {isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney'},
]

const fields: Exclude<TableFieldRaw<SortPerson>, string>[] = [
  {key: 'last_name', sortable: true},
  {key: 'first_name', sortable: true},
  {key: 'age', sortable: true},
  {key: 'isActive', sortable: false},
]
</script>
```

`sorbBy` is a [named model](https://vuejs.org/guide/components/v-model.html#multiple-v-model-bindings) so it can be bound to an object that will be updated with the current sort state when the user changes sorting by clicking the headers.

| Last Name | First Name | Age | Is Active |
| --- | --- | --- | --- |
| Macdonald | Zelda | 45 | true |
| Shaw | Larsen | 21 | false |
| Carney | Jami | 38 | true |
| Wilson | Geneva | 89 | false |
| Wilson | Gary | 89 | false |
| Macdonald | Dickerson | 40 | true |

sortBy = \[{"key":"first\_name","order":"desc"}\]

singleSortBy = "first\_name"

HTML StackBlitz

vue

```
<template>
  <BTable v-model:sort-by="sortBy" :items="items" :fields="fields" />
  <div>sortBy = {{ JSON.stringify(sortBy) }}</div>
  <div>singleSortBy = {{ JSON.stringify(singleSortBy) }}</div>
</template>

<script setup lang="ts">
import type { BTableSortBy, TableFieldRaw, TableItem } from 'bootstrap-vue-next'
import { computed, ref } from 'vue'

interface SortPerson {
  first_name: string
  last_name: string
  age: number
  isActive: boolean
}

const items: TableItem<SortPerson>[] = [
  { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
  { isActive: true, age: 45, first_name: 'Zelda', last_name: 'Macdonald' },
  { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
  { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
  { isActive: false, age: 89, first_name: 'Gary', last_name: 'Wilson' },
  { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
]

const fields: TableFieldRaw<SortPerson>[] = [
  { key: 'last_name', sortable: true },
  { key: 'first_name', sortable: true },
  { key: 'age', sortable: true },
  { key: 'isActive', sortable: false },
]

const sortBy = ref<BTableSortBy[]>([{ key: 'first_name', order: 'desc' }])

const singleSortBy = computed(() => (sortBy.value.length ? sortBy.value[0]?.key : undefined))
</script>
```

Tables can be sorted by multiple columns. Programmaticly, this can be done by adding more entries to the `sortBy` array. From the user inteface, multi-sort works as follows:

-   Clicking on a sortable header that isn't currently sorted adds it as `ascending` to the end of the sortBy list
-   Clicking on a sortable header that is currently sorted as ascending makes it **descending**, but leaves it in the same order in the `sortBy` list
-   Clicking on a sortable header that is currently sorted as descending will set the order to undefined. If `must-sort` is `true` OR if `mustSort` is an array that contains that columns `key`, it will skip to be `ascending`

| Last Name | First Name | Age | Is Active |
| --- | --- | --- | --- |
| Carney | Jami | 38 | true |
| Macdonald | Dickerson | 40 | true |
| Macdonald | Zelda | 45 | true |
| Shaw | Larsen | 21 | false |
| Wilson | Gary | 89 | false |
| Wilson | Geneva | 89 | false |

sortBy = \[{"key":"last\_name","order":"asc"},{"key":"first\_name","order":"asc"}\]

HTML StackBlitz

vue

```
<template>
  <BTable
    v-model:sort-by="multiSortBy"
    :items="sortItems"
    :fields="sortFields"
    :multisort="true"
  />
  <div>sortBy = {{ JSON.stringify(multiSortBy) }}</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type {BTableSortBy, TableFieldRaw, TableItem} from 'bootstrap-vue-next'

interface SortPerson {
  first_name: string
  last_name: string
  age: number
  isActive: boolean
}

const sortItems: TableItem<SortPerson>[] = [
  {isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
  {isActive: true, age: 45, first_name: 'Zelda', last_name: 'Macdonald'},
  {isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw'},
  {isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson'},
  {isActive: false, age: 89, first_name: 'Gary', last_name: 'Wilson'},
  {isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney'},
]

const sortFields: TableFieldRaw<SortPerson>[] = [
  {key: 'last_name', sortable: true},
  {key: 'first_name', sortable: true},
  {key: 'age', sortable: true},
  {key: 'isActive', sortable: false},
]

const multiSortBy = ref<BTableSortBy[]>([
  {key: 'last_name', order: 'asc'},
  {key: 'first_name', order: 'asc'},
])
</script>
```

### Change initial sort direction [​](#change-initial-sort-direction)

Control the order in which ascending and descending sorting is applied when a sortable column header is clicked, by using the `initial-sort-direction` prop on the table or the `initialSortDirection` property in field definitions. The default value `asc` applies ascending sort first (when a column is not currently sorted). To reverse the behavior and sort in descending direction first, set it to `desc`.

If you don't want the current sorting direction to change when clicking another sortable column header, set the value to `last`. This will maintain the sorting direction of the previously sorted column.

The table-level `initial-sort-direction` prop sets the default for all sortable columns, while the field-level `initialSortDirection` property allows you to override this on a per-column basis. The field-level prop takes precedence.

| Last Name | First Name | Age | Is Active |
| --- | --- | --- | --- |
| Macdonald | Zelda | 45 | true |
| Shaw | Larsen | 21 | false |
| Carney | Jami | 38 | true |
| Wilson | Geneva | 89 | false |
| Wilson | Gary | 89 | false |
| Macdonald | Dickerson | 40 | true |

HTML StackBlitz

vue

```
<template>
  <BTable
    :sort-by="[{key: 'first_name', order: 'desc'}]"
    :items="items"
    :fields="fields"
  />
</template>

<script setup lang="ts">
import {type TableFieldRaw, type TableItem} from 'bootstrap-vue-next'

interface SortPerson {
  first_name: string
  last_name: string
  age: number
  isActive: boolean
}

const items: TableItem<SortPerson>[] = [
  {isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
  {isActive: true, age: 45, first_name: 'Zelda', last_name: 'Macdonald'},
  {isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw'},
  {isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson'},
  {isActive: false, age: 89, first_name: 'Gary', last_name: 'Wilson'},
  {isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney'},
]

const fields: Exclude<TableFieldRaw<SortPerson>, string>[] = [
  {key: 'last_name', sortable: true},
  {key: 'first_name', sortable: true},
  {key: 'age', sortable: true, initialSortDirection: 'desc'},
  {key: 'isActive', sortable: false},
]
</script>
```

See the [complete example](#complete-example) for a demonstration or the table-level `initial-sort-direction`.

### Custom Sort Comparers [​](#custom-sort-comparers)

Each field definition may include a `sortCompare` field of the type `BTableSortByComparerFunction<T = any> = (a: T, b: T, key: string) => number`. This function takes the items to be compared and the key to compare on. Since the key is passed in, you may use the same function for multiple fields or you can craft a different comparer function for each field.

You can also set a table-level `sort-compare` prop that will be used as the default comparer for all sortable fields. Field-level `sortCompare` takes precedence over the table-level setting.

Leaving both the field-level `sortCompare` and table-level `sort-compare` undefined will fall back to using the default comparer, which looks like this:

ts

```
const defaultComparer = (a: unknown, b: unknown, key: string): number =>
  getStringValue(a, key).localeCompare(getStringValue(b, key), undefined, { numeric: true })
```

where `getStringValue` retrieves the field value as a string.

If you have a particular field that you want to sort by with custom logic, you can set the `sortCompare` property in the field definition:

ts

```
const removeArticles = (str: string) => str.replace(/^(a |the )/i, '')
const titleFieldDefinition = {
  key: 'titleField',
  sortable: true,
  sortCompare: (a: T, b: T, key: string) =>
    removeArticles(a.titleField).localeCompare(removeArticles(b.titleField)),
}
```

The default sorting algorithm parses object syntax by using an internal function `getStringValue`. It's main purpose is to fetch the correct value from various types (object, string, etc), for example `{foo: {bar: '1'}}`, one can use `'foo.bar'` as an input to the function to get the value in the object -- `1`. It also returns the result after formatting. This function is exposed to allow for customization. with different options.

In the example below, we enable sorting including casing, but one could as easily set the locale or modify any of the other options of [`localeCompare`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)

Default

Lowercase First

Uppercase First

| Last Name | First Name | Age | Is Active |
| --- | --- | --- | --- |
| Carney | Jami | 38 | true |
| Macdonald | Zelda | 45 | true |
| MacDonald | Dickerson | 40 | true |
| shaw | larsen | 25 | false |
| Shaw | Larsen | 21 | false |
| wilson | geneva | 32 | false |
| Wilson | Geneva | 89 | false |
| Wilson | Gary | 89 | false |

sortBy = \[{"key":"last\_name","order":"asc"}\]

singleSortBy = "last\_name"

HTML StackBlitz

vue

```
<template>
  <BFormRadioGroup v-model="caseFirst">
    <BFormRadio value="false">Default</BFormRadio>
    <BFormRadio value="lower">Lowercase First</BFormRadio>
    <BFormRadio value="upper">Uppercase First</BFormRadio>
  </BFormRadioGroup>
  <BTable ref="my-table" v-model:sort-by="sortBy" :items="items" :fields="fields" />
  <div>sortBy = {{ JSON.stringify(sortBy) }}</div>
  <div>singleSortBy = {{ JSON.stringify(singleSortBy) }}</div>
</template>

<script setup lang="ts">
import type { BTableSortBy, TableField, TableItem } from 'bootstrap-vue-next'
import { computed, ref, useTemplateRef } from 'vue'

const table = useTemplateRef('my-table')

const caseFirst = ref<'lower' | 'upper' | 'false'>('false')

const getStringValue = (item: SortPerson, key: string): string =>
  table.value?.getStringValue(item, key) ?? ''

const comparer = (a: SortPerson, b: SortPerson, key: string) =>
  getStringValue(a, key).localeCompare(getStringValue(b, key), undefined, {
    caseFirst: caseFirst.value,
  })

interface SortPerson {
  first_name: string
  last_name: string
  age: number
  isActive: boolean
}

const items: TableItem<SortPerson>[] = [
  { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'MacDonald' },
  { isActive: true, age: 45, first_name: 'Zelda', last_name: 'Macdonald' },
  { isActive: false, age: 25, first_name: 'larsen', last_name: 'shaw' },
  { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
  { isActive: false, age: 32, first_name: 'geneva', last_name: 'wilson' },
  { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
  { isActive: false, age: 89, first_name: 'Gary', last_name: 'Wilson' },
  { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
]

const fields: TableField<SortPerson>[] = [
  { key: 'last_name', sortable: true, sortCompare: comparer },
  { key: 'first_name', sortable: true, sortCompare: comparer },
  { key: 'age', sortable: true },
  { key: 'isActive', sortable: false },
]

const sortBy = ref<BTableSortBy[]>([{ key: 'last_name', order: 'asc' }])

const singleSortBy = computed(() => (sortBy.value.length ? sortBy.value[0]?.key : undefined))
</script>
```

### Sort Icon Positioning [​](#sort-icon-positioning)

By default, sort icons are displayed at the far right edge of sortable column headers using CSS background images. This prevents the icons from wrapping to a new line and ensures consistent appearance.

You can position the sort icon on the left side of the header cell instead by setting the `sort-icon-left` prop to `true`.

##### Default (icons at far right of cell)

| First Name | Last Name | Age | City |
| --- | --- | --- | --- |
| Dickerson | Macdonald | 40 | New York |
| Larsen | Shaw | 21 | Los Angeles |
| Geneva | Wilson | 89 | Chicago |
| Jami | Carney | 38 | Houston |

##### Icons at left of cell (`sort-icon-left`)

| First Name | Last Name | Age | City |
| --- | --- | --- | --- |
| Dickerson | Macdonald | 40 | New York |
| Larsen | Shaw | 21 | Los Angeles |
| Geneva | Wilson | 89 | Chicago |
| Jami | Carney | 38 | Houston |

HTML StackBlitz

vue

```
<template>
  <div>
    <h5>Default (icons at far right of cell)</h5>
    <BTable
      :items="items"
      :fields="fields"
    />

    <h5 class="mt-4">Icons at left of cell (<code>sort-icon-left</code>)</h5>
    <BTable
      :items="items"
      :fields="fields"
      sort-icon-left
    />
  </div>
</template>

<script setup lang="ts">
import type {TableFieldRaw, TableItem} from 'bootstrap-vue-next'

interface Person {
  first_name: string
  last_name: string
  age: number
  city: string
}

const items: TableItem<Person>[] = [
  {age: 40, first_name: 'Dickerson', last_name: 'Macdonald', city: 'New York'},
  {age: 21, first_name: 'Larsen', last_name: 'Shaw', city: 'Los Angeles'},
  {age: 89, first_name: 'Geneva', last_name: 'Wilson', city: 'Chicago'},
  {age: 38, first_name: 'Jami', last_name: 'Carney', city: 'Houston'},
]

const fields: Exclude<TableFieldRaw<Person>, string>[] = [
  {key: 'first_name', label: 'First Name', sortable: true},
  {key: 'last_name', label: 'Last Name', sortable: true},
  {key: 'age', label: 'Age', sortable: true},
  {key: 'city', label: 'City', sortable: true},
]
</script>
```

**Note:** For more advanced control over header layout and sorting behavior, you can use [scoped slots for header and footer rendering](#header-and-footer-custom-rendering-via-scoped-slots). The scoped slots provide access to `selectAllRows` and `clearSelected` functions for managing row selection, and allow you to create completely custom header layouts while maintaining sorting functionality through the `head-clicked` event.

### Customizing Sort Icons [​](#customizing-sort-icons)

Bootstrap-Vue-Next provides flexible ways to customize sort icons to match your design system or icon library.

#### CSS Custom Properties [​](#css-custom-properties)

The easiest way to customize sort icons is by overriding CSS custom properties in your stylesheet. This approach doesn't require rebuilding or modifying Vue components.

| First Name | Last Name | Age |
| --- | --- | --- |
| John | Doe | 42 |
| Jane | Smith | 36 |
| Bob | Wilson | 55 |
| Alice | Johnson | 28 |

HTML StackBlitz

vue

```
<template>
  <div>
    <BTable
      :fields="fields"
      :items="items"
      class="custom-sort-icons"
      striped
      hover
    />
  </div>
</template>

<script setup lang="ts">
interface Person {
  first_name: string
  last_name: string
  age: number
}

const fields = [
  {key: 'first_name', label: 'First Name', sortable: true},
  {key: 'last_name', label: 'Last Name', sortable: true},
  {key: 'age', label: 'Age', sortable: true},
]

const items: Person[] = [
  {first_name: 'John', last_name: 'Doe', age: 42},
  {first_name: 'Jane', last_name: 'Smith', age: 36},
  {first_name: 'Bob', last_name: 'Wilson', age: 55},
  {first_name: 'Alice', last_name: 'Johnson', age: 28},
]
</script>

<style scoped>
/* Custom sort icons using CSS variables */
.custom-sort-icons {
  /* Unsorted state - double arrows pointing up/down */
  --bvn-sort-icon-none: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='%23999' viewBox='0 0 16 16'%3E%3Cpath opacity='0.5' d='M8 4l3 3H5l3-3zm0 8l-3-3h6l-3 3z'/%3E%3C/svg%3E");

  /* Ascending - solid up arrow */
  --bvn-sort-icon-asc: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='%23007bff' viewBox='0 0 16 16'%3E%3Cpath d='M8 4l3 3H5l3-3z'/%3E%3C/svg%3E");

  /* Descending - solid down arrow */
  --bvn-sort-icon-desc: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='%23007bff' viewBox='0 0 16 16'%3E%3Cpath d='M8 12l-3-3h6l-3 3z'/%3E%3C/svg%3E");
}
</style>
```

The following CSS variables control the sort icons:

-   `--bvn-sort-icon-none` - Icon shown when column is sortable but not currently sorted
-   `--bvn-sort-icon-asc` - Icon shown when column is sorted in ascending order
-   `--bvn-sort-icon-desc` - Icon shown when column is sorted in descending order

The icons use SVG data URIs, which allow you to customize the icon shape and color. You can use tools like [URL-encoder for SVG](https://yoksel.github.io/url-encoder/) to convert your SVG icons to data URIs.

#### Header Scoped Slots [​](#header-scoped-slots)

For maximum flexibility, use the `head(fieldkey)` scoped slots to completely customize the header content including sort icons. This approach lets you use any icon library (Bootstrap Icons, Font Awesome, Material Icons, etc.) or custom SVG components.

| 
First Name

 | 

Last Name

 | 

Age

 |
| --- | --- | --- |
| John | Doe | 42 |
| Jane | Smith | 36 |
| Bob | Wilson | 55 |
| Alice | Johnson | 28 |

HTML StackBlitz

vue

```
<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <BTable
      :fields="fields"
      :items="items"
      striped
      hover
      no-sortable-icon
      @head-clicked="onHeadClicked"
    >
      <!-- Custom header with sort icons for first_name -->
      <template #head(first_name)="data">
        <div class="sortable-header">
          {{ data.label }}
          <span
            v-if="getSortIcon(data.field)"
            v-html="getSortIcon(data.field)"
          />
        </div>
      </template>

      <!-- Custom header with sort icons for last_name -->
      <template #head(last_name)="data">
        <div class="sortable-header">
          {{ data.label }}
          <span
            v-if="getSortIcon(data.field)"
            v-html="getSortIcon(data.field)"
          />
        </div>
      </template>

      <!-- Custom header with sort icons for age -->
      <template #head(age)="data">
        <div class="sortable-header">
          {{ data.label }}
          <span
            v-if="getSortIcon(data.field)"
            v-html="getSortIcon(data.field)"
          />
        </div>
      </template>
    </BTable>
  </div>
</template>

<script setup lang="ts">
import type {TableField} from 'bootstrap-vue-next'

interface Person {
  first_name: string
  last_name: string
  age: number
}

const fields = [
  {key: 'first_name', label: 'First Name', sortable: true},
  {key: 'last_name', label: 'Last Name', sortable: true},
  {key: 'age', label: 'Age', sortable: true},
]

const items: Person[] = [
  {first_name: 'John', last_name: 'Doe', age: 42},
  {first_name: 'Jane', last_name: 'Smith', age: 36},
  {first_name: 'Bob', last_name: 'Wilson', age: 55},
  {first_name: 'Alice', last_name: 'Johnson', age: 28},
]

// Custom SVG icons (you could also use Bootstrap Icons, Font Awesome, etc.)
// Note: In production, prefer component-based icons over v-html for better security
const icons = {
  none: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" style="opacity: 0.3" viewBox="0 0 16 16"><path d="M8 4l3 3H5l3-3zm0 8l-3-3h6l-3 3z"/></svg>',
  ascending:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 4l3 3H5l3-3z"/></svg>',
  descending:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 12l-3-3h6l-3 3z"/></svg>',
}

function getSortIcon(field: TableField<Person>): string {
  // thAttr can be an object or function, so check if it's an object first
  const ariaSort =
    typeof field.thAttr === 'object' && field.thAttr !== null
      ? field.thAttr['aria-sort']
      : undefined

  if (ariaSort === 'ascending') return icons.ascending
  if (ariaSort === 'descending') return icons.descending
  if (ariaSort === 'none') return icons.none

  return ''
}

function onHeadClicked() {
  // Sorting is handled automatically by BTable
  // This event is available if you need additional custom logic
}
</script>

<style scoped>
.sortable-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
</style>
```

The scoped slot provides access to the `field` object, which includes `thAttr['aria-sort']` indicating the current sort state (`'none'`, `'ascending'`, or `'descending'`). Note that `thAttr` may be a function or undefined, so type checking is recommended (see demo for example).

**Tip:** When using scoped slots, the table's `head-clicked` event is still emitted, allowing you to maintain sorting functionality while having full control over the visual presentation.

#### Disabling Sort Icons [​](#disabling-sort-icons)

Set the `no-sortable-icon` prop to `true` to hide sort icons entirely while maintaining sorting functionality. This is useful when you want to indicate sorting through other means, such as background colors or custom slot content.

## Filtering [​](#filtering)

Filtering, when used, is applied by default to the **original items** array data. `Btable` provides several options for how data is filtered.

It is currently not possible to filter based on result of formatting via [scoped field slots](#scoped-field-slots).

### Built in filtering [​](#built-in-filtering)

The item's row data values are stringified (see the sorting section above for how stringification is done) and the filter searches that stringified data (excluding any of the special properties that begin with an underscore `'_'`). The stringification also, by default, includes any data not shown in the presented columns.

With the default built-in filter function, the `filter` prop value can be a string. Use the `filterFunction` prop for complex filtering.

If the stringified row contains the provided string value then it is included in the displayed results.

Set the `filter` prop to `null` or an empty string to clear the current filter.

### Built in filtering options [​](#built-in-filtering-options)

There are several options for controlling what data the filter is applied against.

-   The `filterable` prop (which replaces BootstrapVue's `filter-included-fields`) accepts an array of field keys to include in filtering. When set, only the specified fields will be searchable. If not set or empty, all fields are included.
-   Note: `filter-ignored-fields` from BootstrapVue is not implemented. Use `filterable` to specify which fields to search instead.
-   Normally, `<BTable>` filters based on the stringified record data. If the field has a `formatter` function specified, you can optionally filter based on the result of the formatter by setting the [field definition property](#field-definition-reference) `filterByFormatted` to `true`. If the field does not have a formatter function, this option is ignored. You can optionally pass a formatter function _reference_, to be used for filtering only, to the field definition property `filterByFormatted`.

The props `filter-ignored-fields` and `filter-included-fields`, and the field definition property `filterByFormatted` have no effect when using a [custom filter function](#custom-filter-function), or [items provider](#using-items-provider-functions) based filtering.

### Custom filter function [​](#custom-filter-function)

You can also use a custom filter function, by setting the prop `filter-function` to a reference of custom filter test function. The filter function signature is `(item: Readonly<Item>, filter: string | undefined) => boolean`

-   `item` is the original item row record data object.
-   `filter` value of the `filter` prop

The function should return `true` if the record matches your criteria or `false` if the record is to be filtered out.

For proper reactive updates to the displayed data, when not filtering you should set the `filter` prop to `null` or an empty string (and not an empty object or array). The filter function will not be called when the `filter` prop is a falsey value.

The display of the `empty-filter-text` relies on the truthiness of the `filter` prop.

## Pagination and Filtering [​](#pagination-and-filtering)

### Pagination [​](#pagination)

`<BTable>` supports built in pagination of item data. You can control how many rows are displayed at a time by setting the `per-page` prop to the maximum number of rows you would like displayed, and use the `current-page` prop to specify which page to display (starting from page `1`). If you set `current-page` to a value larger than the computed number of pages, then no rows will be shown.

You can use the [`<BPagination>`](/bootstrap-vue-next/docs/components/pagination.html) component in conjunction with `<BTable>` for providing control over pagination.

Filter

Per page51015

| First Name | Last Name | Age |
| --- | --- | --- |
| John | Doe | 42 |
| Jane | Doe | 36 |
| Bob | Smith | 29 |
| Alice | Smith | 31 |
| Charlie | Brown | 45 |

-   «
-   ‹
-   1
-   2
-   ›
-   »

Total filtered items: 10

HTML StackBlitz

vue

```
<template>
  <div>
    <BRow class="mb-3">
      <BCol md="6">
        <BFormGroup label="Filter" label-for="filter-input">
          <BFormInput
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Type to search"
          />
        </BFormGroup>
      </BCol>
      <BCol md="6">
        <BFormGroup label="Per page" label-for="per-page-select">
          <BFormSelect
            id="per-page-select"
            v-model="perPage"
            :options="[
              { value: 5, text: '5' },
              { value: 10, text: '10' },
              { value: 15, text: '15' },
            ]"
          />
        </BFormGroup>
      </BCol>
    </BRow>

    <BTable
      ref="tableRef"
      :items="items"
      :fields="fields"
      :filter="filter"
      :per-page="perPage"
      :current-page="currentPage"
    />

    <BPagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="center" />

    <p class="mt-3">Total filtered items: {{ totalRows }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { BTable } from 'bootstrap-vue-next/components/BTable'
import type { TableFieldRaw, TableItem } from 'bootstrap-vue-next'
import type { ComponentExposed } from 'vue-component-type-helpers'

interface Person {
  first_name: string
  last_name: string
  age: number
}

const items: TableItem<Person>[] = [
  { first_name: 'John', last_name: 'Doe', age: 42 },
  { first_name: 'Jane', last_name: 'Doe', age: 36 },
  { first_name: 'Bob', last_name: 'Smith', age: 29 },
  { first_name: 'Alice', last_name: 'Smith', age: 31 },
  { first_name: 'Charlie', last_name: 'Brown', age: 45 },
  { first_name: 'Diana', last_name: 'Prince', age: 28 },
  { first_name: 'Edward', last_name: 'Norton', age: 52 },
  { first_name: 'Fiona', last_name: 'Apple', age: 38 },
  { first_name: 'George', last_name: 'Martin', age: 61 },
  { first_name: 'Helen', last_name: 'Mirren', age: 55 },
]

const fields: Exclude<TableFieldRaw<Person>, string>[] = [
  { key: 'first_name', label: 'First Name', sortable: true },
  { key: 'last_name', label: 'Last Name', sortable: true },
  { key: 'age', label: 'Age', sortable: true },
]

const filter = ref('')
const perPage = ref(5)
const currentPage = ref(1)

// Use template ref to access BTable's items (filtered, pre-pagination)
const tableRef = useTemplateRef<ComponentExposed<typeof BTable<Person>>>('tableRef')

// Compute total rows from items (accounts for filtering, excludes pagination)
const totalRows = computed(() => tableRef.value?.items.length ?? items.length)
</script>
```

### Filter events [​](#filter-events)

When local filtering is applied, and the resultant number of items change, `<BTable>` will emit the `filtered` event with a single argument of type `Item[]`: which is the complete list of items passing the filter routine. **Treat this argument as read-only.**

Setting the prop `filter` to null or an empty string will clear local items filtering.

## Using items provider functions [​](#using-items-provider-functions)

As mentioned under the [Items](#items-record-data) prop section, it is possible to use a function to provide the row data (items) by specifying a function reference via the `provider` prop.

When using a provider, the fetched items are written back through `v-model:items`. This means you can use `v-model:items` to access the items returned by the provider:

html

```
<BTable v-model:items="myItems" :provider="myProvider" :fields="fields" />
```

If you do not need to access the provider's fetched items from the parent component, you can simply omit the `v-model:items` binding. When not using a provider, you can use a one-way binding (`:items="myItems"`) as before.

NOTE

If both the `provider` and `items` props are set, the `provider` will update the `items` value when it fetches new data.

The provider function is called with the following signature:

ts

```
type BTableProviderContext<T = unknown> = {
  sortBy: BTableSortBy[] | undefined
  filter: string | undefined
  currentPage: number
  perPage: number
}

type BTableProvider<T> = (
  context: Readonly<BTableProviderContext<T>>,
) => MaybePromise<T[] | undefined>
```

The `ctx` is the context object associated with the table state, and contains the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `currentPage` | `number` | The current page number (starting from 1, the value of the `current-page` prop) |
| `perPage` | `number` | The maximum number of rows per page to display (the value of the `per-page` prop) |
| `filter` | `string | undefined` | The value of the `filter` prop |
| `sortBy` | `BTableSortBy<T>[] | undefined` | The current sort state as a `BTableSortBy[]` (array of `{ key, order }` entries), or `undefined` when unsorted |
| `signal` | `AbortSignal` | An AbortSignal that can be used to cancel the request when a new provider call is triggered |

### Debouncing Provider Calls [​](#debouncing-provider-calls)

To avoid excessive provider calls (e.g., when typing rapidly in a filter), you can use the `debounce` and `debounce-max-wait` props:

-   `debounce`: Delay in milliseconds before calling the provider after changes (default: `0` for immediate execution)
-   `debounce-max-wait`: Maximum time in milliseconds to wait before forcing a provider call, even if changes are still occurring

Filter

Debounce delays filtering by 500ms after you stop typing. Without debounce, every keystroke would trigger filtering immediately.

| Name | Age | City |
| --- | --- | --- |
| Alice Johnson | 28 | New York |
| Bob Smith | 34 | Los Angeles |
| Charlie Brown | 22 | Chicago |
| Diana Prince | 29 | San Francisco |
| Eve Davis | 31 | Boston |
| Frank Miller | 45 | Seattle |
| Grace Lee | 27 | Austin |
| Henry Wilson | 38 | Denver |
| Ivy Chen | 25 | Portland |
| Jack Taylor | 42 | Miami |

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormGroup
      label="Filter"
      label-for="filter-input"
      class="mb-3"
    >
      <BFormInput
        id="filter-input"
        v-model="filter"
        type="search"
        placeholder="Type to search (with 500ms debounce)..."
      />
    </BFormGroup>

    <p class="text-muted">
      Debounce delays filtering by 500ms after you stop typing. Without debounce, every keystroke
      would trigger filtering immediately.
    </p>

    <BTable
      :items="items"
      :fields="fields"
      :filter="filter"
      :debounce="500"
      :debounce-max-wait="2000"
      :per-page="10"
      :current-page="1"
      striped
      hover
    />
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

interface Person {
  name: string
  age: number
  city: string
}

const filter = ref('')

const fields = [
  {key: 'name', sortable: true},
  {key: 'age', sortable: true},
  {key: 'city', sortable: true},
]

const items: Person[] = [
  {name: 'Alice Johnson', age: 28, city: 'New York'},
  {name: 'Bob Smith', age: 34, city: 'Los Angeles'},
  {name: 'Charlie Brown', age: 22, city: 'Chicago'},
  {name: 'Diana Prince', age: 29, city: 'San Francisco'},
  {name: 'Eve Davis', age: 31, city: 'Boston'},
  {name: 'Frank Miller', age: 45, city: 'Seattle'},
  {name: 'Grace Lee', age: 27, city: 'Austin'},
  {name: 'Henry Wilson', age: 38, city: 'Denver'},
  {name: 'Ivy Chen', age: 25, city: 'Portland'},
  {name: 'Jack Taylor', age: 42, city: 'Miami'},
]
</script>
```

### Handling Request Cancellation [​](#handling-request-cancellation)

The provider context includes an `AbortSignal` that is automatically aborted when a new provider call is triggered. This allows you to cancel in-flight requests to prevent stale data and race conditions.

Example using the signal with fetch:

typescript

```
const myProvider = async (ctx: BTableProviderContext) => {
  const response = await fetch('/api/data', {
    signal: ctx.signal, // Pass the signal to fetch
  })
  return response.json()
}
```

For custom async operations, listen to the abort event:

typescript

```
const myProvider = async (ctx: BTableProviderContext) => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      // Perform your async operation
      resolve(items)
    }, 1000)

    // Clean up when aborted
    ctx.signal.addEventListener('abort', () => {
      clearTimeout(timeout)
      reject(new Error('AbortError'))
    })
  })
}
```

Below are trimmed down versions of the [complete example](#complete-example) as a starting place for using provider functions. They use local provider functions that implement sorting and filtering. Note that sorting is done in cooperation with `<BTable>` by having the provider function react to the `context.sortBy` array that it is passed, while filtering is done entirely by the provider, which manually forces a refresh of the table when the filter is changed.

Example using a syncronous provider function:

Filter

Clear

Per page

51015Show a lot

-   «
-   ‹
-   1
-   2
-   3
-   ›
-   »

| First Name | Last Name | Person age |
| --- | --- | --- |
| Dickerson | Macdonald | 40 |
| Larsen | Shaw | 21 |
| Mini | Navarro | 9 |
| Geneva | Wilson | 89 |
| Jami | Carney | 38 |

HTML StackBlitz

vue

```
<template>
  <BContainer class="py-5">
    <!-- User Interface controls -->
    <BRow>
      <BCol
        lg="6"
        class="my-1"
      >
        <BFormGroup
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <BInputGroup size="sm">
            <BFormInput
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            />
            <BInputGroupText>
              <BButton
                :disabled="!filter"
                @click="filter = ''"
                >Clear</BButton
              >
            </BInputGroupText>
          </BInputGroup>
        </BFormGroup>
      </BCol>
      <BCol
        lg="6"
        class="my-1"
      >
        <BFormGroup
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <BFormSelect
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          />
        </BFormGroup>
      </BCol>
      <BCol
        lg="6"
        class="my-1"
      >
        <BPagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          :align="'fill'"
          size="sm"
          class="my-0"
        />
      </BCol>
    </BRow>
    <!-- Main table element for typed table-->
    <BTable
      ref="provider-table"
      v-model:sort-by="sortBy"
      :provider="provider"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :responsive="false"
      :small="true"
      :multisort="true"
    />
  </BContainer>
</template>

<script setup lang="ts">
import type {
  BTableProviderContext,
  BTableSortBy,
  ColorVariant,
  TableFieldRaw,
  TableItem,
} from 'bootstrap-vue-next'
import {BTable} from 'bootstrap-vue-next/components/BTable'
import {computed, ref, useTemplateRef, watch} from 'vue'
import {type ComponentExposed} from 'vue-component-type-helpers'

interface Person {
  first_name: string
  last_name: string
  age: number
  isActive: boolean
}

const table = useTemplateRef<ComponentExposed<typeof BTable<Person>>>('provider-table')

const provider = (context: Readonly<BTableProviderContext>) =>
  sortItems(filteredItems.value, context.sortBy).slice(
    (context.currentPage - 1) * context.perPage,
    context.currentPage * context.perPage
  )

const sortItems = (items: Person[], sortBy?: readonly BTableSortBy[]) => {
  if (!sortBy || sortBy.length === 0) {
    return items
  }

  return filteredItems.value.toSorted((a: Person, b: Person) => {
    for (const sort of sortBy) {
      if (sort.order === undefined) {
        continue
      }
      const order = sort.order === 'asc' ? 1 : -1
      const key = sort.key as keyof Person
      const aValue = a[key] as string | number
      const bValue = b[key] as string | number
      if (aValue < bValue) {
        return -1 * order
      } else if (aValue > bValue) {
        return 1 * order
      }
    }
    return 0
  })
}

const items: TableItem<Person>[] = [
  {isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
  {isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw'},
  {
    isActive: false,
    age: 9,
    first_name: 'Mini',
    last_name: 'Navarro',
    _rowVariant: 'success' as ColorVariant,
  },
  {isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson'},
  {isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney'},
  {isActive: false, age: 27, first_name: 'Essie', last_name: 'Dunlap'},
  {isActive: true, age: 40, first_name: 'Thor', last_name: 'Macdonald'},
  {
    isActive: true,
    age: 87,
    first_name: 'Larsen',
    last_name: 'Shaw',
    _cellVariants: {age: 'danger', isActive: 'warning'},
  },
  {isActive: false, age: 26, first_name: 'Mitzi', last_name: 'Navarro'},
  {isActive: false, age: 22, first_name: 'Genevieve', last_name: 'Wilson'},
  {isActive: true, age: 38, first_name: 'John', last_name: 'Carney'},
  {isActive: false, age: 29, first_name: 'Dick', last_name: 'Dunlap'},
]

const fields: Exclude<TableFieldRaw<Person>, string>[] = [
  {
    key: 'first_name',
    sortable: true,
  },
  {
    key: 'last_name',
    sortable: true,
  },
  {key: 'age', label: 'Person age', sortable: true, class: 'text-center'},
]

const pageOptions = [
  {value: 5, text: '5'},
  {value: 10, text: '10'},
  {value: 15, text: '15'},
  {value: 100, text: 'Show a lot'},
]

const currentPage = ref(1)
const perPage = ref(5)
const sortBy = ref<BTableSortBy[]>([])
const filter = ref('')

const lcFilter = computed(() => filter.value.toLocaleLowerCase())

const filteredItems = computed(() => {
  if (!filter.value) {
    return items
  }
  return items.filter(
    (item) =>
      item.first_name.toLowerCase().includes(lcFilter.value) ||
      item.last_name.toLowerCase().includes(lcFilter.value) ||
      item.age.toLocaleString().includes(lcFilter.value)
  )
})

const totalRows = computed(() => filteredItems.value.length)

watch(filter, () => {
  table.value?.refresh()
})
</script>
```

Example using an asyncronous provider function that simulates latency by sleeping for a second:

Filter

Clear

Per page

51015Show a lot

-   «
-   ‹
-   1
-   2
-   3
-   ›
-   »

| First Name | Last Name | Person age |
| --- | --- | --- |

HTML StackBlitz

vue

```
<template>
  <BContainer class="py-5">
    <!-- User Interface controls -->
    <BRow>
      <BCol lg="6" class="my-1">
        <BFormGroup
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <BInputGroup size="sm">
            <BFormInput
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            />
            <BInputGroupText>
              <BButton :disabled="!filter" @click="filter = ''">Clear</BButton>
            </BInputGroupText>
          </BInputGroup>
        </BFormGroup>
      </BCol>
      <BCol lg="6" class="my-1">
        <BFormGroup
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <BFormSelect id="per-page-select" v-model="perPage" :options="pageOptions" size="sm" />
        </BFormGroup>
      </BCol>
      <BCol lg="6" class="my-1">
        <BPagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          :align="'fill'"
          size="sm"
          class="my-0"
        />
      </BCol>
    </BRow>
    <!-- Main table element for typed table-->
    <BTable
      ref="provider-table"
      v-model:sort-by="sortBy"
      :provider="provider"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :responsive="false"
      :small="true"
      :multisort="true"
    />
  </BContainer>
</template>

<script setup lang="ts">
import {
  BTable,
  type BTableProviderContext,
  type BTableSortBy,
  type ColorVariant,
  type TableFieldRaw,
  type TableItem,
} from 'bootstrap-vue-next'
import { computed, ref, useTemplateRef, watch } from 'vue'
import { type ComponentExposed } from 'vue-component-type-helpers'

interface Person {
  first_name: string
  last_name: string
  age: number
  isActive: boolean
}

const table = useTemplateRef<ComponentExposed<typeof BTable<Person>>>('provider-table')

const provider = (context: Readonly<BTableProviderContext>) =>
  // oxlint-disable-next-line no-async-promise-executor
  new Promise<Person[]>(async (resolve) => {
    const sortedAndPaginatedItems = sortItems(filteredItems.value, context.sortBy).slice(
      (context.currentPage - 1) * context.perPage,
      context.currentPage * context.perPage,
    )
    // Sleep for a second to simulate async loading
    await new Promise((resolve) => setTimeout(resolve, 1000))
    resolve(sortedAndPaginatedItems)
  })

const sortItems = (items: Person[], sortBy?: readonly BTableSortBy[]) => {
  if (!sortBy || sortBy.length === 0) {
    return items
  }

  return filteredItems.value.toSorted((a: Person, b: Person) => {
    for (const sort of sortBy) {
      if (sort.order === undefined) {
        continue
      }
      const order = sort.order === 'asc' ? 1 : -1
      const key = sort.key as keyof Person
      const aValue = a[key] as string | number
      const bValue = b[key] as string | number
      if (aValue < bValue) {
        return -1 * order
      } else if (aValue > bValue) {
        return 1 * order
      }
    }
    return 0
  })
}

const items: TableItem<Person>[] = [
  { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
  { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
  {
    isActive: false,
    age: 9,
    first_name: 'Mini',
    last_name: 'Navarro',
    _rowVariant: 'success' as ColorVariant,
  },
  { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
  { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
  { isActive: false, age: 27, first_name: 'Essie', last_name: 'Dunlap' },
  { isActive: true, age: 40, first_name: 'Thor', last_name: 'Macdonald' },
  {
    isActive: true,
    age: 87,
    first_name: 'Larsen',
    last_name: 'Shaw',
    _cellVariants: { age: 'danger', isActive: 'warning' },
  },
  { isActive: false, age: 26, first_name: 'Mitzi', last_name: 'Navarro' },
  { isActive: false, age: 22, first_name: 'Genevieve', last_name: 'Wilson' },
  { isActive: true, age: 38, first_name: 'John', last_name: 'Carney' },
  { isActive: false, age: 29, first_name: 'Dick', last_name: 'Dunlap' },
]

const fields: Exclude<TableFieldRaw<Person>, string>[] = [
  {
    key: 'first_name',
    sortable: true,
  },
  {
    key: 'last_name',
    sortable: true,
  },
  { key: 'age', label: 'Person age', sortable: true, class: 'text-center' },
]

const pageOptions = [
  { value: 5, text: '5' },
  { value: 10, text: '10' },
  { value: 15, text: '15' },
  { value: 100, text: 'Show a lot' },
]

const currentPage = ref(1)
const perPage = ref(5)
const sortBy = ref<BTableSortBy[]>([])
const filter = ref('')

const lcFilter = computed(() => filter.value.toLocaleLowerCase())

const filteredItems = computed(() => {
  if (!filter.value) {
    return items
  }
  return items.filter(
    (item) =>
      item.first_name.toLowerCase().includes(lcFilter.value) ||
      item.last_name.toLowerCase().includes(lcFilter.value) ||
      item.age.toLocaleString().includes(lcFilter.value),
  )
})

const totalRows = computed(() => filteredItems.value.length)

watch(filter, () => {
  table.value?.refresh()
})
</script>
```

## Light-weight tables [​](#light-weight-tables)

`<BTableLite>` provides a great alternative to `<BTable>` if you just need simple display of tabular data. The `<BTableLite>` component provides all of the styling and formatting features of `<BTable>` (including row details and stacked support), while **excluding** the following features:

-   Filtering
-   Sorting
-   Pagination
-   Item provider support
-   Selectable rows
-   Busy table state and styling
-   Fixed top and bottom rows
-   Empty row support

## Simple tables [​](#simple-tables)

The `BTableSimple` component gives the user complete control over the rendering of the table content, while providing basic Bootstrap v5 table styling. `BTableSimple` is a wrapper component around the `<table>` element. Inside the component, via the default slot, you can use any or all of the BootstrapVueNext table helper components: `BThead`, `BTfoot`, `BTbody`, `BTr`, `BTh`, `BTd`, and the HTML5 elements `<caption>`, `<colgroup>` and `<col>`. Contrary to the component's name, one can create simple or complex table layouts with `BTableSimple`.

`BTableSimple` provides basic styling options via props: striped, bordered, borderless, outlined, small, hover, dark, fixed, responsive and sticky-header. Note that stacked mode is available but requires some additional markup to generate the cell headings, as described in the Simple tables and stacked mode section below. Sticky columns are also supported, but also require a bit of additional markup to specify which columns are to be sticky. See below for more information on using sticky columns.

Since `BTableSimple` is just a wrapper component, of which you will need to render content inside, it does not provide any of the advanced features of `BTable` (i.e. row events, head events, sorting, pagination, filtering, foot-clone, items, fields, etc.).

Items sold in August, grouped by Country and City: 
| Region | Clothes | Accessories |
| --- | --- | --- |
| Country | City | Trousers | Skirts | Dresses | Bracelets | Rings |
| --- | --- | --- | --- | --- | --- | --- |
| Belgium | Antwerp | 56 | 22 | 43 | 72 | 23 |
| Gent | 46 | 18 | 50 | 61 | 15 |
| Brussels | 51 | 27 | 38 | 69 | 28 |
| The Netherlands | Amsterdam | 89 | 34 | 69 | 85 | 38 |
| Utrecht | 80 | 12 | 43 | 36 | 19 |
| Total Rows: **5** |

HTML StackBlitz

template

```
<BTableSimple
  hover
  small
  caption-top
  responsive
>
  <caption>
    Items sold in August, grouped by Country and City:
  </caption>
  <colgroup>
    <col />
    <col />
  </colgroup>
  <colgroup>
    <col />
    <col />
    <col />
  </colgroup>
  <colgroup>
    <col />
    <col />
  </colgroup>
  <BThead variant="dark">
    <BTr>
      <BTh colspan="2">Region</BTh>
      <BTh colspan="3">Clothes</BTh>
      <BTh colspan="2">Accessories</BTh>
    </BTr>
    <BTr>
      <BTh>Country</BTh>
      <BTh>City</BTh>
      <BTh>Trousers</BTh>
      <BTh>Skirts</BTh>
      <BTh>Dresses</BTh>
      <BTh>Bracelets</BTh>
      <BTh>Rings</BTh>
    </BTr>
  </BThead>
  <BTbody>
    <BTr>
      <BTh rowspan="3">Belgium</BTh>
      <BTh class="text-end">Antwerp</BTh>
      <BTd>56</BTd>
      <BTd>22</BTd>
      <BTd>43</BTd>
      <BTd variant="success">72</BTd>
      <BTd>23</BTd>
    </BTr>
    <BTr>
      <BTh class="text-end">Gent</BTh>
      <BTd>46</BTd>
      <BTd variant="warning">18</BTd>
      <BTd>50</BTd>
      <BTd>61</BTd>
      <BTd variant="danger">15</BTd>
    </BTr>
    <BTr>
      <BTh class="text-end">Brussels</BTh>
      <BTd>51</BTd>
      <BTd>27</BTd>
      <BTd>38</BTd>
      <BTd>69</BTd>
      <BTd>28</BTd>
    </BTr>
    <BTr>
      <BTh rowspan="2">The Netherlands</BTh>
      <BTh class="text-end">Amsterdam</BTh>
      <BTd variant="success">89</BTd>
      <BTd>34</BTd>
      <BTd>69</BTd>
      <BTd>85</BTd>
      <BTd>38</BTd>
    </BTr>
    <BTr>
      <BTh class="text-end">Utrecht</BTh>
      <BTd>80</BTd>
      <BTd variant="danger">12</BTd>
      <BTd>43</BTd>
      <BTd>36</BTd>
      <BTd variant="warning">19</BTd>
    </BTr>
  </BTbody>
  <BTfoot>
    <BTr>
      <BTd
        colspan="7"
        variant="secondary"
        class="text-end"
      >
        Total Rows: <b>5</b>
      </BTd>
    </BTr>
  </BTfoot>
</BTableSimple>
```

When in responsive or sticky-header mode, the `<table>` element is wrapped inside a `<div>` element. If you need to apply additional classes or attributes to the `<table>` element, use the table-classes and table-attrs, respectively.

### Simple tables and stacked mode [​](#simple-tables-and-stacked-mode)

A bit of additional markup is required on your `BTableSimple` body cells when the table is in stacked mode. Specifically, BootstrapVueNext uses a special data attribute to create the cell's heading, of which you can supply to `BTd` or `BTh` via the stacked-heading prop. Only plain strings are supported (not HTML markup), as we use the pseudo element ::before and css content property.

Here is the same table as above, set to be always stacked, which has the extra markup to handle stacked mode (specifically for generating the cell headings):

Items sold in August, grouped by Country and City: 
| Region | Clothes | Accessories |
| --- | --- | --- |
| Country | City | Trousers | Skirts | Dresses | Bracelets | Rings |
| --- | --- | --- | --- | --- | --- | --- |
| Belgium (3 Cities) | 
Antwerp

 | 

56

 | 

22

 | 

43

 | 

72

 | 

23

 |
| 

Gent

 | 

46

 | 

18

 | 

50

 | 

61

 | 

15

 |
| 

Brussels

 | 

51

 | 

27

 | 

38

 | 

69

 | 

28

 |
| The Netherlands (2 Cities) | 

Amsterdam

 | 

89

 | 

34

 | 

69

 | 

85

 | 

38

 |
| 

Utrecht

 | 

80

 | 

12

 | 

43

 | 

36

 | 

19

 |
| Total Rows: **5** |

HTML StackBlitz

template

```
<BTableSimple
  hover
  small
  caption-top
  stacked
>
  <caption>
    Items sold in August, grouped by Country and City:
  </caption>
  <colgroup>
    <col />
    <col />
  </colgroup>
  <colgroup>
    <col />
    <col />
    <col />
  </colgroup>
  <colgroup>
    <col />
    <col />
  </colgroup>
  <BThead variant="dark">
    <BTr>
      <BTh colspan="2">Region</BTh>
      <BTh colspan="3">Clothes</BTh>
      <BTh colspan="2">Accessories</BTh>
    </BTr>
    <BTr>
      <BTh>Country</BTh>
      <BTh>City</BTh>
      <BTh>Trousers</BTh>
      <BTh>Skirts</BTh>
      <BTh>Dresses</BTh>
      <BTh>Bracelets</BTh>
      <BTh>Rings</BTh>
    </BTr>
  </BThead>
  <BTbody>
    <BTr>
      <BTh
        rowspan="3"
        class="text-center"
        >Belgium (3 Cities)</BTh
      >
      <BTh
        stacked-heading="City"
        class="text-start"
        >Antwerp</BTh
      >
      <BTd stacked-heading="Clothes: Trousers">56</BTd>
      <BTd stacked-heading="Clothes: Skirts">22</BTd>
      <BTd stacked-heading="Clothes: Dresses">43</BTd>
      <BTd
        stacked-heading="Accessories: Bracelets"
        variant="success"
        >72</BTd
      >
      <BTd stacked-heading="Accessories: Rings">23</BTd>
    </BTr>
    <BTr>
      <BTh stacked-heading="City">Gent</BTh>
      <BTd stacked-heading="Clothes: Trousers">46</BTd>
      <BTd
        stacked-heading="Clothes: Skirts"
        variant="warning"
        >18</BTd
      >
      <BTd stacked-heading="Clothes: Dresses">50</BTd>
      <BTd stacked-heading="Accessories: Bracelets">61</BTd>
      <BTd
        stacked-heading="Accessories: Rings"
        variant="danger"
        >15</BTd
      >
    </BTr>
    <BTr>
      <BTh stacked-heading="City">Brussels</BTh>
      <BTd stacked-heading="Clothes: Trousers">51</BTd>
      <BTd stacked-heading="Clothes: Skirts">27</BTd>
      <BTd stacked-heading="Clothes: Dresses">38</BTd>
      <BTd stacked-heading="Accessories: Bracelets">69</BTd>
      <BTd stacked-heading="Accessories: Rings">28</BTd>
    </BTr>
    <BTr>
      <BTh
        rowspan="2"
        class="text-center"
        >The Netherlands (2 Cities)</BTh
      >
      <BTh stacked-heading="City">Amsterdam</BTh>
      <BTd
        stacked-heading="Clothes: Trousers"
        variant="success"
        >89</BTd
      >
      <BTd stacked-heading="Clothes: Skirts">34</BTd>
      <BTd stacked-heading="Clothes: Dresses">69</BTd>
      <BTd stacked-heading="Accessories: Bracelets">85</BTd>
      <BTd stacked-heading="Accessories: Rings">38</BTd>
    </BTr>
    <BTr>
      <BTh stacked-heading="City">Utrecht</BTh>
      <BTd stacked-heading="Clothes: Trousers">80</BTd>
      <BTd
        stacked-heading="Clothes: Skirts"
        variant="danger"
        >12</BTd
      >
      <BTd stacked-heading="Clothes: Dresses">43</BTd>
      <BTd stacked-heading="Accessories: Bracelets">36</BTd>
      <BTd
        stacked-heading="Accessories: Rings"
        variant="warning"
        >19</BTd
      >
    </BTr>
  </BTbody>
  <BTfoot>
    <BTr>
      <BTd
        colspan="7"
        variant="secondary"
        class="text-end"
      >
        Total Rows: <b>5</b>
      </BTd>
    </BTr>
  </BTfoot>
</BTableSimple>
```

Like `BTable` and `BTableLite`, table headers (`<thead>`) and footers (`<tfoot>`) are visually hidden when the table is visually stacked. If you need a header or footer, you can do so by creating an extra `BTr` inside of the `BTbody` component (or in a second `BTbody` component), and set a role of columnheader on the child `BTh` cells, and use Bootstrap v5 responsive display utility classes to hide the extra row (or `BTbody`) above a certain breakpoint when the table is no longer visually stacked (the breakpoint should match the stacked table breakpoint you have set), i.e. `<BTr class="d-md-none">` would hide the row on medium and wider screens, while `<BTbody class="d-md-none">` would hide the row group on medium and wider screens.

NOTE

Note: stacked mode with `BTableSimple` requires that you use the BootstrapVueNext [table helper components](#table-helper-components). Use of the regular `<tbody>`, `<tr>`, `<td>` and `<th>` element tags will not work as expected, nor will they automatically apply any of the required accessibility attributes.

### Simple tables and sticky columns [​](#simple-tables-and-sticky-columns)

Sticky columns are supported with `BTableSimple`, but you will need to set the sticky-column prop on each table cell (in the thead, tbody, and tfoot row groups) in the column that is to be sticky. For example:

template

```
<BTableSimple responsive>
  <BThead>
    <BTr>
      <BTh sticky-column>Sticky Column Header</BTh>
      <BTh>Heading 1</BTh>
      <BTh>Heading 2</BTh>
      <BTh>Heading 3</BTh>
      <BTh>Heading 4</BTh>
    </BTr>
  </BThead>
  <BTbody>
    <BTr>
      <BTh sticky-column>Sticky Column Row Header</BTh>
      <BTd>Cell</BTd>
      <BTd>Cell</BTd>
      <BTd>Cell</BTd>
      <BTd>Cell</BTd>
    </BTr>
    <BTr>
      <BTh sticky-column>Sticky Column Row Header</BTh>
      <BTd>Cell</BTd>
      <BTd>Cell</BTd>
      <BTd>Cell</BTd>
      <BTd>Cell</BTd>
    </BTr>
  </BTbody>
  <BTfoot>
    <BTr>
      <BTh sticky-column>Sticky Column Footer</BTh>
      <BTh>Heading 1</BTh>
      <BTh>Heading 2</BTh>
      <BTh>Heading 3</BTh>
      <BTh>Heading 4</BTh>
    </BTr>
  </BTfoot>
</BTableSimple>
```

As with `BTable` and `BTableLite`, sticky columns are not supported when the stacked prop is set on `BTableSimple`.

## Table Helper Components [​](#table-helper-components)

BootstrapVueNext provides additional helper child components when using `<BTableSimple>`, or the named slots `top-row`, `bottom-row`, `thead-top`, and `custom-foot` (all of which accept table child elements). The helper components are as follows:

-   `BTbody` (`<BTableSimple>` only)
-   `BThead` (`<BTableSimple>` only)
-   `BTfoot` (`<BTableSimple>` only)
-   `BTr`
-   `BTd`
-   `BTh`

These components are optimized to handle converting variants to the appropriate classes (such as handling table `dark` mode), and automatically applying certain accessibility attributes (i.e. `role`s and `scope`s). They also can generate the stacked table, and sticky header and column, markup. Components `<BTable>` and `<BTableLite>` use these helper components internally.

In the [Simple tables](#simple-tables) example, we are using the helper components `<BThead>`, `<BTbody>`, `<BTr>`, `<BTh>`, `<BTd>` and `<BTfoot>`. While you can use regular table child elements (i.e. `<tbody>`, `<tr>`, `<td>`, etc.) within `<BTableSimple>`, and the named slots `top-row`, `bottom-row`, and `thead-top`, it is recommended to use these BootstrapVueNext table `<BT*>` helper components. Note that there are no helper components for `<caption>`, `<colgroup>` or `<col>`, so you may use these three HTML5 elements directly in `<BTableSimple>`.

-   Table helper components `<BThead>`, `<BTfoot>`, `<BTr>`, `<BTd>` and `<BTh>` all accept a `variant` prop, which will apply one of the Bootstrap theme colors (custom theme colors are supported via [theming](/bootstrap-vue-next/docs/types.html#colorvariant).) and will automatically adjust to use the correct variant class based on the table's `dark` mode.
-   Accessibility attributes `role` and `scope` are automatically handled. `<BTh>` automatically calculates the `scope` attribute based on `rowspan` and `colspan` props. Helper components (`<BTbody>`, `<BThead>`, `<BTfoot>`, `<BTr>`) use semantic HTML elements that provide implicit ARIA roles.

## Accessibility [​](#accessibility)

The `<BTable>` and `<BTableLite>` components use semantic HTML and provide keyboard navigation for accessibility.

When using `<BTableSimple>` with the helper table components, elements will have the appropriate roles applied by default, of which you can optionally override. When using click handlers on the `<BTableSimple>` helper components, you will need to apply appropriate `aria-*` attributes, and set `tabindex="0"` to make the click actions accessible to screen reader and keyboard-only users. You should also listen for `@keydown.enter.prevent` to handle users pressing Enter to trigger your click on cells or rows (required for accessibility for keyboard-only users).

### Heading accessibility [​](#heading-accessibility)

When a column (field) is sortable (`<BTable>` only) or there is a `head-clicked` listener registered (`<BTable>` and `<BTableLite>`), the header (and footer) `<th>` cells will be placed into the document tab sequence (via `tabindex="0"`) for accessibility by keyboard-only and screen reader users, so that the user may trigger a click (by pressing Enter on the header cells.

### Data row accessibility [​](#data-row-accessibility)

When the table is in `selectable` mode (`<BTable>` only, and prop `no-select-on-click` is not set), or if there is a `row-clicked` event listener registered (`<BTable>` and `<BTableLite>`), all data item rows (`<tr>` elements) will be placed into the document tab sequence (via `tabindex="0"`) to allow keyboard-only and screen reader users the ability to click the rows by pressing Enter or Space.

When the table items rows are placed in the document tab sequence (`<BTable>` and `<BTableLite>`), they will also support basic keyboard navigation when focused:

-   Down will move to the next row
-   Up will move to the previous row
-   End or Down+Shift will move to the last row
-   Home or Up+Shift will move to the first row
-   Enter or Space to click the row.

### Row event accessibility [​](#row-event-accessibility)

Note the following row based events/actions (available with `<BTable>` and `<BTableLite>`) are not considered accessible, and should only be used if the functionality is non critical or can be provided via other means:

-   `row-dblclicked`
-   `row-contextmenu`
-   `row-hovered`
-   `row-unhovered`
-   `row-middle-clicked`

Note that the `row-middle-clicked` event is not supported in all browsers (i.e. IE, Safari and most mobile browsers). When listening for `row-middle-clicked` events originating on elements that do not support input or navigation, you will often want to explicitly prevent other default actions mapped to the down action of the middle mouse button. On Windows this is usually autoscroll, and on macOS and Linux this is usually clipboard paste. This can be done by preventing the default behaviour of the `mousedown` or `pointerdown` event.

Additionally, you may need to avoid opening a default system or browser context menu after a right click. Due to timing differences between operating systems, this too is not a preventable default behaviour of `row-middle-clicked`. Instead, this can be done by preventing the default behaviour of the `row-contextmenu` event.

It is recommended you test your app in as many browser and device variants as possible to ensure your app handles the various inconsistencies with events.

## Complete Example [​](#complete-example)

Sort

Add Sort...

Initial Direction

AscendingDescendingLast clicked column

Filter On

Name

Age

Active

Leave all unchecked to filter on all data

Filter

Clear

-   «
-   ‹
-   1
-   2
-   3
-   ›
-   »

Per page

51015Show a lot

| Person full name | Person sortable name | Person age | Is Active | Actions |
| --- | --- | --- | --- | --- |
| Dickerson Macdonald | Macdonald, Dickerson | 40 | Yes | Info modal Show Details |
| Larsen Shaw | Shaw, Larsen | 21 | No | Info modal Show Details |
| Mini Navarro | Navarro, Mini | 9 | No | Info modal Show Details |
| Geneva Wilson | Wilson, Geneva | 89 | No | Info modal Show Details |
| Jami Carney | Carney, Jami | 38 | Yes | Info modal Show Details |

Displayed Items (5): \[ "Dickerson Macdonald", "Larsen Shaw", "Mini Navarro", "Geneva Wilson", "Jami Carney" \] Filter On:

HTML StackBlitz

vue

```
<template>
  <BContainer class="py-5">
    <!-- User Interface controls -->
    <BRow>
      <BCol
        lg="6"
        class="my-1"
      >
        <BFormGroup
          v-slot="{ariaDescribedby}"
          label="Sort"
          label-for="sort-by-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <BButton
            size="sm"
            @click="onAddSort"
            >Add Sort...</BButton
          >
          <BInputGroup
            v-for="sort in sortBy"
            :key="sort.key"
            size="sm"
          >
            <BFormSelect
              id="sort-by-select"
              v-model="sort.key"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </BFormSelect>
            <BFormSelect
              v-model="sort.order"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </BFormSelect>
          </BInputGroup>
        </BFormGroup>
      </BCol>

      <BCol
        sm="5"
        md="6"
        class="my-1"
      >
        <BFormGroup
          label="Initial Direction"
          label-for="initial-sort-direction"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <BFormSelect
            id="initial-sort-direction"
            v-model="initialSortDirection"
            :options="sortDirectionOptions"
            size="sm"
          />
        </BFormGroup>
      </BCol>
      <BCol
        lg="6"
        class="my-1"
      >
        <BFormGroup
          v-slot="{ariaDescribedby}"
          label="Filter On"
          description="Leave all unchecked to filter on all data"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <div class="d-flex gap-2">
            <BFormCheckbox
              v-model="filterOn"
              value="name"
              :aria-describedby="ariaDescribedby"
              >Name</BFormCheckbox
            >
            <BFormCheckbox
              v-model="filterOn"
              value="age"
              :aria-describedby="ariaDescribedby"
              >Age</BFormCheckbox
            >
            <BFormCheckbox
              v-model="filterOn"
              value="isActive"
              :aria-describedby="ariaDescribedby"
              >Active</BFormCheckbox
            >
          </div>
        </BFormGroup>
      </BCol>
      <BCol
        lg="6"
        class="my-1"
      >
        <BFormGroup
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <BInputGroup size="sm">
            <BFormInput
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            />
            <BInputGroupText>
              <BButton
                :disabled="!filter"
                @click="filter = ''"
                >Clear</BButton
              >
            </BInputGroupText>
          </BInputGroup>
        </BFormGroup>
      </BCol>

      <BCol
        sm="7"
        md="6"
        class="my-1"
      >
        <BPagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          :align="'fill'"
          size="sm"
          class="my-0"
        />
      </BCol>
      <BCol
        sm="5"
        md="6"
        class="my-1"
      >
        <BFormGroup
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <BFormSelect
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          />
        </BFormGroup>
      </BCol>
    </BRow>
    <!-- Main table element for typed table-->
    <BTable
      ref="complete-table"
      v-model:sort-by="sortBy"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :responsive="false"
      :filterable="filterOn"
      :small="true"
      :multisort="true"
      :initial-sort-direction="initialSortDirection"
      @filtered="onFiltered"
    >
      <template #cell(name)="row">
        {{ (row.value as PersonName).first }}
        {{ (row.value as PersonName).last }}
      </template>
      <template #cell(actions)="row">
        <BButton
          size="sm"
          class="me-1"
          @click="info(row.item, row.index)"
        >
          Info modal
        </BButton>
        <BButton
          size="sm"
          @click="row.toggleExpansion"
        >
          {{ row.expansionShowing ? 'Hide' : 'Show' }} Details
        </BButton>
      </template>
      <template #row-expansion="row">
        <BCard>
          <ul>
            <li
              v-for="(value, key) in row.item"
              :key="key"
            >
              {{ key }}: {{ value }}
            </li>
            <BButton
              size="sm"
              @click="row.toggleExpansion"
            >
              Toggle Details
            </BButton>
          </ul>
        </BCard>
      </template>
    </BTable>
    <!-- Info modal -->
    <BModal
      :id="infoModal.id"
      v-model="infoModal.open"
      :title="infoModal.title"
      :ok-only="true"
      @hide="resetInfoModal"
    >
      <pre>{{ infoModal.content }}</pre>
    </BModal>
    <BRow
      ><BCol
        >Displayed Items ({{ displayItems.length }}):
        {{
          displayItems.map((item) => {
            const person = item as Person
            return `${person.name.first} ${person.name.last}`
          })
        }}
        Filter On: {{ filterOn.join(', ') }}</BCol
      ></BRow
    >
  </BContainer>
</template>

<script setup lang="ts">
import {BTable} from 'bootstrap-vue-next/components/BTable'
import type {
  BTableInitialSortDirection,
  BTableSortBy,
  ColorVariant,
  TableFieldRaw,
  TableItem,
} from 'bootstrap-vue-next'
import {computed, reactive, ref, useTemplateRef} from 'vue'
import {type ComponentExposed} from 'vue-component-type-helpers'

interface PersonName {
  first: string
  last: string
}

interface Person {
  name: PersonName
  age: number
  isActive: boolean
}

const table = useTemplateRef<ComponentExposed<typeof BTable<Person>>>('complete-table')
const displayItems = computed(() => (table.value?.displayItems ?? []) as TableItem<Person>[])

const items: TableItem<Person>[] = [
  {isActive: true, age: 40, name: {first: 'Dickerson', last: 'Macdonald'}},
  {isActive: false, age: 21, name: {first: 'Larsen', last: 'Shaw'}},
  {
    isActive: false,
    age: 9,
    name: {first: 'Mini', last: 'Navarro'},
    _rowVariant: 'success' as ColorVariant,
  },
  {isActive: false, age: 89, name: {first: 'Geneva', last: 'Wilson'}},
  {isActive: true, age: 38, name: {first: 'Jami', last: 'Carney'}},
  {isActive: false, age: 27, name: {first: 'Essie', last: 'Dunlap'}},
  {isActive: true, age: 40, name: {first: 'Thor', last: 'Macdonald'}},
  {
    isActive: true,
    age: 87,
    name: {first: 'Larsen', last: 'Shaw'},
    _cellVariants: {age: 'danger', isActive: 'warning'},
  },
  {isActive: false, age: 26, name: {first: 'Mitzi', last: 'Navarro'}},
  {isActive: false, age: 22, name: {first: 'Genevieve', last: 'Wilson'}},
  {isActive: true, age: 38, name: {first: 'John', last: 'Carney'}},
  {isActive: false, age: 29, name: {first: 'Dick', last: 'Dunlap'}},
]

const fields: Exclude<TableFieldRaw<Person>, string>[] = [
  {
    key: 'name',
    label: 'Person full name',
    sortable: true,
  },
  {
    key: 'sortableName',
    label: 'Person sortable name',
    sortable: true,
    formatter: ({item}) =>
      item ? `${item.name.last}, ${item.name.first}` : 'Something went wrong',
    sortByFormatted: true,
    filterByFormatted: true,
  },
  {key: 'age', label: 'Person age', sortable: true, class: 'text-center'},
  {
    key: 'isActive',
    label: 'Is Active',
    formatter: ({value}) => (value ? 'Yes' : 'No'),
    sortable: true,
    sortByFormatted: true,
    filterByFormatted: true,
  },
  {key: 'actions', label: 'Actions'},
]

const pageOptions = [
  {value: 5, text: '5'},
  {value: 10, text: '10'},
  {value: 15, text: '15'},
  {value: 100, text: 'Show a lot'},
]

const sortDirectionOptions = [
  {value: 'asc', text: 'Ascending'},
  {value: 'desc', text: 'Descending'},
  {value: 'last', text: 'Last clicked column'},
]

const totalRows = ref(items.length)
const currentPage = ref(1)
const perPage = ref(5)
const sortBy = ref<BTableSortBy[]>([])
const initialSortDirection = ref<BTableInitialSortDirection>('asc')
const filter = ref('')
const filterOn = ref([])
const infoModal = reactive({
  open: false,
  id: 'info-modal',
  title: '',
  content: '',
})

// Create an options list from our fields
const sortOptions = computed(() =>
  fields.filter((f) => f.sortable).map((f) => ({text: f.label, value: f.key}))
)

function info(item: TableItem<Person>, index: number) {
  infoModal.title = `Row index: ${index}`
  infoModal.content = JSON.stringify(item, null, 2)
  infoModal.open = true
}

function resetInfoModal() {
  infoModal.title = ''
  infoModal.content = ''
}

function onFiltered(filteredItems: readonly TableItem<Person>[]) {
  // Trigger pagination to update the number of buttons/pages due to filtering
  totalRows.value = filteredItems.length
  currentPage.value = 1
}

function onAddSort() {
  sortBy.value.push({key: '', order: 'asc'})
}
</script>
```

## Component Reference

### `<BTable>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BTable/BTable.vue)

-   [<BTable> Properties](#comp-reference-btable-properties)
-   [<BTable> Events](#comp-reference-btable-events)
-   [<BTable> Slots](#comp-reference-btable-slots)
-   [<BTable> Exposed](#comp-reference-btable-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.table`

##### [Properties](#comp-reference-btable-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| busy | `boolean` | `false` | When set, forces the table into the busy state. Automatically set when an items provider function is being called |
| current-page | `Numberish` | `1` | The current page number to display when the table is paginated. Starting from 1 and up. If bound to a v-model, filter changes will automatically set this to 1 |
| debounce | `Numberish` | `0` | Delay in milliseconds before calling the provider after prop changes. Set to 0 for immediate execution (default). Useful for debouncing rapid filter changes. |
| debounce-max-wait | `Numberish` | `null` | Maximum time in milliseconds to wait before forcing a provider call, even if changes are still occurring. Use with debounce to ensure provider is eventually called. |
| empty-filtered-text | `string` | `'There are no records matching your request'` | Text to display when no items are present in the \`items\` array after filtering |
| empty-text | `string` | `'There are no records to show'` | Text to display when no items are present in the \`items\` array |
| filter | `string` | `undefined` | Criteria for filtering. Only string values are supported. Use filterFunction prop for complex filtering including RegExp. |
| filter-function | `(item: Readonly<Item>, filter: string | undefined) => boolean` | `undefined` | Function called during filtering of items, gets passed the current item being filtered. See docs for details. |
| filterable | `string[]` | `undefined` | Array of fields to include when filtering. |
| initial-sort-direction | `BTableInitialSortDirection` | `'asc'` | Default initial sort direction for all sortable columns that don't specify their own initialSortDirection. Can be 'asc' for ascending, 'desc' for descending, or 'last' to maintain the direction of the previously sorted column. |
| multisort | `boolean` | `false` |  |
| must-sort | `boolean | string[]` | `false` |  |
| no-local-sorting | `boolean` | `false` |  |
| no-provider | `NoProviderTypes[]` | `undefined` | Alternate way to set provider functionality, equivalent to using no-provider-filtering, no-provider-paging, and no-provider-sorting |
| no-provider-filtering | `boolean` | `false` | When set, uses internal filtering to filter the data. Otherwise the provider is expected to perform the filtering |
| no-provider-paging | `boolean` | `false` | When set, uses internal paging to paginate the data. Otherwise the items provider is expected to perform the paging |
| no-provider-sorting | `boolean` | `false` | When set, uses internal sorting to sort the data. Otherwise the items provider is expected to perform the sorting |
| no-select-on-click | `boolean` | `false` | Do not select row when clicked |
| no-sortable-icon | `boolean` | `false` |  |
| per-page | `Numberish` | `null` |  |
| provider | `BTableProvider` | `undefined` |  |
| select-head | `boolean | string` | `true` |  |
| select-mode | `'multi' | 'single' | 'range'` | `'multi'` | The selectable mode for the table when 'selectable' is set. Possible values: 'single', 'multi' or 'range' |
| selectable | `boolean` | `false` | When set, places the table body rows in selectable mode |
| selected-items | `readonly unknown[]` | `'() => []'` | Array of currently selected items. Use v-model:selected-items to bind this. When a primary-key is provided, selection state persists across item array updates |
| selection-variant | `ColorVariant | null` | `'primary'` | Bootstrap color theme variant to set selected rows to. Use any of the standard Bootstrap theme color variants, or the special table row variant 'active' (default). Set to an empty string to not use a variant |
| show-empty | `boolean` | `false` | Show the empty text when no items are present in the \`items\` array |
| sort-by | `BTableSortBy[]` | `undefined` | Model representing the current sort state |
| sort-compare | `BTableSortByComparerFunction` | `undefined` | A global comparison function for sorting table fields. Field-level sortCompare takes precedence over this table-level setting. The function signature is (a: T, b: T, key: string) => number. |
| sort-icon-left | `boolean` | `false` | Position the sort icon on the left side of the table header cell instead of the right |
| sticky-select | `boolean` | `false` |  |

Extensions:

Extensions are selected properties from another component, integrated here. It may not include all original properties

BTableLite Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| align | `VerticalAlign` | `undefined` |  |
| caption | `string` | `undefined` | Text string to place in the caption element |
| details-td-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the td element in the details row |
| expanded-items | `readonly unknown[]` | `'() => []'` | Array of items that are currently expanded (have their row-expansion slot visible). Use v-model:expanded-items to bind this. When a primary-key is provided, expansion state persists across item array updates |
| field-column-class | `(field: TableField) => Record<string, any>[] | string | Record<PropertyKey, any> | any[]` | `undefined` |  |
| fields | `TableFieldRaw[]` | `'() => []'` | Array of field names or array of field definition objects |
| foot-clone | `boolean` | `false` | Enable the footer of the table, and clone the header content by default |
| foot-row-variant | `ColorVariant | null` | `undefined` | Apply a Bootstrap theme color variant to the tr element in the tfoot. Falls back to head-row-variant |
| foot-variant | `ColorVariant | null` | `undefined` | Apply a Bootstrap theme color variant to the foot, falls back to head-variant if that prop is specified. May take precedence over foot-row-variant |
| head-row-variant | `ColorVariant | null` | `undefined` | Apply a Bootstrap theme color variant to the tr element in the thead |
| head-variant | `ColorVariant | null` | `undefined` | Apply a Bootstrap theme color variant to the head. May take precedence over head-row-variant |
| items | `readonly Item[]` | `'() => []'` |  |
| label-stacked | `boolean` | `false` | When set, the labels will appear as actual label elements, rather than with the data-label attribute |
| model-value | `any` | `undefined` |  |
| primary-key | `string | ((item: Item) => string)` | `undefined` | Name of a table field that contains a guaranteed unique value per row. For row expansion and selection to persist across item updates. Also speeds up table rendering and enables proper item tracking. |
| tbody-class | `ClassValue` | `undefined` |  |
| tbody-tr-attrs | `((item: Item | null, type: TableRowType) => AttrsValue) | AttrsValue` | `undefined` |  |
| tbody-tr-class | `((item: TableItem | null, type: string) => string | any[] | null | undefined) | string | Record<PropertyKey, any> | any[]` | `undefined` |  |
| tfoot-class | `ClassValue` | `undefined` |  |
| tfoot-tr-class | `ClassValue` | `undefined` |  |
| thead-class | `ClassValue` | `undefined` |  |
| thead-tr-class | `ClassValue` | `undefined` |  |

BTableSimple Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| border-variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the table border |
| bordered | `boolean` | `false` | Adds borders to all the cells and headers |
| borderless | `boolean` | `false` | Removes all borders from cells |
| caption-top | `boolean` | `false` | When set, the table caption will appear above the table |
| dark | `boolean` | `false` | Places the table in dark mode |
| fixed | `boolean` | `false` | Makes all columns equal width (fixed layout table). Will speed up rendering for large tables. Column widths can be set via CSS or colgroup |
| hover | `boolean` | `false` | Enables hover styling on rows |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| no-border-collapse | `boolean` | `false` | Disable's the collapsing of table borders. Useful when table has sticky headers or columns |
| outlined | `boolean` | `false` | Adds an outline border to the table element |
| responsive | `boolean | Breakpoint` | `false` | Makes the table responsive in width, adding a horizontal scrollbar. Set to true for always responsive or set to one of the breakpoints to switch from responsive to normal: 'sm', 'md', 'lg', 'xl' |
| small | `boolean` | `false` | Renders the table with smaller cell padding |
| stacked | `boolean | Breakpoint` | `false` | Place the table in stacked mode. Set to true for always stacked, or set to one of the breakpoints to switch from stacked to normal: 'sm', 'md', 'lg', 'xl' |
| sticky-header | `boolean | Numberish` | `false` | Makes the table header sticky. Set to true for a maximum height 300px tall table, or set to any valid CSS height (including units). Inputting a number type is converted to px height |
| striped | `boolean` | `false` | Applies striping to the tbody rows |
| striped-columns | `boolean` | `false` | Applies striping to the table columns |
| table-attrs | `AttrsValue` | `undefined` | Attributes to apply to the table element |
| table-class | `ClassValue` | `undefined` | Classes to apply to the table element |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Events](#comp-reference-btable-events)

| Event | Args | Description |
| --- | --- | --- |
| change |  |  |
| filtered | 
`value``: Item[]` - Array of items after filtering (before local pagination occurs)

 | Emitted when local filtering causes a change in the number of items |
| head-clicked | 

`value``: TableHeadClickedEventObject<Item>` - Object payload containing the key, field definition, native event, and whether the click originated from the footer.

 | Emitted when a header or footer cell is clicked. Not applicable for 'custom-foot' slot |
| row-clicked | 

`value``: TableRowEventObject<Item>` - Object payload with the row item, index, and event for the row being clicked

 | Emitted when a row is clicked |
| row-contextmenu | 

`value``: TableRowEventObject<Item>` - Object payload with the row item, index, and event for the row showing the context menu

 | Emitted when a context menu is displayed for a row |
| row-dblclicked | 

`value``: TableRowEventObject<Item>` - Object payload with the row item, index, and event for the row being double clicked

 | Emitted when a row is double clicked |
| row-hovered | 

`value``: TableRowEventObject<Item>` - Object payload with the row item, index, and event for the row being hovered

 | Emitted when a row is hovered |
| row-middle-clicked | 

`value``: TableRowEventObject<Item>` - Object payload with the row item, index, and event for the row being middle clicked

 | Emitted when a row is middle clicked |
| row-selected | 

`value``: Item` - Item that is selected

 | Emitted when a row is selected |
| row-unhovered | 

`value``: TableRowEventObject<Item>` - Object payload with the row item, index, and event for the row being unhovered

 | Emitted when a row is unhovered |
| row-unselected | 

`value``: Item` - Item that is unselected

 | Emitted when a row is unselected |
| sorted | 

`value``: BTableSortBy`

 | Updated when the user clicks a sortable column heading and represents the column click and the sort state (\`asc\`, \`desc\`, or undefined) |
| update:busy |  |  |
| update:current-page |  | When bound this will reset the current page to 1 on filter changes |
| update:selected-items |  |  |
| update:sort-by | 

`value``: BTableSortBy[] | undefined` - New sortBy model value

 | Emitted when the \`sortBy\` model is changed and represents the current sort state |

##### [Slots](#comp-reference-btable-slots)

| Name | Scope | Description |
| --- | --- | --- |
| bottom-row | 
`columns``: number` - The number of columns in the table

`fields``: TableField<Item>[]` - The normalized fields definition array (in the array of objects format)

 | Fixed bottom row slot for user supplied B-TD cells. Optionally Scoped |
| cell({key}) |  |  |
| custom-body |  |  |
| custom-foot | 

`fields``: TableField<Item>[]` - The normalized fields definition array (in the array of objects format)

`items``: readonly Item[]` - Array of items that are currently being displayed

`columns``: number` - The number of columns in the table

 | Custom footer content slot for user supplied B-TR, B-TH, B-TD. Optionally Scoped |
| empty | 

`empty-filtered-text``: string` - The value of the empty-filtered-text prop

`empty-text``: string` - The value of the empty-text prop

`fields``: TableField<Item>[]` - The normalized fields definition array (in the array of objects format)

`items``: Item[] | null` - The items array.

 | Content to display when no items are present in the \`items\` array. Optionally scoped |
| empty-filtered | 

`empty-filtered-text``: string` - The value of the empty-filtered-text prop

`empty-text``: string` - The value of the empty-text prop

`fields``: TableField<Item>[]` - The normalized fields definition array (in the array of objects format)

`items``: Item[]` - The items array.

 | Content to display when no items are present in the filtered \`items\` array. Optionally scoped |
| foot({key}) |  |  |
| head({key}) |  |  |
| row-expansion |  |  |
| table-busy |  | Optional slot to place loading message when table is in the busy state |
| table-caption |  | Content to display in the table's caption element |
| table-colgroup | 

`fields``: TableField<Item>[]` - The normalized fields definition array (in the array of objects format)

 | Slot for user supplied \`<colgroup>\` element |
| thead-sub |  |  |
| thead-top |  |  |
| top-row | 

`columns``: number` - The number of columns in the table

`fields``: TableField<Item>[]` - The normalized fields definition array (in the array of objects format)

 | Fixed top row slot for user supplied B-TD cells. Optionally scoped |

##### [Exposed](#comp-reference-btable-exposed)

| Name | Type | Description |
| --- | --- | --- |
| displayItems | `ComputedRef<unknown[]>` | Computed ref of the currently displayed table items after filtering and pagination |
| expansion | `object` | Object containing expansion state methods and expandedItems ref |
| add | `(item: Item) => void` | Adds an item to the expanded items |
| clear | `() => void` | Clears all expanded items |
| expandedItems | `Readonly<Ref<readonly unknown[]>>` | Readonly ref of the currently expanded items |
| get | `(item: Item) => unknown` | Gets the item from the items prop, using the primary key if provided |
| getFromPrimaryKey | `(primaryKey: unknown) => unknown` | Gets the item from the internal "computed items" representation when using the primary key. This is used to get the object reference of the item from the items when using the primary key, since the items are stored as the primary key value rather than the item itself. If no primaryKey is used, it will return undefined |
| has | `(item: Item) => boolean` | Checks if an item is in the expanded items |
| isActivated | `ComputedRef<boolean>` | Whether the expansion tracker is activated (has any expanded items) |
| remove | `(item: Item) => void` | Removes an item from the expanded items |
| resolvedItems | `ComputedRef<readonly unknown[]>` | A computed array of items resolved from their primary key values against the table's internal computed dataset. When a primaryKey is configured, expansion mechanisms may store only the primary key values. This property provides the corresponding full item objects by resolving those keys against the current internal items representation. If no primaryKey is used, this will mirror the expandedItems array. Note: Only items currently present in the internal computed dataset can be resolved. Keys that do not match an available item will be ignored |
| set | `(items: readonly Item[]) => void` | Sets the expanded items to the provided items |
| setAll | `() => void` | Sets the expanded items to all items |
| toggle | `(item: Item) => void` | Toggles the expansion state for the given item |
| getStringValue | `(key: string, item: unknown) => string` | Function to get the string value of an item field |
| items | `ComputedRef<unknown[]>` | Computed ref of the table items |
| refresh | `() => Promise<void>` | Function to refresh the table data (calls the items provider if present) |
| selection | `object` | Object containing selection state methods and selectedItems ref |
| add | `(item: Item) => void` | Adds an item to the selected items |
| clear | `() => void` | Clears all selected items |
| get | `(item: Item) => unknown` | Gets the item from the items prop, using the primary key if provided |
| getFromPrimaryKey | `(primaryKey: unknown) => unknown` | Gets the item from the internal "computed items" representation when using the primary key. This is used to get the object reference of the item from the items when using the primary key, since the items are stored as the primary key value rather than the item itself. If no primaryKey is used, it will return undefined |
| handleRowSelection | `(obj: {item: Item; index: number; shiftClicked?: boolean; ctrlClicked?: boolean; metaClicked?: boolean}) => void` | Handles row selection based on selection mode and modifier keys |
| has | `(item: Item) => boolean` | Checks if an item is in the selected items |
| isActivated | `ComputedRef<boolean>` | Whether the selection tracker is activated (has any selected items) |
| remove | `(item: Item) => void` | Removes an item from the selected items |
| resolvedItems | `ComputedRef<readonly unknown[]>` | A computed array of items resolved from their primary key values against the table's internal computed dataset. When a primaryKey is configured, selection mechanisms may store only the primary key values. This property provides the corresponding full item objects by resolving those keys against the current internal items representation. If no primaryKey is used, this will mirror the selectedItems array. Note: Only items currently present in the internal computed dataset can be resolved. Keys that do not match an available item will be ignored |
| selectedItems | `Readonly<Ref<readonly unknown[]>>` | Readonly ref of the currently selected items |
| set | `(items: readonly Item[]) => void` | Sets the selected items to the provided items |
| setAll | `() => void` | Sets the selected items to all items |

### `<BTableLite>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BTable/BTableLite.vue)

-   [<BTableLite> Properties](#comp-reference-btablelite-properties)
-   [<BTableLite> Events](#comp-reference-btablelite-events)
-   [<BTableLite> Slots](#comp-reference-btablelite-slots)
-   [<BTableLite> Exposed](#comp-reference-btablelite-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.table‑lite`

##### [Properties](#comp-reference-btablelite-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| align | `VerticalAlign` | `undefined` |  |
| caption | `string` | `undefined` | Text string to place in the caption element |
| details-td-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the td element in the details row |
| expanded-items | `readonly unknown[]` | `'() => []'` | Array of items that are currently expanded (have their row-expansion slot visible). Use v-model:expanded-items to bind this. When a primary-key is provided, expansion state persists across item array updates |
| field-column-class | `(field: TableField) => Record<string, any>[] | string | Record<PropertyKey, any> | any[]` | `undefined` |  |
| fields | `TableFieldRaw[]` | `'() => []'` | Array of field names or array of field definition objects |
| foot-clone | `boolean` | `false` | Enable the footer of the table, and clone the header content by default |
| foot-row-variant | `ColorVariant | null` | `undefined` | Apply a Bootstrap theme color variant to the tr element in the tfoot. Falls back to head-row-variant |
| foot-variant | `ColorVariant | null` | `undefined` | Apply a Bootstrap theme color variant to the foot, falls back to head-variant if that prop is specified. May take precedence over foot-row-variant |
| head-row-variant | `ColorVariant | null` | `undefined` | Apply a Bootstrap theme color variant to the tr element in the thead |
| head-variant | `ColorVariant | null` | `undefined` | Apply a Bootstrap theme color variant to the head. May take precedence over head-row-variant |
| items | `readonly Item[]` | `'() => []'` |  |
| label-stacked | `boolean` | `false` | When set, the labels will appear as actual label elements, rather than with the data-label attribute |
| model-value | `any` | `undefined` |  |
| primary-key | `string | ((item: Item) => string)` | `undefined` | Name of a table field that contains a guaranteed unique value per row. For row expansion and selection to persist across item updates. Also speeds up table rendering and enables proper item tracking. |
| tbody-class | `ClassValue` | `undefined` |  |
| tbody-tr-attrs | `((item: Item | null, type: TableRowType) => AttrsValue) | AttrsValue` | `undefined` |  |
| tbody-tr-class | `((item: TableItem | null, type: string) => string | any[] | null | undefined) | string | Record<PropertyKey, any> | any[]` | `undefined` |  |
| tfoot-class | `ClassValue` | `undefined` |  |
| tfoot-tr-class | `ClassValue` | `undefined` |  |
| thead-class | `ClassValue` | `undefined` |  |
| thead-tr-class | `ClassValue` | `undefined` |  |

Extensions:

Extensions are selected properties from another component, integrated here. It may not include all original properties

BTableSimple Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| border-variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the table border |
| bordered | `boolean` | `false` | Adds borders to all the cells and headers |
| borderless | `boolean` | `false` | Removes all borders from cells |
| caption-top | `boolean` | `false` | When set, the table caption will appear above the table |
| dark | `boolean` | `false` | Places the table in dark mode |
| fixed | `boolean` | `false` | Makes all columns equal width (fixed layout table). Will speed up rendering for large tables. Column widths can be set via CSS or colgroup |
| hover | `boolean` | `false` | Enables hover styling on rows |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| no-border-collapse | `boolean` | `false` | Disable's the collapsing of table borders. Useful when table has sticky headers or columns |
| outlined | `boolean` | `false` | Adds an outline border to the table element |
| responsive | `boolean | Breakpoint` | `false` | Makes the table responsive in width, adding a horizontal scrollbar. Set to true for always responsive or set to one of the breakpoints to switch from responsive to normal: 'sm', 'md', 'lg', 'xl' |
| small | `boolean` | `false` | Renders the table with smaller cell padding |
| stacked | `boolean | Breakpoint` | `false` | Place the table in stacked mode. Set to true for always stacked, or set to one of the breakpoints to switch from stacked to normal: 'sm', 'md', 'lg', 'xl' |
| sticky-header | `boolean | Numberish` | `false` | Makes the table header sticky. Set to true for a maximum height 300px tall table, or set to any valid CSS height (including units). Inputting a number type is converted to px height |
| striped | `boolean` | `false` | Applies striping to the tbody rows |
| striped-columns | `boolean` | `false` | Applies striping to the table columns |
| table-attrs | `AttrsValue` | `undefined` | Attributes to apply to the table element |
| table-class | `ClassValue` | `undefined` | Classes to apply to the table element |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Events](#comp-reference-btablelite-events)

| Event | Args | Description |
| --- | --- | --- |
| head-clicked | 
`value``: TableHeadClickedEventObject<Item>` - Object payload containing the key, field definition, native event, and whether the click originated from the footer.

 | Emitted when a header or footer cell is clicked. Not applicable for 'custom-foot' slot |
| row-clicked | 

`value``: TableRowEventObject<Item>` - Object payload with the row item, index, and event for the row being clicked

 | Emitted when a row is clicked |
| row-contextmenu | 

`value``: TableRowEventObject<Item>` - Object payload with the row item, index, and event for the row showing the context menu

 | Emitted when a context menu is displayed for a row |
| row-dblclicked | 

`value``: TableRowEventObject<Item>` - Object payload with the row item, index, and event for the row being double clicked

 | Emitted when a row is double clicked |
| row-hovered | 

`value``: TableRowEventObject<Item>` - Object payload with the row item, index, and event for the row being hovered

 | Emitted when a row is hovered |
| row-middle-clicked | 

`value``: TableRowEventObject<Item>` - Object payload with the row item, index, and event for the row being middle clicked

 | Emitted when a row is middle clicked |
| row-unhovered | 

`value``: TableRowEventObject<Item>` - Object payload with the row item, index, and event for the row being unhovered

 | Emitted when a row is unhovered |

##### [Slots](#comp-reference-btablelite-slots)

| Name | Scope | Description |
| --- | --- | --- |
| bottom-row | 
`columns``: number` - The number of columns in the table

`fields``: TableField<Item>[]` - The normalized fields definition array (in the array of objects format)

 | Fixed bottom row slot for user supplied B-TD cells. Optionally Scoped |
| cell({key}) | 

`row-selected``: boolean` - Will be true if the row has been selected. Only applicable when table is in selectable mode

`select-row``: (index?: number) => void` - Can be called to select the current row. Only applicable when table is in selectable mode

`expansion-showing``: boolean` - Will be true if the row's row-expansion scoped slot is visible

`field``: TableField<Item>` - The field's normalized definition object (from the fields prop)

`index``: number` - The row's index (zero-based) with respect to the displayed rows

`item``: Item` - The row's item data object

`toggle-expansion``: () => void` - Can be called to toggle the visibility of the rows row-expansion scoped slot

`unformatted``: unknown` - The raw value for this key in the item record (null or undefined if a virtual column), before being passed to the field's formatter function

`value``: unknown` - The value for this key in the record (null or undefined if a virtual column), or the output of the field's formatter function

 | Default scoped slot for custom data rendering of field data. See docs for scoped data |
| custom-body |  |  |
| custom-foot | 

`fields``: TableField<Item>[]` - The normalized fields definition array (in the array of objects format)

`items``: readonly Item[]` - Array of items that are currently being displayed

`columns``: number` - The number of columns in the table

 | Custom footer content slot for user supplied B-TR, B-TH, B-TD. Optionally Scoped |
| foot({key}) | 

`clear-selected``: () => void` - Unselect all rows (applicable if the table is in selectable mode)

`column``: LiteralUnion<keyof Item>` - The field's key value

`field``: TableField<Item>` - The field's normalized definition object (from the fields prop)

`is-foot``: true` - Used to distinguish foot when falling back to head()

`label``: string | undefined` - The field's label value

`select-all-rows``: () => void` - Select all rows (applicable if the table is in selectable mode)

 | Scoped slot for custom rendering of field footer. '{key}' is the field's key name. See docs for scoped footer |
| head({key}) | 

`clear-selected``: () => void` - Unselect all rows (applicable if the table is in selectable mode)

`column``: LiteralUnion<keyof Item>` - The field's key value

`field``: TableField<Item>` - The field's normalized definition object (from the fields prop)

`is-foot``: boolean` - Will be true if the slot is being rendered in the table footer

`label``: string | undefined` - The field's label value

`select-all-rows``: () => void` - Select all rows (applicable if the table is in selectable mode)

 | Scoped slot for custom rendering of field header. '{key}' is the field's key name |
| row-expansion | 

`row-selected``: boolean` - Will be true if the row has been selected. Only applicable when table is in selectable mode

`select-row``: (index?: number) => void` - Can be called to select the current row. Only applicable when table is in selectable mode

`fields``: TableField<Item>[]` - The normalized fields definition array (in the array of objects format)

`index``: Number` - The item's row index number (with respect to the displayed item rows)

`item``: Item` - The entire row's record data object

`toggle-expansion``: () => void` - Function to toggle visibility of the row's row-expansion slot

 | Scoped slot for optional rendering additional record expansion. See docs for Row expansion support |
| table-caption |  | Content to display in the table's caption element |
| table-colgroup | 

`fields``: TableField<Item>[]` - The normalized fields definition array (in the array of objects format)

 | Slot for user supplied \`<colgroup>\` element |
| thead-sub |  |  |
| thead-top | 

`clear-selected``: () => void` - Unselect all rows (applicable if the table is in selectable mode)

`columns``: number` - The number of columns in the table

`label``: string | undefined` - The field's label value

`fields``: TableField<Item>[]` - The normalized fields definition array (in the array of objects format)

`select-all-rows``: () => void` - Select all rows (applicable if the table is in selectable mode)

 | Slot above the column headers in the \`thead\` element for user-supplied B-TR with B-TH/B-TD. Optionally scoped |
| top-row | 

`columns``: number` - The number of columns in the table

`fields``: TableField<Item>[]` - The normalized fields definition array (in the array of objects format)

 | Fixed top row slot for user supplied B-TD cells. Optionally scoped |

##### [Exposed](#comp-reference-btablelite-exposed)

| Name | Type | Description |
| --- | --- | --- |
| expansion | `object` | Object containing expansion state methods and expandedItems ref |
| add | `(item: Item) => void` | Adds an item to the expanded items |
| clear | `() => void` | Clears all expanded items |
| expandedItems | `Readonly<Ref<readonly unknown[]>>` | Readonly ref of the currently expanded items |
| get | `(item: Item) => unknown` | Gets the item from the items prop, using the primary key if provided |
| getFromPrimaryKey | `(primaryKey: unknown) => unknown` | Gets the item from the internal "computed items" representation when using the primary key. This is used to get the object reference of the item from the items when using the primary key, since the items are stored as the primary key value rather than the item itself. If no primaryKey is used, it will return undefined |
| has | `(item: Item) => boolean` | Checks if an item is in the expanded items |
| isActivated | `ComputedRef<boolean>` | Whether the expansion tracker is activated (has any expanded items) |
| remove | `(item: Item) => void` | Removes an item from the expanded items |
| resolvedItems | `ComputedRef<readonly unknown[]>` | A computed array of items resolved from their primary key values against the table's internal computed dataset. When a primaryKey is configured, expansion mechanisms may store only the primary key values. This property provides the corresponding full item objects by resolving those keys against the current internal items representation. If no primaryKey is used, this will mirror the expandedItems array. Note: Only items currently present in the internal computed dataset can be resolved. Keys that do not match an available item will be ignored |
| set | `(items: readonly Item[]) => void` | Sets the expanded items to the provided items |
| setAll | `() => void` | Sets the expanded items to all items |
| toggle | `(item: Item) => void` | Toggles the expansion state for the given item |

### `<BTableSimple>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BTable/BTableSimple.vue)

-   [<BTableSimple> Properties](#comp-reference-btablesimple-properties)
-   [<BTableSimple> Slots](#comp-reference-btablesimple-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.table‑simple`

##### [Properties](#comp-reference-btablesimple-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| border-variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the table border |
| bordered | `boolean` | `false` | Adds borders to all the cells and headers |
| borderless | `boolean` | `false` | Removes all borders from cells |
| caption-top | `boolean` | `false` | When set, the table caption will appear above the table |
| dark | `boolean` | `false` | Places the table in dark mode |
| fixed | `boolean` | `false` | Makes all columns equal width (fixed layout table). Will speed up rendering for large tables. Column widths can be set via CSS or colgroup |
| hover | `boolean` | `false` | Enables hover styling on rows |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| no-border-collapse | `boolean` | `false` | Disable's the collapsing of table borders. Useful when table has sticky headers or columns |
| outlined | `boolean` | `false` | Adds an outline border to the table element |
| responsive | `boolean | Breakpoint` | `false` | Makes the table responsive in width, adding a horizontal scrollbar. Set to true for always responsive or set to one of the breakpoints to switch from responsive to normal: 'sm', 'md', 'lg', 'xl' |
| small | `boolean` | `false` | Renders the table with smaller cell padding |
| stacked | `boolean | Breakpoint` | `false` | Place the table in stacked mode. Set to true for always stacked, or set to one of the breakpoints to switch from stacked to normal: 'sm', 'md', 'lg', 'xl' |
| sticky-header | `boolean | Numberish` | `false` | Makes the table header sticky. Set to true for a maximum height 300px tall table, or set to any valid CSS height (including units). Inputting a number type is converted to px height |
| striped | `boolean` | `false` | Applies striping to the tbody rows |
| striped-columns | `boolean` | `false` | Applies striping to the table columns |
| table-attrs | `AttrsValue` | `undefined` | Attributes to apply to the table element |
| table-class | `ClassValue` | `undefined` | Classes to apply to the table element |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Slots](#comp-reference-btablesimple-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the table |

### `<BTbody>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BTable/BTbody.vue)

-   [<BTbody> Properties](#comp-reference-btbody-properties)
-   [<BTbody> Slots](#comp-reference-btbody-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `tbody`

##### [Properties](#comp-reference-btbody-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Slots](#comp-reference-btbody-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the tbody |

### `<BTd>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BTable/BTd.vue)

-   [<BTd> Properties](#comp-reference-btd-properties)
-   [<BTd> Slots](#comp-reference-btd-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `td`

##### [Properties](#comp-reference-btd-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| colspan | `Numberish` | `undefined` | Number of columns this cell spans |
| rowspan | `Numberish` | `undefined` | Number of rows this cell spans |
| stacked-heading | `string` | `undefined` | Heading for the cell when in stacked mode. Only applicable to cells in the 'tbody' element |
| sticky-column | `boolean` | `false` | If this will be a sticky column. Must be set on all cells in this column. Table must be in sticky-header or responsive mode to work |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Slots](#comp-reference-btd-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the td |

### `<BTfoot>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BTable/BTfoot.vue)

-   [<BTfoot> Properties](#comp-reference-btfoot-properties)
-   [<BTfoot> Slots](#comp-reference-btfoot-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `tfoot`

##### [Properties](#comp-reference-btfoot-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Slots](#comp-reference-btfoot-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the tfoot |

### `<BTh>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BTable/BTh.vue)

-   [<BTh> Properties](#comp-reference-bth-properties)
-   [<BTh> Slots](#comp-reference-bth-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `th`

##### [Properties](#comp-reference-bth-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| colspan | `Numberish` | `undefined` |  |
| rowspan | `Numberish` | `undefined` |  |
| scope | `TableThScope` | `undefined` | Scope of the header cell. Can be one of: col, row, colgroup, rowgroup |
| stacked-heading | `string` | `undefined` | Heading for the cell when in stacked mode. Only applicable to cells in the 'tbody' element |
| sticky-column | `boolean` | `false` | If this will be a sticky colum. Must be set on all cells in this column. table must be in sticky-header or responsive mode to work |
| variant | `ColorVariant | null` | `null` | Applies one of the Bootstrap theme color variants to the component. When implemented \`bg-variant\` and \`text-variant\` will take precedence |

##### [Slots](#comp-reference-bth-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content to place in the th |

### `<BThead>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BTable/BThead.vue)

-   [<BThead> Properties](#comp-reference-bthead-properties)
-   [<BThead> Slots](#comp-reference-bthead-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `thead`

##### [Properties](#comp-reference-bthead-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `ColorVariant` | `null` |  |

##### [Slots](#comp-reference-bthead-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  |  |

### `<BTr>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BTable/BTr.vue)

-   [<BTr> Properties](#comp-reference-btr-properties)
-   [<BTr> Slots](#comp-reference-btr-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `tr`

##### [Properties](#comp-reference-btr-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `ColorVariant` | `null` |  |

##### [Slots](#comp-reference-btr-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  |  |
