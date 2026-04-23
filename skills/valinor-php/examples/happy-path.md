# Happy Path Examples

## JSON into a readonly DTO

```php
use CuyZ\Valinor\Mapper\MappingError;
use CuyZ\Valinor\Mapper\Source\Source;
use CuyZ\Valinor\MapperBuilder;

final readonly class City
{
    public function __construct(
        /** @var non-empty-string */
        public string $name,
        public DateTimeZone $timeZone,
    ) {}
}

final readonly class Country
{
    /**
     * @param list<City> $cities
     */
    public function __construct(
        /** @var non-empty-string */
        public string $name,
        public array $cities,
    ) {}
}

try {
    $country = (new MapperBuilder())
        ->mapper()
        ->map(Country::class, Source::json($json));
} catch (MappingError $error) {
    // handle invalid input
}
```

## One-off shape mapping

```php
$filters = (new MapperBuilder())
    ->mapper()
    ->map(
        'array{status: non-empty-string, page?: positive-int, limit?: int<10, 100>}',
        $input,
    );
```

## Callable argument mapping

```php
$arguments = (new MapperBuilder())
    ->argumentsMapper()
    ->mapArguments($handler, ['name' => 'Jane', 'age' => 42]);

$handler(...$arguments);
```

## Normalize a DTO to JSON

```php
use CuyZ\Valinor\Normalizer\Format;
use CuyZ\Valinor\NormalizerBuilder;

$json = (new NormalizerBuilder())
    ->normalizer(Format::json())
    ->normalize($dto);
```
