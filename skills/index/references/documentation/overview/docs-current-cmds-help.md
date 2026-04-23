Source: https://fishshell.com/docs/current/cmds/help.html

# help - display fish documentation[¶](#help-display-fish-documentation "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

help \[SECTION\]
COPY

## Description[¶](#description "Link to this heading")

`help` displays the fish help documentation.

If a _SECTION_ is specified, the help for that command is shown.

The **\-h** or **\--help** option displays help about using this command.

If the [`BROWSER`](../language.html#envvar-BROWSER) environment variable is set, it will be used to display the documentation. Otherwise, fish will search for a suitable browser. To use a different browser than as described above, you can set `$fish_help_browser` This variable may be set as a list, where the first element is the browser command and the rest are browser options.

## Example[¶](#example "Link to this heading")

`help fg` shows the documentation for the [fg](fg.html) builtin.

## Notes[¶](#notes "Link to this heading")

Most builtin commands, including this one, display their help in the terminal when given the **\--help** option.
