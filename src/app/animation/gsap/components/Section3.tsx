"use client"

// contextSafe 的主要用途：
// 避免潜在的状态问题：
// 在 React 中，组件的渲染是基于状态的变化。如果在动画中直接引用了组件的状态，可能会导致意想不到的行为，尤其是当组件被重新渲染时。
// contextSafe 确保动画与当前渲染上下文相适应，从而减少状态变化造成的干扰。

// 汇聚动画逻辑：
// 使用 contextSafe 允许你在一个特定的上下文中管理动画，这有助于将动画与组件生命周期更好地结合。例如，可以在组件挂载时启动动画，并在卸载时清理。

// 管理多个动画实例：
// 如果一个组件需要处理多个动画，contextSafe 可以帮助确保每个动画实例在正确的上下文中执行，避免出现相互干扰的情况。

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

const Section3 = () => {
  const { contextSafe } = useGSAP()
  const box = useRef<HTMLDivElement>(null)

  const onClickGood = contextSafe(() => {
    gsap.to(box.current, { x: "+=50", duration: 1, rotation: "+=360" })
  })

  return (
    <div className="bg-black">
      <div className="text-lg text-white">Context Safe Demo</div>
      <div className="text-lg text-white">Click Circle!</div>
      <div
        ref={box}
        className="inline-block h-8 w-8 rounded-full bg-emerald-500 text-center leading-8"
        onClick={onClickGood}
      >
        1
      </div>
    </div>
  )
}

export default Section3
