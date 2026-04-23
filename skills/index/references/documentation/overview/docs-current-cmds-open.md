Source: https://fishshell.com/docs/current/cmds/open.html

# open - open file in its default application[¶](#open-open-file-in-its-default-application "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

open FILES ...
COPY

## Description[¶](#description "Link to this heading")

`open` opens a file in its default application, using the appropriate tool for the operating system. On GNU/Linux, this requires the common but optional `xdg-open` utility, from the `xdg-utils` package.

Note that this function will not be used if a command by this name exists (which is the case on macOS or Haiku).

## Example[¶](#example "Link to this heading")

`open *.txt` opens all the text files in the current directory using your system’s default text editor.
