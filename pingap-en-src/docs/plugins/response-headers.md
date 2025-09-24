---
sidebar_position: 98
title: Response Headers
description: Dynamically add, set, remove, rename, or conditionally set HTTP response headers before sending the response to the client. Used to enhance security, control caching, and add custom metadata.
---

# Response Headers Plugin

The `response-headers` plugin is a powerful and flexible response handling plugin that allows you to perform comprehensive add, remove, modify, and query operations on HTTP response headers before they are sent to the client.

## Feature Introduction

This plugin intervenes at the response phase to manipulate `ResponseHeaders` according to the rules you define. It supports five core operations:

1.  **Add (`add_headers`)**: **Appends** a new header to the response. If a header with the same name already exists, this operation will **keep** the original value and **add** a new header with the same name. This is suitable for response headers that can have multiple values (like `Set-Cookie`).
2.  **Set (`set_headers`)**: **Sets** the exact value of a header. If a header with the same name already exists, its value will be **completely overwritten**; if it doesn't exist, it will be created.
3.  **Remove (`remove_headers`)**: **Completely removes** one or more specified headers from the response.
4.  **Rename (`rename_headers`)**: **Renames** an existing header to a new name, while keeping its value unchanged.
5.  **Set if Not Exists (`set_headers_not_exists`)**: **Only sets** a specified header **if it does not already exist**. If it exists, no action is taken.

Additionally, all "add" and "set" operations support the use of **dynamic variables** (like `{$hostname}`, `{:connection_id}`), allowing you to inject dynamic contextual information.

## Use Cases

* **Enhancing Security**:
    * **Remove** sensitive information headers, such as `X-Powered-by` or other headers that expose the backend technology stack.
    * **Set** security-related headers, such as `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, etc.
* **Cache Control**:
    * Dynamically **set** `Cache-Control` or `Expires` headers to finely control browser and CDN caching policies for different resource paths.
* **Custom Metadata**:
    * **Add** custom debugging headers, such as `X-Trace-Id` (obtained from the request context), `X-Server-Name` (from environment variables), or `X-Upstream-Response-Time`.
* **Standardization and Compatibility**:
    * **Rename** non-standard headers returned by the backend service to standard ones to improve client compatibility.

## Configuration Parameters

Configuration is done in the `plugin.response-headers.toml` file.

| Parameter                | Type             | Required | Description                                                                               |
| :----------------------- | :--------------- | :------- | :---------------------------------------------------------------------------------------- |
| `add_headers`            | Array of Strings | No       | **Appends** a response header. Format: `"Key: Value"`.                                    |
| `set_headers`            | Array of Strings | No       | **Sets/overwrites** a response header. Format: `"Key: Value"`.                            |
| `remove_headers`         | Array of Strings | No       | **Removes** a response header. Format: `"Key"`.                                           |
| `rename_headers`         | Array of Strings | No       | **Renames** a response header. Format: `"Old-Key: New-Key"`.                              |
| `set_headers_not_exists` | Array of Strings | No       | **Sets** a response header **only if it does not already exist**. Format: `"Key: Value"`. |
| `mode`                   | String           | No       | `"response"`. Defines whether the plugin executes in the `upstream` or `response` phase.  |

---

## Complete Example

**Goal**: Standardize and harden the responses for our web application's API.
1.  Remove the `X-Powered-By` header that exposes backend information.
2.  Add a `X-Content-Type-Options: nosniff` security header to all responses.
3.  Ensure all responses have an `X-Request-ID`. If the backend doesn't provide one, we'll add it using Pingap's request ID.
4.  Rename the `X-Svc-Version` header from the backend to the standard `X-Service-Version`.

#### 1. Configure the plugin (`plugin.response-headers-security.toml`)
```toml
# 1. Remove insecure headers
remove_headers = [
  "X-Powered-By",
]

# 2. Always set security headers (overwrites if they already exist)
set_headers = [
  "X-Content-Type-Options: nosniff",
  "X-Frame-Options: DENY",
]

# 3. If X-Request-ID does not exist, use Pingap's request ID
# {:request_id} is a dynamic variable that will be automatically replaced
set_headers_not_exists = [
  "X-Request-ID: {:request_id}",
]

# 4. Rename the backend service's version header
rename_headers = [
  "X-Svc-Version: X-Service-Version",
]
```

#### 2. Apply the plugin in a Location (location.toml)

```toml
# location.toml
[locations.route-for-my-app]
path = "/api/"
upstream = "api-backend"
plugins = [
    # Ensure the request-id plugin runs before this one
    "request-id-api", 
    "response-headers-security",
]
```

## Access Effects

Let's assume the backend service (api-backend) returns the following original headers for a request:

```
HTTP/1.1 200 OK
Content-Type: application/json
X-Powered-By: Express
X-Svc-Version: 1.2.3
```

After being processed by the `response-headers` plugin, the final response headers received by the client will be:


```
HTTP/1.1 200 OK
Content-Type: application/json
X-Service-Version: 1.2.3
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-Request-ID: <pingap-generated-id>
```

Analysis of Header Processing:

- `X-Powered-By` was successfully removed.
- `X-Content-Type-Options` and `X-Frame-Options` were successfully set.
- `X-Svc-Version` was renamed to `X-Service-Version`.
- Because the original response did not include an `X-Request-ID`, the plugin successfully added it using `set_headers_not_exists`.