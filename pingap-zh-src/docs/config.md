---
sidebar_position: 31
---

# 配置项详解

Pingap 使用 TOML 格式进行配置，具有良好的可读性。所有配置项被拆分到不同的文件中，便于管理。

通用单位格式：

- 时间 (Duration): 使用易读的后缀，如`5s`(5秒), `10m`(10分钟), `1h`(1小时)。
- 大小 (Size): 使用标准单位后缀，如`8kb`(8 KB), `16mb`(16 MB), `1gb`(1 GB)。

## 基础配置 (basic.toml)

该文件定义了 Pingap 实例的全局行为、进程管理和基础性能参数。


实例与进程管理

| 参数         | 默认值                   | 说明                                                                       |
| ------------ | ------------------------ | -------------------------------------------------------------------------- |
| name         | Pingap                   | 实例的名称，用于日志或监控中区分不同实例。                                 |
| pid_file     | /run/pingap.pid          | 记录进程 ID (PID) 的文件路径。单机部署多实例时必须为每个实例设置不同路径。 |
| upgrade_sock | /tmp/pingap_upgrade.sock | 用于零停机平滑重启的 Unix Socket 路径。单机部署多实例时必须修改。          |
| user         |                          | 若以守护进程运行，指定运行服务的用户。                                     |
| group        |                          | 若以守护进程运行，指定运行服务的用户组。                                   |

性能调优

| 参数                         | 默认值 | 说明                                                                             |
| ---------------------------- | ------ | -------------------------------------------------------------------------------- |
| threads                      | 1      | 每个服务（如 TCP 监听）使用的工作线程数。设置为 0 则根据 CPU 核心数自动决定。    |
| work_stealing                | true   | 是否允许同一服务中的线程窃取其他线程的任务，通常能提升性能。                     |
| upstream_keepalive_pool_size | 128    | 到上游 (Upstream) 的长连接池大小。                                               |
| listener_tasks_per_fd        | 1      | 每个监听描述符使用的任务数。设置为 >1 可并行接受新连接，提升高并发下的接收性能。 |


可观测性与通知

| 参数                  | 默认值 | 说明                                                                                                          |
| --------------------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| log_level             | INFO   | 应用日志的输出级别（如`DEBUG`, `INFO`, `WARN`, `ERROR`）。                                                    |
| log_buffered_size     |        | 日志缓冲区大小 (如 8kb)。设置后可提升高并发日志写入性能，0 表示不使用缓冲。                                   |
| log_format_json       | false  | 是否将应用日志格式化为 JSON。                                                                                 |
| webhook               |        | Webhook 的 URL，用于发送各类事件通知。                                                                        |
| webhook_type          |        | Webhook 类型，支持 http(通用), wecom(企业微信), dingtalk(钉钉)。                                              |
| webhook_notifications |        | 一个数组，定义需要通知的事件类型，如 backend_status, restart, diff_config 等。                                |
| sentry                |        | Sentry 的 DSN 地址，用于错误收集。需要使用`full feature`版本的 Pingap。                                       |
| pyroscope             |        | Pyroscope 的连接地址，用于持续性能分析。需要使用`perf`版本的 Pingap，如非需要针对性能优化，不建议启用此特性。 |

其他

| 参数                        | 默认值 | 说明                                                                             |
| --------------------------- | ------ | -------------------------------------------------------------------------------- |
| error_template              |        | 自定义错误页面的 HTML 模板路径。模板中`{{version}}`和`{{content}}`会被动态替换。 |
| grace_period                | 5m     | 优雅退出的总等待周期。                                                           |
| graceful_shutdown_timeout   | 5s     | 在优雅退出期间，等待每个连接关闭的超时时间。                                     |
| auto_restart_check_interval | 90s    | 当使用`--autorestart`时，检测配置变更的间隔，避免短时间修改配置多次重启。        |
| cache_directory             |        | 全局缓存目录。配置后将启用基于文件的缓存。                                       |
| cache_max_size              |        | 内存缓存的最大空间。对文件缓存无效。                                             |


## 上游配置 (upstream.toml)

Upstream 定义了一组后端服务节点，包括它们的地址、负载均衡策略和健康状态检查。

核心配置

| 参数             | 默认值      | 说明                                                                     |
| ---------------- | ----------- | ------------------------------------------------------------------------ |
| addrs            | []          | （必需） 后端服务地址列表。格式为 ip:port [weight]，权重 weight 可选。   |
| discovery        |             | 服务发现方式。使用域名时推荐 dns，容器环境可用 docker。                  |
| algo             | round_robin | 负载均衡算法。支持 round_robin (轮询) 和 hash (一致性哈希)。             |
| update_frequency |             | 服务发现的更新频率，如 30s。                                             |
| health_check     |             | 健康检查。支持http、tcp与grpc形式，建议配置，若未配置默认以tcp端口检测。 |
| ipv4_only        | false       | 在 DNS 解析时，是否仅使用 IPv4 地址。                                    |
| dns_server       |             | 指定用于 DNS 服务发现的服务器地址，如 8.8.8.8:53。(用于dns服务发现)      |
| dns_domain       |             | 指定 DNS 发现的域名。(用于dns服务发现)                                   |
| dns_search       |             | 指定 DNS 搜索域。(用于dns服务发现)                                       |
| enable_tracer    | false       | 是否启用追踪。开启后可获取连接数等更多可观测性指标。                     |

💡 algo 的 hash 模式详解

`hash`模式可实现会话保持，确保来自同一来源的请求始终被转发到同一后端节点。

- `hash:ip`: 根据客户端 IP 哈希。
- `hash:url`: 根据完整的 URL 哈希。
- `hash:path`: 根据请求路径哈希（默认）。
- `hash:header:X-User-ID`: 根据指定的请求头 (X-User-ID) 的值哈希。
- `hash:cookie:session_id`: 根据指定的 Cookie (session_id) 的值哈希。
- `hash:query:user_id`: 根据指定的查询参数 (user_id) 的值哈希。


健康检查 (health_check)

强烈建议配置健康检查，Pingap 会自动剔除不健康的节点。

- 格式:
  - `HTTP(S)`: `http(s)://<upstream_host>/<path>`
  - `TCP`: `tcp://<upstream_host>`
  - `gRPC`: `grpc://<upstream_host>?service=<service_name>`
- 通用参数:
  - check_frequency (默认 10s): 检查间隔。
  - success (默认 1): 连续成功多少次后标记为健康。
  - failure (默认 2): 连续失败多少次后标记为不健康。
  - connection_timeout (默认 3s): 检查时的连接超时。


连接与超时配置

💡 最佳实践
务必为生产环境设置合理的超时时间，以防止因后端服务缓慢或无响应而导致连接堆积，最终拖垮整个代理服务。

| 参数                     | 默认值 | 说明                                                                          |
| ------------------------ | ------ | ----------------------------------------------------------------------------- |
| total_connection_timeout |        | 整个连接过程（包含TLS握手）的总超时。                                         |
| connection_timeout       |        | 建立 TCP 连接的超时时间。                                                     |
| read_timeout             |        | 从后端读取响应的超时时间。                                                    |
| write_timeout            |        | 向后端写入请求的超时时间。                                                    |
| idle_timeout             |        | 连接在连接池中的最大空闲时间。设置为 0 表示连接不复用，为空则按默认规则复用。 |

TLS/HTTPS配置

当后端服务为 HTTPS 时，需要配置以下参数。

| 参数        | 默认值 | 说明                                                           |
| ----------- | ------ | -------------------------------------------------------------- |
| sni         |        | （必需） TLS 握手中的服务器名称指示 (Server Name Indication)。 |
| verify_cert | true   | 是否校验后端服务的 TLS 证书的有效性。                          |
| alpn        | H1     | TLS ALPN 协商的协议，如 H2。                                   |


TCP 底层调优

❗ 注意：除非您非常清楚这些参数的作用，否则建议保持默认值。

| 参数             | 默认值 | 说明                                             |
| ---------------- | ------ | ------------------------------------------------ |
| tcp_idle         |        | TCP Keep-Alive 的空闲探测时长。                  |
| tcp_interval     |        | TCP Keep-Alive 的探测间隔。                      |
| tcp_probe_count  |        | TCP Keep-Alive 的探测次数。                      |
| tcp_user_timeout |        | TCP 用户超时，定义了未确认数据可以保持多长时间。 |
| tcp_recv_buf     |        | TCP 接收缓冲区的大小。                           |
| tcp_fast_open    | false  | 是否启用 TCP Fast Open。                         |


## 路由配置 (location.toml)

Location 是连接请求和上游的桥梁，它定义了详细的匹配规则和请求处理逻辑。

路由匹配与转发

| 参数     | 默认值 | 说明                                                                                                       |
| -------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| host     |        | 匹配的域名。多个域名用 , 分隔，~ 开头表示正则表达式。                                                      |
| path     |        | 匹配的路径。支持前缀、正则和精确匹配。                                                                     |
| upstream |        | 匹配成功后，将请求转发到的 Upstream 名称。                                                                 |
| rewrite  |        | URL 重写规则，格式为 匹配正则 替换内容。                                                                   |
| plugins  | []     | 绑定到此 Location 的插件列表，按顺序执行。                                                                 |
| weight   |        | 自定义的权重，一般不需要设置，可用于此类场景：例如mock为服务不可用后，再调整该权重最高，则可禁用所有请求。 |
| plugins  | []     | 绑定到此 Location 的插件列表，按顺序执行。                                                                 |
| grpc_web | false  | 是否启用支持grpc-web。                                                                                     |

📖 Path 匹配规则与优先级

- `精确匹配`: 以 = 开头，如 =/api/user，仅匹配 path 完全等于 /api/user 的请求。
- `正则匹配`: 以 ~ 开头，如 ~^/(api|rest)，使用正则表达式进行匹配。
- `前缀匹配`: 如 /api，匹配所有以 /api 开头的请求。

📖 Rewrite 重写规则

- 移除路径前缀: `^/api/user-service/(.*) /$1`
- 添加路径前缀: `^/(.*) /v2/api/$1`
- 重新组织路径参数: `^/resource/users/id/(\\d+) /resource/users/$1`

请求头处理

| 参数                         | 默认值 | 说明                                                                         |
| ---------------------------- | ------ | ---------------------------------------------------------------------------- |
| enable_reverse_proxy_headers | false  | 是否自动添加 X-Forwarded-* 和 X-Real-IP 等标准反向代理请求头。强烈建议开启。 |
| proxy_set_headers            | []     | 设置转发请求头。如果请求头已存在，则覆盖其值。                               |
| proxy_add_headers            | []     | 添加转发请求头。如果请求头已存在，则追加新的值。                             |

可用变量

在设置请求头时，您可以使用以下动态变量：

`$hostname`, `$host`, `$scheme`, `$remote_addr`, `$remote_port`, `$server_addr`, `$server_port`, `$upstream_addr` 等。

安全与限制

| 参数                 | 默认值 | 说明                                               |
| -------------------- | ------ | -------------------------------------------------- |
| client_max_body_size |        | 允许的客户端请求体最大值，如 10mb，默认无限制      |
| max_processing       | 0      | 此 Location 可同时处理的最大请求数。0 表示不限制。 |

## 服务配置 (server.toml)

Server 是 Pingap 的网络入口，它定义了监听的端口、协议以及绑定的 Location 规则集。文件名中的 x (server.x.toml) 是该服务的唯一名称。


核心配置

| 参数      | 默认值 | 说明                                                   |
| --------- | ------ | ------------------------------------------------------ |
| addr      |        | （必需） 监听地址，格式为 ip:port。多个地址用 , 分隔。 |
| locations | []     | （必需） 绑定到此 Server 的 Location 名称列表。        |


TLS/HTTPS

| 参数                | 默认值     | 说明                                       |
| ------------------- | ---------- | ------------------------------------------ |
| global_certificates | false      | 是否启用全局证书配置。HTTPS 服务必须开启。 |
| tls_min_version     | 1.2        | 支持的最低 TLS 版本。                      |
| tls_max_version     | 1.3        | 支持的最高 TLS 版本。                      |
| tls_cipher_list     | (推荐列表) | TLS 1.2 及以下版本的加密套件。             |
| tls_ciphersuites    | (推荐列表) | TLS 1.3 的加密套件。                       |


协议与模块

| 参数       | 默认值 | 说明                                                                   |
| ---------- | ------ | ---------------------------------------------------------------------- |
| enabled_h2 | false  | 是否启用 HTTP/2 支持。开启后，HTTPS 连接将协商 H2，HTTP 连接则为 H2C。 |
| modules    | []     | 启用特定的功能模块，如 web-grpc 等。                                   |

性能与连接调优

| 参数                     | 默认值 | 说明                                                                         |
| ------------------------ | ------ | ---------------------------------------------------------------------------- |
| threads                  | 1      | 专门为此 Server 分配的工作线程数。                                           |
| reuse_port               | false  | 是否启用 SO_REUSEPORT，允许多个进程/线程监听同一端口，在高并发下可提升性能。 |
| downstream_read_timeout  |        | 从客户端读取请求的超时时间。                                                 |
| downstream_write_timeout |        | 向客户端写入响应的超时时间。                                                 |
| tcp_fastopen             |        | 启用 TCP Fast Open，并设置队列大小 (backlog)。                               |
| tcp_idle                 |        | TCP Keep-Alive 的空闲探测时长。                                              |
| tcp_interval             |        | TCP Keep-Alive 的探测间隔。                                                  |
| tcp_probe_count          |        | TCP Keep-Alive 的探测次数。                                                  |
| tcp_user_timeout         |        | TCP 用户超时，定义了未确认数据可以保持多长时间。                             |


可观测性

| 参数                 | 默认值 | 说明                                                                                   |
| -------------------- | ------ | -------------------------------------------------------------------------------------- |
| access_log           |        | 访问日志的目录文件与格式化模板。留空则不输出。 如：`/var/log/pingap.log {when} {path}` |
| prometheus_metrics   |        | 暴露 Prometheus 指标的路径，如 /metrics。                                              |
| otlp_exporter        |        | 暴露 OpenTelemetry 指标的路径，如 /metrics。                                           |
| enable_server_timing | false  | 是否在响应头中添加 Server-Timing，用于展示处理耗时，便于前端性能分析。                 |