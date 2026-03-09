# std/text — Text Manipulation

Import: `import { function_name } from "std/text"`

## `capitalized`

```ab
pub fun capitalized(text: Text): Text
```

Capitalize the first letter of the given text.

```ab
let cap = capitalized("hello")
echo cap // "Hello"
```

## `char_at`

```ab
pub fun char_at(text: Text, index: Int): Text
```

Returns the character at the specified index (0-based). Negative index counts from the end.

```ab
let ch = char_at("hello", 1)
echo ch // "e"
```

## `ends_with`

```ab
pub fun ends_with(text: Text, suffix: Text): Bool
```

Checks if text ends with a value.

```ab
if ends_with("hello world", "world") {
    echo "Ends with world!"
}
```

## `join`

```ab
pub fun join(list: [Text], delimiter: Text): Text
```

Merges text array using the delimiter.

```ab
let joined = join(["a", "b", "c"], ",")
echo joined // "a,b,c"
```

## `lowercase`

```ab
pub fun lowercase(text: Text): Text
```

Makes text lowercase using `tr`.

```ab
echo lowercase("HELLO") // "hello"
```

## `lpad`

```ab
pub fun lpad(text: Text, pad: Text, length: Int): Text
```

Pads text on the left with `pad` until it reaches `length`.

```ab
echo lpad("42", "0", 5) // "00042"
```

## `match_regex`

```ab
pub fun match_regex(source: Text, search: Text, extended: Bool = false): Bool
```

Match regex pattern. Uses `sed`.

```ab
if match_regex("test123", "[0-9]+", true) {
    echo "Contains numbers!"
}
```

## `match_regex_any`

```ab
pub fun match_regex_any(text: Text, terms: [Text]): Bool
```

Checks if any regex pattern in the array matches the text.

```ab
if match_regex_any("test123", ["[a-z]+", "[0-9]+"]) {
    echo "Matches at least one!"
}
```

## `parse_int`

```ab
pub fun parse_int(text: Text): Int?
```

Attempts to parse text into an Int. **Failable.**

```ab
let num = parse_int("42")?
echo num // 42
```

## `parse_num`

```ab
pub fun parse_num(text: Text): Num?
```

Attempts to parse text into a Num. **Failable.**

```ab
let num = parse_num("3.14")?
echo num // 3.14
```

## `replace`

```ab
pub fun replace(source, search, replace)
```

Replaces all occurrences of a pattern.

```ab
echo replace("Hello world", "world", "universe") // "Hello universe"
```

## `replace_one`

```ab
pub fun replace_one(source, search, replace)
```

Replaces the first occurrence of a pattern.

```ab
echo replace_one("foo foo foo", "foo", "bar") // "bar foo foo"
```

## `replace_regex`

```ab
pub fun replace_regex(source: Text, search: Text, replace_text: Text, extended: Bool = false): Text
```

Replaces all occurrences of a regex pattern. Uses `sed`.

```ab
echo replace_regex("test123", "[0-9]+", "456", true) // "test456"
```

## `reversed`

```ab
pub fun reversed(text: Text): Text
```

Reverses text using `rev`.

```ab
echo reversed("hello") // "olleh"
```

## `rpad`

```ab
pub fun rpad(text: Text, pad: Text, length: Int): Text
```

Pads text on the right with `pad` until it reaches `length`.

```ab
echo rpad("42", "0", 5) // "42000"
```

## `slice`

```ab
pub fun slice(text: Text, index: Int, length: Int = 0): Text
```

Returns a substring starting at `index` (0-based). Negative index counts from end. If `length` is provided, limits the result; otherwise slices to end. Negative `length` returns empty string.

```ab
echo slice("hello world", 6, 5) // "world"
```

## `split`

```ab
pub fun split(text: Text, delimiter: Text): [Text]
```

Splits text into array using delimiter.

```ab
let parts = split("a,b,c", ",")
echo parts[0] // "a"
```

## `split_chars`

```ab
pub fun split_chars(text: Text): [Text]
```

Splits text into individual characters.

```ab
let chars = split_chars("hello")
echo chars[0] // "h"
```

## `split_lines`

```ab
pub fun split_lines(text: Text): [Text]
```

Splits text on newline characters.

```ab
let lines = split_lines("line1\nline2\nline3")
echo lines[0] // "line1"
```

## `split_words`

```ab
pub fun split_words(text: Text): [Text]
```

Splits text on spaces.

```ab
let words = split_words("hello world example")
echo words[1] // "world"
```

## `starts_with`

```ab
pub fun starts_with(text: Text, prefix: Text): Bool
```

Checks if text starts with a value.

```ab
if starts_with("hello world", "hello") {
    echo "Starts with hello!"
}
```

## `text_contains`

```ab
pub fun text_contains(source: Text, search: Text): Bool
```

Checks if text contains a value.

```ab
if text_contains("hello world", "world") {
    echo "Found!"
}
```

## `text_contains_all`

```ab
pub fun text_contains_all(source: Text, searches: [Text]): Bool
```

Checks if all array values are in the text.

```ab
if text_contains_all("hello world", ["hello", "world"]) {
    echo "All found!"
}
```

## `text_contains_any`

```ab
pub fun text_contains_any(source: Text, searches: [Text]): Bool
```

Checks if any array value is in the text.

```ab
if text_contains_any("hello world", ["foo", "world"]) {
    echo "Found at least one!"
}
```

## `trim`

```ab
pub fun trim(text: Text): Text
```

Trims spaces from both ends.

```ab
echo trim("   hello   ") // "hello"
```

## `trim_left`

```ab
pub fun trim_left(text: Text): Text
```

Trims spaces from the left using `sed`.

```ab
echo trim_left("   hello") // "hello"
```

## `trim_right`

```ab
pub fun trim_right(text: Text): Text
```

Trims spaces from the right using `sed`.

```ab
echo trim_right("hello   ") // "hello"
```

## `uppercase`

```ab
pub fun uppercase(text: Text): Text
```

Makes text uppercase using `tr`.

```ab
echo uppercase("hello") // "HELLO"
```

## `zfill`

```ab
pub fun zfill(text: Text, length: Int): Text
```

Pads text with zeros on the left until it reaches `length`.

```ab
echo zfill("42", 5) // "00042"
```
