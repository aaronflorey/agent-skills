Source: https://fishshell.com/docs/current/cmds/cd.html

# cd - change directory[¶](#cd-change-directory "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

cd \[DIRECTORY\]
COPY

## Description[¶](#description "Link to this heading")

`cd` changes the current working directory.

If _DIRECTORY_ is given, it will become the new directory. If no parameter is given, the [`HOME`](../language.html#envvar-HOME) environment variable will be used.

If _DIRECTORY_ is a relative path, all the paths in the [`CDPATH`](../language.html#envvar-CDPATH) will be tried as prefixes for it, in addition to [`PWD`](../language.html#envvar-PWD). It is recommended to keep **.** as the first element of [`CDPATH`](../language.html#envvar-CDPATH), or [`PWD`](../language.html#envvar-PWD) will be tried last.

Fish will also try to change directory if given a command that looks like a directory (starting with **.**, **/** or **~**, or ending with **/**), without explicitly requiring **cd**.

Fish also ships a wrapper function around the builtin **cd** that understands `cd -` as changing to the previous directory. See also [prevd](prevd.html). This wrapper function maintains a history of the 25 most recently visited directories in the `$dirprev` and `$dirnext` global variables. If you make those universal variables your **cd** history is shared among all fish instances.

As a special case, `cd .` is equivalent to `cd $PWD`, which is useful in cases where a mountpoint has been recycled or a directory has been removed and recreated.

The **\--help** or **\-h** option displays help about using this command, and does not change the directory.

## Examples[¶](#examples "Link to this heading")

cd
\# changes the working directory to your home directory.

cd /usr/src/fish-shell
\# changes the working directory to /usr/src/fish-shell
COPY

## See Also[¶](#see-also "Link to this heading")

Navigate directories using the [directory history](../interactive.html#directory-history) or the [directory stack](../interactive.html#directory-stack)
