(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3795],{864:(e,r,t)=>{Promise.resolve().then(t.bind(t,3300))},3300:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});var n=t(5155),a=t(2115),o=t(3312);let s=()=>{let e;let r=(0,a.useRef)(null),t=(0,a.useRef)(null),s=(0,a.useRef)(null),i=[],d=async t=>{let n=await navigator.mediaDevices["screen"===t?"getDisplayMedia":"getUserMedia"]({video:{width:300,height:150,frameRate:20}});r.current&&(r.current.srcObject=n),(e=new MediaRecorder(n,{mimeType:"video/webm"})).ondataavailable=e=>{console.log("mediaRecorder ondataavailable ",e),i.push(e.data)},e.start(100)};return(0,n.jsxs)("div",{children:[(0,n.jsx)("video",{autoPlay:!0,id:"player",ref:r}),(0,n.jsx)("video",{id:"recordPlayer",ref:t}),(0,n.jsxs)("section",{className:"mb-2 mt-2 space-x-2",children:[(0,n.jsx)(o.$,{id:"startScreen",onClick:()=>{d("screen")},children:"开启录屏"}),(0,n.jsx)(o.$,{id:"startCamera",onClick:()=>{d("camera")},children:"开启摄像头"})]}),(0,n.jsxs)("section",{className:"space-x-2",children:[(0,n.jsx)(o.$,{onClick:()=>{if(s.current){let e=s.current.getContext("2d");s.current.width=300,s.current.height=150,e.drawImage(r.current,0,0,300,150)}},children:"截图"}),(0,n.jsx)(o.$,{id:"stop",onClick:()=>{e.stop()},children:"结束"}),(0,n.jsx)(o.$,{id:"reply",onClick:()=>{let e=new Blob(i,{type:"video/webm"});t.current&&(t.current.src=window.URL.createObjectURL(e),console.log("replay src ",t.current.src),t.current.play())},children:"回放"}),(0,n.jsx)(o.$,{id:"download",onClick:()=>{let e=new Blob(i,{type:"video/webm"}),r=window.URL.createObjectURL(e),t=document.createElement("a");t.href=r,t.style.display="none",t.download="record.webm",t.click()},children:"下载"})]}),(0,n.jsx)("div",{className:"mt-2",children:(0,n.jsx)("canvas",{id:"canvas",ref:s})})]})}},3312:(e,r,t)=>{"use strict";t.d(r,{$:()=>l});var n=t(5155),a=t(2115),o=t(2317),s=t(1027),i=t(1567);let d=(0,s.F)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-white",{variants:{variant:{default:"bg-primary shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline",nav:"relative z-10 before:absolute before:inset-0 before:rounded-full before:p-[1px] before:bg-gradient-to-l before:from-[#008CFF] before:to-[#00CCB4] before:-z-10 after:absolute after:inset-[1px] after:rounded-full after:bg-[var(--color-header-bg)] after:-z-10"},size:{default:"h-9 px-4 py-2",xs:"h-6 rounded-full px-3 text-xs",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9",nav:"h-9 w-auto px-3 py-1 text-xs rounded-full"}},defaultVariants:{variant:"default",size:"default"}}),l=a.forwardRef((e,r)=>{let{className:t,variant:a,size:s,asChild:l=!1,...c}=e,u=l?o.DX:"button";return(0,n.jsx)(u,{className:(0,i.cn)(d({variant:a,size:s,className:t})),ref:r,...c})});l.displayName="Button"},1567:(e,r,t)=>{"use strict";t.d(r,{cn:()=>o,hw:()=>s});var n=t(3463),a=t(9795);function o(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];return(0,a.QP)((0,n.$)(r))}let s=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;return e=Math.floor(e),Math.floor(Math.random()*((r=Math.floor(r))-e+1))+e}}},e=>{var r=r=>e(e.s=r);e.O(0,[1365,8441,1517,7358],()=>r(864)),_N_E=e.O()}]);