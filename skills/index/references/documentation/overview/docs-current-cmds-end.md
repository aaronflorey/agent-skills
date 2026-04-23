Source: https://fishshell.com/docs/current/cmds/end.html

# end - end a block of commands[¶](#end-end-a-block-of-commands "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

begin
    \[COMMANDS ...\]
end
COPY

function NAME \[OPTIONS\]; COMMANDS ...; end
if CONDITION; COMMANDS\_TRUE ...; \[else; COMMANDS\_FALSE ...;\] end
switch VALUE; \[case \[WILDCARD ...\]; \[COMMANDS ...\]; ...\] end
while CONDITION; COMMANDS ...; end
for VARNAME in \[VALUES ...\]; COMMANDS ...; end
COPY

## Description[¶](#description "Link to this heading")

The **end** keyword ends a block of commands started by one of the following commands:

-   [begin](begin.html) to start a block of commands
    
-   [function](function.html) to define a function
    
-   [if](if.html), [switch](switch.html) to conditionally execute commands
    
-   [while](while.html), [for](for.html) to perform commands multiple times
    

The **end** keyword does not change the current exit status. Instead, the status after it will be the status returned by the most recent command.
