---
sidebar_position: 69
---

# Easily Manage HTTPS Certificates

Pingap makes the cumbersome process of configuring HTTPS certificates simpler than ever. Whether you're automatically applying for free Let's Encrypt certificates or uploading your own commercial ones, it can all be done effortlessly in a unified interface.

Core features include:

-   **Multiple Verification Methods**: Supports automatic application for Let's Encrypt certificates through both HTTP-01 (public port) and DNS-01 (DNS record) verification.
-   **Fully Automatic Renewal**: The system will automatically complete the renewal process before the certificate expires, based on the buffer period you set.
-   **Status Monitoring and Alerts**: Built-in monitoring of certificate validity with expiration alerts sent via Webhook.

## Method 1: Automatic Application with Let's Encrypt

Pingap will automatically handle the application, verification, and renewal of certificates through the ACME protocol. You can choose one of the following two verification methods based on your network environment.

#### Verification Method 1: HTTP-01 Challenge (Default)

This is the simplest method, but it requires your server to be directly accessible from the public internet.

**Applicable Scenarios**: The server has a public IP address, the firewall allows external access to port 80, and it's a single-node deployment.

**Steps**:

-   On the `Certificate Management` page, click `Add Certificate`.
-   Enter your domain name(s) and ensure the domain(s) correctly resolve to the server's public IP address.
-   In the `ACME Service` dropdown, select `lets_encrypt`.
-   Keep the `Enable DNS Challenge` checkbox unchecked.
-   Click `Save`.

#### Verification Method 2: DNS-01 Challenge (More Flexible)

This method verifies domain ownership by modifying DNS records, without needing to expose any server ports.

**Applicable Scenarios**:

-   The server does not have a public IP, or port 80 is occupied/blocked.
-   You need to apply for a wildcard certificate (Note: the `domains` field itself still needs to be explicitly listed).

**Steps**:

-   On the `Certificate Management` page, click `Add Certificate`.
-   Enter your domain name(s).
-   In the `ACME Service` dropdown, select `lets_encrypt`.
-   Check the `Enable DNS Challenge` checkbox.
-   In the `DNS Provider` field, select your DNS provider (e.g., cloudflare, aliyun). Currently, only 4 cloud services are supported; if yours is not supported, you must choose manual configuration.
-   Click `Save`.

## Method 2: Manually Upload an Existing Certificate

If you have already purchased a certificate from another Certificate Authority (CA) or are using an internally signed certificate, you can upload it by following these steps.

-   On the `Add Certificate` page, enter your domain name(s) in the `Domains` field.
-   Open your certificate's public key file (usually `your_domain.pem` or `fullchain.pem`) with a text editor, copy its entire content, and paste it into the `Certificate Public Key (tls_cert)` field.
-   Similarly, open your certificate's private key file (usually `your_domain.key`), copy its entire content, and paste it into the `Certificate Private Key (tls_key)` field.
-   Click `Save`.

## Parameter Details

| Parameter         | Required                      | Description                                                                                                                                              |
| :---------------- | :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domains`         | Yes                           | A comma-separated list of domains associated with the certificate.                                                                                       |
| `is_default`      | No                            | Whether to set this as the default certificate. When a client's requested domain (via SNI) does not match any certificate, this one will be used.        |
| `is_ca`           | No                            | Marks this certificate as a CA root certificate, used for scenarios like transparent proxies. Regular users should not check this.                       |
| `tls_cert`        | Yes                           | The certificate's public key in PEM format. When applying via ACME, this field is auto-filled by the system. It must be filled manually when uploading.  |
| `tls_key`         | Yes                           | The certificate's private key in PEM format. When applying via ACME, this field is auto-filled by the system. It must be filled manually when uploading. |
| `acme`            | Yes for automatic application | The ACME certificate application service. Currently, only `lets_encrypt` is supported.                                                                   |
| `dns_challenge`   | No                            | Whether to enable DNS-01 for domain verification. Requires API support from the DNS provider.                                                            |
| `dns_provider`    | No                            | The name of the DNS provider, such as `cloudflare`, `aliyun`, etc.                                                                                       |
| `dns_service_url` | No                            | Some DNS providers may require a specific API address.                                                                                                   |
| `buffer_days`     | No                            | The buffer period in days for certificate renewal. The system will trigger an automatic renewal when `validity < buffer_days`.                           |

Currently, only the following DNS service providers are supported. The configuration format for their API addresses is as follows:

-   `aliyun`: `https://alidns.aliyuncs.com?access_key_id=xxx&access_key_secret=xxx`
-   `cloudflare`: `https://api.cloudflare.com?token=xxx`
-   `huawei`: `https://dns.{region}.myhuaweicloud.com?access_key_id=xxx&access_key_secret=xxx`
-   `tencent`: `https://dnspod.tencentcloudapi.com?access_key_id=xxx&access_key_secret=xxx`

Since the API requires authentication, you can also specify to retrieve credentials from an environment variable. For example, `dns_service_url = "$ENV:PINGAP_DNS_SERVICE_URL"` indicates that the API address is retrieved from the `PINGAP_DNS_SERVICE_URL` environment variable.