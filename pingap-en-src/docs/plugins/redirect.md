---
sidebar_position: 95
title: HTTP Redirect
description: Easily implement forced HTTP to HTTPS redirection or add a uniform prefix to URL paths. Ensures the original request method and body are preserved after the redirect by sending a 307 Temporary Redirect response.
---

# HTTP Redirect Plugin

The `redirect` plugin is a request-phase plugin that intercepts matching requests and returns an HTTP redirect response (status code `307 Temporary Redirect`) to the client, guiding the browser or client to a new URL.

## Feature Introduction

The core function of this plugin is to **generate and return a redirect instruction** without forwarding the request to any upstream service. You can configure it to implement two main types of redirect logic:

1.  **Scheme Redirect**: The most common use is to forcibly redirect all `http://` requests to `https://`, ensuring an encrypted connection is used at all times.
2.  **Path Prefix**: Automatically adds a specified prefix to the request's URL path. For example, redirecting a request for `/orders` to `/api/v1/orders`.

Both types of logic can be active **simultaneously**.

### Why use a `307` Redirect?
Unlike the common `301` (Permanent) or `302` (Found) redirects, the `307 Temporary Redirect` explicitly requires that the client **must preserve the original request method and body** when making the new request to the redirected address. This means that if the original request was a `POST` or `PUT`, the redirected request will also be a `POST` or `PUT`, effectively preventing data loss or request failures, which is especially suitable for handling API requests.

## Use Cases

* **Forcing HTTPS**: This is the most common and important security practice. By redirecting all HTTP traffic to HTTPS, you can prevent man-in-the-middle attacks and protect data in transit.
* **URL Normalization**: Ensure all users access your service through a single, canonical URL path. For example, redirecting old, un-versioned API paths to new, versioned paths (`/users` -> `/api/v2/users`).
* **Domain Migration or Refactoring**: When a website or service is being refactored and the URL structure changes, use redirects to smoothly guide users and search engines to the new addresses. (Note: This plugin does not handle domain name changes, only scheme and path).

## Configuration Parameters

Configuration is done in the `plugin.redirect.toml` file.

| Parameter       | Type    | Required | Default   | Description                                                                                                                     |
| :-------------- | :------ | :------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `http_to_https` | Boolean | No       | `false`   | Whether to redirect `http` requests to `https`. Set to `true` to force HTTPS.                                                   |
| `prefix`        | String  | No       | *(empty)* | A string prefix to add to the beginning of the URL path. If configured, it will be automatically formatted to start with a `/`. |

---

## Complete Examples

### Example 1: Force All Traffic to Use HTTPS

**Goal**: We want all access to our website to be over HTTPS. Any user visiting via `http://` should be automatically redirected to the corresponding `https://` page.

1.  **Configure the plugin (`plugin.force-https.toml`)**:
    ```toml
    # Enable http to https redirection
    http_to_https = true
    
    # In this scenario, we are not modifying the path, so the prefix is omitted
    ```

2.  **Apply the plugin in a Location (`location.toml`)**:
    > 💡 **Important**: This plugin should be applied in an HTTP `Server` that **only listens on port 80**, as it only processes HTTP requests that need to be redirected.

    ```toml
    # location.toml

    # --- Rule 1: HTTP Redirect Rule ---
    [locations.http-redirect-rule]
    # Match all HTTP requests
    path = "/"
    # Note: This Location is handled directly by the plugin, so no upstream is needed
    plugins = [
        "force-https",
    ]
    ```

### Access Effects
* When a user visits `http://example.com/dashboard?tab=1`:
    * Pingap will return a `307 Temporary Redirect` response.
    * The response header will include `Location: https://example.com/dashboard?tab=1`.
    * The user's browser will automatically redirect to the new HTTPS address, with the URL path and query parameters remaining unchanged.

### Example 2: Force HTTPS and Add an API Version Prefix

**Goal**: All of our APIs must be accessed over HTTPS, and all paths must start with `/api/v2`.

1.  **Configure the plugin (`plugin.redirect-api.toml`)**:
    ```toml
    # Enable http to https redirection
    http_to_https = true
    
    # Add a path prefix
    prefix = "/api/v2"
    ```

2.  **Apply the plugin in a Location (`location.toml`)**:
    ```toml
    # location.toml

    # --- Again, this rule is applied to an HTTP Server listening only on port 80 ---
    [locations.api-redirect-rule]
    path = "/"
    plugins = [
        "redirect-api",
    ]
    ```

### Access Effects
* When a `POST` request is sent to `http://example.com/users`:
    * Pingap will return a `307 Temporary Redirect` response.
    * The `Location` header will be `https://example.com/api/v2/users`.
    * The client will automatically re-issue the request to the new address using the `POST` method, and the request body data will not be lost.