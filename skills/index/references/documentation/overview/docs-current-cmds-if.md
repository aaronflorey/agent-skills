Source: https://fishshell.com/docs/current/cmds/if.html

# if - conditionally execute a command[¶](#if-conditionally-execute-a-command "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

if CONDITION; COMMANDS\_TRUE ...;
\[else if CONDITION2; COMMANDS\_TRUE2 ...;\]
\[else; COMMANDS\_FALSE ...;\]
end
COPY

## Description[¶](#description "Link to this heading")

`if` will execute the command `CONDITION`. If the condition’s exit status is 0, the commands `COMMANDS_TRUE` will execute. If the exit status is not 0 and [else](else.html) is given, `COMMANDS_FALSE` will be executed.

You can use [not](not.html), [and](and.html) or [or](or.html) in the condition. See the second example below.

The exit status of the last foreground command to exit can always be accessed using the [$status](../language.html#variables-status) variable.

The **\-h** or **\--help** option displays help about using this command.

## Example[¶](#example "Link to this heading")

The following code will print `foo.txt exists` if the file foo.txt exists and is a regular file, otherwise it will print `bar.txt exists` if the file bar.txt exists and is a regular file, otherwise it will print `foo.txt and bar.txt do not exist`.

if test \-f foo.txt
    echo foo.txt exists
else if test \-f bar.txt
    echo bar.txt exists
else
    echo foo.txt and bar.txt do not exist
end
COPY

The following code will print “foo.txt exists and is readable” if foo.txt is a regular file and readable

if test \-f foo.txt
   and test \-r foo.txt
   echo "foo.txt exists and is readable"
end
COPY

## See also[¶](#see-also "Link to this heading")

`if` is only as useful as the command used as the condition.

Fish ships a few:

-   [test - perform tests on files and text](test.html) can compare numbers, strings and check paths
    
-   [string - manipulate strings](string.html) can perform string operations including wildcard and regular expression matches
    
-   [path - manipulate and check paths](path.html) can check paths for permissions, existence or type
    
-   [contains - test if a word is present in a list](contains.html) can check if an element is in a list
