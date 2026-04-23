Source: https://fishshell.com/docs/current/cmds/string-collect.html

# string-collect - join strings into one[¶](#string-collect-join-strings-into-one "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

string collect \[\-a | \--allow-empty\] \[\-N | \--no-trim-newlines\] \[STRING ...\]
COPY

## Description[¶](#description "Link to this heading")

`string collect` collects its input into a single output argument, without splitting the output when used in a command substitution. This is useful when trying to collect multiline output from another command into a variable. Exit status: 0 if any output argument is non-empty, or 1 otherwise.

A command like `echo (cmd | string collect)` is mostly equivalent to a quoted command substitution (`echo "$(cmd)"`). The main difference is that the former evaluates to zero or one elements whereas the quoted command substitution always evaluates to one element due to string interpolation.

If invoked with multiple arguments instead of input, `string collect` preserves each argument separately, where the number of output arguments is equal to the number of arguments given to `string collect`.

Any trailing newlines on the input are trimmed, just as with `"$(cmd)"` substitution. Use **\--no-trim-newlines** to disable this behavior, which may be useful when running a command such as `set contents (cat filename | string collect -N)`.

With **\--allow-empty**, `string collect` always prints one (empty) argument. This can be used to prevent an argument from disappearing.

## Examples[¶](#examples "Link to this heading")

\>\_ echo "zero $(echo one\\ntwo\\nthree) four"
zero one
two
three four

\>\_ echo \\"(echo one\\ntwo\\nthree | string collect)\\"
"one
two
three"

\>\_ echo \\"(echo one\\ntwo\\nthree | string collect \-N)\\"
"one
two
three
"

\>\_ echo foo(true | string collect \--allow-empty)bar
foobar
COPY
