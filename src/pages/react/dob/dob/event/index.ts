import { IDebugInfo, EventType, IEvent, ICallback } from "../types"

export class Event {
  private events: Map<EventType, IEvent[]> = new Map()

  // 函数重载
  // TS的函数重载主要分为多个重载签名+实现签名+函数体
  // https://juejin.cn/post/7055668560965681182#heading-1
  public on(eventType: "debug", callback: (context?: IDebugInfo) => void): void
  public on(
    eventType: "deleteProperty",
    callback: (context?: { target: any; key: PropertyKey }) => void,
  ): void
  public on(
    eventType: "get",
    callback: (context?: { target: any; key: PropertyKey; value: any }) => void,
  ): void
  public on(
    eventType: "set",
    callback: (context?: { target: any; key: PropertyKey; value: any; oldValue: any }) => void,
  ): void
  public on(eventType: "startBatch" | "endBatch", callback: () => void): void
  public on(eventType: "runInAction", callback: (debugName?: string) => void): void
  public on(eventType: EventType, callback: ICallback): void {
    const event: IEvent = {
      callback,
    }

    if (this.events.get(eventType)) {
      // 存在, push 一个事件监听
      this!.events!.get(eventType)!.push(event)
    } else {
      // 不存在, 赋值
      this.events.set(eventType, [event])
    }
  }

  // 取消订阅
  public off(eventType: EventType, callback: ICallback) {
    if (!this.events.get(eventType)) {
      return false
    }

    const events = this!.events!.get(eventType)!.filter((event) => {
      return event.callback !== callback
    })

    this.events.set(eventType, events)

    return true
  }

  // 广播事件
  public emit(eventType: EventType, context?: any) {
    if (!eventType || !this.events.get(eventType)) {
      return false
    }

    this!.events!.get(eventType)!.forEach((event) => {
      event.callback(context)
    })

    return true
  }
}
