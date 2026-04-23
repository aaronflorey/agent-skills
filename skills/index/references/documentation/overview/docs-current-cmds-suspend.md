Source: https://fishshell.com/docs/current/cmds/suspend.html

# suspend - suspend the current shell[¶](#suspend-suspend-the-current-shell "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

suspend \[\--force\]
COPY

## Description[¶](#description "Link to this heading")

`suspend` suspends execution of the current shell by sending it a SIGTSTP signal, returning to the controlling process. It can be resumed later by sending it a SIGCONT. In order to prevent suspending a shell that doesn’t have a controlling process, it will not suspend the shell if it is a login shell. This requirement is bypassed if the **\--force** option is given or the shell is not interactive.
