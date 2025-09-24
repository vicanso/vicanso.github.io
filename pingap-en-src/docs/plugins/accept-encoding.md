---
sidebar_position: 82
title: Accept Encoding Plugin
description: Optimizes compression negotiation with upstream services. By filtering and reordering the Accept-Encoding request header, it ensures that the backend service only receives compression algorithms it supports and allows specifying algorithm priority as needed.
---

# Accept Encoding Plugin

The `accept-encoding` plugin is a request transformation plugin that allows you to intercept and modify the Accept-Encoding request header sent by the client before forwarding the request to an upstream service.

# Feature Introduction

The HTTP client uses the Accept-Encoding request header to inform the server about the compression algorithms it supports (e.g., gzip, br, zstd). However, your backend service might only support a subset of these, or you might want to prioritize a more efficient algorithm.

The core function of this plugin is to act as a filter and sorter:

1. Filter: Removes compression algorithms that the backend service does not support.
2. Sort: Reorders the algorithms based on the priority you define.
3. Limit: Optionally, you can choose to pass only one (the highest-priority) compression algorithm to the upstream service.

# Use Cases

Optimize Compression Algorithms: Your backend supports both gzip and br, but br has a higher compression ratio. You can configure encodings = "br, gzip" to ensure that when a client supports both, br is prioritized in the negotiation with the backend. This is useful for caching based on the Accept-Encoding header plus the URL.

CDN and Origin Server Coordination: When your CDN can handle multiple compression formats, but you want the origin server to process only gzip to reduce its load, this plugin can ensure that requests sent to the origin only contain gzip.


# Configuration Parameters

Configuration is done in the `plugins.accept-encoding.toml` file.

| Parameter           | Type    | Required | Default | Description                                                                                                                                                          |
| :------------------ | :------ | :------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `encodings`         | String  | Yes      | -       | An ordered, comma-separated list of compression algorithms. The order of the list represents the priority, with the algorithm at the beginning being selected first. |
| `only_one_encoding` | Boolean | No       | false   | Whether to send only one encoding (the one with the highest priority that the client supports) to the upstream service.                                              |

