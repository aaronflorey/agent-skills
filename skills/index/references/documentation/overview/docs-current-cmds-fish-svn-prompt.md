Source: https://fishshell.com/docs/current/cmds/fish_svn_prompt.html

# fish\_svn\_prompt - output Subversion information for use in a prompt[¶](#fish-svn-prompt-output-subversion-information-for-use-in-a-prompt "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_svn\_prompt
COPY

function fish\_prompt
     printf '%s' $PWD (fish\_svn\_prompt) ' $ '
end
COPY

## Description[¶](#description "Link to this heading")

The fish\_svn\_prompt function displays information about the current Subversion repository, if any.

[Subversion](https://subversion.apache.org/) (`svn`) must be installed.

There are numerous customization options, which can be controlled with fish variables.

-   `__fish_svn_prompt_color_revision`
    
    the colour of the revision number to display in the prompt
    
-   `__fish_svn_prompt_char_separator`
    
    the separator between status characters
    

A number of variables control the symbol (“display”) and color (“color”) for the different status indicators:

-   `__fish_svn_prompt_char_added_display`
    
-   `__fish_svn_prompt_char_added_color`
    
-   `__fish_svn_prompt_char_conflicted_display`
    
-   `__fish_svn_prompt_char_conflicted_color`
    
-   `__fish_svn_prompt_char_deleted_display`
    
-   `__fish_svn_prompt_char_deleted_color`
    
-   `__fish_svn_prompt_char_ignored_display`
    
-   `__fish_svn_prompt_char_ignored_color`
    
-   `__fish_svn_prompt_char_modified_display`
    
-   `__fish_svn_prompt_char_modified_color`
    
-   `__fish_svn_prompt_char_replaced_display`
    
-   `__fish_svn_prompt_char_replaced_color`
    
-   `__fish_svn_prompt_char_unversioned_external_display`
    
-   `__fish_svn_prompt_char_unversioned_external_color`
    
-   `__fish_svn_prompt_char_unversioned_display`
    
-   `__fish_svn_prompt_char_unversioned_color`
    
-   `__fish_svn_prompt_char_missing_display`
    
-   `__fish_svn_prompt_char_missing_color`
    
-   `__fish_svn_prompt_char_versioned_obstructed_display`
    
-   `__fish_svn_prompt_char_versioned_obstructed_color`
    
-   `__fish_svn_prompt_char_locked_display`
    
-   `__fish_svn_prompt_char_locked_color`
    
-   `__fish_svn_prompt_char_scheduled_display`
    
-   `__fish_svn_prompt_char_scheduled_color`
    
-   `__fish_svn_prompt_char_switched_display`
    
-   `__fish_svn_prompt_char_switched_color`
    
-   `__fish_svn_prompt_char_token_present_display`
    
-   `__fish_svn_prompt_char_token_present_color`
    
-   `__fish_svn_prompt_char_token_other_display`
    
-   `__fish_svn_prompt_char_token_other_color`
    
-   `__fish_svn_prompt_char_token_stolen_display`
    
-   `__fish_svn_prompt_char_token_stolen_color`
    
-   `__fish_svn_prompt_char_token_broken_display`
    
-   `__fish_svn_prompt_char_token_broken_color`
    

See also [fish\_vcs\_prompt](fish_vcs_prompt.html), which will call all supported version control prompt functions, including git, Mercurial and Subversion.

## Example[¶](#example "Link to this heading")

A simple prompt that displays svn info:

function fish\_prompt
    ...
    printf '%s %s$' $PWD (fish\_svn\_prompt)
end
COPY
