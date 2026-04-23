Source: https://fishshell.com/docs/current/cmds/bind.html

# bind - handle fish key bindings[¶](#bind-handle-fish-key-bindings "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

bind \[(\-M | \--mode) MODE\] \[(\-m | \--sets-mode) NEW\_MODE\] \[\--preset | \--user\] \[\-s | \--silent\] KEYS COMMAND ...
bind \[(\-M | \--mode) MODE\] \[\--preset\] \[\--user\] \[\--color WHEN\] \[KEYS\]
bind \[\-a | \--all\] \[\--preset\] \[\--user\] \[\--color WHEN\]
bind (\-f | \--function-names)
bind (\-K | \--key-names)
bind (\-L | \--list-modes)
bind (\-e | \--erase) \[(\-M | \--mode) MODE\] \[\--preset\] \[\--user\] \[\-a | \--all\] | KEYS ...
COPY

## Description[¶](#description "Link to this heading")

`bind` manages key bindings.

If both `KEYS` and `COMMAND` are given, `bind` adds (or replaces) a binding in `MODE`. If only `KEYS` is given, `bind` lists any existing bindings for those keys in `MODE` or in all modes. If no `KEYS` argument is provided, `bind` lists all bindings in `MODE` or in all modes.

`KEYS` is a comma-separated list of key names. Modifier keys can be specified by prefixing a key name with a combination of `ctrl-`, `alt-`, `shift-` and `super-` (i.e. the “windows” or “command” key). For example, pressing w while holding the Alt modifier is written as `alt-w`. Key names are case-sensitive; for example `alt-W` is the same as `alt-shift-w`. `ctrl-x,ctrl-e` would mean pressing ctrl\-x followed by ctrl\-e.

Some keys have names, usually because they don’t have an obvious printable character representation. They are:

-   the arrow keys `up`, `down`, `left` and `right`,
    
-   `backspace`,
    
-   `comma` (`,`),
    
-   `delete`,
    
-   `end`,
    
-   `enter`,
    
-   `escape`,
    
-   `f1` through `f12`.
    
-   `home`,
    
-   `insert`,
    
-   `menu`,
    
-   `minus` (`-`),
    
-   `pageup`,
    
-   `pagedown`,
    
-   `printscreen`,
    
-   `space` and
    
-   `tab`,
    

These names are case-sensitive.

An empty value (`''`) for `KEYS` designates the generic binding that will be used if nothing else matches. For most bind modes, it makes sense to bind this to the `self-insert` function (i.e. `bind '' self-insert`). This will insert any keystrokes that have no bindings otherwise. Non-printable characters are ignored by the editor, so this will not result in control sequences being inserted.

To find the name of a key combination you can use [fish\_key\_reader](fish_key_reader.html).

`COMMAND` can be any fish command, but it can also be one of a set of special input functions. These include functions for moving the cursor, operating on the kill-ring, performing tab completion, etc. Use `bind --function-names` or [see below](#special-input-functions) for a list of these input functions.

Note

If a script changes the commandline, it should finish by calling the `repaint` special input function.

Key bindings may use “modes”, which mimics vi’s modal input behavior. The default mode is “default” (in vi-mode, that’s vi’s “normal” mode). Every key binding applies to a single mode; you can specify which one with `-M MODE`. If the key binding should change the mode, you can specify the new mode with `-m NEW_MODE`. The mode can be viewed and changed via the `$fish_bind_mode` variable. If you want to change the mode from inside a fish function, use `set fish_bind_mode MODE`.

To save custom key bindings, put the `bind` statements into [config.fish](../language.html#configuration). Alternatively, fish also automatically executes a function called `fish_user_key_bindings` if it exists.

## Options[¶](#options "Link to this heading")

The following options are available:

**\-f** or **\--function-names**

Display a list of available input functions

**\-K** or **\--key-names**

Display a list of available named keys such as `backspace`.

**\-L** or **\--list-modes**

Display a list of defined bind modes

**\-M MODE** or **\--mode** _MODE_

Specify a bind mode that the bind is used in. Defaults to “default”. If you use [vi bindings](../interactive.html#vi-mode), that’s the _command_ mode, what vi calls “normal” mode.

**\-m NEW\_MODE** or **\--sets-mode** _NEW\_MODE_

Change the current mode to _NEW\_MODE_ after this binding is executed

**\-e** or **\--erase**

Erase the binding with the given sequence and mode instead of defining a new one. Multiple sequences can be specified with this flag. Specifying **\-a** or **\--all** with **\-M** or **\--mode** erases all binds in the given mode regardless of sequence. Specifying **\-a** or **\--all** without **\-M** or **\--mode** erases all binds in all modes regardless of sequence.

**\-a** or **\--all**

See **\--erase**

**\--preset** and **\--user**

Specify if bind should operate on user or preset bindings. User bindings take precedence over preset bindings when fish looks up mappings. By default, all `bind` invocations work on the “user” level except for listing, which will show both levels. All invocations except for inserting new bindings can operate on both levels at the same time (if both **\--preset** and **\--user** are given). **\--preset** should only be used in full binding sets (like when working on `fish_vi_key_bindings`).

**\-s** or **\--silent**

Silences error message for unbound sequences.

**\--color** _WHEN_

Controls when to use syntax highlighting colors when listing bindings. _WHEN_ can be `auto` (the default, colorize if the output [is a terminal](isatty.html)), `always`, or `never`.

**\-h** or **\--help**

Displays help about using this command.

## Special input functions[¶](#special-input-functions "Link to this heading")

The following special input functions are available:

`and`

only execute the next function if the previous succeeded (note: only some functions report success)

`accept-autosuggestion`

accept the current autosuggestion. Returns false when there was nothing to accept.

`backward-char`

move one character to the left. If the completion pager is active, select the previous completion instead.

`backward-char-passive`

move one character to the left, but do not trigger any non-movement-related operations. If the cursor is at the start of the commandline, does nothing. Does not change the selected item in the completion pager UI when shown.

`backward-token`

move one argument to the left

`backward-delete-char`

deletes one character of input to the left of the cursor

`backward-kill-token`

move the argument to the left of the cursor to the killring

`backward-kill-line`

move everything from the beginning of the line to the cursor to the killring

`backward-kill-path-component`

move one path component to the left of the cursor to the killring. A path component is everything likely to belong to a path component, i.e. not any of the following: /={,}’":@ |;<>&, plus newlines and tabs.

`backward-kill-word`

move the word to the left of the cursor to the killring, until the start of the current word (like vim’s `db`)

`backward-kill-bigword`

move the whitespace-delimited word to the left of the cursor to the killring, until the start of the current word (like vim’s `dB`)

`backward-path-component`

move one [path component](#cmd-bind-backward-kill-path-component) to the left

`backward-word`

move one word to the left, stopping at the start of the previous word (like vim’s `b`, or Emacs’ `M-b` but differs slightly in word division rules)

`backward-bigword`

move one whitespace-delimited word to the left, stopping at the start of the previous word (like vim’s `B`)

`backward-word-end`

move to the end of the previous word (like vim’s `ge`)

`backward-bigword-end`

move to the end of the previous whitespace-delimited word (like vim’s `gE`)

`beginning-of-buffer`

moves to the beginning of the buffer, i.e. the start of the first line

`beginning-of-history`

move to the beginning of the history

`beginning-of-line`

move to the beginning of the line

`begin-selection`

start selecting text

`cancel`

close the pager if it is open, or undo the most recent completion if one was just inserted

`cancel-commandline`

cancel the current commandline and replace it with a new empty one, leaving the old one in place with a marker to show that it was cancelled

`capitalize-word`

make the current word begin with a capital letter

`clear-commandline`

empty the entire commandline

`clear-screen`

clears the screen and redraws the prompt.

`scrollback-push`

pushes earlier output to the terminal scrollback, positioning the prompt at the top. This requires the terminal to implement the ECMA-48 [SCROLL UP](../terminal-compatibility.html#term-compat-indn) command and [cursor position reporting](../terminal-compatibility.html#term-compat-cursor-position-report).

`complete`

guess the remainder of the current token

`complete-and-search`

invoke the searchable pager on completion options (for convenience, this also moves backwards in the completion pager)

`delete-char`

delete one character to the right of the cursor

`delete-or-exit`

delete one character to the right of the cursor, or exit the shell if the commandline is empty

`down-line`

move down one line

`downcase-word`

make the current word lowercase

`end-of-buffer`

moves to the end of the buffer, i.e. the end of the last line; or if already at the end of the commandline, accept the current autosuggestion.

`end-of-history`

move to the end of the history

`end-of-line`

move to the end of the line

`end-selection`

end selecting text

`expand-abbr`

expands any abbreviation currently under the cursor

`execute`

run the current commandline

`exit`

exit the shell

`forward-token`

move one argument to the right

`forward-char`

move one character to the right; or if at the end of the commandline, accept the current autosuggestion. If the completion pager is active, select the next completion instead.

`forward-char-passive`

move one character to the right, but do not trigger any non-movement-related operations. If the cursor is at the end of the commandline, does not accept the current autosuggestion (if any). Does not change the selected item in the completion pager, if shown.

`forward-path-component`

move one [path component](#cmd-bind-backward-kill-path-component) to the right; or if at the end of the commandline, accept a path component from the current autosuggestion.

`forward-single-char`

move one character to the right; or if at the end of the commandline, accept a single char from the current autosuggestion.

`forward-word`

move one word to the right, stopping after the end of the current word; or if at the end of the commandline, accept one word from the current autosuggestion.

`forward-word-vi`

like [forward-word](#cmd-bind-forward-word), but stops at the start of the next word (like vim’s `w`)

`forward-word-end`

like [forward-word](#cmd-bind-forward-word), but stops at the end of the next word (like vim’s `e`)

`forward-bigword`

move one whitespace-delimited word to the right, stopping after the end of the current word; or if at the end of the commandline, accept one word from the current autosuggestion.

`forward-bigword-vi`

like [forward-bigword](#cmd-bind-forward-bigword), but stops at the start of the next word (like vim’s `W`)

`forward-bigword-end`

like [forward-bigword](#cmd-bind-forward-bigword), but stops at the end of the next word (like vim’s `E`)

`history-pager`

invoke the searchable pager on history (incremental search); or if the history pager is already active, search further backwards in time.

`history-delete`

permanently delete the current history item, either from the history pager or from an active up-arrow history search

`history-search-backward`

search the history for the previous match

`history-search-forward`

search the history for the next match

`history-prefix-search-backward`

search the history for the previous prefix match

`history-prefix-search-forward`

search the history for the next prefix match

`history-token-search-backward`

search the history for the previous matching argument

`history-token-search-forward`

search the history for the next matching argument

`history-last-token-search-backward`

search the history for the previous matching last argument

`history-last-token-search-forward`

search the history for the next matching last argument

`forward-jump` and `backward-jump`

read another character and jump to its next occurrence after/before the cursor

`forward-jump-till` and `backward-jump-till`

jump to right _before_ the next occurrence

`repeat-jump` and `repeat-jump-reverse`

redo the last jump in the same/opposite direction

`jump-to-matching-bracket`

jump to matching bracket if the character under the cursor is bracket; otherwise, jump to the next occurrence of _any right_ bracket after the cursor. The following brackets are considered: `([{}])`

`jump-till-matching-bracket`

the same as `jump-to-matching-bracket` but offset cursor to the right for left bracket, and offset cursor to the left for right bracket. The offset is applied for both the position we jump from and position we jump to. In other words, the cursor will continuously jump inside the brackets but won’t reach them by 1 character. The input function is useful to emulate `ib` vi text object. The following brackets are considered: `([{}])`

`kill-token`

move the next argument to the killring

`kill-line`

move everything from the cursor to the end of the line to the killring

`kill-path-component`

move one [path component](#cmd-bind-backward-kill-path-component) to the killring.

`kill-selection`

move the selected text to the killring

`kill-whole-line`

move the line (including the following newline) to the killring. If the line is the last line, its preceding newline is also removed

`kill-inner-line`

move the line (without the following newline) to the killring

`kill-word`

move the next word to the killring, stopping after the end of the killed word

`kill-word-vi`

move the next word to the killring, stopping at the start of the next word (like vim’s `dw`)

`kill-bigword`

move the next whitespace-delimited word to the killring, stopping after the end of the current word

`kill-bigword-vi`

move the next whitespace-delimited word to the killring, stopping at the start of the next word (like vim’s `dW`)

`kill-inner-word`

delete the word under the cursor (like vim’s `diw`)

`kill-inner-bigword`

delete the whitespace-delimited word under the cursor (like vim’s `diW`)

`kill-a-word`

delete the word under the cursor plus surrounding whitespace (like vim’s `daw`)

`kill-a-bigword`

delete the whitespace-delimited word under the cursor plus surrounding whitespace (like vim’s `daW`)

`nextd-or-forward-word`

if the commandline is empty, then move forward in the directory history, otherwise move one word to the right; or if at the end of the commandline, accept one word from the current autosuggestion.

`or`

only execute the next function if the previous did not succeed (note: only some functions report failure)

`pager-toggle-search`

toggles the search field if the completions pager is visible; or if used after `history-pager`, search forwards in time.

`prevd-or-backward-word`

if the commandline is empty, then move backward in the directory history, otherwise move one word to the left

`repaint`

reexecutes the prompt functions and redraws the prompt (also `force-repaint` for backwards-compatibility)

`repaint-mode`

reexecutes the [fish\_mode\_prompt](fish_mode_prompt.html) and redraws the prompt. This is useful for vi mode. If no `fish_mode_prompt` exists or it prints nothing, it acts like a normal repaint.

`self-insert`

inserts the matching sequence into the command line

`self-insert-notfirst`

inserts the matching sequence into the command line, unless the cursor is at the beginning

`get-key`

sets `fish_key` to the key that was pressed to trigger this binding. Example use:

for i in (seq 0 9)
    bind $i get-key 'commandline -i "#$fish\_key"' 'set -eg fish\_key'
end
COPY

`suppress-autosuggestion`

remove the current autosuggestion. Returns true if there was a suggestion to remove.

`swap-selection-start-stop`

go to the other end of the highlighted text without changing the selection

`transpose-chars`

transpose two characters to the left of the cursor

`transpose-words`

transpose two words to the left of the cursor

`togglecase-char`

toggle the capitalisation (case) of the character under the cursor

`togglecase-selection`

toggle the capitalisation (case) of the selection

`insert-line-under`

add a new line under the current line

`insert-line-over`

add a new line over the current line

`up-line`

move up one line

`undo` and `redo`

revert or redo the most recent edits on the command line

`upcase-word`

make the current word uppercase

`yank`

insert the latest entry of the killring into the buffer

`yank-pop`

rotate to the previous entry of the killring

## Additional functions[¶](#additional-functions "Link to this heading")

The following functions are included as normal functions, but are particularly useful for input editing:

`up-or-search` and `down-or-search`

move the cursor or search the history depending on the cursor position and current mode

`edit_command_buffer`

open the visual editor (controlled by the `VISUAL` or `EDITOR` environment variables) with the current command-line contents

`fish_clipboard_copy`

copy the current selection to the system clipboard

`fish_clipboard_paste`

paste the current selection from the system clipboard before the cursor

`fish_commandline_append`

append the argument to the command-line. If the command-line already ends with the argument, this removes the suffix instead. Starts with the last command from history if the command-line is empty.

`fish_commandline_prepend`

prepend the argument to the command-line. If the command-line already starts with the argument, this removes the prefix instead. Starts with the last command from history if the command-line is empty.

## Examples[¶](#examples "Link to this heading")

Exit the shell when ctrl\-d is pressed:

bind ctrl-d 'exit'
COPY

Perform a history search when pageup is pressed:

bind pageup history-search-backward
COPY

Turn on [vi key bindings](../interactive.html#vi-mode) and rebind ctrl\-c to clear the input line:

set \-g fish\_key\_bindings fish\_vi\_key\_bindings
bind \-M insert ctrl-c kill-whole-line repaint
COPY

Launch `git diff` and repaint the commandline afterwards when ctrl\-g is pressed:

bind ctrl-g 'git diff' repaint
COPY

Swap tab and shift\-tab, making tab focus the search field. But if the search field is already active, keep the behavior (tab cycles forward, shift\-tab backward).:

bind tab '
    if commandline --search-field >/dev/null
        commandline -f complete
    else
        commandline -f complete-and-search
    end
'
bind shift-tab '
    if commandline --search-field >/dev/null
        commandline -f complete-and-search
    else
        commandline -f complete
    end
'
COPY

## Terminal Limitations[¶](#terminal-limitations "Link to this heading")

Unix terminals, like the ones fish operates in, are at heart 70s technology. They have some limitations that applications running inside them can’t workaround.

For instance, historically the control key modifies a character by setting the top three bits to 0. This means:

-   Many characters + control are indistinguishable from other keys: ctrl\-i _is_ tab, ctrl\-j _is_ newline (`\n`).
    
-   Control and shift don’t work simultaneously - ctrl\-X is the same as ctrl\-x.
    

Other keys don’t have a direct encoding, and are sent as escape sequences. For example right (`→`) usually sends `\e\[C`.

Some modern terminals support newer encodings for keys, that allow distinguishing more characters and modifiers, and fish enables as many of these as it can, automatically.

When in doubt, run [fish\_key\_reader - explore what characters keyboard keys send](fish_key_reader.html). If that tells you that pressing ctrl\-i sends tab, your terminal does not support these better encodings, and so fish is limited to what it sends.

## Key timeout[¶](#key-timeout "Link to this heading")

When you’ve bound a sequence of multiple characters, there is always the possibility that fish has only seen a part of it, and then it needs to disambiguate between the full sequence and part of it.

For example:

bind j,k 'commandline -i foo'
\# or \`bind jk\`
COPY

will bind the sequence `jk` to insert “foo” into the commandline. When you’ve only pressed “j”, fish doesn’t know if it should insert the “j” (because of the default self-insert), or wait for the “k”.

You can enable a timeout for this, by setting the [`fish_sequence_key_delay_ms`](../language.html#envvar-fish_sequence_key_delay_ms) variable to the timeout in milliseconds. If the timeout elapses, fish will no longer wait for the sequence to be completed, and do what it can with the characters it already has.

The escape key is a special case, because it can be used standalone as a real key or as part of a longer escape sequence, like function or arrow keys. Holding alt and something else also typically sends escape, for example holding alt+a will send an escape character and then an “a”. So the escape character has its own timeout configured with [`fish_escape_delay_ms`](../language.html#envvar-fish_escape_delay_ms).

See also [Key sequences](../interactive.html#interactive-key-sequences).
