(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1258],{669:(e,t,s)=>{Promise.resolve().then(s.bind(s,966))},966:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>h});var r=s(5155),o=s(6237),n=s.n(o);let i=null;class a{dispatch(e,t){this.actions[e](t)}get state(){return this.vm.state}constructor(e={}){this.commit=(e,t)=>{console.log("commit this",this),this.mutations[e](t)},this.vm=new i({data:{state:e.state}});let t=e.getters||{};this.getters={},Object.keys(t).forEach(e=>{Object.defineProperty(this.getters,e,{get:()=>t[e](this.state)})});let s=e.mutations||{};this.mutations={},Object.keys(s).forEach(e=>{this.mutations[e]=t=>{s[e](this.state,t)}});let r=e.actions||{};this.actions={},Object.keys(r).forEach(e=>{this.actions[e]=t=>{console.log("action this",this),r[e](this,t)}})}}let c={Store:a,install:function(e){(i=e).mixin({beforeCreate(){this.$options&&this.$options.store?this.$store=this.$options.store:this.$store=this.$parent&&this.$parent.$store}})}};n().use(c);let l=new c.Store({state:{num:0},getters:{getNum:e=>e.num+1},mutations:{incre(e,t){e.num+=t}},actions:{actionTest(e,t){let{commit:s}=e;setTimeout(()=>{s("incre",t)},2e3)}}});var d=s(2115),u=s(3312);window.store=l;let h=()=>{let[e,t]=(0,d.useState)(0);return(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"text-lg",children:["store.state: ",l.state.num]}),(0,r.jsxs)("div",{className:"text-lg",children:["store.getters: ",l.getters.getNum]}),(0,r.jsxs)("div",{className:"space-x-2",children:[(0,r.jsx)(u.$,{onClick:()=>{l.mutations.incre(10),t(e+1)},children:"sync incre"}),(0,r.jsx)(u.$,{onClick:()=>{l.actions.actionTest(20),setTimeout(()=>{t(e+1)},3e3)},children:"async incre"})]})]})}},3312:(e,t,s)=>{"use strict";s.d(t,{$:()=>l});var r=s(5155),o=s(2115),n=s(2317),i=s(1027),a=s(1567);let c=(0,i.F)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-white",{variants:{variant:{default:"bg-primary shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline",nav:"relative z-10 before:absolute before:inset-0 before:rounded-full before:p-[1px] before:bg-gradient-to-l before:from-[#008CFF] before:to-[#00CCB4] before:-z-10 after:absolute after:inset-[1px] after:rounded-full after:bg-[var(--color-header-bg)] after:-z-10"},size:{default:"h-9 px-4 py-2",xs:"h-6 rounded-full px-3 text-xs",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9",nav:"h-9 w-auto px-3 py-1 text-xs rounded-full"}},defaultVariants:{variant:"default",size:"default"}}),l=o.forwardRef((e,t)=>{let{className:s,variant:o,size:i,asChild:l=!1,...d}=e,u=l?n.DX:"button";return(0,r.jsx)(u,{className:(0,a.cn)(c({variant:o,size:i,className:s})),ref:t,...d})});l.displayName="Button"},1567:(e,t,s)=>{"use strict";s.d(t,{cn:()=>n,hw:()=>i});var r=s(3463),o=s(9795);function n(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return(0,o.QP)((0,r.$)(t))}let i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;return e=Math.floor(e),Math.floor(Math.random()*((t=Math.floor(t))-e+1))+e}}},e=>{var t=t=>e(e.s=t);e.O(0,[1365,6237,8441,1517,7358],()=>t(669)),_N_E=e.O()}]);