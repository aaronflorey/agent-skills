# API Surface

Load this first when you need the public entrypoints and the default shape of a
Valinor integration.

## Public APIs to prefer

| API | Use |
|---|---|
| `MapperBuilder` | Configure mapping and create mappers |
| `TreeMapper` | `map()` raw input to a class or type signature |
| `ArgumentsMapper` | `mapArguments()` for callables |
| `Mapper\Source\Source` | Wrap JSON, YAML, files, arrays, or iterables |
| `MappingError` | Catch mapping failures and inspect messages, source, and type |
| `NormalizerBuilder` | Configure normalization |
| `Normalizer\Format` | Choose array or JSON normalization |
| `HttpRequest` | Map route, query, and body values |
| `FromRoute`, `FromQuery`, `FromBody` | Bind request values to a specific source |
| `AsConverter` | Attribute-based mapping converters |
| `AsTransformer` | Attribute-based normalization transformers |
| `Object\Constructor` | Mark custom object constructors |
| `MapperBuilderConfigurator`, `NormalizerBuilderConfigurator` | Reusable app-level config |

Treat builders as immutable:

```php
$builder = (new MapperBuilder())
    ->allowScalarValueCasting()
    ->allowSuperfluousKeys();

$mapper = $builder->mapper();
```

## Main entrypoints

### Map to a class

```php
$result = (new MapperBuilder())
    ->mapper()
    ->map(Country::class, Source::json($json));
```

### Map to a direct type signature

```php
$filters = $mapper->map(
    'array{status: non-empty-string, page?: positive-int}',
    $input,
);
```

### Map callable arguments

```php
$arguments = (new MapperBuilder())
    ->argumentsMapper()
    ->mapArguments($controller, $source);
```

### Map HTTP requests

```php
$comment = (new MapperBuilder())
    ->mapper()
    ->map(PostComment::class, $request);
```

If HTTP sources can collide, add `FromRoute`, `FromQuery`, or `FromBody`.

## Strictness and flexibility

Valinor is strict by default. Add flexibility only when the real input contract
requires it.

| Builder method | Use when |
|---|---|
| `allowScalarValueCasting()` | Non-HTTP input contains stringified numbers, booleans, or `Stringable` values |
| `allowNonSequentialList()` | Lists may arrive with non-sequential keys |
| `allowUndefinedValues()` | Missing nullable or collection values should be accepted |
| `allowSuperfluousKeys()` | Extra keys should be ignored |
| `allowPermissiveTypes()` | You intentionally need `mixed` or `object` |
| `supportDateFormats(...)` | Input dates use non-default formats |

Do not enable these globally without a reason.

## Reusable configuration

Prefer `configureWith()` when the same config appears in multiple places.

```php
final class ApiMapperConfig implements MapperBuilderConfigurator
{
    public function configureMapperBuilder(MapperBuilder $builder): MapperBuilder
    {
        return $builder
            ->configureWith(new ConvertKeysToCamelCase())
            ->allowScalarValueCasting();
    }
}
```

Use the same pattern for `NormalizerBuilder`.

## Cache and warmup

Use cache in production.

```php
$cache = new FileSystemCache(__DIR__ . '/var/cache/valinor');

if ($isDev) {
    $cache = new FileWatchingCache($cache);
}

$mapperBuilder = (new MapperBuilder())->withCache($cache);
$normalizerBuilder = (new NormalizerBuilder())->withCache($cache);

$mapperBuilder->warmupCacheFor(Order::class, Customer::class);
```

Use the same cache instance for mapper and normalizer.

## Avoid

- Internal classes like `Library\Container`, compiler internals, or definition
  internals
- Deprecated `Source::camelCaseKeys()` in new code
- Permissive settings as a substitute for correct types
- Swallowing `MappingError` instead of surfacing its messages
