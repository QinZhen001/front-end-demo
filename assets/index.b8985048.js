import{r as s,a as u,j as t}from"./index.e68da9fa.js";const n=300,a=300;let f=0;const w=()=>{const r=s.exports.useRef(null),l=s.exports.useRef(null),[h,v]=s.exports.useState("");let o;const c=[],i=()=>{R(),requestAnimationFrame(i)},R=()=>{if(!r.current)throw new Error("canvasRef.current is null");const e=r.current.getContext("2d");e.fillStyle="red",e.clearRect(0,0,n,a),e.save(),e.translate(n/2,a/2),e.rotate(f++*Math.PI/180),e.translate(-n/2,-a/2),e.beginPath(),e.rect(100,100,50,50),e.fill(),e.restore()};return u("div",{children:[u("div",{children:[t("button",{onClick:i,children:"drawCanvas"}),t("button",{onClick:()=>{if(!r.current)throw new Error("canvasRef.current is null");const e=r.current.captureStream();console.log("stream",e),o=new MediaRecorder(e,{mimeType:"video/webm"}),o.ondataavailable=d=>{console.log("mediaRecorder ondataavailable ",d),c.push(d.data)},o.start(1e3)},children:"record"}),t("button",{onClick:()=>{o.stop();const e=URL.createObjectURL(new Blob(c,{type:"video/webm"}));console.log("onstop data",c),console.log("onstop url",e),l.current.src=e,v(e)},children:"stop"})]}),t("canvas",{ref:r,width:n,height:a}),t("div",{children:t("video",{controls:!0,ref:l})})]})};export{w as default};
