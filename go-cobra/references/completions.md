# Shell Completions

Cobra provides powerful shell completion support for Bash, Zsh, Fish, and PowerShell.

## Automatic Completion Command

Cobra automatically adds a `completion` command to your application. If there are no other subcommands, it will be hidden but still functional.

## Basic Setup Per Shell

### Bash

```bash
# Load for current session
source <(myapp completion bash)

# Install permanently (Linux)
myapp completion bash > /etc/bash_completion.d/myapp

# Install permanently (macOS with Homebrew)
myapp completion bash > $(brew --prefix)/etc/bash_completion.d/myapp
```

Requires `bash_completion` package to be installed.

### Zsh

```bash
# Enable completion (add to ~/.zshrc if not already)
echo "autoload -U compinit; compinit" >> ~/.zshrc

# Install completion
myapp completion zsh > "${fpath[1]}/_myapp"

# Restart shell
```

### Fish

```bash
# Load for current session
myapp completion fish | source

# Install permanently
myapp completion fish > ~/.config/fish/completions/myapp.fish
```

### PowerShell

```powershell
# Load for current session
myapp completion powershell | Out-String | Invoke-Expression

# Install permanently (add to $Profile)
myapp completion powershell > myapp.ps1
# Then source from PowerShell profile
```

---

## Static Completions (ValidArgs)

For known, fixed completion values:

```go
var colorCmd = &cobra.Command{
    Use:       "color [red|green|blue]",
    Short:     "Pick a color",
    ValidArgs: []string{"red", "green", "blue"},
    Args:      cobra.OnlyValidArgs,
    Run: func(cmd *cobra.Command, args []string) {
        fmt.Printf("You picked: %s\n", args[0])
    },
}
```

### With Descriptions

```go
ValidArgs: []cobra.Completion{
    cobra.CompletionWithDesc("red", "A warm color"),
    cobra.CompletionWithDesc("green", "The color of nature"),
    cobra.CompletionWithDesc("blue", "A cool color"),
}
```

### Aliases

```go
ValidArgs:  []string{"pod", "node", "service"},
ArgAliases: []string{"pods", "nodes", "services", "svc"},
```

Aliases are accepted but not shown in completions (shown only when no other matches).

---

## Dynamic Completions (ValidArgsFunction)

For runtime-determined completions:

```go
var statusCmd = &cobra.Command{
    Use:   "status RELEASE_NAME",
    Short: "Show release status",
    ValidArgsFunction: func(cmd *cobra.Command, args []string, toComplete string) ([]cobra.Completion, cobra.ShellCompDirective) {
        if len(args) != 0 {
            // Only complete first argument
            return nil, cobra.ShellCompDirectiveNoFileComp
        }
        
        // Fetch releases from cluster/database/etc
        releases := getReleasesFromCluster(toComplete)
        return releases, cobra.ShellCompDirectiveNoFileComp
    },
    Run: func(cmd *cobra.Command, args []string) {
        // ...
    },
}
```

### ShellCompDirective Values

| Directive | Effect |
|-----------|--------|
| `ShellCompDirectiveDefault` | Shell's default behavior (file completion) |
| `ShellCompDirectiveError` | An error occurred, ignore completions |
| `ShellCompDirectiveNoSpace` | Don't add space after completion |
| `ShellCompDirectiveNoFileComp` | Don't fall back to file completion |
| `ShellCompDirectiveFilterFileExt` | Filter files by extension |
| `ShellCompDirectiveFilterDirs` | Only complete directories |
| `ShellCompDirectiveKeepOrder` | Preserve completion order |

Combine with bitwise OR:
```go
return completions, cobra.ShellCompDirectiveNoSpace | cobra.ShellCompDirectiveNoFileComp
```

### With Descriptions

```go
ValidArgsFunction: func(cmd *cobra.Command, args []string, toComplete string) ([]cobra.Completion, cobra.ShellCompDirective) {
    return []cobra.Completion{
        cobra.CompletionWithDesc("harbor", "An image registry"),
        cobra.CompletionWithDesc("prometheus", "Metrics server"),
    }, cobra.ShellCompDirectiveNoFileComp
}
```

---

## Flag Completions

### Dynamic Flag Values

```go
cmd.Flags().String("output", "", "Output format")
cmd.RegisterFlagCompletionFunc("output", func(cmd *cobra.Command, args []string, toComplete string) ([]cobra.Completion, cobra.ShellCompDirective) {
    return []cobra.Completion{"json", "yaml", "table"}, cobra.ShellCompDirectiveDefault
})
```

### File Extension Filtering

```go
// Method 1: MarkFlagFilename
cmd.MarkFlagFilename("config", "yaml", "yml", "json")

// Method 2: RegisterFlagCompletionFunc
cmd.RegisterFlagCompletionFunc("config", func(cmd *cobra.Command, args []string, toComplete string) ([]cobra.Completion, cobra.ShellCompDirective) {
    return []cobra.Completion{"yaml", "json"}, cobra.ShellCompDirectiveFilterFileExt
})
```

### Directory Only

```go
// Method 1: MarkFlagDirname
cmd.MarkFlagDirname("output-dir")

// Method 2: RegisterFlagCompletionFunc
cmd.RegisterFlagCompletionFunc("output-dir", func(cmd *cobra.Command, args []string, toComplete string) ([]cobra.Completion, cobra.ShellCompDirective) {
    return nil, cobra.ShellCompDirectiveFilterDirs
})

// Within a specific directory
cmd.RegisterFlagCompletionFunc("theme", func(cmd *cobra.Command, args []string, toComplete string) ([]cobra.Completion, cobra.ShellCompDirective) {
    return []cobra.Completion{"themes"}, cobra.ShellCompDirectiveFilterDirs
})
```

### Disable File Completion

```go
cmd.RegisterFlagCompletionFunc("flag-name", cobra.NoFileCompletions)
```

### Change Default Directive

By default, flags fall back to file completion. To change this:

```go
// For a specific command and subcommands
cmd.CompletionOptions.SetDefaultShellCompDirective(cobra.ShellCompDirectiveNoFileComp)

// Then re-enable file completion for specific flags
cmd.RegisterFlagCompletionFunc("file", cobra.FixedCompletions(nil, cobra.ShellCompDirectiveDefault))
```

---

## Active Help

Active Help provides hints during completion:

```go
ValidArgsFunction: func(cmd *cobra.Command, args []string, toComplete string) ([]cobra.Completion, cobra.ShellCompDirective) {
    var comps []cobra.Completion
    
    if len(args) == 0 {
        comps = cobra.AppendActiveHelp(comps, "Enter the repository name")
    } else if len(args) == 1 {
        comps = cobra.AppendActiveHelp(comps, "Enter the repository URL")
    }
    
    return comps, cobra.ShellCompDirectiveNoFileComp
}
```

### User Control

Users can disable Active Help:
```bash
export MYAPP_ACTIVE_HELP=0   # Disable for myapp
export COBRA_ACTIVE_HELP=0   # Disable for all Cobra apps
```

Read the config in your code:
```go
activeHelp := cobra.GetActiveHelpConfig(cmd)
if activeHelp != "0" {
    comps = cobra.AppendActiveHelp(comps, "Your hint here")
}
```

---

## Debugging Completions

Use the hidden `__complete` command:

```bash
# Test noun completion
myapp __complete status ""
# Output:
# harbor
# prometheus
# :4
# Completion ended with directive: ShellCompDirectiveNoFileComp

# Test with partial input
myapp __complete status har
# Output:
# harbor
# :4
```

### Debug Output

```go
// In your completion function
cobra.CompDebugln("Debug message", true)  // Print to stderr
cobra.CompErrorln("Error message")         // Always print to stderr

// Set environment variable for debug file
export BASH_COMP_DEBUG_FILE=/tmp/completions.log
```

**Important:** Never print directly to stdout in completion functions — it will be interpreted as a completion choice.

---

## Completion Options

Configure on the root command:

```go
rootCmd.CompletionOptions.DisableDefaultCmd = true      // Don't add completion command
rootCmd.CompletionOptions.HiddenDefaultCmd = true       // Hide completion command
rootCmd.CompletionOptions.DisableNoDescFlag = true      // No --no-descriptions flag
rootCmd.CompletionOptions.DisableDescriptions = true    // Disable all descriptions
```

---

## Custom Completion Command

If you need more control:

```go
var completionCmd = &cobra.Command{
    Use:   "completion [bash|zsh|fish|powershell]",
    Short: "Generate shell completion script",
    Long: `To load completions:

Bash:
  source <(myapp completion bash)

Zsh:
  myapp completion zsh > "${fpath[1]}/_myapp"

Fish:
  myapp completion fish > ~/.config/fish/completions/myapp.fish

PowerShell:
  myapp completion powershell | Out-String | Invoke-Expression
`,
    ValidArgs: []string{"bash", "zsh", "fish", "powershell"},
    Args:      cobra.MatchAll(cobra.ExactArgs(1), cobra.OnlyValidArgs),
    Run: func(cmd *cobra.Command, args []string) {
        switch args[0] {
        case "bash":
            cmd.Root().GenBashCompletion(os.Stdout)
        case "zsh":
            cmd.Root().GenZshCompletion(os.Stdout)
        case "fish":
            cmd.Root().GenFishCompletion(os.Stdout, true)
        case "powershell":
            cmd.Root().GenPowerShellCompletionWithDesc(os.Stdout)
        }
    },
}
```

---

## Bash Completion V2

The default is V2, which supports descriptions and is much smaller. If you need V1 for legacy reasons:

```go
cmd.Root().GenBashCompletion(os.Stdout)     // V1
cmd.Root().GenBashCompletionV2(os.Stdout, true)  // V2 with descriptions
```

---

## Shell-Specific Limitations

### Fish
- `ShellCompDirectiveFilterFileExt` not supported
- `ShellCompDirectiveFilterDirs` not supported

### PowerShell
- Same limitations as Fish

### Zsh
- Custom bash scripting completions ignored
- `MarkFlagCustom()` not supported

Use `ValidArgsFunction` and `RegisterFlagCompletionFunc` for portable completions.

---

## Aliases

### Bash
```bash
alias k=kubectl
complete -o default -F __start_kubectl k
```

### PowerShell
```powershell
Set-Alias -Name k -Value kubectl
Register-ArgumentCompleter -CommandName 'k' -ScriptBlock $__kubectlCompleterBlock
```
