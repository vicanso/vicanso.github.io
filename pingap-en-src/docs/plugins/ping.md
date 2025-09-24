---
sidebar_position: 94
title: Health Check (Ping)
description: Provides a lightweight HTTP endpoint for service Liveness Probes and Readiness Probes, forming the basis for high availability and automated operations.
---

# Health Check (Ping) Plugin

The `ping` plugin is an extremely simple yet essential tool whose sole function is to provide an HTTP endpoint that, when accessed, immediately returns a `200 OK` response with the plain text body `pong`.

## Feature Introduction

This plugin listens on a specific path you configure (e.g., `/ping`). Any `GET` request to this path will be **intercepted** and **responded to immediately** by the plugin, without forwarding the request to any upstream service.

This quick "ping-pong" mechanism is the ideal way to implement service health checks.

## Use Cases

* **Container Orchestration Health Checks (Kubernetes, Docker Swarm)**:
    * **Liveness Probe**: K8s can periodically request the `/ping` endpoint. If a Pingap instance does not respond, K8s will consider it deadlocked or crashed and will automatically restart the container, achieving service self-healing.
    * **Readiness Probe**: K8s can use this endpoint to determine if a Pingap instance is ready to receive traffic. Only when the `/ping` endpoint returns a success will K8s forward traffic to that instance.

* **Load Balancer Health Checks (AWS ELB, Nginx)**:
    * A load balancer periodically sends health check requests to each backend Pingap instance. If an instance's `/ping` endpoint fails to return `200 OK`, the load balancer will temporarily remove it from the pool of available nodes until it recovers.

* **Service Monitoring and Alerting (Prometheus, Zabbix)**:
    * Monitoring systems can periodically request this endpoint to monitor the availability of the Pingap service and send out alerts in a timely manner if the service is down.

* **Connectivity Testing**:
    * Developers or operations personnel can quickly access this endpoint via a `curl` command to verify that the Pingap service is running and network-reachable.

## Configuration Parameters

Configuration is done in the `plugin.ping.toml` file.

| Parameter | Type   | Required | Default | Description                                                                                            |
| :-------- | :----- | :------- | :------ | :----------------------------------------------------------------------------------------------------- |
| `path`    | String | **Yes**  | -       | **(Required)** The URL path for the health check. The plugin will perform an exact match on this path. |

---

## Complete Example

**Goal**: Add a health check endpoint at `/healthz` for our Pingap service.

1.  **Configure the plugin (`plugin.ping-healthcheck.toml`)**:
    ```toml
    # Specify the path for the health check endpoint
    path = "/healthz"
    ```

2.  **Apply the plugin in a Location (`location.toml`)**:
    > 💡 **Best Practice**: The `Location` for a health check should be a separate rule without an `upstream` configured, as it is handled directly by the plugin. Typically, this endpoint should only be exposed on an internal network or a specific admin port.

    ```toml
    # location.toml
    [locations.route-for-healthcheck]
    path = "/"
    upstream = "my-main-service"
    plugins = [
        "ping-healthcheck",
    ]
    ```

### How to Verify

After starting Pingap, you can test the endpoint using `curl`:

```bash
curl http://<your-pingap-address>/healthz