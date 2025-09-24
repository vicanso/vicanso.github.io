---
sidebar_position: 151
---

# Frequently Asked Questions (FAQ)

This section gathers some of the most common questions and their solutions that users encounter while using `Pingap`.

#### Q: I have multiple services using the same port. Why is the routing incorrect when I access them via domain names?

**A**: This is because when multiple services share the same IP and port, `Pingap` needs to rely on the `Host` field in the request header to differentiate and forward requests to the correct backend. By default, `Pingap` passes the client's original `Host` header directly to the backend.

**Solution**: If your upstream service also needs to process requests based on the `Host` header, you must explicitly set the `Host` to the domain name your backend service expects in the **Set Forwarded Request Headers (`proxy_set_headers`)** option within the **Location configuration**.

#### Q: I updated the `DNS` record for my domain. Why isn't `Pingap` forwarding to the new `IP` address?

**A**: When handling `Upstream` addresses configured as domain names, `Pingap`'s default service discovery mechanism only performs a `DNS` resolution once at startup. If it resolves to multiple `IPs`, they will all be added as nodes, but any subsequent changes to the `DNS` record will not be automatically detected.

**Solution**: If your upstream service's `IP` address changes dynamically (e.g., in a cloud environment or Kubernetes), you should configure `DNS` service discovery for that `Upstream`. To do this, add `discovery = "dns"` and set a reasonable `update_frequency` (e.g., `30s`) in the `Upstream` configuration.

#### Q: How do I configure the number of threads for `Pingap`? How does it work?

**A**: The number of worker threads in `Pingap` can be finely controlled, with the following configuration priority:

1.  **Server-level configuration**: The `threads` value set for a specific service in `server.toml` has the highest priority.
2.  **Global basic configuration**: The `threads` value set in `basic.toml` serves as the default for all `Server`s that do not have their own thread count configured.
3.  **Program default**: If neither of the above is configured, it defaults to `1` thread.

Additionally, setting `threads` to `0` is a special mode that tells `Pingap` to automatically set the number of threads equal to the number of `CPU` cores in the current environment.

#### Q: What should I be aware of when my backend service (Upstream) uses the HTTPS protocol?

**A**: When you configure an `Upstream` that uses HTTPS, please ensure you complete the following two key configurations:

1.  **Set SNI**: You must correctly fill in the `sni` field in the `Upstream` configuration. Its value is typically the domain name of your backend service. This is crucial for a successful TLS handshake.
2.  **Port**: If your backend service uses the standard `443` port, you can omit the port number; otherwise, be sure to specify the port explicitly in `addrs`.
3.  If you are using a self-signed certificate, set the certificate verification option to `No`.

#### Q: How can I serve multiple different domains over HTTPS on the same port?

**A**: `Pingap` supports multi-domain `HTTPS` services based on `SNI`, and the configuration is very simple:

1.  **Add all certificates**: In the **Certificate Management** interface, upload or apply for the corresponding `HTTPS` certificates for all the domains you need to support.
2.  **Enable global certificates**: In the `server.toml` configuration file, find the `Server` that provides `HTTPS` services and make sure the **Enable Global Certificate Configuration (`global_certificates`)** option is checked.

After completing these two steps, `Pingap` will automatically select and provide the correct certificate based on the domain name requested by the client during the `TLS` connection.

#### Q: My service is deployed on multiple IPs. How do I prevent all instances from trying to apply for a `Let's Encrypt` certificate?

**A**: This is a very typical multi-node deployment scenario. When a domain name resolves to multiple IP addresses (corresponding to multiple `Pingap` instances), you must ensure that only one instance is responsible for the `ACME` certificate application and renewal. If all instances try to apply, you will quickly hit `Let's Encrypt`'s rate limits, and it may lead to application failure due to validation conflicts.

**Solution**: On all `Pingap` instances except for the primary one, disable the `ACME` feature by setting an environment variable.

```bash
PINGAP_DISABLE_ACME=true
```

This way, only the primary instance will handle certificate matters, while the other instances will wait for and share the certificate obtained by the primary instance (usually achieved through shared storage or a configuration center). It is recommended that only one instance be responsible for applying for certificates, regardless of whether you are using the `http-01 challenge` or the `dns-01 challenge`.

