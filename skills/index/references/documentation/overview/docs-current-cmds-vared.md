Source: https://fishshell.com/docs/current/cmds/vared.html

# vared - interactively edit the value of an environment variable[¶](#vared-interactively-edit-the-value-of-an-environment-variable "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

vared VARIABLE\_NAME
COPY

## Description[¶](#description "Link to this heading")

`vared` is used to interactively edit the value of an environment variable. Array variables as a whole can not be edited using `vared`, but individual list elements can.

The **\-h** or **\--help** option displays help about using this command.

## Example[¶](#example "Link to this heading")

`vared PATH[3]` edits the third element of the PATH list
