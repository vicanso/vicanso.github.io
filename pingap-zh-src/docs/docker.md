---
sidebar_position: 75
---

# Docker


Pingap提供了已构建好的docker镜像，可以直接运行，需要注意由于upgrade操作需要使用daemon的模式才可以使用，因此若使用docker运行则无法使用配置变更时自动重启。

```bash
docker run -it -d --restart=always \
  -v $PWD/pingap:/opt/pingap \
  -p 3018:3018 \
  -p 80:80 \
  -p 443:443 \
  vicanso/pingap -c /opt/pingap/conf \
  --autoreload \
  --admin=cGluZ2FwOjEyMzEyMw==@0.0.0.0:3018
```

其中`cGluZ2FwOjEyMzEyMw==`是base64("pingap:123123")对应的值，用于启用WEB管理后台时的鉴权使用。`80`与`443`端口则是后续监听服务时使用，`autoreload`是用于`upstream`与`location`的热更新使用，此两类配置不需要重启应用程序。
