Source: https://fishshell.com/docs/current/cmds/string-trim.html

# string-trim - remove trailing whitespace[¶](#string-trim-remove-trailing-whitespace "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

string trim \[\-l | \--left\] \[\-r | \--right\] \[(\-c | \--chars) CHARS\]
            \[\-q | \--quiet\] \[STRING ...\]
COPY

## Description[¶](#description "Link to this heading")

`string trim` removes leading and trailing whitespace from each _STRING_. If **\-l** or **\--left** is given, only leading whitespace is removed. If **\-r** or **\--right** is given, only trailing whitespace is trimmed.

The **\-c** or **\--chars** switch causes the set of characters in _CHARS_ to be removed instead of whitespace. This is a set of characters, not a string - if you pass `-c foo`, it will remove any “f” or “o”, not just “foo” as a whole.

Exit status: 0 if at least one character was trimmed, or 1 otherwise.

## Examples[¶](#examples "Link to this heading")

\>\_ string trim ' abc  '
abc

\>\_ string trim \--right \--chars=yz xyzzy zany
x
zan
COPY
