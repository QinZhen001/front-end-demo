"use client"

import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from "react"
import type { UseEmblaCarouselType } from "embla-carousel-react"

type UseDotButtonType = {
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}

export const useDotButton = (emblaApi?: UseEmblaCarouselType[1]): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onDotButtonClick = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi],
  )

  const onInit = useCallback(
    (emblaApi: UseEmblaCarouselType[1]) => {
      setScrollSnaps(emblaApi?.scrollSnapList() ?? [])
    },
    [emblaApi],
  )

  const onSelect = useCallback(
    (emblaApi: UseEmblaCarouselType[1]) => {
      setSelectedIndex(emblaApi?.selectedScrollSnap() ?? 0)
    },
    [emblaApi],
  )

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  }
}

type PropType = ComponentPropsWithRef<"button">

export const DotButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  )
}
