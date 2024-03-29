// 每 10s 检查一次
const CHECK_CRASH_INTERVAL = 10 * 1000

// 超过15s没有心跳则认为已经 crash
const CRASH_THRESHOLD = 15 * 1000

const pages = {}

let timer

function checkCrash() {
  const now = Date.now()
  for (let id in pages) {
    let page = pages[id]
    if (now - page.t > CRASH_THRESHOLD) {
      // 上报 crash
      console.log("页面发生崩溃")
      delete pages[id]
    }
  }

  if (Object.keys(pages).length == 0) {
    clearInterval(timer)
    timer = null
  }
}

this.addEventListener("message", (e) => {
  console.log("service worker 接收", e.data.type)
  const data = e.data

  if (data.type === "running") {
    // 正常心跳
    pages[data.id] = {
      t: Date.now(),
    }
    if (!timer) {
      timer = setInterval(() => {
        checkCrash()
      }, CHECK_CRASH_INTERVAL)
    }
  } else if (data.type === "clear") {
    delete pages[data.id]
  }
})
