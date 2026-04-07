# Production-Safe Example

This example shows a reusable mapper policy, cache, boundary error handling, and
matching normalization setup.

```php
use CuyZ\Valinor\Cache\FileSystemCache;
use CuyZ\Valinor\Cache\FileWatchingCache;
use CuyZ\Valinor\Mapper\Configurator\ConvertKeysToCamelCase;
use CuyZ\Valinor\Mapper\Configurator\MapperBuilderConfigurator;
use CuyZ\Valinor\Mapper\MappingError;
use CuyZ\Valinor\Mapper\Source\Source;
use CuyZ\Valinor\MapperBuilder;
use CuyZ\Valinor\Normalizer\Configurator\ConvertDateTime;
use CuyZ\Valinor\Normalizer\Format;
use CuyZ\Valinor\Normalizer\Configurator\NormalizerBuilderConfigurator;
use CuyZ\Valinor\NormalizerBuilder;

final class ApiMapperConfig implements MapperBuilderConfigurator
{
    public function configureMapperBuilder(MapperBuilder $builder): MapperBuilder
    {
        return $builder
            ->configureWith(new ConvertKeysToCamelCase())
            ->allowScalarValueCasting()
            ->supportDateFormats(DATE_ATOM, DATE_COOKIE);
    }
}

final class ApiNormalizerConfig implements NormalizerBuilderConfigurator
{
    public function configureNormalizerBuilder(NormalizerBuilder $builder): NormalizerBuilder
    {
        return $builder->configureWith(new ConvertDateTime(DATE_ATOM));
    }
}

$cache = new FileSystemCache(__DIR__ . '/var/cache/valinor');

if ($isDev) {
    $cache = new FileWatchingCache($cache);
}

$mapperBuilder = (new MapperBuilder())
    ->withCache($cache)
    ->configureWith(new ApiMapperConfig());

$normalizerBuilder = (new NormalizerBuilder())
    ->withCache($cache)
    ->configureWith(new ApiNormalizerConfig());

try {
    $command = $mapperBuilder
        ->mapper()
        ->map(CreateOrder::class, Source::json($requestBody));
} catch (MappingError $error) {
    $messages = [];

    foreach ($error->messages() as $message) {
        $messages[] = (string)$message;
    }

    // convert $messages to a validation response
}

$responseJson = $normalizerBuilder
    ->normalizer(Format::json())
    ->normalize($result);
```

Why this is good:

- one reusable configuration per boundary
- explicit input policy instead of scattered builder flags
- cache for production performance
- clear `MappingError` handling at the input boundary
- separate normalization policy for output formatting
