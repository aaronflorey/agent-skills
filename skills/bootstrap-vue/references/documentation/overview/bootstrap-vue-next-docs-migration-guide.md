# Migration Guide ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/migration-guide

##### On this page

-   [Overview ​](#overview)
    -   [Nuxt ​](#nuxt)
        
    -   [Status ​](#status)
        
    -   [Deprecation ​](#deprecation)
        
-   [Sync modifier ​](#sync-modifier)
    
-   [Native Events ​](#native-events)
    
-   [Shared Properties ​](#shared-properties)
    -   [Rounding ​](#rounding)
        
    -   [Show and Hide ​](#show-and-hide)
        
    -   [v-html ​](#v-html)
        
-   [Component aliases ​](#component-aliases)
    
-   [Components ​](#components)
    -   [Grid ​](#grid)
        
    -   [BAccordion ​](#baccordion)
        -   [BAccordionItem ​](#baccordionitem)
            
    -   [BAlert ​](#balert)
        
    -   [BAspect ​](#baspect)
        
    -   [BAvatar ​](#bavatar)
        -   [Badge Positioning ​](#badge-positioning)
            
        -   [Rounding Sides ​](#rounding-sides)
            
    -   [BBadge ​](#bbadge)
        
    -   [BBreadcrumb ​](#bbreadcrumb)
        
    -   [BButton ​](#bbutton)
        
    -   [BButtonClose ​](#bbuttonclose)
        
    -   [BButtonToolbar ​](#bbuttontoolbar)
        
    -   [BCalendar ​](#bcalendar)
        
    -   [BCard ​](#bcard)
        
    -   [BCardBody ​](#bcardbody)
        
    -   [BCardGroup ​](#bcardgroup)
        
    -   [BCarousel ​](#bcarousel)
        
    -   [BCollapse ​](#bcollapse)
        
    -   [BDropdown ​](#bdropdown)
        -   [Dropdown sub-components ​](#dropdown-sub-components)
            -   [BDropdownForm ​](#bdropdownform)
                
    -   [BEmbed ​](#bembed)
        
    -   [BForm ​](#bform)
        -   [BForm Components ​](#bform-components)
            
    -   [BFormCheckbox ​](#bformcheckbox)
        
    -   [BFormDatePicker ​](#bformdatepicker)
        
    -   [BFormFile ​](#bformfile)
        -   [Directory Mode ​](#directory-mode)
            
        -   [Drop Placeholder Slot ​](#drop-placeholder-slot)
            
    -   [BFormGroup ​](#bformgroup)
        
    -   [BFormInput ​](#bforminput)
        
    -   [BFormRadio ​](#bformradio)
        
    -   [BFormRating ​](#bformrating)
        -   [Icon System Changes ​](#icon-system-changes)
            
    -   [BFormSelect ​](#bformselect)
        
    -   [BFormSpinButton ​](#bformspinbutton)
        
    -   [BFormTags ​](#bformtags)
        
    -   [BFormTimePicker ​](#bformtimepicker)
        
    -   [BImg ​](#bimg)
        
    -   [BImgLazy ​](#bimglazy)
        
    -   [BInputGroup ​](#binputgroup)
        
    -   [BInputGroupAddon ​](#binputgroupaddon)
        
    -   [BInputGroupAppend ​](#binputgroupappend)
        
    -   [BInputGroupText ​](#binputgrouptext)
        
    -   [BInputGroupPrepend ​](#binputgroupprepend)
        
    -   [BFormSpinbutton ​](#bformspinbutton-1)
        
    -   [BFormTextarea ​](#bformtextarea)
        
    -   [BJumbotron ​](#bjumbotron)
        
    -   [BLink ​](#blink)
        -   [append ​](#append)
            
        -   [event ​](#event)
            
        -   [exact ​](#exact)
            
        -   [$root events ​](#root-events)
            
    -   [BListGroup ​](#blistgroup)
        
    -   [BMedia ​](#bmedia)
        
    -   [BModal ​](#bmodal)
        -   [Removed Global Modal Management ​](#removed-global-modal-management)
            
        -   [Modal Event System Changes ​](#modal-event-system-changes)
            
        -   [Modal Props Changes ​](#modal-props-changes)
            
        -   [Modal Slot changes ​](#modal-slot-changes)
            
        -   [Modal Slot Scoped Variables Changes ​](#modal-slot-scoped-variables-changes)
            
        -   [Modal Z-Index and Stacking Changes ​](#modal-z-index-and-stacking-changes)
            
        -   [Replacement for Modal Message boxes ​](#replacement-for-modal-message-boxes)
            
        -   [Modal Focus Management Changes ​](#modal-focus-management-changes)
            
    -   [BNav ​](#bnav)
        -   [BNavItemDropdown ​](#bnavitemdropdown)
            
    -   [BNavbar ​](#bnavbar)
        -   [BNavbarNav ​](#bnavbarnav)
            
    -   [BOverlay ​](#boverlay)
        
    -   [BPagination ​](#bpagination)
        
    -   [BPaginationNav ​](#bpaginationnav)
        
    -   [BPopover ​](#bpopover)
        -   [Positioning Library ​](#positioning-library)
            
        -   [Placement Values ​](#placement-values)
            
        -   [Default Placement ​](#default-placement)
            
        -   [Triggers ​](#triggers)
            
        -   [Container → Teleport ​](#container-→-teleport)
            
        -   [Content Property ​](#content-property)
            
        -   [Custom Classes ​](#custom-classes)
            
        -   [Variant ​](#variant)
            
        -   [Programmatic Control ​](#programmatic-control)
            
        -   [Disabled State ​](#disabled-state)
            
        -   [Delay ​](#delay)
            
        -   [Fallback Placement ​](#fallback-placement)
            
        -   [Target as Function ​](#target-as-function)
            
        -   [$root Events ​](#root-events-1)
            
        -   [Events ​](#events)
            
    -   [BProgressBar ​](#bprogressbar)
        
    -   [BSidebar ​](#bsidebar)
        -   [Renamed Component ​](#renamed-component)
            
        -   [Placement Changes ​](#placement-changes)
            
        -   [aria-\* support ​](#aria-support)
            
        -   [Variant Props Deprecated ​](#variant-props-deprecated)
            
        -   [Animation Props ​](#animation-props)
            
        -   [Focus Management ​](#focus-management)
            
        -   [Route Change Behavior ​](#route-change-behavior)
            
        -   [Z-Index Prop Removed ​](#z-index-prop-removed)
            
        -   [Backdrop ​](#backdrop)
            
        -   [Class Props ​](#class-props)
            
        -   [Tag ​](#tag)
            
        -   [Header and Footer ​](#header-and-footer)
            
        -   [Events ​](#events-1)
            
    -   [BSkeleton ​](#bskeleton)
        
    -   [BTable ​](#btable)
        -   [Row Expansion (formerly Row Details) ​](#row-expansion-formerly-row-details)
            
        -   [Template Ref API ​](#template-ref-api)
            
        -   [Item Provider Functions ​](#item-provider-functions)
            
        -   [Field Definitions ​](#field-definitions)
            
    -   [BTableLight ​](#btablelight)
        
    -   [BTableSimple ​](#btablesimple)
        -   [BTBody ​](#btbody)
            
        -   [BTFoot ​](#btfoot)
            
        -   [BTHead ​](#bthead)
            
    -   [BTabs ​](#btabs)
        
    -   [BTime ​](#btime)
        
    -   [BToast ​](#btoast)
        -   [Global Toast Management System Changes ​](#global-toast-management-system-changes)
            
        -   [Props Changes ​](#props-changes)
            
        -   [Auto-dismiss Behavior Changes ​](#auto-dismiss-behavior-changes)
            
        -   [Event System Changes ​](#event-system-changes)
            
        -   [Slots Changes ​](#slots-changes)
            
        -   [Accessibility Improvements ​](#accessibility-improvements)
            
    -   [BToaster ​](#btoaster)
        
    -   [BTooltip ​](#btooltip)
        
-   [Directives ​](#directives)
    -   [Hover ​](#hover)
        
    -   [Modal ​](#modal)
        -   [Relationship with v-b-toggle ​](#relationship-with-v-b-toggle)
            
        -   [New Features in BSVN ​](#new-features-in-bsvn)
            
    -   [Popover ​](#popover)
        -   [Trigger Configuration ​](#trigger-configuration)
            
        -   [Placement Configuration ​](#placement-configuration)
            
        -   [Value Configuration ​](#value-configuration)
            
        -   [Custom Class Properties ​](#custom-class-properties)
            
        -   [Special Modifiers ​](#special-modifiers)
            
        -   [Title Attribute Handling ​](#title-attribute-handling)
            
        -   [Migration Examples ​](#migration-examples)
            
        -   [When to Use Component Instead ​](#when-to-use-component-instead)
            
    -   [ScrollSpy ​](#scrollspy)
        
    -   [Toggle ​](#toggle)
        
    -   [Tooltip ​](#tooltip)
        -   [Basic Usage ​](#basic-usage)
            
        -   [Trigger Modifiers ​](#trigger-modifiers)
            
        -   [Object Configuration ​](#object-configuration)
            
        -   [Custom Classes (Directive) ​](#custom-classes-directive)
            
    -   [Visible ​](#visible)
        

# Migration Guide [​](#migration-guide)

Guide for migrating from BootstrapVue to BootstrapVueNext. Learn about breaking changes, deprecated features, and how to update your components, directives, and configuration for Vue 3 and Bootstrap 5.

[Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/migration-guide.md)

## Overview [​](#overview)

`BootstrapVueNext` is an entirely new implementation of [BootstrapVue](https://bootstrap-vue.github.io/bootstrap-vue/) based on [Vue 3](https://vuejs.org/) and [Bootstrap 5](https://getbootstrap.com/). Therefore, you should not expect this to be a drop-in replacement. Where possible compatibility has been maintained, but providing a clean developer experience when working with `Vue 3`, `Bootstrap 5` and this library is a higher priority.

You should start by familiarizing yourself with the [Vue 3 Migration Guide](https://v3-migration.vuejs.org/), especially the [breaking changes](https://v3-migration.vuejs.org/breaking-changes/) section and the [Bootstrap 5 migration guide](https://getbootstrap.com/docs/5.3/migration/#v530). While there are some places where this library will insulate you from the changes to the underlying libraries, a general familiarity with the changes in the core dependencies will serve you well.

For instance, there are likely many places where you use `Bootstrap` utility classes in order to style your components. `Bootstrap 5` made a [breaking change](https://getbootstrap.com/docs/5.3/migration/#utilities-3) to all utility classes that involve `left` and `right` (or `l` and `r`) to be `start` and `end` (or `s` and `e`). This will affect components such as `BNavBar` in unexpected ways that BootstrapVueNext has no control over.

Similarly, `left` and `right` props and values in the `bootstrap-vue-next` API are generally replaced by `start` and `end`.

Bootstrap-vue-next will commit to breaking changes whenever Bootstrap marks something as "deprecated". These changes may be resolved automatically, or they might necessitate manual action from the library's users.

### Nuxt [​](#nuxt)

`bootstrap-vue-next` integrates with `nuxt 3` so if you are using `nuxt`, please read their [migration guide](https://nuxt.com/docs/migration/overview) and our [router link support](/bootstrap-vue-next/docs/reference/router-links.html) reference

### Status [​](#status)

This migration guide is a work in progress. We're adding to this guide as we complete the documentation and parity pass and doing our best to note each component or directive that hasn't been through the full process.

If you would like to help, please refer to the [improving the documentation](https://github.com/bootstrap-vue-next/bootstrap-vue-next/blob/main/CONTRIBUTING.md#improving-the-documentation) and [help verify parity](https://github.com/bootstrap-vue-next/bootstrap-vue-next/blob/main/CONTRIBUTING.md#help-verify-bootstrapvue-and-bootstrap-v5-parity) sections of our [contribution guide.](https://github.com/bootstrap-vue-next/bootstrap-vue-next/blob/main/CONTRIBUTING.md#developing)

For section of this guide that are not marked as in progress, we're still interested in examples of migrations that you have found tricky or clarifcation if the details in the guide weren't sufficent.

### Deprecation [​](#deprecation)

We will mark features of BootstrapVue as deprecated for one of several reasons.

1.  It is no longer relevant because:
    1.  It's been deprecated by Bootstrap
    2.  Some aspect of Vue3 or bootstrap5 has made this feature less useful or not reasonable to implement
    3.  The functionality can be as easily achieved using bootstrap natively (e.g. adding classes)
    4.  There is a more modern way of solving the same problem - in this case we are trying to point out the parity feature in the migration guide
2.  There hasn't been enough demand to implement this feature, and in many cases we believe we can add it in a future version without causing a breaking change. If you would like this feature, please [submit an issue](https://github.com/bootstrap-vue-next/bootstrap-vue-next/issues), upvote an existing issue, or better yet [submit a pull request](https://github.com/bootstrap-vue-next/bootstrap-vue-next/blob/main/CONTRIBUTING.md#developing).

## Sync modifier [​](#sync-modifier)

A number of components in `bootstrap-vue` use `v-bind`'s `.sync` modifier. This modifier has been replaced by properties on the model (generally named models).

For instance, in order to two-way bind to the `indeterminate` property in `BFormCheckBox` you `v-bind` to the model named `indeterminate` rather than adding the sync modifier to the `indeterminate` property:

template

```
<BFormCheckbox v-model="checked" :indeterminate.sync="indeterminate">
  Click me to see what happens
</BFormCheckbox>
```

becomes

template

```
<BFormCheckbox v-model="checked" v-model:indeterminate="indeterminate">
  Click me to see what happens
</BFormCheckbox>
```

See the [Vue 3 migration guide](https://v3-migration.vuejs.org/breaking-changes/v-model.html) for more info.

## Native Events [​](#native-events)

BootstrapVue sometimes listed the native events such as `click` that were bubbled from the underlying HTML element. We're not currently doing that, as we would like to keep the list of events consistent between the documentation and the code.

## Shared Properties [​](#shared-properties)

### Rounding [​](#rounding)

`BAvatar`, `BAvatarGroup`, `BCardImg`, `BImg` and `BOverlay` all implement [`RadiusElementExtendables`](/bootstrap-vue-next/docs/types.html#radiuselementextendables) in order to support complex rounding behavior. The `rounded`, `rounded-top`, `rounded-bottom`, `rounded-start`, and `rounded-end` props each takes a [`RadiusElement`](/bootstrap-vue-next/docs/types.html#radiuselement) value to specify how the component is rounded. The edge specific props such as`rounded-top` override the `rounded` prop for that edge.

This takes the place of `top`, `bottom`, `left`, and `right` values for the `rounded` prop.

### Show and Hide [​](#show-and-hide)

We have made an effort to standardize the names and behaviors of props that are related to the showing and hiding of components and sub-components.

The primary reactive way to control the visibility of a component is generally by use of the `v-model` rather than `visible` as in `BCollapse`, `BModal`, `BToast`. Note that `show` and `visible` are still supported for specifying the initial visibility of these components.

Rather than using `hide` as a prefix to specify that you don't want a sub-component to be rendered, we've moved to using `no` as the prefix. For instant in `BPlaceholder`, `hideHeader` becomes `noHeader`. Similarly we use the 'no' prefix in place of 'skip' in places like `BCollapse` where `skipAnimation` becomes `noAnimation`.

The properties and components that are affected by this change are shown in the following table:

| Prop | Old Prop | Description | Components |
| --- | --- | --- | --- |
| initial-animation | appear | When set, enables the initial animation on mount | 
[BAccordion](#baccordion)

[BAccordionItem](#baccordionitem)

[BCollapse](#bcollapse)

[BDropdown](#bdropdown)

[BModal](#bmodal)

[BNavItemDropdown](#bnavitemdropdown)

[BOffcanvas](#boffcanvas)

[BPopover](#bpopover)

[BToast](#btoast)

[BTooltip](#btooltip)

 |
| lazy | lazy | When set, the content will not be mounted until opened | 

[BAccordion](#baccordion)

[BAccordionItem](#baccordionitem)

[BCollapse](#bcollapse)

[BDropdown](#bdropdown)

[BModal](#bmodal)

[BNavItemDropdown](#bnavitemdropdown)

[BOffcanvas](#boffcanvas)

[BPopover](#bpopover)

[BToast](#btoast)

[BTooltip](#btooltip)

 |
| model-value | visible | Controls the visibility of the component | 

[BCollapse](#bcollapse)

[BDropdown](#bdropdown)

[BModal](#bmodal)

[BNavItemDropdown](#bnavitemdropdown)

[BOffcanvas](#boffcanvas)

[BPopover](#bpopover)

[BToast](#btoast)

[BTooltip](#btooltip)

 |
| no-animation | skip-animation | When set, disables the animation | 

[BCollapse](#bcollapse)

[BDropdown](#bdropdown)

[BModal](#bmodal)

[BNavItemDropdown](#bnavitemdropdown)

[BOffcanvas](#boffcanvas)

[BPopover](#bpopover)

[BToast](#btoast)

[BTooltip](#btooltip)

 |
| no-backdrop | hide-backdrop | Disables rendering of the backdrop | 

[BModal](#bmodal)

[BOffcanvas](#boffcanvas)

 |
| no-ellipsis | hide-ellipsis | Do not show ellipsis buttons | 

[BPagination](#bpagination)

 |
| no-fade | skip-animation | Alias for \`noAnimation\` | 

[BCollapse](#bcollapse)

[BDropdown](#bdropdown)

[BModal](#bmodal)

[BNavItemDropdown](#bnavitemdropdown)

[BOffcanvas](#boffcanvas)

[BPopover](#bpopover)

[BToast](#btoast)

[BTooltip](#btooltip)

 |
| no-goto-end-buttons | hide-goto-end-buttons | Hides the go to first and go to last page buttons | 

[BPagination](#bpagination)

 |
| no-header | hide-header | Disables rendering of the header | 

[BModal](#bmodal)

[BOffcanvas](#boffcanvas)

[BPlaceholderCard](#bplaceholdercard)

[BPlaceholderTable](#bplaceholdertable)

 |
| no-header-close | hide-header-close | Disables rendering of the header close button | 

[BModal](#bmodal)

[BOffcanvas](#boffcanvas)

 |
| no-wrapper | skip-wrapper | Do not render the dropdown wrapper element | 

[BDropdown](#bdropdown)

[BNavItemDropdown](#bnavitemdropdown)

 |
| show |  | When set, and prop 'visible' is false on mount, will animate from closed to open on initial mount. Mainly to help with template show. Use model-value for reactive show/hide | 

[BCollapse](#bcollapse)

[BDropdown](#bdropdown)

[BModal](#bmodal)

[BNavItemDropdown](#bnavitemdropdown)

[BOffcanvas](#boffcanvas)

[BPopover](#bpopover)

[BToast](#btoast)

[BTooltip](#btooltip)

 |
| trans-props |  | Transition properties | 

[BCollapse](#bcollapse)

[BDropdown](#bdropdown)

[BModal](#bmodal)

[BNavItemDropdown](#bnavitemdropdown)

[BOffcanvas](#boffcanvas)

[BPopover](#bpopover)

[BToast](#btoast)

[BTooltip](#btooltip)

 |
| unmount-lazy | lazy | When set and \`lazy\` is true, the content will be unmounted when closed | 

[BAccordion](#baccordion)

[BAccordionItem](#baccordionitem)

[BCollapse](#bcollapse)

[BDropdown](#bdropdown)

[BModal](#bmodal)

[BNavItemDropdown](#bnavitemdropdown)

[BOffcanvas](#boffcanvas)

[BPopover](#bpopover)

[BToast](#btoast)

[BTooltip](#btooltip)

 |
| visible | visible | When 'true', open without animation | 

[BCollapse](#bcollapse)

[BDropdown](#bdropdown)

[BModal](#bmodal)

[BNavItemDropdown](#bnavitemdropdown)

[BOffcanvas](#boffcanvas)

[BPopover](#bpopover)

[BToast](#btoast)

[BTooltip](#btooltip)

 |

### v-html [​](#v-html)

BootstrapVue provided a number of different props named `html` and `*-html` that passed arbitrary data to Vue's `v-html`. While a warning was included with each instance of this use, it is not recommended practice to use `v-html` and obscuring that practice further by passing down other props is ill advised in our opinion. We have instead worked to insure that you have the ability to access the same functionality via slots. In many cases slots were already available and took priority over the `[*-]html` props and we've filled in the gaps where there wasn't a direct replacement. We believe the developer experience in these cases is as good or better than when using props. Most importantly any use your code makes of `v-html` will be explicit. See the [Vue Documentation](https://vuejs.org/guide/best-practices/security.html#html-injection) for their take on the `HTML Injection` attack that use of `v-html` exposes.

| Component | Prop | Replacement Slot |
| --- | --- | --- |
| `BBreadcrumbItem` | `html` | `default` |
| `BCard` | `footer-html` | `footer` |
| `BCard` | `header-html` | `header` |
| `BCardFooter` | `html` | `default` |
| `BCardHeader` | `html` | `default` |
| `BCarouselSlide` | `caption-html` | `caption` |
| `BCarouselSlide` | `text-html` | `default` |
| `BDropdown` | `html` | `default` |
| `BInputGroup` | `append-html` | `append` |
| `BInputGroup` | `prepend-html` | `prepend` |
| `BModal` | `cancel-title-html` | `cancel` |
| `BModal` | `ok-title` | `ok` |
| `BModal` | `title-html` | `title` |
| `BNavItemDropdown` | `html` | `default` |
| `BPopover` [\*](#popover-html) | `html` | `default` |
| `BProgressBar` | `label-html` | `default` |
| `BTable` | `empty-filtered-html` | `empty-filtered` |
| `BTable` | `empty-html` | `empty` |
| `BTable` | `caption-html` | `table-caption` |
| `BTableSimple` | `caption-html` | `table-caption` |

BootstrapVue `b-popover` didn't have an `html` attribute, but alpha versions of BootstrapVueNext did

`BFormCheckboxGroup` and `BFormRadioGroup` implement a scoped slot `option` which takes a `Record<string, unknown>` parameter. You can add arbitrary fields to elements of the options array that you pass in and they will be accessible to the slot. The example below uses the data on the options object to create the html inline in the slot.

Christina **Brown**

John **Smith**

Jane **Doe**

Michael **Johnson**

Patricia **Williams**

Robert **Jones**

Linda **Garcia**

**model =** \[\]

HTML StackBlitz

vue

```
<template>
  <div>
    <BFormCheckboxGroup
      v-model="model"
      :options="options"
    >
      <template #option="{value}">
        {{ (value as Name).first }} <b>{{ (value as Name).last }}</b>
      </template>
    </BFormCheckboxGroup>
    <b>model = </b>{{ model }}
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

interface Name {
  first: string
  last: string
}

const model = ref<Name[]>([])

// Use standard {value, text, disabled?} format for full type safety
const options: {value: Name; text?: string; disabled?: boolean}[] = [
  {value: {last: 'Brown', first: 'Christina'}},
  {value: {last: 'Smith', first: 'John'}},
  {value: {last: 'Doe', first: 'Jane'}},
  {value: {last: 'Johnson', first: 'Michael'}},
  {value: {last: 'Williams', first: 'Patricia'}},
  {value: {last: 'Jones', first: 'Robert'}},
  {value: {last: 'Garcia', first: 'Linda'}},
]
</script>
```

Or you can do a straightforward translation of a `BFormRadioGroup` passing an `HTML` string through to its children. If you're passing user data, this still opens your code uop to [XSS attacks](https://en.wikipedia.org/wiki/Cross-site_scripting), if you do not first [sanitize](https://en.wikipedia.org/wiki/HTML_sanitization) the user supplied string, but the BootstrapVueNext library isn't adding an extra layer of abstraction to this vulnerability.

Color

**model =** Black

HTML StackBlitz

vue

```
<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <BFormGroup
      class="form-group"
      label="Color"
      label-for="color-group"
      label-class="mb-1"
    >
      <BFormRadioGroup
        id="color-group"
        v-model="model"
        name="color-group"
        button-variant="outline-secondary"
        :options="options"
        buttons
      >
        <template #option="val"> <div v-html="val.html" /> </template>
      </BFormRadioGroup>
    </BFormGroup>
    <b>model = </b>{{ model }}
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'

const myColors = ['Black', 'Red', 'Green', 'Blue', 'Purple']

const model = ref(myColors[0])
const options = myColors.map((e) => ({
  value: e,
  html: `<span style="color:${e.toLowerCase()}" /> ${e}`,
}))
</script>
```

## Component aliases [​](#component-aliases)

BootstrapVue had a number of component aliases — for instance, `<b-btn>` was an alias for `<b-button>`. BootstrapVueNext does not support these aliases by default, so you must use the canonical component names.

To define aliases, you can use the [`BootstrapVueNextResolver`'s `aliases` option](/bootstrap-vue-next/docs.html#aliasing).

The table below lists each BootstrapVue alias and its BootstrapVueNext replacement:

| BootstrapVue | BootstrapVueNext |
| --- | --- |
| `b-btn` | `BButton` |
| `b-btn-group` | `BButtonGroup` |
| `b-btn-toolbar` | `BButtonToolbar` |
| `b-dd` | `BDropdown` |
| `b-dd-item` | `BDropdownItem` |
| `b-dropdown-item-btn`, `b-dd-item-button`, `b-dd-item-btn` | `BDropdownItemButton` |
| `b-dd-divider` | `BDropdownDivider` |
| `b-dd-text` | `BDropdownText` |
| `b-dd-form` | `BDropdownForm` |
| `b-dd-group` | `BDropdownGroup` |
| `b-dd-header` | `BDropdownHeader` |
| `b-datalist` | `BFormDatalist` |
| `b-checkbox`, `b-check` | `BFormCheckbox` |
| `b-datepicker` | `BFormDatepicker` |
| `b-file` | `BFormFile` |
| `b-input` | `BFormInput` |
| `b-radio-group` | `BFormRadioGroup` |
| `b-rating` | `BFormRating` |
| `b-select` | `BFormSelect` |
| `b-select-option` | `BFormSelectOption` |
| `b-option-group` | `BFormOptionGroup` |
| `b-tags` | `BFormTags` |
| `b-tag` | `BFormTag` |
| `b-textarea` | `BFormTextarea` |
| `b-timepicker` | `BFormTimepicker` |
| `b-nav-item-dd`, `b-nav-dropdown`, `b-nav-dd` | `BNavItemDropdown` |
| `b-nav-toggle` | `BNavbarToggle` |

Note: While BootstrapVueNext recommends using Vue 3 naming convention `BButton` it is still possible to use `b-button`.

## Components [​](#components)

### Grid [​](#grid)

BootstrapVueNext doesn't currently implement the ability to define `breakpoint` names.

See the [Bootstrap 5 migration guide](https://getbootstrap.com/docs/5.3/migration/#grid-updates), in particular values for `order` on `<BCol>` only provides support for 1 - 5.

### BAccordion [​](#baccordion)

See [Show and Hide](#show-and-hide) shared properties.

#### BAccordionItem [​](#baccordionitem)

See [Show and Hide](#show-and-hide) shared properties.

### BAlert [​](#balert)

As in `bootstrap-vue`, a simple `BAlert` is not visible by default. However, the means of showing the alert are different.

The primary way to control alert visibility is via `v-model` (or `model-value` in props). The `show` and `visible` props are still available for controlling initial visibility, with `show` enabling the initial animation on mount. See [Show and Hide](#show-and-hide) shared properties for details.

template

```
<BAlert show dismissible>I am an alert!</BAlert>
```

becomes

template

```
<BAlert model-value dismissible>I am an alert!</BAlert>
```

For consistency with other components properties, slots and events that use the term `dismissible` in `bootstrap-vue` now use the term `close`. For example the `dismissed` event is now the `closed` event and the `dismiss` slot is now the `close` slot.

### BAspect [​](#baspect)

**`BAspect` component is deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – This component will not be implemented for v1 due to insufficient demand. Bootstrap's [ratio helper utilities](https://getbootstrap.com/docs/5.3/helpers/ratio/) can be used directly instead.

### BAvatar [​](#bavatar)

**Icon support on `BAvatar` is deprecated:** a modern alternative exists. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – Icons can be implemented using the default slot with either [unplugin-icons](/docs/icons) or by embedding an \`.svg\`. See the [Icons](/docs/icons) guide for the recommended approach.

HTML StackBlitz

template

```
<BAvatar>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="80%"
    height="80%"
    fill="currentColor"
    class="bi bi-person-hearts"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M11.5 1.246c.832-.855 2.913.642 0 2.566-2.913-1.924-.832-3.421 0-2.566M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276ZM15 2.165c.555-.57 1.942.428 0 1.711-1.942-1.283-.555-2.281 0-1.71Z"
    />
  </svg>
</BAvatar>
```

#### Badge Positioning [​](#badge-positioning)

Badge positioning has changed to using a single property `badge-placement` and our [`CombinedPlacement` utility](/bootstrap-vue-next/docs/types.html#combinedplacement) rather than individual properties.

For instance, use `badge-placement='top'` in place of `badge-top` or `badge-placement='end'` in place of `badge-right`. For combined props, rather than using `badge-top` and `badge-right`, use \`badge-placement='top-end'.

**`badge-offset` is deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – This property is [significantly more complex](https://github.com/bootstrap-vue-next/bootstrap-vue-next/pull/2692) to implement in BootstrapVueNext (due to Bootstrap 5.0's implementation).

#### Rounding Sides [​](#rounding-sides)

See the [Rounding](#rounding) section.

### BBadge [​](#bbadge)

Badges no longer have focus or hover styles for links. See the [Bootstrap migration guide](https://getbootstrap.com/docs/5.3/migration/#badges) for more information.

### BBreadcrumb [​](#bbreadcrumb)

See the [v-html](#v-html) section for information on deprecation of the `html` prop.

### BButton [​](#bbutton)

**`block` prop on `BButton` is deprecated:** deprecated by Bootstrap. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – See our [\`BButton\` documentation](/docs/components/button#block-level-buttons) and [Bootstrap's documentation](https://getbootstrap.com/docs/5.3/components/buttons/#block-buttons) for details on creating block-level buttons with utility classes.

### BButtonClose [​](#bbuttonclose)

`BButtonClose` has been renamed to `BCloseButton` for consistency with [Bootstrap](https://getbootstrap.com/docs/5.3/components/close-button/)

**`content` and `text-variant` props on `BButtonClose` are deprecated:** deprecated by Bootstrap. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – Bootstrap 5 moved to using an embedded svg for the close icon. See [their migration guide](https://getbootstrap.com/docs/5.3/migration/#close-button-1) for details.

### BButtonToolbar [​](#bbuttontoolbar)

[Keyboard navigation](https://bootstrap-vue.github.io/bootstrap-vue/docs/components/button-toolbar#keyboard-navigation) is not implemented.

### BCalendar [​](#bcalendar)

**`BCalendar` component is deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – This component will not be implemented for v1. See [issue #1860](https://github.com/bootstrap-vue-next/bootstrap-vue-next/issues/1860#event-14531487213) for details.

### BCard [​](#bcard)

Image placement is accomplished by the single `img-placement` prop, which takes the values `top`, `bottom`, `start`, `end`, or `overlay`. This allows us to deprecate the `imgBottom`, `imgEnd`, `imgLeft`, `imgRight`, `imgStart`, and `imgTop` props from `BCard`.

**`top`, `bottom`, `left`, and `right` props on `BCardImg` are deprecated:** deprecated by Bootstrap. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – Use a single \`placement\` prop that takes the values \`top\` or \`bottom\` instead. Note that \`end\` and \`start\` placements are not yet fully implemented as Bootstrap 5 does not provide the necessary CSS classes (\`card-img-end\` and \`card-img-start\`). If these placements are needed, custom CSS will be required.

The `sub-title`, `sub-title-tag` and `sub-title-text-variant` props have been renamed to `subtitle`, `subtitle-tag` and `subtitle-text-variant`, respectively.

**Component-specific variant props (e.g. `footer-bg-variant`) are deprecated:** Vue 3 or Bootstrap 5 changes made this less relevant. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – For \`BCardBody\`, \`BCardHeader\`, \`BCardFooter\`, \`BCardTitle\`, and \`BCardText\` components, the component name specific props are replaced by the generalized props. For example \`footer-bg-variant\` is replaced by \`bg-variant\`. This is true for all of the \`body-\*\`, \`header-\*\`, and \`footer-\*\` props on these components. Note that the specific props are still retained on the main \`BCard\` component.

Similarly the `text-tag` and `title-tag` props have been replaced by `tag` on the `BCardText` and `BCardTitle` components.

**`body-border-variant` and `body-variant` are deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation)

`body-border-variant` and `body-variant` are not implemented on `BCard` and `border-variant` is not implemented on `BCardBody`.

See the [v-html](#v-html) section for information on deprecation of the `footer-html` and `header-html` props on `BCard` and the `html` props on `BCardFooter` and `BCardHeader`.

### BCardBody [​](#bcardbody)

**`border-variant` is deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation)

### BCardGroup [​](#bcardgroup)

**card deck and card columns props is deprecated:** . [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – The \`deck\` and \`columns\` props output CSS classes (\`.card-deck\` and \`.card-columns\`) that were removed from Bootstrap 5. Use Bootstrap's grid system with \`.row-cols-\*\` classes for responsive card layouts instead. Only the default card group (without \`deck\` or \`columns\` props) works with Bootstrap 5 and is responsive.

\### BCardImgLazy

This functionality has been replaced by lazy loading on `<BImg>` see [BImg notes](#bimg) for details.

### BCarousel [​](#bcarousel)

The `sliding-start` and `sliding-end` events have been renamed to `slide` and `slid`. The `label-indicators` prop has been renamed to `indicators-button-label`.

See the [v-html](#v-html) section for information on deprecation of the `caption-html` and `text-html` props on `BCarouselSlide`.

### BCollapse [​](#bcollapse)

**`accordion` prop on `BCollapse` is deprecated:** deprecated by Bootstrap. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – In \`BootstrapVue\`/\`Bootstrap4\`, accordions are implemented via \`BCollapse\`. In \`BootstrapVueNext\`/\`Bootstrap5\` accordions are first class citizens, so please use the [\`BAccordion\`](/docs/components/accordion) component instead.

The prop `toggle` has replaced the prop `appear` with slightly different semantics. In order to create a collapse that is closed and transitions to open on the initial mount, set `visible` to false and `toggle` to true.

The `close` scoped slot element has been replaced by `hide` for consistency with the other props and events on this component.

`$root` instance events `bv::collapse::state` and `bv::toggle::collapse` are deprecrated.

See [Show and Hide](#show-and-hide) shared properties.

### BDropdown [​](#bdropdown)

BootstrapVueNext uses [floating-ui](https://floating-ui.com/) to implemented dropdowns. This affects values and behaviors for properties such as `boundary` as well as the alignment and placement properties. For fine control, use `floating-middleware` in place of `popper-opts`. Check out [our documentation](/bootstrap-vue-next/docs/components/dropdown.html) and [theirs](https://floating-ui.com/) for details.

BootstrapVueNext replaces `dropup`, `dropleft`, `dropright`, and `right` props with a single `placement` prop. Valid values for `placement` are: `top`, `top-start`, `top-end`, `bottom`, `bottom-start` (default), `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end`. See [floating-ui's docs](https://floating-ui.com/docs/computeposition#placement) for details.

| BootstrapVue prop | BootstrapVueNext `placement` value |
| --- | --- |
| (default) | `bottom-start` |
| `right` | `bottom-end` |
| `dropup` | `top-start` |
| `dropright` | `right-start` |
| `dropleft` | `left-start` |

Additionally, BootstrapVueNext supports new placement options that were not available in BootstrapVue, such as `bottom` for center alignment, `top-end`, `left-end`, `right-end`, and others.

**`block` prop on `BDropdown` is deprecated:** deprecated by Bootstrap. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – See our [\`BDropdown\` documentation](/docs/components/dropdown#block-level-dropdowns) and [Bootstrap's documentation](https://getbootstrap.com/docs/5.3/components/buttons/#block-buttons) for details on creating block-level dropdowns.

**`html` prop on `BDropdown` is deprecated:** Vue 3 or Bootstrap 5 changes made this less relevant. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – Use the \`button-content\` slot instead.

`$root` instance events `bv::dropdown::hide` and `bv::dropdown::show` are deprecated.

The boolean argument to control returning focus to the toggle button on the `hide` scoped property of the default slot is deprecated. It is less important in BootstrapVueNext since bootstrap v5 by default doesn't have the focus ring that v4 has.

See [Show and Hide](#show-and-hide) shared properties.

See the [v-html](#v-html) section for information on deprecation of the `html` prop.

The `click` event that was emitted when clicking on the left or button side of a `split` dropdown has been replaced by a `split-click` which provides the native mouse event. This is because naming the event 'click' was hiding the native `click` event so supressing the that event for parents that might have unexpected actions (such as a link navigating to a new page) was difficult.

**`toggleAttrs` prop on `BDropdown` is deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – This prop will not be implemented for v1 due to insufficient demand.

#### Dropdown sub-components [​](#dropdown-sub-components)

BootstrapVueNext makes extensive use of inherited attributes to implement customization in dropdown sub-components in places where BootstrapVue used explicit props on the sub-components. In general the sub-components are implemented as an `<li>` element wrapping the actual sub-component. In these cases, there is a `wrapper-class` prop that is used to apply classes to the `<li>` element and an `*-class` prop that is used to apply classes to the sub-component where `*-class` is related the name of the sub-component. e.g. `BDropdownDivider` has a `divider-class` prop that is used to add classes to the actual divider element. In addition, the inherited attributes are applied to the sub-component rather than the wrapper `<li>` tag and there is an explicit `wrapper-attr` tag defined to place additional attributes on the `<li>` tag.

Looking at the code for [`BDropdownDivider`](https://github.com/bootstrap-vue-next/bootstrap-vue-next/blob/main/packages/bootstrap-vue-next/src/components/BDropdown/BDropdownDivider.vue) should give a clear picture how how the above fits together and the remainder of this section will give specifics on how to handle migration from BootstrapVue.

Several of the BootstrapVue sub-components have an explicit `id` prop, which sets the id on the inner component. In BootstrapVueNext the `id` as well as any other unspecified props will be set will be set on the inner component, having the same effect as in BootstrapVue.

For example:

template

```
<BDropdown text="Dropdown">
  <BDropdownHeader id="my-header">Header Text</BDropdownHeader>
</BDropdown>
```

yields

html

```
<li role="presentation">
  <h6
    id="my-header"
    class="dropdown-header"
  >
    Header Text
  </h6>
</li>
```

The exception to this rule is `<BDropdownGroup>` where we explicitly implement `id` in order to be able to generate a header id.

##### BDropdownForm [​](#bdropdownform)

**`inline` prop on `BDropdownForm` is deprecated:** deprecated by Bootstrap. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – See the [BForm](#bform) migration information. To add classes to the \`<form>\` tag in \`BDropdownForm\` use the \`form-class\` prop.

**`disabled` prop on `BDropdownForm` is deprecated:** Vue 3 or Bootstrap 5 changes made this less relevant. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – Set the disabled prop on individual components as you do with \`BForm\`.

### BEmbed [​](#bembed)

**`BEmbed` component is deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – This component will not be implemented for v1 due to insufficient demand. It can be added post-v1 without breaking changes if needed.

### BForm [​](#bform)

Bootstrap 5 has dropped form-specific layout classes for the grid system. See the [Bootstrap 5 Changelog](https://getbootstrap.com/docs/5.3/migration/#forms), so we no longer explicitly implement and `inline` property on the `BForm` component nor is there a `BFormRow` component. Inline forms are still supported through use of bootstrap classes. See the [inline form](/bootstrap-vue-next/docs/components/form.html#inline-form) documentation for more info.

#### BForm Components [​](#bform-components)

`Vue 3` changed the way that `v-model` binding works and in the process changed the guidance when naming the main model property and events for the primary model. `bootstrap-vue-next` follows this guidance, which affects all of the wrappers for form input. If you're looking for the `value` property or the `change` and `input` events, you'll find that functionality in the `modelValue` property and `update:model-value` events. Bootstrap-vue-next no longer provides custom `change` and `input` events, so the native versions of those events are now exposed.

See the [Vue 3 migration guide](https://v3-migration.vuejs.org/breaking-changes/v-model.html) for more info.

See the [v-html](#v-html) section for information on deprecation of the `html` prop on `BFormDatalist`, `BFormRadioGroup`, `BFormSelect`, and`BFormSelectOptionGroup`

### BFormCheckbox [​](#bformcheckbox)

See [BForm Components](/bootstrap-vue-next/docs/components/form-checkbox.html)

### BFormDatePicker [​](#bformdatepicker)

**`BFormDatepicker` component is deprecated:** a modern alternative exists. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – See [issue #1860](https://github.com/bootstrap-vue-next/bootstrap-vue-next/issues/1860#event-14531487213) for details.

### BFormFile [​](#bformfile)

BootstrapVueNext has completely rewritten `BFormFile` using [VueUse](https://vueuse.org/) composables (`useFileDialog` and `useDropZone`), resulting in a more modern, maintainable implementation.

The `capture` prop no longer accepts a boolean value. Modern browser specifications require `capture` to be either `'user'` (for front-facing camera) or `'environment'` (for rear-facing camera).

#### Directory Mode [​](#directory-mode)

The `noTraverse` prop has been **removed**. BootstrapVueNext directory mode always returns files as a flat array, which matches the behavior of the browser's native file input with the `webkitdirectory` attribute.

When using `directory` mode, each `File` object includes the standard `webkitRelativePath` property containing the relative path from the selected directory root. This is a native browser property that's automatically available when using directory selection. This has replaced the deprecated `$path` property.

**Example:**

ts

```
// Example: After selecting a directory with BFormFile
const files: File[] = [] // Your selected files from v-model

files.forEach((file: File) => {
  console.log(file.name) // "helpers.ts"
  console.log(file.webkitRelativePath) // "src/utils/helpers.ts"
})
```

The `webkitRelativePath` property allows you to reconstruct directory structure or group files by folder as needed.

**BootstrapVue code:**

template

```
<BFormFile directory />
```

**BootstrapVueNext equivalent:**

Browse

No file chosen

HTML StackBlitz

vue

```
<template>
  <BFormFile
    v-model="files"
    directory
  />
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'

const files = ref<File[]>([])

// Access file paths via the webkitRelativePath property
watch(files, (newFiles) => {
  newFiles.forEach((file) => {
    console.log(file.webkitRelativePath) // e.g., "src/components/Button.vue"
  })
})
</script>
```

#### Drop Placeholder Slot [​](#drop-placeholder-slot)

The `drop-placeholder` slot no longer receives a `dropAllowed` scope property. VueUse's `useDropZone` handles file type validation internally, and we don't have access to its validation state. The slot now simply displays the drop placeholder text.

The `noDropPlaceholder` prop has been removed as it was only used when `dropAllowed` was `false`, which never occurred.

### BFormGroup [​](#bformgroup)

Use `label-visually-hidden` instead of `label-sronly` per [Bootstrap Migration Guide](https://getbootstrap.com/docs/5.3/migration/#helpers-2)

### BFormInput [​](#bforminput)

Access to the native `input` element is implemented differently due to changes in how Vue 3 handles references. See the [BFormInput documentation](/bootstrap-vue-next/docs/components/form-input.html#exposed-input-element) for more details.

Disabling mousewheel events on numeric inputs can be achieved using Vue's native event modifier: `@wheel.prevent`. See the [BFormInput documentation](/bootstrap-vue-next/docs/components/form-input.html#disabling-mousewheel-events-on-numeric-like-inputs) for usage examples.

`trim`, `lazy`, or `number` properties have been deprecated. We support the native modifiers [`trim`, `lazy`, and `number`](https://vuejs.org/guide/essentials/forms.html#modifiers). They work as documented in vue.js, so there is no longer a need for the properties.

### BFormRadio [​](#bformradio)

See [BForm Components](/bootstrap-vue-next/docs/components/form-radio.html)

`BFormRadioGroup`, `BFormCheckboxGroup`, and `BFormSelect` now provide TypeScript type safety for the `options` prop: the `v-model` type is inferred from the option values. See the [Type-Safe Options](/bootstrap-vue-next/docs/reference/type-safe-options.html) reference for details.

### BFormRating [​](#bformrating)

`BFormRating` is now available in BootstrapVueNext, preserving most of the original BootstrapVue functionality under Vue 3's v-model conventions. See the [Vue 3 migration guide](https://v3-migration.vuejs.org/breaking-changes/v-model.html) for details on the new `v-model` syntax.

**the internationalization feature is deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – The \`locale\` prop for localized display and RTL support will not be implemented for v1 due to insufficient demand.

#### Icon System Changes [​](#icon-system-changes)

**Icon-related props on form components are deprecated:** a modern alternative exists. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – The following icon-related props from BootstrapVue have been deprecated:

-   `icon-empty`: For specifying empty star icon
-   `icon-half`: For specifying half-filled star icon
-   `icon-full`: For specifying filled star icon
-   `icon-clear`: For specifying clear button icon

BootstrapVueNext does not include a built-in icon library. See [Icons](/docs/icons) for guidance on using unplugin-icons as the recommended modern solution with automatic tree-shaking.

Instead, BootstrapVueNext provides two approaches for customizing icons:

1.  **Default built-in SVG icons** (recommended): Uses built-in star SVG icons that work with `variant`, `color`, and `size` props
2.  **Custom icons via scoped slots**: For complete customization where you handle all styling yourself

**Important:** When using custom icons via scoped slots, the `variant`, `color`, and `size` props do not apply. You must handle all styling in your custom CSS.

### BFormSelect [​](#bformselect)

[Options as an object](https://bootstrap-vue.github.io/bootstrap-vue/docs/components/form-select#options-as-an-object) was deprecated in BootstrapVue and never implemented in BootstrapVueNext

### BFormSpinButton [​](#bformspinbutton)

See [BForm Components](/bootstrap-vue-next/docs/components/form-spinbutton.html)

### BFormTags [​](#bformtags)

In BootstrapVue, the event handlers for some of the other input controls, like `BFormSelect`, lined up with the `inputHandlers` for the default slot's scoped properties such that one could directly bind them. See the [BootstrapVue](https://bootstrap-vue.github.io/bootstrap-vue/docs/components/form-tags#advanced-custom-rendering-usage) documentation for an example. This is no longer the case with BootstrapVueNext.

In general BootstrapVueNext prefered clean APIs to enabling this kind of matching of events, so many of the advanced examples in the [BFormTags docs](https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/form-tags.html#custom-rendering-with-default-scoped-slot) are more explicit when binding attributes from other controls. Please take a look at these examples for guidance when migrating.

### BFormTimePicker [​](#bformtimepicker)

**`BFormTimepicker` component is deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – This component will not be implemented for v1. See [issue #1860](https://github.com/bootstrap-vue-next/bootstrap-vue-next/issues/1860#event-14531487213) for details.

### BImg [​](#bimg)

See the [Rounding](#rounding) section.

Lazy loading is now achieved through the native `loading` attribute rather than a separate component.

**`BImgLazy` and `BCardImgLazy` components are deprecated:** achievable using Bootstrap classes natively. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – Use the native `loading="lazy"` attribute on `<BImg>` and `<BCardImg>` instead.

### BImgLazy [​](#bimglazy)

This functionality has been replaced by lazy loading on `<BImg>` see [BImg](#bimg) for details.

### BInputGroup [​](#binputgroup)

**`BInputGroupAppend`, `BInputGroupPrepend`, and `BInputGroupAddon` components are deprecated:** deprecated by Bootstrap. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – Bootstrap 5 [no longer requires](https://getbootstrap.com/docs/5.3/migration/#forms-1) \`input-group-append\` or \`input-group-prepend\` on elements to append or prepend them to the control, they can just be added as direct children of the input group.

This also has implications on the use of `<BInputGroupText>` - in BootstrapVue, this component was used form grouping sub-components. In BootstrapVueNext, `<BInputGroupText>` should only be used to apply styles to textual elements appended or prepended to a group. Using it to group components breaks the automatic append and prepend stylings.

See the [v-html](#v-html) section for information on deprecation of the `append-html` and `prepend-html` props.

### BInputGroupAddon [​](#binputgroupaddon)

Deprecated - See \[BInputGroup\]

### BInputGroupAppend [​](#binputgroupappend)

Deprecated - See \[BInputGroup\]

### BInputGroupText [​](#binputgrouptext)

Deprecated - See \[BInputGroup\]

### BInputGroupPrepend [​](#binputgroupprepend)

Deprecated - See \[BInputGroup\]

### BFormSpinbutton [​](#bformspinbutton-1)

The locale property in BootstrapVueNext only allows a for a single locale, while BSV allows for an array of locales. If this is a limitation that affect your scenario, please [file an issue](https://github.com/bootstrap-vue-next/bootstrap-vue-next/issues) with an explanation of the expected behavior.

### BFormTextarea [​](#bformtextarea)

**`trim`, `lazy`, and `number` props on `BFormTextarea` are deprecated:** Vue 3 or Bootstrap 5 changes made this less relevant. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – We support the native modifiers [\`trim\`, \`lazy\`, and \`number\`](https://vuejs.org/guide/essentials/forms.html#modifiers). They work as documented in Vue.js, so there is no longer a need for the properties.

Access to the native `textarea` element is implemented differently due to changes in how Vue 3 handles references. Use the `element` property from the component's template ref instead of accessing `$refs` directly. See the [BFormTextarea documentation](/bootstrap-vue-next/docs/components/form-textarea.html#exposed-input-properties-and-methods) for more details.

### BJumbotron [​](#bjumbotron)

**`BJumbotron` component is deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – This component will not be implemented for v1 due to insufficient demand. Bootstrap has deprecated their Jumbotron component, but it can be replicated using utility classes if needed.

Note that Bootstrap has deprecated their Jumbotron component, but it can be replicated using utility classes. See their [migration guide](https://getbootstrap.com/docs/5.3/migration/#jumbotron) for details.

### BLink [​](#blink)

Bootstrap Vue used `Vue Router 3`, BootstrapVueNext uses [`Vue Router 4`](https://router.vuejs.org/) please read the [Vue Router migration guide](https://router.vuejs.org/guide/migration/) if using the router features of `BLink`.

`BLink` no longer supresses the scroll to top default behavior when `href='#'`.

Handling href="#" Links in Documentation

In our documentation site, we addressed the scroll-to-top behavior by cleaning up unnecessary `href="#"` attributes:

1.  **Remove unnecessary hrefs**: We removed `href="#"` from demo components where it wasn't providing any functional value (just styling).
    
2.  **Use contextual anchors**: Where navigation is actually needed, we replaced `href="#"` with meaningful anchor links that point to their demo containers (e.g., `href="#navbar-overview"`). This provides better user experience by allowing users to navigate directly to specific examples.
    

This approach maintains component functionality while eliminating the unwanted scroll-to-top behavior.

#### append [​](#append)

Vue router deprecated the `append` prop in `<router-link>`, BootstrapVueNext has followed suit and deprecated the `append` prop on `BLink`. See the [`Vue Router` migration guide](https://router.vuejs.org/guide/migration/#Removal-of-append-prop-in-router-link-) for details.

#### event [​](#event)

Vue router deprecated the `event` prop in `<router-link>`, BootstrapVueNext has followed suit and deprecated the `event` prop on `BLink`. See the [`Vue Router` migration guide](https://router.vuejs.org/guide/migration/#Removal-of-event-and-tag-props-in-router-link-) for details.

#### exact [​](#exact)

Vue router deprecated the `exact` prop in `<router-link>`, BootstrapVueNext has followed suit and deprecated the `exact`, `exact-path` and `exact-path-active-class` props on `BLink`. See the [`Vue Router` migration guide](https://router.vuejs.org/guide/migration/#Removal-of-the-exact-prop-in-router-link-) for details.

#### $root events [​](#root-events)

BootstrapVueNext no longer emits the `bv::link::clicked` event on `$root`.

### BListGroup [​](#blistgroup)

See [BLink](#blink) for changes to link and router behavior.

### BMedia [​](#bmedia)

**`BMedia` component is deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – This component will not be implemented for v1 due to insufficient demand. Bootstrap has deprecated their Media object, but it can be replicated using flex utility classes. See their [documentation](https://getbootstrap.com/docs/5.3/utilities/flex/#media-object) for details.

### BModal [​](#bmodal)

**`footer-tag` and `header-tag` props on `BModal` are deprecated:** Vue 3 or Bootstrap 5 changes made this less relevant. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – Use the \`footer\` and \`title\` slots instead. See the [modal documentation](/docs/components/modal#custom-rendering-with-slots) for details.

#### Removed Global Modal Management [​](#removed-global-modal-management)

**`$bvModal` instance methods are deprecated:** Vue 3 or Bootstrap 5 changes made this less relevant. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) –

-   `this.$bvModal.show(id)` → Use `useModal` composable or template refs with `.show()`
-   `this.$bvModal.hide(id)` → Use `useModal` composable or template refs with `.hide()`
-   `this.$bvModal.msgBoxOk()` → Use `useModal().create()` with `ok-only` prop - see [below](#replacement-for-modal-message-boxes)
-   `this.$bvModal.msgBoxConfirm()` → Use `useModal().create()`\- see [below](#replacement-for-modal-message-boxes)

**$root event system is deprecated:**

-   `$root.$emit('bv::show::modal', id)` → Use composables or template refs
-   `$root.$emit('bv::hide::modal', id)` → Use composables or template refs
-   `$root.$emit('bv::toggle::modal', id)` → Use composables or template refs

**Alternative approaches:**

Please see [useModal](/bootstrap-vue-next/docs/composables/useModal.html) and [useToggle](/bootstrap-vue-next/docs/composables/useToggle.html) for alternative methods of accessing modals globally.

#### Modal Event System Changes [​](#modal-event-system-changes)

The event system has been significantly updated in BootstrapVueNext:

There is no concept of listening to modal changes via `$root` events.

**New Events**: BootstrapVueNext adds several new events not present in BootstrapVue:

-   `backdrop` - Emitted when the backdrop is clicked
-   `esc` - Emitted when the Esc key is pressed
-   `show-prevented`, `hide-prevented`, `toggle-prevented` - Emitted when actions are prevented

**Event Object Changes**: The event object structure has changed:

-   `BvModalEvent` is now `BvTriggerableEvent`
-   `vueTarget` property is **no longer available** - use template refs or the `target` property instead
-   Event properties are now more consistent across all BootstrapVueNext components

**Trigger Values**: The `trigger` property values have been simplified:

-   BootstrapVue: `'headerclose'` → BootstrapVueNext: `'close'`
-   All other trigger values remain the same: `'ok'`, `'cancel'`, `'esc'`, `'backdrop'`

#### Modal Props Changes [​](#modal-props-changes)

**Renamed props:**

-   `hide-header-close` → `no-header-close`
-   `hide-footer` → `no-footer`
-   `hide-header` → `no-header`
-   `hide-backdrop` → `no-backdrop`
-   `no-enforce-focus` → `no-trap`
-   `title-sr-only` → `title-visually-hidden`

**Removed props (not implemented in BootstrapVueNext):**

-   `aria-label` - Use standard HTML attributes directly on the component. **Note**: Unlike BootstrapVue, BootstrapVueNext does not automatically remove `aria-labelledby` when `aria-label` is present. If using `aria-label`, set `no-header="true"` to prevent conflicts, or ensure your `aria-label` is descriptive enough to work alongside `aria-labelledby`
-   `auto-focus-button` - Use the `focus` prop with values `'ok'`, `'cancel'`, or `'close'`
-   `ignore-enforce-focus-selector` - Use `no-trap` to disable focus trapping entirely
-   `return-focus` - Focus return is handled automatically by the focus trap system
-   `static` - All modals use teleport by default. Use `teleport-disabled` for local rendering

See the [v-html](#v-html) section for information on deprecation of the `cancel-title-html`, `ok-title-html`, and `title-html` props.

**New props in BootstrapVueNext:**

-   `teleport-to` - Specify where the modal should be teleported (default: `'body'`)
-   `teleport-disabled` - Render modal in place instead of teleporting
-   `body-scrolling` - Allow body scrolling while modal is open
-   `backdrop-first` - Control backdrop animation timing
-   `no-trap` - Disable focus trapping (replaces `no-enforce-focus`)
-   `focus` - Enhanced focus control replacing `auto-focus-button`
-   `title-visually-hidden` - Hide title visually but keep for screen readers
-   `header-close-variant` - Control close button variant
-   `header-close-label` - Accessibility label for close button
-   `lazy` - **Available in BootstrapVueNext** - When set, the content will not be mounted until opened
-   `no-fade` - **Available in BootstrapVueNext** - Disables animation (alias for `no-animation`)
-   `no-animation` - Disables animation
-   `unmount-lazy` - When set and `lazy` is true, content will be unmounted when closed
-   `initial-animation` - When set, enables the initial animation on mount

**Changed behavior:**

-   `header-close-content` - This prop is **removed** in BootstrapVueNext. In BootstrapVue, this prop allowed customizing the close button content (defaulted to `'&times;'`). In BootstrapVueNext, use the `header-close` slot instead, which provides more flexibility than the simple string prop:

template

```
<BModal>
  <template #header-close>
    <span aria-hidden="true">&times;</span>
  </template>
</BModal>
```

template

```
<BModal>
  <template #header-close>
    <BIcon icon="x-lg" />
  </template>
</BModal>
```

#### Modal Slot changes [​](#modal-slot-changes)

[BootstrapVue](https://bootstrap-vue.github.io/bootstrap-vue/docs/components/modal#custom-rendering-with-slots) provides different slots to configure some pieces of the modal component. These slots are slightly different in [BootstrapVueNext](/bootstrap-vue-next/docs/components/modal.html#comp-reference-bmodal-slots):

| BootstrapVue | BootstrapVueNext |
| --- | --- |
| default | default |
| modal-backdrop | backdrop |
| modal-cancel | cancel |
| modal-footer | footer |
| modal-header | header |
| modal-header-close | header-close |
| modal-ok | ok |
| modal-title | title |

#### Modal Slot Scoped Variables Changes [​](#modal-slot-scoped-variables-changes)

The scoped variables available to modal slots have changed between BootstrapVue and BootstrapVueNext:

**BootstrapVue slot scope:**

typescript

```
interface BSVSlotScope {
  visible: boolean
  ok: () => void
  cancel: () => void
  close: () => void
}
```

**BootstrapVueNext slot scope (BModalSlotsData):**

typescript

```
interface BModalSlotsData {
  id: string
  visible: boolean
  active: boolean // Same as visible
  cancel: () => void
  close: () => void
  ok: () => void
  show: (trigger?: string, noTriggerEmit?: boolean) => void
  hide: (trigger?: string, noTriggerEmit?: boolean) => void
  toggle: (trigger?: string, noTriggerEmit?: boolean) => void
}
```

**Key changes:**

-   **New properties**: `id`, `show()`, `toggle()` are now available
-   **Enhanced `hide()` method**: Now accepts optional `noTriggerEmit` parameter
-   **Trigger value change**: `close()` now emits trigger `'close'` instead of `'headerclose'`
-   **Dual visibility properties**: Both `active` and `visible` provide the same visibility state

#### Modal Z-Index and Stacking Changes [​](#modal-z-index-and-stacking-changes)

BootstrapVueNext has completely rewritten modal stacking:

-   **Automatic z-index management**: No manual z-index calculation needed
-   **CSS variables for stacking**: Uses `--b-position`, `--b-inverse-position`, `--b-count`
-   **Stack positioning classes**: Automatically applies `.stack-position-*` classes
-   **Multiple modal support**: Enhanced support for multiple modals with proper layering

#### Replacement for Modal Message boxes [​](#replacement-for-modal-message-boxes)

[BootstrapVue](https://bootstrap-vue.github.io/bootstrap-vue/docs/components/modal#modal-message-boxes) provided two methods on the `this.$bvModal` object called `msgBoxOk` and `msgBoxConfirm`. In keeping with the Vue3 first philosophy, BootstrapVueNext provides a composable called [`useModal`](/bootstrap-vue-next/docs/composables/useModal.html) that fills the same use cases (and more).

Please read the [`useModal`](/bootstrap-vue-next/docs/composables/useModal.html) documentation and then return here for examples of replacements for `msgBoxOk` and `msgBoxConfirm`.

Example using `useModal.create` to replace `msgBoxOk`: Note: If you use `<BApp>`, the modal orchestrator is included by default.

Show Message

Result:

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton @click="okBox">Show Message</BButton>
    <div>Result: {{ okResult }}</div>
  </div>
</template>

<script setup lang="ts">
import {useModal} from 'bootstrap-vue-next/composables/useModal'
import {ref} from 'vue'

const {create} = useModal()

const okResult = ref<boolean | null | undefined>(null)

const okBox = async () => {
  const value = await create({
    body: 'This is an informational message',
    title: 'Message',
    okOnly: true,
  }).show()
  okResult.value = typeof value === 'object' && value !== null && 'ok' in value ? value.ok : null
}
</script>
```

Example using `useModal.create` to replace `msgBoxConfirm`: Note: If you use `<BApp>`, the modal orchestrator is included by default.

Show Confirm

Result: null

HTML StackBlitz

vue

```
<template>
  <div>
    <BButton @click="confirmBox">Show Confirm</BButton>
    <div>Result: {{ confirmResult ?? 'null' }}</div>
  </div>
</template>

<script setup lang="ts">
import {useModal} from 'bootstrap-vue-next/composables/useModal'

import {ref} from 'vue'

const {create} = useModal()
const confirmResult = ref<boolean | null | undefined>(null)

const confirmBox = async () => {
  const value = await create({
    body: 'Are you sure you want to do this?',
    title: 'Confirm',
    okTitle: 'Yes',
    cancelTitle: 'No',
  }).show()
  confirmResult.value =
    typeof value === 'object' && value !== null && 'ok' in value ? value.ok : null
}
</script>
```

The `create` method accepts all properties defined on [BModal](/bootstrap-vue-next/docs/components/modal.html#component-reference).

See [Show and Hide](#show-and-hide) shared properties.

#### Modal Focus Management Changes [​](#modal-focus-management-changes)

BootstrapVueNext uses a modern focus trap system with enhanced accessibility:

**Enhanced focus prop**: The `focus` prop replaces `auto-focus-button` and accepts:

-   `'ok'`, `'cancel'`, `'close'` - Focus built-in buttons
-   Element references, selectors, or HTMLElements for custom focus targets
-   `false` to disable initial focus (not recommended for accessibility)

**Automatic focus return**: Focus is automatically returned to the triggering element when the modal closes, eliminating the need for:

-   `return-focus` prop - Handled automatically by focus trap
-   Manual focus management in most cases

**Focus trapping**: Enabled by default using `@vueuse/integrations/useFocusTrap`:

-   `no-trap` replaces `no-enforce-focus` to disable focus trapping
-   `ignore-enforce-focus-selector` is not available - use `no-trap` if needed
-   Focus automatically cycles within the modal

**ARIA improvements**:

-   `title-visually-hidden` replaces `title-sr-only` with better semantic naming
-   Standard HTML `aria-*` attributes work directly on the component
-   Enhanced screen reader support with proper labeling

### BNav [​](#bnav)

`align` prop now takes values from [`AlignmentJustifyContent`](/bootstrap-vue-next/docs/types.html#alignment): `start`, `center`, `end`, `between`, `around`, and `evenly`

#### BNavItemDropdown [​](#bnavitemdropdown)

See [`BDropdown`](#bdropdown) for details

See the [v-html](#v-html) section for information on deprecation of the `html` prop.

### BNavbar [​](#bnavbar)

The `type` prop is deprecated. Use the `v-b-color-mode` directive or `useColorMode` composable instead. Details in our [docs](/bootstrap-vue-next/docs/components/navbar.html#color-schemes)

#### BNavbarNav [​](#bnavbarnav)

`align` prop now takes values from [`AlignmentJustifyContent`](/bootstrap-vue-next/docs/types.html#alignment): `start`, `center`, `end`, `between`, `around`, and `evenly`

See [Show and Hide](#show-and-hide) shared properties.

### BOverlay [​](#boverlay)

See the [Rounding](#rounding) section.

prop `blur` does not work when the prop `bgColor` is defined. It also will not work if the prop `variant` is anything other than `white` or `transparent`. This overcomes a browser change.

### BPagination [​](#bpagination)

See [Show and Hide](#show-and-hide) shared properties.

### BPaginationNav [​](#bpaginationnav)

**`BPaginationNav` component is deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – This component will not be implemented for v1 due to insufficient demand. It can be added post-v1 without breaking changes if needed.

### BPopover [​](#bpopover)

See [Show and Hide](#show-and-hide) shared properties.

See the [v-html](#v-html) section for information on deprecation of the `html` prop.

#### Positioning Library [​](#positioning-library)

BootstrapVueNext uses [floating-ui](https://floating-ui.com/) instead of Popper.js for positioning. This brings better performance and more features, but requires some migration:

#### Placement Values [​](#placement-values)

Placement values have changed to align with floating-ui conventions:

| BootstrapVue | BootstrapVueNext |
| --- | --- |
| `top` | `top` |
| `topleft` | `top-start` |
| `topright` | `top-end` |
| `bottom` | `bottom` |
| `bottomleft` | `bottom-start` |
| `bottomright` | `bottom-end` |
| `left` | `left` |
| `lefttop` | `left-start` |
| `leftbottom` | `left-end` |
| `right` | `right` |
| `righttop` | `right-start` |
| `rightbottom` | `right-end` |

#### Default Placement [​](#default-placement)

The default placement has changed from `right` to `top`.

#### Triggers [​](#triggers)

Triggers work differently in BootstrapVueNext. Instead of space-separated string values, use individual boolean props:

| BootstrapVue | BootstrapVueNext |
| --- | --- |
| `triggers="click"` | `click` (prop, default is hover + focus) |
| `triggers="hover"` | `hover` (prop) |
| `triggers="focus"` | `focus` (prop) |
| `triggers="hover focus"` | `hover focus` (both props) |
| `triggers="click blur"` | `click` (blur is automatic with click) |
| `triggers="manual"` | `manual` (prop) |

#### Container → Teleport [​](#container-→-teleport)

The `container` prop has been replaced with Vue 3's teleport system:

template

```
<BPopover target="btn" container="my-container" />
```

template

```
<BPopover target="btn" teleport-to="#my-container" />
<!-- or disable teleport entirely -->
<BPopover target="btn" :teleport-disabled="true" />
```

#### Content Property [​](#content-property)

The `content` prop has been renamed to `body` for consistency:

template

```
<BPopover target="btn" content="Body text" />
```

template

```
<BPopover target="btn" body="Body text" />
```

#### Custom Classes [​](#custom-classes)

The `custom-class` prop has been split into more specific props:

-   `custom-class` → `body-class` (for popover body)
-   New: `title-class` (for popover title)

#### Variant [​](#variant)

The `variant` prop has been deprecated. Use Bootstrap's [color and background utility classes](https://getbootstrap.com/docs/5.3/helpers/color-background/) instead:

template

```
<BPopover variant="danger" />
```

template

```
<BPopover body-class="bg-danger text-white" title-class="bg-danger text-white border-danger" />
```

See [Popover custom classes and variants](/bootstrap-vue-next/docs/components/popover.html#custom-classes-and-variants) for more details.

#### Programmatic Control [​](#programmatic-control)

The `.sync` modifier on the `show` prop has been replaced with `v-model`:

template

```
<BPopover :show.sync="isVisible" />
```

template

```
<BPopover v-model="isVisible" />
```

#### Disabled State [​](#disabled-state)

The `disabled` prop and programmatic disabling features have been deprecated. Use `manual=true` combined with `v-model` for full control:

template

```
<BPopover :disabled.sync="isDisabled" />
```

template

```
<BPopover :manual="isDisabled" v-model="isVisible" />
```

#### Delay [​](#delay)

The `delay` prop now defaults to `{show: 100, hide: 300}` instead of `50` for both.

#### Fallback Placement [​](#fallback-placement)

`fallback-placement` has been deprecated. Use the `noFlip` prop or configure custom middleware via the `floatingMiddleware` prop. See the [floating-ui documentation](https://floating-ui.com/docs/flip) for advanced placement control.

#### Target as Function [​](#target-as-function)

The ability for the `target` prop to accept a function has been deprecated. Use a template ref, element ID string, or querySelector string instead.

#### $root Events [​](#root-events-1)

The `$root` event system (`bv::show::popover`, `bv::hide::popover`, etc.) has been deprecated. Use the [usePopover](/bootstrap-vue-next/docs/composables/usePopover.html) composable or template refs with exposed methods instead:

HTML StackBlitz

vue

```
<template>
  <BPopover ref="popover" />
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck -- BSV example demonstrating deprecated $root.$emit pattern
export default {
  methods: {
    showPopover() {
      this.$root.$emit('bv::show::popover', 'my-popover')
    },
  },
}
</script>
```

HTML StackBlitz

vue

```
<template>
  <BPopover ref="popover" />
</template>

<script setup lang="ts">
import {ref} from 'vue'

const popover = ref()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const showPopover = () => {
  popover.value?.show()
}
</script>
```

#### Events [​](#events)

The `disabled` and `enabled` events have been deprecated along with the `disabled` prop.

See the [Popover documentation](/bootstrap-vue-next/docs/components/popover.html) for complete details on all available features.

### BProgressBar [​](#bprogressbar)

See the [v-html](#v-html) section for information on deprecation of the `label-html` prop.

### BSidebar [​](#bsidebar)

`BSidebar` has been renamed to `BOffcanvas` to align with the name chosen by the [Bootstrap 5](https://getbootstrap.com/docs/5.3/components/offcanvas) team for this functionality.

#### Renamed Component [​](#renamed-component)

-   `<BSidebar>` → `<BOffcanvas>`

#### Placement Changes [​](#placement-changes)

The `right` prop has been replaced with a more flexible `placement` prop:

-   `right` prop is **deprecated**
-   Use `placement="end"` instead of `:right="true"`
-   Use `placement="start"` instead of `:right="false"` (or omit, as `start` is the default)
-   New placements available: `placement="top"` and `placement="bottom"`

#### aria-\* support [​](#aria-support)

`aria-label` and `aria-labelby` aren't explicitly defined as props, but setting them on `<BOffcanvas>` will bind correctly to the main `<div>`.

#### Variant Props Deprecated [​](#variant-props-deprecated)

The `bg-variant` and `text-variant` props have been **deprecated**. Bootstrap 5 offcanvas components don't support these props directly.

Instead, use utility classes:

-   Apply background classes via `body-class` prop: `body-class="bg-dark text-light"`
-   Apply classes to content wrapper elements within the default slot
-   Use the `header-class` prop for header styling

#### Animation Props [​](#animation-props)

The `no-slide` prop has been renamed to `no-animation` for consistency with other components.

-   `no-slide` → `no-animation`

#### Focus Management [​](#focus-management)

The `no-enforce-focus` prop has been renamed to `no-trap` for consistency with modal and other components.

-   `no-enforce-focus` → `no-trap`

#### Route Change Behavior [​](#route-change-behavior)

The `no-close-on-route-change` prop has been **removed**. Offcanvas components no longer automatically close on route changes by default. If you need this behavior, you'll need to implement it manually by watching the route and calling the `hide()` method.

#### Z-Index Prop Removed [​](#z-index-prop-removed)

The `z-index` prop has been **removed**. Use CSS to customize z-index if needed.

#### Backdrop [​](#backdrop)

The `backdrop` prop has been deprecated. Backdrop is enabled by default. Use the new `no-backdrop` prop to turn it off.

The `backdrop-variant` prop has been **removed**. Bootstrap 5 offcanvas backdrops use a standard dark backdrop.

#### Class Props [​](#class-props)

The `sidebar-class` prop has been **removed**. Use the standard `class` prop instead to apply classes directly to the offcanvas element.

#### Tag [​](#tag)

The `tag` prop has been deprecated.

#### Header and Footer [​](#header-and-footer)

The `header-tag` and `footer-tag` props have been deprecated. Use the `header` and `footer` slots to override header and footer behavior.

The `close-label` prop been renamed to `header-close-label` for consistency

#### Events [​](#events-1)

The `change` event is no longer emitted. Use `update:model-value` instead for v-model compatibility, or use the `show`/`hide`/`shown`/`hidden` events to track state changes.

### BSkeleton [​](#bskeleton)

`<BSkeleton*>` components have been replaced by the more appropriately named `<BPlaceholder*>` components.

`<BSkeletonIcon>` is deprecated along with the rest of the BootstrapVue icon support. See our [icon documentation](/bootstrap-vue-next/docs/icons.html) for details. This functionality can be replicated by using `<BPlaceholderWrapper>` with your choice of icon replacement in the `loading` slot.

`<BSkeletonImg>` is deprecated, using `<BPlaceholderWrapper>` should be a workable replacement.

`animation` values have changed from `Wave`, `Fade`, `Throb` and `None` to `wave`, `glow`, and `undefined` to reflect the [Bootstrap 5 animations](https://getbootstrap.com/docs/5.3/components/placeholders/#animation)

`type` has been deprecated. [`BPlaceholderButton`](/bootstrap-vue-next/docs/components/placeholder.html#placeholder-buttons) is a replacement for the button type. If you find a need for the other types (Avatar or Input), please open an issue or propose a pull request.

### BTable [​](#btable)

See the [v-html](#v-html) section for information on deprecation of the `html` prop.

The slot `emptyfiltered` has been renamed to `empty-filtered` for consistency.

The following features are not included in v1:

**Deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – The `no-footer-sorting` prop. Footer sorting can be controlled through table structure.

**Deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – RegExp support for the `filter` prop. Use the `filterFunction` prop for complex filtering logic.

**Deprecated:** Vue 3 or Bootstrap 5 changes made this less relevant. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – The `context-changed` event. Use the `change` event and the exposed `displayItems` function as demonstrated in \[the documentation\](/docs/components/table#complete-example).

**Deprecated:** Vue 3 or Bootstrap 5 changes made this less relevant. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – The `refreshed` event. Call the exposed `refresh()` method and watch `change` or `filtered` events.

`filter-included-fields` and `filter-ignored-fields` have been replaced by a single `filterable` prop.

`filter-debounce` has been replaced by `debounce`.

`no-sort-reset` is deprecated. Use `must-sort`. By default, sortability can be reset by clicking (3) times \[asc => desc => undefined => asc...\]

`selected-variant` has been renamed to `selection-variant` for internal consistency.

Sorting has been significantly reworked. Read the [sorting section](/bootstrap-vue-next/docs/components/table.html#sorting) of our documentation. Some specific changes include the following:

-   `sort-changed` event is replaced by the `update:sort-by` event.
-   `sort-direction` has been renamed `initial-sort-direction` for clarity.
-   The sort icons have been changed.
-   The internal `sort-compare` routine has been simplified, if you need to customize sorting for localization, the documentation on [custom sort comparers](/bootstrap-vue-next/docs/components/table.html#custom-sort-comparers) for details.
-   `multi-sort` functionality has been implemented.

`table-variant` is replaced with `variant` for consistency.

The slot scope for `table-colgroup` slot now only contains the `fields` prop, with the `columns` prop removed.

BootstrapVue used the main v-model binding to expose a readonly version of the displayed items. This is deprecated. Instead, use the exposed function `displayedItems` as demonstrated in [the documentation](/bootstrap-vue-next/docs/components/table.html#complete-example).

The semantics of the `row-selected` event have changed. `row-selected` is now emitted for each selected row and sends the single row's item as it's parameter. There is a new matching event called `row-unselected` that is emitted for each row that is unselected. There is also a named model `selectedItems` that behaves like the BSV `row-selected` event, emitting an array of all seleted rows. An example of this is available in [the documentation](/bootstrap-vue-next/docs/components/table.html#row-select-support)

All row-level events (`row-clicked`, `row-dblclicked`, `row-hovered`, `row-unhovered`, `row-contextmenu`, `row-middle-clicked`) now emit a single payload object with `{item, index, event}` instead of positional arguments. The `head-clicked` event likewise now emits `{key, field, event, isFooter}` as one object payload.

BootstrapVue adds utility classes to the `<table>` including `b-table-select-single`,`b-table-select-multi`, and `b-table-select-range`, these have been deprecated, as the functionality should be easily replicated by the developer without adding to the API surface.

**Deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – The `aria-multiselect` attribute. Modern screen readers handle table selection adequately.

**Deprecated:** a modern alternative exists. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – The `label-sort-clear`, `label-sort-asc`, and `label-sort-desc` props. These provided hidden text for screen readers to indicate sorting actions. BTable now uses proper ARIA attributes (`aria-label`, `aria-sort`) on header elements which provide the same accessibility information in a modern, standards-compliant way.

Helper components (`BTbody`, `BThead`, `BTfoot`, `BTr`, `BTh`, `BTd`) use semantic HTML elements that provide implicit ARIA roles. `BTh` automatically calculates the `scope` attribute based on `colspan` and `rowspan` props.

The `filtered` event has a single argument `Item[]` rather than two arguments with an array and length. The semantics haven't changed.

Heading and data row accessibility is implemented via keyboard navigation (tab and arrow keys for sortable headers and selectable rows) and proper semantic HTML structure.

#### Row Expansion (formerly Row Details) [​](#row-expansion-formerly-row-details)

**Terminology changes:** BootstrapVue used "details" terminology for expanding rows, which has been changed to "expansion" for clarity and linguistic correctness. The following changes have been made:

-   Scoped slot variable `detailsShowing` is now `expansionShowing`
-   Scoped slot function `toggleDetails` is now `toggleExpansion`
-   The concept of "detailed items" is now "expanded items"

**v-model instead of object property:** The expansion state is no longer tracked using a property on item objects. Instead, use the `v-model:expanded-items` binding to manage which rows are expanded.

**Before (BootstrapVue):**

| Name | Full Details |
| --- | --- |
| Item 1 | Full details for Item 1 |
| Item 2 | Full details for Item 2 |

HTML StackBlitz

vue

```
<template>
  <BTable :items="items">
    <!-- @ts-expect-error - BSV pattern no longer supported -->
    <template #cell(show_details)="row">
      <!-- @ts-expect-error - BSV pattern no longer supported -->
      <BButton @click="row.toggleDetails">
        <!-- @ts-expect-error - BSV pattern no longer supported -->
        {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
      </BButton>
    </template>
    <!-- @ts-expect-error - BSV slot name no longer supported -->
    <template #row-details="row">
      <BCard>{{ row.item.fullDetails }}</BCard>
    </template>
  </BTable>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck -- BSV example demonstrating deprecated patterns
const items = [
  {name: 'Item 1', fullDetails: 'Full details for Item 1'},
  {name: 'Item 2', fullDetails: 'Full details for Item 2'},
]
// Expansion was controlled via _showDetails property on items
</script>
```

**After (BootstrapVueNext):**

| Name | Full Details |
| --- | --- |
| Item 1 | Full details for Item 1 |
| 

Full details for Item 1



 |
| Item 2 | Full details for Item 2 |

HTML StackBlitz

vue

```
<template>
  <BTable v-model:expanded-items="expandedItems" :items="items">
    <template #cell(show_details)="row">
      <BButton @click="row.toggleExpansion">
        {{ row.expansionShowing ? 'Hide' : 'Show' }} Details
      </BButton>
    </template>
    <template #row-expansion="row">
      <BCard>{{ row.item?.fullDetails }}</BCard>
    </template>
  </BTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = [
  { name: 'Item 1', fullDetails: 'Full details for Item 1' },
  { name: 'Item 2', fullDetails: 'Full details for Item 2' },
]

// Expansion state managed via v-model
const expandedItems = ref([items[0]]) // Expand first item by default
</script>
```

**Using with Primary Key:**

When using a `primary-key`, expansion state persists across item array updates (like pagination or "Load more"). To set default expanded items with a `primary-key`, you must use the table's template ref `expansion.get()` function:

| Id | Name |
| --- | --- |
| 1 | Item 1 |
| 2 | Item 2 |

HTML StackBlitz

vue

```
<template>
  <BTable
    ref="tableRef"
    v-model:expanded-items="expandedItems"
    :items="items"
    primary-key="id"
  >
    <!-- ... -->
  </BTable>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import {onMounted, ref} from 'vue'

const tableRef = ref()
const items = [
  {id: 1, name: 'Item 1'},
  {id: 2, name: 'Item 2'},
]
const expandedItems = ref<any[]>([])

// Set default expanded items after mount
onMounted(() => {
  expandedItems.value.push(tableRef.value.expansion.get(items[1]))
})
</script>
```

The slot name remains `row-expansion` (changed from `row-details` in earlier versions).

#### Template Ref API [​](#template-ref-api)

**BREAKING: Template ref API reorganized into namespaced structure**

The BTable template ref API has been reorganized from a flat structure to a namespaced structure with `expansion` and `selection` properties. This improves organization and makes it clearer which methods and properties relate to which feature.

**Selection API changes:**

Methods and properties related to row selection are now accessed via `ref.selection.*`:

-   `clearSelected()` → `selection.clearSelected()`
-   `selectAll()` → `selection.selectAll()`
-   `toggleSelectAll()` → `selection.toggleSelectAll()`
-   `selectedItems` → `selection.selectedItems`

**Expansion API changes:**

Methods and properties related to row expansion are now accessed via `ref.expansion.*`:

-   `expandedItems` → `expansion.expandedItems`
-   New methods available: `expansion.expandAll()`, `expansion.collapseAll()`, `expansion.toggleExpandAll()`

**Before (flat structure):**

| Name |
| --- |
| Item 1 |
| Item 2 |

HTML StackBlitz

vue

```
<template>
  <BTable
    ref="tableRef"
    :items="items"
    selectable
  >
    <BButton @click="handleClearSelection">Clear Selection</BButton>
    <BButton @click="handleSelectAll">Select All</BButton>
  </BTable>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const tableRef = ref()
const items = [{name: 'Item 1'}, {name: 'Item 2'}]

const handleClearSelection = () => {
  tableRef.value.clearSelected()
}

const handleSelectAll = () => {
  tableRef.value.selectAll()
}

// Access selected items
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSelectedItems = () => tableRef.value.selectedItems
</script>
```

**After (namespaced structure):**

| Name |
| --- |
| Item 1 |
| Item 2 |

HTML StackBlitz

vue

```
<template>
  <BTable
    ref="tableRef"
    :items="items"
    selectable
  >
    <BButton @click="handleClearSelection">Clear Selection</BButton>
    <BButton @click="handleSelectAll">Select All</BButton>
  </BTable>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const tableRef = ref()
const items = [{name: 'Item 1'}, {name: 'Item 2'}]

const handleClearSelection = () => {
  tableRef.value.selection.clearSelected()
}

const handleSelectAll = () => {
  tableRef.value.selection.selectAll()
}

// Access selected items
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSelectedItems = () => tableRef.value.selection.selectedItems
</script>
```

**Expansion API example:**

| Name |
| --- |
| Item 1 |
| Item 2 |

HTML StackBlitz

vue

```
<template>
  <BTable
    ref="tableRef"
    v-model:expanded-items="expandedItems"
    :items="items"
  >
    <BButton @click="handleExpandAll">Expand All</BButton>
    <BButton @click="handleCollapseAll">Collapse All</BButton>
  </BTable>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const tableRef = ref()
const expandedItems = ref([])
const items = [{name: 'Item 1'}, {name: 'Item 2'}]

const handleExpandAll = () => {
  tableRef.value.expansion.expandAll()
}

const handleCollapseAll = () => {
  tableRef.value.expansion.collapseAll()
}
</script>
```

#### Item Provider Functions [​](#item-provider-functions)

To use an items provider, set the `provider` prop to a provider function and leave the `items` prop undefined (unlike in BootstrapVue, where the `items` prop was overloaded). See our [documentation](/bootstrap-vue-next/docs/components/table.html#using-items-provider-functions) for details.

The items provider function `ctx` parameter now contains `sortBy` array rather than `sortBy` and `sortDesc` fields - see the [sorting docs](/bootstrap-vue-next/docs/components/table.html#sorting) for details

The table prop `api-url` and the items provider function `ctx` parameter `apiUrl` field are both deperecdated as they are easily replaced by direct management of the api call by the user.

The items provider no longer includes an optional callback parameter, use the async method of calling instead.

#### Field Definitions [​](#field-definitions)

**BREAKING: `field.key` no longer supports nested paths**

In BootstrapVue, the `field.key` property could be set to nested string paths like `name.firstName` to access nested properties. This is no longer supported. The `key` property must now be a simple string identifier used only for column identification and slot names.

**New `accessor` property for data access**

To access nested or computed data, use the new optional `accessor` property:

-   For root-level properties: The `accessor` can be a string matching a root property name (e.g., `'email'`)
-   For nested or computed values: The `accessor` should be a function that receives the row item and returns the value
-   If omitted, the `key` property is used by default (for root-level properties only)

**Before (BootstrapVue):**

typescript

```
const fields = [
  { key: 'name.first', label: 'First Name' },
  { key: 'name.last', label: 'Last Name' },
  { key: 'age', label: 'Age' },
]
```

**After (BootstrapVueNext):**

typescript

```
const fields = [
  {
    key: 'firstName',
    label: 'First Name',
    accessor: (item: any) => item.name.first,
  },
  {
    key: 'lastName',
    label: 'Last Name',
    accessor: (item: any) => item.name.last,
  },
  { key: 'age', label: 'Age' }, // Simple root property works as before
]
```

**BREAKING: Function signatures changed to use single parameter objects**

The following TableField properties now accept a single parameter object instead of multiple positional parameters:

-   `formatter`: Now receives `{value, key, item}` instead of `(value, key, item)`
-   `tdAttr`: Now receives `{value, key, item}` instead of `(value, key, item)`
-   `thAttr`: Now receives `{value, key, item, type}` instead of `(value, key, item, type)`

**Before (BootstrapVue):**

typescript

```
import type { TableField } from 'bootstrap-vue-next'

const fields: TableField[] = [
  {
    key: 'status',
    formatter: (value) => String(value.value).toUpperCase(),
    tdAttr: (value) => ({
      class: value.value === 'active' ? 'text-success' : '',
    }),
  },
]
```

**After (BootstrapVueNext):**

typescript

```
const fields = [
  {
    key: 'status',
    formatter: ({ value, key, item }: { value: any; key: any; item: any }) => value.toUpperCase(),
    tdAttr: ({ value, key, item }: { value: any; key: any; item: any }) => ({
      class: value === 'active' ? 'text-success' : '',
    }),
  },
]
```

`formatter` Only the callback function value for this field is implemented, adding the name of a method in the component is deprecated.

`sortKey` and `sortDirection` are deprecated, use the table's `sortBy` model as documented [here](/bootstrap-vue-next/docs/components/table.html#sorting) instead.

`filterByFormatted` is implemented, but does not take a format function as an argument.

### BTableLight [​](#btablelight)

See the [v-html](#v-html) section for information on deprecation of the `html` prop.

The slot scope for `table-colgroup` slot now only contains the `fields` prop, with the `columns` prop removed.

### BTableSimple [​](#btablesimple)

Use `table-attrs` to apply additional attributes to the `<table>` element in reponsive mode.

See the [v-html](#v-html) section for information on deprecation of the `caption-html` prop.

#### BTBody [​](#btbody)

**Deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – The `tbody-transition-props` and `tbody-transition-handlers` props. Wrap the table in a custom transition component if needed.

#### BTFoot [​](#btfoot)

`foot-variant` has been replaced with `variant`, which can used on other table elements.

#### BTHead [​](#bthead)

`head-variant` has been replaced with `variant`, which can used on other table elements.

### BTabs [​](#btabs)

`align` prop now takes values from [`AlignmentJustifyContent`](/bootstrap-vue-next/docs/types.html#alignment): `start`, `center`, `end`, `between`, `around`, and `evenly`

The primary `v-model` now reflects the `id` of the currently selected tag. Use `v-model:index` to syncronize to the current tab index. See [programmatically activating and deactivating tabs](/bootstrap-vue-next/docs/components/tabs.html#programmatically-activating-and-deactivating-tabs) for details.

The `changed` event on `BTabs` is deprecated.

`activate-tab` now emits a single payload object (`{newTabId, prevTabId, newTabIndex, prevTabIndex, event}`) instead of positional arguments.

### BTime [​](#btime)

**`BTime` component is deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – This component will not be implemented for v1. See [issue #1860](https://github.com/bootstrap-vue-next/bootstrap-vue-next/issues/1860#event-14531487213) for details.

### BToast [​](#btoast)

#### Global Toast Management System Changes [​](#global-toast-management-system-changes)

**`$bvToast` instance methods are deprecated:**

-   `this.$bvToast.show(options)` → Use `useToast` composable with `create()` method
-   `this.$bvToast.hide(target)` → Use `useToast` composable or template refs with `.hide()`
-   `this.$bvToast.hideAll()` → Use `useToast` composable

**Named toaster system is deprecated:**

-   `<b-toaster>` targets → Use Vue's `Teleport` component or `useToast` positioning
-   Toaster positioning CSS → Use CSS positioning on individual toasts or toast containers

**Alternative approaches:**

Please see [useToast](/bootstrap-vue-next/docs/composables/useToast.html) for the modern method of programmatically creating and managing toasts.

#### Props Changes [​](#props-changes)

**Renamed props:**

-   `visible` → `model-value` - Controls both visibility and auto-dismiss timing (replaces separate `visible` model)
-   `no-auto-hide` → Set `model-value` to `false` or `true` (boolean) instead of using auto-hide duration
-   `auto-hide-delay` → Set `model-value` to number of milliseconds for auto-dismiss duration

**Removed props (not implemented in BootstrapVueNext):**

-   `href` and `to` - Use `useToast` with BLink props or see [BLink Integration](/bootstrap-vue-next/docs/components/toast.html#blink-integration) in the toast documentation
-   `toaster` - Use `Teleport` or `useToast` positioning instead
-   `append-toast` - Available on `useToast` instead
-   `b-toaster-*` related props - Use modern positioning with `Teleport`
-   `static` - BToast renders in place by default (no teleporting behavior)

**New props in BootstrapVueNext:**

-   `progress-props` - Configure built-in progress bar for timed toasts
-   `no-progress` - Hide progress bar on timed toasts
-   `show-on-pause` - Control visibility when countdown is paused
-   `interval` - Control countdown timer update frequency (default: `'requestAnimationFrame'`)
-   `solid` - Disable toast transparency (same as BootstrapVue)

#### Auto-dismiss Behavior Changes [​](#auto-dismiss-behavior-changes)

**BootstrapVue:** Used separate props for auto-hide configuration:

template

```
<BToast
  auto-hide
  auto-hide-delay="5000"
  no-hover-pause
/>
```

**BootstrapVueNext:** Uses `model-value` for both visibility and auto-dismiss:

template

```
<!-- Boolean for show/hide -->
<BToast v-model="show" />

<!-- Number for auto-dismiss duration in milliseconds -->
<BToast
  :model-value="5000"
  no-hover-pause
/>
```

#### Event System Changes [​](#event-system-changes)

**Event naming changes:**

-   No `$root` event system - toasts are managed through composables or direct component references
-   All events now use the standardized show/hide event lifecycle

**New events:** BootstrapVueNext adds several events:

-   `close-countdown` - Emitted during countdown with remaining milliseconds
-   `update:model-value` - Standard v-model event for visibility/duration changes
-   Standard show/hide lifecycle events: `show`, `shown`, `hide`, `hidden`, `show-prevented`, `hide-prevented`, `toggle`, `toggle-prevented`

#### Slots Changes [​](#slots-changes)

**Renamed slots:**

-   `toast-title` → `title` - Toast header title content

**Available slots:**

-   `default` - Toast body content (enhanced with slot scope data)
-   `title` - Toast header title content (was `toast-title` in BootstrapVue)
-   `close` - Custom close button content (new in BootstrapVueNext)

**Enhanced slot scope:** All slots now receive scope data with control functions:

-   `id` - Toast component ID
-   `show()` - Function to show the toast
-   `hide()` - Function to hide the toast
-   `toggle()` - Function to toggle visibility
-   `visible` - Current visibility state
-   `active` - Whether countdown timer is active

#### Accessibility Improvements [​](#accessibility-improvements)

**Enhanced ARIA support:**

-   `isStatus` prop correctly toggles between `role="alert"` (default) and `role="status"`
-   Corresponding `aria-live` values: `"assertive"` (default) and `"polite"`
-   `aria-atomic="true"` automatically applied for better screen reader announcements
-   `tabindex="0"` for keyboard accessibility

See [Show and Hide](#show-and-hide) shared properties.

### BToaster [​](#btoaster)

The `BToaster` component has been deprecated. Its functionality has been replaced by the [`useToast`](/bootstrap-vue-next/docs/composables/useToast.html) composable working in concert with the [`BApp`](/bootstrap-vue-next/docs/components/app.html) component. See the documentation for details.

### BTooltip [​](#btooltip)

See [Show and Hide](#show-and-hide) shared properties.

See the [v-html](#v-html) section for information on deprecation of the `html` prop.

`BTooltip` is noninteractive by default, unlike in BootstrapVue. This provides for a smoother user experience. The `interactive` prop is provided to restore the BootstrapVue behavior.

The `container` prop has been deprecated. Use the `teleportTo` prop instead to specify where the tooltip should be mounted. See [Vue Teleport documentation](https://vuejs.org/guide/built-ins/teleport.html).

`custom-class` has been changed to `body-class` and a `title-class` has been added for completeness - see [custom classes documentation](/bootstrap-vue-next/docs/components/tooltip.html#custom-classes-and-variants) for details.

`fallback-placement` has been deprecated. Use the various options provided by [Floating UI](https://floating-ui.com/) to handle placement.

The ability for the `target` prop to take a function has been deprecated.

Trigger behavior differs because the underlying library used to manage tooltips and popovers has changed. See [our documentation](/bootstrap-vue-next/docs/components/tooltip.html#triggers) and [Floating UI](https://floating-ui.com/) for details.

The `variant` prop has been deprecated. Use Bootstrap’s color and background utility classes to style tooltips instead. See [Tooltip custom classes and variants](/bootstrap-vue-next/docs/components/tooltip.html#custom-classes-and-variants) for details.

The `disabled` prop and [Programmatically Disabling](https://bootstrap-vue.org/docs/components/tooltip#programmatically-disabling-tooltip) have been deprecated along with the `disabled` and `enabled` events. Use `manual=true` to disable BootstrapVueNext’s automatic trigger handling. If your application shows the tooltip programmatically, disable those automatic triggers as well. If you believe full parity with the BootstrapVue feature is useful, please open an issue or propose a pull request.

`delay` now defaults to 0 rather than 50ms

The default for `placement` is now `top` rather than `right`

`$root` events are deprecated. See [usePopover](/bootstrap-vue-next/docs/composables/usePopover.html) as an alternative.

## Directives [​](#directives)

### Hover [​](#hover)

**`v-b-hover` directive is deprecated:** insufficient demand for initial release. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – This directive will not be implemented. Consider using VueUse's [\`useElementHover()\`](https://vueuse.org/core/useElementHover/) composable as a modern alternative.

### Modal [​](#modal)

#### Relationship with v-b-toggle [​](#relationship-with-v-b-toggle)

In BSVN, `v-b-modal` is an alias for `v-b-toggle`:

-   Both directives work identically
-   `v-b-modal` is semantically clearer when working with modals
-   `v-b-toggle` works with modals, collapse, and offcanvas
-   Use whichever makes your code more readable

template

```
<!-- BSV: Only v-b-modal worked with modals -->
<BButton v-b-modal.my-modal>Show Modal</BButton>
```

template

```
<!-- BSVN: Both work identically - choose based on semantics -->
<BButton v-b-modal.my-modal>Show Modal</BButton>
<BButton v-b-toggle.my-modal>Show Modal</BButton>
```

#### New Features in BSVN [​](#new-features-in-bsvn)

**Array value support:**

template

```
<!-- BSVN allows arrays (BSV required space-separated strings) -->
<BButton v-b-modal="['modal-1', 'modal-2']">Show Multiple</BButton>
```

**CSS class tracking:**

BSVN adds `collapsed`/`not-collapsed` classes to trigger elements based on modal state, allowing for conditional styling.

**Migration from BSV `this.$bvModal.show(id)`:**

BSV's `this.$bvModal.show(id)` has been replaced with multiple approaches. See the [BModal directive documentation](/bootstrap-vue-next/docs/directives/BModal.html#comparison-with-other-approaches) for detailed migration examples.

### Popover [​](#popover)

The `v-b-popover` directive syntax has changed to use modifier-based configuration instead of configuration objects.

#### Trigger Configuration [​](#trigger-configuration)

BSV used string-based triggers while BSVN uses modifiers:

template

```
<!-- BootstrapVue -->
<button
  v-b-popover.hover.bottom="'Content'"
  title="Title"
>
  Hover
</button>

<!-- BootstrapVueNext -->
<BButton
  v-b-popover.hover.bottom="'Content'"
  title="Title"
>
  Hover
</BButton>
```

Available trigger modifiers:

-   `.click` - Toggle on click (BSV: `'click'`)
-   `.hover` - Show on hover (BSV: `'hover'`)
-   `.focus` - Show on focus (BSV: `'focus'`)
-   `.manual` - Manual control (BSV: `'manual'`)

Default behavior: If no trigger modifier is specified, BSVN defaults to **both hover and focus** triggers (same as BSV).

#### Placement Configuration [​](#placement-configuration)

BSV used complex placement strings while BSVN uses simple modifiers:

template

```
<!-- BootstrapVue -->
<button v-b-popover.hover.topleft="'Content'">Top Left</button>
<button v-b-popover.hover.bottomright="'Content'">Bottom Right</button>

<!-- BootstrapVueNext -->
<BButton v-b-popover.hover.top="'Content'">Top</BButton>
<BButton v-b-popover.hover.right="'Content'">Right</BButton>
```

BSVN uses four simple placement modifiers:

-   `.top`
-   `.bottom`
-   `.left`
-   `.right`

BSV's fine-grained placements (`topleft`, `topright`, `bottomleft`, `bottomright`, `lefttop`, `leftbottom`, `righttop`, `rightbottom`) are not available as modifiers. Use the component version `<BPopover>` for precise placement control.

#### Value Configuration [​](#value-configuration)

The directive value can be a string or an object:

template

```
<!-- Simple string content (same in both) -->
<BButton v-b-popover="'Popover content'">Button</BButton>
```

template

```
<!-- BootstrapVue -->
<button
  v-b-popover="{
    title: 'Title',
    content: 'Body',
    delay: { show: 500, hide: 100 }
  }"
>
  Button
</button>
```

template

```
<!-- BootstrapVueNext -->
<BButton
  v-b-popover.hover.top="{
    title: 'Title',
    body: 'Body',
    delay: { show: 500, hide: 100 }
  }"
>
  Button
</BButton>
```

Note: BSV used `content` property, BSVN uses `body` property in object configuration.

#### Custom Class Properties [​](#custom-class-properties)

BSV used a `customClass` property, while BSVN provides more granular control:

**BSV:**

template

```
<!-- BSV (BootstrapVue) -->
<BButton v-b-popover="{title: 'Title', content: 'Content', customClass: 'my-custom-class'}">
  Button
</BButton>
```

**BSVN:**

template

```
<!-- BSVN (BootstrapVueNext) -->
<BButton
  v-b-popover="{title: 'Title', body: 'Content', bodyClass: 'my-body-class', titleClass: 'my-title-class'}"
>
  Button
</BButton>
```

BSVN provides separate `bodyClass` and `titleClass` properties for more precise styling control.

#### Special Modifiers [​](#special-modifiers)

BSVN adds new modifiers not available in BSV:

-   `.body` - Append to `<body>` (BSV: no equivalent modifier)
-   `.child` - Append as child element
-   `.inline` - Use inline positioning for multi-line text
-   `.lazy` - Defer rendering until first shown
-   `.realtime` - Update position in real-time
-   `.interactive` - Allow interactive content

#### Title Attribute Handling [​](#title-attribute-handling)

Both versions support using the element's `title` attribute:

template

```
<!-- Same in both -->
<button
  v-b-popover.hover.top="'Content'"
  title="Title"
>
  Button
</button>
```

BSVN automatically removes the `title` attribute and stores it as `data-original-title` to prevent browser tooltips.

#### Migration Examples [​](#migration-examples)

**Basic hover popover:**

template

```
<!-- BootstrapVue -->
<button
  v-b-popover.hover="'Content'"
  title="Title"
>
  Hover
</button>
```

template

```
<!-- BootstrapVueNext -->
<BButton
  v-b-popover.hover="'Content'"
  title="Title"
  >Hover</BButton
>
```

**Click popover with placement:**

template

```
<!-- BootstrapVue -->
<button v-b-popover.click.bottom="'Content'">Click</button>
```

template

```
<!-- BootstrapVueNext -->
<BButton v-b-popover.click.bottom="'Content'">Click</BButton>
```

**Manual control:**

Manual

Title

ContentContent

HTML StackBlitz

vue

```
<template>
  <button
    ref="btn"
    v-b-popover.manual="popoverConfig"
  >
    Manual
  </button>
</template>
<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck -- BSV example demonstrating deprecated $root.$emit pattern
export default {
  data() {
    return {
      popoverConfig: {
        title: 'Title',
        content: 'Content',
      },
    }
  },
  methods: {
    showPopover() {
      this.$root.$emit('bv::show::popover', 'btn')
    },
  },
}
</script>
```

Manual

HTML StackBlitz

vue

```
<template>
  <BButton v-b-popover.manual.show="isShown && popoverConfig">Manual</BButton>
</template>
<script setup lang="ts">
import {ref} from 'vue'

const isShown = ref(false)
const popoverConfig = {
  title: 'Title',
  body: 'Content',
}
</script>
```

**Complex configuration:**

template

```
<!-- BootstrapVue -->
<button
  v-b-popover="{
    title: 'Title',
    content: 'Body',
    placement: 'top',
    trigger: 'hover',
    delay: { show: 500, hide: 100 }
  }"
>
  Button
</button>
```

template

```
<!-- BootstrapVueNext -->
<BButton
  v-b-popover.hover.top="{
    title: 'Title',
    body: 'Body',
    delay: { show: 500, hide: 100 }
  }"
>
  Button
</BButton>
```

#### When to Use Component Instead [​](#when-to-use-component-instead)

For complex scenarios, migrate to the `<BPopover>` component:

-   Fine-grained placement control (`top-start`, `bottom-end`, etc.)
-   Rich HTML content via slots
-   Programmatic control with full API
-   Interactive content (forms, buttons)
-   Custom variants and styling

template

```
<!-- BSV directive -->
<button v-b-popover.hover.topleft="complexContent">Button</button>
```

template

```
<!-- BSVN component (recommended for complex cases) -->
<BButton id="btn">Button</BButton>
<BPopover
  target="btn"
  placement="top-start"
  hover
>
  <template #title>Custom Title</template>
  <div>
    <p>Rich content with <strong>HTML</strong></p>
    <BButton size="sm">Action</BButton>
  </div>
</BPopover>
```

### ScrollSpy [​](#scrollspy)

### Toggle [​](#toggle)

The `v-b-toggle` directive syntax is fully compatible between BSV and BSVN with no changes required for most usage.

**New features:**

-   Array value support: `v-b-toggle="['target-1', 'target-2']"`
-   Works with `<BModal>` (in addition to collapse/offcanvas)

**Component changes:**

-   `<b-sidebar>` → `<BOffcanvas>`

**Recommendations:**

-   When using on links with `href`, add `@click.prevent` to avoid URL changes

See the [BToggle Directive documentation](/bootstrap-vue-next/docs/directives/BToggle.html) for complete details.

### Tooltip [​](#tooltip)

The `v-b-tooltip` directive works similarly between BSV and BSVN, but has some important differences:

#### Basic Usage [​](#basic-usage)

Simple string tooltips work the same:

**BSV:**

html

```
<!-- BSV (BootstrapVue) -->
<BButton v-b-tooltip="'Tooltip text'"> Button </BButton>
```

**BSVN:**

html

```
<!-- BSVN (BootstrapVueNext) -->
<BButton v-b-tooltip="'Tooltip text'"> Button </BButton>
```

#### Trigger Modifiers [​](#trigger-modifiers)

When using modifiers, BSVN recommends providing tooltip content via the directive value, although it will still fall back to the element's `title`/`data-original-title` attributes when no value is given.

**BSV:**

html

```
<!-- BSV (BootstrapVue) -->
<BButton
  v-b-tooltip.hover.bottom
  title="Tooltip text"
>
  Button
</BButton>
```

**BSVN:**

html

```
<!-- BSVN (BootstrapVueNext) -->
<BButton v-b-tooltip.hover.bottom="'Tooltip text'"> Button </BButton>
```

BSVN automatically removes the `title` attribute and stores it as `data-original-title` to prevent browser tooltips.

#### Object Configuration [​](#object-configuration)

The object configuration interface has changed:

**BSV:**

html

```
<!-- BSV (BootstrapVue) -->
<BButton
  v-b-tooltip="{
    title: 'Tooltip text',
    delay: 500,
    placement: 'bottom'
  }"
>
  Button
</BButton>
```

**BSVN:**

html

```
<!-- BSVN (BootstrapVueNext) -->
<BButton
  v-b-tooltip.bottom="{
    title: 'Tooltip text',
    delay: {show: 500, hide: 100}
  }"
>
  Button
</BButton>
```

Key changes:

-   `placement` is now specified via modifier (`.top`, `.bottom`, etc.) instead of in the object
-   `delay` accepts either a scalar number (applies to both show and hide) or an object `{show: number, hide: number}` for independent control
-   Floating UI (instead of Popper.js) is used for positioning

#### Custom Classes (Directive) [​](#custom-classes-directive)

BSV's `customClass` property has been replaced with `bodyClass` and `titleClass` for more granular control:

**BSV:**

html

```
<!-- BSV (BootstrapVue) -->
<BButton v-b-tooltip="{title: 'My tooltip', customClass: 'my-tooltip-class'}">Hover me</BButton>
```

**BSVN:**

html

```
<!-- Use titleClass when rendering title content -->
<button v-b-tooltip="{title: 'My tooltip', titleClass: 'my-title-class'}">Hover me</button>

<!-- Use bodyClass when rendering body content -->
<!-- Note: tooltips render EITHER title OR body, never both -->
<button v-b-tooltip="{body: 'Content', bodyClass: 'my-body-class'}">Hover me</button>
```

Tooltip Rendering Behavior

Unlike popovers which can display both title and body simultaneously, tooltips only display **either** title **or** body content. The `titleClass` and `bodyClass` properties are mutually exclusive - only one will apply at a time depending on which content is rendered.

See the [Tooltip Directive documentation](/bootstrap-vue-next/docs/directives/BTooltip.html) for complete details.

### Visible [​](#visible)

**`v-b-visible` directive is deprecated:** a modern alternative exists. [Learn more about deprecation reasons](/bootstrap-vue-next/docs/migration-guide#deprecation) – This directive will not be implemented. Use VueUse's [\`useElementVisibility()\`](https://vueuse.org/core/useElementVisibility/) composable instead, which provides the same functionality with better performance.
