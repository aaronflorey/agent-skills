Source: https://fishshell.com/docs/current/cmds/pushd.html

# pushd - push directory to directory stack[¶](#pushd-push-directory-to-directory-stack "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

pushd DIRECTORY
COPY

## Description[¶](#description "Link to this heading")

The `pushd` function adds _DIRECTORY_ to the top of the [directory stack](../interactive.html#directory-stack) and makes it the current working directory. [popd](popd.html) will pop it off and return to the original directory.

Without arguments, it exchanges the top two directories in the stack.

`pushd +NUMBER` rotates the stack counter-clockwise i.e. from bottom to top

`pushd -NUMBER` rotates clockwise i.e. top to bottom.

The **\-h** or **\--help** option displays help about using this command.

## Example[¶](#example "Link to this heading")

cd ~/dir1
pushd ~/dir2
pushd ~/dir3
\# Working directory is now ~/dir3
\# Directory stack contains ~/dir2 ~/dir1

pushd /tmp
\# Working directory is now /tmp
\# Directory stack contains ~/dir3 ~/dir2 ~/dir1

pushd +1
\# Working directory is now ~/dir3
\# Directory stack contains ~/dir2 ~/dir1 /tmp

popd
\# Working directory is now ~/dir2
\# Directory stack contains ~/dir1 /tmp
COPY

## See Also[¶](#see-also "Link to this heading")

-   the [dirs](dirs.html) command to print the directory stack
    
-   the [cdh](cdh.html) command which provides a more intuitive way to navigate to recently visited directories.
