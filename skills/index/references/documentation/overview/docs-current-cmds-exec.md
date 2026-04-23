Source: https://fishshell.com/docs/current/cmds/exec.html

# exec - execute command in current process[¶](#exec-execute-command-in-current-process "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

exec COMMAND
COPY

## Description[¶](#description "Link to this heading")

`exec` replaces the currently running shell with a new command. On successful completion, `exec` never returns. `exec` cannot be used inside a pipeline.

The **\--help** or **\-h** option displays help about using this command.

## Example[¶](#example "Link to this heading")

`exec emacs` starts up the emacs text editor, and exits `fish`. When emacs exits, the session will terminate.
