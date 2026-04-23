Source: https://fishshell.com/docs/current/cmds/while.html

# while - perform a set of commands multiple times[¶](#while-perform-a-set-of-commands-multiple-times "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

while CONDITION; COMMANDS; end
COPY

## Description[¶](#description "Link to this heading")

**while** repeatedly executes `CONDITION`, and if the exit status is 0, then executes `COMMANDS`.

The exit status of the **while** loop is the exit status of the last iteration of the `COMMANDS` executed, or 0 if none were executed. (This matches other shells and is POSIX-compatible.)

You can use [and](and.html) or [or](or.html) for complex conditions. Even more complex control can be achieved with `while true` containing a [break](break.html).

The **\-h** or **\--help** option displays help about using this command.

## Example[¶](#example "Link to this heading")

while test \-f foo.txt; or test \-f bar.txt ; echo file exists; sleep 10; end
\# outputs 'file exists' at 10 second intervals,
\# as long as the file foo.txt or bar.txt exists.
COPY
