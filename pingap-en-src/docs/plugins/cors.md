---
sidebar_position: 86 
title: Cross-Origin Resource Sharing (CORS)
description: Easily add Cross-Origin Resource Sharing (CORS) support to your APIs, automatically handling preflight requests and appending the necessary response headers to allow smooth communication for your separated frontend and backend applications.
---

# Cross-Origin Resource Sharing (CORS) Plugin

The `cors` plugin automatically handles Cross-Origin Resource Sharing (CORS) requests initiated by browsers, freeing you from writing complex CORS handling logic in your backend services.

## Feature Introduction

For security reasons, browsers restrict scripts originating from one origin from making requests to another origin. CORS is a W3C standard that allows a server to declare which origins are permitted to access its resources.

The `cors` plugin implements this mechanism in two ways:
1.  **Handling Preflight Requests**: For complex cross-origin requests (e.g., `PUT` methods or requests with custom headers), the browser first sends an `OPTIONS` method "preflight" request. This plugin automatically intercepts and responds to this request, informing the browser that the actual request is safe.
2.  **Appending CORS Response Headers**: For simple requests or actual requests that have passed the preflight check, the plugin appends the necessary `Access-Control-Allow-*` response headers to the final response, authorizing the browser to receive and process it.

With simple configuration, you can precisely control who can access your API, which methods and headers are allowed, and how long preflight results can be cached.

## Use Cases

* **Separated Frontend and Backend Applications**: This is the most typical scenario. When your frontend application (e.g., React, Vue) is deployed at `https://app.example.com` and your backend API service is at `https://api.example.com`, any request from the frontend to the backend is a cross-origin request and must be permitted via a CORS policy.
* **Public APIs Open to Third Parties**: If you provide a public API for third-party developers to call from their websites, you need to configure CORS to authorize these third-party origins.
* **Web Fonts or CDN Resources**: CORS configuration is also required when a webpage needs to load fonts, images, or other resources from a different domain.

## Configuration Parameters

Configuration is done in the `plugin.cors.toml` file.

| Parameter           | Type    | Required | Default            | Description                                                                                                                                                                                   |
| :------------------ | :------ | :------- | :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allow_origin`      | String  | No       | `*`                | The allowed origin domain. Can be `*` (allow any domain), a single domain (e.g., `https://app.example.com`), or a dynamic value `` `{$http_origin}` `` (mirrors the request's Origin header). |
| `allow_methods`     | String  | No       | `"GET, POST, ..."` | A comma-separated list of allowed HTTP methods.                                                                                                                                               |
| `allow_headers`     | String  | No       | *(empty)*          | A comma-separated list of allowed custom request headers, e.g., `Content-Type, X-Token`.                                                                                                      |
| `expose_headers`    | String  | No       | *(empty)*          | A comma-separated list of response headers that frontend JavaScript is allowed to access.                                                                                                     |
| `allow_credentials` | Boolean | No       | `false`            | Whether to allow requests to carry credentials (like Cookies, Authorization headers). Note: If set to `true`, `allow_origin` **cannot** be `*`.                                               |
| `max_age`           | String  | No       | `"1h"`             | The cache duration for preflight request results in the browser, formatted as a time string (e.g., `"10m"`, `"24h"`).                                                                         |
| `path`              | String  | No       | *(empty)*          | A regular expression used to specify that this CORS policy only applies to matching paths.                                                                                                    |

---

## Complete Example

**Goal**: Configure CORS for a project with a separated frontend and backend. The frontend is deployed at `https://app.my-domain.com`, and the API service is accessed via the `/api/` path. The API needs to handle `GET`, `POST`, `PUT` requests and use two custom headers: `Content-Type` and `X-Auth-Token`.

1.  **Configure the plugin (`plugin.cors-webapp.toml`)**:
    ```toml
    # Only enable CORS for requests under the /api/ path
    path = "^/api/"

    # Only allow cross-origin requests from our frontend application
    # Using {$http_origin} can support multiple environments, e.g., dev/staging/production
    allow_origin = "[https://app.my-domain.com](https://app.my-domain.com)"
    
    # Allowed HTTP methods for the frontend application
    allow_methods = "GET, POST, PUT, OPTIONS"
    
    # Allowed custom headers sent by the frontend
    allow_headers = "Content-Type, X-Auth-Token"
    
    # Allow the frontend to access the X-Request-ID header in the response for debugging
    expose_headers = "X-Request-ID"
    
    # Allow cross-origin requests to carry and set cookies
    allow_credentials = true
    
    # Cache preflight results for 24 hours to reduce OPTIONS requests
    max_age = "24h"
    ```

2.  **Apply the plugin in a Location (`location.toml`)**:
    ```toml
    # ...
    [locations.route-for-my-app]
    upstream = "api-backend"
    plugins = [
        "cors-webapp",
    ]
    # ...
    ```

### Access Effects

* When the frontend application at `https://app.my-domain.com` sends a `PUT` request with an `X-Auth-Token` to `/api/users`:
    1.  The browser automatically sends an `OPTIONS /api/users` preflight request.
    2.  Pingap's CORS plugin intercepts this request, checks the configuration, and returns a `204 No Content` response with `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`, and other headers.
    3.  After the browser validates the preflight response, it sends the actual `PUT /api/users` request.
    4.  When the `api-backend` service returns a response, the CORS plugin intervenes again, adding headers like `Access-Control-Allow-Origin: https://app.my-domain.com` to the final response before sending it back to the browser.