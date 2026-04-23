# Multipart Form Body

Source page: https://docs.saloon.dev/the-basics/request-body-data/multipart-form-body

- Use `HasMultipartBody` with `HasBody`.
- Saloon sets `Content-Type: multipart/form-data` automatically.
- Use `Saloon\Data\MultipartValue` for file attachments and multipart fields.
- Multipart bodies support attachment-specific helpers in addition to the usual mutation methods.
