Source: https://fishshell.com/docs/current/cmds/or.html

# or - conditionally execute a command[¶](#or-conditionally-execute-a-command "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

COMMAND1; or COMMAND2
COPY

## Description[¶](#description "Link to this heading")

`or` is used to execute a command if the previous command was not successful (returned a status of something other than 0).

`or` statements may be used as part of the condition in an [if](if.html) or [while](while.html) block.

`or` does not change the current exit status itself, but the command it runs most likely will. The exit status of the last foreground command to exit can always be accessed using the [$status](../language.html#variables-status) variable.

The **\-h** or **\--help** option displays help about using this command.

## Example[¶](#example "Link to this heading")

The following code runs the `make` command to build a program. If the build succeeds, the program is installed. If either step fails, `make clean` is run, which removes the files created by the build process.

make; and make install; or make clean
COPY

## See Also[¶](#see-also "Link to this heading")

-   [and](and.html) command
