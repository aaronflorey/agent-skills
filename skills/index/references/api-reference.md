# API Reference

## Keywords And Structural Commands

- `if`, `for`, `while`, `switch`, `case`
- `function`, `return`
- `begin`, `end`
- `and`, `or`, `not`

## Core Builtins And Tools

- `set`: variables, export, erase, query
- `read`: interactive and script input
- `string`: string processing
- `path`: path manipulation
- `math`: numeric evaluation
- `argparse`: argument parsing in fish scripts and functions
- `count`, `contains`, `test`, `type`
- `eval`, `source`
- `status`: execution context, features, terminal info, stack traces
- `random`

## Interactive Builtins

- `abbr`: abbreviations
- `bind`: key bindings
- `commandline`: current command-line state
- `complete`: completion definitions
- `fish_config`: prompt/theme configuration UI

## Prompt And Hook Functions

- `fish_prompt`
- `fish_right_prompt`
- `fish_mode_prompt`
- `fish_command_not_found`
- `fish_title`
- `fish_tab_title`
- `fish_greeting`
- `fish_should_add_to_history`

## Prompt Helper Functions

- `prompt_pwd`
- `prompt_login`
- `prompt_hostname`
- `fish_is_root_user`
- `fish_vcs_prompt`
- `fish_git_prompt`
- `fish_hg_prompt`
- `fish_svn_prompt`
- `fish_status_to_signal`
- `fish_add_path`
- `alias`
- `fish_delta`

## Completion Authoring

- Define completions with `complete -c COMMAND ...`.
- Common flags:
- `-a` arguments
- `-s` short option
- `-l` GNU long option
- `-o` old-style long option
- `-r` option requires parameter
- `-f` disable file completions
- `-F` force file completions
- `-n` conditional activation
- `-d` description
- `-w` wrap existing completions
- `-e` erase matching completions
- `-C` evaluate completions for a command line

## Useful Completion Helpers

- `__fish_complete_directories`
- `__fish_complete_path`
- `__fish_complete_groups`
- `__fish_complete_pids`
- `__fish_complete_users`

## Useful `status` Subcommands

- `status --is-interactive`
- `status --is-login`
- `status is-breakpoint`
- `status filename`
- `status dirname`
- `status line-number`
- `status print-stack-trace`
- `status features`
- `status test-feature`
- `status build-info`
- `status terminal`
- `status terminal-os`
- `status test-terminal-feature`
- `status language`

## Helper Commands

- `fish_indent`: format fish code
- `fish_key_reader`: inspect key sequences for bindings
