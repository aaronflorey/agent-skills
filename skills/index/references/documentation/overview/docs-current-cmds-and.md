Source: https://fishshell.com/docs/current/cmds/and.html

# and - conditionally execute a command[¶](#and-conditionally-execute-a-command "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

PREVIOUS; and COMMAND
COPY

## Description[¶](#description "Link to this heading")

`and` is used to execute a command if the previous command was successful (returned a status of 0).

`and` statements may be used as part of the condition in an [while](while.html) or [if](if.html) block.

`and` does not change the current exit status itself, but the command it runs most likely will. The exit status of the last foreground command to exit can always be accessed using the [$status](../language.html#variables-status) variable.

The **\-h** or **\--help** option displays help about using this command.

## Example[¶](#example "Link to this heading")

The following code runs the `make` command to build a program. If the build succeeds, `make`’s exit status is 0, and the program is installed. If either step fails, the exit status is 1, and `make clean` is run, which removes the files created by the build process.

make; and make install; or make clean
COPY

## See Also[¶](#see-also "Link to this heading")

-   [or](or.html) command
    
-   [not](not.html) command
