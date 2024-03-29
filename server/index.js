const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3000;

const messages = []

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

io.on("connection", socket => {
  console.log("a user connected :D");
  socket.emit("initial log", messages);
  socket.on("chat message", msg => {
    console.log(msg);
    messages.push(msg)
    socket.emit("chat message", msg);
  });
});
