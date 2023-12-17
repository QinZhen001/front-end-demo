import KVue from "./src/kvue"

const vue = new KVue({
  el: '#app',
  data: {
    name: "test.",
    age: 12,
    html: '<button>这是一个按钮</button>'
  },
  created() {
    console.log('开始啦')
    setTimeout(() => {
      this.name = '我是测试'
    }, 1500)
  },
  methods: {
    changeName(val) {
      console.log(val.target.value)
      debugger
      // this.name = 'test1234567'
      // this.age = 1
    }
  }
})
