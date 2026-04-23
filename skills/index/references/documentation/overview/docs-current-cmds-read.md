Source: https://fishshell.com/docs/current/cmds/read.html

# read - read line of input into variables[¶](#read-read-line-of-input-into-variables "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

read \[OPTIONS\] \[VARIABLE ...\]
COPY

## Description[¶](#description "Link to this heading")

`read` reads from standard input and stores the result in shell variables. In an alternative mode, it can also print to its own standard output, for example for use in command substitutions.

By default, `read` reads a single line and splits it into variables on spaces or tabs. Alternatively, a null character or a maximum number of characters can be used to terminate the input, and other delimiters can be given.

Unlike other shells, there is no default variable (such as `REPLY`) for storing the result - instead, it is printed on standard output.

When `read` reaches the end-of-file (EOF) instead of the terminator, the exit status is set to 1. Otherwise, it is set to 0.

If `read` sets a variable and you don’t specify a scope, it will use the same rules that [set - display and change shell variables](set.html) does - if the variable exists, it will use it (in the lowest scope). If it doesn’t, it will use an unexported function-scoped variable.

The following options, like the corresponding ones in [set - display and change shell variables](set.html), control variable scope or attributes:

**\-U** or **\--universal**

Sets a universal variable. The variable will be immediately available to all the user’s `fish` instances on the machine, and will be persisted across restarts of the shell.

**\-f** or **\--function**

Sets a variable scoped to the executing function. It is erased when the function ends.

**\-l** or **\--local**

Sets a locally-scoped variable in this block. It is erased when the block ends. Outside of a block, this is the same as **\--function**.

**\-g** or **\--global**

Sets a globally-scoped variable. Global variables are available to all functions running in the same shell. They can be modified or erased.

**\-u** or **\--unexport**

Prevents the variables from being exported to child processes (default behaviour).

**\-x** or **\--export**

Exports the variables to child processes.

The following options control the interactive mode:

**\-c** _CMD_ or **\--command** _CMD_

Sets the initial string in the interactive mode command buffer to _CMD_.

**\-s** or **\--silent**

Masks characters written to the terminal, replacing them with asterisks. This is useful for reading things like passwords or other sensitive information.

**\-p** or **\--prompt** _PROMPT\_CMD_

Uses the output of the shell command _PROMPT\_CMD_ as the prompt for the interactive mode. The default prompt command is `set_color green; echo -n read; set_color --reset; echo -n "> "`

**\-P** or **\--prompt-str** _PROMPT\_STR_

Uses the literal _PROMPT\_STR_ as the prompt for the interactive mode.

**\-R** or **\--right-prompt** _RIGHT\_PROMPT\_CMD_

Uses the output of the shell command _RIGHT\_PROMPT\_CMD_ as the right prompt for the interactive mode. There is no default right prompt command.

**\-S** or **\--shell**

Enables syntax highlighting, tab completions and command termination suitable for entering shellscript code in the interactive mode. NOTE: Prior to fish 3.0, the short opt for **\--shell** was **\-s**, but it has been changed for compatibility with bash’s **\-s** short opt for **\--silent**.

The following options control how much is read and how it is stored:

**\-d** or **\--delimiter** _DELIMITER_

Splits on _DELIMITER_. _DELIMITER_ will be used as an entire string to split on, not a set of characters.

**\-n** or **\--nchars** _NCHARS_

Makes `read` return after reading _NCHARS_ characters or the end of the line, whichever comes first.

**\-t**, **\--tokenize** or **\--tokenize-raw**

Causes read to split the input into variables by the shell’s tokenization rules. This means it will honor quotes and escaping. This option is of course incompatible with other options to control splitting like **\--delimiter** and does not honor [`IFS`](../language.html#envvar-IFS) (like fish’s tokenizer). The **\-t** -or **\--tokenize** variants perform quote removal, so e.g. `a\ b` is stored as `a b`. However variables and command substitutions are not expanded.

**\-a** or **\--list**

Stores the result as a list in a single variable. This option is also available as **\--array** for backwards compatibility.

**\-z** or **\--null**

Marks the end of the line with the NUL character, instead of newline. This also disables interactive mode.

**\-L** or **\--line**

Reads each line into successive variables, and stops after each variable has been filled. This cannot be combined with the `--delimiter` option.

Without the `--line` option, `read` reads a single line of input from standard input, breaks it into tokens, and then assigns one token to each variable specified in _VARIABLES_. If there are more tokens than variables, the complete remainder is assigned to the last variable.

If no option to determine how to split like `--delimiter`, `--line` or `--tokenize` is given, the variable `IFS` is used as a list of characters to split on. Relying on the use of `IFS` is deprecated and this behaviour will be removed in future versions. The default value of `IFS` contains space, tab and newline characters. As a special case, if `IFS` is set to the empty string, each character of the input is considered a separate token.

With the `--line` option, `read` reads a line of input from standard input into each provided variable, stopping when each variable has been filled. The line is not tokenized.

If no variable names are provided, `read` enters a special case that provides redirection from standard input to standard output, useful for command substitution. For instance, the fish shell command below can be used to read a password from the console instead of hardcoding it in the command itself, which prevents it from showing up in fish’s history:

mysql \-uuser \-p(read)
COPY

When running in this mode, `read` does not split the input in any way and text is redirected to standard output without any further processing or manipulation.

If `-l` or `--list` is provided, only one variable name is allowed and the tokens are stored as a list in this variable.

In order to protect the shell from consuming too many system resources, `read` will only consume a maximum of 100 MiB (104857600 bytes); if the terminator is not reached before this limit then _VARIABLE_ is set to empty and the exit status is set to 122. This limit can be altered with the [`fish_read_limit`](../language.html#envvar-fish_read_limit) variable. If set to 0 (zero), the limit is removed.

## Example[¶](#example "Link to this heading")

`read` has a few separate uses.

The following code stores the value ‘hello’ in the shell variable `foo`.

echo hello | read foo
COPY

The [while](while.html) command is a neat way to handle command output line-by-line:

printf '%s\\n' line1 line2 line3 line4 | while read \-l foo
                  echo "This is another line: $foo"
              end
COPY

Delimiters given via “-d” are taken as one string:

echo a==b==c | read \-d \== \-l a b c
echo $a \# a
echo $b \# b
echo $c \# c
COPY

`--tokenize` honors quotes and escaping like the shell’s argument passing:

echo 'a\\ b' | read \-t first second
echo $first \# outputs "a b", $second is empty

echo 'a"foo bar"b (command echo wurst)\*" "{a,b}' | read \-lt \-l a b c
echo $a \# outputs 'afoo barb' (without the quotes)
echo $b \# outputs '(command echo wurst)\* {a,b}' (without the quotes)
echo $c \# nothing
COPY

For an example on interactive use, see [Querying for user input](../language.html#user-input).
