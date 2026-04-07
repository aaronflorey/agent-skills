# Type Signatures

Use this file when the main task is choosing the exact Valinor target type.

## Design rules

Prefer this order:

1. native PHP type when exact enough
2. native type plus PHPDoc refinement
3. direct Valinor string signature for ad hoc mapping

Good defaults:

- `non-empty-string` instead of `string` for required identifiers
- `positive-int` instead of `int` for page numbers
- `list<Order>` instead of `array<Order>` for sequential collections
- `array{status: non-empty-string, page?: positive-int}` for small local shapes

## Common patterns

### Scalars and refinements

- `positive-int`
- `negative-int`
- `non-positive-int`
- `non-negative-int`
- `int<10, 100>`
- `int<min, 0>`
- `int<0, max>`
- `non-empty-string`
- `numeric-string`
- `class-string`
- `class-string<Foo>`
- `value-of<MyBackedEnum>`
- `scalar`

### Arrays, lists, and shapes

- `list<T>`
- `non-empty-list<T>`
- `array<TKey, TValue>`
- `non-empty-array<TKey, TValue>`
- `array<non-empty-string, string>`
- `array<'foo'|'bar', string>`
- `array<42|1337, string>`
- `array<positive-int, string>`
- `array{foo: string, bar: int}`
- `array{foo: string, bar?: int}`
- `array{string, bar: int}`
- `array{foo: string, ...}`
- `array{foo: string, ...array<string>}`
- `array{foo: string, ...array<int, string>}`

### Objects and generics

- concrete classes like `Order`
- generic containers with precise PHPDoc like `Page<Order>`
- intersections like `FooInterface&BarInterface`

### Unions, enums, and constants

- `int|string`
- `array<Foo|Bar>`
- `'foo'|'bar'`
- `42|1337`
- `404.42|1337.42`
- `true|false|int`
- `SomeEnum::FOO|SomeEnum::BAR`
- `SomeEnum::BA*`
- `SomeClassWithConstants::FOO|SomeClassWithConstants::BAR`
- `SomeClassWithConstants::BA*`

## Short examples

### Precise DTO types

```php
final readonly class Filters
{
    public function __construct(
        /** @var non-empty-string */
        public string $status,
        /** @var positive-int */
        public int $page,
        /** @var int<10, 100> */
        public int $limit,
    ) {}
}
```

### Ad hoc shaped array

```php
$payload = $mapper->map(
    'array{status: non-empty-string, page?: positive-int, limit?: int<10, 100>}',
    $input,
);
```

### Generic container

```php
/**
 * @template T of object
 */
final readonly class Page
{
    /** @param list<T> $items */
    public function __construct(public array $items, public int $page) {}
}
```

## Where to declare types

- inside classes: native types plus PHPDoc refinements
- direct `map()` calls: string signatures for local or ad hoc shapes
- converters, constructors, transformers, and `infer()` callbacks: exact
  callback parameter and return types

Prefer objects when the structure is reused or carries invariants. Prefer shaped
arrays when the structure is local and short-lived.
