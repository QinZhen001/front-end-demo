!function(){function t(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}System.register(["./index-legacy.86225dbc.js"],(function(e){"use strict";var n,r,o,s;return{setters:[function(t){n=t.R,r=t.j,o=t.r,s=t.a}],execute:function(){var c={exports:{}};function i(){}function u(){}u.resetWarningCache=i;c.exports=function(){function t(t,e,n,r,o,s){if("SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"!==s){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function e(){return t}t.isRequired=t;var n={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:u,resetWarningCache:i};return n.PropTypes=n,n}();var a=c.exports;class p extends n.Component{getChildContext(){return{store:this.store}}constructor(t){super(t),this.store=t.store}render(){return this.props.children}}t(p,"childContextTypes",{store:a.object});const d="加机关枪",h="减机关枪";function l(){return{type:d}}function f(){return t=>{setTimeout((()=>{t(l())}),2e3)}}const y=((e=(t=>t),o={})=>s=>{var c;return c=class extends n.Component{constructor(t){super(t),this.state={props:{}}}update(){const{store:t}=this.context,n=e(t.getState()),r=(s=o,c=t.dispatch,Object.keys(s).reduce(((t,e)=>(t[e]=function(t,e){return(...n)=>e(t(...n))}(s[e],c),t)),{}));var s,c;this.setState((t=>({props:{...t.props,...n,...r}})))}componentDidMount(){const{store:t}=this.context;t.subscribe((()=>this.update())),this.update()}render(){return r(s,{...this.state.props})}},t(c,"contextTypes",{store:a.object}),c})((t=>({num:t})),{addGun:l,removeGun:function(){return{type:h}},addGunAsync:f,addTwice:function(){return[{type:d},f()]}})(class extends o.exports.Component{render(){return s("div",{children:[s("h2",{children:["现在有机枪",this.props.num]}),r("button",{onClick:this.props.addGun,children:"申请武器"}),r("button",{onClick:this.props.removeGun,children:"上交武器"}),r("button",{onClick:this.props.addGunAsync,children:"拖两天再给"}),r("button",{onClick:this.props.addTwice,children:"申请两把"})]})}});let b=function t(e,n){if(n)return n(t)(e);let r={},o=[];function s(t){return r=e(r,t),o.forEach((t=>t())),t}return s({type:"@INIT/CUSTOM-REDUX"}),{getState:function(){return r},subscribe:function(t){o.push(t)},dispatch:s}}((function(t=0,e){switch(e.type){case d:return t+1;case h:return t-1;default:return 10}}),function(...t){return e=>(...n)=>{const r=e(...n);let o=r.dispatch;const s={getState:r.getState,dispatch:(...t)=>o(...t)},c=t.map((t=>t(s)));return o=function(...t){if(0===t.length)return t=>t;if(1===t.length)return t[0];return t.reduce(((t,e)=>(...n)=>t(e(...n))))}(...c)(r.dispatch),{...r,dispatch:o}}}((({dispatch:t,getState:e})=>n=>r=>(console.log(r,typeof r),"function"==typeof r?r(t,e):n(r))),(({dispatch:t,getState:e})=>e=>n=>Array.isArray(n)?n.forEach((e=>t(e))):e(n))));const g=()=>r("div",{children:r(p,{store:b,children:r(y,{})})});e({ReduxPage:g,default:g})}}}))}();
