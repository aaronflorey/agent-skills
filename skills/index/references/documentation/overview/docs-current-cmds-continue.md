Source: https://fishshell.com/docs/current/cmds/continue.html

# continue - skip the remainder of the current iteration of the current inner loop[¶](#continue-skip-the-remainder-of-the-current-iteration-of-the-current-inner-loop "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

LOOP\_CONSTRUCT; \[COMMANDS ...;\] continue; \[COMMANDS ...;\] end
COPY

## Description[¶](#description "Link to this heading")

`continue` skips the remainder of the current iteration of the current inner loop, such as a [for](for.html) loop or a [while](while.html) loop. It is usually added inside of a conditional block such as an [if](if.html) statement or a [switch](switch.html) statement.

The **\-h** or **\--help** option displays help about using this command.

## Example[¶](#example "Link to this heading")

The following code removes all tmp files that do not contain the word smurf.

for i in \*.tmp
    if grep smurf $i
        continue
    end
    \# This "rm" is skipped over if "continue" is executed.
    rm $i
    \# As is this "echo"
    echo $i
end
COPY

## See Also[¶](#see-also "Link to this heading")

-   the [break](break.html) command, to stop the current inner loop
