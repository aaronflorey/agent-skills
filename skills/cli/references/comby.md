# comby

Use `comby` for lightweight structural search and rewrite.

## Best for

- Rewrites that depend on token shape rather than raw regex
- Cross-language transformations without full AST setup
- Safer pattern holes like `:[arg]` and `:[body]`

## High-signal commands

```bash
comby 'foo(:[x])' 'bar(:[x])' -stdin -matcher .js
comby 'logger.info(:[msg])' 'logger.debug(:[msg])' -d src -f .ts -i
comby 'if (:[cond]) {:[body]}' 'unless (:[cond]) {:[body]}' sample.rb -matcher .rb
```

## Sharp edges

- Structural, but not a full AST tool.
- Loose holes can match too much if the template is vague.
- Matcher choice affects accuracy; pick the closest language.

## Escalate when

- Switch to `sd` for simple text replacements.
- Switch to `ast-grep` when syntax-aware guarantees matter more than flexibility.
