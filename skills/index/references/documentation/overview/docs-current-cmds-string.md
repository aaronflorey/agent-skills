Source: https://fishshell.com/docs/current/cmds/string.html

# string - manipulate strings[¶](#string-manipulate-strings "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

string collect \[\-a | \--allow-empty\] \[\-N | \--no-trim-newlines\] \[STRING ...\]
string escape \[\-n | \--no-quoted\] \[\--style=\] \[STRING ...\]
string join \[\-q | \--quiet\] \[\-n | \--no-empty\] SEP \[STRING ...\]
string join0 \[\-q | \--quiet\] \[\-n | \--no-empty\] \[STRING ...\]
string length \[\-q | \--quiet\] \[STRING ...\]
string lower \[\-q | \--quiet\] \[STRING ...\]
string match \[\-a | \--all\] \[\-e | \--entire\] \[\-i | \--ignore-case\]
             \[\-g | \--groups-only\] \[\-r | \--regex\] \[\-n | \--index\]
             \[\-q | \--quiet\] \[\-v | \--invert\]
             PATTERN \[STRING ...\]
string pad \[\-r | \--right\] \[\-C | \--center\] \[(\-c | \--char) CHAR\] \[(\-w | \--width) INTEGER\]
           \[STRING ...\]
string repeat \[(\-n | \--count) COUNT\] \[(\-m | \--max) MAX\] \[\-N | \--no-newline\]
              \[\-q | \--quiet\] \[STRING ...\]
string repeat \[\-N | \--no-newline\] \[\-q | \--quiet\] COUNT \[STRING ...\]
string replace \[\-a | \--all\] \[\-f | \--filter\] \[\-i | \--ignore-case\]
               \[\-r | \--regex\] \[\-q | \--quiet\] PATTERN REPLACE \[STRING ...\]
string shorten \[(\-c | \--char) CHARS\] \[(\-m | \--max) INTEGER\]
               \[\-N | \--no-newline\] \[\-l | \--left\] \[\-q | \--quiet\] \[STRING ...\]
string split \[(\-f | \--fields) FIELDS\] \[(\-m | \--max) MAX\] \[\-n | \--no-empty\]
             \[\-q | \--quiet\] \[\-r | \--right\] SEP \[STRING ...\]
string split0 \[(\-f | \--fields) FIELDS\] \[(\-m | \--max) MAX\] \[\-n | \--no-empty\]
              \[\-q | \--quiet\] \[\-r | \--right\] \[STRING ...\]
string sub \[(\-s | \--start) START\] \[(\-e | \--end) END\] \[(\-l | \--length) LENGTH\]
           \[\-q | \--quiet\] \[STRING ...\]
string trim \[\-l | \--left\] \[\-r | \--right\] \[(\-c | \--chars) CHARS\]
            \[\-q | \--quiet\] \[STRING ...\]
string unescape \[\--style=\] \[STRING ...\]
string upper \[\-q | \--quiet\] \[STRING ...\]
COPY

## Description[¶](#description "Link to this heading")

`string` performs operations on strings.

_STRING_ arguments are taken from the command line unless standard input is connected to a pipe or a file, in which case they are read from standard input, one _STRING_ per line. It is an error to supply _STRING_ arguments on the command line and on standard input.

Arguments beginning with `-` are normally interpreted as switches; `--` causes the following arguments not to be treated as switches even if they begin with `-`. Switches and required arguments are recognized only on the command line.

Most subcommands accept a **\-q** or **\--quiet** switch, which suppresses the usual output but exits with the documented status. In this case these commands will quit early, without reading all of the available input.

The following subcommands are available.

## “collect” subcommand[¶](#collect-subcommand "Link to this heading")

string collect \[\-a | \--allow-empty\] \[\-N | \--no-trim-newlines\] \[STRING ...\]
COPY

`string collect` collects its input into a single output argument, without splitting the output when used in a command substitution. This is useful when trying to collect multiline output from another command into a variable. Exit status: 0 if any output argument is non-empty, or 1 otherwise.

A command like `echo (cmd | string collect)` is mostly equivalent to a quoted command substitution (`echo "$(cmd)"`). The main difference is that the former evaluates to zero or one elements whereas the quoted command substitution always evaluates to one element due to string interpolation.

If invoked with multiple arguments instead of input, `string collect` preserves each argument separately, where the number of output arguments is equal to the number of arguments given to `string collect`.

Any trailing newlines on the input are trimmed, just as with `"$(cmd)"` substitution. Use **\--no-trim-newlines** to disable this behavior, which may be useful when running a command such as `set contents (cat filename | string collect -N)`.

With **\--allow-empty**, `string collect` always prints one (empty) argument. This can be used to prevent an argument from disappearing.

### Examples[¶](#examples "Link to this heading")

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

## “escape” and “unescape” subcommands[¶](#escape-and-unescape-subcommands "Link to this heading")

string escape \[\-n | \--no-quoted\] \[\--style=\] \[STRING ...\]
string unescape \[\--style=\] \[STRING ...\]
COPY

`string escape` escapes each _STRING_ in one of several ways.

**\--style=script** (default) alters the string such that it can be passed back to `eval` to produce the original argument again. By default, all special characters are escaped, and quotes are used to simplify the output when possible. If **\-n** or **\--no-quoted** is given, the simplifying quoted format is not used. Exit status: 0 if at least one string was escaped, or 1 otherwise.

**\--style=var** ensures the string can be used as a variable name by hex encoding any non-alphanumeric characters. The string is first converted to UTF-8 before being encoded.

**\--style=url** ensures the string can be used as a URL by hex encoding any character which is not legal in a URL. The string is first converted to UTF-8 before being encoded.

**\--style=regex** escapes an input string for literal matching within a regex expression. The string is first converted to UTF-8 before being encoded.

`string unescape` performs the inverse of the `string escape` command. If the string to be unescaped is not properly formatted it is ignored. For example, doing `string unescape --style=var (string escape --style=var $str)` will return the original string. There is no support for unescaping **\--style=regex**.

### Examples[¶](#id1 "Link to this heading")

\>\_ echo \\x07 | string escape
\\cg

\>\_ string escape \--style=var 'a1 b2'\\u6161
a1\_20\_b2\_E6\_85\_A1\_
COPY

## “join” and “join0” subcommands[¶](#join-and-join0-subcommands "Link to this heading")

string join \[\-q | \--quiet\] \[\-n | \--no-empty\] \[\--\] SEP \[STRING ...\]
string join0 \[\-q | \--quiet\] \[\-n | \--no-empty\] \[\--\] \[STRING ...\]
COPY

Joins its _STRING_ arguments into a single string separated by _SEP_ (for `string join`) or by the zero byte (NUL) (for `string join0`). Exit status: 0 if at least one join was performed, or 1 otherwise.

**\-n**, **\--no-empty**

Exclude empty strings from consideration (e.g. `string join -n + a b "" c` would expand to `a+b+c` not `a+b++c`).

**\-q**, **\--quiet**

Do not print the strings, only set the exit status as described above.

**WARNING**: Insert a `--` before positional arguments to prevent them from being interpreted as flags. Otherwise, any strings starting with `-` will be treated as flag arguments, meaning they will most likely result in the command failing. This is also true if you specify a variable which expands to such a string instead of a literal string. If you don’t need to append flag arguments at the end of the command, just always use `--` to avoid unwelcome surprises.

`string join0` adds a trailing NUL. This is most useful in conjunction with tools that accept NUL-delimited input, such as `sort -z`.

Because Unix uses NUL as the string terminator, passing the output of `string join0` as an _argument_ to a command (via a [command substitution](../language.html#expand-command-substitution)) won’t actually work. Fish will pass the correct bytes along, but the command won’t be able to tell where the argument ends. This is a limitation of Unix’ argument passing.

### Examples[¶](#id2 "Link to this heading")

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

## “length” subcommand[¶](#length-subcommand "Link to this heading")

string length \[\-q | \--quiet\] \[\-V | \--visible\] \[STRING ...\]
COPY

`string length` reports the length of each string argument in characters. Exit status: 0 if at least one non-empty _STRING_ was given, or 1 otherwise.

With **\-V** or **\--visible**, it uses the visible width of the arguments. That means it will discount escape sequences fish knows about, account for $fish\_emoji\_width and $fish\_ambiguous\_width. It will also count each line (separated by `\n`) on its own, and with a carriage return (`\r`) count only the widest stretch on a line. The intent is to measure the number of columns the _STRING_ would occupy in the current terminal.

### Examples[¶](#id3 "Link to this heading")

\>\_ string length 'hello, world'
12

\>\_ set str foo
\>\_ string length \-q $str; echo $status
0
\# Equivalent to test -n "$str"

\>\_ string length \--visible (set\_color red)foobar
\# the set\_color is discounted, so this is the width of "foobar"
6

\>\_ string length \--visible 🐟🐟🐟🐟
\# depending on $fish\_emoji\_width, this is either 4 or 8
\# in new terminals it should be
8

\>\_ string length \--visible abcdef\\r123
\# this displays as "123def", so the width is 6
6

\>\_ string length \--visible a\\nbc
\# counts "a" and "bc" as separate lines, so it prints width for each
1
2
COPY

## “lower” subcommand[¶](#lower-subcommand "Link to this heading")

string lower \[\-q | \--quiet\] \[STRING ...\]
COPY

`string lower` converts each string argument to lowercase. Exit status: 0 if at least one string was converted to lowercase, else 1. This means that in conjunction with the **\-q** flag you can readily test whether a string is already lowercase.

## “match” subcommand[¶](#match-subcommand "Link to this heading")

string match \[\-a | \--all\] \[\-e | \--entire\] \[\-i | \--ignore-case\]
             \[\-g | \--groups-only\] \[\-r | \--regex\] \[\-n | \--index\]
             \[\-q | \--quiet\] \[\-v | \--invert\] \[(\-m | \--max-matches) MAX\]
             PATTERN \[STRING ...\]
COPY

`string match` tests each _STRING_ against _PATTERN_ and prints matching substrings. Only the first match for each _STRING_ is reported unless **\-a** or **\--all** is given, in which case all matches are reported.

If you specify the **\-e** or **\--entire** then each matching string is printed including any prefix or suffix not matched by the pattern (equivalent to `grep` without the **\-o** flag). You can, obviously, achieve the same result by prepending and appending **\*** or **.\*** depending on whether or not you have specified the **\--regex** flag. The **\--entire** flag is a way to avoid having to complicate the pattern in that fashion and make the intent of the `string match` clearer. Without **\--entire** and **\--regex**, a _PATTERN_ will need to match the entire _STRING_ before it will be reported.

Matching can be made case-insensitive with **\--ignore-case** or **\-i**.

If **\--groups-only** or **\-g** is given, only the capturing groups will be reported - meaning the full match will be skipped. This is incompatible with **\--entire** and **\--invert**, and requires **\--regex**. It is useful as a simple cutting tool instead of `string replace`, so you can choose “this part” of a string.

If **\--index** or **\-n** is given, each match is reported as a 1-based start position and a length. By default, PATTERN is interpreted as a glob pattern matched against each entire _STRING_ argument. A glob pattern is only considered a valid match if it matches the entire _STRING_.

If **\--regex** or **\-r** is given, _PATTERN_ is interpreted as a Perl-compatible regular expression, which does not have to match the entire _STRING_. For a regular expression containing capturing groups, multiple items will be reported for each match, one for the entire match and one for each capturing group. With this, only the matching part of the _STRING_ will be reported, unless **\--entire** is given.

When matching via regular expressions, `string match` automatically sets variables for all named capturing groups (`(?<name>expression)`). It will create a variable with the name of the group, in the default scope, for each named capturing group, and set it to the value of the capturing group in the first matched argument. If a named capture group matched an empty string, the variable will be set to the empty string (like `set var ""`). If it did not match, the variable will be set to nothing (like `set var`). When **\--regex** is used with **\--all**, this behavior changes. Each named variable will contain a list of matches, with the first match contained in the first element, the second match in the second, and so on. If the group was empty or did not match, the corresponding element will be an empty string.

If **\--invert** or **\-v** is used the selected lines will be only those which do not match the given glob pattern or regular expression.

If **\--max-matches MAX** or **\-m MAX** is used, `string` will stop checking for matches after MAX lines of input have matched. This can be used as an “early exit” optimization when processing long inputs but expecting a limited and fixed number of outputs that might be found considerably before the input stream has been exhausted. If combined with **\--invert** or **\-v**, considers only inverted matches.

Exit status: 0 if at least one match was found, or 1 otherwise.

### Match Glob Examples[¶](#match-glob-examples "Link to this heading")

\>\_ string match 'a' a
a

\>\_ string match 'a\*b' axxb
axxb

\>\_ string match \-i 'a\*B' Axxb
Axxb

\>\_ string match \-- '-\*' \-h foo \--version bar
\# To match things that look like options, we need a \`--\`
\# to tell string its options end there.
\-h
\--version

\>\_ echo 'ok?' | string match '\*?'
ok?

\# Note that only the second STRING will match here.
\>\_ string match 'foo' 'foo1' 'foo' 'foo2'
foo

\>\_ string match \-e 'foo' 'foo1' 'foo' 'foo2'
foo1
foo
foo2

\>\_ string match 'foo\*' 'foo1' 'foo' 'foo2'
foo1
foo2
COPY

### Match Regex Examples[¶](#match-regex-examples "Link to this heading")

\>\_ string match \-r 'cat|dog|fish' 'nice dog'
dog

\>\_ string match \-r \-v "c.\*\[12\]" {cat,dog}(seq 1 4)
dog1
dog2
cat3
dog3
cat4
dog4

\>\_ string match \-r \-- '-.\*' \-h foo \--version bar
\# To match things that look like options, we need a \`--\`
\# to tell string its options end there.
\-h
\--version

\>\_ string match \-r '(\\d\\d?):(\\d\\d):(\\d\\d)' 2:34:56
2:34:56
2
34
56

\>\_ string match \-r '^(\\w{2,4})\\1$' papa mud murmur
papa
pa
murmur
mur

\>\_ string match \-r \-a \-n at ratatat
2 2
4 2
6 2

\>\_ string match \-r \-i '0x\[0-9a-f\]{1,8}' 'int magic = 0xBadC0de;'
0xBadC0de

\>\_ echo $version
3.1.2-1575-ga2ff32d90
\>\_ string match \-rq '(?<major>\\d+).(?<minor>\\d+).(?<revision>\\d+)' \-- $version
\>\_ echo "You are using fish $major!"
You are using fish 3!

\>\_ string match \-raq ' \*(?<sentence>\[^.!?\]+)(?<punctuation>\[.!?\])?' "hello, friend. goodbye"
\>\_ printf "%s\\n" \-- $sentence
hello, friend
goodbye
\>\_ printf "%s\\n" \-- $punctuation
.

\>\_ string match \-rq '(?<word>hello)' 'hi'
\>\_ count $word
0
COPY

## “pad” subcommand[¶](#pad-subcommand "Link to this heading")

string pad \[\-r | \--right\] \[\-C | \--center\] \[(\-c | \--char) CHAR\] \[(\-w | \--width) INTEGER\]
           \[STRING ...\]
COPY

`string pad` extends each _STRING_ to the given visible width by adding _CHAR_ to the left. That means the width of all visible characters added together, excluding escape sequences and accounting for [`fish_emoji_width`](../language.html#envvar-fish_emoji_width) and [`fish_ambiguous_width`](../language.html#envvar-fish_ambiguous_width). It is the amount of columns in a terminal the _STRING_ occupies.

The escape sequences reflect what fish knows about, and how it computes its output. Your terminal might support more escapes, or not support escape sequences that fish knows about.

If **\-C** or **\--center** is given, add the padding to before and after the string. If it is impossible to perfectly center the result (because the required amount of padding is an odd number), extra padding will be added to the left, unless **\--right** is also given.

If **\-r** or **\--right** is given, add the padding after a string.

If **\-c** or **\--char** is given, pad with _CHAR_ instead of whitespace.

The output is padded to the maximum width of all input strings. If **\-w** or **\--width** is given, use at least that.

### Examples[¶](#id4 "Link to this heading")

\>\_ string pad \-w 10 abc abcdef
       abc
    abcdef

\>\_ string pad \--right \--char=🐟 "fish are pretty" "rich. "
fish are pretty
rich.  🐟🐟🐟🐟

\>\_ string pad \-w$COLUMNS (date)
\# Prints the current time on the right edge of the screen.
COPY

### See also[¶](#see-also "Link to this heading")

-   The [printf](printf.html) command can do simple padding, for example `printf %10s\n` works like `string pad -w10`.
    
-   [string length](string-length.html) with the `--visible` option can be used to show what fish thinks the width is.
    

## “shorten” subcommand[¶](#shorten-subcommand "Link to this heading")

string shorten \[(\-c | \--char) CHARS\] \[(\-m | \--max) INTEGER\]
               \[\-N | \--no-newline\] \[\-l | \--left\] \[\-q | \--quiet\] \[STRING ...\]
COPY

`string shorten` truncates each _STRING_ to the given visible width and adds an ellipsis to indicate it. “Visible width” means the width of all visible characters added together, excluding escape sequences and accounting for [`fish_emoji_width`](../language.html#envvar-fish_emoji_width) and [`fish_ambiguous_width`](../language.html#envvar-fish_ambiguous_width). It is the amount of columns in a terminal the _STRING_ occupies.

The escape sequences reflect what fish knows about, and how it computes its output. Your terminal might support more escapes, or not support escape sequences that fish knows about.

If **\-m** or **\--max** is given, truncate at the given width. Otherwise, the lowest non-zero width of all input strings is used. A max of 0 means no shortening takes place, all STRINGs are printed as-is.

If **\-N** or **\--no-newline** is given, only the first line (or last line with **\--left**) of each STRING is used, and an ellipsis is added if it was multiline. This only works for STRINGs being given as arguments, multiple lines given on stdin will be interpreted as separate STRINGs instead.

If **\-c** or **\--char** is given, add _CHAR_ instead of an ellipsis. This can also be empty or more than one character.

If **\-l** or **\--left** is given, remove text from the left on instead, so this prints the longest _suffix_ of the string that fits. With **\--no-newline**, this will take from the last line instead of the first.

If **\-q** or **\--quiet** is given, `string shorten` only runs for the return value - if anything would be shortened, it returns 0, else 1.

The default ellipsis is `…`. If fish thinks your system is incapable because of your locale, it will use `...` instead.

The return value is 0 if any shortening occurred, 1 otherwise.

### Examples[¶](#id5 "Link to this heading")

\>\_ string shorten foo foobar
\# No width was given, we infer, and "foo" is the shortest.
foo
fo…

\>\_ string shorten \--char="..." foo foobar
\# The target width is 3 because of "foo",
\# and our ellipsis is 3 too, so we can't really show anything.
\# This is the default ellipsis if your locale doesn't allow "…".
foo
...

\>\_ string shorten \--char="" \--max 4 abcdef 123456
\# Leaving the char empty makes us not add an ellipsis
\# So this truncates at 4 columns:
abcd
1234

\>\_ touch "a multiline"\\n"file"
\>\_ for file in \*; string shorten \-N \-- $file; end
\# Shorten the multiline file so we only show one line per file:
a multiline…

\>\_ ss \-p | string shorten \-m$COLUMNS \-c ""
\# \`ss\` from Linux' iproute2 shows socket information, but prints extremely long lines.
\# This shortens input so it fits on the screen without overflowing lines.

\>\_ git branch | string match \-rg '^\\\* (.\*)' | string shorten \-m20
\# Take the current git branch and shorten it at 20 columns.
\# Here the branch is "builtin-path-with-expand"
builtin-path-with-e…

\>\_ git branch | string match \-rg '^\\\* (.\*)' | string shorten \-m20 \--left
\# Taking 20 columns from the right instead:
…in-path-with-expand
COPY

### See also[¶](#id6 "Link to this heading")

-   [string pad](string-pad.html) does the inverse of this command, adding padding to a specific width instead.
    
-   The [printf](printf.html) command can do simple padding, for example `printf %10s\n` works like `string pad -w10`.
    
-   [string length](string-length.html) with the `--visible` option can be used to show what fish thinks the width is.
    

## “repeat” subcommand[¶](#repeat-subcommand "Link to this heading")

string repeat \[(\-n | \--count) COUNT\] \[(\-m | \--max) MAX\] \[\-N | \--no-newline\]
              \[\-q | \--quiet\] \[STRING ...\]
string repeat \[\-N | \--no-newline\] \[\-q | \--quiet\] COUNT \[STRING ...\]
COPY

`string repeat` repeats the _STRING_ **\-n** or **\--count** times. The **\-m** or **\--max** option will limit the number of outputted characters (excluding the newline). This option can be used by itself or in conjunction with **\--count**. If both **\--count** and **\--max** are present, max char will be outputted unless the final repeated string size is less than max, in that case, the string will repeat until count has been reached. Both **\--count** and **\--max** will accept a number greater than or equal to zero, in the case of zero, nothing will be outputted. The first argument is interpreted as _COUNT_ if **\--count** or **\--max** are not explicitly specified. If **\-N** or **\--no-newline** is given, the output won’t contain a newline character at the end. Exit status: 0 if yielded string is not empty, 1 otherwise.

### Examples[¶](#id7 "Link to this heading")

### Repeat Examples[¶](#repeat-examples "Link to this heading")

\>\_ string repeat \-n 2 'foo '
foo foo

\>\_ echo foo | string repeat \-n 2
foofoo

\>\_ string repeat \-n 2 \-m 5 'foo'
foofo

\>\_ string repeat \-m 5 'foo'
foofo

\>\_ string repeat 2 'foo'
foofoo

\>\_ string repeat 2 \-n 3
222
COPY

## “replace” subcommand[¶](#replace-subcommand "Link to this heading")

string replace \[\-a | \--all\] \[\-f | \--filter\] \[\-i | \--ignore-case\]
               \[\-r | \--regex\] \[(\-m | \--max-matches) MAX\] \[\-q | \--quiet\]
               PATTERN REPLACEMENT \[STRING ...\]
COPY

`string replace` is similar to `string match` but replaces non-overlapping matching substrings with a replacement string and prints the result. By default, _PATTERN_ is treated as a literal substring to be matched.

If **\-r** or **\--regex** is given, _PATTERN_ is interpreted as a Perl-compatible regular expression, and _REPLACEMENT_ can contain C-style escape sequences like **t** as well as references to capturing groups by number or name as _$n_ or _${n}_.

If you specify the **\-f** or **\--filter** flag then each input string is printed only if a replacement was done. This is useful where you would otherwise use this idiom: `a_cmd | string match pattern | string replace pattern new_pattern`. You can instead just write `a_cmd | string replace --filter pattern new_pattern`.

If **\--max-matches MAX** or **\-m MAX** is used, `string replace` will stop all processing after MAX lines of input have matched the specified pattern. In the event of `--filter` or `-f`, this means the output will be MAX lines in length. This can be used as an “early exit” optimization when processing long inputs but expecting a limited and fixed number of outputs that might be found considerably before the input stream has been exhausted.

Exit status: 0 if at least one replacement was performed, or 1 otherwise.

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

## “split” and “split0” subcommands[¶](#split-and-split0-subcommands "Link to this heading")

string split \[(\-f | \--fields) FIELDS \[\-a | \--allow-empty\]\] \[(\-m | \--max) MAX\] \[\-n | \--no-empty\]
             \[\-q | \--quiet\] \[\-r | \--right\] SEP \[STRING ...\]
string split0 \[(\-f | \--fields) FIELDS \[\-a | \--allow-empty\]\] \[(\-m | \--max) MAX\] \[\-n | \--no-empty\]
              \[\-q | \--quiet\] \[\-r | \--right\] \[STRING ...\]
COPY

`string split` splits each _STRING_ on the separator _SEP_, which can be an empty string. If **\-m** or **\--max** is specified, at most MAX splits are done on each _STRING_. If **\-r** or **\--right** is given, splitting is performed right-to-left. This is only useful in combination with **\-m** or **\--max**. With **\-n** or **\--no-empty**, empty results are excluded from consideration (e.g. `hello\n\nworld` would expand to two strings and not three). Exit status: 0 if at least one split was performed, or 1 otherwise.

Use **\-f** or **\--fields** to print out specific fields. FIELDS is a comma-separated string of field numbers and/or spans. Each field is one-indexed, and will be printed on separate lines. If a given field does not exist, then the command exits with status 1 and does not print anything, unless **\--allow-empty** is used.

See also the **\--delimiter** option of the [read](read.html) command.

`string split0` splits each _STRING_ on the zero byte (NUL). Options are the same as `string split` except that no separator is given.

`split0` has the important property that its output is not further split when used in a command substitution, allowing for the command substitution to produce elements containing newlines. This is most useful when used with Unix tools that produce zero bytes, such as `find -print0` or `sort -z`. See split0 examples below.

Be aware that commandline arguments cannot include NULs, so you likely want to pass to `string split0` via a pipe, not a command substitution.

### Examples[¶](#id8 "Link to this heading")

\>\_ string split . example.com
example
com

\>\_ string split \-r \-m1 / /usr/local/bin/fish
/usr/local/bin
fish

\>\_ string split '' abc
a
b
c

\>\_ string split \--allow-empty \-f1,3-4,5 '' abcd
a
c
d
COPY

### NUL Delimited Examples[¶](#nul-delimited-examples "Link to this heading")

\>\_ \# Count files in a directory, without being confused by newlines.
\>\_ \# Note: Don't use \`string split0 (find . -print0)\`, because arguments cannot include NUL.
\>\_ count (find . \-print0 | string split0)
42

\>\_ \# Sort a list of elements which may contain newlines
\>\_ set foo beta alpha\\ngamma
\>\_ set foo (string join0 $foo | sort \-z | string split0)
\>\_ string escape $foo\[1\]
alpha\\ngamma
COPY

## “sub” subcommand[¶](#sub-subcommand "Link to this heading")

string sub \[(\-s | \--start) START\] \[(\-e | \--end) END\] \[(\-l | \--length) LENGTH\]
           \[\-q | \--quiet\] \[STRING ...\]
COPY

`string sub` prints a substring of each string argument. The start/end of the substring can be specified with **\-s**/**\-e** or **\--start**/**\--end** followed by a 1-based index value. Positive index values are relative to the start of the string and negative index values are relative to the end of the string. The default start value is 1. The length of the substring can be specified with **\-l** or **\--length**. If the length or end is not specified, the substring continues to the end of each STRING. Exit status: 0 if at least one substring operation was performed, 1 otherwise. **\--length** is mutually exclusive with **\--end**.

### Examples[¶](#id9 "Link to this heading")

\>\_ string sub \--length 2 abcde
ab

\>\_ string sub \-s 2 \-l 2 abcde
bc

\>\_ string sub \--start=-2 abcde
de

\>\_ string sub \--end=3 abcde
abc

\>\_ string sub \-e \-1 abcde
abcd

\>\_ string sub \-s 2 \-e \-1 abcde
bcd

\>\_ string sub \-s \-3 \-e \-2 abcde
c
COPY

## “trim” subcommand[¶](#trim-subcommand "Link to this heading")

string trim \[\-l | \--left\] \[\-r | \--right\] \[(\-c | \--chars) CHARS\]
            \[\-q | \--quiet\] \[STRING ...\]
COPY

`string trim` removes leading and trailing whitespace from each _STRING_. If **\-l** or **\--left** is given, only leading whitespace is removed. If **\-r** or **\--right** is given, only trailing whitespace is trimmed.

The **\-c** or **\--chars** switch causes the set of characters in _CHARS_ to be removed instead of whitespace. This is a set of characters, not a string - if you pass `-c foo`, it will remove any “f” or “o”, not just “foo” as a whole.

Exit status: 0 if at least one character was trimmed, or 1 otherwise.

### Examples[¶](#id10 "Link to this heading")

\>\_ string trim ' abc  '
abc

\>\_ string trim \--right \--chars=yz xyzzy zany
x
zan
COPY

## “upper” subcommand[¶](#upper-subcommand "Link to this heading")

string upper \[\-q | \--quiet\] \[STRING ...\]
COPY

`string upper` converts each string argument to uppercase. Exit status: 0 if at least one string was converted to uppercase, else 1. This means that in conjunction with the **\-q** flag you can readily test whether a string is already uppercase.

## Regular Expressions[¶](#regular-expressions "Link to this heading")

Both the `match` and `replace` subcommand support regular expressions when used with the **\-r** or **\--regex** option. The dialect is that of PCRE2.

In general, special characters are special by default, so `a+` matches one or more “a”s, while `a\+` matches an “a” and then a “+”. `(a+)` matches one or more “a”s in a capturing group (`(?:XXXX)` denotes a non-capturing group). For the replacement parameter of `replace`, `$n` refers to the n-th group of the match. In the match parameter, `\n` (e.g. `\1`) refers back to groups.

Some features include repetitions:

-   `*` refers to 0 or more repetitions of the previous expression
    
-   `+` 1 or more
    
-   `?` 0 or 1.
    
-   `{n}` to exactly n (where n is a number)
    
-   `{n,m}` at least n, no more than m.
    
-   `{n,}` n or more
    

Character classes, some of the more important:

-   `.` any character except newline
    
-   `\d` a decimal digit and `\D`, not a decimal digit
    
-   `\s` whitespace and `\S`, not whitespace
    
-   `\w` a “word” character and `\W`, a “non-word” character
    
-   `[...]` (where “…” is some characters) is a character set
    
-   `[^...]` is the inverse of the given character set
    
-   `[x-y]` is the range of characters from x-y
    
-   `[[:xxx:]]` is a named character set
    
-   `[[:^xxx:]]` is the inverse of a named character set
    
-   `[[:alnum:]]` : “alphanumeric”
    
-   `[[:alpha:]]` : “alphabetic”
    
-   `[[:ascii:]]` : “0-127”
    
-   `[[:blank:]]` : “space or tab”
    
-   `[[:cntrl:]]` : “control character”
    
-   `[[:digit:]]` : “decimal digit”
    
-   `[[:graph:]]` : “printing, excluding space”
    
-   `[[:lower:]]` : “lower case letter”
    
-   `[[:print:]]` : “printing, including space”
    
-   `[[:punct:]]` : “printing, excluding alphanumeric”
    
-   `[[:space:]]` : “white space”
    
-   `[[:upper:]]` : “upper case letter”
    
-   `[[:word:]]` : “same as w”
    
-   `[[:xdigit:]]` : “hexadecimal digit”
    

Groups:

-   `(...)` is a capturing group
    
-   `(?:...)` is a non-capturing group
    
-   `\n` is a backreference (where n is the number of the group, starting with 1)
    
-   `$n` is a reference from the replacement expression to a group in the match expression.
    

And some other things:

-   `\b` denotes a word boundary, `\B` is not a word boundary.
    
-   `^` is the start of the string or line, `$` the end.
    
-   `|` is “alternation”, i.e. the “or”.
    

## Comparison to other tools[¶](#comparison-to-other-tools "Link to this heading")

Most operations `string` supports can also be done by external tools. Some of these include `grep`, `sed` and `cut`.

If you are familiar with these, it is useful to know how `string` differs from them.

In contrast to these classics, `string` reads input either from stdin or as arguments. `string` also does not deal with files, so it requires redirections to be used with them.

In contrast to `grep`, `string`’s `match` defaults to glob-mode, while `replace` defaults to literal matching. If set to regex-mode, they use PCRE regular expressions, which is comparable to `grep`’s `-P` option. `match` defaults to printing just the match, which is like `grep` with `-o` (use **\--entire** to enable grep-like behavior).

Like `sed`’s `s/old/new/` command, `string replace` still prints strings that don’t match. `sed`’s `-n` in combination with a `/p` modifier or command is like `string replace -f`.

`string split somedelimiter` is a replacement for `tr somedelimiter \n`.
