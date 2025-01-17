"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Application, Assets, Sprite, Texture, Text, Graphics, Container } from "pixi.js"
import * as PIXI from "pixi.js"

export type Position = [number, number]
export type Direction = "up" | "down" | "left" | "right"

const DEFAULT_DISTANCE = 10 // 每次移动

let app: Application
const bgTexture = Texture.from("/images/map.jpeg") // 背景纹理
const bgSprite = new Sprite(bgTexture) //背景景林

const avatarLeftTexture = Texture.from("/images/avatar_left.png")
const avatarRightTexture = Texture.from("/images/avatar_right.png")
const avatarDownTexture = Texture.from("/images/avatar_down.png")
const avatarUpTexture = Texture.from("/images/avatar_up.png")
const avatarName = new Text()
const avatarSprite = new Sprite()
const avatarNameBG = new Graphics()
const avatarContainer = new Container()

export const MapView = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [direction, setDirection] = useState<Direction>("down")
  const [position, setPosition] = useState<Position>([200, 100])

  useLayoutEffect(() => {
    init()
    window.addEventListener("resize", resize)

    return () => {
      destory()
      window.removeEventListener("resize", resize)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", onKeydown)

    return () => {
      document.removeEventListener("keydown", onKeydown)
    }
  }, [direction, position])

  useEffect(() => {
    avatarSprite.texture = getAvatarTexture()
  }, [direction])

  useEffect(() => {
    console.log("position", position)
    avatarContainer.x = position[0]
    avatarContainer.y = position[1]
  }, [position])

  const onKeydown = async (event: KeyboardEvent) => {
    let newPosition: Position = [position[0], position[1]]
    let newDirection: Direction = "down"
    if (event.key === "ArrowUp" || event.key === "w") {
      // 上键
      newPosition[1] = position[1] - DEFAULT_DISTANCE
      newDirection = "up"
    } else if (event.key === "ArrowDown" || event.key === "s") {
      // 下键
      newPosition[1] = position[1] + DEFAULT_DISTANCE
      newDirection = "down"
    } else if (event.key === "ArrowLeft" || event.key === "a") {
      // 左键
      newPosition[0] = position[0] - DEFAULT_DISTANCE
      newDirection = "left"
    } else if (event.key === "ArrowRight" || event.key === "d") {
      // 右键
      newPosition[0] = position[0] + DEFAULT_DISTANCE
      newDirection = "right"
    } else {
      return
    }
    setDirection(newDirection)
    setPosition(newPosition)
  }

  const resize = () => {
    // 设置画布大小和缩放
    app.renderer.resize(mapRef.current!.offsetWidth, mapRef.current!.offsetHeight)
    bgSprite.width = mapRef.current!.offsetWidth
    bgSprite.height = mapRef.current!.offsetHeight
    bgSprite.anchor.set(0.5, 0.5)
    bgSprite.x = app.renderer.width / 2 // 应用宽度中心位置
    bgSprite.y = app.renderer.height / 2 // 应用高度中心位置
  }

  const init = async () => {
    if (app) {
      return
    }
    console.log("init")
    app = new Application({
      background: "#303032",
      width: mapRef.current!.offsetWidth,
      height: mapRef.current!.offsetHeight,
      // resizeTo: mapRef.current!,
      antialias: true, // 抗锯齿
    })
    // @ts-ignore
    window.app = app
    mapRef.current!.appendChild(app.view as HTMLCanvasElement)
    drawBg()
    drawAvatar()
  }

  const destory = () => {
    if (app) {
      app.destroy(true)
      // @ts-ignore
      app = null
    }
  }

  const drawBg = () => {
    bgSprite.width = mapRef.current!.offsetWidth
    bgSprite.height = mapRef.current!.offsetHeight
    bgSprite.anchor.set(0.5, 0.5)
    bgSprite.x = app.renderer.width / 2 // 应用宽度中心位置
    bgSprite.y = app.renderer.height / 2 // 应用高度中心位置
    app.stage.addChild(bgSprite)
  }

  const drawAvatar = () => {
    // 名字
    avatarName.text = "mock jack"
    avatarName.style = {
      fontSize: 12,
      fill: "white",
      align: "center",
    }
    avatarName.height = 16
    avatarName.width = 60
    avatarName.x = 0
    avatarName.y = 0
    // 名字背景
    avatarNameBG.beginFill("#eb2f96")
    avatarNameBG.drawRect(0, 0, avatarName.width, avatarName.height)
    avatarNameBG.endFill()
    // 人物
    avatarSprite.width = 40
    avatarSprite.height = 44
    avatarSprite.texture = getAvatarTexture()
    avatarSprite.x = (avatarName.width - avatarSprite.width) / 2
    avatarSprite.y = avatarName.height

    avatarContainer.addChild(avatarNameBG)
    avatarContainer.addChild(avatarName)
    avatarContainer.addChild(avatarSprite)

    avatarContainer.pivot.x = avatarContainer.width / 2
    avatarContainer.pivot.y = avatarContainer.height / 2

    avatarContainer.x = position[0]
    avatarContainer.y = position[1]

    app.stage.addChild(avatarContainer)
  }

  const getAvatarTexture = () => {
    switch (direction) {
      case "down":
        return avatarDownTexture
      case "left":
        return avatarLeftTexture
      case "right":
        return avatarRightTexture
      case "up":
        return avatarUpTexture
    }
  }

  return (
    <AspectRatio ratio={16 / 9} className="bg-red-500">
      <div className="h-full w-full" ref={mapRef}></div>
    </AspectRatio>
  )
}
