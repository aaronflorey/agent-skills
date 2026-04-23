Source: https://fishshell.com/docs/current/cmds/break.html

# break - stop the current inner loop[¶](#break-stop-the-current-inner-loop "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

LOOP\_CONSTRUCT
   \[COMMANDS ...\]
   break
   \[COMMANDS ...\]
end
COPY

## Description[¶](#description "Link to this heading")

`break` halts a currently running loop (_LOOP\_CONSTRUCT_), such as a [for](for.html) or [while](while.html) loop. It is usually added inside of a conditional block such as an [if](if.html) block.

The **\-h** or **\--help** option displays help about using this command.

## Example[¶](#example "Link to this heading")

The following code searches all .c files for “smurf”, and halts at the first occurrence.

for i in \*.c
    if grep smurf $i
        echo Smurfs are present in $i
        break
    end
end
COPY

## See Also[¶](#see-also "Link to this heading")

-   the [continue](continue.html) command, to skip the remainder of the current iteration of the current inner loop
