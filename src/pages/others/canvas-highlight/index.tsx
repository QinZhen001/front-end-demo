import { ReactEventHandler, useEffect, useRef } from "react"
import "./index.css"

interface IOperate {
  color: string
  data: Set<number[]>
}

let ctx: CanvasRenderingContext2D
let canvasLeft = 0
let canvasTop = 0
let curColor = ""
let map = new Map()
// 之前高亮的操作 
// {
//   color : string
//   data: set 
// }  
let operates: IOperate[] = []
// @ts-expect-error
window.operates = operates
// @ts-expect-error
window.map = map


function rgbToHex(r: number, g: number, b: number) {
  var hex = "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  return hex;
}


function LightenDarkenColor(col: string, amt: number) {

  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);
  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;
  var g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}



const CanvasHighlight = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawImg = () => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = 'https://fullapp.oss-cn-beijing.aliyuncs.com/pic/264121695293447_.pic.jpg';
      image.crossOrigin = 'Anonymous'
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
        resolve(true)
      };
    })
  }


  const initcanvas = () => {
    ctx = canvasRef.current!.getContext('2d', {
      willReadFrequently: true
    })!;
    const { left, top } = canvasRef.current!.getBoundingClientRect()
    canvasLeft = left
    canvasTop = top
  }

  const getPosColor = (x: number, y: number) => {
    const res = ctx.getImageData(x, y, 1, 1)
    var red = res.data[0];
    var green = res.data[1];
    var blue = res.data[2];
    const hexColor = rgbToHex(red, green, blue)
    return hexColor
  }

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



  const onMouseMove = (e: React.MouseEvent) => {
    let x = Math.floor(e.clientX - canvasLeft)
    let y = Math.floor(e.clientY - canvasTop)

    const hexColor = getPosColor(x, y)
    if (curColor !== hexColor) {
      curColor = hexColor
      if (map.has(curColor)) {
        restore()
        highlight()
      }
    }
  }

  const restore = () => {
    while (operates.length) {
      const { color, data } = operates.pop() || {}
      if (color && data) {
        console.log("restore drawColor", color)
        ctx.beginPath()
        ctx.fillStyle = color
        for (let item of data) {
          const [x, y] = item
          ctx.rect(x, y, 1, 1);
        }
        ctx.fill();
        ctx.closePath()
      }
    }
  }

  const highlight = () => {
    if (!curColor) {
      return
    }
    const set = map.get(curColor)
    let drawColor = LightenDarkenColor(curColor, 50)
    console.log("highlight drawColor", drawColor)
    ctx.beginPath()
    ctx.fillStyle = drawColor
    for (let item of set) {
      const [x, y] = item
      ctx.rect(x, y, 1, 1);
    }
    ctx.fill();
    ctx.closePath()
    operates.push({
      color: curColor,
      data: set
    })
  }

  const onMouseLeave = () => {
    curColor = ""
    restore()
  }


  return <div >
    <section>
    </section>
    <section className="content">
      <div className="canvas-wrapper">
        <canvas
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="my-canvas"
          width={300}
          height={600}
          ref={canvasRef}
        ></canvas>
      </div>
    </section>
  </div>
}


export default CanvasHighlight
