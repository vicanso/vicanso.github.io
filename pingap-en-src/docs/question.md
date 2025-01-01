---
sidebar_position: 81
---

# Frequently Asked Questions

## Host Header Configuration

When multiple services share the same port and are distinguished by the `Host` header field, you need to explicitly set the forwarded `Host` header in the Location configuration.

## Upstream Address Configuration Notes

Upstream addresses consist of IP and port. If no port is specified, HTTP services default to port `80`, and HTTPS services default to port `443`.

Important note: When using a domain name as an address, the default service discovery mechanism only resolves the domain name to IP(s) during initialization (if multiple IPs are resolved, multiple addresses will be added). Subsequent changes to the domain's IP mapping won't be detected in real-time. If your scenario involves dynamically changing IP addresses, it's recommended to use DNS service discovery.

## Thread Configuration Notes

Pingap's thread configuration is Server-based, with a default value of 1. You can:
- Set thread count individually for each Server
- Set a global default value in the basic configuration (Servers without individual settings will use this value)
- Set it to 0 to automatically use the same number of threads as CPU cores

## HTTPS Upstream Configuration

When using HTTPS protocol for Upstream, you need to:
1. Set the corresponding SNI (Server Name Indication)
2. If upstream node port is not specified, the HTTPS standard port `443` will be used by default

## Multi-domain HTTPS Service Configuration

To provide HTTPS services for multiple domains on the same Server, simply:
1. Add the corresponding certificates in certificate management
2. Configure the service to "Use global certificates of the application"
