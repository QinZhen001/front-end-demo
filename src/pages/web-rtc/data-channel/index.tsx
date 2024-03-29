import { useRef, useState } from "react"

var localConnection: RTCPeerConnection | null // RTCPeerConnection for our "local" connection
var remoteConnection: RTCPeerConnection | null // RTCPeerConnection for the "remote"

var sendChannel: RTCDataChannel | null // RTCDataChannel for the local (sender)
var receiveChannel: RTCDataChannel | null // RTCDataChannel for the remote (receiver)

export const WebRtcDataChannel = () => {
  const textRef = useRef<HTMLDivElement>(null)
  const [message, setMessage] = useState<string>("")

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
        console.log("localConnection.createOffer() success")
        return localConnection?.setLocalDescription(offer)
      })
      .then(() => remoteConnection?.setRemoteDescription(localConnection!.localDescription!))
      .then(() => remoteConnection?.createAnswer())
      .then((answer) => remoteConnection?.setLocalDescription(answer))
      .then(() => localConnection?.setRemoteDescription(remoteConnection!.localDescription!))
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
  }

  // Handle status changes on the local end of the data
  // channel; this is the end doing the sending of data
  // in this example.
  const handleSendChannelStatusChange = (event: any) => {
    if (sendChannel) {
      var state = sendChannel.readyState
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
    var el = document.createElement("p")
    var txtNode = document.createTextNode(event.data)
    el.appendChild(txtNode)
    textRef.current!.appendChild(el)
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
    console.log("Unable to create an offer: " + error.toString())
  }

  const sendMessage = () => {
    sendChannel?.send(message)
  }

  return (
    <div>
      <div>
        <button onClick={connectPeers}>connectPeers</button>
        <button onClick={disconnectPeers}>disconnectPeers</button>
      </div>
      <section style={{ padding: "5px" }}>
        <div>
          <input value={message} onChange={(e) => setMessage(e.target.value)}></input>
        </div>
        <button onClick={sendMessage}>sendMessage</button>
      </section>
      <section style={{ padding: "5px" }}>
        <div>Received Message: </div>
        <div ref={textRef}></div>
      </section>
    </div>
  )
}

export default WebRtcDataChannel
