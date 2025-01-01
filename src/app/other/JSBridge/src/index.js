"use client"

let ua = ""
if (typeof navigator !== "undefined") {
  ua = navigator.userAgent
}
const IOS = "ios"
const ANDROID = "android"

// WebViewJavascriptBridge 是一个用于在 Android 和 iOS 同时使用的 WebView 和 JavaScript 进行通信的桥接库。
// 它可以方便地在 WebView 中注册 JavaScript 函数和 Native 函数，从而实现 JavaScript 和 Native 之间的相互调用和数据传递。
// WebViewJavascriptBridge 可以解决 WebView 和 JavaScript 之间通信想复杂、局限性高的问题，提供了一个简单、高效的解决方案。

// 在 Native 端，通过创建一个 Webview 或者 WebViewJavascriptBridge 对象来与 JavaScript 进行通信。

// 在 Native 端通过注入 JavaScript 代码，将一个 JavaScript 的对象或者函数暴露给 JavaScript 端，
// 使得 JavaScript 可以通过该对象或者函数来调用 Native 的方法。

// TIP:
// iosMethod/androidMethod
// 当 h5 js 调用 native 方法时 会带上 callBackId (在这里是 method + uid),
// 并将 callBackId 对应的 callBack 存入 eventMap

// 在 Native 端，通过 WebView 的代理方法或者 WebViewJavascriptBridge 对象的调用方法，将 Native 的方法回调给 JavaScript 端。
// Native 端通过 evaluateJavascript/stringByEvaluatingJavaScript 方法，执行 JavaScript 逻辑，callBackId 找到对应的 eventMap callBack 并执行

/**
 * 监听浏览器回退事件
 * @param cb
 */
function pageBackFromNextPage(cb) {
  // pageshow
  window.addEventListener(
    "pageshow",
    function (e) {
      if (e.persisted) {
        cb(e)
      }
    },
    false,
  )

  // visibilityChange
  document.addEventListener(
    "visibilitychange",
    function (e) {
      if (document.visibilityState == "visible" || !document.hidden) {
        cb(e)
      }
    },
    false,
  )

  // webkitVisibilityChange
  document.addEventListener(
    "webkitVisibilitychange",
    function (e) {
      if (document.webkitVisibilityState == "visible" || !document.webkitHidden) {
        cb(e)
      }
    },
    false,
  )
}

/**
 * 监听浏览器暂停事件（压入后台）
 * @param cb
 */
function pagePause(cb) {
  // pageshow
  window.addEventListener(
    "pagehide",
    function (e) {
      if (e.persisted) {
        cb(e)
      }
    },
    false,
  )

  // visibilityChange
  document.addEventListener(
    "visibilitychange",
    function (e) {
      if (document.visibilityState == "hidden" || document.hidden) {
        cb(e)
      }
    },
    false,
  )

  // webkitVisibilityChange
  document.addEventListener(
    "webkitVisibilitychange",
    function (e) {
      if (document.webkitVisibilityState == "hidden" || document.webkitHidden) {
        cb(e)
      }
    },
    false,
  )
}

function isJSBridgeAPPDemo() {
  // 移动端可以自定义userAgent
  if (/JSBridgeDemoUserAgent/.test(ua)) {
    return true
  }
  return false
}

function getDeviceInfo() {
  const device = {
    type: null,
    version: null,
  }
  // 设备类型
  if (/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua)) {
    // iOS: Mozilla/5.0 (iPhone; CPU iPhone OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H321 AliApp(LX/5.8.1) AliTrip/5.8.1
    device.type = IOS

    // iOS 版本号提取
    const iosVersion = /\b[0-9]+_[0-9]+(?:_[0-9]+)?\b/.exec(ua)
    if (iosVersion && iosVersion[0]) {
      device.version = iosVersion[0].replace(/_/g, ".")
    }
  } else if (/Android/i.test(ua)) {
    device.type = ANDROID
    const match = ua.match(/Android\s+([\d\.]+)/i)
    device.version = match && match[1]
  } else {
    device.type = undefined
  }
  return device
}

const JSBridge = {
  isJSBridgeAPPDemo: isJSBridgeAPPDemo(),
  device: getDeviceInfo(),
  eventMap: {
    // 事件队列
  },
  uid: 0,
  getDeviceId(callback) {
    // 获取设备id
    this.deviceRouter("getDeviceId", null, callback)
  },
  deviceRouter(method, params, callback, isHold) {
    if (!this.isJSBridgeAPPDemo) {
      console.log("isJSBridgeAPPDemo：false")
      return false
    }
    if (this.device.type == IOS) {
      this.iosMethod(method, params, callback, isHold)
    } else if (this.device.type == ANDROID) {
      this.androidMethod(method, params, callback, isHold)
    } else {
      console.error("请在native端使用此方法：" + method)
    }
  },
  iosMethod(method, params, callback, isHold) {
    const uid = this.uid
    if (callback) {
      this.eventMap[method + uid] = (data) => {
        callback && callback(data)
        if (!isHold) {
          // 箭头函数保证此处的this
          delete this.eventMap[method + uid]
        }
      }
      this.uid++
    }
    try {
      const msgObj = {
        nativeMethod: method,
      }
      if (callback) {
        msgObj.callback = method + uid
      }
      if (params) {
        msgObj.params = JSON.stringify(params)
      }
      // 发消息给 native
      window.webkit.messageHandlers.JSBridge.postMessage(msgObj)
    } catch (e) {
      console.error(JSON.stringify(e))
      console.error("需要在ios设备内使用WKWebView")
    }
  },
  androidMethod(method, params, callback, isHold) {
    const uid = this.uid
    if (callback) {
      this.eventMap[method + uid] = () => {
        callback && callback(data)
        if (!isHold) {
          delete this.eventMap[method + uid]
        }
      }
      this.uid++
    }
    try {
      if (params && callback) {
        // 查看 android/WebViewActivity.java  在window上注入了
        JSBridgeAndroid[method](JSON.stringify(params), method + uid)
      } else if (params) {
        JSBridgeAndroid[method](JSON.stringify(params))
      } else if (callback) {
        JSBridgeAndroid[method](method + uid)
      } else {
        JSBridgeAndroid[method]()
      }
    } catch (e) {
      console.error(JSON.stringify(e))
      console.error("需要在android设备内使用JSBridge功能，无全局对象JSBridgeAndroid")
    }
  },
  // 打开新的webview
  openPage(url) {
    this.deviceRouter("openPage", { url }, null)
    if (!this.isJSBridgeAPPDemo) {
      location.href = url
    }
  },
  // 关闭页面
  popPage(n) {
    if (!n) {
      n = 1
    }
    this.deviceRouter("popPage", { step: n }, null)
    if (!this.isJSBridgeAPPDemo) {
      if (n == 1) {
        history.back()
      } else {
        history.go(-n)
      }
    }
  },
  // 隐藏native title bar
  hideTitle() {
    this.deviceRouter("hideTitle", null, null)
  },
  // 显示native title bar
  showTitle() {
    this.deviceRouter("showTitle", null, null)
  },
  // resume
  addResumeEvent(callback) {
    this.deviceRouter("addResumeEvent", null, callback, true)
    if (!this.isJSBridgeAPPDemo) {
      pageBackFromNextPage(callback)
    }
  },
  // pause
  addPauseEvent(callback) {
    this.deviceRouter("addPauseEvent", null, callback, true)
    if (!this.isJSBridgeAPPDemo) {
      pagePause(callback)
    }
  },
}

export default JSBridge
