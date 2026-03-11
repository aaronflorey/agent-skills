# FilamentPHP Patterns for Pelican Plugins

This reference covers common FilamentPHP patterns used in Pelican plugins.

## Resources

Resources are CRUD interfaces for models. Place them in `src/Filament/{PanelId}/Resources/`.

### Basic Resource Structure

```php
namespace MyPlugin\Filament\Admin\Resources\Products;

use MyPlugin\Models\Product;
use Filament\Resources\Resource;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\TextColumn;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;
    
    protected static string|\BackedEnum|null $navigationIcon = 'tabler-package';
    
    protected static string|\UnitEnum|null $navigationGroup = 'My Plugin';
    
    // Optional: show count badge
    public static function getNavigationBadge(): ?string
    {
        return (string) static::getEloquentQuery()->count() ?: null;
    }
    
    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('name')->required(),
            TextInput::make('price')->numeric()->prefix('$'),
        ]);
    }
    
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->sortable()->searchable(),
                TextColumn::make('price')->money('usd'),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }
    
    public static function getPages(): array
    {
        return [
            'index' => ListProducts::route('/'),
            'create' => CreateProduct::route('/create'),
            'edit' => EditProduct::route('/{record}/edit'),
        ];
    }
}
```

### Resource with Relationship

```php
Select::make('egg_id')
    ->label('Egg')
    ->required()
    ->relationship('egg', 'name')  // Automatically queries the relationship
    ->searchable()
    ->preload(),
```

### Navigation Items in Resources

```php
// In your main plugin class register() method
$panel->navigationItems([
    NavigationItem::make(fn () => trans('My Custom Page'))
        ->icon('tabler-star')
        ->url(fn () => MyPage::getUrl(panel: 'app'))
        ->isActiveWhen(fn () => request()->routeIs(MyPage::getRouteName()))
        ->sort(99),
]);
```

## Pages

Custom pages without a backing model. Place in `src/Filament/{PanelId}/Pages/`.

```php
namespace MyPlugin\Filament\Admin\Pages;

use Filament\Pages\Page;

class Dashboard extends Page
{
    protected static ?string $navigationIcon = 'tabler-dashboard';
    
    protected static string $view = 'my-plugin::dashboard';
    
    protected static string $routePath = 'dashboard';
    
    // Optional: hide from navigation
    protected static bool $shouldRegisterNavigation = true;
}
```

## Widgets

Reusable UI components. Place in `src/Filament/{PanelId}/Widgets/`.

```php
namespace MyPlugin\Filament\Admin\Widgets;

use Filament\Widgets\Widget;

class StatsWidget extends Widget
{
    protected static string $view = 'my-plugin::widgets.stats';
    
    protected int | string | array $columnSpan = 'full';
    
    public function getData(): array
    {
        return [
            'total' => 100,
            'active' => 75,
        ];
    }
}
```

### Stats Overview Widget

```php
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class OrderStats extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Orders', Order::count())
                ->description('All time orders')
                ->descriptionIcon('tabler-trending-up')
                ->color('success'),
            Stat::make('Revenue', '$' . number_format(Order::sum('total'), 2))
                ->description('Total revenue')
                ->descriptionIcon('tabler-currency-dollar'),
        ];
    }
}
```

## Relation Managers

Manage related models within a resource. Place in `src/Filament/{PanelId}/Resources/{ResourceName}/RelationManagers/`.

### Basic Relation Manager

```php
namespace MyPlugin\Filament\Admin\Resources\Products\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\TextColumn;

class PriceRelationManager extends RelationManager
{
    protected static string $relationship = 'prices';
    
    public function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('amount')->required()->numeric(),
            TextInput::make('currency')->required(),
        ]);
    }
    
    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('amount'),
                TextColumn::make('currency'),
            ])
            ->headerActions([
                CreateAction::make(),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }
}
```

### Extending Core Resources with Relation Managers

In your service provider's `register()` method:

```php
use App\Filament\Admin\Resources\Servers\ServerResource;
use MyPlugin\Filament\Admin\Resources\Servers\RelationManagers\SubdomainRelationManager;

public function register(): void
{
    ServerResource::registerCustomRelations(SubdomainRelationManager::class);
}
```

## Custom Actions

Reusable action buttons. Place in `src/Filament/Components/Actions/`.

```php
namespace MyPlugin\Filament\Components\Actions;

use Filament\Actions\Action;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;

class ApproveAction extends Action
{
    public static function getDefaultName(): ?string
    {
        return 'approve';
    }
    
    protected function setUp(): void
    {
        parent::setUp();
        
        $this->authorize(fn ($record) => auth()->user()->can('update', $record));
        
        $this->hidden(fn ($record) => $record->is_approved);
        
        $this->icon('tabler-check');
        
        $this->color('success');
        
        $this->requiresConfirmation();
        
        $this->schema([
            TextInput::make('notes')
                ->label('Approval Notes')
                ->nullable(),
        ]);
        
        $this->action(function ($record, array $data) {
            $record->approve($data['notes']);
            
            Notification::make()
                ->title('Approved successfully')
                ->success()
                ->send();
        });
    }
}
```

Use in resources:

```php
use MyPlugin\Filament\Components\Actions\ApproveAction;

public static function table(Table $table): Table
{
    return $table->recordActions([
        ApproveAction::make(),
        EditAction::make(),
        DeleteAction::make(),
    ]);
}
```

## Form Components

### Fieldset for Grouping

```php
use Filament\Schemas\Components\Fieldset;

Fieldset::make('Server Configuration')
    ->columnSpanFull()
    ->columns(2)
    ->schema([
        TextInput::make('cpu')->numeric(),
        TextInput::make('memory')->numeric(),
    ]),
```

### Tags Input

```php
use Filament\Forms\Components\TagsInput;

TagsInput::make('ports')
    ->placeholder('Add port...')
    ->default([]),

TagsInput::make('tags')
    ->default(array_filter(explode(',', config('my-plugin.tags', '')))),
```

### Select with Dynamic Options

```php
Select::make('record_type')
    ->required()
    ->selectablePlaceholder(false)
    ->options(function () {
        $types = is_ipv6($this->allocation->ip) ? ['AAAA' => 'AAAA'] : ['A' => 'A'];
        if ($this->supports_srv) {
            $types['SRV'] = 'SRV';
        }
        return $types;
    })
    ->default(fn () => is_ipv6($this->allocation->ip) ? 'AAAA' : 'A'),
```

### Dynamic Field Suffix

```php
use Filament\Schemas\Components\Utilities\Get;

TextInput::make('subdomain')
    ->required()
    ->suffix(fn (Get $get) => '.' . Domain::find($get('domain_id'))?->name),
```

## Table Components

### Custom Column Formatting

```php
TextColumn::make('memory')
    ->numeric()
    ->formatStateUsing(function ($state) {
        if ($state === 0) return 'Unlimited';
        $gb = $state / (config('panel.use_binary_prefix') ? 1024 : 1000);
        $unit = config('panel.use_binary_prefix') ? 'GiB' : 'GB';
        return Number::format($gb, 2, locale: auth()->user()->language) . ' ' . $unit;
    }),
```

### Column with Description

```php
TextColumn::make('name')
    ->description(fn ($record) => $record->description)
    ->sortable()
    ->searchable(),
```

### Column as Link

```php
TextColumn::make('egg.name')
    ->sortable()
    ->icon('tabler-egg')
    ->url(fn ($record): string => route('filament.admin.resources.eggs.edit', ['record' => $record->egg])),
```

### Empty State Customization

```php
public static function table(Table $table): Table
{
    return $table
        ->columns([...])
        ->emptyStateHeading('No Products Found')
        ->emptyStateDescription('Create your first product to get started.')
        ->emptyStateIcon('tabler-package');
}
```

## Extending Core Pages

Add widgets or actions to existing panel pages in your service provider's `register()`:

```php
use App\Filament\Server\Pages\Console;
use App\Enums\ConsoleWidgetPosition;

Console::registerCustomWidgets(
    ConsoleWidgetPosition::AboveConsole, 
    [MyWidget::class]
);
```

```php
use App\Filament\App\Pages\ListServers;
use App\Enums\HeaderActionPosition;

ListServers::registerCustomHeaderActions(
    HeaderActionPosition::Before,
    MyAction::make()
);
```

## Notifications

```php
use Filament\Notifications\Notification;
use Filament\Actions\Action;

// Simple notification
Notification::make()
    ->title('Settings saved')
    ->success()
    ->send();

// Database notification with action
Notification::make()
    ->title('Ticket closed')
    ->body('Your ticket has been resolved.')
    ->actions([
        Action::make('view')
            ->label('View Ticket')
            ->button()
            ->markAsRead()
            ->url(fn () => TicketResource::getUrl(['record' => $ticket->id])),
    ])
    ->sendToDatabase($user);

// Persistent error notification
Notification::make()
    ->title('Sync failed')
    ->body($exception->getMessage())
    ->danger()
    ->persistent()
    ->send();
```
