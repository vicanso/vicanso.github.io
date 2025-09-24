---
sidebar_position: 84
title: Combined Auth
description: A secure and reliable signature-based authentication scheme designed for service-to-service calls. It provides multi-layered security for your internal APIs by combining an App ID, IP whitelist, timestamp, and HMAC digest.
---

# Combined Auth Plugin

The `combined-auth` plugin provides a powerful **HMAC signature-based** authentication mechanism, specifically designed for high-security **service-to-service (machine-to-machine)** scenarios.

## Feature Overview

Unlike simple API Key authentication, Combined Auth requires the caller to provide information across multiple dimensions and uses a cryptographic digest to ensure the request's **authenticity, integrity, and timeliness**.

When this plugin is enabled, every request must carry the following fields in its URL query parameters and pass a multi-layer validation process:
1.  **`app_id` (Application ID)**: Identifies which application is making the call. The plugin uses the `app_id` to look up the corresponding authentication configuration.
2.  **IP Whitelist Validation (Optional)**: Checks if the request's source IP is on the allowed list configured for that `app_id`.
3.  **`ts` (Timestamp)**: The Unix timestamp when the request was initiated. The plugin verifies that the deviation between this timestamp and the server's current time is within an acceptable range, effectively **preventing replay attacks**.
4.  **`digest` (Digest)**: An HMAC-SHA256 digest generated from the **secret key** and the **timestamp**. This is the core of the validation. Since the secret key is held only by the client and the server, the digest proves that the request is genuinely from a legitimate client and that the timestamp and other information have not been tampered with.

Only when all checks have passed will the request be allowed to access the upstream service.

## Use Cases

* **Protecting Core Internal APIs**: For internal microservices involving core functions like payments or user data modification, Combined Auth ensures that only authorized and legitimate internal services can make calls.
* **Open Platform APIs**: When providing APIs to partners or third-party developers, you can assign a unique `app_id` and `secret` to each developer, enabling secure and isolated authentication through this plugin.
* **Replacing Complex OAuth Flows**: For purely server-to-server calls, Combined Auth is more lightweight and easier to implement than protocols like OAuth 2.0.

## Configuration Parameters

Configuration is done in the `plugin.combined-auth.toml` file.

| Parameter        | Type            | Required | Description                                                          |
| :--------------- | :-------------- | :------- | :------------------------------------------------------------------- |
| `authorizations` | Array of Tables | **Yes**  | **(Required)** A list of configurations for authorized applications. |

### Parameters for each object in the `authorizations` list

| Parameter   | Type             | Required | Default | Description                                                                                                                                                      |
| :---------- | :--------------- | :------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app_id`    | String           | **Yes**  | -       | **(Required)** The unique identifier for the application.                                                                                                        |
| `secret`    | String           | **Yes**  | -       | **(Required)** The **secret** key used to generate the HMAC digest. The special value `*` denotes a superuser and will bypass all validation (use with caution). |
| `deviation` | Integer          | No       | `60`    | The maximum allowed deviation between the client timestamp and server time, in **seconds**.                                                                      |
| `ip_list`   | Array of Strings | No       | `[]`    | An IP whitelist. Only requests from these IPs will be allowed. Supports single IPs and CIDR ranges.                                                              |

---

## Complete Example

**Goal**: We have an internal `payment-service` and need to create a secure API endpoint for it that only allows the `order-service` to call it from its fixed server IP (`10.1.2.3`).

#### 1. Configure the Plugin (`plugins.combined-auth-internal.toml`)
```toml
[[authorizations]]
# Application ID
app_id = "order-service"

# Assign a secure secret key for it
secret = "ORDER_SVC_SECRET_KEY_VERY_SECURE_!@#"

# Only allow requests from the service's fixed IP
ip_list = [
  "10.1.2.3",
]

# Allow a 60-second time deviation
deviation = 60
```