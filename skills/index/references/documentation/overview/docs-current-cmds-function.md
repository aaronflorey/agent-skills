Source: https://fishshell.com/docs/current/cmds/function.html

# function - create a function[¶](#function-create-a-function "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

function NAME \[OPTIONS\]; BODY; end
COPY

## Description[¶](#description "Link to this heading")

`function` creates a new function _NAME_ with the body _BODY_.

A function is a list of commands that will be executed when the name of the function is given as a command.

The following options are available:

**\-a** _NAMES_ or **\--argument-names** _NAMES_

Assigns the value of successive command-line arguments to the names given in _NAMES_ (separated by spaces). These are the same arguments given in [`argv`](../language.html#envvar-argv), and are still available there (unless `--inherit-variable argv` was used or one of the given _NAMES_ is `argv`). See also [Argument Handling](../language.html#variables-argv).

**\-d** _DESCRIPTION_ or **\--description** _DESCRIPTION_

A description of what the function does, suitable as a completion description.

**\-w** _WRAPPED\_COMMAND_ or **\--wraps** _WRAPPED\_COMMAND_

Inherit completions from the given _WRAPPED\_COMMAND_. This is used to say that this function completes like that command, for example if you’re creating an alias. See the documentation for [complete](complete.html) for more information. If the wrapped command is the same as the function name, this will be ignored.

**\-e** _EVENT\_NAME_ or **\--on-event** _EVENT\_NAME_

Run this function when the specified named event is emitted. Fish internally generates named events, for example, when showing the prompt. Custom events can be emitted using the [emit](emit.html) command.

**\-v** _VARIABLE\_NAME_ or **\--on-variable** _VARIABLE\_NAME_

Run this function when the variable _VARIABLE\_NAME_ changes value. Note that **fish** makes no guarantees on any particular timing or even that the function will be run for every single `set`. Rather it will be run when the variable has been set at least once, possibly skipping some values or being run when the variable has been set to the same value (except for universal variables set in other shells - only changes in the value will be picked up for those).

**\-j** _PID_ or **\--on-job-exit** _PID_

Run this function when the job containing a child process with the given process ID _PID_ exits. Instead of a PID, the string ‘caller’ can be specified. This is only allowed when in a command substitution, and will result in the handler being triggered by the exit of the job which created this command substitution. This will not trigger for [disowned](disown.html) jobs.

**\-p** _PID_ or **\--on-process-exit** _PID_

Run this function when the fish child process with process ID PID exits. Instead of a PID, for backward compatibility, “`%self`” can be specified as an alias for `$fish_pid`, and the function will be run when the current fish instance exits. This will not trigger for [disowned](disown.html) jobs.

**\-s** _SIGSPEC_ or **\--on-signal** _SIGSPEC_

Run this function when the signal `SIGSPEC` is delivered. `SIGSPEC` can be a signal number, or the signal name, such as `SIGHUP` (or just `HUP`). Note that the signal must have been delivered to **fish**; for example, ctrl\-c sends `SIGINT` to the foreground process group, which will not be **fish** if you are running another command at the time. Observing a signal will prevent fish from exiting in response to that signal.

**\-S** or **\--no-scope-shadowing**

Allows the function to access the variables of calling functions. Normally, any variables inside the function that have the same name as variables from the calling function are “shadowed”, and their contents are independent of the calling function.

It’s important to note that this does not capture referenced variables or the scope at the time of function declaration! At this time, fish does not have any concept of closures, and variable lifetimes are never extended. In other words, by using **\--no-scope-shadowing** the scope of the function each time it is run is shared with the scope it was _called_ from rather than the scope it was _defined_ in.

**\-V** or **\--inherit-variable NAME**

Snapshots the value of the variable `NAME` and defines a local variable with that same name and value when the function is defined. This is similar to a closure in other languages like Python but a bit different. Note the word “snapshot” in the first sentence. If you change the value of the variable after defining the function, even if you do so in the same scope (typically another function) the new value will not be used by the function you just created using this option. See the `function notify` example below for how this might be used.

The event handler switches (`on-event`, `on-variable`, `on-job-exit`, `on-process-exit` and `on-signal`) cause a function to run automatically at specific events. New named events for `--on-event` can be fired using the [emit](emit.html) builtin. Fish already generates a few events, see [Event handlers](../language.html#event) for more.

Functions names cannot be reserved words. These are elements of fish syntax or builtin commands which are essential for the operations of the shell. Current reserved words are `[`, `_`, `and`, `argparse`, `begin`, `break`, `builtin`, `case`, `command`, `continue`, `else`, `end`, `eval`, `exec`, `for`, `function`, `if`, `not`, `or`, `read`, `return`, `set`, `status`, `string`, `switch`, `test`, `time`, and `while`.

## Example[¶](#example "Link to this heading")

function ll
    ls \-l $argv
end
COPY

will run the `ls` command, using the `-l` option, while passing on any additional files and switches to `ls`.

function debug \-a name val
    echo \[DEBUG\] $name: $val \>&2
end

set foo bar
debug foo bar
\# prints: \[DEBUG\] foo: bar

\# OR

function debug2 \-a var
    echo \[DEBUG\] $var: $$var \>&2
end

set foo bar
debug2 foo
\# prints: \[DEBUG\] foo: bar
COPY

will create a `debug` command to print chosen variables to stderr.

function mkdir \-d "Create a directory and set CWD"
    command mkdir $argv
    if test $status \= 0
        switch $argv\[(count $argv)\]
            case '-\*'

            case '\*'
                cd $argv\[(count $argv)\]
                return
        end
    end
end
COPY

This will run the `mkdir` command, and if it is successful, change the current working directory to the one just created.

function notify
    set \-l job (jobs \-l \-g)
    or begin; echo "There are no jobs" \>&2; return 1; end

    function \_notify\_job\_$job \--on-job-exit $job \--inherit-variable job
        echo \-n \\a \# beep
        functions \-e \_notify\_job\_$job
    end
end
COPY

This will beep when the most recent job completes.

## Notes[¶](#notes "Link to this heading")

Events are only received from the current fish process as there is no way to send events from one fish process to another.

## See more[¶](#see-more "Link to this heading")

For more explanation of how functions fit into fish, see [Functions](../language.html#syntax-function).
