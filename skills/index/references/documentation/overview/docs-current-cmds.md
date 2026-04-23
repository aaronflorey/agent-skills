Source: https://fishshell.com/docs/current/cmds/_.html

# \_ - call fish’s translations[¶](#call-fish-s-translations "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

\_ STRING
COPY

## Description[¶](#description "Link to this heading")

`_` translates its arguments into the current language, if possible.

This only works with messages which are translated as part of fish’s own sources, so using it as part of your own fish scripts which are not upstreamed into the fish repo will not work unless the exact same message also exists upstream.

It requires fish to be built with gettext support. If that support is disabled or there is no translation it will echo the argument back.

The language depends on the current locale, set with [`LANG`](../language.html#envvar-LANG), [`LC_MESSAGES`](../language.html#envvar-LC_MESSAGES), [`LC_ALL`](../language.html#envvar-LC_ALL), and [`LANGUAGE`](../language.html#envvar-LANGUAGE). These variables do not have to be exported for fish to use them, and fish’s variable scopes are supported. If other programs launched via fish should respect these locale variables they have to be exported to make them available outside of fish.

For [`LANGUAGE`](../language.html#envvar-LANGUAGE) you can use a list, or use colons to separate multiple languages.

If the [status language set](status.html#status-language) command was used, its arguments specify the language precedence, and the environment variables are ignored.

## Options[¶](#options "Link to this heading")

`_` takes no options.

## Examples[¶](#examples "Link to this heading")

Use German translations:

\> set LANG de\_DE.UTF-8
\> \_ file
Datei
COPY

Specify a precedence of languages (only works with [`LANGUAGE`](../language.html#envvar-LANGUAGE)):

\> set LANGUAGE pt de
\> \_ file  \# This message has a Portuguese translation.
arquivo
\> \_ "Invalid arguments"  \# This message does not have a Portuguese translation, but a German one.
Ungültige Argumente
\> \_ untranslatable  \# No translation in Portuguese, nor in German.
untranslatable
COPY

Note that the specific examples may change if translations are added/modified.
