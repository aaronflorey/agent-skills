# Normalization

Use this file when turning objects into arrays or JSON.

## Choose the format

| Format | Use |
|---|---|
| `Format::array()` | Another serializer, transport layer, or template will consume the result |
| `Format::json()` | Valinor should produce the final JSON string |

```php
$arrayNormalizer = (new NormalizerBuilder())->normalizer(Format::array());
$jsonNormalizer = (new NormalizerBuilder())->normalizer(Format::json());
```

## Default behavior

Valinor already:

- recursively normalizes nested objects and arrays
- includes object properties regardless of visibility
- formats `DateTimeInterface` as RFC 3339
- serializes backed enums by value and unit enums by name

```php
$payload = (new NormalizerBuilder())
    ->normalizer(Format::array())
    ->normalize($order);
```

## JSON-specific behavior

`Format::json()` returns a JSON string and can stream to a resource.

```php
$json = (new NormalizerBuilder())
    ->normalizer(Format::json())
    ->normalize($order);

(new NormalizerBuilder())
    ->normalizer(Format::json())
    ->streamTo($file)
    ->normalize($orders);
```

Useful flags via `withOptions()`:

- `JSON_PRETTY_PRINT`
- `JSON_PRESERVE_ZERO_FRACTION`
- `JSON_UNESCAPED_SLASHES`
- `JSON_UNESCAPED_UNICODE`

`JSON_THROW_ON_ERROR` is always enforced.

## Transformers

Use transformers when output should differ from the default normalized form.

```php
$normalizer = (new NormalizerBuilder())
    ->registerTransformer(static fn (DateTimeInterface $date) => $date->format('Y-m-d'))
    ->normalizer(Format::array());
```

Rules:

- first parameter decides when the transformer runs
- optional `callable $next` enables chaining
- `priority` controls ordering
- attribute transformers use `#[AsTransformer]`
- implement `normalizeKey()` for property renaming

## Reusable config

Prefer `configureWith()` for shared normalization policy.

```php
$normalizer = (new NormalizerBuilder())
    ->configureWith(new ConvertDateTime(DATE_ATOM))
    ->normalizer(Format::array());
```

Use cache in production the same way you do for mapping.

## Common output transforms

| Need | Pattern |
|---|---|
| snake_case keys | object-level transformer that rewrites keys after `$next()` |
| ignore or redact a property | attribute transformer marks the value; a later transformer removes or replaces it |
| rename one property | property transformer with `normalizeKey()` |
| flatten single-property value object | transformer replaces one-key arrays with the contained value |
| custom object normalization | transformer calls a stable `normalize()` method if present |
| versioned API output | transformer closes over the API version and lets version-aware objects choose output |

## Caveats

- Circular object graphs can fail during normalization.
- Prefer transformers when output policy changes; do not mutate domain objects
  just to satisfy serialization.
- Prefer `Format::array()` plus another serializer only when the app already has
  a strong serializer policy.
