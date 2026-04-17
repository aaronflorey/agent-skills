# Authentication

Source page: https://docs.saloon.dev/the-basics/authentication

Documented authenticators include:
- `TokenAuthenticator`
- `BasicAuthenticator`
- `QueryAuthenticator`
- `CertificateAuthenticator`
- `HeaderAuthenticator`
- `MultiAuthenticator`

Guidance:
- Use `defaultAuth()` for integration-wide auth.
- Use `authenticate()` when auth must change at runtime.
- Prefer strongly typed auth inputs on the connector constructor.
- Keep auth policy centralized so request classes stay focused on endpoint behavior.
