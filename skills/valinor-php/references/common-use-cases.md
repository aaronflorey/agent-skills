# Common Use Cases

Use this file to choose the right Valinor pattern fast.

| Situation | Prefer | Notes |
|---|---|---|
| API or webhook JSON into reusable domain data | DTO class + `Source::json()` | Best when the structure is reused or carries invariants |
| Small local filter/config payload | direct shaped-array signature | Best when a DTO would be overkill |
| Snake case payload into camelCase PHP | key configurator | Use `ConvertKeysToCamelCase`; use a key converter for custom remaps |
| Framework-agnostic callable invocation | `argumentsMapper()` | Good for handlers, controllers, middleware |
| Route/query/body mapping | `HttpRequest` + request attributes | Use `FromRoute`, `FromQuery`, `FromBody` when collisions matter |
| Interface or abstract type depends on source | `infer()` | Return the concrete class name |
| Value object or named constructor | `Object\Constructor` or `registerConstructor()` | Keeps invariants in the domain object |
| Output for API/export | `NormalizerBuilder` + `Format::array()` or `Format::json()` | Add transformers only when output policy differs from the domain |

## Canonical snippets

### DTO from JSON

```php
$thread = (new MapperBuilder())
    ->mapper()
    ->map(Thread::class, Source::json($json));
```

### One-off shaped array

```php
$filters = $mapper->map(
    'array{status: non-empty-string, page?: positive-int, limit?: int<10, 100>}',
    $input,
);
```

### Key conversion

```php
$mapper = (new MapperBuilder())
    ->configureWith(new ConvertKeysToCamelCase())
    ->mapper();
```

### Callable arguments

```php
$arguments = (new MapperBuilder())
    ->argumentsMapper()
    ->mapArguments($handler, $input);
```

### HTTP request mapping

```php
$request = HttpRequest::fromPsr($psrRequest, $routeParameters);

$arguments = (new MapperBuilder())
    ->argumentsMapper()
    ->mapArguments($controller, $request);
```

### Interface inference

```php
$mapper = (new MapperBuilder())
    ->infer(
        PaymentMethod::class,
        /** @return class-string<CardPayment|WirePayment> */
        static fn (string $type) => $type === 'card' ? CardPayment::class : WirePayment::class,
    )
    ->mapper();
```

### Normalization

```php
$json = (new NormalizerBuilder())
    ->normalizer(Format::json())
    ->normalize($responseDto);
```

## Selection hints

- Prefer a DTO when the same structure appears in multiple places.
- Prefer a shaped array when the structure is local and short-lived.
- Prefer `registerConstructor()` when construction is custom but the target type
  is fixed.
- Prefer `infer()` when the payload chooses the implementation.
