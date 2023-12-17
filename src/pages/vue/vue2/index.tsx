import { useEffect } from "react";

// need kvue 

const Vue2Realize = () => {

  useEffect(()=>{
    init()
  },[])

  const init = () => {
    const node = document.getElementById('vue3')!
    node.innerHTML = `
      <div id="app">
      <p>{{name}}</p>
      <p k-text="name"></p>
      <br>
      <p>age:{{age}}</p>
      <p>
          {{doubleAge}}
      </p>
      <input type="text" k-model="name">
      <button @click="changeName">changeName</button>
      <div k-html="html"></div>
    </div>
    `
  }

  return <div>
    <div id="vue3"></div>
  </div>;
}

export default Vue2Realize
