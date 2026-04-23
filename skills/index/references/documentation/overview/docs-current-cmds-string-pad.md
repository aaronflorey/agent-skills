Source: https://fishshell.com/docs/current/cmds/string-pad.html

# string-pad - pad strings to a fixed width[¶](#string-pad-pad-strings-to-a-fixed-width "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

string pad \[\-r | \--right\] \[\-C | \--center\] \[(\-c | \--char) CHAR\] \[(\-w | \--width) INTEGER\]
           \[STRING ...\]
COPY

## Description[¶](#description "Link to this heading")

`string pad` extends each _STRING_ to the given visible width by adding _CHAR_ to the left. That means the width of all visible characters added together, excluding escape sequences and accounting for [`fish_emoji_width`](../language.html#envvar-fish_emoji_width) and [`fish_ambiguous_width`](../language.html#envvar-fish_ambiguous_width). It is the amount of columns in a terminal the _STRING_ occupies.

The escape sequences reflect what fish knows about, and how it computes its output. Your terminal might support more escapes, or not support escape sequences that fish knows about.

If **\-C** or **\--center** is given, add the padding to before and after the string. If it is impossible to perfectly center the result (because the required amount of padding is an odd number), extra padding will be added to the left, unless **\--right** is also given.

If **\-r** or **\--right** is given, add the padding after a string.

If **\-c** or **\--char** is given, pad with _CHAR_ instead of whitespace.

The output is padded to the maximum width of all input strings. If **\-w** or **\--width** is given, use at least that.

## Examples[¶](#examples "Link to this heading")

\>\_ string pad \-w 10 abc abcdef
       abc
    abcdef

\>\_ string pad \--right \--char=🐟 "fish are pretty" "rich. "
fish are pretty
rich.  🐟🐟🐟🐟

\>\_ string pad \-w$COLUMNS (date)
\# Prints the current time on the right edge of the screen.
COPY

## See Also[¶](#see-also "Link to this heading")

-   The [printf](printf.html) command can do simple padding, for example `printf %10s\n` works like `string pad -w10`.
    
-   [string length](string-length.html) with the `--visible` option can be used to show what fish thinks the width is.
