Source: https://fishshell.com/docs/current/cmds/fish_config.html

# fish\_config - start the web-based configuration interface[¶](#fish-config-start-the-web-based-configuration-interface "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_config \[browse\]
fish\_config prompt (choose | list | save | show)
fish\_config theme
fish\_config theme choose THEME \[ --color-theme=(dark | light) \]
fish\_config theme demo
fish\_config theme dump
fish\_config theme list
fish\_config theme show \[THEME...\]
COPY

## Description[¶](#description "Link to this heading")

`fish_config` is used to configure fish.

Without arguments or with the `browse` command it starts the web-based configuration interface. The web interface allows you to view your functions, variables and history, and to make changes to your prompt and color configuration. It starts a local web server and opens a browser window. When you are finished, close the browser window and press the Enter key to terminate the configuration session.

If the `BROWSER` environment variable is set, it will be used as the name of the web browser to open instead of the system default.

With the `prompt` command `fish_config` can be used to view and choose a prompt from fish’s sample prompts inside the terminal directly.

Available subcommands for the `prompt` command:

-   `choose` loads a sample prompt in the current session.
    
-   `list` lists the names of the available sample prompts.
    
-   `save` saves the current prompt to a file (via [funcsave](funcsave.html)).
    
-   `show` shows what the given sample prompts (or all) would look like.
    

With the `theme` command `fish_config` can be used to view and choose a theme (meaning a color scheme) inside the terminal.

Available subcommands for the `theme` command:

-   `choose` loads a theme in the current session. If the theme has light and dark variants (see below), the one matching [`fish_terminal_color_theme`](../language.html#envvar-fish_terminal_color_theme) will be applied (also whenever that variable changes). To override [`fish_terminal_color_theme`](../language.html#envvar-fish_terminal_color_theme), pass the `--color-theme` argument.
    
-   `demo` displays some sample text in the current theme.
    
-   `dump` prints the current theme in a loadable format.
    
-   `list` lists the names of the available themes.
    
-   `show` shows what the given themes (or all) would look like.
    
-   _(not recommended)_ `save` saves the given theme to [universal variables](../language.html#variables-universal). A theme set this way will not update as [`fish_terminal_color_theme`](../language.html#envvar-fish_terminal_color_theme) changes.
    

The **\-h** or **\--help** option displays help about using this command.

## Theme Files[¶](#theme-files "Link to this heading")

`fish_config theme` and the theme selector in the web config tool load their themes from theme files. These are stored in the fish configuration directory, typically `~/.config/fish/themes`, with a .theme ending.

You can add your own theme by adding a file in that directory.

To get started quickly:

fish\_config theme dump \> ~/.config/fish/themes/my.theme
COPY

which will save your current theme in .theme format.

The format looks like this:

\# name: 'My Theme'

\[light\]
# preferred\_background: ffffff
fish\_color\_normal 000000
fish\_color\_autosuggestion 7f7f7f
fish\_color\_command 0000ee

\[dark\]
# preferred\_background: 000000
fish\_color\_normal ffffff
fish\_color\_autosuggestion 7f7f7f
fish\_color\_command 5c5cff

\[unknown\]
fish\_color\_normal --reset
fish\_color\_autosuggestion brblack
fish\_color\_cancel -r
fish\_color\_command --reset
COPY

The comments provide name and background color to the web config tool.

Themes can have three variants, one for light mode, one for dark mode, and one for terminals that don’t [report colors](../terminal-compatibility.html#term-compat-query-background-color) (where [`fish_terminal_color_theme`](../language.html#envvar-fish_terminal_color_theme) is set to `unknown`).

The other lines are just like `set variable value`, except that no expansions are allowed. Quotes are, but aren’t necessary.

Other than that, .theme files can contain any variable with a name that matches the regular expression `'^fish_(?:pager_)?color_.*$'` - starts with `fish_`, an optional `pager_`, then `color_` and then anything.

## Example[¶](#example "Link to this heading")

`fish_config` or `fish_config browse` opens a new web browser window and allows you to configure certain fish settings.

`fish_config prompt show` demos the available sample prompts.

`fish_config prompt choose disco` makes the disco prompt the prompt for the current session. This can also be used in [config.fish](../language.html#configuration) to set the prompt.

`fish_config prompt save` saves the current prompt to an [autoloaded](../language.html#syntax-function-autoloading) file.

`fish_config prompt save default` chooses the default prompt and saves it.
