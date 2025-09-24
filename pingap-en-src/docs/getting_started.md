---
sidebar_position: 11
---

# Getting Started Tutorial

Welcome to Pingap! This tutorial will guide you from scratch, step by step, to build, configure, and run a fully-featured, high-performance reverse proxy service. We will start with the simplest launch, complete all core configurations through the Web admin interface, and finally run it stably in daemon mode.

## Prerequisites

Before we begin, please ensure you have downloaded and installed the `pingap` binary executable.

This tutorial will use the filesystem to store all configuration information, which is the most straightforward method for most scenarios. We will store all configuration files in the `/opt/pingap/conf` directory.

```bash
# Create the configuration directory
mkdir -p /opt/pingap/conf
```

### Step 1: First Start and the Web Admin Interface

For beginners, the quickest way to get started is to launch Pingap with its built-in Web admin interface enabled. This allows us to complete all configurations in a graphical interface.

Execute the following command to start `pingap` for the first time:

```bash
# -c specifies the configuration directory
# --admin enables the Web admin interface, format: <user>:<password>@<listen_addr>
RUST_LOG=INFO pingap -c /opt/pingap/conf --admin=pingap:YourSecurePassword@127.0.0.1:3018
```

**Command Breakdown**:

-   `RUST_LOG=INFO`: Sets the log level to `INFO` to easily observe the program's running status. If you need more detailed logs, you can set it to `DEBUG`.
-   `-c /opt/pingap/conf`: Specifies the storage directory for configuration files. `pingap` will automatically read and write `*.toml` configuration files in this directory.
-   `--admin=pingap:YourSecurePassword@127.0.0.1:3018`: Enables the admin interface.
    -   `Username`: pingap
    -   `Password`: YourSecurePassword (Please be sure to replace this with your own strong password!)
    -   `Listen Address`: `127.0.0.1:3018`, which means it only listens on port 3018 locally. For a server, you can set this to `0.0.0.0:3018` or the server's IP.

🔒 **Security Tip**
To prevent brute-force attacks, the admin interface has a built-in login protection mechanism: if the same IP enters the wrong password multiple times, it will be temporarily locked for 5 minutes.

Now, open your browser and navigate to `http://127.0.0.1:3018`. You will see the login page. Enter the username and password you just set to access the admin interface.

### Step 2: Understanding the Core Configuration Flow

In `pingap`, a complete proxy service is composed of three core concepts with a dependency relationship:

1.  **Upstream**: Defines the addresses and properties of the real backend services (e.g., health checks, timeouts).
2.  **Location**: Defines the matching rules for requests (e.g., domain, path) and which **Upstream** to forward them to.
3.  **Server**: Defines the port and protocol that Pingap listens on and binds a set of **Location** rules to it.

Therefore, our configuration sequence should be: first create an Upstream → then create a Location → and finally create a Server.

### Step 3: Completing the Proxy Configuration via the Web UI

Next, we will use the Web interface to complete a classic configuration that proxies requests from `http://<your-domain>/app/` to the backend service `http://127.0.0.1:8080/`.

#### 1. Add an Upstream

The Upstream is the foundation of all configurations.

-   Click on "Upstream Configuration" in the left-hand menu. It defaults to adding a new one; to modify, select the corresponding `Upstream`.
-   **Name**: Enter a meaningful name, for example, `my-app-service`.
-   **Addresses**: Enter the actual address of the backend service, for example, `127.0.0.1:8080`. The weight is generally not needed. If there are multiple nodes, configure them one by one. If the upstream is an HTTPS node, SNI needs to be configured.

💡 **Best Practice**: It is strongly recommended that you expand the "Advanced Configuration" panel to configure settings.

-   **Timeout Settings**: Set reasonable connection, read, and write timeouts based on your application's characteristics to prevent the proxy from being dragged down by unresponsive backend services.
-   **Health Check**: Set a health check endpoint (e.g., `http://host/ping`). `pingap` will automatically remove unhealthy backend nodes to improve service availability. The `host` part will be automatically replaced with the `ip:port` form during the check. If not set, it defaults to a TCP port check.

#### 2. Add a Location

The Location is responsible for forwarding requests that meet certain conditions to a specified upstream.

-   Click on "Location Configuration" in the left-hand menu. It defaults to adding a new one; to modify, select the corresponding `Location`.
-   **Name**: Enter a meaningful name, for example, `route-for-my-app`.
-   **Upstream**: Select the `my-app-service` we just created from the dropdown.
-   **Host**: Enter the domain name you want to serve externally, for example, `app.example.com`. This can be left blank if matching by `Path` is sufficient.
-   **Path**: Enter the path matching rule, for example, `/app`.

💡 **Best Practice**: Enable reverse proxy headers
If `Pingap` is the entry node, it is recommended to check `Enable Reverse Proxy Headers`. This will automatically add standard proxy headers like `X-Forwarded-For` and `X-Forwarded-Proto`, making it convenient for the backend application to get real client information.

❗ **Note**: If your Upstream service is also a reverse proxy (like Nginx) and it relies on the `Host` for routing, be sure to set the `Host` to the value expected by the upstream service in "Set Forwarded Request Headers".

#### 3. Configure a Server

The Server is the entry point of the proxy. It listens on a specified port and passes requests to the Locations for processing.

-   Click on "Server Configuration" in the left-hand menu. It defaults to adding a new one; to modify, select the corresponding `Server`.
-   **Name**: Enter a meaningful name, for example, `main-http-server`.
-   **Listen Address**: Enter the address and port for Pingap to serve externally, for example, `0.0.0.0:6188` (listens on port 6188 of all network interfaces).
-   **Locations**: Check the `route-for-my-app` we just created in the dropdown. If you select multiple locations, they will be matched based on each location's weight.

💡 **Best Practice**: Configure access logs. To facilitate troubleshooting, it is recommended to configure access logs. Choose a preset template (like `common` or `combined`) in "Access Log Format" or customize the format as needed.

At this point, all basic configurations are complete! These settings have been automatically saved to `.toml` files in the `/opt/pingap/conf` directory.


### Step 4: Running in the Background and Auto-Updating

Now, we want `pingap` to run in the background like a real service and automatically apply new configurations when they change.

First, press `Ctrl+C` to stop the currently running foreground `pingap` process.

Then, start it with this more complete command:

```bash
RUST_LOG=INFO pingap -c /opt/pingap/conf \
  -d \
  --log=/opt/pingap/pingap.log \
  --autoreload \
  --admin=pingap:YourSecurePassword@127.0.0.1:3018
```

**New Argument Breakdown**:

-   `-d`: Daemonize, runs the program as a background daemon process.
-   `--log=/opt/pingap/pingap.log`: Outputs logs to the specified file instead of the terminal.
-   `--autoreload`: Hot-reload mode (recommended for production). `pingap` will periodically (about every 10 seconds) check for changes in the configuration files. When configurations for `Upstream`, `Location`, `Plugin`, and `Certificate` change, it will apply the new settings without restarting and without interrupting service.

#### When to use `--autorestart`?

`--autorestart` is a restart-based update mode. It is used for changing more fundamental configurations, such as a Server's listening port. This mode automatically uses the `upgrade` method to transfer requests from the old instance to the new one, but if you change the listening port, the old port might not be closed. It is recommended only for testing environments or when frequent changes to basic configurations are needed. In production, for changes to basic configurations (which are typically infrequent), it is recommended to perform a graceful restart (`upgrade`) manually.

### Step 5: Verifying the Configuration

Now that `pingap` is running stably in the background, let's verify that our configuration is working.

#### 1. Accessing the Service:

Open a browser or use `curl` to visit `http://<pingap-server-ip>:6188/app/some/path`. If everything is correct, the request should be successfully forwarded to the backend at `http://127.0.0.1:8080/app/some/path`.

#### 2. Testing Hot-Reloading:

Log in to the Web admin interface at `http://127.0.0.1:3018`.

Go to the "Location" management page, change the path of `route-for-my-app` from `/app` to `/pingap-app`, and save.

Wait a moment (about 10 seconds) and watch the log file `tail -f /opt/pingap/pingap.log-YYYY-MM-DD`. You should see a log entry similar to `reload location success`.

At this point, visiting `http://<pingap-server-ip>:6188/app/` will fail, while visiting `http://<pingap-server-ip>:6188/pingap-app/` will succeed.

This proves that Pingap's dynamic hot-reloading capability is working, and you can adjust routing and upstream policies at any time without interrupting the service.
