---
sidebar_position: 99
title: 流量切分 (Traffic Splitting)
description: 按指定的百分比将流量动态路由到不同的上游服务。是实现 A/B 测试、灰度发布和金丝雀部署的强大工具，支持基于 Cookie 的会话保持。
---

# 流量切分 (Traffic Splitting) 插件

`traffic-splitting` 插件是一个强大的请求路由插件，它允许您将一部分流量从 `Location` 的主上游服务**动态地切换**到另一个指定的上游服务。



## 功能简介

该插件会在请求阶段介入，根据您配置的**权重 (weight)**（百分比），决定当前请求应该被发送到哪个上游服务。

例如，您可以配置将 **10%** 的流量发送到一个新的 `v2` 版本的服务，而剩余的 **90%** 流量继续由 `Location` 中配置的主上游服务处理。

此外，它还支持**会话保持 (Stickiness)** 功能。启用后，插件会根据指定的 Cookie 来确保同一个用户始终被路由到同一个上游服务，这对于需要保持登录状态或用户会话的 A/B 测试至关重要。

## 使用场景

* **金丝雀部署 (Canary Release)**：
    当您发布一个新版本的应用时，可以先使用此插件将一小部分流量（如 1% 或 5%）引导到新版本。通过观察新版本的性能和错误率，可以安全地验证其稳定性，然后再逐步增加流量比例，最终完成全量发布。

* **A/B 测试**：
    如果您想测试一个新功能或新的 UI 设计，可以配置插件将一部分用户（例如 50%）的流量路由到包含新功能的“实验组”服务，而另一部分用户则继续访问“对照组”服务。通过启用会话保持，可以确保用户在测试期间不会在两个版本之间来回切换。

* **功能开关 (Feature Flagging)**：
    对于一些按区域或用户逐步开放的新功能，可以使用此插件将特定用户的流量（通过 `stickiness` 和特定的 Cookie）定向到实现了新功能的后端服务。

## 配置参数

在 `plugin.traffic-splitting.toml` 文件中进行配置。

| 参数            | 类型    | 是否必需                        | 默认值  | 说明                                                                                                                                         |
| :-------------- | :------ | :------------------------------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `upstream`      | String  | **是**                          | -       | **（必需）** **目标上游服务**的名称。当流量切分命中时，请求将被路由到这个 Upstream。                                                         |
| `weight`        | Integer | **是**                          | -       | **（必需）** 切分到目标 `upstream` 的流量**百分比**。取值范围 `0` - `100`。                                                                  |
| `stickiness`    | Boolean | 否                              | `false` | 是否启用**会话保持**。如果为 `true`，则必须配置 `sticky_cookie`。                                                                            |
| `sticky_cookie` | String  | `stickiness` 为 `true` 时**是** | -       | 用于会话保持的 Cookie 名称。插件会根据这个 Cookie 的值来决定流量走向，确保同一用户始终访问同一个上游。                                       |
| `sticky_header` | String  | `stickiness` 为 `true` 时**是** | -       | 用于会话保持的 header 名称。插件会根据这个 Header 的值来决定流量走向，确保同一用户始终访问同一个上游。若有配置了Cookie，则优先使用Cookie     |
| `matcher`       | String  | 否                              | -       | 用于匹配请求的正则表达式。插件会根据这个正则表达校验`sticky_cookie`或`sticky_header`的值，如果匹配，则使用插件配置的`upstream`，否则不调整。 |

---

## 完整示例

### 示例 1：金丝雀部署

**目标**：我们有一个 `api-v2` 的新版本服务，我们希望先切分 **5%** 的流量到新版本进行观察，剩余 95% 的流量继续使用稳定的 `api-v1`。

1.  **配置插件 (`plugin.canary-v2.toml`)**:
    ```toml
    # 目标上游是我们的新版本服务
    upstream = "api-v2"
    
    # 将 5% 的流量切分到 api-v2
    weight = 5
    ```

2.  **在 Location 中应用插件 (`location.toml`)**:
    ```toml
    # location.toml
    [[server.locations]]
    path = "/api/users/"
    # 主上游仍然是稳定的 v1 版本
    upstream = "api-v1"
    plugins = [
        "canary-v2",
    ]
    ```

### 访问效果
* 大约 95% 的请求会被正常发送到 `Location` 配置的主上游 `api-v1`。
* 大约 5% 的请求会被插件拦截，并将其目标上游修改为 `api-v2`。

### 示例 2：基于用户 ID 的 A/B 测试

**目标**：我们想对 50% 的用户测试一个新功能。新功能部署在 `recommend-service-v2`，旧功能在 `recommend-service-v1`。我们通过 `user_id` 这个 Cookie 来识别用户，并确保他们不会在两个版本间切换。

1.  **配置插件 (`plugin.ab-test-recommend.toml`)**:
    ```toml
    # 实验组的目标上游
    upstream = "recommend-service-v2"
    
    # 50% 的流量进入实验组
    weight = 50
    
    # 开启会话保持
    stickiness = true
    
    # 根据 "user_id" 这个 cookie 来决定分组
    sticky_cookie = "user_id"
    ```

2.  **在 Location 中应用插件 (`location.toml`)**:
    ```toml
    # location.toml
    [[server.locations]]
    path = "/api/recommend/"
    # 对照组（主上游）
    upstream = "recommend-service-v1"
    plugins = [
        "ab-test-recommend",
    ]
    ```

### 访问效果
* 当一个**新用户**（没有 `user_id` Cookie）首次访问时，插件不会处理请求，请求会直接发送到 `recommend-service-v1`。
* 当一个**已登录用户**（带有 `user_id=abc` 的 Cookie）访问时，插件会根据 `abc` 这个值计算一个哈希，如果哈希结果落入 50% 的范围内，该用户**之后的所有请求**都将被固定地路由到 `recommend-service-v2`，否则将固定地路由到 `recommend-service-v1`。
    * 如果哈希结果落入 50% 的范围内，该用户**之后的所有请求**都将被固定地路由到 `recommend-service-v2`。
    * 如果哈希结果未落入范围内，该用户**之后的所有请求**都将被固定地路由到 `recommend-service-v1`。