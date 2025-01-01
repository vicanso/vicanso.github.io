---
sidebar_position: 75
---

# Docker

Pingap provides pre-built Docker images that are ready to use. Note that since upgrade operations need to run in daemon mode, the `--autorestart` parameter cannot be used in Docker environments. However, for automatic configuration updates, you can use the `--autoreload` parameter.

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

Port description:
- Ports `80` and `443` are used for service listening
- The admin dashboard is accessed through the `/pingap/` path
- The `autoreload` parameter supports hot updates for configurations such as `upstream`, `location`, and `certificate`. Using this feature allows you to update these configurations without restarting the application
