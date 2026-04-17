# Cursor Pagination

Source page: https://docs.saloon.dev/installable-plugins/pagination/cursor-pagination

- Use this style when the API returns cursor tokens rather than numeric pages.
- Treat cursors as opaque values from the upstream API.
- Keep cursor extraction and next-page logic centralized in the paginator implementation.
