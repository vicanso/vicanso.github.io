---
sidebar_position: 95
title: HTTP 重定向 (Redirect)
description: 轻松实现 HTTP 到 HTTPS 的强制跳转或为 URL 路径添加统一前缀。通过发送 307 临时重定向响应，确保原始请求方法和数据体在跳转后保持不变。
---

# HTTP 重定向 (Redirect) 插件

`redirect` 插件是一个请求阶段的插件，它会拦截匹配的请求，并向客户端返回一个 HTTP 重定向响应（状态码 `307 Temporary Redirect`），引导浏览器或客户端访问一个新的 URL。

## 功能简介

该插件的核心功能是**生成并返回一个重定向指令**，而不会将请求转发到任何上游服务。您可以配置它来实现两种主要的重定向逻辑：

1.  **协议跳转 (Scheme Redirect)**：最常见的用途是强制将所有 `http://` 请求重定向到 `https://`，以确保全程使用加密连接。
2.  **路径前缀 (Path Prefix)**：为请求的 URL 路径自动添加一个指定的前缀。例如，将 `/orders` 的请求重定向到 `/api/v1/orders`。

这两种逻辑可以**同时生效**。

### 为什么使用 `307` 重定向？
与常见的 `301` (永久) 或 `302` (临时) 重定向不同，`307 Temporary Redirect` 明确要求客户端在向新地址发起请求时，**必须保持原始的请求方法和请求体不变**。这意味着，如果原始请求是一个 `POST` 或 `PUT` 请求，重定向后的请求依然会是 `POST` 或 `PUT`，有效避免了数据丢失或请求失败，尤其适合处理 API 请求。

## 使用场景

* **强制 HTTPS**：这是最普遍和重要的安全实践。通过将所有 HTTP 流量重定向到 HTTPS，可以防止中间人攻击，保护数据传输安全。
* **URL 规范化**：确保所有用户都通过一个统一的、规范的 URL 路径访问您的服务。例如，将旧的、不带版本号的 API 路径重定向到新的、带版本号的路径 (`/users` -> `/api/v2/users`)。
* **域名迁移或重构**：在网站或服务进行重构，URL 结构发生变化时，使用重定向来平滑地引导用户和搜索引擎到新的地址。（注意：此插件不处理域名变更，仅处理协议和路径）。

## 配置参数

在 `plugin.redirect.toml` 文件中进行配置。

| 参数            | 类型    | 是否必需 | 默认值  | 说明                                                                         |
| :-------------- | :------ | :------- | :------ | :--------------------------------------------------------------------------- |
| `http_to_https` | Boolean | 否       | `false` | 是否将 `http` 请求重定向到 `https. `设为 `true` 以强制开启 HTTPS。           |
| `prefix`        | String  | 否       | *(空)*  | 要添加到 URL 路径开头的字符串前缀。如果配置，它会自动被格式化为以 `/` 开头。 |

---

## 完整示例

### 示例 1：强制所有流量使用 HTTPS

**目标**：我们希望网站的所有访问都通过 HTTPS。任何通过 `http://` 访问的用户都应该被自动跳转到 `https://` 对应的页面。

1.  **配置插件 (`plugin.force-https.toml`)**:
    ```toml
    # 开启 http 到 https 的重定向
    http_to_https = true
    
    # 在这个场景下，我们不修改路径，所以省略 prefix
    ```

2.  **在 Location 中应用插件 (`location.toml`)**:
    > 💡 **重要**：此插件应该应用在**只监听 80 端口**的 HTTP `Server` 中，因为它只处理需要被重定向的 HTTP 请求。

    ```toml
    # location.toml

    # --- 规则一：HTTP 重定向规则 ---
    [locations.route-for-my-app]
    # 匹配所有 HTTP 请求
    path = "/"
    # 注意：此 Location 由插件直接响应，因此不需要配置 upstream
    plugins = [
        "force-https",
    ]
    ```

### 访问效果
* 当用户访问 `http://example.com/dashboard?tab=1` 时：
    * Pingap 会返回一个 `307 Temporary Redirect` 响应。
    * 响应头中会包含 `Location: https://example.com/dashboard?tab=1`。
    * 用户的浏览器会自动跳转到新的 HTTPS 地址，并且 URL 路径和查询参数都保持不变。

### 示例 2：强制 HTTPS 并添加 API 版本前缀

**目标**：我们的所有 API 都需要通过 HTTPS 访问，并且路径都需要以 `/api/v2` 开头。

1.  **配置插件 (`plugin.redirect-api.toml`)**:
    ```toml
    # 开启 http 到 https 的重定向
    http_to_https = true
    
    # 添加路径前缀
    prefix = "/api/v2"
    ```

2.  **在 Location 中应用插件 (`location.toml`)**:
    ```toml
    # location.toml

    # --- 同样，此规则应用于只监听 80 端口的 HTTP Server ---
    [locations.route-for-my-app]
    path = "/"
    plugins = [
        "redirect-api",
    ]
    ```

### 访问效果
* 当一个 `POST` 请求发送到 `http://example.com/users` 时：
    * Pingap 会返回一个 `307 Temporary Redirect` 响应。
    * `Location` 头为 `https://example.com/api/v2/users`。
    * 客户端会自动以 `POST` 方法向新的地址重新发起请求，请求体数据不会丢失。