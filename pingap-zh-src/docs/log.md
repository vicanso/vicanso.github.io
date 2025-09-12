---
sidebar_position: 61
---

# 访问日志格式化

Pingap 提供了强大且灵活的访问日志功能，您可以选择开箱即用的预设格式，也可以通过丰富的变量来构建完全自定义的日志格式。

在`server.toml`配置文件中，通过 access_log 字段来指定日志格式。


1. 预设格式

为方便快速配置，Pingap 内置了四种业界标准的日志格式：

| 格式名称 | 格式化字符串                                                                                   |
| -------- | ---------------------------------------------------------------------------------------------- |
| combined | `{client_ip} - - [{when}] "{method} {uri} {proto}" {status} {size} "{referer}" "{user_agent}"` |
| common   | `{client_ip} - - [{when}] "{method} {uri} {proto}" {status} {size}`                            |
| short    | `{client_ip} - {method} {uri} {proto} {status} {size} - {latency_human}`                       |
| tiny     | `{method} {uri} {status} {size} - {latency_human}`                                             |

使用示例：

```toml
# 在 server.x.toml 中
access_log = "combined"
```

2. 自定义格式

如果您需要记录更多维度的信息，可以构建自定义的格式化字符串。

工作原理：将下文“变量参考”中的变量（用 {} 包裹）组合成一个字符串。

配置示例：

```toml
# 在 server.x.toml 中
access_log = '{client_ip} - [{when}] "{method} {uri} {proto}" status={status} size={size} latency={latency_human} upstream={:upstream_addr} upstream_time={:upstream_processing_time_human}'
```

3. 指定日志输出文件

默认情况下，访问日志与程序日志共同输出同一文件中，若希望单独输出，则可以指定日志输出文件。

```toml
# 在 server.x.toml 中
access_log = '/var/log/pingap.log {when} {path}'
```

4. 变量参考

请求基础信息

| 变量             | 说明                          | 示例值              |
| ---------------- | ----------------------------- | ------------------- |
| `{method}`       | HTTP 请求方法                 | GET                 |
| `{scheme}`       | 请求协议                      | https               |
| `{host}`         | 请求头中的主机名              | api.example.com     |
| `{path}`         | 请求路径（不含查询参数）      | `/users/123`        |
| `{query}`        | 查询字符串（不含 ?）          | `id=123&type=new`   |
| `{uri}`          | 完整的请求 URI（路径 + 查询） | `/users/123?id=123` |
| `{proto}`        | HTTP 协议版本                 | HTTP/2.0            |
| `{payload_size}` | 请求体大小（字节）            | 1024                |

客户端与代理信息

| 变量           | 说明                                                                                   | 示例值                 |
| -------------- | -------------------------------------------------------------------------------------- | ---------------------- |
| `{remote}`     | TCP 连接的源 IP 地址                                                                   | 123.123.123.123        |
| `{client_ip}`  | 客户端真实 IP。优先级: X-Forwarded-For > X-Real-Ip > `{remote}`。<br/>💡 推荐使用此变量 | 192.168.1.10           |
| `{referer}`    | HTTP Referer 请求头                                                                    | `https://example.com/` |
| `{user_agent}` | User-Agent 请求头                                                                      | `Mozilla/5.0 ...`      |
| `{request_id}` | 请求的唯一 ID。需配置 Request ID 插件                                                  | uuid-v4-string         |

时间与性能

| 变量             | 说明                                 | 示例值                     |
| ---------------- | ------------------------------------ | -------------------------- |
| `{when}`         | 日志记录时间 (本地时间)              | 12/Sep/2025:21:30:00 +0800 |
| `{when_utc_iso}` | 日志记录时间 (UTC, ISO 8601)         | 2025-09-12T13:30:00Z       |
| `{when_unix}`    | 日志记录时间 (Unix 时间戳)           | 1757751000                 |
| `{latency}`      | 从接收请求到响应完成的总耗时（毫秒） | 32                         |

响应信息

| 变量       | 说明               | 示例值 |
| ---------- | ------------------ | ------ |
| `{status}` | HTTP 响应状态码    | 200    |
| `{size}`   | 响应体大小（字节） | 4096   |


动态值提取

您还可以从请求/响应的任意位置提取信息。

| 变量语法      | 说明                             | 示例                 |
| ------------- | -------------------------------- | -------------------- |
| `{>name}`     | 获取请求头的值                   | `{>X-User-Id}`       |
| `{<name}`     | 获取响应头的值                   | `{<X-Trace-Id}`      |
| `{~name}`     | 获取Cookie 的值                  | `{~session_id}`      |
| `{$name}`     | 获取环境变量的值（在启动时读取） | `{$POD_NAME}`        |
| `{$hostname}` | 获取当前服务器的主机名           | `pingap-prod-node-1` |


底层连接与上下文信息 `({:name})`
通过 `{:name}` 语法，可以获取更深层次的连接、TLS、Upstream 和性能指标。

用法示例：`{:connection_id}`


连接相关
- `connection_id`: 连接的唯一 ID。
- `connection_time`: TCP 连接的持续时间。
- `connection_reused`: 连接是否被复用 (true/false)。
- `processing`: 当前正在处理的并发请求数。
- `service_time`: 请求在 Pingap 内部的总处理时间。

TLS 相关 (HTTPS)

- `tls_version`: TLS 版本，如 TLSv1.3。
- `tls_cipher`: 使用的 TLS 加密套件。
- `tls_handshake_time`: TLS 握手耗时。

Upstream 相关

- `upstream_addr`: 实际请求的后端服务地址。
- `upstream_status`: 后端服务返回的 HTTP 状态码。
- `upstream_reused`: 到后端的连接是否被复用 (true/false)。
- `upstream_connected` : 当前 Location 到后端的总连接数。
- `upstream_connect_time`: 连接到后端的总耗时（TCP + TLS）。
- `upstream_tcp_connect_time`: TCP 连接到后端的耗时。
- `upstream_tls_handshake_time`: 与后端进行 TLS 握手的耗时。
- `upstream_processing_time`: 后端服务的处理耗时。
- `upstream_response_time`: 从发送请求到收到响应的完整时间。

其他性能指标

- `compression_time`: 响应压缩的耗时。
- `compression_ratio`: 压缩比率。
- `cache_lookup_time`: 缓存查询耗时。
- `cache_lock_time`: 缓存锁等待耗时。


💡 人性化单位后缀 (_human)

所有表示时间 (*_time) 或大小 (*_size) 的变量，都提供了一个带 _human 后缀的版本，用于输出对人类友好的、带单位的格式。

- `{latency}` → 32 (ms)
- `{latency_human}` → 32ms
- `{size}` → 4096 (bytes)
- `{size_human}` → 4.0KiB
- `{:upstream_processing_time}` → 18 (ms)
- `{:upstream_processing_time_human}` → 18ms

