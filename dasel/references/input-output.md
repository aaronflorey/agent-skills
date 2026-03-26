# Dasel v3 — Input/Output Reference

## Table of Contents
1. [CLI Flags](#cli-flags)
2. [Input formats](#input-formats)
3. [Output formats](#output-formats)
4. [Reading from stdin](#reading-from-stdin)
5. [Reading from a file](#reading-from-a-file)
6. [Writing output](#writing-output)
7. [The --root flag](#the---root-flag)
8. [Modifying data](#modifying-data)
9. [Editing files in place](#editing-files-in-place)
10. [Variables](#variables)
11. [Format-specific flags](#format-specific-flags)

---

## CLI Flags

> Note: `-f`/`--file` does **not** exist in v3. The bundled docs contain incorrect examples using `-f` as a data file flag — ignore those. Data input is always via stdin. `-c`/`--config` is the config file flag, not a data file flag.

| Flag | Short | Description |
|------|-------|-------------|
| `--in FORMAT` | `-i` | Input format (json, yaml, toml, xml, csv, hcl, ini, dasel) |
| `--out FORMAT` | `-o` | Output format |
| `--root` | | Output the full root document instead of final selector value |
| `--var name=fmt:file:path` | | Bind a file as a named variable |
| `--read-flag key=val` | | Parser-specific read option |
| `--write-flag key=val` | | Parser-specific write option |
| `--config PATH` | `-c` | Path to dasel config file (default: `~/dasel.yaml`) |
| `--unstable` | | Enable experimental features (e.g. `branch`) |

---

## Input formats

| Format | Notes |
|--------|-------|
| `json` | |
| `yaml` | |
| `toml` | Generally working; unsorted maps |
| `xml` | See `xml-mode` flag |
| `csv` | All values read as strings |
| `hcl` | See `hcl-block-format` flag |
| `ini` | Basic sections + key values |
| `dasel` | Parse dasel literals on input strings; read-only |

---

## Output formats

Same set as input formats (except `dasel` is read-only).

Convert between formats:
```bash
cat file.json | dasel -i json -o yaml
cat file.yaml | dasel -i yaml -o toml
cat file.xml  | dasel -i xml  -o json
```

---

## Reading from stdin

```bash
echo '{"name":"Tom"}' | dasel -i json 'name'
# => "Tom"

# Must specify -i when piping; dasel hangs waiting for input otherwise
cat data.yaml | dasel -i yaml 'server.port'
```

---

## Reading from a file

There is no `-f`/`--file` flag for data files in v3. Use stdin redirection instead:

```bash
# Redirect a file to stdin
dasel -i yaml 'database.host' < config.yaml
dasel -i json 'users[0].name' < data.json

# Or pipe
cat data.json | dasel -i json 'users[0].name'
```

---

## Writing output

By default dasel prints the result of the **final expression** to stdout.

```bash
echo '{"user":{"name":"John"}}' | dasel -i json 'user.name'
# => "John"

# Change output format
echo '{"msg":"hello"}' | dasel -i json -o yaml
# => msg: hello
```

---

## The --root flag

By default, when you modify a value dasel outputs only that value. `--root` changes this to output the **entire document** — essential for file editing workflows.

```bash
# Without --root (outputs only the changed value)
echo '{"foo":"old"}' | dasel -i json 'foo = "new"'
# => "new"

# With --root (outputs full document)
echo '{"foo":"old"}' | dasel -i json --root 'foo = "new"'
# => {"foo": "new"}
```

---

## Modifying data

Assignment uses `=` inside the query:

```bash
# Modify a nested field
echo '{"db":{"port":5432}}' | dasel -i json --root 'db.port = 5433'

# Assign a constructed object
echo '{"user":{"name":"John"}}' | \
  dasel -i json --root 'user.name = {"first": user.name, "last": "Doe"}'
# => {"user":{"name":{"first":"John","last":"Doe"}}}

# Modify all array elements
echo '[1,2,3]' | dasel -i json --root 'each($this = $this + 10)'
# => [11, 12, 13]
```

---

## Editing files in place

> V3 removed the `-w` flag. Use the temp-file pattern instead.

```bash
dasel -i yaml --root 'server.port = 9090' < config.yaml > config.yaml.tmp \
  && mv config.yaml.tmp config.yaml
```

**Why the temp file?** Bash truncates the output file before running the command. Redirecting straight to the source file would make dasel read an empty file.

Pattern for any format:
```bash
dasel -i json --root 'users[0].name = "Alice"' < data.json > data.json.tmp \
  && mv data.json.tmp data.json
```

---

## Variables

### Standard variables

| Variable | Meaning |
|----------|---------|
| `$root` | The root document from stdin |
| `$this` | The current element (inside functions like `map`, `filter`, `each`) |

### Environment variables

Access any env var with `$VAR_NAME`:

```bash
GREETING=hello NAME=tom dasel '$GREETING + " " + $NAME'
# => "hello tom"
```

> Changes to env vars inside dasel are not supported.

### CLI variables

Pass a file as a variable:

```bash
dasel --var config=yaml:file:config.yaml '$config.server.host'

# Multiple vars
dasel \
  --var users=json:file:users.json \
  --var roles=json:file:roles.json \
  '$users.filter(active == true).map(name)'
```

Format: `--var name=format:file:filepath`

### Multi-statement queries with variables

```
$active = $root.users.filter(active == true);
$names  = $active.map(name);
$names
```

---

## Format-specific flags

### CSV

```bash
# Custom delimiter (default is comma)
dasel -i csv --read-flag csv-delimiter=; 'data'
dasel -i csv --write-flag csv-delimiter=; 'data'
```

### XML

```bash
# Structured mode changes the internal representation
dasel -i xml --read-flag xml-mode=structured 'root.child'
```

### HCL

```bash
# Force blocks to always be arrays, even when no duplicates
dasel -i hcl --read-flag hcl-block-format=array 'resource'
```
