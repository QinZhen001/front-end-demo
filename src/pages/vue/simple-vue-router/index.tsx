import Vue from "./assets/vue.min.js"
import { useEffect } from "react";
import VueRouter from "./myVueRouter.js"

const SimpleVueRouter = () => {

  useEffect(() => { 
    init()
  },[])

  const init = () => {
    const vue = new Vue({
      el: '#app',
      data: {
        name: "test",
        age: 12,
        html: '<button>这是一个按钮</button>'
      },
      created() {
      },
      methods: {

      }
    })
    vue.use(VueRouter)
  }

  return <div>simple-vue-router</div>;
}

export default SimpleVueRouter
