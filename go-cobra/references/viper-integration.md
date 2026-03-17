# Cobra + Viper Integration

Viper provides configuration management for Cobra CLIs, supporting config files, environment variables, and flag binding with a unified API.

## Installation

```bash
go get github.com/spf13/viper
```

## Basic Setup Pattern

The standard pattern initializes Viper in `cobra.OnInitialize`:

```go
package cmd

import (
    "fmt"
    "os"

    "github.com/spf13/cobra"
    "github.com/spf13/viper"
)

var cfgFile string

var rootCmd = &cobra.Command{
    Use:   "myapp",
    Short: "My application",
}

func Execute() error {
    return rootCmd.Execute()
}

func init() {
    // Run initConfig before any command executes
    cobra.OnInitialize(initConfig)

    // Config file flag
    rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", 
        "config file (default is $HOME/.myapp.yaml)")
}

func initConfig() {
    if cfgFile != "" {
        // Use config file from flag
        viper.SetConfigFile(cfgFile)
    } else {
        // Find home directory
        home, err := os.UserHomeDir()
        cobra.CheckErr(err)

        // Search for config in home directory
        viper.AddConfigPath(home)
        viper.AddConfigPath(".")           // Also check current directory
        viper.SetConfigType("yaml")
        viper.SetConfigName(".myapp")      // .myapp.yaml
    }

    // Read environment variables
    viper.AutomaticEnv()

    // Read config file (ignore if not found)
    if err := viper.ReadInConfig(); err == nil {
        fmt.Fprintln(os.Stderr, "Using config file:", viper.ConfigFileUsed())
    }
}
```

## Binding Flags to Viper

### Basic Flag Binding

```go
func init() {
    rootCmd.PersistentFlags().StringP("author", "a", "YOUR NAME", "author name")
    viper.BindPFlag("author", rootCmd.PersistentFlags().Lookup("author"))
    
    // Set defaults in Viper
    viper.SetDefault("author", "Default Author")
}

func runCommand(cmd *cobra.Command, args []string) {
    // Get value - checks: flag > env > config > default
    author := viper.GetString("author")
    fmt.Println("Author:", author)
}
```

### Binding All Flags

```go
func init() {
    rootCmd.Flags().String("output", "json", "output format")
    rootCmd.Flags().Int("timeout", 30, "timeout in seconds")
    
    // Bind all flags at once
    viper.BindPFlags(rootCmd.Flags())
}
```

### Important: Flag Variables Won't Update

When using `StringVar` with Viper binding, the Go variable is NOT updated from config:

```go
var author string

func init() {
    // author variable only gets CLI flag value, not config/env
    rootCmd.PersistentFlags().StringVar(&author, "author", "", "author name")
    viper.BindPFlag("author", rootCmd.PersistentFlags().Lookup("author"))
}

func run(cmd *cobra.Command, args []string) {
    // WRONG: author may be empty even if set in config
    fmt.Println(author)
    
    // CORRECT: always use viper.Get* for bound flags
    fmt.Println(viper.GetString("author"))
}
```

## Environment Variable Binding

### Automatic Environment Variables

```go
func initConfig() {
    // Automatically read MYAPP_* environment variables
    viper.SetEnvPrefix("MYAPP")  // MYAPP_DATABASE_HOST
    viper.AutomaticEnv()
    
    // Replace dots/dashes with underscores for env var names
    viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_", "-", "_"))
}
```

### Explicit Environment Binding

```go
func init() {
    rootCmd.Flags().String("database-host", "localhost", "database host")
    viper.BindPFlag("database.host", rootCmd.Flags().Lookup("database-host"))
    
    // Explicitly bind to environment variable
    viper.BindEnv("database.host", "DB_HOST")  // Uses DB_HOST env var
}
```

## Configuration Priority

Viper uses this priority order (highest to lowest):

1. **Explicit Set** - `viper.Set("key", value)`
2. **Flags** - Command-line flags bound with `BindPFlag`
3. **Environment** - Environment variables
4. **Config File** - Values from config file
5. **Key/Value Store** - Remote config (Consul, etcd)
6. **Defaults** - `viper.SetDefault("key", value)`

## Nested Configuration

### Config File (config.yaml)

```yaml
database:
  host: localhost
  port: 5432
  user: admin

logging:
  level: info
  format: json
```

### Accessing Nested Values

```go
func init() {
    // Bind flag to nested config path
    rootCmd.Flags().String("db-host", "", "database host")
    viper.BindPFlag("database.host", rootCmd.Flags().Lookup("db-host"))
}

func run(cmd *cobra.Command, args []string) {
    // Access nested values with dot notation
    host := viper.GetString("database.host")
    port := viper.GetInt("database.port")
    
    // Get entire section as map
    dbConfig := viper.GetStringMap("database")
    
    // Or unmarshal to struct
    var db DatabaseConfig
    viper.UnmarshalKey("database", &db)
}
```

## Unmarshaling to Structs

### Define Config Struct

```go
type Config struct {
    Database struct {
        Host     string `mapstructure:"host"`
        Port     int    `mapstructure:"port"`
        User     string `mapstructure:"user"`
        Password string `mapstructure:"password"`
    } `mapstructure:"database"`
    
    Logging struct {
        Level  string `mapstructure:"level"`
        Format string `mapstructure:"format"`
    } `mapstructure:"logging"`
    
    Debug bool `mapstructure:"debug"`
}

var config Config

func initConfig() {
    // ... standard viper setup ...
    
    if err := viper.ReadInConfig(); err != nil {
        if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
            cobra.CheckErr(err)
        }
    }
    
    // Unmarshal entire config
    if err := viper.Unmarshal(&config); err != nil {
        cobra.CheckErr(err)
    }
}
```

## Multiple Config File Formats

Viper supports: JSON, TOML, YAML, HCL, INI, envfile, Java properties

```go
func initConfig() {
    viper.SetConfigName("config")  // Name without extension
    viper.SetConfigType("yaml")    // Default type if no extension
    
    viper.AddConfigPath("/etc/myapp/")
    viper.AddConfigPath("$HOME/.myapp")
    viper.AddConfigPath(".")
    
    // Viper will try: config.yaml, config.json, config.toml, etc.
}
```

## Writing Config Files

```go
var saveConfigCmd = &cobra.Command{
    Use:   "save-config",
    Short: "Save current configuration to file",
    RunE: func(cmd *cobra.Command, args []string) error {
        // Write current config to file
        return viper.WriteConfigAs("./config.yaml")
        
        // Or SafeWriteConfig (won't overwrite existing)
        // return viper.SafeWriteConfig()
    },
}
```

## Watching Config Changes

```go
func initConfig() {
    // ... standard setup ...
    
    viper.WatchConfig()
    viper.OnConfigChange(func(e fsnotify.Event) {
        fmt.Println("Config file changed:", e.Name)
        // Re-unmarshal if using structs
        viper.Unmarshal(&config)
    })
}
```

## Complete Example

```go
package cmd

import (
    "fmt"
    "os"
    "strings"

    "github.com/spf13/cobra"
    "github.com/spf13/viper"
)

type AppConfig struct {
    Server struct {
        Host string `mapstructure:"host"`
        Port int    `mapstructure:"port"`
    } `mapstructure:"server"`
    Debug   bool   `mapstructure:"debug"`
    LogLevel string `mapstructure:"log_level"`
}

var (
    cfgFile string
    config  AppConfig
)

var rootCmd = &cobra.Command{
    Use:   "myapp",
    Short: "My application",
    PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
        // Unmarshal after all flags are parsed
        return viper.Unmarshal(&config)
    },
}

var serveCmd = &cobra.Command{
    Use:   "serve",
    Short: "Start the server",
    Run: func(cmd *cobra.Command, args []string) {
        fmt.Printf("Starting server on %s:%d\n", 
            config.Server.Host, config.Server.Port)
        fmt.Printf("Debug: %v, LogLevel: %s\n", 
            config.Debug, config.LogLevel)
    },
}

func init() {
    cobra.OnInitialize(initConfig)

    // Global flags
    rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", 
        "config file (default: $HOME/.myapp.yaml)")
    rootCmd.PersistentFlags().Bool("debug", false, "enable debug mode")
    rootCmd.PersistentFlags().String("log-level", "info", "log level")

    // Bind to viper with config-friendly names
    viper.BindPFlag("debug", rootCmd.PersistentFlags().Lookup("debug"))
    viper.BindPFlag("log_level", rootCmd.PersistentFlags().Lookup("log-level"))

    // Server command flags
    serveCmd.Flags().String("host", "localhost", "server host")
    serveCmd.Flags().Int("port", 8080, "server port")
    
    viper.BindPFlag("server.host", serveCmd.Flags().Lookup("host"))
    viper.BindPFlag("server.port", serveCmd.Flags().Lookup("port"))

    // Defaults
    viper.SetDefault("server.host", "localhost")
    viper.SetDefault("server.port", 8080)
    viper.SetDefault("log_level", "info")

    rootCmd.AddCommand(serveCmd)
}

func initConfig() {
    if cfgFile != "" {
        viper.SetConfigFile(cfgFile)
    } else {
        home, err := os.UserHomeDir()
        cobra.CheckErr(err)

        viper.AddConfigPath(home)
        viper.AddConfigPath(".")
        viper.SetConfigType("yaml")
        viper.SetConfigName(".myapp")
    }

    // Environment variables: MYAPP_SERVER_HOST, MYAPP_DEBUG, etc.
    viper.SetEnvPrefix("MYAPP")
    viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_", "-", "_"))
    viper.AutomaticEnv()

    if err := viper.ReadInConfig(); err == nil {
        fmt.Fprintln(os.Stderr, "Using config file:", viper.ConfigFileUsed())
    }
}

func Execute() error {
    return rootCmd.Execute()
}
```

### Example Config File (.myapp.yaml)

```yaml
debug: false
log_level: warn

server:
  host: 0.0.0.0
  port: 3000
```

### Usage

```bash
# Use defaults
myapp serve

# Override with flags
myapp serve --host 127.0.0.1 --port 9000 --debug

# Override with environment
MYAPP_SERVER_PORT=4000 MYAPP_DEBUG=true myapp serve

# Use specific config file
myapp --config /path/to/config.yaml serve
```

## Best Practices

1. **Always use `viper.Get*()` for bound flags** - Don't rely on flag variables when using Viper binding

2. **Use `PersistentPreRunE` for config validation** - Unmarshal and validate before commands run

3. **Set sensible defaults** - Use `viper.SetDefault()` for all configuration values

4. **Use consistent naming** - Map flag names (`--log-level`) to config keys (`log_level`) consistently

5. **Document config precedence** - Make clear to users that flags > env > config file

6. **Handle missing config gracefully** - Config file should be optional for most CLIs

7. **Use env prefix** - Avoid conflicts with `viper.SetEnvPrefix("MYAPP")`
