"use client"

import { useEffect, useState } from "react"
import Progress from "./components"

const TestProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      if (progress >= 100) {
        setProgress(0)
      } else {
        setProgress((progress) => progress + 1)
      }
    }, 100)

    return () => {
      clearTimeout(id)
    }
  }, [progress])

  return <Progress progress={progress}></Progress>
}

export default TestProgress
