# Troubleshooting Workarounds

Use this as the first lookup when a Valinor integration fails unexpectedly.

| Symptom | Likely cause | Preferred fix |
|---|---|---|
| A string like `"42"` is rejected for `int` or `float` | Valinor is strict by default | Add `allowScalarValueCasting()` only if the input contract really permits stringified scalars, or write a targeted converter |
| A `list<T>` mapping fails on associative keys | Lists must be sequential from `0` by default | Fix the input shape or add `allowNonSequentialList()` when the boundary genuinely allows it |
| Unknown keys cause mapping errors | Superfluous keys are rejected by default | Remove the keys, use an unsealed shape, or add `allowSuperfluousKeys()` if extra keys are expected |
| Missing nullable or collection values still fail | Undefined values are still invalid unless configured | Use constructor defaults, nullable types plus `allowUndefinedValues()`, or reshape the input |
| `mixed` or `object` types are rejected | Permissive types are disabled by default | Replace them with precise types, or use `allowPermissiveTypes()` only when unavoidable |
| A custom constructor works, but the native constructor no longer does | Registering custom constructors disables the native constructor for that class | Also register the class name itself in `registerConstructor()` if native constructor support must remain |
| Interface or abstract class mapping fails because Valinor cannot instantiate it | No implementation strategy was configured | Use `infer()` when implementation depends on source data, or `registerConstructor()` when one creation path is enough |
| A converter or constructor exception escapes instead of becoming a mapping error | The exception is not recognized as a safe Valinor message | Implement Valinor message interfaces, use `MessageBuilder`, or convert the exception with `filterExceptions()` |
| HTTP request mapping reports a collision | The same key exists in route, query, or body and no source attribute was used | Add `#[FromRoute]`, `#[FromQuery]`, or `#[FromBody]` |
| `Source::json()` throws before mapping starts | The JSON is invalid or decodes to a non-iterable top-level value | Fix the source or catch `InvalidSource` at the parsing boundary |
| Existing examples use `camelCaseKeys()` and new code feels inconsistent | `Source::camelCaseKeys()` is deprecated | Prefer mapper configurators like `ConvertKeysToCamelCase` |
| Normalization fails on object graphs | Circular references are present | Break the graph for the response shape or add a transformer that cuts cycles deliberately |

## Fast diagnosis checklist

1. Confirm the target signature is really the one you want.
2. Confirm the raw input keys and value types match that signature.
3. Check whether strict defaults, not a library bug, explain the failure.
4. Check whether a constructor, converter, or infer callback is too broad or not
   pure.
5. Check whether a deprecated pattern from older examples is being copied.

## Error handling skeleton

```php
use CuyZ\Valinor\Mapper\MappingError;

try {
    $result = $mapper->map(Target::class, $source);
} catch (MappingError $error) {
    $messages = [];

    foreach ($error->messages() as $message) {
        $messages[] = (string)$message;
    }

    // log or return validation errors built from $messages
}
```

## When not to use a workaround

- Do not turn on permissive settings to hide a modeling mistake.
- Do not convert every exception with `filterExceptions()`.
- Do not fall back to `mixed` just because one field is awkward.
- Do not replace a reusable DTO with a shaped array if domain invariants matter.
