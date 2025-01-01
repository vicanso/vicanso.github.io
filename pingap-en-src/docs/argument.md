---
sidebar_position: 21
---

# Command Line Arguments

Pingap is configured through TOML files, but certain startup parameters need to be specified via command line arguments or environment variables:

## Command Line Arguments

| Parameter     | Short | Description                                                                                                                                                                                                                                                                                                      |
| ------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `conf`        | `c`   | Configuration file or directory path, defaults to current directory. Supported formats:<br />- Single file: `/opt/pingap/conf/pingap.toml`<br />- Multi-file directory: `/opt/pingap/conf`<br />- Split config directory: `/opt/pingap/conf?separation`<br />- etcd: `etcd://user:pass@ip:port/path?timeout=10s` |
| `daemon`      | `d`   | Run as a daemon process (required for upgrade feature)                                                                                                                                                                                                                                                           |
| `upgrade`     | `u`   | Zero-downtime update mode, receives requests from original program via unix socket                                                                                                                                                                                                                               |
| `test`        | `t`   | Only test configuration validity                                                                                                                                                                                                                                                                                 |
| `log`         | -     | Log output directory                                                                                                                                                                                                                                                                                             |
| `admin`       | -     | Admin panel address, supports authentication formats:<br />- Base64: `base64(user:pass)@ip:port`<br />- Plaintext: `user:pass@ip:port/prefix`                                                                                                                                                                    |
| `cp`          | -     | Mark as control panel node (etcd mode only)                                                                                                                                                                                                                                                                      |
| `autorestart` | `a`   | Automatically restart on config updates (includes autoreload functionality)                                                                                                                                                                                                                                      |
| `autoreload`  | -     | Automatically update partial configurations (only supports upstream, location, plugin, certificate)                                                                                                                                                                                                              |
| `sync`        | -     | Sync configuration to other storage and exit                                                                                                                                                                                                                                                                     |
| `template`    | -     | Output configuration template and exit                                                                                                                                                                                                                                                                           |

## Environment Variables

All command line parameters can be set through environment variables:

| Environment Variable    | Corresponding Parameter |
| ----------------------- | ----------------------- |
| `PINGAP_CONF`           | `--conf`                |
| `PINGAP_DAEMON`         | `--daemon`              |
| `PINGAP_UPGRADE`        | `--upgrade`             |
| `PINGAP_LOG`            | `--log`                 |
| `PINGAP_ADMIN_ADDR`     | Admin panel address     |
| `PINGAP_ADMIN_USER`     | Admin panel username    |
| `PINGAP_ADMIN_PASSWORD` | Admin panel password    |
| `PINGAP_CP`             | `--cp`                  |
| `PINGAP_AUTORESTART`    | `--autorestart`         |
| `PINGAP_AUTORELOAD`     | `--autoreload`          |

## File Configuration Mode Startup Example

Configuration directory located at `/opt/pingap/conf`, with automatic restart on configuration changes:

```bash
RUST_LOG=INFO pingap \
  -c=/opt/pingap/conf -d \
  --log=/opt/pingap/pingap.log \
  --autorestart
```

## etcd Configuration Mode Startup Example

For multi-node deployments, it's recommended to use separate management and application nodes.

Management node:

```bash
RUST_LOG=INFO pingap \
  -c="etcd://127.0.0.1:2379/pingap?timeout=10s&connect_timeout=5s&user=pingap&password=123123" \
  --cp \
  --admin=pingap:123123@127.0.0.1:3018
```

Application node:

```bash
RUST_LOG=INFO pingap \
  -c="etcd://127.0.0.1:2379/pingap?timeout=10s&connect_timeout=5s&user=pingap&password=123123" \
  -d --log=/opt/pingap/pingap.log \
  --autorestart
```

Important notes:
- etcd connection format: `etcd://ip1:port1,ip2:port2/path?user=xx&password=xx`, where `/path` should correspond to different application instances
- admin parameter format is `user:password`, recommended to configure to enable Basic Auth authentication
