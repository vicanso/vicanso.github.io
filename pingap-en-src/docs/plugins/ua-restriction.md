---
sidebar_position: 100
title: User-Agent Restriction
description: Implement access control for specific clients, crawlers, or scanners by inspecting the HTTP User-Agent header. Supports powerful regular expression matching and can be configured in blacklist or whitelist mode.
---

# User-Agent Restriction (UA Restriction) Plugin

The `ua-restriction` plugin is a request-phase security plugin that inspects the HTTP `User-Agent` header to identify the client type (e.g., browser, crawler, automated script) and then **allows** or **denies** the request based on a list of rules you configure.

## Feature Introduction

When making an HTTP request, a client identifies itself via the `User-Agent` header. This plugin leverages this information to implement access control.

It supports two core working modes:
1.  **Blacklist (Deny)**: Denies requests where the `User-Agent` matches any rule in the list, allowing all other requests.
2.  **Whitelist (Allow)**: Only allows requests where the `User-Agent` matches at least one rule in the list, denying all others.

The matching rules use powerful **regular expressions**, allowing you to perform precise string matching or flexible pattern matching, such as matching a specific version range of a crawler.

## Use Cases

* **Blocking Malicious Crawlers or Scanners**: If you find that malicious web crawlers or security scanners are consuming your server resources, you can add their `User-Agent` signature to a **blacklist** to effectively block their access.
* **Preventing Access from Automated Scripts**: Prohibit known automation tools or script libraries (like `curl`, `python-requests`, `Go-http-client`) from directly accessing your website, forcing all access to come through a browser.
* **Allowing Only Specific Clients**: For internal APIs or specific application scenarios, you can configure a **whitelist** to only allow access from clients you have developed, which have a specific `User-Agent`.
* **Preventing Search Engines from Indexing Test Environments**: In your staging or testing environments, you can add the crawlers of major search engines (like `Googlebot`, `Baiduspider`) to a **blacklist** to prevent the content of these environments from being publicly indexed.

## Configuration Parameters

Configuration is done in the `plugin.ua-restriction.toml` file.

| Parameter | Type             | Required | Default                  | Description                                                                                                          |
| :-------- | :--------------- | :------- | :----------------------- | :------------------------------------------------------------------------------------------------------------------- |
| `type`    | String           | **Yes**  | -                        | **(Required)** The type of restriction. Possible values are `"deny"` (blacklist mode) or `"allow"` (whitelist mode). |
| `ua_list` | Array of Strings | **Yes**  | `[]`                     | **(Required)** A list containing one or more **regular expressions** to match against the `User-Agent` header.       |
| `message` | String           | No       | `"Request is forbidden"` | A custom message to return to the client when a request is denied.                                                   |

---

## Complete Examples

### Example 1: Using a Blacklist to Block Unfriendly Crawlers

**Goal**: We want to block `BadBot` and all versions of `SomeScanner` from accessing our website.

1.  **Configure the plugin (`plugin.ua-blacklist.toml`)**:
    ```toml
    # Set to blacklist mode
    type = "deny"
    
    # Define regular expressions for the User-Agents to block
    # Note: In TOML, backslashes \ need to be escaped as \\
    ua_list = [
      # Exactly match "BadBot/1.0"
      "^BadBot/1.0$",
      # Match all User-Agents that start with "SomeScanner/"
      "^SomeScanner/.*"
    ]
    ```

2.  **Apply the plugin in a Location (`location.toml`)**:
    ```toml
    # location.toml
    [locations.main-website]
    path = "/"
    upstream = "my-web-server"
    plugins = [
        "ua-blacklist",
        # ... other plugins
    ]
    ```

### Access Effects

* A request with a `User-Agent` of `BadBot/1.0` will be immediately intercepted and will receive a `403 Forbidden` response.
* A request with a `User-Agent` of `SomeScanner/3.2` will also be intercepted.
* A normal browser request with a `User-Agent` of `Mozilla/5.0 ...` will be unaffected and forwarded normally to `my-web-server`.

### Example 2: Using a Whitelist to Allow Only a Mobile App

**Goal**: The endpoints under the `/api/mobile/` path are designed exclusively for our mobile app, and we only want our app to be able to access them. Assume our app's User-Agent format is `MyApp/MajorVersion.MinorVersion` (e.g., `MyApp/2.1`).

1.  **Configure the plugin (`plugin.ua-whitelist-mobile.toml`)**:
    ```toml
    # Set to whitelist mode
    type = "allow"
    
    # Define a regular expression that only allows our app's User-Agent
    # ^MyApp/\\d+\\.\\d+$ matches a string starting with "MyApp/" followed by "number.number"
    ua_list = [
      "^MyApp/\\d+\\.\\d+$"
    ]
    ```

2.  **Apply the plugin in a Location (`location.toml`)**:
    ```toml
    # location.toml
    [locations.mobile-api]
    path = "/api/mobile/"
    upstream = "mobile-api-backend"
    plugins = [
        "ua-whitelist-mobile",
    ]
    ```

### Access Effects
* A request with a `User-Agent` of `MyApp/3.0` can access the `/api/mobile/` path normally.
* Any request from a browser (`Mozilla/5.0...`) or an unknown client attempting to access `/api/mobile/` will be intercepted and will receive a `403 Forbidden` response.

## Precautions

* ❗ **Security Warning**: The `User-Agent` header is sent by the client and therefore **can be easily forged**. Please do not use User-Agent restriction as your **only** security mechanism to protect critical or sensitive endpoints. It is better suited as a supplementary line of defense to increase the difficulty for attackers, or for traffic management purposes.
* **Empty User-Agent**: If a request has **no** `User-Agent` header:
    * **Whitelist mode (`allow`)**: The request **will be denied** because it does not match any of the allowed rules.
    * **Blacklist mode (`deny`)**: The request **will be allowed** because it does not match any of the forbidden rules.