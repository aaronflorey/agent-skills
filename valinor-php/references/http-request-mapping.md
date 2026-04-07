# HTTP Request Mapping

## Table of contents

1. Main model
2. Source-binding attributes
3. Mapping callable arguments
4. Mapping directly to an object
5. `asRoot` mapping
6. PSR-7 integration and original request injection
7. Key-case handling
8. Important behavior

## Main model

Valinor can map route, query, and body data into controller arguments or DTOs
using `CuyZ\Valinor\Mapper\Http\HttpRequest`.

## Source-binding attributes

Use these when the value must come from one specific request source:

- `#[FromRoute]`
- `#[FromQuery]`
- `#[FromBody]`

If no attribute is present, Valinor resolves by key across the available
sources. If the same key exists in more than one source, it raises a collision
error.

## Mapping callable arguments

```php
use CuyZ\Valinor\Mapper\Http\FromQuery;
use CuyZ\Valinor\Mapper\Http\FromRoute;
use CuyZ\Valinor\Mapper\Http\HttpRequest;
use CuyZ\Valinor\MapperBuilder;

final class ListArticles
{
    public function __invoke(
        #[FromRoute] string $authorId,
        #[FromQuery] string $status,
        #[FromQuery] int $page = 1,
    ): ResponseInterface {
        // ...
    }
}

$request = new HttpRequest(
    routeParameters: ['authorId' => 42],
    queryParameters: ['status' => 'published', 'page' => 2],
);

$arguments = (new MapperBuilder())
    ->argumentsMapper()
    ->mapArguments(new ListArticles(), $request);
```

## Mapping directly to an object

```php
final readonly class PostComment
{
    public function __construct(
        #[FromRoute] public int $postId,
        #[FromBody] public string $author,
        #[FromBody] public string $content,
    ) {}
}

$comment = (new MapperBuilder())
    ->mapper()
    ->map(PostComment::class, $request);
```

## `asRoot` mapping

Use `asRoot: true` when one parameter should consume all query or body values as
one object or shaped array.

```php
final readonly class ArticleFilters
{
    public function __construct(
        /** @var non-empty-string */
        public string $status,
        /** @var positive-int */
        public int $page = 1,
    ) {}
}

final class ListArticles
{
    public function __invoke(
        #[FromRoute] string $authorId,
        #[FromQuery(asRoot: true)] ArticleFilters $filters,
    ): ResponseInterface {
        // ...
    }
}
```

This also works with shaped arrays and `#[FromBody(asRoot: true)]`.

## PSR-7 integration and original request injection

When the framework uses PSR-7, build the request with `HttpRequest::fromPsr()`.

```php
$request = HttpRequest::fromPsr($psrRequest, $routeParameters);

$arguments = (new MapperBuilder())
    ->argumentsMapper()
    ->mapArguments($controller, $request);
```

If a callable parameter type matches the original request object, Valinor injects
it automatically.

## Key-case handling

HTTP mapping works with the same mapper configurators as normal mapping.

```php
$arguments = (new MapperBuilder())
    ->configureWith(
        new RestrictKeysToSnakeCase(),
        new ConvertKeysToCamelCase(),
    )
    ->argumentsMapper()
    ->mapArguments($controller, $httpRequest);
```

Register restriction before conversion.

## Important behavior

- Route and query parameters usually arrive as strings.
- Valinor automatically performs scalar casting for route and query parameters in
  HTTP request mapping.
- Missing required request values still raise `MappingError`.
- Body mapping still follows the normal strict rules unless your builder changes
  them.
