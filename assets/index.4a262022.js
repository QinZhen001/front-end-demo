import{j as s,F as u,a,r as o}from"./index.e68da9fa.js";function d(){let e=f(),t=h();return{user:i(e),posts:i(t)}}function i(e){let t="pending",r,c=e.then(n=>{t="success",r=n},n=>{t="error",r=n});return{read(){if(t==="pending")throw c;if(t==="error")throw r;if(t==="success")return r}}}function f(){return console.log("fetch user..."),new Promise(e=>{setTimeout(()=>{console.log("fetched user"),e({name:"Ringo Starr"})},1e3)})}function h(){return console.log("fetch posts..."),new Promise(e=>{setTimeout(()=>{console.log("fetched posts"),e([{id:0,text:"I get by with a little help from my friends"},{id:1,text:"I'd like to be under the sea in an octupus's garden"},{id:2,text:"You got that sand all over your feet"}])},1100)})}const l=d();function p(){const e=l.user.read();return s("h1",{children:e.name})}function m(){const e=l.posts.read();return s("ul",{children:e.map(t=>s("li",{children:t.text},t.id))})}const x=()=>s(u,{children:a(o.exports.Suspense,{fallback:s("h1",{children:"Loading profile..."}),children:[s(p,{}),s(o.exports.Suspense,{fallback:s("h1",{children:"Loading posts..."}),children:s(m,{})})]})});export{x as TestSuspense,x as default};