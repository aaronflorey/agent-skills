# Router Links ​

Source: https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/reference/router-links.html

##### On this page

-   [Common router link props ​](#common-router-link-props)
    -   [to ​](#to)
        
    -   [replace ​](#replace)
        
    -   [router-tag ​](#router-tag)
        
    -   [active-class ​](#active-class)
        
    -   [exact ​](#exact)
        
    -   [exact-active-class ​](#exact-active-class)
        
    -   [exact-path ​](#exact-path)
        
    -   [exact-path-active-class ​](#exact-path-active-class)
        
-   [Nuxt.js-specific router link props ​](#nuxt-js-specific-router-link-props)
    -   [prefetch ​](#prefetch)
        
    -   [no-prefetch ​](#no-prefetch)
        

# Router Links [​](#router-links)

Several BootstrapVue components support rendering RouterLink components compatible with Vue Router and Nuxt.js. For more information, see the official Vue Router docs and official Nuxt.js docs.

[Edit this page on GitHub](https://github.com/bootstrap-vue-next/bootstrap-vue-next/edit/main/apps/docs/src/docs/reference/router-links.md)

## Common router link props [​](#common-router-link-props)

In the following sections, we are using the `BLink` component to render router links. `BLink` is the building block of most of BootstrapVue's actionable components. You could use any other component that supports link generation such as `BLink`, `BButton`, `BAvatar`, `BBreadcrumbItem`, `BListGroupItem`, `BNavItem`, `BDropdownItem`, and `BPaginationNav`. Note that not all props are available on all components. Refer to the respective component documentation for details.

### `to` [​](#to)

-   type: `string | Location`
-   required to generate a `RouterLink`

Denotes the target route of the link. When clicked, the value of the `to` prop will be passed to `router.push()` internally, so the value can be either a string or a location descriptor object.

vue

```
<!-- Literal string -->
<BLink to="home">Home</BLink>

<!-- Renders to -->
<a href="home">Home</a>

<!-- JavaScript expression using `v-bind` -->
<BLink v-bind:to="'home'">Home</BLink>

<!-- Omitting `v-bind` is fine, just as binding any other prop -->
<BLink :to="'home'">Home</BLink>

<!-- Same as above -->
<BLink :to="{path: 'home'}">Home</BLink>

<!-- Named route -->
<BLink :to="{name: 'user', params: {userId: 123}}">User</BLink>

<!-- With query, resulting in `/register?plan=private` -->
<BLink :to="{path: 'register', query: {plan: 'private'}}">Register</BLink>

<!-- Render a non-router link by omitting `to` and specifying an `href` -->
<BLink href="/home">Home</BLink>
```

### `replace` [​](#replace)

-   type: `boolean`
-   default: `false`

Setting replace prop will call `router.replace()` instead of `router.push()` when clicked, so the navigation will not leave a history record.

vue

```
<BLink :to="{path: '/abc'}" replace />
```

### `router-tag` [​](#router-tag)

-   type: `string`
-   default: 'a'

Sometimes we want `RouterLink` to render as another tag, e.g `<li>`. Then we can use `router-tag` prop to specify which tag to render to, and it will still listen to click events for navigation. `router-tag` translates to the `tag` prop on the final rendered `RouterLink`.

vue

```
<BLink to="/foo" router-tag="li">foo</BLink>

<!-- Renders as -->
<li>foo</li>
```

Note: Changing the tag from anything other than `<a>` is discouraged, as it hinders accessibility of keyboard and/or screen-reader users, and is also not very SEO friendly.

### `active-class` [​](#active-class)

-   type: `string`
-   default: `router-link-active` (`nuxt-link-active` when using Nuxt.js)

Configure the active CSS class applied when the link is active. Note the default value can also be configured globally via the `linkActiveClass` [router constructor option](https://router.vuejs.org/api/#linkactiveclass).

With components that support router links (have a `to` prop), you will want to set this to the class `active` (or a space separated string that includes 'active') to apply Bootstrap's `active` styling on the component when the current route matches the `to` prop.

### `exact` [​](#exact)

-   type: `boolean`
-   default: `false`

The default active class matching behavior is inclusive match. For example, `<BLink to="/a">` will get this class applied as long as the current path starts with `/a/` or is `/a`.

One consequence of this is that `<BLink to="/">` will be active for every route! To force the link into "exact match mode", use the `exact` prop:

vue

```
<!-- This link will only be active at `/` -->
<BLink to="/" exact />
```

### `exact-active-class` [​](#exact-active-class)

-   type: `string`
-   default: `router-link-exact-active` (`nuxt-link-exact-active` when using Nuxt.js)
-   availability: Vue Router 2.5.0+

Configure the active CSS class applied when the link is active with exact match. Note the default value can also be configured globally via the `linkExactActiveClass` [router constructor option](https://router.vuejs.org/api/#linkexactactiveclass).

With components that support router links (have a `to` prop), you will want to set this to the class `active` (or a space separated string that includes `active`) to apply Bootstrap's active styling on the component when the current route matches the `to` prop.

### `exact-path` [​](#exact-path)

-   type: `boolean`
-   default: `false`
-   availability: Vue Router 3.5.0+

Allows matching only using the `path` section of the url, effectively ignoring the `query` and the `hash` sections.

vue

```
<!-- this link will also be active at `/search?page=2` or `/search#filters` -->
<RouterLink to="/search" exact-path> </RouterLink>
```

### `exact-path-active-class` [​](#exact-path-active-class)

-   type: `string`
-   default: `router-link-exact-path-active`
-   availability: Vue Router 2.5.0+

Configure the active CSS class applied when the link is active with exact path match. Note the default value can also be configured globally via the `linkExactActiveClass` [router constructor option](https://router.vuejs.org/api/#linkexactactiveclass).

With components that support router links (have a `to` prop), you will want to set this to the class `active` (or a space separated string that includes `active`) to apply Bootstrap's active styling on the component when the current route matches the `to` prop.

## Nuxt.js-specific router link props [​](#nuxt-js-specific-router-link-props)

When BootstrapVueNext detects that your app is running under [Nuxt.js](https://nuxt.com), it will render a [`NuxtLink`](https://nuxt.com/docs/api/components/nuxt-link#nuxtlink) sub component instead of a `RouterLink`. `NuxtLink` supports all of the above router link props, plus the following additional Nuxt.js specific props.

### `prefetch` [​](#prefetch)

-   type: `boolean`
-   default: `null`
-   availability: Nuxt.js 3+

To improve the responsiveness of your Nuxt.js applications, when the link will be displayed within the viewport, Nuxt.js will automatically prefetch the code splitted page. Setting `prefetch` to `true` or `false` will overwrite the default value of `router.prefetchLinks` configured in the `nuxt.config.js` configuration file.

### `no-prefetch` [​](#no-prefetch)

-   type: `boolean`
-   default: `true`
-   availability: Nuxt.js 3+

To improve the responsiveness of your Nuxt.js applications, when the link will be displayed within the viewport, Nuxt.js will automatically prefetch the code splitted page. Setting `no-prefetch` will disabled this feature for the specific link.

vue

```
router: { prefetchLinks: false }
```
