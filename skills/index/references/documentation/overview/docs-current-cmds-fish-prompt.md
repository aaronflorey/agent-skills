Source: https://fishshell.com/docs/current/cmds/fish_prompt.html

# fish\_prompt - define the appearance of the command line prompt[¶](#fish-prompt-define-the-appearance-of-the-command-line-prompt "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_prompt
COPY

function fish\_prompt
    ...
end
COPY

## Description[¶](#description "Link to this heading")

The `fish_prompt` function is executed when the prompt is to be shown, and the output is used as a prompt.

The exit status of commands within `fish_prompt` will not modify the value of [$status](../language.html#variables-status) outside of the `fish_prompt` function.

If [`fish_transient_prompt`](../language.html#envvar-fish_transient_prompt) is set to 1, `fish_prompt --final-rendering` is run before executing the commandline.

If [`SHELL_PROMPT_PREFIX`](../language.html#envvar-SHELL_PROMPT_PREFIX) or [`SHELL_PROMPT_SUFFIX`](../language.html#envvar-SHELL_PROMPT_SUFFIX) are set, they are automatically prepended and appended to the left prompt. This applies to all prompts regardless of whether `fish_prompt` has been customized.

`fish` ships with a number of example prompts that can be chosen with the `fish_config` command.

## Example[¶](#example "Link to this heading")

A simple prompt:

function fish\_prompt \-d "Write out the prompt"
    \# This shows up as USER@HOST /home/user/ >, with the directory colored
    \# $USER and $hostname are set by fish, so you can just use them
    \# instead of using \`whoami\` and \`hostname\`
    printf '%s@%s %s%s%s > ' $USER $hostname \\
        (set\_color $fish\_color\_cwd) (prompt\_pwd) (set\_color \--reset)
end
COPY
