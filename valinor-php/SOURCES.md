# Notes

This skill is intentionally self-contained.

The bundled references and examples were synthesized from Valinor's public
documentation and public API so the skill can travel without any dependency on a
local checkout or external docs site.

Key authoring decisions:

- Prefer the modern public entrypoints such as `MapperBuilder`,
  `NormalizerBuilder`, `Mapper\Source\Source`, `Normalizer\Format`, and
  `HttpRequest`.
- Keep `SKILL.md` small and move domain depth into focused reference and example
  files.
- Emphasize strict-by-default behavior, pure callbacks, rich type signatures,
  shared configurators, and boundary-level error handling.
- Include HTTP mapping, error-message formatting, source shaping, static
  analysis, integration guidance, and upgrade notes so the skill does not need
  live lookups.
