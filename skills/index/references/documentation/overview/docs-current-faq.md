Source: https://fishshell.com/docs/current/faq.html

# Frequently asked questions[¶](#frequently-asked-questions "Link to this heading")

## What is the equivalent to this thing from bash (or other shells)?[¶](#what-is-the-equivalent-to-this-thing-from-bash-or-other-shells "Link to this heading")

See [Fish for bash users](fish_for_bash_users.html)

## How do I set or clear an environment variable?[¶](#how-do-i-set-or-clear-an-environment-variable "Link to this heading")

Use the [set](cmds/set.html) command:

set \-x key value \# typically set -gx key value
set \-e key
COPY

Since fish 3.1 you can set an environment variable for one command using the `key=value some command` syntax, like in other shells. The two lines below behave identically - unlike other shells, fish will output `value` both times:

key\=value echo $key
begin; set \-lx key value; echo $key; end
COPY

Note that “exported” is not a [scope](language.html#variables-scope), but an additional bit of state. A variable can be global and exported or local and exported or even universal and exported. Typically it makes sense to make an exported variable global.

## How do I check whether a variable is defined?[¶](#how-do-i-check-whether-a-variable-is-defined "Link to this heading")

Use `set -q var`. For example, `if set -q var; echo variable defined; end`. To check multiple variables you can combine with `and` and `or` like so:

if set \-q var1; or set \-q var2
    echo either variable defined
end
COPY

Keep in mind that a defined variable could also be empty, either by having no elements (if set like `set var`) or only empty elements (if set like `set var ""`). Read on for how to deal with those.

## How do I check whether a variable is not empty?[¶](#how-do-i-check-whether-a-variable-is-not-empty "Link to this heading")

Use `string length -q -- $var`. For example, `if string length -q -- $var; echo not empty; end`. Note that `string length` will interpret a list of multiple variables as a disjunction (meaning any/or):

if string length \-q \-- $var1 $var2 $var3
    echo at least one of these variables is not empty
end
COPY

Alternatively, use `test -n "$var"`, but remember that **the variable must be double-quoted**. For example, `if test -n "$var"; echo not empty; end`. The `test` command provides its own and (-a) and or (-o):

if test \-n "$var1" \-o \-n "$var2" \-o \-n "$var3"
    echo at least one of these variables is not empty
end
COPY

If you want to know if a variable has _no elements_, use `set -q var[1]`.

## Why doesn’t `set -Ux` (exported universal variables) seem to work?[¶](#why-doesn-t-set-ux-exported-universal-variables-seem-to-work "Link to this heading")

A global variable of the same name already exists.

Environment variables such as `EDITOR` or `TZ` can be set universally using `set -Ux`. However, if there is an environment variable already set before fish starts (such as by login scripts or system administrators), it is imported into fish as a global variable. The [variable scopes](language.html#variables-scope) are searched from the “inside out”, which means that local variables are checked first, followed by global variables, and finally universal variables.

This means that the global value takes precedence over the universal value.

To avoid this problem, consider changing the setting which fish inherits. If this is not possible, add a statement to your [configuration file](language.html#configuration) (usually `~/.config/fish/config.fish`):

set \-gx EDITOR vim
COPY

## How do I run a command every login? What’s fish’s equivalent to .bashrc or .profile?[¶](#how-do-i-run-a-command-every-login-what-s-fish-s-equivalent-to-bashrc-or-profile "Link to this heading")

Edit the file `~/.config/fish/config.fish` [\[1\]](#id2), creating it if it does not exist (Note the leading period).

Unlike .bashrc and .profile, this file is always read, even in non-interactive or login shells.

To do something only in interactive shells, check `status is-interactive` like:

if status is-interactive
    \# use the coolbeans theme
    fish\_config theme choose coolbeans
end
COPY

\[[1](#id1)\]

The “~/.config” part of this can be set via $XDG\_CONFIG\_HOME, that’s just the default.

## How do I set my prompt?[¶](#how-do-i-set-my-prompt "Link to this heading")

The prompt is the output of the `fish_prompt` function. Put it in `~/.config/fish/functions/fish_prompt.fish`. For example, a simple prompt is:

function fish\_prompt
    set\_color $fish\_color\_cwd
    echo \-n (prompt\_pwd)
    set\_color \--reset
    echo \-n ' > '
end
COPY

You can also use the Web configuration tool, [fish\_config](cmds/fish_config.html), to preview and choose from a gallery of sample prompts.

Or you can use fish\_config from the commandline:

\> fish\_config prompt show
\# displays all the prompts fish ships with
\> fish\_config prompt choose disco
\# loads the disco prompt in the current shell
\> fish\_config prompt save
\# makes the change permanent
COPY

If you want to modify your existing prompt, you can use [funced](cmds/funced.html) and [funcsave](cmds/funcsave.html) like:

\>\_ funced fish\_prompt
\# This opens up your editor (set in $EDITOR).
\# Modify the function,
\# save the file and repeat to your liking.
\# Once you are happy with it:
\>\_ funcsave fish\_prompt
COPY

This also applies to [fish\_right\_prompt](cmds/fish_right_prompt.html) and [fish\_mode\_prompt](cmds/fish_mode_prompt.html).

## Why does my prompt show a `[I]`?[¶](#why-does-my-prompt-show-a-i "Link to this heading")

That’s the [fish\_mode\_prompt](cmds/fish_mode_prompt.html). It is displayed by default when you’ve activated vi mode using `fish_vi_key_bindings`.

If you haven’t activated vi mode on purpose, you might have installed a third-party theme or plugin that does it.

If you want to change or disable this display, modify the `fish_mode_prompt` function, for instance via [funced](cmds/funced.html).

## How do I customize my syntax highlighting colors?[¶](#how-do-i-customize-my-syntax-highlighting-colors "Link to this heading")

Use the web configuration tool started by [fish\_config](cmds/fish_config.html), or alter the [fish\_color family of environment variables](interactive.html#variables-color), or use the [fish\_config theme](cmds/fish_config.html) subcommand, like:

\> fish\_config theme show
\# to demonstrate all the colorschemes
\> fish\_config theme choose coolbeans
\# to load the "coolbeans" theme
COPY

## How do I change the greeting message?[¶](#how-do-i-change-the-greeting-message "Link to this heading")

Change the value of the variable `fish_greeting` or create a [fish\_greeting](cmds/fish_greeting.html) function. For example, to remove the greeting use:

set \-U fish\_greeting
COPY

Or if you prefer not to use a universal variable, use:

set \-g fish\_greeting
COPY

in [config.fish](language.html#configuration).

## How do I run a command from history?[¶](#how-do-i-run-a-command-from-history "Link to this heading")

Type some part of the command, and then hit the up (`↑`) or down (`↓`) arrow keys to navigate through history matches, or press ctrl\-r to open the history in a searchable pager. In this pager you can press ctrl\-r or ctrl\-s to move to older or younger history respectively.

Additional default key bindings include ctrl\-p (up) and ctrl\-n (down). See [Searchable command history](interactive.html#history-search) for more information.

## Why doesn’t history substitution (“!$” etc.) work?[¶](#why-doesn-t-history-substitution-etc-work "Link to this heading")

Because history substitution is an awkward interface that was invented before interactive line editing was even possible. Instead of adding this pseudo-syntax, fish opts for nice history searching and recall features. Switching requires a small change of habits: if you want to modify an old line/word, first recall it, then edit.

As a special case, most of the time history substitution is used as `sudo !!`. In that case press alt\-s, and it will recall your last commandline with `sudo` prefixed (or toggle a `sudo` prefix on the current commandline if there is anything).

In general, fish’s history recall works like this:

-   Like other shells, the Up arrow, `up` recalls whole lines, starting from the last executed line. So instead of typing `!!`, you would hit the up-arrow.
    
-   If the line you want is far back in the history, type any part of the line and then press Up one or more times. This will filter the recalled lines to ones that include this text, and you will get to the line you want much faster. This replaces “!vi”, “!?bar.c” and the like. If you want to see more context, you can press `ctrl-r` to open the history in the pager.
    
-   `alt-up` recalls individual arguments, starting from the last argument in the last executed line. This can be used instead of “!$”.
    

See [documentation](interactive.html#editor) for more details about line editing in fish.

That being said, you can use [Abbreviations](interactive.html#abbreviations) to implement history substitution. Here’s `!!` only:

function last\_history\_item; echo $history\[1\]; end
abbr \-a !! \--position anywhere \--function last\_history\_item
COPY

Run this and `!!` will be replaced with the last history entry, anywhere on the commandline. Put it into [config.fish](language.html#configuration) to keep it.

## How do I run a subcommand? The backtick doesn’t work![¶](#how-do-i-run-a-subcommand-the-backtick-doesn-t-work "Link to this heading")

`fish` uses parentheses for subcommands. For example:

for i in (ls)
    echo $i
end
COPY

It also supports the familiar `$()` syntax, even in quotes. Backticks are not supported because they are discouraged even in POSIX shells. They nest poorly and are hard to tell from single quotes (`''`).

## My command (pkg-config) gives its output as a single long string?[¶](#my-command-pkg-config-gives-its-output-as-a-single-long-string "Link to this heading")

Unlike other shells, fish splits command substitutions only on newlines, not spaces or tabs or the characters in $IFS.

That means if you run

count (printf '%s ' a b c)
COPY

It will print `1`, because the “a b c “ is used in one piece. But if you do

count (printf '%s\\n' a b c)
COPY

it will print `3`, because it gave `count` the arguments “a”, “b” and “c” separately.

In the overwhelming majority of cases, splitting on spaces is unwanted, so this is an improvement. This is why you hear about problems with filenames with spaces, after all.

However sometimes, especially with `pkg-config` and related tools, splitting on spaces is needed.

In these cases use `string split -n " "` like:

g++ example\_01.cpp (pkg-config \--cflags \--libs gtk+-2.0 | string split \-n " ")
COPY

The `-n` is so empty elements are removed like POSIX shells would do.

## How do I get the exit status of a command?[¶](#how-do-i-get-the-exit-status-of-a-command "Link to this heading")

Use the `$status` variable. This replaces the `$?` variable used in other shells.

somecommand
if test $status \-eq 7
    echo "That's my lucky number!"
end
COPY

If you are only interested in success or failure, you can run the command directly as the if-condition:

if somecommand
    echo "Command succeeded"
else
    echo "Command failed"
end
COPY

Or if you just want to do one command in case the first succeeded or failed, use `and` or `or`:

somecommand
or someothercommand
COPY

See the [Conditions](language.html#syntax-conditional) and the documentation for [test](cmds/test.html) and [if](cmds/if.html) for more information.

## My command prints “No matches for wildcard” but works in bash[¶](#my-command-prints-no-matches-for-wildcard-but-works-in-bash "Link to this heading")

In short: [quote](language.html#quotes) or [escape](language.html#escapes) the wildcard:

scp user@ip:/dir/"string-\*"
COPY

When fish sees an unquoted `*`, it performs [wildcard expansion](language.html#expand-wildcard). That means it tries to match filenames to the given string.

If the wildcard doesn’t match any files, fish prints an error instead of running the command:

\> echo \*this\*does\*not\*exist
fish: No matches for wildcard '\*this\*does\*not\*exist'. See \`help expand\`.
echo \*this\*does\*not\*exist
     ^
COPY

Now, bash also tries to match files in this case, but when it doesn’t find a match, it passes along the literal wildcard string instead.

That means that commands like the above

scp user@ip:/dir/string-\*
COPY

or

apt install postgres-\*
COPY

appear to work, because most of the time the string doesn’t match and so it passes along the `string-*`, which is then interpreted by the receiving program.

But it also means that these commands can stop working at any moment once a matching file is encountered (because it has been created or the command is executed in a different working directory), and to deal with that bash needs workarounds like

for f in ./\*.mpg; do
      \# We need to test if the file really exists because
      \# the wildcard might have failed to match.
      test \-f "$f" || continue
      mympgviewer "$f"
done
COPY

(from [http://mywiki.wooledge.org/BashFAQ/004](http://mywiki.wooledge.org/BashFAQ/004))

For these reasons, fish does not do this, and instead expects asterisks to be quoted or escaped if they aren’t supposed to be expanded.

This is similar to bash’s “failglob” option.

## Why won’t SSH/SCP/rsync connect properly when fish is my login shell?[¶](#why-won-t-ssh-scp-rsync-connect-properly-when-fish-is-my-login-shell "Link to this heading")

This problem may show up as messages like “`Received message too long`”, “`open terminal failed: not a terminal`”, “`Bad packet length`”, or “`Connection refused`” with strange output in `ssh_exchange_identification` messages in the debug log.

This usually happens because fish reads the [user configuration file](language.html#configuration) (`~/.config/fish/config.fish`) _always_, whether it’s in an interactive or login or non-interactive or non-login shell.

This simplifies matters, but it also means when config.fish generates output, it will do that even in non-interactive shells like the one ssh/scp/rsync start when they connect.

Anything in config.fish that produces output should be guarded with `status is-interactive` (or `status is-login` if you prefer):

if status is-interactive
  ...
end
COPY

The same applies for example when you start `tmux` in config.fish without guards, which will cause a message like `sessions should be nested with care, unset $TMUX to force`.

## I’m getting weird graphical glitches (a staircase effect, ghost characters, cursor in the wrong position,…)?[¶](#i-m-getting-weird-graphical-glitches-a-staircase-effect-ghost-characters-cursor-in-the-wrong-position "Link to this heading")

In a terminal, the application running inside it and the terminal itself need to agree on the width of characters in order to handle cursor movement.

This is more important to fish than other shells because features like syntax highlighting and autosuggestions are implemented by moving the cursor.

Sometimes, there is disagreement on the width. There are numerous causes and fixes for this:

-   It is possible the character is too new for your system to know - in this case you need to refrain from using it.
    
-   Fish or your terminal might not know about the character or handle it wrong - in this case fish or your terminal needs to be fixed, or you need to update to a fixed version.
    
-   The character has an “ambiguous” width and fish thinks that means a width of X while your terminal thinks it’s Y. In this case you either need to change your terminal’s configuration or set $fish\_ambiguous\_width to the correct value.
    
-   The character is an emoji and your system only supports Unicode 8. In this case set $fish\_emoji\_width to 1.
    

This also means that a few things are unsupportable:

-   Non-monospace fonts - there is _no way_ for fish to figure out what width a specific character has as it has no influence on the terminal’s font rendering.
    
-   Different widths for multiple ambiguous width characters - there is no way for fish to know which width you assign to each character.
    

## fish does not work in a specific terminal[¶](#fish-does-not-work-in-a-specific-terminal "Link to this heading")

The terminal might not meet all of [fish’s requirements](terminal-compatibility.html). Please report this to your terminal’s and to fish’s issue tracker.

## Uninstalling fish[¶](#uninstalling-fish "Link to this heading")

If you want to uninstall fish, first make sure fish is not set as your shell. Run `chsh -s /bin/bash` if you are not sure.

If you installed it with a package manager, use that package manager’s uninstall function. If you built fish yourself, assuming you installed it to /usr/local, do this:

rm \-Rf /usr/local/etc/fish /usr/local/share/fish ~/.config/fish
rm /usr/local/share/man/man1/fish\*.1
cd /usr/local/bin
rm \-f fish fish\_indent
COPY
