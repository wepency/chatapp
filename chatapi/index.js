const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const axios = require('axios');
const app = express();

const http = require('http');
const cors = require('cors');

const path = require('path');

const apiRouter = require('./Router/api');

const server = http.createServer(app)
const { Server } = require('socket.io');

const config = require('./config');
const {port, allowedDomains} = config;

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

app.get('/chat/:param1?/:param2?', (req, res) => {
    return res.sendFile(path.join(__dirname, '../chat/build/index.html'));
});

app.use('/api', apiRouter);

io.on("connection", (socket) => {

    // Handle the "user_login" event to associate user ID with socket ID
    socket.on('user_login', (userId) => {
      connectedUsers.set(userId, socket.id);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit('receive_message', data)
        socket.broadcast.emit('refresh_contacts', data)
    })

    socket.on('typing', (isTyping, room) => {
      // Broadcast the 'typing' event to all other connected clients
      socket.to(room).emit('typing', { isTyping});
    });

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User ID: ${socket.id} joined room ${data}`)
    })

    socket.on("disconnect", () => {
        console.log('User Disconnected', socket.id)
    })

    console.log('User connected', socket.id)
});

server.listen(3001, () => {
    console.log('SERVER IS RUNNUNG ...');
})