(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[12],{337:(e,r,t)=>{Promise.resolve().then(t.bind(t,7376))},7376:(e,r,t)=>{"use strict";let n,o;t.r(r),t.d(r,{default:()=>u});var a=t(5155),i=t(2115),s=t(3312);let l=10,d=0,u=()=>{let e=(0,i.useRef)(null);(0,i.useEffect)(()=>{n=e.current.getContext("2d")},[]);let r=()=>{if(d>1){t();return}u(),d+=1e3/3e5,l=Math.floor(140*(function(e,r,t,n){let o=3*.2-3*.8+1,a=3*.8-6*.2,i=3*.2,s=3*.8-3*.2+1,l=3*.2-6*.8,d=3*.8;return function(e){var r;return((s*(r=function(e){var r,t,n,s,l,d=e;for(let n=0;n<8;n++){if(1e-6>Math.abs(l=((o*(r=d)+a)*r+i)*r-e))return d;if(1e-6>Math.abs(s=(3*o*(t=d)+2*a)*t+i))break;d-=l/s}var u=1,c=0;for(d=e;u>c;){if(1e-6>Math.abs(l=((o*(n=d)+a)*n+i)*n-e))return d;return l>0?u=d:c=d,d=(u+c)/2}}(e))+l)*r+d)*r}})(.2,.8,0,0)(d)+10),console.log("[test] draw: ",d,l),o=requestAnimationFrame(r)},t=()=>{o&&(cancelAnimationFrame(o),o=void 0)},u=()=>{n.clearRect(0,0,200,200),n.beginPath(),n.arc(100,100,l,0,2*Math.PI),n.closePath(),n.fill()};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"space-x-2",children:[(0,a.jsx)(s.$,{onClick:r,children:"开始绘制"}),(0,a.jsx)(s.$,{onClick:t,children:"暂停绘制"}),(0,a.jsx)(s.$,{onClick:()=>{var r,t;let o=null!==(r=e.current.width)&&void 0!==r?r:0,a=null!==(t=e.current.height)&&void 0!==t?t:0;n.clearRect(0,0,o,a),d=0,l=10},children:"清理绘制"})]}),(0,a.jsx)("canvas",{id:"canvas",width:"200",height:"200",ref:e,className:"mt-2 h-[200px] w-[200px]"})]})}},3312:(e,r,t)=>{"use strict";t.d(r,{$:()=>d});var n=t(5155),o=t(2115),a=t(2317),i=t(1027),s=t(1567);let l=(0,i.F)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-white",{variants:{variant:{default:"bg-primary shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline",nav:"relative z-10 before:absolute before:inset-0 before:rounded-full before:p-[1px] before:bg-gradient-to-l before:from-[#008CFF] before:to-[#00CCB4] before:-z-10 after:absolute after:inset-[1px] after:rounded-full after:bg-[var(--color-header-bg)] after:-z-10"},size:{default:"h-9 px-4 py-2",xs:"h-6 rounded-full px-3 text-xs",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9",nav:"h-9 w-auto px-3 py-1 text-xs rounded-full"}},defaultVariants:{variant:"default",size:"default"}}),d=o.forwardRef((e,r)=>{let{className:t,variant:o,size:i,asChild:d=!1,...u}=e,c=d?a.DX:"button";return(0,n.jsx)(c,{className:(0,s.cn)(l({variant:o,size:i,className:t})),ref:r,...u})});d.displayName="Button"},1567:(e,r,t)=>{"use strict";t.d(r,{cn:()=>a,hw:()=>i});var n=t(3463),o=t(9795);function a(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];return(0,o.QP)((0,n.$)(r))}let i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;return e=Math.floor(e),Math.floor(Math.random()*((r=Math.floor(r))-e+1))+e}}},e=>{var r=r=>e(e.s=r);e.O(0,[1365,8441,1517,7358],()=>r(337)),_N_E=e.O()}]);