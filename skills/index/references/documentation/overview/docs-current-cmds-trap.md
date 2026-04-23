Source: https://fishshell.com/docs/current/cmds/trap.html

# trap - perform an action when the shell receives a signal[¶](#trap-perform-an-action-when-the-shell-receives-a-signal "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

trap \[OPTIONS\] \[\[ARG\] REASON ... \]
COPY

## Description[¶](#description "Link to this heading")

`trap` is a wrapper around the fish event delivery framework. It exists for backwards compatibility with POSIX shells. For other uses, it is recommended to define an [event handler](../language.html#event).

The following parameters are available:

_ARG_

Command to be executed on signal delivery.

_REASON_

Name of the event to trap. For example, a signal like `INT` or `SIGINT`, or the special symbol `EXIT`.

**\-l** or **\--list-signals**

Prints a list of signal names.

**\-p** or **\--print**

Prints all defined signal handlers.

**\-h** or **\--help**

Displays help about using this command.

If _ARG_ and _REASON_ are both specified, _ARG_ is the command to be executed when the event specified by _REASON_ occurs (e.g., the signal is delivered).

If _ARG_ is absent (and there is a single _REASON_) or `-`, each specified signal is reset to its original disposition (the value it had upon entrance to the shell). If _ARG_ is the null string the signal specified by each _REASON_ is ignored by the shell and by the commands it invokes.

If _ARG_ is not present and **\-p** has been supplied, then the trap commands associated with each _REASON_ are displayed. If no arguments are supplied or if only **\-p** is given, `trap` prints the list of commands associated with each signal.

Signal names are case insensitive and the `SIG` prefix is optional. Trapping a signal will prevent fish from exiting in response to that signal.

The exit status is 1 if any _REASON_ is invalid; otherwise trap returns 0.

## Example[¶](#example "Link to this heading")

trap "status --print-stack-trace" SIGUSR1
\# Prints a stack trace each time the SIGUSR1 signal is sent to the shell.
COPY
