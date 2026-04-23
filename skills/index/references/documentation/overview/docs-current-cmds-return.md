Source: https://fishshell.com/docs/current/cmds/return.html

# return - stop the current inner function[¶](#return-stop-the-current-inner-function "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

return \[N\]
COPY

## Description[¶](#description "Link to this heading")

**return** halts a currently running function. The exit status is set to _N_ if it is given. If **return** is invoked outside of a function or dot script it is equivalent to exit.

It is often added inside of a conditional block such as an [if](if.html) statement or a [switch](switch.html) statement to conditionally stop the executing function and return to the caller; it can also be used to specify the exit status of a function.

If at the top level of a script, it exits with the given status, like [exit](exit.html). If at the top level in an interactive session, it will set [`status`](../language.html#envvar-status), but not exit the shell.

The **\-h** or **\--help** option displays help about using this command.

## Example[¶](#example "Link to this heading")

An implementation of the false command as a fish function:

function false
    return 1
end
COPY
