Source: https://fishshell.com/docs/current/cmds/exit.html

# exit - exit the shell[¶](#exit-exit-the-shell "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

exit \[CODE\]
COPY

## Description[¶](#description "Link to this heading")

**exit** is a special builtin that causes the shell to exit. Either 255 or the _CODE_ supplied is used, whichever is lesser. Otherwise, the exit status will be that of the last command executed.

If exit is called while sourcing a file (using the [source](source.html) builtin) the rest of the file will be skipped, but the shell itself will not exit.

The **\--help** or **\-h** option displays help about using this command.
