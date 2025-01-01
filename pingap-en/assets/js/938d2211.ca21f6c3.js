"use strict";(self.webpackChunkpingap=self.webpackChunkpingap||[]).push([[209],{5041:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>t,contentTitle:()=>d,default:()=>h,frontMatter:()=>c,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"log","title":"Log Formatting","description":"Pingap provides multiple log formatting options, including the following preset formats","source":"@site/docs/log.md","sourceDirName":".","slug":"/log","permalink":"/pingap-en/docs/log","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/log.md","tags":[],"version":"current","sidebarPosition":61,"frontMatter":{"sidebar_position":61},"sidebar":"tutorialSidebar","previous":{"title":"Configuration Guide","permalink":"/pingap-en/docs/config"},"next":{"title":"HTTPS Certificate Management","permalink":"/pingap-en/docs/certificate"}}');var r=s(4848),l=s(8453);const c={sidebar_position:61},d="Log Formatting",t={},o=[{value:"Basic Parameters",id:"basic-parameters",level:2},{value:"Request Related",id:"request-related",level:2},{value:"Time Related",id:"time-related",level:2},{value:"Response Related",id:"response-related",level:2},{value:"Variable Retrieval",id:"variable-retrieval",level:2},{value:"Context Parameters",id:"context-parameters",level:2},{value:"Connection Related",id:"connection-related",level:3},{value:"TLS Related",id:"tls-related",level:3},{value:"Upstream Related",id:"upstream-related",level:3},{value:"Performance Metrics",id:"performance-metrics",level:3}];function a(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",ul:"ul",...(0,l.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"log-formatting",children:"Log Formatting"})}),"\n",(0,r.jsxs)(n.p,{children:["Pingap provides multiple log formatting options, including the following preset formats: ",(0,r.jsx)(n.code,{children:"combined"}),", ",(0,r.jsx)(n.code,{children:"common"}),", ",(0,r.jsx)(n.code,{children:"short"}),", and ",(0,r.jsx)(n.code,{children:"tiny"}),". Additionally, you can customize the log output format according to your needs. The supported parameters are as follows:"]}),"\n",(0,r.jsx)(n.h2,{id:"basic-parameters",children:"Basic Parameters"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{host}"}),": Request hostname"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{method}"}),": HTTP request method"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{path}"}),": Request path"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{proto}"}),": HTTP protocol version (",(0,r.jsx)(n.code,{children:"HTTP/1.1"})," or ",(0,r.jsx)(n.code,{children:"HTTP/2.0"}),")"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{query}"}),": Query string"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{remote}"}),": Request source IP address"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{client_ip}"}),": Client IP (Priority: ",(0,r.jsx)(n.code,{children:"X-Forwarded-For"})," > ",(0,r.jsx)(n.code,{children:"X-Real-Ip"})," > ",(0,r.jsx)(n.code,{children:"remote"}),")"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{scheme}"}),": Protocol type (http/https)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{uri}"}),": Complete request URI"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"request-related",children:"Request Related"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{referer}"}),": HTTP Referer header"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{user_agent}"}),": User-Agent header"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{request_id}"}),": Request ID (requires corresponding middleware)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{payload_size}"}),": Request body size (bytes)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{payload_size_human}"}),": Request body size (human-readable format)"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"time-related",children:"Time Related"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{when}"}),": Log recording time"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{when_utc_iso}"}),": UTC format log time"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{when_unix}"}),": Unix timestamp format"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{latency}"}),": Response time (milliseconds)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{latency_human}"}),": Response time (human-readable format)"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"response-related",children:"Response Related"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{size}"}),": Response body size (bytes)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{size_human}"}),": Response body size (human-readable format)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{status}"}),": HTTP status code"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"variable-retrieval",children:"Variable Retrieval"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{~name}"}),": Get Cookie value (e.g., ",(0,r.jsx)(n.code,{children:"{~uid}"})," gets uid from cookie)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{>name}"}),": Get request header value (e.g., ",(0,r.jsx)(n.code,{children:"{>X-User-Id}"}),")"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{<name}"}),": Get response header value (e.g., ",(0,r.jsx)(n.code,{children:"{<X-Server}"}),")"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{:name}"}),": Get value from Context (see Context section below)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{$name}"}),": Get environment variable value (retrieved and cached at startup)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"{$hostname}"}),": Get current server hostname"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"context-parameters",children:"Context Parameters"}),"\n",(0,r.jsx)(n.p,{children:"Attributes available in Context include:"}),"\n",(0,r.jsx)(n.h3,{id:"connection-related",children:"Connection Related"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"connection_id"}),": Connection ID"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"connection_time"}),": Connection duration"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"connection_reused"}),": Whether the connection is reused"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"processing"}),": Number of requests currently being processed"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"service_time"}),": Total request processing time (from receipt to completion)"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"tls-related",children:"TLS Related"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"tls_version"}),": TLS version (empty for HTTP connections)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"tls_cipher"}),": TLS cipher suite (empty for HTTP connections)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"tls_handshake_time"}),": TLS handshake time (empty for HTTP connections)"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"upstream-related",children:"Upstream Related"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"upstream_reused"}),": Whether upstream connection is reused"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"upstream_addr"}),": Upstream server address"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"upstream_connected"}),": Number of upstream connections for current location"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"upstream_connect_time"}),": Upstream connection time (including TCP and TLS)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"upstream_tcp_connect_time"}),": Upstream TCP connection time (None if connection is reused)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"upstream_tls_handshake_time"}),": Upstream TLS handshake time (None if connection is reused or non-HTTPS)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"upstream_processing_time"}),": Upstream request processing time"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"upstream_response_time"}),": Upstream response time"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"performance-metrics",children:"Performance Metrics"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"compression_time"}),": Compression time"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"compression_ratio"}),": Compression ratio"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"cache_lookup_time"}),": Cache lookup time"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"cache_lock_time"}),": Cache lock time"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}}}]);