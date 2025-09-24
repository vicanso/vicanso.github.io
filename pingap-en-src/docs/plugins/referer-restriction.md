---
sidebar_position: 96
title: Referer Restriction
description: Implement access control based on the request's origin by checking the HTTP Referer header. Effectively prevent hotlinking of resources like images and videos, and restrict API calls to trusted websites.
---

# Referer Restriction Plugin

The `referer-restriction` plugin is a request-phase security plugin that inspects the HTTP `Referer` request header to identify the origin page of a request, and then **allows** or **denies** the request based on a list of rules you configure.

## Feature Introduction

When a browser requests a resource (e.g., an image) from your service from a page (e.g., `https://example.com/page`), it typically includes a `Referer` header with the value `https://example.com/page`. This plugin leverages this mechanism to implement access control.

It supports two core working modes:
1.  **Whitelist (Allow)**: Only allows requests whose `Referer` is in your specified list to pass through.
2.  **Blacklist (Deny)**: Denies requests whose `Referer` is in your specified list.

The matching rules support both **exact domains** (e.g., `example.com`) and **wildcard domains** (e.g., `*.example.com`), providing flexible configuration options.

## Use Cases

* **Preventing Resource Hotlinking**: This is the most classic use case. You can configure a **whitelist** to only allow `Referer`s from your own website to load static assets like images, videos, and fonts. This prevents other websites from directly using your resources and consuming your server's bandwidth.
* **Enhancing API Security**: Configure a **whitelist** for your Web API to only allow calls from the domain where your official frontend application is hosted. This adds an extra layer of security by blocking direct API calls from other unknown websites.
* **Blocking Malicious or Spam Sources**: If you find that spam websites or malicious crawlers are accessing your service by forging `Referer`s, you can add their domains to a **blacklist**.

## Configuration Parameters

Configuration is done in the `plugin.referer-restriction.toml` file.

| Parameter      | Type             | Required | Default                  | Description                                                                                                                                                                             |
| :------------- | :--------------- | :------- | :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`         | String           | **Yes**  | -                        | **(Required)** The type of restriction. Possible values are `"deny"` (blacklist mode) or `"allow"` (whitelist mode).                                                                    |
| `referer_list` | Array of Strings | **Yes**  | `[]`                     | **(Required)** A list used to match against the domain in the `Referer` header. Two formats are supported:<br/>• **Exact match**: `"site.com"`<br/>• **Wildcard match**: `"*.site.com"` |
| `message`      | String           | No       | `"Request is forbidden"` | A custom message to return to the client when a request is denied.                                                                                                                      |

---

## Complete Examples

### Example 1: Preventing Image Hotlinking (Whitelist Mode)

**Goal**: Our website domain is `my-gallery.com`, and we only want images in the `/images/` directory to be referenced by our own website (including all subdomains).

1.  **Configure the plugin (`plugin.referer-allow-images.toml`)**:
    ```toml
    # Set to whitelist mode
    type = "allow"
    
    # Only allow requests from my-gallery.com and all its subdomains
    referer_list = [
      "my-gallery.com",
      "*.my-gallery.com",
    ]
    ```

2.  **Apply the plugin in a Location (`location.toml`)**:
    ```toml
    # location.toml
    [locations.image-assets]
    # Only apply to the images directory
    path = "/images/"
    # This Location is handled by a static file plugin or an upstream service
    upstream = "static-assets-backend" 
    plugins = [
        "referer-allow-images",
    ]
    ```

### Access Effects
* When the page `https://my-gallery.com/index.html` loads the image `/images/cat.jpg`, the request's `Referer` is `https://my-gallery.com/index.html`, which matches the whitelist. **Access is granted**.
* When the page `https://evil-site.com/steal.html` tries to reference `/images/cat.jpg` using an `<img>` tag, the request's `Referer` is `https://evil-site.com/steal.html`, which does not match the whitelist. The request will be intercepted and a **`403 Forbidden`** will be returned.

### Example 2: Blocking Known Spam Sources (Blacklist Mode)

**Goal**: Block all access from `spam-domain.com` and `bad-site.org`.

1.  **Configure the plugin (`plugin.referer-deny-spam.toml`)**:
    ```toml
    # Set to blacklist mode
    type = "deny"
    
    # List the domains to block
    referer_list = [
      "spam-domain.com",
      "bad-site.org",
    ]
    ```

2.  **Apply the plugin in a Location (`location.toml`)**:
    ```toml
    # location.toml
    [locations.main-site]
    path = "/"
    upstream = "main-server"
    plugins = [
        "referer-deny-spam",
        # ... other plugins
    ]
    ```

### Access Effects
* Any request with a `Referer` header pointing to `spam-domain.com` or `bad-site.org` will be intercepted and will receive a **`403 Forbidden`**.
* Requests from other sources (like a Google search results page) will pass through normally.

## Precautions

* ❗ **Security Warning**: The `Referer` header is sent by the client (browser) and therefore **can be forged**. Please do not use Referer restriction as your **only** security mechanism to protect critical or sensitive operations. It is better suited as a supplementary line of defense to increase the difficulty for attackers.
* **Empty Referer**: The `Referer` header may be empty when a user types a URL directly into the browser's address bar, or when navigating from an HTTPS page to an HTTP page. In this plugin:
    * **Whitelist mode (`allow`)**: Requests with an empty `Referer` **will be denied** because they do not match any allowed domains.
    * **Blacklist mode (`deny`)**: Requests with an empty `Referer` **will be allowed** because they do not match any forbidden domains.