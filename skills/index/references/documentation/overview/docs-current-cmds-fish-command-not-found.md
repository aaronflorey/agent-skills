Source: https://fishshell.com/docs/current/cmds/fish_command_not_found.html

# fish\_command\_not\_found - what to do when a command wasn’t found[¶](#fish-command-not-found-what-to-do-when-a-command-wasn-t-found "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

function fish\_command\_not\_found
   ...
end
COPY

## Description[¶](#description "Link to this heading")

When fish tries to execute a command and can’t find it, it invokes this function.

It can print a message to tell you about it, and it often also checks for a missing package that would include the command.

Fish ships multiple handlers for various operating systems and chooses from them when this function is loaded, or you can define your own.

It receives the full commandline as one argument per token, so $argv\[1\] contains the missing command.

When you leave `fish_command_not_found` undefined (e.g. by adding an empty function file) or explicitly call `__fish_default_command_not_found_handler`, fish will just print a simple error.

## Example[¶](#example "Link to this heading")

A simple handler:

function fish\_command\_not\_found
    echo Did not find command $argv\[1\]
end

\> flounder
Did not find command flounder
COPY

Or the handler for OpenSUSE’s command-not-found:

function fish\_command\_not\_found
    /usr/bin/command-not-found $argv\[1\]
end
COPY

Or the simple default handler:

function fish\_command\_not\_found
    \_\_fish\_default\_command\_not\_found\_handler $argv
end
COPY

## Backwards compatibility[¶](#backwards-compatibility "Link to this heading")

This command was introduced in fish 3.2.0. Previous versions of fish used the “fish\_command\_not\_found” [event](../language.html#event) instead.

To define a handler that works in older versions of fish as well, define it the old way:

function \_\_fish\_command\_not\_found\_handler \--on-event fish\_command\_not\_found
     echo COMMAND WAS NOT FOUND MY FRIEND $argv\[1\]
end
COPY

in which case fish will define a `fish_command_not_found` that calls it, or define a wrapper:

function fish\_command\_not\_found
     echo "G'day mate, could not find your command: $argv"
end

function \_\_fish\_command\_not\_found\_handler \--on-event fish\_command\_not\_found
     fish\_command\_not\_found $argv
end
COPY
