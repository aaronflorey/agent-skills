Source: https://fishshell.com/docs/current/cmds/fish_indent.html

# fish\_indent - indenter and prettifier[¶](#fish-indent-indenter-and-prettifier "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_indent \[OPTIONS\] \[FILE ...\]
COPY

## Description[¶](#description "Link to this heading")

**fish\_indent** is used to indent a piece of fish code. **fish\_indent** reads commands from standard input or the given filenames and outputs them to standard output or a specified file (if `-w` is given).

The following options are available:

**\-w** or **\--write**

Indents a specified file and immediately writes to that file.

**\-i** or **\--no-indent**

Do not indent commands; only reformat to one job per line.

**\--only-indent**

Do not reformat, only indent each line.

**\--only-unindent**

Do not reformat, only unindent each line.

**\-c** or **\--check**

Do not indent, only return 0 if the code is already indented as fish\_indent would, the number of failed files otherwise. Also print the failed filenames if not reading from standard input.

**\-v** or **\--version**

Displays the current **fish** version and then exits.

**\--ansi**

Colorizes the output using ANSI escape sequences using the colors defined in the environment (such as [`fish_color_command`](../interactive.html#envvar-fish_color_command)).

**\--html**

Outputs HTML, which supports syntax highlighting if the appropriate CSS is defined. The CSS class names are the same as the variable names, such as `fish_color_command`.

**\--dump-parse-tree**

Dumps information about the parsed statements to standard error. This is likely to be of interest only to people working on the fish source code.

**\-h** or **\--help**

Displays help about using this command.
