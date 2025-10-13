// 引入依赖
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// 初始化 express
const app = express();
app.use(cors());

// 创建 http 服务器
const server = http.createServer(app);

// 创建 socket.io 服务器
const io = new Server(server, {
  cors: {
    origin:
      [process.env.CLIENT_URL,
      "http://localhost:5174",
      "http://localhost:5173"],// 允许你的 Vite 前端访问
    methods: ["GET", "POST"],
  },
});

// 监听 socket 连接
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("move_card", (data) => {
    socket.broadcast.emit("update_card", data);
  });
});

// 启动服务器
server.listen(3001, () => {
  console.log("✅ SERVER IS RUNNING on http://localhost:3001");
});
