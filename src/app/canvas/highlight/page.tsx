"use client"

import { ReactEventHandler, useEffect, useRef } from "react"

interface IOperate {
  /**
   * 颜色
   */
  color: string
  /**
   * 像素点集合
   */
  data: Set<number[]>
}

let ctx: CanvasRenderingContext2D
let canvasLeft = 0
let canvasTop = 0
let curColor = ""
let map = new Map()
let operates: IOperate[] = [] // 绘图操作历史

/**
 * 将给定的 RGB 颜色值转换为十六进制颜色值
 * @param r 表示红色通道的整数值（0 到 255）
 * @param g 表示绿色通道的整数值（0 到 255）
 * @param b 表示蓝色通道的整数值（0 到 255
 * @returns 十六进制颜色值
 */
function rgbToHex(r: number, g: number, b: number) {
  var hex = "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")
  return hex
}

/**
 * 调整给定颜色的亮度（明暗）
 * @param col 表示颜色的字符串，可以是十六进制颜色（带或不带 '#' 符号）
 * @param amt 一个数字，表示要调整的亮度量，正数表示提高亮度，负数表示降低亮度
 * @returns 表示颜色的字符串，可以是十六进制颜色（如果原始颜色 col 带有 '#' 符号，则在结果字符串前添加 '#'）
 */
function LightenDarkenColor(col: string, amt: number) {
  var usePound = false // 标记颜色是否带有 '#' 符号

  if (col[0] == "#") {
    col = col.slice(1)
    usePound = true
  }

  var num = parseInt(col, 16) // 将颜色字符串 col 解析为一个十六进制数字
  var r = (num >> 16) + amt // 从 num 中提取红色通道的值，将 amt 添加到它，以调整亮度

  if (r > 255) r = 255
  else if (r < 0) r = 0

  var b = ((num >> 8) & 0x00ff) + amt // 从 num 中提取蓝色通道的值，将 amt 添加到它
  if (b > 255) b = 255
  else if (b < 0) b = 0

  var g = (num & 0x0000ff) + amt // 从 num 中提取绿色通道的值，将 amt 添加到它
  if (g > 255) g = 255
  else if (g < 0) g = 0

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16) // 将经过调整的红、绿、蓝通道重新组合成一个新的颜色，并将其表示为一个十六进制字符串
}

const CanvasHighlight = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let isLocked = false // 是否锁定高亮某个色块
  let drawColor: string = "" // 当前颜色高亮后的颜色
  let drawSet: Set<number[]> = new Set() // 当前颜色高亮后的颜色 -- 对应的像素点集合

  const drawImg = () => {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.src = "/images/color_block.jpg"
      image.crossOrigin = "Anonymous"
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvasRef.current!.width, canvasRef.current!.height)
        resolve(true)
      }
    })
  }

  const initcanvas = () => {
    ctx = canvasRef.current!.getContext("2d", {
      // willReadFrequently: boolean值表明是否有重复读取计划
      // https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext
      willReadFrequently: true,
    })!
    const { left, top } = canvasRef.current!.getBoundingClientRect()
    canvasLeft = left
    canvasTop = top
  }

  const getPosColor = (x: number, y: number) => {
    const res = ctx.getImageData(x, y, 1, 1)
    var red = res.data[0]
    var green = res.data[1]
    var blue = res.data[2]
    const hexColor = rgbToHex(red, green, blue)
    return hexColor
  }

  // TODO: 优化
  // 这里只根据相同颜色做了分组，但是如果相同颜色区域不连通的话，就会出现问题
  const genData = async () => {
    let width = canvasRef.current!.width
    let height = canvasRef.current!.height

    let start = Date.now()
    for (let i = 0; i < width - 1; i++) {
      for (let j = 0; j < height - 1; j++) {
        let hexColor = getPosColor(i, j)
        if (map.has(hexColor)) {
          const set = map.get(hexColor)
          set!.add([i, j])
        } else {
          let set = new Set()
          set.add([i, j])
          map.set(hexColor, set)
        }
      }
    }
    // filter
    for (let [key, value] of map) {
      if (value.size <= 100) {
        map.delete(key)
      }
    }

    let end = Date.now()
    console.log("cost time ", end - start)
    console.log("final map", map)
  }

  const init = async () => {
    initcanvas()
    await drawImg()
    await genData()
  }

  useEffect(() => {
    init()
  }, [])

  /**
   * 鼠标移动时触发
   * @param e 鼠标事件对象
   */
  const onMouseMove = (e: React.MouseEvent) => {
    let x = Math.floor(e.clientX - canvasLeft)
    let y = Math.floor(e.clientY - canvasTop)
    const hexColor = getPosColor(x, y)
    if (curColor !== hexColor) {
      // 如果两者不相等，说明鼠标在移动过程中进入了一个新的颜色区域
      curColor = hexColor
      if (map.has(curColor)) {
        restore()
        highlight()
      }
    }
  }

  /**
   * 还原之前绘制的颜色区域
   */
  const restore = () => {
    if (isLocked) {
      isLocked = false
      return
    }
    while (operates.length) {
      const { color, data } = operates.pop() || {} // 使用一个空对象 {} 来避免解构错误
      if (color && data) {
        ctx.beginPath()
        ctx.fillStyle = color
        for (let item of data) {
          const [x, y] = item // 表示绘制一个像素点的坐标
          ctx.rect(x, y, 1, 1)
        }
        ctx.fill() // 在画布上着色像素点
        ctx.closePath()
      }
    }
  }

  /**
   * 突出显示当前颜色区域
   */
  const highlight = () => {
    if (!curColor) {
      return
    }
    const set = map.get(curColor)
    drawColor = LightenDarkenColor(curColor, 100) // 获取当前颜色高亮后的颜色
    drawSet = set
    ctx.beginPath()
    ctx.fillStyle = drawColor
    for (let item of set) {
      const [x, y] = item
      ctx.rect(x, y, 1, 1)
    }
    ctx.fill()
    ctx.closePath()
    operates.push({
      color: curColor,
      data: set,
    })
  }

  /**
   * 从 Canvas 区域内移出时触发
   */
  const onMouseLeave = () => {
    curColor = ""
    restore()
  }

  /**
   * 在 Canvas 中点击时触发
   */
  const onClick = () => {
    isLocked = true

    ctx.beginPath()
    ctx.fillStyle = drawColor // '#FFFFFF'
    for (let item of drawSet) {
      const [x, y] = item
      ctx.rect(x, y, 1, 1)
    }
    ctx.fill()
    ctx.closePath()

    operates.pop()
    operates.push({
      color: drawColor, // '#FFFFFF'
      data: drawSet,
    })
  }

  return (
    <div>
      <section></section>
      <section className="flex gap-3">
        <div>
          <h4>模特图</h4>
          <img src="/images/model.jpg" width="300" height="600" />
        </div>
        <div>
          <h4>色块图（原图）</h4>
          <img src="/images/color_block.jpg" width="300" height="600" />
        </div>
        <div>
          <h4>色块图（支持用户hover高亮，点击选中）</h4>
          <div className="relative">
            <canvas
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              onClick={onClick}
              width={300}
              height={600}
              ref={canvasRef}
            ></canvas>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CanvasHighlight
