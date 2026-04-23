Source: https://fishshell.com/docs/current/cmds/dirh.html

# dirh - print directory history[¶](#dirh-print-directory-history "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

dirh
COPY

## Description[¶](#description "Link to this heading")

`dirh` prints the current [directory history](../interactive.html#directory-history). The current position in the history is highlighted using the color defined in the `fish_color_history_current` environment variable.

`dirh` does not accept any parameters.

Note that the [cd](cd.html) command limits directory history to the 25 most recently visited directories. The history is stored in the `$dirprev` and `$dirnext` variables.

## See Also[¶](#see-also "Link to this heading")

-   the [cdh](cdh.html) command to display a prompt to quickly navigate the history
    
-   the [prevd](prevd.html) command to move backward
    
-   the [nextd](nextd.html) command to move forward
