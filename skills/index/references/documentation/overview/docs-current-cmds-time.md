Source: https://fishshell.com/docs/current/cmds/time.html

# time - measure how long a command or block takes[¶](#time-measure-how-long-a-command-or-block-takes "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

time COMMAND
COPY

## Description[¶](#description "Link to this heading")

`time` causes fish to measure how long a command takes and print the results afterwards. The command can be a simple fish command or a block. The results can not currently be redirected.

For checking timing after a command has completed, check [$CMD\_DURATION](../language.html#variables-special).

Your system most likely also has a `time` command. To use that use something like `command time`, as in `command time sleep 10`. Because it’s not inside fish, it won’t have access to fish functions and won’t be able to time blocks and such.

## How to interpret the output[¶](#how-to-interpret-the-output "Link to this heading")

Time outputs a few different values. Let’s look at an example:

\> time string repeat \-n 10000000 y\\n | command grep y \>/dev/null
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
Executed in  805.98 millis    fish           external
   usr time  798.88 millis  763.88 millis   34.99 millis
   sys time  141.22 millis   40.20 millis  101.02 millis
COPY

The time after “Executed in” is what is known as the “wall-clock time”. It is simply a measure of how long it took from the start of the command until it finished. Typically it is reasonably close to [`CMD_DURATION`](../language.html#envvar-CMD_DURATION), except for a slight skew because the two are taken at slightly different times.

The other times are all measures of CPU time. That means they measure how long the CPU was used in this part, and they count multiple cores separately. So a program with four threads using all CPU for a second will have a time of 4 seconds.

The “usr” time is how much CPU time was spent inside the program itself, the “sys” time is how long was spent in the kernel on behalf of that program.

The “fish” time is how much CPU was spent in fish, the “external” time how much was spent in external commands.

So in this example, since `string` is a builtin, everything that `string repeat` did is accounted to fish. Any time it spends doing syscalls like `write()` is accounted for in the fish/sys time.

And `grep` here is explicitly invoked as an external command, so its times will be counted in the “external” column.

Note that, as in this example, the CPU times can add up to more than the execution time. This is because things can be done in parallel - `grep` can match while `string repeat` writes.

## Example[¶](#example "Link to this heading")

(for obvious reasons exact results will vary on your system)

\>\_ time sleep 1s

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
Executed in    1,01 secs   fish           external
   usr time    2,32 millis    0,00 micros    2,32 millis
   sys time    0,88 millis  877,00 micros    0,00 millis

\>\_ time for i in 1 2 3; sleep 1s; end

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
Executed in    3,01 secs   fish           external
   usr time    9,16 millis    2,94 millis    6,23 millis
   sys time    0,23 millis    0,00 millis    0,23 millis
COPY

Inline variable assignments need to follow the `time` keyword:

\>\_ time a\_moment\=1.5m sleep $a\_moment

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
Executed in   90.00 secs      fish           external
   usr time    4.62 millis    4.62 millis    0.00 millis
   sys time    2.35 millis    0.41 millis    1.95 millis
COPY
