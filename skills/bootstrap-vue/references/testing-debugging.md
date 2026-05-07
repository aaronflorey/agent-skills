# Testing And Debugging

The extracted docs include targeted testing guidance, but no dedicated debugging guide.

## Component Testing With Composables

- Components that call `useToast()`, `useModal()`, or `usePopover()` need BootstrapVueNext context in tests.
- The `BApp` page says to install `createBootstrap()` in the test environment so provide/inject dependencies exist.
- The docs explicitly say you do not need to wrap the tested component in `BApp` when using the plugin in tests.

## Per-Test Setup

```ts
import {mount} from '@vue/test-utils'
import {createBootstrap} from 'bootstrap-vue-next'

const wrapper = mount(MyComponent, {
  global: {
    plugins: [createBootstrap()],
  },
})
```

## Global Vitest Setup

```ts
import {config} from '@vue/test-utils'
import {createBootstrap} from 'bootstrap-vue-next'

config.global.plugins = [createBootstrap()]
```

```ts
import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
  },
})
```

## Mocking

- The `BApp` docs also show mocking `useToast` with `vitest` if you want to avoid real toast behavior.

## Accessibility Testing

- The accessibility reference recommends testing before deployment.
- The extracted checklist includes keyboard-only navigation, screen reader testing, and zoom/font-size checks.
- It also links to tools and resources such as WCAG, Accessibility Insights, and Axe.

## Debugging Note

- No standalone debugging page appears in the mirrored docs.
- For setup-related failures around programmatic modals, popovers, or toasts, verify that `BApp` or `createBootstrap()` is in place first.

## Reference Pages

- `documentation/overview/bootstrap-vue-next-docs-components-app.md`
- `documentation/overview/bootstrap-vue-next-docs-reference-accessibility.md`
