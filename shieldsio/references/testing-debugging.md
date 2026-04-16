# Testing And Debugging

## Selector Troubleshooting

- Dynamic XML badges use XPath, not JSONPath.
- For XML documents with a default namespace prefix, use `local-name()` in XPath queries, for example `/*[local-name()='myelement']` rather than `/myelement`.
- Dynamic JSON, TOML, and YAML badges use JSONPath selectors.

## Dynamic Badge Compatibility

- Shields published a critical advisory for Dynamic JSON, TOML, and YAML badges.
- Shields switched from `dchester/jsonpath` to `JSONPath-Plus` with `eval: false`.
- Query syntax that depends on evaluated JavaScript expressions is no longer supported.
- One documented example is rewriting `$..keywords[(@.length-1)]` to `$..keywords[-1:]`.
- The docs call out that JSONPath implementations have quirks, so some queries may behave differently after the change.

## Service-Specific Caveats

- WordPress plugin badges rely on an API that is no longer supported by WordPress, so Shields cannot guarantee that those badges will keep working.
- Some badges only support network-accessible services, for example self-hosted Packagist instances noted in the badge catalog.
- Click target parameters only work with HTML `<object>` embeds, not `<img>` embeds.

## When To Use `badges.md`

- Open `badges.md` when debugging a specific badge's required path parameters, supported enum values, or service caveats.
