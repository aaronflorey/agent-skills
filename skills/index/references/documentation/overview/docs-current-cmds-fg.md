Source: https://fishshell.com/docs/current/cmds/fg.html

# fg - bring job to foreground[¶](#fg-bring-job-to-foreground "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fg \[PID\]
COPY

## Description[¶](#description "Link to this heading")

The **fg** builtin brings the specified [job](../language.html#syntax-job-control) to the foreground, resuming it if it is stopped. While a foreground job is executed, fish is suspended. If no job is specified, the last job to be used is put in the foreground. If `PID` is specified, the job containing a process with the specified process ID is put in the foreground.

For compatibility with other shells, job expansion syntax is supported for `fg`. A _PID_ of the format **%1** will foreground job 1. Job numbers can be seen in the output of [jobs](jobs.html).

The **\--help** or **\-h** option displays help about using this command.

## Example[¶](#example "Link to this heading")

`fg` will put the last job in the foreground.

`fg %3` will put job 3 into the foreground.
