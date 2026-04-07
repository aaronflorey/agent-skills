# Static Analysis And Integration

## Table of contents

1. PHPStan and Psalm support
2. Purity guidance
3. App and framework integration
4. Upgrade notes for legacy code
5. Positioning notes

## PHPStan and Psalm support

Valinor ships static-analysis integration so tools understand mapped results.

### PHPStan

```yaml
includes:
    - vendor/cuyz/valinor/qa/PHPStan/valinor-phpstan-configuration.php
```

### Psalm

```json
"autoload-dev": {
    "files": [
        "vendor/cuyz/valinor/qa/Psalm/ValinorPsalmPlugin.php"
    ]
}
```

```xml
<plugins>
    <pluginClass class="CuyZ\Valinor\QA\Psalm\ValinorPsalmPlugin"/>
</plugins>
```

This lets analyzers understand arrays of mapped objects, shaped arrays, and
mapped callable arguments more accurately.

## Purity guidance

Treat these callbacks as pure and deterministic:

- converters
- key converters
- constructors
- infer callbacks
- transformers

Valinor also ships global suppression includes for analyzer noise around pure
errors when needed.

## App and framework integration

Guidance:

1. Share mapper and normalizer instances across services whenever possible.
2. Register them as shared container services instead of repeatedly instantiating
   them.
3. Provide cache to both builders.
4. Wire `HttpRequest` plus `argumentsMapper()` into your routing or controller
   resolution layer.
5. Use `warmupCacheFor()` during build or deploy when you know key mapped types.
6. Use `clearCache()` on `MapperBuilder` or `NormalizerBuilder` when needed.

Official integrations worth knowing:

- Symfony: `cuyz/valinor-bundle`
- Mezzio: `mezzio/mezzio-valinor`

## Upgrade notes for legacy code

Important 1.x to 2.x notes that still matter when reading older examples:

- `NormalizerBuilder` is now the main normalizer entrypoint.
- `MapperBuilder::registerTransformer()` and `MapperBuilder::normalizer()` were
  removed; use `NormalizerBuilder` instead.
- `MapperBuilder::enableFlexibleCasting()` was replaced with:
  - `allowScalarValueCasting()`
  - `allowNonSequentialList()`
  - `allowUndefinedValues()`
- `MapperBuilder::alter()` was removed; use `registerConverter()`.
- `MappingError::node()` was removed; use `messages()`, `type()`, and `source()`.
- Some constructors are explicitly internal; do not instantiate internal classes
  directly.

## Positioning notes

Valinor's strengths relative to common alternatives are:

- recursively validated mapping into valid objects
- rich type syntax aligned with PHPStan and Psalm
- detailed error reporting
- optional flexibility settings when a boundary needs them
