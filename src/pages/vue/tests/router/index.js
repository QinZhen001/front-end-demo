import Vue from "vue"
import Router from 'vue-router'
// TODO:引入自己的vue-router
// 引入自己vue-router
// import Router from '..//simple-vue-router/myVueRouter'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: routes
})


export default router