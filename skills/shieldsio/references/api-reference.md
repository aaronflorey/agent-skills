# API Reference

## Dynamic JSON Badge

Source: `https://shields.io/badges/dynamic-json-badge`

- Extracts an arbitrary value from a JSON document using a JSONPath selector.
- Inputs:
- `url`: URL to the JSON document
- `query`: JSONPath expression used to query the document
- optional prefix text
- optional suffix text

## Dynamic TOML Badge

Source: `https://shields.io/badges/dynamic-toml-badge`

- Extracts an arbitrary value from a TOML document using a JSONPath selector.
- Inputs:
- `url`: URL to the TOML document
- `query`: JSONPath expression used to query the document
- optional prefix text
- optional suffix text

## Dynamic XML Badge

Source: `https://shields.io/badges/dynamic-xml-badge`

- Extracts an arbitrary value from an XML document using an XPath selector.
- Inputs:
- `url`: URL to the XML document
- `query`: XPath expression used to query the document
- optional prefix text
- optional suffix text

## Dynamic YAML Badge

Source: `https://shields.io/badges/dynamic-yaml-badge`

- Extracts an arbitrary value from a YAML document using a JSONPath selector.
- Inputs:
- `url`: URL to the YAML document
- `query`: JSONPath expression used to query the document
- optional prefix text
- optional suffix text

## Static Badges

Source: `https://shields.io/docs/static-badges`

- Shields.io can generate badges that display static text and/or logos.
- Use this when you need a badge without pulling data from an external service.

## Full Catalog

- `badges.md` is the exhaustive extracted catalog for service-specific badge pages.
- Open that file when you need a particular badge's path parameters, examples, or service notes.
