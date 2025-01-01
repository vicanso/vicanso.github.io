"use strict";(self.webpackChunkpingap=self.webpackChunkpingap||[]).push([[8280],{5778:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>l,contentTitle:()=>n,default:()=>o,frontMatter:()=>c,metadata:()=>d,toc:()=>h});const d=JSON.parse('{"id":"certificate","title":"HTTPS \u8bc1\u4e66\u7ba1\u7406","description":"Pingap \u63d0\u4f9b\u7edf\u4e00\u7684 HTTPS \u8bc1\u4e66\u7ba1\u7406\u529f\u80fd\uff0c\u5305\u62ec\uff1a","source":"@site/docs/certificate.md","sourceDirName":".","slug":"/certificate","permalink":"/pingap-zh/docs/certificate","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/certificate.md","tags":[],"version":"current","sidebarPosition":69,"frontMatter":{"sidebar_position":69},"sidebar":"tutorialSidebar","previous":{"title":"\u65e5\u5fd7\u683c\u5f0f\u5316","permalink":"/pingap-zh/docs/log"},"next":{"title":"\u63d2\u4ef6\u4f53\u7cfb","permalink":"/pingap-zh/docs/plugin"}}');var i=t(4848),r=t(8453);const c={sidebar_position:69},n="HTTPS \u8bc1\u4e66\u7ba1\u7406",l={},h=[{value:"\u914d\u7f6e\u53c2\u6570\u8bf4\u660e",id:"\u914d\u7f6e\u53c2\u6570\u8bf4\u660e",level:2}];function a(e){const s={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"https-\u8bc1\u4e66\u7ba1\u7406",children:"HTTPS \u8bc1\u4e66\u7ba1\u7406"})}),"\n",(0,i.jsx)(s.p,{children:"Pingap \u63d0\u4f9b\u7edf\u4e00\u7684 HTTPS \u8bc1\u4e66\u7ba1\u7406\u529f\u80fd\uff0c\u5305\u62ec\uff1a"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Let's Encrypt \u8bc1\u4e66\u7684\u4e00\u952e\u7533\u8bf7"}),"\n",(0,i.jsx)(s.li,{children:"\u8bc1\u4e66\u81ea\u52a8\u7eed\u671f"}),"\n",(0,i.jsx)(s.li,{children:"\u8bc1\u4e66\u6709\u6548\u671f\u76d1\u63a7\u548c\u544a\u8b66"}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"\u914d\u7f6e\u53c2\u6570\u8bf4\u660e",children:"\u914d\u7f6e\u53c2\u6570\u8bf4\u660e"}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{children:"\u53c2\u6570"}),(0,i.jsx)(s.th,{children:"\u8bf4\u660e"})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(s.code,{children:"domains"})}),(0,i.jsxs)(s.td,{children:["\u8bc1\u4e66\u57df\u540d\u5217\u8868\uff0c\u591a\u4e2a\u57df\u540d\u7528\u9017\u53f7\u5206\u9694\u3002\u652f\u6301\u901a\u914d\u7b26\u57df\u540d\uff08\u5982 ",(0,i.jsx)(s.code,{children:"*.example.com"}),"\uff09"]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(s.code,{children:"tls_cert"})}),(0,i.jsx)(s.td,{children:"\u8bc1\u4e66\u516c\u94a5\u6570\u636e\uff08PEM \u683c\u5f0f\uff09\u3002\u4f7f\u7528 ACME \u65b9\u5f0f\u7533\u8bf7\u65f6\u4f1a\u81ea\u52a8\u66f4\u65b0"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(s.code,{children:"tls_key"})}),(0,i.jsx)(s.td,{children:"\u8bc1\u4e66\u79c1\u94a5\u6570\u636e\uff08PEM \u683c\u5f0f\uff09\u3002\u4f7f\u7528 ACME \u65b9\u5f0f\u7533\u8bf7\u65f6\u4f1a\u81ea\u52a8\u66f4\u65b0"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(s.code,{children:"tls_chain"})}),(0,i.jsx)(s.td,{children:"\u8bc1\u4e66\u94fe\u6570\u636e\uff08PEM \u683c\u5f0f\uff09\uff0c\u7528\u4e8e\u4f18\u5316\u8bc1\u4e66\u9a8c\u8bc1\u6d41\u7a0b\u3002Let's Encrypt \u8bc1\u4e66\u65e0\u9700\u914d\u7f6e\uff0c\u5df2\u5185\u7f6e"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(s.code,{children:"is_default"})}),(0,i.jsx)(s.td,{children:"\u662f\u5426\u8bbe\u4e3a\u9ed8\u8ba4\u8bc1\u4e66\u3002\u5f53\u65e0\u6cd5\u5339\u914d\u7279\u5b9a\u8bc1\u4e66\u65f6\uff0c\u5c06\u4f7f\u7528\u9ed8\u8ba4\u8bc1\u4e66"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(s.code,{children:"is_ca"})}),(0,i.jsx)(s.td,{children:"\u662f\u5426\u4e3a CA \u8bc1\u4e66\u3002\u7528\u4e8e\u900f\u660e\u4ee3\u7406\u573a\u666f\u4e0b\u751f\u6210\u81ea\u7b7e\u540d\u8bc1\u4e66"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(s.code,{children:"acme"})}),(0,i.jsxs)(s.td,{children:["ACME \u8bc1\u4e66\u7533\u8bf7\u670d\u52a1\u914d\u7f6e\uff0c\u5f53\u524d\u4ec5\u652f\u6301 ",(0,i.jsx)(s.code,{children:"lets_encrypt"})]})]})]})]})]})}function o(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}}}]);