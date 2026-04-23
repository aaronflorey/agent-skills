Source: https://fishshell.com/docs/current/cmds/isatty.html

# isatty - test if a file descriptor is a terminal[¶](#isatty-test-if-a-file-descriptor-is-a-terminal "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

isatty \[FILE\_DESCRIPTOR\]
COPY

## Description[¶](#description "Link to this heading")

`isatty` tests if a file descriptor is a terminal (as opposed to a file). The name is derived from the system call of the same name, which for historical reasons refers to a teletypewriter (TTY).

`FILE DESCRIPTOR` may be either the number of a file descriptor, or one of the strings `stdin`, `stdout`, or `stderr`. If not specified, zero is assumed.

If the specified file descriptor is a terminal device, the exit status of the command is zero. Otherwise, the exit status is non-zero. No messages are printed to standard error.

The **\-h** or **\--help** option displays help about using this command.

## Examples[¶](#examples "Link to this heading")

From an interactive shell, the commands below exit with a return value of zero:

isatty
isatty stdout
isatty 2
echo | isatty 1
COPY

And these will exit non-zero:

echo | isatty
isatty 9
isatty stdout \> file
isatty 2 2> file
COPY
