---
sidebar_position: 91
title: API Key Auth
description: Protect your services by validating API Keys in HTTP headers or URL query parameters. Supports credential hiding and brute-force defense, a common method for securing APIs.
---

# API Key Auth Plugin

The `key-auth` plugin is a request-phase authentication plugin that protects your upstream services by verifying a preset **API Key**. Only requests carrying a valid key will be allowed access.

## Feature Introduction

This plugin intercepts incoming requests, looks for an API key in a specified location, and then compares it against a secure list of keys.

#### Key Delivery Methods
You can flexibly choose one of the following **two methods** for the client to transmit the API key:
1.  **HTTP Request Header**: Carry the key in a request header, for example, `X-Api-Key: my-secret-key`. This is the most common and more secure method.
2.  **URL Query Parameter**: Append the key to the URL's query string, for example, `https://api.example.com/data?api_key=my-secret-key`.

#### Security Features
* **Brute-Force Defense**: You can configure a **delay** for failed validation attempts, effectively increasing the cost of automated attacks.
* **Credential Hiding**: After successful authentication, the API key can be automatically **removed** from the request, preventing it from being leaked to upstream services or logs.
* **Distinct Error Responses**: Returns different error messages for "key missing" versus "key invalid" failures, making it easier for clients to debug.

## Use Cases

* **Protecting Public or Partner APIs**: Add an entry barrier for APIs you provide to third-party developers or partners. You can assign a unique API key to each consumer.
* **Internet of Things (IoT) Device Authentication**: In many IoT scenarios, devices use a fixed API key to identify themselves to the server.
* **Internal Service-to-Service Authentication**: In a microservices architecture, calls between services can be authenticated using simple API keys.

## Configuration Parameters

Configuration is done in the `plugin.key-auth.toml` file.

| Parameter          | Type             | Required                 | Default | Description                                                                                                                                                                |
| :----------------- | :--------------- | :----------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `header` / `query` | String           | **Yes** (one of the two) | -       | **(Required)** Specifies the location of the key. `header`: the name of the HTTP request header; `query`: the name of the URL query parameter. Only one can be configured. |
| `keys`             | Array of Strings | **Yes**                  | `[]`    | **(Required)** A list containing all valid API keys.                                                                                                                       |
| `hide_credentials` | Boolean          | No                       | `false` | After successful authentication, whether to **remove** the API key from the request. **It is strongly recommended to enable this (`true`)**.                               |
| `delay`            | String           | No                       | -       | Introduces a delay for **invalid** key validation attempts, for example, `"200ms"` or `"1s"`, to defend against brute-force attacks.                                       |

---

## Complete Examples

### Example 1: Authentication via Request Header (Recommended)

**Goal**: Protect all endpoints under `/api/v1/`, requiring clients to provide a valid key in the `X-Api-Key` request header.

1.  **Configure the plugin (`plugin.key-auth-header.toml`)**:
    ```toml
    # Specify reading the key from the "X-Api-Key" request header
    header = "X-Api-Key"
    
    # Define two valid API keys
    keys = [
      "key-for-user-A",
      "key-for-user-B",
    ]

    # Hide the key after successful authentication
    hide_credentials = true

    # Delay failed attempts by 500 milliseconds
    delay = "500ms"
    ```

2.  **Apply the plugin in a Location (`location.toml`)**:
    ```toml
    # ...
    [locations.route-for-my-app]
    path = "/api/v1/"
    upstream = "api-backend"
    plugins = [
        "key-auth-header",
    ]
    # ...
    ```

### Access Effects

* **Successful Request**:
  `curl -H "X-Api-Key: key-for-user-A" http://your-domain.com/api/v1/data`
  > The request will be successfully forwarded to `api-backend`, and the `X-Api-Key` header will **not** be included in the forwarded request.

* **Invalid Key**:
  `curl -H "X-Api-Key: invalid-key" http://your-domain.com/api/v1/data`
  > Pingap will wait for 500 milliseconds, then return a `401 Unauthorized` with the error message `Key auth fail`.

* **Missing Key**:
  `curl http://your-domain.com/api/v1/data`
  > Pingap will immediately return a `401 Unauthorized` with the error message `Key missing`.

### Example 2: Authentication via Query Parameter

**Goal**: To support some legacy clients that cannot set request headers, we will allow authentication via the `apiKey` URL query parameter.

1.  **Configure the plugin (`plugin.key-auth-query.toml`)**:
    ```toml
    # Specify reading the key from the "apiKey" query parameter
    query = "apiKey"
    
    # Define a valid API key
    keys = [
      "legacy-client-key",
    ]

    # Remove the apiKey parameter from the URL after successful authentication
    hide_credentials = true
    ```

2.  **Apply the plugin in a Location (`location.toml`)**:
    ```toml
    # ...
    [locations.route-for-legacy-app]
    path = "/legacy-api/"
    upstream = "legacy-backend"
    plugins = [
        "key-auth-query",
    ]
    # ...
    ```

### Access Effects
* **Successful Request**:
  `curl "http://your-domain.com/legacy-api/data?apiKey=legacy-client-key&param=1"`
  > The request will be successfully forwarded to `legacy-backend`, and the forwarded URL will become `/legacy-api/data?param=1`, with the `apiKey` parameter successfully removed.