---
sidebar_position: 21
---

# 命令行参数与环境变量

Pingap 的核心行为通过 TOML 文件定义，但服务的启动、运行模式及部分关键配置则需要通过命令行参数或环境变量来指定。

优先级说明：命令行参数的优先级高于环境变量。如果两者同时设置，将以命令行参数为准。

## 参数参考

我们将启动参数分为几类，以便您快速查阅。

A. 核心参数

这些是配置和运行 Pingap 最基础、最常用的参数。

| 参数    | 简写 | 说明                                                                                                                                                                                                                                           |
| ------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `conf`  | `c`  | 配置文件或目录路径，默认为当前目录。支持格式：<br />- 单文件：`/opt/pingap/conf/pingap.toml`<br />- 多文件目录：`/opt/pingap/conf`<br />- 拆分配置目录：`/opt/pingap/conf?separation`<br />- etcd：`etcd://user:pass@ip:port/path?timeout=10s` |
| `admin` | -    | 管理后台地址，支持认证格式：<br />- Base64：`base64(user:pass)@ip:port/prefix`<br />- 明文：`user:pass@ip:port/prefix`                                                                                                                         |
| `log`   | -    | 日志输出目录                                                                                                                                                                                                                                   |

B. 运行模式参数

这些参数用于控制 Pingap 的启动行为和生命周期。

| 参数      | 简写 | 说明                                                                 |
| --------- | ---- | -------------------------------------------------------------------- |
| `daemon`  | `d`  | 以守护进程方式运行（upgrade 功能必需）                               |
| `upgrade` | `u`  | 无中断更新模式，通过 unix socket 接收原程序请求                      |
| `test`    | `t`  | 仅测试配置有效性                                                     |
| `threads` |      | 设置默认的线程数，其优先级高于配置文件中的设置，一般用于临时测试使用 |

C. 自动更新参数

Pingap 提供强大的动态配置能力，以下参数用于控制配置变更后的自动更新行为。

| 参数          | 简写 | 说明                                                               |
| ------------- | ---- | ------------------------------------------------------------------ |
| `autorestart` | `a`  | 配置更新时自动重启（包含 autoreload 功能）                         |
| `autoreload`  | -    | 自动更新部分配置（已支持 upstream、location、plugin、certificate） |

D. 集群与工具参数

这些是用于高级场景（如 Etcd 集群部署、配置迁移）的参数。

| 参数       | 简写 | 说明                                   |
| ---------- | ---- | -------------------------------------- |
| `cp`       | -    | 标记为控制面板节点（仅用于 etcd 模式） |
| `sync`     | -    | 同步配置到其他存储后退出               |
| `template` | -    | 输出配置模板后退出                     |

## 环境变量

所有命令行参数都可以通过环境变量进行设置，这在容器化部署中尤其有用。环境变量均以`PINGAP_`为前缀。

| 环境变量             | 对应参数        |
| -------------------- | --------------- |
| `PINGAP_CONF`        | `--conf`        |
| `PINGAP_DAEMON`      | `--daemon`      |
| `PINGAP_UPGRADE`     | `--upgrade`     |
| `PINGAP_LOG`         | `--log`         |
| `PINGAP_CP`          | `--cp`          |
| `PINGAP_AUTORESTART` | `--autorestart` |
| `PINGAP_AUTORELOAD`  | `--autoreload`  |

对于 --admin 参数，环境变量被拆分为三部分，更便于管理：

| 环境变量                | 对应参数       |
| ----------------------- | -------------- |
| `PINGAP_ADMIN_ADDR`     | 管理后台地址   |
| `PINGAP_ADMIN_USER`     | 管理后台用户名 |
| `PINGAP_ADMIN_PASSWORD` | 管理后台密码   |


## 实用启动示例

1. 本地文件模式（推荐入门）

这是最常见的部署方式，以后台模式运行，并允许热更新部分常用配置。


```bash
# 设置日志级别为 INFO
# -c: 指定配置存储目录
# -d: 以后台守护进程模式运行
# --log: 将日志输出到文件
# --autoreload: 开启配置热更新
RUST_LOG=INFO pingap \
  -c /opt/pingap/conf \
  -d \
  --log /opt/pingap/pingap.log \
  --autoreload
```


2. Etcd 集群模式：在多节点部署时，推荐使用 Etcd 作为统一配置中心，并将管理节点与应用节点分离。

管理节点 (Control Plane Node)

此节点运行 Web UI，并将所有配置变更写入 Etcd。

```bash
# -c: 指定 etcd 作为配置源
# --cp: 声明这是一个控制平面节点
# --admin: 启动 Web 管理后台
RUST_LOG=INFO pingap \
  -c "etcd://user:pass@127.0.0.1:2379/pingap" \
  -d \
  --cp \
  --admin=pingap:YourSecurePassword@0.0.0.0:3018
```

应用节点 (Worker Node)

这些节点从 Etcd 读取配置并处理实际的业务流量。它们不需要运行 Web UI。

```bash
# -c: 从相同的 etcd 路径读取配置
# -d: 以后台模式运行
# --log: 将日志写入文件
# --autoreload: 从 watch etcd 配置变化，开启配置热更新
RUST_LOG=INFO pingap \
  -c "etcd://user:pass@127.0.0.1:2379/pingap" \
  -d \
  --log /opt/pingap/pingap.log \
  --autoreload
```

