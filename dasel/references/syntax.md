# Dasel v3 — Syntax Reference

## Table of Contents
1. [Types & Literals](#types--literals)
2. [Operators](#operators)
3. [Whitespace & Comments](#whitespace--comments)
4. [String Concatenation](#string-concatenation)
5. [Regex](#regex)
6. [Arrays / Slices](#arrays--slices)
7. [Objects / Maps](#objects--maps)
8. [Spread Operator](#spread-operator)
9. [Coalesce Operator](#coalesce-operator)
10. [Conditionals](#conditionals)
11. [Recursive Descent](#recursive-descent)
12. [Branches (unstable)](#branches-unstable)

---

## Types & Literals

```
# Integers
1, -530, 5234
# Use parentheses if dasel misreads negatives: (-530)

# Floats — include a decimal point, or suffix with f
1.1, 23.45, 123f

# Booleans (case-insensitive)
true, True, TRUE, false, False, FALSE

# Strings (single or double quotes)
"hello world"
'hello world'
"escaped \" quote"

# Null
null
```

---

## Operators

| Operator | Meaning |
|----------|---------|
| `+` | Add / string concatenate |
| `-` | Subtract |
| `*` | Multiply |
| `/` | Divide |
| `%` | Modulo |
| `==` | Equal |
| `!=` | Not equal |
| `<` | Less than |
| `>` | Greater than |
| `<=` | Less than or equal |
| `>=` | Greater than or equal |
| `&&` | Logical AND |
| `\|\|` | Logical OR |
| `!` | Logical NOT |
| `=~` | Regex match |
| `!~` | Regex not match |
| `??` | Coalesce / fallback |
| `...` | Spread |

---

## Whitespace & Comments

Whitespace is insignificant — queries can be written compactly or spread across multiple lines freely.

Comments use `//` and run to end of line:

```
{
  "foo": "bar", // this is a comment
  "name": "Tom"
}
```

---

## String Concatenation

Use `+`. Non-string values must be converted first with `toString()`.

```
"hello" + " " + "world"
// => "hello world"

"id: " + toString(42)
// => "id: 42"
```

---

## Regex

Regex literals: `r/pattern/`

Use with `=~` (match) and `!~` (not match):

```
["foo", "bar", "baz"].filter($this =~ r/^b/)
// => ["bar", "baz"]

["foo", "bar"].filter($this !~ r/^b/)
// => ["foo"]
```

> Limitation: only pattern matching for now — no value extraction.

---

## Arrays / Slices

Zero-indexed. Dynamic size.

```
# Define
[1, 2, 3]

# Access by index
arr[0]
arr[2]

# Last element
arr[len(arr)-1]

# Range slice [start:end] (inclusive)
arr[0:4]   // first 5 elements
arr[len(arr)-6 : len(arr)-1]  // last 5 elements

# Append elements
[$someArray..., 4, 5]

# Remove elements (filter)
[1, 2, 3].filter($this % 2 == 0)
// => [2]
```

---

## Objects / Maps

```
# Define
{"key": "value"}

# Shorthand (key name same as field)
{"foo": "bar", name}
// equivalent to {"foo": "bar", "name": name}

# Access field
obj.fieldName

# Dynamic key access (useful for keys with dots)
obj.get("key.with.dots")

# Build from existing values
{"baz": foo, name}  // foo and name come from current context

# Add a field (overwrite if exists)
{$this..., "newKey": "value"}

# Add a field (only if not present)
{"newKey": "value", $this...}
```

---

## Spread Operator

`...` spreads arrays or maps into other constructors or function arguments.

```
# Spread into array
[$someArray..., 4, 5, 6]
// => [1, 2, 3, 4, 5, 6]

# Spread into object (merge)
{ {"firstName": "Tom"}..., "lastName": "Wright" }
// => {"firstName": "Tom", "lastName": "Wright"}

# Spread as function arguments
doSomething([1, 2, 3]...)
// equivalent to doSomething(1, 2, 3)

# Output each element as a separate document
[1, 2, 3]...
// 1
// 2
// 3
```

---

## Coalesce Operator

`??` falls back to the right-hand side when the left:
- refers to a missing map key
- refers to an out-of-range index
- returns `null`
- causes a type error

```
# Default value
foo.bar.baz ?? "default"

# Check existence
if ($arr[10] ?? false) { "exists" } else { "missing" }

# Chain multiple fallbacks (left takes precedence)
foo ?? bar ?? baz ?? false
```

---

## Conditionals

### Long form (`if/else`)

`else` branch is **required**.

```
if (<condition>) { <expr> } else { <expr> }

# elseif is also supported
if (x > 10) { "big" } elseif (x > 5) { "medium" } else { "small" }
```

Example:
```bash
dasel -f data.json 'if(count > 5) { "many" } else { "few" }'
```

### Ternary (`? :`)

> **Not yet implemented** in v3.

---

## Recursive Descent

`..` performs depth-first traversal from the current node.

```
# Find all values with key "name" at any depth
..name

# Get index [0] from every nested array
..[0]

# All values at any depth (wildcard)
..*
```

Example:
```bash
dasel -f data.json '..name'
# => ["Alice"] (all name values recursively)

dasel -f data.json '..*'
# => all scalar/array/map values at any depth
```

`..name` is roughly equivalent to `search(has("name"))`. Use `search()` when you need more complex predicates.

---

## Branches (unstable)

Requires `--unstable` flag.

`branch` outputs each element as a separate document rather than an array.

```bash
# Without branch — array output
cat data.json | dasel -i json 'numbers'
# => [{"x":1},{"x":2},{"x":3}]

# With branch — separate documents
cat data.json | dasel -i json --unstable 'branch(numbers...)'
# {"x":1}
# {"x":2}
# {"x":3}

# Filter on branch using ignore()
[1,2,3].branch().if ($this==2) { ignore() } else { $this }
# => 2
# => 3
```
