Source: https://fishshell.com/docs/current/cmds/builtin.html

# builtin - run a builtin command[¶](#builtin-run-a-builtin-command "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

builtin \[OPTIONS\] BUILTINNAME
builtin \--query BUILTINNAME ...
builtin \--names
COPY

## Description[¶](#description "Link to this heading")

`builtin` forces the shell to use a builtin command named _BUILTIN_, rather than a function or external program.

The following options are available:

**\-n** or **\--names**

Lists the names of all defined builtins.

**\-q** or **\--query** _BUILTIN_

Tests if any of the specified builtins exist. If any exist, it returns 0, 1 otherwise.

**\-h** or **\--help**

Displays help about using this command.

## Example[¶](#example "Link to this heading")

builtin jobs
\# executes the jobs builtin, even if a function named jobs exists
COPY
