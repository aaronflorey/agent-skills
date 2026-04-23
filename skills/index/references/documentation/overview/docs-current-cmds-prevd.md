Source: https://fishshell.com/docs/current/cmds/prevd.html

# prevd - move backward through directory history[¶](#prevd-move-backward-through-directory-history "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

prevd \[\-l | \--list\] \[POS\]
COPY

## Description[¶](#description "Link to this heading")

`prevd` moves backwards _POS_ positions in the [history of visited directories](../interactive.html#directory-history); if the beginning of the history has been hit, a warning is printed.

If the **\-l** or **\--list** flag is specified, the current history is also displayed.

Note that the `cd` command limits directory history to the 25 most recently visited directories. The history is stored in the `dirprev` and `dirnext` variables which this command manipulates.

The **\-h** or **\--help** option displays help about using this command.

## Example[¶](#example "Link to this heading")

cd /usr/src
\# Working directory is now /usr/src

cd /usr/src/fish-shell
\# Working directory is now /usr/src/fish-shell

prevd
\# Working directory is now /usr/src

nextd
\# Working directory is now /usr/src/fish-shell
COPY

## See Also[¶](#see-also "Link to this heading")

-   the [cdh](cdh.html) command to display a prompt to quickly navigate the history
    
-   the [dirh](dirh.html) command to print the directory history
    
-   the [nextd](nextd.html) command to move forward
