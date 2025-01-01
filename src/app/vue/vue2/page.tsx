// @ts-nocheck

"use client"

import KVue from "./code/src/kvue"
import { useEffect } from "react"

const Vue2Realize = () => {
  useEffect(() => {
    initDom()
    initVue()
  }, [])

  const initDom = () => {
    const node = document.getElementById("vue")!
    node.innerHTML = `
      <div id="app">
        <div k-text="name"></div>
        <div>name: {{name}}</div>
        <div>{{age}}</div>
        <input type="text" k-model="name">
        <button @click="changeName">changeName</button>
        <div k-html="html"></div>
    </div>
    `
  }

  const initVue = () => {
    const vue = new KVue({
      el: "#app",
      data: {
        name: "test",
        age: 12,
        html: "<button>这是一个按钮</button>",
      },
      created() {
        // setTimeout(() => {
        //   this.name = 'created change name'
        // }, 3000)
      },
      methods: {
        changeName() {
          console.log("before change name: ", this.name)
          this.name = "changeName"
          console.log("after change name: ", this.name)
        },
      },
    })

    window.vue = vue
    console.log("custom vue2: ", vue)
  }

  return <div id="vue"></div>
}

export default Vue2Realize
