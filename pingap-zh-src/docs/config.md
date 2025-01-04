---
sidebar_position: 31
---

# 配置说明

Pingap使用toml来配置相关参数，对于时间类的配置，格式为`1s`, `1m`, `1h`这种时间表示形式。而对于存储大小类的配置，格式为`1kb`, `1mb`, `1gb`这种表示方式。具体参数说明如下：

## 基础配置

- `name`: 实例名称，默认为`Pingap`，如果是在同一机器部署多个实例，可以配置不同的名称
- `error_template`: 参数可选，异常出错时的html模板，可自定义出错的html模板，在出错时会替换模板中的`{{version}}`为pingap的版本号，`{{content}}`为出错的具体信息
- `pid_file`: 参数可选，默认为`/run/pingap.pid`，此参数配置进程id的记录文件，若单机部署多实例，则需要配置不同的路径
- `upgrade_sock`: 参数可选，默认为`/tmp/pingap_upgrade.sock`，此参数配置程序无中断式更新时的socket路径，用于新的pingap进程与旧进程之间切换时使用，若单机部署多实例，则需要配置不同的路径
- `user`: 参数可选，默认为空，用于设置守护进程的执行用户
- `group`: 参数可选，默认为空，与`user`类似
- `threads`: 参数可选，默认为1，用于设置每个服务(如server监听的tcp连接)使用的线程数，如果设置为0，则使用cpu核数或cgroup限制核数
- `work_stealing`: 参数可选，默认为`true`，是否允许同服务中的不同线程的抢占工作
- `grace_period`: 设置优雅退出的等待周期，默认为5分钟
- `graceful_shutdown_timeout`: 设置优雅退出关闭超时时长，默认为5秒
- `upstream_keepalive_pool_size`: 设置upstream保持连接的连接池大小，默认为`128`
- `webhook`: Webhook的请求路径
- `webhook_type`: Webhook的类型，支持普通的http形式、`webcom`与`dingtalk`三种类型
- `webhook_notifications`: Webhook通知的类型，有`backend_status`，`lets_encrypt`，`diff_config`，`restart`，`restart_fail`以及`tls_validity`等等
- `log_level`: 应用日志的输出级别，默认为`INFO`
- `log_buffered_size`: 日志缓存区大小，默认为0，若设置小于4096则表示不使用buffer
- `log_format_json`: 设置为json格式化日志
- `sentry`: Sentry的DSN配置，sentry需要使用`full feature`版本
- `pyroscope`: Pyroscope连接地址，需要注意默认版本并未编译支持pyroscpe，需要使用perf的版本
- `auto_restart_check_interval`: 检测配置更新的间隔，默认为每90秒检测一次，若配置为小于1秒的值，则不检测
- `cache_directory`: 设置缓存目录，设置之后则使用文件形式缓存，文件目录缓存会定期清除过长时间未被访问文件，文件缓存的配置形式如`/opt/pingap/cache?reading_max=1000&writing_max=500&cache_max=200`
  - `reading_max`: 限制最大正在读取缓存的数据（只对于文件缓存有效）
  - `writing_max`: 限制最大正在写入缓存的数据（只对于文件缓存有效）
  - `cache_max`: 文件缓存中对于热点数据的缓存数量限制，内存缓存为tinyufo，默认为100，若设置为0则表示不使用内存热点缓存
- `cache_max_size`: 缓存空间的最大限制，缓存是程序中所有服务共用，对于文件缓存此限制无效
- `tcp_fast_open`: 是否启用TCP Fast Open功能，可以减少TCP连接建立时的延迟。启用时需要指定backlog大小

## Upstream

Upstream配置用于定义后端服务节点列表。如果配置域名，系统会根据DNS解析结果添加所有节点地址（需要配置相应的服务发现方式才会自动更新DNS解析）。建议配置HTTP健康检查来监控节点状态。

主要参数说明：

- `addrs`: 节点地址列表，格式为 `ip:port [weight]`，weight为可选的权重值(默认为1)
- `discovery`: 服务发现方式。推荐域名使用dns方式，docker服务可使用docker label方式
- `update_frequency`: 服务发现的更新间隔，建议配置以实现节点的动态更新
- `algo`: 节点的选择算法，支持`hash`与`round_robin`两种形式，如`hash:ip`表示按ip hash选择节点。默认为`round_robin`
- `sni`: 若配置的是https，需要设置对应的SNI
- `verify_cert`: 若配置的是https，是否需要校验证书有效性
- `health_check`: 节点健康检测配置，支持http、tcp与grpc形式
- `ipv4_only`: 若配置为域名时，是否仅添加解析的ipv4节点
- `enable_tracer`: 是否启用tracer功能，启用后可获取得upstream的连接数
- `alpn`: 在tls握手时，alpn的配置，默认为H1
- `connection_timeout`: tcp连接超时，默认为无
- `total_connection_timeout`: 连接超时，若是https请求包括tls握手部分，默认为无
- `read_timeout`: 读取超时，默认为无
- `idle_timeout`: 空闲超时，指定连接空闲多久后会自动回收，如果设置为0，则连接不复用，需要注意有些网络设备对于无数据的tcp连接会过期自动关闭，因此可根据需要设置对应的值。默认为无
- `write_timeout`: 写超时，默认为无
- `tcp_idle`: tcp连接keepalive空闲回收时长
- `tcp_interval`: tcp连接keepavlie检测时长
- `tcp_probe_count`: tcp连接keepalvie探针检测次数
- `tcp_recv_buf`: tcp接收缓存区大小

需要注意，若要设置tcp的keepalive，`tcp_idle`，`tcp_interval`以及`tcp_probe_count`均需要设置。

### 健康检查配置

支持以下三种健康检查方式：

- `HTTP(S)`: `http://upstream名称/检查路径?参数`
- `TCP`: `tcp://upstream名称?参数` 
- `gRPC`: `grpc://upstream名称?service=服务名&参数`

通用参数说明：
- `connection_timeout`: 连接超时时间，默认3秒
- `read_timeout`: 读取超时时间，默认3秒
- `check_frequency`: 检查间隔，默认10秒
- `success`: 判定为健康所需的连续成功次数，默认1次
- `failure`: 判定为不健康所需的连续失败次数，默认2次
- `reuse`: 是否复用检查连接，默认否

### Algo的hash

若指定通过hash的方式选择upstream的backend，则可使用如下方式：

- `hash:url`: 根据url转发，主要用于upstream为基于url缓存的服务
- `hash:ip`: 根据ip转发，upstream为有基于ip数据持久化的服务
- `hash:header:X-User`: 根据请求头获取`X-User`的值转发
- `hash:cookie:uid`: 根据Cookie的`uid`值转发
- `hash:query:appKey`: 根据Query的`appkey`值转发
- `hash:path`: 根据path转发，hash方式的默认值


## Location

Location主要配置请求的匹配规则、请求头响应头的插入，以及各种插件的关联，是整个流程中的关联组成部分。下面是相关参数的详细说明：

- `upstream`: 配置该location对应的upstream，若该location所有的处理均由插件完成，则可不配置。如针对http重定向至https的逻辑，则只需要添加中间件即可
- `path`: 匹配的路径，具体使用方法后续内容细说
- `host`: 匹配的域名，如果是多个域名则使用`,`分隔，配置为`~`开始则表示以正则表达式匹配
- `proxy_set_headers`: 转发至upstream时设置的请求头，若该请求头已存在则覆盖
- `proxy_add_headers`: 转发至upstream时添加的请求头
- `rewrite`: 请求路径的重写规则
- `weight`: 自定义的权重，可以调整该location的权重，例如mock为服务不可用后，再调整该权重最高，则可禁用所有请求。如非特别则不需要设置，权重会自动计算（计算得出的权重最高不超过2048）
- `plugins`: 添加至该location的插件列表，按顺序执行
- `client_max_body_size`: 客户端请求的body最大长度
- `max_processing`: 最大处理请求数，若设置为0则表示不限制
- `grpc_web`: 是否启用支持grpc-web
- `enable_reverse_proxy_headers`: 是否启用反向代理的请求头，启用后会添加以下的请求头
  - `X-Real-IP`: 表示请求的客户端地址
  - `X-Forwarded-For`: 表示请求的代理地址，按x-forwarded-for的格式添加
  - `X-Forwarded-Proto`: 表示请求的scheme, 如http或https
  - `X-Forwarded-Host`: 表示请求的host
  - `X-Forwarded-Port`: 表示请求的server端口

### Path匹配规则

Location的path匹配支持以下的规则，权重由高至低：

- 全等模式，配置以`=`开始，如`=/api`表示匹配path等于`/api`的请求
- 正则模式，配置以`~`开始，如`~^/(api|rest)`表示匹配path以`/api`或`/rest`开始请求
- 前缀模式，如`/api`表示匹配path为`/api`开始的请求

### Path重写请求路径

可按需配置请求路径重写规则，支持正则匹配处理(与nginx类似)，仅支持配置一个重写规则，若逻辑过于复杂建议可配置多个location来分开实现。配置通过空格分隔为前后两部分，处理逻辑则是按正则匹配将前部分替换为后部分，下面是常用的一些例如：

- `^/api/ /`: 表示将请求前缀的`/api/`替换为`/`
- `^/(\S*?)/ /api/$1/`: 表示在请求路径添加前缀`/api`
- `^/(\S*?)/api/(\S*?) /$1/$2`: 表示将请求路径中的`/api`部分删除

### 请求头设置支持的变量名

- `$hostname`: 表示处理该请求主机的hostname
- `$host`: 表示请求的host
- `$scheme`: 表示请求的scheme, 如http或https
- `$remote_addr`: 表示请求的客户端地址
- `$remote_port`: 表示请求的客户端端口
- `$server_addr`: 表示请求的server地址
- `$server_port`: 表示请求的server端口
- `$proxy_add_x_forwarded_for`: 表示请求的代理地址，按x-forwarded-for的格式添加
- `$upstream_addr`: 表示请求的upstream地址


## Server

- `server.x`: server的配置，其中`x`为server的名称，需要注意名称不要相同，相同名称的配置会被覆盖。
- `addr`: 监控的端口地址，地址格式为`ip:port`的形式，若需要监听多地址则以`,`分隔
- `access_log`: 可选，默认为不输出访问日志。请求日志格式化，指定输出访问日志的形式。提供了以下几种常用的日志输出格式`combined`, `common`, `short`, `tiny`
- `locations`: location的列表，指定该server使用的location
- `threads`: 设置服务默认的线程数，设置为0则等于cpu核数，默认为1
- `tls_cipher_list`: 指定tls1.3之前版本使用的加密套件，可以参考nginx等软件的配置
- `tls_ciphersuites`: 指定tls1.3版本使用的加密套件，可以参考nginx等软件的配置
- `tls_min_version`: 指定tls的最低版本，默认为1.2
- `tls_max_version`: 指定tls的最低版本，默认为1.3
- `global_certificates`: 启用全局证书配置，用于无法匹配到符合server name的https请求使用
- `enabled_h2`: 是否启用http2，建议配置为启用，需要注意，如果是http则使用h2c的形式
- `tcp_idle`: tcp连接keepalive空闲回收时长
- `tcp_interval`: tcp连接keepavlie检测时长
- `tcp_probe_count`: tcp连接keepalvie探针检测次数
- `tcp_fastopen`: 启用tcp快速启动，并设置backlog的大小
- `prometheus_metrics`: 设置启用prometheus，如果配置为http形式的则为push的形式，如果只配置路径则提供pull的请求路径，如`/metrics`则表示`http://ip:port/metrics`可获取对应的metrics数据(需要注意full futures版本才支持)
- `otlp_exporter`: 设置opentemletry数据收集器的地址(需要注意full futures版本才支持)
- `modules`: 选择要启用的模块，对于web-grpc需要勾选对应模块
