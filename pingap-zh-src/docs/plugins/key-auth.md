---
sidebar_position: 91
title: API 密钥认证 (Key Auth)
description: 通过验证 HTTP 请求头或 URL 查询参数中的 API 密钥 (API Key) 来保护您的服务。支持凭证隐藏和暴力破解防御，是保护 API 的常用方法。
---

# API 密钥认证 (Key Auth) 插件

`key-auth` 插件是一个请求阶段的认证插件，它通过校验预设的 **API 密钥 (API Key)** 来保护您的上游服务。只有携带了有效密钥的请求才会被允许访问。



## 功能简介

该插件会拦截进入的请求，并从指定位置查找 API 密钥，然后与一个安全的密钥列表进行比对。

#### 密钥传递方式
您可以灵活选择客户端通过以下**两种方式之一**来传递 API 密钥：
1.  **HTTP 请求头 (Header)**: 在请求头中携带密钥，例如 `X-Api-Key: my-secret-key`。这是最常用、也更安全的方式。
2.  **URL 查询参数 (Query)**: 在 URL 的查询字符串中附加密钥，例如 `https://api.example.com/data?api_key=my-secret-key`。

#### 安全特性
* **暴力破解防御**：可配置在验证失败时引入一个**延迟**，有效增加自动化攻击的成本。
* **凭证隐藏**：认证成功后，可以自动从请求中**移除** API 密钥，防止密钥泄露到上游服务或日志中。
* **明确的错误响应**：对于“密钥缺失”和“密钥无效”这两种不同的失败情况，会返回不同的错误信息，便于客户端调试。

## 使用场景

* **保护公共或合作伙伴 API**：为您提供给第三方开发者或合作伙伴的 API 增加一道准入门槛。您可以为每个消费者分配一个独立的 API 密钥。
* **物联网 (IoT) 设备认证**：在许多物联网场景中，设备使用固定的 API 密钥来向服务器证明自己的身份。
* **内部服务间认证**：在微服务架构中，服务间的调用可以通过简单的 API 密钥进行认证。

## 配置参数

在 `plugin.key-auth.toml` 文件中进行配置。

| 参数               | 类型             | 是否必需        | 默认值  | 说明                                                                                                      |
| :----------------- | :--------------- | :-------------- | :------ | :-------------------------------------------------------------------------------------------------------- |
| `header` / `query` | String           | **是** (二选一) | -       | **（必需）** 指定密钥的位置。`header`: HTTP 请求头的名称；`query`: URL 查询参数的名称。两者只能配置一个。 |
| `keys`             | Array of Strings | **是**          | `[]`    | **（必需）** 一个包含所有有效 API 密钥的列表。                                                            |
| `hide_credentials` | Boolean          | 否              | `false` | 认证成功后，是否从请求中**移除** API 密钥。**强烈建议开启 (`true`)**。                                    |
| `delay`            | String           | 否              | -       | 对**无效**的密钥验证尝试引入一个延迟，例如 `"200ms"` 或 `"1s"`，用于防御暴力破解。                        |

---

## 完整示例

### 示例 1：使用请求头进行认证 (推荐)

**目标**：保护 `/api/v1/` 下的所有接口，要求客户端必须在 `X-Api-Key` 请求头中提供有效的密钥。

1.  **配置插件 (`plugin.key-auth-header.toml`)**:
    ```toml
    # 指定从 "X-Api-Key" 请求头中读取密钥
    header = "X-Api-Key"
    
    # 定义两个有效的 API 密钥
    keys = [
      "key-for-user-A",
      "key-for-user-B",
    ]

    # 认证成功后隐藏密钥
    hide_credentials = true

    # 对失败的尝试延迟 500 毫秒
    delay = "500ms"
    ```

2.  **在 Location 中应用插件 (`location.toml`)**:
    ```toml
    # ...
    [locations.route-for-my-app]
    path = "/api/v1/"
    upstream = "api-backend"
    plugins = [
        "key-auth-header",
    ]
    # ...
    ```

### 访问效果

* **请求成功**:
  `curl -H "X-Api-Key: key-for-user-A" http://your-domain.com/api/v1/data`
  > 请求将被成功转发到 `api-backend`，并且 `X-Api-Key` 请求头**不会**被包含在转发的请求中。

* **密钥无效**:
  `curl -H "X-Api-Key: invalid-key" http://your-domain.com/api/v1/data`
  > Pingap 会等待 500 毫秒，然后返回 `401 Unauthorized` 和 `Key auth fail` 的错误信息。

* **密钥缺失**:
  `curl http://your-domain.com/api/v1/data`
  > Pingap 会立即返回 `401 Unauthorized` 和 `Key missing` 的错误信息。

### 示例 2：使用查询参数进行认证

**目标**：为了兼容一些无法设置请求头的旧客户端，我们允许通过 URL 查询参数 `apiKey` 进行认证。

1.  **配置插件 (`plugin.key-auth-query.toml`)**:
    ```toml
    # 指定从 "apiKey" 查询参数中读取密钥
    query = "apiKey"
    
    # 定义有效的 API 密钥
    keys = [
      "legacy-client-key",
    ]

    # 认证成功后从 URL 中移除 apiKey 参数
    hide_credentials = true
    ```

2.  **在 Location 中应用插件 (`location.toml`)**:
    ```toml
    # ...
    [locations.route-for-my-app]
    path = "/legacy-api/"
    upstream = "legacy-backend"
    plugins = [
        "key-auth-query",
    ]
    # ...
    ```

### 访问效果
* **请求成功**:
  `curl "http://your-domain.com/legacy-api/data?apiKey=legacy-client-key&param=1"`
  > 请求将被成功转发到 `legacy-backend`，并且转发的 URL 将变为 `/legacy-api/data?param=1`，`apiKey` 参数被成功移除。