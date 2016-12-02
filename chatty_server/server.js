// Chattyserver.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidV1 = require('uuid/v1');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

let activeUsers = 0;
let clients = [];
let colors = ["green", "blue", "red", "purple", "navy", "orange", "darkorchid", "lightgreen", "skyblue", "thistle"];

wss.on('connection', (ws) => {
  console.log('Client connected');

  clients[ws] = colors[Math.floor(Math.random()* 10)];

  activeUsers ++;
  wss.broadcast(JSON.stringify(activeUsers));

  ws.on('message', function incoming(message){
    let parsedMessage = JSON.parse(message)
    parsedMessage.id = uuidV1();
    parsedMessage.color = clients[ws];
    switch(parsedMessage.type){
      case "postNotification":
        parsedMessage.type = "incomingNotification";
        break;
      case "postMessage":
        parsedMessage.type = "incomingMessage";
        break;
      default:
        throw new Error("Unknown event type ", parsed.Message.type )
    }
    wss.broadcast(JSON.stringify(parsedMessage));
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    activeUsers -- ;
    wss.broadcast(JSON.stringify(activeUsers));
  });

});



















