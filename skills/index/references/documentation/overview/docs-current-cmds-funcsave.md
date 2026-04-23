Source: https://fishshell.com/docs/current/cmds/funcsave.html

# funcsave - save the definition of a function to the user’s autoload directory[¶](#funcsave-save-the-definition-of-a-function-to-the-user-s-autoload-directory "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

funcsave FUNCTION\_NAME
funcsave \[\-q | \--quiet\] \[(\-d | \--directory) DIR\] FUNCTION\_NAME
COPY

## Description[¶](#description "Link to this heading")

`funcsave` saves a function to a file in the fish configuration directory. This function will be [automatically loaded](../language.html#syntax-function-autoloading) by current and future fish sessions. This can be useful to commit functions created interactively for permanent use.

If you have erased a function using [functions](functions.html)’s `--erase` option, `funcsave` will remove the saved function definition.

Because fish loads functions on-demand, saved functions cannot serve as [event handlers](../language.html#event) until they are run or otherwise sourced. To activate an event handler for every new shell, add the function to the [configuration file](../language.html#configuration) instead of using `funcsave`.

This is often used after [funced](funced.html), which opens the function in `$EDITOR` or `$VISUAL` and loads it into the current session afterwards.

To view a function’s current definition, use [functions](functions.html) or [type](type.html).
