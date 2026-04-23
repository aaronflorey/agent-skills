# Core Patterns

## Shared Badge Parameters

Many badge pages repeat the same customization fields.

- `style` supports `flat`, `flat-square`, `plastic`, `for-the-badge`, and `social`.
- If `style` is omitted, the default is `flat`.
- A badge can override the left-hand text with a custom label.
- Left and right background colors support hex, rgb, rgba, hsl, hsla, and CSS named colors.
- Badge pages expose an HTTP cache lifetime parameter, but values below the inferred default are ignored.
- Left and right click targets only work when the badge is embedded with an HTML `<object>` tag, not an `<img>` tag or markup language.

## Logo Handling

- Named logos use Simple Icons slugs.
- `logoColor` supports hex, rgb, rgba, hsl, hsla, and CSS named colors for Simple Icons logos.
- Adaptive logo resizing can be enabled with `auto` for wider Simple Icons logos.
- Custom logos can be passed as a base64-encoded URL parameter.
- Shields only consumes Simple Icons; icon additions, removals, and renames follow Simple Icons releases.

## Dynamic Selection Patterns

- Dynamic JSON, TOML, and YAML badges use JSONPath selectors.
- Dynamic XML badges use XPath selectors.
- Dynamic badge pages allow optional prefix and suffix text around the extracted value.

## GitHub Release And Tag Filters

- Some GitHub release and tag badges support `include_prereleases`, `sort`, and `filter` to decide which version counts as latest.
- `sort` supports `date` and `semver` on the extracted GitHub release examples.
- `filter` matches tag or release names using `*` as a wildcard.
- If a filter starts with `!`, the pattern is negated.

## Useful Catalog Notes

- GitHub-backed badges may mention authorizing the Shields.io GitHub application to help increase rate limits.
- Some service badges expose service-specific parameters such as `gitea_url` for non-default Gitea instances.
