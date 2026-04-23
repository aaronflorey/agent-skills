Source: https://fishshell.com/docs/current/cmds/fish_right_prompt.html

# fish\_right\_prompt - define the appearance of the right-side command line prompt[¶](#fish-right-prompt-define-the-appearance-of-the-right-side-command-line-prompt "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

function fish\_right\_prompt
    ...
end
COPY

## Description[¶](#description "Link to this heading")

`fish_right_prompt` is similar to `fish_prompt`, except that it appears on the right side of the terminal window.

Multiple lines are not supported in `fish_right_prompt`.

If [`fish_transient_prompt`](../language.html#envvar-fish_transient_prompt) is set to 1, `fish_right_prompt --final-rendering` is run before executing the commandline.

## Example[¶](#example "Link to this heading")

A simple right prompt:

function fish\_right\_prompt \-d "Write out the right prompt"
    date '+%m/%d/%y'
end
COPY
