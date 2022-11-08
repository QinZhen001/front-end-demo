import { useState } from "react"

let connection: any = null;

export const WebsocketChat = () => {
  const [message, setMessage] = useState("");

  const connect = () => {
    var serverUrl;
    var scheme = "ws";
    // If this is an HTTPS connection, we have to use a secure WebSocket
    // connection too, so add another "s" to the scheme.
    if (document.location.protocol === "https:") {
      scheme += "s";
    }
    serverUrl = scheme + "://" + document.location.hostname + ":6502";
    connection = new WebSocket(serverUrl, "json");
    console.log("Connecting to " + serverUrl);


    connection.onopen = function (evt: any) {
      console.log("Connection open ...");
    };

    connection.onmessage = function (evt: any) {
      var msg = JSON.parse(evt.data);
      console.log("Client Received Message: " + msg.text);
    }
  }

  const send = () => {
    connection.send(JSON.stringify({
      text: message
    }));
  }

  return (
    <div style={{ padding: "5px" }}>
      <div>
        <button onClick={connect}>connect</button>
        <button onClick={send}>send</button>
      </div>
      <div>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
      </div>
    </div>
  );
};
