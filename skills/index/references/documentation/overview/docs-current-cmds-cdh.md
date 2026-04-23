Source: https://fishshell.com/docs/current/cmds/cdh.html

# cdh - change to a recently visited directory[¶](#cdh-change-to-a-recently-visited-directory "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

cdh \[DIRECTORY\]
COPY

## Description[¶](#description "Link to this heading")

`cdh` with no arguments presents a list of [recently visited directories](../interactive.html#directory-history). You can then select one of the entries by letter or number. You can also press tab to use the completion pager to select an item from the list. If you give it a single argument it is equivalent to `cd DIRECTORY`.

Note that the `cd` command limits directory history to the 25 most recently visited directories. The history is stored in the `dirprev` and `dirnext` variables, which this command manipulates. If you make those universal variables, your `cd` history is shared among all fish instances.

## See Also[¶](#see-also "Link to this heading")

-   the [dirh](dirh.html) command to print the directory history
    
-   the [prevd](prevd.html) command to move backward
    
-   the [nextd](nextd.html) command to move forward
