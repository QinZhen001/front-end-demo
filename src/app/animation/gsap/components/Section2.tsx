"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

const Section2 = () => {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // gsap.from 定义动画的起始状态
      // gsap.to 定义动画的结束状态
      gsap.from(".circle", {
        scale: 0,
        duration: 1,
        repeat: -1, // 动画将无限循环，直到明确停止。
        ease: "power2.inOut",
        yoyo: true, // 在完成一次动画周期后，动画会反向执行。换句话说，元素不仅会从缩放 0 到 1，还会再从 1 缩放回 0。
        stagger: {
          each: 0.5, // 如果有多个 .circle 元素进行动画，它们之间会相隔 0.5 秒开始动画，创建出错落的效果。
        },
      })
    },
    {
      dependencies: [],
      scope: container,
      // revertOnUpdate: true, // 每次更新时恢复到原始状态
    },
  )

  return (
    <div className="bg-black" ref={container}>
      <div className="text-lg text-white">Circle Animation Demo</div>
      <div className="h-[50vh] bg-green-500"></div>
      <div className="flex items-center justify-center gap-x-5">
        <div className="circle h-8 w-8 flex-initial rounded-full bg-red-500 text-center leading-8">
          1
        </div>
        <div className="circle h-8 w-8 flex-initial rounded-full bg-red-500 text-center leading-8">
          2
        </div>
        <div className="circle h-8 w-8 flex-initial rounded-full bg-red-500 text-center leading-8">
          3
        </div>
        <div className="circle h-8 w-8 flex-initial rounded-full bg-red-500 text-center leading-8">
          4
        </div>
        <div className="circle h-8 w-8 flex-initial rounded-full bg-red-500 text-center leading-8">
          5
        </div>
      </div>
      <div className="h-[50vh] bg-blue-500"></div>
    </div>
  )
}

export default Section2
