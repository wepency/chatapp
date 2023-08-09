const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const axios = require('axios');
const app = express();

const http = require('http');
const cors = require('cors');

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
    return res.sendFile(path.join(__dirname, '../chat/index.html'));
});

app.use('/api', apiRouter)

// app.get('/api/chats', async (req, res) => {

//     console.log(server_api);

//     try {
//     const response = await axios.get(server_api+'/chats', {
//         headers: {
//             // withCredentials: true,
//             Authorization: `${req.get('Authorization')}`, // Attach the bearer token in the request headers
//         },
//     });

//     // Extract the JSON data from the response
//     const data = response.data;

//     // Send the JSON data back to the client
//     res.json(data);

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

io.on("connection", (socket) => {


    // Handle the "user_login" event to associate user ID with socket ID
    socket.on('user_login', (userId) => {
      connectedUsers.set(userId, socket.id);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit('receive_message', data)

        socket.broadcast.emit('refresh_contacts', data)
        
        // // Get the socket ID of the specific user from the connectedUsers map
        // const receiverSocketId = connectedUsers.get(receiverId);

        // if (receiverSocketId) {
        //   // Emit the "new_message" event to the specific user's socket ID
        //   io.to(receiverSocketId).emit('new_message', { senderId: socket.id, message });
        // }
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