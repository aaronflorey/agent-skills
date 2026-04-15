# Upgrades

## Supported Versions

- The docs say the newest release is `v4`.
- `v4` is described as a security-only release.
- `v2` is marked end of life.
- `v3` continues to receive non-breaking security updates until `17th March 2027`.

## Upgrading From v3 To v4

Update dependencies to `^4.0` and then run:

```bash
composer update "saloonphp/*"
```

The docs describe `v4` as resolving three breaking CVE issues published on `25th March 2026`:
- insecure deserialisation in `AccessTokenAuthenticator`
- absolute URL endpoint override causing SSRF or credential leakage
- fixture-name path traversal

Breaking changes called out by the docs:
- `AccessTokenAuthenticator` serialization and unserialization methods were removed.
- Laravel plugin casts `OAuthAuthenticatorCast` and `EncryptedOAuthAuthenticatorCast` were removed.
- Fully qualified URLs in `resolveEndpoint()` no longer override the connector base URL by default; this is now opt-in.
- Fixture path traversal like `../` and `~` is now restricted.

Migration guidance from the docs:
- Store `accessToken`, `refreshToken`, and `expiresAt` directly instead of serializing the authenticator.
- Review any code that depended on full-URL endpoint overrides.
- Review any fixture path customization.

## Upgrading From v2 To v3

Update Saloon and related plugins, then run:

```bash
composer update "saloonphp/*"
```

High-impact changes mentioned in the docs:
- minimum TLS version moved to `TLS 1.2`
- pagination moved out of core and into a plugin
- `Config` and `MockConfig` moved from `Saloon\Helpers` to the root namespace
- many interfaces were removed in favor of abstract classes
- `HasBody` trait was renamed to `HasStringBody`

Examples called out by the docs:
- `Saloon\Contracts\Connector` to `Saloon\Http\Connector`
- `Saloon\Contracts\Request` to `Saloon\Http\Request`
- `Saloon\Contracts\PendingRequest` to `Saloon\Http\PendingRequest`
- `Saloon\Contracts\Response` to `Saloon\Http\Response`

Other upgrade notes mentioned in the docs:
- `sendAndRetry()` renamed the named argument `maxAttempts` to `tries`
- some `Config` methods were renamed, including `resetMiddleware()` to `clearGlobalMiddleware()`
- `MockResponse` method names were normalized
- the old `SimulatedResponsePayload` naming changed to `FakeResponse`
- custom senders need updating because the sender interface changed
- helper renames include `Str` to `StringHelpers` and `Arr` to `ArrayHelpers`

## Upgrade Risks Worth Checking

- Any code that serialized OAuth authenticators
- Any request or solo request that used user-controlled full URLs
- Any custom fixture path logic
- Any custom pagination code carried over from older versions
- Any imports that still use removed interfaces or old helper namespaces
