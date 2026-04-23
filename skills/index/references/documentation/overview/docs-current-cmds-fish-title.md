Source: https://fishshell.com/docs/current/cmds/fish_title.html

# fish\_title - define the terminal’s title[¶](#fish-title-define-the-terminal-s-title "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_title
fish\_tab\_title
COPY

function fish\_title
    ...
end

function fish\_tab\_title
    ...
end
COPY

## Description[¶](#description "Link to this heading")

The `fish_title` function is executed before and after a new command is executed or put into the foreground and the output is used as a titlebar message.

The first argument to `fish_title` contains the most recently executed foreground command as a string, if any.

This requires that your terminal supports [programmable titles](../terminal-compatibility.html#term-compat-osc-0) and the feature is turned on.

To disable setting the title, use an empty function (see below).

To set the terminal tab title to something other than the terminal window title, define the `fish_tab_title` function, which works like `fish_title` but overrides that one.

## Example[¶](#example "Link to this heading")

A simple title:

function fish\_title
    set \-q argv\[1\]; or set argv fish
    \# Looks like ~/d/fish: git log
    \# or /e/apt: fish
    echo (fish\_prompt\_pwd\_dir\_length\=1 prompt\_pwd): $argv;
end
COPY

Do not change the title:

function fish\_title
end
COPY

Change the tab title only:

function fish\_tab\_title
    echo fish $fish\_pid
end
COPY
