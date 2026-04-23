# Advanced Cobra Patterns

## Nested Subcommands (Large Apps)

For large applications, organize commands in separate packages:

```
cmd/
├── root.go
├── config/
│   ├── config.go      # configCmd parent
│   ├── get.go         # config get
│   ├── set.go         # config set
│   └── list.go        # config list
└── server/
    ├── server.go      # serverCmd parent
    ├── start.go       # server start
    └── stop.go        # server stop
```

### Implementation

```go
// cmd/config/config.go
package config

import "github.com/spf13/cobra"

var Cmd = &cobra.Command{
    Use:   "config",
    Short: "Manage configuration",
}

func init() {
    Cmd.AddCommand(getCmd)
    Cmd.AddCommand(setCmd)
    Cmd.AddCommand(listCmd)
}
```

```go
// cmd/config/get.go
package config

import (
    "fmt"
    "github.com/spf13/cobra"
)

var getCmd = &cobra.Command{
    Use:   "get KEY",
    Short: "Get a config value",
    Args:  cobra.ExactArgs(1),
    Run: func(cmd *cobra.Command, args []string) {
        fmt.Printf("Getting: %s\n", args[0])
    },
}
```

```go
// cmd/root.go
package cmd

import (
    "myapp/cmd/config"
    "myapp/cmd/server"
)

func init() {
    rootCmd.AddCommand(config.Cmd)
    rootCmd.AddCommand(server.Cmd)
}
```

---

## Cobra-CLI Generator

Scaffold commands quickly:

```bash
# Initialize project
cobra-cli init myapp

# Add commands
cobra-cli add serve
cobra-cli add config
cobra-cli add config/get   # Nested under config
```

---

## I/O Streams

### Custom Input/Output

```go
cmd.SetIn(customReader)
cmd.SetOut(customWriter)
cmd.SetErr(customErrorWriter)

// In Run function
reader := cmd.InOrStdin()
writer := cmd.OutOrStdout()
errWriter := cmd.ErrOrStderr()
```

### For Testing

```go
func TestCommand(t *testing.T) {
    cmd := NewRootCmd()
    
    in := strings.NewReader("input data\n")
    out := new(bytes.Buffer)
    errOut := new(bytes.Buffer)
    
    cmd.SetIn(in)
    cmd.SetOut(out)
    cmd.SetErr(errOut)
    cmd.SetArgs([]string{"subcommand", "--flag"})
    
    err := cmd.Execute()
    
    assert.NoError(t, err)
    assert.Contains(t, out.String(), "expected output")
}
```

---

## Persistent State Across Commands

### Using Closures

```go
func NewRootCmd() *cobra.Command {
    var cfg Config  // Shared state
    
    rootCmd := &cobra.Command{
        Use: "app",
        PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
            return cfg.Load()
        },
    }
    
    // Pass cfg to subcommands
    rootCmd.AddCommand(newServeCmd(&cfg))
    rootCmd.AddCommand(newConfigCmd(&cfg))
    
    return rootCmd
}

func newServeCmd(cfg *Config) *cobra.Command {
    return &cobra.Command{
        Use: "serve",
        Run: func(cmd *cobra.Command, args []string) {
            // Access cfg here
            serve(cfg)
        },
    }
}
```

### Using Context

```go
type ctxKey string

const configKey ctxKey = "config"

var rootCmd = &cobra.Command{
    Use: "app",
    PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
        cfg, err := loadConfig()
        if err != nil {
            return err
        }
        ctx := context.WithValue(cmd.Context(), configKey, cfg)
        cmd.SetContext(ctx)
        return nil
    },
}

var serveCmd = &cobra.Command{
    Use: "serve",
    Run: func(cmd *cobra.Command, args []string) {
        cfg := cmd.Context().Value(configKey).(*Config)
        serve(cfg)
    },
}
```

---

## Command Interceptors/Middleware

### Wrap All Commands

```go
func wrapCommand(cmd *cobra.Command) {
    if cmd.Run != nil {
        originalRun := cmd.Run
        cmd.Run = func(c *cobra.Command, args []string) {
            // Before
            startTime := time.Now()
            
            originalRun(c, args)
            
            // After
            log.Printf("Command took %v", time.Since(startTime))
        }
    }
    
    for _, child := range cmd.Commands() {
        wrapCommand(child)
    }
}

func init() {
    wrapCommand(rootCmd)
}
```

---

## Error Handling Strategies

### Custom Error Types

```go
type UserError struct {
    Msg string
}

func (e *UserError) Error() string {
    return e.Msg
}

var rootCmd = &cobra.Command{
    Use: "app",
    SilenceErrors: true,  // We'll handle errors ourselves
    SilenceUsage:  true,
}

func Execute() {
    if err := rootCmd.Execute(); err != nil {
        switch e := err.(type) {
        case *UserError:
            fmt.Fprintf(os.Stderr, "Error: %s\n", e.Msg)
            os.Exit(1)
        default:
            fmt.Fprintf(os.Stderr, "Internal error: %v\n", err)
            os.Exit(2)
        }
    }
}
```

### Error Prefix

```go
cmd.SetErrPrefix("myapp error:")
// Output: myapp error: something went wrong
```

---

## Flag Inheritance Edge Cases

### TraverseChildren

By default, parent local flags aren't parsed for child commands. Enable with:

```go
rootCmd.TraverseChildren = true
```

This parses flags on all parents before executing the child.

### Persistent Flag Lookup

```go
// In a subcommand, get parent's persistent flag
val, _ := cmd.Flags().GetString("config")

// Or directly from parent
val, _ := cmd.Root().PersistentFlags().GetString("config")
```

---

## OnInitialize and OnFinalize

Run code at specific lifecycle points:

```go
func init() {
    // Runs AFTER flags are parsed, BEFORE Run
    cobra.OnInitialize(initConfig, initLogger)
    
    // Runs AFTER command execution
    cobra.OnFinalize(cleanup)
}

func initConfig() {
    // Access flags here - they're parsed
    viper.SetConfigFile(cfgFile)
    viper.ReadInConfig()
}

func cleanup() {
    // Close connections, flush logs, etc.
}
```

---

## Hidden Features

### Suggest Alternative Commands

```go
deleteCmd.SuggestFor = []string{"remove", "rm"}
// Now "app remove" suggests "app delete"
```

### Command Annotations

```go
cmd.Annotations = map[string]string{
    "category": "admin",
    "since":    "v1.2.0",
}

// Access in templates or code
if cmd.Annotations["category"] == "admin" {
    // ...
}
```

### Disable Flag Parsing

Pass all args as-is to the command:

```go
cmd.DisableFlagParsing = true

// Now in Run, args contains everything including --flags
Run: func(cmd *cobra.Command, args []string) {
    // args might be ["--some-flag", "value", "positional"]
}
```

---

## Windows-Specific

### Mousetrap

Prevents confusion when double-clicking the exe:

```go
// Customize the message
cobra.MousetrapHelpText = `This is a command line tool.
Please open cmd.exe or PowerShell to use it.`

// Disable entirely
cobra.MousetrapHelpText = ""

// Change display duration
cobra.MousetrapDisplayDuration = 10 * time.Second
```

---

## Template Customization

### Add Template Functions

```go
cobra.AddTemplateFunc("toUpper", strings.ToUpper)
cobra.AddTemplateFuncs(template.FuncMap{
    "join": strings.Join,
    "wrap": wordwrap.String,
})
```

### Available Template Data

In help/usage templates, these fields are available:

```go
{{.Use}}           // Command usage
{{.Short}}         // Short description
{{.Long}}          // Long description
{{.Example}}       // Examples
{{.Commands}}      // Child commands
{{.LocalFlags}}    // Local flags
{{.InheritedFlags}} // Parent flags
{{.HasSubCommands}}
{{.HasParent}}
{{.CommandPath}}   // Full command path
{{.UseLine}}       // Usage line with flags
```

### Custom Help Template

```go
const customHelp = `{{.Short}}

Usage:
  {{.UseLine}}{{if .HasAvailableSubCommands}}

Commands:{{range .Commands}}{{if .IsAvailableCommand}}
  {{.Name | printf "%-15s"}} {{.Short}}{{end}}{{end}}{{end}}{{if .HasAvailableLocalFlags}}

Flags:
{{.LocalFlags.FlagUsages | trimTrailingWhitespaces}}{{end}}
`

rootCmd.SetHelpTemplate(customHelp)
```

---

## Performance Tips

### Lazy Command Loading

For very large CLIs, load commands lazily:

```go
var rootCmd = &cobra.Command{Use: "app"}

func init() {
    // Only add commands that are commonly used
    rootCmd.AddCommand(commonCmd1)
    rootCmd.AddCommand(commonCmd2)
}

// Less common commands added via plugin or separate binary
```

### Disable Sorting

```go
cobra.EnableCommandSorting = false
// Commands appear in the order they were added
```

---

## Debugging

### Debug Flag Inheritance

```go
rootCmd.DebugFlags()
// Prints all flags and their sources
```

### Check Which Command Was Called

```go
cmd.CalledAs()  // Returns the name or alias used to call this command
```

### Find Commands

```go
// Get root command
root := cmd.Root()

// Find a specific command
found, _, _ := rootCmd.Find([]string{"config", "get"})
```
