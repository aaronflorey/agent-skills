Source: https://fishshell.com/docs/current/cmds/fish_vcs_prompt.html

# fish\_vcs\_prompt - output version control system information for use in a prompt[¶](#fish-vcs-prompt-output-version-control-system-information-for-use-in-a-prompt "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_vcs\_prompt
COPY

function fish\_prompt
     printf '%s' $PWD (fish\_vcs\_prompt) ' $ '
end
COPY

## Description[¶](#description "Link to this heading")

The `fish_vcs_prompt` function displays information about the current version control system (VCS) repository, if any.

It calls out to VCS-specific functions. The currently supported systems are:

-   [fish\_git\_prompt](fish_git_prompt.html)
    
-   [fish\_hg\_prompt](fish_hg_prompt.html)
    
-   [fish\_svn\_prompt](fish_svn_prompt.html)
    

If a VCS isn’t installed, the respective function does nothing.

The Subversion prompt is disabled by default, because it’s slow on large repositories. To enable it, modify `fish_vcs_prompt` to uncomment it. See [funced](funced.html).

For more information, see the documentation for each of the functions above.

## Example[¶](#example "Link to this heading")

A simple prompt that displays all known VCS info:

function fish\_prompt
    ...
    set \-g \_\_fish\_git\_prompt\_showupstream auto
    printf '%s %s$' $PWD (fish\_vcs\_prompt)
end
COPY
