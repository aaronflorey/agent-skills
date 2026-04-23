# HTTP Request Examples

## Controller arguments from route and query

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
    routeParameters: ['authorId' => '42'],
    queryParameters: ['status' => 'published', 'page' => '2'],
);

$arguments = (new MapperBuilder())
    ->argumentsMapper()
    ->mapArguments(new ListArticles(), $request);
```

## `asRoot` query DTO

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

## Direct object mapping from route and body

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

## PSR-7 request injection

```php
use Psr\Http\Message\ServerRequestInterface;

final class ShowAuthor
{
    public function __invoke(
        ServerRequestInterface $request,
        #[FromRoute] string $authorId,
    ): ResponseInterface {
        $accept = $request->getHeaderLine('Accept');
        // ...
    }
}

$request = HttpRequest::fromPsr($psrRequest, ['authorId' => '42']);

$arguments = (new MapperBuilder())
    ->argumentsMapper()
    ->mapArguments(new ShowAuthor(), $request);
```
