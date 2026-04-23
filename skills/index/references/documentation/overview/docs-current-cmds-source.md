Source: https://fishshell.com/docs/current/cmds/source.html

# source - evaluate contents of file[¶](#source-evaluate-contents-of-file "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

source FILE \[ARGUMENTS ...\]
SOMECOMMAND | source
. FILE \[ARGUMENTS ...\]
COPY

## Description[¶](#description "Link to this heading")

`source` evaluates the commands of the specified _FILE_ in the current shell as a new block of code. This is different from starting a new process to perform the commands (i.e. `fish < FILE`) since the commands will be evaluated by the current shell, which means that changes in shell variables will affect the current shell. If additional arguments are specified after the file name, they will be inserted into the [`argv`](../language.html#envvar-argv) variable. The [`argv`](../language.html#envvar-argv) variable will not include the name of the sourced file.

fish will search the working directory to resolve relative paths but will not search [`PATH`](../language.html#envvar-PATH) .

If no file is specified and a file or pipeline is connected to standard input, or if the file name `-` is used, `source` will read from standard input. If no file is specified and there is no redirected file or pipeline on standard input, an error will be printed.

The exit status of `source` is the exit status of the last job to execute. If something goes wrong while opening or reading the file, `source` exits with a non-zero status.

Some other shells only support the **.** alias (a single period). The use of **.** is deprecated in favour of `source`, and **.** will be removed in a future version of fish.

`source` creates a new [local scope](../language.html#variables-scope); `set --local` within a sourced block will not affect variables in the enclosing scope.

The **\-h** or **\--help** option displays help about using this command.

## Example[¶](#example "Link to this heading")

source ~/.config/fish/config.fish
\# Causes fish to re-read its initialization file.
COPY
