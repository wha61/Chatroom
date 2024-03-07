const express = require("express")
const cros = require("cors")
const dotenv = require("dotenv")
const socket = require("socket.io")
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")
require("./service")

const app = express()

dotenv.config()

app.use(cros())
app.use(express.json())
app.use("/auth", userRoutes)
app.use("/message", messageRoutes)

module.exports = app

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Start on Port ${process.env.PORT}`)
})

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
})

global.onlineUsers = new Map()

io.on("connection", socket => {
  // global.chatSocket = socket
  socket.on("add-user", username => {
    onlineUsers.set(username, socket.id)
  })

  socket.on("send-msg", data => {
    const sendUserSocket = onlineUsers.get(data.to)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg, data.from)
    }
  })
})
