class Event {
  events = new Map()


  // 触发事件
  on(eventType, callback) {
    const event = {
      callback
    }
    if (this.events.get(eventType)) {
      this.events.get(eventType).push(event)
    } else {
      this.events.set(eventType, [event]);
    }
  }

  // 取消订阅
  off(eventType, callback) {
    if (!this.events.get(eventType)) {
      return false;
    }
    const events = this.events.get(eventType).filter(event => {
      return event.callback !== callback;
    });

    this.events.set(eventType, events);

    return true;
  }

  // 发布事件
  emit(eventType, context) {
    if (!eventType || !this.events.get(eventType)) {
      return false
    }

    this.events.get(eventType).forEach(event => {
      event.callback(context);
    });

    return true;
  }
}
