# num30/config Usage Examples

## Basic: Single-File App Config

```go
package main

import (
    "fmt"
    "github.com/num30/config"
)

type Config struct {
    DB        Database `default:"{}"`
    DebugMode bool     `flag:"debug" usage:"enable verbose debug logging"`
}

type Database struct {
    Host     string `default:"localhost" validate:"required"`
    Password string `validate:"required" envvar:"DB_PASS"`
    DbName   string `default:"mydb"`
    Username string `default:"root"`
    Port     int    `default:"5432"`
}

func main() {
    var conf Config
    err := config.NewConfReader("myconf").Read(&conf)
    if err != nil {
        panic(err)
    }
    fmt.Printf("Config %+v", conf)
}
```

**myconf.yaml:**
```yaml
db:
  host: "db.example.com"
  dbName: "production"
```

**Set via env vars:**
```sh
DB_HOST=db.example.com DB_PASS=secret ./myapp
```

**Set via flags:**
```sh
./myapp --db.host=db.example.com --db.password=secret --debug
```

---

## With Env Var Prefix

```go
reader := config.NewConfReader("myapp").WithPrefix("MYAPP")
// Env var: MYAPP_DB_HOST (not DB_HOST)
```

---

## With Custom Search Dirs

```go
reader := config.NewConfReader("myapp").WithSearchDirs("/etc/myapp", "./config")
```

---

## Squashed Embedding

```go
type GlobalConfig struct {
    Verbose bool
    AppName string
}

type Config struct {
    GlobalConfig `mapstructure:",squash"` // verbose/appName at top level in config file
    DB Database
}
```

Config file (`myapp.yaml`):
```yaml
verbose: true
appName: "my-service"
db:
  host: "localhost"
```

Env vars: `VERBOSE=true`, `APPNAME=my-service` (not `GLOBALCONFIG_VERBOSE`)

---

## Struct with All Types

```go
import "time"

type AllTypesConfig struct {
    Bool     bool
    Int      int
    Int8     int8
    Int16    int16
    Int32    int32
    Int64    int64
    Uint     uint
    Uint32   uint32
    Uint64   uint64
    Float32  float32
    Float64  float64
    String   string
    Bytes    []byte        // CLI/env: base64-encoded
    Duration time.Duration // e.g., "10m", "1h30s"
    Slice    []string
}
```

**Set via CLI:**
```sh
./myapp --bool true --int 42 --float64 3.14 --string hello \
        --duration 10m --bytes dGVzdA== --slice a --slice b
```

**Set []byte via env var (base64):**
```sh
BYTES=$(echo -n "mysecret" | base64) ./myapp
```

---

## Slice Configuration

```go
type Config struct {
    AllowedHosts []string
}
```

| Source | Format |
|--------|--------|
| Config file | `allowedHosts: ["a.com", "b.com"]` |
| Env var | `ALLOWEDHOSTS=a.com,b.com` |
| CLI flags | `--allowedhosts a.com --allowedhosts b.com` |

---

## Validation

```go
type Config struct {
    Host  string `validate:"required"`
    Port  int    `validate:"min=1,max=65535"`
    Mode  string `validate:"oneof=debug info warn error"`
    Email string `validate:"omitempty,email"`
}

err := config.NewConfReader("myapp").Read(&cfg)
if err != nil {
    // err contains: "validation error: Key: 'Config.Host' Error:Field validation for 'Host' failed on the 'required' tag"
    log.Fatal(err)
}
```

---

## Live Config Reloading with Watch

```go
var cfg MyConfig
reader := config.NewConfReader("myapp").WithSearchDirs("./config")
if err := reader.Read(&cfg); err != nil {
    panic(err)
}

mutex := reader.Watch()

// In your handler or goroutine:
go func() {
    for {
        mutex.RLock()
        host := cfg.DB.Host  // safe to read
        mutex.RUnlock()
        
        // use host...
        time.Sleep(time.Second)
    }
}()
```

---

## Using lib.PostgresqlDb

```go
import (
    "github.com/num30/config"
    "github.com/num30/config/lib"
)

type Config struct {
    DB lib.PostgresqlDb
}

func main() {
    var cfg Config
    if err := config.NewConfReader("myapp").Read(&cfg); err != nil {
        panic(err)
    }

    db, err := sql.Open("postgres", cfg.DB.GetConnString())
    // ...
}
```

**myapp.yaml:**
```yaml
db:
  host: "prod-db.example.com"
  dbName: "myapp"
  username: "appuser"
  sslEnabled: true
```

Env vars: `DB_PASSWORD=secret` (or `DB_PASS` with `envvar:"DB_PASS"` tag on custom struct)

---

## Flag Name Override

```go
type Config struct {
    DebugMode bool          `flag:"debug" usage:"enable debug mode"`
    LogLevel  string        `flag:"log-level" default:"info" usage:"log verbosity"`
    NestedVal string        `flag:"nested"`         // accessed as --nested not --foo.nestedval
}
```

```sh
./myapp --debug --log-level=warn --nested=foo
```

---

## Error Handling Patterns

```go
var cfg Config
err := config.NewConfReader("myapp").Read(&cfg)
if err != nil {
    switch {
    case strings.Contains(err.Error(), "validation error"):
        log.Fatalf("invalid config: %v", err)
    case strings.Contains(err.Error(), "failed to unmarshal"):
        log.Fatalf("malformed config file: %v", err)
    default:
        log.Fatalf("config error: %v", err)
    }
}
```
