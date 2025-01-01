import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const genUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const parseUrlParams = (url: string) => {
  let params: any = {}
  const search = url.split("?")[1]
  if (!search) {
    return params
  }

  search.split("&").forEach((param) => {
    const [key, value] = param.split("=")
    params[key] = decodeURIComponent(value)
  })

  return params
}

export const getRandomInt = (min: number = 0, max: number = 1000) => {
  min = Math.floor(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const formatTime = (seconds: number, disableHours?: boolean) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const hoursStr = hours.toString().padStart(2, "0")
  const minutesStr = minutes.toString().padStart(2, "0")
  const secondsStr = secs.toString().padStart(2, "0")

  if (disableHours) {
    return `${minutesStr}:${secondsStr}`
  }

  return `${hoursStr}:${minutesStr}:${secondsStr}`
}

export const copyToClipboard = (text: string) => {
  // 检查浏览器是否支持 Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard")
      })
      .catch((err) => {
        console.error("Failed to copy text to clipboard", err)
      })
  } else {
    // Fallback 方法，创建一个临时的文本区域
    const textArea = document.createElement("textarea")
    textArea.value = text
    // 确保文本区域不可见
    textArea.style.position = "fixed"
    textArea.style.opacity = "0"
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      const successful = document.execCommand("copy")
      const msg = successful ? "successful" : "unsuccessful"
      console.log("Fallback: Copying text command was " + msg)
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err)
    }
    // 移除临时的文本区域
    document.body.removeChild(textArea)
  }
}

export const addQueryParams = (url: string, params: Record<string, string>) => {
  const search = new URLSearchParams(params).toString()
  return `${url}${url.includes("?") ? "&" : "?"}${search}`
}

export const generateRandomString = (length: number = 5) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
