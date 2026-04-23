Source: https://fishshell.com/docs/current/cmds/command.html

# command - run a program[¶](#command-run-a-program "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

command \[OPTIONS\] \[COMMANDNAME \[ARG ...\]\]
COPY

## Description[¶](#description "Link to this heading")

**command** forces the shell to execute the program _COMMANDNAME_ and ignore any functions or builtins with the same name.

In `command foo`, `command` is a keyword.

The following options are available:

**\-a** or **\--all**

Prints all _COMMAND_ found in [`PATH`](../language.html#envvar-PATH), in the order found.

**\-q** or **\--query**

Return 0 if any of the given commands could be found, 127 otherwise. Don’t print anything. For compatibility, this is also **\--quiet** (deprecated).

**\-s** or **\--search** (or **\-v**)

Prints the external command that would be executed, or prints nothing if no file with the specified name could be found in [`PATH`](../language.html#envvar-PATH).

**\-h** or **\--help**

Displays help about using this command.

## Examples[¶](#examples "Link to this heading")

`command ls` executes the `ls` program, even if an `ls` function also exists.

`command -s ls` prints the path to the `ls` program.

`command -q git; and command git log` runs `git log` only if `git` exists.

`command -sq git` and `command -q git` and `command -vq git` return true (0) if a git command could be found and don’t print anything.
