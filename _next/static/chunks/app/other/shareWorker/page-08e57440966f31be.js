(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1069],{1910:(e,s,r)=>{Promise.resolve().then(r.bind(r,4530))},4530:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>n});var t=r(5155),a=r(2115);let n=()=>{let[e,s]=(0,a.useState)([]),r=()=>{let e=new SharedWorker("/worker.js");e.port.addEventListener("message",function(e){console.log("Message received from worker",e.data.msg),s(s=>[...s,e.data.msg])},!1),e.port.start(),e.port.postMessage({msg:"ping"})};return(0,a.useEffect)(()=>{r()},[]),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{children:"ShareWorker"}),(0,t.jsx)("h3",{children:"请多开几个tab查看效果"}),(0,t.jsx)("div",{className:"content",children:e.map((e,s)=>(0,t.jsx)("div",{className:"text-lg text-red-500",children:e},s))})]})}}},e=>{var s=s=>e(e.s=s);e.O(0,[8441,1517,7358],()=>s(1910)),_N_E=e.O()}]);