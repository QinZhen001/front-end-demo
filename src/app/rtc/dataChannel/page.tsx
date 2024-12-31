"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

type State = "connected" | "disconnected"

let localConnection: RTCPeerConnection | null // RTCPeerConnection for our "local" connection
let remoteConnection: RTCPeerConnection | null // RTCPeerConnection for the "remote"
let sendChannel: RTCDataChannel | null // RTCDataChannel for the local (sender)
let receiveChannel: RTCDataChannel | null // RTCDataChannel for the remote (receiver)

const WebRtcDataChannelPage = () => {
  const [message, setMessage] = useState<string>("")
  const [state, setState] = useState<State>("disconnected")
  const [list, setlist] = useState<string[]>([])
  const { toast } = useToast()

  // Connect the two peers. Normally you look for and connect to a remote
  // machine here, but we're just connecting two local objects, so we can
  // bypass that step.
  const connectPeers = () => {
    // Create the local connection and its event listeners
    localConnection = new RTCPeerConnection()

    // Create the data channel and establish its event listeners
    sendChannel = localConnection.createDataChannel("sendChannel")
    sendChannel.onopen = handleSendChannelStatusChange
    sendChannel.onclose = handleSendChannelStatusChange

    // Create the remote connection and its event listeners
    remoteConnection = new RTCPeerConnection()
    remoteConnection.ondatachannel = receiveChannelCallback

    // Set up the ICE candidates for the two peers
    localConnection.onicecandidate = (e) =>
      !e.candidate || remoteConnection?.addIceCandidate(e.candidate).catch(handleAddCandidateError)

    remoteConnection.onicecandidate = (e) =>
      !e.candidate || localConnection?.addIceCandidate(e.candidate).catch(handleAddCandidateError)

    // Now create an offer to connect; this starts the process
    localConnection
      .createOffer()
      .then((offer) => {
        console.log("localConnection createOffer success", offer)
        return localConnection?.setLocalDescription(offer)
      })
      .then(() => remoteConnection?.setRemoteDescription(localConnection!.localDescription!))
      .then(() => remoteConnection?.createAnswer())
      .then((answer) => remoteConnection?.setLocalDescription(answer))
      .then(() => localConnection?.setRemoteDescription(remoteConnection!.localDescription!))
      .then(() => {
        toast({
          title: "connect success",
        })
      })
      .catch(handleCreateDescriptionError)
  }

  // Close the connection, including data channels if they're open.
  // Also update the UI to reflect the disconnected status.
  const disconnectPeers = () => {
    // Close the RTCDataChannels if they're open.
    sendChannel?.close()
    receiveChannel?.close()

    // Close the RTCPeerConnections
    localConnection?.close()
    remoteConnection?.close()

    sendChannel = null
    receiveChannel = null
    localConnection = null
    remoteConnection = null

    toast({
      title: "disconnect success",
    })
  }

  // Handle status changes on the local end of the data
  // channel; this is the end doing the sending of data
  // in this example.
  const handleSendChannelStatusChange = (event: any) => {
    if (sendChannel) {
      const state = sendChannel.readyState
      if (state == "open") {
        console.log("sendChannel is open")
      } else {
        console.log("sendChannel is closed")
      }
    }
  }

  // Called when the connection opens and the data
  // channel is ready to be connected to the remote.
  const receiveChannelCallback = (event: RTCDataChannelEvent) => {
    receiveChannel = event.channel
    receiveChannel.onmessage = handleReceiveMessage
    receiveChannel.onopen = handleReceiveChannelStatusChange
    receiveChannel.onclose = handleReceiveChannelStatusChange
  }

  // Handle onmessage events for the receiving channel.
  // These are the data messages sent by the sending channel.
  const handleReceiveMessage = (event: MessageEvent) => {
    console.log("Received Message: " + event.data)
    setlist((v) => [...v, event.data])
  }

  const handleReceiveChannelStatusChange = (event: Event) => {
    if (receiveChannel) {
      console.log("Receive channel's status has changed to " + receiveChannel.readyState)
    }
    // Here you would do stuff that needs to be done
    // when the channel's status changes.
  }

  // Handle an error that occurs during addition of ICE candidate.
  const handleAddCandidateError = (e: Error) => {
    console.error("Oh noes! addICECandidate failed!", e)
  }

  // Handle errors attempting to create a description;
  // this can happen both when creating an offer and when
  // creating an answer. In this simple example, we handle
  // both the same way.
  const handleCreateDescriptionError = (error: Error) => {
    const msg = "Unable to create an offer: " + error.toString()
    console.error(msg)
    toast({
      variant: "destructive",
      title: msg,
    })
  }

  const sendMessage = () => {
    console.log("sendChannel send: " + message)
    sendChannel?.send(message)
  }

  const toggleConnect = () => {
    if (state == "connected") {
      disconnectPeers()
      setState("disconnected")
    } else {
      connectPeers()
      setState("connected")
    }
  }

  return (
    <div>
      <div className="space-x-2">
        <Button onClick={toggleConnect}>
          {state == "connected" ? "disconnectPeers" : "connectPeers"}
        </Button>
      </div>
      <section className="mt-2 space-x-2">
        <Input
          label="meaage:"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
        ></Input>
        <Button onClick={sendMessage}>sendMessage</Button>
      </section>
      <section className="mt-2">
        <div className="text-lg">Received Message: </div>
        {list.map((item) => {
          return (
            <div key={item} className="text-sm">
              {item}
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default WebRtcDataChannelPage
