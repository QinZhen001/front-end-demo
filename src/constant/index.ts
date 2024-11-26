import { children } from "@/app/webpack/webpack"
import { IContentItem } from "@/type"
import { title } from "process"

export const CONTENT_LIST: IContentItem[] = [
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
    children: [
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
    ],
  },
  {
    title: "Other",
    href: "/other",
  },
  {
    title: "Rtc",
    href: "/rtc",
  },
  {
    title: "Animation",
    href: "/animation",
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
].sort((a, b) => a.title.localeCompare(b.title))
