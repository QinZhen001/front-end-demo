import { IContentItem } from "@/types"

const ANIMATION_CHILDREN: IContentItem[] = [
  {
    title: "progress",
    href: "/animation/progress",
    description: "带文字过渡效果的进度条",
  },
  {
    title: "lyric",
    href: "/animation/lyric",
    description: "歌词渐变过渡效果",
  },
  {
    title: "slider",
    href: "/animation/slider",
    description: "轮播图 (center active)",
  },
  {
    title: "multiple type",
    href: "/animation/multiple-type",
    description: "多行文字打字机效果",
  },
]

const CANVAS_CHILDREN: IContentItem[] = [
  {
    title: "Highlight",
    href: "/canvas/highlight",
    description: "高亮区块",
  },
  {
    title: "Pencil",
    href: "/canvas/pencil",
    description: "绘制鼠标轨迹",
  },
  {
    title: "Expand",
    href: "/canvas/expand",
    description: "扩张效果(模拟贝塞尔曲线)",
  },
]

const OTHER_CHILDREN: IContentItem[] = [
  {
    title: "notification",
    href: "/other/notification",
    description: "系统通知",
  },
  {
    title: "co",
    href: "/other/co",
    description: "自动执行Generator",
  },
  {
    title: "compose",
    href: "/other/compose",
    description: "实现compose",
  },
  {
    title: "chineseInput",
    href: "/other/chineseInput",
    description: "监听中文输入法事件",
  },
  {
    title: "retry",
    href: "/other/retry",
    description: "多次重试promise",
  },
  {
    title: "rxjs",
    href: "/other/rxjs",
    description: "实现简易 RxJS",
  },
  {
    title: "websocket-chat",
    href: "/other/websocket-chat",
    description: "Websocket 聊天",
  },
  {
    title: "codemirror",
    href: "/other/codemirror",
    description: "代码高亮",
  },
  {
    title: "abortController",
    href: "/other/abortController",
    description: "中断请求",
  },
  {
    title: "JSBridge",
    href: "/other/JSBridge",
    description: "JSBridge",
  },
  {
    title: "inherit",
    href: "/other/inherit",
    description: "几种继承方式",
  },
  {
    title: "errorPack",
    href: "/other/errorPack",
    description: "error封装",
  },
  {
    title: "shareWorker",
    href: "/other/shareWorker",
    description: "ShareWorker",
  },
  {
    title: "longTask",
    href: "/other/longTask",
    description: "监控长任务",
  },
  {
    title: "infinity-debugger",
    href: "/other/infinity-debugger",
    description: "无限Debugger（禁止别人调试自己网页）",
  },
  {
    title: "immer",
    href: "/other/immer",
    description: "immer.js",
  },
]

const REACT_CHILDREN: IContentItem[] = [
  {
    title: "redux",
    href: "/react/redux",
    description: "redux 简单实现",
  },
  {
    title: "useTransition",
    href: "/react/useTransition",
    description: "useTransition",
  },
  {
    title: "useDeferredValue",
    href: "/react/useDeferredValue",
    description: "useDeferredValue",
  },
  {
    title: "suspense",
    href: "/react/suspense",
    description: "suspense",
  },
  {
    title: "ahooks",
    href: "/react/ahooks",
    description: "ahooks 仿写",
  },
  {
    title: "useCountdown",
    href: "/react/useCountdown",
    description: "useCountdown 倒计时",
  },
]

const VUE_CHILDREN: IContentItem[] = [
  {
    title: "vue2",
    href: "/vue/vue2",
    description: "vue2 简单实现",
  },
  {
    title: "vue3",
    href: "/vue/vue3",
    description: "vue3 简单实现",
  },
  {
    title: "vuex",
    href: "/vue/vuex",
    description: "vuex 简单实现",
  },
  {
    title: "simpleVueRouter",
    href: "/vue/simpleVueRouter",
    description: "vue-router 简单实现",
  },
]

const NODE_CHILDREN: IContentItem[] = [
  {
    title: "EventLoop",
    href: "/node/event-loop",
    description: "事件循环",
  },
  {
    title: "js-libuv",
    href: "/node/js-libuv",
    description: "模拟libuv",
  },
]

const RTC_CHILDREN: IContentItem[] = [
  {
    title: "mediaRecorder",
    href: "/rtc/mediaRecorder",
    description: "MediaRecorder相关",
  },
  {
    title: "canvasCaptureStream",
    href: "/rtc/canvasCaptureStream",
    description: "canvasCaptureStream相关",
  },
  {
    title: "dataChannel",
    href: "/rtc/dataChannel",
    description: "WebRTC DataChannel",
  },
  {
    title: "analyserNode",
    href: "/rtc/analyserNode",
    description: "音频可视化分析",
  },
  {
    title: "audioPcm",
    href: "/rtc/audioPcm",
    description: "获取麦克风pcm数据",
  },
  {
    title: "audioBuffer",
    href: "/rtc/audioBuffer",
    description: "AudioBuffer相关",
  },
  {
    title: "gainNode",
    href: "/rtc/gainNode",
    description: "GainNode相关",
  },
  {
    title: "checkWebRtc",
    href: "/rtc/checkWebRtc",
    description: "测试浏览器支持WebRTC",
  },
]

const UI_CHILDREN: IContentItem[] = [
  {
    title: "gradientBorder",
    href: "/ui/gradientBorder",
    description: "渐变边框文字",
  },
  {
    title: "editor@people",
    href: "/ui/atEditor",
    description: "@人功能",
  },
  {
    title: "threeColumnLayout",
    href: "/ui/threeColumnLayout",
    description: "三列布局",
  },
]

const WEBPACK_CHILDREN: IContentItem[] = [
  {
    title: "miniWebpack1",
    href: "/webpack/miniWebpack1",
    description: "手写webpack",
  },
  {
    title: "miniWebpack2",
    href: "/webpack/miniWebpack2",
    description: "手写webpack",
  },
]

const NAV_LIST: IContentItem[] = [
  {
    title: "Vue",
    href: "/vue",
    children: VUE_CHILDREN,
  },
  {
    title: "React",
    href: "/react",
    children: REACT_CHILDREN,
  },
  {
    title: "Node",
    href: "/node",
    children: NODE_CHILDREN,
  },
  {
    title: "Canvas",
    href: "/canvas",
    children: CANVAS_CHILDREN,
  },
  {
    title: "Other",
    href: "/other",
    children: OTHER_CHILDREN,
  },
  {
    title: "Rtc",
    href: "/rtc",
    children: RTC_CHILDREN,
  },
  {
    title: "Animation",
    href: "/animation",
    children: ANIMATION_CHILDREN,
  },
  {
    title: "Vite",
    href: "/vite",
    children: [
      {
        title: "Plugin",
        href: "/vite/plugin",
        description: "简单插件",
      },
    ],
  },
  {
    title: "babel",
    href: "/babel",
  },
  {
    title: "template",
    href: "/template",
  },
  {
    title: "Webpack",
    href: "/webpack",
    children: WEBPACK_CHILDREN,
  },
  {
    title: "UI",
    href: "/ui",
    children: UI_CHILDREN,
  },
]

const getSortNavList = (): IContentItem[] => {
  const list = NAV_LIST.map((nav) => {
    if (nav.children?.length) {
      return {
        ...nav,
        children: nav.children.sort((a, b) => {
          return a.title.localeCompare(b.title)
        }),
      }
    }
    return nav
  })

  return list.sort((a, b) => {
    return a.title.localeCompare(b.title)
  })
}

export const SORT_NAV_LIST = getSortNavList()
export const HEADER_DESCRIPTION = "web demo collection"
