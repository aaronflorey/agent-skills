Source: https://fishshell.com/docs/current/cmds/pwd.html

# pwd - output the current working directory[¶](#pwd-output-the-current-working-directory "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

pwd \[\-P | \--physical\]
pwd \[\-L | \--logical\]
COPY

## Description[¶](#description "Link to this heading")

`pwd` outputs (prints) the current working directory.

The following options are available:

**\-L** or **\--logical**

Output the logical working directory, without resolving symlinks (default behavior).

**\-P** or **\--physical**

Output the physical working directory, with symlinks resolved.

**\-h** or **\--help**

Displays help about using this command.

## See Also[¶](#see-also "Link to this heading")

Navigate directories using the [directory history](../interactive.html#directory-history) or the [directory stack](../interactive.html#directory-stack)
