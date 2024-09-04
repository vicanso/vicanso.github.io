---
sidebar_position: 69
---

# https证书管理

Pingap统一管理https证书，提供简化的let's encrypt证书申请，自动续签证书以及定期检测证书有效期发送告警等功能。

## 配置参数说明

- `domains`: 证书对应的域名列表，如果多个域名使用`,`分隔，如果是通配域名，则使用为`*.xx.com`的形式
- `tls_cert`: 证书的cert数据，格式为pem，如果使用`acme`方式申请，则不需要设置
- `tls_key`: 证书的key数据，格式为pem，如果使用`acme`方式申请，则不需要设置
- `tls_chain`: 证书链数据，格式为pem，可以减少证书的校验步骤
- `certificate_file`: 证书文件保存路径，使用`acme`方式时使用
- `is_default`: 是否默认证书，在无法匹配到对应证书时使用
- `acme`: acme申请证书的服务，暂时只支持`lets_encrypt`
