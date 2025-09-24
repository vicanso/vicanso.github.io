---
sidebar_position: 99
title: 内容替换 (Sub Filter)
description: 对响应体内容进行实时的查找和替换。支持简单的字符串替换和强大的正则表达式替换，可用于动态修改 HTML、JSON 或其他文本内容。
---

# 内容替换 (Sub Filter) 插件

`sub-filter` 插件是一个强大的响应体处理插件，它允许您在将响应发送给客户端之前，**实时地对响应体内容进行查找和替换**。

## 功能简介

该插件会在响应阶段介入，流式地读取来自上游服务的响应体，并根据您定义的一系列过滤规则来修改内容。它支持两种核心的替换模式：

1.  **字符串替换 (`sub_filter`)**:
    * 进行简单的、大小写敏感的文本查找和替换。

2.  **正则替换 (`subs_filter`)**:
    * 使用正则表达式进行更复杂的、模式匹配式的查找和替换。

对于这两种模式，您都可以通过标志位 (flags) 来控制替换行为，例如是否进行**全局替换**或**忽略大小写**。

## 使用场景

* **动态修改 HTML 内容**：
    * **协议替换**：将 HTML 中所有写死的 `http://` 链接替换为 `https://`，以修复混合内容 (mixed content) 的安全警告。
    * **注入脚本**：在 `</body>` 标签前自动注入网站分析脚本（如 Google Analytics）或自定义的 JavaScript/CSS。
    * **环境适配**：将后端返回的指向测试环境 (`staging.api.com`) 的 API 地址，动态替换为生产环境的地址 (`api.com`)。

* **API 响应调整**：
    * **字段重命**：在不修改后端代码的情况下，将 API 响应中的某个旧的 JSON 字段名替换为新的名称，以兼容新版客户端。
    * **数据脱敏**：在将包含敏感信息的响应（如日志、调试信息）发送到预发环境前，用 `***` 替换掉其中的密码或密钥字段。

## 配置参数

在 `plugins.sub-filter.toml` 文件中进行配置。

| 参数      | 类型             | 是否必需 | 说明                                                                                                         |
| :-------- | :--------------- | :------- | :----------------------------------------------------------------------------------------------------------- |
| `path`    | String           | **是**   | **（必需）** 一个正则表达式，用于匹配请求的 URL **路径**。只有路径匹配成功的请求，其响应体才会被此插件处理。 |
| `filters` | Array of Strings | **是**   | **（必需）** 一个包含一条或多条**过滤规则**的列表。规则会按照列表中的顺序依次执行。                          |

### 过滤规则 (`filters`) 语法

每一条过滤规则都是一个遵循特定格式的字符串：`<type> '<pattern>' '<replacement>' [flags]`

* **`<type>`**: 规则类型，必须是 `sub_filter` 或 `subs_filter`。
* **`'<pattern>'`**: 要查找的内容。对于 `sub_filter`，它是普通字符串；对于 `subs_filter`，它是一个正则表达式。**必须用单引号包裹**。
* **`'<replacement>'`**: 替换后的新内容。**必须用单引号包裹**。
* **`[flags]`** (可选): 一个或多个标志位，用于修改匹配行为：
    * `g`: **全局 (Global)** 替换。替换所有匹配项，而不仅仅是第一个。
    * `i`: **忽略大小写 (Ignore Case)** 匹配。仅对 `subs_filter` 有效。


## 完整示例

**目标**：我们有一个旧的后端服务，它在返回的 HTML 页面中硬编码了一些 `http://` 链接和一个指向旧 CSS 文件的路径。我们希望通过 Pingap 来修复这些问题，而无需修改后端代码。

1.  **配置插件 (`plugins.sub-filter-legacy-fix.toml`)**:
    ```toml
    # 只对返回 HTML 的页面生效 (假设它们都在 /legacy/ 路径下)
    path = "^/legacy/"

    # 定义一组过滤规则
    filters = [
      # 规则1: 全局、不区分大小写地将所有 http:// 替换为 https://
      "subs_filter 'http://' 'https://' gi",
      
      # 规则2: 将旧的 CSS 文件路径替换为新的 CDN 路径
      "sub_filter '/static/css/old-style.css' '[https://cdn.example.com/assets/new-style.css](https://cdn.example.com/assets/new-style.css)' g"
    ]
    ```

2.  **在 Location 中应用插件 (`location.toml`)**:
    ```toml
    # location.toml
    [locations.route-for-my-app]
    path = "/legacy/"
    upstream = "legacy-backend"
    plugins = [
        "sub-filter-legacy-fix",
    ]
    ```

### 访问效果

假设后端服务 (`legacy-backend`) 对 `/legacy/index.html` 的请求返回了以下原始 HTML 内容：

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/static/css/old-style.css">
</head>
<body>
  <p>Welcome! Visit our main site at <a href="[http://my-company.com](http://my-company.com)">My Company</a>.</p>
  <img src="HTTP://[my-company.com/logo.png](https://my-company.com/logo.png)">
</body>
</html>
```

经过 `sub-filter-legacy-fix` 插件处理后，最终客户端收到的 HTML 将变为：

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="[https://cdn.example.com/assets/new-style.css](https://cdn.example.com/assets/new-style.css)">
</head>
<body>
  <p>Welcome! Visit our main site at <a href="[https://my-company.com](https://my-company.com)">My Company</a>.</p>
  <img src="[https://my-company.com/logo.png](https://my-company.com/logo.png)">
</body>
</html>
```

SubFilter的处理分析:
  - `http://` 和 `HTTP://` 都被成功替换为了 `https://` (因为 subs_filter 和 i 标志)。
  - `/static/css/old-style.css` 被成功替换为了 CDN 地址 (因为 sub_filter)。

注意事项

- 性能: 正则表达式替换 (subs_filter) 会比简单的字符串替换 (sub_filter) 消耗更多的 CPU 资源。请优先使用 sub_filter，只在必要时才使用正则。
- 内容修改: 此插件会修改响应体，因此它会自动移除 Content-Length 响应头，并使用 Transfer-Encoding: chunked（分块传输）来发送响应。

