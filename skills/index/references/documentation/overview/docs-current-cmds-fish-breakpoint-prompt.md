Source: https://fishshell.com/docs/current/cmds/fish_breakpoint_prompt.html

# fish\_breakpoint\_prompt - define the prompt when stopped at a breakpoint[¶](#fish-breakpoint-prompt-define-the-prompt-when-stopped-at-a-breakpoint "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_breakpoint\_prompt
COPY

function fish\_breakpoint\_prompt
    ...
end
COPY

## Description[¶](#description "Link to this heading")

`fish_breakpoint_prompt` is the prompt function when asking for input in response to a [breakpoint](breakpoint.html) command.

The exit status of commands within `fish_breakpoint_prompt` will not modify the value of [$status](../language.html#variables-status) outside of the `fish_breakpoint_prompt` function.

`fish` ships with a default version of this function that displays the function name and line number of the current execution context.

## Example[¶](#example "Link to this heading")

A simple prompt that is a simplified version of the default debugging prompt:

function fish\_breakpoint\_prompt \-d "Write out the debug prompt"
    set \-l function (status current-function)
    set \-l line (status current-line-number)
    set \-l prompt "$function:$line >"
    echo \-ns (set\_color $fish\_color\_status) "BP $prompt" (set\_color \--reset) ' '
end
COPY
