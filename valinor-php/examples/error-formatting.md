# Error Formatting Examples

## Basic remapping inside a catch block

```php
use CuyZ\Valinor\Mapper\MappingError;

try {
    $result = $mapper->map(CreateUser::class, $input);
} catch (MappingError $error) {
    foreach ($error->messages() as $message) {
        if ($message->code() === 'unexpected_keys') {
            $message = $message->withBody('Request contains unknown fields.');
        }

        echo $message;
    }
}
```

## Message-map plus aggregate formatter

```php
use CuyZ\Valinor\Mapper\Tree\Message\Formatter\AggregateMessageFormatter;
use CuyZ\Valinor\Mapper\Tree\Message\Formatter\LocaleMessageFormatter;
use CuyZ\Valinor\Mapper\Tree\Message\Formatter\MessageMapFormatter;

$formatter = new AggregateMessageFormatter(
    new LocaleMessageFormatter('fr'),
    new MessageMapFormatter([
        'unexpected_keys' => 'Champs inconnus dans la requete.',
        'missing_value' => 'Valeur obligatoire manquante.',
    ]),
);

$messages = $error->messages()->formatWith($formatter);
```

## ICU placeholder formatting

```php
$message = $error->messages()->toArray()[0]
    ->withBody('Invalid amount {source_value, number, currency}');

echo $message->withLocale('en_US');
echo $message->withLocale('fr_FR');
```
