# Error Messages Formatting

## Table of contents

1. Basic message access
2. Placeholder-based customization
3. Locales and ICU formatting
4. Formatter classes
5. When to use which approach

## Basic message access

When mapping fails, catch `MappingError` and work from `$error->messages()`.

```php
use CuyZ\Valinor\Mapper\MappingError;

try {
    $result = $mapper->map(Target::class, $source);
} catch (MappingError $error) {
    foreach ($error->messages() as $message) {
        // inspect or format
    }
}
```

## Placeholder-based customization

Messages support placeholders such as:

- `{message_code}`
- `{node_name}`
- `{node_path}`
- `{node_type}`
- `{expected_signature}`
- `{source_value}`
- `{original_message}`

```php
foreach ($error->messages() as $message) {
    if ($message->code() === 'some_code') {
        $message = $message
            ->withParameter('some_parameter', 'custom value')
            ->withBody('new message / {message_code} / {some_parameter}');
    }
}
```

## Locales and ICU formatting

Valinor uses ICU message formatting, which allows locale-aware output.

```php
$message = $message->withBody('Invalid amount {source_value, number, currency}');

echo $message->withLocale('en_US');
echo $message->withLocale('en_GB');
echo $message->withLocale('fr_FR');
```

If the `intl` extension is missing, placeholder replacement still works through a
shim, but advanced ICU formatting does not.

## Formatter classes

### `TranslationMessageFormatter`

Use this for translation tables and locale-based output.

### `MessageMapFormatter`

Use this to remap messages by code, body, or message class.

```php
$formatter = new CuyZ\Valinor\Mapper\Tree\Message\Formatter\MessageMapFormatter([
    'unexpected_keys' => 'Request contains unknown fields.',
    SomeError::class => 'Invalid value: {source_value}',
]);
```

Mapping entries may be strings or callbacks that inspect the message.

### `AggregateMessageFormatter`

Use this to compose locale selection, remapping, and translation in order.

## When to use which approach

| Need | Use |
|---|---|
| One-off tweak to one message | `withBody()` and `withParameter()` |
| Locale-aware message formatting | `withLocale()` or `TranslationMessageFormatter` |
| Consistent app-wide remapping by code/body/class | `MessageMapFormatter` |
| Several formatting stages together | `AggregateMessageFormatter` |
| Validation produced inside constructors/converters | custom `ErrorMessage`, `MessageBuilder`, or `filterExceptions()` |
