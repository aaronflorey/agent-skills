# OAuth2 Overview

Source page: https://docs.saloon.dev/digging-deeper/oauth2-authentication

- Saloon documents shared OAuth2 setup around connector traits and `defaultOauthConfig()`.
- Keep credentials on the connector so token acquisition stays centralized.
- Override scopes, endpoints, and request customization through the OAuth config hooks.
- Use typed credential objects when packaging OAuth-enabled SDKs.
