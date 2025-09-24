---
sidebar_position: 90
title: JWT 认证 (JWT)
description: 通过验证 JSON Web Token (JWT) 来保护您的 API 和服务。插件支持多种 Token 传递方式、签名算法，并能将后端认证逻辑转化为无状态的 JWT 令牌。
---

# JWT 认证 (JWT) 插件

`jwt` 插件是一个功能强大的认证插件，它通过验证 **JSON Web Token (JWT)** 来保护您的上游服务，为您的 API 提供无状态 (stateless)、可扩展的现代化认证方案。



## 功能简介

该插件具有双重职责：**验证令牌**和**生成令牌**。

#### 1. 验证令牌 (Token Validation)
对于除登录接口外的所有请求，插件会自动从指定位置（HTTP Header, Cookie, 或 Query 参数）提取 JWT，并执行一系列严格的校验：
* **签名验证**: 使用预设的密钥验证令牌签名，确保令牌未被篡改。支持 **HS256** 和 **HS512** 算法。
* **过期验证**: 检查令牌中的 `exp` 声明，拒绝已过期的令牌。
* **格式验证**: 确保令牌是标准的三段式结构。

#### 2. 生成令牌 (Token Generation)
当请求访问您指定的**认证路径** (如 `/api/login`) 时，插件不会执行验证。相反，它会拦截来自该路径上游服务的**成功响应**，并将响应体 (通常是包含用户信息的 JSON) 作为 JWT 的 `payload` (载荷)，用您的密钥签名后，生成一个全新的 JWT。最终，它会将这个 JWT 以 JSON 格式返回给客户端。

这个设计允许您将传统的、有状态的认证逻辑（如用户名密码验证）无缝转换为现代的、无状态的 JWT 认证模式。

## 使用场景

* **保护无状态 API**: 这是 JWT 最典型的应用场景。客户端在登录后获取一个 JWT，并在后续所有请求中携带它，服务器无需查询数据库或 session 即可验证用户身份。
* **微服务认证**: 在微服务架构中，一个服务（如用户认证服务）可以签发 JWT，其他所有服务只需使用相同的密钥进行验证即可，实现了服务间的解耦。
* **单页面应用 (SPA) 认证**: 前端应用（React, Vue 等）在登录后将 JWT 存储在本地（如 Local Storage），并在后续 API 请求的 `Authorization` 头中携带它。

## 配置参数

在 `plugins.jwt.toml` 文件中进行配置。

| 参数                          | 类型   | 是否必需        | 默认值    | 说明                                                                                                      |
| :---------------------------- | :----- | :-------------- | :-------- | :-------------------------------------------------------------------------------------------------------- |
| `secret`                      | String | **是**          | -         | **（必需）** 用于 HMAC 签名的**绝密**密钥。必须足够复杂和随机，且所有 Pingap 实例必须使用相同的密钥。     |
| `header` / `query` / `cookie` | String | **是** (三选一) | -         | **（必需）** 指定从何处提取 JWT。`header`: 请求头名称；`query`: URL 查询参数名称；`cookie`: Cookie 名称。 |
| `auth_path`                   | String | 否              | *(空)*    | **令牌生成路径**。如果配置此项，访问该路径的请求将触发**令牌生成**流程。                                  |
| `algorithm`                   | String | 否              | `"HS256"` | 签名算法。可选值为 `"HS256"` 或 `"HS512"`。HS512 更安全但计算开销稍大。                                   |
| `delay`                       | String | 否              | -         | 对**验证失败**的请求引入一个延迟，例如 `"100ms"`。这是一个有效的**时序攻击防御**机制。                    |

---

## 完整示例

**目标**：我们有一个传统的登录接口位于 `auth-server`，它接收用户名和密码，验证成功后返回用户的 JSON 信息。我们希望使用 Pingap 将其改造为 JWT 认证。

* **登录接口**: `POST /api/auth/login`
* **受保护接口**: `/api/me`

#### 1. 认证流程设计
1.  客户端向 Pingap 的 `/api/auth/login` 发送用户名和密码。
2.  Pingap 将请求转发到后端的 `auth-server`。
3.  `auth-server` 验证凭证。成功则返回 `200 OK` 和用户信息的 JSON（如 `{"userId": 123, "role": "admin", "exp": 1757751000}`）。
4.  Pingap 的 JWT 插件拦截到这个成功响应，将其作为 `payload` 签名，生成一个 JWT。
5.  Pingap 向客户端返回 `{"token": "xxx.yyy.zzz"}`。
6.  客户端在后续请求 `/api/me` 时，在请求头中携带 `Authorization: Bearer xxx.yyy.zzz`。
7.  JWT 插件验证此令牌，成功后才将请求转发到后端。

#### 2. 配置插件 (`plugins.jwt-main.toml`)

```toml
# 用于签名的密钥
secret = "MySuperSecretKeyThatIsVeryLongAndSecure"

# 令牌生成路径
auth_path = "/api/auth/login"

# 验证时，从 Authorization 请求头中提取令牌
header = "Authorization"

# 使用更强的 HS512 算法
algorithm = "HS512"
```

#### 3. 在 Location 中应用插件 (location.toml)

```toml
# ...
[locations.route-for-my-app]
# 匹配所有 API 请求，包括登录和受保护的接口
path = "/api/"
upstream = "api-backend" # 假设所有 API 都在同一个后端
plugins = [
    "jwt-main",
]
# ...
```

访问效果

- 登录:
  - POST `/api/auth/login`，携带正确的用户名和密码。
  - 后端 `api-backend` 返回 200 OK 和 `{"userId": 123, "role": "admin", "exp": ...}`。
  - 客户端最终收到 `Pingap` 返回的 200 OK 和 `{"token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywicm9sZSI6ImFkbWluIiwiZXhwIjoxNzU3NzUxMDAwfQ.xxxxxxxx"}`。

- 访问受保护资源 (成功):
  - GET /api/me，请求头包含 `Authorization: Bearer eyJ...`。
  - 插件验证令牌成功，请求被转发到 `api-backend`。

- 访问受保护资源 (失败):
  - GET `/api/me`，没有 `Authorization` 头，或令牌被篡改/已过期。
  - 插件立即返回 401 Unauthorized 响应，请求不会到达 `api-backend`。