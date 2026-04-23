Source: https://fishshell.com/docs/current/prompt.html

# Writing your own prompt[¶](#writing-your-own-prompt "Link to this heading")

Fish ships a number of prompts that you can view with the [fish\_config](cmds/fish_config.html) command, and many users have shared their prompts online.

However, you can also write your own, or adjust an existing prompt. This is a good way to get used to fish’s [scripting language](language.html).

Unlike other shells, fish’s prompt is built by running a function - [fish\_prompt](cmds/fish_prompt.html). Or, more specifically, three functions:

-   [fish\_prompt](cmds/fish_prompt.html), which is the main prompt function
    
-   [fish\_right\_prompt](cmds/fish_right_prompt.html), which is shown on the right side of the terminal.
    
-   [fish\_mode\_prompt](cmds/fish_mode_prompt.html), which is shown if [vi mode](interactive.html#vi-mode) is used.
    

These functions are run, and whatever they print is displayed as the prompt (minus one trailing newline).

If the [`SHELL_PROMPT_PREFIX`](language.html#envvar-SHELL_PROMPT_PREFIX) or [`SHELL_PROMPT_SUFFIX`](language.html#envvar-SHELL_PROMPT_SUFFIX) environment variables are set, they are automatically prepended and appended to the left prompt.

Here, we will just be writing a simple fish\_prompt.

## Our first prompt[¶](#our-first-prompt "Link to this heading")

Let’s look at a very simple example:

function fish\_prompt
    echo $PWD '>'
end
COPY

This prints the current working directory ([`PWD`](language.html#envvar-PWD)) and a `>` symbol to show where the prompt ends. The `>` is [quoted](language.html#quotes) because otherwise it would signify a [redirection](language.html#redirects).

Because we’ve used [echo](cmds/echo.html), it adds spaces between the two so it ends up looking like (assuming `_` is your cursor):

/home/tutorial >\_

## Formatting[¶](#formatting "Link to this heading")

`echo` adds spaces between its arguments. If you don’t want those, you can use [string join](cmds/string-join.html) like this:

function fish\_prompt
    string join '' \-- $PWD '>'
end
COPY

The `--` indicates to `string` that no options can come after it, in case we extend this with something that can start with a `-`.

There are other ways to remove the space, including `echo -s` and [printf](cmds/printf.html).

## Adding color[¶](#adding-color "Link to this heading")

This prompt is functional, but a bit boring. We could add some color.

Fortunately, fish offers the [set\_color](cmds/set_color.html) command, so you can do:

echo (set\_color red)foo
COPY

`set_color` can also handle RGB colors like `set_color 23b455`, and other formatting options including bold and italics.

So, taking our previous prompt and adding some color:

function fish\_prompt
    string join '' \-- (set\_color green) $PWD (set\_color \--reset) '>'
end
COPY

“--reset” tells the terminal to go back to its default formatting options.

`set_color` works by producing an escape sequence, which is a special piece of text that terminals interpret as instructions - for example, to change color. So `set_color red` produces the same effect as:

echo \\e\\\[31m
COPY

Although you can write your own escape sequences by hand, it’s much easier to use `set_color`.

## Shortening the working directory[¶](#shortening-the-working-directory "Link to this heading")

This is fine, but our [`PWD`](language.html#envvar-PWD) can be a bit long, and we are typically only interested in the last few directories. We can shorten this with the [prompt\_pwd](cmds/prompt_pwd.html) helper that will give us a shortened working directory:

function fish\_prompt
    string join '' \-- (set\_color green) (prompt\_pwd) (set\_color \--reset) '>'
end
COPY

`prompt_pwd` takes options to control how much to shorten. For instance, if we want to display the last two directories, we’d use `prompt_pwd --full-length-dirs 2`:

function fish\_prompt
    string join '' \-- (set\_color green) (prompt\_pwd \--full-length-dirs 2) (set\_color \--reset) '>'
end
COPY

With a current directory of “/home/tutorial/Music/Lena Raine/Oneknowing”, this would print

~/M/Lena Raine/Oneknowing\>\_

## Status[¶](#status "Link to this heading")

One important bit of information that every command returns is the [status](language.html#variables-status). This is a whole number from 0 to 255, and usually it is used as an error code - 0 if the command returned successfully, or a number from 1 to 255 if not.

It’s useful to display this in your prompt, but showing it when it’s 0 seems kind of wasteful.

First of all, since every command (except for [set](cmds/set.html)) changes the status, you need to store it for later use as the first thing in your prompt. Use a [local variable](language.html#variables-scope) so it will be confined to your prompt function:

set \-l last\_status $status
COPY

And after that, you can set a string if it is not zero:

\# Prompt status only if it's not 0
set \-l stat
if test $last\_status \-ne 0
    set stat (set\_color red)"\[$last\_status\]"(set\_color \--reset)
end
COPY

And to print it, we add it to our `string join`:

string join '' \-- (set\_color green) (prompt\_pwd) (set\_color \--reset) $stat '>'
COPY

If `$last_status` was 0, `$stat` is empty, and so it will simply disappear.

So our entire prompt is now:

function fish\_prompt
    set \-l last\_status $status
    \# Prompt status only if it's not 0
    set \-l stat
    if test $last\_status \-ne 0
        set stat (set\_color red)"\[$last\_status\]"(set\_color \--reset)
    end

    string join '' \-- (set\_color green) (prompt\_pwd) (set\_color \--reset) $stat '>'
end
COPY

And it looks like:

~/M/L/Oneknowing\>false
~/M/L/Oneknowing\[1\]\>\_

after we run `false` (which returns 1).

## Transient prompt[¶](#transient-prompt "Link to this heading")

To enable transient prompt functionality, set the [`fish_transient_prompt`](language.html#envvar-fish_transient_prompt) variable to 1:

set \-g fish\_transient\_prompt 1
COPY

With this set, fish re-runs prompt functions with a `--final-rendering` argument before running a commandline. So you can use it to declutter your old prompts. For example if you want to see only the current directory name when you scroll up:

function fish\_prompt
    set \-l last\_status $status
    set \-l stat
    set \-l pwd
    \# Check if it's a transient or final prompt
    if contains \-- \--final-rendering $argv
        set pwd (path basename $PWD)
    else
        set pwd (prompt\_pwd)
        \# Prompt status only if it's not 0
        if test $last\_status \-ne 0
            set stat (set\_color red)"\[$last\_status\]"(set\_color \--reset)
        end
    end

    string join '' \-- (set\_color green) $pwd (set\_color \--reset) $stat '>'
end
COPY

Now running two commands in the same directory could result in this screen:

Oneknowing\>false
~/M/L/Oneknowing\[1\]\>\_

## Save the prompt[¶](#save-the-prompt "Link to this heading")

Once you are happy with your prompt, you can save it with `funcsave fish_prompt` (see [funcsave - save the definition of a function to the user’s autoload directory](cmds/funcsave.html)) or write it to ~/.config/fish/functions/fish\_prompt.fish yourself.

If you want to edit it again, open that file or use `funced fish_prompt` (see [funced - edit a function interactively](cmds/funced.html)).

## Where to go from here?[¶](#where-to-go-from-here "Link to this heading")

We have now built a simple but working and usable prompt, but of course more can be done.

-   Fish offers more helper functions:
    
    -   `prompt_login` to describe the user/hostname/container or `prompt_hostname` to describe just the host
        
    -   `fish_is_root_user` to help with changing the symbol for root.
        
    -   `fish_vcs_prompt` to show version control information (or `fish_git_prompt` / `fish_hg_prompt` / `fish_svn_prompt` to limit it to specific systems)
        
    
-   You can add a right prompt by changing [fish\_right\_prompt](cmds/fish_right_prompt.html) or a vi mode prompt by changing [fish\_mode\_prompt](cmds/fish_mode_prompt.html).
    
-   Some prompts have interesting or advanced features
    
    -   Add the time when the prompt was printed
        
    -   Show various integrations like python’s venv
        
    -   Color the parts differently.
        
    

You can look at fish’s sample prompts for inspiration. Open up [fish\_config](cmds/fish_config.html), find one you like and pick it. For example:

fish\_config prompt show \# <- shows all the sample prompts
fish\_config prompt choose disco \# <- this picks the "disco" prompt for this session
funced fish\_prompt \# <- opens fish\_prompt in your editor, and reloads it once the editor exits
COPY
