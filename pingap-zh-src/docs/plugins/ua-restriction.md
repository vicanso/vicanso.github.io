---
sidebar_position: 100
title: User-Agent 限制
description: 通过检查 HTTP User-Agent 请求头，实现对特定客户端、爬虫或扫描器的访问控制。支持强大的正则表达式匹配，可配置黑名单或白名单模式。
---

# User-Agent 限制 (UA Restriction) 插件

`ua-restriction` 插件是一个请求阶段的安全插件，它通过检验 HTTP `User-Agent` 请求头来识别客户端类型（如浏览器、爬虫、自动化脚本等），并根据您配置的规则列表来**允许**或**拒绝**该请求。



## 功能简介

客户端在发起 HTTP 请求时，会通过 `User-Agent` 头来表明自己的身份。此插件正是利用这一信息来实现访问控制。

它支持两种核心工作模式：
1.  **黑名单 (Deny)**: 拒绝 `User-Agent` 匹配列表中任意规则的请求，允许其他所有请求。
2.  **白名单 (Allow)**: 只允许 `User-Agent` 匹配列表中至少一条规则的请求，拒绝其他所有请求。

匹配规则使用了强大的**正则表达式**，让您可以进行精确的字符串匹配或灵活的模式匹配，例如匹配特定版本范围的爬虫。

## 使用场景

* **屏蔽恶意爬虫或扫描器**：如果您发现有恶意的网络爬虫或安全扫描器正在消耗您的服务器资源，可以将其 `User-Agent`特征加入**黑名单**，有效阻止它们的访问。
* **阻止自动化脚本访问**：禁止已知的自动化工具或脚本库（如 `curl`, `python-requests`, `Go-http-client`）直接访问您的网站，强制所有访问必须通过浏览器。
* **只允许特定客户端访问**：对于内部 API 或特定应用场景，您可以配置一个**白名单**，只允许您自己开发的、拥有特定 `User-Agent` 的客户端访问。
* **防止搜索引擎索引测试环境**：在您的预发或测试环境中，可以将主流搜索引擎的爬虫（如 `Googlebot`, `Baiduspider`）加入**黑名单**，防止这些环境的内容被公开索引。

## 配置参数

在 `plugin.ua-restriction.toml` 文件中进行配置。

| 参数      | 类型             | 是否必需 | 默认值                   | 说明                                                                              |
| :-------- | :--------------- | :------- | :----------------------- | :-------------------------------------------------------------------------------- |
| `type`    | String           | **是**   | -                        | **（必需）** 限制类型。可选值为 `"deny"` (黑名单模式) 或 `"allow"` (白名单模式)。 |
| `ua_list` | Array of Strings | **是**   | `[]`                     | **（必需）** 一个包含一条或多条**正则表达式**的列表，用于匹配 `User-Agent` 头。   |
| `message` | String           | 否       | `"Request is forbidden"` | 当请求被拒绝时，返回给客户端的自定义提示信息。                                    |

---

## 完整示例

### 示例 1：使用黑名单屏蔽不友好的爬虫

**目标**：我们希望屏蔽掉 `BadBot` 和所有版本的 `SomeScanner` 对我们网站的访问。

1.  **配置插件 (`plugin.ua-blacklist.toml`)**:
    ```toml
    # 设置为黑名单模式
    type = "deny"
    
    # 定义要屏蔽的 User-Agent 的正则表达式
    # 注意：在 TOML 中，反斜杠 \ 需要转义为 \\
    ua_list = [
      # 精确匹配 "BadBot/1.0"
      "^BadBot/1.0$",
      # 匹配所有以 "SomeScanner/" 开头的 User-Agent
      "^SomeScanner/.*"
    ]
    ```

2.  **在 Location 中应用插件 (`location.toml`)**:
    ```toml
    # location.toml
    [locations.route-for-my-app]
    path = "/"
    upstream = "my-web-server"
    plugins = [
        "ua-blacklist",
        # ... 其他插件
    ]
    ```

### 访问效果

* 一个 `User-Agent` 为 `BadBot/1.0` 的请求会被立即拦截，并收到一个 `403 Forbidden` 响应。
* 一个 `User-Agent` 为 `SomeScanner/3.2` 的请求也会被拦截。
* 一个正常的浏览器请求，其 `User-Agent` 为 `Mozilla/5.0 ...`，将不受影响，正常转发到 `my-web-server`。

### 示例 2：使用白名单只允许移动 App 访问

**目标**：`/api/mobile/` 路径下的接口是专门为我们的移动 App 设计的，我们只允许我们自己的 App 访问。假设我们的 App 的 User-Agent 格式为 `MyApp/主版本号.次版本号` (例如 `MyApp/2.1`)。

1.  **配置插件 (`plugin.ua-whitelist-mobile.toml`)**:
    ```toml
    # 设置为白名单模式
    type = "allow"
    
    # 定义只允许我们 App 访问的 User-Agent 正则表达式
    # ^MyApp/\\d+\\.\\d+$ 匹配 "MyApp/" 开头，后跟 "数字.数字" 的格式
    ua_list = [
      "^MyApp/\\d+\\.\\d+$"
    ]
    ```

2.  **在 Location 中应用插件 (`location.toml`)**:
    ```toml
    # location.toml
    [locations.route-for-my-app]
    path = "/api/mobile/"
    upstream = "mobile-api-backend"
    plugins = [
        "ua-whitelist-mobile",
    ]
    ```

### 访问效果
* 一个 `User-Agent` 为 `MyApp/3.0` 的请求可以正常访问 `/api/mobile/` 路径。
* 任何来自浏览器（`Mozilla/5.0...`）或未知客户端的请求，在访问 `/api/mobile/` 时，都将被拦截并收到 `403 Forbidden` 响应。

## 注意事项

* ❗ **安全警告**：`User-Agent` 头是由客户端发送的，因此**可以被轻易伪造**。请不要将 User-Agent 限制作为您**唯一**的安全机制来保护关键或敏感的接口。它更适合作为一道辅助性的、增加攻击难度的防线，或者用于流量管理。
* **空 User-Agent**：如果一个请求**没有** `User-Agent` 头：
    * **白名单模式 (`allow`)**: 该请求**会被拒绝**，因为它不匹配任何允许的规则。
    * **黑名单模式 (`deny`)**: 该请求**会被允许**，因为它不匹配任何被禁止的规则。