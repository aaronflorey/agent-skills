# Tabs ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/tabs.html

##### On this page

-   [Basic usage ​](#basic-usage)
    
-   [Cards integration ​](#cards-integration)
    
-   [Pills variant ​](#pills-variant)
    
-   [Fill and justify ​](#fill-and-justify)
    -   [Fill ​](#fill)
        
    -   [Justified ​](#justified)
        
-   [Alignment ​](#alignment)
    
-   [Bottom placement of tab controls ​](#bottom-placement-of-tab-controls)
    
-   [Vertical tabs ​](#vertical-tabs)
    
-   [Active classes ​](#active-classes)
    
-   [Fade animation ​](#fade-animation)
    
-   [Add tabs without content ​](#add-tabs-without-content)
    
-   [Add custom content to tab title ​](#add-custom-content-to-tab-title)
    
-   [Apply custom classes to the generated nav-tabs or pills ​](#apply-custom-classes-to-the-generated-nav-tabs-or-pills)
    
-   [Lazy loading tab content ​](#lazy-loading-tab-content)
    
-   [Keyboard navigation ​](#keyboard-navigation)
    
-   [Programmatically activating and deactivating tabs ​](#programmatically-activating-and-deactivating-tabs)
    
-   [Preventing a <BTab> from being activated ​](#preventing-a-btab-from-being-activated)
    
-   [Advanced examples ​](#advanced-examples)
    -   [External controls using v-model ​](#external-controls-using-v-model)
        
    -   [External controls using active model ​](#external-controls-using-active-model)
        
    -   [External controls using exposed methods ​](#external-controls-using-exposed-methods)
        
    -   [Dynamic tabs + tabs-end slot ​](#dynamic-tabs-tabs-end-slot)
        
-   [Component Reference](#component-reference)
    -   [<BTabs>](#b-tabs)
        -   [Properties](#)
            
        -   [Events](#)
            
        -   [Slots](#)
            
    -   [<BTab>](#b-tab)
        -   [Properties](#)
            
        -   [Exposed](#)
            

# Tabs [​](#tabs)

Create a widget of tabbable panes of _local content_. The tabs component is built upon navs and cards internally, and provides full keyboard navigation control of the tabs.

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BTabs/BTabs.vue) [Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/components/tabs.md) [Migration Guide](/bootstrap-vue-next/docs/migration-guide#btabs)

For navigation based tabs (i.e. tabs that would change the URL), use the [`<BNav>`](/bootstrap-vue-next/docs/components/nav.html) component instead.

## Basic usage [​](#basic-usage)

-   First
-   Second
-   Disabled

I'm the first tab

I'm the second tab

I'm a disabled tab!

HTML StackBlitz

template

```
<BTabs content-class="mt-3">
  <BTab
    title="First"
    active
    ><p>I'm the first tab</p></BTab
  >
  <BTab title="Second"><p>I'm the second tab</p></BTab>
  <BTab
    title="Disabled"
    disabled
    ><p>I'm a disabled tab!</p></BTab
  >
</BTabs>
```

INFO

You should supply each child `<BTab>` component a unique `key` value if dynamically adding or removing `<BTab>` components (i.e. `v-if` or for loops). The `key` attribute is a special Vue attribute, see the [Vue docs](https://vuejs.org/api/built-in-special-attributes.html#key) for details.

## Cards integration [​](#cards-integration)

Tabs support integrating with Bootstrap cards. Just add the `card` property to `<BTabs>` and place it inside a `<BCard>` component. Note that you should add the`no-body` prop on the `<BCard>` component in order to properly decorate the card header and remove the extra padding introduced by `card-body`.

-   Tab 1
-   Tab 2

Tab contents 1

Tab contents 2

HTML StackBlitz

template

```
<BCard no-body>
  <BTabs card>
    <BTab
      title="Tab 1"
      active
    >
      <BCardText>Tab contents 1</BCardText>
    </BTab>
    <BTab title="Tab 2">
      <BCardText>Tab contents 2</BCardText>
    </BTab>
  </BTabs>
</BCard>
```

When `<BTabs>` is in `card` mode, each `<BTab>` sub-component will automatically have the `card-body` class applied (this class provides the padding around the tab content). To disable the `card-body` class, set the `no-body` prop on the `<BTab>` sub component.

-   Picture 1
-   Picture 2
-   Picture 3
-   Text

![Image 21](https://picsum.photos/600/200/?image=21)

Picture 1 footer

![Image 25](https://picsum.photos/600/200/?image=25)

Picture 2 footer

![Image 26](https://picsum.photos/600/200/?image=26)

Picture 3 footer

#### This tab does not have the `no-body` prop set

Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur mollit voluptate est in duis laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure.

HTML StackBlitz

template

```
<BCard no-body>
  <BTabs card>
    <BTab
      no-body
      title="Picture 1"
    >
      <BCardImg
        bottom
        src="https://picsum.photos/600/200/?image=21"
        alt="Image 21"
      />
      <BCardFooter>Picture 1 footer</BCardFooter>
    </BTab>

    <BTab
      no-body
      title="Picture 2"
    >
      <BCardImg
        bottom
        src="https://picsum.photos/600/200/?image=25"
        alt="Image 25"
      />
      <BCardFooter>Picture 2 footer</BCardFooter>
    </BTab>

    <BTab
      no-body
      title="Picture 3"
    >
      <BCardImg
        bottom
        src="https://picsum.photos/600/200/?image=26"
        alt="Image 26"
      />
      <BCardFooter>Picture 3 footer</BCardFooter>
    </BTab>

    <BTab title="Text">
      <BCardTitle>This tab does not have the <code>no-body</code> prop set</BCardTitle>
      <BCardText>
        Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum
        consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex
        consectetur mollit voluptate est in duis laboris ad sit ipsum anim Lorem. Incididunt
        veniam velit elit elit veniam Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse
        irure.
      </BCardText>
    </BTab>
  </BTabs>
</BCard>
```

TIP

Setting the `no-body` prop on `<BTab>` will have no affect when `<BTabs>` is not in `card` mode (as the `card-body` class is only set when in `card` mode).

Refer to the [Cards documentation](/bootstrap-vue-next/docs/components/card.html) for more details on card components.

## Pills variant [​](#pills-variant)

Tabs use the `tabs` styling by default. Just add `pills` property to `<BTabs>` for the pill style variant.

-   Tab 1
-   Tab 2

Tab contents 1

Tab contents 2

HTML StackBlitz

template

```
<BCard no-body>
  <BTabs
    pills
    card
  >
    <BTab
      title="Tab 1"
      active
      ><BCardText>Tab contents 1</BCardText></BTab
    >
    <BTab title="Tab 2"><BCardText>Tab contents 2</BCardText></BTab>
  </BTabs>
</BCard>
```

## Fill and justify [​](#fill-and-justify)

Force your `<BTabs>` controls to extend the full available width.

### Fill [​](#fill)

To proportionately fill all available space with your tab controls, set the `fill` prop. Notice that all horizontal space is occupied, but not every control has the same width.

-   First
-   Second
-   Very, very long title
-   Disabled

I'm the first tab

I'm the second tab

I'm the tab with the very, very long title

I'm a disabled tab!

HTML StackBlitz

template

```
<BTabs
  content-class="mt-3"
  fill
>
  <BTab
    title="First"
    active
    ><p>I'm the first tab</p></BTab
  >
  <BTab title="Second"><p>I'm the second tab</p></BTab>
  <BTab title="Very, very long title"><p>I'm the tab with the very, very long title</p></BTab>
  <BTab
    title="Disabled"
    disabled
    ><p>I'm a disabled tab!</p></BTab
  >
</BTabs>
```

### Justified [​](#justified)

For equal-width controls, use the `justified` prop instead. All horizontal space will be occupied by the controls, but unlike using `fill` above, every control will be the same width.

-   First
-   Second
-   Very, very long title
-   Disabled

I'm the first tab

I'm the second tab

I'm the tab with the very, very long title

I'm a disabled tab!

HTML StackBlitz

template

```
<BTabs
  content-class="mt-3"
  justified
>
  <BTab
    title="First"
    active
    ><p>I'm the first tab</p></BTab
  >
  <BTab title="Second"><p>I'm the second tab</p></BTab>
  <BTab title="Very, very long title"><p>I'm the tab with the very, very long title</p></BTab>
  <BTab
    title="Disabled"
    disabled
    ><p>I'm a disabled tab!</p></BTab
  >
</BTabs>
```

## Alignment [​](#alignment)

To align your tab controls, use the `align` prop. Available values are `start`, `center`, `end`, `between`, `around`, and `evenly`.

-   First
-   Second
-   Disabled

I'm the first tab

I'm the second tab

I'm a disabled tab!

HTML StackBlitz

template

```
<BTabs
  content-class="mt-3"
  align="center"
>
  <BTab
    title="First"
    active
    ><p>I'm the first tab</p></BTab
  >
  <BTab title="Second"><p>I'm the second tab</p></BTab>
  <BTab
    title="Disabled"
    disabled
    ><p>I'm a disabled tab!</p></BTab
  >
</BTabs>
```

## Bottom placement of tab controls [​](#bottom-placement-of-tab-controls)

Visually move the tab controls to the bottom by setting the prop `end`.

Tab contents 1

Tab contents 2

-   Tab 1
-   Tab 2

HTML StackBlitz

template

```
<BCard no-body>
  <BTabs
    pills
    card
    end
  >
    <BTab
      title="Tab 1"
      active
      ><BCardText>Tab contents 1</BCardText></BTab
    >
    <BTab title="Tab 2"><BCardText>Tab contents 2</BCardText></BTab>
  </BTabs>
</BCard>
```

WARNING

-   Bottom placement visually works best with the `pills` variant. When using the default `tabs` variant, you may want to provide your own custom styling classes, as Bootstrap CSS assumes the tabs will always be placed on the top of the tabs content.
-   To provide a better user experience with bottom placed controls, ensure that the content of each tab pane is the same height and fits completely within the visible viewport, otherwise the user will need to scroll up to read the start of the tabbed content.

## Vertical tabs [​](#vertical-tabs)

Have the tab controls placed on the lefthand side by setting the `vertical` prop to `true`. Vertical tabs work with or without `card` mode enabled.

-   Tab 1
-   Tab 2
-   Tab 3

Tab contents 1

Tab contents 2

Tab contents 3

HTML StackBlitz

template

```
<BCard no-body>
  <BTabs
    pills
    card
    vertical
  >
    <BTab
      title="Tab 1"
      active
      ><BCardText>Tab contents 1</BCardText></BTab
    >
    <BTab title="Tab 2"><BCardText>Tab contents 2</BCardText></BTab>
    <BTab title="Tab 3"><BCardText>Tab contents 3</BCardText></BTab>
  </BTabs>
</BCard>
```

Visually move the tab controls to the right hand side by setting the `end` prop:

Tab contents 1

Tab contents 2

Tab contents 3

-   Tab 1
-   Tab 2
-   Tab 3

HTML StackBlitz

template

```
<BCard no-body>
  <BTabs
    pills
    card
    vertical
    end
  >
    <BTab
      title="Tab 1"
      active
      ><BCardText>Tab contents 1</BCardText></BTab
    >
    <BTab title="Tab 2"><BCardText>Tab contents 2</BCardText></BTab>
    <BTab title="Tab 3"><BCardText>Tab contents 3</BCardText></BTab>
  </BTabs>
</BCard>
```

The width of the vertical tab controls will expand to fit the width of the tab title. To control the width, set a [width utility class](/bootstrap-vue-next/docs/reference/size-props-and-classes.html) via the prop `nav-wrapper-class`. You can use values such as `w-25` (25% width), `w-50` (50% width), etc., or column classes such as `col-2`, `col-3`, etc.

-   Tab 1
-   Tab 2
-   Tab 3

Tab contents 1

Tab contents 2

Tab contents 3

HTML StackBlitz

template

```
<BCard no-body>
  <BTabs
    pills
    card
    vertical
    nav-wrapper-class="w-50"
  >
    <BTab
      title="Tab 1"
      active
      ><BCardText>Tab contents 1</BCardText></BTab
    >
    <BTab title="Tab 2"><BCardText>Tab contents 2</BCardText></BTab>
    <BTab title="Tab 3"><BCardText>Tab contents 3</BCardText></BTab>
  </BTabs>
</BCard>
```

Vertical placement visually works best with the `pills` variant. When using the default `tabs` variant, you may want to provided your own custom styling classes, as Bootstrap v5 CSS assumes the tab controls will always be placed on the top of the tabs content.

INFO

Overflowing text may occur if your width is narrower than the tab title. You may need additional custom styling.

## Active classes [​](#active-classes)

To apply classes to the currently active control or tab use the `active-nav-item-class` and `active-tab-class` props.

-   First
-   Second
-   Disabled

I'm the first tab

I'm the second tab

I'm a disabled tab!

HTML StackBlitz

template

```
<BTabs
  active-nav-item-class="font-weight-bold text-uppercase text-danger"
  active-tab-class="font-weight-bold text-success"
  content-class="mt-3"
>
  <BTab
    title="First"
    active
    ><p>I'm the first tab</p></BTab
  >
  <BTab title="Second"><p>I'm the second tab</p></BTab>
  <BTab
    title="Disabled"
    disabled
    ><p>I'm a disabled tab!</p></BTab
  >
</BTabs>
```

## Fade animation [​](#fade-animation)

Fade is enabled by default when changing tabs. It can disabled with `no-fade` property.

## Add tabs without content [​](#add-tabs-without-content)

If you want to add extra tabs that do not have any content, you can put them in `tabs-start` or `tabs-end` slot(s):

-   [Another tab](#tabs-empty)
-   Plain text

HTML StackBlitz

template

```
<BTabs>
  <!-- Add your b-tab components here -->
  <template #tabs-end>
    <BNavItem
      href="#tabs-empty"
      role="presentation"
      @click="() => {}"
      >Another tab</BNavItem
    >
    <li
      role="presentation"
      class="nav-item align-self-center"
    >
      Plain text
    </li>
  </template>
</BTabs>
```

Use the `tabs-start` slot to place extra tab buttons before the content tab buttons, and use the `tabs-end` slot to place extra tab buttons after the content tab buttons.

INFO

Extra (contentless) tab buttons should be a `<BNavItem>` or have a root element of `<li>` and class `nav-item` for proper rendering and semantic markup.

## Add custom content to tab title [​](#add-custom-content-to-tab-title)

If you want to add custom content to tab title, like HTML code, icons, or another non-interactive Vue component, this possible by using `title` slot of `<BTab>`.

-   I'm _custom_ **title**
-   Tab 2

Tab contents 1

Tab contents 2

HTML StackBlitz

template

```
<BTabs>
  <BTab active>
    <template #title>
      <BSpinner
        type="grow"
        small
      />
      I'm <i>custom</i> <strong>title</strong>
    </template>
    <p class="p-3">Tab contents 1</p>
  </BTab>

  <BTab>
    <template #title>
      <BSpinner
        type="border"
        small
      />
      Tab 2
    </template>
    <p class="p-3">Tab contents 2</p>
  </BTab>
</BTabs>
```

WARNING

**Do not** place interactive elements/components inside the title slot. The tab button is a link which does not support child interactive elements per the HTML5 spec.

## Apply custom classes to the generated nav-tabs or pills [​](#apply-custom-classes-to-the-generated-nav-tabs-or-pills)

The tab selectors are based on Bootstrap v5's `nav` markup ( i.e. `ul.nav > li.nav-item > a.nav-link`). In some situations, you may want to add classes to the `<li>` (nav-item) and/or the `<a>` (nav-link) on a per tab basis. To do so, simply supply the classname to the `title-item-class` prop (for the `<li>` element) or `title-link-class` prop (for the `<a>` element). Value's can be passed as a string or array of strings.

INFO

The `active` class is automatically applied to the active tabs `<a>` element. You may need to accommodate your custom classes for this.

-   Tab 1
-   Tab 2
-   Tab 3

Tab contents 1

Tab contents 2

Tab contents 3

HTML StackBlitz

template

```
<template>
  <BCard no-body>
    <BTabs
      v-model:index="tabIndex"
      card
    >
      <BTab
        title="Tab 1"
        :title-link-class="linkClass[0]"
        >Tab contents 1</BTab
      >
      <BTab
        title="Tab 2"
        :title-link-class="linkClass[1]"
        >Tab contents 2</BTab
      >
      <BTab
        title="Tab 3"
        :title-link-class="linkClass[2]"
        >Tab contents 3</BTab
      >
    </BTabs>
  </BCard>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

const tabIndex = ref(0)

const linkClass = computed(() =>
  Array.from(Array(3).keys()).map((idx) =>
    tabIndex.value === idx ? ['bg-primary', 'text-light'] : ['bg-light', 'text-info']
  )
)
</script>
```

## Lazy loading tab content [​](#lazy-loading-tab-content)

Sometimes it's preferred to load components & data only when activating a tab, instead of loading all tabs (and associated data) when rendering the `<BTabs>` set.

Individual `<BTab>` components can be lazy loaded via the `lazy` prop, which when set doesn't mount the content of the `<BTab>` until it is activated (shown):

-   Regular tab
-   Lazy tab

I'm always mounted

HTML StackBlitz

template

```
<BTabs content-class="mt-3">
  <!-- This tabs content will always be mounted -->
  <BTab title="Regular tab"><BAlert show>I'm always mounted</BAlert></BTab>

  <!-- This tabs content will not be mounted until the tab is shown -->
  <BTab
    title="Lazy tab"
    lazy
    ><BAlert show>I'm lazy mounted!</BAlert></BTab
  >
</BTabs>
```

By default, once the tab is activated, the content will remain mounted. To un-mounted the content when the tab is deactivated (hidden) use the `unmount-lazy` prop.

-   Regular tab
-   Lazy tab

I'm always mounted

HTML StackBlitz

template

```
<BTabs content-class="mt-3">
  <!-- This tabs content will always be mounted -->
  <BTab title="Regular tab"><BAlert show>I'm always mounted</BAlert></BTab>

  <!-- This tabs content will not be mounted until the tab is shown -->
  <!-- and will be un-mounted when hidden -->
  <BTab
    title="Lazy tab"
    lazy
    unmount-lazy
    ><BAlert show>I'm lazy mounted and will unmount when deactivated!</BAlert></BTab
  >
</BTabs>
```

One can also make all tab's lazy by setting the `lazy` prop on the parent `<BTabs>` component:

-   Tab 1
-   Tab 2

I'm lazy mounted!

HTML StackBlitz

template

```
<BTabs
  content-class="mt-3"
  lazy
>
  <BTab title="Tab 1"><BAlert show>I'm lazy mounted!</BAlert></BTab>
  <BTab title="Tab 2"><BAlert show>I'm lazy mounted too!</BAlert></BTab>
</BTabs>
```

## Keyboard navigation [​](#keyboard-navigation)

Keyboard navigation is enabled by default for ARIA compliance with tablists when a tab button has focus.

| Keypress | Action |
| --- | --- |
| Left or Up | Activate the previous non-disabled tab |
| Right or Down | Activate the next non-disabled tab |
| Shift+Left or Shift+Up | Activate the first non-disabled tab |
| Home | Activate the first non-disabled tab |
| Shift+Right or Shift+Down | Activate the last non-disabled tab |
| End | Activate the last non-disabled tab |
| Tab | Move focus to the active tab content |
| Shift+Tab | Move focus to the previous control on the page |

Disable keyboard navigation by setting the prop `no-key-nav`. Behavior will now default to regular browser navigation with TAB key.

| Keypress | Action |
| --- | --- |
| Tab | Move to the next tab button or control on the page |
| Shift+Tab | Move to the previous tab button or control on the page |
| Enter or Space | Activate current focused button's tab |

## Programmatically activating and deactivating tabs [​](#programmatically-activating-and-deactivating-tabs)

Use the `<BTabs>` `v-model` to control which tab is active by setting the `v-model` to the index (zero-based) of the tab to be shown (see example below).

Alternatively, you can use the boolean model named `active` on each `<BTab>` to activate the tab, or to detect if a particular tab is active.

Each `<BTab>`instance also exposes to activate or deactivate the tab. The methods are`.activate()`and`.deactivate()`, respectively. If activation or deactivation fails (i.e. a tab is disabled or no tab is available to move activation to), then the currently active tab will remain active and the method will return `false`. You will need a reference to the `<BTab>` in order to use these methods.

## Preventing a `<BTab>` from being activated [​](#preventing-a-btab-from-being-activated)

To prevent a tab from activating, simply set the `disabled` prop on the `<BTab>` component.

Alternatively, you can listen for the `activate-tab` event, which provides an option to prevent the tab from activating. The `activate-tab` event now emits a single payload object with the following properties:

-   `newTabId`: The id of the tab that is going to be activated
-   `prevTabId`: The id of the currently active tab
-   `newTabIndex`: The index of the tab that is going to be activated
-   `prevTabIndex`: The index of the currently active tab
-   `event`: The `BvEvent` object. Call `bvEvent.preventDefault()` to prevent `newTabIndex` from being activated

For accessibility reasons, when using the `activate-tab` event to prevent a tab from activating, you should provide some means of notification to the user as to why the tab is not able to be activated. It is recommended to use the `disabled` attribute on the `<BTab>` component instead of using the `activate-tab` event (as `disabled` is more intuitive for screen reader users).

## Advanced examples [​](#advanced-examples)

### External controls using `v-model` [​](#external-controls-using-v-model)

-   General
-   Edit profile
-   Premium Plan
-   Info

I'm the first fading tab

I'm the second tab

I'm the card in tab

Sibzamini!

I'm the last tab

PreviousNext

Current Tab: index = 0, id = tab-general

HTML StackBlitz

vue

```
<template>
  <div>
    <!-- Tabs with card integration -->
    <BCard no-body>
      <BTabs
        v-model:index="tabIndex"
        v-model="tabId"
        small
        card
      >
        <BTab
          id="tab-general"
          title="General"
          >I'm the first fading tab</BTab
        >
        <BTab
          id="tab-edit-profile"
          title="Edit profile"
        >
          I'm the second tab
          <BCard>I'm the card in tab</BCard>
        </BTab>
        <BTab
          id="tab-premium"
          title="Premium Plan"
          disabled
          >Sibzamini!</BTab
        >
        <BTab
          id="tab-info"
          title="Info"
          >I'm the last tab</BTab
        >
      </BTabs>
    </BCard>

    <!-- Control buttons-->
    <div class="text-center">
      <BButtonGroup class="mt-2">
        <BButton @click="tabIndex--">Previous</BButton>
        <BButton @click="tabIndex++">Next</BButton>
      </BButtonGroup>

      <div class="text-muted mt-2">Current Tab: index = {{ tabIndex }}, id = {{ tabId }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const tabIndex = ref(0)
const tabId = ref<string | undefined>(undefined)
</script>
```

### External controls using `active` model [​](#external-controls-using-active-model)

-   General
-   Edit profile
-   Premium Plan
-   Info

I'm the first fading tab

I'm the second tab

I'm the card in tab

Sibzamini!

I'm the last tab

GeneralEdit ProfilePremiumInfo

Current Tab: index = 0, id = tab-general

HTML StackBlitz

vue

```
<template>
  <div>
    <!-- Tabs with card integration -->
    <BCard no-body>
      <BTabs
        v-model:index="tabIndex"
        v-model="tabId"
        small
        card
      >
        <BTab
          id="tab-general"
          v-model:active="general"
          title="General"
          >I'm the first fading tab</BTab
        >
        <BTab
          id="tab-edit-profile"
          v-model:active="editProfile"
          title="Edit profile"
        >
          I'm the second tab
          <BCard>I'm the card in tab</BCard>
        </BTab>
        <BTab
          id="tab-premium"
          v-model:active="premium"
          title="Premium Plan"
          disabled
          >Sibzamini!</BTab
        >
        <BTab
          id="tab-info"
          v-model:active="info"
          title="Info"
          >I'm the last tab</BTab
        >
      </BTabs>
    </BCard>

    <!-- Control buttons-->
    <div class="text-center">
      <BButtonGroup class="mt-2">
        <BButton @click="general = true">General</BButton>
        <BButton @click="editProfile = true">Edit Profile</BButton>
        <BButton @click="premium = true">Premium</BButton>
        <BButton @click="info = true">Info</BButton>
      </BButtonGroup>

      <div class="text-muted mt-2">Current Tab: index = {{ tabIndex }}, id = {{ tabId }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const tabIndex = ref(0)
const tabId = ref(undefined)

const general = ref(true)
const editProfile = ref(false)
const premium = ref(false)
const info = ref(false)
</script>
```

### External controls using exposed methods [​](#external-controls-using-exposed-methods)

You can control individual tabs programmatically using template ref methods. See the [Component Reference Exposed section](#comp-reference-btab-exposed) for details.

-   General
-   Edit profile
-   Premium Plan
-   Info

I'm the first fading tab

I'm the second tab

I'm the card in tab

Sibzamini!

I'm the last tab

GeneralEdit ProfilePremiumInfo

Current Tab: index = 0, id = tab-general

HTML StackBlitz

vue

```
<template>
  <div>
    <!-- Tabs with card integration -->
    <BCard no-body>
      <BTabs
        v-model:index="tabIndex"
        v-model="tabId"
        small
        card
      >
        <BTab
          id="tab-general"
          ref="tabGeneral"
          title="General"
          >I'm the first fading tab</BTab
        >
        <BTab
          id="tab-edit-profile"
          ref="tabEditProfile"
          title="Edit profile"
        >
          I'm the second tab
          <BCard>I'm the card in tab</BCard>
        </BTab>
        <BTab
          id="tab-premium"
          ref="tabPremium"
          title="Premium Plan"
          disabled
          >Sibzamini!</BTab
        >
        <BTab
          id="tab-info"
          ref="tabInfo"
          title="Info"
          >I'm the last tab</BTab
        >
      </BTabs>
    </BCard>

    <!-- Control buttons-->
    <div class="text-center">
      <BButtonGroup
        id="tab-controls"
        class="mt-2"
      >
        <BButton @click="tabGeneral?.activate()">General</BButton>
        <BButton @click="tabEditProfile?.activate()">Edit Profile</BButton>
        <BButton @click="tabPremium?.activate()">Premium</BButton>
        <BButton @click="tabInfo?.activate()">Info</BButton>
      </BButtonGroup>

      <div class="text-muted mt-2">Current Tab: index = {{ tabIndex }}, id = {{ tabId }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, useTemplateRef} from 'vue'
// Import BTab explicitly path to get the correct type for exposed methods
//  and use the full path to improve tree shaking
import {BTab} from 'bootstrap-vue-next/components/BTabs'

const tabIndex = ref(0)
const tabId = ref(undefined)

const tabGeneral = useTemplateRef('tabGeneral')
const tabEditProfile = useTemplateRef('tabEditProfile')
const tabPremium = useTemplateRef('tabPremium')
const tabInfo = useTemplateRef('tabInfo')
</script>
```

### Dynamic tabs + tabs-end slot [​](#dynamic-tabs-tabs-end-slot)

-   **+**

There are no open tabs  
Open a new tab using the **+** button above.

HTML StackBlitz

vue

```
<template>
  <div>
    <BCard no-body>
      <BTabs card>
        <!-- Render Tabs, supply a unique `key` to each tab -->
        <BTab
          v-for="i in tabs"
          :key="'dyn-tab-' + i"
          :title="'Tab ' + i"
        >
          <template #title>
            {{ 'Tab ' + i }}
            <BButton
              style="margin-right: -1rem"
              variant="link"
              class="link-secondary link-underline link-underline-opacity-0"
              size="sm"
              @click.prevent="closeTab(i)"
              >&times;</BButton
            >
          </template>
          Tab contents {{ i }}
        </BTab>

        <!-- New Tab Button (Using tabs-end slot) -->
        <template #tabs-end>
          <li class="nav-item ms-auto mt-0 mb-2">
            <BButton
              variant="outline-secondary"
              class="no-underline"
              role="presentation"
              @click.prevent="newTab"
              ><b>+</b></BButton
            >
          </li>
        </template>

        <!-- Render this if no tabs -->
        <template #empty>
          <div class="text-center text-muted">
            There are no open tabs<br />
            Open a new tab using the <b>+</b> button above.
          </div>
        </template>
      </BTabs>
    </BCard>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const tabCounter = ref(0)
const tabs = ref<number[]>([])

const newTab = () => {
  tabs.value.push(tabCounter.value++)
}

const closeTab = (i: number) => {
  tabs.value = tabs.value.filter((tab) => tab !== i)
}
</script>
```

## Component Reference

### `<BTabs>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BTabs/BTabs.vue)

-   [<BTabs> Properties](#comp-reference-btabs-properties)
-   [<BTabs> Events](#comp-reference-btabs-events)
-   [<BTabs> Slots](#comp-reference-btabs-slots)

[Adding styles](../configurations/customizing-styles#adding-styles): `.tabs`

##### [Properties](#comp-reference-btabs-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| active-nav-item-class | `ClassValue` | `undefined` | Sets the CSS class(es) for the active nav item tab control. |
| active-nav-link-class | `ClassValue` | `undefined` | Sets the CSS class(es) for the active nav link element. |
| active-tab-class | `ClassValue` | `undefined` | Sets the CSS class(es) for the active tab. |
| align | `AlignmentJustifyContent` | `undefined` | Aligns the nav items: 'start', 'end', 'center', 'between', 'around', or 'evenly'. |
| card | `boolean` | `false` | Applies styles for tabs placed within a \`BCard\` component. |
| content-class | `ClassValue` | `undefined` | Sets the CSS class(es) for the tab-content wrapper. |
| end | `boolean` | `false` | Positions tab controls at the bottom (horizontal tabs) or right (vertical tabs). |
| fill | `boolean` | `false` | Proportionately fills horizontal space with nav items, with varying widths. |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| inactive-nav-item-class | `ClassValue` | `undefined` | Sets the CSS class(es) for inactive nav item tab controls. |
| inactive-nav-link-class | `ClassValue` | `undefined` | Sets the CSS class(es) for inactive nav link elements. |
| inactive-tab-class | `ClassValue` | `undefined` | Sets the CSS class(es) for inactive tabs. |
| index | `number` | `-1` | Sets the zero-based index of the active tab. The \`modelValue\` (tab ID) takes priority over \`index\`. |
| justified | `boolean` | `false` | Fills horizontal space with nav items, each having equal width. |
| lazy | `boolean` | `false` | Lazily renders tab contents when shown. |
| model-value | `string` | `undefined` | Sets the ID of the active tab. |
| nav-class | `ClassValue` | `undefined` | Sets the CSS class(es) for the tablist (nav) wrapper. |
| nav-item-class | `ClassValue` | `undefined` | Sets the CSS class(es) for the tab item element. |
| nav-wrapper-class | `ClassValue` | `undefined` | Sets the CSS class(es) for the tab controls wrapper element. |
| no-fade | `boolean` | `false` | Disables the fade animation for tab transitions. |
| no-key-nav | `boolean` | `false` | Disables keyboard navigation for the tab controls. |
| no-nav-style | `boolean` | `false` | Disables tab styling for the tab controls. |
| pills | `boolean` | `false` | Renders nav items as pill buttons. |
| small | `boolean` | `false` | Renders the nav with a smaller size. |
| tab-class | `ClassValue` | `undefined` | Sets the CSS class(es) for the tab element. |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |
| underline | `boolean` | `false` | Renders the active nav item with an underline. |
| vertical | `boolean` | `false` | Renders the tab controls vertically. |

##### [Events](#comp-reference-btabs-events)

| Event | Args | Description |
| --- | --- | --- |
| activate-tab | 
`value``: {newTabId: string; prevTabId: string; newTabIndex: number; prevTabIndex: number; event: BvEvent}` - Object payload with the activating tab id/index, previous tab id/index, and the cancelable BvEvent.

 | Emitted before a tab is shown or activated. Cancelable. |
| update:index | 

`value``: number` - The zero-based index of the currently active tab.

 | Emitted when the active tab changes, providing the zero-based index of the active tab. |
| update:model-value | 

`value``: string` - The ID of the currently active tab.

 | Emitted when the active tab changes, providing the ID of the active tab. |

##### [Slots](#comp-reference-btabs-slots)

| Name | Scope | Description |
| --- | --- | --- |
| default |  | Content (tabs) for the tabs element. |
| empty |  | Content to render when no tabs are present. |
| tabs-end |  | Additional tab buttons without content, placed after content tab buttons. |
| tabs-start |  | Additional tab buttons without content, placed before content tab buttons. |

### `<BTab>`

[View Source](https://github.com/bootstrap-vue-next/bootstrap-vue-next/tree/main/packages/bootstrap-vue-next/src/components/BTabs/BTab.vue)

-   [<BTab> Properties](#comp-reference-btab-properties)
-   [<BTab> Exposed](#comp-reference-btab-exposed)

[Adding styles](../configurations/customizing-styles#adding-styles): `.tab‑pane`

##### [Properties](#comp-reference-btab-properties)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| active | `boolean` | `false` | When set to \`true\`, places the component in the active state with active styling |
| button-id | `string` | `undefined` | Use a specific ID for this tab's tab control button. If not provided, one will automatically be generated |
| disabled | `boolean` | `false` | When set to \`true\`, disables the component's functionality and places it in a disabled state |
| id | `string` | `undefined` | Used to set the \`id\` attribute on the rendered content, and used as the base to generate any additional element IDs as needed |
| lazy | `boolean` | `false` | When set, the content will not be mounted until opened |
| no-body | `boolean` | `false` | When the parent b-tabs has the 'card' prop set, do not render a card-body wrapper |
| tag | `string` | `'div'` | Specify the HTML tag to render instead of the default tag |
| title | `string` | `undefined` | Text content to place in the title |
| title-item-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the tab's control button 'li' element |
| title-link-attrs | `AttrsValue` | `undefined` | Attributes to apply to the tab's control button inner link element |
| title-link-class | `ClassValue` | `undefined` | CSS class (or classes) to apply to the tab's control button inner link element |
| unmount-lazy | `boolean` | `false` | When set and \`lazy\` is true, the content will be unmounted when closed |

##### [Exposed](#comp-reference-btab-exposed)

| Name | Type | Description |
| --- | --- | --- |
| activate | `() => void` | Activates the tab |
| deactivate | `() => void` | Deactivates the tab |
