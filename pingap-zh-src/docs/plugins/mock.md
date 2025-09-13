---
sidebar_position: 93
title: Mock 服务
description: 无需后端服务，直接由 Pingap 返回预设的 HTTP 响应。是前端开发、API 调试、模拟异常和进行负载测试的强大工具。
---

# Mock 服务 (Mocking) 插件

`mock` 插件可以将 Pingap 变为一个可配置的 Mock 服务器。当请求命中应用了此插件的 `Location` 时，它会**拦截**该请求，并**直接返回一个您预先定义好的响应**，而不会将请求转发到任何上游服务。



## 功能简介

该插件的核心功能是响应的完全自定义。您可以精确控制：
* **响应状态码 (Status Code)**：返回 `200 OK`, `404 Not Found`, `503 Service Unavailable` 等任意状态码。
* **响应头 (Headers)**：添加任意自定义的 HTTP 响应头，如 `Content-Type`。
* **响应体 (Body)**：返回任意内容的响应体，无论是 JSON、HTML 还是纯文本。
* **响应延迟 (Delay)**：可以模拟网络延迟或慢速的后端服务，为响应增加一个人为的延迟时间。

## 使用场景

* **前后端并行开发**：当前端开发需要某个 API，但后端还未完成时，可以使用 Mock 插件模拟该 API 的成功或失败响应，让前端开发不受阻塞。
* **API 文档与演示**：在 API 文档中提供可交互的示例，用户可以直接调用这些 Mock 接口来查看请求和响应的格式。
* **模拟异常情况**：轻松模拟后端服务出错的场景（如 5xx 错误），以测试前端应用的错误处理、重试和熔断逻辑是否健壮。
* **负载与压力测试**：在测试客户端或负载均衡器时，使用 Mock 插件提供一个稳定且响应时间可控的后端服务，排除真实后端性能波动带来的干扰。
* **临时维护页面**：在后端服务进行维护时，快速将某个 `Location` 的所有请求指向一个包含“系统维护中”信息的 Mock 响应。

## 配置参数

在 `plugin.mock.toml` 文件中进行配置。

| 参数      | 类型             | 是否必需 | 默认值 | 说明                                                                                                   |
| :-------- | :--------------- | :------- | :----- | :----------------------------------------------------------------------------------------------------- |
| `status`  | Integer          | 否       | `200`  | Mock 响应的 HTTP 状态码。                                                                              |
| `data`    | String           | 否       | *(空)* | Mock 响应的响应体内容。                                                                                |
| `headers` | Array of Strings | 否       | `[]`   | 一组自定义的 HTTP 响应头，每行一个，格式为 `"Key: Value"`。                                            |
| `path`    | String           | 否       | *(空)* | **路径匹配**。如果设置，则只有请求路径与此值**完全相等**时，插件才会生效。如果留空，则对所有请求生效。 |
| `delay`   | String           | 否       | -      | 在返回响应前的人为延迟。格式为时间字符串（如 `"500ms"`, `"2s"`）。                                     |


## 完整示例

**目标**：在开发过程中，前端需要 `/api/users/me` 接口返回当前用户信息，但后端尚未实现。同时，我们需要模拟一个会随机失败的 `/api/orders` 接口。

### 1. 配置插件

我们需要创建两个独立的 Mock 插件实例。

**`plugin.mock-user-profile.toml` (模拟成功响应)**:
```toml
# 总是返回 200 OK
status = 200

# 返回固定的 JSON 数据
data = '''
{
  "id": 123,
  "username": "dev_user",
  "email": "dev@example.com",
  "roles": ["ADMIN", "USER"]
}
'''
```

### 设置响应内容类型为 JSON
```toml
headers = [
  "Content-Type: application/json; charset=utf-8",
]

# 模拟 50ms 的网络延迟
delay = "50ms"
```

**`plugin.mock-service-unavailable.toml` (模拟失败响应)**:

```toml
# 返回 503 服务不可用
status = 503

# 返回一个简单的错误信息
data = "The order service is temporarily unavailable. Please try again later."

headers = [
  "Content-Type: text/plain",
  # 添加一个重试建议的响应头
  "Retry-After: 60", 
]
```

### 2. 在 Location 中应用插件

现在，我们在 `location.toml` 中创建两条路由规则，分别应用这两个插件。


```toml
# location.toml

# --- 规则一：模拟用户信息接口 ---
[locations.route-for-my-app-user]
# 精确匹配此路径
path = "/api/users/me"
# 注意：Mock 插件不需要 upstream
plugins = [
    "mock-user-profile",
]

# --- 规则二：模拟不稳定的订单服务 ---
[locations.route-for-my-app-order]
path = "/api/orders"
plugins = [
    "mock-service-unavailable",
]
```


访问效果

- 请求用户信息: GET /api/users/me
  - Pingap 会等待 50ms，然后立即返回一个 200 OK 响应，响应体为我们预设的用户 JSON 数据。请求完全不会触及任何后端服务。

- 请求订单服务: POST /api/orders
  - Pingap 会立即返回一个 503 Service Unavailable 响应，响应体为文本提示信息，并建议客户端在 60 秒后重试。

通过这种方式，前端团队可以完全独立地进行开发和测试，极大地提升了团队的并行协作效率。