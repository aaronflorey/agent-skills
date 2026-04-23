Source: https://fishshell.com/docs/current/cmds/fish_mode_prompt.html

# fish\_mode\_prompt - define the appearance of the mode indicator[¶](#fish-mode-prompt-define-the-appearance-of-the-mode-indicator "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_mode\_prompt
COPY

function fish\_mode\_prompt
     echo \-n "$fish\_bind\_mode "
end
COPY

## Description[¶](#description "Link to this heading")

The `fish_mode_prompt` function outputs the mode indicator for use in vi mode.

The default `fish_mode_prompt` function will output indicators about the current vi editor mode displayed to the left of the regular prompt. Define your own function to customize the appearance of the mode indicator. The `$fish_bind_mode` variable can be used to determine the current mode. It will be one of `default`, `insert`, `replace_one`, `replace`, `visual`, or `operator`.

You can also define an empty `fish_mode_prompt` function to remove the vi mode indicators:

function fish\_mode\_prompt; end
funcsave fish\_mode\_prompt
COPY

`fish_mode_prompt` will be executed when the vi mode changes. If it produces any output, it is displayed and used. If it does not, the other prompt functions ([fish\_prompt](fish_prompt.html) and [fish\_right\_prompt](fish_right_prompt.html)) will be executed as well in case they contain a mode display.

If [`fish_transient_prompt`](../language.html#envvar-fish_transient_prompt) is set to 1, `fish_mode_prompt --final-rendering` is run before executing the commandline.

## Example[¶](#example "Link to this heading")

function fish\_mode\_prompt
  switch $fish\_bind\_mode
    case default
      set\_color \--bold red
      echo 'N'
    case insert
      set\_color \--bold green
      echo 'I'
    case replace\_one
      set\_color \--bold green
      echo 'R'
    case replace
      set\_color \--bold bryellow
      echo 'R'
    case visual
      set\_color \--bold brmagenta
      echo 'V'
    case operator f F t T
      set\_color \--bold cyan
      echo 'N'
    case '\*'
      set\_color \--bold red
      echo '?'
  end
  set\_color \--reset
end
COPY

Outputting multiple lines is not supported in `fish_mode_prompt`.
