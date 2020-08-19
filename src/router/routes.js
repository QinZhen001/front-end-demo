export default [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/test-vuex',
    component: () => import('@/views/testVuex.vue'),
  }
]