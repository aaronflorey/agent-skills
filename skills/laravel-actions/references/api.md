# Laravel Actions — Full API Reference

## AsObject trait methods

| Method | Description |
|--------|-------------|
| `MyAction::make()` | Resolve from container (`app(MyAction::class)`) |
| `MyAction::run(...$args)` | Resolve and call `handle(...$args)` |
| `MyAction::runIf($condition, ...$args)` | Run only if condition is truthy |
| `MyAction::runUnless($condition, ...$args)` | Run only if condition is falsy |

## AsController methods used by ControllerDecorator / ActionRequest

| Method | When used |
|--------|-----------|
| `asController(Request $request)` | Entry point when called as controller; falls back to `handle` if absent |
| `jsonResponse($result, Request $request)` | Called after `asController` when the request expects JSON |
| `htmlResponse($result, Request $request)` | Called after `asController` when the request expects HTML |
| `getControllerMiddleware(): array` | Middleware applied to the controller |
| `routes(Router $router): void` | Static — define routes inline; requires `Actions::registerRoutes(...)` |
| `prepareForValidation(ActionRequest $request): void` | Before authorization and validation |
| `authorize(ActionRequest $request): bool\|Response` | Authorization check; `AuthorizationException` on failure |
| `getAuthorizationFailure(): void` | Override authorization failure behaviour |
| `rules(): array` | Validation rules |
| `withValidator(Validator $v): void` | Add custom validator callbacks |
| `afterValidator(Validator $v): void` | Shorthand for a single `after` callback |
| `getValidator(): Validator` | Full control — ignores `rules`, `withValidator`, `afterValidator` |
| `getValidationData(): array` | Data to validate; defaults to `$request->all()` |
| `getValidationMessages(): array` | Custom validation messages |
| `getValidationAttributes(): array` | Human-friendly attribute names |
| `getValidationRedirect(Request $r): string` | Redirect URL on failure; defaults to back |
| `getValidationErrorBag(): string` | Error bag name; defaults to `'default'` |
| `getValidationFailure(): void` | Override validation failure behaviour |

## AsJob methods and properties

| Member | Description |
|--------|-------------|
| `asJob(...$args): void` | Override job entry point (defaults to `handle`) |
| `MyAction::dispatch(...$args)` | Dispatch async job |
| `MyAction::dispatchIf($cond, ...$args)` | Dispatch if condition is truthy |
| `MyAction::dispatchUnless($cond, ...$args)` | Dispatch if condition is falsy |
| `MyAction::dispatchNow(...$args)` | Dispatch synchronously (alias: `dispatchSync`) |
| `MyAction::dispatchAfterResponse(...$args)` | Dispatch after HTTP response sent |
| `MyAction::makeJob(...$args): JobDecorator` | Create a `JobDecorator` (for chaining/batching) |
| `MyAction::withChain(array $jobs)` | Chain jobs after this one |
| `configureJob(JobDecorator $job): void` | Configure job defaults on the action |
| `getJobBackoff(): int\|array` | Retry backoff in seconds |
| `getJobRetryUntil(): DateTime` | Retry deadline |
| `getJobMiddleware(): array` | Job middleware |
| `getJobTags(... $args): array` | Horizon tags |
| `getJobDisplayName(): string` | Horizon display name |
| `getJobUniqueId(...$args): mixed` | Unique job identifier (requires `ShouldBeUnique`) |
| `getJobUniqueFor(...$args): int` | Seconds a job stays unique |
| `getJobUniqueVia(): Repository` | Cache driver for uniqueness lock |
| `$queue` | Default queue name |
| `$tries` | Number of attempts |
| `$timeout` | Seconds before timeout |
| `$maxExceptions` | Max exceptions before failing |

### Asserting jobs in tests (requires `Queue::fake()`)

```php
MyAction::assertPushed();
MyAction::assertPushed(int $times);
MyAction::assertPushed(Closure $callback);  // ($action, $args, $job, $queue)
MyAction::assertPushed(int $times, Closure $callback);
MyAction::assertNotPushed();
MyAction::assertNotPushed(Closure $callback);
MyAction::assertPushedOn(string $queue, Closure $callback = null);
```

## AsListener methods

| Method | Description |
|--------|-------------|
| `asListener(Event $event): void` | Map event to `handle`; defaults to `handle` if absent |

Add `implements ShouldQueue` for a queueable listener.

## AsCommand properties and methods

| Member | Description |
|--------|-------------|
| `$commandSignature` | Artisan signature string |
| `$commandDescription` | Description shown in `php artisan list` |
| `$commandHelp` | Help text |
| `asCommand(Command $command): void` | Entry point for command execution |
| `getCommandSignature(): string` | Dynamic signature |
| `getCommandDescription(): string` | Dynamic description |
| `getCommandHelp(): string` | Dynamic help text |
| `isCommandHidden(): bool` | Hide from `artisan list` |

Auto-register: `Actions::registerCommands(['app/Actions'])` in a service provider (check `$app->runningInConsole()` first).

## AsFake / mocking methods

| Method | Description |
|--------|-------------|
| `MyAction::mock()` | Replace with Mockery mock; returns `MockInterface` |
| `MyAction::partialMock()` | Partial mock — real methods run unless expected |
| `MyAction::spy()` | Replace with Mockery spy |
| `MyAction::isFake(): bool` | Whether a fake is currently active |
| `MyAction::clearFake(): void` | Remove mock/spy and restore real implementation |
| `->shouldRun()` | Shorthand for `shouldReceive('handle')` |
| `->shouldNotRun()` | Assert `handle` is never called |
| `->allowToRun()` | Allow spy to run through real `handle` |

## WithAttributes trait (optional, v2.1+)

Add alongside `AsAction`:
```php
use Lorisleiva\Actions\Concerns\WithAttributes;
```

| Method | Description |
|--------|-------------|
| `fill(array $attrs): static` | Merge attributes |
| `set(string $key, mixed $value): static` | Set single attribute |
| `get(string $key, mixed $default = null): mixed` | Get single attribute |
| `has(string $key): bool` | Check attribute existence |
| `all(): array` | All attributes |
| `only(array $keys): array` | Subset of attributes |
| `except(array $keys): array` | Attributes excluding keys |
| `fillFromRequest(ActionRequest $r): static` | Fill from request data + route params |
| `validated(string $key = null): mixed` | Get validated data (after `validateAttributes`) |
| `validateAttributes(): array` | Trigger authorization + validation against attributes |

When `WithAttributes` is present, `ActionRequest` skips auto-validation — call `$request->validate()` explicitly if needed.

## Granular traits (cherry-pick instead of AsAction)

```php
use Lorisleiva\Actions\Concerns\AsObject;
use Lorisleiva\Actions\Concerns\AsController;
use Lorisleiva\Actions\Concerns\AsJob;
use Lorisleiva\Actions\Concerns\AsListener;
use Lorisleiva\Actions\Concerns\AsCommand;
use Lorisleiva\Actions\Concerns\AsFake;
```

`AsAction` is simply a combination of all of the above.

## Facade helpers

```php
use Lorisleiva\Actions\Facades\Actions;

Actions::registerRoutes(['app/Actions']);   // find & register static routes() methods
Actions::registerCommands(['app/Actions']); // find & register actions with $commandSignature
```
