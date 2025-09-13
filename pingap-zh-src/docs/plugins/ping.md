---
sidebar_position: 94
title: 健康检查 (Ping)
description: 提供一个轻量级的 HTTP 端点，用于服务存活探测 (Liveness Probe) 和就绪探测 (Readiness Probe)，是实现服务高可用和自动化运维的基础。
---

# 健康检查 (Ping) 插件

`ping` 插件是一个极其简单而重要的工具，它的唯一功能就是提供一个 HTTP 端点，当该端点被访问时，会立即返回一个 `200 OK` 响应，响应体为纯文本 `pong`。

## 功能简介

该插件会监听一个您所配置的特定路径（例如 `/ping`）。任何对该路径的 `GET` 请求都会被插件**拦截**并**立即响应**，而不会将请求转发到任何上游服务。

这个快速的“一问一答”机制是实现服务健康检查的理想方式。

## 使用场景

* **容器编排健康检查 (Kubernetes, Docker Swarm)**：
    * **存活探测 (Liveness Probe)**: K8s 可以定期请求 `/ping` 接口。如果 Pingap 实例无响应，K8s 会认为该实例已死锁或崩溃，并会自动重启容器，实现服务自愈。
    * **就绪探测 (Readiness Probe)**: K8s 可以通过此接口判断 Pingap 实例是否已准备好接收流量。只有当 `/ping` 接口返回成功时，K8s 才会将流量转发到该实例。

* **负载均衡器健康检查 (AWS ELB, Nginx)**：
    * 负载均衡器会周期性地向后端的每个 Pingap 实例发送健康检查请求。如果某个实例的 `/ping` 接口不返回 `200 OK`，负载均衡器会暂时将其从可用节点池中移除，直到它恢复正常。

* **服务监控与告警 (Prometheus, Zabbix)**：
    * 监控系统可以通过定期请求此接口来监控 Pingap 服务的可用性，并在服务中断时及时发出告警。

* **连通性测试**：
    * 开发或运维人员可以快速通过 `curl` 命令访问此接口，以验证 Pingap 服务是否正在运行并且网络可达。

## 配置参数

在 `plugin.ping.toml` 文件中进行配置。

| 参数   | 类型   | 是否必需 | 默认值 | 说明                                                               |
| :----- | :----- | :------- | :----- | :----------------------------------------------------------------- |
| `path` | String | **是**   | -      | **（必需）** 用于健康检查的 URL 路径。插件会对此路径进行精确匹配。 |

---

## 完整示例

**目标**：为我们的 Pingap 服务添加一个位于 `/healthz` 的健康检查端点。

1.  **配置插件 (`plugin.ping-healthcheck.toml`)**:
    ```toml
    # 指定健康检查的端点路径
    path = "/healthz"
    ```

2.  **在 Location 中应用插件 (`location.toml`)**:
    > 💡 **最佳实践**：健康检查的 `Location` 应该是一个独立的、不配置 `upstream` 的规则，因为它由插件直接响应。通常，这个端点应该只在内部网络或特定的管理端口上暴露。

    ```toml
    # location.toml
    [locations.route-for-my-app]
    path = "/"
    upstream = "my-main-service"
    plugins = [
        "ping-healthcheck",
    ]
    ```

### 如何验证

启动 Pingap 后，您可以使用 `curl` 来测试该端点：

```bash
curl http://<your-pingap-address>/healthz