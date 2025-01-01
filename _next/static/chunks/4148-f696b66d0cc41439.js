"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4148],{6046:(e,t,r)=>{var n=r(6658);r.o(n,"usePathname")&&r.d(t,{usePathname:function(){return n.usePathname}}),r.o(n,"useRouter")&&r.d(t,{useRouter:function(){return n.useRouter}})},5217:(e,t,r)=>{r.d(t,{UC:()=>eo,q7:()=>er,bL:()=>et,l9:()=>en});var n=r(2115),o=r(8166),a=r(2576),i=r(8068),s=r(3610),l=r(1488),d=r(3360),u=r(6611),c=r(7028),p=r(7668),f=r(5155),v="Collapsible",[m,w]=(0,o.A)(v),[y,x]=m(v),h=n.forwardRef((e,t)=>{let{__scopeCollapsible:r,open:o,defaultOpen:a,disabled:i,onOpenChange:s,...u}=e,[c=!1,v]=(0,l.i)({prop:o,defaultProp:a,onChange:s});return(0,f.jsx)(y,{scope:r,disabled:i,contentId:(0,p.B)(),open:c,onOpenToggle:n.useCallback(()=>v(e=>!e),[v]),children:(0,f.jsx)(d.sG.div,{"data-state":R(c),"data-disabled":i?"":void 0,...u,ref:t})})});h.displayName=v;var g="CollapsibleTrigger",E=n.forwardRef((e,t)=>{let{__scopeCollapsible:r,...n}=e,o=x(g,r);return(0,f.jsx)(d.sG.button,{type:"button","aria-controls":o.contentId,"aria-expanded":o.open||!1,"data-state":R(o.open),"data-disabled":o.disabled?"":void 0,disabled:o.disabled,...n,ref:t,onClick:(0,s.m)(e.onClick,o.onOpenToggle)})});E.displayName=g;var b="CollapsibleContent",T=n.forwardRef((e,t)=>{let{forceMount:r,...n}=e,o=x(b,e.__scopeCollapsible);return(0,f.jsx)(c.C,{present:r||o.open,children:e=>{let{present:r}=e;return(0,f.jsx)(N,{...n,ref:t,present:r})}})});T.displayName=b;var N=n.forwardRef((e,t)=>{let{__scopeCollapsible:r,present:o,children:a,...s}=e,l=x(b,r),[c,p]=n.useState(o),v=n.useRef(null),m=(0,i.s)(t,v),w=n.useRef(0),y=w.current,h=n.useRef(0),g=h.current,E=l.open||c,T=n.useRef(E),N=n.useRef();return n.useEffect(()=>{let e=requestAnimationFrame(()=>T.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,u.N)(()=>{let e=v.current;if(e){N.current=N.current||{transitionDuration:e.style.transitionDuration,animationName:e.style.animationName},e.style.transitionDuration="0s",e.style.animationName="none";let t=e.getBoundingClientRect();w.current=t.height,h.current=t.width,T.current||(e.style.transitionDuration=N.current.transitionDuration,e.style.animationName=N.current.animationName),p(o)}},[l.open,o]),(0,f.jsx)(d.sG.div,{"data-state":R(l.open),"data-disabled":l.disabled?"":void 0,id:l.contentId,hidden:!E,...s,ref:m,style:{"--radix-collapsible-content-height":y?"".concat(y,"px"):void 0,"--radix-collapsible-content-width":g?"".concat(g,"px"):void 0,...e.style},children:E&&a})});function R(e){return e?"open":"closed"}var C=r(4256),j="Accordion",P=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[A,I,D]=(0,a.N)(j),[L,k]=(0,o.A)(j,[D,w]),S=w(),M=n.forwardRef((e,t)=>{let{type:r,...n}=e;return(0,f.jsx)(A.Provider,{scope:e.__scopeAccordion,children:"multiple"===r?(0,f.jsx)(G,{...n,ref:t}):(0,f.jsx)(K,{...n,ref:t})})});M.displayName=j;var[F,O]=L(j),[_,U]=L(j,{collapsible:!1}),K=n.forwardRef((e,t)=>{let{value:r,defaultValue:o,onValueChange:a=()=>{},collapsible:i=!1,...s}=e,[d,u]=(0,l.i)({prop:r,defaultProp:o,onChange:a});return(0,f.jsx)(F,{scope:e.__scopeAccordion,value:d?[d]:[],onItemOpen:u,onItemClose:n.useCallback(()=>i&&u(""),[i,u]),children:(0,f.jsx)(_,{scope:e.__scopeAccordion,collapsible:i,children:(0,f.jsx)(W,{...s,ref:t})})})}),G=n.forwardRef((e,t)=>{let{value:r,defaultValue:o,onValueChange:a=()=>{},...i}=e,[s=[],d]=(0,l.i)({prop:r,defaultProp:o,onChange:a}),u=n.useCallback(e=>d(function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return[...t,e]}),[d]),c=n.useCallback(e=>d(function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t.filter(t=>t!==e)}),[d]);return(0,f.jsx)(F,{scope:e.__scopeAccordion,value:s,onItemOpen:u,onItemClose:c,children:(0,f.jsx)(_,{scope:e.__scopeAccordion,collapsible:!0,children:(0,f.jsx)(W,{...i,ref:t})})})}),[V,H]=L(j),W=n.forwardRef((e,t)=>{let{__scopeAccordion:r,disabled:o,dir:a,orientation:l="vertical",...u}=e,c=n.useRef(null),p=(0,i.s)(c,t),v=I(r),m="ltr"===(0,C.jH)(a),w=(0,s.m)(e.onKeyDown,e=>{var t;if(!P.includes(e.key))return;let r=e.target,n=v().filter(e=>{var t;return!(null===(t=e.ref.current)||void 0===t?void 0:t.disabled)}),o=n.findIndex(e=>e.ref.current===r),a=n.length;if(-1===o)return;e.preventDefault();let i=o,s=a-1,d=()=>{(i=o+1)>s&&(i=0)},u=()=>{(i=o-1)<0&&(i=s)};switch(e.key){case"Home":i=0;break;case"End":i=s;break;case"ArrowRight":"horizontal"===l&&(m?d():u());break;case"ArrowDown":"vertical"===l&&d();break;case"ArrowLeft":"horizontal"===l&&(m?u():d());break;case"ArrowUp":"vertical"===l&&u()}null===(t=n[i%a].ref.current)||void 0===t||t.focus()});return(0,f.jsx)(V,{scope:r,disabled:o,direction:a,orientation:l,children:(0,f.jsx)(A.Slot,{scope:r,children:(0,f.jsx)(d.sG.div,{...u,"data-orientation":l,ref:p,onKeyDown:o?void 0:w})})})}),q="AccordionItem",[z,B]=L(q),X=n.forwardRef((e,t)=>{let{__scopeAccordion:r,value:n,...o}=e,a=H(q,r),i=O(q,r),s=S(r),l=(0,p.B)(),d=n&&i.value.includes(n)||!1,u=a.disabled||e.disabled;return(0,f.jsx)(z,{scope:r,open:d,disabled:u,triggerId:l,children:(0,f.jsx)(h,{"data-orientation":a.orientation,"data-state":ee(d),...s,...o,ref:t,disabled:u,open:d,onOpenChange:e=>{e?i.onItemOpen(n):i.onItemClose(n)}})})});X.displayName=q;var Y="AccordionHeader";n.forwardRef((e,t)=>{let{__scopeAccordion:r,...n}=e,o=H(j,r),a=B(Y,r);return(0,f.jsx)(d.sG.h3,{"data-orientation":o.orientation,"data-state":ee(a.open),"data-disabled":a.disabled?"":void 0,...n,ref:t})}).displayName=Y;var Z="AccordionTrigger",J=n.forwardRef((e,t)=>{let{__scopeAccordion:r,...n}=e,o=H(j,r),a=B(Z,r),i=U(Z,r),s=S(r);return(0,f.jsx)(A.ItemSlot,{scope:r,children:(0,f.jsx)(E,{"aria-disabled":a.open&&!i.collapsible||void 0,"data-orientation":o.orientation,id:a.triggerId,...s,...n,ref:t})})});J.displayName=Z;var Q="AccordionContent",$=n.forwardRef((e,t)=>{let{__scopeAccordion:r,...n}=e,o=H(j,r),a=B(Q,r),i=S(r);return(0,f.jsx)(T,{role:"region","aria-labelledby":a.triggerId,"data-orientation":o.orientation,...i,...n,ref:t,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...e.style}})});function ee(e){return e?"open":"closed"}$.displayName=Q;var et=M,er=X,en=J,eo=$},7028:(e,t,r)=>{r.d(t,{C:()=>i});var n=r(2115),o=r(8068),a=r(6611),i=e=>{let{present:t,children:r}=e,i=function(e){var t,r;let[o,i]=n.useState(),l=n.useRef({}),d=n.useRef(e),u=n.useRef("none"),[c,p]=(t=e?"mounted":"unmounted",r={mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}},n.useReducer((e,t)=>{let n=r[e][t];return null!=n?n:e},t));return n.useEffect(()=>{let e=s(l.current);u.current="mounted"===c?e:"none"},[c]),(0,a.N)(()=>{let t=l.current,r=d.current;if(r!==e){let n=u.current,o=s(t);e?p("MOUNT"):"none"===o||(null==t?void 0:t.display)==="none"?p("UNMOUNT"):r&&n!==o?p("ANIMATION_OUT"):p("UNMOUNT"),d.current=e}},[e,p]),(0,a.N)(()=>{if(o){var e;let t;let r=null!==(e=o.ownerDocument.defaultView)&&void 0!==e?e:window,n=e=>{let n=s(l.current).includes(e.animationName);if(e.target===o&&n&&(p("ANIMATION_END"),!d.current)){let e=o.style.animationFillMode;o.style.animationFillMode="forwards",t=r.setTimeout(()=>{"forwards"===o.style.animationFillMode&&(o.style.animationFillMode=e)})}},a=e=>{e.target===o&&(u.current=s(l.current))};return o.addEventListener("animationstart",a),o.addEventListener("animationcancel",n),o.addEventListener("animationend",n),()=>{r.clearTimeout(t),o.removeEventListener("animationstart",a),o.removeEventListener("animationcancel",n),o.removeEventListener("animationend",n)}}p("ANIMATION_END")},[o,p]),{isPresent:["mounted","unmountSuspended"].includes(c),ref:n.useCallback(e=>{e&&(l.current=getComputedStyle(e)),i(e)},[])}}(t),l="function"==typeof r?r({present:i.isPresent}):n.Children.only(r),d=(0,o.s)(i.ref,function(e){var t,r;let n=null===(t=Object.getOwnPropertyDescriptor(e.props,"ref"))||void 0===t?void 0:t.get,o=n&&"isReactWarning"in n&&n.isReactWarning;return o?e.ref:(o=(n=null===(r=Object.getOwnPropertyDescriptor(e,"ref"))||void 0===r?void 0:r.get)&&"isReactWarning"in n&&n.isReactWarning)?e.props.ref:e.props.ref||e.ref}(l));return"function"==typeof r||i.isPresent?n.cloneElement(l,{ref:d}):null};function s(e){return(null==e?void 0:e.animationName)||"none"}i.displayName="Presence"},434:(e,t,r)=>{r.d(t,{b:()=>d});var n=r(2115),o=r(3360),a=r(5155),i="horizontal",s=["horizontal","vertical"],l=n.forwardRef((e,t)=>{let{decorative:r,orientation:n=i,...l}=e,d=s.includes(n)?n:i;return(0,a.jsx)(o.sG.div,{"data-orientation":d,...r?{role:"none"}:{"aria-orientation":"vertical"===d?d:void 0,role:"separator"},...l,ref:t})});l.displayName="Separator";var d=l},9930:(e,t,r)=>{r.d(t,{Kq:()=>Z,LM:()=>J,VY:()=>ee,bL:()=>Q,bm:()=>er,hE:()=>$,rc:()=>et});var n=r(2115),o=r(7650),a=r(3610),i=r(8068),s=r(2576),l=r(8166),d=r(9674),u=r(7323),c=r(7028),p=r(3360),f=r(1524),v=r(1488),m=r(6611),w=r(3543),y=r(5155),x="ToastProvider",[h,g,E]=(0,s.N)("Toast"),[b,T]=(0,l.A)("Toast",[E]),[N,R]=b(x),C=e=>{let{__scopeToast:t,label:r="Notification",duration:o=5e3,swipeDirection:a="right",swipeThreshold:i=50,children:s}=e,[l,d]=n.useState(null),[u,c]=n.useState(0),p=n.useRef(!1),f=n.useRef(!1);return r.trim()||console.error("Invalid prop `label` supplied to `".concat(x,"`. Expected non-empty `string`.")),(0,y.jsx)(h.Provider,{scope:t,children:(0,y.jsx)(N,{scope:t,label:r,duration:o,swipeDirection:a,swipeThreshold:i,toastCount:u,viewport:l,onViewportChange:d,onToastAdd:n.useCallback(()=>c(e=>e+1),[]),onToastRemove:n.useCallback(()=>c(e=>e-1),[]),isFocusedToastEscapeKeyDownRef:p,isClosePausedRef:f,children:s})})};C.displayName=x;var j="ToastViewport",P=["F8"],A="toast.viewportPause",I="toast.viewportResume",D=n.forwardRef((e,t)=>{let{__scopeToast:r,hotkey:o=P,label:a="Notifications ({hotkey})",...s}=e,l=R(j,r),u=g(r),c=n.useRef(null),f=n.useRef(null),v=n.useRef(null),m=n.useRef(null),w=(0,i.s)(t,m,l.onViewportChange),x=o.join("+").replace(/Key/g,"").replace(/Digit/g,""),E=l.toastCount>0;n.useEffect(()=>{let e=e=>{var t;0!==o.length&&o.every(t=>e[t]||e.code===t)&&(null===(t=m.current)||void 0===t||t.focus())};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)},[o]),n.useEffect(()=>{let e=c.current,t=m.current;if(E&&e&&t){let r=()=>{if(!l.isClosePausedRef.current){let e=new CustomEvent(A);t.dispatchEvent(e),l.isClosePausedRef.current=!0}},n=()=>{if(l.isClosePausedRef.current){let e=new CustomEvent(I);t.dispatchEvent(e),l.isClosePausedRef.current=!1}},o=t=>{e.contains(t.relatedTarget)||n()},a=()=>{e.contains(document.activeElement)||n()};return e.addEventListener("focusin",r),e.addEventListener("focusout",o),e.addEventListener("pointermove",r),e.addEventListener("pointerleave",a),window.addEventListener("blur",r),window.addEventListener("focus",n),()=>{e.removeEventListener("focusin",r),e.removeEventListener("focusout",o),e.removeEventListener("pointermove",r),e.removeEventListener("pointerleave",a),window.removeEventListener("blur",r),window.removeEventListener("focus",n)}}},[E,l.isClosePausedRef]);let b=n.useCallback(e=>{let{tabbingDirection:t}=e,r=u().map(e=>{let r=e.ref.current,n=[r,...function(e){let t=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:e=>{let t="INPUT"===e.tagName&&"hidden"===e.type;return e.disabled||e.hidden||t?NodeFilter.FILTER_SKIP:e.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;r.nextNode();)t.push(r.currentNode);return t}(r)];return"forwards"===t?n:n.reverse()});return("forwards"===t?r.reverse():r).flat()},[u]);return n.useEffect(()=>{let e=m.current;if(e){let t=t=>{let r=t.altKey||t.ctrlKey||t.metaKey;if("Tab"===t.key&&!r){var n,o,a;let r=document.activeElement,i=t.shiftKey;if(t.target===e&&i){null===(n=f.current)||void 0===n||n.focus();return}let s=b({tabbingDirection:i?"backwards":"forwards"}),l=s.findIndex(e=>e===r);Y(s.slice(l+1))?t.preventDefault():i?null===(o=f.current)||void 0===o||o.focus():null===(a=v.current)||void 0===a||a.focus()}};return e.addEventListener("keydown",t),()=>e.removeEventListener("keydown",t)}},[u,b]),(0,y.jsxs)(d.lg,{ref:c,role:"region","aria-label":a.replace("{hotkey}",x),tabIndex:-1,style:{pointerEvents:E?void 0:"none"},children:[E&&(0,y.jsx)(k,{ref:f,onFocusFromOutsideViewport:()=>{Y(b({tabbingDirection:"forwards"}))}}),(0,y.jsx)(h.Slot,{scope:r,children:(0,y.jsx)(p.sG.ol,{tabIndex:-1,...s,ref:w})}),E&&(0,y.jsx)(k,{ref:v,onFocusFromOutsideViewport:()=>{Y(b({tabbingDirection:"backwards"}))}})]})});D.displayName=j;var L="ToastFocusProxy",k=n.forwardRef((e,t)=>{let{__scopeToast:r,onFocusFromOutsideViewport:n,...o}=e,a=R(L,r);return(0,y.jsx)(w.s,{"aria-hidden":!0,tabIndex:0,...o,ref:t,style:{position:"fixed"},onFocus:e=>{var t;let r=e.relatedTarget;(null===(t=a.viewport)||void 0===t?void 0:t.contains(r))||n()}})});k.displayName=L;var S="Toast",M=n.forwardRef((e,t)=>{let{forceMount:r,open:n,defaultOpen:o,onOpenChange:i,...s}=e,[l=!0,d]=(0,v.i)({prop:n,defaultProp:o,onChange:i});return(0,y.jsx)(c.C,{present:r||l,children:(0,y.jsx)(_,{open:l,...s,ref:t,onClose:()=>d(!1),onPause:(0,f.c)(e.onPause),onResume:(0,f.c)(e.onResume),onSwipeStart:(0,a.m)(e.onSwipeStart,e=>{e.currentTarget.setAttribute("data-swipe","start")}),onSwipeMove:(0,a.m)(e.onSwipeMove,e=>{let{x:t,y:r}=e.detail.delta;e.currentTarget.setAttribute("data-swipe","move"),e.currentTarget.style.setProperty("--radix-toast-swipe-move-x","".concat(t,"px")),e.currentTarget.style.setProperty("--radix-toast-swipe-move-y","".concat(r,"px"))}),onSwipeCancel:(0,a.m)(e.onSwipeCancel,e=>{e.currentTarget.setAttribute("data-swipe","cancel"),e.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),e.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),e.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"),e.currentTarget.style.removeProperty("--radix-toast-swipe-end-y")}),onSwipeEnd:(0,a.m)(e.onSwipeEnd,e=>{let{x:t,y:r}=e.detail.delta;e.currentTarget.setAttribute("data-swipe","end"),e.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),e.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),e.currentTarget.style.setProperty("--radix-toast-swipe-end-x","".concat(t,"px")),e.currentTarget.style.setProperty("--radix-toast-swipe-end-y","".concat(r,"px")),d(!1)})})})});M.displayName=S;var[F,O]=b(S,{onClose(){}}),_=n.forwardRef((e,t)=>{let{__scopeToast:r,type:s="foreground",duration:l,open:u,onClose:c,onEscapeKeyDown:v,onPause:m,onResume:w,onSwipeStart:x,onSwipeMove:g,onSwipeCancel:E,onSwipeEnd:b,...T}=e,N=R(S,r),[C,j]=n.useState(null),P=(0,i.s)(t,e=>j(e)),D=n.useRef(null),L=n.useRef(null),k=l||N.duration,M=n.useRef(0),O=n.useRef(k),_=n.useRef(0),{onToastAdd:K,onToastRemove:G}=N,V=(0,f.c)(()=>{var e;(null==C?void 0:C.contains(document.activeElement))&&(null===(e=N.viewport)||void 0===e||e.focus()),c()}),H=n.useCallback(e=>{e&&e!==1/0&&(window.clearTimeout(_.current),M.current=new Date().getTime(),_.current=window.setTimeout(V,e))},[V]);n.useEffect(()=>{let e=N.viewport;if(e){let t=()=>{H(O.current),null==w||w()},r=()=>{let e=new Date().getTime()-M.current;O.current=O.current-e,window.clearTimeout(_.current),null==m||m()};return e.addEventListener(A,r),e.addEventListener(I,t),()=>{e.removeEventListener(A,r),e.removeEventListener(I,t)}}},[N.viewport,k,m,w,H]),n.useEffect(()=>{u&&!N.isClosePausedRef.current&&H(k)},[u,k,N.isClosePausedRef,H]),n.useEffect(()=>(K(),()=>G()),[K,G]);let W=n.useMemo(()=>C?function e(t){let r=[];return Array.from(t.childNodes).forEach(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent&&r.push(t.textContent),t.nodeType===t.ELEMENT_NODE){let n=t.ariaHidden||t.hidden||"none"===t.style.display,o=""===t.dataset.radixToastAnnounceExclude;if(!n){if(o){let e=t.dataset.radixToastAnnounceAlt;e&&r.push(e)}else r.push(...e(t))}}}),r}(C):null,[C]);return N.viewport?(0,y.jsxs)(y.Fragment,{children:[W&&(0,y.jsx)(U,{__scopeToast:r,role:"status","aria-live":"foreground"===s?"assertive":"polite","aria-atomic":!0,children:W}),(0,y.jsx)(F,{scope:r,onClose:V,children:o.createPortal((0,y.jsx)(h.ItemSlot,{scope:r,children:(0,y.jsx)(d.bL,{asChild:!0,onEscapeKeyDown:(0,a.m)(v,()=>{N.isFocusedToastEscapeKeyDownRef.current||V(),N.isFocusedToastEscapeKeyDownRef.current=!1}),children:(0,y.jsx)(p.sG.li,{role:"status","aria-live":"off","aria-atomic":!0,tabIndex:0,"data-state":u?"open":"closed","data-swipe-direction":N.swipeDirection,...T,ref:P,style:{userSelect:"none",touchAction:"none",...e.style},onKeyDown:(0,a.m)(e.onKeyDown,e=>{"Escape"!==e.key||(null==v||v(e.nativeEvent),e.nativeEvent.defaultPrevented||(N.isFocusedToastEscapeKeyDownRef.current=!0,V()))}),onPointerDown:(0,a.m)(e.onPointerDown,e=>{0===e.button&&(D.current={x:e.clientX,y:e.clientY})}),onPointerMove:(0,a.m)(e.onPointerMove,e=>{if(!D.current)return;let t=e.clientX-D.current.x,r=e.clientY-D.current.y,n=!!L.current,o=["left","right"].includes(N.swipeDirection),a=["left","up"].includes(N.swipeDirection)?Math.min:Math.max,i=o?a(0,t):0,s=o?0:a(0,r),l="touch"===e.pointerType?10:2,d={x:i,y:s},u={originalEvent:e,delta:d};n?(L.current=d,B("toast.swipeMove",g,u,{discrete:!1})):X(d,N.swipeDirection,l)?(L.current=d,B("toast.swipeStart",x,u,{discrete:!1}),e.target.setPointerCapture(e.pointerId)):(Math.abs(t)>l||Math.abs(r)>l)&&(D.current=null)}),onPointerUp:(0,a.m)(e.onPointerUp,e=>{let t=L.current,r=e.target;if(r.hasPointerCapture(e.pointerId)&&r.releasePointerCapture(e.pointerId),L.current=null,D.current=null,t){let r=e.currentTarget,n={originalEvent:e,delta:t};X(t,N.swipeDirection,N.swipeThreshold)?B("toast.swipeEnd",b,n,{discrete:!0}):B("toast.swipeCancel",E,n,{discrete:!0}),r.addEventListener("click",e=>e.preventDefault(),{once:!0})}})})})}),N.viewport)})]}):null}),U=e=>{let{__scopeToast:t,children:r,...o}=e,a=R(S,t),[i,s]=n.useState(!1),[l,d]=n.useState(!1);return function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:()=>{},t=(0,f.c)(e);(0,m.N)(()=>{let e=0,r=0;return e=window.requestAnimationFrame(()=>r=window.requestAnimationFrame(t)),()=>{window.cancelAnimationFrame(e),window.cancelAnimationFrame(r)}},[t])}(()=>s(!0)),n.useEffect(()=>{let e=window.setTimeout(()=>d(!0),1e3);return()=>window.clearTimeout(e)},[]),l?null:(0,y.jsx)(u.Z,{asChild:!0,children:(0,y.jsx)(w.s,{...o,children:i&&(0,y.jsxs)(y.Fragment,{children:[a.label," ",r]})})})},K=n.forwardRef((e,t)=>{let{__scopeToast:r,...n}=e;return(0,y.jsx)(p.sG.div,{...n,ref:t})});K.displayName="ToastTitle";var G=n.forwardRef((e,t)=>{let{__scopeToast:r,...n}=e;return(0,y.jsx)(p.sG.div,{...n,ref:t})});G.displayName="ToastDescription";var V="ToastAction",H=n.forwardRef((e,t)=>{let{altText:r,...n}=e;return r.trim()?(0,y.jsx)(z,{altText:r,asChild:!0,children:(0,y.jsx)(q,{...n,ref:t})}):(console.error("Invalid prop `altText` supplied to `".concat(V,"`. Expected non-empty `string`.")),null)});H.displayName=V;var W="ToastClose",q=n.forwardRef((e,t)=>{let{__scopeToast:r,...n}=e,o=O(W,r);return(0,y.jsx)(z,{asChild:!0,children:(0,y.jsx)(p.sG.button,{type:"button",...n,ref:t,onClick:(0,a.m)(e.onClick,o.onClose)})})});q.displayName=W;var z=n.forwardRef((e,t)=>{let{__scopeToast:r,altText:n,...o}=e;return(0,y.jsx)(p.sG.div,{"data-radix-toast-announce-exclude":"","data-radix-toast-announce-alt":n||void 0,...o,ref:t})});function B(e,t,r,n){let{discrete:o}=n,a=r.originalEvent.currentTarget,i=new CustomEvent(e,{bubbles:!0,cancelable:!0,detail:r});t&&a.addEventListener(e,t,{once:!0}),o?(0,p.hO)(a,i):a.dispatchEvent(i)}var X=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=Math.abs(e.x),o=Math.abs(e.y),a=n>o;return"left"===t||"right"===t?a&&n>r:!a&&o>r};function Y(e){let t=document.activeElement;return e.some(e=>e===t||(e.focus(),document.activeElement!==t))}var Z=C,J=D,Q=M,$=K,ee=G,et=H,er=q}}]);