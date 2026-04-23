Source: https://fishshell.com/docs/current/cmds/not.html

# not - negate the exit status of a job[¶](#not-negate-the-exit-status-of-a-job "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

not COMMAND \[OPTIONS ...\]
! COMMAND \[OPTIONS ...\]
COPY

## Description[¶](#description "Link to this heading")

`not` negates the exit status of another command. If the exit status is zero, `not` returns 1. Otherwise, `not` returns 0.

Some other shells only support the `!` alias.

The **\-h** or **\--help** option displays help about using this command.

## Example[¶](#example "Link to this heading")

The following code reports an error and exits if no file named spoon can be found.

if not test \-f spoon
    echo There is no spoon
    exit 1
end
COPY
