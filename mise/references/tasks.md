# Tasks Reference

Tasks are project-specific commands defined in `mise.toml` or as standalone scripts.

## TOML Tasks

### Basic Syntax

```toml
[tasks]
build = "npm run build"
test = "cargo test"

# Detailed form
[tasks.build]
run = "cargo build"
description = "Build the CLI"
alias = "b"
```

### Multiple Commands

```toml
[tasks.ci]
run = [
  "npm run lint",
  "npm run test",
  "npm run build"
]
```

### Task Options

```toml
[tasks.build]
run = "cargo build"
description = "Build the project"
alias = "b"                    # mise run b
dir = "{{cwd}}"               # Run in current dir (default: project root)
env = { RUST_BACKTRACE = "1" } # Task-specific env vars
hide = true                    # Hide from task list
```

### Dependencies

```toml
[tasks.build]
run = "npm run build"

[tasks.test]
depends = ["build"]            # Run build first
run = "npm test"

[tasks.deploy]
depends = ["build", "test"]
depends_post = ["notify"]      # Run after deploy
wait_for = ["docker-up"]       # Wait for, don't fail if missing
run = "./deploy.sh"
```

### Sources and Outputs (Incremental)

```toml
[tasks.build]
run = "tsc"
sources = ["src/**/*.ts", "tsconfig.json"]
outputs = ["dist/**/*.js"]
# Task skipped if sources unchanged and outputs exist
```

### Confirmation Prompt

```toml
[tasks.deploy-prod]
confirm = "Deploy to production?"
run = "./deploy.sh production"
```

### Shell/Interpreter

```toml
[tasks.lint]
shell = "bash -c"
run = "shellcheck *.sh"

# Or use shebang
[tasks.python-task]
run = '''
#!/usr/bin/env python
print("Hello from Python")
'''
```

### Arguments

#### Recommended: Usage Field

```toml
[tasks.greet]
usage = '''
arg "<name>" help="Name to greet" default="World"
flag "-l --loud" help="Shout greeting"
flag "-c --count <n>" help="Times to repeat" default="1"
'''
run = '''
for i in $(seq 1 ${usage_count}); do
  if [ "$usage_loud" = "true" ]; then
    echo "HELLO ${usage_name}!"
  else
    echo "Hello ${usage_name}"
  fi
done
'''
```

Arguments are available as `usage_<name>` env vars.

#### Usage Spec Syntax

```
arg "<name>"                           # Required positional
arg "[name]"                           # Optional positional
arg "<file>..." help="Input files"     # Variadic (multiple values)
flag "-v --verbose"                    # Boolean flag
flag "-o --output <file>"              # Flag with value
flag "-c --count <n>" default="1"      # With default
flag "--format <fmt>" {                # With choices
  choices "json" "yaml" "toml"
}
```

### Windows-Specific

```toml
[tasks.build]
run = "make build"
run_windows = "nmake build"
```

## File Tasks

Place executable scripts in `mise-tasks/`, `.mise-tasks/`, or `.mise/tasks/`.

### Basic File Task

```bash
#!/usr/bin/env bash
# mise-tasks/build

#MISE description="Build the project"
#MISE alias="b"
#MISE depends=["lint"]

npm run build
```

### All File Task Options

```bash
#!/usr/bin/env bash
#MISE description="Run tests"
#MISE alias="t"
#MISE depends=["build"]
#MISE sources=["src/**/*.ts", "tests/**/*.ts"]
#MISE outputs=["coverage/**"]
#MISE env={NODE_ENV = "test"}
#MISE dir="{{cwd}}"
#MISE tools={node = "20"}
```

### File Task with Arguments

```bash
#!/usr/bin/env bash
# mise-tasks/test

#USAGE flag "-v --verbose" help="Verbose output"
#USAGE flag "--coverage" help="Collect coverage"
#USAGE arg "[pattern]" help="Test pattern" default="**/*.test.ts"

ARGS=""
if [ "$usage_verbose" = "true" ]; then
  ARGS="$ARGS --verbose"
fi
if [ "$usage_coverage" = "true" ]; then
  ARGS="$ARGS --coverage"
fi

npm test -- $ARGS "${usage_pattern}"
```

### Task Grouping

```
mise-tasks/
├── build
├── test/
│   ├── _default     # mise run test
│   ├── unit         # mise run test:unit
│   └── e2e          # mise run test:e2e
└── deploy/
    ├── staging      # mise run deploy:staging
    └── production   # mise run deploy:production
```

### Different Languages

```python
#!/usr/bin/env python
# mise-tasks/analyze
#MISE description="Analyze data"

import json
print(json.dumps({"status": "ok"}))
```

```javascript
#!/usr/bin/env node
// mise-tasks/greet
//MISE description="Greet user"

console.log("Hello!");
```

## Running Tasks

### Basic Execution

```bash
mise run build              # Run single task
mise run test build         # Run multiple (sequential)
mise run lint ::: test      # Run in parallel
mise run test -- --verbose  # Pass arguments
```

### Flags

```bash
mise run -f build           # Force run (ignore up-to-date)
mise run -n build           # Dry run
mise run -j 8 build         # 8 parallel jobs
mise run -r test            # Raw output (no buffering)
mise run -q build           # Quiet mode
mise run -S build           # Silent (errors only)
```

### Output Modes

```bash
mise run -o prefix build    # Prefix each line with task name
mise run -o interleave build # Direct output, interleaved
mise run -o quiet build     # Minimal output
```

### Watch Mode

```bash
mise watch -t build         # Watch and run build on changes
mise watch build            # Watch task sources
```

## Task Environment Variables

Tasks receive these env vars:

| Variable | Description |
|----------|-------------|
| `MISE_ORIGINAL_CWD` | Directory where task was invoked |
| `MISE_CONFIG_ROOT` | Project root directory |
| `MISE_PROJECT_ROOT` | Same as CONFIG_ROOT |
| `MISE_TASK_NAME` | Current task name |
| `MISE_TASK_DIR` | Directory containing task script |
| `MISE_TASK_FILE` | Full path to task script |

## Remote Tasks

```toml
[tasks.build]
file = "https://example.com/build.sh"

# From git
[tasks.deploy]
file = "git::https://github.com/org/repo.git//scripts/deploy.sh?ref=v1.0"
```

## Task Templates

Use Tera templates in task definitions:

```toml
[tasks.build]
run = "cargo build --target {{env.TARGET}}"
dir = "{{config_root}}/packages/core"
```

Available template variables:
- `{{cwd}}` - current working directory
- `{{config_root}}` - project root
- `{{env.VAR}}` - environment variable
- `{{tools.node.version}}` - tool version
