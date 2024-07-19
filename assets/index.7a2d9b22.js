import{r as re,j as H}from"./index.e68da9fa.js";var s={exports:{}},J={};/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(n){var l,i,y,m;if(typeof performance=="object"&&typeof performance.now=="function"){var M=performance;n.unstable_now=function(){return M.now()}}else{var $=Date,X=$.now();n.unstable_now=function(){return $.now()-X}}if(typeof window=="undefined"||typeof MessageChannel!="function"){var w=null,W=null,A=function(){if(w!==null)try{var e=n.unstable_now();w(!0,e),w=null}catch(t){throw setTimeout(A,0),t}};l=function(e){w!==null?setTimeout(l,0,e):(w=e,setTimeout(A,0))},i=function(e,t){W=setTimeout(e,t)},y=function(){clearTimeout(W)},n.unstable_shouldYield=function(){return!1},m=n.unstable_forceFrameRate=function(){}}else{var Z=window.setTimeout,G=window.clearTimeout;if(typeof console!="undefined"){var ee=window.cancelAnimationFrame;typeof window.requestAnimationFrame!="function"&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),typeof ee!="function"&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")}var T=!1,C=null,x=-1,B=5,O=0;n.unstable_shouldYield=function(){return n.unstable_now()>=O},m=function(){},n.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<e?Math.floor(1e3/e):5};var D=new MessageChannel,q=D.port2;D.port1.onmessage=function(){if(C!==null){var e=n.unstable_now();O=e+B;try{C(!0,e)?q.postMessage(null):(T=!1,C=null)}catch(t){throw q.postMessage(null),t}}else T=!1},l=function(e){C=e,T||(T=!0,q.postMessage(null))},i=function(e,t){x=Z(function(){e(n.unstable_now())},t)},y=function(){G(x),x=-1}}function S(e,t){var r=e.length;e.push(t);e:for(;;){var o=r-1>>>1,u=e[o];if(u!==void 0&&0<E(u,t))e[o]=t,e[r]=u,r=o;else break e}}function f(e){return e=e[0],e===void 0?null:e}function I(e){var t=e[0];if(t!==void 0){var r=e.pop();if(r!==t){e[0]=r;e:for(var o=0,u=e.length;o<u;){var v=2*(o+1)-1,_=e[v],P=v+1,k=e[P];if(_!==void 0&&0>E(_,r))k!==void 0&&0>E(k,_)?(e[o]=k,e[P]=r,o=P):(e[o]=_,e[v]=r,o=v);else if(k!==void 0&&0>E(k,r))e[o]=k,e[P]=r,o=P;else break e}}return t}return null}function E(e,t){var r=e.sortIndex-t.sortIndex;return r!==0?r:e.id-t.id}var b=[],p=[],ne=1,c=null,a=3,F=!1,h=!1,g=!1;function j(e){for(var t=f(p);t!==null;){if(t.callback===null)I(p);else if(t.startTime<=e)I(p),t.sortIndex=t.expirationTime,S(b,t);else break;t=f(p)}}function R(e){if(g=!1,j(e),!h)if(f(b)!==null)h=!0,l(U);else{var t=f(p);t!==null&&i(R,t.startTime-e)}}function U(e,t){h=!1,g&&(g=!1,y()),F=!0;var r=a;try{for(j(t),c=f(b);c!==null&&(!(c.expirationTime>t)||e&&!n.unstable_shouldYield());){var o=c.callback;if(typeof o=="function"){c.callback=null,a=c.priorityLevel;var u=o(c.expirationTime<=t);t=n.unstable_now(),typeof u=="function"?c.callback=u:c===f(b)&&I(b),j(t)}else I(b);c=f(b)}if(c!==null)var v=!0;else{var _=f(p);_!==null&&i(R,_.startTime-t),v=!1}return v}finally{c=null,a=r,F=!1}}var te=m;n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(e){e.callback=null},n.unstable_continueExecution=function(){h||F||(h=!0,l(U))},n.unstable_getCurrentPriorityLevel=function(){return a},n.unstable_getFirstCallbackNode=function(){return f(b)},n.unstable_next=function(e){switch(a){case 1:case 2:case 3:var t=3;break;default:t=a}var r=a;a=t;try{return e()}finally{a=r}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=te,n.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var r=a;a=e;try{return t()}finally{a=r}},n.unstable_scheduleCallback=function(e,t,r){var o=n.unstable_now();switch(typeof r=="object"&&r!==null?(r=r.delay,r=typeof r=="number"&&0<r?o+r:o):r=o,e){case 1:var u=-1;break;case 2:u=250;break;case 5:u=1073741823;break;case 4:u=1e4;break;default:u=5e3}return u=r+u,e={id:ne++,callback:t,priorityLevel:e,startTime:r,expirationTime:u,sortIndex:-1},r>o?(e.sortIndex=r,S(p,e),f(b)===null&&e===f(p)&&(g?y():g=!0,i(R,r-o))):(e.sortIndex=u,S(b,e),h||F||(h=!0,l(U))),e},n.unstable_wrapCallback=function(e){var t=a;return function(){var r=a;a=t;try{return e.apply(this,arguments)}finally{a=r}}}})(J);s.exports=J;const K=[s.exports.unstable_ImmediatePriority,s.exports.unstable_UserBlockingPriority,s.exports.unstable_NormalPriority,s.exports.unstable_LowPriority],Q=["noop","ImmediatePriority","UserBlockingPriority","NormalPriority","LowPriority","IdlePriority"];let d=document.querySelector("#react-scheduler"),N=[],Y=s.exports.unstable_IdlePriority,L;const le=()=>{K.forEach(l=>{const i=document.createElement("button");d||(d=document.querySelector("#react-scheduler")),d.appendChild(i),i.id=`btn-${l}`,i.innerText=Q[l],i.onclick=()=>{N.push({priority:l,count:100}),V()}});const n=document.createElement("button");d.appendChild(n),n.innerText="clear task",n.onclick=()=>{d=document.querySelector("#react-scheduler");const l=d.getElementsByTagName("span");console.log("spans",l,l.length);for(let i of l)d.removeChild(i)}},oe=()=>{d&&K.forEach(n=>{const l=document.querySelector(`#btn-${n}`);l&&d.removeChild(l)})},V=()=>{console.log("schedule--------");const n=s.exports.unstable_getFirstCallbackNode(),l=N.sort((y,m)=>y.priority-m.priority)[0];if(!l){L=null,n&&s.exports.unstable_cancelCallback(n);return}const{priority:i}=l;i!==Y&&(n&&s.exports.unstable_cancelCallback(n),L=s.exports.unstable_scheduleCallback(i,z.bind(null,l)))},z=(n,l)=>{const i=n.priority===s.exports.unstable_ImmediatePriority||l;for(;(i||!s.exports.unstable_shouldYield())&&n.count;)n.count--,ie(n.priority);if(Y=n.priority,!n.count){const M=N.indexOf(n);N.splice(M,1),Y=s.exports.unstable_IdlePriority}const y=L;V();const m=L;if(m&&y===m)return z.bind(null,n)},ie=n=>{if(d){const l=document.createElement("span");l.innerText=`${Q[n]} `,l.className=`pri-${n}`,d.appendChild(l)}},ae=()=>(re.exports.useEffect(()=>(le(),()=>{oe()}),[]),H("div",{id:"react-scheduler",children:H("div",{children:"React\u6838\u5FC3\u8C03\u5EA6\u529F\u80FD"})}));export{ae as Scheduler,ae as default};