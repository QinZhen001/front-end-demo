"use client"

import { Button } from "@/components/ui/button"

// https://developer.mozilla.org/zh-CN/docs/Web/API/Notifications_API/Using_the_Notifications_API
const title = "this is title"
const options = {
  body: "this is body",
}

const NotificationComponent = () => {
  const onClick = async () => {
    if (Notification && Notification.permission !== "granted") {
      debugger
      const status = await Notification.requestPermission()
      if (status === "denied") {
        console.log("Permission wasn't granted. Allow a retry.")
        return
      }
      if (status === "default") {
        console.log("The permission request was dismissed.")
        return
      }
    }
    const notification = new Notification(title, options)
    console.log("notification", notification)

    notification.onclick = (e) => {
      console.log("onclick", e)
    }
    notification.onshow = (e) => {
      console.log("onshow", e)
    }

    // onclick: ((this: Notification, ev: Event) => any) | null;
    // onclose: ((this: Notification, ev: Event) => any) | null;
    // onerror: ((this: Notification, ev: Event) => any) | null;
    // onshow: ((this: Notification, ev: Event) => any) | null;
  }

  return (
    <div>
      <Button onClick={onClick}>click</Button>
    </div>
  )
}

export default NotificationComponent
