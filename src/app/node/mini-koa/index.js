const path = require("path")

const KOB = require("./src/kob.js")
const app = new KOB()

const staticPlugin = require("./src/static.js")
app.use(staticPlugin(path.resolve(__dirname, "./src/public")))

const Router = require("./src/router.js")
const router = new Router()

router.get("/index", async (ctx) => {
  ctx.body = "index page"
})
router.get("/post", async (ctx) => {
  ctx.body = "post page"
})
router.get("/list", async (ctx) => {
  ctx.body = "list page"
})
router.post("/index", async (ctx) => {
  ctx.body = "post page"
})

// 路由实例输出父中间件 router.routes()
app.use(router.routes())

app.listen(3000)
