var http = require('http');
var fs = require('fs');
var WebSocketServer = require('websocket').server;

const connectionArray = []

function originIsAllowed(origin) {
  // This is where you put code to ensure the connection should
  // be accepted. Return false if it shouldn't be.
  return true;
}

var httpServer = http.createServer({}, function (request, response) {
  console.log((new Date()) + " Received request for " + request.url);
  response.writeHead(404);
  response.end();
});


httpServer.listen(6502, function () {
  console.log((new Date()) + " Server is listening on port 6502");
});


var wsServer = new WebSocketServer({
  httpServer: httpServer,
  autoAcceptConnections: false
});
console.log("WebSocket server created");

wsServer.on("request", (request) => {
  console.log("Request received ", request.origin);

  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log("Connection from " + request.origin + " rejected.");
    return;
  }

  // Accept the request and get a connection.
  var connection = request.accept("json", request.origin);
  console.log((new Date()) + " Connection accepted.");
  connectionArray.push(connection);


  // Handle the "message" event received over WebSocket. This
  // is a message sent by a client, and may be text to share with
  // other users or a command to the server.
  connection.on("message", (message) => {
    if (message.type == 'utf8') {
      msg = JSON.parse(message.utf8Data);
      console.log("Server Received Message: " + msg.text);

      connection.sendUTF(JSON.stringify(
        {
          text: "Server has received::: " + msg.text
        }
      ));
    }

  })

  connection.on("close", (connection) => {
    console.log("Connection closed");
  })
})
