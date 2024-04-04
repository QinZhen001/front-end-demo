// https://juejin.cn/book/7171733571638738952/section/7174421241225281566?scrollMenuIndex=1

// 麻雀虽小但五脏俱全，以上代码虽然只是个 demo，但已经具备了事件循环的一些核心功能。
// 事件循环的整体架构是一个 while 循环
// 定义任务类型和队列，这里只有一种任务类型和一个队列，比如 Node.js 里有好几种，每种类型的任务有不同的作用。
// 没有任务的时候怎么处理：进入阻塞状态，而不是靠忙轮询。

export class EventSystem {
  constructor() {
    // 需要处理的任务队列
    this.queue = []
    // 标记是否需要退出事件循环
    this.stop = 0
    // 有任务时调用该函数"唤醒" await
    this.wakeup = null
  }

  // 没有任务时，事件循环的进入"阻塞"状态
  wait() {
    return new Promise((resolve) => {
      // 记录 resolve，可能在睡眠期间有任务到来，则需要提前唤醒
      this.wakeup = () => {
        this.wakeup = null
        resolve()
      }
    })
  }

  // 停止事件循环，如果正在"阻塞"，则"唤醒它"
  setStop() {
    this.stop = 1
    this.wakeup && this.wakeup()
  }

  // 生产任务
  enQueue(func) {
    this.queue.push(func)
    this.wakeup && this.wakeup()
  }

  // 处理任务队列
  handleTask() {
    if (this.queue.length === 0) {
      return
    }
    // 本轮事件循环的回调中加入的任务，下一轮事件循环再处理，防止其他任务没有机会处理
    const queue = this.queue
    this.queue = []
    while (queue.length) {
      const func = queue.shift()
      func()
    }
  }

  // 事件循环的实现
  async run() {
    // 如果 stop 等于 1 则退出事件循环
    while (this.stop === 0) {
      // 处理任务，可能没有任务需要处理
      this.handleTask()
      // 处理任务过程中如果设置了 stop 标记则退出事件循环
      if (this.stop === 1) {
        break
      }
      // 没有任务了，进入睡眠
      if (this.queue.length === 0) {
        await this.wait()
      }
    }
    // 退出前可能还有任务没处理，处理完再退出
    this.handleTask()
  }
}
