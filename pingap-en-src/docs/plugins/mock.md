---
sidebar_position: 93
title: Mock Service
description: Return preset HTTP responses directly from Pingap without needing a backend service. A powerful tool for frontend development, API debugging, simulating errors, and load testing.
---

# Mock Service (Mocking) Plugin

The `mock` plugin can turn Pingap into a configurable Mock Server. When a request hits a `Location` where this plugin is applied, it will **intercept** the request and **directly return a response you have predefined**, without forwarding the request to any upstream service.

## Feature Introduction

The core feature of this plugin is the complete customization of the response. You can precisely control:
* **Status Code**: Return any status code, such as `200 OK`, `404 Not Found`, or `503 Service Unavailable`.
* **Headers**: Add any custom HTTP response headers, like `Content-Type`.
* **Body**: Return a response body with any content, whether it's JSON, HTML, or plain text.
* **Delay**: You can simulate network latency or a slow backend service by adding an artificial delay to the response.

## Use Cases

* **Parallel Frontend and Backend Development**: When the frontend needs an API that the backend hasn't finished yet, you can use the Mock plugin to simulate successful or failed responses for that API, allowing frontend development to proceed without being blocked.
* **API Documentation and Demos**: Provide interactive examples in your API documentation where users can directly call mock endpoints to see the request and response formats.
* **Simulating Error Conditions**: Easily simulate scenarios where the backend service fails (e.g., 5xx errors) to test whether the frontend application's error handling, retry, and circuit-breaker logic is robust.
* **Load and Stress Testing**: When testing clients or load balancers, use the Mock plugin to provide a stable backend with a controllable response time, eliminating interference from the performance fluctuations of a real backend.
* **Temporary Maintenance Page**: During backend service maintenance, you can quickly direct all requests for a specific `Location` to a mock response containing a "system under maintenance" message.

## Configuration Parameters

Configuration is done in the `plugin.mock.toml` file.

| Parameter | Type             | Required | Default   | Description                                                                                                                                                |
| :-------- | :--------------- | :------- | :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status`  | Integer          | No       | `200`     | The HTTP status code of the mock response.                                                                                                                 |
| `data`    | String           | No       | *(empty)* | The content of the mock response body.                                                                                                                     |
| `headers` | Array of Strings | No       | `[]`      | A set of custom HTTP response headers, one per line, in the format `"Key: Value"`.                                                                         |
| `path`    | String           | No       | *(empty)* | **Path Matching**. If set, the plugin will only take effect if the request path **exactly matches** this value. If left empty, it applies to all requests. |
| `delay`   | String           | No       | -         | An artificial delay before returning the response. The format is a time string (e.g., `"500ms"`, `"2s"`).                                                  |

## Complete Example

**Goal**: During development, the frontend needs the `/api/users/me` endpoint to return the current user's information, but the backend has not implemented it yet. At the same time, we need to simulate a `/api/orders` endpoint that can randomly fail.

### 1. Configure the Plugins

We need to create two separate Mock plugin instances.

**`plugin.mock-user-profile.toml` (Simulating a successful response)**:
```toml
# Always return 200 OK
status = 200

# Return fixed JSON data
data = '''
{
  "id": 123,
  "username": "dev_user",
  "email": "dev@example.com",
  "roles": ["ADMIN", "USER"]
}
'''

# Set the response content type to JSON
headers = [
  "Content-Type: application/json; charset=utf-8",
]

# Simulate a 50ms network delay
delay = "50ms"
```

plugin.mock-service-unavailable.toml (Simulating a failure response):

```toml
# Return 503 Service Unavailable
status = 503

# Return a simple error message
data = "The order service is temporarily unavailable. Please try again later."

headers = [
  "Content-Type: text/plain",
  # Add a response header suggesting a retry
  "Retry-After: 60", 
]
```

### 2. Apply the Plugins in Locations

Now, we create two routing rules in location.toml to apply these two plugins respectively.

```toml
# location.toml

# --- Rule 1: Mock User Info Endpoint ---
[locations.route-for-mock-user]
# Exactly match this path
path = "/api/users/me"
# Note: The Mock plugin does not require an upstream
plugins = [
    "mock-user-profile",
]

# --- Rule 2: Mock Unstable Order Service ---
[locations.route-for-mock-order]
path = "/api/orders"
plugins = [
    "mock-service-unavailable",
]
```

## Access Effects

- Requesting User Information: `GET /api/users/me`
  - Pingap will wait for 50ms, then immediately return a 200 OK response with the predefined user JSON data as the body. The request will not touch any backend service at all.

- Requesting the Order Service: `POST /api/orders`
  - Pingap will immediately return a 503 Service Unavailable response with a plain text message as the body and a suggestion for the client to retry after 60 seconds.

This approach allows the frontend team to develop and test completely independently, greatly improving the team's parallel collaboration efficiency.