# Dasel v3 — Functions Reference

## Table of Contents
- [add](#add)
- [base64d](#base64d)
- [base64e](#base64e)
- [each](#each)
- [filter](#filter)
- [get](#get)
- [has](#has)
- [join](#join)
- [keys](#keys)
- [len](#len)
- [map](#map)
- [max](#max)
- [min](#min)
- [parse](#parse)
- [readFile](#readfile)
- [replace](#replace)
- [reverse](#reverse)
- [search](#search)
- [sortBy](#sortby)
- [sum](#sum)
- [toFloat](#tofloat)
- [toInt](#toint)
- [toString](#tostring)
- [typeOf](#typeof)

---

## add

Adds numbers. Returns int unless any float is given, then returns float.

```
add(1, 2, 3)        // 5
[1, 2, 3].add($this...)  // 5
add(1, 2.5, 3)      // 6.5
```

---

## base64d

Base64 decodes a string.

```
base64d("aGVsbG8=")
// => "hello"
```

---

## base64e

Base64 encodes a string.

```
base64e("hello")
// => "aGVsbG8="
```

---

## each

Iterates over each item of an array and modifies elements in place. Return values are ignored.

`$this` holds the current element.

```bash
# Increment all elements
echo '[1,2,3]' | dasel -i json 'each($this = $this + 1)'
# => [2, 3, 4]
```

Most commonly used with `search`, `..` (recursive descent), and `--root`.

---

## filter

Filters an array by predicate. Elements where the predicate is true are kept.

`$this` holds the current element.

```
[1, 2, 3].filter($this > 1)
// => [2, 3]

users.filter(active == true)
// keep users where active is true

["foo", "bar", "baz"].filter($this =~ r/^b/)
// => ["bar", "baz"]
```

---

## get

Access a map key or array index by dynamic/computed value. Useful when the key contains a dot.

```bash
# Key with a dot in it
echo "['0.2.8']\nkey = 'value'" | dasel -i toml 'get("0.2.8")'

# Dynamic lookup
obj.get("key" + suffix)
```

---

## has

Returns `true` if the value has the given key (string) or index (int).

```
["a","b","c"].has(1)    // true  (index 1 exists)
["a","b","c"].has(3)    // false (out of range)
{"foo": "bar"}.has("foo")  // true
{"foo": "bar"}.has("baz")  // false
```

Useful inside `search` and conditionals:
```
search(has("name"))
if ($obj.key ?? false) { ... }
```

---

## join

Concatenates values into a delimited string.

All inputs must be strings — use `toString()` to convert first.

```
["a","b","c"].join(",")     // "a,b,c"
join(",", "a", "b", "c")   // "a,b,c"
join("-", ["x","y","z"])   // "x-y-z"
```

---

## keys

Returns the keys of a map (as strings) or the indices of an array (as ints).

Order of map keys is not guaranteed.

```
{"name":"Tom","age":30}.keys()
// => ["name","age"]

["a","b","c"].keys()
// => [0, 1, 2]

obj.user.keys()
// => keys of the user sub-object
```

---

## len

Returns the length of an array, map, or string.

```
len([0, 0, 0])             // 3
len({"foo":"bar","x":"y"}) // 2
len("hello")               // 5
```

---

## map

Transforms each element of an array. Returns a new array.

`$this` holds the current element.

```
[1, 2, 3].map($this + 1)   // [2, 3, 4]
[1, 2, 3].map($this * 2)   // [2, 4, 6]

# Extract a field from each object
users.map(name)            // ["Alice", "Bob"]

# Complex transform with if/else
numbers.map(
  if ($this % 3 == 0 && $this % 5 == 0) { "fizzbuzz" }
  elseif ($this % 5 == 0) { "buzz" }
  elseif ($this % 3 == 0) { "fizz" }
  else { $this }
)
```

---

## max

Returns the largest number from arguments.

```
max(1, 2, 3)          // 3
[1, 2, 3].max($this...)  // 3
```

---

## min

Returns the smallest number from arguments.

```
min(1, 2, 3)          // 1
[1, 2, 3].min($this...)  // 1
```

---

## parse

Parses a string as a structured document.

Arguments: `parse(format, string)`

```
parse("json", '{"name":"Tom"}').name
// => "Tom"

# Combined with readFile
$data = parse("yaml", readFile("config.yaml"));
$data.server.host
```

---

## readFile

Reads a file's contents as a string at runtime.

```
readFile("greeting.txt")

# Parse the result
parse("json", readFile("names.json")).len()
```

---

## replace

Replaces occurrences of substrings. Supports multiple replacement pairs in one call.

Replacement is **literal**, not regex-based.

```
"hello world".replace("world", "there")
// => "hello there"

replace("hello world", "world", "there")
// => "hello there"

# Multiple replacements
"a-b-c".replace("-", "_", "a", "x")
// => "x_b_c"

replace("one two three", "one", "1", "two", "2", "three", "3")
// => "1 2 3"
```

---

## reverse

Reverses an array or string.

```
reverse([1,2,3])   // [3,2,1]
reverse("hello")   // "olleh"
```

---

## search

Recursively searches the document tree and returns all nodes matching a predicate.

More flexible than `..` — supports arbitrary conditions.

```
# All nodes with key "name"
search(has("name"))

# All nodes where value equals 42
search($this == 42)

# Nodes with both "id" and "name" keys
search(has("id") && has("name"))
```

```bash
dasel -i json 'search(has("name"))' < data.json
# Outputs each matching node as a separate document
```

Comparison:
- `..name` ≈ `search(has("name"))` — simpler but only key-based
- `search` supports any boolean expression

---

## sortBy

Sorts an array, optionally by a field and direction (`asc` or `desc`; default `asc`).

```
[3,1,2].sortBy()           // [1,2,3]
[3,1,2].sortBy($this)      // [1,2,3]
[3,1,2].sortBy($this, desc)  // [3,2,1]

# Sort objects by field
users.sortBy(name)
users.sortBy(age, desc)
```

---

## sum

Sums numeric inputs. Returns float if any float is given.

```
sum(1,2,3)        // 6
sum(1, 2.2, 3)   // 6.2
[1,2,3].sum($this...)  // 6
```

---

## toFloat

Converts to float.

```
toFloat("1.2")   // 1.2
toFloat(123)     // 123
toFloat(true)    // 1
toFloat(false)   // 0
```

---

## toInt

Converts to int (truncates floats).

```
toInt("1")     // 1
toInt("1.9")   // 1
toInt(123.4)   // 123
toInt(true)    // 1
toInt(false)   // 0
```

---

## toString

Converts to string. Does not support maps or arrays.

```
toString(123)    // "123"
toString(1.5)    // "1.5"
toString(false)  // "false"
toString("hi")   // "hi"
```

---

## typeOf

Returns the type name as a string.

```
typeOf("")      // "string"
typeOf([])      // "array"
typeOf({})      // (map type)
typeOf(true)    // "bool"
typeOf(null)    // "null"
typeOf(1)       // "int"
typeOf(1.1)     // "float"
typeOf(1f)      // "float"
```
