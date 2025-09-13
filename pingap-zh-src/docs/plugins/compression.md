---
sidebar_position: 85
title: 响应压缩 (Compression)
description: 通过 Gzip, Brotli, Zstd 等现代压缩算法动态压缩响应体，显著减少传输数据量，加快网站和 API 的加载速度，并节省带宽成本。
---

# 响应压缩 (Compression) 插件

`compression` 插件能够根据客户端的支持情况，自动对发往客户端的响应体进行**动态压缩**。通过减小响应数据的大小，可以有效提升加载速度，改善用户体验，并节省服务器的带宽成本。

## 功能简介

该插件会智能地协商压缩算法，其工作流程如下：
1.  **检查客户端能力**：插件会读取请求头中的 `Accept-Encoding` 字段，了解客户端支持哪些压缩算法（如 `gzip`, `br`, `zstd`）。
2.  **选择最优算法**：根据您配置的压缩等级，插件会优先选择压缩率最高的算法（优先级：**Zstd > Brotli > Gzip**）与客户端进行协商。
3.  **动态压缩**：在将响应发送给客户端时，插件会以流式方式对响应体进行实时压缩。
4.  **设置响应头**：自动在响应中添加 `Content-Encoding` 头（如 `Content-Encoding: br`），并移除 `Content-Length`，切换到分块传输（Chunked Transfer Encoding）。

该插件支持两种工作模式，以适应不同的应用场景。

## 工作模式

您可以通过 `mode` 参数选择插件的工作模式：

1.  **`response` (响应模式，默认)**
    这是标准的反向代理压缩模式。`Pingap` 会在响应到客户端时，根据客户端的能力**压缩**后发送。
    * **优点**：兼容性最好。无论上游服务或者缓存是否压缩，`Pingap` 都能为客户端提供最优的压缩格式。您还可以在 `Pingap` 上运行其他需要读取响应体的插件（如内容替换）。
    * **缺点**：每次响应均一次压缩的性能开销，不适合使用于缓存已压缩的场景。

2.  **`upstream` (上游模式)**
    在此模式下，`Pingap`会在接收到上游数据时，根据客户端的能力**压缩**，适合与`Accept-Encoding`插件配合使用于请求可缓存的场景。
    * **优点**：可以在缓存前将数据压缩，后续请求可直接获取已压缩的缓存数据
    * **缺点**：要求您的正确配置缓存以及`Accept-Encoding`模块，务必须支持并正确配置了内容压缩。

## 配置参数

在 `plugin.compression.toml` 文件中进行配置。

| 参数         | 类型    | 是否必需 | 默认值       | 说明                                                      |
| :----------- | :------ | :------- | :----------- | :-------------------------------------------------------- |
| `mode`       | String  | 否       | `"response"` | 工作模式。可选值为 `"response"` 或 `"upstream"`。         |
| `gzip_level` | Integer | 否       | `0`          | Gzip 压缩等级。范围 `1` - `9`。`0` 表示不启用 Gzip。      |
| `br_level`   | Integer | 否       | `0`          | Brotli 压缩等级。范围 `1` - `11`。`0` 表示不启用 Brotli。 |
| `zstd_level` | Integer | 否       | `0`          | Zstd 压缩等级。范围 `1` - `22`。`0` 表示不启用 Zstd。     |

💡 **如何选择压缩等级？**
* 较低的等级（如 Gzip: `1-3`, Brotli: `1-4`）消耗的 CPU 资源更少，但压缩率也较低。
* 较高的等级（如 Gzip: `6-9`, Brotli: `8-11`）压缩率更高，但会消耗更多的 CPU 资源。
* 通常建议选择一个**中等偏上**的等级（如 Gzip: `6`, Brotli: `5`）作为性能和压缩率的平衡点。

---

## 完整示例

**目标**：为前端网站资源（HTML, CSS, JS）启用高性能的 `Brotli` 和 `Gzip` 压缩，并让 `Pingap` 负责所有压缩工作。

1.  **配置插件 (`plugin.compression-frontend.toml`)**:
    ```toml
    # 使用默认的 "response" 模式
    # mode = "response"

    # 设置 Brotli 压缩等级为 5
    br_level = 5
    
    # 设置 Gzip 压缩等级为 6, 作为不支持 Brotli 的客户端的备选项
    gzip_level = 6

    # zstd_level 未设置，保持为 0，表示不启用
    ```

2.  **在 Location 中应用插件 (`location.toml`)**:
    ```toml
    # ...
    [locations.route-for-my-app]
    # 匹配所有到前端服务的请求
    path = "/"
    upstream = "frontend-server"
    plugins = [
        "compression-frontend",
    ]
    # ...
    ```

### 访问效果

* **使用 Chrome 浏览器 (支持 Brotli 和 Gzip) 访问**:
    * 客户端发送 `Accept-Encoding: gzip, deflate, br, zstd`。
    * Pingap 选择优先级最高的 Brotli (`br`) 算法。
    * 响应头中会包含 `Content-Encoding: br`，响应体是经过 Brotli 压缩的数据。

* **使用较旧的客户端 (仅支持 Gzip) 访问**:
    * 客户端发送 `Accept-Encoding: gzip`。
    * Pingap 选择 Gzip 算法。
    * 响应头中会包含 `Content-Encoding: gzip`，响应体是经过 Gzip 压缩的数据。


## 注意事项

* **内容类型**: 插件只会对可被压缩的 `Content-Type`（如 `text/html`, `application/json`, `text/css` 等）进行压缩。图片（JPEG, PNG）、视频等二进制文件默认不会被压缩，因为它们通常已经是压缩格式，再次压缩没有意义。
* **性能消耗**: 开启压缩会消耗一定的 CPU 资源。请根据您的服务器性能和业务负载，选择合适的压缩算法和等级。