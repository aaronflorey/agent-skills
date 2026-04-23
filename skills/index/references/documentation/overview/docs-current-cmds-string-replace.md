Source: https://fishshell.com/docs/current/cmds/string-replace.html

# string-replace - replace substrings[¶](#string-replace-replace-substrings "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

string replace \[\-a | \--all\] \[\-f | \--filter\] \[\-i | \--ignore-case\]
               \[\-r | \--regex\] \[(\-m | \--max-matches) MAX\] \[\-q | \--quiet\]
               PATTERN REPLACEMENT \[STRING ...\]
COPY

## Description[¶](#description "Link to this heading")

`string replace` is similar to `string match` but replaces non-overlapping matching substrings with a replacement string and prints the result. By default, _PATTERN_ is treated as a literal substring to be matched.

If **\-r** or **\--regex** is given, _PATTERN_ is interpreted as a Perl-compatible regular expression, and _REPLACEMENT_ can contain C-style escape sequences like **t** as well as references to capturing groups by number or name as _$n_ or _${n}_.

If you specify the **\-f** or **\--filter** flag then each input string is printed only if a replacement was done. This is useful where you would otherwise use this idiom: `a_cmd | string match pattern | string replace pattern new_pattern`. You can instead just write `a_cmd | string replace --filter pattern new_pattern`.

If **\--max-matches MAX** or **\-m MAX** is used, `string replace` will stop all processing after MAX lines of input have matched the specified pattern. In the event of `--filter` or `-f`, this means the output will be MAX lines in length. This can be used as an “early exit” optimization when processing long inputs but expecting a limited and fixed number of outputs that might be found considerably before the input stream has been exhausted.

Exit status: 0 if at least one replacement was performed, or 1 otherwise.

## Examples[¶](#examples "Link to this heading")

### Replace Literal Examples[¶](#replace-literal-examples "Link to this heading")

\>\_ string replace is was 'blue is my favorite'
blue was my favorite

\>\_ string replace 3rd last 1st 2nd 3rd
1st
2nd
last

\>\_ string replace \-a ' ' \_ 'spaces to underscores'
spaces\_to\_underscores
COPY

### Replace Regex Examples[¶](#replace-regex-examples "Link to this heading")

\>\_ string replace \-r \-a '\[^\\d.\]+' ' ' '0 one two 3.14 four 5x'
0 3.14 5

\>\_ string replace \-r '(\\w+)\\s+(\\w+)' '$2 $1 $$' 'left right'
right left $

\>\_ string replace \-r '\\s\*newline\\s\*' '\\n' 'put a newline here'
put a
here
COPY
