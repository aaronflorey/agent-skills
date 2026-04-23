# Clean Viper config pattern

Use this pattern when the user wants a maintainable setup rather than one-off `viper.Get*` calls spread through the app. The goal is to match Viper's README behavior while keeping application code typed, testable, and easy to reason about.

## Recommended package shape

```text
internal/config/
  config.go        // Config struct definitions
  load.go          // Load function and Viper bootstrap
  validate.go      // optional extra validation
```

Keep all Viper wiring in one place. The rest of the application should depend on a typed `Config`, not on direct `viper.Get` calls.

## Recommended loader flow

Write the loader in this order so the code reads the same way Viper applies configuration:

1. Create a dedicated instance with `viper.New()`.
2. Declare config-file name, type, and search paths.
3. Set defaults.
4. Configure environment handling.
5. Bind flags.
6. Read the config file.
7. Unmarshal into a typed struct.
8. Validate the resulting struct.

```go
func Load(fs *pflag.FlagSet) (Config, error) {
    v := viper.New()

    v.SetConfigName("config")
    v.SetConfigType("yaml")
    v.AddConfigPath(".")
    v.AddConfigPath("/etc/myapp")

    v.SetDefault("server.port", 8080)
    v.SetDefault("server.host", "127.0.0.1")

    v.SetEnvPrefix("MYAPP")
    v.SetEnvKeyReplacer(strings.NewReplacer(".", "_", "-", "_"))
    v.AutomaticEnv()

    _ = v.BindEnv("database.url")
    _ = bindFlags(v, fs)

    if err := v.ReadInConfig(); err != nil {
        var notFound viper.ConfigFileNotFoundError
        if !errors.As(err, &notFound) {
            return Config{}, err
        }
    }

    var cfg Config
    if err := v.Unmarshal(&cfg); err != nil {
        return Config{}, err
    }

    if err := validate(cfg); err != nil {
        return Config{}, err
    }

    return cfg, nil
}
```

## Why this structure stays clean

- One bootstrap path makes precedence easy to reason about.
- `Config` gives the rest of the app typed fields instead of stringly-typed lookups.
- `AutomaticEnv()` handles most keys, while `BindEnv()` covers special or documented keys.
- Explicit flag binding keeps CLI names ergonomic without flattening the config model.
- Validation stays separate from loading, which keeps failures clearer.

## Precedence reminder

Viper merges values in this order:

1. explicit `Set`
2. flags
3. environment variables
4. config file
5. remote key/value store
6. defaults

If a user asks why a value changed, explain it in terms of this order.

## Step-by-step guidance

### 1. Create a local Viper instance

Prefer:

```go
v := viper.New()
```

Avoid the package-level singleton unless the codebase already centers around it. Viper's own docs recommend initializing an instance and passing it around when needed. This keeps tests isolated and prevents hidden shared state.

### 2. Configure file loading first

Use `SetConfigName`, `SetConfigType` when needed, and `AddConfigPath` for each search location.

```go
v.SetConfigName("config")
v.SetConfigType("yaml")
v.AddConfigPath(".")
v.AddConfigPath("$HOME/.myapp")
v.AddConfigPath("/etc/myapp")
```

Use `SetConfigType` when the file has no extension or when the setup needs to make the expected format explicit.

#### Optional vs required config files

- If the app can boot from env, flags, and defaults alone, treat file absence as non-fatal.
- If the app requires a file, return the error directly.

Recommended optional-file handling:

```go
if err := v.ReadInConfig(); err != nil {
    var notFound viper.ConfigFileNotFoundError
    if !errors.As(err, &notFound) {
        return Config{}, fmt.Errorf("read config: %w", err)
    }
}
```

This preserves parse errors and permission errors instead of silently ignoring them.

### 3. Set defaults for stable local development

Defaults should make the app predictable, not hide required secrets.

Good defaults:

```go
v.SetDefault("server.host", "127.0.0.1")
v.SetDefault("server.port", 8080)
v.SetDefault("log.level", "info")
```

Usually avoid defaults for credentials, tokens, and production-only values.

### 4. Configure environment variables intentionally

The README-supported building blocks are:

- `SetEnvPrefix`
- `SetEnvKeyReplacer`
- `AutomaticEnv`
- `BindEnv`
- `AllowEmptyEnv`

Recommended baseline:

```go
v.SetEnvPrefix("MYAPP")
v.SetEnvKeyReplacer(strings.NewReplacer(".", "_", "-", "_"))
v.AutomaticEnv()
```

This gives predictable mappings such as:

- `server.port` -> `MYAPP_SERVER_PORT`
- `log.level` -> `MYAPP_LOG_LEVEL`
- `http-read-timeout` -> `MYAPP_HTTP_READ_TIMEOUT`

Use `BindEnv` when:

- the key is especially important and should be documented explicitly
- the env var name must differ from the normal transformed key
- a legacy env var must be preserved

Examples:

```go
_ = v.BindEnv("database.url")
_ = v.BindEnv("server.port", "APP_PORT")
```

Important behavior to surface:

- Env vars are case-sensitive.
- Viper reads env vars when accessed; it does not cache their values at bind time.
- If you pass an explicit env var name to `BindEnv`, Viper does not prepend the prefix automatically.
- Empty env vars fall through to lower-precedence sources unless `AllowEmptyEnv(true)` is enabled.

### 5. Bind flags to structured keys

Viper works well with `pflag` and Cobra, but clean code usually avoids making CLI flag names identical to config keys.

Prefer this pattern:

```go
fs.String("server-host", "127.0.0.1", "HTTP server host")
fs.Int("server-port", 8080, "HTTP server port")

_ = v.BindPFlag("server.host", fs.Lookup("server-host"))
_ = v.BindPFlag("server.port", fs.Lookup("server-port"))
```

Why this is cleaner than blind `BindPFlags()`:

- CLI flags stay user-friendly.
- Config keys remain nested and semantically grouped.
- The typed struct and config file shape stay aligned.

Use `BindPFlags()` when the flag names already intentionally match the config keys or when the app is small enough that bulk binding stays obvious.

### 6. Unmarshal once, then use typed config

After all sources are wired up, unmarshal into a struct:

```go
type Config struct {
    Server struct {
        Host string `mapstructure:"host"`
        Port int    `mapstructure:"port"`
    } `mapstructure:"server"`
}

var cfg Config
if err := v.Unmarshal(&cfg); err != nil {
    return Config{}, err
}
```

Prefer using `mapstructure` tags when file keys do not directly map to Go field names.

### 7. Validate after unmarshal

Viper loads values; it does not guarantee your business constraints are valid.

Add a validation step after unmarshaling for things like:

- required URLs
- legal port ranges
- mutually exclusive settings
- minimum durations or limits

Keep that logic outside the Viper bootstrap so load failures stay easy to diagnose.

## Shape the config for all three sources

Choose one canonical config structure and map every source into it.

Example canonical structure:

```yaml
server:
  host: 127.0.0.1
  port: 8080
database:
  url: postgres://localhost/myapp
```

Recommended source mappings:

- file keys: `server.port`
- env vars: `MYAPP_SERVER_PORT`
- flags: `--server-port`

That gives one mental model even though each source has a slightly different syntax.

## Cobra pattern

For Cobra apps, put Viper binding near the command setup, but keep `Config` loading in a dedicated package.

Typical approach:

1. define flags on the command
2. parse command input
3. call `config.Load(cmd.Flags())`
4. pass the typed config to the service layer

This keeps Cobra-specific concerns out of business logic.

## Common pitfalls

### Pitfall: calling `Get*` all over the app

This creates hidden runtime dependencies and makes testing harder. Prefer one load phase and a typed struct.

### Pitfall: assuming deep merge

Viper does not deep-merge complex values. If a later source overrides a map or slice, it may replace the whole value.

### Pitfall: ignoring config file errors broadly

Only ignore `ConfigFileNotFoundError` when missing config is acceptable. Do not swallow malformed YAML or permission failures.

### Pitfall: relying on implicit env key mapping without a replacer

Nested keys like `server.port` usually need `SetEnvKeyReplacer(strings.NewReplacer(".", "_"))` so env var naming is predictable.

### Pitfall: watching config before paths are set

Add all config paths before `WatchConfig()`.

### Pitfall: concurrent reads and writes

Viper is not safe for concurrent read/write access without your own synchronization.

## Testing guidance

For testable config loading:

- accept a `*pflag.FlagSet` rather than using `pflag.CommandLine` directly
- keep path setup centralized so tests can point at a temp directory
- return `Config` from `Load` and keep direct Viper access optional
- use table tests that vary defaults, file contents, env vars, and flags

If the user asks for tests, write cases around precedence, optional file behavior, and env/flag mapping.

## Notes worth surfacing

- Prefer a local `*viper.Viper` instance over the package singleton for testability.
- For nested keys, prefer explicit bindings like `BindPFlag("server.port", fs.Lookup("server-port"))` so friendly CLI flag names still land on structured config keys.
- `ReadInConfig()` should happen after defaults and bindings are prepared, before `Unmarshal()`.
- `WatchConfig()` only makes sense after all config paths are added.
- Empty env vars are treated as unset unless `AllowEmptyEnv(true)` is used.
