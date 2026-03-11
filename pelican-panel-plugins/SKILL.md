---
name: pelican-panel-plugins
description: Write, scaffold, explain, and debug plugins for the Pelican gaming panel. Use this skill whenever the user wants to create a Pelican plugin, add functionality to the Pelican panel, build a FilamentPHP resource or page for Pelican, register custom permissions, add plugin settings, write plugin routes, or asks anything about Pelican plugin development — even if they just say "I want to add something to Pelican" or "how do I extend Pelican".
---

# Pelican Panel Plugins

Pelican is an open-source game server management panel built on Laravel + FilamentPHP. Plugins let you add functionality without touching core files.

> ⚠️ The plugin system is still in active development — some features may be missing or change.

## Scaffolding a new plugin

Run inside the panel directory (`/var/www/pelican` by default):

```bash
php artisan p:plugin:make
```

This creates:
- `plugins/<id>/plugin.json` — metadata and configuration
- `plugins/<id>/src/<YourPlugin>.php` — main plugin class
- `plugins/<id>/src/Providers/<YourPlugin>ServiceProvider.php` — service provider
- `plugins/<id>/config/<id>.php` — config file

> **The plugin folder name must exactly match the `id` field in `plugin.json`.**

## Plugin structure

```
plugins/my-plugin/
├── plugin.json
├── config/
├── database/
│   ├── migrations/
│   └── Seeder/               # <PluginName>Seeder.php
├── lang/                     # translations (namespaced by plugin id)
├── resources/
│   └── views/                # blade views (namespaced by plugin id)
├── routes/                   # loaded via RouteServiceProvider
└── src/                      # equivalent of Laravel's app/
    ├── MyPlugin.php           # main plugin class
    ├── Filament/
    │   ├── Admin/
    │   │   ├── Pages/
    │   │   ├── Resources/
    │   │   └── Widgets/
    │   ├── App/
    │   └── Server/
    ├── Models/
    ├── Providers/
    └── ...
```

Everything is **auto-discovered**: migrations, service providers, artisan commands.

## plugin.json

```json
{
    "id": "my-plugin",
    "name": "My Plugin",
    "author": "Your Name",
    "version": "1.0.0",
    "description": "What the plugin does.",
    "category": "plugin",
    "namespace": "MyPlugin",
    "class": "MyPlugin",
    "panels": ["admin"],
    "panel_version": "^1.2.0",
    "update_url": "https://example.com/my-plugin/update.json",
    "composer_packages": {
        "some/package": "^1.0"
    }
}
```

| Field | Required | Notes |
|---|---|---|
| `id` | ✅ | Must match folder name |
| `name` | ✅ | Display name |
| `author` | ✅ | Your name |
| `version` | No | Defaults to `1.0.0` |
| `description` | No | Short summary |
| `category` | ✅ | `plugin`, `theme`, or `language` |
| `namespace` | ✅ | PHP namespace root |
| `class` | ✅ | Main class name |
| `panels` | No | Omit to load on all panels |
| `panel_version` | No | `^1.2.0` = 1.2.0 or higher |
| `update_url` | No | Points to a `update.json` |
| `composer_packages` | No | Extra Composer deps |

### Update URL format

```json
{
    "*": { "version": "1.1.0", "download_url": "https://..." }
}
```

Use panel version keys (e.g. `"panel_version_1"`) for version-specific releases; `*` acts as a wildcard fallback.

## Main plugin class

The main class (in `src/`) implements the Filament plugin interface and is where you register UI components:

```php
namespace MyPlugin;

use Filament\Panel;
use Pelican\Contracts\Extensions\HasPluginSettings;
use Pelican\Extensions\PelicanPlugin;

class MyPlugin extends PelicanPlugin
{
    public function getId(): string
    {
        return 'my-plugin';
    }

    public function register(Panel $panel): void
    {
        parent::register($panel);

        $id = str($panel->getId())->title(); // "Admin", "App", "Server"

        // Auto-discover Filament resources, pages, and widgets
        $panel->discoverPages(
            plugin_path($this->getId(), "src/Filament/$id/Pages"),
            "MyPlugin\\Filament\\$id\\Pages"
        );
        $panel->discoverResources(
            plugin_path($this->getId(), "src/Filament/$id/Resources"),
            "MyPlugin\\Filament\\$id\\Resources"
        );
        $panel->discoverWidgets(
            plugin_path($this->getId(), "src/Filament/$id/Widgets"),
            "MyPlugin\\Filament\\$id\\Widgets"
        );
    }
}
```

## The three Filament panels

| Panel ID | Area | Notes |
|---|---|---|
| `admin` | Admin area | Full navigation |
| `app` | Server list | No navigation by default (see below) |
| `server` | Client area | `Server` model is the tenant |

### Re-enabling navigation on the `app` panel

```php
use App\Models\Server;
use App\Filament\App\Resources\ServerResource;
use App\Enums\CustomizationKey;

public function register(Panel $panel): void
{
    parent::register($panel);

    if ($panel->getId() === 'app') {
        // ServerResource::embedServerList(); // optional: add "Servers" nav item
        $panel->navigation(true);
        $panel->topbar(function () {
            $nav = user()?->getCustomization(CustomizationKey::TopNavigation);
            return in_array($nav, ['topbar', 'mixed', true], true);
        });
        $panel->clearCachedComponents();
    }
}
```

## Modifying existing resources and pages

Call static methods on core classes inside a **service provider's `register()`**:

```php
use App\Filament\Admin\Resources\UserResource;
use App\Filament\Server\Pages\Console;
use App\Filament\App\Pages\ListServers;
use App\Enums\ConsoleWidgetPosition;
use App\Enums\HeaderActionPosition;

public function register(): void
{
    // Add a relation manager tab to UserResource
    UserResource::registerCustomRelations(MyCustomRelationManager::class);

    // Add a widget above the console
    Console::registerCustomWidgets(ConsoleWidgetPosition::AboveConsole, [MyWidget::class]);

    // Add an action button to the server list header
    ListServers::registerCustomHeaderActions(HeaderActionPosition::Before, MyAction::make());
}
```

Browse `app/Traits/Filament/` in the panel source for all available `CanModify*` / `CanCustomize*` traits.

## Plugin settings

Implement `HasPluginSettings` on your main class to get a settings page in the plugin list:

```php
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;
use Pelican\Extensions\Traits\EnvironmentWriterTrait;

class MyPlugin extends PelicanPlugin implements HasPluginSettings
{
    use EnvironmentWriterTrait;

    public function getSettingsForm(): array
    {
        return [
            TextInput::make('api_key')
                ->required()
                ->default(fn () => config('my-plugin.api_key')),
            Toggle::make('feature_enabled')
                ->inline(false)
                ->default(fn () => config('my-plugin.feature_enabled')),
        ];
    }

    public function saveSettings(array $data): void
    {
        $this->writeToEnvironment([
            'MY_PLUGIN_API_KEY'        => $data['api_key'],
            'MY_PLUGIN_FEATURE_ENABLED' => $data['feature_enabled'],
        ]);

        Notification::make()->title('Settings saved')->success()->send();
    }
}
```

> Always prefix env vars with your plugin id (e.g. `MY_PLUGIN_*`) to avoid conflicts.

## Routes

Register routes in a `RouteServiceProvider` (place it in `src/Providers/`):

```php
use Illuminate\Foundation\Support\Providers\RouteServiceProvider;

class MyPluginRoutesProvider extends RouteServiceProvider
{
    public function boot(): void
    {
        $this->routes(function () {
            // Simple single route
            Route::get('/my-plugin/test', [TestController::class, 'index'])
                ->name('my-plugin.test');

            // Load from a routes file
            Route::prefix('/my-plugin')
                ->group(plugin_path('my-plugin', 'routes/web.php'));

            // Append to the existing client API
            Route::middleware(['api', 'client-api', 'throttle:api.client'])
                ->prefix('/api/client')
                ->scopeBindings()
                ->group(plugin_path('my-plugin', 'routes/api-client.php'));
        });
    }
}
```

## Permissions

### Admin role permissions

```php
use App\Models\Role;

public function register(): void
{
    // Shorthand: registers viewList, view, create, update, delete
    Role::registerCustomDefaultPermissions('myModel');

    // Custom permissions
    Role::registerCustomPermissions([
        'myModel' => ['export', 'impersonate'],
        'server'  => ['customAction'], // extend an existing model
    ]);

    // Optional: icon for the model group
    Role::registerCustomModelIcon('myModel', 'tabler-star');
}
```

### Subuser permissions

```php
use App\Models\Subuser;

public function register(): void
{
    // New group with icon
    Subuser::registerCustomPermissions('myFeature', ['read', 'write'], 'tabler-bolt', false);

    // Append to an existing group
    Subuser::registerCustomPermissions('console', ['myExtra']);
}
```

## Translations

Translations live in `lang/` and are auto-namespaced under your plugin id:

```php
trans('my-plugin::strings.welcome')
// → plugins/my-plugin/lang/strings.php → 'welcome'
```

Set `"category": "language"` in `plugin.json` if the plugin adds default panel languages (no namespace wrapping in that case).

## Views

Views are namespaced the same way:

```php
view('my-plugin::my-view')
// → plugins/my-plugin/resources/views/my-view.blade.php
```

## Database seeder

Create `plugins/my-plugin/database/Seeder/MyPluginSeeder.php`:

```php
class MyPluginSeeder extends Seeder
{
    public function run(): void
    {
        // seed data here
    }
}
```

It runs automatically on install and when `php artisan db:seed` or `php artisan migrate --seed` is called.

## Publishing a plugin

1. Open `plugin.json` and **remove** the `meta` block (added internally by the panel).
2. Zip the entire plugin folder.
3. Share the zip — install via the panel UI Import button, or manually drop into `plugins/`.

Publish to the community at [github.com/pelican-dev/plugins](https://github.com/pelican-dev/plugins) or the `#plugins` channel on [Discord](https://discord.gg/pelican-panel).
