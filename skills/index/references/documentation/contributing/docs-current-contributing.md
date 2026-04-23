Source: https://fishshell.com/docs/current/contributing.html

# Contributing To Fish[¶](#contributing-to-fish "Link to this heading")

This document tells you how you can contribute to fish.

Fish is free and open source software, distributed under the terms of the GPLv2.

Contributions are welcome, and there are many ways to contribute!

Whether you want to change some of the core Rust source, enhance or add a completion script or function, improve the documentation or translate something, this document will tell you how.

## Mailing List[¶](#mailing-list "Link to this heading")

Send patches to the public mailing list: [mailto:~krobelus/fish-shell@lists.sr.ht](mailto:~krobelus/fish-shell%40lists.sr.ht). Archives are available at [https://lists.sr.ht/~krobelus/fish-shell/](https://lists.sr.ht/~krobelus/fish-shell/).

## GitHub[¶](#github "Link to this heading")

Fish is available on GitHub, at [https://github.com/fish-shell/fish-shell](https://github.com/fish-shell/fish-shell).

First, you’ll need an account there, and you’ll need a git clone of fish. Fork it on GitHub and then run:

git clone https://github.com/<USERNAME>/fish-shell.git
COPY

This will create a copy of the fish repository in the directory fish-shell in your current working directory.

Also, for most changes you want to run the tests and so you’d get a setup to compile fish. For that, you’ll require:

-   Rust - when in doubt, try rustup
    
-   CMake
    
-   PCRE2 (headers and libraries) - optional, this will be downloaded if missing
    
-   gettext (only the msgfmt tool) - optional, for translation support
    
-   Sphinx - optional, to build the documentation
    

Of course not everything is required always - if you just want to contribute something to the documentation you’ll just need Sphinx, and if the change is very simple and obvious you can just send it in. Use your judgement!

Once you have your changes, open a pull request on [https://github.com/fish-shell/fish-shell/pulls](https://github.com/fish-shell/fish-shell/pulls).

## Guidelines[¶](#guidelines "Link to this heading")

In short:

-   Be conservative in what you need (keep to the agreed minimum supported Rust version, limit new dependencies)
    
-   Use automated tools to help you (`cargo xtask check`)
    

## Commit History[¶](#commit-history "Link to this heading")

We use a linear, [recipe-style](https://www.bitsnbites.eu/git-history-work-log-vs-recipe/) history. Every commit should pass our checks. We do not want “fixup” commits in our history. If you notice an issue with a commit in a pull request, or get feedback suggesting changes, you should rewrite the commit history and fix the relevant commits directly, instead of adding new “fixup” commits. When a pull request is ready, we rebase it on top of the current master branch, so don’t be shy about rewriting the history of commits which are not on master yet. Rebasing (not merging) your pull request on the latest version of master is also welcome, especially if it resolves conflicts.

If you’re using Git, consider using [jj](https://www.jj-vcs.dev/) to make this easier.

If a commit should close an issue, add a `Fixes #<issue-number>` line at the end of the commit description.

## Contributing completions[¶](#contributing-completions "Link to this heading")

Completion scripts are the most common contribution to fish, and they are very welcome.

In general, we’ll take all well-written completion scripts for a command that is publicly available. This means no private tools or personal scripts, and we do reserve the right to reject for other reasons.

Before you try to contribute them to fish, consider if the authors of the tool you are completing want to maintain the script instead. Often that makes more sense, specifically because they can add new options to the script immediately once they add them, and don’t have to maintain one completion script for multiple versions. If the authors no longer wish to maintain the script, they can of course always contact the fish maintainers to hand it over, preferably by opening a PR. This isn’t a requirement - if the authors don’t want to maintain it, or you simply don’t want to contact them, you can contribute your script to fish.

Completion scripts should

1.  Use as few dependencies as possible - try to use fish’s builtins like `string` instead of `grep` and `awk`, use `python` to read json instead of `jq` (because it’s already a soft dependency for fish’s tools)
    
2.  If it uses a common unix tool, use POSIX-compatible invocations - ideally it would work on GNU/Linux, macOS, the BSDs and other systems
    
3.  Option and argument descriptions should be kept short. The shorter the description, the more likely it is that fish can use more columns.
    
4.  Function names should start with `__fish`, and functions should be kept in the completion file unless they’re used elsewhere.
    
5.  Run `fish_indent` on your script.
    
6.  Try not to use minor convenience features right after they are available in fish - we do try to keep completion scripts backportable. If something has a real impact on the correctness or performance, feel free to use it, but if it is just a shortcut, please leave it.
    

Put your completion script into share/completions/name-of-command.fish. If you have multiple commands, you need multiple files.

If you want to add tests, you probably want to add a littlecheck test. See below for details.

## Contributing documentation[¶](#contributing-documentation "Link to this heading")

The documentation is stored in `doc_src/`, and written in ReStructured Text and built with Sphinx. The builtins and various functions shipped with fish are documented in `doc_src/cmds/`.

To build an HTML version of the docs locally, run:

cargo xtask html-docs
COPY

will output to `target/fish-docs/html` or, if you use CMake:

cmake \--build build \-t sphinx-docs
COPY

will output to `build/cargo/fish-docs/html/`. You can also run `sphinx-build` directly, which allows choosing the output directory:

sphinx-build \-j auto \-b html doc\_src/ /tmp/fish-doc/
COPY

will output HTML docs to `/tmp/fish-doc`.

After building them, you can open the HTML docs in a browser and see that it looks okay.

## Code Style[¶](#code-style "Link to this heading")

For formatting, we use:

-   `rustfmt` for Rust
    
-   `fish_indent` (shipped with fish) for fish script
    
-   `ruff format` for Python
    

To reformat files, there is an xtask

cargo xtask format \--all
cargo xtask format somefile.rs some.fish
COPY

### Fish Script Style Guide[¶](#fish-script-style-guide "Link to this heading")

1.  All fish scripts, such as those in the _share/functions_ and _tests_ directories, should be formatted using the `fish_indent` command.
    
2.  Function names should be in all lowercase with words separated by underscores. Private functions should begin with an underscore. The first word should be `fish` if the function is unique to fish.
    
3.  The first word of global variable names should generally be `fish` for public vars or `_fish` for private vars to minimize the possibility of name clashes with user defined vars.
    

#### Configuring Your Editor for Fish Scripts[¶](#configuring-your-editor-for-fish-scripts "Link to this heading")

If you use Vim: Install [vim-fish](https://github.com/dag/vim-fish), make sure you have syntax and filetype functionality in `~/.vimrc`:

syntax enable
filetype plugin indent on
COPY

Then turn on some options for nicer display of fish scripts in `~/.vim/ftplugin/fish.vim`:

" Set up :make to use fish for syntax checking.
compiler fish

" Set this to have long lines wrap inside comments.
setlocal textwidth=79

" Enable folding of block structures in fish.
setlocal foldmethod=expr
COPY

If you use Emacs: Install [fish-mode](https://github.com/wwwjfy/emacs-fish) (also available in melpa and melpa-stable) and `(setq-default indent-tabs-mode nil)` for it (via a hook or in `use-package`s “:init” block). It can also be made to run fish\_indent via e.g.

(add-hook 'fish-mode-hook (lambda ()
    (add-hook 'before-save-hook 'fish\_indent-before-save)))
COPY

### Minimum Supported Rust Version (MSRV) Policy[¶](#minimum-supported-rust-version-msrv-policy "Link to this heading")

We support at least the version of `rustc` available in Debian Stable.

## Testing[¶](#testing "Link to this heading")

The source code for fish includes a large collection of tests. If you are making any changes to fish, running these tests is a good way to make sure the behaviour remains consistent and regressions are not introduced. Even if you don’t run the tests on your machine, they will still be run via GitHub Actions.

You are strongly encouraged to add tests when changing the functionality of fish, especially if you are fixing a bug to help ensure there are no regressions in the future (i.e., we don’t reintroduce the bug).

Unit tests live next to the implementation in Rust source files, in inline submodules (`mod tests {}`).

System tests live in `tests/`:

-   `tests/checks` are run by [littlecheck](https://github.com/ridiculousfish/littlecheck) and test noninteractive (script) behavior, except for `tests/checks/tmux-*` which test interactive scenarios.
    
-   `tests/pexpects` tests interactive scenarios using [pexpect](https://pexpect.readthedocs.io/en/stable/)
    

When in doubt, the bulk of the tests should be added as a littlecheck test in tests/checks, as they are the easiest to modify and run, and much faster and more dependable than pexpect tests. The syntax is fairly self-explanatory. It’s a fish script with the expected output in `# CHECK:` or `# CHECKERR:` (for stderr) comments. If your littlecheck test has a specific dependency, use `# REQUIRE: ...` with a POSIX sh script.

The pexpect tests are written in Python and can simulate input and output to/from a terminal, so they are needed for anything that needs actual interactivity. The runner is in tests/pexpect\_helper.py, in case you need to modify something there.

These tests can be run via the tests/test\_driver.py Python script, which will set up the environment. It sets up a temporary $HOME and also uses it as the current directory, so you do not need to create a temporary directory in them.

If you need a command to do something weird to test something, maybe add it to the `fish_test_helper` binary (in `tests/fish_test_helper.c`).

### Local testing[¶](#local-testing "Link to this heading")

The tests can be run on your local system:

cargo build
\# Run unit tests
cargo test
\# Run system tests
tests/test\_driver.py target/debug
\# Run a specific system test.
tests/test\_driver.py target/debug tests/checks/abbr.fish
COPY

Here, the first argument to test\_driver.py refers to a directory with `fish`, `fish_indent` and `fish_key_reader` in it. In this example we’re in the root of the workspace and have run `cargo build` without `--release`, so it’s a debug build.

To run all tests and linters, use:

cargo xtask check
COPY

## Contributing Translations[¶](#contributing-translations "Link to this heading")

Fish uses GNU gettext to translate messages from English to other languages. We use custom tools for extracting messages from source files and to localize at runtime. This means that we do not have a runtime dependency on the gettext library. It also means that some features are not supported, such as message context and plurals. We also expect all files to be UTF-8-encoded. In practice, this should not matter much for contributing translations.

Translation sources are stored in the `localization/po` directory and named `ll_CC.po`, where `ll` is the two (or possibly three) letter ISO 639-1 language code of the target language (e.g. `pt` for Portuguese). `CC` is an ISO 3166 country/territory code, (e.g. `BR` for Brazil). An example for a valid name is `pt_BR.po`, indicating Brazilian Portuguese. These are the files you will interact with when adding translations.

### Adding translations for a new language[¶](#adding-translations-for-a-new-language "Link to this heading")

Creating new translations requires the Gettext tools. More specifically, you will need `msguniq` and `msgmerge` for creating translations for a new language. To create a new translation, run:

build\_tools/update\_translations.fish localization/po/ll\_CC.po
COPY

This will create a new PO file containing all messages available for translation. If the file already exists, it will be updated.

After modifying a PO file, you can recompile fish, and it will integrate the modifications you made. This requires that the `msgfmt` utility is installed (comes as part of `gettext`). It is important that the `localize-messages` cargo feature is enabled, which it is by default. You can explicitly enable it using:

cargo build \--features=localize-messages
COPY

Use environment variables to tell fish which language to use, e.g.:

LANG\=pt\_BR.utf8 fish
COPY

or within the running fish shell:

set LANG pt\_BR.utf8
COPY

For more options regarding how to choose languages, see [the corresponding gettext documentation](https://www.gnu.org/software/gettext/manual/html_node/Locale-Environment-Variables.html). One neat thing you can do is set a list of languages to check for translations in the order defined using the `LANGUAGE` variable, e.g.:

set LANGUAGE pt\_BR de\_DE
COPY

to try to translate messages to Portuguese, if that fails try German, and if that fails too you will see the English version defined in the source code.

### Modifying existing translations[¶](#modifying-existing-translations "Link to this heading")

If you want to work on translations for a language which already has a corresponding `po` file, it is sufficient to edit this file. No other changes are necessary.

After recompiling fish, you should be able to see your translations in action. See the previous section for details.

### Editing PO files[¶](#editing-po-files "Link to this heading")

Many tools are available for editing translation files, including command-line and graphical user interface programs. For simple use, you can use your text editor.

Open up the PO file, for example `localization/po/sv.po`, and you’ll see something like:

msgid "%s: No suitable job\\n"
msgstr ""
COPY

The `msgid` here is the “name” of the string to translate, typically the English string to translate. The second line (`msgstr`) is where your translation goes.

For example:

msgid "%s: No suitable job\\n"
msgstr "%s: Inget passande jobb\\n"
COPY

Any `%s` or `%d` are placeholders that fish will use for formatting at runtime. It is important that they match - the translated string should have the same placeholders in the same order.

Also any escaped characters, like that `\n` newline at the end, should be kept so the translation has the same behavior.

Our tests run `msgfmt --check-format /path/to/file`, so they would catch mismatched placeholders - otherwise fish would crash at runtime when the string is about to be used.

Be cautious about blindly updating an existing translation file. `msgid` strings should never be updated manually, only by running the appropriate script.

### Modifications to strings in source files[¶](#modifications-to-strings-in-source-files "Link to this heading")

If a string changes in the sources, the old translations will no longer work. They will be preserved in the PO files, but commented-out (starting with `#~`). If you add/remove/change a translatable strings in a source file, run `build_tools/update_translations.fish` to propagate this to all translation files (`localization/po/*.po`). This is only relevant for developers modifying the source files of fish or fish scripts.

### Setting Code Up For Translations[¶](#setting-code-up-for-translations "Link to this heading")

All non-debug messages output for user consumption should be marked for translation. In Rust, this requires the use of the `wgettext!` or `wgettext_fmt!` macros:

streams.out.append(wgettext\_fmt!("%s: There are no jobs\\n", argv\[0\]));
COPY

All messages in fish script must be enclosed in single or double quote characters for our message extraction script to find them. They must also be translated via a command substitution. This means that the following are **not** valid:

echo (\_ hello)
\_ "goodbye"
COPY

Above should be written like this instead:

echo (\_ "hello")
echo (\_ "goodbye")
COPY

You can use either single or double quotes to enclose the message to be translated. You can also optionally include spaces after the opening parentheses or before the closing parentheses.

## Updating Dependencies[¶](#updating-dependencies "Link to this heading")

To update dependencies, run `build_tools/update-dependencies.sh`. This currently requires [updatecli](https://github.com/updatecli/updatecli) and a few other tools.

## Versioning[¶](#versioning "Link to this heading")

The fish version is constructed by the _build\_tools/git\_version\_gen.sh_ script. For developers the version is the branch name plus the output of `git describe --always --dirty`. Normally the main part of the version will be the closest annotated tag. Which itself is usually the most recent release number (e.g., `2.6.0`).
