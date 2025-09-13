---
sidebar_position: 98
title: 响应头修改 (Response Headers)
description: 在将响应发送给客户端之前，动态地添加、设置、删除、重命名或有条件地设置 HTTP 响应头。用于增强安全、控制缓存和添加自定义元数据。
---

# 响应头修改 (Response Headers) 插件

`response-headers` 插件是一个功能强大且灵活的响应处理插件，它允许您在将响应发送给客户端之前，对 HTTP 响应头进行全面的增、删、改、查操作。



## 功能简介

该插件会在响应阶段介入，根据您定义的规则来操作 `ResponseHeader`。它支持五种核心操作：

1.  **添加 (`add_headers`)**: 向响应中**追加**一个新的头。如果同名的头已经存在，此操作会**保留**原有的值并**新增**一个同名头，适用于允许存在多个值的响应头（如 `Set-Cookie`）。
2.  **设置 (`set_headers`)**: **设置**一个头的确切值。如果同名的头已经存在，它的值将被**完全覆盖**；如果不存在，则会创建它。
3.  **删除 (`remove_headers`)**: 从响应中**彻底移除**一个或多个指定的头。
4.  **重命名 (`rename_headers`)**: 将一个已存在的头**重命名**为新的名称，其值保持不变。
5.  **条件设置 (`set_headers_not_exists`)**: **仅当**指定的头**不存在**时，才会设置它。如果已存在，则不进行任何操作。

此外，所有“添加”和“设置”操作都支持使用**动态变量**（如 `{$hostname}`, `{:connection_id}`），使您能够注入动态的上下文信息。

## 使用场景

* **增强安全性**:
    * **删除**敏感信息头，如 `X-Powered-by` 或其他暴露后端技术栈的头。
    * **设置**安全相关的头，如 `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options` 等。
* **缓存控制**:
    * 动态**设置** `Cache-Control` 或 `Expires` 头，为不同的资源路径精细化地控制浏览器和 CDN 的缓存策略。
* **自定义元数据**:
    * **添加**自定义的调试头，如 `X-Trace-Id` (从请求上下文获取), `X-Server-Name` (从环境变量获取) 或 `X-Upstream-Response-Time`。
* **标准化与兼容性**:
    * 将后端服务返回的非标准头**重命名**为标准头，以提高客户端兼容性。

## 配置参数

在 `plugin.response-headers.toml` 文件中进行配置。

| 参数                     | 类型             | 是否必需 | 说明                                                           |
| :----------------------- | :--------------- | :------- | :------------------------------------------------------------- |
| `add_headers`            | Array of Strings | 否       | **追加**响应头。格式: `"Key: Value"`。                         |
| `set_headers`            | Array of Strings | 否       | **设置/覆盖**响应头。格式: `"Key: Value"`。                    |
| `remove_headers`         | Array of Strings | 否       | **删除**响应头。格式: `"Key"`。                                |
| `rename_headers`         | Array of Strings | 否       | **重命名**响应头。格式: `"Old-Key: New-Key"`。                 |
| `set_headers_not_exists` | Array of Strings | 否       | **仅当不存在时设置**响应头。格式: `"Key: Value"`。             |
| `mode`                   | String           | 否       | `"response"`。定义插件在 `upstream` 还是 `response` 阶段执行。 |

---

## 完整示例

**目标**：为我们的 Web 应用 API 响应进行标准化和安全加固。
1.  删除暴露后端信息的 `X-Powered-By` 头。
2.  为所有响应添加一个 `X-Content-Type-Options: nosniff` 安全头。
3.  确保所有响应都有一个 `X-Request-ID`，如果后端没提供，我们就用 Pingap 的请求 ID 补上。
4.  将后端返回的 `X-Svc-Version` 重命名为标准的 `X-Service-Version`。

#### 1. 配置插件 (`plugin.response-headers-security.toml`)
```toml
# 1. 删除不安全的头
remove_headers = [
  "X-Powered-By",
]

# 2. 总是设置安全头 (如果已存在则覆盖)
set_headers = [
  "X-Content-Type-Options: nosniff",
  "X-Frame-Options: DENY",
]

# 3. 如果 X-Request-ID 不存在，则使用 Pingap 的请求 ID
# {:request_id} 是一个动态变量，会自动替换
set_headers_not_exists = [
  "X-Request-ID: {:request_id}",
]

# 4. 重命名后端服务的版本头
rename_headers = [
  "X-Svc-Version: X-Service-Version",
]
```

#### 2. 在 Location 中应用插件 `(location.toml)`

```toml
# location.toml
[locations.route-for-my-app]
path = "/api/"
upstream = "api-backend"
plugins = [
    # 确保 request-id 插件在此之前运行
    "request-id-api", 
    "response-headers-security",
]
```

访问效果

假设后端服务 (api-backend) 对一个请求返回了以下原始响应头：

```bash
HTTP/1.1 200 OK
Content-Type: application/json
X-Powered-By: Express
X-Svc-Version: 1.2.3
```

经过 response-headers-security 插件处理后，最终客户端收到的响应头将变为：

```bash
HTTP/1.1 200 OK
Content-Type: application/json
X-Service-Version: 1.2.3
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-Request-ID: <pingap-generated-id>
```

响应头处理分析：

- `X-Powered-By` 被成功删除。
- `X-Content-Type-Options` 和 `X-Frame-Options` 被成功设置。
- `X-Svc-Version` 被重命名为 `X-Service-Version`。
- 因为原始响应中没有 `X-Request-ID`，所以插件使用 `set_headers_not_exists` 成功地添加了它。