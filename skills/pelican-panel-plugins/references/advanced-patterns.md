# Advanced Patterns for Pelican Plugins

This reference covers advanced patterns and techniques used in Pelican plugins.

## Models

### Model with Enums

```php
namespace MyPlugin\Models;

use App\Models\Server;
use MyPlugin\Enums\TicketStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $title
 * @property TicketStatus $status
 * @property int $server_id
 * @property Server $server
 */
class Ticket extends Model
{
    protected $fillable = ['title', 'status', 'server_id'];
    
    protected function casts(): array
    {
        return [
            'status' => TicketStatus::class,
        ];
    }
    
    public function server(): BelongsTo
    {
        return $this->belongsTo(Server::class, 'server_id');
    }
}
```

### Model Events and Hooks

```php
protected static function boot(): void
{
    parent::boot();
    
    // Set defaults on creation
    static::creating(function (self $model) {
        $model->status ??= TicketStatus::Open;
        $model->server_id ??= Filament::getTenant()?->getKey();
        $model->author_id ??= auth()->user()?->id;
    });
    
    // Sync with external service on create/update
    static::created(function (self $model) {
        $model->syncToStripe();
    });
    
    static::updated(function (self $model) {
        $model->syncToStripe();
    });
    
    // Cleanup on delete
    static::deleted(function (self $model) {
        if ($model->stripe_id) {
            app(StripeClient::class)->products->delete($model->stripe_id);
        }
    });
}
```

### Model with Custom Methods

```php
public function close(?string $answer = null): void
{
    if ($answer) {
        $this->messages()->create([
            'message' => $answer,
            'author_id' => auth()->user()?->id,
        ]);
    }
    
    $this->status = TicketStatus::Closed;
    $this->save();
    
    // Send notification to author
    if ($this->author) {
        Notification::make()
            ->title('Ticket closed')
            ->body($answer ? Markdown::inline($answer) : null)
            ->sendToDatabase($this->author);
    }
}

public function assignTo(User $user, bool $setStatus = true): void
{
    $this->assigned_user_id = $user->id;
    
    if ($setStatus) {
        $this->status = TicketStatus::InProgress;
    }
    
    $this->save();
}
```

### Model Implementing Filament Interfaces

```php
use Filament\Support\Contracts\HasLabel;

class Product extends Model implements HasLabel
{
    public function getLabel(): string
    {
        return $this->name;
    }
}
```

## Enums with Filament Integration

```php
namespace MyPlugin\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;

enum TicketStatus: string implements HasColor, HasIcon, HasLabel
{
    case Open = 'open';
    case InProgress = 'in_progress';
    case Closed = 'closed';
    
    public function getIcon(): string
    {
        return match ($this) {
            self::Open => 'tabler-circle-dashed',
            self::InProgress => 'tabler-progress',
            self::Closed => 'tabler-circle-check',
        };
    }
    
    public function getColor(): string
    {
        return match ($this) {
            self::Open => 'primary',
            self::InProgress => 'success',
            self::Closed => 'danger',
        };
    }
    
    public function getLabel(): string
    {
        return str($this->value)->headline();
    }
}
```

## Policies

### Simple Policy with DefaultAdminPolicies

```php
namespace MyPlugin\Policies;

use App\Policies\DefaultAdminPolicies;

class TicketPolicy
{
    use DefaultAdminPolicies;
    
    protected string $modelName = 'ticket';
}
```

The `DefaultAdminPolicies` trait automatically checks admin role permissions (viewList, view, create, update, delete).

### Custom Policy Methods

```php
namespace MyPlugin\Policies;

use App\Models\User;
use MyPlugin\Models\Ticket;
use App\Policies\DefaultAdminPolicies;

class TicketPolicy
{
    use DefaultAdminPolicies;
    
    protected string $modelName = 'ticket';
    
    public function assign(User $user, Ticket $ticket): bool
    {
        return $user->hasPermission('ticket.assign');
    }
    
    public function close(User $user, Ticket $ticket): bool
    {
        // Only the assigned user or admins can close
        return $ticket->assigned_user_id === $user->id 
            || $user->hasPermission('ticket.close');
    }
}
```

## Resolving Relationships on Core Models

Add custom relationships to Pelican's core models without modifying them:

```php
// In your service provider's boot() method
use App\Models\Server;
use MyPlugin\Models\Ticket;

public function boot(): void
{
    Server::resolveRelationUsing('tickets', fn (Server $server) => 
        $server->hasMany(Ticket::class, 'server_id', 'id')
    );
}
```

Now you can use `$server->tickets` anywhere in the panel or your plugin.

## Service Classes

Encapsulate complex business logic in service classes:

```php
namespace MyPlugin\Services;

use MyPlugin\Models\Subdomain;
use Exception;

class SubdomainService
{
    /**
     * @param array<mixed> $data
     * @throws Exception
     */
    public function handle(array $data, ?Subdomain $subdomain = null): Subdomain
    {
        $isNew = is_null($subdomain);
        
        if ($isNew) {
            $subdomain = Subdomain::create($data);
        } else {
            $subdomain->update($data);
        }
        
        $subdomain->refresh();
        
        try {
            $subdomain->syncToCloudflare();
        } catch (Exception $exception) {
            // Rollback if external sync fails
            if ($isNew) {
                $subdomain->delete();
            }
            throw $exception;
        }
        
        return $subdomain;
    }
}
```

Use in Filament actions:

```php
CreateAction::make()
    ->action(function (array $data, SubdomainService $service) {
        try {
            return $service->handle($data);
        } catch (Exception $exception) {
            Notification::make()
                ->title('Sync failed')
                ->body($exception->getMessage())
                ->danger()
                ->persistent()
                ->send();
            
            throw new Halt();
        }
    })
```

## HTTP Controllers

### Client API Controller

```php
namespace MyPlugin\Http\Controllers\Api\Client\Servers;

use App\Http\Controllers\Api\Client\ClientApiController;
use App\Models\Server;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

#[Group('Server - Custom')]
class MyController extends ClientApiController
{
    /**
     * Get data
     *
     * Returns custom data for the server.
     */
    public function index(Server $server): JsonResponse
    {
        if ($server->status === 'suspended') {
            abort(Response::HTTP_FORBIDDEN, 'Server is suspended');
        }
        
        $data = [
            'id' => $server->id,
            'name' => $server->name,
        ];
        
        return response()->json($data);
    }
}
```

Register the route:

```php
// In RouteServiceProvider
Route::middleware(['api', 'client-api', 'throttle:api.client'])
    ->prefix('/api/client/servers/{server}')
    ->scopeBindings()
    ->group(function () {
        Route::get('/my-data', [MyController::class, 'index']);
    });
```

## Artisan Commands

```php
namespace MyPlugin\Console\Commands;

use Illuminate\Console\Command;
use MyPlugin\Models\Order;

class CheckOrdersCommand extends Command
{
    protected $signature = 'p:my-plugin:check-orders';
    
    protected $description = 'Checks the expiration date for orders.';
    
    public function handle(): int
    {
        $orders = Order::all();
        
        if ($orders->count() < 1) {
            $this->line('No orders to process');
            return 0;
        }
        
        $bar = $this->output->createProgressBar(count($orders));
        
        foreach ($orders as $order) {
            $bar->clear();
            
            $order->checkExpire();
            
            $bar->advance();
            $bar->display();
        }
        
        $this->newLine();
        
        return 0;
    }
}
```

### Scheduling Commands

In your service provider's `boot()`:

```php
use Illuminate\Support\Facades\Schedule;
use MyPlugin\Console\Commands\CheckOrdersCommand;

public function boot(): void
{
    Schedule::command(CheckOrdersCommand::class)
        ->everyMinute()
        ->withoutOverlapping();
}
```

## HTTP Macros

Register custom HTTP client macros for external APIs:

```php
// In your service provider's boot()
use Illuminate\Support\Facades\Http;

public function boot(): void
{
    Http::macro('cloudflare', fn () => 
        Http::acceptJson()
            ->withToken(config('my-plugin.api_token'))
            ->timeout(5)
            ->connectTimeout(1)
            ->baseUrl('https://api.cloudflare.com/client/v4/')
    );
}
```

Usage:

```php
$response = Http::cloudflare()->get('/zones');
```

## Model Lifecycle Hooks on Core Models

Hook into Pelican core model events:

```php
// In your service provider's boot()
use App\Models\Server;
use MyPlugin\Models\Subdomain;

public function boot(): void
{
    Server::deleting(function (Server $server) {
        // Cleanup related records when server is deleted
        foreach ($server->subdomains as $subdomain) {
            try {
                $subdomain->delete();
            } catch (Exception $exception) {
                report($exception);
            }
        }
    });
}
```

## Binding Services to the Container

Inject dependencies and configure services:

```php
// In your service provider's register()
use Stripe\StripeClient;

public function register(): void
{
    $this->app->bind(StripeClient::class, fn () => 
        new StripeClient(config('my-plugin.stripe_secret'))
    );
}
```

Now you can use dependency injection or `app(StripeClient::class)` anywhere.

## Database Migrations

### Migration Naming Convention

Use numeric prefixes to control execution order:

- `001_create_primary_table.php`
- `002_create_related_table.php`
- `003_add_foreign_keys.php`

### Example Migration

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('category');
            $table->string('priority');
            $table->string('status');
            $table->text('description')->nullable();
            $table->unsignedInteger('server_id');
            $table->unsignedInteger('author_id')->nullable();
            $table->unsignedInteger('assigned_user_id')->nullable();
            $table->timestamps();
            
            $table->foreign('server_id')
                ->references('id')
                ->on('servers')
                ->onDelete('cascade');
                
            $table->foreign('author_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
```

## Translations

### Translation File Structure

`lang/en/strings.php`:

```php
return [
    'welcome' => 'Welcome to :plugin',
    'ticket' => 'Ticket|Tickets',  // Pluralization
    'status' => [
        'open' => 'Open',
        'closed' => 'Closed',
    ],
    'notifications' => [
        'created' => 'Ticket created successfully',
    ],
];
```

### Using Translations

```php
// Simple translation
trans('my-plugin::strings.welcome', ['plugin' => 'My Plugin'])

// Pluralization
trans_choice('my-plugin::strings.ticket', 2)  // "Tickets"
trans_choice('my-plugin::strings.ticket', 1)  // "Ticket"

// Nested keys
trans('my-plugin::strings.status.open')
```

### In Filament Components

```php
TextInput::make('name')
    ->label(trans('my-plugin::strings.name'))
    ->placeholder(trans('my-plugin::strings.enter_name'))
```

## Config Files

`config/my-plugin.php`:

```php
<?php

return [
    'api_key' => env('MY_PLUGIN_API_KEY'),
    'api_secret' => env('MY_PLUGIN_API_SECRET'),
    
    'feature_enabled' => env('MY_PLUGIN_FEATURE_ENABLED', true),
    
    'deployment_tags' => env('MY_PLUGIN_DEPLOYMENT_TAGS'),
    
    'limits' => [
        'max_items' => env('MY_PLUGIN_MAX_ITEMS', 10),
    ],
];
```

Always prefix environment variables with your plugin ID to avoid conflicts.

## Views

### Blade View

`resources/views/widgets/stats.blade.php`:

```blade
<x-filament-widgets::widget>
    <x-filament::section>
        <div class="space-y-2">
            <h2 class="text-lg font-semibold">{{ $this->title }}</h2>
            <p>Total: {{ $this->getData()['total'] }}</p>
            <p>Active: {{ $this->getData()['active'] }}</p>
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
```

### Using Views in Widgets

```php
namespace MyPlugin\Filament\Admin\Widgets;

use Filament\Widgets\Widget;

class StatsWidget extends Widget
{
    protected static string $view = 'my-plugin::widgets.stats';
    
    public string $title = 'Statistics';
    
    public function getData(): array
    {
        return [
            'total' => 100,
            'active' => 75,
        ];
    }
}
```

## Error Handling in Actions

Use `Halt` exception to stop action execution without showing generic error:

```php
use Filament\Support\Exceptions\Halt;

CreateAction::make()
    ->action(function (array $data) {
        try {
            // Attempt operation
            $result = SomeService::create($data);
        } catch (Exception $exception) {
            Notification::make()
                ->title('Operation failed')
                ->body($exception->getMessage())
                ->danger()
                ->send();
            
            // Stop execution without generic error message
            throw new Halt();
        }
    })
```
