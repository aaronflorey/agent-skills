Source: https://fishshell.com/docs/current/cmds/contains.html

# contains - test if a word is present in a list[¶](#contains-test-if-a-word-is-present-in-a-list "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

contains \[OPTIONS\] KEY \[VALUES ...\]
COPY

## Description[¶](#description "Link to this heading")

`contains` tests whether the set _VALUES_ contains the string _KEY_. If so, `contains` exits with code 0; if not, it exits with code 1.

The following options are available:

**\-i** or **\--index**

Print the index (number of the element in the set) of the first matching element.

**\-h** or **\--help**

Displays help about using this command.

Note that `contains` interprets all arguments starting with a **\-** as an option to `contains`, until an **\--** argument is reached.

See the examples below.

## Example[¶](#example "Link to this heading")

If _animals_ is a list of animals, the following will test if _animals_ contains “cat”:

if contains cat $animals
   echo Your animal list is evil!
end
COPY

This code will add some directories to [`PATH`](../language.html#envvar-PATH) if they aren’t yet included:

for i in ~/bin /usr/local/bin
    if not contains $i $PATH
        set PATH $PATH $i
    end
end
COPY

While this will check if function `hasargs` is being ran with the **\-q** option:

function hasargs
    if contains \-- \-q $argv
        echo '$argv contains a -q option'
    end
end
COPY

The **\--** here stops `contains` from treating **\-q** to an option to itself. Instead it treats it as a normal string to check.
