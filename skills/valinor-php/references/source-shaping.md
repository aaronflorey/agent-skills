# Source Shaping

## Table of contents

1. Source entrypoints
2. Invalid source handling
3. Path mapping
4. Custom iterable sources
5. Guidance

## Source entrypoints

Use `CuyZ\Valinor\Mapper\Source\Source` as the normal facade for formatted
input.

```php
use CuyZ\Valinor\Mapper\Source\Source;

$json = Source::json($jsonString);
$yaml = Source::yaml($yamlString);
$file = Source::file(new SplFileObject('payload.json'));
$array = Source::array($payload);
$iterable = Source::iterable($records);
```

Prefer this facade over lower-level source classes in new code.

## Invalid source handling

`Source::json()` and `Source::yaml()` can fail before mapping starts.

```php
use CuyZ\Valinor\Mapper\Source\Exception\InvalidSource;

try {
    $source = Source::json($jsonString);
} catch (InvalidSource $error) {
    $rawSource = $error->source();
    // report parse failure
}
```

JSON must decode to an iterable top-level structure for `Source::json()`.

## Path mapping

`Source::map()` is useful when inbound data shape needs path-level rewriting
before normal mapping.

```php
$source = Source::array([
    'identification' => 'France',
    'towns' => [
        ['label' => 'Paris', 'timeZone' => 'Europe/Paris'],
        ['label' => 'Lyon', 'timeZone' => 'Europe/Paris'],
    ],
])->map([
    'identification' => 'name',
    'towns' => 'cities',
    'towns.*.label' => 'name',
]);
```

Use this for structural path remapping. Do not confuse it with key-case
conversion, which should usually use mapper configurators instead.

## Custom iterable sources

Any iterable can act as a source. Wrap a custom iterable with
`Source::iterable()` when you need preprocessing before mapping.

```php
final readonly class AcmeSource implements IteratorAggregate
{
    public function __construct(private iterable $source) {}

    public function getIterator(): Traversable
    {
        yield from $this->source;
    }
}

$source = Source::iterable(new AcmeSource(['valueA' => 'foo']));
```

## Guidance

- Prefer `Source::json()` or `Source::yaml()` for formatted payloads.
- Prefer mapper configurators or key converters for naming-convention mismatch.
- Use `Source::map()` when the inbound tree shape itself needs rearranging.
- Avoid deprecated `Source::camelCaseKeys()` in new code.
