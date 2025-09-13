---
sidebar_position: 141
---

# 使用 Docker 部署 Pingap

我们为`Pingap`提供了官方的`Docker`镜像，让您可以在任何支持`Docker`的环境中快速、一致地完成部署。

若为了简化运维成功，使用`Docker`部署`Pingap`是我们推荐的方式，它具有环境隔离、轻松迁移和快速扩缩容等诸多优点。

1. 拉取镜像

首先，从`Docker Hub`拉取`Pingap`镜像。`Pingap` 提供了多种镜像标签，以满足不同场景的需求，主要分为标准版和功能完整版 (full)。

功能完整版 (full) 额外包含了`OpenTelemetry`、`Sentry`以及`图片压缩插件`等通常需要额外依赖的扩展功能。

可用镜像标签

| 镜像标签 (Image Tag)        | 说明                                                                       |
| --------------------------- | -------------------------------------------------------------------------- |
| vicanso/pingap:latest       | 最新开发版。基于主分支的最新代码构建，包含最新的功能和修复，但可能不稳定。 |
| vicanso/pingap:full         | 功能完整的最新开发版。与 latest 类似，但包含了所有扩展功能。               |
| vicanso/pingap:version      | 按版本号构建，提供稳定的功能，若不需要链路跟踪，图片压缩等功能中使用。     |
| vicanso/pingap:version-full | 功能完整的稳定版。按版本号构建并包含所有扩展功能。推荐在大多数场景中使用。 |


💡 生产环境建议

为了保证部署的稳定性和可预测性，我们强烈建议您在生产环境中使用带明确版本号的镜像标签（例如 vicanso/pingap:version-full）。请避免使用 latest 或 full，因为它们会随着开发更新而变化，可能引入不兼容的变更。

```bash
# 拉取功能完整的最新稳定版 (推荐)
docker pull vicanso/pingap:0.12.1-full

# 或者，如果您想体验最新的功能，可以拉取开发版
docker pull vicanso/pingap:latest
```


2. 快速启动 (使用`docker run`)

您可以使用`docker run`命令快速启动一个`Pingap`容器。

在执行命令前，请在当前目录下创建一个`pingap`文件夹，用于持久化存储`Pingap`的所有配置和数据。

```bash
mkdir -p $PWD/pingap
```

然后执行以下命令：

```bash
docker run -d \
  --name pingap-instance \
  --restart=always \
  -v $PWD/pingap:/opt/pingap \
  -p 80:80 \
  -p 443:443 \
  -e PINGAP_CONF=/opt/pingap/conf \
  -e PINGAP_ADMIN_ADDR="0.0.0.0:80/pingap" \
  -e PINGAP_ADMIN_USER=pingap \
  -e PINGAP_ADMIN_PASSWORD=<YourSecurePassword> \
  vicanso/pingap pingap --autoreload
```


🔒 安全提示

请务必将命令中的 `<YourSecurePassword>` 替换为您自己的强密码！

参数解析
- `-d`: 以分离模式 (Detached) 在后台运行容器。
- `--name pingap-instance`: 为容器指定一个易于识别的名称。
- `--restart=always`: 当容器退出时，Docker 会自动重启它，确保服务高可用。
- `-v $PWD/pingap:/opt/pingap`: 将宿主机的 `./pingap` 目录挂载到容器的 `/opt/pingap` 目录。这是实现数据持久化的关键，所有配置、证书和日志都会保存在这里。
- `-p 80:80` 和 `-p 443:443`: 将宿主机的 80 和 443 端口映射到容器的 80 和 443 端口，用于对外提供 HTTP/HTTPS 服务。
- `-e PINGAP_*`: 通过环境变量来设置 Pingap 的启动参数，这是在 Docker 中配置应用的最佳实践。
- `vicanso/pingap pingap --autoreload`: 指定使用的镜像，并告诉容器内的 Pingap 程序以 --autoreload 模式启动。


3. 核心概念：Docker 环境下的配置更新

在 `Docker` 环境中，容器的主进程被期望持续在前台运行。`Pingap` 的`--autorestart`参数依赖于 daemon 模式，该模式会创建一个新的后台进程并退出主进程，这与`Docker`的期望相悖，会导致容器立即退出。

因此，在 Docker 环境中：

- 请勿使用`--autorestart`参数。
- 请使用`--autoreload`参数：对于`upstream`, `location`, `certificate`等大部分日常配置的变更，`--autoreload`可以在不重启容器的情况下实现热更新，这是最理想的方式。
- 对于基础配置变更：如果您需要修改`server`的监听端口等无法热更新的基础配置，标准的做法是重启容器：

```bash
# 修改配置文件后，执行以下命令即可
docker restart pingap-instance
```

4. 推荐方式：使用 Docker Compose

对于长期运行的服务，我们强烈建议使用 docker-compose 来定义和管理。它能让您的配置声明化，更易于维护和复现。

在您的项目根目录下创建一个 docker-compose.yml 文件：

```yaml
# docker-compose.yml
version: '3.8'

services:
  pingap:
    image: vicanso/pingap:latest
    container_name: pingap-instance
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      # 将当前目录下的 pingap/ 文件夹挂载到容器中，用于持久化数据
      - ./pingap:/opt/pingap
    environment:
      # 使用环境变量进行配置
      - PINGAP_CONF=/opt/pingap/conf
      - PINGAP_ADMIN_ADDR=0.0.0.0:80/pingap
      - PINGAP_ADMIN_USER=pingap
      - PINGAP_ADMIN_PASSWORD=<YourSecurePassword> # 同样，请替换为强密码
    command:
      # 设置容器启动命令，启用热更新
      - pingap
      - --autoreload
```

然后，在 docker-compose.yml 文件所在的目录执行以下命令即可启动：

```bash
docker-compose up -d
```

访问管理后台

启动成功后，您可以通过 `http://<服务器IP>/pingap/` 访问 `Pingap` 的`Web` 管理后台，并开始配置您的代理服务。


5. 进阶：与 `Docker` 服务发现联动

`Pingap` 支持通过 `Docker Label` 进行服务发现。当您将 `Pingap` 与其他服务一同部署在 `Docker` 环境中时，可以利用此功能实现上游节点的自动注册和更新，极大简化了微服务架构下的配置管理。

