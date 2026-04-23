Source: https://fishshell.com/docs/current/cmds/realpath.html

# realpath - convert a path to an absolute path without symlinks[¶](#realpath-convert-a-path-to-an-absolute-path-without-symlinks "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

realpath \[OPTIONS\] PATH
COPY

## Description[¶](#description "Link to this heading")

**realpath** follows all symbolic links encountered for the provided [`PATH`](../language.html#envvar-PATH), printing the absolute path resolved. [fish](fish.html) provides a **realpath**\-alike builtin intended to enrich systems where no such command is installed by default.

If a **realpath** command exists, that will be preferred. `builtin realpath` will explicitly use the fish implementation of **realpath**.

The following options are available:

**\-s** or **\--no-symlinks**

Don’t resolve symlinks, only make paths absolute, squash multiple slashes and remove trailing slashes.

**\-h** or **\--help**

Displays help about using this command.
