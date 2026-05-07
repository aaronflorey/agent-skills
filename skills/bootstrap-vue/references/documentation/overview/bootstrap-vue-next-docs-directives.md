# Directives ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/directives

##### On this page

-   [BColorMode](#/bootstrap-vue-next/docs/directives/BColorMode.html)
    
-   [BModal](#/bootstrap-vue-next/docs/directives/BModal.html)
    
-   [BPopover](#/bootstrap-vue-next/docs/directives/BPopover.html)
    
-   [BToggle](#/bootstrap-vue-next/docs/directives/BToggle.html)
    
-   [BTooltip](#/bootstrap-vue-next/docs/directives/BTooltip.html)
    

# Directives [​](#directives)

Vue3 supports using custom directives, here you can find a list of directives from this package.

[Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/directives.md)

Depending on the installation method, directives may be automatically registered globally. However, if they are not automatically imported, you will want to import them manually. Every directive is exposed using the v- prefix. For example, for directive `BToggle`, it is imported under `vBToggle`. When using the composition api, it will function as expected. However, if you are using the options api you will want to manually remove the v- prefix during registry. For more information, visit the [vue docs](https://vuejs.org/guide/reusability/custom-directives.html#introduction).

[

### BColorMode

](/bootstrap-vue-next/docs/directives/BColorMode.html)

The BColorMode directive has a similar result to the useColorMode utility, but provides more low level access than the composable

[

### BModal

](/bootstrap-vue-next/docs/directives/BModal.html)

A light-weight directive for showing modals by ID. It provides a semantically clear way to trigger modals and automatically handles accessibility attributes and trigger registration

[

### BPopover

](/bootstrap-vue-next/docs/directives/BPopover.html)

Add popovers to any element using the v-b-popover directive. Popovers can be triggered by hovering, focusing, or clicking an element

[

### BToggle

](/bootstrap-vue-next/docs/directives/BToggle.html)

A light-weight directive for toggling visibility state for collapses, offcanvas, and modals by ID. It automatically sets the aria-controls attribute and registers the trigger with the target component, which then manages aria-expanded and visual state

[

### BTooltip

](/bootstrap-vue-next/docs/directives/BTooltip.html)

Add tooltips to any element using the v-b-tooltip directive. Tooltips can be triggered by hovering, focusing, or clicking an element
