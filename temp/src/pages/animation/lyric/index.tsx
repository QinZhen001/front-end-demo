import { useEffect, useState } from "react"
import "./index.css"

const Lyric = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress(progress == 100 ? 0 : progress + 1)
    }, 20)

    return () => {
      clearInterval(intervalId)
    }
  }, [progress])

  return (
    <div className="lyric-wrapper">
      <span
        className="item"
        style={{
          background: `linear-gradient(to right, red 0%, red ${progress}%, white ${progress}%, white 100%)`,
        }}
      >
        爱
      </span>
    </div>
  )
}

export default Lyric
