Source: https://fishshell.com/docs/current/cmds/emit.html

# emit - emit a generic event[¶](#emit-emit-a-generic-event "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

emit EVENT\_NAME \[ARGUMENTS ...\]
COPY

## Description[¶](#description "Link to this heading")

`emit` emits, or fires, an event. Events are delivered to, or caught by, special functions called [event handlers](../language.html#event). The arguments are passed to the event handlers as function arguments.

The **\--help** or **\-h** option displays help about using this command.

## Example[¶](#example "Link to this heading")

The following code first defines an event handler for the generic event named ‘test\_event’, and then emits an event of that type.

function event\_test \--on-event test\_event
    echo event test: $argv
end

emit test\_event something
COPY

## Notes[¶](#notes "Link to this heading")

Note that events are only sent to the current fish process as there is no way to send events from one fish process to another.
