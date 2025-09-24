---
sidebar_position: 88
title: Static File Service (Directory)
description: Use Pingap as a high-performance static file server to host websites, documentation, or frontend Single Page Applications (SPAs). Supports features like directory listing, cache control, and forced downloads.
---

# Static File Service (Directory) Plugin

The `directory` plugin can transform a `Location` in `Pingap` into a powerful static file server, serving files directly from the disk without forwarding requests to an upstream backend.

## Feature Introduction

This plugin intercepts matching requests and maps them to a specified directory on the server. It includes all the core functionalities required for a production-grade static file server:

* **File and Directory Serving**: Directly serves file content, or automatically looks for an index file (like `index.html`) when a directory is requested.
* **Directory Listing (Auto Index)**: If no index file is found, it can automatically generate an Apache-style file listing page, making it easy to browse directory contents.
* **MIME Type Recognition**: Automatically sets the correct `Content-Type` response header based on the file extension.
* **Cache Control**: Supports `ETag` and `Cache-Control` (max-age) response headers to fully leverage browser caching.
* **Large File Streaming**: For large files, the plugin streams them in chunks, reducing memory usage.
* **Forced Download**: Can be configured to force the browser to download files instead of opening them directly.

## Use Cases

* **Hosting Single Page Applications (SPAs)**: Use this plugin as the web server for your React, Vue, or Angular applications, serving `index.html` and the bundled JS/CSS files.
* **Building Documentation Sites**: Serve statically generated HTML documentation for your projects or products.
* **Providing Downloadable Files**: Create a file repository where users can browse and download software packages, documents, or other resources.
* **Quickly Setting Up a Local Development Server**: During development, quickly start a local web server to preview static pages.

## Configuration Parameters

Configuration is done in the `plugin.directory.toml` file.

| Parameter    | Type             | Required | Default        | Description                                                                                                                                                                                                |
| :----------- | :--------------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `path`       | String           | **Yes**  | -              | **(Required)** Specifies the physical path of the root directory to be served on the server. Supports absolute paths (e.g., `/var/www/html`) or relative paths (relative to the Pingap running directory). |
| `index`      | String           | No       | `"index.html"` | The default filename to look for and serve when the requested URL is a directory.                                                                                                                          |
| `autoindex`  | Boolean          | No       | `false`        | If a directory is requested and the `index` file is not found, whether to automatically generate a browsable file listing page.                                                                            |
| `download`   | Boolean          | No       | `false`        | Whether to add the `Content-Disposition: attachment` header for all files, forcing the browser to open a download dialog.                                                                                  |
| `max_age`    | String           | No       | *(empty)*      | Sets the value for `Cache-Control: max-age`, controlling how long browsers should cache static assets. The format is a time string (e.g., `"10m"`, `"24h"`).                                               |
| `private`    | Boolean          | No       | `false`        | If set, the `private` directive will be added to the `Cache-Control` header, preventing shared caches like CDNs from caching the resource.                                                                 |
| `headers`    | Array of Strings | No       | `[]`           | Adds a set of custom HTTP response headers to all responses.                                                                                                                                               |
| `charset`    | String           | No       | *(empty)*      | Adds a character set to the Mime-Type response header for `text/*` types, for example, `utf-8`.                                                                                                            |
| `chunk_size` | String           | No       | `"4KiB"`       | The size of each data chunk when streaming large files, for example, `"1MB"`.                                                                                                                              |

---

## Complete Example

**Goal**: Host a Single Page Application (SPA) using Pingap and set a long browser cache duration for assets under the `/assets` directory.

1.  **Configure the plugin (`plugin.static-spa.toml`)**:
    ```toml
    # Specify the root directory of the application
    path = "/var/www/my-app"

    # Serve the index.html file when / is accessed
    index = "index.html"
    
    # Set a 1-day browser cache for all static assets
    max_age = "24h"
    
    # Disable directory listing for better security
    autoindex = false
    
    # Add utf-8 charset for files like text/html, text/css, application/javascript
    charset = "utf-8"
    ```

2.  **Apply the plugin in a Location (`location.toml`)**:
    > 💡 **Tip**: Since the static file service plugin usually responds to requests directly, it should be placed in a separate `Location` that does **not** have an `upstream` configured.

    ```toml
    # ...
    [locations.route-for-my-app]
    # Match all requests
    path = "/"
    # Note: no upstream here
    plugins = [
        "static-spa",
    ]
    # ...
    ```

### Access Effects

* When a user visits `http://your-domain.com/`:
    * The plugin will match the root path `/`.
    * Since it's a directory, the plugin will automatically find and serve the file specified by the `index` parameter, which is `/var/www/my-app/index.html`.
    * The response header will include `Content-Type: text/html; charset=utf-8`.

* When the browser requests `http://your-domain.com/assets/app.js`:
    * The plugin will map the URL path to the physical file `/var/www/my-app/assets/app.js`.
    * The response header will include `Content-Type: application/javascript; charset=utf-8` and `Cache-Control: max-age=86400`, telling the browser it can cache this file for 24 hours.

* When a user visits a non-existent path, like `http://your-domain.com/non-existent-page`:
    * The plugin will not find the corresponding file on the disk and will return a standard `404 Not Found` response.