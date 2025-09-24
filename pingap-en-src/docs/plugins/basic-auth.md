---
sidebar_position: 83
title: Basic Auth
description: Add simple yet effective HTTP Basic Authentication access control to your services by configuring usernames and passwords, with a built-in brute-force defense mechanism.
---

# Basic Auth Plugin

The `basic-auth` plugin is an authentication plugin that operates at the request phase. It protects your upstream services using the HTTP Basic Authentication protocol, requiring clients to provide a valid username and password to gain access.

## Feature Introduction

HTTP Basic Authentication is a simple, universal authentication scheme natively supported by all browsers and HTTP clients. When this plugin is enabled:
1.  Unauthenticated requests will be **intercepted** by `Pingap`, which will return a `401 Unauthorized` status code.
2.  Upon receiving a `401` response, the browser will automatically display a login dialog, prompting the user to enter a username and password.
3.  The user's credentials, encoded in Base64, are sent via the `Authorization` request header.
4.  The plugin validates whether the received credentials match a preset list.

Additionally, this plugin includes built-in **security enhancements**, such as brute-force attack defense and credential stripping.

## Use Cases

* **Protecting Internal Systems**: Quickly add a layer of password protection to internal admin panels, monitoring dashboards (like Grafana, Prometheus), or other systems you do not want to be publicly accessible.
* **Isolating Development/Staging Environments**: Before deploying an application to production, use Basic Auth to protect your development and staging environments, allowing access only to team members.
* **Simple API Protection**: Use Basic Auth as a simple entry barrier for some internal or low-security APIs.

## Configuration Parameters

Configuration is done in the `plugin.basic-auth.toml` file.

| Parameter          | Type             | Required | Default | Description                                                                                                                                                                                                             |
| :----------------- | :--------------- | :------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorizations`   | Array of Strings | Yes      | -       | A set of **pre-calculated Base64 strings**. Each string corresponds to a valid "username:password" pair. Multiple authorization parameters are separated by commas.                                                     |
| `hide_credentials` | Boolean          | No       | `false` | After successful authentication, whether to **remove the `Authorization` header** from the request. **It is strongly recommended to enable this (`true`)** to prevent leaking user credentials to the upstream service. |
| `delay`            | String           | No       | -       | Introduces a delay for **invalid** login attempts, for example, `"500ms"` or `"1s"`. This is an effective **brute-force defense** mechanism that significantly increases the cost for an attacker.                      |

### How to generate `authorizations`

You need to Base64-encode the `username:password` string (note the colon in the middle).

**Linux / macOS Example:**

```bash
# Generate a Base64 string for "admin:p@ssw0rd123"
echo -n "admin:p@ssw0rd123" | base64