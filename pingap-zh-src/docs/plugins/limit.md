---
sidebar_position: 92
title: 请求限流 (Rate Limit)
description: 通过限制单位时间内的请求速率或并发连接数，保护您的上游服务免受流量洪峰和恶意攻击的影响，确保服务的稳定性和公平性。
---

# 请求限流 (Limit) 插件

`limit` 插件是一个功能强大的流量控制插件，它允许您对通过 Pingap 的请求进行精确的速率和并发限制。这是保护后端服务、防止资源滥用和抵御 DoS 攻击的关键工具。

## 功能简介

该插件提供了两种核心的限制模式，并且可以根据多种客户端标识符进行精细化控制。

### 限制模式

1.  **速率限制 (Rate Limiting)**:
    * **工作原理**: 限制在**给定的时间窗口内**，某个标识符（如 IP 地址）允许通过的请求总数。例如，“每个 IP 每分钟最多 100 个请求”。
    * **模式名称**: `rate`

2.  **并发限制 (Concurrency Limiting)**:
    * **工作原理**: 限制在**同一时刻**，某个标识符（如用户 ID）允许存在的并发（未完成的）请求数。例如，“每个用户最多同时进行 5 个请求”。
    * **模式名称**: `inflight`

### 客户端识别方式 (`tag`)

您可以配置插件通过以下四种方式来识别和区分客户端，从而实现针对性的限流：

* **IP 地址 (`ip`)**: 基于客户端的真实 IP 地址进行限制。这是最通用的方式。
* **HTTP 请求头 (`header`)**: 基于指定的请求头的值进行限制（例如，`X-User-ID`）。
* **Cookie (`cookie`)**: 基于指定的 Cookie 值进行限制（例如，会话 ID `session_id`）。
* **URL 查询参数 (`query`)**: 基于指定的 URL 查询参数值进行限制（例如，`api_key`）。

## 使用场景

* **保护登录接口**: 对登录 API 按 **IP** 进行**速率限制**，以防御密码爆破攻击。
* **防止爬虫滥用**: 对爬虫流量较大的接口，按 **IP** 或 **User-Agent** (通过 `header` tag) 进行**速率限制**。
* **保证公平使用**: 对公共 API，按 **API Key** (通过 `header` 或 `query` tag) 进行**速率限制**，确保每个用户都在其配额内使用。
* **保护昂贵的操作**: 对于消耗大量计算资源或数据库资源的请求（如生成报表），按 **用户 ID** (通过 `cookie` 或 `header` tag) 进行**并发限制**，防止单个用户拖垮系统。
* **全局并发保护**: 限制整个服务的总**并发连接数**，防止流量洪峰导致服务雪崩。

## 配置参数

在 `plugin.limit.toml` 文件中进行配置。

| 参数       | 类型    | 是否必需               | 默认值   | 说明                                                                                                        |
| :--------- | :------ | :--------------------- | :------- | :---------------------------------------------------------------------------------------------------------- |
| `type`     | String  | 否                     | `"rate"` | 限制模式。可选值为 `"rate"` (速率限制) 或 `"inflight"` (并发限制)。                                         |
| `max`      | Integer | **是**                 | -        | **（必需）** 允许的最大请求数。在 `rate` 模式下，指时间窗口内的请求数；在 `inflight` 模式下，指并发请求数。 |
| `interval` | String  | `rate` 模式下**是**    | `"10s"`  | 时间窗口大小，仅用于 `rate` 模式。格式为时间字符串（如 `"1m"`, `"1h"`）。                                   |
| `tag`      | String  | 否                     | `"ip"`   | 客户端识别方式。可选值为 `"ip"`, `"header"`, `"cookie"`, `"query"`。                                        |
| `key`      | String  | `tag` 非 `ip` 时**是** | -        | 当 `tag` 为 `header`, `cookie`, 或 `query` 时，指定要读取的**键名**。                                       |

---

## 完整示例

### 示例 1：对 API 进行速率限制

**目标**：保护我们的公共 API，限制每个 API Key 每分钟最多只能发起 100 次请求。API Key 通过 `X-Api-Key` 请求头传递。

1.  **配置插件 (`plugin.limit-api-rate.toml`)**:
    ```toml
    # 模式：速率限制
    type = "rate"

    # 限制：每分钟 100 次
    max = 100
    interval = "1m"

    # 识别方式：请求头
    tag = "header"
    key = "X-Api-Key"
    ```

2.  **在 Location 中应用插件 (`location.toml`)**:
    ```toml
    # location.toml
    [[server.locations]]
    path = "/api/public/"
    upstream = "public-api-backend"
    plugins = [
        "limit-api-rate",
    ]
    ```

### 访问效果
* 对于携带 `X-Api-Key: key-A` 的客户端，在一分钟内发起的前 100 个请求将正常通过。
* 从第 101 个请求开始，该客户端将收到 `429 Too Many Requests` 响应，直到当前时间窗口结束。
* 携带 `X-Api-Key: key-B` 的另一个客户端将拥有自己独立的计数器，不受影响。

### 示例 2：限制高消耗接口的并发数

**目标**：`/api/reports` 是一个非常消耗资源的报表生成接口。我们希望限制每个登录用户（通过 `session_id` Cookie 识别）同时只能生成 1 个报表。

1.  **配置插件 (`plugin.limit-report-inflight.toml`)**:
    ```toml
    # 模式：并发限制
    type = "inflight"

    # 限制：每个用户并发为 1
    max = 1

    # 识别方式：Cookie
    tag = "cookie"
    key = "session_id"
    ```

2.  **在 Location 中应用插件 (`location.toml`)**:
    ```toml
    # location.toml
    [locations.route-for-my-app]
    path = "/api/reports"
    upstream = "report-generator-backend"
    plugins = [
        "limit-report-inflight",
    ]
    ```

### 访问效果
* 拥有 `session_id=abc` 的用户发起了第一个报表生成请求，该请求正常执行。
* 在第一个请求完成**之前**，该用户又发起了第二个报表生成请求。此请求将被插件拦截，并立即收到 `429 Too Many Requests` 响应。
* 当第一个请求完成后，该用户才能再次发起新的请求。