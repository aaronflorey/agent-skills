# Request Body Overview

Source page: https://docs.saloon.dev/the-basics/request-body-data

To send body data, Saloon expects:
- a write method like `POST`, `PUT`, or `PATCH`
- the `HasBody` contract
- a body trait matching the payload type

Available body styles include JSON, multipart, form, string, stream, and XML.

Use the body type that matches the upstream API instead of forcing everything through JSON.
