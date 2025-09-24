---
sidebar_position: 88
title: 静态文件服务 (Directory)
description: 将 Pingap 作为一个高性能的静态文件服务器，用于托管网站、文档或前端单页面应用 (SPA)。支持目录浏览、缓存控制和强制下载等多种功能。
---

# 静态文件服务 (Directory) 插件

`directory` 插件可以将 `Pingap` 的一个 `Location` 转变为一个功能强大的静态文件服务器，直接从磁盘提供文件服务，而无需将请求转发到上游后端。



## 功能简介

此插件拦截匹配的请求，并将其映射到服务器上的一个指定目录。它具备了生产级静态文件服务器所需的各项核心功能：

* **文件与目录服务**：直接提供文件内容，或在请求目录时自动查找索引文件（如 `index.html`）。
* **目录浏览 (Auto Index)**：如果找不到索引文件，可以自动生成一个类似 Apache 的文件列表页面，方便浏览目录内容。
* **MIME 类型识别**：根据文件扩展名，自动设置正确的 `Content-Type` 响应头。
* **缓存控制**：支持 `ETag` 和 `Cache-Control` (max-age) 响应头，以充分利用浏览器缓存。
* **大文件流式传输**：对于大文件，插件会以分块(chunked)的方式流式传输，减少内存占用。
* **强制下载**：可以配置为强制浏览器下载文件，而不是在浏览器内直接打开。

## 使用场景

* **托管单页面应用 (SPA)**：使用此插件作为您 React, Vue 或 Angular 应用的 Web 服务器，提供 `index.html` 和打包后的 JS/CSS 文件。
* **搭建文档站点**：为您的项目或产品提供静态生成的 HTML 文档。
* **提供可下载文件**：创建一个文件仓库，让用户可以浏览和下载软件包、文档或其他资源。
* **快速搭建本地开发服务器**：在开发过程中，快速启动一个本地 Web 服务器来预览静态页面。

## 配置参数

在 `plugins.directory.toml` 文件中进行配置。

| 参数         | 类型             | 是否必需 | 默认值         | 说明                                                                                                                             |
| :----------- | :--------------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `path`       | String           | **是**   | -              | **（必需）** 指定要提供服务的根目录在服务器上的物理路径。支持绝对路径 (如 `/var/www/html`) 或相对路径 (相对于 Pingap 运行目录)。 |
| `index`      | String           | 否       | `"index.html"` | 当请求的 URL 是一个目录时，自动查找并提供的默认文件名。                                                                          |
| `autoindex`  | Boolean          | 否       | `false`        | 如果请求的是一个目录且找不到 `index` 文件，是否自动生成一个可浏览的文件列表页面。                                                |
| `download`   | Boolean          | 否       | `false`        | 是否为所有文件添加 `Content-Disposition: attachment` 头，强制浏览器弹出下载对话框。                                              |
| `max_age`    | String           | 否       | *(空)*         | 设置 `Cache-Control: max-age` 的值，控制浏览器缓存静态资源的时间。格式为时间字符串（如 `"10m"`, `"24h"`）。                      |
| `private`    | Boolean          | 否       | `false`        | 如果设置，`Cache-Control` 头中会加入 `private` 指令，防止 CDN 等共享缓存缓存资源。                                               |
| `headers`    | Array of Strings | 否       | `[]`           | 为所有响应添加一组自定义的 HTTP 响应头。                                                                                         |
| `charset`    | String           | 否       | *(空)*         | 为 `text/*` 类型的 Mime-Type 响应头添加字符集，例如 `utf-8`。                                                                    |
| `chunk_size` | String           | 否       | `"4KiB"`       | 流式传输大文件时，每个数据块的大小，例如 `"1MB"`。                                                                               |

---

## 完整示例

**目标**：使用 Pingap 托管一个单页面应用 (SPA)，并为 `/assets` 目录下的资源设置长时间的浏览器缓存。

1.  **配置插件 (`plugins.static-spa.toml`)**:
    ```toml
    # 指定应用的根目录
    path = "/var/www/my-app"

    # 当访问 / 时，提供 index.html 文件
    index = "index.html"
    
    # 为所有静态资源设置 1 天的浏览器缓存
    max_age = "24h"
    
    # 禁用目录浏览功能，增加安全性
    autoindex = false
    
    # 为 text/html, text/css, application/javascript 等文件添加 utf-8 字符集
    charset = "utf-8"
    ```

2.  **在 Location 中应用插件 (`location.toml`)**:
    > 💡 **提示**：由于静态文件服务插件通常会直接响应请求，它应该被放置在一个独立的 `Location` 中，并且该 `Location` **不应**配置 `upstream`。

    ```toml
    # ...
    [locations.route-for-my-app]
    # 匹配所有请求
    path = "/"
    # 注意：这里没有 upstream
    plugins = [
        "static-spa",
    ]
    # ...
    ```

### 访问效果

* 当用户访问 `http://your-domain.com/` 时：
    * 插件会匹配到根路径 `/`。
    * 因为它是一个目录，插件会自动查找并提供 `index` 参数指定的文件，即 `/var/www/my-app/index.html`。
    * 响应头中会包含 `Content-Type: text/html; charset=utf-8`。

* 当浏览器请求 `http://your-domain.com/assets/app.js` 时：
    * 插件会将 URL 路径映射到物理文件 `/var/www/my-app/assets/app.js`。
    * 响应头中会包含 `Content-Type: application/javascript; charset=utf-8` 以及 `Cache-Control: max-age=86400`，告诉浏览器可以将这个文件缓存 24 小时。

* 当用户访问一个不存在的路径，如 `http://your-domain.com/non-existent-page` 时：
    * 插件在磁盘上找不到对应的文件，会返回一个标准的 `404 Not Found` 响应。