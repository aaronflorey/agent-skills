Source: https://fishshell.com/docs/current/cmds/fish_hg_prompt.html

# fish\_hg\_prompt - output Mercurial information for use in a prompt[¶](#fish-hg-prompt-output-mercurial-information-for-use-in-a-prompt "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_hg\_prompt
COPY

function fish\_prompt
     printf '%s' $PWD (fish\_hg\_prompt) ' $ '
end
COPY

## Description[¶](#description "Link to this heading")

The fish\_hg\_prompt function displays information about the current Mercurial repository, if any.

[Mercurial](https://www.mercurial-scm.org/) (`hg`) must be installed.

By default, only the current branch is shown because `hg status` can be slow on a large repository. You can enable a more informative prompt by setting the variable `$fish_prompt_hg_show_informative_status`, for example:

set fish\_prompt\_hg\_show\_informative\_status
COPY

If you enabled the informative status, there are numerous customization options, which can be controlled with fish variables.

-   `$fish_color_hg_clean`, `$fish_color_hg_modified` and `$fish_color_hg_dirty` are colors used when the repository has the respective status.
    

Some colors for status symbols:

-   `$fish_color_hg_added`
    
-   `$fish_color_hg_renamed`
    
-   `$fish_color_hg_copied`
    
-   `$fish_color_hg_deleted`
    
-   `$fish_color_hg_untracked`
    
-   `$fish_color_hg_unmerged`
    

The status symbols themselves:

-   `$fish_prompt_hg_status_added`, default ‘✚’
    
-   `$fish_prompt_hg_status_modified`, default ‘\*’
    
-   `$fish_prompt_hg_status_copied`, default ‘⇒’
    
-   `$fish_prompt_hg_status_deleted`, default ‘✖’
    
-   `$fish_prompt_hg_status_untracked`, default ‘?’
    
-   `$fish_prompt_hg_status_unmerged`, default ‘!’
    

Finally, `$fish_prompt_hg_status_order`, which can be used to change the order the status symbols appear in. It defaults to `added modified copied deleted untracked unmerged`.

See also [fish\_vcs\_prompt](fish_vcs_prompt.html), which will call all supported version control prompt functions, including git, Mercurial and Subversion.

## Example[¶](#example "Link to this heading")

A simple prompt that displays hg info:

function fish\_prompt
    ...
    set \-g fish\_prompt\_hg\_show\_informative\_status
    printf '%s %s$' $PWD (fish\_hg\_prompt)
end
COPY
