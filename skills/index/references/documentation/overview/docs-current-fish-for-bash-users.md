Source: https://fishshell.com/docs/current/fish_for_bash_users.html

# Fish for bash users[¶](#fish-for-bash-users "Link to this heading")

This is to give you a quick overview if you come from bash (or to a lesser extent other shells like zsh or ksh) and want to know how fish differs. Fish is intentionally not POSIX-compatible and as such some of the things you are used to work differently.

Many things are similar - they both fundamentally expand commandlines to execute commands, have pipes, redirections, variables, globs, use command output in various ways. This document is there to quickly show you the differences.

## Command substitutions[¶](#command-substitutions "Link to this heading")

Fish spells command substitutions as `$(command)` or `(command)`, but not `` `command` ``.

In addition, it only splits them on newlines instead of $IFS. If you want to split on something else, use [string split](cmds/string-split.html), [string split0](cmds/string-split.html) or [string collect](cmds/string-collect.html). If those are used as the last command in a command substitution the splits they create are carried over. So:

for i in (find . \-print0 | string split0)
COPY

will correctly handle all possible filenames.

## Variables[¶](#variables "Link to this heading")

Fish sets and erases variables with [set](cmds/set.html) instead of `VAR=VAL` and a variety of separate builtins like `declare` and `unset` and `export`. `set` takes options to determine the scope and exportedness of a variable:

\# Define $PAGER \*g\*lobal and e\*x\*ported,
\# so this is like \`\`export PAGER=less\`\`
set \-gx PAGER less

\# Define $alocalvariable only locally,
\# like \`\`local alocalvariable=foo\`\`
set \-l alocalvariable foo
COPY

or to erase variables:

set \-e PAGER
COPY

`VAR=VAL` statements are available as environment overrides:

PAGER\=cat git log
COPY

Fish does not perform word splitting. Once a variable has been set to a value, that value stays as it is, so double-quoting variable expansions isn’t the necessity it is in bash. [\[1\]](#id2)

For instance, here’s bash

\> foo\="bar baz"
> printf '"%s"\\n' $foo
\# will print two lines, because we didn't double-quote
\# this is word splitting
"bar"
"baz"
COPY

And here is fish:

\> set foo "bar baz"
\> printf '"%s"\\n' $foo
\# foo was set as one element,
\# so it will be passed as one element, so this is one line
"bar baz"
COPY

All variables are “arrays” (we use the term “lists”), and expanding a variable expands to all its elements, with each element as its own argument (like bash’s `"${var[@]}"`:

\> set var "foo bar" banana
\> printf %s\\n $var
foo bar
banana
COPY

Specific elements of a list can be selected:

echo $list\[5..7\]
COPY

The arguments to `set` are ordinary, so you can also set a variable to the output of a command:

\# Set lines to all the lines in file, one element per line
set lines (cat file)
COPY

or a mixture of literal values and output:

\> set numbers 1 2 3 (seq 5 8) 9
\> printf '%s\\n' $numbers
1
2
3
5
6
7
8
9
COPY

A `=` is unnecessary and unhelpful with `set` - `set foo = bar` will set the variable “foo” to two values: “=” and “bar”. `set foo=bar` will print an error.

See [Shell variables](language.html#variables) for more.

\[[1](#id1)\]

zsh also does not perform word splitting by default (the SH\_WORD\_SPLIT option controls this)

## Wildcards (globs)[¶](#wildcards-globs "Link to this heading")

Fish only supports the `*` and `**` glob (and the deprecated `?` glob) as syntax. If a glob doesn’t match it fails the command (like with bash’s `failglob`) unless the command is `for`, `set` or `count` or the glob is used with an environment override (`VAR=* command`), in which case it expands to nothing (like with bash’s `nullglob` option).

Globbing doesn’t happen on expanded variables, so:

set foo "\*"
echo $foo
COPY

will not match any files.

There are no options to control globbing so it always behaves like that.

The `**` glob will match in subdirectories as well. In other shells this often needs to be turned on with an option, like `setopt globstar` in bash.

Unlike bash, fish will also follow symlinks, and will sort the results in a natural sort, with included numbers compared as numbers. That means it will sort e.g. music tracks correctly even if they have numbers like `1` instead of `01`.

See [Wildcards](language.html#expand-wildcard) for more.

## Quoting[¶](#quoting "Link to this heading")

Fish has two quoting styles: `""` and `''`. Variables are expanded in double-quotes, nothing is expanded in single-quotes.

There is no `$''`, instead the sequences that would transform are transformed _when unquoted_:

\> echo a\\nb
a
b
COPY

See [Quotes](language.html#quotes) for more.

## String manipulation[¶](#string-manipulation "Link to this heading")

Fish does not have `${foo%bar}`, `${foo#bar}` and `${foo/bar/baz}`. Instead string manipulation is done by the [string](cmds/string.html) builtin.

For example, to replace “bar” with “baz”:

\> string replace bar baz "bar luhrmann"
baz luhrmann
COPY

It can also split strings:

\> string split "," "foo,bar"
foo
bar
COPY

Match regular expressions as a replacement for `grep`:

\> echo bababa | string match \-r 'aba$'
aba
COPY

Pad strings to a given width, with arbitrary characters:

\> string pad \-c x \-w 20 "foo"
xxxxxxxxxxxxxxxxxfoo
COPY

Make strings lower/uppercase:

\> string lower Foo
foo

\> string upper Foo
FOO
COPY

repeat strings, trim strings, escape strings or print a string’s length or width (in terminal cells).

## Special variables[¶](#special-variables "Link to this heading")

Some bash variables and their closest fish equivalent:

-   `$*`, `$@`, `$1` and so on: `$argv`
    
-   `$?`: `$status`
    
-   `$$`: `$fish_pid`
    
-   `$#`: No variable, instead use `count $argv`
    
-   `$!`: `$last_pid`
    
-   `$0`: `status filename`
    
-   `$-`: Mostly `status is-interactive` and `status is-login`
    

## Process substitution[¶](#process-substitution "Link to this heading")

Instead of `<(command)` fish uses `(command | psub)`. There is no equivalent to `>(command)`.

Note that both of these are bashisms, and most things can easily be expressed without. E.g. instead of:

source (command | psub)
COPY

Use:

command | source
COPY

as fish’s [source](cmds/source.html) can read from stdin.

## Heredocs[¶](#heredocs "Link to this heading")

Fish does not have `<<EOF` “heredocs”. Instead of

cat <<EOF
some string
some more string
EOF
COPY

use:

printf %s\\n "some string" "some more string"
COPY

or:

echo "some string
some more string"

\# or if you want the quotes on separate lines:

echo "\\
some string
some more string\\
"
COPY

Quotes are followed across newlines.

What “heredocs” do is:

1.  Read/interpret the string, with special rules, up to the terminator. [\[2\]](#id4)
    
2.  Write the resulting string to a temporary file.
    
3.  Start the command the heredoc is attached to with that file as stdin.
    

This means it is essentially the same as just reading from a pipe, so:

echo "foo" | cat
COPY

is mostly the same as

cat <<EOF
foo
EOF
COPY

Like with heredocs, the command has to be prepared to read from stdin. Sometimes this requires special options to be used, often giving a filename of `-` turns it on.

For example:

echo "xterm
rxvt-unicode" | pacman \--remove \-

\# is the same as (the \`-\` makes pacman read arguments from stdin)
pacman \--remove xterm rxvt-unicode
COPY

and could be written in other shells as

\# This "-" is still necessary - the heredoc is \*also\* passed over stdin!
pacman \--remove \- << EOF
xterm
rxvt-unicode
EOF
COPY

So heredocs really are minor syntactical sugar that introduces a lot of special rules, which is why fish doesn’t have them. Pipes are a core concept, and are simpler and compose nicer.

\[[2](#id3)\]

For example, the “EOF” is just a convention, the terminator can be an arbitrary string, something like “THISISTHEEND” also works. And using `<<-` trims leading _tab_ characters (but not other whitespace), so you can indent the lines, but only with tabs. Substitutions (variables, commands) are done on the heredoc by default, but not if the terminator is quoted: `cat << "EOF"`.

## Test (`test`, `[`, `[[`)[¶](#test-test "Link to this heading")

Fish has a POSIX-compatible `test` or `[` builtin. There is no `[[` and `test` does not accept `==` as a synonym for `=`. It can compare floating point numbers, however.

`set -q` can be used to determine if a variable exists or has a certain number of elements (`set -q foo[2]`).

## Arithmetic Expansion[¶](#arithmetic-expansion "Link to this heading")

Fish does not have `$((i+1))` arithmetic expansion, computation is handled by [math](cmds/math.html):

math $i + 1
COPY

Unlike bash’s arithmetic, it can handle floating point numbers:

\> math 5 / 2
2.5
COPY

And also has some functions, like for trigonometry:

\> math cos 2 x pi
1
COPY

You can pass arguments to `math` separately like above or in quotes. Because fish uses `()` parentheses for [command substitutions](#bash-command-substitutions), quoting is needed if you want to use them in your expression:

\> math '(5 + 2) \* 4'
COPY

Both `*` and `x` are valid ways to spell multiplication, but `*` needs to be quoted because it looks like a [glob](#bash-globs).

## Prompts[¶](#prompts "Link to this heading")

Fish does not use the `$PS1`, `$PS2` and so on variables. Instead the prompt is the output of the [fish\_prompt](cmds/fish_prompt.html) function, plus the [fish\_mode\_prompt](cmds/fish_mode_prompt.html) function if [vi mode](interactive.html#vi-mode) is enabled. The output of the [fish\_right\_prompt](cmds/fish_right_prompt.html) function is used for the right-sided prompt.

As an example, here’s a relatively simple bash prompt:

\# <$HOSTNAME> <$PWD in blue> <Prompt Sign in Yellow> <Rest in default light white>
PS1\='\\h\\\[\\e\[1;34m\\\]\\w\\\[\\e\[m\\\] \\\[\\e\[1;32m\\\]\\$\\\[\\e\[m\\\] '
COPY

and a rough fish equivalent:

function fish\_prompt
    set \-l prompt\_symbol '$'
    fish\_is\_root\_user; and set prompt\_symbol '#'

    echo \-s (prompt\_hostname) \\
    (set\_color blue) (prompt\_pwd) \\
    (set\_color yellow) $prompt\_symbol (set\_color \--reset)
end
COPY

This shows a few differences:

-   Fish provides [set\_color](cmds/set_color.html) to color text. It can use the 16 named colors and also RGB sequences (so you could also use `set_color 5555FF`)
    
-   Instead of introducing specific escapes like `\h` for the hostname, the prompt is a function. To achieve the effect of `\h`, fish provides helper functions like [prompt\_hostname](cmds/prompt_hostname.html), which prints a shortened version of the hostname.
    
-   Fish offers other helper functions for adding things to the prompt, like [fish\_vcs\_prompt](cmds/fish_vcs_prompt.html) for adding a display for common version control systems (git, mercurial, svn), and [prompt\_pwd](cmds/prompt_pwd.html) for showing a shortened `$PWD` (the user’s home directory becomes `~` and any path component is shortened).
    

The default prompt is reasonably full-featured and its code can be read via `type fish_prompt`.

Fish does not have `$PS2` for continuation lines, instead it leaves the lines indented to show that the commandline isn’t complete yet.

## Blocks and loops[¶](#blocks-and-loops "Link to this heading")

Fish’s blocking constructs look a little different. They all start with a word, end in `end` and don’t have a second starting word:

for i in 1 2 3; do
   echo $i
done

\# becomes

for i in 1 2 3
   echo $i
end

while true; do
   echo Weeee
done

\# becomes

while true
   echo Weeeeeee
end

{
   echo Hello
}

\# becomes

begin
   echo Hello
end

if true; then
   echo Yes I am true
else
   echo "How is true not true?"
fi

\# becomes

if true
   echo Yes I am true
else
   echo "How is true not true?"
end

foo() {
   echo foo
}

\# becomes

function foo
    echo foo
end

\# (bash allows the word "function",
\#  but this is an extension)
COPY

Fish does not have an `until`. Use `while not` or `while !`.

## Subshells[¶](#subshells "Link to this heading")

Bash has a feature called “subshells”, where it will start another shell process for certain things. That shell will then be independent and e.g. any changes it makes to variables won’t be visible in the main shell.

This includes things like:

\# A list of commands in \`()\` parentheses
(foo; bar) | baz

\# Both sides of a pipe
foo | while read \-r bar; do
    \# This will not be visible outside of the loop.
    VAR\=VAL
    \# This background process will not be, either
    baz &
done
COPY

Fish does not currently have subshells. You will have to find a different solution. The isolation can usually be achieved by scoping variables (with `set -l`), but if you really do need to run your code in a new shell environment you can use `fish -c 'your code here'` to do so explicitly.

`()` subshells are often confused with `{}` grouping, which does _not_ use a subshell. When you just need to group, you can use `begin; end` in fish:

(foo; bar) | baz
\# when it should really have been:
{ foo; bar; } | baz
\# becomes
begin; foo; bar; end | baz
COPY

The pipe will be run in the same process, so `while read` loops can set variables outside:

foo | while read bar
    set \-g VAR VAL
    baz &
end

echo $VAR \# will print VAL
jobs \# will show "baz"
COPY

Subshells are also frequently confused with [command substitutions](#bash-command-substitutions), which bash writes as `` `command` `` or `$(command)` and fish writes as `$(command)` or `(command)`. Bash also _uses_ subshells to implement them.

## Builtins and other commands[¶](#builtins-and-other-commands "Link to this heading")

By now it has become apparent that fish puts much more of a focus on its builtins and external commands rather than its syntax. So here are some helpful builtins and their rough equivalent in bash:

-   [string](cmds/string.html) - this replaces most of the string transformation (`${i%foo}` et al) and can also be used instead of `grep` and `sed` and such.
    
-   [math](cmds/math.html) - this replaces `$((i + 1))` arithmetic and can also do floats and some simple functions (sine and friends).
    
-   [argparse](cmds/argparse.html) - this can handle a script’s option parsing, for which bash would probably use `getopt` (zsh provides `zparseopts`).
    
-   [count](cmds/count.html) can be used to count things and therefore replaces `$#` and can be used instead of `wc`.
    
-   [status](cmds/status.html) provides information about the shell status, e.g. if it’s interactive or what the current linenumber is. This replaces `$-` and `$BASH_LINENO` and other variables.
    
-   `seq(1)` can be used as a replacement for `{1..10}` range expansion. If your OS doesn’t ship a `seq` fish includes a replacement function.
    

## Other facilities[¶](#other-facilities "Link to this heading")

Bash has `set -x` or `set -o xtrace` to print all commands that are being executed. In fish, this would be enabled by setting [`fish_trace`](language.html#envvar-fish_trace).

Or, if your intention is to _profile_ how long each line of a script takes, you can use `fish --profile` - see the [page for the fish command](cmds/fish.html).
