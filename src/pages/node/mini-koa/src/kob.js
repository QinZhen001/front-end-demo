const http = require("http")
const context = require("./context")
const request = require("./request")
const response = require("./response")

/**
 *  核心模块
 *  模拟koa实现
 */
class KOB {
  constructor() {
    this.middlewares = []
  }

  createContext(req, res) {
    const ctx = Object.create(context)
    // 创建上下文
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)

    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res
    return ctx
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      const ctx = this.createContext(req, res)
      const fn = this.compose(this.middlewares)
      await fn(ctx)
      res.end(ctx.body)
    })
    server.listen(...args)
  }

  /**
   * 使用中间件
   * @param {} middleware
   */
  use(middleware) {
    this.middlewares.push(middleware)
  }

  /**
   * 处理中间件 （高阶函数） (核心)
   * @param {} middlewares
   */
  compose(middlewares) {
    return function (ctx) {
      return dispatch(0)

      function dispatch(i) {
        let fn = middlewares[i]
        if (!fn) {
          return Promise.resolve()
        }
        return Promise.resolve(
          fn(ctx, function next() {
            return dispatch(i + 1)
          }),
        )
      }
    }
  }
}

module.exports = KOB
