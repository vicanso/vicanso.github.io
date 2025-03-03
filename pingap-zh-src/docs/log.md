---
sidebar_position: 61
---

# 日志格式化

Pingap提供了多种日志格式化选项，包括以下预设格式：`combined`、`common`、`short`和`tiny`。此外，您还可以根据需要自定义日志输出格式。支持的参数如下：

## 基础参数
- `{host}`: 请求的主机名
- `{method}`: HTTP请求方法
- `{path}`: 请求路径
- `{proto}`: HTTP协议版本（`HTTP/1.1`或`HTTP/2.0`）
- `{query}`: 查询字符串
- `{remote}`: 请求源IP地址
- `{client_ip}`: 客户端IP（优先级：`X-Forwarded-For` > `X-Real-Ip` > `remote`）
- `{scheme}`: 协议类型（http/https）
- `{uri}`: 完整请求URI

## 请求相关
- `{referer}`: HTTP Referrer头
- `{user_agent}`: User-Agent头
- `{request_id}`: 请求ID（需配置相应中间件）
- `{payload_size}`: 请求体大小（字节）
- `{payload_size_human}`: 请求体大小（人类可读格式）

## 时间相关
- `{when}`: 日志记录时间
- `{when_utc_iso}`: UTC格式的日志时间
- `{when_unix}`: Unix时间戳格式
- `{latency}`: 响应时间（毫秒）
- `{latency_human}`: 响应时间（人类可读格式）

## 响应相关
- `{size}`: 响应体大小（字节）
- `{size_human}`: 响应体大小（人类可读格式）
- `{status}`: HTTP状态码

## 变量获取
- `{~name}`: 获取Cookie值（例：`{~uid}`获取cookie中的uid）
- `{>name}`: 获取请求头值（例：`{>X-User-Id}`）
- `{<name}`: 获取响应头值（例：`{<X-Server}`）
- `{:name}`: 获取Context中的值（见下方Context部分）
- `{$name}`: 获取环境变量值（启动时获取并缓存）
- `{$hostname}`: 获取当前服务器主机名

## Context参数
Context中可获取的属性包括：

### 连接相关
- `connection_id`: 连接ID
- `connection_time`: 连接持续时间
- `connection_reused`: 连接是否被复用
- `processing`: 当前正在处理的请求数
- `service_time`: 请求总处理时间（从接收到完成）

### TLS相关
- `tls_version`: TLS版本（HTTP连接为空）
- `tls_cipher`: TLS加密套件（HTTP连接为空）
- `tls_handshake_time`: TLS握手时间（HTTP连接为空）

### Upstream相关
- `upstream_reused`: upstream连接是否复用
- `upstream_addr`: upstream服务器地址
- `upstream_connected`: 当前location的upstream连接数
- `upstream_connect_time`: upstream连接时间（包含TCP和TLS）
- `upstream_tcp_connect_time`: upstream TCP连接时间（复用连接时为None）
- `upstream_tls_handshake_time`: upstream TLS握手时间（复用连接或非HTTPS时为None）
- `upstream_processing_time`: upstream请求处理时间
- `upstream_response_time`: upstream响应时间

### 性能指标
- `compression_time`: 压缩耗时
- `compression_ratio`: 压缩比率
- `cache_lookup_time`: 缓存查询时间
- `cache_lock_time`: 缓存锁定时间


所有`*_time`均是ms单位的整数，如果需要转换为对人友好的带单位时长，则使用`*_time_human`即可。