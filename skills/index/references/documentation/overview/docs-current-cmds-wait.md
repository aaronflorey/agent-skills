Source: https://fishshell.com/docs/current/cmds/wait.html

# wait - wait for jobs to complete[¶](#wait-wait-for-jobs-to-complete "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

wait \[\-n | \--any\] \[PID | PROCESS\_NAME\] ...
COPY

## Description[¶](#description "Link to this heading")

`wait` waits for child jobs to complete.

If a _PID_ is specified, the command waits for the job that the process with that process ID belongs to.

If a _PROCESS\_NAME_ is specified, the command waits for the jobs that the matched processes belong to.

If neither a pid nor a process name is specified, the command waits for all background jobs.

If the **\-n** or **\--any** flag is provided, the command returns as soon as the first job completes. If it is not provided, it returns after all jobs complete.

The **\-h** or **\--help** option displays help about using this command.

## Example[¶](#example "Link to this heading")

sleep 10 &
wait $last\_pid
COPY

spawns `sleep` in the background, and then waits until it finishes.

for i in (seq 1 5); sleep 10 &; end
wait
COPY

spawns five jobs in the background, and then waits until all of them finish.

for i in (seq 1 5); sleep 10 &; end
hoge &
wait sleep
COPY

spawns five `sleep` jobs and `hoge` in the background, and then waits until all `sleep`s finish, and doesn’t wait for `hoge`.
