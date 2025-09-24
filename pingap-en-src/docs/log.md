---
sidebar_position: 61
---

# Access Log Formatting

Pingap provides a powerful and flexible access logging feature. You can choose from out-of-the-box preset formats or build a completely custom log format using a rich set of variables.

The log format is specified via the `access_log` field in the `server.toml` configuration file.

### 1. Preset Formats

For quick configuration, Pingap comes with four industry-standard log formats built-in:

| Format Name | Format String                                                                                  |
| :---------- | :--------------------------------------------------------------------------------------------- |
| `combined`  | `{client_ip} - - [{when}] "{method} {uri} {proto}" {status} {size} "{referer}" "{user_agent}"` |
| `common`    | `{client_ip} - - [{when}] "{method} {uri} {proto}" {status} {size}`                            |
| `short`     | `{client_ip} - {method} {uri} {proto} {status} {size} - {latency_human}`                       |
| `tiny`      | `{method} {uri} {status} {size} - {latency_human}`                                             |

**Usage Example**:

```toml
# In server.x.toml
access_log = "combined"
```

### 2. Custom Format

If you need to log more dimensional information, you can build a custom format string.

**How it works**: Combine the variables from the "Variable Reference" section below (wrapped in `{}`) into a single string.

**Configuration Example**:

```toml
# In server.x.toml
access_log = '{client_ip} - [{when}] "{method} {uri} {proto}" status={status} size={size} latency={latency_human} upstream={:upstream_addr} upstream_time={:upstream_processing_time_human}'
```

### 3. Specifying a Log Output File

By default, access logs are output to the same file as the application logs. If you wish to output them separately, you can specify a log output file.

```toml
# In server.x.toml
access_log = '/var/log/pingap.log {when} {path}'
```

### 4. Variable Reference

#### Basic Request Information

| Variable         | Description                             | Example Value       |
| :--------------- | :-------------------------------------- | :------------------ |
| `{method}`       | HTTP request method                     | `GET`               |
| `{scheme}`       | Request scheme                          | `https`             |
| `{host}`         | Hostname from the request header        | `api.example.com`   |
| `{path}`         | Request path (without query parameters) | `/users/123`        |
| `{query}`        | Query string (without `?`)              | `id=123&type=new`   |
| `{uri}`          | Full request URI (path + query)         | `/users/123?id=123` |
| `{proto}`        | HTTP protocol version                   | `HTTP/2.0`          |
| `{payload_size}` | Request body size (in bytes)            | `1024`              |

#### Client and Proxy Information

| Variable       | Description                                                                                                             | Example Value          |
| :------------- | :---------------------------------------------------------------------------------------------------------------------- | :--------------------- |
| `{remote}`     | Source IP address of the TCP connection                                                                                 | `123.123.123.123`      |
| `{client_ip}`  | The real client IP. Priority: `X-Forwarded-For` > `X-Real-Ip` > `{remote}`.<br/>💡 This variable is recommended for use. | `192.168.1.10`         |
| `{referer}`    | The HTTP Referer request header                                                                                         | `https://example.com/` |
| `{user_agent}` | The User-Agent request header                                                                                           | `Mozilla/5.0 ...`      |
| `{request_id}` | The unique ID of the request. Requires the Request ID plugin to be configured.                                          | `uuid-v4-string`       |

#### Time and Performance

| Variable         | Description                                                       | Example Value                |
| :--------------- | :---------------------------------------------------------------- | :--------------------------- |
| `{when}`         | Time of the log record (local time)                               | `24/Sep/2025:08:23:30 +0800` |
| `{when_utc_iso}` | Time of the log record (UTC, ISO 8601)                            | `2025-09-24T00:23:30Z`       |
| `{when_unix}`    | Time of the log record (Unix timestamp)                           | `1758596610`                 |
| `{latency}`      | Total time from receiving the request to response completion (ms) | `32`                         |

#### Response Information

| Variable   | Description                   | Example Value |
| :--------- | :---------------------------- | :------------ |
| `{status}` | HTTP response status code     | `200`         |
| `{size}`   | Response body size (in bytes) | `4096`        |


#### Dynamic Value Extraction

You can also extract information from any part of the request/response.

| Variable Syntax | Description                              | Example              |
| :-------------- | :--------------------------------------- | :------------------- |
| `{>name}`       | Get the value of a request header        | `{>X-User-Id}`       |
| `{<name}`       | Get the value of a response header       | `{<X-Trace-Id}`      |
| `{~name}`       | Get the value of a Cookie                | `{~session_id}`      |
| `{$name}`       | Get the value of an environment variable | `{$POD_NAME}`        |
| `{$hostname}`   | Get the hostname of the current server   | `pingap-prod-node-1` |


#### Low-Level Connection and Context Information (`{:name}`)
You can access deeper-level connection, TLS, Upstream, and performance metrics using the `{:name}` syntax.

Usage example: `{:connection_id}`


**Connection-related**
-   `connection_id`: The unique ID of the connection.
-   `connection_time`: The duration of the TCP connection.
-   `connection_reused`: Whether the connection was reused (`true`/`false`).
-   `processing`: The number of concurrent requests currently being processed.
-   `service_time`: The total processing time for the request within Pingap.

**TLS-related (HTTPS)**

-   `tls_version`: The TLS version, e.g., `TLSv1.3`.
-   `tls_cipher`: The TLS cipher suite used.
-   `tls_handshake_time`: The duration of the TLS handshake.

**Upstream-related**

-   `upstream_addr`: The address of the backend service that was actually requested.
-   `upstream_status`: The HTTP status code returned by the backend service.
-   `upstream_reused`: Whether the connection to the backend was reused (`true`/`false`).
-   `upstream_connected`: The total number of connections from the current Location to the backend.
-   `upstream_connect_time`: The total time to connect to the backend (TCP + TLS).
-   `upstream_tcp_connect_time`: The time to establish a TCP connection to the backend.
-   `upstream_tls_handshake_time`: The time for the TLS handshake with the backend.
-   `upstream_processing_time`: The processing time of the backend service.
-   `upstream_response_time`: The full time from sending the request to receiving the response.

**Other Performance Metrics**

-   `compression_time`: The duration of response compression.
-   `compression_ratio`: The compression ratio.
-   `cache_lookup_time`: The cache lookup duration.
-   `cache_lock_time`: The cache lock wait duration.


💡 **Human-readable Unit Suffix (`_human`)**

All variables representing time (`*_time`) or size (`*_size`) have a version with a `_human` suffix, which outputs a human-friendly format with units.

-   `{latency}` → `32` (ms)
-   `{latency_human}` → `32ms`
-   `{size}` → `4096` (bytes)
-   `{size_human}` → `4.0KiB`
-   `{:upstream_processing_time}` → `18` (ms)
-   `{:upstream_processing_time_human}` → `18ms`