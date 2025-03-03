---
sidebar_position: 61
---

# Log Formatting

Pingap provides multiple log formatting options, including the following preset formats: `combined`, `common`, `short`, and `tiny`. Additionally, you can customize the log output format according to your needs. The supported parameters are as follows:

## Basic Parameters
- `{host}`: Request hostname
- `{method}`: HTTP request method
- `{path}`: Request path
- `{proto}`: HTTP protocol version (`HTTP/1.1` or `HTTP/2.0`)
- `{query}`: Query string
- `{remote}`: Request source IP address
- `{client_ip}`: Client IP (Priority: `X-Forwarded-For` > `X-Real-Ip` > `remote`)
- `{scheme}`: Protocol type (http/https)
- `{uri}`: Complete request URI

## Request Related
- `{referer}`: HTTP Referer header
- `{user_agent}`: User-Agent header
- `{request_id}`: Request ID (requires corresponding middleware)
- `{payload_size}`: Request body size (bytes)
- `{payload_size_human}`: Request body size (human-readable format)

## Time Related
- `{when}`: Log recording time
- `{when_utc_iso}`: UTC format log time
- `{when_unix}`: Unix timestamp format
- `{latency}`: Response time (milliseconds)
- `{latency_human}`: Response time (human-readable format)

## Response Related
- `{size}`: Response body size (bytes)
- `{size_human}`: Response body size (human-readable format)
- `{status}`: HTTP status code

## Variable Retrieval
- `{~name}`: Get Cookie value (e.g., `{~uid}` gets uid from cookie)
- `{>name}`: Get request header value (e.g., `{>X-User-Id}`)
- `{<name}`: Get response header value (e.g., `{<X-Server}`)
- `{:name}`: Get value from Context (see Context section below)
- `{$name}`: Get environment variable value (retrieved and cached at startup)
- `{$hostname}`: Get current server hostname

## Context Parameters
Attributes available in Context include:

### Connection Related
- `connection_id`: Connection ID
- `connection_time`: Connection duration
- `connection_reused`: Whether the connection is reused
- `processing`: Number of requests currently being processed
- `service_time`: Total request processing time (from receipt to completion)

### TLS Related
- `tls_version`: TLS version (empty for HTTP connections)
- `tls_cipher`: TLS cipher suite (empty for HTTP connections)
- `tls_handshake_time`: TLS handshake time (empty for HTTP connections)

### Upstream Related
- `upstream_reused`: Whether upstream connection is reused
- `upstream_addr`: Upstream server address
- `upstream_connected`: Number of upstream connections for current location
- `upstream_connect_time`: Upstream connection time (including TCP and TLS)
- `upstream_tcp_connect_time`: Upstream TCP connection time (None if connection is reused)
- `upstream_tls_handshake_time`: Upstream TLS handshake time (None if connection is reused or non-HTTPS)
- `upstream_processing_time`: Upstream request processing time
- `upstream_response_time`: Upstream response time

### Performance Metrics
- `compression_time`: Compression time
- `compression_ratio`: Compression ratio
- `cache_lookup_time`: Cache lookup time
- `cache_lock_time`: Cache lock time

All `*_time` values are integers in milliseconds. If you need to convert them to human-friendly durations with units, you can use `*_time_human` instead.