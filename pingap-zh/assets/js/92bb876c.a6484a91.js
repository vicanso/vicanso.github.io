"use strict";(self.webpackChunkpingap=self.webpackChunkpingap||[]).push([[9184],{8863:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>r,contentTitle:()=>t,default:()=>o,frontMatter:()=>d,metadata:()=>s,toc:()=>p});const s=JSON.parse('{"id":"getting_started","title":"\u5165\u95e8\u6559\u7a0b","description":"\u672c\u7ae0\u8282\u4ecb\u7ecd\u4ece\u96f6\u5f00\u59cb\u5982\u4f55\u521b\u5efa\u53cd\u5411\u4ee3\u7406\uff0c\u7531\u4e8epingora\u7684\u70ed\u66f4\u65b0\u91cd\u542f\u4f1a\u5173\u95ed\u5f53\u524d\u8fdb\u7a0b\uff0c\u6682\u65f6pingap\u4e5f\u53ea\u80fd\u4f7f\u7528\u6b64\u65b9\u5f0f\uff0c\u56e0\u6b64\u4ee5\u4e0b\u7684\u793a\u4f8b\u5747\u662f\u4ee5\u540e\u53f0\u8fdb\u7a0b\u7684\u5f62\u5f0f\u8fd0\u884c\u3002pingap\u5bf9\u4e8e\u7ecf\u5e38\u53d8\u66f4\u7684upstream\u3001location\u3001certificate\u4ee5\u53caplugin\u7b49\u589e\u52a0\u4e86\u51c6\u5b9e\u65f6\u5237\u65b0\u673a\u5236\u4e14\u65e0\u9700\u91cd\u542f\uff0c\u5efa\u8bae\u82e5\u53d8\u66f4\u914d\u7f6e\u4ec5\u9700\u652f\u6301\u70ed\u66f4\u65b0\u5219\u4f7f\u7528--autoreload\u542f\u7528\uff0c\u800cserver\u7b49\u914d\u7f6e\u4e5f\u7ecf\u5e38\u53d8\u5316\u5219\u52a0--autorestart\u53c2\u6570\u3002","source":"@site/docs/getting_started.md","sourceDirName":".","slug":"/getting_started","permalink":"/pingap-zh/docs/getting_started","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/getting_started.md","tags":[],"version":"current","sidebarPosition":11,"frontMatter":{"sidebar_position":11},"sidebar":"tutorialSidebar","previous":{"title":"Pingap\u7b80\u8ff0","permalink":"/pingap-zh/docs/introduction"},"next":{"title":"\u547d\u4ee4\u884c\u53c2\u6570","permalink":"/pingap-zh/docs/argument"}}');var c=i(4848),a=i(8453);const d={sidebar_position:11},t="\u5165\u95e8\u6559\u7a0b",r={},p=[{value:"\u9009\u62e9\u914d\u7f6e\u5b58\u50a8\u76ee\u5f55",id:"\u9009\u62e9\u914d\u7f6e\u5b58\u50a8\u76ee\u5f55",level:2},{value:"\u542f\u7528WEB\u7ba1\u7406\u540e\u53f0\u914d\u7f6e",id:"\u542f\u7528web\u7ba1\u7406\u540e\u53f0\u914d\u7f6e",level:2},{value:"\u57fa\u7840\u914d\u7f6e",id:"\u57fa\u7840\u914d\u7f6e",level:2},{value:"\u4e0a\u6e38\u670d\u52a1\u914d\u7f6e",id:"\u4e0a\u6e38\u670d\u52a1\u914d\u7f6e",level:2},{value:"Location\u914d\u7f6e",id:"location\u914d\u7f6e",level:2},{value:"\u670d\u52a1\u914d\u7f6e",id:"\u670d\u52a1\u914d\u7f6e",level:2},{value:"\u7a0b\u5e8f\u540e\u53f0\u8fd0\u884c\u53ca\u81ea\u52a8\u91cd\u542f",id:"\u7a0b\u5e8f\u540e\u53f0\u8fd0\u884c\u53ca\u81ea\u52a8\u91cd\u542f",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.header,{children:(0,c.jsx)(n.h1,{id:"\u5165\u95e8\u6559\u7a0b",children:"\u5165\u95e8\u6559\u7a0b"})}),"\n",(0,c.jsxs)(n.p,{children:["\u672c\u7ae0\u8282\u4ecb\u7ecd\u4ece\u96f6\u5f00\u59cb\u5982\u4f55\u521b\u5efa\u53cd\u5411\u4ee3\u7406\uff0c\u7531\u4e8epingora\u7684\u70ed\u66f4\u65b0\u91cd\u542f\u4f1a\u5173\u95ed\u5f53\u524d\u8fdb\u7a0b\uff0c\u6682\u65f6pingap\u4e5f\u53ea\u80fd\u4f7f\u7528\u6b64\u65b9\u5f0f\uff0c\u56e0\u6b64\u4ee5\u4e0b\u7684\u793a\u4f8b\u5747\u662f\u4ee5\u540e\u53f0\u8fdb\u7a0b\u7684\u5f62\u5f0f\u8fd0\u884c\u3002pingap\u5bf9\u4e8e\u7ecf\u5e38\u53d8\u66f4\u7684upstream\u3001location\u3001certificate\u4ee5\u53caplugin\u7b49\u589e\u52a0\u4e86\u51c6\u5b9e\u65f6\u5237\u65b0\u673a\u5236\u4e14\u65e0\u9700\u91cd\u542f\uff0c\u5efa\u8bae\u82e5\u53d8\u66f4\u914d\u7f6e\u4ec5\u9700\u652f\u6301\u70ed\u66f4\u65b0\u5219\u4f7f\u7528",(0,c.jsx)(n.code,{children:"--autoreload"}),"\u542f\u7528\uff0c\u800cserver\u7b49\u914d\u7f6e\u4e5f\u7ecf\u5e38\u53d8\u5316\u5219\u52a0",(0,c.jsx)(n.code,{children:"--autorestart"}),"\u53c2\u6570\u3002"]}),"\n",(0,c.jsx)(n.h2,{id:"\u9009\u62e9\u914d\u7f6e\u5b58\u50a8\u76ee\u5f55",children:"\u9009\u62e9\u914d\u7f6e\u5b58\u50a8\u76ee\u5f55"}),"\n",(0,c.jsx)(n.p,{children:"pingap\u652f\u6301etcd\u65b9\u5f0f\u5b58\u50a8\u914d\u7f6e\uff0c\u800c\u6587\u4ef6\u4e0eetcd\u7684\u5f62\u5f0f\u4ec5\u662f\u542f\u52a8\u53c2\u6570\u4e0a\u7684\u5dee\u5f02\uff0c\u56e0\u6b64\u793a\u4f8b\u9009\u62e9\u4f7f\u7528\u6587\u4ef6\u65b9\u5f0f\u5b58\u50a8\uff0c\u65b9\u4fbf\u5927\u5bb6\u5c1d\u8bd5\u3002"}),"\n",(0,c.jsx)(n.p,{children:"pingap\u4ee5\u6587\u4ef6\u4fdd\u5b58\u914d\u7f6e\u65f6\uff0c\u82e5\u6307\u5b9a\u7684\u662f\u76ee\u5f55\u5219\u4f1a\u6309\u7c7b\u522b\u751f\u6210\u4e0d\u540c\u7684toml\u914d\u7f6e\uff0c\u82e5\u6307\u5b9a\u7684\u662f\u6587\u4ef6\uff0c\u5219\u6240\u6709\u914d\u7f6e\u5747\u4fdd\u5b58\u81f3\u8be5\u6587\u4ef6\u4e2d\uff0c\u5efa\u8bae\u4f7f\u7528\u76ee\u5f55\u7684\u5f62\u5f0f(web admin\u7ba1\u7406\u914d\u7f6e\u65f6\u4f7f\u7528\u6b64\u5f62\u5f0f)\u3002"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"RUST_LOG=INFO pingap -c /opt/pingap/conf\n"})}),"\n",(0,c.jsx)(n.p,{children:"\u9009\u62e9\u8be5\u76ee\u5f55\u540e\uff0c\u9ed8\u8ba4\u4f1a\u52a0\u8f7d\u8be5\u76ee\u5f55\u4e0b\u7684\u6240\u6709toml\u914d\u7f6e\uff0c\u7531\u4e8e\u5f53\u524d\u76ee\u5f55\u4e3a\u7a7a\uff0c\u56e0\u6b64\u672a\u6709\u4f55\u5b9e\u9645\u7684\u6548\u679c\u3002"}),"\n",(0,c.jsx)(n.h2,{id:"\u542f\u7528web\u7ba1\u7406\u540e\u53f0\u914d\u7f6e",children:"\u542f\u7528WEB\u7ba1\u7406\u540e\u53f0\u914d\u7f6e"}),"\n",(0,c.jsxs)(n.p,{children:["toml\u7684\u76f8\u5173\u914d\u7f6e\u53ef\u4ee5\u67e5\u9605",(0,c.jsx)(n.a,{href:"/pingap-zh/docs/config",children:"\u5e94\u7528\u914d\u7f6e\u8be6\u7ec6\u8bf4\u660e"}),"\uff0c\u5efa\u8bae\u4f7f\u7528WEB\u7ba1\u7406\u540e\u53f0\u7684\u65b9\u5f0f\u914d\u7f6e\u3002WEB\u7ba1\u7406\u540e\u53f0\u652f\u6301basic auth\u7684\u65b9\u5f0f\u9274\u6743\uff08\u53ef\u9009\uff09\uff0c\u4e0b\u9762\u901a\u8fc7127.0.0.1:3018\u7aef\u53e3\u63d0\u4f9b\u7ba1\u7406\u540e\u53f0\u670d\u52a1\uff0c\u8d26\u53f7\u4e3a\uff1apingap\uff0c\u5bc6\u7801\u4e3a\uff1a123123\u3002\u8ba4\u8bc1\u4e5f\u53ef\u4ee5\u4f7f\u7528base64\u5b57\u7b26\u4e32",(0,c.jsx)(n.code,{children:"cGluZ2FwOjEyMzEyMw=="}),'\u4e3abase64("pingap:123123")\u3002\u82e5\u5e0c\u671b\u590d\u7528\u5bf9\u5916\u7684server\u7aef\u53e3\uff08\u598280\uff09\uff0c\u5219\u53ef\u914d\u7f6e\u65f6\u6307\u5b9a\u524d\u7f00\u7684\u5f62\u5f0f\u3002']}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:'RUST_LOG=INFO pingap -c /opt/pingap/conf --admin=pingap:123123@127.0.0.1:3018\n#  base64("pingap:123123")\nRUST_LOG=INFO pingap -c /opt/pingap/conf --admin=cGluZ2FwOjEyMzEyMw==@127.0.0.1:3018\n\nsudo RUST_LOG=INFO pingap -c /opt/pingap/conf --admin=pingap:123123@127.0.0.1:80/pingap\n'})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"Pingap",src:i(3198).A+"",width:"1978",height:"932"})}),"\n",(0,c.jsxs)(n.p,{children:["\u542f\u52a8\u6210\u529f\u540e\u8bbf\u95ee",(0,c.jsx)(n.code,{children:"http://127.0.0.1:3018/"}),"\u53ef\u4ee5\u770b\u5230\uff0c\u8be5\u754c\u9762\u652f\u6301\u4e86\u5404\u7c7b\u5c5e\u6027\u914d\u7f6e\uff0c\u540e\u7eed\u5c06\u4e00\u4e2a\u4e2a\u8bb2\u89e3\u3002\u9700\u8981\u6ce8\u610f\uff0c\u7ba1\u7406\u540e\u53f0\u9ed8\u8ba4\u9488\u5bf9\u591a\u6b21\u5bc6\u7801\u9519\u8bef\u7684IP\u4f1a\u9501\u5b9a5\u5206\u949f\u7981\u6b62\u5c1d\u8bd5\u3002"]}),"\n",(0,c.jsx)(n.h2,{id:"\u57fa\u7840\u914d\u7f6e",children:"\u57fa\u7840\u914d\u7f6e"}),"\n",(0,c.jsxs)(n.p,{children:["\u57fa\u7840\u914d\u7f6e\u4e2d\u4e00\u822c\u4e0d\u9700\u8981\u5982\u4f55\u8c03\u6574\uff0c\u5927\u90e8\u5206\u9ed8\u8ba4\u914d\u7f6e\u5373\u53ef\u6ee1\u8db3\u5e94\u7528\u9700\u6c42\u3002\u82e5\u5728\u540c\u4e00\u673a\u5668\u8fd0\u884c\u591a\u4e2apingap\uff0c\u5219\u9700\u8981\u8bbe\u7f6e",(0,c.jsx)(n.code,{children:"\u8fdb\u7a0bid\u6587\u4ef6"}),"\u4e0e",(0,c.jsx)(n.code,{children:"upgrade sock"}),"\u8fd9\u4e24\u4e2a\u914d\u7f6e\uff0c\u907f\u514d\u51b2\u7a81\u3002\u82e5\u975e\u5fc5\u8981\u4e0d\u5efa\u8bae\u540c\u4e00\u673a\u5668\u542f\u52a8\u591a\u4e2apingap\u5b9e\u4f8b\uff0c\u591a\u7aef\u53e3\u5bf9\u5e94\u4e0d\u540c\u670d\u52a1\u53ef\u901a\u8fc7\u914d\u7f6e\u4e0d\u540c\u7684server\u6765\u5b9e\u73b0\u3002"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"Pingap Basic Config",src:i(1474).A+"",width:"1982",height:"972"})}),"\n",(0,c.jsx)(n.h2,{id:"\u4e0a\u6e38\u670d\u52a1\u914d\u7f6e",children:"\u4e0a\u6e38\u670d\u52a1\u914d\u7f6e"}),"\n",(0,c.jsx)(n.p,{children:"\u7531\u4e8e\u914d\u7f6e\u4e2d\u6709\u4f9d\u8d56\u5173\u7cfb\uff0c\u56e0\u6b64\u5148\u914d\u7f6e\u4e0a\u6e38\u670d\u52a1\u3002\u70b9\u51fb\u6dfb\u52a0\u4e0a\u6e38\u670d\u52a1\u914d\u7f6e\uff0c\u754c\u9762\u5982\u4e0b\uff1a"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"Pingap Upstream Config",src:i(864).A+"",width:"1988",height:"784"})}),"\n",(0,c.jsxs)(n.p,{children:["\u5730\u5740\u914d\u7f6e\u7684\u662f",(0,c.jsx)(n.code,{children:"ip:\u7aef\u53e3"}),"\u7684\u5f62\u5f0f\uff0c\u65e0\u9700\u6307\u5b9a\u534f\u8bae\uff0c\u9ed8\u8ba4\u4e3ahttp\uff0c\u82e5\u6709\u914d\u7f6e",(0,c.jsx)(n.code,{children:"sni"}),"\u5219\u8ba4\u4e3a\u662f\u4ee5https\u7684\u5f62\u5f0f\u8bbf\u95ee\u4e0a\u6e38\u8282\u70b9\u3002"]}),"\n",(0,c.jsxs)(n.p,{children:["\u867d\u7136\u5927\u90e8\u5206\u7684\u914d\u7f6e\u5747\u53ef\u4e0d\u914d\u7f6e\uff0c\u4f46\u5efa\u8bae\u5c55\u5f00\u66f4\u591a\u914d\u7f6e\uff0c\u6309\u9700\u8bbe\u7f6e\u5404\u8d85\u65f6\u7684\u503c\uff0c\u9ed8\u8ba4\u503c\u65e0\u8d85\u65f6\u4e0d\u5efa\u8bae\u4f7f\u7528\u3002",(0,c.jsx)(n.code,{children:"sni"}),"\u4e0e",(0,c.jsx)(n.code,{children:"\u662f\u5426\u6821\u9a8c\u8bc1\u4e66"}),"\u7528\u4e8e\u8be5upstream\u7684\u8282\u70b9\u4f7f\u7528https\u65f6\u8bbe\u7f6e\uff0c\u82e5\u975ehttps\u5ffd\u7565\u5373\u53ef\u3002\u5065\u5eb7\u68c0\u67e5\u7684",(0,c.jsx)(n.code,{children:"http://charts/ping"}),"\u5176\u4e2dcharts\u4e3a\u6307\u5b9a\u8bf7\u6c42\u65f6\u7684Host\uff0c\u771f\u6b63\u68c0\u6d4b\u65f6\u4f1a\u8fde\u63a5\u914d\u7f6eupstream\u5730\u5740\u8fde\u63a5\uff0c\u5e76\u975e\u5728\u5065\u5eb7\u68c0\u67e5\u65f6\u89e3\u6790\u57df\u540d\u3002"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"Pingap Upstream Detail",src:i(147).A+"",width:"1982",height:"726"})}),"\n",(0,c.jsx)(n.h2,{id:"location\u914d\u7f6e",children:"Location\u914d\u7f6e"}),"\n",(0,c.jsx)(n.p,{children:"Location\u4e3b\u8981\u914d\u7f6e\u5176\u5bf9\u5e94\u7684host\u4e0epath\uff0c\u4ee5\u53ca\u9009\u62e9\u5173\u8054\u5bf9\u5e94\u7684\u4e0a\u6e38\u670d\u52a1\uff0c\u754c\u9762\u5982\u4e0b\uff1a"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"Pingap Location Detail",src:i(5730).A+"",width:"1974",height:"970"})}),"\n",(0,c.jsxs)(n.p,{children:["host\u6839\u636e\u63d0\u4f9b\u670d\u52a1\u7684\u57df\u540d\u8bbe\u7f6e\uff0c\u5982\u679c\u591a\u4e2a\u57df\u540d\u5219\u4f7f\u7528",(0,c.jsx)(n.code,{children:","}),"\u5206\u9694\u6216\u8005\u4ee5",(0,c.jsx)(n.code,{children:"~"}),"\u5f00\u5934\u7684\u6b63\u5219\u8868\u8fbe\u5f0f\u5339\u914d\u5f62\u5f0f\uff0c\u82e5\u6240\u6709\u670d\u52a1\u5747\u4f7f\u7528\u540c\u4e00\u57df\u540d\uff0c\u4e5f\u53ef\u4e0d\u8bbe\u7f6e\u3002 path\u5219\u662f\u57fa\u4e8e\u4e0d\u540c\u7684\u524d\u7f00\u8f6c\u53d1\u81f3\u4e0d\u540c\u7684\u670d\u52a1\uff0c\u56e0\u6b64\u4f1a\u8bbe\u7f6e\u5bf9\u5e94\u7684path\u5339\u914d\u89c4\u5219\uff08\u66f4\u591a\u7684\u89c4\u5219\u53ef\u67e5\u8be2location\u7684\u8be6\u7ec6\u8bf4\u660e\uff09\u3002\u9700\u8981\u6ce8\u610f\u652f\u6301\u7684\u4e24\u79cd\u8bf7\u6c42\u5934\u5904\u7406\u65b9\u5f0f\uff0c",(0,c.jsx)(n.code,{children:"\u8bbe\u7f6e\u8f6c\u53d1\u8bf7\u6c42\u5934"}),"\u4f1a\u8986\u76d6\u539f\u6709\u7684\u503c\uff0c\u4f8b\u5982\u5bf9\u4e8e\u8bbe\u7f6e",(0,c.jsx)(n.code,{children:"Host"}),"\u7b49\u552f\u4e00\u8bf7\u6c42\u5934\u4f7f\u7528\u3002",(0,c.jsx)(n.code,{children:"\u6dfb\u52a0\u8f6c\u53d1\u8bf7\u6c42\u5934"}),"\u5219\u4e0d\u5f71\u54cd\u539f\u6709\u7684\u503c\uff0c\u800c\u662f\u65b0\u6dfb\u52a0\u8bf7\u6c42\u5934\u3002\u8def\u7531\u91cd\u5199\u5219\u662f\u4ee5\u6b63\u5219\u8868\u8fbe\u5f0f\u7684\u5f62\u5f0f\u914d\u7f6e\uff0c\u5339\u914d\u503c\u4e0e\u66ff\u6362\u503c\u4ee5",(0,c.jsx)(n.code,{children:" "}),"\u7a7a\u683c\u5206\u5f00\u3002"]}),"\n",(0,c.jsxs)(n.p,{children:["\u5bf9\u4e8e\u8f6c\u53d1\u81f3upstream\u65f6\uff0c\u6709\u4e9bupstream\u672c\u8eab\u4e5f\u662f\u53cd\u5411\u4ee3\u7406\uff0c\u4e14\u57fa\u4e8ehost\u5339\u914d\uff0c\u90a3\u4e48\u5219\u9700\u8981\u5728location\u6b64\u5904\u8bbe\u7f6e\u5bf9\u5e94\u7684",(0,c.jsx)(n.code,{children:"Host"}),"\u8bf7\u6c42\u5934\u3002"]}),"\n",(0,c.jsx)(n.h2,{id:"\u670d\u52a1\u914d\u7f6e",children:"\u670d\u52a1\u914d\u7f6e"}),"\n",(0,c.jsxs)(n.p,{children:["\u670d\u52a1\u914d\u7f6e\u4e3b\u8981\u914d\u7f6e\u8be5\u670d\u52a1\u76d1\u542c\u7684\u670d\u52a1\u5730\u5740\uff0c\u82e5\u8981\u76d1\u542c\u591a\u4e2a\u670d\u52a1\u5730\u5740\uff0c\u4ee5",(0,c.jsx)(n.code,{children:","}),"\u5206\u9694\u5373\u53ef\uff0c\u5982",(0,c.jsx)(n.code,{children:"127.0.0.1:3001,[::1]:3001"}),"\u8868\u793a\u76d1\u542cIpv4\u4e0eIpv6\u7684",(0,c.jsx)(n.code,{children:"3001"}),"\u7aef\u53e3\u3002\u8bbf\u95ee\u65e5\u5fd7\u683c\u5f0f\u5316\u6a21\u677f\u9700\u8981\u914d\u7f6e\u540e\u624d\u6709\u5bf9\u5e94\u7684\u8bbf\u95ee\u65e5\u5fd7\uff0c\u63d0\u4f9b\u4e86\u56db\u79cd\u9ed8\u8ba4\u7c7b\u578b",(0,c.jsx)(n.code,{children:"tiny"}),", ",(0,c.jsx)(n.code,{children:"short"}),", ",(0,c.jsx)(n.code,{children:"common"}),"\u4ee5\u53ca",(0,c.jsx)(n.code,{children:"combined"}),"\uff0c\u5efa\u8bae\u6309\u8bf4\u660e\u81ea\u5b9a\u4e49\u914d\u7f6e\u5bf9\u5e94\u7684\u683c\u5f0f\uff0c\u800c\u975e\u9009\u62e9\u9ed8\u8ba4\u7c7b\u578b\u3002\u670d\u52a1\u7ebf\u7a0b\u6570\u9ed8\u8ba4\u4e3a1(\u9700\u8981\u6ce8\u610f\u8c03\u6574\u7ebf\u7a0b\u6570\u6027\u80fd\u5e76\u4e0d\u4f1a\u500d\u6570\u589e\u957f\uff09\uff0c\u5bf9\u4e8e\u4e00\u822c\u7684\u8f6c\u53d1\u670d\u52a1\u5df2\u8db3\u591f\u4f7f\u7528\u3002"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"Pingap Location Detail",src:i(8326).A+"",width:"1976",height:"772"})}),"\n",(0,c.jsx)(n.h2,{id:"\u7a0b\u5e8f\u540e\u53f0\u8fd0\u884c\u53ca\u81ea\u52a8\u91cd\u542f",children:"\u7a0b\u5e8f\u540e\u53f0\u8fd0\u884c\u53ca\u81ea\u52a8\u91cd\u542f"}),"\n",(0,c.jsx)(n.p,{children:"\u7a0b\u5e8f\u7684\u914d\u7f6e\u5747\u5df2\u5b8c\u6210\uff0c\u7531\u4e8e\u6b64\u65f6\u7a0b\u5e8f\u52a0\u8f7d\u7684\u914d\u7f6e\u975e\u6700\u65b0\u7248\u672c\uff0c\u56e0\u6b64\u9700\u8981\u91cd\u542f\u7a0b\u5e8f\u52a0\u8f7d\u65b0\u7684\u914d\u7f6e\u3002Pingap\u4e5f\u652f\u6301\u5224\u65ad\u914d\u7f6e\u662f\u5426\u6709\u66f4\u65b0\uff0c\u82e5\u6709\u66f4\u65b0\u5219\u81ea\u52a8\u89e6\u53d1upgrade\u7684\u64cd\u4f5c\uff0c\u62c9\u8d77\u65b0\u7684\u5b9e\u4f8b\u5e76\u5173\u95ed\u5f53\u524d\u5b9e\u4f8b\u3002"}),"\n",(0,c.jsx)(n.p,{children:"\u6700\u540e\u8c03\u6574\u540e\u7684\u7a0b\u5e8f\u542f\u52a8\u547d\u4ee4\u4e3a\u5305\u62ec\u4ee5\u4e0b\u65b9\u9762\uff1a"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:"\u7a0b\u5e8f\u4ee5\u540e\u53f0\u670d\u52a1\u8fd0\u884c"}),"\n",(0,c.jsx)(n.li,{children:"\u7a0b\u5e8f\u81ea\u52a8\u68c0\u6d4b\u914d\u7f6e\u662f\u5426\u66f4\u65b0\uff0c\u82e5\u6709\u66f4\u65b0\u5219\u91cd\u542f\u3002\u82e5\u53ea\u662fupstream\u4e0elocation\u7b49\u7684\u66f4\u65b0\uff0c\u5219\u51c6\u5b9e\u65f6\u5237\u65b0\uff0c\u65e0\u9700\u91cd\u542f"}),"\n",(0,c.jsx)(n.li,{children:"\u65e5\u5fd7\u5199\u5165\u81f3/opt/pingap/pingap.log"}),"\n"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"RUST_LOG=INFO pingap -c /opt/pingap/conf \\\n  -d --log=/opt/pingap/pingap.log \\\n  --autorestart \\\n  --admin=pingap:123123@127.0.0.1:3018\n"})}),"\n",(0,c.jsxs)(n.p,{children:["\u81f3\u6b64\u53cd\u5411\u4ee3\u7406\u670d\u52a1\u5df2\u5b8c\u6210\u914d\u7f6e\uff0c\u6d4f\u89c8\u5668\u6253\u5f00",(0,c.jsx)(n.code,{children:"http://127.0.0.1:6188/charts/"}),"\u53ef\u6b63\u5e38\u8bbf\u95ee\uff0c\u622a\u56fe\u5982\u4e0b\uff1a"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.img,{alt:"Pingap Demo",src:i(9144).A+"",width:"2200",height:"704"})}),"\n",(0,c.jsxs)(n.p,{children:["\u63a5\u7740\u6765\u8c03\u6574\u76f8\u5e94\u7684\u914d\u7f6e\uff0c\u770b\u770b\u5b9e\u4f8b\u662f\u5426\u6b63\u5e38\u91cd\u542f\u5e76\u751f\u6548\uff0c\u5c06",(0,c.jsx)(n.code,{children:"location"}),"\u4e2d\u7684path\u7531",(0,c.jsx)(n.code,{children:"/charts"}),"\u8c03\u6574\u4e3a",(0,c.jsx)(n.code,{children:"/pingap"}),"\uff0c\u4ee5\u53ca",(0,c.jsx)(n.code,{children:"rewrite"}),"\u914d\u7f6e\uff0c\u67e5\u770b\u65e5\u5fd7\u770b\u770b\u6548\u679c\u5982\u4f55\uff1a"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{children:"2024-06-30T13:04:28.524079+08:00  INFO reload location success\n"})}),"\n",(0,c.jsxs)(n.p,{children:["\u9700\u8981\u6ce8\u610f\uff0c\u56e0\u4e3a\u907f\u514d\u9891\u7e41\u66f4\u65b0\u914d\u7f6e\u65f6\u5bfc\u81f4\u91cd\u590d\u7684\u91cd\u542f\uff0c\u914d\u7f6e\u68c0\u6d4b\u53ea\u4f1a\u5b9a\u65f6\u68c0\u6d4b(\u73b0\u9ed8\u8ba4\u4e3a90\u79d2\uff0creload\u5219\u4e3a10\u79d2\u68c0\u6d4b\u4e00\u6b21)\uff0c\u7a0b\u5e8f\u91cd\u542f\u4e5f\u907f\u514d\u8fc7\u4e8e\u9891\u7e41\uff0c\u56e0\u6b64\u9700\u8981\u914d\u7f6e\u66f4\u65b0\u540e\uff0c\u5927\u6982\u9700\u8981\u7b49\u5f852\u5206\u949f\u624d\u4f1a\u771f\u6b63\u89e6\u53d1upgrade\u64cd\u4f5c\u3002\u90e8\u5206\u914d\u7f6e\uff0c\u5982",(0,c.jsx)(n.code,{children:"upstream"}),"\u4e0e",(0,c.jsx)(n.code,{children:"location"}),"\u7b49\u5df2\u5b9e\u73b0\u70ed\u66f4\u65b0\uff0c\u7a0b\u5e8f\u65e0\u9700\u91cd\u542f\u5373\u53ef\u5b9e\u73b0\u914d\u7f6e\u66f4\u65b0\u3002\u5b8c\u6210\u540e\u6253",(0,c.jsx)(n.code,{children:"http://127.0.0.1:6188/charts/"}),"\uff0c\u9700\u8981\u6ce8\u610f\u5728linux\u624d\u53ef\u6b63\u5e38\u7684\u89e6\u53d1upgrade\u7684\u66f4\u65b0\u5207\u6362\u3002"]})]})}function o(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(l,{...e})}):l(e)}},1474:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/basic-info-zh-264b5b6588eb1e7a591927ede0dafd83.jpg"},9144:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/demo-zh-9f79b327b1669020d92805b8420d5aa0.jpg"},5730:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/location-detail-zh-1ffa19e21cfda9393142ecbb76e93fad.jpg"},3198:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/pingap-zh-21c6b8586910fc104fb3768b7ddab968.jpg"},8326:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/server-detail-zh-ddbae64b0bd315ef5fe0fc75562d8287.jpg"},864:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/upstream-add-zh-88feb5814dcf92181fee93c20ef8317b.jpg"},147:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/upstream-detail-zh-afce66eb88868b0662fa41e54bd06c67.jpg"}}]);