(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3654],{7639:(e,t,o)=>{Promise.resolve().then(o.bind(o,1664))},1664:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>p});var n=o(5155);let r=0;async function s(e,t,o,n,s){console.log("Libuv: uv_tcp_connect",e,t,o,n,s),t.fd=++r,e.handle=t,e.cb=s;let a=await (t.fd,new Promise(e=>{setTimeout(()=>{e(0)},3e3)}));e.cb(e,a)}class a{Dispatch(e){for(var t=arguments.length,o=Array(t>1?t-1:0),n=1;n<t;n++)o[n-1]=arguments[n];this.uv_connect_t.data=this,e(this.uv_connect_t,...o)}MakeCallback(e){for(var t=arguments.length,o=Array(t>1?t-1:0),n=1;n<t;n++)o[n-1]=arguments[n];this.object[e](...o)}constructor(e){this.uv_connect_t={},console.log("C++: ConnectWrap constructor",e),e[0]=this,this.object=e}}class c{static Connect(e,t,o){let n=this[0];new a(e).Dispatch(s,n.uv_tcp_t,t,o,(e,t)=>{console.log("C++: connect callback",e,t);let o=e.data,n=e.handle.data;o.MakeCallback("oncomplete",n,o,t)})}constructor(){this.uv_tcp_t={},this.uv_tcp_t.data=this}}function l(e){let t={};function o(){Object.assign(this,t),e&&e(this)}return{PrototypeTemplate:()=>({set(e,t){o.prototype[e]=t}}),InstanceTemplate:()=>({set(e,o){t[e]=o}}),GetFunction:()=>o}}let i=l(e=>{e[0]=new c});i.PrototypeTemplate().set("connect",c.Connect),i.InstanceTemplate().set("name","hi");let d=i.GetFunction(),u=l().GetFunction(),h=()=>{let e=new d,t=new u;console.log("tcp",e),console.log("req",t);let o="127.0.0.1";t.oncomplete=()=>{console.log("js: tcp connect success")},t.address=o,t.port=80,e.connect(t,o,80)};var f=o(3312);let p=()=>(0,n.jsx)("div",{children:(0,n.jsx)(f.$,{onClick:()=>{h()},children:"testJsTcpOperate"})})},3312:(e,t,o)=>{"use strict";o.d(t,{$:()=>i});var n=o(5155),r=o(2115),s=o(2317),a=o(1027),c=o(1567);let l=(0,a.F)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-white",{variants:{variant:{default:"bg-primary shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline",nav:"relative z-10 before:absolute before:inset-0 before:rounded-full before:p-[1px] before:bg-gradient-to-l before:from-[#008CFF] before:to-[#00CCB4] before:-z-10 after:absolute after:inset-[1px] after:rounded-full after:bg-[var(--color-header-bg)] after:-z-10"},size:{default:"h-9 px-4 py-2",xs:"h-6 rounded-full px-3 text-xs",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9",nav:"h-9 w-auto px-3 py-1 text-xs rounded-full"}},defaultVariants:{variant:"default",size:"default"}}),i=r.forwardRef((e,t)=>{let{className:o,variant:r,size:a,asChild:i=!1,...d}=e,u=i?s.DX:"button";return(0,n.jsx)(u,{className:(0,c.cn)(l({variant:r,size:a,className:o})),ref:t,...d})});i.displayName="Button"},1567:(e,t,o)=>{"use strict";o.d(t,{cn:()=>s,hw:()=>a});var n=o(3463),r=o(9795);function s(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];return(0,r.QP)((0,n.$)(t))}let a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;return e=Math.floor(e),Math.floor(Math.random()*((t=Math.floor(t))-e+1))+e}}},e=>{var t=t=>e(e.s=t);e.O(0,[1365,8441,1517,7358],()=>t(7639)),_N_E=e.O()}]);