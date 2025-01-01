// @ts-nocheck

"use client"

import store from "./store"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

// @ts-ignore
if (typeof window !== "undefined") {
  window.store = store
}

const SimpleVuexPage = () => {
  const [updater, setUpdater] = useState(0)

  const syncIncre = () => {
    store.mutations.incre(10)
    setUpdater(updater + 1)
  }

  const asyncIncre = () => {
    store.actions.actionTest(20)
    setTimeout(() => {
      setUpdater(updater + 1)
    }, 3000)
  }

  return (
    <div>
      <div className="text-lg">store.state: {store.state.num}</div>
      <div className="text-lg">store.getters: {store.getters.getNum}</div>
      <div className="space-x-2">
        <Button onClick={syncIncre}>sync incre</Button>
        <Button onClick={asyncIncre}>async incre</Button>
      </div>
    </div>
  )
}

export default SimpleVuexPage
