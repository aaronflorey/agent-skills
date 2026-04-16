# Integrations And Self-Hosting

## GitHub Integration

- Shields serves many badges backed by the GitHub API.
- Users can authorize the Shields.io GitHub OAuth app to share a read-only token for public data.
- The shared token pool helps Shields increase GitHub API rate limits.
- If a user wants to stop sharing a token, they can revoke the Shields.io OAuth app in GitHub settings.

## Self-Hosted And Alternate Services

- Some badge pages support alternate or self-hosted services.
- Gitea badges can target another instance, including Codeberg, Forgejo, or a self-hosted instance, using `gitea_url`.
- Sonar badges work with both SonarCloud and self-hosted SonarQube when given the correct protocol and path.
- Shields can be hosted behind a firewall with its Docker image.

## Libraries And Project Integrations

- Shields exposes a Badge-Maker NPM library for rendering badges in your own application.
- The catalog includes integrations for services such as Open Collective, Weblate, Packagist, and many package registries, CI systems, and code analysis services.

## Related References

- `core-patterns.md` for shared URL parameters and filters
- `upgrades.md` for self-hosted security upgrade notes
- `badges.md` for service-specific integration details
