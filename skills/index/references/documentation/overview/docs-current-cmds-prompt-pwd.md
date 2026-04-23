Source: https://fishshell.com/docs/current/cmds/prompt_pwd.html

# prompt\_pwd - print pwd suitable for prompt[¶](#prompt-pwd-print-pwd-suitable-for-prompt "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

prompt\_pwd
COPY

## Description[¶](#description "Link to this heading")

`prompt_pwd` is a function to print the current working directory in a way suitable for prompts. It will replace the home directory with “~” and shorten every path component but the last to a default of one character.

To change the number of characters per path component, pass `--dir-length=` or set `fish_prompt_pwd_dir_length` to the number of characters. Setting it to 0 or an invalid value will disable shortening entirely. This defaults to 1.

To keep some components unshortened, pass `--full-length-dirs=` or set `fish_prompt_pwd_full_dirs` to the number of components. This defaults to 1, keeping the last component.

If any positional arguments are given, `prompt_pwd` shortens them instead of [`PWD`](../language.html#envvar-PWD).

## Options[¶](#options "Link to this heading")

**\-d** or **\--dir-length** _MAX_

Causes the components to be shortened to _MAX_ characters each. This overrides `fish_prompt_pwd_dir_length`.

**\-D** or **\--full-length-dirs** _NUM_

Keeps _NUM_ components (counted from the right) as full length without shortening. This overrides `fish_prompt_pwd_full_dirs`.

**\-h** or **\--help**

Displays help about using this command.

## Examples[¶](#examples "Link to this heading")

\>\_ cd ~/
\>\_ echo $PWD
/home/alfa

\>\_ prompt\_pwd
~

\>\_ cd /tmp/banana/sausage/with/mustard
\>\_ prompt\_pwd
/t/b/s/w/mustard

\>\_ set \-g fish\_prompt\_pwd\_dir\_length 3
\>\_ prompt\_pwd
/tmp/ban/sau/wit/mustard

\>\_ prompt\_pwd \--full-length-dirs=2 \--dir-length=1
/t/b/s/with/mustard

\>\_ echo (prompt\_pwd | string split /)\[-1\]
mustard

\>\_ echo (string join / (prompt\_pwd | string split /)\[-3..-1\])
s/with/mustard
COPY
