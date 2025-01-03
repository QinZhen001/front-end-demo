"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Script from "next/script"

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

const Section1 = () => {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to("#id-a", {
        scrollTrigger: {
          trigger: "#id-a",
          //  第一个值是触发元素的位置（绿start线），第二个值是视口的位置（绿scroller-start线）。
          // 打个
          // start: "20px 80%",
          start: "top center",
          end: "+=300",
          // ScrollTrigger 插件中，scrub 属性用于将滚动位置与动画的播放进度同步。
          // 具体来说，scrub 属性可以使动画在滚动页面时逐帧播放，滚动的速度和动画的播放速度保持同步
          // 这样，动画的进度与滚动条的位置紧密关联，提供一种流畅的滚动动画效果。
          scrub: true,
          // scrub: 1/2/3  以几倍的速度播放
          // 是否显示标记 （仅用于开发环境）
          markers: true,
          // 动画的不同滚动状态设置不同的行为
          // 触发器进入视口时播放动画，离开视口时暂停动画，触发器从下方进入视口时继续播放动画，触发器从下方离开视口时重置动画
          // toggleActions: "play pause resume reset",
        },
        x: 400,
        duration: 8,
      })

      gsap.to("#id-b", {
        rotation: 360,
        x: 200,
        scrollTrigger: {
          trigger: "#id-b",
          start: "center center",
          // end 属性用于定义滚动触发器的结束位置
          end: () => "+=" + (document.querySelector("#id-b") as HTMLElement)?.offsetHeight || 0,
          // end: "+=30" 的作用是定义滚动触发器的结束位置相对于触发器的起始位置向下（或向右）移动 30 像素。
          // end: "+=30",
          toggleActions: "restart pause reverse pause",
          scrub: true,
          markers: true,
          // pin 属性用于将滚动触发器固定在视口中的某个位置
          pin: true,
          // anticipatePin 属性用于定义滚动触发器的固定位置相对于视口的位置
          // 用于优化和改善固定（pinning）效果，特别是在固定元素时防止内容跳跃和闪烁的现象。
          anticipatePin: 1,
        },
      })
    },
    { scope: container },
  )

  return (
    <div className="bg-black" ref={container}>
      <div className="text-lg text-white">Easy Demo</div>
      <div className="relative h-[80vh] bg-fuchsia-500"></div>
      <div className="relative h-[50vh] bg-blue-500" id="id-1">
        <div id="id-a" className="absolute left-10 top-10 h-10 w-10 bg-red-800 text-lg">
          aaaa
        </div>
      </div>
      <div className="relative h-[50vh] bg-green-500" id="id-2">
        <div id="id-b" className="absolute left-10 top-10 h-10 w-10 bg-red-800 text-lg">
          bbb
        </div>
      </div>
      <div className="h-[50vh] bg-slate-500" id="id-3"></div>
      <Script
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/GSDevTools3.min.js" // 替换为你自己的脚本 URL
        strategy="lazyOnload" // 选择加载策略
        onLoad={() => {
          // only in development
          console.log("GSDevTools loaded", GSDevTools)
          gsap.registerPlugin(GSDevTools)
          GSDevTools.create()
        }}
      />
    </div>
  )
}

export default Section1
