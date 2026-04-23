Source: https://fishshell.com/docs/current/cmds/fish_delta.html

# fish\_delta - compare functions and completions to the default[¶](#fish-delta-compare-functions-and-completions-to-the-default "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_delta name ...
fish\_delta \[\-f | \--no-functions\] \[\-c | \--no-completions\] \[\-C | \--no-config\] \[\-d | \--no-diff\] \[\-n | \--new\] \[\-V | \--vendor=\]
fish\_delta \[\-h | \--help\]
COPY

## Description[¶](#description "Link to this heading")

The `fish_delta` function tells you, at a glance, which of your functions and completions differ from the set that fish ships.

It does this by going through the relevant variables ([`fish_function_path`](../language.html#envvar-fish_function_path) for functions and [`fish_complete_path`](../language.html#envvar-fish_complete_path) for completions) and comparing the files against fish’s default directories.

If any names are given, it will only compare files by those names (plus a “.fish” extension).

By default, it will also use `diff` to display the difference between the files. If `diff` is unavailable, it will skip it, but in that case it also cannot figure out if the files really differ.

The exit status is 1 if there was a difference and 2 for other errors, otherwise 0.

## Options[¶](#options "Link to this heading")

The following options are available:

**\-f** or **\--no-functions**

Stops checking functions

**\-c** or **\--no-completions**

Stops checking completions

**\-C** or **\--no-config**

Stops checking configuration files like config.fish or snippets in the conf.d directories.

**\-d** or **\--no-diff**

Removes the diff display (this happens automatically if `diff` can’t be found)

**\-n** or **\--new**

Also prints new files (i.e. those that can’t be found in fish’s default directories).

**\-Vvalue** or **\--vendor=value**

Determines how the vendor directories are counted. Valid values are:

-   “default” - counts vendor files as belonging to the defaults. Any changes in other directories will be counted as changes over them. This is the default.
    
-   “user” - counts vendor files as belonging to the user files. Any changes in them will be counted as new or changed files.
    
-   “ignore” - ignores vendor directories. Files of the same name will be counted as “new” if no file of the same name in fish’s default directories exists.
    

**\-h** or **\--help**

Prints `fish_delta`’s help (this).

## Example[¶](#example "Link to this heading")

Running just:

fish\_delta
COPY

will give you a list of all your changed functions and completions, including diffs (if you have the `diff` command).

It might look like this:

\> fish\_delta
New: /home/alfa/.config/fish/functions/battery.fish
Changed: /home/alfa/.config/fish/test/completions/cargo.fish
\--- /home/alfa/.config/fish/test/completions/cargo.fish 2022-09-02 12:57:55.579229959 +0200
+++ /usr/share/fish/completions/cargo.fish      2022-09-25 17:51:53.000000000 +0200
\# the output of \`diff\` follows
COPY

The options are there to select which parts of the output you want. With `--no-completions` you can compare just functions, and with `--no-diff` you can turn off the `diff` display.

To only compare your `fish_git_prompt`, you might use:

fish\_delta \--no-completions fish\_git\_prompt
COPY

which will only compare files called “fish\_git\_prompt.fish”.
