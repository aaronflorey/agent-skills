# Anti-Patterns

## Anti-pattern 1: Reach for low-level or deprecated APIs in new code

Bad:

```php
$country = (new MapperBuilder())
    ->mapper()
    ->map(Country::class, (new JsonSource($json))->camelCaseKeys());
```

Why it is bad:

- it couples application code to a lower-level source class unnecessarily
- `camelCaseKeys()` is deprecated for new code

Better:

```php
$country = (new MapperBuilder())
    ->configureWith(new ConvertKeysToCamelCase())
    ->mapper()
    ->map(Country::class, Source::json($json));
```

## Anti-pattern 2: Widen the model until mapping passes

Bad:

```php
$payload = (new MapperBuilder())
    ->allowPermissiveTypes()
    ->mapper()
    ->map('array<string, mixed>', $input);
```

Why it is bad:

- it discards contract information
- it turns validation into guesswork later in the code path

Better:

```php
$payload = (new MapperBuilder())
    ->mapper()
    ->map(
        'array{status: non-empty-string, page?: positive-int, filters?: list<non-empty-string>}',
        $input,
    );
```

## Anti-pattern 3: Repeat builder policy inline everywhere

Bad:

```php
$a = (new MapperBuilder())->allowScalarValueCasting()->allowSuperfluousKeys()->mapper();
$b = (new MapperBuilder())->allowScalarValueCasting()->allowSuperfluousKeys()->mapper();
$c = (new MapperBuilder())->allowScalarValueCasting()->allowSuperfluousKeys()->mapper();
```

Better:

```php
final class ApiMapperConfig implements MapperBuilderConfigurator
{
    public function configureMapperBuilder(MapperBuilder $builder): MapperBuilder
    {
        return $builder
            ->allowScalarValueCasting()
            ->allowSuperfluousKeys();
    }
}

$builder = (new MapperBuilder())->configureWith(new ApiMapperConfig());
```

## Anti-pattern 4: Let constructor exceptions leak raw details

Bad:

```php
final readonly class ProductId
{
    public function __construct(public string $value)
    {
        if (! preg_match('/^[A-Z]{3}-\d+$/', $value)) {
            throw new RuntimeException("SQL lookup failed for invalid id $value");
        }
    }
}
```

Better:

```php
final class InvalidProductId extends DomainException implements ErrorMessage
{
    public function body(): string
    {
        return 'Product id must match pattern AAA-123.';
    }
}

final readonly class ProductId
{
    public function __construct(public string $value)
    {
        if (! preg_match('/^[A-Z]{3}-\d+$/', $value)) {
            throw new InvalidProductId();
        }
    }
}
```

## Anti-pattern 5: Use a converter when a constructor or infer callback is the real problem

Bad:

```php
$mapper = (new MapperBuilder())
    ->registerConverter(static fn (array $value): PaymentMethod => new CardPayment(...))
    ->mapper();
```

Why it is bad:

- the issue is object selection, not a raw scalar or value conversion problem
- it hides domain construction policy in a broad converter

Better:

Use `infer()` to select the concrete implementation, then use normal mapping or
constructors to build it.
