"use strict";(self.webpackChunkpingap=self.webpackChunkpingap||[]).push([[9387],{5333:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>d,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"question","title":"Frequently Asked Questions","description":"Host Header Configuration","source":"@site/docs/question.md","sourceDirName":".","slug":"/question","permalink":"/pingap-en/docs/question","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/question.md","tags":[],"version":"current","sidebarPosition":81,"frontMatter":{"sidebar_position":81},"sidebar":"tutorialSidebar","previous":{"title":"Docker","permalink":"/pingap-en/docs/docker"},"next":{"title":"Performance Testing","permalink":"/pingap-en/docs/performance"}}');var s=n(4848),r=n(8453);const o={sidebar_position:81},a="Frequently Asked Questions",d={},l=[{value:"Host Header Configuration",id:"host-header-configuration",level:2},{value:"Upstream Address Configuration Notes",id:"upstream-address-configuration-notes",level:2},{value:"Thread Configuration Notes",id:"thread-configuration-notes",level:2},{value:"HTTPS Upstream Configuration",id:"https-upstream-configuration",level:2},{value:"Multi-domain HTTPS Service Configuration",id:"multi-domain-https-service-configuration",level:2}];function c(e){const i={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.header,{children:(0,s.jsx)(i.h1,{id:"frequently-asked-questions",children:"Frequently Asked Questions"})}),"\n",(0,s.jsx)(i.h2,{id:"host-header-configuration",children:"Host Header Configuration"}),"\n",(0,s.jsxs)(i.p,{children:["When multiple services share the same port and are distinguished by the ",(0,s.jsx)(i.code,{children:"Host"})," header field, you need to explicitly set the forwarded ",(0,s.jsx)(i.code,{children:"Host"})," header in the Location configuration."]}),"\n",(0,s.jsx)(i.h2,{id:"upstream-address-configuration-notes",children:"Upstream Address Configuration Notes"}),"\n",(0,s.jsxs)(i.p,{children:["Upstream addresses consist of IP and port. If no port is specified, HTTP services default to port ",(0,s.jsx)(i.code,{children:"80"}),", and HTTPS services default to port ",(0,s.jsx)(i.code,{children:"443"}),"."]}),"\n",(0,s.jsx)(i.p,{children:"Important note: When using a domain name as an address, the default service discovery mechanism only resolves the domain name to IP(s) during initialization (if multiple IPs are resolved, multiple addresses will be added). Subsequent changes to the domain's IP mapping won't be detected in real-time. If your scenario involves dynamically changing IP addresses, it's recommended to use DNS service discovery."}),"\n",(0,s.jsx)(i.h2,{id:"thread-configuration-notes",children:"Thread Configuration Notes"}),"\n",(0,s.jsx)(i.p,{children:"Pingap's thread configuration is Server-based, with a default value of 1. You can:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Set thread count individually for each Server"}),"\n",(0,s.jsx)(i.li,{children:"Set a global default value in the basic configuration (Servers without individual settings will use this value)"}),"\n",(0,s.jsx)(i.li,{children:"Set it to 0 to automatically use the same number of threads as CPU cores"}),"\n"]}),"\n",(0,s.jsx)(i.h2,{id:"https-upstream-configuration",children:"HTTPS Upstream Configuration"}),"\n",(0,s.jsx)(i.p,{children:"When using HTTPS protocol for Upstream, you need to:"}),"\n",(0,s.jsxs)(i.ol,{children:["\n",(0,s.jsx)(i.li,{children:"Set the corresponding SNI (Server Name Indication)"}),"\n",(0,s.jsxs)(i.li,{children:["If upstream node port is not specified, the HTTPS standard port ",(0,s.jsx)(i.code,{children:"443"})," will be used by default"]}),"\n"]}),"\n",(0,s.jsx)(i.h2,{id:"multi-domain-https-service-configuration",children:"Multi-domain HTTPS Service Configuration"}),"\n",(0,s.jsx)(i.p,{children:"To provide HTTPS services for multiple domains on the same Server, simply:"}),"\n",(0,s.jsxs)(i.ol,{children:["\n",(0,s.jsx)(i.li,{children:"Add the corresponding certificates in certificate management"}),"\n",(0,s.jsx)(i.li,{children:'Configure the service to "Use global certificates of the application"'}),"\n"]})]})}function u(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}}}]);