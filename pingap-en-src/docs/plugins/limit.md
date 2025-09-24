---
sidebar_position: 92
title: Rate Limit
description: Protect your upstream services from traffic spikes and malicious attacks by limiting the request rate or concurrent connections per unit of time, ensuring service stability and fairness.
---

# Rate Limit (Limit) Plugin

The `limit` plugin is a powerful traffic control plugin that allows you to apply precise rate and concurrency limits to requests passing through Pingap. It is a critical tool for protecting backend services, preventing resource abuse, and defending against DoS attacks.

## Feature Introduction

This plugin provides two core limiting modes and allows for fine-grained control based on various client identifiers.

### Limiting Modes

1.  **Rate Limiting**:
    * **How it works**: Limits the total number of requests allowed from a specific identifier (like an IP address) within a **given time window**. For example, "a maximum of 100 requests per minute for each IP."
    * **Mode Name**: `rate`

2.  **Concurrency Limiting**:
    * **How it works**: Limits the number of concurrent (in-flight) requests that can exist for a specific identifier (like a user ID) at the **same moment**. For example, "a maximum of 5 concurrent requests for each user."
    * **Mode Name**: `inflight`

### Client Identification (`tag`)

You can configure the plugin to identify and differentiate clients in the following four ways for targeted rate limiting:

* **IP Address (`ip`)**: Limits based on the client's real IP address. This is the most common method.
* **HTTP Header (`header`)**: Limits based on the value of a specified request header (e.g., `X-User-ID`).
* **Cookie (`cookie`)**: Limits based on the value of a specified cookie (e.g., session ID `session_id`).
* **URL Query Parameter (`query`)**: Limits based on the value of a specified URL query parameter (e.g., `api_key`).

## Use Cases

* **Protecting Login Endpoints**: Apply **rate limiting** by **IP** to the login API to defend against password brute-force attacks.
* **Preventing Scraper Abuse**: Apply **rate limiting** by **IP** or **User-Agent** (via the `header` tag) to endpoints with heavy crawler traffic.
* **Ensuring Fair Usage**: Apply **rate limiting** by **API Key** (via `header` or `query` tag) to public APIs to ensure each user stays within their quota.
* **Protecting Expensive Operations**: Apply **concurrency limiting** by **User ID** (via `cookie` or `header` tag) for requests that consume significant computational or database resources (like report generation) to prevent a single user from overwhelming the system.
* **Global Concurrency Protection**: Limit the total **concurrent connections** for an entire service to prevent service avalanches caused by traffic spikes.

## Configuration Parameters

Configuration is done in the `plugin.limit.toml` file.

| Parameter  | Type    | Required                       | Default  | Description                                                                                                                                                                                                        |
| :--------- | :------ | :----------------------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`     | String  | No                             | `"rate"` | The limiting mode. Possible values are `"rate"` (rate limiting) or `"inflight"` (concurrency limiting).                                                                                                            |
| `max`      | Integer | **Yes**                        | -        | **(Required)** The maximum number of allowed requests. In `rate` mode, it's the number of requests in the time window; in `inflight` mode, it's the number of concurrent requests.                                 |
| `interval` | String  | **Yes** for `rate` mode        | `"10s"`  | The size of the time window, used only for `rate` mode. The format is a time string (e.g., `"1m"`, `"1h"`).                                                                                                        |
| `tag`      | String  | No                             | `"ip"`   | The client identification method. Possible values are `"ip"`, `"header"`, `"cookie"`, `"query"`.                                                                                                                   |
| `key`      | String  | **Yes** when `tag` is not `ip` | -        | When `tag` is `header`, `cookie`, or `query`, this specifies the **key name** to be read.                                                                                                                          |
| `weight`   | Integer | No                             | `50`     | The **smoothing weight** for the current window, used only for `rate` mode. The value ranges from `0-100`. It's used to smooth the rate calculation to avoid bursts at the window boundary. **See details below**. |

### `weight` Parameter Explained

The `weight` parameter is used to **smooth the rate calculation** to avoid the problem of rate spikes at the boundary of a time window.

* When `weight` is `0`, the rate calculation is based entirely on the number of requests in the **previous** time window. This value is stable but will not apply any limit on the first use because the previous window has no data.
* When `weight` is greater than `0`, the rate is calculated by combining the request counts from the **previous** and **current** windows. The formula is:
    `Smoothed Rate = (Previous Window Count * (1 - weight/100)) + (Current Window Count * weight/100)`
* A **recommended value** is `50` (the default), which gives equal weight to the previous and current windows, resulting in a smoother value that better reflects the true average rate.

---

## Complete Examples

### Example 1: Rate Limiting an API

**Goal**: Protect our public API by limiting each API Key to a maximum of 100 requests per minute. The API Key is passed via the `X-Api-Key` request header.

1.  **Configure the plugin (`plugin.limit-api-rate.toml`)**:
    ```toml
    # Mode: rate limiting
    type = "rate"

    # Limit: 100 requests per minute
    max = 100
    interval = "1m"

    # Identification method: request header
    tag = "header"
    key = "X-Api-Key"

    # Set smoothing weight to 50%
    weight = 50
    ```

2.  **Apply the plugin in a Location (`location.toml`)**:
    ```toml
    # location.toml
    [[server.locations]]
    path = "/api/public/"
    upstream = "public-api-backend"
    plugins = [
        "limit-api-rate",
    ]
    ```

### Access Effects
* For a client with `X-Api-Key: key-A`, the first 100 requests within a minute will pass normally.
* Starting from the 101st request, that client will receive a `429 Too Many Requests` response until the current time window ends.
* Another client with `X-Api-Key: key-B` will have its own independent counter and will not be affected.

### Example 2: Limiting Concurrency for an Expensive Endpoint

**Goal**: `/api/reports` is a resource-intensive report generation endpoint. We want to limit each logged-in user (identified by a `session_id` cookie) to generating only 1 report at a time.

1.  **Configure the plugin (`plugin.limit-report-inflight.toml`)**:
    ```toml
    # Mode: concurrency limiting
    type = "inflight"

    # Limit: 1 concurrent request per user
    max = 1

    # Identification method: Cookie
    tag = "cookie"
    key = "session_id"
    ```

2.  **Apply the plugin in a Location (`location.toml`)**:
    ```toml
    # location.toml
    [locations.route-for-my-app]
    path = "/api/reports"
    upstream = "report-generator-backend"
    plugins = [
        "limit-report-inflight",
    ]
    ```

### Access Effects
* A user with `session_id=abc` makes their first report generation request, which executes normally.
* **Before** the first request is complete, the same user makes a second report generation request. This request will be intercepted by the plugin and will immediately receive a `429 Too Many Requests` response.
* Only after the first request is complete can the user make a new request.