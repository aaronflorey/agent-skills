Source: https://fishshell.com/docs/current/terminal-compatibility.html

# Terminal Compatibility[¶](#terminal-compatibility "Link to this heading")

fish writes various control sequences to the terminal. Some must be implemented to enable basic functionality, while others enable optional features and may be ignored by the terminal.

The terminal must be able to parse Control Sequence Introducer (CSI) commands, Operating System Commands (OSC) and [optionally](#term-compat-dcs-gnu-screen) Device Control Strings (DCS). These are defined by ECMA-48. If a valid CSI, OSC or DCS sequence does not represent a command implemented by the terminal, the terminal must ignore it. For historical reasons, OSC sequences may be terminated with `\x07` instead of `\e\\`.

Control sequences are denoted in a fish-like syntax. Special characters other than `\` are not escaped. Spaces are only added for readability and are not part of the sequence. Placeholders are written as `Ps` for a number or `Pt` for an arbitrary printable string.

**NOTE:** fish does not rely on your system’s terminfo database. In this document, terminfo (TI) codes are included for reference only.

## Required Commands[¶](#required-commands "Link to this heading")

| 
Sequence

 | 

TI

 | 

Description

 |
| --- | --- | --- |
| 

`\r`

 | 

n/a

 | 

Move cursor to the beginning of the line

 |
| 

`\n`

 | 

cud1

 | 

Move cursor down one line.

 |
| 

`\e[ Ps A`

 | 

cuu

 | 

Move cursor up Ps columns, or one column if no parameter.

 |
| 

`\e[ Ps C`

 | 

cuf

 | 

Move cursor to the right Ps columns, or one column if no parameter.

 |
| 

`\x08`

 | 

cub1

 | 

Move cursor one column to the left.

 |
| 

`\e[ Ps D`

 | 

cub

 | 

Move cursor to the left Ps times.

 |
| 

`\e[H`

 | 

cup

 | 

Set cursor position (no parameters means: move to row 1, column 1).

 |
| 

`\e[K`

 | 

el

 | 

Clear to end of line.

 |
| 

`\e[J`

 | 

ed

 | 

Clear to the end of screen.

 |
| 

`\e[2J`

 | 

clear

 | 

Clear the screen.

 |
| 

`\e[0c`

 |  | 

Request Primary Device Attribute. The terminal must respond with a CSI command that starts with the `?` parameter byte (so a sequence starting with `\e[?`) and has `c` as final byte.

Failure to implement this will cause a brief pause at startup followed by a warning. For the time being, both can be turned off by turning off the `query-terminal` [feature flag](language.html#featureflags).

 |
| 

n/a

 | 

am

 | 

Soft wrap text at screen width.

 |
| 

n/a

 | 

xenl

 | 

Printing to the last column does not move the cursor to the next line. Verify this by running `printf %0"$COLUMNS"d 0; sleep 3`

 |

## Optional Commands[¶](#optional-commands "Link to this heading")

| 
Sequence

 | 

TI

 | 

Description

 |
| --- | --- | --- |
| 

`\t`

 | 

it

 | 

Move the cursor to the next tab stop (à 8 columns). This is mainly relevant if your prompt includes tabs.

 |
| 

`\e[m`

 | 

sgr0

 | 

Turn off bold/dim/italic/underline/strikethrough/reverse attribute modes and select default colors.

 |
| 

`\e[1m`

 | 

bold

 | 

Enter bold mode.

 |
| 

`\e[2m`

 | 

dim

 | 

Enter dim mode.

 |
| 

`\e[3m`

 | 

sitm

 | 

Enter italic mode.

 |
| 

`\e[4m`

 | 

smul

 | 

Enter underline mode.

 |
| 

`\e[4:2m`

 | 

Su

 | 

Enter double underline mode.

 |
| 

`\e[4:3m`

 | 

Su

 | 

Enter curly underline mode.

 |
| 

`\e[4:4m`

 | 

Su

 | 

Enter dotted underline mode.

 |
| 

`\e[4:5m`

 | 

Su

 | 

Enter dashed underline mode.

 |
| 

`\e[7m`

 | 

rev

 | 

Enter reverse video mode (swap foreground and background colors).

 |
| 

`\e[9m`

 | 

smxx

 | 

Enter strikethrough mode

 |
| 

`\e[23m`

 | 

ritm

 | 

Exit italic mode.

 |
| 

`\e[24m`

 | 

rmul

 | 

Exit underline mode.

 |
| 

`\e[29m`

 | 

rmxx

 | 

Exit strikethrough mode.

 |
| 

`\e[38;5; Ps m`

 | 

setaf

 | 

Select foreground color Ps from the 256-color-palette.

 |
| 

`\e[48;5; Ps m`

 | 

setab

 | 

Select background color Ps from the 256-color-palette.

 |
| 

`\e[58:5: Ps m` (note: colons not semicolons)

 | 

Su

 | 

Select underline color Ps from the 256-color-palette.

 |
| 

`\e[ Ps m`

 | 

setaf setab

 | 

Select foreground/background color. This uses a color in the aforementioned 256-color-palette, based on the range that contains the parameter: 30-37 maps to foreground 0-7, 40-47 maps to background 0-7, 90-97 maps to foreground 8-15 and 100-107 maps to background 8-15.

 |
| 

`\e[38;2; Ps ; Ps ; Ps m`

 |  | 

Select foreground color from 24-bit RGB colors.

 |
| 

`\e[48;2; Ps ; Ps ; Ps m`

 |  | 

Select background color from 24-bit RGB colors.

 |
| 

`\e[39m`

 |  | 

Reset foreground color to the terminal’s default.

 |
| 

`\e[49m`

 |  | 

Reset background color to the terminal’s default.

 |
| 

`\e[58:2:: Ps : Ps : Ps m` (note: colons not semicolons)

 | 

Su

 | 

Select underline color from 24-bit RGB colors.

 |
| 

`\e[59m`

 | 

Su

 | 

Reset underline color to the default (follow the foreground color).

 |
| 

`\e[ Ps S`

 | 

indn

 | 

Scroll up the content (not the viewport) Ps lines (called `SCROLL UP` / `SU` by ECMA-48 and “scroll forward” by terminfo). When fish detects support for this feature, [status test-terminal-features scroll-content-up](cmds/status.html#status-test-terminal-features) will return 0, which enables the ctrl\-l binding to use the [scrollback-push](cmds/bind.html#special-input-functions-scrollback-push) special input function.

 |
| 

`\e[= Ps u`, `\e[? Ps u`

 | 

n/a

 | 

Enable the kitty keyboard protocol.

 |
| 

`\e[6n`

 | 

n/a

 | 

Request cursor position report. The response must be of the form `\e[ Ps ; Ps R` where the first parameter is the row number and the second parameter is the column number. Both start at 1.

This is used for truncating multiline autosuggestions at the screen’s bottom edge, by the [scrollback-push](cmds/bind.html#special-input-functions-scrollback-push) special input function, and inside terminals that implement the OSC 133 [click\_events](#term-compat-osc-133) feature.

 |
| 

`\e[ \x20 q`

 | 

Se

 | 

Reset cursor style to the terminal’s default. This is not used as of today but may be in future.

 |
| 

`\e[ Ps \x20 q`

 | 

Ss

 | 

Set cursor style (DECSCUSR); Ps is 2, 4 or 6 for block, underscore or line shape.

 |
| 

`\e[ Ps q`

 | 

n/a

 | 

Request terminal name and version (XTVERSION). This is only used for temporary workarounds for incompatible terminals.

 |
| 

`\e[?25h`

 | 

cvvis

 | 

Enable cursor visibility (DECTCEM).

 |
| 

`\e[?1004h`

 | 

n/a

 | 

Enable focus reporting.

 |
| 

`\e[?1004l`

 | 

n/a

 | 

Disable focus reporting.

 |
| 

`\e[?1049h`

 | 

n/a

 | 

Enable alternate screen buffer.

 |
| 

`\e[?1049l`

 | 

n/a

 | 

Disable alternate screen buffer.

 |
| 

`\e[?2004h`

 |  | 

Enable bracketed paste.

 |
| 

`\e[?2004l`

 |  | 

Disable bracketed paste.

 |
| 

`\e[?2031h`

 |  | 

Enable unsolicited [color theme reporting](https://contour-terminal.org/vt-extensions/color-palette-update-notifications/). When enabled, the terminal should send `\e[?997;1n` or `\e[?997;2n` whenever its color theme has changed. This prompts fish to query for [background color](#term-compat-query-background-color).

 |
| 

`\e[?2031l`

 |  | 

Disable unsolicited color theme reporting.

 |
| 

`\e]0; Pt \e\\`

 | 

ts

 | 

Set terminal window title (OSC 0). Used in [fish\_title](cmds/fish_title.html).

 |
| 

`\e]2; Pt \e\\`

 | 

ts

 | 

Set terminal tab title (OSC 1). Used in [fish\_tab\_title](cmds/fish_tab_title.html).

 |
| 

`\e]7;file:// Pt / Pt \e\\`

 |  | 

Report working directory (OSC 7). Since the terminal may be running on a different system than a (remote) shell, the hostname (first parameter) will _not_ be `localhost`.

 |
| 

`\e]8;; Pt \e\\`

 |  | 

Create a [hyperlink (OSC 8)](https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda). This is used in fish’s man pages.

 |
| 

`\e]11;?\e\\`

 | 

n/a

 | 

Query background color.

A valid response would be of the form `\e]11;rgb: Pt / Pt / Pt \e\\` or `\e]11;rgba: Pt / Pt / Pt / Pt\e\\` where the first three parameters consist of one to four hex digits each, representing red, blue and green components.

This is used to populate [`fish_terminal_color_theme`](language.html#envvar-fish_terminal_color_theme), which is used to select a [theme variant](cmds/fish_config.html#fish-config-theme-files) optimized for the terminal’s color theme.

 |
| 

`\e]52;c; Pt \e\\`

 |  | 

Copy to clipboard (OSC 52). Used by [fish\_clipboard\_copy](cmds/fish_clipboard_copy.html).

 |
| 

`\e]133;A; click_events=1\e\\`

 |  | 

Mark prompt start (OSC 133), with kitty’s `click_events` extension. The `click_events` extension enables mouse clicks to move the cursor or select pager items, assuming that [cursor position reporting](#term-compat-cursor-position-report) is available.

 |
| 

`\e]133;B\e\\`

 |  | 

Mark prompt end (OSC 133).

 |
| 

`\e]133;C; cmdline_url= Pt \e\\`

 |  | 

Mark command start (OSC 133), with kitty’s `cmdline_url` extension whose parameter is the URL-encoded command line.

 |
| 

`\e]133;D; Ps \e\\`

 |  | 

Mark command end (OSC 133); Ps is the exit status.

 |
| 

`\eP+q Pt \e\\`

 |  | 

Request terminfo capability (XTGETTCAP). The parameter is the capability’s hex-encoded terminfo code.

The response must be of the form `\eP1+q Pt \e\\` (“boolean”) or `\eP1+q Pt = Pt \e\\` (“string”). In either variant, the first parameter must be the same as the request parameter.

fish queries the following string capabilities:

-   [indn](#term-compat-indn)
    
    The response’s second parameter is ignored.
    
-   `query-os-name` (for [status terminal-os](cmds/status.html#status-terminal-os))
    
    Terminals running on Unix should respond with the hex encoding of `$(uname -s)` as second parameter.
    

 |

## DCS commands and GNU screen[¶](#dcs-commands-and-gnu-screen "Link to this heading")

DCS parsing is optional because fish temporarily switches to the alternate screen before printing any DCS commands. However, since GNU screen neither allows turning on the alternate screen buffer by default, nor treats DCS commands in a compatible way, fish’s initial prompt may be garbled by a DCS payload like `+q696e646e`. For the time being, fish works around this by checking for presence of the `STY` environment variable. If that doesn’t work for some reason, you can add this to your `~/.screenrc`:

altscreen on
COPY

Or add this to your `config.fish`:

function GNU-screen-workaround \--on-event fish\_prompt
    commandline \-f repaint
    functions \--erase GNU-screen-workaround
end
COPY

## Unicode Codepoints[¶](#unicode-codepoints "Link to this heading")

By default, fish outputs the following non-ASCII characters:

× ► ¶ ⏎ • ● … μ – ’ ‘ “ ” ← → ↑ ↓
COPY

as well as control pictures (U+2400 through U+241F), and locale-specific ones in [translated strings](language.html#variables-locale).
