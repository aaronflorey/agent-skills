# Solo Requests

Source page: https://docs.saloon.dev/digging-deeper/solo-requests

- Use `Saloon\Http\SoloRequest` when a full connector is unnecessary.
- A solo request must resolve the full URL itself.
- Solo requests can still define headers, config, query parameters, and body data.
- Do not feed unvalidated user input directly into the endpoint URL because of SSRF risk.
