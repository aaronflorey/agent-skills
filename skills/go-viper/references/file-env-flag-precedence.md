# File, env, and flag precedence

Use this reference when the user specifically asks how Viper combines config file values, environment variables, and CLI flags.

## The precedence model to explain

Viper merges configuration in this order, highest to lowest:

1. explicit `Set`
2. flags
3. environment variables
4. config file
5. remote key/value store
6. defaults

When explaining behavior, always describe the winning value in terms of this stack.

## Example matrix

Assume the code sets:

```go
v.SetDefault("server.port", 8080)
```

And the app also supports:

- config file key `server.port`
- env var `MYAPP_SERVER_PORT`
- flag `--server-port`

Then Viper resolves values like this:

| Source present | Winning value | Why |
| --- | --- | --- |
| default only | `8080` | nothing higher overrides it |
| file says `9000` | `9000` | file beats default |
| file says `9000`, env says `9100` | `9100` | env beats file |
| file says `9000`, env says `9100`, flag says `9200` | `9200` | flag beats env |

## Recommended explanation pattern

When the user asks, "why is my config value X instead of Y?", answer in this form:

1. name the canonical key, such as `server.port`
2. list all candidate sources you see
3. identify the highest-precedence source that sets it
4. mention the exact flag or env var name involved

Example:

"`server.port` ends up as `9200` because Viper sees the value from `--server-port`, and flags override both `MYAPP_SERVER_PORT` and the config file value."

## Mapping one logical setting across sources

Keep the logical key stable across all sources:

- logical key: `server.port`
- YAML: `server.port` under the `server` section
- env: `MYAPP_SERVER_PORT`
- flag: `--server-port`

That consistency makes the precedence rules easy to explain and test.

## When to use explicit bindings

Use explicit `BindEnv` or `BindPFlag` when:

- the public env var or flag name is important API surface
- the names do not naturally match the Viper key
- you need to preserve a legacy environment variable name

Examples:

```go
_ = v.BindEnv("server.port", "APP_PORT")
_ = v.BindPFlag("server.port", fs.Lookup("listen-port"))
```

## Subtle behaviors worth mentioning

- `AutomaticEnv()` checks env vars during value access, not once at startup.
- `BindEnv("server.port", "APP_PORT")` uses `APP_PORT` exactly; it does not prepend the env prefix.
- Empty env vars are ignored unless `AllowEmptyEnv(true)` is set.
- Nested keys usually need `SetEnvKeyReplacer(strings.NewReplacer(".", "_", "-", "_"))`.

## Good examples to produce

When generating code or explanations, prefer examples that include all three sources in one loader:

- defaults for local development
- config file search paths
- env prefix plus key replacer
- explicit env binding for one important key
- explicit flag binding for one nested key
- `Unmarshal` into a typed `Config`
