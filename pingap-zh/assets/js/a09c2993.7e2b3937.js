"use strict";(self.webpackChunkpingap=self.webpackChunkpingap||[]).push([[5899],{1920:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>c,contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>a});const s=JSON.parse('{"id":"introduction","title":"Pingap\u7b80\u8ff0","description":"Pingap\u662f\u57fa\u4e8epingora\u5f00\u53d1\u7684\uff0cpingora\u63d0\u4f9b\u4e86\u5404\u7c7b\u6a21\u5757\u4fbf\u4e8erust\u5f00\u53d1\u8005\u4f7f\u7528\uff0c\u4f46\u5e76\u4e0d\u65b9\u4fbf\u975erust\u5f00\u53d1\u8005\uff0c\u56e0\u6b64pingap\u652f\u6301toml\u7684\u5f62\u5f0f\u914d\u7f6e\u7b80\u5355\u6613\u7528\u7684\u53cd\u5411\u4ee3\u7406\uff0c\u5355\u670d\u52a1\u652f\u6301\u591alocation\u8f6c\u53d1\uff0c\u901a\u8fc7\u63d2\u4ef6\u7684\u5f62\u5f0f\u652f\u6301\u66f4\u591a\u7684\u9700\u6c42\u573a\u666f\u3002\u5df2\u9884\u7f16\u8bd1\u597d\u5404\u67b6\u6784\u4e0a\u4f7f\u7528\u7684\u53ef\u6267\u884c\u6587\u4ef6\uff0c\u5728releases\u4e0b\u8f7d\u5373\u53ef\u3002\u7279\u6027\u5982\u4e0b\uff1a","source":"@site/docs/introduction.md","sourceDirName":".","slug":"/introduction","permalink":"/pingap-zh/docs/introduction","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/introduction.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"tutorialSidebar","next":{"title":"\u5165\u95e8\u6559\u7a0b","permalink":"/pingap-zh/docs/getting_started"}}');var t=i(4848),l=i(8453);const o={sidebar_position:1},r="Pingap\u7b80\u8ff0",c={},a=[{value:"\u5904\u7406\u6d41\u7a0b",id:"\u5904\u7406\u6d41\u7a0b",level:2},{value:"\u63d2\u4ef6\u4f53\u7cfb",id:"\u63d2\u4ef6\u4f53\u7cfb",level:2},{value:"\u8bbf\u95ee\u65e5\u5fd7\u683c\u5f0f\u5316",id:"\u8bbf\u95ee\u65e5\u5fd7\u683c\u5f0f\u5316",level:2},{value:"\u5e94\u7528\u914d\u7f6e",id:"\u5e94\u7528\u914d\u7f6e",level:2}];function d(n){const e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",mermaid:"mermaid",p:"p",ul:"ul",...(0,l.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.header,{children:(0,t.jsx)(e.h1,{id:"pingap\u7b80\u8ff0",children:"Pingap\u7b80\u8ff0"})}),"\n",(0,t.jsxs)(e.p,{children:["Pingap\u662f\u57fa\u4e8e",(0,t.jsx)(e.a,{href:"https://github.com/cloudflare/pingora",children:"pingora"}),"\u5f00\u53d1\u7684\uff0cpingora\u63d0\u4f9b\u4e86\u5404\u7c7b\u6a21\u5757\u4fbf\u4e8erust\u5f00\u53d1\u8005\u4f7f\u7528\uff0c\u4f46\u5e76\u4e0d\u65b9\u4fbf\u975erust\u5f00\u53d1\u8005\uff0c\u56e0\u6b64pingap\u652f\u6301toml\u7684\u5f62\u5f0f\u914d\u7f6e\u7b80\u5355\u6613\u7528\u7684\u53cd\u5411\u4ee3\u7406\uff0c\u5355\u670d\u52a1\u652f\u6301\u591alocation\u8f6c\u53d1\uff0c\u901a\u8fc7\u63d2\u4ef6\u7684\u5f62\u5f0f\u652f\u6301\u66f4\u591a\u7684\u9700\u6c42\u573a\u666f\u3002\u5df2\u9884\u7f16\u8bd1\u597d\u5404\u67b6\u6784\u4e0a\u4f7f\u7528\u7684\u53ef\u6267\u884c\u6587\u4ef6\uff0c\u5728",(0,t.jsx)(e.a,{href:"https://github.com/vicanso/pingap/releases",children:"releases"}),"\u4e0b\u8f7d\u5373\u53ef\u3002\u7279\u6027\u5982\u4e0b\uff1a"]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u670d\u52a1\u652f\u6301\u914d\u7f6e\u591a\u4e2aLocation\uff0c\u901a\u8fc7host\u4e0epath\u7b5b\u9009\u5bf9\u5e94\u7684location\uff0c\u6309\u6743\u91cd\u9010\u4e00\u5339\u914d\u9009\u62e9"}),"\n",(0,t.jsx)(e.li,{children:"\u652f\u6301\u6b63\u5219\u5f62\u5f0f\u914d\u7f6e\u91cd\u5199Path\uff0c\u65b9\u4fbf\u5e94\u7528\u6309\u524d\u7f00\u533a\u5206\u8f6c\u53d1"}),"\n",(0,t.jsx)(e.li,{children:"HTTP\u900f\u660e\u4ee3\u7406\uff0c\u652f\u6301http\u4e0ehttps\u7684\u4ee3\u7406\u8f6c\u53d1"}),"\n",(0,t.jsx)(e.li,{children:"HTTP 1/2 \u7684\u5168\u94fe\u8def\u652f\u6301\uff0c\u5305\u62ech2c\u7684\u652f\u6301"}),"\n",(0,t.jsx)(e.li,{children:"\u652f\u6301\u9759\u6001\u914d\u7f6e\u3001DNS\u4ee5\u53cadocker label\u7684\u4e09\u79cd\u670d\u52a1\u53d1\u73b0\u5f62\u5f0f"}),"\n",(0,t.jsx)(e.li,{children:"\u652f\u6301grpc-web\u53cd\u5411\u4ee3\u7406"}),"\n",(0,t.jsx)(e.li,{children:"\u57fa\u4e8eTOML\u683c\u5f0f\u7684\u914d\u7f6e\uff0c\u914d\u7f6e\u65b9\u5f0f\u975e\u5e38\u7b80\u6d01\uff0c\u53ef\u4fdd\u5b58\u81f3\u6587\u4ef6\u6216etcd"}),"\n",(0,t.jsx)(e.li,{children:"\u5df2\u670910\u591a\u4e2aPrometheus\u6307\u6807\uff0c\u53ef\u4ee5\u4f7f\u7528pull\u4e0epush\u7684\u5f62\u5f0f\u6536\u96c6\u76f8\u5173\u6307\u6807"}),"\n",(0,t.jsx)(e.li,{children:"Opentelemetry\u652f\u6301w3c context trace\u4e0ejaeger trace\u7684\u5f62\u5f0f"}),"\n",(0,t.jsx)(e.li,{children:"\u9891\u7e41\u66f4\u65b0\u7684Upstream\u3001Location\u4ee5\u53caPlugin\u76f8\u5173\u914d\u7f6e\u8c03\u6574\u51c6\u5b9e\u65f6\u751f\u6548(10\u79d2)\u4e14\u65e0\u4efb\u4f55\u4e2d\u65ad\u8bf7\u6c42\uff0c\u5176\u5b83\u5e94\u7528\u914d\u7f6e\u66f4\u65b0\u540e\uff0c\u65e0\u4e2d\u65ad\u5f0f\u7684\u4f18\u96c5\u91cd\u542f\u7a0b\u5e8f"}),"\n",(0,t.jsx)(e.li,{children:"\u8bbf\u95ee\u65e5\u5fd7\u7684\u6a21\u677f\u5316\u914d\u7f6e\uff0c\u5df2\u652f\u630130\u591a\u4e2a\u76f8\u5173\u5c5e\u6027\u7684\u914d\u7f6e\uff0c\u53ef\u6309\u9700\u6307\u5b9a\u8f93\u51fa\u5404\u79cd\u53c2\u6570\u4e0e\u6307\u6807"}),"\n",(0,t.jsx)(e.li,{children:"WEB\u5f62\u5f0f\u7684\u7ba1\u7406\u540e\u53f0\u754c\u9762\uff0c\u65e0\u9700\u5b66\u4e60\uff0c\u7b80\u5355\u6613\u7528"}),"\n",(0,t.jsxs)(e.li,{children:["\u5f00\u7bb1\u5373\u7528\u7684",(0,t.jsx)(e.code,{children:"let's encrypt"}),"tls\u8bc1\u4e66\uff0c\u4ec5\u9700\u914d\u7f6e\u5bf9\u5e94\u57df\u540d\u5373\u53ef\uff0c\u53ef\u5728\u5355\u4e00\u914d\u7f6e\u4e2d\u4f7f\u7528\u591a\u4e2a\u5b50\u57df\u540d"]}),"\n",(0,t.jsx)(e.li,{children:"\u4e0d\u540c\u57df\u540d\u7684tls\u8bc1\u4e66\u53ef\u4f7f\u7528\u5728\u540c\u4e00\u670d\u52a1\u7aef\u53e3\u4e2d\uff0c\u6309servername\u81ea\u52a8\u9009\u62e9\u5339\u914d\u8bc1\u4e66"}),"\n",(0,t.jsxs)(e.li,{children:["\u652f\u6301\u5404\u79cd\u4e8b\u4ef6\u7684\u63a8\u9001\uff1a",(0,t.jsx)(e.code,{children:"lets_encrypt"}),", ",(0,t.jsx)(e.code,{children:"backend_status"}),", ",(0,t.jsx)(e.code,{children:"diff_config"}),", ",(0,t.jsx)(e.code,{children:"restart"}),"\u7b49\u7b49"]}),"\n",(0,t.jsx)(e.li,{children:"\u4e30\u5bcc\u7684http\u63d2\u4ef6\uff0c\u5982\u9ad8\u6548\u7684\u7f13\u5b58\u670d\u52a1\u7ec4\u4ef6\u3001\u591a\u79cd\u538b\u7f29\u7b97\u6cd5\u7684\u538b\u7f29\u7ec4\u4ef6\u3001\u4e0d\u540c\u79cd\u7c7b\u7684\u8ba4\u8bc1\u7ec4\u4ef6\u3001\u4e0d\u540c\u5f62\u5f0f\u7684\u9650\u6d41\u7ec4\u4ef6\u7b49\u7b49"}),"\n",(0,t.jsxs)(e.li,{children:["\u63d0\u4f9b\u4e86\u4e0d\u540c\u9636\u6bb5\u7684\u7edf\u8ba1\u6570\u636e\uff0c\u5982",(0,t.jsx)(e.code,{children:"upstream_connect_time"}),", ",(0,t.jsx)(e.code,{children:"upstream_processing_time"}),", ",(0,t.jsx)(e.code,{children:"compression_time"}),", ",(0,t.jsx)(e.code,{children:"cache_lookup_time"})," \u4e0e ",(0,t.jsx)(e.code,{children:"cache_lock_time"}),"\u7b49"]}),"\n"]}),"\n",(0,t.jsx)(e.h2,{id:"\u5904\u7406\u6d41\u7a0b",children:"\u5904\u7406\u6d41\u7a0b"}),"\n",(0,t.jsx)(e.mermaid,{value:'graph TD;\n    server["HTTP\u670d\u52a1"];\n    locationA["Location A"];\n    locationB["Location B"];\n    locationPluginListA["\u8f6c\u53d1\u63d2\u4ef6\u5217\u8868A"];\n    locationPluginListB["\u8f6c\u53d1\u63d2\u4ef6\u5217\u8868B"];\n    upstreamA1["\u4e0a\u6e38\u670d\u52a1A1"];\n    upstreamA2["\u4e0a\u6e38\u670d\u52a1A2"];\n    upstreamB1["\u4e0a\u6e38\u670d\u52a1B1"];\n    upstreamB2["\u4e0a\u6e38\u670d\u52a1B2"];\n    locationResponsePluginListA["\u54cd\u5e94\u63d2\u4ef6\u5217\u8868A"];\n    locationResponsePluginListB["\u54cd\u5e94\u63d2\u4ef6\u5217\u8868B"];\n\n    start("\u65b0\u7684\u8bf7\u6c42") --\x3e server\n\n    server -- "host:HostA, Path:/api/*" --\x3e locationA\n\n    server -- "Path:/rest/*"--\x3e locationB\n\n    locationA -- "\u987a\u5e8f\u6267\u884c\u8f6c\u53d1\u63d2\u4ef6" --\x3e locationPluginListA\n\n    locationB -- "\u987a\u5e8f\u6267\u884c\u8f6c\u53d1\u63d2\u4ef6" --\x3e locationPluginListB\n\n    locationPluginListA -- "\u8f6c\u53d1\u81f3: 10.0.0.1:8001" --\x3e upstreamA1\n\n    locationPluginListA -- "\u8f6c\u53d1\u81f3: 10.0.0.2:8001" --\x3e upstreamA2\n\n    locationPluginListA -- "\u5904\u7406\u5b8c\u6210" --\x3e response\n\n    locationPluginListB -- "\u8f6c\u53d1\u81f3: 10.0.0.1:8002" --\x3e upstreamB1\n\n    locationPluginListB -- "\u8f6c\u53d1\u81f3: 10.0.0.2:8002" --\x3e upstreamB2\n\n    locationPluginListB -- "\u5904\u7406\u5b8c\u6210" --\x3e response\n\n    upstreamA1 -- "\u987a\u5e8f\u6267\u884c\u54cd\u5e94\u63d2\u4ef6" --\x3e locationResponsePluginListA\n    upstreamA2 -- "\u987a\u5e8f\u6267\u884c\u54cd\u5e94\u63d2\u4ef6" --\x3e locationResponsePluginListA\n\n    upstreamB1 -- "\u987a\u5e8f\u6267\u884c\u54cd\u5e94\u63d2\u4ef6" --\x3e locationResponsePluginListB\n    upstreamB2 -- "\u987a\u5e8f\u6267\u884c\u54cd\u5e94\u63d2\u4ef6" --\x3e locationResponsePluginListB\n\n    locationResponsePluginListA --\x3e response\n    locationResponsePluginListB --\x3e response\n\n    response["HTTP\u54cd\u5e94"] --\x3e stop("\u65e5\u5fd7\u8bb0\u5f55");'}),"\n",(0,t.jsx)(e.p,{children:"Pingap\u6838\u5fc3\u90e8\u5206\u529f\u80fd\u4e3b\u8981\u5904\u7406\u4ee5\u4e0b\u903b\u8f91(\u66f4\u4e30\u5bcc\u7684\u529f\u80fd\u5219\u7531\u5404\u79cd\u4e0d\u540c\u7684\u63d2\u4ef6\u5b9e\u73b0)\uff1a"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u6839\u636epath\u4e0ehost\u9009\u62e9\u5bf9\u5e94\u7684location\uff0cpath\u652f\u6301\u524d\u7f00\u3001\u6b63\u5219\u4ee5\u53ca\u5168\u5339\u914d\u4e09\u79cd\u6a21\u5f0f"}),"\n",(0,t.jsx)(e.li,{children:"location\u6839\u636e\u914d\u7f6e\u91cd\u5199path\u4ee5\u53ca\u6dfb\u52a0\u76f8\u5e94\u7684\u8bf7\u6c42\u5934"}),"\n",(0,t.jsx)(e.li,{children:"\u6267\u884c\u76f8\u5e94\u7684\u8f6c\u53d1\u4e2d\u95f4\u4ef6"}),"\n",(0,t.jsx)(e.li,{children:"\u6267\u884c\u76f8\u5e94\u7684\u54cd\u5e94\u4e2d\u95f4\u4ef6"}),"\n",(0,t.jsx)(e.li,{children:"\u6839\u636e\u914d\u7f6e\u7684\u65e5\u5fd7\u683c\u5f0f\u8f93\u51fa\u5bf9\u5e94\u7684\u8bbf\u95ee\u65e5\u5fd7"}),"\n"]}),"\n",(0,t.jsx)(e.h2,{id:"\u63d2\u4ef6\u4f53\u7cfb",children:"\u63d2\u4ef6\u4f53\u7cfb"}),"\n",(0,t.jsx)(e.p,{children:"Pingap\u7684\u63d2\u4ef6\u4e3b\u8981\u5206\u4e3a\u4e24\u7c7b\uff0c\u8bf7\u6c42\u524d\u6216\u54cd\u5e94\u540e\u7684\u5904\u7406\uff0c\u63d0\u4f9b\u538b\u7f29\u3001\u7f13\u5b58\u3001\u8ba4\u8bc1\u3001\u6d41\u63a7\u7b49\u5404\u79cd\u4e0d\u540c\u573a\u666f\u7684\u5e94\u7528\u9700\u6c42\u3002\u63d2\u4ef6\u662f\u6dfb\u52a0\u81f3location\u7684\uff0c\u53ef\u6839\u636e\u4e0d\u540c\u9700\u6c42\u914d\u7f6e\u5404\u79cd\u4e0d\u540c\u7684\u63d2\u4ef6\u540e\uff0c\u5728location\u6dfb\u52a0\u5bf9\u5e94\u7684\u63d2\u4ef6\uff0c\u5b9e\u73b0\u4e0d\u540c\u7684\u529f\u80fd\u7ec4\u5408\u3002\u6ce8\u610f\u63d2\u4ef6\u662f\u6309\u987a\u5e8f\u6267\u884c\u7684\uff0c\u6309\u9700\u8c03\u6574\u5176\u987a\u5e8f\u3002"}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.a,{href:"/pingap-zh/docs/plugin",children:"\u63d2\u4ef6\u4f53\u7cfb"})}),"\n",(0,t.jsx)(e.h2,{id:"\u8bbf\u95ee\u65e5\u5fd7\u683c\u5f0f\u5316",children:"\u8bbf\u95ee\u65e5\u5fd7\u683c\u5f0f\u5316"}),"\n",(0,t.jsx)(e.p,{children:"\u73b0\u5728\u65e5\u5fd7\u662f\u6309server\u6765\u914d\u7f6e\uff0c\u56e0\u6b64\u8be5server\u4e0b\u7684\u6240\u6709location\u5171\u7528\uff0c\u5df2\u652f\u6301\u5404\u79cd\u4e0d\u540c\u7684\u5360\u4f4d\u7b26\uff0c\u6309\u9700\u914d\u7f6e\u4e0d\u540c\u7684\u8bbf\u95ee\u65e5\u5fd7\u8f93\u51fa\u3002"}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.a,{href:"/pingap-zh/docs/log",children:"\u65e5\u5fd7\u683c\u5f0f\u5316\u8be6\u7ec6\u8bf4\u660e"})}),"\n",(0,t.jsx)(e.h2,{id:"\u5e94\u7528\u914d\u7f6e",children:"\u5e94\u7528\u914d\u7f6e"}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.a,{href:"/pingap-zh/docs/config",children:"\u5e94\u7528\u914d\u7f6e\u8be6\u7ec6\u8bf4\u660e"})})]})}function p(n={}){const{wrapper:e}={...(0,l.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(d,{...n})}):d(n)}}}]);