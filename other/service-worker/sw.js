self.addEventListener("message", (event) => {
  console.log("receive message", event);

  const data = event.data;

  if(data.command == "oneWayCommunication"){
    console.log("oneWayCommunication message from the Page: ", data.message);
  }else if(data.command == "twoWayCommunication"){
    console.log("twoWayCommunication message from the Page: ", data.message);
    event.ports[0].postMessage({
      "message": "Hi, Page"
    })
  }else if(data.command == "broadcast"){
    console.log("broadcast message from the Page: ", data.message);
    console.log("Broadcasting to the clients");

    self.clients.matchAll().then((clients)=>{
      console.log("matchAll clients",clients)
      clients.forEach(client => {
        client.postMessage({
          "command": "broadcastOnRequest",
          "message": "This is a broadcast on request from the SW"
        })
      });
    })
  }
});


this.addEventListener("install",(event)=>{
  console.log("service worker install",event)
})




this.addEventListener("activate",(event)=>{
  console.log("service worker activate",event)
})
