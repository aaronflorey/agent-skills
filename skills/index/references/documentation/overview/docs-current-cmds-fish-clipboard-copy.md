Source: https://fishshell.com/docs/current/cmds/fish_clipboard_copy.html

# fish\_clipboard\_copy - copy text to the system’s clipboard[¶](#fish-clipboard-copy-copy-text-to-the-system-s-clipboard "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_clipboard\_copy

foo | fish\_clipboard\_copy
COPY

## Description[¶](#description "Link to this heading")

The `fish_clipboard_copy` function copies text to the system clipboard.

If stdin is not a terminal (see [isatty](isatty.html)), it will read all input from there and copy it. If it is, it will use the current commandline, or the current selection if there is one.

It is bound to ctrl\-x by default.

`fish_clipboard_copy` works by calling a system-specific backend. If it doesn’t appear to work you may need to install yours.

Currently supported are:

-   `pbcopy`
    
-   `wl-copy` using wayland
    
-   `xsel` and `xclip` for X11
    
-   `clip.exe` on Windows.
    
-   The [OSC 52 clipboard sequence](../terminal-compatibility.html#term-compat-osc-52), which your terminal might support
    

## See also[¶](#see-also "Link to this heading")

-   [fish\_clipboard\_paste - get text from the system’s clipboard](fish_clipboard_paste.html) which does the inverse.
