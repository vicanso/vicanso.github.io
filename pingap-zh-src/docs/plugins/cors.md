---
sidebar_position: 86 
title: 跨域资源共享 (CORS)
description: 轻松为您的 API 添加跨域资源共享 (CORS) 支持，自动处理 Preflight 预检请求并附加必要的响应头，让您的前后端分离应用顺畅通信。
---

# 跨域资源共享 (CORS) 插件

`cors` 插件能够自动为您处理浏览器发起的跨域资源共享 (Cross-Origin Resource Sharing) 请求，让您无需在后端服务中编写复杂的 CORS 处理逻辑。



## 功能简介

出于安全原因，浏览器会限制从一个源 (origin) 发起的脚本去请求另一个源的资源。CORS 是一种 W3C 标准，它允许服务器声明哪些源有权限访问其资源。

`cors` 插件通过两种方式实现这一机制：
1.  **处理 Preflight 预检请求**：对于复杂的跨域请求（如 `PUT` 方法或带有自定义请求头的请求），浏览器会先发送一个 `OPTIONS` 方法的“预检”请求。此插件会自动拦截并响应这个请求，告诉浏览器实际的请求是安全的。
2.  **附加 CORS 响应头**：对于简单的或通过了预检的实际请求，插件会在最终的响应中附加必要的 `Access-Control-Allow-*` 响应头，授权浏览器接收和处理响应。

通过简单的配置，您可以精确控制谁可以访问您的 API、允许哪些方法和请求头，以及预检结果的缓存时间。

## 使用场景

* **前后端分离应用**：这是最典型的场景。当您的前端应用（如 React, Vue）部署在 `https://app.example.com`，而后端 API 服务在 `https://api.example.com` 时，前端发往后端的任何请求都属于跨域请求，必须通过 CORS 策略来允许。
* **对外开放的公共 API**：如果您提供一个公共 API 供第三方开发者在他们的网站上调用，您需要配置 CORS 来授权这些第三方的源。
* **Web Fonts 或 CDN 资源**：当网页需要从不同的域加载字体、图片或其他资源时，也需要配置 CORS。

## 配置参数

在 `plugins.cors.toml` 文件中进行配置。

| 参数                | 类型    | 是否必需 | 默认值             | 说明                                                                                                                                     |
| :------------------ | :------ | :------- | :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `allow_origin`      | String  | 否       | `*`                | 允许的来源域。可以是 `*` (允许任何域), 单个域名 (如 `https://app.example.com`)，或动态值 `` `{$http_origin}` `` (镜像请求的 Origin 头)。 |
| `allow_methods`     | String  | 否       | `"GET, POST, ..."` | 允许的 HTTP 方法列表，以逗号分隔。                                                                                                       |
| `allow_headers`     | String  | 否       | *(空)*             | 允许的自定义请求头列表，以逗号分隔，如 `Content-Type, X-Token`。                                                                         |
| `expose_headers`    | String  | 否       | *(空)*             | 允许前端 JavaScript 访问的响应头列表，以逗号分隔。                                                                                       |
| `allow_credentials` | Boolean | 否       | `false`            | 是否允许请求携带凭证（如 Cookies, Authorization 头）。注意：若设为 `true`，`allow_origin` **不能**为 `*`。                               |
| `max_age`           | String  | 否       | `"1h"`             | Preflight 预检请求结果在浏览器中的缓存时间，格式为时间字符串（如 `"10m"`, `"24h"`）。                                                    |
| `path`              | String  | 否       | *(空)*             | 一个正则表达式，用于指定此 CORS 策略只对匹配的路径生效。                                                                                 |

---

## 完整示例

**目标**：为一个前后端分离项目配置 CORS。前端部署在 `https://app.my-domain.com`，API 服务通过 `/api/` 路径访问。API 需要处理 `GET`, `POST`, `PUT` 请求，并使用 `Content-Type` 和 `X-Auth-Token` 这两个自定义请求头。

1.  **配置插件 (`plugins.cors-webapp.toml`)**:
    ```toml
    # 只为 /api/ 路径下的请求启用 CORS
    path = "^/api/"

    # 只允许来自我们的前端应用的跨域请求
    # 使用 {$http_origin} 可以支持多个环境，如开发/预发/生产
    allow_origin = "[https://app.my-domain.com](https://app.my-domain.com)"
    
    # 允许前端应用使用的 HTTP 方法
    allow_methods = "GET, POST, PUT, OPTIONS"
    
    # 允许前端发送的自定义请求头
    allow_headers = "Content-Type, X-Auth-Token"
    
    # 允许前端访问响应中的 X-Request-ID 头，便于调试
    expose_headers = "X-Request-ID"
    
    # 允许跨域请求携带和设置 Cookie
    allow_credentials = true
    
    # 将预检结果缓存 24 小时，减少 OPTIONS 请求
    max_age = "24h"
    ```

2.  **在 Location 中应用插件 (`location.toml`)**:
    ```toml
    # ...
    [locations.route-for-my-app]
    upstream = "api-backend"
    plugins = [
        "cors-webapp",
    ]
    # ...
    ```

### 访问效果

* 当前端应用 `https://app.my-domain.com` 向 `/api/users` 发起一个带 `X-Auth-Token` 的 `PUT` 请求时：
    1.  浏览器会自动发送一个 `OPTIONS /api/users` 预检请求。
    2.  Pingap 的 CORS 插件会拦截此请求，检查配置后，返回一个 `204 No Content` 响应，并附上 `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers` 等响应头。
    3.  浏览器验证通过后，才会发送真正的 `PUT /api/users` 请求。
    4.  当 `api-backend` 服务返回响应后，CORS 插件会再次介入，在最终的响应中添加 `Access-Control-Allow-Origin: https://app.my-domain.com` 等头，然后才发回给浏览器。