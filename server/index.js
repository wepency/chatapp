const express = require('express')
const axios = require('axios')
const app = express();

const http = require('http');
const cors = require('cors')

const jwt = require('jsonwebtoken')

app.use(cors())

// use this to store all connected users
const connectedUsers = new Map();

const server = http.createServer(app)
const { Server } = require('socket.io');

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

// Define your bearer token
const bearerToken = '4319|rnOyASOE7lN4HPfXhZcqXWO9foIBxk4AmRvKi2Qq';

app.get('/', async (req, res) => {
  // try {
  //   // Make the GET request to http://chat.mabeet.test with axios
  //   const response = await axios.get('http://chat.mabeet.test/client/chats', {
  //     headers: {
  //       Authorization: `Bearer ${bearerToken}`, // Attach the bearer token in the request headers
  //     },
  //   });

  //   // Extract the JSON data from the response
  //   const data = response.data;

  //   // Send the JSON data back to the client
  //   res.json(data);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
});

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