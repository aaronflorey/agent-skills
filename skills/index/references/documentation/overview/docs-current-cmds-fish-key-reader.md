Source: https://fishshell.com/docs/current/cmds/fish_key_reader.html

# fish\_key\_reader - explore what characters keyboard keys send[¶](#fish-key-reader-explore-what-characters-keyboard-keys-send "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

fish\_key\_reader \[OPTIONS\]
COPY

## Description[¶](#description "Link to this heading")

**fish\_key\_reader** is used to explain how you would bind a certain key sequence. By default, it prints the [bind](bind.html) command for one key sequence read interactively over standard input.

The following options are available:

**\-c** or **\--continuous**

Begins a session where multiple key sequences can be inspected. By default the program exits after capturing a single key sequence.

**\-h** or **\--help**

Displays help about using this command.

**\-V** or **\--verbose**

Explain what sequence was received in addition to the decoded key.

**\-v** or **\--version**

Displays the current **fish** version and then exits.

## Usage Notes[¶](#usage-notes "Link to this heading")

`fish_key_reader` intentionally disables handling of many signals. To terminate `fish_key_reader` in `--continuous` mode do:

-   press ctrl\-c twice, or
    
-   press ctrl\-d twice, or
    
-   type `exit`, or
    
-   type `quit`
    

## Example[¶](#example "Link to this heading")

\> fish\_key\_reader
Press a key:
\# press up-arrow
bind up 'do something'
COPY
