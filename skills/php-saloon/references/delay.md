# Delay

Source page: https://docs.saloon.dev/digging-deeper/delay

- Saloon supports delaying requests before send.
- Use delays for API etiquette or workflow sequencing, not as a substitute for real rate-limit handling.
- Prefer explicit rate-limit policies when the upstream service documents limits or returns `429` responses.
