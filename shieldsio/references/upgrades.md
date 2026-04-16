# Upgrades And Changes

## Dynamic Badge Security Advisory

- Shields published a critical advisory for Dynamic JSON, TOML, and YAML badges.
- Self-hosted instances should upgrade to `server-2024-09-25` or later.
- The mitigation switched JSONPath libraries and disabled evaluated script expressions with `eval: false`.
- This improves security but can break some previously working JSONPath queries.

## Simple Icons Updates

- Shields regularly updates its logo set from Simple Icons.
- The extracted docs include release notes for Simple Icons 10, 11, 12, 13, 14, 15, and 16.
- Those releases can remove or rename icons, so logo slugs may stop working or need updates.

## Custom Logo Changes

- Shields removed custom logos maintained on the Shields side and now relies on Simple Icons for named logos.
- Existing badges using those named logos were transparently switched to the corresponding Simple Icon.
- If a user needs a previous custom logo, the docs point to using a custom base64-encoded logo parameter.

## Other Project Changes In The Extracted Docs

- The docs include a post about the new frontend built around Docusaurus and related plugins.
- The extracted blog also includes a supply-chain notice for `eslint-config-prettier` affecting Windows installs in some developer environments.
