const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");
const cors = require("cors")

app.use(cors())

const io = new Server(server, {
    cors: {
        origin: "http://localhost:8000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log("user ", socket.id, "join room with id, " ,data);
    })
    socket.on("disconnect", () => {
        console.log("User disconnect", socket.id);
    })
    socket.on("send_message", (data) => {
        console.log("data sent: ", data);
        socket.to(data.room).emit("recieve_message", data);
    })

})

server.listen(8001, () => console.log("server is runing ne"));