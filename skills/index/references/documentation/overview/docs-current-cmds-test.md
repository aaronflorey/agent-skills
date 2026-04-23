Source: https://fishshell.com/docs/current/cmds/test.html

# test - perform tests on files and text[¶](#test-perform-tests-on-files-and-text "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

test \[EXPRESSION\]
\[ \[EXPRESSION\] \]
COPY

## Description[¶](#description "Link to this heading")

`test` checks the given conditions and sets the exit status to 0 if they are true, 1 if they are false.

The first form (`test`) is preferred. For compatibility with other shells, the second form is available: a matching pair of square brackets (`[ [EXPRESSION] ]`).

When using a variable or command substitution as an argument with `test` you should almost always enclose it in double-quotes, as variables expanding to zero or more than one argument will most likely interact badly with `test`.

Warning

For historical reasons, `test` supports the one-argument form (`test foo`), and this will also be triggered by e.g. `test -n $foo` if $foo is unset. We recommend you don’t use the one-argument form and quote all variables or command substitutions used with `test`.

This confusing misfeature will be removed in future. `test -n` without any additional argument will be false, `test -z` will be true and any other invocation with exactly one or zero arguments, including `test -d` and `test "foo"` will be an error.

The same goes for `[`, e.g. `[ "foo" ]` and `[ -d ]` will be errors.

This can be turned on already via the `test-require-arg` [feature flag](../language.html#featureflags), and will eventually become the default and then only option.

## Operators for files and directories[¶](#operators-for-files-and-directories "Link to this heading")

**\-b** _FILE_

Returns true if _FILE_ is a block device.

**\-c** _FILE_

Returns true if _FILE_ is a character device.

**\-d** _FILE_

Returns true if _FILE_ is a directory.

**\-e** _FILE_

Returns true if _FILE_ exists.

**\-f** _FILE_

Returns true if _FILE_ is a regular file.

**\-g** _FILE_

Returns true if _FILE_ has the set-group-ID bit set.

**\-G** _FILE_

Returns true if _FILE_ exists and has the same group ID as the current user.

**\-k** _FILE_

Returns true if _FILE_ has the sticky bit set. If the OS does not support the concept it returns false. See [https://en.wikipedia.org/wiki/Sticky\_bit](https://en.wikipedia.org/wiki/Sticky_bit).

**\-L** _FILE_

Returns true if _FILE_ is a symbolic link.

**\-O** _FILE_

Returns true if _FILE_ exists and is owned by the current user.

**\-p** _FILE_

Returns true if _FILE_ is a named pipe.

**\-r** _FILE_

Returns true if _FILE_ is marked as readable.

**\-s** _FILE_

Returns true if the size of _FILE_ is greater than zero.

**\-S** _FILE_

Returns true if _FILE_ is a socket.

**\-t** _FD_

Returns true if the file descriptor _FD_ is a terminal (TTY).

**\-u** _FILE_

Returns true if _FILE_ has the set-user-ID bit set.

**\-w** _FILE_

Returns true if _FILE_ is marked as writable; note that this does not check if the filesystem is read-only.

**\-x** _FILE_

Returns true if _FILE_ is marked as executable.

## Operators to compare files and directories[¶](#operators-to-compare-files-and-directories "Link to this heading")

_FILE1_ **\-nt** _FILE2_

Returns true if _FILE1_ is newer than _FILE2_, or _FILE1_ exists and _FILE2_ does not.

_FILE1_ **\-ot** _FILE2_

Returns true if _FILE1_ is older than _FILE2_, or _FILE2_ exists and _FILE1_ does not.

_FILE1_ **\-ef** _FILE1_

Returns true if _FILE1_ and _FILE2_ refer to the same file.

## Operators for text strings[¶](#operators-for-text-strings "Link to this heading")

_STRING1_ **\=** _STRING2_

Returns true if the strings _STRING1_ and _STRING2_ are identical.

_STRING1_ **!=** _STRING2_

Returns true if the strings _STRING1_ and _STRING2_ are not identical.

**\-n** _STRING_

Returns true if the length of _STRING_ is non-zero.

**\-z** _STRING_

Returns true if the length of _STRING_ is zero.

## Operators to compare and examine numbers[¶](#operators-to-compare-and-examine-numbers "Link to this heading")

_NUM1_ **\-eq** _NUM2_

Returns true if _NUM1_ and _NUM2_ are numerically equal.

_NUM1_ **\-ne** _NUM2_

Returns true if _NUM1_ and _NUM2_ are not numerically equal.

_NUM1_ **\-gt** _NUM2_

Returns true if _NUM1_ is greater than _NUM2_.

_NUM1_ **\-ge** _NUM2_

Returns true if _NUM1_ is greater than or equal to _NUM2_.

_NUM1_ **\-lt** _NUM2_

Returns true if _NUM1_ is less than _NUM2_.

_NUM1_ **\-le** _NUM2_

Returns true if _NUM1_ is less than or equal to _NUM2_.

Both integers and floating point numbers are supported.

## Operators to combine expressions[¶](#operators-to-combine-expressions "Link to this heading")

_COND1_ **\-a** _COND2_

Returns true if both _COND1_ and _COND2_ are true.

_COND1_ **\-o** _COND2_

Returns true if either _COND1_ or _COND2_ are true.

Expressions can be inverted using the **!** operator:

**!** _EXPRESSION_

Returns true if _EXPRESSION_ is false, and false if _EXPRESSION_ is true.

Expressions can be grouped using parentheses.

**(** _EXPRESSION_ **)**

Returns the value of _EXPRESSION_.

Note that parentheses will usually require escaping with `\` (so they appear as `\(` and `\)`) to avoid being interpreted as a command substitution.

## Examples[¶](#examples "Link to this heading")

If the `/tmp` directory exists, copy the `/etc/motd` file to it:

if test \-d /tmp
    cp /etc/motd /tmp/motd
end
COPY

If the variable `MANPATH` is defined and not empty, print the contents. (If `MANPATH` is not defined, then it will expand to zero arguments, unless quoted.)

if test \-n "$MANPATH"
    echo $MANPATH
end
COPY

Be careful with unquoted variables:

if test \-n $MANPATH
    \# This will also be reached if $MANPATH is unset,
    \# because in that case we have \`test -n\`, so it checks if "-n" is non-empty, and it is.
    echo $MANPATH
end
COPY

This will change in a future release of fish, or already with the `test-require-arg` [feature flag](../language.html#featureflags) - if $MANPATH is unset, `if test -n $MANPATH` will be false.

Parentheses and the `-o` and `-a` operators can be combined to produce more complicated expressions. In this example, success is printed if there is a `/foo` or `/bar` file as well as a `/baz` or `/bat` file.

if test \\( \-f /foo \-o \-f /bar \\) \-a \\( \-f /baz \-o \-f /bat \\)
    echo Success.
end
COPY

Numerical comparisons will fail if one of the operands is not a number:

if test 42 \-eq "The answer to life, the universe and everything"
    echo So long and thanks for all the fish \# will not be executed
end
COPY

A common comparison is with [`status`](../language.html#envvar-status):

if test $status \-eq 0
    echo "Previous command succeeded"
end
COPY

The previous test can likewise be inverted:

if test ! $status \-eq 0
    echo "Previous command failed"
end
COPY

which is logically equivalent to the following:

if test $status \-ne 0
    echo "Previous command failed"
end
COPY

## Standards[¶](#standards "Link to this heading")

Unlike many things in fish, `test` implements a subset of the [IEEE Std 1003.1-2008 (POSIX.1) standard](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/test.html). The following exceptions apply:

-   The `<` and `>` operators for comparing strings are not implemented.
    
-   With `test-require-arg`, the zero- and one-argument modes will behave differently.
    

> In cases such as this, one can use `command` `test` to explicitly use the system’s standalone `test` rather than this `builtin` `test`.

## See also[¶](#see-also "Link to this heading")

Other commands that may be useful as a condition, and are often easier to use:

-   [string - manipulate strings](string.html), which can do string operations including wildcard and regular expression matching
    
-   [path - manipulate and check paths](path.html), which can do file checks and operations, including filters on multiple paths at once
