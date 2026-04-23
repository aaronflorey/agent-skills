Source: https://fishshell.com/docs/current/cmds/fish_is_root_user.html

# fish\_is\_root\_user - check if the current user is root[¶](#fish-is-root-user-check-if-the-current-user-is-root "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_is\_root\_user
COPY

## Description[¶](#description "Link to this heading")

`fish_is_root_user` will check if the current user is root. It can be useful for the prompt to display something different if the user is root, for example.

## Example[¶](#example "Link to this heading")

A simple example:

function example \--description 'Just an example'
    if fish\_is\_root\_user
        do\_something\_different
    end
end
COPY
