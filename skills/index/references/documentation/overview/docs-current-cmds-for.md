Source: https://fishshell.com/docs/current/cmds/for.html

# for - perform a set of commands multiple times[¶](#for-perform-a-set-of-commands-multiple-times "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

for VARNAME in \[VALUES ...\]; COMMANDS ...; end
COPY

## Description[¶](#description "Link to this heading")

**for** is a loop construct. It will perform the commands specified by _COMMANDS_ multiple times. On each iteration, the local variable specified by _VARNAME_ is assigned a new value from _VALUES_. If _VALUES_ is empty, _COMMANDS_ will not be executed at all. The _VARNAME_ is visible when the loop terminates and will contain the last value assigned to it. If _VARNAME_ does not already exist it will be set in the local scope. For our purposes if the **for** block is inside a function there must be a local variable with the same name. If the **for** block is not nested inside a function then global and universal variables of the same name will be used if they exist.

Much like [set](set.html), **for** does not modify $status, but the evaluation of its subordinate commands can.

The **\-h** or **\--help** option displays help about using this command.

## Example[¶](#example "Link to this heading")

for i in foo bar baz; echo $i; end

\# would output:
foo
bar
baz
COPY

## Notes[¶](#notes "Link to this heading")

The `VARNAME` was local to the for block in releases prior to 3.0.0. This means that if you did something like this:

for var in a b c
    if break\_from\_loop
        break
    end
end
echo $var
COPY

The last value assigned to `var` when the loop terminated would not be available outside the loop. What `echo $var` would write depended on what it was set to before the loop was run. Likely nothing.
