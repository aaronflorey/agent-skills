# Complete Plugin Walkthrough: Server Notes Plugin

This walkthrough demonstrates building a complete Pelican plugin from scratch. We'll create a "Server Notes" plugin that allows administrators and server owners to add notes to servers.

## 1. Scaffold the Plugin

Run in your Pelican installation directory:

```bash
php artisan p:plugin:make
```

Answer the prompts:
- **Plugin ID**: `server-notes`
- **Plugin Name**: `Server Notes`
- **Author**: Your Name
- **Namespace**: `YourName\ServerNotes`
- **Class Name**: `ServerNotesPlugin`

This creates:
```
plugins/server-notes/
├── plugin.json
├── config/
│   └── server-notes.php
└── src/
    ├── ServerNotesPlugin.php
    └── Providers/
        └── ServerNotesServiceProvider.php
```

## 2. Update plugin.json

Edit `plugins/server-notes/plugin.json`:

```json
{
    "id": "server-notes",
    "name": "Server Notes",
    "author": "Your Name",
    "version": "1.0.0",
    "description": "Add notes to servers for administrators and owners",
    "category": "plugin",
    "namespace": "YourName\\ServerNotes",
    "class": "ServerNotesPlugin",
    "panels": ["admin", "server"],
    "panel_version": "^1.2.0"
}
```

## 3. Create the Database Migration

Create `plugins/server-notes/database/migrations/001_create_server_notes_table.php`:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('server_notes', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('server_id');
            $table->unsignedInteger('author_id')->nullable();
            $table->text('content');
            $table->boolean('is_admin_only')->default(false);
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
        Schema::dropIfExists('server_notes');
    }
};
```

Run the migration:
```bash
php artisan migrate
```

## 4. Create the Model

Create `plugins/server-notes/src/Models/ServerNote.php`:

```php
<?php

namespace YourName\ServerNotes\Models;

use App\Models\Server;
use App\Models\User;
use Filament\Facades\Filament;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $server_id
 * @property ?int $author_id
 * @property string $content
 * @property bool $is_admin_only
 * @property Server $server
 * @property ?User $author
 */
class ServerNote extends Model
{
    protected $fillable = [
        'server_id',
        'author_id',
        'content',
        'is_admin_only',
    ];
    
    protected function casts(): array
    {
        return [
            'is_admin_only' => 'boolean',
        ];
    }
    
    protected static function boot(): void
    {
        parent::boot();
        
        static::creating(function (self $model) {
            $model->server_id ??= Filament::getTenant()?->getKey();
            $model->author_id ??= auth()->user()?->id;
        });
    }
    
    public function server(): BelongsTo
    {
        return $this->belongsTo(Server::class);
    }
    
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
```

## 5. Create the Policy

Create `plugins/server-notes/src/Policies/ServerNotePolicy.php`:

```php
<?php

namespace YourName\ServerNotes\Policies;

use App\Policies\DefaultAdminPolicies;

class ServerNotePolicy
{
    use DefaultAdminPolicies;
    
    protected string $modelName = 'server_note';
}
```

## 6. Create Admin Resource

Create `plugins/server-notes/src/Filament/Admin/Resources/ServerNotes/ServerNoteResource.php`:

```php
<?php

namespace YourName\ServerNotes\Filament\Admin\Resources\ServerNotes;

use YourName\ServerNotes\Filament\Admin\Resources\ServerNotes\Pages\ListServerNotes;
use YourName\ServerNotes\Filament\Admin\Resources\ServerNotes\Pages\CreateServerNote;
use YourName\ServerNotes\Filament\Admin\Resources\ServerNotes\Pages\EditServerNote;
use YourName\ServerNotes\Models\ServerNote;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;

class ServerNoteResource extends Resource
{
    protected static ?string $model = ServerNote::class;
    
    protected static string|\BackedEnum|null $navigationIcon = 'tabler-note';
    
    protected static string|\UnitEnum|null $navigationGroup = 'Management';
    
    public static function getNavigationLabel(): string
    {
        return 'Server Notes';
    }
    
    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Select::make('server_id')
                ->label('Server')
                ->required()
                ->relationship('server', 'name')
                ->searchable()
                ->preload(),
            
            Textarea::make('content')
                ->label('Note')
                ->required()
                ->rows(4)
                ->columnSpanFull(),
            
            Toggle::make('is_admin_only')
                ->label('Admin Only')
                ->helperText('Only visible to administrators')
                ->inline(false)
                ->default(false),
        ]);
    }
    
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('server.name')
                    ->label('Server')
                    ->sortable()
                    ->searchable(),
                
                TextColumn::make('content')
                    ->label('Note')
                    ->limit(50)
                    ->searchable(),
                
                TextColumn::make('author.username')
                    ->label('Author')
                    ->default('System')
                    ->sortable(),
                
                IconColumn::make('is_admin_only')
                    ->label('Admin Only')
                    ->boolean(),
                
                TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime()
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }
    
    public static function getPages(): array
    {
        return [
            'index' => ListServerNotes::route('/'),
            'create' => CreateServerNote::route('/create'),
            'edit' => EditServerNote::route('/{record}/edit'),
        ];
    }
}
```

## 7. Create Resource Pages

Create the three page files:

`plugins/server-notes/src/Filament/Admin/Resources/ServerNotes/Pages/ListServerNotes.php`:
```php
<?php

namespace YourName\ServerNotes\Filament\Admin\Resources\ServerNotes\Pages;

use YourName\ServerNotes\Filament\Admin\Resources\ServerNotes\ServerNoteResource;
use Filament\Resources\Pages\ListRecords;

class ListServerNotes extends ListRecords
{
    protected static string $resource = ServerNoteResource::class;
}
```

`plugins/server-notes/src/Filament/Admin/Resources/ServerNotes/Pages/CreateServerNote.php`:
```php
<?php

namespace YourName\ServerNotes\Filament\Admin\Resources\ServerNotes\Pages;

use YourName\ServerNotes\Filament\Admin\Resources\ServerNotes\ServerNoteResource;
use Filament\Resources\Pages\CreateRecord;

class CreateServerNote extends CreateRecord
{
    protected static string $resource = ServerNoteResource::class;
}
```

`plugins/server-notes/src/Filament/Admin/Resources/ServerNotes/Pages/EditServerNote.php`:
```php
<?php

namespace YourName\ServerNotes\Filament\Admin\Resources\ServerNotes\Pages;

use YourName\ServerNotes\Filament\Admin\Resources\ServerNotes\ServerNoteResource;
use Filament\Resources\Pages\EditRecord;

class EditServerNote extends EditRecord
{
    protected static string $resource = ServerNoteResource::class;
}
```

## 8. Create Server Panel Relation Manager

Create `plugins/server-notes/src/Filament/Server/Resources/Servers/RelationManagers/NoteRelationManager.php`:

```php
<?php

namespace YourName\ServerNotes\Filament\Server\Resources\Servers\RelationManagers;

use YourName\ServerNotes\Models\ServerNote;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\TextColumn;
use Filament\Actions\CreateAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;

class NoteRelationManager extends RelationManager
{
    protected static string $relationship = 'notes';
    
    public function table(Table $table): Table
    {
        return $table
            ->heading('Notes')
            ->modifyQueryUsing(function ($query) {
                // Hide admin-only notes from non-admins
                if (!auth()->user()->isRootAdmin()) {
                    $query->where('is_admin_only', false);
                }
            })
            ->columns([
                TextColumn::make('content')
                    ->label('Note')
                    ->limit(100),
                
                TextColumn::make('author.username')
                    ->label('Author')
                    ->default('System'),
                
                TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime()
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->headerActions([
                CreateAction::make(),
            ])
            ->recordActions([
                EditAction::make()
                    ->authorize(fn (ServerNote $record) => 
                        $record->author_id === auth()->id() || auth()->user()->isRootAdmin()
                    ),
                DeleteAction::make()
                    ->authorize(fn (ServerNote $record) => 
                        $record->author_id === auth()->id() || auth()->user()->isRootAdmin()
                    ),
            ]);
    }
    
    public function form(Schema $schema): Schema
    {
        return $schema->components([
            Textarea::make('content')
                ->label('Note')
                ->required()
                ->rows(4)
                ->columnSpanFull(),
        ]);
    }
}
```

## 9. Update Service Provider

Edit `plugins/server-notes/src/Providers/ServerNotesServiceProvider.php`:

```php
<?php

namespace YourName\ServerNotes\Providers;

use App\Filament\Server\Resources\Servers\ServerResource;
use App\Models\Role;
use App\Models\Server;
use YourName\ServerNotes\Filament\Server\Resources\Servers\RelationManagers\NoteRelationManager;
use YourName\ServerNotes\Models\ServerNote;
use Illuminate\Support\ServiceProvider;

class ServerNotesServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Register admin permissions
        Role::registerCustomDefaultPermissions('server_note');
        Role::registerCustomModelIcon('server_note', 'tabler-note');
        
        // Register relation manager on ServerResource in server panel
        ServerResource::registerCustomRelations(NoteRelationManager::class);
    }
    
    public function boot(): void
    {
        // Add 'notes' relationship to Server model
        Server::resolveRelationUsing('notes', fn (Server $server) => 
            $server->hasMany(ServerNote::class, 'server_id', 'id')
        );
    }
}
```

## 10. Update Main Plugin Class

Edit `plugins/server-notes/src/ServerNotesPlugin.php`:

```php
<?php

namespace YourName\ServerNotes;

use Filament\Contracts\Plugin;
use Filament\Panel;

class ServerNotesPlugin implements Plugin
{
    public function getId(): string
    {
        return 'server-notes';
    }
    
    public function register(Panel $panel): void
    {
        $id = str($panel->getId())->title();
        
        $panel->discoverResources(
            plugin_path($this->getId(), "src/Filament/$id/Resources"),
            "YourName\\ServerNotes\\Filament\\$id\\Resources"
        );
    }
    
    public function boot(Panel $panel): void
    {
        //
    }
}
```

## 11. Test the Plugin

1. **Admin Panel**: Navigate to the admin panel → you should see "Server Notes" in the Management group
2. **Create a note**: Add a note to any server
3. **Server Panel**: Switch to a server's management panel → you should see the "Notes" tab
4. **Permissions**: Check that admin role permissions work (Settings → Roles → edit a role → check Server Note permissions)

## 12. Optional Enhancements

### Add Translations

Create `plugins/server-notes/lang/en/notes.php`:

```php
<?php

return [
    'note' => 'Note|Notes',
    'content' => 'Content',
    'admin_only' => 'Admin Only',
    'author' => 'Author',
    'created' => 'Created',
    'no_notes' => 'No notes yet',
];
```

Use in your resource:

```php
TextColumn::make('content')
    ->label(trans('server-notes::notes.content'))
```

### Add a Widget

Create a stats widget showing note counts for the admin dashboard.

This completes a fully functional Pelican plugin with admin and server panel integration!
