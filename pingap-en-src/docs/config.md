---
sidebar_position: 31
---

# Configuration Guide

Pingap uses TOML for parameter configuration. For time-related configurations, use formats like `1s`, `1m`, `1h`. For storage size configurations, use formats like `1kb`, `1mb`, `1gb`. Detailed parameter descriptions are as follows:

## Basic Configuration

- `name`: Instance name, defaults to `Pingap`. If deploying multiple instances on the same machine, configure different names
- `error_template`: Optional parameter for HTML template used when errors occur. You can customize the error HTML template. When an error occurs, `{{version}}` will be replaced with the Pingap version, and `{{content}}` with specific error information
- `pid_file`: Optional parameter, defaults to `/run/pingap.pid`. Configures the process ID record file path. For multiple instances on one machine, configure different paths
- `upgrade_sock`: Optional parameter, defaults to `/tmp/pingap_upgrade.sock`. Configures the socket path for zero-downtime updates, used when switching between old and new Pingap processes. For multiple instances, configure different paths
- `user`: Optional parameter, defaults to empty. Sets the daemon process execution user
- `group`: Optional parameter, defaults to empty, similar to `user`
- `threads`: Optional parameter, defaults to 1. Sets thread count for each service (like server TCP connections). If set to 0, uses CPU core count or cgroup core limit
- `work_stealing`: Optional parameter, defaults to `true`. Enables work stealing between different threads within the same service
- `grace_period`: Sets graceful exit waiting period, defaults to 5 minutes
- `graceful_shutdown_timeout`: Sets graceful shutdown timeout, defaults to 5 seconds
- `upstream_keepalive_pool_size`: Sets upstream connection pool size, defaults to `128`
- `webhook`: Webhook request path
- `webhook_type`: Webhook type, supports regular HTTP, `webcom`, and `dingtalk`
- `webhook_notifications`: Webhook notification types, including `backend_status`, `lets_encrypt`, `diff_config`, `restart`, `restart_fail`, and `tls_validity`
- `log_level`: Application log output level, defaults to `INFO`
- `log_buffered_size`: Log buffer size, defaults to 0. If set below 4096, no buffer is used
- `log_format_json`: Sets JSON formatted logging
- `sentry`: Sentry DSN configuration, requires `full feature` version
- `pyroscope`: Pyroscope connection address, requires perf version as default version doesn't include pyroscope support
- `auto_restart_check_interval`: Configuration update check interval, defaults to 90 seconds. If set below 1 second, checks are disabled
- `cache_directory`: Sets cache directory. When set, uses file-based caching. File cache periodically removes long-unused files. Format: `/opt/pingap/cache?reading_max=1000&writing_max=500&cache_max=200`
  - `reading_max`: Maximum concurrent cache reads (file cache only)
  - `writing_max`: Maximum concurrent cache writes (file cache only)
  - `cache_max`: Hot data cache limit in file cache, uses tinyufo for memory cache, defaults to 100. Set to 0 to disable memory hot cache
- `cache_max_size`: Maximum cache space limit, shared by all services. Not applicable to file cache
- `tcp_fast_open`: Enables TCP Fast Open to reduce TCP connection establishment latency. Requires specifying backlog size

## Upstream

Upstream configuration defines backend service node lists. For domain configurations, the system adds all node addresses based on DNS resolution results (automatic DNS updates require configured service discovery). HTTP health checks are recommended for node status monitoring.

Main parameters:

- `addrs`: Node address list, format: `ip:port [weight]`, weight is optional (defaults to 1)
- `discovery`: Service discovery method. DNS recommended for domains, docker label for docker services
- `update_frequency`: Service discovery update interval, recommended for dynamic node updates
- `algo`: Node selection algorithm, supports `hash` and `round_robin`. Example: `hash:ip` selects nodes by IP hash. Defaults to `round_robin`
- `sni`: Required SNI for HTTPS configurations
- `verify_cert`: Certificate validation requirement for HTTPS
- `health_check`: Node health check configuration, supports HTTP, TCP, and gRPC
- `ipv4_only`: For domain configurations, restricts to IPv4 nodes only
- `enable_tracer`: Enables tracer functionality for upstream connection tracking
- `alpn`: ALPN configuration for TLS handshake, defaults to H1
- `connection_timeout`: TCP connection timeout, default none
- `total_connection_timeout`: Connection timeout including TLS handshake for HTTPS, default none
- `read_timeout`: Read timeout, default none
- `idle_timeout`: Idle timeout for connection recycling. Set to 0 for no connection reuse. Default none
- `write_timeout`: Write timeout, default none
- `tcp_idle`: TCP keepalive idle timeout
- `tcp_interval`: TCP keepalive check interval
- `tcp_probe_count`: TCP keepalive probe count
- `tcp_recv_buf`: TCP receive buffer size

Note: All three parameters (`tcp_idle`, `tcp_interval`, `tcp_probe_count`) must be set for TCP keepalive.

### Health Check Configuration

Supports three health check methods:

- `HTTP(S)`: `http://upstream-name/check-path?parameters`
- `TCP`: `tcp://upstream-name?parameters`
- `gRPC`: `grpc://upstream-name?service=service-name&parameters`

Common parameters:
- `connection_timeout`: Connection timeout, default 3 seconds
- `read_timeout`: Read timeout, default 3 seconds
- `check_frequency`: Check interval, default 10 seconds
- `success`: Consecutive successes needed for healthy status, default 1
- `failure`: Consecutive failures needed for unhealthy status, default 2
- `reuse`: Connection reuse option, default false

### Hash Algorithm Options

When using hash for upstream backend selection:

- `hash:url`: URL-based forwarding for URL-cached services
- `hash:ip`: IP-based forwarding for IP-persistent data services
- `hash:header:X-User`: Forward based on `X-User` header value
- `hash:cookie:uid`: Forward based on `uid` cookie value
- `hash:query:appKey`: Forward based on `appkey` query parameter
- `hash:path`: Path-based forwarding (default hash method)

## Location

Location configures request matching rules, header insertion, and plugin associations. Key parameters:

- `upstream`: Associated upstream configuration. Optional if all processing is handled by plugins
- `path`: Matching path, detailed usage below
- `host`: Matching domain(s), comma-separated for multiple. Use `~` prefix for regex
- `proxy_set_headers`: Request headers to set/override when forwarding to upstream
- `proxy_add_headers`: Request headers to add when forwarding to upstream
- `rewrite`: Path rewrite rules
- `weight`: Custom weight for location priority
- `plugins`: Ordered plugin list for this location
- `client_max_body_size`: Maximum client request body size
- `max_processing`: Maximum concurrent request limit (0 for unlimited)
- `grpc_web`: Enable grpc-web support

### Path Matching Rules

Location paths support these rules (highest to lowest priority):

- Exact match: Prefix with `=`, e.g., `=/api` matches exact `/api` path
- Regex match: Prefix with `~`, e.g., `~^/(api|rest)` matches paths starting with `/api` or `/rest`
- Prefix match: e.g., `/api` matches paths starting with `/api`

### Path Rewrite Rules

Supports regex-based path rewriting (similar to nginx). One rule per configuration. Examples:

- `^/api/ /`: Replaces `/api/` prefix with `/`
- `^/(\S*?)/ /api/$1/`: Adds `/api` prefix
- `^/(\S*?)/api/(\S*?) /$1/$2`: Removes `/api` from path

### Supported Header Variables

- `$hostname`: Host machine hostname
- `$host`: Request host
- `$scheme`: Request scheme (http/https)
- `$remote_addr`: Client address
- `$remote_port`: Client port
- `$server_addr`: Server address
- `$server_port`: Server port
- `$proxy_add_x_forwarded_for`: Proxy addresses in x-forwarded-for format
- `$upstream_addr`: Upstream address

## Server

- `server.x`: Server configuration where `x` is unique server name
- `addr`: Listening address(es) in `ip:port` format, comma-separated for multiple
- `access_log`: Optional, disabled by default. Supports formats: `combined`, `common`, `short`, `tiny`
- `locations`: Location list for this server
- `threads`: Default thread count, 0 for CPU core count, default 1
- `tls_cipher_list`: Pre-TLS 1.3 cipher suites
- `tls_ciphersuites`: TLS 1.3 cipher suites
- `tls_min_version`: Minimum TLS version, default 1.2
- `tls_max_version`: Maximum TLS version, default 1.3
- `global_certificates`: Enable global certificates for unmatched server names
- `enabled_h2`: Enable HTTP/2 (recommended, uses h2c for HTTP)
- `tcp_idle`: TCP keepalive idle timeout
- `tcp_interval`: TCP keepalive check interval
- `tcp_probe_count`: TCP keepalive probe count
- `tcp_fastopen`: Enable TCP fast open with backlog size
- `prometheus_metrics`: Enable Prometheus metrics (full features version only)
- `otlp_exporter`: OpenTelemetry collector address (full features version only)
- `modules`: Enable specific modules (required for web-grpc)
