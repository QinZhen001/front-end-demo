import { useEffect, useRef } from "react"
import "./index.css"

// 带文字过渡效果的进度条
const Progress = ({ progress = 0 }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const setWidth = (progress: number) => {
    const wrapper = wrapperRef.current
    const { width = 0 } = wrapper!.getBoundingClientRect()
    innerRef!.current!.style.width = `${(width * progress) / 100}px`
  }

  useEffect(() => {
    console.log("progress", progress)
    setWidth(progress)
  }, [progress])

  return (
    <div className="progress" ref={wrapperRef}>
      <div className="inner" ref={innerRef}></div>
      <span
        style={{
          backgroundImage: `linear-gradient(to right, #cdeee3 0, #cdeee3 ${progress}%, #3da985 0%)`,
        }}
      >
        正在安装 {progress}
      </span>
    </div>
  )
}

export default Progress
