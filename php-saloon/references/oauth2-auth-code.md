# OAuth2 Authorization Code Flow

Source page: https://docs.saloon.dev/digging-deeper/oauth2-authentication/oauth2-authentication

- Generate the authorization URL with `getAuthorizationUrl()`.
- Store and verify the returned state.
- Exchange the callback code with `getAccessToken()`.
- Refresh expired tokens with `refreshAccessToken()`.
- Treat tokens and refresh workflow as infrastructure, not ad hoc logic inside request classes.
