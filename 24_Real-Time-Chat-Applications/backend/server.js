const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket io connection handling
io.on("connection", (socket) => {
  console.log("New Client Connected", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data);
  });
});

const PORT = 6000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
