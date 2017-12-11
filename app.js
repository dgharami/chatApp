const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const port = process.env.PORT || 3000;
const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

// Express Configuration
app.use(express.static(__dirname + "/public"))

// Routes
app.all("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Socket IO Connections
io.on("connection", socket => {
    console.log(`New User connected ${socket.id}`);

    socket.on("newMessageSent", chat => {
        console.log("New Message Received", chat);
        socket.broadcast.emit("newMessageReceived", chat);
    });

    // Disconnected
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });

});


httpServer.listen(port, () => {
    console.log(`Server Running on Port: ${port}`);
});