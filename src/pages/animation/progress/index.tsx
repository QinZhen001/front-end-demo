import { useEffect, useState } from "react"
import Progress from "./components"

const TestProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      if (progress >= 100) {
        setProgress(0)
      } else {
        setProgress(progress + 3)
      }
    }, 500)

    return () => {
      clearTimeout(id)
    }

  }, [progress])



  return <div>
    <Progress progress={progress}></Progress>
  </div>
}

export default TestProgress
