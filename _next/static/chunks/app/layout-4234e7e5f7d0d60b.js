(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7177],{1153:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2728,23)),Promise.resolve().then(r.bind(r,6580)),Promise.resolve().then(r.bind(r,598)),Promise.resolve().then(r.bind(r,1650)),Promise.resolve().then(r.t.bind(r,2371,23))},6580:(e,t,r)=>{"use strict";r.d(t,{default:()=>u});var i=r(5155),s=r(6046),o=r(2115),a=r(434),n=r(1567),l=r(7365);let d=e=>{let{data:t,className:r,description:s}=e;return(0,i.jsxs)("div",{className:(0,n.cn)(r,"flex h-full items-center justify-center"),children:[(0,i.jsx)(l.Vwl,{className:"mr-2 text-violet10"}),t.map((e,r)=>(0,i.jsxs)(o.Fragment,{children:[(0,i.jsx)("span",{className:"text-sm",children:e}),r!==t.length-1&&(0,i.jsx)(a.b,{className:"mx-2 h-4 w-px bg-slate-600",orientation:"vertical"})]},r)),s&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(l.X_f,{className:"ml-2"}),(0,i.jsx)("div",{className:"ml-2 text-nowrap text-sm text-slate-700",children:s})]})]})};var c=r(2909);let u=e=>{let{className:t}=e,r=(0,s.usePathname)(),a=(0,o.useMemo)(()=>r.split("/").filter(Boolean),[r]),l=(0,o.useMemo)(()=>{for(let e of c.S){if(e.href===r)return e;if(e.children){for(let t of e.children)if(t.href===r)return t}}},[r]);return(0,i.jsxs)("div",{className:(0,n.cn)(t,"box-border flex items-center justify-between bg-neutral-200"),children:[(0,i.jsx)(d,{data:a,description:null==l?void 0:l.description,className:"ml-2 box-border flex-initial"}),(0,i.jsx)("span",{className:"mr-2 flex-auto text-right",children:c.j})]})}},598:(e,t,r)=>{"use strict";r.d(t,{default:()=>m});var i=r(5155),s=r(5217),o=r(7365),a=r(2115),n=r(1567);let l=a.forwardRef((e,t)=>{let{children:r,className:o,...a}=e;return(0,i.jsx)(s.bL,{className:(0,n.cn)("w-full overflow-hidden",o),...a,ref:t,children:r})});l.displayName=s.bL.displayName;let d=a.forwardRef((e,t)=>{let{children:r,className:o,...a}=e;return(0,i.jsx)(s.q7,{className:(0,n.cn)("w-full overflow-hidden border-b border-slate-200 first:mt-0 focus-within:relative focus-within:z-10 focus-within:shadow-md",o),...a,ref:t,children:r})});d.displayName=s.q7.displayName;let c=a.forwardRef((e,t)=>{let{className:r,...o}=e;return(0,i.jsx)(s.UC,{className:(0,n.cn)("cursor-pointer overflow-hidden",r),...o,ref:t})});c.displayName=s.UC.displayName;let u=a.forwardRef((e,t)=>{let{children:r,className:a,...l}=e;return(0,i.jsxs)(s.l9,{className:(0,n.cn)("flex h-[45px] w-full flex-1 items-center justify-between bg-white px-5 leading-none text-violet11 shadow-[0_1px_0] shadow-mauve6 outline-none",a),...l,ref:t,children:[r,(0,i.jsx)(o.D3D,{className:"text-violet10 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180","aria-hidden":!0})]})});u.displayName=s.l9.displayName;var h=r(6046);let f=e=>{let{title:t,href:r}=e,s=(0,h.usePathname)(),o=(0,h.useRouter)(),l=(0,a.useMemo)(()=>s===r,[s,r]);return(0,i.jsx)("div",{onClick:()=>{o.replace(r)},className:(0,n.cn)("h-8 px-6 leading-8 text-violet11 hover:bg-violet-300 hover:text-violet-900",{"bg-violet-500":l,"text-violet-900":l}),children:(0,i.jsx)("span",{className:(0,n.cn)("text-sm",{}),children:t})})};var p=r(2909);let m=e=>{let{className:t}=e,r=(0,h.usePathname)(),s=(0,h.useRouter)(),o=(0,a.useMemo)(()=>"/"+r.split("/").filter(Boolean)[0],[r]),m=(0,a.useMemo)(()=>{let e=r.split("/").filter(Boolean)[1];return e?"/"+e:""},[r]);return(0,i.jsx)(l,{className:(0,n.cn)("overflow-auto",t),type:"single",onValueChange:e=>{let t=p.S.find(t=>t.href===e);(null==t?void 0:t.href)&&s.replace(t.href)},value:o,collapsible:!0,children:p.S.map(e=>{var t;return(0,i.jsxs)(d,{value:e.href,children:[(0,i.jsx)(u,{className:(0,n.cn)(o!=e.href||m?"hover:bg-violet-300 hover:text-violet-900":"bg-violet-500 text-violet-900"),children:e.title}),(0,i.jsx)(c,{children:null===(t=e.children)||void 0===t?void 0:t.map(e=>(0,i.jsx)(f,{title:e.title,href:e.href},e.title))})]},e.title)})})}},1650:(e,t,r)=>{"use strict";r.d(t,{Toaster:()=>x});var i=r(5155),s=r(5564),o=r(2115),a=r(7365),n=r(9930),l=r(1027),d=r(1567);let c=n.Kq,u=o.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,i.jsx)(n.LM,{ref:t,className:(0,d.cn)("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",r),...s})});u.displayName=n.LM.displayName;let h=(0,l.F)("group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),f=o.forwardRef((e,t)=>{let{className:r,variant:s,...o}=e;return(0,i.jsx)(n.bL,{ref:t,className:(0,d.cn)(h({variant:s}),r),...o})});f.displayName=n.bL.displayName,o.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,i.jsx)(n.rc,{ref:t,className:(0,d.cn)("hover:bg-secondary focus:ring-ring group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-1 disabled:pointer-events-none disabled:opacity-50",r),...s})}).displayName=n.rc.displayName;let p=o.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,i.jsx)(n.bm,{ref:t,className:(0,d.cn)("text-foreground/50 hover:text-foreground absolute right-1 top-1 rounded-md p-1 opacity-0 transition-opacity focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",r),"toast-close":"",...s,children:(0,i.jsx)(a.MKb,{className:"h-4 w-4"})})});p.displayName=n.bm.displayName;let m=o.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,i.jsx)(n.hE,{ref:t,className:(0,d.cn)("text-sm font-semibold [&+div]:text-xs",r),...s})});m.displayName=n.hE.displayName;let v=o.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,i.jsx)(n.VY,{ref:t,className:(0,d.cn)("text-sm opacity-90",r),...s})});function x(){let{toasts:e}=(0,s.dj)();return(0,i.jsxs)(c,{children:[e.map(function(e){let{id:t,title:r,description:s,action:o,...a}=e;return(0,i.jsxs)(f,{...a,children:[(0,i.jsxs)("div",{className:"grid gap-1",children:[r&&(0,i.jsx)(m,{children:r}),s&&(0,i.jsx)(v,{children:s})]}),o,(0,i.jsx)(p,{})]},t)}),(0,i.jsx)(u,{})]})}v.displayName=n.VY.displayName},2909:(e,t,r)=>{"use strict";r.d(t,{S:()=>i,j:()=>s});let i=[{title:"Vue",href:"/vue",children:[{title:"vue2",href:"/vue/vue2",description:"vue2 简单实现"},{title:"vue3",href:"/vue/vue3",description:"vue3 简单实现"},{title:"vuex",href:"/vue/vuex",description:"vuex 简单实现"},{title:"simpleVueRouter",href:"/vue/simpleVueRouter",description:"vue-router 简单实现"}]},{title:"React",href:"/react",children:[{title:"redux",href:"/react/redux",description:"redux 简单实现"},{title:"useTransition",href:"/react/useTransition",description:"useTransition"},{title:"useDeferredValue",href:"/react/useDeferredValue",description:"useDeferredValue"},{title:"suspense",href:"/react/suspense",description:"suspense"},{title:"ahooks",href:"/react/ahooks",description:"ahooks 仿写"},{title:"useCountdown",href:"/react/useCountdown",description:"useCountdown 倒计时"}]},{title:"Node",href:"/node",children:[{title:"EventLoop",href:"/node/event-loop",description:"事件循环"},{title:"js-libuv",href:"/node/js-libuv",description:"模拟libuv"}]},{title:"Canvas",href:"/canvas",children:[{title:"Highlight",href:"/canvas/highlight",description:"高亮区块"},{title:"Pencil",href:"/canvas/pencil",description:"绘制鼠标轨迹"},{title:"Expand",href:"/canvas/expand",description:"扩张效果(模拟贝塞尔曲线)"}]},{title:"Other",href:"/other",children:[{title:"notification",href:"/other/notification",description:"系统通知"},{title:"co",href:"/other/co",description:"自动执行Generator"},{title:"compose",href:"/other/compose",description:"实现compose"},{title:"chineseInput",href:"/other/chineseInput",description:"监听中文输入法事件"},{title:"retry",href:"/other/retry",description:"多次重试promise"},{title:"rxjs",href:"/other/rxjs",description:"实现简易 RxJS"},{title:"websocket-chat",href:"/other/websocket-chat",description:"Websocket 聊天"},{title:"codemirror",href:"/other/codemirror",description:"代码高亮"},{title:"abortController",href:"/other/abortController",description:"中断请求"},{title:"JSBridge",href:"/other/JSBridge",description:"JSBridge"},{title:"inherit",href:"/other/inherit",description:"几种继承方式"},{title:"errorPack",href:"/other/errorPack",description:"error封装"},{title:"shareWorker",href:"/other/shareWorker",description:"ShareWorker"},{title:"longTask",href:"/other/longTask",description:"监控长任务"},{title:"infinity-debugger",href:"/other/infinity-debugger",description:"无限Debugger（禁止别人调试自己网页）"},{title:"immer",href:"/other/immer",description:"immer.js"}]},{title:"Rtc",href:"/rtc",children:[{title:"mediaRecorder",href:"/rtc/mediaRecorder",description:"MediaRecorder相关"},{title:"canvasCaptureStream",href:"/rtc/canvasCaptureStream",description:"canvasCaptureStream相关"},{title:"dataChannel",href:"/rtc/dataChannel",description:"WebRTC DataChannel"},{title:"analyserNode",href:"/rtc/analyserNode",description:"音频可视化分析"},{title:"audioPcm",href:"/rtc/audioPcm",description:"获取麦克风pcm数据"},{title:"audioBuffer",href:"/rtc/audioBuffer",description:"AudioBuffer相关"},{title:"gainNode",href:"/rtc/gainNode",description:"GainNode相关"},{title:"checkWebRtc",href:"/rtc/checkWebRtc",description:"测试浏览器支持WebRTC"}]},{title:"Animation",href:"/animation",children:[{title:"progress",href:"/animation/progress",description:"带文字过渡效果的进度条"},{title:"lyric",href:"/animation/lyric",description:"歌词渐变过渡效果"},{title:"slider",href:"/animation/slider",description:"轮播图 (center active)"},{title:"multiple type",href:"/animation/multiple-type",description:"多行文字打字机效果"}]},{title:"Vite",href:"/vite",children:[{title:"Plugin",href:"/vite/plugin",description:"简单插件"}]},{title:"babel",href:"/babel"},{title:"template",href:"/template"},{title:"Webpack",href:"/webpack",children:[{title:"miniWebpack1",href:"/webpack/miniWebpack1",description:"手写webpack"},{title:"miniWebpack2",href:"/webpack/miniWebpack2",description:"手写webpack"}]},{title:"UI",href:"/ui",children:[{title:"gradientBorder",href:"/ui/gradientBorder",description:"渐变边框文字"},{title:"editor@people",href:"/ui/atEditor",description:"@人功能"},{title:"threeColumnLayout",href:"/ui/threeColumnLayout",description:"三列布局"}]}].map(e=>{var t;return(null===(t=e.children)||void 0===t?void 0:t.length)?{...e,children:e.children.sort((e,t)=>e.title.localeCompare(t.title))}:e}).sort((e,t)=>e.title.localeCompare(t.title)),s="web demo collection"},5564:(e,t,r)=>{"use strict";r.d(t,{dj:()=>h});var i=r(2115);let s=0,o=new Map,a=e=>{if(o.has(e))return;let t=setTimeout(()=>{o.delete(e),c({type:"REMOVE_TOAST",toastId:e})},5e3);o.set(e,t)},n=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,3)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case"DISMISS_TOAST":{let{toastId:r}=t;return r?a(r):e.toasts.forEach(e=>{a(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===t.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)}}},l=[],d={toasts:[]};function c(e){d=n(d,e),l.forEach(e=>{e(d)})}function u(e){let{...t}=e,r=(s=(s+1)%Number.MAX_SAFE_INTEGER).toString(),i=()=>c({type:"DISMISS_TOAST",toastId:r});return c({type:"ADD_TOAST",toast:{...t,id:r,open:!0,onOpenChange:e=>{e||i()}}}),{id:r,dismiss:i,update:e=>c({type:"UPDATE_TOAST",toast:{...e,id:r}})}}function h(){let[e,t]=i.useState(d);return i.useEffect(()=>(l.push(t),()=>{let e=l.indexOf(t);e>-1&&l.splice(e,1)}),[e]),{...e,toast:u,dismiss:e=>c({type:"DISMISS_TOAST",toastId:e})}}},1567:(e,t,r)=>{"use strict";r.d(t,{cn:()=>o,hw:()=>a});var i=r(3463),s=r(9795);function o(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,s.QP)((0,i.$)(t))}let a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;return e=Math.floor(e),Math.floor(Math.random()*((t=Math.floor(t))-e+1))+e}},2728:()=>{},2371:()=>{}},e=>{var t=t=>e(e.s=t);e.O(0,[7451,5105,1365,2099,4148,8441,1517,7358],()=>t(1153)),_N_E=e.O()}]);