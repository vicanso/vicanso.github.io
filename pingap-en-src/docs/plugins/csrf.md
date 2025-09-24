---
sidebar_position: 87
title: CSRF Protection
description: Protect your web application from Cross-Site Request Forgery (CSRF) attacks by implementing the "Double Submit Cookie" pattern, ensuring all state-changing requests originate from legitimate users.
---

# CSRF Protection Plugin

The `csrf` plugin is a request-phase security plugin that provides robust Cross-Site Request Forgery (CSRF/XSRF) protection for your web application using the **Double Submit Cookie** pattern.

## Feature Introduction

Cross-Site Request Forgery (CSRF) is a common web attack where an attacker tricks a logged-in user into unknowingly sending a malicious, state-changing request from the user's browser (e.g., transferring funds, changing a password, deleting data).

This plugin counters such attacks through the following process:
1.  **Token Distribution**: The client (usually a frontend application) first makes a request to a designated path (e.g., `/api/csrf-token`). The plugin then generates a unique, cryptographically signed CSRF token.
2.  **Set Cookie**: This token is automatically stored in the user's browser via a `Set-Cookie` response header. This cookie is **not readable** by JavaScript, enhancing security.
3.  **Double Submit Validation**:
    * For all **unsafe** HTTP requests (e.g., `POST`, `PUT`, `DELETE`), the frontend application must read the token value and place it in a custom HTTP **header** (e.g., `X-CSRF-Token`) to be sent with the request.
    * Upon receiving the request, the plugin checks both the token in the cookie and the token in the header. **Only if both exist and are identical** is the request considered legitimate.

Because an attacker cannot read or set a cookie under another domain, nor can they add custom headers to cross-domain requests, they cannot forge this "double submit" process, effectively preventing CSRF attacks.

## Use Cases

* **All Web Applications Using Cookie/Session Authentication**: If your application uses cookies to maintain user login states, all interfaces that change data (e.g., form submissions, money transfers, profile modifications) should be protected against CSRF.
* **Single Page Applications (SPAs)**: For SPAs built with frameworks like React, Vue, or Angular, a common integration pattern is to fetch the CSRF token upon initialization and configure the HTTP client (like Axios) to automatically include the token in all subsequent state-changing requests.

## Configuration Parameters

Configuration is done in the `plugin.csrf.toml` file.

| Parameter    | Type   | Required | Default           | Description                                                                                                                                                            |
| :----------- | :----- | :------- | :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`        | String | **Yes**  | -                 | A **top-secret** string key used to cryptographically sign the CSRF token. It must be sufficiently complex and random. **All Pingap instances must use the same key.** |
| `token_path` | String | **Yes**  | -                 | The API path for the frontend application to fetch a new CSRF token, e.g., `"/api/csrf-token"`. Requests to this path will return a new token.                         |
| `name`       | String | No       | `"x-csrf-token"`  | The name for the cookie and HTTP request header used to store the CSRF token.                                                                                          |
| `ttl`        | String | No       | *(Never expires)* | The token's validity period, formatted as a time string (e.g., `"1h"`, `"24h"`). The token will become invalid after it expires.                                       |

---

## Complete Example

**Goal**: Provide CSRF protection for all APIs (`/api/`) of a web application.

1.  **Generate a secure key**:
    ```bash
    # Use openssl to generate a random, secure key
    openssl rand -base64 32
    ```
    > **Example Output**: `aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890/=+` (Please use your own generated key)

2.  **Configure the plugin (`plugin.csrf-api.toml`)**:
    ```toml
    # Key that must be shared across all Pingap instances
    key = "aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890/="
    
    # Endpoint for the frontend to fetch the token
    token_path = "/api/csrf-token"
    
    # Custom token name
    name = "X-CSRF-TOKEN"
    
    # Token is valid for 24 hours
    ttl = "24h"
    ```

3.  **Apply the plugin in a Location (`location.toml`)**:
    ```toml
    # ...
    [locations.route-for-my-app]
    # Match all API requests
    path = "/api/"
    upstream = "api-backend"
    plugins = [
        "csrf-api",
    ]
    # ...
    ```

### Frontend Integration Workflow

1.  **Fetch Token**: After the frontend application loads, it sends a `GET /api/csrf-token` request.
    * Pingap will return a `204 No Content` response with a `Set-Cookie: X-CSRF-TOKEN=...; Path=/; Max-Age=86400` header. The browser will automatically store this cookie.

2.  **Send Request**: When the user performs a protected action (e.g., submitting a POST form to `/api/settings`):
    * Frontend JavaScript needs to read the value of `X-CSRF-TOKEN` from the cookie (`document.cookie`).
    * Place the retrieved token value into an HTTP header with the same name.
    * Send the request.

3.  **Validation Process**:
    * For `GET /api/csrf-token` requests, the plugin always generates and returns a new token.
    * For safe requests like `GET`, `HEAD`, and `OPTIONS`, the plugin skips the check.
    * For a `POST /api/settings` request, the plugin will:
        * Compare the `X-CSRF-TOKEN` from the cookie and the `X-CSRF-TOKEN` from the request header for equality.
        * Verify the token's own signature and expiration.
        * If validation passes, the request is forwarded to `api-backend`. If it fails, a `401 Unauthorized` is returned immediately.