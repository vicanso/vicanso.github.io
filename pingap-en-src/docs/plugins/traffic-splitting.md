---
sidebar_position: 99
title: Traffic Splitting
description: Dynamically route traffic to different upstream services based on a specified percentage. A powerful tool for implementing A/B testing, gradual rollouts, and canary releases, with support for cookie-based session persistence.
---

# Traffic Splitting Plugin

The `traffic-splitting` plugin is a powerful request routing plugin that allows you to **dynamically switch** a portion of traffic from a `Location`'s main upstream service to another specified upstream.

## Feature Overview

This plugin intervenes at the request phase and decides which upstream service the current request should be sent to based on a configured **weight** (percentage).

For example, you can configure it to send **10%** of traffic to a new `v2` version of a service, while the remaining **90%** of traffic continues to be handled by the main upstream service configured in the `Location`.

Additionally, it supports a **Session Persistence (Stickiness)** feature. When enabled, the plugin uses a specified cookie to ensure that the same user is always routed to the same upstream service. This is crucial for A/B tests that require a consistent user experience or session state.

## Use Cases

* **Canary Release**:
    When you release a new version of an application, you can use this plugin to first direct a small portion of traffic (e.g., 1% or 5%) to the new version. By monitoring the performance and error rates of the new version, you can safely verify its stability before gradually increasing the traffic percentage and eventually completing a full rollout.

* **A/B Testing**:
    If you want to test a new feature or UI design, you can configure the plugin to route a portion of users (e.g., 50%) to the "experimental group" service that includes the new feature, while the other users continue to access the "control group" service. By enabling session persistence, you can ensure that users do not switch back and forth between the two versions during the test period.

* **Feature Flagging**:
    For new features that are being rolled out gradually by region or user, this plugin can be used to direct specific user traffic (via `stickiness` and a specific cookie) to the backend service that has the new feature implemented.

## Configuration Parameters

Configuration is done in the `plugin.traffic-splitting.toml` file.

| Parameter       | Type    | Required                           | Default | Description                                                                                                                                                                                 |
| :-------------- | :------ | :--------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `upstream`      | String  | **Yes**                            | -       | **(Required)** The name of the **target upstream service**. When a traffic split hits, the request will be routed to this Upstream.                                                         |
| `weight`        | Integer | **Yes**                            | -       | **(Required)** The **percentage** of traffic to be split to the target `upstream`. The value range is `0` - `100`.                                                                          |
| `stickiness`    | Boolean | No                                 | `false` | Whether to enable **session persistence**. If `true`, the `sticky_cookie` parameter must be configured.                                                                                     |
| `sticky_cookie` | String  | **Yes**, if `stickiness` is `true` | -       | The name of the cookie to use for session persistence. The plugin will use the value of this cookie to determine the traffic route, ensuring the same user always visits the same upstream. |

---

## Complete Example

### Example 1: Canary Release

**Goal**: We have a new service version, `api-v2`, and we want to split **5%** of the traffic to it for observation, while the remaining 95% continues to use the stable `api-v1`.

1.  **Configure the Plugin (`plugin.canary-v2.toml`)**:
    ```toml
    # The target upstream is our new version service
    upstream = "api-v2"
    
    # Split 5% of the traffic to api-v2
    weight = 5
    ```

2.  **Apply the Plugin in a Location (`location.toml`)**:
    ```toml
    # location.toml
    [[server.locations]]
    path = "/api/users/"
    # The main upstream is still the stable v1 version
    upstream = "api-v1"
    plugins = [
        "canary-v2",
    ]
    ```

### How It Works
* Approximately 95% of requests will be sent normally to the `Location`'s main upstream, `api-v1`.
* Approximately 5% of requests will be intercepted by the plugin, and their target upstream will be changed to `api-v2`.

### Example 2: User ID-Based A/B Testing

**Goal**: We want to test a new feature on 50% of our users. The new feature is deployed on `recommend-service-v2`, and the old feature is on `recommend-service-v1`. We will use the `user_id` cookie to identify users and ensure their experience is consistent.

1.  **Configure the Plugin (`plugin.ab-test-recommend.toml`)**:
    ```toml
    # Target upstream for the experimental group
    upstream = "recommend-service-v2"
    
    # 50% of the traffic goes to the experimental group
    weight = 50
    
    # Enable session persistence
    stickiness = true
    
    # Use the "user_id" cookie to determine the group
    sticky_cookie = "user_id"
    ```

2.  **Apply the Plugin in a Location (`location.toml`)**:
    ```toml
    # location.toml
    [[server.locations]]
    path = "/api/recommend/"
    # Control group (main upstream)
    upstream = "recommend-service-v1"
    plugins = [
        "ab-test-recommend",
    ]
    ```

### How It Works
* When a **new user** (without a `user_id` cookie) visits for the first time, the plugin will randomly route them based on the 50% `weight`.
* When a **returning user** (with a `user_id=abc` cookie) visits, the plugin will calculate a hash based on the value `abc`.
    * If the hash result falls within the 50% range, **all subsequent requests** from this user will be consistently routed to `recommend-service-v2`.
    * If the hash result falls outside the range, **all subsequent requests** from this user will be consistently routed to `recommend-service-v1`.