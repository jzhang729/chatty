const express = require("express");
const SocketServer = require("ws").Server;
const uuid = require("node-uuid");

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each (client) {
        client.send(data);
    });
};

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
        var newMessage = JSON.parse(message);
        newMessage.id = uuid.v1();
        switch(newMessage.type) {
            case "postMessage":
                newMessage.type = "incomingMessage";
                break;
            case "postNotification":
                newMessage.type = "incomingNotification";
                console.log(newMessage);
                break;
            default:
                throw new Error("Unknown event type: ", newMessage.type);
                break;
        }

        wss.broadcast(JSON.stringify(newMessage));
    });

    // Set a callback for when a client closes the socket.
    // This usually means they closed their browser.

    ws.on("close", () => console.log("Client disconnected"));
});
