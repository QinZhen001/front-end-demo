import{j as r}from"./index.f6ad69a0.js";class l{constructor(o){const t=document.createElement("iframe");t.style.display="none",document.body.appendChild(t);const a=t.contentWindow,s=["window","document","XMLHttpRequest","fetch","WebSocket","Image"];return new Proxy(a,{has:(c,e)=>{if(o.includes(e))return!1;if(s.includes(e))throw new Error(`Can't use: ${e}!`);if(!c.hasOwnProperty(e))throw new Error(`Not find: ${e}!`);return!0}})}}function u(n){return n="with(sandbox) {"+n+"}",new Function("sandbox",n)}function d(n,o){u(n).call(o,o)}const i=`
  let aaa = 1;
  let bbb = 2;
  console.log(aaa + bbb);
`,w=()=>r("div",{children:r("button",{onClick:()=>{const o=["history"],t=new l(o);d(i,t)},children:"\u6C99\u7BB1\u4E2D\u6267\u884C\u4EE3\u7801"})});export{w as default};
