Source: https://fishshell.com/docs/current/cmds/begin.html

# begin - start a new block of code[¶](#begin-start-a-new-block-of-code "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

begin; \[COMMANDS ...\]; end
{ \[COMMANDS ...\] }
COPY

## Description[¶](#description "Link to this heading")

`begin` is used to create a new block of code.

A block allows the introduction of a new [variable scope](../language.html#variables-scope), redirection of the input or output of a set of commands as a group, or to specify precedence when using the conditional commands like `and`.

The block is unconditionally executed. `begin; ...; end` is equivalent to `if true; ...; end`.

`begin` does not change the current exit status itself. After the block has completed, `$status` will be set to the status returned by the most recent command.

Some other shells only support the `{ [COMMANDS ...] ; }` notation.

The **\-h** or **\--help** option displays help about using this command.

## Example[¶](#example "Link to this heading")

The following code sets a number of variables inside of a block scope. Since the variables are set inside the block and have local scope, they will be automatically deleted when the block ends.

begin
    set \-l PIRATE Yarrr

    ...
end

echo $PIRATE
\# This will not output anything, since the PIRATE variable
\# went out of scope at the end of the block
COPY

In the following code, all output is redirected to the file out.html.

begin
    echo $xml\_header
    echo $html\_header
    if test \-e $file
        ...
    end
    ...
end \> out.html
COPY
