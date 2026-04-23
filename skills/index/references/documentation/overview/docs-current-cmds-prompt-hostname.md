Source: https://fishshell.com/docs/current/cmds/prompt_hostname.html

# prompt\_hostname - print the hostname, shortened for use in the prompt[¶](#prompt-hostname-print-the-hostname-shortened-for-use-in-the-prompt "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

prompt\_hostname
COPY

## Description[¶](#description "Link to this heading")

`prompt_hostname` prints a shortened version the current hostname for use in the prompt. It will print just the first component of the hostname, everything up to the first dot.

## Examples[¶](#examples "Link to this heading")

function fish\_prompt
    echo \-n (whoami)@(prompt\_hostname) (prompt\_pwd) '$ '
end
COPY

\# The machine's full hostname is foo.bar.com
\>\_ prompt\_hostname
foo
COPY
