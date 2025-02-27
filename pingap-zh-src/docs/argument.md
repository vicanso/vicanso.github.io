---
sidebar_position: 21
---

# 命令行参数

Pingap 主要通过 toml 文件进行配置，部分启动参数需要通过命令行或环境变量指定：

## 命令行参数

| 参数          | 简写 | 说明                                                                                                                                                                                                                                           |
| ------------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `conf`        | `c`  | 配置文件或目录路径，默认为当前目录。支持格式：<br />- 单文件：`/opt/pingap/conf/pingap.toml`<br />- 多文件目录：`/opt/pingap/conf`<br />- 拆分配置目录：`/opt/pingap/conf?separation`<br />- etcd：`etcd://user:pass@ip:port/path?timeout=10s` |
| `daemon`      | `d`  | 以守护进程方式运行（upgrade 功能必需）                                                                                                                                                                                                         |
| `upgrade`     | `u`  | 无中断更新模式，通过 unix socket 接收原程序请求                                                                                                                                                                                                |
| `test`        | `t`  | 仅测试配置有效性                                                                                                                                                                                                                               |
| `log`         | -    | 日志输出目录                                                                                                                                                                                                                                   |
| `admin`       | -    | 管理后台地址，支持认证格式：<br />- Base64：`base64(user:pass)@ip:port/prefix`<br />- 明文：`user:pass@ip:port/prefix`                                                                                                                         |
| `cp`          | -    | 标记为控制面板节点（仅用于 etcd 模式）                                                                                                                                                                                                         |
| `autorestart` | `a`  | 配置更新时自动重启（包含 autoreload 功能）                                                                                                                                                                                                     |
| `autoreload`  | -    | 自动更新部分配置（仅支持 upstream、location、plugin、certificate）                                                                                                                                                                             |
| `sync`        | -    | 同步配置到其他存储后退出                                                                                                                                                                                                                       |
| `template`    | -    | 输出配置模板后退出                                                                                                                                                                                                                             |

## 环境变量

命令行参数均可通过环境变量设置：

| 环境变量                | 对应参数        |
| ----------------------- | --------------- |
| `PINGAP_CONF`           | `--conf`        |
| `PINGAP_DAEMON`         | `--daemon`      |
| `PINGAP_UPGRADE`        | `--upgrade`     |
| `PINGAP_LOG`            | `--log`         |
| `PINGAP_ADMIN_ADDR`     | 管理后台地址    |
| `PINGAP_ADMIN_USER`     | 管理后台用户名  |
| `PINGAP_ADMIN_PASSWORD` | 管理后台密码    |
| `PINGAP_CP`             | `--cp`          |
| `PINGAP_AUTORESTART`    | `--autorestart` |
| `PINGAP_AUTORELOAD`     | `--autoreload`  |

## 文件配置模式启动示例

配置目录位于 `/opt/pingap/conf`，配置变更时自动重启：

```bash
RUST_LOG=INFO pingap \
  -c=/opt/pingap/conf -d \
  --log=/opt/pingap/pingap.log \
  --autorestart
```

## etcd 配置模式启动示例

多节点部署时推荐使用管理节点与应用节点分离模式。

管理节点：

```bash
RUST_LOG=INFO pingap \
  -c="etcd://127.0.0.1:2379/pingap?timeout=10s&connect_timeout=5s&user=pingap&password=123123" \
  --cp \
  --admin=pingap:123123@127.0.0.1:3018
```

应用节点：

```bash
RUST_LOG=INFO pingap \
  -c="etcd://127.0.0.1:2379/pingap?timeout=10s&connect_timeout=5s&user=pingap&password=123123" \
  -d --log=/opt/pingap/pingap.log \
  --autorestart
```

注意事项：
- etcd 连接格式：`etcd://ip1:port1,ip2:port2/path?user=xx&password=xx`，其中 `/path` 需对应不同应用实例
- admin 参数格式为 `user:password`，建议配置以启用 Basic Auth 认证
