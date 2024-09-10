"use strict";(self.webpackChunkpingap=self.webpackChunkpingap||[]).push([[8458],{7809:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>i,contentTitle:()=>d,default:()=>l,frontMatter:()=>a,metadata:()=>s,toc:()=>t});var c=n(4848),o=n(8453);const a={sidebar_position:75},d="Docker",s={id:"docker",title:"Docker",description:"Pingap\u63d0\u4f9b\u4e86\u5df2\u6784\u5efa\u597d\u7684docker\u955c\u50cf\uff0c\u53ef\u4ee5\u76f4\u63a5\u8fd0\u884c\uff0c\u9700\u8981\u6ce8\u610f\u7531\u4e8eupgrade\u64cd\u4f5c\u9700\u8981\u4f7f\u7528daemon\u7684\u6a21\u5f0f\u624d\u53ef\u4ee5\u4f7f\u7528\uff0c\u56e0\u6b64\u82e5\u4f7f\u7528docker\u8fd0\u884c\u5219\u65e0\u6cd5\u4f7f\u7528\u914d\u7f6e\u53d8\u66f4\u65f6\u81ea\u52a8\u91cd\u542f\u3002",source:"@site/docs/docker.md",sourceDirName:".",slug:"/docker",permalink:"/pingap-zh/docs/docker",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/docker.md",tags:[],version:"current",sidebarPosition:75,frontMatter:{sidebar_position:75},sidebar:"tutorialSidebar",previous:{title:"\u63d2\u4ef6\u4f53\u7cfb",permalink:"/pingap-zh/docs/plugin"},next:{title:"\u5e38\u89c1\u95ee\u9898",permalink:"/pingap-zh/docs/question"}},i={},t=[];function p(e){const r={code:"code",h1:"h1",header:"header",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r.header,{children:(0,c.jsx)(r.h1,{id:"docker",children:"Docker"})}),"\n",(0,c.jsx)(r.p,{children:"Pingap\u63d0\u4f9b\u4e86\u5df2\u6784\u5efa\u597d\u7684docker\u955c\u50cf\uff0c\u53ef\u4ee5\u76f4\u63a5\u8fd0\u884c\uff0c\u9700\u8981\u6ce8\u610f\u7531\u4e8eupgrade\u64cd\u4f5c\u9700\u8981\u4f7f\u7528daemon\u7684\u6a21\u5f0f\u624d\u53ef\u4ee5\u4f7f\u7528\uff0c\u56e0\u6b64\u82e5\u4f7f\u7528docker\u8fd0\u884c\u5219\u65e0\u6cd5\u4f7f\u7528\u914d\u7f6e\u53d8\u66f4\u65f6\u81ea\u52a8\u91cd\u542f\u3002"}),"\n",(0,c.jsx)(r.pre,{children:(0,c.jsx)(r.code,{className:"language-bash",children:"docker run -it -d --restart=always \\\n  -v $PWD/pingap:/opt/pingap \\\n  -p 3018:3018 \\\n  -p 80:80 \\\n  -p 443:443 \\\n  vicanso/pingap -c /opt/pingap/conf \\\n  --autoreload \\\n  --admin=cGluZ2FwOjEyMzEyMw==@0.0.0.0:3018\n"})}),"\n",(0,c.jsxs)(r.p,{children:["\u5176\u4e2d",(0,c.jsx)(r.code,{children:"cGluZ2FwOjEyMzEyMw=="}),'\u662fbase64("pingap:123123")\u5bf9\u5e94\u7684\u503c\uff0c\u7528\u4e8e\u542f\u7528WEB\u7ba1\u7406\u540e\u53f0\u65f6\u7684\u9274\u6743\u4f7f\u7528\u3002',(0,c.jsx)(r.code,{children:"80"}),"\u4e0e",(0,c.jsx)(r.code,{children:"443"}),"\u7aef\u53e3\u5219\u662f\u540e\u7eed\u76d1\u542c\u670d\u52a1\u65f6\u4f7f\u7528\uff0c",(0,c.jsx)(r.code,{children:"autoreload"}),"\u662f\u7528\u4e8e",(0,c.jsx)(r.code,{children:"upstream"}),"\u4e0e",(0,c.jsx)(r.code,{children:"location"}),"\u7684\u70ed\u66f4\u65b0\u4f7f\u7528\uff0c\u6b64\u4e24\u7c7b\u914d\u7f6e\u4e0d\u9700\u8981\u91cd\u542f\u5e94\u7528\u7a0b\u5e8f\u3002"]})]})}function l(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,c.jsx)(r,{...e,children:(0,c.jsx)(p,{...e})}):p(e)}}}]);