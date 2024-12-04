// @ts-nocheck

import { useEffect } from "react"
import ZVue from "./code/index"

const Vue3Realize = () => {
  useEffect(() => {
    initDom()
    initVue()
  }, [])

  const initDom = () => {
    let html = `
    <div>姓名：{{ name }}</div>
    <div>{{ content }}</div>
    <div>
      <input type="text" z-model="name" placeholder="请输入自我介绍" />
    </div>
    <div z-html="htmlData"></div>`
    document.querySelector("#app").innerHTML = html
  }

  const initVue = () => {
    const vue = new ZVue({
      el: "#app",
      data: {
        name: "someName",
        content: "someContent",
        htmlData: '<a href="#">some html</a>',
      },
    })

    window.vue = vue
    console.log("custom vue3: ", vue)
  }

  return (
    <div>
      vue3
      <div id="app"></div>
    </div>
  )
}

export default Vue3Realize
