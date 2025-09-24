---
sidebar_position: 85
title: Response Compression
description: Dynamically compress response bodies with modern algorithms like Gzip, Brotli, and Zstd to significantly reduce data transfer size, speed up website and API loading, and save on bandwidth costs.
---

# Response Compression Plugin

The `compression` plugin automatically performs **dynamic compression** on response bodies sent to the client, based on the client's capabilities. By reducing the size of response data, it can effectively improve loading speeds, enhance user experience, and save server bandwidth costs.

## Feature Introduction

The plugin intelligently negotiates the compression algorithm. Its workflow is as follows:
1.  **Check Client Capabilities**: The plugin reads the `Accept-Encoding` field from the request header to understand which compression algorithms the client supports (e.g., `gzip`, `br`, `zstd`).
2.  **Select Optimal Algorithm**: Based on your configured compression levels, the plugin prioritizes the algorithm with the highest compression ratio (Priority: **Zstd > Brotli > Gzip**) for negotiation with the client.
3.  **Dynamic Compression**: When sending the response to the client, the plugin compresses the response body in real-time in a streaming fashion.
4.  **Set Response Headers**: It automatically adds the `Content-Encoding` header to the response (e.g., `Content-Encoding: br`) and removes `Content-Length`, switching to Chunked Transfer Encoding.

This plugin supports two working modes to adapt to different application scenarios.

## Working Modes

You can select the plugin's working mode using the `mode` parameter:

1.  **`response` (Default Mode)**
    This is the standard reverse proxy compression mode. `Pingap` will **compress** the response based on the client's capabilities as it is sent to the client.
    * **Pros**: Offers the best compatibility. Regardless of whether the upstream service or cache is compressed, `Pingap` can provide the optimal compression format for the client. You can also run other plugins on `Pingap` that need to read the response body (e.g., content replacement).
    * **Cons**: There is a performance cost for compressing each response, which is not suitable for scenarios where compressed content is already cached.

2.  **`upstream` Mode**
    In this mode, `Pingap` **compresses** the data as it is received from the upstream, based on the client's capabilities. This is suitable for use with the `Accept-Encoding` plugin in cacheable request scenarios.
    * **Pros**: Allows data to be compressed before caching, so subsequent requests can directly fetch the compressed cached data.
    * **Cons**: Requires you to correctly configure the cache and the `Accept-Encoding` module, which must support and be correctly configured for content compression.

## Configuration Parameters

Configuration is done in the `plugin.compression.toml` file.

| Parameter    | Type    | Required | Default      | Description                                                      |
| :----------- | :------ | :------- | :----------- | :--------------------------------------------------------------- |
| `mode`       | String  | No       | `"response"` | Working mode. Optional values are `"response"` or `"upstream"`.  |
| `gzip_level` | Integer | No       | `0`          | Gzip compression level. Range `1` - `9`. `0` disables Gzip.      |
| `br_level`   | Integer | No       | `0`          | Brotli compression level. Range `1` - `11`. `0` disables Brotli. |
| `zstd_level` | Integer | No       | `0`          | Zstd compression level. Range `1` - `22`. `0` disables Zstd.     |

💡 **How to choose a compression level?**
* Lower levels (e.g., Gzip: `1-3`, Brotli: `1-4`) consume less CPU but have lower compression ratios.
* Higher levels (e.g., Gzip: `6-9`, Brotli: `8-11`) have higher compression ratios but consume more CPU.
* It is generally recommended to choose a **mid-to-high** level (e.g., Gzip: `6`, Brotli: `5`) as a balance between performance and compression ratio.

---

## Complete Example

**Goal**: Enable high-performance `Brotli` and `Gzip` compression for frontend website assets (HTML, CSS, JS), and let `Pingap` handle all the compression work.

1.  **Configure the plugin (`plugin.compression-frontend.toml`)**:
    ```toml
    # Use the default "response" mode
    # mode = "response"

    # Set Brotli compression level to 5
    br_level = 5
    
    # Set Gzip compression level to 6 as a fallback for clients that don't support Brotli
    gzip_level = 6

    # zstd_level is not set, remains 0, meaning it is disabled
    ```

2.  **Apply the plugin in a Location (`location.toml`)**:
    ```toml
    # ...
    [locations.route-for-my-app]
    # Match all requests to the frontend service
    path = "/"
    upstream = "frontend-server"
    plugins = [
        "compression-frontend",
    ]
    # ...
    ```

### Access Effects

* **Accessing with a modern browser (e.g., Chrome, supporting Brotli and Gzip)**:
    * The client sends `Accept-Encoding: gzip, deflate, br, zstd`.
    * Pingap selects the highest priority algorithm, Brotli (`br`).
    * The response header will include `Content-Encoding: br`, and the response body will be Brotli-compressed data.

* **Accessing with an older client (only supporting Gzip)**:
    * The client sends `Accept-Encoding: gzip`.
    * Pingap selects the Gzip algorithm.
    * The response header will include `Content-Encoding: gzip`, and the response body will be Gzip-compressed data.

## Precautions

* **Content-Type**: The plugin will only compress compressible `Content-Type`s (like `text/html`, `application/json`, `text/css`, etc.). Binary files like images (JPEG, PNG) and videos are not compressed by default because they are usually already in a compressed format, and re-compressing them is pointless.
* **Performance Cost**: Enabling compression consumes a certain amount of CPU resources. Please choose the appropriate compression algorithm and level based on your server's performance and business load.