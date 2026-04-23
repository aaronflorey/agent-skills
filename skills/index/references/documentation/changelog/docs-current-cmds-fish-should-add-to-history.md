Source: https://fishshell.com/docs/current/cmds/fish_should_add_to_history.html

# fish\_should\_add\_to\_history - decide whether a command should be added to the history[¶](#fish-should-add-to-history-decide-whether-a-command-should-be-added-to-the-history "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_should\_add\_to\_history
COPY

function fish\_should\_add\_to\_history
    ...
end
COPY

## Description[¶](#description "Link to this heading")

The `fish_should_add_to_history` function is executed before fish adds a command to history, and its return status decides whether that is done.

If it returns 0, the command is stored in history, when it returns anything else, it is not. In the latter case the command can still be recalled for one command.

The first argument to `fish_should_add_to_history` is the commandline. History is added _before_ a command is run, so e.g. [`status`](../language.html#envvar-status) can’t be checked. This is so commands that don’t finish like [exec - execute command in current process](exec.html) and long-running commands are available in new sessions immediately.

If `fish_should_add_to_history` doesn’t exist, fish will save a command to history unless it starts with a space. If it does exist, this function takes over all of the duties, so commands starting with space are saved unless `fish_should_add_to_history` says otherwise.

## Example[¶](#example "Link to this heading")

A simple example:

function fish\_should\_add\_to\_history
    for cmd in vault mysql ls
         string match \-qr "^$cmd" \-- $argv; and return 1
    end
    return 0
end
COPY

This refuses to store any immediate “vault”, “mysql” or “ls” calls. Commands starting with space would be stored.

function fish\_should\_add\_to\_history
    \# I don't want \`git pull\`s in my history when I'm in a specific repository
    if string match \-qr '^git pull' \-- "$argv"
    and string match \-qr "^/home/me/my-secret-project/" \-- (pwd \-P)
        return 1
    end

    return 0
end
COPY
