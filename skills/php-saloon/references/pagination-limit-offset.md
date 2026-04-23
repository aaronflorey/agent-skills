# Limit Offset Pagination

Source page: https://docs.saloon.dev/installable-plugins/pagination/limit-offset-pagination

- Use this style when the API exposes `limit` and `offset` controls.
- Keep limit defaults and maximums close to the paginator logic.
- Prefer typed collection return values or iterator docblocks so callers know what items are yielded.
