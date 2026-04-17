# php-saloon References

## Custom Guidance

- `standalone-sdk-guidance.md`: package-level guidance for standalone SDKs, DTO policy, Laravel packaging, caching, rate limiting, middleware, tests, and exceptions

## The Basics

- `installation.md`: install Saloon and set up the first integration
- `connectors.md`: connector responsibilities and shared defaults
- `requests.md`: request classes, endpoints, and request input
- `sending-requests.md`: sync and async send flow
- `authentication.md`: authenticators and auth placement
- `request-body-overview.md`: choosing and composing request body styles
- `request-body-json.md`: JSON body rules
- `request-body-multipart.md`: multipart uploads and attachments
- `request-body-form.md`: form-url-encoded bodies
- `request-body-string.md`: plain-text bodies
- `request-body-stream.md`: stream bodies
- `request-body-xml.md`: XML bodies
- `responses.md`: response helpers and custom responses
- `handling-failures.md`: failure detection and exception flow
- `debugging.md`: request and response inspection
- `testing.md`: mocks, fixtures, and test guardrails

## Digging Deeper

- `building-sdks.md`: Saloon's SDK guidance around connectors, resources, and custom responses
- `data-transfer-objects.md`: DTO mapping patterns and `dto()` flow
- `middleware.md`: boot hooks, request middleware, and response middleware
- `oauth2-overview.md`: shared OAuth2 setup
- `oauth2-auth-code.md`: authorization-code flow
- `oauth2-client-credentials.md`: client-credentials flow
- `concurrency-and-pools.md`: pools and concurrent request handling
- `retrying-requests.md`: retries and backoff
- `delay.md`: delaying requests
- `solo-requests.md`: single-request integrations without a connector
- `psr-support.md`: PSR request and response customization

## Installable Plugins

- `pagination-overview.md`: pagination plugin overview
- `pagination-paged.md`: page-number pagination
- `pagination-limit-offset.md`: limit/offset pagination
- `pagination-cursor.md`: cursor pagination
- `pagination-custom.md`: custom paginator implementations
- `caching-responses.md`: cache plugin guidance
- `handling-rate-limits.md`: rate-limit plugin guidance
- `laravel-integration.md`: Laravel plugin, commands, and test helpers
- `building-your-own-plugins.md`: plugin authoring guidance
- `xml-wrangler.md`: XML Wrangler integration points
- `lawman.md`: architecture testing with Lawman
- `sdk-generator.md`: SDK generator scope and caveats

## Upgrades

- `supported-versions.md`: version support policy
- `upgrading-v2-to-v3.md`: major migration notes from v2 to v3
- `upgrading-v3-to-v4.md`: major migration notes from v3 to v4
