# Upgrades And Migration

Use this guide when moving from BootstrapVue to BootstrapVueNext.

## Migration Stance

- BootstrapVueNext is described as an entirely new implementation based on Vue 3 and Bootstrap 5.
- The migration guide says it should not be treated as a drop-in replacement.
- Compatibility is preserved where possible, but clean Vue 3 and Bootstrap 5 developer experience is a higher priority.

## Baseline Expectations

- Read the Vue 3 migration guide and the Bootstrap 5 migration guide first.
- Utility classes involving `left` and `right` in Bootstrap 4 move to `start` and `end` in Bootstrap 5.
- BootstrapVueNext generally replaces `left` and `right` props and values with `start` and `end`.

## Common Migration Patterns Called Out In The Docs

- `.sync` usage moves to named `v-model` bindings.
- Visibility-related APIs are standardized around `v-model` rather than `visible` for reactive control.
- Several `hide*` and `skip*` style props become `no*` props.
- `BApp` and composables replace older plugin-era patterns for some global UI behavior.

## Examples Mentioned Explicitly In The Guide

- `BFormCheckbox` moves from `:indeterminate.sync` to `v-model:indeterminate`.
- `BCollapse`, `BModal`, and `BToast` are highlighted as components where `v-model` is the primary reactive visibility control.
- The guide points to `useModal` and `useToggle` as replacements for older `$bvModal`-style global modal control.

## Deprecation Pattern

- The guide says features may be deprecated because Bootstrap deprecated them, Vue 3 or Bootstrap 5 made them less relevant, native Bootstrap now covers them, a more modern replacement exists, or demand was too low for the initial release.

## Nuxt Note

- The migration guide includes a Nuxt section and points Nuxt users to both Nuxt migration guidance and BootstrapVueNext router link support.

## Status Note

- The migration guide says it is still a work in progress.

## Reference Pages

- `documentation/overview/bootstrap-vue-next-docs-migration-guide.md`
- `documentation/overview/bootstrap-vue-next-docs.md`
- `documentation/overview/bootstrap-vue-next-docs-reference-router-links.md`
