Source: https://fishshell.com/docs/current/cmds/fish_greeting.html

# fish\_greeting - display a welcome message in interactive shells[¶](#fish-greeting-display-a-welcome-message-in-interactive-shells "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_greeting
COPY

function fish\_greeting
    ...
end
COPY

## Description[¶](#description "Link to this heading")

When an interactive fish starts, it executes fish\_greeting and displays its output.

The default fish\_greeting is a function that prints a variable of the same name (`$fish_greeting`), so you can also just change that if you just want to change the text.

If [`SHELL_WELCOME`](../language.html#envvar-SHELL_WELCOME) is set, it is displayed after the greeting. This is a standard environment variable that may be set by tools like systemd’s `run0` to display session information.

While you could also just put `echo` calls into config.fish, fish\_greeting takes care of only being used in interactive shells, so it won’t be used e.g. with `scp` (which executes a shell), which prevents some errors.

## Example[¶](#example "Link to this heading")

To just empty the text, with the default greeting function:

set \-U fish\_greeting
COPY

or `set -g fish_greeting` in [config.fish](../language.html#configuration).

A simple greeting:

function fish\_greeting
    echo Hello friend!
    echo The time is (set\_color yellow)(date +%T)(set\_color \--reset) and this machine is called $hostname
end
COPY
