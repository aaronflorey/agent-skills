Source: https://fishshell.com/docs/current/cmds/export.html

# export - compatibility function for exporting variables[¶](#export-compatibility-function-for-exporting-variables "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

export
export NAME=VALUE
COPY

## Description[¶](#description "Link to this heading")

`export` is a function included for compatibility with POSIX shells. In general, the [set](set.html) builtin should be used instead.

When called without arguments, `export` prints a list of currently-exported variables, like `set -x`.

When called with a `NAME=VALUE` pair, the variable `NAME` is set to `VALUE` in the global scope, and exported as an environment variable to other commands.

There are no options available.

## Example[¶](#example "Link to this heading")

The following commands have an identical effect.

set \-gx PAGER bat
export PAGER=bat
COPY

Note: If you want to add to e.g. `$PATH`, you need to be careful to [combine the list](../language.html#cartesian-product). Quote it, like so:

export PATH="$PATH:/opt/bin"
COPY

Or just use `set`, which avoids this:

set \-gx PATH $PATH /opt/bin
COPY

## See more[¶](#see-more "Link to this heading")

1.  The [set](set.html) command.
