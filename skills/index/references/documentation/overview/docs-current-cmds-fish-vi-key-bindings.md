Source: https://fishshell.com/docs/current/cmds/fish_vi_key_bindings.html

# fish\_vi\_key\_bindings - set vi key bindings for fish[¶](#fish-vi-key-bindings-set-vi-key-bindings-for-fish "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_vi\_key\_bindings
fish\_vi\_key\_bindings \[\--no-erase\] \[INIT\_MODE\]
COPY

## Description[¶](#description "Link to this heading")

`fish_vi_key_bindings` sets the vi key bindings for `fish` shell.

If a valid _INIT\_MODE_ is provided (insert, default, visual), then that mode will become the default . If no _INIT\_MODE_ is given, the mode defaults to insert mode.

The following parameters are available:

**\--no-erase**

Does not clear previous set bindings

Further information on how to use [vi mode](../interactive.html#vi-mode).

## Differences from Vim[¶](#differences-from-vim "Link to this heading")

Fish’s vi mode aims to be familiar to vim users, but there are some differences:

**Word character handling**

In vim, underscore (`_`) is treated as a keyword character by default, so word motions like `w`, `b`, and `e` treat `foo_bar` as a single word. In fish, underscore is treated as punctuation, so word motions stop at underscores. For example, pressing `w` on `foo_bar` in fish stops at the `_`, while in vim it would jump past the entire identifier.

**The** `cw` **command**

In vim, `cw` has special behavior: when the cursor is on a non-space character, it behaves like `ce` (change to end of word), but when the cursor is on a space, it behaves like `dwi` (delete word then insert).

In fish, `cw` always behaves like `dwi` - it deletes to the start of the next word (including trailing whitespace), then enters insert mode. To get vim’s `cw` behavior in fish, use `ce` instead.

## Examples[¶](#examples "Link to this heading")

To start using vi key bindings:

fish\_vi\_key\_bindings
COPY

or `set -g fish_key_bindings fish_vi_key_bindings` in [config.fish](../language.html#configuration).
