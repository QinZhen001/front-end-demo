import{r,j as t}from"./index.e68da9fa.js";const a="abcde fghijk lmnop qrstu vwxyz",i=()=>{const[n,s]=r.exports.useState("");return r.exports.useEffect(()=>{const l=setInterval(()=>{s(e=>e.length>=1e3?"":e.length%80===0?e+`
`:e+a[Math.floor(Math.random()*a.length)])},100);return()=>{clearInterval(l)}},[]),t("div",{className:"multiple-type",children:t("div",{className:"example",children:t("p",{children:n})})})};export{i as default};
