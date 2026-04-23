# Upgrades

## Current Mirrored Release Coverage

- The mirrored release notes cover fish 4.6.0 and many earlier releases.
- Use the full release notes mirror when behavior seems version-dependent.

## 4.6 Highlights

- Added `SHELL_PROMPT_PREFIX`, `SHELL_PROMPT_SUFFIX`, and `SHELL_WELCOME`.
- Added prompt-adjacent behavior that matters for prompt customization and shell startup UX.
- `|&` is accepted as an alternate spelling of `&|`.
- `set_color` received improvements.

## 4.5 Highlights

- `ignore-terminfo` became permanently enabled.
- Terminal-behavior assumptions may differ from older fish guidance.

## 4.4 Highlights

- Added vi-mode improvements.
- Added `set_color --strikethrough`.

## 4.3 Highlights

- User-facing generated theme and key-binding snippets moved away from default universal variables toward globals.
- The mirrored release notes specifically mention `fish_frozen_theme.fish` and `fish_frozen_key_bindings.fish`.
- Added `status language`.
- Added color-theme-aware themes and several terminal integration improvements.
- Added `omit-term-workarounds` as a feature flag.

## Upgrade Checklist

- Re-check prompt behavior, especially if you depend on prompt prefix or suffix handling.
- Re-check terminal integration and any assumptions about terminfo.
- Re-check theme and key-binding persistence behavior across generated config snippets.
- Re-check scripts or docs that depend on exact redirection spelling or feature-flag defaults.
- Use `status features` and release notes together when debugging behavior changes across versions.
