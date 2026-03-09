# std/env — Environment, I/O & Styling

Import: `import { function_name } from "std/env"`

## Environment Variables

### `env_var_get`

```ab
pub fun env_var_get(name: Text): Text?
```

Gets environment variable. **Failable.**

```ab
let debug = env_var_get("DEBUG") failed {
    echo "Not set"
}
```

### `env_var_set`

```ab
pub fun env_var_set(name: Text, val: Text): Null?
```

Sets a variable in the shell session. **Failable.**

```ab
env_var_set("DEBUG", "true")?
```

### `env_const_set`

```ab
pub fun env_const_set(name: Text, val: Text): Null?
```

Sets a constant in the shell session. **Failable.**

```ab
env_const_set("API_KEY", "secret123")?
```

### `env_var_test`

```ab
pub fun env_var_test(name: Text): Bool
```

Checks if a variable exists in the shell session.

```ab
if env_var_test("PATH") {
    echo "PATH exists"
}
```

### `env_var_unset`

```ab
pub fun env_var_unset(name: Text): Null?
```

Removes a variable from the shell session. **Failable.**

```ab
env_var_unset("TEMP_VAR")?
```

### `env_var_load`

```ab
pub fun env_var_load(var: Text, file: Text = ".env"): Text
```

Retrieves env var, optionally sourcing from a file if not set.

```ab
let value = env_var_load("MY_VAR", ".env.local")
```

### `env_file_load`

```ab
pub fun env_file_load(file: Text = ".env"): Null
```

Loads env file into environment using `xargs`.

```ab
env_file_load(".env")
```

## User Input

### `input_prompt`

```ab
pub fun input_prompt(prompt: Text): Text
```

Creates a prompt and returns user input.

```ab
let name = input_prompt("Enter your name: ")
```

### `input_hidden`

```ab
pub fun input_hidden(prompt: Text): Text
```

Prompt with hidden input (for passwords).

```ab
let password = input_hidden("Enter password: ")
```

### `input_confirm`

```ab
pub fun input_confirm(prompt: Text, default_yes: Bool = false): Bool
```

Yes/No prompt. Returns `true` if Yes. Default is No unless `default_yes` is `true`.

```ab
if input_confirm("Continue?", false) {
    echo "Continuing..."
}
```

## Output & Messaging

### `echo_info`

```ab
pub fun echo_info(message: Text): Null
```

Prints an info message (styled).

### `echo_success`

```ab
pub fun echo_success(message: Text): Null
```

Prints a success message (styled).

### `echo_warning`

```ab
pub fun echo_warning(message: Text): Null
```

Prints a warning message (styled).

### `echo_error`

```ab
pub fun echo_error(message: Text, exit_code: Int = 1): Null
```

Prints an error message. Exits if `exit_code` > 0.

### `echo_colored`

```ab
pub fun echo_colored(message: Text, color: Int): Null
```

Prints text with a specified ANSI color code.

```ab
echo_colored("Red text", 31)
```

### `printf`

```ab
pub fun printf(format: Text, args: [Text] = [""]): Null
```

Printf with format string and arguments.

```ab
printf("Hello %s!", ["World"])
```

## Text Styling

### `bold`

```ab
pub fun bold(message: Text): Text
```

Returns text formatted as bold (for use with `printf`).

### `italic`

```ab
pub fun italic(message: Text): Text
```

Returns text formatted as italic.

### `underlined`

```ab
pub fun underlined(message: Text): Text
```

Returns text formatted as underlined.

### `styled`

```ab
pub fun styled(message: Text, style: Int, fg: Int, bg: Int): Text
```

Returns text with full formatting options (style, foreground, background).

```ab
printf("%s\n", [styled("Error!", 1, 31, 40)])
```

### `escaped`

```ab
pub fun escaped(text: Text): Text
```

Escapes text for safe use with `printf`.

```ab
printf("%s\n", [escaped("100% done\\n")])
```

## System Checks

### `is_command`

```ab
pub fun is_command(command: Text): Bool
```

Checks if a command exists on the system.

```ab
if is_command("git") {
    echo "Git is installed"
}
```

### `is_root`

```ab
pub fun is_root(): Bool
```

Checks if running as root.

```ab
if is_root() {
    echo "Running as root"
}
```

### `has_failed`

```ab
pub fun has_failed(command: Text): Bool
```

Checks if a command string fails.

```ab
if has_failed("test -f config.txt") {
    echo "File doesn't exist"
}
```

### `bash_version`

```ab
pub fun bash_version(): [Int]
```

Returns bash version as `[major, minor, patch]`.

```ab
let v = bash_version()
echo "Bash {v[0]}.{v[1]}.{v[2]}"
```
