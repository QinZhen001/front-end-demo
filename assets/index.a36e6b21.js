import{R as l,j as c,r as R,a as h}from"./index.488414b2.js";var y={exports:{}},v="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",A=v,E=A;function f(){}function m(){}m.resetWarningCache=f;var P=function(){function t(r,u,o,p,s,i){if(i!==E){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}}t.isRequired=t;function e(){return t}var n={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:m,resetWarningCache:f};return n.PropTypes=n,n};y.exports=P();var T=y.exports;function C(t,e){if(e)return e(C)(t);let n={},r=[];function u(){return n}function o(s){r.push(s)}function p(s){return n=t(n,s),r.forEach(i=>i()),s}return p({type:"@INIT/CUSTOM-REDUX"}),{getState:u,subscribe:o,dispatch:p}}function _(...t){return e=>(...n)=>{const r=e(...n);let u=r.dispatch;const o={getState:r.getState,dispatch:(...s)=>u(...s)},p=t.map(s=>s(o));return u=O(...p)(r.dispatch),{...r,dispatch:u}}}function O(...t){return t.length===0?e=>e:t.length===1?t[0]:t.reduce((e,n)=>(...r)=>e(n(...r)))}function k(t,e){return(...n)=>e(t(...n))}function D(t,e){return Object.keys(t).reduce((n,r)=>(n[r]=k(t[r],e),n),{})}const j=(t=n=>n,e={})=>n=>{var r;return r=class extends l.Component{constructor(o){super(o),this.state={props:{}}}update(){const{store:o}=this.context,p=t(o.getState()),s=D(e,o.dispatch);this.setState(i=>({props:{...i.props,...p,...s}}))}componentDidMount(){const{store:o}=this.context;o.subscribe(()=>this.update()),this.update()}render(){return c(n,{...this.state.props})}},r.contextTypes={store:T.object},r};class b extends l.Component{getChildContext(){return{store:this.store}}constructor(e){super(e),this.store=e.store}render(){return this.props.children}}b.childContextTypes={store:T.object};const a="\u52A0\u673A\u5173\u67AA",S="\u51CF\u673A\u5173\u67AA";function x(){return{type:a}}function w(){return{type:S}}function G(){return[{type:a},g()]}function g(){return t=>{setTimeout(()=>{t(x())},2e3)}}function I(t=0,e){switch(e.type){case a:return t+1;case S:return t-1;default:return 10}}const N=j(t=>({num:t}),{addGun:x,removeGun:w,addGunAsync:g,addTwice:G})(class extends R.exports.Component{render(){return h("div",{children:[h("h2",{children:["\u73B0\u5728\u6709\u673A\u67AA",this.props.num]}),c("button",{onClick:this.props.addGun,children:"\u7533\u8BF7\u6B66\u5668"}),c("button",{onClick:this.props.removeGun,children:"\u4E0A\u4EA4\u6B66\u5668"}),c("button",{onClick:this.props.addGunAsync,children:"\u62D6\u4E24\u5929\u518D\u7ED9"}),c("button",{onClick:this.props.addTwice,children:"\u7533\u8BF7\u4E24\u628A"})]})}}),B=({dispatch:t,getState:e})=>n=>r=>(console.log(r,typeof r),typeof r=="function"?r(t,e):n(r)),F=({dispatch:t,getState:e})=>n=>r=>Array.isArray(r)?r.forEach(u=>t(u)):n(r);let U=C(I,_(B,F));const V=()=>c("div",{children:c(b,{store:U,children:c(N,{})})});export{V as SimpleRedux,V as default};
