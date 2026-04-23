Source: https://fishshell.com/docs/current/cmds/string-join0.html

# string-join0 - join strings with zero bytes[¶](#string-join0-join-strings-with-zero-bytes "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

string join \[\-q | \--quiet\] \[\-n | \--no-empty\] \[\--\] SEP \[STRING ...\]
string join0 \[\-q | \--quiet\] \[\-n | \--no-empty\] \[\--\] \[STRING ...\]
COPY

## Description[¶](#description "Link to this heading")

Joins its _STRING_ arguments into a single string separated by _SEP_ (for `string join`) or by the zero byte (NUL) (for `string join0`). Exit status: 0 if at least one join was performed, or 1 otherwise.

**\-n**, **\--no-empty**

Exclude empty strings from consideration (e.g. `string join -n + a b "" c` would expand to `a+b+c` not `a+b++c`).

**\-q**, **\--quiet**

Do not print the strings, only set the exit status as described above.

**WARNING**: Insert a `--` before positional arguments to prevent them from being interpreted as flags. Otherwise, any strings starting with `-` will be treated as flag arguments, meaning they will most likely result in the command failing. This is also true if you specify a variable which expands to such a string instead of a literal string. If you don’t need to append flag arguments at the end of the command, just always use `--` to avoid unwelcome surprises.

`string join0` adds a trailing NUL. This is most useful in conjunction with tools that accept NUL-delimited input, such as `sort -z`.

Because Unix uses NUL as the string terminator, passing the output of `string join0` as an _argument_ to a command (via a [command substitution](../language.html#expand-command-substitution)) won’t actually work. Fish will pass the correct bytes along, but the command won’t be able to tell where the argument ends. This is a limitation of Unix’ argument passing.

## Examples[¶](#examples "Link to this heading")

\>\_ seq 3 | string join ...
1...2...3

\# Give a list of NUL-separated filenames to du (this is a GNU extension)
\>\_ string join0 file1 file2 file\\nwith\\nmultiple\\nlines | du \--files0-from=-

\# Just put the strings together without a separator
\>\_ string join '' a b c
abc

\>\_ set \-l markdown\_list '- first' '- second' '- third'
\# Strings with leading hyphens (also in variable expansions) are interpreted as flag arguments by default.
\>\_ string join \\n $markdown\_list
string join: - first: unknown option
\# Use '--' to prevent this.
\>\_ string join \-- \\n $markdown\_list
\- first
\- second
\- third
COPY
