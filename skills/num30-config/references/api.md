# num30/config API Reference

## Package: `github.com/num30/config`

### `NewConfReader(configName string) *ConfReader`
Creates a new ConfReader instance.
- `configName`: used as the config file name (without extension) and the base for env var discovery

### `(*ConfReader) Read(configStruct interface{}) error`
Reads config from all sources into the provided struct pointer.
- Must pass a non-nil pointer to a struct
- Applies defaults, reads file, env vars, flags, then validates
- Sets `c.configStruct` so `Watch()` can reload later

### `(*ConfReader) WithSearchDirs(dirs ...string) *ConfReader`
Override the config file search directories (default: home dir + `./`).

### `(*ConfReader) WithPrefix(prefix string) *ConfReader`
Set a prefix for all environment variable lookups. Automatically appends `_`.
- `WithPrefix("MYAPP")` → looks for `MYAPP_DB_HOST` instead of `DB_HOST`

### `(*ConfReader) Watch() *sync.RWMutex`
Watches the config file for changes and reloads automatically.
- **Must be called after `Read()`** — panics otherwise
- Returns a `*sync.RWMutex` for thread-safe config access
- Use `mutex.RLock()` / `mutex.RUnlock()` when reading config concurrently

### `ConfReader` Fields
- `Verbose bool` — enable debug logging of struct field traversal

---

## Package: `github.com/num30/config/lib`

### `PostgresqlDb`
Pre-built config struct for PostgreSQL connections.

```go
type PostgresqlDb struct {
    Host       string `default:"localhost"`
    Password   string `default:"pass"`
    DbName     string
    Username   string `default:"postgres"`
    Port       int    `default:"5432"`
    SslEnabled bool   `default:"false"`
}
```

### `(*PostgresqlDb) GetConnString() string`
Returns a formatted DSN connection string:
```
host=<Host> user=<Username> password=<Password> database=<DbName> port=<Port> sslmode=<disable|enable>
```

---

## Supported Config File Formats

Powered by [viper](https://github.com/spf13/viper): JSON, TOML, YAML, HCL, INI, envfile, Java Properties

## Field Name Mapping Rules

| Go field path | Config file key | Env var (no prefix) | CLI flag |
|---------------|----------------|---------------------|----------|
| `Host` | `host` | `HOST` | `--host` |
| `DB.Host` | `db.host` or `db:\n  host:` | `DB_HOST` | `--db.host` |
| `App.Server.Port` | `app.server.port` | `APP_SERVER_PORT` | `--app.server.port` |
| `GlobalConfig` (squashed) | field name directly | field name directly | field name directly |

## Dependencies
- [viper](https://github.com/spf13/viper) — config file reading
- [enviper](https://github.com/iamolegga/enviper) — env var support with viper
- [defaults](https://github.com/creasty/defaults) — struct default values
- [pflag](https://github.com/spf13/pflag) — POSIX/GNU-style flags
- [validator](https://github.com/go-playground/validator) — struct validation
