import { useEffect, useRef } from "react"
import "./index.css"

let ctx: CanvasRenderingContext2D
let offscreenCtx: OffscreenCanvasRenderingContext2D
let offscreenCanvas: OffscreenCanvas
let canvasLeft = 0
let canvasTop = 0

const CanvasPencil = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const MouseStatus = useRef<'down' | 'up'>('up')

  const drawImg = () => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = 'https://fullapp.oss-cn-beijing.aliyuncs.com/pic/1686831479688.jpg';
      image.crossOrigin = 'Anonymous'
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
        resolve(true)
      };
    })
  }

  const canvasToImageByBackgroundColor = () => {
    // TODO: 离屏渲染 or 双canvas
    // ctx.globalCompositeOperation = 'destination-over';
    // ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    let imageData = canvasRef.current!.toDataURL('image/png');
    return imageData
  }


  const init = async () => {
    ctx = canvasRef.current!.getContext('2d')!;
    const { left, top } = canvasRef.current!.getBoundingClientRect()
    offscreenCanvas = new OffscreenCanvas(canvasRef.current!.width, canvasRef.current!.height)
    offscreenCtx = offscreenCanvas.getContext("2d")!;
    canvasLeft = left
    canvasTop = top
    await drawImg()
  }

  useEffect(() => {
    init()
  }, [])

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (MouseStatus.current === 'down') return
    MouseStatus.current = 'down'
    const { clientX, clientY } = e
    let x = clientX - canvasLeft
    let y = clientY - canvasTop
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 4;
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (MouseStatus.current === 'up') return
    const { clientX, clientY } = e
    let x = clientX - canvasLeft
    let y = clientY - canvasTop
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    console.log('onMouseUp')
    if (MouseStatus.current === 'up') return
    MouseStatus.current = 'up'
    ctx.closePath()
  }

  const outputImg = () => {
    const url = canvasToImageByBackgroundColor()
    const image = new Image();
    image.src = url;
    const node = document.getElementById("img-wrapper")
    node?.appendChild(image)
  }


  return <div>
    <div>
      <button onClick={outputImg}>导出图片</button>
    </div>
    <div id="img-wrapper">
      {/* img */}
    </div>
    <canvas
      className="my-canvas"
      width={300}
      height={600}
      ref={canvasRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    ></canvas>
  </div>
}


export default CanvasPencil
