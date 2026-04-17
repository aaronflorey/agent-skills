# OAuth2 Client Credentials Flow

Source page: https://docs.saloon.dev/digging-deeper/oauth2-authentication/client-credentials-grant

- Use `getAccessToken()` to acquire an `AccessTokenAuthenticator`.
- Cache the authenticator securely if it will be reused.
- Keep client credentials in typed config or auth DTOs.
- Use this flow for machine-to-machine APIs rather than end-user authorization.
