Source: https://fishshell.com/docs/current/cmds/popd.html

# popd - move through directory stack[¶](#popd-move-through-directory-stack "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

popd
COPY

## Description[¶](#description "Link to this heading")

`popd` removes the top directory from the [directory stack](../interactive.html#directory-stack) and changes the working directory to the new top directory. Use [pushd](pushd.html) to add directories to the stack.

The **\-h** or **\--help** option displays help about using this command.

## Example[¶](#example "Link to this heading")

pushd /usr/src
\# Working directory is now /usr/src
\# Directory stack contains /usr/src

pushd /usr/src/fish-shell
\# Working directory is now /usr/src/fish-shell
\# Directory stack contains /usr/src /usr/src/fish-shell

popd
\# Working directory is now /usr/src
\# Directory stack contains /usr/src
COPY

## See Also[¶](#see-also "Link to this heading")

-   the [dirs](dirs.html) command to print the directory stack
    
-   the [cdh](cdh.html) command which provides a more intuitive way to navigate to recently visited directories.
