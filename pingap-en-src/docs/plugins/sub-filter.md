---
sidebar_position: 99
title: Content Substitution (Sub Filter)
description: Perform real-time find-and-replace on response body content. Supports simple string substitution and powerful regular expression replacement for dynamically modifying HTML, JSON, or other text content.
---

# Content Substitution (Sub Filter) Plugin

The `sub-filter` plugin is a powerful response body processing plugin that allows you to **perform real-time find-and-replace operations on response body content** before it is sent to the client.

## Feature Introduction

This plugin intervenes at the response phase, streaming the response body from the upstream service and modifying its content based on a series of filter rules you define. It supports two core substitution modes:

1.  **String Substitution (`sub_filter`)**:
    * Performs a simple, case-sensitive text find-and-replace.

2.  **Regular Expression Substitution (`subs_filter`)**:
    * Uses regular expressions for more complex, pattern-based find-and-replace operations.

For both modes, you can use flags to control the substitution behavior, such as performing a **global replacement** or **ignoring case**.

## Use Cases

* **Dynamically Modifying HTML Content**:
    * **Protocol Substitution**: Replace all hardcoded `http://` links in HTML with `https://` to fix mixed content security warnings.
    * **Script Injection**: Automatically inject web analytics scripts (like Google Analytics) or custom JavaScript/CSS before the `</body>` tag.
    * **Environment Adaptation**: Dynamically replace API endpoints in the backend's response that point to a staging environment (`staging.api.com`) with the production environment's address (`api.com`).

* **Adjusting API Responses**:
    * **Field Renaming**: Rename an old JSON field in an API response to a new name to maintain compatibility with newer clients, without modifying backend code.
    * **Data Masking**: Replace password or key fields in responses containing sensitive information (like logs or debug info) with `***` before sending them to a pre-production environment.

## Configuration Parameters

Configuration is done in the `plugin.sub-filter.toml` file.

| Parameter | Type             | Required | Description                                                                                                                                                |
| :-------- | :--------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `path`    | String           | **No**  | **(Optional)** A regular expression to match the request's URL **path**. Only responses to requests with a matching path will be processed by this plugin. If not set, it matches all paths. |
| `filters` | Array of Strings | **Yes**  | **(Required)** A list containing one or more **filter rules**. The rules are executed sequentially in the order they appear in the list.                   |
| `status_codes` | Array of Numbers | **No**   | **(Optional)** A list of HTTP status codes to filter the responses. Only responses with matching status codes will be processed by this plugin. |

### Filter Rule (`filters`) Syntax

Each filter rule is a string that follows a specific format: `<type> '<pattern>' '<replacement>' [flags]`

* **`<type>`**: The rule type, which must be `sub_filter` or `subs_filter`.
* **`'<pattern>'`**: The content to find. For `sub_filter`, it's a plain string; for `subs_filter`, it's a regular expression. **Must be enclosed in single quotes**.
* **`'<replacement>'`**: The new content to replace with. **Must be enclosed in single quotes**.
* **`[flags]`** (Optional): One or more flags to modify the matching behavior:
    * `g`: **Global** replacement. Replaces all matches, not just the first one.
    * `i`: **Ignore Case** matching. Only effective for `subs_filter`.


## Complete Example

**Goal**: We have a legacy backend service that hardcodes some `http://` links and a path to an old CSS file in the HTML pages it returns. We want to use Pingap to fix these issues without modifying the backend code.

1.  **Configure the plugin (`plugin.sub-filter-legacy-fix.toml`)**:
    ```toml
    # Only apply to pages that return HTML (assuming they are all under the /legacy/ path)
    path = "^/legacy/"

    # Define a set of filter rules
    filters = [
      # Rule 1: Globally and case-insensitively replace all http:// with https://
      "subs_filter 'http://' 'https://' gi",
      
      # Rule 2: Replace the old CSS file path with a new CDN path
      "sub_filter '/static/css/old-style.css' '[https://cdn.example.com/assets/new-style.css](https://cdn.example.com/assets/new-style.css)' g"
    ]
    ```

2.  **Apply the plugin in a Location (`location.toml`)**:
    ```toml
    # location.toml
    [locations.legacy-route]
    path = "/legacy/"
    upstream = "legacy-backend"
    plugins = [
        "sub-filter-legacy-fix",
    ]
    ```

### Access Effects

Let's assume the backend service (`legacy-backend`) returns the following original HTML content for a request to `/legacy/index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/static/css/old-style.css">
</head>
<body>
  <p>Welcome! Visit our main site at <a href="[http://my-company.com](http://my-company.com)">My Company</a>.</p>
  <img src="HTTP://[my-company.com/logo.png](https://my-company.com/logo.png)">
</body>
</html>
```

After being processed by the sub-filter-legacy-fix plugin, the final HTML received by the client will be:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="[https://cdn.example.com/assets/new-style.css](https://cdn.example.com/assets/new-style.css)">
</head>
<body>
  <p>Welcome! Visit our main site at <a href="[https://my-company.com](https://my-company.com)">My Company</a>.</p>
  <img src="[https://my-company.com/logo.png](https://my-company.com/logo.png)">
</body>
</html>
```


### Analysis of Sub Filter Processing:

- Both `http://` and `HTTP://` were successfully replaced with `https://` (due to subs_filter and the i flag).
- `/static/css/old-style.css` was successfully replaced with the CDN address (due to sub_filter).

### Precautions

- Performance: Regular expression substitution (subs_filter) consumes more CPU resources than simple string substitution (sub_filter). Prioritize using sub_filter and only use regular expressions when necessary.
- Content Modification: This plugin modifies the response body. Therefore, it will automatically remove the Content-Length response header and use Transfer-Encoding: chunked to send the response.