---
sidebar_position: 96
title: Referer 限制
description: 通过检查 HTTP Referer 请求头，实现对请求来源的访问控制。有效防止图片、视频等资源被盗链，并可限制 API 只能从受信任的网站调用。
---

# Referer 限制 (Referer Restriction) 插件

`referer-restriction` 插件是一个请求阶段的安全插件，它通过检验 HTTP `Referer` 请求头来识别请求的来源页面，并根据您配置的规则列表来**允许**或**拒绝**该请求。



## 功能简介

当浏览器从一个页面（例如 `https://example.com/page`）向您的服务请求一个资源（例如一张图片）时，它通常会带上一个 `Referer` 请求头，其值为 `https://example.com/page`。此插件正是利用这一机制来实现访问控制。

它支持两种核心工作模式：
1.  **白名单 (Allow)**: 只允许 `Referer` 在您指定的列表中的请求通过。
2.  **黑名单 (Deny)**: 拒绝 `Referer` 在您指定的列表中的请求通过。

匹配规则支持**精确域名**（如 `example.com`）和**通配符域名**（如 `*.example.com`）两种形式，提供了灵活的配置选项。

## 使用场景

* **防止资源盗链 (Hotlinking)**：这是最经典的应用场景。您可以配置一个**白名单**，只允许来自您自己网站的 `Referer` 来加载图片、视频、字体等静态资源，从而防止其他网站直接盗用您的资源，消耗您的服务器带宽。
* **增强 API 安全性**：为您的 Web API 配置一个**白名单**，只允许来自您官方前端应用所在域名的请求调用，阻止其他未知网站直接调用您的 API，增加一层安全防护。
* **屏蔽恶意或垃圾来源**：如果您发现有垃圾网站或恶意爬虫通过伪造 `Referer` 来访问您的服务，可以将它们的域名加入**黑名单**。

## 配置参数

在 `plugin.referer-restriction.toml` 文件中进行配置。

| 参数           | 类型             | 是否必需 | 默认值                   | 说明                                                                                                                                     |
| :------------- | :--------------- | :------- | :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `type`         | String           | **是**   | -                        | **（必需）** 限制类型。可选值为 `"deny"` (黑名单模式) 或 `"allow"` (白名单模式)。                                                        |
| `referer_list` | Array of Strings | **是**   | `[]`                     | **（必需）** 一个用于匹配 `Referer` 头中域名的列表。支持两种格式：<br/>• **精确匹配**: `"site.com"`<br/>• **通配符匹配**: `"*.site.com"` |
| `message`      | String           | 否       | `"Request is forbidden"` | 当请求被拒绝时，返回给客户端的自定义提示信息。                                                                                           |

---

## 完整示例

### 示例 1：防止图片被盗链 (白名单模式)

**目标**：我们的网站域名是 `my-gallery.com`，我们只希望 `/images/` 目录下的图片能被我们自己的网站（包括所有子域名）引用。

1.  **配置插件 (`plugin.referer-allow-images.toml`)**:
    ```toml
    # 设置为白名单模式
    type = "allow"
    
    # 只允许来自 my-gallery.com 及其所有子域名的请求
    referer_list = [
      "my-gallery.com",
      "*.my-gallery.com",
    ]
    ```

2.  **在 Location 中应用插件 (`location.toml`)**:
    ```toml
    # location.toml
    [locations.route-for-my-app]
    # 只对图片目录生效
    path = "/images/"
    # 此 Location 由静态文件插件或上游服务处理
    upstream = "static-assets-backend" 
    plugins = [
        "referer-allow-images",
    ]
    ```

### 访问效果
* 当 `https://my-gallery.com/index.html` 页面加载图片 `/images/cat.jpg` 时，请求的 `Referer` 是 `https://my-gallery.com/index.html`，匹配白名单，**访问成功**。
* 当 `https://evil-site.com/steal.html` 页面试图通过 `<img>` 标签引用 `/images/cat.jpg` 时，请求的 `Referer` 是 `https://evil-site.com/steal.html`，不匹配白名单，请求将被拦截并返回 **`403 Forbidden`**。

### 示例 2：屏蔽已知的垃圾来源 (黑名单模式)

**目标**：屏蔽来自 `spam-domain.com` 和 `bad-site.org` 的所有访问。

1.  **配置插件 (`plugin.referer-deny-spam.toml`)**:
    ```toml
    # 设置为黑名单模式
    type = "deny"
    
    # 列出要屏蔽的域名
    referer_list = [
      "spam-domain.com",
      "bad-site.org",
    ]
    ```

2.  **在 Location 中应用插件 (`location.toml`)**:
    ```toml
    # location.toml
    [locations.route-for-my-app]
    path = "/"
    upstream = "main-server"
    plugins = [
        "referer-deny-spam",
        # ... 其他插件
    ]
    ```

### 访问效果
* 任何 `Referer` 头指向 `spam-domain.com` 或 `bad-site.org` 的请求都将被拦截并返回 **`403 Forbidden`**。
* 来自其他来源（如 Google 搜索结果页）的请求将正常通过。

## 注意事项

* ❗ **安全警告**：`Referer` 头是由客户端（浏览器）发送的，因此**可以被伪造**。请不要将 Referer 限制作为您**唯一**的安全机制来保护关键或敏感的操作。它更适合作为一道辅助性的、增加攻击难度的防线。
* **空 Referer**：当用户直接在浏览器地址栏输入网址，或者从 HTTPS 页面跳转到 HTTP 页面时，`Referer` 头可能是空的。在此插件中：
    * **白名单模式 (`allow`)**: 空 `Referer` 的请求**会被拒绝**，因为它不匹配任何允许的域名。
    * **黑名单模式 (`deny`)**: 空 `Referer` 的请求**会被允许**，因为它不匹配任何被禁止的域名。