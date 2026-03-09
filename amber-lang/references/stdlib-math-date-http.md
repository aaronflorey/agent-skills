# std/math — Math Operations

Import: `import { function_name } from "std/math"`

## `math_abs`

```ab
pub fun math_abs(number)
```

Returns absolute value.

```ab
echo math_abs(-42) // 42
```

## `math_ceil`

```ab
pub fun math_ceil(number: Num): Int
```

Smallest integer >= number.

```ab
echo math_ceil(3.1) // 4
```

## `math_floor`

```ab
pub fun math_floor(number: Num): Int
```

Largest integer <= number.

```ab
echo math_floor(3.9) // 3
```

## `math_round`

```ab
pub fun math_round(number: Num): Int
```

Rounds to nearest integer.

```ab
echo math_round(3.7) // 4
```

## `math_sum`

```ab
pub fun math_sum(list)
```

Sums an array's contents.

```ab
echo math_sum([1, 2, 3, 4, 5]) // 15
```

---

# std/date — Date & Time

Import: `import { function_name } from "std/date"`

All dates use **unix epoch format** (seconds since 1970-01-01 00:00 UTC).

## `date_now`

```ab
pub fun date_now(): Int
```

Returns current timestamp.

```ab
let date = date_now()
```

## `date_add`

```ab
pub fun date_add(date: Int, amount: Int, unit: Text): Int?
```

Adds time to a date. **Failable.**

Units: `"years"`, `"months"`, `"days"`, `"hours"`, `"minutes"`, `"seconds"`

```ab
let new_date = date_add(date, 5, "hours")?
```

## `date_sub`

```ab
pub fun date_sub(date: Int, amount: Int, unit: Text): Int?
```

Subtracts time from a date. **Failable.** Same units as `date_add`.

```ab
let new_date = date_sub(date, 5, "hours")?
```

## `date_format_posix`

```ab
pub fun date_format_posix(date: Int, format: Text = "%F %T", utc: Bool = false): Text?
```

Formats unix epoch to human-readable string. **Failable.**

Common format patterns:
- `%F` — full date (YYYY-MM-DD)
- `%T` — time (HH:MM:SS)
- `%Y` — year
- `%m` — month (01-12)
- `%d` — day (01-31)
- `%H` — hour (00-23)
- `%M` — minute (00-59)
- `%a` — abbreviated weekday
- `%B` — full month name
- `%D` — date as MM/DD/YY

```ab
echo date_format_posix(date)? // "2023-03-15 14:30:00"
```

## `date_from_posix`

```ab
pub fun date_from_posix(date: Text, format: Text = "%F %T", utc: Bool = false): Int?
```

Parses formatted date string back to unix epoch. **Failable.**

```ab
let epoch = date_from_posix("2023-03-15 14:30:00")?
```

---

# std/http — HTTP Operations

Import: `import { function_name } from "std/http"`

## `file_download`

```ab
pub fun file_download(url: Text, path: Text): Null?
```

Downloads file from URL. Tries `curl`, then `wget`, then `aria2c`. **Failable.**

```ab
file_download("https://example.com/file.zip", "/tmp/file.zip")?
```
