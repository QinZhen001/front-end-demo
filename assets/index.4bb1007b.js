import{r as e,a as x,j as a}from"./index.0c4de285.js";const h=()=>{const[i,o]=e.exports.useState(""),[r,u]=e.exports.useState([]),[p,c]=e.exports.useTransition(),l=2e4;function d(t){o(t.target.value),c(()=>{const s=[];for(let n=0;n<l;n++)s.push(t.target.value);u(s)})}return x("div",{children:[a("input",{type:"text",value:i,onChange:d}),p?"Loading...":r.map((t,s)=>a("div",{children:t},s))]})};export{h as UseTransition,h as default};
