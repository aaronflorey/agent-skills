Source: https://fishshell.com/docs/current/cmds/nextd.html

# nextd - move forward through directory history[¶](#nextd-move-forward-through-directory-history "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

nextd \[\-l | \--list\] \[POS\]
COPY

## Description[¶](#description "Link to this heading")

`nextd` moves forwards _POS_ positions in the [history of visited directories](../interactive.html#directory-history); if the end of the history has been hit, a warning is printed.

If the **\-l** or **\--list** option is specified, the current directory history is also displayed.

The **\-h** or **\--help** option displays help about using this command.

Note that the `cd` command limits directory history to the 25 most recently visited directories. The history is stored in the `dirprev` and `dirnext` variables which this command manipulates.

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
    
-   the [prevd](prevd.html) command to move backward
