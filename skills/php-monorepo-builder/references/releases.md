# Releases

Version history for this repository (2 releases).

## 12.5.2: 12.5.2
**Published:** 2026-03-26

## What's Changed

### Bug Fixes

- Remove stale composer-json-manipulator autoload entry that breaks PHAR build (#109)
- Fix workers() not respecting user-specified order (#112)

### Improvements

- Allow sebastian/diff ^8 (#110)

**Full Changelog**: https://github.com/symplify/monorepo-builder/compare/12.5.0...12.5.2

[View on GitHub](https://github.com/symplify/monorepo-builder/releases/tag/12.5.2)

---

## 12.5.0: 12.5.0
**Published:** 2026-02-13

## What's Changed

### Bug Fixes

- **Merge command now preserves unknown/custom composer.json sections** — Sections like `scripts-aliases`, `abandoned`, `readme`, and any other non-standard keys in root `composer.json` are no longer silently dropped during merge (#105, #106)
- **`dataToAppend` supports arbitrary composer.json keys** — No longer limited to the 24 hardcoded sections (#105)
- **Original section order of root `composer.json` is preserved by default** — New sections are appended at the end; custom ordering is available via `composerSectionOrder()` (#107)
- **Fix comparator transitivity violations** in `ComposerJson::sortItemsByOrderedListOfKeys()` and `ArraySorter::recursiveSortBySchema()`
- **Fix `FilterOutDuplicatedRequireAndRequireDevJsonDecorator`** which was a no-op due to `array_intersect` comparing values instead of keys
- **Fix self-merge bug** in `MergedAndDecoratedComposerJsonFactory` (was merging object with itself)

### Improvements

- Allow `webmozart/assert` ^2 (#103)

### Internal

- Consolidate require/require-dev dedup logic into `ComposerJsonMerger` and decorator
- Add explicit `DECORATOR_ORDER` constant for decorator execution ordering
- Remove dead code: `RequireRequireDevDuplicateCleaner`, `src-deps/composer-json-manipulator/`

**Full Changelog**: https://github.com/symplify/monorepo-builder/compare/12.4.5...12.5.0

[View on GitHub](https://github.com/symplify/monorepo-builder/releases/tag/12.5.0)

---

