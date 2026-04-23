Source: https://fishshell.com/docs/current/cmds/type.html

# type - locate a command and describe its type[¶](#type-locate-a-command-and-describe-its-type "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

type \[OPTIONS\] NAME \[...\]
COPY

## Description[¶](#description "Link to this heading")

With no options, **type** indicates how each _NAME_ would be interpreted if used as a command name.

The following options are available:

**\-a** or **\--all**

Prints all of possible definitions of the specified names.

**\-s** or **\--short**

Don’t print function definitions when used with no options or with **\-a**/**\--all**.

**\-f** or **\--no-functions**

Suppresses function lookup.

**\-t** or **\--type**

Prints `function`, `builtin`, or `file` if _NAME_ is a shell function, builtin, or disk file, respectively.

**\-p** or **\--path**

Prints the path to _NAME_ if _NAME_ resolves to an executable file in [`PATH`](../language.html#envvar-PATH), the path to the script containing the definition of the function _NAME_ if _NAME_ resolves to a function loaded from a file on disk (i.e. not interactively defined at the prompt), or nothing otherwise.

**\-P** or **\--force-path**

Returns the path to the executable file _NAME_, presuming _NAME_ is found in the [`PATH`](../language.html#envvar-PATH) environment variable, or nothing otherwise. **\--force-path** explicitly resolves only the path to executable files in [`PATH`](../language.html#envvar-PATH), regardless of whether _NAME_ is shadowed by a function or builtin with the same name.

**\-q** or **\--query**

Suppresses all output; this is useful when testing the exit status. For compatibility with old fish versions this is also **\--quiet**.

**\--color** _WHEN_

Controls when to use syntax highlighting colors when printing function definitions. _WHEN_ can be `auto` (the default, colorize if the output [is a terminal](isatty.html)), `always`, or `never`.

**\-h** or **\--help**

Displays help about using this command.

The **\-q**, **\-p**, **\-t** and **\-P** flags (and their long flag aliases) are mutually exclusive. Only one can be specified at a time.

`type` returns 0 if at least one entry was found, 1 otherwise, and 2 for invalid options or option combinations.

## Example[¶](#example "Link to this heading")

\>\_ type fg
fg is a builtin
COPY
