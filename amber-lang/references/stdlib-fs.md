# std/fs — File System Operations

Import: `import { function_name } from "std/fs"`

## `dir_create`

```ab
pub fun dir_create(path: Text): Null?
```

Creates a directory with all parent directories. **Failable.**

```ab
dir_create("/tmp/my/nested/directory")?
```

## `dir_exists`

```ab
pub fun dir_exists(path: Text): Bool
```

Checks if a directory exists.

```ab
if dir_exists("/tmp/mydir") {
    echo "Directory exists"
}
```

## `file_append`

```ab
pub fun file_append(path: Text, content: Text): Text?
```

Appends content to a file. Does not check if file exists. **Failable.**

```ab
file_append("log.txt", "New log entry")?
```

## `file_chmod`

```ab
pub fun file_chmod(path: Text, mode: Text): Null?
```

Changes permission bits. Fails if file doesn't exist. **Failable.**

```ab
file_chmod("script.sh", "755")?
```

## `file_chown`

```ab
pub fun file_chown(path: Text, user: Text): Null?
```

Changes file owner. Fails if file doesn't exist. **Failable.**

```ab
file_chown("/var/www/html", "www-data")?
```

## `file_exists`

```ab
pub fun file_exists(path: Text): Bool
```

Checks if a file exists.

```ab
if file_exists("config.txt") {
    echo "File exists"
}
```

## `file_extract`

```ab
pub fun file_extract(path: Text, target: Text): Null?
```

Extracts archive detecting extension. Supports: bz2, gz, xz, deb, rar, rpm, tar(gz/xz/bz), zip(war/jar), 7z. **Failable.**

Note: Not all tools support output folder path.

```ab
file_extract("archive.tar.gz", "/tmp/extracted")?
```

## `file_glob`

```ab
pub fun file_glob(path: Text): [Text]?
```

Finds all files/directories matching a glob pattern. **Failable.**

```ab
let files = file_glob("*.txt")?
```

## `file_glob_all`

```ab
pub fun file_glob_all(paths: [Text]): [Text]?
```

Finds files matching multiple glob patterns. **Failable.**

```ab
let files = file_glob_all(["*.txt", "*.md"])?
```

## `file_read`

```ab
pub fun file_read(path: Text): Text?
```

Gets file contents from path. **Failable.**

```ab
let content = file_read("data.txt") failed {
    echo "Could not read file"
}
```

## `file_write`

```ab
pub fun file_write(path: Text, content: Text): Text?
```

Writes content to a file. Does not check if file exists. **Failable.**

```ab
file_write("output.txt", "Hello, World!")?
```

## `symlink_create`

```ab
pub fun symlink_create(origin: Text, destination: Text): Null?
```

Creates a symbolic link. Fails if file doesn't exist. **Failable.**

```ab
symlink_create("/usr/bin/python3", "/usr/local/bin/python")?
```

## `temp_dir_create`

```ab
pub fun temp_dir_create(template: Text = "tmp.XXXXXXXXXX", auto_delete: Bool = false, force_delete: Bool = false): Text?
```

Creates a temporary directory and returns the path. **Failable.**

```ab
let temp = temp_dir_create("myapp.XXXXXX", true, false)?
```
