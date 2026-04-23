Source: https://fishshell.com/docs/current/cmds/random.html

# random - generate random number[¶](#random-generate-random-number "Link to this heading")

## Synopsis[¶](#synopsis "Link to this heading")

random
random SEED
random START END
random START STEP END
random choice \[ITEMS ...\]
COPY

## Description[¶](#description "Link to this heading")

`random` generates a pseudo-random integer from a uniform distribution. The range (inclusive) depends on the arguments.

No arguments indicate a range of 0 to 32767 (inclusive).

If one argument is specified, the internal engine will be seeded with the argument for future invocations of `random` and no output will be produced.

Two arguments indicate a range from _START_ to _END_ (both _START_ and _END_ included).

Three arguments indicate a range from _START_ to _END_ with a spacing of _STEP_ between possible outputs.

`random choice` will select one random item from the succeeding arguments.

The **\-h** or **\--help** option displays help about using this command.

Note that seeding the engine will NOT give the same result across different systems.

You should not consider `random` cryptographically secure, or even statistically accurate.

## Example[¶](#example "Link to this heading")

The following code will count down from a random even number between 10 and 20 to 1:

for i in (seq (random 10 2 20) \-1 1)
    echo $i
end
COPY

And this will open a random picture from any of the subdirectories:

open (random choice \*\*.jpg)
COPY

Or, to only get even numbers from 2 to 20:

random 2 2 20
COPY

Or odd numbers from 1 to 3:

random 1 2 3 \# or 1 2 4
COPY
