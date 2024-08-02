"use strict";(self.webpackChunkpingap=self.webpackChunkpingap||[]).push([[6216],{8988:(e,s,c)=>{c.r(s),c.d(s,{assets:()=>h,contentTitle:()=>r,default:()=>a,frontMatter:()=>l,metadata:()=>d,toc:()=>t});var n=c(4848),i=c(8453);const l={sidebar_position:51},r="Upsteam\u8bf4\u660e",d={id:"upstream",title:"Upsteam\u8bf4\u660e",description:"Upstream\u914d\u7f6e\u4e3a\u8282\u70b9\u5730\u5740\u5217\u8868\uff0c\u914d\u7f6e\u4e3a\u57df\u540d\u5219\u4f1a\u6839\u636e\u89e3\u6790\u540e\u7684IP\u6dfb\u52a0\u6240\u6709\u8282\u70b9\u5730\u5740\uff08\u4e4b\u540e\u5e76\u4e0d\u4f1a\u518d\u6b21\u5237\u65b0\u57df\u540d\u89e3\u6790\uff09\uff0c\u9700\u8981\u6ce8\u610f\u8282\u70b9\u4f1a\u4f7f\u7528\u9ed8\u8ba4\u7684tcp health check\u7684\u5f62\u5f0f\u68c0\u6d4b\u8282\u70b9\u662f\u5426\u53ef\u7528\uff0c\u5efa\u8bae\u914d\u7f6e\u4e3ahttp health check\u3002\u4e0b\u9762\u9488\u5bf9\u76f8\u5173\u53c2\u6570\u8be6\u7ec6\u8bf4\u660e\uff1a",source:"@site/docs/upstream.md",sourceDirName:".",slug:"/upstream",permalink:"/pingap-zh/docs/upstream",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/upstream.md",tags:[],version:"current",sidebarPosition:51,frontMatter:{sidebar_position:51},sidebar:"tutorialSidebar",previous:{title:"Location\u8bf4\u660e",permalink:"/pingap-zh/docs/location"},next:{title:"\u65e5\u5fd7\u683c\u5f0f\u5316",permalink:"/pingap-zh/docs/log"}},h={},t=[{value:"\u8282\u70b9\u5065\u5eb7\u68c0\u6d4b",id:"\u8282\u70b9\u5065\u5eb7\u68c0\u6d4b",level:3},{value:"Algo\u7684hash",id:"algo\u7684hash",level:3}];function o(e){const s={a:"a",code:"code",h1:"h1",h3:"h3",li:"li",p:"p",ul:"ul",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"upsteam\u8bf4\u660e",children:"Upsteam\u8bf4\u660e"}),"\n",(0,n.jsx)(s.p,{children:"Upstream\u914d\u7f6e\u4e3a\u8282\u70b9\u5730\u5740\u5217\u8868\uff0c\u914d\u7f6e\u4e3a\u57df\u540d\u5219\u4f1a\u6839\u636e\u89e3\u6790\u540e\u7684IP\u6dfb\u52a0\u6240\u6709\u8282\u70b9\u5730\u5740\uff08\u4e4b\u540e\u5e76\u4e0d\u4f1a\u518d\u6b21\u5237\u65b0\u57df\u540d\u89e3\u6790\uff09\uff0c\u9700\u8981\u6ce8\u610f\u8282\u70b9\u4f1a\u4f7f\u7528\u9ed8\u8ba4\u7684tcp health check\u7684\u5f62\u5f0f\u68c0\u6d4b\u8282\u70b9\u662f\u5426\u53ef\u7528\uff0c\u5efa\u8bae\u914d\u7f6e\u4e3ahttp health check\u3002\u4e0b\u9762\u9488\u5bf9\u76f8\u5173\u53c2\u6570\u8be6\u7ec6\u8bf4\u660e\uff1a"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"addrs"}),": \u8282\u70b9\u5730\u5740\u5217\u8868\uff0c\u5730\u5740\u4e3a",(0,n.jsx)(s.code,{children:"ip:port weight"}),"\u7684\u5f62\u5f0f\uff0c",(0,n.jsx)(s.code,{children:"weight"}),"\u6743\u91cd\u53ef\u4e0d\u6307\u5b9a\uff0c\u9ed8\u8ba4\u4e3a1"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"algo"}),": \u8282\u70b9\u7684\u9009\u62e9\u7b97\u6cd5\uff0c\u652f\u6301",(0,n.jsx)(s.code,{children:"hash"}),"\u4e0e",(0,n.jsx)(s.code,{children:"round_robin"}),"\u4e24\u79cd\u5f62\u5f0f\uff0c\u5982",(0,n.jsx)(s.code,{children:"hash:ip"}),"\u8868\u793a\u6309ip hash\u9009\u62e9\u8282\u70b9\u3002\u9ed8\u8ba4\u4e3a",(0,n.jsx)(s.code,{children:"round_robin"})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"sni"}),": \u82e5\u914d\u7f6e\u7684\u662fhttps\uff0c\u9700\u8981\u8bbe\u7f6e\u5bf9\u5e94\u7684SNI"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"verify_cert"}),": \u82e5\u914d\u7f6e\u7684\u662fhttps\uff0c\u662f\u5426\u9700\u8981\u6821\u9a8c\u8bc1\u4e66\u6709\u6548\u6027"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"health_check"}),": \u8282\u70b9\u5065\u5eb7\u68c0\u6d4b\u914d\u7f6e\uff0c\u652f\u6301http\u4e0etcp\u5f62\u5f0f"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"ipv4_only"}),": \u82e5\u914d\u7f6e\u4e3a\u57df\u540d\u65f6\uff0c\u662f\u5426\u4ec5\u6dfb\u52a0\u89e3\u6790\u7684ipv4\u8282\u70b9"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"enable_tracer"}),": \u662f\u5426\u542f\u7528tracer\u529f\u80fd\uff0c\u542f\u7528\u540e\u53ef\u83b7\u53d6\u5f97upstream\u7684\u8fde\u63a5\u6570"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"alpn"}),": \u5728tls\u63e1\u624b\u65f6\uff0calpn\u7684\u914d\u7f6e\uff0c\u9ed8\u8ba4\u4e3aH1"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"connection_timeout"}),": tcp\u8fde\u63a5\u8d85\u65f6\uff0c\u9ed8\u8ba4\u4e3a\u65e0"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"total_connection_timeout"}),": \u8fde\u63a5\u8d85\u65f6\uff0c\u5bf9\u4e8ehttps\u5305\u62ectls\u63e1\u624b\u90e8\u5206\uff0c\u9ed8\u8ba4\u4e3a\u65e0"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"read_timeout"}),": \u8bfb\u53d6\u8d85\u65f6\uff0c\u9ed8\u8ba4\u4e3a\u65e0"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"idle_timeout"}),": \u7a7a\u95f2\u8d85\u65f6\uff0c\u6307\u5b9a\u8fde\u63a5\u7a7a\u95f2\u591a\u4e45\u540e\u4f1a\u81ea\u52a8\u56de\u6536\uff0c\u5982\u679c\u8bbe\u7f6e\u4e3a0\uff0c\u5219\u8fde\u63a5\u4e0d\u590d\u7528\uff0c\u9700\u8981\u6ce8\u610f\u6709\u4e9b\u7f51\u7edc\u8bbe\u5907\u5bf9\u4e8e\u65e0\u6570\u636e\u7684tcp\u8fde\u63a5\u4f1a\u8fc7\u671f\u81ea\u52a8\u5173\u95ed\uff0c\u56e0\u6b64\u53ef\u6839\u636e\u9700\u8981\u8bbe\u7f6e\u5bf9\u5e94\u7684\u503c\u3002\u9ed8\u8ba4\u4e3a\u65e0"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"write_timeout"}),": \u5199\u8d85\u65f6\uff0c\u9ed8\u8ba4\u4e3a\u65e0"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"tcp_idle"}),": tcp\u8fde\u63a5keepalive\u7a7a\u95f2\u56de\u6536\u65f6\u957f"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"tcp_interval"}),": tcp\u8fde\u63a5keepavlie\u68c0\u6d4b\u65f6\u957f"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"tcp_probe_count"}),": tcp\u8fde\u63a5keepalvie\u63a2\u9488\u68c0\u6d4b\u6b21\u6570"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"tcp_recv_buf"}),": tcp\u63a5\u6536\u7f13\u5b58\u533a\u5927\u5c0f"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"tcp_fast_open"}),": \u662f\u5426\u542f\u7528tcp\u5feb\u901f\u8fde\u63a5"]}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:["\u9700\u8981\u6ce8\u610f\uff0c\u82e5\u8981\u8bbe\u7f6etcp\u7684keepalive\uff0c",(0,n.jsx)(s.code,{children:"tcp_idle"}),"\uff0c",(0,n.jsx)(s.code,{children:"tcp_interval"}),"\u4ee5\u53ca",(0,n.jsx)(s.code,{children:"tcp_probe_count"}),"\u5747\u9700\u8981\u8bbe\u7f6e\u3002"]}),"\n",(0,n.jsx)(s.h3,{id:"\u8282\u70b9\u5065\u5eb7\u68c0\u6d4b",children:"\u8282\u70b9\u5065\u5eb7\u68c0\u6d4b"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"health_check"}),": \u5efa\u8bae\u914d\u7f6e\u4e3ahealth check\u7684\u5f62\u5f0f\uff0c\u6839\u636e\u670d\u52a1\u7684\u68c0\u6d4b\u8def\u5f84\u914d\u7f6e\u4e3a",(0,n.jsx)(s.code,{children:"http://upstream\u540d\u79f0/\u8def\u5f84"}),"\uff0c\u5982\u5bf9\u4e8eupstream\u9700\u8981\u8bbe\u7f6eHost\u4e3atest\u7684\u7684\u670d\u52a1\uff0c\u5176\u68c0\u6d4b\u8def\u5f84\u4e3a",(0,n.jsx)(s.code,{children:"/ping"}),"\uff0c\u5373\u53ef\u8bbe\u7f6e\u4e3a",(0,n.jsx)(s.code,{children:"http://test/ping"})]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"TCP"}),": tcp://upstreamname?connection_timeout=3s&success=2&failure=1&check_frequency=10s"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"HTTP(S)"}),": ",(0,n.jsx)(s.a,{href:"http://upstreamname/ping?connection_timeout=3s&read_timeout=1s&success=2&failure=1&check_frequency=10s",children:"http://upstreamname/ping?connection_timeout=3s&read_timeout=1s&success=2&failure=1&check_frequency=10s"})]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:"\u5065\u5eb7\u68c0\u6d4b\u53c2\u6570\u8bf4\u660e\uff1a"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"connection_timeout"}),": \u8fde\u63a5\u8d85\u65f6\uff0c\u9ed8\u8ba4\u4e3a3\u79d2"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"read_timeout"}),": \u8bfb\u53d6\u8d85\u65f6\uff0c\u9ed8\u8ba4\u4e3a3\u5c11"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"check_frequency"}),": \u68c0\u6d4b\u95f4\u9694\uff0c\u9ed8\u8ba4\u4e3a10\u79d2"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"success"}),": \u6210\u529f\u6b21\u6570\u591a\u5c11\u6b21\u4e3a\u6210\u529f\uff0c\u9ed8\u8ba4\u4e3a1\u6b21"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"failure"}),": \u5931\u8d25\u6b21\u6570\u591a\u5c11\u6b21\u4e3a\u5931\u8d25\uff0c\u9ed8\u8ba4\u4e3a2\u6b21"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"reuse"}),": \u68c0\u6d4b\u65f6\u662f\u5426\u590d\u7528\u8fde\u63a5\uff0c\u9ed8\u8ba4\u4e3a\u5426"]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"algo\u7684hash",children:"Algo\u7684hash"}),"\n",(0,n.jsx)(s.p,{children:"\u82e5\u6307\u5b9a\u901a\u8fc7hash\u7684\u65b9\u5f0f\u9009\u62e9upstream\u7684backend\uff0c\u5219\u53ef\u4f7f\u7528\u5982\u4e0b\u65b9\u5f0f\uff1a"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"hash:url"}),": \u6839\u636eurl\u8f6c\u53d1\uff0c\u4e3b\u8981\u7528\u4e8eupstream\u4e3a\u57fa\u4e8eurl\u7f13\u5b58\u7684\u670d\u52a1"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"hash:ip"}),": \u6839\u636eip\u8f6c\u53d1\uff0cupstream\u4e3a\u6709\u57fa\u4e8eip\u6570\u636e\u6301\u4e45\u5316\u7684\u670d\u52a1"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"hash:header:X-User"}),": \u6839\u636e\u8bf7\u6c42\u5934\u83b7\u53d6",(0,n.jsx)(s.code,{children:"X-User"}),"\u7684\u503c\u8f6c\u53d1"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"hash:cookie:uid"}),": \u6839\u636eCookie\u7684",(0,n.jsx)(s.code,{children:"uid"}),"\u503c\u8f6c\u53d1"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"hash:query:appKey"}),": \u6839\u636eQuery\u7684",(0,n.jsx)(s.code,{children:"appkey"}),"\u503c\u8f6c\u53d1"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"hash:path"}),": \u6839\u636epath\u8f6c\u53d1\uff0chash\u65b9\u5f0f\u7684\u9ed8\u8ba4\u503c"]}),"\n"]})]})}function a(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}}}]);