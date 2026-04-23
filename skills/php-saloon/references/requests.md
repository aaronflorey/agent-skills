# Requests

Source page: https://docs.saloon.dev/the-basics/requests

- Extend `Saloon\Http\Request`.
- Define the HTTP method and `resolveEndpoint()`.
- Keep endpoint-specific headers, query parameters, and body defaults on the request.
- Accept resource identifiers or request DTOs in the constructor instead of scattering raw arrays.
- Keep requests small and focused on one API endpoint.
