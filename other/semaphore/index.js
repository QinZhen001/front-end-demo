// 限制异步代码的同时执行
// https://github.com/chriscdn/promise-semaphore
// Limit or throttle the simultaneous execution of asynchronous code in separate iterations of the event loop.

const defaultKey = "_default";

class SemaphoreItem {
  constructor(max = 1) {
    this.queue = [];
    this.max = max;
    this.count = 0;
  }

  acquire() {
    if (this.count < this.max) {
      this.count++;
      return Promise.resolve();
    } else {
      return new Promise((resolve, reject) => {
        this.queue.push(resolve);
      });
    }
  }

  release() {
    const resolveFunc = this.queue.shift();
    if (resolveFunc) {
      // Give the micro task queue a small break instead of calling resolveFunc() directly
      setTimeout(resolveFunc, 0);
    } else {
      this.count--;
    }
  }
}

class Semaphore {
  constructor(max = 1) {
    this.semaphoreItems = {};
    this.max = max;
  }

  _getSemaphoreInstance(key = defaultKey) {
    if (!this.semaphoreItems[key]) {
      this.semaphoreItems[key] = new SemaphoreItem(this.max);
    }
    return this.semaphoreItems[key];
  }

  _tidy(key = defaultKey) {
    if (this._getSemaphoreInstance(key).count == 0) {
      delete this.semaphoreItems[key];
    }
  }

  acquire(key = defaultKey) {
    return this._getSemaphoreInstance(key).acquire();
  }

  release(key = defaultKey) {
    this._getSemaphoreInstance(key).release();
    this._tidy(key);
  }

  count(key = defaultKey) {
    if (this.semaphoreItems[key]) {
      return this.semaphoreItems[key].count;
    } else {
      return 0;
    }
  }

  hasTasks(key = defaultKey) {
    return this.count(key) > 0;
  }
}
