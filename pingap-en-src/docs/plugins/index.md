---
sidebar_position: 81
title: Plugin Overview and Index
description: Discover Pingap's powerful plugin ecosystem and use the overview list to quickly find detailed documentation for all available plugins, including authentication, security, caching, and rate limiting.
---

# Plugin Overview and Index

`Pingap`'s plugin system is the embodiment of its core extension capabilities. By combining different plugins, you can add rich functionalities to your APIs and services—such as authentication, security protection, performance optimization, and traffic control—without modifying `Pingap`'s core code.

### How It Works

1.  **Independent Configuration**: Each plugin's configuration is stored in a separate TOML file (e.g., `plugin.jwt.toml`, `plugin.cache.toml`), keeping it separate from the main configuration for easy management.
2.  **Applied to a Location**: In the `location.toml` file, you can apply one or more plugin instances to a specific routing rule using the `plugins` array.
3.  **Sequential Execution**: Plugins in the `plugins` array are executed sequentially in the **order they are declared**. This means you can carefully arrange the execution order of plugins to implement complex logic chains (for example, apply IP restriction first, then JWT authentication).

---

## Available Plugin List

Below is a list of all official plugins currently supported by Pingap. Click "View Details" to get the complete configuration parameters and usage examples for each plugin.

| Plugin                        | Core Function                                                                                                                                                                                                                      | Configuration Docs                       |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| Accept Encoding Plugin        | Adjusts the `Accept-Encoding` request header before forwarding a request to an upstream service.                                                                                                                                   | [View Details](./accept-encoding.md)     |
| Basic Auth Plugin             | Adds HTTP Basic Auth authentication based on username and password to your services.                                                                                                                                               | [View Details](./basic-auth.md)          |
| Cache Plugin                  | Caches responses from upstream services to dramatically improve the performance of frequently accessed APIs and effectively reduce the load on backend services.                                                                   | [View Details](./cache.md)               |
| Compression Plugin            | Automatically performs **dynamic compression** on the response body sent to the client, based on the client's support.                                                                                                             | [View Details](./compression.md)         |
| CORS Plugin                   | Adds CORS support to your services, allowing clients from other domains to access your services.                                                                                                                                   | [View Details](./cors.md)                |
| CSRF Plugin                   | Adds CSRF protection to your services to prevent cross-site request forgery.                                                                                                                                                       | [View Details](./csrf.md)                |
| Directory Plugin              | Transforms a `Location` in `Pingap` into a powerful static file server, serving files directly from the disk without forwarding requests to an upstream backend.                                                                   | [View Details](./directory.md)           |
| IP Restriction Plugin         | Provides access control based on IP addresses, supporting both allow and deny modes, and can be configured with single IP addresses or CIDR network ranges.                                                                        | [View Details](./ip-restriction.md)      |
| JWT Plugin                    | Protects your APIs and services by validating JSON Web Tokens (JWT). The plugin supports multiple token delivery methods, signing algorithms, and can convert backend authentication logic into stateless JWT tokens.              | [View Details](./jwt.md)                 |
| Key Auth Plugin               | Provides a simple API key authentication mechanism, supporting fetching authentication information from request parameters (query) or headers. Multiple valid keys can be configured for easy multi-system access.                 | [View Details](./key-auth.md)            |
| Rate Limit Plugin             | Protects your upstream services from traffic spikes and malicious attacks by limiting the request rate or concurrent connections per unit of time, ensuring service stability and fairness.                                        | [View Details](./limit.md)               |
| Mock Plugin                   | Directly returns preset HTTP responses from Pingap without needing a backend service. A powerful tool for frontend development, API debugging, simulating exceptions, and conducting load tests.                                   | [View Details](./mock.md)                |
| Ping Plugin                   | Adds a health check endpoint to your service.                                                                                                                                                                                      | [View Details](./ping.md)                |
| Redirect Plugin               | Easily implement forced HTTP to HTTPS redirection or add a uniform prefix to URL paths. Ensures the original request method and body are preserved after the redirect by sending a 307 Temporary Redirect response.                | [View Details](./redirect.md)            |
| Referer Restriction Plugin    | Implements access control based on the origin of requests by checking the HTTP Referer header. Effectively prevents hotlinking of resources like images and videos, and can restrict API calls to trusted websites only.           | [View Details](./referer-restriction.md) |
| Request ID Plugin             | Attaches a unique identifier to each incoming request for distributed tracing, log correlation, and troubleshooting, a key component in enhancing system observability.                                                            | [View Details](./request-id.md)          |
| Response Headers Plugin       | Dynamically adds, sets, removes, renames, or conditionally sets HTTP response headers before sending the response to the client. Used to enhance security, control caching, and add custom metadata.                               | [View Details](./response-headers.md)    |
| Sub Filter Plugin             | Performs real-time find-and-replace on response body content. Supports simple string substitution and powerful regular expression replacement for dynamically modifying HTML, JSON, or other text content.                         | [View Details](./sub-filter.md)          |
| Traffic Splitting Plugin      | Dynamically routes traffic to different upstream services based on a specified percentage. A powerful tool for implementing A/B testing, gradual rollouts, and canary releases, with support for cookie-based session persistence. | [View Details](./traffic-splitting.md)   |
| User Agent Restriction Plugin | Implements access control for specific clients, crawlers, or scanners by inspecting the HTTP User-Agent header. Supports powerful regular expression matching and can be configured in blacklist or whitelist mode.                | [View Details](./ua-restriction.md)      |

### New Plugins

If you have a great idea for a plugin, feel free to visit our [GitHub repository](https://github.com/vicanso/pingap) and submit an `Issue`!