const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

let buyNamespace = io.of("/buy");
let sellNamespace = io.of("/sell");

buyNamespace.on("connection", (socket) => {
  console.log("connection establish for buye");

  buyNamespace.emit("buyEvent", "buyeing product");
});

sellNamespace.on("connection", (socket) => {
  console.log("connection establish for sell");

  sellNamespace.emit("sellEvent", "selling product");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
  console.log("Server Running...@3000");
});
