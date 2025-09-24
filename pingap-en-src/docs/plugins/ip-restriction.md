---
sidebar_position: 89
title: IP Restriction
description: Implement access control from specific sources by configuring IP address blacklists or whitelists, effectively blocking malicious access, limiting service access scope, and enhancing application security.
---

# IP Restriction Plugin

The `ip-restriction` plugin is a request-phase security plugin that allows you to **allow** or **deny** access to requests based on the client's IP address, serving as an important line of defense for implementing Network Access Control Lists (ACLs).

## Feature Introduction

This plugin checks the source IP address of a request before it reaches the upstream service. It supports two core working modes:

1.  **Blacklist (Deny)**: Denies access to IP addresses or IP ranges specified in the list, while allowing all other IPs.
2.  **Whitelist (Allow)**: Only allows access from IP addresses or IP ranges specified in the list, denying all others.

The plugin can intelligently identify the client's real IP (prioritizing headers like `X-Forwarded-For`) and supports configuring single IP addresses as well as CIDR network ranges, providing flexible and powerful access control capabilities.

## Use Cases

* **Blocking Malicious Access**: When you discover malicious IP addresses scanning or attacking your service, you can quickly add them to a **blacklist** to immediately block all their requests.
* **Protecting Internal Systems**: For high-privilege systems like admin backends or database panels, you can configure a **whitelist** to only allow access from the company's internal network or specific bastion hosts.
* **Implementing Geographic Restrictions**: Achieve simple location-based access control by adding IP ranges of specific countries or regions to a blacklist or whitelist.
* **Authorizing API Access**: Grant API access to partners or specific servers by adding their IP addresses to a **whitelist**.

## Configuration Parameters

Configuration is done in the `plugin.ip-restriction.toml` file.

| Parameter | Type             | Required | Default                  | Description                                                                                                                              |
| :-------- | :--------------- | :------- | :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `type`    | String           | **Yes**  | -                        | **(Required)** The type of restriction. Possible values are `"deny"` (blacklist mode) or `"allow"` (whitelist mode).                     |
| `ip_list` | Array of Strings | **Yes**  | `[]`                     | **(Required)** A list of IP addresses. Supports both single IPs (e.g., `"192.168.1.10"`) and CIDR network ranges (e.g., `"10.0.0.0/8"`). |
| `message` | String           | No       | `"Request is forbidden"` | A custom message to return to the client when a request is denied.                                                                       |

---

## Complete Examples

### Example 1: Using a Blacklist to Block Malicious IPs

**Goal**: We've found that the IP `1.2.3.4` and the `5.6.7.0/24` network range are maliciously scanning our website and need to be blocked.

1.  **Configure the plugin (`plugin.ip-blacklist.toml`)**:
    ```toml
    # Set to blacklist mode
    type = "deny"
    
    # List the IPs and network ranges to block
    ip_list = [
      "1.2.3.4",
      "5.6.7.0/24",
    ]

    # Optional: Provide a more user-friendly message
    message = "Your IP address has been blocked due to suspicious activity."
    ```

2.  **Apply the plugin in a Location (`location.toml`)**:
    ```toml
    # ...
    [locations.route-for-my-app]
    # Match all requests
    path = "/"
    upstream = "my-web-server"
    plugins = [
        # Place the blacklist plugin first to intercept malicious requests early
        "ip-blacklist",
        # ... other plugins
    ]
    # ...
    ```

### Access Effects

* Any request from `1.2.3.4` or `5.6.7.100` will be immediately intercepted and receive a `403 Forbidden` response with our custom `message` as the body.
* Requests from any other IP address (e.g., `8.8.8.8`) will be unaffected and forwarded normally to `my-web-server`.

### Example 2: Using a Whitelist to Protect an Admin Backend

**Goal**: Our admin backend should only be accessible from the office network (`10.20.0.0/16`) and a specific operations bastion host (`172.16.3.100`).

1.  **Configure the plugin (`plugin.ip-whitelist-admin.toml`)**:
    ```toml
    # Set to whitelist mode
    type = "allow"
    
    # List the IPs and network ranges allowed to access
    ip_list = [
      "10.20.0.0/16",
      "172.16.3.100",
    ]
    ```

2.  **Apply the plugin in a Location (`location.toml`)**:
    ```toml
    # ...
    [locations.route-for-admin]
    # Only apply to the admin backend path
    path = "/admin/"
    upstream = "admin-backend"
    plugins = [
        "ip-whitelist-admin",
        # ... other authentication plugins
    ]
    # ...
    ```

### Access Effects
* Requests from `10.20.30.40` or `172.16.3.100` can access the `/admin/` path normally.
* Requests from any other IP address (e.g., `8.8.8.8`) attempting to access `/admin/` will be intercepted and receive a `403 Forbidden` response.