---
sidebar_position: 75
---

# Docker

Pingap提供了预构建的Docker镜像，可直接使用。需要注意的是，由于升级操作需要以daemon模式运行，因此在Docker环境中无法使用`--autorestart`参数。不过对于配置的自动更新需求，可以使用`--autoreload`参数来实现。

```bash
docker run -it -d --restart=always \
  -v $PWD/pingap:/opt/pingap \
  -p 80:80 \
  -p 443:443 \
  -e PINGAP_CONF=/opt/pingap/conf \
  -e PINGAP_ADMIN_ADDR=0.0.0.0:80/pingap \
  -e PINGAP_ADMIN_USER=pingap \
  -e PINGAP_ADMIN_PASSWORD=123123 \
  -e PINGAP_AUTORELOAD=true \
  vicanso/pingap
```

端口说明：
- `80`和`443`端口用于服务监听
- 管理后台通过`/pingap/`路径访问
- `autoreload`参数用于支持`upstream`、`location`和`certificate`等配置的热更新，使用该特性可以在不重启应用的情况下更新这些配置
