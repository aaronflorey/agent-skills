Source: https://fishshell.com/docs/current/cmds/else.html

# else - execute command if a condition is not met[¶](#else-execute-command-if-a-condition-is-not-met "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

if CONDITION; COMMANDS\_TRUE ...; \[else; COMMANDS\_FALSE ...;\] end
COPY

## Description[¶](#description "Link to this heading")

[if](if.html) will execute the command _CONDITION\*_. If the condition’s exit status is 0, the commands _COMMANDS\_TRUE_ will execute. If it is not 0 and **else** is given, _COMMANDS\_FALSE_ will be executed.

## Example[¶](#example "Link to this heading")

The following code tests whether a file _foo.txt_ exists as a regular file.

if test \-f foo.txt
    echo foo.txt exists
else
    echo foo.txt does not exist
end
COPY
