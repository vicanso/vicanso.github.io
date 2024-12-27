---
sidebar_position: 75
---

# Docker


Pingap提供了已构建好的docker镜像，可以直接运行，需要注意由于upgrade操作需要使用daemon的模式才可以使用，因此若使用docker运行则无法使用`--autorestart`，建议使用`--autoreload`可满足常用配置的自动刷新。

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

`80`与`443`端口则是后续监听服务时使用，管理后台通过`/pingap/`前缀访问，`autoreload`是用于`upstream`、`location`以及`certifcate`等的热更新使用，此类配置不需要重启应用程序。

