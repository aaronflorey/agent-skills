Source: https://fishshell.com/docs/current/cmds/block.html

# block - temporarily block delivery of events[¶](#block-temporarily-block-delivery-of-events "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

block \[(\--local | \--global)\]
block \--erase
COPY

## Description[¶](#description "Link to this heading")

`block` delays delivery of all events triggered by `fish` or the [emit](emit.html), thus delaying the execution of any function registered `--on-event`, `--on-process-exit`, `--on-job-exit`, `--on-variable` and `--on-signal` until after the block is removed.

Event blocks should not be confused with code blocks, which are created with `begin`, `if`, `while` or `for`

Without options, `block` sets up a block that is released automatically at the end of the current function scope.

The following options are available:

**\-l** or **\--local**

Release the block automatically at the end of the current innermost code block scope.

**\-g** or **\--global**

Never automatically release the lock.

**\-e** or **\--erase**

Release global block.

**\-h** or **\--help**

Display help about using this command.

## Example[¶](#example "Link to this heading")

\# Create a function that listens for events
function \--on-event foo foo; echo 'foo fired'; end

\# Block the delivery of events
block \-g

emit foo
\# No output will be produced

block \-e
\# 'foo fired' will now be printed
COPY

## Notes[¶](#notes "Link to this heading")

Events are only received from the current fish process as there is no way to send events from one fish process to another.
