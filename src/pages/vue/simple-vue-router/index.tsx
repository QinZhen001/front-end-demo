// @ts-nocheck
import Vue from './assets/vue.min.js'
import { useEffect } from "react";
import VueRouter from "./code/index.js"

Vue.use(VueRouter)

// 全局注册组件
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }



const routes = [
  { path: '/vue/simple-vue-router/foo', component: Foo },
  { path: '/vue/simple-vue-router/bar', component: Bar }
]

const router = new VueRouter({
  routes
})

// const url = new URL('./index.html', import.meta.url).href

const SimpleVueRouter = () => {

  useEffect(() => {
    init()
  }, [])

  const init = () => {

    const vue = new Vue({
      el: '#app',
      router,
      mounted() {
        console.log('created')
        console.log('this.$route', this.$route)
        console.log('this.$router', this.$router)
      }
    })


    window.vue = vue
    console.log('vue', vue)
  }

  return <div>
    <div id="app">
      <div>simple-vue-router</div>
      <div>
        <router-link to="/vue/simple-vue-router/foo">Go to Foo</router-link>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <router-link to="/vue/simple-vue-router/bar">Go to Bar</router-link>
      </div>
      <div>router-view</div>
      <router-view></router-view>
    </div>
  </div>;
}

export default SimpleVueRouter
