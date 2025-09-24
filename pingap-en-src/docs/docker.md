---
sidebar_position: 141
---

# Deploying Pingap with Docker

We provide an official `Docker` image for `Pingap`, allowing you to complete deployments quickly and consistently in any environment that supports `Docker`.

To simplify operational success, deploying `Pingap` with `Docker` is our recommended method. It offers numerous advantages, including environment isolation, easy migration, and rapid scaling.

### 1. Pull the Image

First, pull the `Pingap` image from `Docker Hub`. `Pingap` offers various image tags to meet the needs of different scenarios, mainly divided into a standard version and a full-featured version (`full`).

The full-featured (`full`) version additionally includes extended features that typically require extra dependencies, such as `OpenTelemetry`, `Sentry`, and an `image compression plugin`.

#### Available Image Tags

| Image Tag                     | Description                                                                                                                                        |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `vicanso/pingap:latest`       | The latest development version. Built from the most recent code on the main branch, it includes the newest features and fixes but may be unstable. |
| `vicanso/pingap:full`         | The full-featured latest development version. Similar to `latest`, but includes all extended features.                                             |
| `vicanso/pingap:version`      | Built by version number, providing stable features. Use this if you don't need features like tracing or image compression.                         |
| `vicanso/pingap:version-full` | The full-featured stable version. Built by version number and includes all extended features. Recommended for use in most scenarios.               |

💡 **Production Environment Recommendation**

To ensure the stability and predictability of your deployment, we strongly recommend using image tags with specific version numbers in a production environment (e.g., `vicanso/pingap:version-full`). Please avoid using `latest` or `full`, as they change with development updates and may introduce incompatible changes.

```bash
# Pull the latest full-featured stable version (recommended)
docker pull vicanso/pingap:0.12.1-full

# Alternatively, if you want to try the latest features, you can pull the development version
docker pull vicanso/pingap:latest
```


### 2. Quick Start (using docker run)

You can quickly start a `Pingap` container using the `docker run` command.

Before executing the command, please create a `pingap` folder in your current directory to persist all of `Pingap's` configurations and data.

```bash
mkdir -p $PWD/pingap
```

Then execute the following command:

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

🔒 Security Tip

Be sure to replace `<YourSecurePassword>` in the command with your own strong password!

Argument Breakdown

- `-d`: Run the container in the background in detached mode.

- `--name pingap-instance`: Assign an easily identifiable name to the container.

- `--restart=always`: Docker will automatically restart the container if it exits, ensuring high service availability.

- `-v $PWD/pingap:/opt/pingap`: Mount the host's ./pingap directory to the container's /opt/pingap directory. This is key to achieving data persistence; all configurations, certificates, and logs will be saved here.

- `-p 80:80` and `-p 443:443`: Map ports 80 and 443 of the host to ports 80 and 443 of the container to provide HTTP/HTTPS services externally.

- `-e PINGAP_*`: Set Pingap's startup parameters via environment variables, which is the best practice for configuring applications in Docker.

- `vicanso/pingap pingap --autoreload`: Specify the image to use and tell the Pingap program inside the container to start in --autoreload mode.


### 3. Core Concept: Configuration Updates in a Docker Environment

In a Docker environment, a container's main process is expected to run continuously in the foreground. Pingap's `--autorestart` argument relies on daemon mode, which creates a new background process and exits the main one. This contradicts Docker's expectation and will cause the container to exit immediately.

Therefore, in a Docker environment:

- Do not use the `--autorestart` argument.
- Please use the `--autoreload` argument: For most routine configuration changes like upstream, location, and certificate, `--autoreload` can apply updates without restarting the container, which is the ideal method.
- For fundamental configuration changes: If you need to modify basic settings that cannot be hot-reloaded, such as a server's listening port, the standard practice is to restart the container:

```bash
# After modifying the configuration files, just run the following command
docker restart pingap-instance
```

### 4. Recommended Method: Using Docker Compose

For long-running services, we strongly recommend using docker-compose to define and manage them. It makes your configuration declarative, easier to maintain, and more reproducible.

Create a `docker-compose.yml` file in your project's root directory:

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
      # Mount the pingap/ folder from the current directory into the container for data persistence
      - ./pingap:/opt/pingap
    environment:
      # Use environment variables for configuration
      - PINGAP_CONF=/opt/pingap/conf
      - PINGAP_ADMIN_ADDR=0.0.0.0:80/pingap
      - PINGAP_ADMIN_USER=pingap
      - PINGAP_ADMIN_PASSWORD=<YourSecurePassword> # Again, please replace with a strong password
    command:
      # Set the container's startup command to enable hot-reloading
      - pingap
      - --autoreload
```

Then, in the same directory as the `docker-compose.yml` file, run the following command to start:

```bash
docker-compose up -d
```

Accessing the Admin Interface

After a successful startup, you can access the Pingap Web admin interface at `http://<your-server-ip>/pingap/` and begin configuring your proxy services.

### 5. Advanced: Integrating with Docker Service Discovery

`Pingap` supports service discovery via `Docker Labels`. When you deploy `Pingap` alongside other services in a `Docker` environment, you can use this feature to achieve automatic registration and updates of upstream nodes, greatly simplifying configuration management in a microservices architecture.


