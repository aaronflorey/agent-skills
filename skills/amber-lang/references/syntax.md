# Amber Syntax Reference

## Data Types

| Type | Description | Example |
|------|-------------|---------|
| `Text` | String in double quotes | `"hello {name}"` |
| `Int` | 64-bit signed integer | `42` |
| `Num` | Floating-point (requires `bc`) | `3.14` |
| `Bool` | Boolean | `true`, `false` |
| `Null` | Absence of value | Used for void functions |
| `[T]` | Typed array | `[1, 2, 3]`, `[Text]` (empty) |

No nested arrays (Bash limitation). Arrays are zero-indexed.

### Text

- Literals in double quotes: `"Welcome to the jungle"`
- Escape sequences: `\n`, `\t`, `\r`, `\0`, `\{`, `\$`, `\'`, `\"`, `\\`
- Interpolation: `"Hello {name}"` — any expression inside `{}`
- Interpolation output: `Text` → identity, `Num` → identity, `Bool` → `1`/`0`, `[]` → space-separated

### Int

- Stored internally as strings, computed as 64-bit signed integers
- Examples: `42`, `-123`

### Num

- Floating-point numbers using `bc` command
- Examples: `42.0`, `-123.456`
- **Warning:** requires `bc` installed on the system

### Bool

- Values: `true` or `false`
- Translates to `1` or `0` in Bash
- Castable to numeric types

### Null

- Represents absence of value
- Primarily used for functions with no return value

### Array

- Type signature: `[Text]`, `[Int]`, `[Num]`, `[Bool]`
- Empty array: `[Text]` (must specify type)
- Elements separated by commas: `[1, 2, 3]`
- Zero-indexed: `array[0]`
- No nested arrays due to Bash limitations

## Variables

```ab
let name = "John"        // mutable variable
const PI = 3.14          // constant (cannot reassign)
name = "Jane"            // reassignment (no let keyword)
let name = 123           // overshadowing (re-declare with new type)
```

Reserved: `__` prefix and language keywords.

## Operators

### Arithmetic (Int/Num)
`+`, `-`, `*`, `/`, `%`, unary `-`

### Shorthand Assignment
`+=`, `-=`, `*=`, `/=`

### Comparison
`==`, `!=`, `<`, `>`, `<=`, `>=`

- Integers compared arithmetically
- Text and arrays compared lexically

### Logical (Bool only)
`and`, `or`, `not`

### String/Array Concatenation
`+` for concatenation, `+=` to append

**Important:** Operators only work with values of the same type.

## Control Flow

### If/Else

```ab
if age >= 18 {
    echo "Adult"
} else {
    echo "Minor"
}

// Shorthand with colon
if age >= 18: echo "Adult"
else: echo "Minor"
```

### If Chain (replaces if-else-if)

```ab
if {
    x == 1: echo "one"
    x == 2: echo "two"
    else: echo "other"
}
```

### Ternary Expression

```ab
let label = count > 1 then "items" else "item"

// Or multiline
let label = count > 1
    then "items"
    else "item"
```

### Infinite Loop

```ab
loop {
    if done: break
    i += 1
}
```

### Iterator Loop (for)

```ab
// Range (exclusive end)
for i in 0..10 { echo i }       // 0 through 9

// Range (inclusive end)
for i in 0..=10 { echo i }      // 0 through 10

// Reversed range
for i in 10..0 { echo i }       // 10 down to 1

// With index
for index, value in array {
    echo "{index}: {value}"
}
```

### While Loop

```ab
while x < 100 {
    x *= 2
}
```

### Loop Control
- `break` — exit loop
- `continue` — skip to next iteration

## Functions

### Basic Declaration

```ab
fun greet(name: Text): Text {
    return "Hello {name}"
}
```

### Default Parameters

```ab
fun add(a: Int, b: Int = 0): Int {
    return a + b
}

echo add(10)      // 10
echo add(10, 20)  // 30
```

### Public Functions (exportable)

```ab
pub fun helper(): Null { }
```

### Pass by Reference

```ab
fun push(ref arr: [Text], val: Text) {
    arr += [val]
}
```

### Generic Functions (untyped)

Functions without type annotations are re-typed at each call site:

```ab
fun identity(x) {
    return x
}
```

### Failable Functions

Functions that can fail use `?` in return type and `fail` keyword:

```ab
fun divide(a: Num, b: Num): Num? {
    if b == 0 {
        fail 1
    }
    return a / b
}
```

Callers **must** handle failure:

```ab
let result = divide(10.0, 0.0) failed(code) {
    echo "Division failed with code {code}"
}
```

### Status Code Access

```ab
let result = trust safeDivision(24, 4)
echo "{result}, {status}"
```

## Commands (Shell Execution)

### Basic Command

```ab
$ ls -la $
```

### Capture Output

```ab
let files = $ ls $
```

### Command Interpolation

```ab
let dir = "/tmp"
$ ls {dir} $
```

### Failure Handling

```ab
// Handle failure
$ cat file.txt $ failed(code) {
    echo "Failed: {code}"
}

// Handle success
$ cat file.txt $ succeeded {
    echo "OK"
}

// Handle any exit
$ cat file.txt $ exited(code) {
    echo "Exit: {code}"
}

// Propagate failure with ?
$ test -d /path $?
```

## Modifiers

Apply to commands, function calls, or blocks:

- **`silent`** — suppress stdout
- **`trust`** — skip error handling (use sparingly)
- **`sudo`** — intelligent privilege escalation

```ab
silent $ apt-get update $?
trust dangerousFunction()

// Block scope
silent trust {
    $ cmd1 $
    $ cmd2 $
}
```

## Arrays

```ab
let fruits = ["apple", "banana", "cherry"]
fruits[0] = "kiwi"               // Set by index
echo fruits[1]                    // Access by index
echo fruits[1..3]                 // Slice (exclusive end)
echo fruits[1..=2]               // Slice (inclusive end)
fruits += ["orange"]              // Append
let combined = fruits + ["pear"]  // Concatenate
```

### Ranges

```ab
let nums = 0..5      // [0, 1, 2, 3, 4]
let nums = 0..=5     // [0, 1, 2, 3, 4, 5]
let rev = 5..0       // [5, 4, 3, 2, 1]
```

## Importing & Modules

```ab
import { foo, bar } from "./utils.ab"
import * from "./helpers.ab"
pub import * from "./lib.ab"    // re-export
```

### Main Block

```ab
// Code outside main runs always (even when imported)
echo "Always runs"

main {
    echo "Only when executed directly"
}

main (args) {
    for i, arg in args {
        echo "{i}: {arg}"
    }
}
```

The `?` operator works inside `main` to propagate exit codes to the shell.

## Type Casting & Checking

### Regular Cast (compatible types)

```ab
let x = true as Int       // 1
```

### Absurd Cast (incompatible types — dangerous)

```ab
#[allow_absurd_cast]
fun convert(a: Text): Int {
    return a as Int
}
```

Prefer stdlib functions instead:

```ab
import { parse_int } from "std/text"
let n = parse_int("42") failed {
    echo "Not a number"
}
```

### Type Condition

```ab
if value is Text {
    echo "It's text"
}

fun handle(value) {
    if {
        value is Text: echo "text"
        value is Num: echo "number"
    }
}
```

## Compiler Flags

Applied above function declarations:

```ab
#[allow_nested_if_else]
#[allow_generic_return]
#[allow_absurd_cast]
fun foo() { ... }
```

## Builtins

| Builtin | Description | Example |
|---------|-------------|---------|
| `echo` | Print text | `echo "hello"` |
| `len` | Length of text or array | `len(array)` |
| `lines` | Read file lines into array | `lines("file.txt")` |
| `cd` | Change directory | `cd "/tmp"` |
| `mv` | Move files (failable) | `mv("a.txt", "b.txt")` |
| `nameof` | Variable name in compiled Bash | `nameof variable` |
