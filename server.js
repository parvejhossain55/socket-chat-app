const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("connection establish");

  socket.join("kitchen-room");
  socket.join("bed-room");

  let kitchenRommSize = io.sockets.adapter.rooms.get("kitchen-room").size;

  io.sockets
    .in("kitchen-room")
    .emit("coocking", "cooking complete , user size " + kitchenRommSize);
  io.sockets.in("kitchen-room").emit("boiling", "Boiling water");

  io.sockets.in("bed-room").emit("sleep", "Im sleeping bed room");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
  console.log("Server Running...@3000");
});
