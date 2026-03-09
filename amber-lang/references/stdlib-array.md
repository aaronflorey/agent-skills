# std/array — Array Manipulation

Import: `import { function_name } from "std/array"`

## `array_contains`

```ab
pub fun array_contains(array, value)
```

Checks if a value is in the array.

```ab
array_contains([1, 2, 3], 2) // true
```

## `array_extract_at`

```ab
pub fun array_extract_at(ref array: [], index: Int)
```

Removes an element at the index and returns it. **Failable** — fails if index is negative or beyond end.

```ab
let array = [1, 2, 3]
let element = array_extract_at(array, 1)
echo element // 2
echo array   // [1, 3]
```

## `array_filled`

```ab
pub fun array_filled(size, value = 0)
```

Returns an array of `size` with each element set to `value`. Returns empty array if size < 0.

```ab
let array = array_filled(5, 1)
echo array // [1, 1, 1, 1, 1]
```

## `array_find`

```ab
pub fun array_find(array, value): Int
```

Returns index of the first occurrence. Returns `-1` if not found.

```ab
array_find([1, 2, 3], 2) // 1
```

## `array_find_all`

```ab
pub fun array_find_all(array, value): [Int]
```

Returns array of all indices where value is found.

```ab
array_find_all([1, 2, 3, 2], 2) // [1, 3]
```

## `array_first`

```ab
pub fun array_first(array)
```

Returns the first element. **Failable** — fails if array is empty.

```ab
array_first([1, 2, 3]) // 1
```

## `array_last`

```ab
pub fun array_last(array)
```

Returns the last element. **Failable** — fails if array is empty.

```ab
array_last([1, 2, 3]) // 3
```

## `array_pop`

```ab
pub fun array_pop(ref array)
```

Removes and returns the last element. **Failable** — fails if array is empty.

```ab
let array = [1, 2, 3]
let element = array_pop(array)
echo element // 3
echo array   // [1, 2]
```

## `array_remove_at`

```ab
pub fun array_remove_at(ref array: [], index: Int): Null
```

Removes element at index. Array unchanged if index is out of bounds.

```ab
let array = [1, 2, 3]
array_remove_at(array, 1)
echo array // [1, 3]
```

## `array_shift`

```ab
pub fun array_shift(ref array)
```

Removes and returns the first element. **Failable** — fails if array is empty.

```ab
let array = [1, 2, 3]
let element = array_shift(array)
echo element // 1
echo array   // [2, 3]
```
