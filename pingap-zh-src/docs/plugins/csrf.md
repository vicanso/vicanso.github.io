---
sidebar_position: 87
title: CSRF 防护
description: 通过实施“双重提交 Cookie” (Double Submit Cookie) 模式，保护您的 Web 应用免受跨站请求伪造 (CSRF) 攻击，确保所有状态变更请求都源自合法用户。
---

# CSRF 防护插件

`csrf` 插件是一个请求阶段的安全插件，它通过**双重提交 Cookie (Double Submit Cookie)** 模式，为您的 Web 应用提供强大的跨站请求伪造 (CSRF/XSRF) 防护。



## 功能简介

跨站请求伪造 (CSRF) 是一种常见的网络攻击，攻击者诱导已登录的用户在不知情的情况下，从用户的浏览器向应用发送一个恶意的、会改变状态的请求（如转账、修改密码、删除数据等）。

本插件通过以下流程来抵御此类攻击：
1.  **令牌分发**: 客户端（通常是前端应用）首先向一个指定的路径 (如 `/api/csrf-token`) 发起请求，插件会生成一个唯一的、加密签名的 CSRF 令牌。
2.  **设置 Cookie**: 该令牌会通过 `Set-Cookie` 响应头，自动存储在用户的浏览器中。这个 Cookie 对 JavaScript 来说是**不可读**的，增加了安全性。
3.  **双重提交验证**:
    * 对于所有**不安全**的 HTTP 请求（如 `POST`, `PUT`, `DELETE`），前端应用必须从 Cookie 中读取令牌值，并将其放入一个自定义的 HTTP **请求头**（如 `X-CSRF-Token`）中，随请求一起发送。
    * 插件在收到请求后，会同时检查 Cookie 中的令牌和请求头中的令牌。**只有当两者存在且完全一致时**，请求才会被认为是合法的。

因为攻击者无法读取或设置另一个域下的 Cookie，也无法为跨域请求添加自定义请求头，所以他们无法伪造这个“双重提交”的过程，从而有效地阻止了 CSRF 攻击。

## 使用场景

* **所有基于 Cookie/Session 认证的 Web 应用**：如果您的应用使用 Cookie 来维持用户登录状态，那么所有会改变数据的接口（如表单提交、发起转账、修改个人资料等）都应该受到 CSRF 保护。
* **单页面应用 (SPA)**：对于 React, Vue, Angular 等前端框架构建的 SPA，在初始化时获取 CSRF 令牌，并配置 HTTP 客户端（如 Axios）在后续所有状态变更请求中自动携带该令牌，是一种常见的集成模式。

## 配置参数

在 `plugins.csrf.toml` 文件中进行配置。

| 参数         | 类型   | 是否必需 | 默认值           | 说明                                                                                                                 |
| :----------- | :----- | :------- | :--------------- | :------------------------------------------------------------------------------------------------------------------- |
| `key`        | String | **是**   | -                | 一个**绝密**的字符串密钥，用于对 CSRF 令牌进行加密签名。必须足够复杂和随机。**所有 Pingap 实例必须使用相同的密钥。** |
| `token_path` | String | **是**   | -                | 前端应用用于获取新 CSRF 令牌的 API 路径，例如 `"/api/csrf-token"`。对此路径的请求将返回一个新令牌。                  |
| `name`       | String | 否       | `"x-csrf-token"` | 用于存放 CSRF 令牌的 Cookie 名称和 HTTP 请求头名称。                                                                 |
| `ttl`        | String | 否       | *(永不过期)*     | 令牌的有效期，格式为时间字符串（如 `"1h"`, `"24h"`）。过期后令牌将失效。                                             |

---

## 完整示例

**目标**：为一个 Web 应用的所有 API (`/api/`) 提供 CSRF 保护。

1.  **生成一个安全的密钥**:
    ```bash
    # 使用 openssl 生成一个随机的、安全的密钥
    openssl rand -base64 32
    ```
    > **示例输出**: `aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890/=+` (请使用您自己生成的密钥)

2.  **配置插件 (`plugins.csrf-api.toml`)**:
    ```toml
    # 必须与所有 Pingap 实例共享的密钥
    key = "aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890/="
    
    # 前端获取 Token 的端点
    token_path = "/api/csrf-token"
    
    # 自定义 Token 名称
    name = "X-CSRF-TOKEN"
    
    # Token 有效期为 24 小时
    ttl = "24h"
    ```

3.  **在 Location 中应用插件 (`location.toml`)**:
    ```toml
    # ...
    [locations.route-for-my-app]
    # 匹配所有 API 请求
    path = "/api/"
    upstream = "api-backend"
    plugins = [
        "csrf-api",
    ]
    # ...
    ```

### 前端集成工作流

1.  **获取令牌**: 前端应用在加载后，向 `GET /api/csrf-token` 发起一个请求。
    * Pingap 会返回一个 `204 No Content` 响应，并在响应头中包含 `Set-Cookie: X-CSRF-TOKEN=...; Path=/; Max-Age=86400`。浏览器会自动存储这个 Cookie。

2.  **发送请求**: 当用户执行一个需要保护的操作时（例如，提交一个 POST 表单到 `/api/settings`）：
    * 前端 JavaScript 需要从 Cookie (`document.cookie`) 中读取 `X-CSRF-TOKEN` 的值。
    * 将读取到的令牌值放入一个同名的 HTTP 请求头中。
    * 发送请求。

3.  **验证流程**:
    * 对于 `GET /api/csrf-token` 请求，插件总是生成并返回新令牌。
    * 对于 `GET`, `HEAD`, `OPTIONS` 等安全请求，插件会跳过检查。
    * 对于 `POST /api/settings` 请求，插件会：
        * 比较 Cookie 中的 `X-CSRF-TOKEN` 和请求头中的 `X-CSRF-TOKEN` 是否一致。
        * 验证令牌本身的签名和有效期。
        * 验证通过，请求被转发到 `api-backend`。验证失败，则立即返回 `401 Unauthorized`。