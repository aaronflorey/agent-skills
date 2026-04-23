# Customization

Use this file when default mapping is close, but not enough.

## Pick the right mechanism

| Need | Use |
|---|---|
| Transform one input value before it fits the target type | `registerConverter()` or `#[AsConverter]` |
| Rename or validate source keys | key configurator or `registerKeyConverter()` |
| Build an object through a named/static factory | `#[Object\Constructor]` or `registerConstructor()` |
| Choose a concrete implementation from source data | `infer()` |
| Reuse the same mapper policy | `configureWith()` |
| Convert internal validation failures to mapping messages | custom `ErrorMessage`, `MessageBuilder`, or `filterExceptions()` |

Keep converters, key converters, constructors, transformers, and infer callbacks
pure and deterministic.

## Value converters

Use a value converter when the structure is right but one value needs
transformation.

```php
$mapper = (new MapperBuilder())
    ->registerConverter(
        /** @param callable(mixed): bool $next */
        static function (string $value, callable $next): bool {
            $value = match ($value) {
                'yes', 'on' => true,
                'no', 'off' => false,
                default => $value,
            };

            return $next($value);
        }
    )
    ->mapper();
```

Rules:

- first parameter decides when the converter applies
- return type decides what it produces
- optional `callable $next` enables chaining
- `priority` controls ordering

Use `#[AsConverter]` for property- or class-local behavior.

## Key conversion

Prefer provided configurators for naming-convention mismatches:

- `ConvertKeysToCamelCase`
- `ConvertKeysToSnakeCase`
- `RestrictKeysToCamelCase`
- `RestrictKeysToSnakeCase`
- `RestrictKeysToPascalCase`
- `RestrictKeysToKebabCase`

If you combine restriction and conversion, register restriction first.

```php
$mapper = (new MapperBuilder())
    ->configureWith(
        new RestrictKeysToSnakeCase(),
        new ConvertKeysToCamelCase(),
    )
    ->mapper();
```

Use `registerKeyConverter()` for project-specific remaps:

```php
$mapper = (new MapperBuilder())
    ->registerKeyConverter(static fn (string $key): string =>
        str_starts_with($key, 'billing_') ? substr($key, 8) : $key
    )
    ->mapper();
```

Key converters rename keys only. Use `Source::map()` only for source-path
reshaping.

## Custom constructors

Best default: mark the constructor or factory with `#[Object\Constructor]`.

```php
final readonly class Email
{
    #[Constructor]
    public static function fromParts(string $user, string $domain): self
    {
        return new self("$user@$domain");
    }

    public function __construct(public string $value) {}
}
```

Use manual registration for external classes or service methods:

```php
$builder = (new MapperBuilder())
    ->registerConstructor(Color::class, Color::fromHex(...));
```

Rules:

- custom constructor registration disables the native constructor for that class
  unless you also register the class name itself
- multiple constructors for the same target need distinct argument-name shapes
- constructor arguments are themselves mapped from the source

## Interface or abstract-class inference

Use `infer()` when the payload chooses the concrete implementation.

```php
$mapper = (new MapperBuilder())
    ->infer(
        PaymentMethod::class,
        /** @return class-string<CardPayment|WirePayment> */
        static fn (string $type) => match ($type) {
            'card' => CardPayment::class,
            'wire' => WirePayment::class,
            default => throw new DomainException("Unknown payment type `$type`."),
        }
    )
    ->mapper();
```

Return the class name, not an instance. Use `registerConstructor()` instead when
the target type is fixed and only construction is custom.

## Single-value object flattening

If an object has one constructor argument or one property, Valinor can often map
it directly from the inner scalar value instead of a one-key array.

```php
final readonly class Identifier
{
    public function __construct(public string $value) {}
}
```

So an input like `'identifier' => 'some-identifier'` can map cleanly.

## Error handling

Catch `MappingError` at the boundary. For domain validation inside constructors
or converters, use one of:

1. custom exception implementing Valinor message interfaces
2. `MessageBuilder`
3. `filterExceptions()` for safe third-party exceptions

```php
$builder = (new MapperBuilder())
    ->filterExceptions(static function (Throwable $error) {
        if ($error instanceof InvalidPriceException) {
            return CuyZ\Valinor\Mapper\Tree\Message\MessageBuilder::from($error);
        }

        throw $error;
    });
```

Do not whitelist broad exception classes that may leak sensitive information.

## Dates and custom date implementations

For non-default date formats:

```php
$mapper = (new MapperBuilder())
    ->supportDateFormats(DATE_COOKIE, DATE_ATOM)
    ->mapper();
```

By default, `DateTimeInterface` maps to `DateTimeImmutable`. If a project needs
another implementation like Carbon:

1. `infer(DateTimeInterface::class, fn () => Carbon::class)`
2. register a constructor returning `Carbon`
3. convert Carbon exceptions with `filterExceptions()` if needed
