"use strict";(self.webpackChunkpingap=self.webpackChunkpingap||[]).push([[5950],{5800:(e,i,s)=>{s.r(i),s.d(i,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>d,metadata:()=>n,toc:()=>t});const n=JSON.parse('{"id":"config","title":"Configuration Guide","description":"Pingap uses TOML for parameter configuration. For time-related configurations, use formats like 1s, 1m, 1h. For storage size configurations, use formats like 1kb, 1mb, 1gb. Detailed parameter descriptions are as follows:","source":"@site/docs/config.md","sourceDirName":".","slug":"/config","permalink":"/pingap-en/docs/config","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/config.md","tags":[],"version":"current","sidebarPosition":31,"frontMatter":{"sidebar_position":31},"sidebar":"tutorialSidebar","previous":{"title":"Command Line Arguments","permalink":"/pingap-en/docs/argument"},"next":{"title":"Log Formatting","permalink":"/pingap-en/docs/log"}}');var r=s(4848),c=s(8453);const d={sidebar_position:31},l="Configuration Guide",o={},t=[{value:"Basic Configuration",id:"basic-configuration",level:2},{value:"Upstream",id:"upstream",level:2},{value:"Health Check Configuration",id:"health-check-configuration",level:3},{value:"Hash Algorithm Options",id:"hash-algorithm-options",level:3},{value:"Location",id:"location",level:2},{value:"Path Matching Rules",id:"path-matching-rules",level:3},{value:"Path Rewrite Rules",id:"path-rewrite-rules",level:3},{value:"Supported Header Variables",id:"supported-header-variables",level:3},{value:"Server",id:"server",level:2}];function a(e){const i={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",ul:"ul",...(0,c.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.header,{children:(0,r.jsx)(i.h1,{id:"configuration-guide",children:"Configuration Guide"})}),"\n",(0,r.jsxs)(i.p,{children:["Pingap uses TOML for parameter configuration. For time-related configurations, use formats like ",(0,r.jsx)(i.code,{children:"1s"}),", ",(0,r.jsx)(i.code,{children:"1m"}),", ",(0,r.jsx)(i.code,{children:"1h"}),". For storage size configurations, use formats like ",(0,r.jsx)(i.code,{children:"1kb"}),", ",(0,r.jsx)(i.code,{children:"1mb"}),", ",(0,r.jsx)(i.code,{children:"1gb"}),". Detailed parameter descriptions are as follows:"]}),"\n",(0,r.jsx)(i.h2,{id:"basic-configuration",children:"Basic Configuration"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"name"}),": Instance name, defaults to ",(0,r.jsx)(i.code,{children:"Pingap"}),". If deploying multiple instances on the same machine, configure different names"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"error_template"}),": Optional parameter for HTML template used when errors occur. You can customize the error HTML template. When an error occurs, ",(0,r.jsx)(i.code,{children:"{{version}}"})," will be replaced with the Pingap version, and ",(0,r.jsx)(i.code,{children:"{{content}}"})," with specific error information"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"pid_file"}),": Optional parameter, defaults to ",(0,r.jsx)(i.code,{children:"/run/pingap.pid"}),". Configures the process ID record file path. For multiple instances on one machine, configure different paths"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"upgrade_sock"}),": Optional parameter, defaults to ",(0,r.jsx)(i.code,{children:"/tmp/pingap_upgrade.sock"}),". Configures the socket path for zero-downtime updates, used when switching between old and new Pingap processes. For multiple instances, configure different paths"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"user"}),": Optional parameter, defaults to empty. Sets the daemon process execution user"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"group"}),": Optional parameter, defaults to empty, similar to ",(0,r.jsx)(i.code,{children:"user"})]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"threads"}),": Optional parameter, defaults to 1. Sets thread count for each service (like server TCP connections). If set to 0, uses CPU core count or cgroup core limit"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"work_stealing"}),": Optional parameter, defaults to ",(0,r.jsx)(i.code,{children:"true"}),". Enables work stealing between different threads within the same service"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"grace_period"}),": Sets graceful exit waiting period, defaults to 5 minutes"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"graceful_shutdown_timeout"}),": Sets graceful shutdown timeout, defaults to 5 seconds"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"upstream_keepalive_pool_size"}),": Sets upstream connection pool size, defaults to ",(0,r.jsx)(i.code,{children:"128"})]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"webhook"}),": Webhook request path"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"webhook_type"}),": Webhook type, supports regular HTTP, ",(0,r.jsx)(i.code,{children:"webcom"}),", and ",(0,r.jsx)(i.code,{children:"dingtalk"})]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"webhook_notifications"}),": Webhook notification types, including ",(0,r.jsx)(i.code,{children:"backend_status"}),", ",(0,r.jsx)(i.code,{children:"lets_encrypt"}),", ",(0,r.jsx)(i.code,{children:"diff_config"}),", ",(0,r.jsx)(i.code,{children:"restart"}),", ",(0,r.jsx)(i.code,{children:"restart_fail"}),", and ",(0,r.jsx)(i.code,{children:"tls_validity"})]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"log_level"}),": Application log output level, defaults to ",(0,r.jsx)(i.code,{children:"INFO"})]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"log_buffered_size"}),": Log buffer size, defaults to 0. If set below 4096, no buffer is used"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"log_format_json"}),": Sets JSON formatted logging"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"sentry"}),": Sentry DSN configuration, requires ",(0,r.jsx)(i.code,{children:"full feature"})," version"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"pyroscope"}),": Pyroscope connection address(",(0,r.jsx)(i.code,{children:"http://ip:port?app=pingap&tag:a=A&tag:b=B"}),"), requires perf version as default version doesn't include pyroscope support"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"auto_restart_check_interval"}),": Configuration update check interval, defaults to 90 seconds. If set below 1 second, checks are disabled"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"cache_directory"}),": Sets cache directory. When set, uses file-based caching. File cache periodically removes long-unused files. Format: ",(0,r.jsx)(i.code,{children:"/opt/pingap/cache?reading_max=1000&writing_max=500&cache_max=200&cache_file_max_weight=256"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"reading_max"}),": Maximum concurrent cache reads (file cache only)"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"writing_max"}),": Maximum concurrent cache writes (file cache only)"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"cache_max"}),": Hot data cache limit in file cache, uses tinyufo for memory cache, defaults to 100. Set to 0 to disable memory hot cache"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"cache_file_max_weight"}),": Maximum cache file weight for tinyufo, defaults to 256, which means 256 * 4096 bytes, files larger than this value will not be cached to tinyufo"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"cache_max_size"}),": Maximum cache space limit, shared by all services. Not applicable to file cache"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"tcp_fast_open"}),": Enables TCP Fast Open to reduce TCP connection establishment latency. Requires specifying backlog size"]}),"\n"]}),"\n",(0,r.jsx)(i.h2,{id:"upstream",children:"Upstream"}),"\n",(0,r.jsx)(i.p,{children:"Upstream configuration defines backend service node lists. For domain configurations, the system adds all node addresses based on DNS resolution results (automatic DNS updates require configured service discovery). HTTP health checks are recommended for node status monitoring."}),"\n",(0,r.jsx)(i.p,{children:"Main parameters:"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"addrs"}),": Node address list, format: ",(0,r.jsx)(i.code,{children:"ip:port [weight]"}),", weight is optional (defaults to 1)"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"discovery"}),": Service discovery method. DNS recommended for domains, docker label for docker services"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"update_frequency"}),": Service discovery update interval, recommended for dynamic node updates"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"algo"}),": Node selection algorithm, supports ",(0,r.jsx)(i.code,{children:"hash"})," and ",(0,r.jsx)(i.code,{children:"round_robin"}),". Example: ",(0,r.jsx)(i.code,{children:"hash:ip"})," selects nodes by IP hash. Defaults to ",(0,r.jsx)(i.code,{children:"round_robin"})]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"sni"}),": Required SNI for HTTPS configurations"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"verify_cert"}),": Certificate validation requirement for HTTPS"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"health_check"}),": Node health check configuration, supports HTTP, TCP, and gRPC"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"ipv4_only"}),": For domain configurations, restricts to IPv4 nodes only"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"enable_tracer"}),": Enables tracer functionality for upstream connection tracking"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"alpn"}),": ALPN configuration for TLS handshake, defaults to H1"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"connection_timeout"}),": TCP connection timeout, default none"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"total_connection_timeout"}),": Connection timeout including TLS handshake for HTTPS, default none"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"read_timeout"}),": Read timeout, default none"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"idle_timeout"}),": Idle timeout for connection recycling. Set to 0 for no connection reuse. Default none"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"write_timeout"}),": Write timeout, default none"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"tcp_idle"}),": TCP keepalive idle timeout"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"tcp_interval"}),": TCP keepalive check interval"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"tcp_probe_count"}),": TCP keepalive probe count"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"tcp_recv_buf"}),": TCP receive buffer size"]}),"\n"]}),"\n",(0,r.jsxs)(i.p,{children:["Note: All three parameters (",(0,r.jsx)(i.code,{children:"tcp_idle"}),", ",(0,r.jsx)(i.code,{children:"tcp_interval"}),", ",(0,r.jsx)(i.code,{children:"tcp_probe_count"}),") must be set for TCP keepalive."]}),"\n",(0,r.jsx)(i.h3,{id:"health-check-configuration",children:"Health Check Configuration"}),"\n",(0,r.jsx)(i.p,{children:"Supports three health check methods:"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"HTTP(S)"}),": ",(0,r.jsx)(i.code,{children:"http://upstream-name/check-path?parameters"})]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"TCP"}),": ",(0,r.jsx)(i.code,{children:"tcp://upstream-name?parameters"})]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"gRPC"}),": ",(0,r.jsx)(i.code,{children:"grpc://upstream-name?service=service-name&parameters"})]}),"\n"]}),"\n",(0,r.jsx)(i.p,{children:"Common parameters:"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"connection_timeout"}),": Connection timeout, default 3 seconds"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"read_timeout"}),": Read timeout, default 3 seconds"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"check_frequency"}),": Check interval, default 10 seconds"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"success"}),": Consecutive successes needed for healthy status, default 1"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"failure"}),": Consecutive failures needed for unhealthy status, default 2"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"reuse"}),": Connection reuse option, default false"]}),"\n"]}),"\n",(0,r.jsx)(i.h3,{id:"hash-algorithm-options",children:"Hash Algorithm Options"}),"\n",(0,r.jsx)(i.p,{children:"When using hash for upstream backend selection:"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"hash:url"}),": URL-based forwarding for URL-cached services"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"hash:ip"}),": IP-based forwarding for IP-persistent data services"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"hash:header:X-User"}),": Forward based on ",(0,r.jsx)(i.code,{children:"X-User"})," header value"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"hash:cookie:uid"}),": Forward based on ",(0,r.jsx)(i.code,{children:"uid"})," cookie value"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"hash:query:appKey"}),": Forward based on ",(0,r.jsx)(i.code,{children:"appkey"})," query parameter"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"hash:path"}),": Path-based forwarding (default hash method)"]}),"\n"]}),"\n",(0,r.jsx)(i.h2,{id:"location",children:"Location"}),"\n",(0,r.jsx)(i.p,{children:"Location configures request matching rules, header insertion, and plugin associations. Key parameters:"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"upstream"}),": Associated upstream configuration. Optional if all processing is handled by plugins"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"path"}),": Matching path, detailed usage below"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"host"}),": Matching domain(s), comma-separated for multiple. Use ",(0,r.jsx)(i.code,{children:"~"})," prefix for regex"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"proxy_set_headers"}),": Request headers to set/override when forwarding to upstream"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"proxy_add_headers"}),": Request headers to add when forwarding to upstream"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"rewrite"}),": Path rewrite rules"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"weight"}),": Custom weight for location priority"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"plugins"}),": Ordered plugin list for this location"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"client_max_body_size"}),": Maximum client request body size"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"max_processing"}),": Maximum concurrent request limit (0 for unlimited)"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"grpc_web"}),": Enable grpc-web support"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"enable_reverse_proxy_headers"}),": Whether to enable reverse proxy request headers. When enabled, the following headers will be added:","\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"X-Real-IP"}),": Indicates the client's IP address"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"X-Forwarded-For"}),": Indicates proxy addresses, added according to x-forwarded-for format"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"X-Forwarded-Proto"}),": Indicates the request scheme, such as http or https"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"X-Forwarded-Host"}),": Indicates the request host"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"X-Forwarded-Port"}),": Indicates the server port"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(i.h3,{id:"path-matching-rules",children:"Path Matching Rules"}),"\n",(0,r.jsx)(i.p,{children:"Location paths support these rules (highest to lowest priority):"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["Exact match: Prefix with ",(0,r.jsx)(i.code,{children:"="}),", e.g., ",(0,r.jsx)(i.code,{children:"=/api"})," matches exact ",(0,r.jsx)(i.code,{children:"/api"})," path"]}),"\n",(0,r.jsxs)(i.li,{children:["Regex match: Prefix with ",(0,r.jsx)(i.code,{children:"~"}),", e.g., ",(0,r.jsx)(i.code,{children:"~^/(api|rest)"})," matches paths starting with ",(0,r.jsx)(i.code,{children:"/api"})," or ",(0,r.jsx)(i.code,{children:"/rest"})]}),"\n",(0,r.jsxs)(i.li,{children:["Prefix match: e.g., ",(0,r.jsx)(i.code,{children:"/api"})," matches paths starting with ",(0,r.jsx)(i.code,{children:"/api"})]}),"\n"]}),"\n",(0,r.jsx)(i.h3,{id:"path-rewrite-rules",children:"Path Rewrite Rules"}),"\n",(0,r.jsx)(i.p,{children:"Supports regex-based path rewriting (similar to nginx). One rule per configuration. Examples:"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"^/api/ /"}),": Replaces ",(0,r.jsx)(i.code,{children:"/api/"})," prefix with ",(0,r.jsx)(i.code,{children:"/"})]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"^/(\\S*?)/ /api/$1/"}),": Adds ",(0,r.jsx)(i.code,{children:"/api"})," prefix"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"^/(\\S*?)/api/(\\S*?) /$1/$2"}),": Removes ",(0,r.jsx)(i.code,{children:"/api"})," from path"]}),"\n"]}),"\n",(0,r.jsx)(i.h3,{id:"supported-header-variables",children:"Supported Header Variables"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"$hostname"}),": Host machine hostname"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"$host"}),": Request host"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"$scheme"}),": Request scheme (http/https)"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"$remote_addr"}),": Client address"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"$remote_port"}),": Client port"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"$server_addr"}),": Server address"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"$server_port"}),": Server port"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"$proxy_add_x_forwarded_for"}),": Proxy addresses in x-forwarded-for format"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"$upstream_addr"}),": Upstream address"]}),"\n"]}),"\n",(0,r.jsx)(i.h2,{id:"server",children:"Server"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"server.x"}),": Server configuration where ",(0,r.jsx)(i.code,{children:"x"})," is unique server name"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"addr"}),": Listening address(es) in ",(0,r.jsx)(i.code,{children:"ip:port"})," format, comma-separated for multiple"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"access_log"}),": Optional, disabled by default. Supports formats: ",(0,r.jsx)(i.code,{children:"combined"}),", ",(0,r.jsx)(i.code,{children:"common"}),", ",(0,r.jsx)(i.code,{children:"short"}),", ",(0,r.jsx)(i.code,{children:"tiny"})]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"locations"}),": Location list for this server"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"threads"}),": Default thread count, 0 for CPU core count, default 1"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"tls_cipher_list"}),": Pre-TLS 1.3 cipher suites"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"tls_ciphersuites"}),": TLS 1.3 cipher suites"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"tls_min_version"}),": Minimum TLS version, default 1.2"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"tls_max_version"}),": Maximum TLS version, default 1.3"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"global_certificates"}),": Enable global certificates for unmatched server names"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"enabled_h2"}),": Enable HTTP/2 (recommended, uses h2c for HTTP)"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"tcp_idle"}),": TCP keepalive idle timeout"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"tcp_interval"}),": TCP keepalive check interval"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"tcp_probe_count"}),": TCP keepalive probe count"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"tcp_fastopen"}),": Enable TCP fast open with backlog size"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"prometheus_metrics"}),": Enable Prometheus metrics (full features version only)"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"otlp_exporter"}),": OpenTelemetry collector address (full features version only)"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"modules"}),": Enable specific modules (required for web-grpc)"]}),"\n"]})]})}function h(e={}){const{wrapper:i}={...(0,c.R)(),...e.components};return i?(0,r.jsx)(i,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}}}]);