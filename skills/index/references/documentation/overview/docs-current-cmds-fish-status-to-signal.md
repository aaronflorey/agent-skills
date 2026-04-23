Source: https://fishshell.com/docs/current/cmds/fish_status_to_signal.html

# fish\_status\_to\_signal - convert exit codes to human-friendly signals[¶](#fish-status-to-signal-convert-exit-codes-to-human-friendly-signals "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_status\_to\_signal NUM
COPY

function fish\_prompt
    echo \-n (fish\_status\_to\_signal $pipestatus | string join '|') (prompt\_pwd) '$ '
end
COPY

## Description[¶](#description "Link to this heading")

`fish_status_to_signal` converts exit codes to their corresponding human-friendly signals if one exists. This is likely to be useful for prompts in conjunction with the `$status` and `$pipestatus` variables.

## Example[¶](#example "Link to this heading")

\>\_ sleep 5
^C⏎
\>\_ fish\_status\_to\_signal $status
SIGINT
COPY
