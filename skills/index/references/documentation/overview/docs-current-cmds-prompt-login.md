Source: https://fishshell.com/docs/current/cmds/prompt_login.html

# prompt\_login - describe the login suitable for prompt[¶](#prompt-login-describe-the-login-suitable-for-prompt "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

prompt\_login
COPY

## Description[¶](#description "Link to this heading")

`prompt_login` is a function to describe the current login. It will show the user, the host and also whether the shell is running in a chroot (currently Debian’s `debian_chroot` file is supported).

## Examples[¶](#examples "Link to this heading")

function fish\_prompt
    echo \-n (prompt\_login) (prompt\_pwd) '$ '
end
COPY

\>\_ prompt\_login
root@bananablaster
COPY
