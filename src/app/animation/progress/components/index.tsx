import { useEffect, useRef } from "react"

// 带文字过渡效果的进度条
// text-transparent bg-clip-text 可以实现文字颜色根据背景变化效果
// 如果背景颜色不断变化的，文字颜色也会不断变化

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
    <div className="relative h-8 w-80 overflow-hidden rounded-lg bg-[#cdeee3]" ref={wrapperRef}>
      <div className="relative h-full w-0 rounded-lg bg-[#3da985]" ref={innerRef}></div>
      <span
        style={{
          backgroundImage: `linear-gradient(to right, #cdeee3 0, #cdeee3 ${progress}%, #3da985 0%)`,
        }}
        className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-clip-text text-center leading-8 text-transparent transition-all duration-500"
      >
        正在安装 {progress}
      </span>
    </div>
  )
}

export default Progress
