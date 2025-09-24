---
sidebar_position: 21
---

# Command-Line Arguments and Environment Variables

While the core behavior of Pingap is defined through TOML files, the service's startup, operational mode, and some key configurations are specified via command-line arguments or environment variables.

**Priority Note**: Command-line arguments have a higher priority than environment variables. If both are set, the command-line argument will take precedence.

## Argument Reference

We have categorized the startup arguments to help you find what you need quickly.

### A. Core Arguments

These are the most fundamental and commonly used arguments for configuring and running Pingap.

| Argument | Short Flag | Description                                                                                                                                                                                                                                                                                                                   |
| :------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `conf`   | `c`        | Path to a configuration file or directory, defaults to the current directory. Supported formats:<br />- Single file: `/opt/pingap/conf/pingap.toml`<br />- Multi-file directory: `/opt/pingap/conf`<br />- Separated config directory: `/opt/pingap/conf?separation`<br />- etcd: `etcd://user:pass@ip:port/path?timeout=10s` |
| `admin`  | -          | Address for the admin interface, supports authentication formats:<br />- Base64: `base64(user:pass)@ip:port/prefix`<br />- Plaintext: `user:pass@ip:port/prefix`                                                                                                                                                              |
| `log`    | -          | The directory for log output.                                                                                                                                                                                                                                                                                                 |

### B. Runtime Mode Arguments

These arguments control the startup behavior and lifecycle of Pingap.

| Argument  | Short Flag | Description                                                                                                   |
| :-------- | :--------- | :------------------------------------------------------------------------------------------------------------ |
| `daemon`  | `d`        | Run as a daemon process (required for the `upgrade` feature).                                                 |
| `upgrade` | `u`        | Zero-downtime upgrade mode, receives requests from the original process via a unix socket.                    |
| `test`    | `t`        | Only test the validity of the configuration.                                                                  |
| `threads` |            | Sets the default number of threads, overriding the config file setting. Generally used for temporary testing. |

### C. Auto-Update Arguments

Pingap provides powerful dynamic configuration capabilities. The following arguments control the auto-update behavior after configuration changes.

| Argument      | Short Flag | Description                                                                                         |
| :------------ | :--------- | :-------------------------------------------------------------------------------------------------- |
| `autorestart` | `a`        | Automatically restart on configuration updates (includes `autoreload` functionality).               |
| `autoreload`  | -          | Automatically reload parts of the configuration (supports upstream, location, plugin, certificate). |

### D. Cluster and Utility Arguments

These are arguments for advanced scenarios, such as Etcd cluster deployments and configuration migrations.

| Argument   | Short Flag | Description                                                 |
| :--------- | :--------- | :---------------------------------------------------------- |
| `cp`       | -          | Mark as a control plane node (only for etcd mode).          |
| `sync`     | -          | Synchronize configuration to another storage and then exit. |
| `template` | -          | Output a configuration template and then exit.              |

## Environment Variables

All command-line arguments can be set via environment variables, which is particularly useful in containerized deployments. All environment variables are prefixed with `PINGAP_`.

| Environment Variable | Corresponding Argument |
| :------------------- | :--------------------- |
| `PINGAP_CONF`        | `--conf`               |
| `PINGAP_DAEMON`      | `--daemon`             |
| `PINGAP_UPGRADE`     | `--upgrade`            |
| `PINGAP_LOG`         | `--log`                |
| `PINGAP_CP`          | `--cp`                 |
| `PINGAP_AUTORESTART` | `--autorestart`        |
| `PINGAP_AUTORELOAD`  | `--autoreload`         |

For the `--admin` argument, the environment variable is split into three parts for easier management:

| Environment Variable    | Corresponds To           |
| :---------------------- | :----------------------- |
| `PINGAP_ADMIN_ADDR`     | Admin interface address  |
| `PINGAP_ADMIN_USER`     | Admin interface username |
| `PINGAP_ADMIN_PASSWORD` | Admin interface password |

## Practical Startup Examples

### 1. Local File Mode (Recommended for Getting Started)

This is the most common deployment method. It runs in the background and allows for hot-reloading of commonly used configurations.

```bash
# Set the log level to INFO
# -c: Specify the configuration directory
# -d: Run as a background daemon process
# --log: Output logs to a file
# --autoreload: Enable configuration hot-reloading
RUST_LOG=INFO pingap \
  -c /opt/pingap/conf \
  -d \
  --log /opt/pingap/pingap.log \
  --autoreload


### 2. Etcd Cluster Mode

For multi-node deployments, it is recommended to use Etcd as a unified configuration center and to separate the control plane nodes from the worker nodes.

Control Plane Node

This node runs the Web UI and writes all configuration changes to Etcd.

```bash
# -c: Specify etcd as the configuration source
# --cp: Declare this as a control plane node
# --admin: Start the web admin interface
RUST_LOG=INFO pingap \
  -c "etcd://user:pass@127.0.0.1:2379/pingap" \
  -d \
  --cp \
  --admin=pingap:YourSecurePassword@0.0.0.0:3018
```

Worker Node

These nodes read the configuration from Etcd and handle the actual business traffic. They do not need to run the Web UI.


```bash
# -c: Read configuration from the same etcd path
# -d: Run in the background
# --log: Write logs to a file
# --autoreload: Watch for etcd config changes and enable hot-reloading
RUST_LOG=INFO pingap \
  -c "etcd://user:pass@127.0.0.1:2379/pingap" \
  -d \
  --log /opt/pingap/pingap.log \
  --autoreload
```

