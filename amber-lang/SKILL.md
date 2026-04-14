---
name: amber-lang
description: Write, debug, and explain Amber code, the `amber` language that compiles `.ab` files to Bash. Use this skill when the user asks to write an Amber script, convert Bash to Amber, compile Amber to Bash, debug Amber syntax or type errors, or asks about Amber 0.5.1-alpha syntax, functions, types, error handling, the standard library, or the `amber` CLI.
version: 1.0.0
source: local
license: MIT
---

This skill provides comprehensive knowledge of **Amber** (amber-lang.com), a modern programming language that compiles to Bash script. Use it to write, review, debug, convert, and explain Amber code.

## Quick Reference

Amber compiles to Bash 3.2+ compatible scripts. It provides ECMAScript-inspired syntax, type safety, and mandatory error handling.

**CLI:** `amber run <file.ab>` | `amber build <in.ab> <out.sh>` | `amber check <file.ab>` | `amber eval '<code>'`

**Shebang:** `#!/usr/bin/env amber` | **File extension:** `.ab`

**Types:** `Text`, `Int`, `Num` (needs `bc`), `Bool`, `Null`, `[T]` (typed array, no nesting)

**Key syntax patterns:**
```ab
let x = 10                          // variable
const Y = 20                        // constant
fun add(a: Int, b: Int): Int { }    // typed function
fun risky(): Int? { fail 1 }        // failable function (? = can fail)
pub fun exported(): Null { }        // public/exportable
fun modify(ref arr: [Int]) { }     // pass by reference
$ command $                          // shell execution
$ cmd $ failed(code) { }            // error handling (MANDATORY)
$ cmd $?                             // propagate failure
import { fn } from "std/module"     // stdlib import
import { fn } from "./file.ab"     // local import
main (args) { }                     // entry point
```

**Modifiers:** `silent` (suppress output), `trust` (skip error handling), `sudo` (privilege escalation)

**Control flow:** `if/else`, `if { cond: expr }` (chain), ternary (`x then a else b`), `loop`, `for i in 0..n`, `while`

## Code Style Guidelines

1. **Always handle errors** — use `failed`, `succeeded`, `exited`, or `?` for every failable operation
2. **Use typed function signatures** for clarity
3. **Prefer stdlib** over raw commands (e.g., `file_read` over `$ cat file $`)
4. **Use `main` blocks** so scripts work correctly when imported
5. **Use `const`** for values that don't change
6. **Avoid `trust`** — handle errors explicitly
7. **Use ranges** (`0..n`) instead of manual counter loops

## Additional References

For detailed syntax, types, operators, and all language features, see [references/syntax.md](references/syntax.md)

For standard library documentation:
- [references/stdlib-text.md](references/stdlib-text.md) — Text manipulation (split, replace, regex, trim, parse, etc.)
- [references/stdlib-array.md](references/stdlib-array.md) — Array operations (find, pop, shift, contains, etc.)
- [references/stdlib-fs.md](references/stdlib-fs.md) — File system (read, write, glob, chmod, extract, etc.)
- [references/stdlib-env.md](references/stdlib-env.md) — Environment, I/O, styling (env vars, input prompts, colored output, etc.)
- [references/stdlib-math-date-http.md](references/stdlib-math-date-http.md) — Math, date/time, and HTTP operations

For real-world example scripts, see [references/examples.md](references/examples.md)
