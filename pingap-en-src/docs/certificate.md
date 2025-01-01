---
sidebar_position: 69
---

# HTTPS Certificate Management

Pingap provides unified HTTPS certificate management features, including:
- One-click Let's Encrypt certificate application
- Automatic certificate renewal
- Certificate expiration monitoring and alerts

## Configuration Parameter Description

| Parameter    | Description                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `domains`    | List of certificate domains, multiple domains separated by commas. Supports wildcard domains (e.g. `*.example.com`)                   |
| `tls_cert`   | Certificate public key data (PEM format). Automatically updated when using ACME                                                       |
| `tls_key`    | Certificate private key data (PEM format). Automatically updated when using ACME                                                      |
| `tls_chain`  | Certificate chain data (PEM format), used to optimize certificate verification. Not required for Let's Encrypt certificates, built-in |
| `is_default` | Set as default certificate. The default certificate will be used when no specific certificate matches                                 |
| `is_ca`      | Whether it is a CA certificate. Used for generating self-signed certificates in transparent proxy scenarios                           |
| `acme`       | ACME certificate application service configuration, currently only supports `lets_encrypt`                                            |
