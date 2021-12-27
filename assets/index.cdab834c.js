import{j as R,r as g,L as k,O as B,s,H as _,R as M,a as F,b as j,c as D}from"./vendor.4880073b.js";const I=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerpolicy&&(c.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?c.credentials="include":o.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function l(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}};I();const r=R.exports.jsx,h=R.exports.jsxs,T=(t,e=[])=>new Promise((n,l)=>{e.push((o,c)=>o?l(o):n(c)),t.apply(null,e)}),v=t=>{if(t===null||typeof t!="object")return t;if(Array.isArray(t)){let e=[];for(let n of t)e.push(v(n));return e}else{let e={};const n=Object.keys(t);for(const l of n)e[l]=v(t[l]);return e}},A=async({exponential:t,interval:e,factor:n,jitter:l})=>{e=t?e*n:e,e&&await new Promise(o=>setTimeout(o,e+l))},y=async(t,e=[],n={})=>{let{retriesMax:l=3,interval:o=0,jitter:c=0,factor:a=2,onAttemptFail:C=A,exponential:x=!0,isCb:P}=n;c&&(c=Math.floor(Math.random()*c)+1);for(let d=0;d<l;d++)try{let i=null;return P?i=await T(t,v(e)):i=await t.apply(null,e),i}catch(i){if(l===d+1||Object.prototype.hasOwnProperty.call(i,"retryable")&&!i.retryable)throw i;if(!await C({error:i,currentRetry:d,retriesMax:l,interval:o,exponential:x,factor:a,jitter:c})&&C!==A)return}};const U=()=>"fn1";let N=0;const $=()=>new Promise((t,e)=>{setTimeout(()=>{N++==1?(t("second resolve"),N=0):e("second reject")},1e3)}),q=async()=>{throw new Error("Error")},H=t=>{t(null,"funCallBack")},K=(t,e)=>{e(null,t)},V=(t,e)=>{console.log("arg1",t);let n=new Error("funCallBackWithErr");e(n,t)},Y=()=>h("div",{className:"retry",children:[r("button",{onClick:async()=>{const a=await y(U);console.log("retryNormal",a)},children:"retryNormal"}),r("button",{onClick:async()=>{const a=await y(q);console.log("retryError",a)},children:"retryError"}),r("button",{onClick:async()=>{const a=await y($);console.log("retrySecond",a)},children:"retrySecond"}),r("button",{onClick:async()=>{const a=await y(H,[],{isCb:!0});console.log("retryCallBack",a)},children:"retryCallBack"}),r("button",{onClick:async()=>{const a=await y(K,[{value:"arg1"}],{isCb:!0});console.log("retryCallBackWithArgs",a)},children:"retryCallBackWithArgs"}),r("button",{onClick:async()=>{const a=await y(V,[{value:"arg1"}],{isCb:!0});console.log("retryCallBackWithErr",a)},children:"retryCallBackWithErr"})]}),z=()=>{const t=g.exports.useRef(null),e=g.exports.useRef(null);let n=null,l=[];const o=async d=>{const i=d==="screen"?"getDisplayMedia":"getUserMedia",p=await navigator.mediaDevices[i]({video:{width:500,height:300,frameRate:20}});t.current&&(t.current.srcObject=p),n=new MediaRecorder(p,{mimeType:"video/webm"}),n.ondataavailable=E=>{console.log("mediaRecorder ondataavailable ",E),l.push(E.data)},n.start(100)};return h("div",{children:[h("div",{children:[r("video",{autoPlay:!0,id:"player",ref:t}),r("video",{id:"recordPlayer",ref:e})]}),h("section",{children:[r("button",{id:"startScreen",onClick:()=>{o("screen")},children:"\u5F00\u542F\u5F55\u5C4F"}),r("button",{id:"startCamera",onClick:()=>{o("camera")},children:"\u5F00\u542F\u6444\u50CF\u5934"}),r("button",{id:"stop",onClick:()=>{n.stop()},children:"\u7ED3\u675F"}),r("button",{id:"reply",onClick:()=>{const d=new Blob(l,{type:"video/webm"});e.current&&(e.current.src=window.URL.createObjectURL(d),console.log("replay src ",e.current.src),e.current.play())},children:"\u56DE\u653E"}),r("button",{id:"download",onClick:()=>{var d=new Blob(l,{type:"video/webm"}),i=window.URL.createObjectURL(d),p=document.createElement("a");p.href=i,p.style.display="none",p.download="record.webm",p.click()},children:"\u4E0B\u8F7D"})]})]})},G=()=>{var e;const t=((e=b.find(n=>n.path=="/other"))==null?void 0:e.children)||[];return h("div",{children:[r("ul",{children:t.map(({title:n,path:l,element:o})=>r("li",{children:r(k,{to:l,children:n})},l))}),r(B,{})]})},J=()=>r("div",{children:"vue \u9875\u9762"}),O=[s.exports.unstable_ImmediatePriority,s.exports.unstable_UserBlockingPriority,s.exports.unstable_NormalPriority,s.exports.unstable_LowPriority],W=["noop","ImmediatePriority","UserBlockingPriority","NormalPriority","LowPriority","IdlePriority"];let u=document.querySelector("#react-scheduler"),m=[],w=s.exports.unstable_IdlePriority,f;const Q=()=>{O.forEach(e=>{const n=document.createElement("button");u||(u=document.querySelector("#react-scheduler")),u.appendChild(n),n.id=`btn-${e}`,n.innerText=W[e],n.onclick=()=>{m.push({priority:e,count:100}),L()}});const t=document.createElement("button");u.appendChild(t),t.innerText="clear task",t.onclick=()=>{u=document.querySelector("#react-scheduler");const e=u.getElementsByTagName("span");console.log("spans",e,e.length);for(let n of e)u.removeChild(n)}},X=()=>{u&&O.forEach(t=>{const e=document.querySelector(`#btn-${t}`);e&&u.removeChild(e)})},L=()=>{console.log("schedule--------");const t=s.exports.unstable_getFirstCallbackNode(),e=m.sort((l,o)=>l.priority-o.priority)[0];if(!e){f=null,t&&s.exports.unstable_cancelCallback(t);return}const{priority:n}=e;n!==w&&(t&&s.exports.unstable_cancelCallback(t),f=s.exports.unstable_scheduleCallback(n,S.bind(null,e)))},S=(t,e)=>{const n=t.priority===s.exports.unstable_ImmediatePriority||e;for(;(n||!s.exports.unstable_shouldYield())&&t.count;)t.count--,Z(t.priority);if(w=t.priority,!t.count){const c=m.indexOf(t);m.splice(c,1),w=s.exports.unstable_IdlePriority}const l=f;L();const o=f;if(o&&l===o)return S.bind(null,t)},Z=t=>{if(u){const e=document.createElement("span");e.innerText=`${W[t]} `,e.className=`pri-${t}`,u.appendChild(e)}},ee=()=>(g.exports.useEffect(()=>(Q(),()=>{X()}),[]),r("div",{id:"react-scheduler",children:r("div",{children:"React\u6838\u5FC3\u8C03\u5EA6\u529F\u80FD"})})),te=()=>{var e;const t=((e=b.find(n=>n.path=="/react"))==null?void 0:e.children)||[];return h("div",{children:[r("ul",{children:t.map(({title:n,path:l,element:o})=>r("li",{children:r(k,{to:l,children:n})},l))}),r(B,{})]})},re=()=>r("div",{children:"WebpackPageComponent"}),ne=()=>r("div",{children:"ReduxPageComponent"}),oe=()=>r("div",{children:"NodePageComponent"});const le=()=>{const t=b.filter(e=>e.path!=="/");return r("div",{children:r("ul",{children:t.map(({path:e,title:n})=>r("li",{children:r(k,{to:e,children:n})},e))})})},b=[{path:"/vue",element:r(J,{}),title:"vue \u76F8\u5173"},{path:"/react",element:r(te,{}),title:"react \u76F8\u5173",children:[{path:"scheduler",element:r(ee,{}),title:"react \u8C03\u5EA6"}]},{path:"/redux",element:r(ne,{}),title:"redux \u76F8\u5173"},{path:"/webpack",element:r(re,{}),title:"webpack \u76F8\u5173"},{path:"/node",element:r(oe,{}),title:"node \u76F8\u5173"},{path:"/other",element:r(G,{}),title:"other \u76F8\u5173",children:[{path:"retry",element:r(Y,{}),title:"\u591A\u6B21\u91CD\u8BD5promise"},{path:"webrtc",element:r(z,{}),title:"\u5FEB\u901F\u5165\u95E8 WebRTC"}]},{path:"/",element:r(le,{}),title:"default"}],ce=()=>r(_,{children:r(M,{children:b.map(t=>r(F,{path:t.path,element:t.element,children:t.children?t.children.map(({path:e,element:n})=>r(F,{path:e,element:n},e)):null},t.path))})});function ae(){return r(ce,{})}j.render(r(D.StrictMode,{children:r(ae,{})}),document.getElementById("root"));
