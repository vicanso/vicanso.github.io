---
sidebar_position: 51
---

# Upsteam说明


Upstream配置为节点地址列表，配置为域名则会根据解析后的IP添加所有节点地址（之后并不会再次刷新域名解析），需要注意节点会使用默认的tcp health check的形式检测节点是否可用，建议配置为http health check。下面针对相关参数详细说明：

- `addrs`: 节点地址列表，地址为`ip:port weight`的形式，`weight`权重可不指定，默认为1
- `discovery`: 指定服务发现形式，如果地址配置为域名则建议选择dns形式，定期解析对应的ip地址。若是部署在同一机器的docker服务则可考虑使用`docker label`的形式。
- `update_frequency`: 设置服务发现的更新间隔
- `algo`: 节点的选择算法，支持`hash`与`round_robin`两种形式，如`hash:ip`表示按ip hash选择节点。默认为`round_robin`
- `sni`: 若配置的是https，需要设置对应的SNI
- `verify_cert`: 若配置的是https，是否需要校验证书有效性
- `health_check`: 节点健康检测配置，支持http与tcp形式
- `ipv4_only`: 若配置为域名时，是否仅添加解析的ipv4节点
- `enable_tracer`: 是否启用tracer功能，启用后可获取得upstream的连接数
- `alpn`: 在tls握手时，alpn的配置，默认为H1
- `connection_timeout`: tcp连接超时，默认为无
- `total_connection_timeout`: 连接超时，对于https包括tls握手部分，默认为无
- `read_timeout`: 读取超时，默认为无
- `idle_timeout`: 空闲超时，指定连接空闲多久后会自动回收，如果设置为0，则连接不复用，需要注意有些网络设备对于无数据的tcp连接会过期自动关闭，因此可根据需要设置对应的值。默认为无
- `write_timeout`: 写超时，默认为无
- `tcp_idle`: tcp连接keepalive空闲回收时长
- `tcp_interval`: tcp连接keepavlie检测时长
- `tcp_probe_count`: tcp连接keepalvie探针检测次数
- `tcp_recv_buf`: tcp接收缓存区大小
- `tcp_fast_open`: 是否启用tcp快速连接

需要注意，若要设置tcp的keepalive，`tcp_idle`，`tcp_interval`以及`tcp_probe_count`均需要设置。

### 节点健康检测

- `health_check`: 建议配置为health check的形式，根据服务的检测路径配置为`http://upstream名称/路径`，如对于upstream需要设置Host为test的的服务，其检测路径为`/ping`，即可设置为`http://test/ping`

- `TCP`: tcp://upstreamname?connection_timeout=3s&success=2&failure=1&check_frequency=10s
- `HTTP(S)`: http://upstreamname/ping?connection_timeout=3s&read_timeout=1s&success=2&failure=1&check_frequency=10s

健康检测参数说明：

- `connection_timeout`: 连接超时，默认为3秒
- `read_timeout`: 读取超时，默认为3少
- `check_frequency`: 检测间隔，默认为10秒
- `success`: 成功次数多少次为成功，默认为1次
- `failure`: 失败次数多少次为失败，默认为2次
- `reuse`: 检测时是否复用连接，默认为否

### Algo的hash

若指定通过hash的方式选择upstream的backend，则可使用如下方式：

- `hash:url`: 根据url转发，主要用于upstream为基于url缓存的服务
- `hash:ip`: 根据ip转发，upstream为有基于ip数据持久化的服务
- `hash:header:X-User`: 根据请求头获取`X-User`的值转发
- `hash:cookie:uid`: 根据Cookie的`uid`值转发
- `hash:query:appKey`: 根据Query的`appkey`值转发
- `hash:path`: 根据path转发，hash方式的默认值
