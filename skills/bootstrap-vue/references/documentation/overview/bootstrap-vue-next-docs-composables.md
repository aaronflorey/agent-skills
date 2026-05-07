# Composables ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/composables

##### On this page

-   [useBreadcrumb](#/bootstrap-vue-next/docs/composables/useBreadcrumb.html)
    
-   [useColorMode](#/bootstrap-vue-next/docs/composables/useColorMode.html)
    
-   [useModal](#/bootstrap-vue-next/docs/composables/useModal.html)
    
-   [usePopover](#/bootstrap-vue-next/docs/composables/usePopover.html)
    
-   [useScrollspy](#/bootstrap-vue-next/docs/composables/useScrollspy.html)
    
-   [useToast](#/bootstrap-vue-next/docs/composables/useToast.html)
    
-   [useToggle](#/bootstrap-vue-next/docs/composables/useToggle.html)
    

# Composables [​](#composables)

BootstrapVueNext exposes several custom composables that integrate with various components.

[Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/composables.md)

[

### useBreadcrumb

](/bootstrap-vue-next/docs/composables/useBreadcrumb.html)

`useBreadcrumb` is a helper utility for the `BBreadcrumb` component. It provides a **globally** changable context so you can modify a breadcrumb. It should be noted that the breadcrumb component will automatically use the global context by default. `useBreadcrumb` is shared globally, one modification to the state will be recognized throughout the app. As noted in the BBreadcrumb documentation, the items prop for the component takes precedence over `useBreadcrumb`

[

### useColorMode

](/bootstrap-vue-next/docs/composables/useColorMode.html)

`useColorMode` provides a convenient utility to adjust the global color theme of your application. You can also use it to target specific components by using a [template ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) or a selector. Bootstrap's default behavior dictates that color modes are applied to all children in the branch. `useColorMode` is simply a wrapper for the [vueuse](https://vueuse.org/core/useColorMode/#usecolormode) utility.

[

### useModal

](/bootstrap-vue-next/docs/composables/useModal.html)

The `useModal` composable provides a powerful API to create, manage, and control modals programmatically from anywhere in your application. It allows you to create modals on-demand, manage existing modals, and handle modal interactions through promises.

[

### usePopover

](/bootstrap-vue-next/docs/composables/usePopover.html)

The `usePopover` composable allows you to create and control popovers and tooltips dynamically from anywhere in your application. It provides methods to create, show, hide, and manage both popovers and tooltips programmatically.

[

### useScrollspy

](/bootstrap-vue-next/docs/composables/useScrollspy.html)

The `useScrollspy` composable provides automatic navigation highlighting based on scroll position. It tracks the visibility of content elements and automatically updates the active state of corresponding navigation items, making it perfect for table of contents, documentation navigation, and section-based layouts.

[

### useToast

](/bootstrap-vue-next/docs/composables/useToast.html)

The `useToast` composable allows you to create and manage toasts programmatically from anywhere in your application. It provides a simple API to show toast messages without needing to declare toast components in your templates.

[

### useToggle

](/bootstrap-vue-next/docs/composables/useToggle.html)

You can use `useToggle` to get the closest toggleable component in **child component** and show,hide or toggle it. It can also be supplied a target id to show, hide or toggle a specific component
