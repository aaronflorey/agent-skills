Source: https://fishshell.com/docs/current/cmds/echo.html

# echo - display a line of text[¶](#echo-display-a-line-of-text "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

echo \[OPTIONS\] \[STRING\]
COPY

## Description[¶](#description "Link to this heading")

`echo` displays _STRING_ of text.

The following options are available:

**\-n**

Do not output a newline.

**\-s**

Do not separate arguments with spaces.

**\-E**

Disable interpretation of backslash escapes (default).

**\-e**

Enable interpretation of backslash escapes.

Unlike other shells, this echo accepts `--` to signal the end of the options.

## Escape Sequences[¶](#escape-sequences "Link to this heading")

If `-e` is used, the following sequences are recognized:

-   `\` backslash
    
-   `\a` alert (BEL)
    
-   `\b` backspace
    
-   `\c` produce no further output
    
-   `\e` escape
    
-   `\f` form feed
    
-   `\n` new line
    
-   `\r` carriage return
    
-   `\t` horizontal tab
    
-   `\v` vertical tab
    
-   `\0NNN` byte with octal value NNN (1 to 3 digits)
    
-   `\xHH` byte with hexadecimal value HH (1 to 2 digits)
    

## Example[¶](#example "Link to this heading")

\> echo 'Hello World'
Hello World

\> echo \-e 'Top\\nBottom'
Top
Bottom

\> echo \-- \-n
\-n
COPY

## See Also[¶](#see-also "Link to this heading")

-   the [printf](printf.html) command, for more control over output formatting
