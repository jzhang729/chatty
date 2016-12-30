const express = require("express");
const SocketServer = require("ws").Server;

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.on("connection", (ws) => {
    console.log("Client connected");

    // Set a callback for when a client closes the socket.
    // This usually means they closed their browser.

    ws.on("close", () => console.log("Client disconnected"));
})
