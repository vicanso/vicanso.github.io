---
sidebar_position: 31
---

# Detailed Configuration Reference

Pingap uses the TOML format for configuration, which offers excellent readability. All configuration items are split into different files for easy management.

**Common Unit Formats**:

-   **Duration**: Uses human-readable suffixes, such as `5s` (5 seconds), `10m` (10 minutes), `1h` (1 hour).
-   **Size**: Uses standard unit suffixes, such as `8kb` (8 KB), `16mb` (16 MB), `1gb` (1 GB).

## Basic Configuration (basic.toml)

This file defines the global behavior, process management, and fundamental performance parameters of a Pingap instance.

### Instance and Process Management

| Parameter      | Default                    | Description                                                                                                                             |
| :------------- | :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `name`         | `Pingap`                   | The name of the instance, used to differentiate between instances in logs or monitoring.                                                |
| `pid_file`     | `/run/pingap.pid`          | The file path for storing the process ID (PID). When deploying multiple instances on a single machine, each must have a different path. |
| `upgrade_sock` | `/tmp/pingap_upgrade.sock` | The Unix Socket path used for zero-downtime graceful restarts. Must be modified when deploying multiple instances on a single machine.  |
| `user`         |                            | If running as a daemon, specifies the user to run the service as.                                                                       |
| `group`        |                            | If running as a daemon, specifies the group to run the service as.                                                                      |

### Performance Tuning

| Parameter                      | Default | Description                                                                                                                                                   |
| :----------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `threads`                      | `1`     | The number of worker threads used by each service (e.g., TCP listener). Setting it to `0` determines the number automatically based on CPU cores.             |
| `work_stealing`                | `true`  | Whether to allow threads within the same service to steal tasks from other threads, which usually improves performance.                                       |
| `upstream_keepalive_pool_size` | `128`   | The size of the keep-alive connection pool to the upstream services.                                                                                          |
| `listener_tasks_per_fd`        | `1`     | The number of tasks per listening file descriptor. Setting it >1 allows parallel acceptance of new connections, improving performance under high concurrency. |

### Observability and Notifications

| Parameter               | Default | Description                                                                                                                                                                        |
| :---------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `log_level`             | `INFO`  | The output level for application logs (e.g., `DEBUG`, `INFO`, `WARN`, `ERROR`), supports dynamic setting of log output level, which takes effect within 30 seconds.                |
| `log_buffered_size`     |         | The size of the log buffer (e.g., `8kb`). Setting this can improve logging performance under high concurrency. `0` means no buffer is used.                                        |
| `log_format_json`       | `false` | Whether to format application logs as JSON.                                                                                                                                        |
| `webhook`               |         | The URL for webhooks, used for sending various event notifications.                                                                                                                |
| `webhook_type`          |         | The type of webhook, supports `http` (generic), `wecom` (WeCom), `dingtalk` (DingTalk).                                                                                            |
| `webhook_notifications` |         | An array defining which event types to be notified of, such as `backend_status`, `restart`, `diff_config`, etc.                                                                    |
| `sentry`                |         | The DSN address for Sentry, used for error collection. Requires the `full feature` version of Pingap.                                                                              |
| `pyroscope`             |         | The connection address for Pyroscope, used for continuous performance profiling. Requires the `perf` version of Pingap; not recommended unless performance optimization is needed. |

### Other

| Parameter                     | Default | Description                                                                                                                       |
| :---------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------- |
| `error_template`              |         | The path to a custom HTML template for error pages. `{{version}}` and `{{content}}` in the template will be dynamically replaced. |
| `grace_period`                | `5m`    | The total waiting period for a graceful exit.                                                                                     |
| `graceful_shutdown_timeout`   | `5s`    | During a graceful exit, the timeout for waiting for each connection to close.                                                     |
| `auto_restart_check_interval` | `90s`   | When using `--autorestart`, the interval for checking configuration changes, to avoid multiple restarts from rapid changes.       |

## Upstream Configuration (upstream.toml)

An Upstream defines a set of backend service nodes, including their addresses, load balancing strategy, and health checks.

### Core Configuration

| Parameter          | Default       | Description                                                                                                                                   |
| :----------------- | :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `addrs`            | `[]`          | **(Required)** A list of backend service addresses. Format is `ip:port [weight]`, where `weight` is optional.                                 |
| `discovery`        |               | Service discovery method. `dns` is recommended when using domain names; `docker` is available for container environments.                     |
| `algo`             | `round_robin` | Load balancing algorithm. Supports `round_robin` and `hash` (consistent hashing).                                                             |
| `update_frequency` |               | The update frequency for service discovery, e.g., `30s`.                                                                                      |
| `health_check`     |               | Health check. Supports `http`, `tcp`, and `grpc` formats. It is recommended to configure this; if not, a default TCP port check will be used. |
| `ipv4_only`        | `false`       | Whether to only use IPv4 addresses during DNS resolution.                                                                                     |
| `dns_server`       |               | Specifies the server address for DNS service discovery, e.g., `8.8.8.8:53`. (For DNS service discovery)                                       |
| `dns_domain`       |               | Specifies the domain for DNS discovery. (For DNS service discovery)                                                                           |
| `dns_search`       |               | Specifies the DNS search domain. (For DNS service discovery)                                                                                  |
| `enable_tracer`    | `false`       | Whether to enable tracing. When enabled, more observability metrics like connection count can be obtained.                                    |

💡 **Details on the 'hash' mode for 'algo'**

The `hash` mode enables session persistence, ensuring that requests from the same source are always forwarded to the same backend node.

-   `hash:ip`: Hashes based on the client IP.
-   `hash:url`: Hashes based on the full URL.
-   `hash:path`: Hashes based on the request path (default).
-   `hash:header:X-User-ID`: Hashes based on the value of a specified request header (`X-User-ID`).
-   `hash:cookie:session_id`: Hashes based on the value of a specified Cookie (`session_id`).
-   `hash:query:user_id`: Hashes based on the value of a specified query parameter (`user_id`).

### Health Check (`health_check`)

It is strongly recommended to configure health checks. `Pingap` will automatically remove unhealthy nodes. If not configured, it will default to a TCP port check.

-   **Format**:
    -   `HTTP(S)`: `http(s)://<upstream_host>/<path>`
    -   `TCP`: `tcp://<upstream_host>`
    -   `gRPC`: `grpc://<upstream_host>?service=<service_name>`
-   **Common Parameters**:
    -   `check_frequency` (default `10s`): The interval between checks.
    -   `success` (default `1`): Number of consecutive successes to mark as healthy.
    -   `failure` (default `2`): Number of consecutive failures to mark as unhealthy.
    -   `connection_timeout` (default `3s`): The connection timeout for checks.

### Connection and Timeout Configuration

💡 **Best Practice**: Always set reasonable timeouts for production environments to prevent connection buildup caused by slow or unresponsive backend services, which can eventually bring down the entire proxy service.

| Parameter                  | Default | Description                                                                                                                                  |
| :------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `total_connection_timeout` |         | The total timeout for the entire connection process (including TLS handshake).                                                               |
| `connection_timeout`       |         | The timeout for establishing a TCP connection.                                                                                               |
| `read_timeout`             |         | The timeout for reading a response from the backend.                                                                                         |
| `write_timeout`            |         | The timeout for writing a request to the backend.                                                                                            |
| `idle_timeout`             |         | The maximum idle time for a connection in the connection pool. Setting to `0` means no connection reuse; `null` uses the default reuse rule. |

### TLS/HTTPS Configuration

When the backend service is HTTPS, the following parameters need to be configured.

| Parameter     | Default | Description                                                                                                                   |
| :------------ | :------ | :---------------------------------------------------------------------------------------------------------------------------- |
| `sni`         |         | **(Required)** The Server Name Indication in the TLS handshake.                                                               |
| `verify_cert` | `true`  | Whether to verify the validity of the backend service's TLS certificate (can be set to `false` for self-signed certificates). |
| `alpn`        | `H1`    | The protocol for TLS ALPN negotiation, such as `H2`.                                                                          |

### Backend Node Related

| Parameter             | Default | Description                                             |
| --------------------- | ------- | ------------------------------------------------------- |
| `enable_backend_stats` | false   | Whether to enable backend node status statistics.       |
| `backend_failure_status_code` | | The status codes for backend node failure, separated by commas. |
| `circuit_break_max_consecutive_failures` | 3 | The maximum number of consecutive failures for circuit breaking. |
| `circuit_break_max_failure_percent` | 50 | The maximum failure percentage for circuit breaking. |
| `circuit_break_min_requests_threshold` | 10 | The minimum number of requests threshold for circuit breaking. |
| `circuit_break_half_open_consecutive_success_threshold` | 5 | The number of consecutive successes required to transition from the half-open state to the closed state.                 |
| `circuit_break_open_duration` | 10s | The duration for the circuit breaker to be in the open state.                       |
| `backend_stats_interval` | 60s | The interval for backend node status statistics. |

### Low-Level TCP Tuning

❗ **Note**: It is recommended to keep the default values unless you are very clear about the effects of these parameters.

| Parameter          | Default | Description                                                        |
| :----------------- | :------ | :----------------------------------------------------------------- |
| `tcp_idle`         |         | The idle probing duration for TCP Keep-Alive.                      |
| `tcp_interval`     |         | The probe interval for TCP Keep-Alive.                             |
| `tcp_probe_count`  |         | The number of probes for TCP Keep-Alive.                           |
| `tcp_user_timeout` |         | TCP user timeout, defines how long unacknowledged data can remain. |
| `tcp_recv_buf`     |         | The size of the TCP receive buffer.                                |
| `tcp_fast_open`    | `false` | Whether to enable TCP Fast Open.                                   |

## Route Configuration (location.toml)

A `Location` is the bridge connecting requests to upstreams. It defines detailed matching rules and request handling logic.

### Route Matching and Forwarding

| Parameter  | Default | Description                                                                                                                                                                       |
| :--------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `host`     |         | The domain to match. Multiple domains are separated by commas. A `~` prefix indicates a regular expression.                                                                       |
| `path`     |         | The path to match. Supports prefix, regex, and exact matching.                                                                                                                    |
| `upstream` |         | The name of the `Upstream` to forward requests to upon a successful match. Must be an existing `Upstream`.                                                                        |
| `rewrite`  |         | A URL rewrite rule, in the format of `matching_regex` `replacement_content`.                                                                                                      |
| `plugins`  | `[]`    | A list of plugins bound to this Location, executed in order.                                                                                                                      |
| `weight`   |         | A custom weight. Generally not needed, but can be used in scenarios like setting a mock service for unavailability and then giving it the highest weight to disable all requests. |
| `grpc_web` | `false` | Whether to enable support for grpc-web.                                                                                                                                           |

📖 **Path Matching Rules and Priority**

-   **Exact Match**: Starts with `=`, e.g., `=/api/user`, matches only requests where the path is exactly `/api/user`.
-   **Regex Match**: Starts with `~`, e.g., `~^/(api|rest)`, uses a regular expression to match.
-   **Prefix Match**: e.g., `/api`, matches all requests starting with `/api`.

📖 **Rewrite Rules**

-   Remove path prefix: `^/api/user-service/(.*) /$1`
-   Add path prefix: `^/(.*) /v2/api/$1`
-   Reorganize path parameters: `^/resource/users/id/(\\d+) /resource/users/$1`

### Request Header Handling

| Parameter                      | Default | Description                                                                                                                       |
| :----------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------- |
| `enable_reverse_proxy_headers` | `false` | Whether to automatically add standard reverse proxy headers like `X-Forwarded-*` and `X-Real-IP`. Strongly recommended to enable. |
| `proxy_set_headers`            | `[]`    | Sets a forwarded request header. If the header already exists, its value is overwritten.                                          |
| `proxy_add_headers`            | `[]`    | Adds a forwarded request header. If the header already exists, a new value is appended.                                           |

### Available Variables

When setting request headers, you can use the following dynamic variables:

`$hostname`, `$host`, `$scheme`, `$remote_addr`, `$remote_port`, `$server_addr`, `$server_port`, `$upstream_addr`, etc.

### Security and Limits

| Parameter              | Default | Description                                                                                                 |
| :--------------------- | :------ | :---------------------------------------------------------------------------------------------------------- |
| `client_max_body_size` |         | The maximum allowed client request body size, e.g., `10mb`. No limit by default.                            |
| `max_processing`       | `0`     | The maximum number of requests this Location can process concurrently. `0` means no limit.                  |
| `max_retries`          |         | The number of times to retry the connection when the upstream fails. 0 means no retry.                      |
| `max_retry_window`     |         | The window time for retrying the connection when the upstream fails. If exceeded, it means no more retries. |

## Server Configuration (server.toml)

A `Server` is the network entry point for Pingap. It defines the listening port, protocol, and the set of `Location` rules bound to it. The `x` in the filename (`servers.x.toml`) is the unique name of the service.

### Core Configuration

| Parameter   | Default | Description                                                                                                                                   |
| :---------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `addr`      |         | **(Required)** The listening address, in `ip:port` format. Multiple addresses are separated by commas.                                        |
| `locations` | `[]`    | **(Required)** A list of `Location` names bound to this `Server`. Matching is based on the `Location`'s weight, not their order in this list. |

### TLS/HTTPS

| Parameter             | Default            | Description                                                                                 |
| :-------------------- | :----------------- | :------------------------------------------------------------------------------------------ |
| `global_certificates` | `false`            | Whether to enable the global certificate configuration. Must be enabled for HTTPS services. |
| `tls_min_version`     | `1.2`              | The minimum supported TLS version.                                                          |
| `tls_max_version`     | `1.3`              | The maximum supported TLS version.                                                          |
| `tls_cipher_list`     | (Recommended list) | The cipher suites for TLS 1.2 and below.                                                    |
| `tls_ciphersuites`    | (Recommended list) | The cipher suites for TLS 1.3.                                                              |

### Protocols and Modules

| Parameter    | Default | Description                                                                                                          |
| :----------- | :------ | :------------------------------------------------------------------------------------------------------------------- |
| `enabled_h2` | `false` | Whether to enable HTTP/2 support. If enabled, HTTPS connections will negotiate H2, and HTTP connections will be H2C. |
| `modules`    | `[]`    | Enables specific feature modules, such as `web-grpc`, etc.                                                           |

### Performance and Connection Tuning

| Parameter                  | Default | Description                                                                                                                                             |
| :------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `threads`                  | `1`     | The number of worker threads specifically allocated for this Server.                                                                                    |
| `reuse_port`               | `false` | Whether to enable `SO_REUSEPORT`, allowing multiple processes/threads to listen on the same port, which can improve performance under high concurrency. |
| `downstream_read_timeout`  |         | The timeout for reading a request from the client.                                                                                                      |
| `downstream_write_timeout` |         | The timeout for writing a response to the client.                                                                                                       |
| `tcp_fastopen`             |         | Enables TCP Fast Open and sets the queue size (backlog).                                                                                                |
| `tcp_idle`                 |         | The idle probing duration for TCP Keep-Alive.                                                                                                           |
| `tcp_interval`             |         | The probe interval for TCP Keep-Alive.                                                                                                                  |
| `tcp_probe_count`          |         | The number of probes for TCP Keep-Alive.                                                                                                                |
| `tcp_user_timeout`         |         | TCP user timeout, defines how long unacknowledged data can remain.                                                                                      |

### Observability

| Parameter              | Default | Description                                                                                                                 |
| :--------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------- |
| `access_log`           |         | The directory, file, and format template for access logs. Left empty to disable. E.g., `/var/log/pingap.log {when} {path}`. |
| `prometheus_metrics`   |         | The path for exposing Prometheus metrics, e.g., `/metrics`.                                                                 |
| `otlp_exporter`        |         | The path for exposing OpenTelemetry metrics, e.g., `/metrics`.                                                              |
| `enable_server_timing` | `false` | Whether to add the `Server-Timing` header to responses, to show processing duration for frontend performance analysis.      |