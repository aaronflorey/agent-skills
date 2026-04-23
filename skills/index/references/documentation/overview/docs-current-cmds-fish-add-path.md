Source: https://fishshell.com/docs/current/cmds/fish_add_path.html

# fish\_add\_path - add to the path[¶](#fish-add-path-add-to-the-path "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_add\_path path ...
fish\_add\_path \[(\-g | \--global) | (\-U | \--universal) | (\-P | \--path)\] \[(\-m | \--move)\] \[(\-a | \--append) | (\-p | \--prepend)\] \[(\-v | \--verbose) | (\-n | \--dry-run)\] PATHS ...
COPY

## Description[¶](#description "Link to this heading")

**fish\_add\_path** is a simple way to add more directories to fish’s [`PATH`](../language.html#envvar-PATH). It does this by adding the directories either to [`fish_user_paths`](../language.html#envvar-fish_user_paths) or directly to [`PATH`](../language.html#envvar-PATH) (if the `--path` switch is given).

It is (by default) safe to use **fish\_add\_path** in config.fish, or it can be used once, interactively, and the paths will stay in future because of [universal variables](../language.html#variables-universal). This is a “do what I mean” style command - it tries to do the right thing by default, and follow your lead on what you have already set up (e.g. by using a global [`fish_user_paths`](../language.html#envvar-fish_user_paths) if you have that already). If you need more control, consider modifying the variable yourself.

Directories are normalized with [realpath](realpath.html). Trailing slashes are ignored and relative paths are made absolute (but symlinks are not resolved). If a directory is already included, it is not added again and stays in the same place unless the `--move` switch is given.

Directories are added in the order they are given, and they are prepended to the path unless `--append` is given. If $fish\_user\_paths is used, that means they are last in $fish\_user\_paths, which is itself prepended to [`PATH`](../language.html#envvar-PATH), so they still stay ahead of the system paths. If the `--path` option is used, the paths are appended/prepended to [`PATH`](../language.html#envvar-PATH) directly, so this doesn’t happen.

With `--path`, because [`PATH`](../language.html#envvar-PATH) must be a global variable instead of a universal one, the changes won’t persist, so those calls need to be stored in [config.fish](../language.html#configuration). This also applies to [`fish_user_paths`](../language.html#envvar-fish_user_paths) if you make it global (for instance by passing `--global`).

If no directory is new, the variable ([`fish_user_paths`](../language.html#envvar-fish_user_paths) or [`PATH`](../language.html#envvar-PATH)) is not set again or otherwise modified, so variable handlers are not triggered.

If an argument is not an existing directory, `fish_add_path` ignores it.

## Options[¶](#options "Link to this heading")

**\-a** or **\--append**

Add directories to the _end_ of the variable.

**\-p** or **\--prepend**

Add directories to the _front_ of the variable (this is the default).

**\-g** or **\--global**

Use a global [`fish_user_paths`](../language.html#envvar-fish_user_paths).

**\-U** or **\--universal**

Use a universal [`fish_user_paths`](../language.html#envvar-fish_user_paths) - this is the default if it doesn’t already exist.

**\-P** or **\--path**

Manipulate [`PATH`](../language.html#envvar-PATH) directly.

**\-m** or **\--move**

Move already-included directories to the place they would be added - by default they would be left in place and not added again.

**\-v** or **\--verbose**

Print the [set](set.html) command used, and some more warnings, like when a path is skipped because it doesn’t exist or is not a directory. Verbose mode is automatically enabled when fish\_add\_path is used interactively and the output goes to the terminal.

**\-n** or **\--dry-run**

Print the `set` command that would be used without executing it.

**\-h** or **\--help**

Displays help about using this command.

If `--move` is used, it may of course lead to the path swapping order, so you should be careful doing that in config.fish.

## Example[¶](#example "Link to this heading")

\# I just installed mycoolthing and need to add it to the path to use it.
\# It is at /opt/mycoolthing/bin/mycoolthing,
\# so let's add the directory: /opt/mycoolthing/bin.
\> fish\_add\_path /opt/mycoolthing/bin

\# I want my ~/.local/bin to be checked first,
\# even if it was already added.
\> fish\_add\_path \-m ~/.local/bin

\# I prefer using a global fish\_user\_paths
\# This isn't saved automatically, I need to add this to config.fish
\# if I want it to stay.
\> fish\_add\_path \-g ~/.local/bin ~/.otherbin /usr/local/sbin

\# I want to append to the entire $PATH because this directory contains fallbacks
\# This needs --path/-P because otherwise it appends to $fish\_user\_paths,
\# which is added to the front of $PATH.
\> fish\_add\_path \--append \--path /opt/fallback/bin

\# I want to add the bin/ directory of my current $PWD (say /home/nemo/)
\# -v/--verbose shows what fish\_add\_path did.
\> fish\_add\_path \-v bin/
set fish\_user\_paths /home/nemo/bin /usr/bin /home/nemo/.local/bin

\# I have installed ruby via homebrew
\> fish\_add\_path /usr/local/opt/ruby/bin
COPY
