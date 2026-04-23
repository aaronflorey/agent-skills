Source: https://fishshell.com/docs/current/commands.html

# Commands[¶](#commands "Link to this heading")

This is a list of all the commands fish ships with.

Broadly speaking, these fall into a few categories:

## Keywords[¶](#keywords "Link to this heading")

Core language keywords that make up the syntax, like

-   [if](cmds/if.html) and [else](cmds/else.html) for conditions.
    
-   [for](cmds/for.html) and [while](cmds/while.html) for loops.
    
-   [break](cmds/break.html) and [continue](cmds/continue.html) to control loops.
    
-   [function](cmds/function.html) to define functions.
    
-   [return](cmds/return.html) to return a status from a function.
    
-   [begin](cmds/begin.html) to begin a block and [end](cmds/end.html) to end any block (including ifs and loops).
    
-   [and](cmds/and.html), [or](cmds/or.html) and [not](cmds/not.html) to combine commands logically.
    
-   [switch](cmds/switch.html) and [case](cmds/case.html) to make multiple blocks depending on the value of a variable.
    
-   [command](cmds/command.html) or [builtin](cmds/builtin.html) to tell fish what sort of thing to execute
    
-   [time](cmds/time.html) to time execution
    
-   [exec](cmds/exec.html) tells fish to replace itself with a command.
    
-   [end](cmds/end.html) to end a block
    

## Tools[¶](#tools "Link to this heading")

Builtins to do a task, like

-   [cd](cmds/cd.html) to change the current directory.
    
-   [echo](cmds/echo.html) or [printf](cmds/printf.html) to produce output.
    
-   [set\_color](cmds/set_color.html) to colorize output.
    
-   [set](cmds/set.html) to set, query or erase variables.
    
-   [read](cmds/read.html) to read input.
    
-   [string](cmds/string.html) for string manipulation.
    
-   [path](cmds/path.html) for filtering paths and handling their components.
    
-   [math](cmds/math.html) does arithmetic.
    
-   [argparse](cmds/argparse.html) to make arguments easier to handle.
    
-   [count](cmds/count.html) to count arguments.
    
-   [type](cmds/type.html) to find out what sort of thing (command, builtin or function) fish would call, or if it exists at all.
    
-   [test](cmds/test.html) checks conditions like if a file exists or a string is empty.
    
-   [contains](cmds/contains.html) to see if a list contains an entry.
    
-   [eval](cmds/eval.html) and [source](cmds/source.html) to run fish code from a string or file.
    
-   [status](cmds/status.html) to get shell information, like whether it’s interactive or a login shell, or which file it is currently running.
    
-   [abbr](cmds/abbr.html) manages [Abbreviations](interactive.html#abbreviations).
    
-   [bind](cmds/bind.html) to change bindings.
    
-   [complete](cmds/complete.html) manages [completions](interactive.html#tab-completion).
    
-   [commandline](cmds/commandline.html) to get or change the commandline contents.
    
-   [fish\_config](cmds/fish_config.html) to easily change fish’s configuration, like the prompt or colorscheme.
    
-   [random](cmds/random.html) to generate random numbers or pick from a list.
    

## Known functions[¶](#known-functions "Link to this heading")

Known functions are a customization point. You can change them to change how your fish behaves. This includes:

-   [fish\_prompt](cmds/fish_prompt.html) and [fish\_right\_prompt](cmds/fish_right_prompt.html) and [fish\_mode\_prompt](cmds/fish_mode_prompt.html) to print your prompt.
    
-   [fish\_command\_not\_found](cmds/fish_command_not_found.html) to tell fish what to do when a command is not found.
    
-   [fish\_title](cmds/fish_title.html) to change the terminal’s title.
    
-   [fish\_tab\_title](cmds/fish_tab_title.html) to change the terminal tab’s title.
    
-   [fish\_greeting](cmds/fish_greeting.html) to show a greeting when fish starts.
    
-   [fish\_should\_add\_to\_history](cmds/fish_should_add_to_history.html) to determine if a command should be added to history
    

## Helper functions[¶](#helper-functions "Link to this heading")

Some helper functions, often to give you information for use in your prompt:

-   [fish\_git\_prompt](cmds/fish_git_prompt.html) and [fish\_hg\_prompt](cmds/fish_hg_prompt.html) to print information about the current git or mercurial repository.
    
-   [fish\_vcs\_prompt](cmds/fish_vcs_prompt.html) to print information for either.
    
-   [fish\_svn\_prompt](cmds/fish_svn_prompt.html) to print information about the current svn repository.
    
-   [fish\_status\_to\_signal](cmds/fish_status_to_signal.html) to give a signal name from a return status.
    
-   [prompt\_pwd](cmds/prompt_pwd.html) to give the current directory in a nicely formatted and shortened way.
    
-   [prompt\_login](cmds/prompt_login.html) to describe the current login, with user and hostname, and to explain if you are in a chroot or connected via ssh.
    
-   [prompt\_hostname](cmds/prompt_hostname.html) to give the hostname, shortened for use in the prompt.
    
-   [fish\_is\_root\_user](cmds/fish_is_root_user.html) to check if the current user is an administrator user like root.
    
-   [fish\_add\_path](cmds/fish_add_path.html) to easily add a path to $PATH.
    
-   [alias](cmds/alias.html) to quickly define wrapper functions (“aliases”).
    
-   [fish\_delta](cmds/fish_delta.html) to show what you have changed from the default configuration.
    
-   [export](cmds/export.html) as a compatibility function for other shells.
    

## Helper commands[¶](#helper-commands "Link to this heading")

fish also ships some things as external commands so they can be easily called from elsewhere.

This includes [fish\_indent](cmds/fish_indent.html) to format fish code and [fish\_key\_reader](cmds/fish_key_reader.html) to show you what escape sequence a keypress produces.

## The full list[¶](#the-full-list "Link to this heading")

And here is the full list:

-   [\_ - call fish’s translations](cmds/_.html)
-   [abbr - manage fish abbreviations](cmds/abbr.html)
-   [alias - create a function](cmds/alias.html)
-   [and - conditionally execute a command](cmds/and.html)
-   [argparse - parse options passed to a fish script or function](cmds/argparse.html)
-   [begin - start a new block of code](cmds/begin.html)
-   [bg - send jobs to background](cmds/bg.html)
-   [bind - handle fish key bindings](cmds/bind.html)
-   [block - temporarily block delivery of events](cmds/block.html)
-   [break - stop the current inner loop](cmds/break.html)
-   [breakpoint - launch debug mode](cmds/breakpoint.html)
-   [builtin - run a builtin command](cmds/builtin.html)
-   [case - conditionally execute a block of commands](cmds/case.html)
-   [cd - change directory](cmds/cd.html)
-   [cdh - change to a recently visited directory](cmds/cdh.html)
-   [command - run a program](cmds/command.html)
-   [commandline - set or get the current command line buffer](cmds/commandline.html)
-   [complete - edit command-specific tab-completions](cmds/complete.html)
-   [contains - test if a word is present in a list](cmds/contains.html)
-   [continue - skip the remainder of the current iteration of the current inner loop](cmds/continue.html)
-   [count - count the number of elements of a list](cmds/count.html)
-   [dirh - print directory history](cmds/dirh.html)
-   [dirs - print directory stack](cmds/dirs.html)
-   [disown - remove a process from the list of jobs](cmds/disown.html)
-   [echo - display a line of text](cmds/echo.html)
-   [else - execute command if a condition is not met](cmds/else.html)
-   [emit - emit a generic event](cmds/emit.html)
-   [end - end a block of commands](cmds/end.html)
-   [eval - evaluate the specified commands](cmds/eval.html)
-   [exec - execute command in current process](cmds/exec.html)
-   [exit - exit the shell](cmds/exit.html)
-   [export - compatibility function for exporting variables](cmds/export.html)
-   [false - return an unsuccessful result](cmds/false.html)
-   [fg - bring job to foreground](cmds/fg.html)
-   [fish - the friendly interactive shell](cmds/fish.html)
-   [fish\_add\_path - add to the path](cmds/fish_add_path.html)
-   [fish\_breakpoint\_prompt - define the prompt when stopped at a breakpoint](cmds/fish_breakpoint_prompt.html)
-   [fish\_clipboard\_copy - copy text to the system’s clipboard](cmds/fish_clipboard_copy.html)
-   [fish\_clipboard\_paste - get text from the system’s clipboard](cmds/fish_clipboard_paste.html)
-   [fish\_command\_not\_found - what to do when a command wasn’t found](cmds/fish_command_not_found.html)
-   [fish\_config - start the web-based configuration interface](cmds/fish_config.html)
-   [fish\_default\_key\_bindings - set emacs key bindings for fish](cmds/fish_default_key_bindings.html)
-   [fish\_delta - compare functions and completions to the default](cmds/fish_delta.html)
-   [fish\_git\_prompt - output git information for use in a prompt](cmds/fish_git_prompt.html)
-   [fish\_greeting - display a welcome message in interactive shells](cmds/fish_greeting.html)
-   [fish\_hg\_prompt - output Mercurial information for use in a prompt](cmds/fish_hg_prompt.html)
-   [fish\_indent - indenter and prettifier](cmds/fish_indent.html)
-   [fish\_is\_root\_user - check if the current user is root](cmds/fish_is_root_user.html)
-   [fish\_key\_reader - explore what characters keyboard keys send](cmds/fish_key_reader.html)
-   [fish\_mode\_prompt - define the appearance of the mode indicator](cmds/fish_mode_prompt.html)
-   [fish\_opt - create an option specification for the argparse command](cmds/fish_opt.html)
-   [fish\_prompt - define the appearance of the command line prompt](cmds/fish_prompt.html)
-   [fish\_right\_prompt - define the appearance of the right-side command line prompt](cmds/fish_right_prompt.html)
-   [fish\_should\_add\_to\_history - decide whether a command should be added to the history](cmds/fish_should_add_to_history.html)
-   [fish\_status\_to\_signal - convert exit codes to human-friendly signals](cmds/fish_status_to_signal.html)
-   [fish\_svn\_prompt - output Subversion information for use in a prompt](cmds/fish_svn_prompt.html)
-   [fish\_tab\_title - define the terminal tab’s title](cmds/fish_tab_title.html)
-   [fish\_title - define the terminal’s title](cmds/fish_title.html)
-   [fish\_update\_completions - update completions using manual pages](cmds/fish_update_completions.html)
-   [fish\_vcs\_prompt - output version control system information for use in a prompt](cmds/fish_vcs_prompt.html)
-   [fish\_vi\_key\_bindings - set vi key bindings for fish](cmds/fish_vi_key_bindings.html)
-   [for - perform a set of commands multiple times](cmds/for.html)
-   [funced - edit a function interactively](cmds/funced.html)
-   [funcsave - save the definition of a function to the user’s autoload directory](cmds/funcsave.html)
-   [function - create a function](cmds/function.html)
-   [functions - print or erase functions](cmds/functions.html)
-   [help - display fish documentation](cmds/help.html)
-   [history - show and manipulate command history](cmds/history.html)
-   [if - conditionally execute a command](cmds/if.html)
-   [isatty - test if a file descriptor is a terminal](cmds/isatty.html)
-   [jobs - print currently running jobs](cmds/jobs.html)
-   [math - perform mathematics calculations](cmds/math.html)
-   [nextd - move forward through directory history](cmds/nextd.html)
-   [not - negate the exit status of a job](cmds/not.html)
-   [open - open file in its default application](cmds/open.html)
-   [or - conditionally execute a command](cmds/or.html)
-   [path - manipulate and check paths](cmds/path.html)
-   [popd - move through directory stack](cmds/popd.html)
-   [prevd - move backward through directory history](cmds/prevd.html)
-   [printf - display text according to a format string](cmds/printf.html)
-   [prompt\_hostname - print the hostname, shortened for use in the prompt](cmds/prompt_hostname.html)
-   [prompt\_login - describe the login suitable for prompt](cmds/prompt_login.html)
-   [prompt\_pwd - print pwd suitable for prompt](cmds/prompt_pwd.html)
-   [psub - perform process substitution](cmds/psub.html)
-   [pushd - push directory to directory stack](cmds/pushd.html)
-   [pwd - output the current working directory](cmds/pwd.html)
-   [random - generate random number](cmds/random.html)
-   [read - read line of input into variables](cmds/read.html)
-   [realpath - convert a path to an absolute path without symlinks](cmds/realpath.html)
-   [return - stop the current inner function](cmds/return.html)
-   [set - display and change shell variables](cmds/set.html)
-   [set\_color - set the terminal color](cmds/set_color.html)
-   [source - evaluate contents of file](cmds/source.html)
-   [status - query fish runtime information](cmds/status.html)
-   [string - manipulate strings](cmds/string.html)
-   [string-collect - join strings into one](cmds/string-collect.html)
-   [string-escape - escape special characters](cmds/string-escape.html)
-   [string-join - join strings with delimiter](cmds/string-join.html)
-   [string-join0 - join strings with zero bytes](cmds/string-join0.html)
-   [string-length - print string lengths](cmds/string-length.html)
-   [string-lower - convert strings to lowercase](cmds/string-lower.html)
-   [string-match - match substrings](cmds/string-match.html)
-   [string-pad - pad strings to a fixed width](cmds/string-pad.html)
-   [string-repeat - multiply a string](cmds/string-repeat.html)
-   [string-replace - replace substrings](cmds/string-replace.html)
-   [string-shorten - shorten strings to a width, with an ellipsis](cmds/string-shorten.html)
-   [string-split - split strings by delimiter](cmds/string-split.html)
-   [string-split0 - split on zero bytes](cmds/string-split0.html)
-   [string-sub - extract substrings](cmds/string-sub.html)
-   [string-trim - remove trailing whitespace](cmds/string-trim.html)
-   [string-unescape - expand escape sequences](cmds/string-unescape.html)
-   [string-upper - convert strings to uppercase](cmds/string-upper.html)
-   [suspend - suspend the current shell](cmds/suspend.html)
-   [switch - conditionally execute a block of commands](cmds/switch.html)
-   [test - perform tests on files and text](cmds/test.html)
-   [time - measure how long a command or block takes](cmds/time.html)
-   [trap - perform an action when the shell receives a signal](cmds/trap.html)
-   [true - return a successful result](cmds/true.html)
-   [type - locate a command and describe its type](cmds/type.html)
-   [ulimit - set or get resource usage limits](cmds/ulimit.html)
-   [umask - set or get the file creation mode mask](cmds/umask.html)
-   [vared - interactively edit the value of an environment variable](cmds/vared.html)
-   [wait - wait for jobs to complete](cmds/wait.html)
-   [while - perform a set of commands multiple times](cmds/while.html)
