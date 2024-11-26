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
  {
    title: "gradient-border",
    href: "/animation/gradient-border",
    description: "渐变边框文字",
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
    href: "/animation/notification",
    description: "notification 系统通知",
  },
  {
    title: "chinese-input",
    href: "/animation/chinese-input",
    description: "监听中文输入法事件",
  },
  {
    title: "editor@people",
    href: "/animation/at-editor",
    description: "editor @人功能",
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
    description: "代码高亮 CodeMirror",
  },
  {
    title: "sandbox",
    href: "/other/sandbox",
    description: "SandBox 沙箱",
  },
  {
    title: "abort-controller",
    href: "/other/abort-controller",
    description: "AbortController 中断请求",
  },
  {
    title: "js-bridge",
    href: "/other/js-bridge",
    description: "JSBridge",
  },
  {
    title: "share-worker",
    href: "/other/share-worker",
    description: "ShareWorker",
  },
  {
    title: "long-task",
    href: "/other/long-task",
    description: "LongTask 监控长任务",
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

const NAV_LIST: IContentItem[] = [
  {
    title: "Vue",
    href: "/vue",
    description: "adadds",
    children: [
      {
        title: "Vue3",
        href: "/vue/vue3",
        description: "adfs sfdsf sdfs aadds",
      },
      {
        title: "Vue4",
        href: "/vue/vue4",
      },
    ],
  },
  {
    title: "React",
    href: "/react",
  },
  {
    title: "Node",
    href: "/node",
    children: [
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
    ],
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
    title: "Webpack",
    href: "/webpack",
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
